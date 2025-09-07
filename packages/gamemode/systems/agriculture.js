// Agriculture System - Landwirtschafts-System mit Verarbeitung und Märkten
// Behandelt alle Landwirtschafts-Funktionen für Horizont-City Roleplay

const agricultureSystem = {
    // Pflanzen-Typen
    plantTypes: {
        VEGETABLES: 'vegetables',
        FRUITS: 'fruits',
        GRAINS: 'grains',
        HERBS: 'herbs',
        FLOWERS: 'flowers',
        TREES: 'trees',
        CROPS: 'crops',
        SPICES: 'spices',
        MEDICINAL: 'medicinal',
        CUSTOM: 'custom'
    },
    
    // Spezifische Pflanzen
    specificPlants: {
        // Gemüse
        TOMATO: 'tomato',
        CARROT: 'carrot',
        POTATO: 'potato',
        LETTUCE: 'lettuce',
        ONION: 'onion',
        PEPPER: 'pepper',
        CUCUMBER: 'cucumber',
        BROCCOLI: 'broccoli',
        SPINACH: 'spinach',
        CORN: 'corn',
        
        // Früchte
        APPLE: 'apple',
        BANANA: 'banana',
        ORANGE: 'orange',
        GRAPE: 'grape',
        STRAWBERRY: 'strawberry',
        CHERRY: 'cherry',
        PEACH: 'peach',
        PEAR: 'pear',
        LEMON: 'lemon',
        WATERMELON: 'watermelon',
        
        // Getreide
        WHEAT: 'wheat',
        RICE: 'rice',
        BARLEY: 'barley',
        OATS: 'oats',
        RYE: 'rye',
        QUINOA: 'quinoa',
        MILLET: 'millet',
        SORGHUM: 'sorghum',
        
        // Kräuter
        BASIL: 'basil',
        OREGANO: 'oregano',
        THYME: 'thyme',
        ROSEMARY: 'rosemary',
        SAGE: 'sage',
        MINT: 'mint',
        PARSLEY: 'parsley',
        CILANTRO: 'cilantro',
        DILL: 'dill',
        CHIVES: 'chives',
        
        // Blumen
        ROSE: 'rose',
        TULIP: 'tulip',
        SUNFLOWER: 'sunflower',
        LAVENDER: 'lavender',
        DAISY: 'daisy',
        ORCHID: 'orchid',
        LILY: 'lily',
        CARNATION: 'carnation',
        MARIGOLD: 'marigold',
        PETUNIA: 'petunia',
        
        // Bäume
        OAK: 'oak',
        PINE: 'pine',
        MAPLE: 'maple',
        BIRCH: 'birch',
        CHERRY_TREE: 'cherry_tree',
        APPLE_TREE: 'apple_tree',
        OLIVE_TREE: 'olive_tree',
        WALNUT_TREE: 'walnut_tree',
        CHESTNUT_TREE: 'chestnut_tree',
        CEDAR: 'cedar',
        
        // Gewürze
        BLACK_PEPPER: 'black_pepper',
        CINNAMON: 'cinnamon',
        GINGER: 'ginger',
        TURMERIC: 'turmeric',
        CLOVES: 'cloves',
        NUTMEG: 'nutmeg',
        CARDAMOM: 'cardamom',
        VANILLA: 'vanilla',
        SAFFRON: 'saffron',
        STAR_ANISE: 'star_anise',
        
        // Medizinische Pflanzen
        ALOE_VERA: 'aloe_vera',
        GINSENG: 'ginseng',
        ECHINACEA: 'echinacea',
        CHAMOMILE: 'chamomile',
        LEMON_BALM: 'lemon_balm',
        ST_JOHNS_WORT: 'st_johns_wort',
        VALERIAN: 'valerian',
        GINKGO: 'ginkgo',
        GARLIC: 'garlic',
        GINGER_ROOT: 'ginger_root'
    },
    
    // Pflanzen-Konfiguration
    plantConfig: {
        tomato: {
            name: 'Tomate',
            type: 'vegetables',
            category: 'vegetables',
            growthTime: 7200, // 2 Stunden
            harvestAmount: 5,
            seedCost: 10,
            sellPrice: 3,
            waterNeeds: 'medium',
            soilType: 'loamy',
            season: 'summer',
            quality: 'standard',
            nutrition: 20,
            taste: 8,
            rarity: 'common',
            processing: ['juice', 'sauce', 'dried'],
            requirements: ['water', 'fertilizer', 'sunlight']
        },
        carrot: {
            name: 'Karotte',
            type: 'vegetables',
            category: 'vegetables',
            growthTime: 5400, // 1.5 Stunden
            harvestAmount: 4,
            seedCost: 8,
            sellPrice: 2,
            waterNeeds: 'low',
            soilType: 'sandy',
            season: 'spring',
            quality: 'standard',
            nutrition: 25,
            taste: 7,
            rarity: 'common',
            processing: ['juice', 'soup', 'dried'],
            requirements: ['water', 'fertilizer', 'sunlight']
        },
        potato: {
            name: 'Kartoffel',
            type: 'vegetables',
            category: 'vegetables',
            growthTime: 9000, // 2.5 Stunden
            harvestAmount: 6,
            seedCost: 12,
            sellPrice: 2,
            waterNeeds: 'medium',
            soilType: 'loamy',
            season: 'spring',
            quality: 'standard',
            nutrition: 30,
            taste: 6,
            rarity: 'common',
            processing: ['chips', 'fries', 'mashed'],
            requirements: ['water', 'fertilizer', 'sunlight']
        },
        apple: {
            name: 'Apfel',
            type: 'fruits',
            category: 'fruits',
            growthTime: 14400, // 4 Stunden
            harvestAmount: 8,
            seedCost: 15,
            sellPrice: 4,
            waterNeeds: 'medium',
            soilType: 'loamy',
            season: 'autumn',
            quality: 'standard',
            nutrition: 15,
            taste: 9,
            rarity: 'common',
            processing: ['juice', 'pie', 'dried'],
            requirements: ['water', 'fertilizer', 'sunlight']
        },
        wheat: {
            name: 'Weizen',
            type: 'grains',
            category: 'grains',
            growthTime: 10800, // 3 Stunden
            harvestAmount: 10,
            seedCost: 20,
            sellPrice: 1,
            waterNeeds: 'low',
            soilType: 'clay',
            season: 'summer',
            quality: 'standard',
            nutrition: 35,
            taste: 5,
            rarity: 'common',
            processing: ['flour', 'bread', 'pasta'],
            requirements: ['water', 'fertilizer', 'sunlight']
        },
        rose: {
            name: 'Rose',
            type: 'flowers',
            category: 'flowers',
            growthTime: 18000, // 5 Stunden
            harvestAmount: 3,
            seedCost: 25,
            sellPrice: 8,
            waterNeeds: 'high',
            soilType: 'loamy',
            season: 'summer',
            quality: 'premium',
            nutrition: 5,
            taste: 0,
            rarity: 'uncommon',
            processing: ['perfume', 'tea', 'potpourri'],
            requirements: ['water', 'fertilizer', 'sunlight', 'pruning']
        },
        oak: {
            name: 'Eiche',
            type: 'trees',
            category: 'trees',
            growthTime: 86400, // 24 Stunden
            harvestAmount: 1,
            seedCost: 50,
            sellPrice: 100,
            waterNeeds: 'medium',
            soilType: 'loamy',
            season: 'all',
            quality: 'premium',
            nutrition: 0,
            taste: 0,
            rarity: 'rare',
            processing: ['wood', 'furniture', 'charcoal'],
            requirements: ['water', 'fertilizer', 'sunlight', 'space']
        },
        basil: {
            name: 'Basilikum',
            type: 'herbs',
            category: 'herbs',
            growthTime: 3600, // 1 Stunde
            harvestAmount: 2,
            seedCost: 5,
            sellPrice: 4,
            waterNeeds: 'medium',
            soilType: 'loamy',
            season: 'summer',
            quality: 'standard',
            nutrition: 10,
            taste: 9,
            rarity: 'common',
            processing: ['pesto', 'tea', 'dried'],
            requirements: ['water', 'fertilizer', 'sunlight']
        },
        black_pepper: {
            name: 'Schwarzer Pfeffer',
            type: 'spices',
            category: 'spices',
            growthTime: 21600, // 6 Stunden
            harvestAmount: 1,
            seedCost: 30,
            sellPrice: 15,
            waterNeeds: 'high',
            soilType: 'loamy',
            season: 'tropical',
            quality: 'premium',
            nutrition: 5,
            taste: 10,
            rarity: 'uncommon',
            processing: ['ground', 'oil', 'extract'],
            requirements: ['water', 'fertilizer', 'sunlight', 'warmth']
        },
        aloe_vera: {
            name: 'Aloe Vera',
            type: 'medicinal',
            category: 'medicinal',
            growthTime: 14400, // 4 Stunden
            harvestAmount: 2,
            seedCost: 20,
            sellPrice: 12,
            waterNeeds: 'low',
            soilType: 'sandy',
            season: 'all',
            quality: 'premium',
            nutrition: 15,
            taste: 3,
            rarity: 'uncommon',
            processing: ['gel', 'juice', 'cream'],
            requirements: ['water', 'fertilizer', 'sunlight']
        }
    },
    
    // Verarbeitungs-Typen
    processingTypes: {
        COOKING: 'cooking',
        PRESERVING: 'preserving',
        EXTRACTING: 'extracting',
        GRINDING: 'grinding',
        FERMENTING: 'fermenting',
        DRYING: 'drying',
        FREEZING: 'freezing',
        CANNING: 'canning',
        DISTILLING: 'distilling',
        BREWING: 'brewing'
    },
    
    // Verarbeitungs-Rezepte
    processingRecipes: {
        // Tomaten-Verarbeitung
        'tomato_juice': {
            name: 'Tomatensaft',
            ingredients: [{ plant: 'tomato', amount: 3 }],
            processingTime: 1800, // 30 Minuten
            result: { item: 'tomato_juice', amount: 1 },
            skill: 'cooking',
            equipment: 'juicer',
            cost: 5
        },
        'tomato_sauce': {
            name: 'Tomatensoße',
            ingredients: [{ plant: 'tomato', amount: 5 }],
            processingTime: 3600, // 1 Stunde
            result: { item: 'tomato_sauce', amount: 1 },
            skill: 'cooking',
            equipment: 'stove',
            cost: 10
        },
        'dried_tomato': {
            name: 'Getrocknete Tomate',
            ingredients: [{ plant: 'tomato', amount: 2 }],
            processingTime: 7200, // 2 Stunden
            result: { item: 'dried_tomato', amount: 1 },
            skill: 'preserving',
            equipment: 'dehydrator',
            cost: 3
        },
        
        // Weizen-Verarbeitung
        'wheat_flour': {
            name: 'Weizenmehl',
            ingredients: [{ plant: 'wheat', amount: 3 }],
            processingTime: 1800, // 30 Minuten
            result: { item: 'wheat_flour', amount: 2 },
            skill: 'grinding',
            equipment: 'mill',
            cost: 8
        },
        'bread': {
            name: 'Brot',
            ingredients: [{ plant: 'wheat', amount: 2 }, { item: 'water', amount: 1 }],
            processingTime: 5400, // 1.5 Stunden
            result: { item: 'bread', amount: 1 },
            skill: 'cooking',
            equipment: 'oven',
            cost: 15
        },
        
        // Apfel-Verarbeitung
        'apple_juice': {
            name: 'Apfelsaft',
            ingredients: [{ plant: 'apple', amount: 4 }],
            processingTime: 1800, // 30 Minuten
            result: { item: 'apple_juice', amount: 1 },
            skill: 'cooking',
            equipment: 'juicer',
            cost: 8
        },
        'apple_pie': {
            name: 'Apfelkuchen',
            ingredients: [{ plant: 'apple', amount: 3 }, { item: 'wheat_flour', amount: 1 }],
            processingTime: 7200, // 2 Stunden
            result: { item: 'apple_pie', amount: 1 },
            skill: 'cooking',
            equipment: 'oven',
            cost: 25
        },
        
        // Kräuter-Verarbeitung
        'basil_pesto': {
            name: 'Basilikum-Pesto',
            ingredients: [{ plant: 'basil', amount: 5 }],
            processingTime: 900, // 15 Minuten
            result: { item: 'basil_pesto', amount: 1 },
            skill: 'cooking',
            equipment: 'blender',
            cost: 12
        },
        'herbal_tea': {
            name: 'Kräutertee',
            ingredients: [{ plant: 'basil', amount: 2 }],
            processingTime: 600, // 10 Minuten
            result: { item: 'herbal_tea', amount: 1 },
            skill: 'cooking',
            equipment: 'kettle',
            cost: 5
        },
        
        // Blumen-Verarbeitung
        'rose_perfume': {
            name: 'Rosenparfüm',
            ingredients: [{ plant: 'rose', amount: 10 }],
            processingTime: 14400, // 4 Stunden
            result: { item: 'rose_perfume', amount: 1 },
            skill: 'extracting',
            equipment: 'distiller',
            cost: 50
        },
        'lavender_tea': {
            name: 'Lavendeltee',
            ingredients: [{ plant: 'lavender', amount: 3 }],
            processingTime: 600, // 10 Minuten
            result: { item: 'lavender_tea', amount: 1 },
            skill: 'cooking',
            equipment: 'kettle',
            cost: 8
        },
        
        // Medizinische Verarbeitung
        'aloe_gel': {
            name: 'Aloe-Gel',
            ingredients: [{ plant: 'aloe_vera', amount: 2 }],
            processingTime: 1800, // 30 Minuten
            result: { item: 'aloe_gel', amount: 1 },
            skill: 'extracting',
            equipment: 'extractor',
            cost: 20
        },
        'healing_cream': {
            name: 'Heilcreme',
            ingredients: [{ plant: 'aloe_vera', amount: 3 }, { item: 'coconut_oil', amount: 1 }],
            processingTime: 3600, // 1 Stunde
            result: { item: 'healing_cream', amount: 1 },
            skill: 'cooking',
            equipment: 'mixer',
            cost: 35
        }
    },
    
    // Aktive Farmen
    activeFarms: new Map(),
    
    // Aktive Pflanzen
    activePlants: new Map(),
    
    // Verarbeitungs-Anlagen
    processingFacilities: new Map(),
    
    // Markt-System
    marketPrices: new Map(),
    
    // Landwirtschafts-System-Initialisierung
    init() {
        console.log('[AGRICULTURE] Landwirtschafts-System initialisiert');
        this.createDefaultFarms();
        this.initializeMarketPrices();
    },
    
    // Standard-Farmen erstellen
    createDefaultFarms() {
        const farms = [
            {
                id: 'farm_1',
                name: 'Sonnenhof',
                owner: null,
                location: { x: 1000, y: 2000, z: 30 },
                size: 100,
                soilQuality: 'good',
                waterSource: true,
                facilities: ['greenhouse', 'barn', 'silo'],
                status: 'active',
                created: Date.now()
            },
            {
                id: 'farm_2',
                name: 'Mondlicht-Farm',
                owner: null,
                location: { x: 1500, y: 2500, z: 30 },
                size: 150,
                soilQuality: 'excellent',
                waterSource: true,
                facilities: ['greenhouse', 'barn', 'silo', 'processing'],
                status: 'active',
                created: Date.now()
            },
            {
                id: 'farm_3',
                name: 'Sternen-Garten',
                owner: null,
                location: { x: 2000, y: 3000, z: 30 },
                size: 80,
                soilQuality: 'average',
                waterSource: false,
                facilities: ['greenhouse', 'barn'],
                status: 'active',
                created: Date.now()
            }
        ];
        
        farms.forEach(farm => {
            this.createFarm(farm);
        });
        
        console.log(`[AGRICULTURE] ${farms.length} Farmen erstellt`);
    },
    
    // Farm erstellen
    createFarm(farmData) {
        const farm = {
            id: farmData.id,
            name: farmData.name,
            owner: farmData.owner,
            location: farmData.location,
            size: farmData.size,
            soilQuality: farmData.soilQuality,
            waterSource: farmData.waterSource,
            facilities: [...farmData.facilities],
            status: farmData.status,
            created: farmData.created,
            plants: [],
            equipment: [],
            workers: [],
            income: 0,
            expenses: 0
        };
        
        this.activeFarms.set(farmData.id, farm);
        
        console.log(`[AGRICULTURE] Farm ${farmData.name} erstellt`);
        return true;
    },
    
    // Markt-Preise initialisieren
    initializeMarketPrices() {
        const prices = [
            { plant: 'tomato', basePrice: 3, currentPrice: 3, demand: 'medium' },
            { plant: 'carrot', basePrice: 2, currentPrice: 2, demand: 'high' },
            { plant: 'potato', basePrice: 2, currentPrice: 2, demand: 'high' },
            { plant: 'apple', basePrice: 4, currentPrice: 4, demand: 'medium' },
            { plant: 'wheat', basePrice: 1, currentPrice: 1, demand: 'high' },
            { plant: 'rose', basePrice: 8, currentPrice: 8, demand: 'low' },
            { plant: 'oak', basePrice: 100, currentPrice: 100, demand: 'low' },
            { plant: 'basil', basePrice: 4, currentPrice: 4, demand: 'medium' },
            { plant: 'black_pepper', basePrice: 15, currentPrice: 15, demand: 'medium' },
            { plant: 'aloe_vera', basePrice: 12, currentPrice: 12, demand: 'high' }
        ];
        
        prices.forEach(price => {
            this.marketPrices.set(price.plant, price);
        });
        
        console.log(`[AGRICULTURE] ${prices.length} Markt-Preise initialisiert`);
    },
    
    // Pflanze pflanzen
    plantSeed(player, farmId, plantType, position) {
        const farm = this.activeFarms.get(farmId);
        if (!farm) {
            player.outputChatBox('Farm nicht gefunden!');
            return false;
        }
        
        if (farm.owner && farm.owner !== player.id) {
            player.outputChatBox('Du besitzt diese Farm nicht!');
            return false;
        }
        
        const plantConfig = this.plantConfig[plantType];
        if (!plantConfig) {
            player.outputChatBox('Unbekannte Pflanze!');
            return false;
        }
        
        const seedCost = plantConfig.seedCost;
        if (player.money < seedCost) {
            player.outputChatBox('Nicht genug Geld für Samen!');
            return false;
        }
        
        const plantId = `plant_${Date.now()}`;
        const plant = {
            id: plantId,
            farmId: farmId,
            playerId: player.id,
            type: plantType,
            config: plantConfig,
            position: position,
            status: 'growing',
            planted: Date.now(),
            growthStart: Date.now(),
            growthEnd: Date.now() + plantConfig.growthTime,
            waterLevel: 100,
            health: 100,
            quality: 'standard',
            harvestAmount: plantConfig.harvestAmount,
            experience: 0
        };
        
        this.activePlants.set(plantId, plant);
        farm.plants.push(plantId);
        
        player.money -= seedCost;
        
        player.outputChatBox(`${plantConfig.name} gepflanzt! Kosten: $${seedCost}`);
        console.log(`[AGRICULTURE] ${plantConfig.name} von Spieler ${player.id} gepflanzt`);
        return plantId;
    },
    
    // Pflanze ernten
    harvestPlant(player, plantId) {
        const plant = this.activePlants.get(plantId);
        if (!plant) {
            player.outputChatBox('Pflanze nicht gefunden!');
            return false;
        }
        
        if (plant.playerId !== player.id) {
            player.outputChatBox('Du besitzt diese Pflanze nicht!');
            return false;
        }
        
        if (plant.status !== 'ready') {
            player.outputChatBox('Pflanze ist noch nicht reif!');
            return false;
        }
        
        const plantConfig = plant.config;
        const harvestAmount = plant.harvestAmount;
        const marketPrice = this.marketPrices.get(plantType);
        const sellPrice = marketPrice ? marketPrice.currentPrice : plantConfig.sellPrice;
        const totalValue = harvestAmount * sellPrice;
        
        // Ernte durchführen
        plant.status = 'harvested';
        plant.harvested = Date.now();
        
        // Geld und Erfahrung geben
        player.money += totalValue;
        player.experience += plantConfig.experience || 10;
        
        // Farm-Einkommen aktualisieren
        const farm = this.activeFarms.get(plant.farmId);
        if (farm) {
            farm.income += totalValue;
        }
        
        player.outputChatBox(`${plantConfig.name} geerntet! ${harvestAmount}x erhalten, Wert: $${totalValue}`);
        console.log(`[AGRICULTURE] ${plantConfig.name} von Spieler ${player.id} geerntet`);
        return true;
    },
    
    // Pflanze verarbeiten
    processPlant(player, plantType, recipeName) {
        const recipe = this.processingRecipes[recipeName];
        if (!recipe) {
            player.outputChatBox('Rezept nicht gefunden!');
            return false;
        }
        
        // Zutaten prüfen
        for (const ingredient of recipe.ingredients) {
            if (ingredient.plant) {
                // Pflanze prüfen
                const plantConfig = this.plantConfig[ingredient.plant];
                if (!plantConfig) {
                    player.outputChatBox(`Zutat ${ingredient.plant} nicht gefunden!`);
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
        console.log(`[AGRICULTURE] ${recipe.name} von Spieler ${player.id} gestartet`);
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
        player.money += result.amount * 10; // Vereinfacht für Demo
        
        player.outputChatBox(`${recipe.name} fertig! ${result.amount}x ${result.item} erhalten`);
        console.log(`[AGRICULTURE] ${recipe.name} von Spieler ${player.id} abgeschlossen`);
        
        // Verarbeitung entfernen
        this.processingFacilities.delete(processingId);
    },
    
    // Markt-Preise aktualisieren
    updateMarketPrices() {
        this.marketPrices.forEach((price, plantType) => {
            // Zufällige Preisschwankungen
            const variation = (Math.random() - 0.5) * 0.2; // ±10%
            price.currentPrice = Math.max(0.1, price.basePrice * (1 + variation));
            
            // Nachfrage-basierte Anpassungen
            if (price.demand === 'high') {
                price.currentPrice *= 1.1;
            } else if (price.demand === 'low') {
                price.currentPrice *= 0.9;
            }
        });
        
        console.log('[AGRICULTURE] Markt-Preise aktualisiert');
    },
    
    // Farm kaufen
    buyFarm(player, farmId, price) {
        const farm = this.activeFarms.get(farmId);
        if (!farm) {
            player.outputChatBox('Farm nicht gefunden!');
            return false;
        }
        
        if (farm.owner) {
            player.outputChatBox('Farm bereits verkauft!');
            return false;
        }
        
        if (player.money < price) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        farm.owner = player.id;
        player.money -= price;
        
        player.outputChatBox(`Farm ${farm.name} gekauft! Preis: $${price}`);
        console.log(`[AGRICULTURE] Farm ${farmId} von Spieler ${player.id} gekauft`);
        return true;
    },
    
    // Landwirtschafts-Statistiken
    getStatistics() {
        return {
            totalFarms: this.activeFarms.size,
            totalPlants: this.activePlants.size,
            totalRecipes: Object.keys(this.processingRecipes).length,
            totalMarketPrices: this.marketPrices.size,
            plantTypes: Object.keys(this.plantConfig).length,
            processingTypes: Object.keys(this.processingTypes).length
        };
    }
};

// Events
mp.events.add('agriculture:plant', (player, farmId, plantType, position) => {
    agricultureSystem.plantSeed(player, farmId, plantType, position);
});

mp.events.add('agriculture:harvest', (player, plantId) => {
    agricultureSystem.harvestPlant(player, plantId);
});

mp.events.add('agriculture:process', (player, plantType, recipeName) => {
    agricultureSystem.processPlant(player, plantType, recipeName);
});

mp.events.add('agriculture:buyFarm', (player, farmId, price) => {
    agricultureSystem.buyFarm(player, farmId, price);
});

// Commands
mp.events.addCommand('plant', (player, fullText, plantType, farmId) => {
    if (!plantType || !farmId) {
        player.outputChatBox('Verwendung: /plant [Pflanze] [FarmID]');
        player.outputChatBox('Verfügbare Pflanzen: tomato, carrot, potato, apple, wheat, rose, oak, basil');
        return;
    }
    
    const position = player.position;
    agricultureSystem.plantSeed(player, farmId, plantType, position);
});

mp.events.addCommand('harvest', (player, fullText, plantId) => {
    if (!plantId) {
        player.outputChatBox('Verwendung: /harvest [PflanzenID]');
        return;
    }
    
    agricultureSystem.harvestPlant(player, plantId);
});

mp.events.addCommand('process', (player, fullText, plantType, recipeName) => {
    if (!plantType || !recipeName) {
        player.outputChatBox('Verwendung: /process [Pflanze] [Rezept]');
        player.outputChatBox('Verfügbare Rezepte: tomato_juice, tomato_sauce, wheat_flour, bread, apple_juice');
        return;
    }
    
    agricultureSystem.processPlant(player, plantType, recipeName);
});

mp.events.addCommand('buyfarm', (player, fullText, farmId, price) => {
    if (!farmId || !price) {
        player.outputChatBox('Verwendung: /buyfarm [FarmID] [Preis]');
        return;
    }
    
    const priceNum = parseInt(price);
    agricultureSystem.buyFarm(player, farmId, priceNum);
});

mp.events.addCommand('farmstats', (player) => {
    const stats = agricultureSystem.getStatistics();
    player.outputChatBox('=== Landwirtschafts-Statistiken ===');
    player.outputChatBox(`Gesamt Farmen: ${stats.totalFarms}`);
    player.outputChatBox(`Gesamt Pflanzen: ${stats.totalPlants}`);
    player.outputChatBox(`Gesamt Rezepte: ${stats.totalRecipes}`);
    player.outputChatBox(`Markt-Preise: ${stats.totalMarketPrices}`);
    player.outputChatBox(`Pflanzen-Typen: ${stats.plantTypes}`);
    player.outputChatBox(`Verarbeitungs-Typen: ${stats.processingTypes}`);
});

// Markt-Preise alle 10 Minuten aktualisieren
setInterval(() => {
    agricultureSystem.updateMarketPrices();
}, 600000);

// Landwirtschafts-System initialisieren
agricultureSystem.init();

module.exports = agricultureSystem;
