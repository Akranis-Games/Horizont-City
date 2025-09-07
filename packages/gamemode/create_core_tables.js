// Core Tabellen erstellen - Users, Characters, Sessions, etc.
// Erstellt alle wichtigen Core-Tabellen für den Roleplay-Server

const { query, insert, selectOne, select, update, delete: dbDelete, count } = require('./database');

class CoreTablesCreator {
    constructor() {
        this.createdTables = [];
        this.errors = [];
    }

    // Alle Core-Tabellen erstellen
    async createAllCoreTables() {
        console.log('[CORE_TABLES] Erstelle Core-Tabellen...');
        
        try {
            // Users Tabelle
            await this.createUsersTable();
            
            // Characters Tabelle
            await this.createCharactersTable();
            
            // Sessions Tabelle
            await this.createSessionsTable();
            
            // Character Stats Tabelle
            await this.createCharacterStatsTable();
            
            // Character Skills Tabelle
            await this.createCharacterSkillsTable();
            
            // Character Licenses Tabelle
            await this.createCharacterLicensesTable();
            
            // Character Inventory Tabelle
            await this.createCharacterInventoryTable();
            
            // Character Vehicles Tabelle
            await this.createCharacterVehiclesTable();
            
            // Character Houses Tabelle
            await this.createCharacterHousesTable();
            
            // Character Jobs Tabelle
            await this.createCharacterJobsTable();
            
            // Character Factions Tabelle
            await this.createCharacterFactionsTable();
            
            // Character Bank Accounts Tabelle
            await this.createCharacterBankAccountsTable();
            
            // Character Phone Tabelle
            await this.createCharacterPhoneTable();
            
            // Character Health Tabelle
            await this.createCharacterHealthTable();
            
            console.log('[CORE_TABLES] Alle Core-Tabellen erfolgreich erstellt!');
            console.log(`[CORE_TABLES] Erfolgreich erstellt: ${this.createdTables.length} Tabellen`);
            
            if (this.errors.length > 0) {
                console.log(`[CORE_TABLES] Fehler: ${this.errors.length}`);
                this.errors.forEach(error => {
                    console.error(`[CORE_TABLES] Fehler: ${error.system}: ${error.error}`);
                });
            }
            
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei der Core-Tabellen-Erstellung:', error);
        }
    }

    // Users Tabelle erstellen
    async createUsersTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Users Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) UNIQUE NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    social_club_id VARCHAR(50) UNIQUE,
                    hwid VARCHAR(100),
                    ip_address VARCHAR(45),
                    rank INT DEFAULT 0,
                    permissions JSON,
                    is_banned BOOLEAN DEFAULT FALSE,
                    ban_reason TEXT,
                    ban_expires_at TIMESTAMP NULL,
                    is_muted BOOLEAN DEFAULT FALSE,
                    mute_expires_at TIMESTAMP NULL,
                    last_login TIMESTAMP NULL,
                    total_playtime INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_username (username),
                    INDEX idx_email (email),
                    INDEX idx_social_club_id (social_club_id),
                    INDEX idx_hwid (hwid),
                    INDEX idx_rank (rank)
                )
            `);
            
            this.createdTables.push('users');
            console.log('[CORE_TABLES] Users Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Users Tabelle:', error);
            this.errors.push({ system: 'Users Tabelle', error: error.message });
        }
    }

    // Characters Tabelle erstellen
    async createCharactersTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Characters Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS characters (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    first_name VARCHAR(50) NOT NULL,
                    last_name VARCHAR(50) NOT NULL,
                    date_of_birth DATE NOT NULL,
                    gender ENUM('male', 'female', 'other') NOT NULL,
                    nationality VARCHAR(50) DEFAULT 'American',
                    height INT DEFAULT 175,
                    weight INT DEFAULT 70,
                    appearance JSON,
                    stats JSON,
                    money INT DEFAULT 1000,
                    bank_money INT DEFAULT 0,
                    level INT DEFAULT 1,
                    experience INT DEFAULT 0,
                    health INT DEFAULT 100,
                    armor INT DEFAULT 0,
                    hunger INT DEFAULT 100,
                    thirst INT DEFAULT 100,
                    stress INT DEFAULT 0,
                    fatigue INT DEFAULT 0,
                    position_x FLOAT DEFAULT -425.517,
                    position_y FLOAT DEFAULT 1123.620,
                    position_z FLOAT DEFAULT 325.8544,
                    heading FLOAT DEFAULT 0.0,
                    dimension INT DEFAULT 0,
                    is_online BOOLEAN DEFAULT FALSE,
                    last_seen TIMESTAMP NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    INDEX idx_user_id (user_id),
                    INDEX idx_name (first_name, last_name),
                    INDEX idx_is_online (is_online)
                )
            `);
            
            this.createdTables.push('characters');
            console.log('[CORE_TABLES] Characters Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Characters Tabelle:', error);
            this.errors.push({ system: 'Characters Tabelle', error: error.message });
        }
    }

    // Sessions Tabelle erstellen
    async createSessionsTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Sessions Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS sessions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT NOT NULL,
                    character_id INT,
                    session_token VARCHAR(255) UNIQUE NOT NULL,
                    ip_address VARCHAR(45) NOT NULL,
                    user_agent TEXT,
                    is_active BOOLEAN DEFAULT TRUE,
                    expires_at TIMESTAMP NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE SET NULL,
                    INDEX idx_user_id (user_id),
                    INDEX idx_character_id (character_id),
                    INDEX idx_session_token (session_token),
                    INDEX idx_is_active (is_active)
                )
            `);
            
            this.createdTables.push('sessions');
            console.log('[CORE_TABLES] Sessions Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Sessions Tabelle:', error);
            this.errors.push({ system: 'Sessions Tabelle', error: error.message });
        }
    }

    // Character Stats Tabelle erstellen
    async createCharacterStatsTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Stats Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_stats (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    kills INT DEFAULT 0,
                    deaths INT DEFAULT 0,
                    jobs_completed INT DEFAULT 0,
                    money_earned INT DEFAULT 0,
                    money_spent INT DEFAULT 0,
                    time_played INT DEFAULT 0,
                    distance_traveled FLOAT DEFAULT 0.0,
                    vehicles_owned INT DEFAULT 0,
                    houses_owned INT DEFAULT 0,
                    crimes_committed INT DEFAULT 0,
                    arrests INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id)
                )
            `);
            
            this.createdTables.push('character_stats');
            console.log('[CORE_TABLES] Character Stats Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Stats Tabelle:', error);
            this.errors.push({ system: 'Character Stats Tabelle', error: error.message });
        }
    }

    // Character Skills Tabelle erstellen
    async createCharacterSkillsTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Skills Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_skills (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    skill_name VARCHAR(50) NOT NULL,
                    level INT DEFAULT 0,
                    experience INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    UNIQUE KEY unique_character_skill (character_id, skill_name),
                    INDEX idx_character_id (character_id),
                    INDEX idx_skill_name (skill_name)
                )
            `);
            
            this.createdTables.push('character_skills');
            console.log('[CORE_TABLES] Character Skills Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Skills Tabelle:', error);
            this.errors.push({ system: 'Character Skills Tabelle', error: error.message });
        }
    }

    // Character Licenses Tabelle erstellen
    async createCharacterLicensesTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Licenses Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_licenses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    license_type VARCHAR(50) NOT NULL,
                    license_class VARCHAR(10),
                    is_valid BOOLEAN DEFAULT TRUE,
                    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP NULL,
                    issued_by VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_license_type (license_type),
                    INDEX idx_is_valid (is_valid)
                )
            `);
            
            this.createdTables.push('character_licenses');
            console.log('[CORE_TABLES] Character Licenses Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Licenses Tabelle:', error);
            this.errors.push({ system: 'Character Licenses Tabelle', error: error.message });
        }
    }

    // Character Inventory Tabelle erstellen
    async createCharacterInventoryTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Inventory Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_inventory (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    item_id INT NOT NULL,
                    quantity INT DEFAULT 1,
                    slot INT,
                    metadata JSON,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_item_id (item_id),
                    INDEX idx_slot (slot)
                )
            `);
            
            this.createdTables.push('character_inventory');
            console.log('[CORE_TABLES] Character Inventory Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Inventory Tabelle:', error);
            this.errors.push({ system: 'Character Inventory Tabelle', error: error.message });
        }
    }

    // Character Vehicles Tabelle erstellen
    async createCharacterVehiclesTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Vehicles Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_vehicles (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    vehicle_model VARCHAR(50) NOT NULL,
                    license_plate VARCHAR(20) UNIQUE NOT NULL,
                    color_primary INT DEFAULT 0,
                    color_secondary INT DEFAULT 0,
                    modifications JSON,
                    position_x FLOAT,
                    position_y FLOAT,
                    position_z FLOAT,
                    heading FLOAT,
                    health INT DEFAULT 1000,
                    fuel INT DEFAULT 100,
                    mileage INT DEFAULT 0,
                    is_spawned BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_license_plate (license_plate),
                    INDEX idx_is_spawned (is_spawned)
                )
            `);
            
            this.createdTables.push('character_vehicles');
            console.log('[CORE_TABLES] Character Vehicles Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Vehicles Tabelle:', error);
            this.errors.push({ system: 'Character Vehicles Tabelle', error: error.message });
        }
    }

    // Character Houses Tabelle erstellen
    async createCharacterHousesTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Houses Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_houses (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    house_type VARCHAR(50) NOT NULL,
                    address VARCHAR(200) NOT NULL,
                    position_x FLOAT NOT NULL,
                    position_y FLOAT NOT NULL,
                    position_z FLOAT NOT NULL,
                    interior_id INT DEFAULT 0,
                    price INT NOT NULL,
                    is_owned BOOLEAN DEFAULT TRUE,
                    is_rented BOOLEAN DEFAULT FALSE,
                    rent_amount INT DEFAULT 0,
                    rent_due_date DATE,
                    furniture JSON,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_is_owned (is_owned),
                    INDEX idx_is_rented (is_rented)
                )
            `);
            
            this.createdTables.push('character_houses');
            console.log('[CORE_TABLES] Character Houses Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Houses Tabelle:', error);
            this.errors.push({ system: 'Character Houses Tabelle', error: error.message });
        }
    }

    // Character Jobs Tabelle erstellen
    async createCharacterJobsTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Jobs Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_jobs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    job_name VARCHAR(100) NOT NULL,
                    job_title VARCHAR(100),
                    salary INT DEFAULT 0,
                    work_hours JSON,
                    is_active BOOLEAN DEFAULT TRUE,
                    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    ended_at TIMESTAMP NULL,
                    performance_score INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_job_name (job_name),
                    INDEX idx_is_active (is_active)
                )
            `);
            
            this.createdTables.push('character_jobs');
            console.log('[CORE_TABLES] Character Jobs Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Jobs Tabelle:', error);
            this.errors.push({ system: 'Character Jobs Tabelle', error: error.message });
        }
    }

    // Character Factions Tabelle erstellen
    async createCharacterFactionsTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Factions Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_factions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    faction_id INT NOT NULL,
                    rank INT DEFAULT 0,
                    rank_name VARCHAR(50) DEFAULT 'Member',
                    permissions JSON,
                    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    left_at TIMESTAMP NULL,
                    is_active BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_faction_id (faction_id),
                    INDEX idx_is_active (is_active)
                )
            `);
            
            this.createdTables.push('character_factions');
            console.log('[CORE_TABLES] Character Factions Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Factions Tabelle:', error);
            this.errors.push({ system: 'Character Factions Tabelle', error: error.message });
        }
    }

    // Character Bank Accounts Tabelle erstellen
    async createCharacterBankAccountsTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Bank Accounts Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_bank_accounts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    account_number VARCHAR(20) UNIQUE NOT NULL,
                    bank_name VARCHAR(100) NOT NULL,
                    balance INT DEFAULT 0,
                    account_type VARCHAR(50) DEFAULT 'checking',
                    is_active BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_account_number (account_number),
                    INDEX idx_bank_name (bank_name)
                )
            `);
            
            this.createdTables.push('character_bank_accounts');
            console.log('[CORE_TABLES] Character Bank Accounts Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Bank Accounts Tabelle:', error);
            this.errors.push({ system: 'Character Bank Accounts Tabelle', error: error.message });
        }
    }

    // Character Phone Tabelle erstellen
    async createCharacterPhoneTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Phone Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_phones (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    phone_number VARCHAR(20) UNIQUE NOT NULL,
                    phone_model VARCHAR(50) DEFAULT 'iPhone 16',
                    is_active BOOLEAN DEFAULT TRUE,
                    contacts JSON,
                    apps JSON,
                    settings JSON,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id),
                    INDEX idx_phone_number (phone_number)
                )
            `);
            
            this.createdTables.push('character_phones');
            console.log('[CORE_TABLES] Character Phone Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Phone Tabelle:', error);
            this.errors.push({ system: 'Character Phone Tabelle', error: error.message });
        }
    }

    // Character Health Tabelle erstellen
    async createCharacterHealthTable() {
        try {
            console.log('[CORE_TABLES] Erstelle Character Health Tabelle...');
            
            await query(`
                CREATE TABLE IF NOT EXISTS character_health (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    character_id INT NOT NULL,
                    health_level INT DEFAULT 100,
                    armor_level INT DEFAULT 0,
                    hunger_level INT DEFAULT 100,
                    thirst_level INT DEFAULT 100,
                    stress_level INT DEFAULT 0,
                    fatigue_level INT DEFAULT 0,
                    diseases JSON,
                    medications JSON,
                    injuries JSON,
                    last_checkup TIMESTAMP NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE,
                    INDEX idx_character_id (character_id)
                )
            `);
            
            this.createdTables.push('character_health');
            console.log('[CORE_TABLES] Character Health Tabelle erfolgreich erstellt');
        } catch (error) {
            console.error('[CORE_TABLES] Fehler bei Character Health Tabelle:', error);
            this.errors.push({ system: 'Character Health Tabelle', error: error.message });
        }
    }

    // Status der Tabellen-Erstellung abrufen
    getCreationStatus() {
        return {
            createdTables: this.createdTables,
            errors: this.errors,
            success: this.errors.length === 0
        };
    }
}

// Instanz erstellen
const coreTableCreator = new CoreTablesCreator();

// Exportieren
module.exports = {
    createAll: () => coreTableCreator.createAllCoreTables(),
    getStatus: () => coreTableCreator.getCreationStatus()
};

// Automatische Tabellen-Erstellung beim Start
if (require.main === module) {
    coreTableCreator.createAllCoreTables();
}
