// Tuning Shop System - Erweiterte Fahrzeug-Tuning-Funktionalität basierend auf Tutorial
// Behandelt alle Tuning-Shop-Funktionen für Horizont-City Roleplay

const tuningShopSystem = {
    // Tuning-Kategorien
    tuningCategories: {
        PAINT: { name: 'Lackierung', type: 'paint', level: 1 },
        WHEELS: { name: 'Felgen', type: 'wheels', level: 2 },
        SPOILER: { name: 'Spoiler', type: 'spoiler', level: 2 },
        FRONT_BUMPER: { name: 'Frontstoßstange', type: 'front_bumper', level: 3 },
        REAR_BUMPER: { name: 'Heckstoßstange', type: 'rear_bumper', level: 3 },
        SIDE_SKIRTS: { name: 'Seitenschweller', type: 'side_skirts', level: 3 },
        EXHAUST: { name: 'Auspuff', type: 'exhaust', level: 2 },
        FRAME: { name: 'Rahmen', type: 'frame', level: 4 },
        GRILLE: { name: 'Kühlergrill', type: 'grille', level: 2 },
        HOOD: { name: 'Motorhaube', type: 'hood', level: 3 },
        FENDER: { name: 'Kotflügel', type: 'fender', level: 4 },
        RIGHT_FENDER: { name: 'Rechter Kotflügel', type: 'right_fender', level: 4 },
        ROOF: { name: 'Dach', type: 'roof', level: 3 },
        ENGINE: { name: 'Motor', type: 'engine', level: 5 },
        BRAKES: { name: 'Bremsen', type: 'brakes', level: 3 },
        TRANSMISSION: { name: 'Getriebe', type: 'transmission', level: 4 },
        HORNS: { name: 'Hupe', type: 'horns', level: 1 },
        SUSPENSION: { name: 'Fahrwerk', type: 'suspension', level: 3 },
        ARMOR: { name: 'Panzerung', type: 'armor', level: 6 },
        TURBO: { name: 'Turbo', type: 'turbo', level: 5 },
        XENON_LIGHTS: { name: 'Xenon-Scheinwerfer', type: 'xenon_lights', level: 2 },
        WINDOW_TINT: { name: 'Fensterfolie', type: 'window_tint', level: 1 },
        PLATES: { name: 'Kennzeichen', type: 'plates', level: 1 },
        NEON: { name: 'Neon-Beleuchtung', type: 'neon', level: 3 },
        TRIM: { name: 'Verkleidung', type: 'trim', level: 2 },
        ORNAMENTS: { name: 'Ornamente', type: 'ornaments', level: 1 },
        DIALS: { name: 'Instrumente', type: 'dials', level: 2 },
        SPEAKERS: { name: 'Lautsprecher', type: 'speakers', level: 2 },
        TRUNK: { name: 'Kofferraum', type: 'trunk', level: 2 },
        HYDRAULICS: { name: 'Hydraulik', type: 'hydraulics', level: 4 },
        LIVERIES: { name: 'Lackierungen', type: 'liveries', level: 3 }
    },
    
    // Tuning-Items
    tuningItems: {
        // Lackierungen
        paint_red: { name: 'Rote Lackierung', category: 'PAINT', price: 200, value: { r: 255, g: 0, b: 0 }, level: 1 },
        paint_blue: { name: 'Blaue Lackierung', category: 'PAINT', price: 200, value: { r: 0, g: 0, b: 255 }, level: 1 },
        paint_green: { name: 'Grüne Lackierung', category: 'PAINT', price: 200, value: { r: 0, g: 255, b: 0 }, level: 1 },
        paint_black: { name: 'Schwarze Lackierung', category: 'PAINT', price: 250, value: { r: 0, g: 0, b: 0 }, level: 1 },
        paint_white: { name: 'Weiße Lackierung', category: 'PAINT', price: 250, value: { r: 255, g: 255, b: 255 }, level: 1 },
        paint_gold: { name: 'Goldene Lackierung', category: 'PAINT', price: 500, value: { r: 255, g: 215, b: 0 }, level: 2 },
        paint_chrome: { name: 'Chrom-Lackierung', category: 'PAINT', price: 750, value: { r: 192, g: 192, b: 192 }, level: 3 },
        
        // Felgen
        wheels_sport: { name: 'Sport-Felgen', category: 'WHEELS', price: 800, value: 0, level: 2 },
        wheels_luxury: { name: 'Luxus-Felgen', category: 'WHEELS', price: 1200, value: 1, level: 3 },
        wheels_tuner: { name: 'Tuner-Felgen', category: 'WHEELS', price: 1000, value: 2, level: 2 },
        wheels_offroad: { name: 'Gelände-Felgen', category: 'WHEELS', price: 600, value: 3, level: 2 },
        wheels_suv: { name: 'SUV-Felgen', category: 'WHEELS', price: 900, value: 4, level: 2 },
        
        // Spoiler
        spoiler_sport: { name: 'Sport-Spoiler', category: 'SPOILER', price: 500, value: 0, level: 2 },
        spoiler_race: { name: 'Renn-Spoiler', category: 'SPOILER', price: 800, value: 1, level: 3 },
        spoiler_drag: { name: 'Drag-Spoiler', category: 'SPOILER', price: 1200, value: 2, level: 4 },
        
        // Motor-Upgrades
        engine_turbo: { name: 'Turbo-Motor', category: 'TURBO', price: 2000, value: 1, level: 5 },
        engine_supercharger: { name: 'Kompressor', category: 'TURBO', price: 3000, value: 2, level: 6 },
        
        // Fahrwerk
        suspension_lowering: { name: 'Tieferlegung', category: 'SUSPENSION', price: 600, value: 1, level: 3 },
        suspension_racing: { name: 'Renn-Fahrwerk', category: 'SUSPENSION', price: 1000, value: 2, level: 4 },
        
        // Bremsen
        brakes_sport: { name: 'Sport-Bremsen', category: 'BRAKES', price: 800, value: 1, level: 3 },
        brakes_racing: { name: 'Renn-Bremsen', category: 'BRAKES', price: 1500, value: 2, level: 4 },
        
        // Getriebe
        transmission_sport: { name: 'Sport-Getriebe', category: 'TRANSMISSION', price: 1200, value: 1, level: 4 },
        transmission_racing: { name: 'Renn-Getriebe', category: 'TRANSMISSION', price: 2000, value: 2, level: 5 },
        
        // Neon-Beleuchtung
        neon_blue: { name: 'Blaue Neon-Beleuchtung', category: 'NEON', price: 400, value: { r: 0, g: 0, b: 255 }, level: 3 },
        neon_red: { name: 'Rote Neon-Beleuchtung', category: 'NEON', price: 400, value: { r: 255, g: 0, b: 0 }, level: 3 },
        neon_green: { name: 'Grüne Neon-Beleuchtung', category: 'NEON', price: 400, value: { r: 0, g: 255, b: 0 }, level: 3 },
        neon_pink: { name: 'Pinke Neon-Beleuchtung', category: 'NEON', price: 400, value: { r: 255, g: 20, b: 147 }, level: 3 },
        
        // Fensterfolie
        tint_light: { name: 'Leichte Folie', category: 'WINDOW_TINT', price: 150, value: 1, level: 1 },
        tint_medium: { name: 'Mittlere Folie', category: 'WINDOW_TINT', price: 200, value: 2, level: 1 },
        tint_dark: { name: 'Dunkle Folie', category: 'WINDOW_TINT', price: 250, value: 3, level: 2 },
        tint_limo: { name: 'Limo-Folie', category: 'WINDOW_TINT', price: 300, value: 4, level: 2 },
        
        // Xenon-Scheinwerfer
        xenon_white: { name: 'Weiße Xenon-Scheinwerfer', category: 'XENON_LIGHTS', price: 300, value: 0, level: 2 },
        xenon_blue: { name: 'Blaue Xenon-Scheinwerfer', category: 'XENON_LIGHTS', price: 350, value: 1, level: 2 },
        xenon_purple: { name: 'Lila Xenon-Scheinwerfer', category: 'XENON_LIGHTS', price: 400, value: 2, level: 3 },
        
        // Panzerung
        armor_level1: { name: 'Panzerung Level 1', category: 'ARMOR', price: 1000, value: 1, level: 6 },
        armor_level2: { name: 'Panzerung Level 2', category: 'ARMOR', price: 2000, value: 2, level: 7 },
        armor_level3: { name: 'Panzerung Level 3', category: 'ARMOR', price: 3000, value: 3, level: 8 },
        
        // Hydraulik
        hydraulics_basic: { name: 'Basis-Hydraulik', category: 'HYDRAULICS', price: 1500, value: 1, level: 4 },
        hydraulics_advanced: { name: 'Erweiterte Hydraulik', category: 'HYDRAULICS', price: 2500, value: 2, level: 5 }
    },
    
    // Tuning-Shops
    tuningShops: new Map(),
    
    // Fahrzeug-Tuning-Daten
    vehicleTunings: new Map(),
    
    // Tuning-Statistiken
    tuningStats: {
        totalTuningsSold: 0,
        totalRevenue: 0,
        activeShops: 0,
        mostPopularCategory: null,
        totalVehiclesTuned: 0
    },
    
    // Tuning Shop System-Initialisierung
    init() {
        this.initializeTuningShops();
        console.log('[TUNING_SHOP] Tuning-Shop-System initialisiert');
    },
    
    // Tuning-Shops initialisieren
    initializeTuningShops() {
        // Haupttuning-Shop
        const mainShop = {
            id: 'tuning_shop_main',
            name: 'Haupttuning-Shop',
            location: { x: -205.0, y: -1309.0, z: 31.3 },
            blip: { sprite: 72, color: 5 },
            categories: Object.keys(this.tuningCategories),
            level: 10,
            created: Date.now()
        };
        
        // Sporttuning-Shop
        const sportShop = {
            id: 'tuning_shop_sport',
            name: 'Sporttuning-Shop',
            location: { x: 1175.0, y: 2640.0, z: 37.8 },
            blip: { sprite: 72, color: 5 },
            categories: ['PAINT', 'WHEELS', 'SPOILER', 'TURBO', 'SUSPENSION', 'BRAKES', 'TRANSMISSION'],
            level: 8,
            created: Date.now()
        };
        
        // Luxus-Tuning-Shop
        const luxuryShop = {
            id: 'tuning_shop_luxury',
            name: 'Luxus-Tuning-Shop',
            location: { x: -337.0, y: -136.0, z: 39.0 },
            blip: { sprite: 72, color: 5 },
            categories: ['PAINT', 'WHEELS', 'NEON', 'XENON_LIGHTS', 'WINDOW_TINT', 'ARMOR'],
            level: 6,
            created: Date.now()
        };
        
        this.tuningShops.set(mainShop.id, mainShop);
        this.tuningShops.set(sportShop.id, sportShop);
        this.tuningShops.set(luxuryShop.id, luxuryShop);
        
        // Colshapes erstellen
        this.createShopColshapes();
    },
    
    // Shop-Colshapes erstellen
    createShopColshapes() {
        this.tuningShops.forEach(shop => {
            const colshape = mp.colshapes.newSphere(
                shop.location.x, 
                shop.location.y, 
                shop.location.z, 
                5.0
            );
            colshape.shopId = shop.id;
            colshape.shopType = 'tuning';
            
            // Blip erstellen
            const blip = mp.blips.new(shop.blip.sprite, new mp.Vector3(
                shop.location.x, 
                shop.location.y, 
                shop.location.z
            ), {
                name: shop.name,
                color: shop.blip.color,
                shortRange: true
            });
        });
    },
    
    // Tuning kaufen und anwenden
    buyTuning(player, itemId, shopId) {
        if (!player.vehicle) {
            player.outputChatBox('Du musst in einem Fahrzeug sein!');
            return false;
        }
        
        const shop = this.tuningShops.get(shopId);
        if (!shop) {
            player.outputChatBox('Tuning-Shop nicht gefunden!');
            return false;
        }
        
        const item = this.tuningItems[itemId];
        if (!item) {
            player.outputChatBox('Tuning-Item nicht gefunden!');
            return false;
        }
        
        const category = this.tuningCategories[item.category];
        if (!category) {
            player.outputChatBox('Tuning-Kategorie nicht gefunden!');
            return false;
        }
        
        // Verfügbarkeit prüfen
        if (!shop.categories.includes(item.category)) {
            player.outputChatBox('Dieses Tuning ist in diesem Shop nicht verfügbar!');
            return false;
        }
        
        // Level prüfen
        if (item.level > shop.level) {
            player.outputChatBox('Dein Level ist zu niedrig für dieses Tuning!');
            return false;
        }
        
        // Geld prüfen
        if (player.money < item.price) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${item.price}`);
            return false;
        }
        
        // Tuning anwenden
        const success = this.applyTuning(player.vehicle, item, category);
        if (!success) {
            player.outputChatBox('Fehler beim Anwenden des Tunings!');
            return false;
        }
        
        // Tuning speichern
        this.saveVehicleTuning(player.vehicle, item, category);
        
        // Geld abziehen
        player.money -= item.price;
        
        // Statistiken aktualisieren
        this.tuningStats.totalTuningsSold++;
        this.tuningStats.totalRevenue += item.price;
        this.tuningStats.totalVehiclesTuned++;
        
        player.outputChatBox(`${item.name} für $${item.price} gekauft und angewendet!`);
        player.call('ui:show', 'TuningApplied', { item: item, category: category });
        
        console.log(`[TUNING_SHOP] Spieler ${player.id} kaufte ${item.name}`);
        return true;
    },
    
    // Tuning anwenden
    applyTuning(vehicle, item, category) {
        try {
            switch (category.type) {
                case 'paint':
                    if (item.value.r !== undefined) {
                        vehicle.setColorRGB(item.value.r, item.value.g, item.value.b);
                    }
                    break;
                    
                case 'wheels':
                    vehicle.setMod(23, item.value); // Felgen
                    break;
                    
                case 'spoiler':
                    vehicle.setMod(0, item.value); // Spoiler
                    break;
                    
                case 'front_bumper':
                    vehicle.setMod(1, item.value); // Frontstoßstange
                    break;
                    
                case 'rear_bumper':
                    vehicle.setMod(2, item.value); // Heckstoßstange
                    break;
                    
                case 'side_skirts':
                    vehicle.setMod(3, item.value); // Seitenschweller
                    break;
                    
                case 'exhaust':
                    vehicle.setMod(4, item.value); // Auspuff
                    break;
                    
                case 'frame':
                    vehicle.setMod(5, item.value); // Rahmen
                    break;
                    
                case 'grille':
                    vehicle.setMod(6, item.value); // Kühlergrill
                    break;
                    
                case 'hood':
                    vehicle.setMod(7, item.value); // Motorhaube
                    break;
                    
                case 'fender':
                    vehicle.setMod(8, item.value); // Kotflügel
                    break;
                    
                case 'right_fender':
                    vehicle.setMod(9, item.value); // Rechter Kotflügel
                    break;
                    
                case 'roof':
                    vehicle.setMod(10, item.value); // Dach
                    break;
                    
                case 'engine':
                    vehicle.setMod(11, item.value); // Motor
                    break;
                    
                case 'brakes':
                    vehicle.setMod(12, item.value); // Bremsen
                    break;
                    
                case 'transmission':
                    vehicle.setMod(13, item.value); // Getriebe
                    break;
                    
                case 'horns':
                    vehicle.setMod(14, item.value); // Hupe
                    break;
                    
                case 'suspension':
                    vehicle.setMod(15, item.value); // Fahrwerk
                    break;
                    
                case 'armor':
                    vehicle.setMod(16, item.value); // Panzerung
                    break;
                    
                case 'turbo':
                    vehicle.toggleMod(18, true); // Turbo
                    break;
                    
                case 'xenon_lights':
                    vehicle.toggleMod(22, true); // Xenon-Scheinwerfer
                    break;
                    
                case 'window_tint':
                    vehicle.setWindowTint(item.value); // Fensterfolie
                    break;
                    
                case 'neon':
                    if (item.value.r !== undefined) {
                        vehicle.setNeonLightsColour(item.value.r, item.value.g, item.value.b);
                        vehicle.setNeonLightsOn(true);
                    }
                    break;
                    
                case 'plates':
                    vehicle.setNumberPlateText(`TUNED${Math.floor(Math.random() * 1000)}`);
                    break;
                    
                default:
                    return false;
            }
            
            return true;
        } catch (error) {
            console.error('[TUNING_SHOP] Fehler beim Anwenden des Tunings:', error);
            return false;
        }
    },
    
    // Fahrzeug-Tuning speichern
    saveVehicleTuning(vehicle, item, category) {
        const vehicleId = vehicle.id.toString();
        if (!this.vehicleTunings.has(vehicleId)) {
            this.vehicleTunings.set(vehicleId, {});
        }
        
        const tuning = this.vehicleTunings.get(vehicleId);
        tuning[category.type] = {
            itemId: item.name,
            value: item.value,
            applied: new Date()
        };
        
        this.vehicleTunings.set(vehicleId, tuning);
    },
    
    // Fahrzeug-Tuning laden
    loadVehicleTuning(vehicle) {
        const vehicleId = vehicle.id.toString();
        const tuning = this.vehicleTunings.get(vehicleId);
        
        if (!tuning) return false;
        
        Object.keys(tuning).forEach(categoryType => {
            const tuningData = tuning[categoryType];
            const category = Object.values(this.tuningCategories).find(cat => cat.type === categoryType);
            
            if (category) {
                const item = {
                    name: tuningData.itemId,
                    value: tuningData.value
                };
                this.applyTuning(vehicle, item, category);
            }
        });
        
        return true;
    },
    
    // Verfügbare Tuning-Items anzeigen
    showTuningItems(player, shopId, category = null) {
        const shop = this.tuningShops.get(shopId);
        if (!shop) {
            player.outputChatBox('Tuning-Shop nicht gefunden!');
            return false;
        }
        
        let items = Object.values(this.tuningItems);
        
        // Nach Kategorie filtern
        if (category) {
            items = items.filter(item => item.category === category);
        }
        
        // Nach Shop-Verfügbarkeit filtern
        items = items.filter(item => 
            shop.categories.includes(item.category) && 
            item.level <= shop.level
        );
        
        player.outputChatBox(`=== Verfügbare Tuning-Items in ${shop.name} ===`);
        items.forEach(item => {
            const categoryName = this.tuningCategories[item.category].name;
            player.outputChatBox(`${item.name} (${categoryName}): $${item.price} (Level ${item.level})`);
        });
        
        return true;
    },
    
    // Tuning-Statistiken
    getStatistics() {
        return {
            ...this.tuningStats,
            totalShops: this.tuningShops.size,
            totalItems: Object.keys(this.tuningItems).length,
            totalCategories: Object.keys(this.tuningCategories).length,
            tunedVehicles: this.vehicleTunings.size
        };
    }
};

// Events
mp.events.add('tuning_shop:buyTuning', (player, itemId, shopId) => {
    tuningShopSystem.buyTuning(player, itemId, shopId);
});

mp.events.add('tuning_shop:showItems', (player, shopId, category) => {
    tuningShopSystem.showTuningItems(player, shopId, category);
});

mp.events.add('tuning_shop:loadTuning', (player, vehicle) => {
    tuningShopSystem.loadVehicleTuning(vehicle);
});

// Colshape Events
mp.events.add('playerEnterColshape', (player, shape) => {
    if (shape.shopType === 'tuning' && player.vehicle) {
        const shop = tuningShopSystem.tuningShops.get(shape.shopId);
        if (shop) {
            player.call('ui:show', 'TuningShop', { shop: shop });
        }
    }
});

// Vehicle Events
mp.events.add('vehicleSpawn', (vehicle) => {
    tuningShopSystem.loadVehicleTuning(vehicle);
});

// Commands
mp.events.addCommand('tuning', (player, fullText, action, itemId, category) => {
    if (!action) {
        player.outputChatBox('Verwendung: /tuning [show|buy] [item] [kategorie]');
        player.outputChatBox('Verfügbare Aktionen: show, buy');
        player.outputChatBox('Verfügbare Kategorien: PAINT, WHEELS, SPOILER, TURBO, etc.');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'show':
            tuningShopSystem.showTuningItems(player, 'tuning_shop_main', category);
            break;
            
        case 'buy':
            if (itemId) {
                tuningShopSystem.buyTuning(player, itemId, 'tuning_shop_main');
            } else {
                player.outputChatBox('Item-ID erforderlich!');
            }
            break;
    }
});

// Tuning Shop System initialisieren
tuningShopSystem.init();

module.exports = tuningShopSystem;
