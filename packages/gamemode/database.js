// Database System - MariaDB Integration für Horizont-City Roleplay
// Zentrale Datenbank-Verwaltung für alle Systeme

const mariadb = require('mariadb');
const mysql = require('mysql2/promise'); // For MySQL (Character Creator)

class DatabaseManager {
    constructor() {
        this.mariadbPool = null;
        this.mysqlConnection = null;
        this.isConnected = false;
    }

    // MariaDB Verbindung
    async connectMariaDB() {
        try {
            const mariadbConfig = {
                host: process.env.MARIADB_HOST || 'localhost',
                port: process.env.MARIADB_PORT || 3306,
                user: process.env.MARIADB_USER || 'root',
                password: process.env.MARIADB_PASSWORD || 'root',
                database: process.env.MARIADB_DATABASE || 'horizontcity',
                connectionLimit: 10,
                acquireTimeout: 60000,
                timeout: 60000,
                reconnect: true
            };
            
            this.mariadbPool = mariadb.createPool(mariadbConfig);
            this.isConnected = true;
            console.log('✅ MariaDB verbunden');
            return this.mariadbPool;
        } catch (error) {
            console.error('❌ MariaDB Verbindungsfehler:', error);
            throw error;
        }
    }

    // MySQL Verbindung (für Character Creator)
    async connectMySQL() {
        try {
            this.mysqlConnection = await mysql.createConnection({
                host: process.env.MYSQL_HOST || 'localhost',
                user: process.env.MYSQL_USER || 'root',
                password: process.env.MYSQL_PASSWORD || 'root',
                database: process.env.MYSQL_DATABASE || 'horizontcity',
                authPlugins: {
                    mysql_native_password: () => () => Buffer.alloc(0)
                }
            });
            console.log('✅ MySQL verbunden');
            return this.mysqlConnection;
        } catch (error) {
            console.error('❌ MySQL Verbindungsfehler:', error);
            // MySQL ist optional, nicht kritisch
            console.log('⚠️ MySQL-Verbindung übersprungen (optional)');
            return null;
        }
    }

    // MariaDB Query ausführen
    async query(sql, params = []) {
        if (!this.mariadbPool) {
            throw new Error('MariaDB nicht verbunden');
        }
        const conn = await this.mariadbPool.getConnection();
        try {
            const result = await conn.query(sql, params);
            return result;
        } finally {
            conn.release();
        }
    }

    // MariaDB Insert
    async insert(table, data) {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map(() => '?').join(', ');
        const values = Object.values(data);
        
        const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
        const result = await this.query(sql, values);
        return result.insertId;
    }

    // MariaDB Select One
    async selectOne(table, where = {}, columns = '*') {
        const whereClause = Object.keys(where).length > 0 
            ? 'WHERE ' + Object.keys(where).map(key => `${key} = ?`).join(' AND ')
            : '';
        const values = Object.values(where);
        
        const sql = `SELECT ${columns} FROM ${table} ${whereClause} LIMIT 1`;
        const result = await this.query(sql, values);
        return result[0] || null;
    }

    // MariaDB Select Many
    async select(table, where = {}, columns = '*', options = {}) {
        const whereClause = Object.keys(where).length > 0 
            ? 'WHERE ' + Object.keys(where).map(key => `${key} = ?`).join(' AND ')
            : '';
        const values = Object.values(where);
        
        let sql = `SELECT ${columns} FROM ${table} ${whereClause}`;
        
        if (options.orderBy) {
            sql += ` ORDER BY ${options.orderBy}`;
        }
        if (options.limit) {
            sql += ` LIMIT ${options.limit}`;
        }
        if (options.offset) {
            sql += ` OFFSET ${options.offset}`;
        }
        
        return await this.query(sql, values);
    }

    // MariaDB Update
    async update(table, data, where) {
        const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
        const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const values = [...Object.values(data), ...Object.values(where)];
        
        const sql = `UPDATE ${table} SET ${setClause} WHERE ${whereClause}`;
        const result = await this.query(sql, values);
        return result.affectedRows;
    }

    // MariaDB Delete
    async delete(table, where) {
        const whereClause = Object.keys(where).map(key => `${key} = ?`).join(' AND ');
        const values = Object.values(where);
        
        const sql = `DELETE FROM ${table} WHERE ${whereClause}`;
        const result = await this.query(sql, values);
        return result.affectedRows;
    }

    // MariaDB Count
    async count(table, where = {}) {
        const whereClause = Object.keys(where).length > 0 
            ? 'WHERE ' + Object.keys(where).map(key => `${key} = ?`).join(' AND ')
            : '';
        const values = Object.values(where);
        
        const sql = `SELECT COUNT(*) as count FROM ${table} ${whereClause}`;
        const result = await this.query(sql, values);
        return result[0].count;
    }

    // MySQL Operationen (für Character Creator)
    async mysqlQuery(sql, params = []) {
        if (!this.mysqlConnection) {
            throw new Error('MySQL nicht verbunden');
        }
        const [rows] = await this.mysqlConnection.execute(sql, params);
        return rows;
    }

    // Initialisierung der Datenbanken
    async initialize() {
        try {
            // MariaDB verbinden
            await this.connectMariaDB();
            
            // MySQL verbinden
            await this.connectMySQL();
            
            // Tabellen erstellen
            await this.createTables();
            
            console.log('✅ Datenbanken erfolgreich initialisiert');
        } catch (error) {
            console.error('❌ Datenbank-Initialisierung fehlgeschlagen:', error);
            throw error;
        }
    }

    // MariaDB Tabellen erstellen
    async createTables() {
        try {
            // Players Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS players (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    socialId VARCHAR(50) UNIQUE,
                    money INT DEFAULT 0,
                    level INT DEFAULT 1,
                    experience INT DEFAULT 0,
                    health INT DEFAULT 100,
                    armor INT DEFAULT 0,
                    position_x FLOAT DEFAULT 0,
                    position_y FLOAT DEFAULT 0,
                    position_z FLOAT DEFAULT 0,
                    rotation FLOAT DEFAULT 0,
                    skin INT DEFAULT 0,
                    faction_id INT DEFAULT NULL,
                    job_id INT DEFAULT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_name (name),
                    INDEX idx_email (email),
                    INDEX idx_socialId (socialId)
                )
            `);

            // Factions Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS factions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    tag VARCHAR(10) UNIQUE NOT NULL,
                    type ENUM('police', 'ems', 'fire', 'gang', 'business', 'government') NOT NULL,
                    color VARCHAR(7) DEFAULT '#FFFFFF',
                    leader_id INT DEFAULT NULL,
                    members JSON DEFAULT '[]',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_name (name),
                    INDEX idx_tag (tag)
                )
            `);

            // Vehicles Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS vehicles (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    model VARCHAR(50) NOT NULL,
                    plate VARCHAR(10) UNIQUE NOT NULL,
                    owner_id INT NOT NULL,
                    position_x FLOAT DEFAULT 0,
                    position_y FLOAT DEFAULT 0,
                    position_z FLOAT DEFAULT 0,
                    rotation FLOAT DEFAULT 0,
                    color1 INT DEFAULT 0,
                    color2 INT DEFAULT 0,
                    fuel INT DEFAULT 100,
                    engine_health INT DEFAULT 1000,
                    body_health INT DEFAULT 1000,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_plate (plate),
                    INDEX idx_owner_id (owner_id)
                )
            `);

            // Houses Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS houses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    owner_id INT DEFAULT NULL,
                    price INT NOT NULL,
                    position_x FLOAT NOT NULL,
                    position_y FLOAT NOT NULL,
                    position_z FLOAT NOT NULL,
                    interior_id INT DEFAULT 0,
                    locked BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_owner_id (owner_id)
                )
            `);

            // Jobs Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS jobs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    category VARCHAR(30) NOT NULL,
                    description TEXT,
                    salary INT DEFAULT 0,
                    required_level INT DEFAULT 1,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_name (name),
                    INDEX idx_category (category)
                )
            `);

            // Bank Accounts Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS bank_accounts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    account_number VARCHAR(20) UNIQUE NOT NULL,
                    owner_id INT NOT NULL,
                    balance INT DEFAULT 0,
                    type ENUM('personal', 'business', 'faction') DEFAULT 'personal',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_account_number (account_number),
                    INDEX idx_owner_id (owner_id)
                )
            `);

            // Inventories Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS inventories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    player_id INT UNIQUE NOT NULL,
                    items JSON DEFAULT '{}',
                    max_weight INT DEFAULT 50,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_player_id (player_id)
                )
            `);

            // Phones Tabelle
            await this.query(`
                CREATE TABLE IF NOT EXISTS phones (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    number VARCHAR(15) UNIQUE NOT NULL,
                    owner_id INT NOT NULL,
                    contacts JSON DEFAULT '[]',
                    messages JSON DEFAULT '[]',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_number (number),
                    INDEX idx_owner_id (owner_id)
                )
            `);

            console.log('✅ MariaDB Tabellen erstellt');
        } catch (error) {
            console.error('❌ Fehler beim Erstellen der Tabellen:', error);
        }
    }

    // Verbindung schließen
    async close() {
        try {
            if (this.mariadbPool) {
                await this.mariadbPool.end();
            }
            if (this.mysqlConnection) {
                await this.mysqlConnection.end();
            }
            this.isConnected = false;
            console.log('✅ Datenbankverbindungen geschlossen');
        } catch (error) {
            console.error('❌ Fehler beim Schließen der Verbindungen:', error);
        }
    }

    // Health Check
    async healthCheck() {
        try {
            const mariadbStatus = this.mariadbPool ? 'connected' : 'disconnected';
            const mysqlStatus = this.mysqlConnection ? 'connected' : 'disconnected';
            
            return {
                mariadb: mariadbStatus,
                mysql: mysqlStatus,
                overall: this.isConnected ? 'healthy' : 'unhealthy'
            };
        } catch (error) {
            return {
                mariadb: 'error',
                mysql: 'error',
                overall: 'unhealthy',
                error: error.message
            };
        }
    }
}

// Singleton-Instanz
const databaseManager = new DatabaseManager();

// Export für andere Module
module.exports = {
    getDB: () => databaseManager.mariadbPool,
    getMariaDB: () => databaseManager.mariadbPool,
    getMySQL: () => databaseManager.mysqlConnection,
    query: (sql, params) => databaseManager.query(sql, params),
    insert: (table, data) => databaseManager.insert(table, data),
    selectOne: (table, where, columns) => databaseManager.selectOne(table, where, columns),
    select: (table, where, columns, options) => databaseManager.select(table, where, columns, options),
    update: (table, data, where) => databaseManager.update(table, data, where),
    delete: (table, where) => databaseManager.delete(table, where),
    count: (table, where) => databaseManager.count(table, where),
    mysqlQuery: (sql, params) => databaseManager.mysqlQuery(sql, params),
    initialize: () => databaseManager.initialize(),
    close: () => databaseManager.close(),
    healthCheck: () => databaseManager.healthCheck()
};