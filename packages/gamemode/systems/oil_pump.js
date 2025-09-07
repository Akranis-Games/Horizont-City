// Oil Pump System - Öl-Pumpen-System mit Förderung und Verarbeitung
// Behandelt alle Öl-Pumpen-Funktionen für Horizont-City Roleplay

const oilPumpSystem = {
    // Öl-Typen
    oilTypes: {
        CRUDE_OIL: 'crude_oil',
        REFINED_OIL: 'refined_oil',
        GASOLINE: 'gasoline',
        DIESEL: 'diesel',
        KEROSENE: 'kerosene',
        LUBRICANT: 'lubricant',
        HEATING_OIL: 'heating_oil',
        BITUMEN: 'bitumen',
        NATURAL_GAS: 'natural_gas',
        LPG: 'lpg'
    },
    
    // Pumpen-Typen
    pumpTypes: {
        ONSHORE: 'onshore',
        OFFSHORE: 'offshore',
        DRILLING: 'drilling',
        PUMPING: 'pumping',
        FRACKING: 'fracking',
        DEEP_WATER: 'deep_water',
        ARCTIC: 'arctic',
        DESERT: 'desert',
        URBAN: 'urban',
        CUSTOM: 'custom'
    },
    
    // Öl-Konfiguration
    oilConfig: {
        crude_oil: {
            name: 'Rohöl',
            type: 'crude_oil',
            category: 'raw',
            quality: 'standard',
            price: 50,
            density: 0.85,
            sulfur: 2.5,
            viscosity: 'medium',
            color: 'black',
            processing: ['refining', 'distillation'],
            uses: ['fuel', 'plastics', 'chemicals'],
            productionTime: 3600, // 1 Stunde
            skill: 'drilling',
            equipment: ['pump', 'storage_tank', 'pipeline']
        },
        refined_oil: {
            name: 'Raffiniertes Öl',
            type: 'refined_oil',
            category: 'processed',
            quality: 'premium',
            price: 80,
            density: 0.82,
            sulfur: 0.5,
            viscosity: 'low',
            color: 'amber',
            processing: ['distillation', 'cracking'],
            uses: ['fuel', 'lubricants', 'chemicals'],
            productionTime: 7200, // 2 Stunden
            skill: 'refining',
            equipment: ['refinery', 'distillation_tower', 'storage_tank']
        },
        gasoline: {
            name: 'Benzin',
            type: 'gasoline',
            category: 'fuel',
            quality: 'premium',
            price: 120,
            octane: 95,
            density: 0.75,
            viscosity: 'low',
            color: 'clear',
            processing: ['refining', 'blending'],
            uses: ['vehicle_fuel', 'generators'],
            productionTime: 5400, // 1.5 Stunden
            skill: 'refining',
            equipment: ['refinery', 'blending_tank', 'storage_tank']
        },
        diesel: {
            name: 'Diesel',
            type: 'diesel',
            category: 'fuel',
            quality: 'standard',
            price: 100,
            octane: 50,
            density: 0.83,
            viscosity: 'medium',
            color: 'yellow',
            processing: ['refining', 'distillation'],
            uses: ['vehicle_fuel', 'generators', 'heating'],
            productionTime: 5400, // 1.5 Stunden
            skill: 'refining',
            equipment: ['refinery', 'distillation_tower', 'storage_tank']
        },
        kerosene: {
            name: 'Kerosin',
            type: 'kerosene',
            category: 'fuel',
            quality: 'premium',
            price: 90,
            density: 0.78,
            viscosity: 'low',
            color: 'clear',
            processing: ['refining', 'distillation'],
            uses: ['aviation_fuel', 'heating', 'lamps'],
            productionTime: 4800, // 1.3 Stunden
            skill: 'refining',
            equipment: ['refinery', 'distillation_tower', 'storage_tank']
        },
        lubricant: {
            name: 'Schmieröl',
            type: 'lubricant',
            category: 'industrial',
            quality: 'premium',
            price: 150,
            viscosity: 'high',
            color: 'amber',
            processing: ['refining', 'additives'],
            uses: ['machinery', 'engines', 'bearings'],
            productionTime: 7200, // 2 Stunden
            skill: 'refining',
            equipment: ['refinery', 'additive_mixer', 'storage_tank']
        },
        heating_oil: {
            name: 'Heizöl',
            type: 'heating_oil',
            category: 'fuel',
            quality: 'standard',
            price: 70,
            density: 0.85,
            viscosity: 'medium',
            color: 'dark_amber',
            processing: ['refining', 'distillation'],
            uses: ['heating', 'boilers', 'furnaces'],
            productionTime: 4800, // 1.3 Stunden
            skill: 'refining',
            equipment: ['refinery', 'distillation_tower', 'storage_tank']
        },
        bitumen: {
            name: 'Bitumen',
            type: 'bitumen',
            category: 'industrial',
            quality: 'standard',
            price: 60,
            viscosity: 'very_high',
            color: 'black',
            processing: ['refining', 'distillation'],
            uses: ['road_construction', 'roofing', 'waterproofing'],
            productionTime: 10800, // 3 Stunden
            skill: 'refining',
            equipment: ['refinery', 'distillation_tower', 'storage_tank']
        },
        natural_gas: {
            name: 'Erdgas',
            type: 'natural_gas',
            category: 'gas',
            quality: 'standard',
            price: 30,
            density: 0.7,
            color: 'invisible',
            processing: ['purification', 'compression'],
            uses: ['heating', 'cooking', 'electricity'],
            productionTime: 1800, // 30 Minuten
            skill: 'drilling',
            equipment: ['gas_well', 'compressor', 'storage_tank']
        },
        lpg: {
            name: 'Flüssiggas',
            type: 'lpg',
            category: 'gas',
            quality: 'premium',
            price: 80,
            density: 0.5,
            color: 'invisible',
            processing: ['purification', 'liquefaction'],
            uses: ['heating', 'cooking', 'vehicle_fuel'],
            productionTime: 3600, // 1 Stunde
            skill: 'refining',
            equipment: ['refinery', 'liquefaction_plant', 'storage_tank']
        }
    },
    
    // Pumpen-Konfiguration
    pumpConfig: {
        onshore: {
            name: 'Onshore-Pumpe',
            type: 'onshore',
            category: 'land',
            capacity: 1000,
            efficiency: 0.8,
            maintenance: 100,
            cost: 50000,
            power: 500,
            depth: 2000,
            production: 100,
            skill: 'drilling',
            equipment: ['pump', 'storage_tank', 'pipeline'],
            location: 'land',
            weather: 'all',
            security: 'medium'
        },
        offshore: {
            name: 'Offshore-Plattform',
            type: 'offshore',
            category: 'sea',
            capacity: 5000,
            efficiency: 0.9,
            maintenance: 500,
            cost: 200000,
            power: 2000,
            depth: 5000,
            production: 500,
            skill: 'offshore_drilling',
            equipment: ['platform', 'pump', 'storage_tank', 'pipeline'],
            location: 'sea',
            weather: 'calm',
            security: 'high'
        },
        drilling: {
            name: 'Bohr-Anlage',
            type: 'drilling',
            category: 'exploration',
            capacity: 2000,
            efficiency: 0.7,
            maintenance: 200,
            cost: 100000,
            power: 1000,
            depth: 10000,
            production: 200,
            skill: 'drilling',
            equipment: ['drill', 'pump', 'storage_tank'],
            location: 'land',
            weather: 'all',
            security: 'high'
        },
        fracking: {
            name: 'Fracking-Anlage',
            type: 'fracking',
            category: 'extraction',
            capacity: 3000,
            efficiency: 0.85,
            maintenance: 300,
            cost: 150000,
            power: 1500,
            depth: 3000,
            production: 300,
            skill: 'fracking',
            equipment: ['fracking_rig', 'pump', 'storage_tank'],
            location: 'land',
            weather: 'all',
            security: 'high'
        },
        deep_water: {
            name: 'Tiefwasser-Plattform',
            type: 'deep_water',
            category: 'sea',
            capacity: 10000,
            efficiency: 0.95,
            maintenance: 1000,
            cost: 500000,
            power: 5000,
            depth: 15000,
            production: 1000,
            skill: 'deep_water_drilling',
            equipment: ['platform', 'pump', 'storage_tank', 'pipeline'],
            location: 'deep_sea',
            weather: 'calm',
            security: 'very_high'
        }
    },
    
    // Verarbeitungs-Typen
    processingTypes: {
        REFINING: 'refining',
        DISTILLATION: 'distillation',
        CRACKING: 'cracking',
        BLENDING: 'blending',
        PURIFICATION: 'purification',
        COMPRESSION: 'compression',
        LIQUEFACTION: 'liquefaction',
        ADDITIVES: 'additives',
        FILTERING: 'filtering',
        STORAGE: 'storage'
    },
    
    // Verarbeitungs-Rezepte
    processingRecipes: {
        // Öl-Raffination
        'crude_to_refined': {
            name: 'Rohöl-Raffination',
            ingredients: [{ oil: 'crude_oil', amount: 10 }],
            processingTime: 7200, // 2 Stunden
            result: { oil: 'refined_oil', amount: 8 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 200,
            quality: 'premium'
        },
        'refined_to_gasoline': {
            name: 'Benzin-Herstellung',
            ingredients: [{ oil: 'refined_oil', amount: 5 }],
            processingTime: 5400, // 1.5 Stunden
            result: { oil: 'gasoline', amount: 3 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 150,
            quality: 'premium'
        },
        'refined_to_diesel': {
            name: 'Diesel-Herstellung',
            ingredients: [{ oil: 'refined_oil', amount: 5 }],
            processingTime: 5400, // 1.5 Stunden
            result: { oil: 'diesel', amount: 4 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 120,
            quality: 'standard'
        },
        'refined_to_kerosene': {
            name: 'Kerosin-Herstellung',
            ingredients: [{ oil: 'refined_oil', amount: 4 }],
            processingTime: 4800, // 1.3 Stunden
            result: { oil: 'kerosene', amount: 3 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 100,
            quality: 'premium'
        },
        'refined_to_lubricant': {
            name: 'Schmieröl-Herstellung',
            ingredients: [{ oil: 'refined_oil', amount: 3 }, { item: 'additives', amount: 1 }],
            processingTime: 7200, // 2 Stunden
            result: { oil: 'lubricant', amount: 2 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 200,
            quality: 'premium'
        },
        'refined_to_heating_oil': {
            name: 'Heizöl-Herstellung',
            ingredients: [{ oil: 'refined_oil', amount: 4 }],
            processingTime: 4800, // 1.3 Stunden
            result: { oil: 'heating_oil', amount: 3 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 80,
            quality: 'standard'
        },
        'refined_to_bitumen': {
            name: 'Bitumen-Herstellung',
            ingredients: [{ oil: 'refined_oil', amount: 6 }],
            processingTime: 10800, // 3 Stunden
            result: { oil: 'bitumen', amount: 4 },
            skill: 'refining',
            equipment: 'refinery',
            cost: 150,
            quality: 'standard'
        },
        'natural_gas_purification': {
            name: 'Erdgas-Reinigung',
            ingredients: [{ oil: 'natural_gas', amount: 10 }],
            processingTime: 1800, // 30 Minuten
            result: { oil: 'natural_gas', amount: 9 },
            skill: 'refining',
            equipment: 'gas_plant',
            cost: 50,
            quality: 'premium'
        },
        'natural_gas_to_lpg': {
            name: 'Flüssiggas-Herstellung',
            ingredients: [{ oil: 'natural_gas', amount: 8 }],
            processingTime: 3600, // 1 Stunde
            result: { oil: 'lpg', amount: 5 },
            skill: 'refining',
            equipment: 'liquefaction_plant',
            cost: 100,
            quality: 'premium'
        }
    },
    
    // Aktive Pumpen
    activePumps: new Map(),
    
    // Verarbeitungs-Anlagen
    processingFacilities: new Map(),
    
    // Öl-Felder
    oilFields: new Map(),
    
    // Öl-Märkte
    oilMarkets: new Map(),
    
    // Öl-Pumpen-System-Initialisierung
    init() {
        console.log('[OIL_PUMP] Öl-Pumpen-System initialisiert');
        this.createDefaultOilFields();
        this.createDefaultPumps();
        this.createDefaultFacilities();
        this.createDefaultMarkets();
    },
    
    // Standard-Öl-Felder erstellen
    createDefaultOilFields() {
        const oilFields = [
            {
                id: 'field_1',
                name: 'Sonnefeld',
                location: { x: 1000, y: 2000, z: 30 },
                size: 1000,
                oilType: 'crude_oil',
                reserves: 100000,
                quality: 'good',
                depth: 2000,
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'field_2',
                name: 'Mondfeld',
                location: { x: 1500, y: 2500, z: 30 },
                size: 2000,
                oilType: 'crude_oil',
                reserves: 200000,
                quality: 'excellent',
                depth: 3000,
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'field_3',
                name: 'Sternenfeld',
                location: { x: 2000, y: 3000, z: 30 },
                size: 500,
                oilType: 'natural_gas',
                reserves: 50000,
                quality: 'premium',
                depth: 1500,
                status: 'active',
                owner: null,
                created: Date.now()
            }
        ];
        
        oilFields.forEach(field => {
            this.createOilField(field);
        });
        
        console.log(`[OIL_PUMP] ${oilFields.length} Öl-Felder erstellt`);
    },
    
    // Öl-Feld erstellen
    createOilField(fieldData) {
        const field = {
            id: fieldData.id,
            name: fieldData.name,
            location: fieldData.location,
            size: fieldData.size,
            oilType: fieldData.oilType,
            reserves: fieldData.reserves,
            quality: fieldData.quality,
            depth: fieldData.depth,
            status: fieldData.status,
            owner: fieldData.owner,
            created: fieldData.created,
            pumps: [],
            production: 0,
            income: 0
        };
        
        this.oilFields.set(fieldData.id, field);
        
        console.log(`[OIL_PUMP] Öl-Feld ${fieldData.name} erstellt`);
        return true;
    },
    
    // Standard-Pumpen erstellen
    createDefaultPumps() {
        const pumps = [
            {
                id: 'pump_1',
                name: 'Pumpe Alpha',
                type: 'onshore',
                location: { x: 1000, y: 2000, z: 30 },
                fieldId: 'field_1',
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'pump_2',
                name: 'Pumpe Beta',
                type: 'offshore',
                location: { x: 1500, y: 2500, z: 30 },
                fieldId: 'field_2',
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'pump_3',
                name: 'Pumpe Gamma',
                type: 'drilling',
                location: { x: 2000, y: 3000, z: 30 },
                fieldId: 'field_3',
                status: 'active',
                owner: null,
                created: Date.now()
            }
        ];
        
        pumps.forEach(pump => {
            this.createPump(pump);
        });
        
        console.log(`[OIL_PUMP] ${pumps.length} Pumpen erstellt`);
    },
    
    // Pumpe erstellen
    createPump(pumpData) {
        const pumpConfig = this.pumpConfig[pumpData.type];
        const pump = {
            id: pumpData.id,
            name: pumpData.name,
            type: pumpData.type,
            location: pumpData.location,
            fieldId: pumpData.fieldId,
            config: pumpConfig,
            status: pumpData.status,
            owner: pumpData.owner,
            created: pumpData.created,
            production: 0,
            efficiency: pumpConfig.efficiency,
            maintenance: pumpConfig.maintenance,
            power: pumpConfig.power,
            capacity: pumpConfig.capacity
        };
        
        this.activePumps.set(pumpData.id, pump);
        
        // Pumpe zum Öl-Feld hinzufügen
        const field = this.oilFields.get(pumpData.fieldId);
        if (field) {
            field.pumps.push(pumpData.id);
        }
        
        console.log(`[OIL_PUMP] Pumpe ${pumpData.name} erstellt`);
        return true;
    },
    
    // Standard-Anlagen erstellen
    createDefaultFacilities() {
        const facilities = [
            {
                id: 'facility_1',
                name: 'Raffinerie Alpha',
                type: 'refining',
                location: { x: 1000, y: 2000, z: 30 },
                capacity: 10000,
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'facility_2',
                name: 'Raffinerie Beta',
                type: 'refining',
                location: { x: 1500, y: 2500, z: 30 },
                capacity: 15000,
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'facility_3',
                name: 'Gas-Anlage',
                type: 'gas_processing',
                location: { x: 2000, y: 3000, z: 30 },
                capacity: 5000,
                status: 'active',
                owner: null,
                created: Date.now()
            }
        ];
        
        facilities.forEach(facility => {
            this.createFacility(facility);
        });
        
        console.log(`[OIL_PUMP] ${facilities.length} Anlagen erstellt`);
    },
    
    // Anlage erstellen
    createFacility(facilityData) {
        const facility = {
            id: facilityData.id,
            name: facilityData.name,
            type: facilityData.type,
            location: facilityData.location,
            capacity: facilityData.capacity,
            status: facilityData.status,
            owner: facilityData.owner,
            created: facilityData.created,
            production: [],
            workers: [],
            income: 0,
            expenses: 0
        };
        
        this.processingFacilities.set(facilityData.id, facility);
        
        console.log(`[OIL_PUMP] Anlage ${facilityData.name} erstellt`);
        return true;
    },
    
    // Standard-Märkte erstellen
    createDefaultMarkets() {
        const markets = [
            {
                id: 'market_1',
                name: 'Öl-Markt',
                location: { x: 100, y: 200, z: 30 },
                type: 'oil',
                products: ['crude_oil', 'refined_oil', 'gasoline', 'diesel'],
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'market_2',
                name: 'Gas-Markt',
                location: { x: 500, y: 600, z: 30 },
                type: 'gas',
                products: ['natural_gas', 'lpg'],
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'market_3',
                name: 'Industrie-Markt',
                location: { x: 1000, y: 1200, z: 30 },
                type: 'industrial',
                products: ['lubricant', 'bitumen', 'heating_oil'],
                status: 'active',
                owner: null,
                created: Date.now()
            }
        ];
        
        markets.forEach(market => {
            this.createMarket(market);
        });
        
        console.log(`[OIL_PUMP] ${markets.length} Märkte erstellt`);
    },
    
    // Markt erstellen
    createMarket(marketData) {
        const market = {
            id: marketData.id,
            name: marketData.name,
            location: marketData.location,
            type: marketData.type,
            products: [...marketData.products],
            status: marketData.status,
            owner: marketData.owner,
            created: marketData.created,
            inventory: new Map(),
            prices: new Map(),
            sales: 0,
            profit: 0
        };
        
        this.oilMarkets.set(marketData.id, market);
        
        console.log(`[OIL_PUMP] Markt ${marketData.name} erstellt`);
        return true;
    },
    
    // Öl fördern
    pumpOil(player, pumpId, amount) {
        const pump = this.activePumps.get(pumpId);
        if (!pump) {
            player.outputChatBox('Pumpe nicht gefunden!');
            return false;
        }
        
        if (pump.owner && pump.owner !== player.id) {
            player.outputChatBox('Du besitzt diese Pumpe nicht!');
            return false;
        }
        
        const field = this.oilFields.get(pump.fieldId);
        if (!field) {
            player.outputChatBox('Öl-Feld nicht gefunden!');
            return false;
        }
        
        if (field.reserves < amount) {
            player.outputChatBox('Nicht genug Öl im Feld!');
            return false;
        }
        
        // Öl fördern
        field.reserves -= amount;
        pump.production += amount;
        
        const oilConfig = this.oilConfig[field.oilType];
        const value = amount * oilConfig.price;
        
        player.money += value;
        
        player.outputChatBox(`${amount}L ${oilConfig.name} gefördert! Wert: $${value}`);
        console.log(`[OIL_PUMP] ${amount}L ${oilConfig.name} von Spieler ${player.id} gefördert`);
        return true;
    },
    
    // Öl verarbeiten
    processOil(player, oilType, recipeName) {
        const recipe = this.processingRecipes[recipeName];
        if (!recipe) {
            player.outputChatBox('Rezept nicht gefunden!');
            return false;
        }
        
        // Zutaten prüfen
        for (const ingredient of recipe.ingredients) {
            if (ingredient.oil) {
                const oilConfig = this.oilConfig[ingredient.oil];
                if (!oilConfig) {
                    player.outputChatBox(`Zutat ${ingredient.oil} nicht gefunden!`);
                    return false;
                }
            }
        }
        
        // Verarbeitung starten
        const processingId = `processing_${Date.now()}`;
        const processing = {
            id: processingId,
            playerId: player.id,
            recipe: recipe,
            startTime: Date.now(),
            endTime: Date.now() + recipe.processingTime,
            status: 'processing'
        };
        
        // Timer für Verarbeitung
        setTimeout(() => {
            this.completeProcessing(player, processingId);
        }, recipe.processingTime);
        
        player.outputChatBox(`${recipe.name} wird verarbeitet... Dauer: ${recipe.processingTime / 60} Minuten`);
        console.log(`[OIL_PUMP] ${recipe.name} von Spieler ${player.id} gestartet`);
        return processingId;
    },
    
    // Verarbeitung abschließen
    completeProcessing(player, processingId) {
        const processing = this.processingFacilities.get(processingId);
        if (!processing) {
            return;
        }
        
        const recipe = processing.recipe;
        const result = recipe.result;
        
        // Ergebnis geben
        player.money += result.amount * 100; // Vereinfacht für Demo
        
        player.outputChatBox(`${recipe.name} fertig! ${result.amount}L ${result.oil} erhalten`);
        console.log(`[OIL_PUMP] ${recipe.name} von Spieler ${player.id} abgeschlossen`);
        
        // Verarbeitung entfernen
        this.processingFacilities.delete(processingId);
    },
    
    // Öl verkaufen
    sellOil(player, oilType, amount, price) {
        const oilConfig = this.oilConfig[oilType];
        if (!oilConfig) {
            player.outputChatBox('Unbekanntes Öl!');
            return false;
        }
        
        const totalValue = amount * price;
        if (player.money < totalValue) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        // Verkauf durchführen
        player.money -= totalValue;
        
        player.outputChatBox(`${amount}L ${oilConfig.name} für $${totalValue} gekauft!`);
        console.log(`[OIL_PUMP] ${amount}L ${oilConfig.name} von Spieler ${player.id} gekauft`);
        return true;
    },
    
    // Öl-Pumpen-Statistiken
    getStatistics() {
        return {
            totalPumps: this.activePumps.size,
            totalFields: this.oilFields.size,
            totalFacilities: this.processingFacilities.size,
            totalMarkets: this.oilMarkets.size,
            totalRecipes: Object.keys(this.processingRecipes).length,
            oilTypes: Object.keys(this.oilConfig).length
        };
    }
};

// Events
mp.events.add('oil_pump:pump', (player, pumpId, amount) => {
    oilPumpSystem.pumpOil(player, pumpId, amount);
});

mp.events.add('oil_pump:process', (player, oilType, recipeName) => {
    oilPumpSystem.processOil(player, oilType, recipeName);
});

mp.events.add('oil_pump:sell', (player, oilType, amount, price) => {
    oilPumpSystem.sellOil(player, oilType, amount, price);
});

// Commands
mp.events.addCommand('oilpump', (player, fullText, action, pumpId, amount) => {
    if (!action) {
        player.outputChatBox('Verwendung: /oilpump [pump|process|sell] [PumpID/Öl-Typ] [Menge]');
        player.outputChatBox('Verfügbare Öl-Typen: crude_oil, refined_oil, gasoline, diesel, kerosene');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'pump':
            if (pumpId && amount) {
                oilPumpSystem.pumpOil(player, pumpId, parseInt(amount));
            } else {
                player.outputChatBox('PumpID und Menge erforderlich!');
            }
            break;
            
        case 'process':
            if (pumpId && amount) {
                oilPumpSystem.processOil(player, pumpId, amount);
            } else {
                player.outputChatBox('Öl-Typ und Rezept erforderlich!');
            }
            break;
            
        case 'sell':
            if (pumpId && amount) {
                const price = parseInt(amount) * 50; // Vereinfacht für Demo
                oilPumpSystem.sellOil(player, pumpId, parseInt(amount), price);
            } else {
                player.outputChatBox('Öl-Typ und Menge erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('oilpumpstats', (player) => {
    const stats = oilPumpSystem.getStatistics();
    player.outputChatBox('=== Öl-Pumpen-Statistiken ===');
    player.outputChatBox(`Gesamt Pumpen: ${stats.totalPumps}`);
    player.outputChatBox(`Gesamt Felder: ${stats.totalFields}`);
    player.outputChatBox(`Gesamt Anlagen: ${stats.totalFacilities}`);
    player.outputChatBox(`Gesamt Märkte: ${stats.totalMarkets}`);
    player.outputChatBox(`Gesamt Rezepte: ${stats.totalRecipes}`);
    player.outputChatBox(`Öl-Typen: ${stats.oilTypes}`);
});

// Öl-Pumpen-System initialisieren
oilPumpSystem.init();

module.exports = oilPumpSystem;
