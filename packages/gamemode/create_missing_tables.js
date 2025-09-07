// Fehlende Tabellen erstellen - Items, Autos, Waffen, etc.
// Erstellt alle wichtigen Tabellen für den Roleplay-Server

const { query, insert, selectOne, select, update, delete: dbDelete, count } = require('./database');

class MissingTablesCreator {
    constructor() {
        this.createdTables = [];
        this.errors = [];
    }

    // Alle fehlenden Tabellen erstellen
    async createAllMissingTables() {
        console.log('[TABLES] Erstelle fehlende Tabellen...');
        
        try {
            // 0. Core User/Character System (wird separat erstellt)
            
            // 1. Items System
            await this.createItemsTables();
            
            // 2. Fahrzeuge System
            await this.createVehicleTables();
            
            // 3. Waffen System
            await this.createWeaponTables();
            
            // 4. Kleidung System
            await this.createClothingTables();
            
            // 5. Essen/Trinken System
            await this.createFoodTables();
            
            // 6. Drogen System
            await this.createDrugTables();
            
            // 7. Werkzeuge System
            await this.createToolTables();
            
            // 8. Elektronik System
            await this.createElectronicsTables();
            
            // 9. Schmuck System
            await this.createJewelryTables();
            
            // 10. Bücher/Dokumente System
            await this.createDocumentTables();
            
            // 11. Fahrzeug-Kategorien
            await this.createVehicleCategories();
            
            // 12. Waffen-Kategorien
            await this.createWeaponCategories();
            
            // 13. Item-Kategorien
            await this.createItemCategories();
            
            // 14. Standard-Items einfügen
            await this.insertDefaultItems();
            
            // 15. Standard-Fahrzeuge einfügen
            await this.insertDefaultVehicles();
            
            // 16. Standard-Waffen einfügen
            await this.insertDefaultWeapons();
            
            console.log('[TABLES] Alle fehlenden Tabellen erstellt!');
            console.log(`[TABLES] Erfolgreich erstellt: ${this.createdTables.length} Tabellen`);
            
            if (this.errors.length > 0) {
                console.log(`[TABLES] Fehler: ${this.errors.length}`);
                this.errors.forEach(error => console.error('[TABLES] Fehler:', error));
            }
            
        } catch (error) {
            console.error('[TABLES] Kritischer Fehler:', error);
        }
    }

    // Items System Tabellen
    async createItemsTables() {
        try {
            console.log('[TABLES] Erstelle Items System...');
            
            // Item Categories
            await query(`
                CREATE TABLE IF NOT EXISTS item_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    weight_multiplier DECIMAL(3,2) DEFAULT 1.0,
                    stackable BOOLEAN DEFAULT TRUE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Items
            await query(`
                CREATE TABLE IF NOT EXISTS items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    description TEXT,
                    category_id INT NOT NULL,
                    weight DECIMAL(5,2) DEFAULT 0.1,
                    value INT DEFAULT 0,
                    stackable BOOLEAN DEFAULT TRUE,
                    max_stack INT DEFAULT 1,
                    usable BOOLEAN DEFAULT FALSE,
                    consumable BOOLEAN DEFAULT FALSE,
                    rare BOOLEAN DEFAULT FALSE,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES item_categories(id) ON DELETE CASCADE
                )
            `);

            // Item Properties
            await query(`
                CREATE TABLE IF NOT EXISTS item_properties (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    item_id INT NOT NULL,
                    property_key VARCHAR(50) NOT NULL,
                    property_value TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_item_id (item_id),
                    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Items System');
            console.log('[TABLES] Items System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Items System: ${error.message}`);
            console.error('[TABLES] Fehler bei Items System:', error);
        }
    }

    // Fahrzeuge System Tabellen
    async createVehicleTables() {
        try {
            console.log('[TABLES] Erstelle Fahrzeuge System...');
            
            // Vehicle Categories
            await query(`
                CREATE TABLE IF NOT EXISTS vehicle_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Vehicle Models
            await query(`
                CREATE TABLE IF NOT EXISTS vehicle_models (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    model_hash VARCHAR(50) NOT NULL,
                    category_id INT NOT NULL,
                    brand VARCHAR(50),
                    price INT DEFAULT 0,
                    max_speed INT DEFAULT 200,
                    acceleration DECIMAL(3,2) DEFAULT 1.0,
                    braking DECIMAL(3,2) DEFAULT 1.0,
                    handling DECIMAL(3,2) DEFAULT 1.0,
                    seats INT DEFAULT 4,
                    doors INT DEFAULT 4,
                    fuel_capacity INT DEFAULT 100,
                    trunk_capacity INT DEFAULT 50,
                    rare BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES vehicle_categories(id) ON DELETE CASCADE
                )
            `);

            // Vehicle Spawns
            await query(`
                CREATE TABLE IF NOT EXISTS vehicle_spawns (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    model_id INT NOT NULL,
                    position_x FLOAT NOT NULL,
                    position_y FLOAT NOT NULL,
                    position_z FLOAT NOT NULL,
                    rotation FLOAT DEFAULT 0,
                    spawn_chance DECIMAL(3,2) DEFAULT 1.0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_model_id (model_id),
                    FOREIGN KEY (model_id) REFERENCES vehicle_models(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Fahrzeuge System');
            console.log('[TABLES] Fahrzeuge System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Fahrzeuge System: ${error.message}`);
            console.error('[TABLES] Fehler bei Fahrzeuge System:', error);
        }
    }

    // Waffen System Tabellen
    async createWeaponTables() {
        try {
            console.log('[TABLES] Erstelle Waffen System...');
            
            // Weapon Categories
            await query(`
                CREATE TABLE IF NOT EXISTS weapon_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Weapons
            await query(`
                CREATE TABLE IF NOT EXISTS weapons (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    model_hash VARCHAR(50) NOT NULL,
                    category_id INT NOT NULL,
                    damage INT DEFAULT 10,
                    weapon_range INT DEFAULT 100,
                    accuracy DECIMAL(3,2) DEFAULT 1.0,
                    fire_rate INT DEFAULT 600,
                    ammo_capacity INT DEFAULT 30,
                    reload_time DECIMAL(3,2) DEFAULT 2.0,
                    price INT DEFAULT 0,
                    legal BOOLEAN DEFAULT FALSE,
                    rare BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES weapon_categories(id) ON DELETE CASCADE
                )
            `);

            // Weapon Attachments
            await query(`
                CREATE TABLE IF NOT EXISTS weapon_attachments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    weapon_id INT NOT NULL,
                    attachment_type VARCHAR(50) NOT NULL,
                    attachment_name VARCHAR(100) NOT NULL,
                    attachment_hash VARCHAR(50) NOT NULL,
                    stat_bonus JSON DEFAULT '{}',
                    price INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_weapon_id (weapon_id),
                    FOREIGN KEY (weapon_id) REFERENCES weapons(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Waffen System');
            console.log('[TABLES] Waffen System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Waffen System: ${error.message}`);
            console.error('[TABLES] Fehler bei Waffen System:', error);
        }
    }

    // Kleidung System Tabellen
    async createClothingTables() {
        try {
            console.log('[TABLES] Erstelle Kleidung System...');
            
            // Clothing Categories
            await query(`
                CREATE TABLE IF NOT EXISTS clothing_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Clothing Items
            await query(`
                CREATE TABLE IF NOT EXISTS clothing_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    component_id INT NOT NULL,
                    drawable_id INT NOT NULL,
                    texture_id INT DEFAULT 0,
                    price INT DEFAULT 0,
                    gender ENUM('male', 'female', 'unisex') DEFAULT 'unisex',
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES clothing_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Kleidung System');
            console.log('[TABLES] Kleidung System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Kleidung System: ${error.message}`);
            console.error('[TABLES] Fehler bei Kleidung System:', error);
        }
    }

    // Essen/Trinken System Tabellen
    async createFoodTables() {
        try {
            console.log('[TABLES] Erstelle Essen/Trinken System...');
            
            // Food Categories
            await query(`
                CREATE TABLE IF NOT EXISTS food_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Food Items
            await query(`
                CREATE TABLE IF NOT EXISTS food_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    hunger_restore INT DEFAULT 10,
                    thirst_restore INT DEFAULT 10,
                    health_restore INT DEFAULT 0,
                    price INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES food_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Essen/Trinken System');
            console.log('[TABLES] Essen/Trinken System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Essen/Trinken System: ${error.message}`);
            console.error('[TABLES] Fehler bei Essen/Trinken System:', error);
        }
    }

    // Drogen System Tabellen
    async createDrugTables() {
        try {
            console.log('[TABLES] Erstelle Drogen System...');
            
            // Drug Categories
            await query(`
                CREATE TABLE IF NOT EXISTS drug_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    legal BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Drug Items
            await query(`
                CREATE TABLE IF NOT EXISTS drug_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    effect_duration INT DEFAULT 300,
                    effect_strength DECIMAL(3,2) DEFAULT 1.0,
                    addiction_level INT DEFAULT 0,
                    price INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES drug_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Drogen System');
            console.log('[TABLES] Drogen System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Drogen System: ${error.message}`);
            console.error('[TABLES] Fehler bei Drogen System:', error);
        }
    }

    // Werkzeuge System Tabellen
    async createToolTables() {
        try {
            console.log('[TABLES] Erstelle Werkzeuge System...');
            
            // Tool Categories
            await query(`
                CREATE TABLE IF NOT EXISTS tool_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Tool Items
            await query(`
                CREATE TABLE IF NOT EXISTS tool_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    durability INT DEFAULT 100,
                    efficiency DECIMAL(3,2) DEFAULT 1.0,
                    price INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES tool_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Werkzeuge System');
            console.log('[TABLES] Werkzeuge System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Werkzeuge System: ${error.message}`);
            console.error('[TABLES] Fehler bei Werkzeuge System:', error);
        }
    }

    // Elektronik System Tabellen
    async createElectronicsTables() {
        try {
            console.log('[TABLES] Erstelle Elektronik System...');
            
            // Electronics Categories
            await query(`
                CREATE TABLE IF NOT EXISTS electronics_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Electronics Items
            await query(`
                CREATE TABLE IF NOT EXISTS electronics_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    battery_life INT DEFAULT 100,
                    functionality JSON DEFAULT '{}',
                    price INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES electronics_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Elektronik System');
            console.log('[TABLES] Elektronik System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Elektronik System: ${error.message}`);
            console.error('[TABLES] Fehler bei Elektronik System:', error);
        }
    }

    // Schmuck System Tabellen
    async createJewelryTables() {
        try {
            console.log('[TABLES] Erstelle Schmuck System...');
            
            // Jewelry Categories
            await query(`
                CREATE TABLE IF NOT EXISTS jewelry_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Jewelry Items
            await query(`
                CREATE TABLE IF NOT EXISTS jewelry_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    material VARCHAR(50),
                    carat DECIMAL(3,2) DEFAULT 0.0,
                    price INT DEFAULT 0,
                    rare BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES jewelry_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Schmuck System');
            console.log('[TABLES] Schmuck System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Schmuck System: ${error.message}`);
            console.error('[TABLES] Fehler bei Schmuck System:', error);
        }
    }

    // Bücher/Dokumente System Tabellen
    async createDocumentTables() {
        try {
            console.log('[TABLES] Erstelle Bücher/Dokumente System...');
            
            // Document Categories
            await query(`
                CREATE TABLE IF NOT EXISTS document_categories (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(50) UNIQUE NOT NULL,
                    description TEXT,
                    icon VARCHAR(100),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // Document Items
            await query(`
                CREATE TABLE IF NOT EXISTS document_items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) UNIQUE NOT NULL,
                    category_id INT NOT NULL,
                    content TEXT,
                    pages INT DEFAULT 1,
                    price INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    INDEX idx_category_id (category_id),
                    INDEX idx_name (name),
                    FOREIGN KEY (category_id) REFERENCES document_categories(id) ON DELETE CASCADE
                )
            `);

            this.createdTables.push('Bücher/Dokumente System');
            console.log('[TABLES] Bücher/Dokumente System erfolgreich erstellt');
        } catch (error) {
            this.errors.push(`Bücher/Dokumente System: ${error.message}`);
            console.error('[TABLES] Fehler bei Bücher/Dokumente System:', error);
        }
    }

    // Standard-Kategorien erstellen
    async createItemCategories() {
        try {
            console.log('[TABLES] Erstelle Standard-Item-Kategorien...');
            
            const categories = [
                { name: 'Waffen', description: 'Verschiedene Waffen', icon: 'weapon.png' },
                { name: 'Fahrzeuge', description: 'Fahrzeuge und Transportmittel', icon: 'vehicle.png' },
                { name: 'Kleidung', description: 'Kleidung und Accessoires', icon: 'clothing.png' },
                { name: 'Essen', description: 'Essen und Lebensmittel', icon: 'food.png' },
                { name: 'Trinken', description: 'Getränke und Flüssigkeiten', icon: 'drink.png' },
                { name: 'Drogen', description: 'Drogen und Substanzen', icon: 'drug.png' },
                { name: 'Werkzeuge', description: 'Werkzeuge und Utensilien', icon: 'tool.png' },
                { name: 'Elektronik', description: 'Elektronische Geräte', icon: 'electronics.png' },
                { name: 'Schmuck', description: 'Schmuck und Accessoires', icon: 'jewelry.png' },
                { name: 'Dokumente', description: 'Bücher und Dokumente', icon: 'document.png' },
                { name: 'Misc', description: 'Verschiedenes', icon: 'misc.png' }
            ];

            for (const category of categories) {
                try {
                    await insert('item_categories', category);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            console.log('[TABLES] Standard-Item-Kategorien erstellt');
        } catch (error) {
            console.error('[TABLES] Fehler bei Item-Kategorien:', error);
        }
    }

    // Standard-Fahrzeug-Kategorien erstellen
    async createVehicleCategories() {
        try {
            console.log('[TABLES] Erstelle Standard-Fahrzeug-Kategorien...');
            
            const categories = [
                { name: 'Autos', description: 'Personenwagen', icon: 'car.png' },
                { name: 'Motorräder', description: 'Zweirad-Fahrzeuge', icon: 'motorcycle.png' },
                { name: 'LKW', description: 'Lastkraftwagen', icon: 'truck.png' },
                { name: 'Busse', description: 'Busse und Reisebusse', icon: 'bus.png' },
                { name: 'Boote', description: 'Wasserfahrzeuge', icon: 'boat.png' },
                { name: 'Flugzeuge', description: 'Luftfahrzeuge', icon: 'plane.png' },
                { name: 'Helikopter', description: 'Hubschrauber', icon: 'helicopter.png' },
                { name: 'Fahrräder', description: 'Fahrräder und E-Bikes', icon: 'bicycle.png' }
            ];

            for (const category of categories) {
                try {
                    await insert('vehicle_categories', category);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            console.log('[TABLES] Standard-Fahrzeug-Kategorien erstellt');
        } catch (error) {
            console.error('[TABLES] Fehler bei Fahrzeug-Kategorien:', error);
        }
    }

    // Standard-Waffen-Kategorien erstellen
    async createWeaponCategories() {
        try {
            console.log('[TABLES] Erstelle Standard-Waffen-Kategorien...');
            
            const categories = [
                { name: 'Pistolen', description: 'Handfeuerwaffen', icon: 'pistol.png' },
                { name: 'Gewehre', description: 'Langwaffen', icon: 'rifle.png' },
                { name: 'Schrotflinten', description: 'Schrotflinten', icon: 'shotgun.png' },
                { name: 'Maschinengewehre', description: 'Automatische Waffen', icon: 'machinegun.png' },
                { name: 'Sniper', description: 'Präzisionswaffen', icon: 'sniper.png' },
                { name: 'Explosiv', description: 'Sprengstoffe', icon: 'explosive.png' },
                { name: 'Nahkampf', description: 'Nahkampfwaffen', icon: 'melee.png' },
                { name: 'Wurfwaffen', description: 'Wurfgeschosse', icon: 'thrown.png' }
            ];

            for (const category of categories) {
                try {
                    await insert('weapon_categories', category);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            console.log('[TABLES] Standard-Waffen-Kategorien erstellt');
        } catch (error) {
            console.error('[TABLES] Fehler bei Waffen-Kategorien:', error);
        }
    }

    // Standard-Items einfügen
    async insertDefaultItems() {
        try {
            console.log('[TABLES] Füge Standard-Items ein...');
            
            // Essen Items
            const foodItems = [
                { name: 'Apfel', description: 'Ein frischer Apfel', category_id: 4, weight: 0.2, value: 5, consumable: true },
                { name: 'Brot', description: 'Ein Laib Brot', category_id: 4, weight: 0.5, value: 10, consumable: true },
                { name: 'Wasser', description: 'Eine Flasche Wasser', category_id: 5, weight: 0.3, value: 3, consumable: true },
                { name: 'Kaffee', description: 'Eine Tasse Kaffee', category_id: 5, weight: 0.2, value: 8, consumable: true }
            ];

            for (const item of foodItems) {
                try {
                    await insert('items', item);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            // Werkzeug Items
            const toolItems = [
                { name: 'Hammer', description: 'Ein Werkzeug', category_id: 7, weight: 1.0, value: 25, usable: true },
                { name: 'Schraubendreher', description: 'Ein Schraubendreher', category_id: 7, weight: 0.3, value: 15, usable: true },
                { name: 'Zange', description: 'Eine Zange', category_id: 7, weight: 0.5, value: 20, usable: true }
            ];

            for (const item of toolItems) {
                try {
                    await insert('items', item);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            console.log('[TABLES] Standard-Items eingefügt');
        } catch (error) {
            console.error('[TABLES] Fehler bei Standard-Items:', error);
        }
    }

    // Standard-Fahrzeuge einfügen
    async insertDefaultVehicles() {
        try {
            console.log('[TABLES] Füge Standard-Fahrzeuge ein...');
            
            const vehicles = [
                { name: 'Adder', model_hash: 'adder', category_id: 1, brand: 'Truffade', price: 1000000, max_speed: 250, seats: 2 },
                { name: 'Zentorno', model_hash: 'zentorno', category_id: 1, brand: 'Pegassi', price: 725000, max_speed: 240, seats: 2 },
                { name: 'Entity XF', model_hash: 'entityxf', category_id: 1, brand: 'Overflod', price: 795000, max_speed: 245, seats: 2 },
                { name: 'Banshee', model_hash: 'banshee', category_id: 1, brand: 'Bravado', price: 105000, max_speed: 200, seats: 2 },
                { name: 'Sultan', model_hash: 'sultan', category_id: 1, brand: 'Karin', price: 12000, max_speed: 180, seats: 4 },
                { name: 'Elegy', model_hash: 'elegy2', category_id: 1, brand: 'Annis', price: 0, max_speed: 190, seats: 4 },
                { name: 'Akuma', model_hash: 'akuma', category_id: 2, brand: 'Dinka', price: 9000, max_speed: 180, seats: 2 },
                { name: 'Bati 801', model_hash: 'bati', category_id: 2, brand: 'Pegassi', price: 15000, max_speed: 200, seats: 2 }
            ];

            for (const vehicle of vehicles) {
                try {
                    await insert('vehicle_models', vehicle);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            console.log('[TABLES] Standard-Fahrzeuge eingefügt');
        } catch (error) {
            console.error('[TABLES] Fehler bei Standard-Fahrzeugen:', error);
        }
    }

    // Standard-Waffen einfügen
    async insertDefaultWeapons() {
        try {
            console.log('[TABLES] Füge Standard-Waffen ein...');
            
            const weapons = [
                { name: 'Pistole', model_hash: 'weapon_pistol', category_id: 1, damage: 25, weapon_range: 50, price: 500, legal: false },
                { name: 'Combat Pistol', model_hash: 'weapon_combatpistol', category_id: 1, damage: 30, weapon_range: 60, price: 800, legal: false },
                { name: 'AK-47', model_hash: 'weapon_assaultrifle', category_id: 2, damage: 60, weapon_range: 150, price: 5000, legal: false },
                { name: 'M4A1', model_hash: 'weapon_carbinerifle', category_id: 2, damage: 55, weapon_range: 140, price: 4500, legal: false },
                { name: 'Pumpgun', model_hash: 'weapon_pumpshotgun', category_id: 3, damage: 80, weapon_range: 30, price: 1200, legal: false },
                { name: 'Messer', model_hash: 'weapon_knife', category_id: 7, damage: 20, weapon_range: 2, price: 50, legal: true }
            ];

            for (const weapon of weapons) {
                try {
                    await insert('weapons', weapon);
                } catch (error) {
                    if (error.code !== 'ER_DUP_ENTRY') {
                        throw error;
                    }
                }
            }

            console.log('[TABLES] Standard-Waffen eingefügt');
        } catch (error) {
            console.error('[TABLES] Fehler bei Standard-Waffen:', error);
        }
    }

    // Status abrufen
    getCreationStatus() {
        return {
            created: this.createdTables,
            errors: this.errors,
            totalCreated: this.createdTables.length,
            totalErrors: this.errors.length
        };
    }
}

// Tabellen-Erstellung ausführen
const tableCreator = new MissingTablesCreator();

// Export für manuelle Ausführung
module.exports = {
    tableCreator,
    createAll: () => tableCreator.createAllMissingTables(),
    getStatus: () => tableCreator.getCreationStatus()
};

// Automatische Tabellen-Erstellung beim Start
if (require.main === module) {
    tableCreator.createAllMissingTables();
}
