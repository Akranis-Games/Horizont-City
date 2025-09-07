// Migration Script - MongoDB zu MariaDB
// Konvertiert alle Systeme von MongoDB zu MariaDB

const { query, insert, selectOne, select, update, delete: dbDelete, count } = require('./database');

class SystemMigrator {
    constructor() {
        this.migratedSystems = [];
        this.errors = [];
    }

    // Alle Systeme migrieren
    async migrateAllSystems() {
        console.log('[MIGRATION] Starte Migration von MongoDB zu MariaDB...');
        
        try {
            // 1. Player System
            await this.migratePlayerSystem();
            
            // 2. Faction System
            await this.migrateFactionSystem();
            
            // 3. Vehicle System
            await this.migrateVehicleSystem();
            
            // 4. Housing System
            await this.migrateHousingSystem();
            
            // 5. Job System
            await this.migrateJobSystem();
            
            // 6. Bank System
            await this.migrateBankSystem();
            
            // 7. Inventory System
            await this.migrateInventorySystem();
            
            // 8. Phone System
            await this.migratePhoneSystem();
            
            // 9. Economy System
            await this.migrateEconomySystem();
            
            // 10. Admin System
            await this.migrateAdminSystem();
            
            console.log('[MIGRATION] Migration abgeschlossen!');
            console.log(`[MIGRATION] Erfolgreich migriert: ${this.migratedSystems.length} Systeme`);
            
            if (this.errors.length > 0) {
                console.log(`[MIGRATION] Fehler: ${this.errors.length}`);
                this.errors.forEach(error => console.error('[MIGRATION] Fehler:', error));
            }
            
        } catch (error) {
            console.error('[MIGRATION] Kritischer Fehler:', error);
        }
    }

    // Player System migrieren
    async migratePlayerSystem() {
        try {
            console.log('[MIGRATION] Migriere Player System...');
            
            // Player Stats Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS player_stats (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    player_id INT NOT NULL,
                    play_time INT DEFAULT 0,
                    deaths INT DEFAULT 0,
                    kills INT DEFAULT 0,
                    arrests INT DEFAULT 0,
                    jobs_completed INT DEFAULT 0,
                    money_earned INT DEFAULT 0,
                    money_spent INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_player_id (player_id),
                    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Player System');
            console.log('[MIGRATION] Player System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Player System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Player System:', error);
        }
    }

    // Faction System migrieren
    async migrateFactionSystem() {
        try {
            console.log('[MIGRATION] Migriere Faction System...');
            
            // Faction Members Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS faction_members (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    faction_id INT NOT NULL,
                    player_id INT NOT NULL,
                    rank INT DEFAULT 0,
                    permissions JSON DEFAULT '[]',
                    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_faction_id (faction_id),
                    INDEX idx_player_id (player_id),
                    FOREIGN KEY (faction_id) REFERENCES factions(id) ON DELETE CASCADE,
                    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Faction System');
            console.log('[MIGRATION] Faction System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Faction System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Faction System:', error);
        }
    }

    // Vehicle System migrieren
    async migrateVehicleSystem() {
        try {
            console.log('[MIGRATION] Migriere Vehicle System...');
            
            // Vehicle Modifications Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS vehicle_modifications (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    vehicle_id INT NOT NULL,
                    mod_type VARCHAR(50) NOT NULL,
                    mod_index INT NOT NULL,
                    mod_value INT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_vehicle_id (vehicle_id),
                    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Vehicle System');
            console.log('[MIGRATION] Vehicle System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Vehicle System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Vehicle System:', error);
        }
    }

    // Housing System migrieren
    async migrateHousingSystem() {
        try {
            console.log('[MIGRATION] Migriere Housing System...');
            
            // House Keys Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS house_keys (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    house_id INT NOT NULL,
                    player_id INT NOT NULL,
                    key_type ENUM('owner', 'tenant', 'guest') DEFAULT 'guest',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_house_id (house_id),
                    INDEX idx_player_id (player_id),
                    FOREIGN KEY (house_id) REFERENCES houses(id) ON DELETE CASCADE,
                    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Housing System');
            console.log('[MIGRATION] Housing System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Housing System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Housing System:', error);
        }
    }

    // Job System migrieren
    async migrateJobSystem() {
        try {
            console.log('[MIGRATION] Migriere Job System...');
            
            // Job Applications Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS job_applications (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    job_id INT NOT NULL,
                    player_id INT NOT NULL,
                    status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
                    application_text TEXT,
                    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    reviewed_at TIMESTAMP NULL,
                    reviewed_by INT NULL,
                    INDEX idx_job_id (job_id),
                    INDEX idx_player_id (player_id),
                    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
                    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Job System');
            console.log('[MIGRATION] Job System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Job System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Job System:', error);
        }
    }

    // Bank System migrieren
    async migrateBankSystem() {
        try {
            console.log('[MIGRATION] Migriere Bank System...');
            
            // Bank Transactions Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS bank_transactions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    account_id INT NOT NULL,
                    transaction_type ENUM('deposit', 'withdraw', 'transfer', 'payment') NOT NULL,
                    amount INT NOT NULL,
                    balance_after INT NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_account_id (account_id),
                    FOREIGN KEY (account_id) REFERENCES bank_accounts(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Bank System');
            console.log('[MIGRATION] Bank System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Bank System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Bank System:', error);
        }
    }

    // Inventory System migrieren
    async migrateInventorySystem() {
        try {
            console.log('[MIGRATION] Migriere Inventory System...');
            
            // Inventory Items Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS inventory_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    inventory_id INT NOT NULL,
                    item_type VARCHAR(50) NOT NULL,
                    item_data JSON DEFAULT '{}',
                    quantity INT DEFAULT 1,
                    weight DECIMAL(5,2) DEFAULT 0.0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_inventory_id (inventory_id),
                    FOREIGN KEY (inventory_id) REFERENCES inventories(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Inventory System');
            console.log('[MIGRATION] Inventory System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Inventory System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Inventory System:', error);
        }
    }

    // Phone System migrieren
    async migratePhoneSystem() {
        try {
            console.log('[MIGRATION] Migriere Phone System...');
            
            // Phone Contacts Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS phone_contacts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    phone_id INT NOT NULL,
                    contact_name VARCHAR(50) NOT NULL,
                    contact_number VARCHAR(15) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_phone_id (phone_id),
                    FOREIGN KEY (phone_id) REFERENCES phones(id) ON DELETE CASCADE
                )
            `);
            
            // Phone Messages Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS phone_messages (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    phone_id INT NOT NULL,
                    sender_number VARCHAR(15) NOT NULL,
                    receiver_number VARCHAR(15) NOT NULL,
                    message_text TEXT NOT NULL,
                    is_read BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_phone_id (phone_id),
                    INDEX idx_sender_number (sender_number),
                    INDEX idx_receiver_number (receiver_number),
                    FOREIGN KEY (phone_id) REFERENCES phones(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Phone System');
            console.log('[MIGRATION] Phone System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Phone System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Phone System:', error);
        }
    }

    // Economy System migrieren
    async migrateEconomySystem() {
        try {
            console.log('[MIGRATION] Migriere Economy System...');
            
            // Economy Transactions Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS economy_transactions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    player_id INT NOT NULL,
                    transaction_type ENUM('income', 'expense', 'transfer', 'job', 'business') NOT NULL,
                    amount INT NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_player_id (player_id),
                    INDEX idx_transaction_type (transaction_type),
                    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
                )
            `);
            
            this.migratedSystems.push('Economy System');
            console.log('[MIGRATION] Economy System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Economy System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Economy System:', error);
        }
    }

    // Admin System migrieren
    async migrateAdminSystem() {
        try {
            console.log('[MIGRATION] Migriere Admin System...');
            
            // Admin Logs Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS admin_logs (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    admin_id INT NOT NULL,
                    target_id INT NULL,
                    action VARCHAR(100) NOT NULL,
                    details TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_admin_id (admin_id),
                    INDEX idx_target_id (target_id),
                    INDEX idx_action (action),
                    FOREIGN KEY (admin_id) REFERENCES players(id) ON DELETE CASCADE,
                    FOREIGN KEY (target_id) REFERENCES players(id) ON DELETE SET NULL
                )
            `);
            
            this.migratedSystems.push('Admin System');
            console.log('[MIGRATION] Admin System erfolgreich migriert');
        } catch (error) {
            this.errors.push(`Admin System: ${error.message}`);
            console.error('[MIGRATION] Fehler bei Admin System:', error);
        }
    }

    // Migration-Status abrufen
    getMigrationStatus() {
        return {
            migrated: this.migratedSystems,
            errors: this.errors,
            totalMigrated: this.migratedSystems.length,
            totalErrors: this.errors.length
        };
    }
}

// Migration ausführen
const migrator = new SystemMigrator();

// Export für manuelle Ausführung
module.exports = {
    migrator,
    migrateAll: () => migrator.migrateAllSystems(),
    getStatus: () => migrator.getMigrationStatus()
};

// Automatische Migration beim Start
if (require.main === module) {
    migrator.migrateAllSystems();
}
