// Alcohol System - Alkohol-System mit Verarbeitung und Handel
// Behandelt alle Alkohol-Funktionen für Horizont-City Roleplay

const alcoholSystem = {
    // Alkohol-Typen
    alcoholTypes: {
        BEER: 'beer',
        WINE: 'wine',
        SPIRITS: 'spirits',
        LIQUEURS: 'liqueurs',
        COCKTAILS: 'cocktails',
        MIXED_DRINKS: 'mixed_drinks',
        NON_ALCOHOLIC: 'non_alcoholic',
        CRAFT: 'craft',
        PREMIUM: 'premium',
        CUSTOM: 'custom'
    },
    
    // Spezifische Alkohole
    specificAlcohols: {
        // Biere
        LAGER: 'lager',
        ALE: 'ale',
        STOUT: 'stout',
        PORTER: 'porter',
        WHEAT_BEER: 'wheat_beer',
        PILSNER: 'pilsner',
        IPA: 'ipa',
        LAMBIC: 'lambic',
        BARLEY_WINE: 'barley_wine',
        BOCK: 'bock',
        
        // Weine
        RED_WINE: 'red_wine',
        WHITE_WINE: 'white_wine',
        ROSE_WINE: 'rose_wine',
        SPARKLING_WINE: 'sparkling_wine',
        CHAMPAGNE: 'champagne',
        DESSERT_WINE: 'dessert_wine',
        FORTIFIED_WINE: 'fortified_wine',
        VERMOUTH: 'vermouth',
        SHERRY: 'sherry',
        PORT: 'port',
        
        // Spirituosen
        VODKA: 'vodka',
        WHISKEY: 'whiskey',
        BOURBON: 'bourbon',
        SCOTCH: 'scotch',
        RUM: 'rum',
        GIN: 'gin',
        TEQUILA: 'tequila',
        BRANDY: 'brandy',
        COGNAC: 'cognac',
        ABSINTHE: 'absinthe',
        
        // Liköre
        AMARETTO: 'amaretto',
        BAILEYS: 'baileys',
        COINTREAU: 'cointreau',
        GRAND_MARNIER: 'grand_marnier',
        KAHLUA: 'kahlua',
        SAMBUCA: 'sambuca',
        TRIPLE_SEC: 'triple_sec',
        FRANGELICO: 'frangelico',
        CHAMBORD: 'chambord',
        DISARONNO: 'disaronno',
        
        // Cocktails
        MARTINI: 'martini',
        MANHATTAN: 'manhattan',
        OLD_FASHIONED: 'old_fashioned',
        MARGARITA: 'margarita',
        MOJITO: 'mojito',
        COSMOPOLITAN: 'cosmopolitan',
        BLOODY_MARY: 'bloody_mary',
        MIMOSA: 'mimosa',
        BELLINI: 'bellini',
        SIDECAR: 'sidecar',
        
        // Mischgetränke
        RUM_AND_COKE: 'rum_and_coke',
        VODKA_CRANBERRY: 'vodka_cranberry',
        GIN_AND_TONIC: 'gin_and_tonic',
        WHISKEY_SOUR: 'whiskey_sour',
        LONG_ISLAND_ICED_TEA: 'long_island_iced_tea',
        SEX_ON_THE_BEACH: 'sex_on_the_beach',
        PINA_COLADA: 'pina_colada',
        TEQUILA_SUNRISE: 'tequila_sunrise',
        WHITE_RUSSIAN: 'white_russian',
        BLACK_RUSSIAN: 'black_russian',
        
        // Alkoholfreie Getränke
        SODA: 'soda',
        JUICE: 'juice',
        WATER: 'water',
        COFFEE: 'coffee',
        TEA: 'tea',
        ENERGY_DRINK: 'energy_drink',
        SPORTS_DRINK: 'sports_drink',
        SMOOTHIE: 'smoothie',
        MOCKTAIL: 'mocktail',
        SOFT_DRINK: 'soft_drink'
    },
    
    // Alkohol-Konfiguration
    alcoholConfig: {
        lager: {
            name: 'Lager',
            type: 'beer',
            category: 'beer',
            alcoholContent: 5.0,
            volume: 500,
            price: 3,
            taste: 6,
            quality: 'standard',
            effects: ['relaxation', 'social', 'appetite'],
            sideEffects: ['dehydration', 'hangover', 'weight_gain'],
            duration: 7200, // 2 Stunden
            intensity: 3,
            addiction: 2,
            danger: 1,
            legal: true,
            ingredients: ['water', 'malt', 'hops', 'yeast'],
            processing: ['brewing', 'fermentation', 'aging'],
            productionTime: 1209600, // 2 Wochen
            skill: 'brewing',
            equipment: ['brewery', 'fermentation_tank', 'bottling_line']
        },
        red_wine: {
            name: 'Rotwein',
            type: 'wine',
            category: 'wine',
            alcoholContent: 13.0,
            volume: 750,
            price: 15,
            taste: 8,
            quality: 'premium',
            effects: ['relaxation', 'social', 'romantic'],
            sideEffects: ['dehydration', 'hangover', 'headache'],
            duration: 14400, // 4 Stunden
            intensity: 5,
            addiction: 3,
            danger: 2,
            legal: true,
            ingredients: ['grapes', 'yeast', 'sulfites'],
            processing: ['crushing', 'fermentation', 'aging'],
            productionTime: 31536000, // 1 Jahr
            skill: 'winemaking',
            equipment: ['winery', 'fermentation_tank', 'barrel']
        },
        vodka: {
            name: 'Wodka',
            type: 'spirits',
            category: 'spirits',
            alcoholContent: 40.0,
            volume: 700,
            price: 25,
            taste: 5,
            quality: 'standard',
            effects: ['euphoria', 'confidence', 'social'],
            sideEffects: ['dehydration', 'hangover', 'nausea'],
            duration: 10800, // 3 Stunden
            intensity: 7,
            addiction: 6,
            danger: 5,
            legal: true,
            ingredients: ['grain', 'water', 'yeast'],
            processing: ['fermentation', 'distillation', 'filtration'],
            productionTime: 2592000, // 1 Monat
            skill: 'distilling',
            equipment: ['distillery', 'still', 'filtration_system']
        },
        whiskey: {
            name: 'Whiskey',
            type: 'spirits',
            category: 'spirits',
            alcoholContent: 43.0,
            volume: 700,
            price: 40,
            taste: 9,
            quality: 'premium',
            effects: ['relaxation', 'confidence', 'warmth'],
            sideEffects: ['dehydration', 'hangover', 'headache'],
            duration: 14400, // 4 Stunden
            intensity: 8,
            addiction: 7,
            danger: 6,
            legal: true,
            ingredients: ['grain', 'water', 'yeast', 'barrel'],
            processing: ['fermentation', 'distillation', 'aging'],
            productionTime: 94608000, // 3 Jahre
            skill: 'distilling',
            equipment: ['distillery', 'still', 'barrel']
        },
        rum: {
            name: 'Rum',
            type: 'spirits',
            category: 'spirits',
            alcoholContent: 37.5,
            volume: 700,
            price: 20,
            taste: 7,
            quality: 'standard',
            effects: ['euphoria', 'tropical', 'social'],
            sideEffects: ['dehydration', 'hangover', 'sugar_crash'],
            duration: 10800, // 3 Stunden
            intensity: 6,
            addiction: 5,
            danger: 4,
            legal: true,
            ingredients: ['sugar_cane', 'water', 'yeast'],
            processing: ['fermentation', 'distillation', 'aging'],
            productionTime: 15552000, // 6 Monate
            skill: 'distilling',
            equipment: ['distillery', 'still', 'barrel']
        },
        gin: {
            name: 'Gin',
            type: 'spirits',
            category: 'spirits',
            alcoholContent: 40.0,
            volume: 700,
            price: 30,
            taste: 8,
            quality: 'premium',
            effects: ['relaxation', 'botanical', 'sophisticated'],
            sideEffects: ['dehydration', 'hangover', 'bitter_taste'],
            duration: 10800, // 3 Stunden
            intensity: 6,
            addiction: 4,
            danger: 3,
            legal: true,
            ingredients: ['grain', 'juniper', 'botanicals'],
            processing: ['fermentation', 'distillation', 'infusion'],
            productionTime: 2592000, // 1 Monat
            skill: 'distilling',
            equipment: ['distillery', 'still', 'infusion_tank']
        },
        tequila: {
            name: 'Tequila',
            type: 'spirits',
            category: 'spirits',
            alcoholContent: 38.0,
            volume: 700,
            price: 35,
            taste: 8,
            quality: 'premium',
            effects: ['euphoria', 'energy', 'party'],
            sideEffects: ['dehydration', 'hangover', 'aggressive'],
            duration: 10800, // 3 Stunden
            intensity: 7,
            addiction: 6,
            danger: 5,
            legal: true,
            ingredients: ['agave', 'water', 'yeast'],
            processing: ['cooking', 'fermentation', 'distillation'],
            productionTime: 7776000, // 3 Monate
            skill: 'distilling',
            equipment: ['distillery', 'still', 'cooking_pit']
        },
        martini: {
            name: 'Martini',
            type: 'cocktails',
            category: 'cocktails',
            alcoholContent: 30.0,
            volume: 150,
            price: 12,
            taste: 9,
            quality: 'premium',
            effects: ['sophisticated', 'relaxation', 'elegance'],
            sideEffects: ['dehydration', 'hangover', 'expensive'],
            duration: 7200, // 2 Stunden
            intensity: 6,
            addiction: 4,
            danger: 3,
            legal: true,
            ingredients: ['gin', 'vermouth', 'olive'],
            processing: ['mixing', 'stirring', 'garnishing'],
            productionTime: 300, // 5 Minuten
            skill: 'bartending',
            equipment: ['shaker', 'strainer', 'glass']
        },
        mojito: {
            name: 'Mojito',
            type: 'cocktails',
            category: 'cocktails',
            alcoholContent: 15.0,
            volume: 250,
            price: 10,
            taste: 8,
            quality: 'standard',
            effects: ['refreshing', 'tropical', 'social'],
            sideEffects: ['dehydration', 'hangover', 'sugar_crash'],
            duration: 7200, // 2 Stunden
            intensity: 4,
            addiction: 3,
            danger: 2,
            legal: true,
            ingredients: ['rum', 'mint', 'lime', 'soda'],
            processing: ['muddling', 'mixing', 'garnishing'],
            productionTime: 180, // 3 Minuten
            skill: 'bartending',
            equipment: ['muddler', 'shaker', 'glass']
        },
        margarita: {
            name: 'Margarita',
            type: 'cocktails',
            category: 'cocktails',
            alcoholContent: 20.0,
            volume: 200,
            price: 11,
            taste: 8,
            quality: 'standard',
            effects: ['tropical', 'party', 'refreshing'],
            sideEffects: ['dehydration', 'hangover', 'sour_taste'],
            duration: 7200, // 2 Stunden
            intensity: 5,
            addiction: 4,
            danger: 3,
            legal: true,
            ingredients: ['tequila', 'lime', 'triple_sec', 'salt'],
            processing: ['mixing', 'shaking', 'garnishing'],
            productionTime: 180, // 3 Minuten
            skill: 'bartending',
            equipment: ['shaker', 'strainer', 'glass']
        }
    },
    
    // Verarbeitungs-Typen
    processingTypes: {
        BREWING: 'brewing',
        WINEMAKING: 'winemaking',
        DISTILLING: 'distilling',
        FERMENTATION: 'fermentation',
        AGING: 'aging',
        MIXING: 'mixing',
        BOTTLING: 'bottling',
        FILTERING: 'filtering',
        INFUSION: 'infusion',
        CARBONATION: 'carbonation'
    },
    
    // Verarbeitungs-Rezepte
    processingRecipes: {
        // Bier-Verarbeitung
        'lager_brewing': {
            name: 'Lager-Brauen',
            ingredients: [{ item: 'malt', amount: 5 }, { item: 'hops', amount: 2 }, { item: 'yeast', amount: 1 }],
            processingTime: 1209600, // 2 Wochen
            result: { alcohol: 'lager', amount: 24 },
            skill: 'brewing',
            equipment: 'brewery',
            cost: 50,
            quality: 'standard'
        },
        'ale_brewing': {
            name: 'Ale-Brauen',
            ingredients: [{ item: 'malt', amount: 4 }, { item: 'hops', amount: 3 }, { item: 'yeast', amount: 1 }],
            processingTime: 604800, // 1 Woche
            result: { alcohol: 'ale', amount: 24 },
            skill: 'brewing',
            equipment: 'brewery',
            cost: 45,
            quality: 'standard'
        },
        'stout_brewing': {
            name: 'Stout-Brauen',
            ingredients: [{ item: 'malt', amount: 6 }, { item: 'hops', amount: 2 }, { item: 'yeast', amount: 1 }, { item: 'roasted_barley', amount: 1 }],
            processingTime: 1209600, // 2 Wochen
            result: { alcohol: 'stout', amount: 24 },
            skill: 'brewing',
            equipment: 'brewery',
            cost: 60,
            quality: 'premium'
        },
        
        // Wein-Verarbeitung
        'red_wine_making': {
            name: 'Rotwein-Herstellung',
            ingredients: [{ item: 'grapes', amount: 10 }, { item: 'yeast', amount: 1 }],
            processingTime: 31536000, // 1 Jahr
            result: { alcohol: 'red_wine', amount: 6 },
            skill: 'winemaking',
            equipment: 'winery',
            cost: 200,
            quality: 'premium'
        },
        'white_wine_making': {
            name: 'Weißwein-Herstellung',
            ingredients: [{ item: 'white_grapes', amount: 10 }, { item: 'yeast', amount: 1 }],
            processingTime: 15552000, // 6 Monate
            result: { alcohol: 'white_wine', amount: 6 },
            skill: 'winemaking',
            equipment: 'winery',
            cost: 180,
            quality: 'premium'
        },
        'champagne_making': {
            name: 'Champagner-Herstellung',
            ingredients: [{ item: 'grapes', amount: 12 }, { item: 'yeast', amount: 1 }, { item: 'sugar', amount: 2 }],
            processingTime: 63072000, // 2 Jahre
            result: { alcohol: 'champagne', amount: 6 },
            skill: 'winemaking',
            equipment: 'winery',
            cost: 500,
            quality: 'premium'
        },
        
        // Spirituosen-Verarbeitung
        'vodka_distilling': {
            name: 'Wodka-Destillation',
            ingredients: [{ item: 'grain', amount: 8 }, { item: 'yeast', amount: 1 }],
            processingTime: 2592000, // 1 Monat
            result: { alcohol: 'vodka', amount: 2 },
            skill: 'distilling',
            equipment: 'distillery',
            cost: 100,
            quality: 'standard'
        },
        'whiskey_distilling': {
            name: 'Whiskey-Destillation',
            ingredients: [{ item: 'grain', amount: 10 }, { item: 'yeast', amount: 1 }, { item: 'barrel', amount: 1 }],
            processingTime: 94608000, // 3 Jahre
            result: { alcohol: 'whiskey', amount: 2 },
            skill: 'distilling',
            equipment: 'distillery',
            cost: 300,
            quality: 'premium'
        },
        'rum_distilling': {
            name: 'Rum-Destillation',
            ingredients: [{ item: 'sugar_cane', amount: 12 }, { item: 'yeast', amount: 1 }],
            processingTime: 15552000, // 6 Monate
            result: { alcohol: 'rum', amount: 2 },
            skill: 'distilling',
            equipment: 'distillery',
            cost: 150,
            quality: 'standard'
        },
        'gin_distilling': {
            name: 'Gin-Destillation',
            ingredients: [{ item: 'grain', amount: 8 }, { item: 'juniper', amount: 2 }, { item: 'botanicals', amount: 3 }],
            processingTime: 2592000, // 1 Monat
            result: { alcohol: 'gin', amount: 2 },
            skill: 'distilling',
            equipment: 'distillery',
            cost: 120,
            quality: 'premium'
        },
        'tequila_distilling': {
            name: 'Tequila-Destillation',
            ingredients: [{ item: 'agave', amount: 15 }, { item: 'yeast', amount: 1 }],
            processingTime: 7776000, // 3 Monate
            result: { alcohol: 'tequila', amount: 2 },
            skill: 'distilling',
            equipment: 'distillery',
            cost: 200,
            quality: 'premium'
        },
        
        // Cocktail-Verarbeitung
        'martini_mixing': {
            name: 'Martini-Mischen',
            ingredients: [{ alcohol: 'gin', amount: 1 }, { alcohol: 'vermouth', amount: 1 }],
            processingTime: 300, // 5 Minuten
            result: { alcohol: 'martini', amount: 1 },
            skill: 'bartending',
            equipment: 'bar',
            cost: 15,
            quality: 'premium'
        },
        'mojito_mixing': {
            name: 'Mojito-Mischen',
            ingredients: [{ alcohol: 'rum', amount: 1 }, { item: 'mint', amount: 2 }, { item: 'lime', amount: 1 }],
            processingTime: 180, // 3 Minuten
            result: { alcohol: 'mojito', amount: 1 },
            skill: 'bartending',
            equipment: 'bar',
            cost: 12,
            quality: 'standard'
        },
        'margarita_mixing': {
            name: 'Margarita-Mischen',
            ingredients: [{ alcohol: 'tequila', amount: 1 }, { item: 'lime', amount: 2 }, { alcohol: 'triple_sec', amount: 1 }],
            processingTime: 180, // 3 Minuten
            result: { alcohol: 'margarita', amount: 1 },
            skill: 'bartending',
            equipment: 'bar',
            cost: 13,
            quality: 'standard'
        }
    },
    
    // Aktive Alkohole
    activeAlcohols: new Map(),
    
    // Verarbeitungs-Anlagen
    processingFacilities: new Map(),
    
    // Bars und Clubs
    barsAndClubs: new Map(),
    
    // Alkohol-Märkte
    alcoholMarkets: new Map(),
    
    // Alkohol-System-Initialisierung
    init() {
        console.log('[ALCOHOL] Alkohol-System initialisiert');
        this.createDefaultFacilities();
        this.createDefaultBars();
        this.createDefaultMarkets();
    },
    
    // Standard-Anlagen erstellen
    createDefaultFacilities() {
        const facilities = [
            {
                id: 'facility_1',
                name: 'Brauerei',
                type: 'brewing',
                location: { x: 1000, y: 2000, z: 30 },
                equipment: ['brewery', 'fermentation_tank', 'bottling_line'],
                status: 'active',
                owner: null,
                capacity: 1000,
                created: Date.now()
            },
            {
                id: 'facility_2',
                name: 'Weinkellerei',
                type: 'winemaking',
                location: { x: 1500, y: 2500, z: 30 },
                equipment: ['winery', 'fermentation_tank', 'barrel'],
                status: 'active',
                owner: null,
                capacity: 500,
                created: Date.now()
            },
            {
                id: 'facility_3',
                name: 'Destillerie',
                type: 'distilling',
                location: { x: 2000, y: 3000, z: 30 },
                equipment: ['distillery', 'still', 'barrel'],
                status: 'active',
                owner: null,
                capacity: 200,
                created: Date.now()
            }
        ];
        
        facilities.forEach(facility => {
            this.createFacility(facility);
        });
        
        console.log(`[ALCOHOL] ${facilities.length} Anlagen erstellt`);
    },
    
    // Anlage erstellen
    createFacility(facilityData) {
        const facility = {
            id: facilityData.id,
            name: facilityData.name,
            type: facilityData.type,
            location: facilityData.location,
            equipment: [...facilityData.equipment],
            status: facilityData.status,
            owner: facilityData.owner,
            capacity: facilityData.capacity,
            created: facilityData.created,
            production: [],
            workers: [],
            income: 0,
            expenses: 0
        };
        
        this.processingFacilities.set(facilityData.id, facility);
        
        console.log(`[ALCOHOL] Anlage ${facilityData.name} erstellt`);
        return true;
    },
    
    // Standard-Bars erstellen
    createDefaultBars() {
        const bars = [
            {
                id: 'bar_1',
                name: 'The Golden Bar',
                location: { x: 100, y: 200, z: 30 },
                type: 'bar',
                atmosphere: 'upscale',
                drinks: ['whiskey', 'vodka', 'gin', 'rum', 'tequila'],
                cocktails: ['martini', 'old_fashioned', 'manhattan'],
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'bar_2',
                name: 'Beach Club',
                location: { x: 500, y: 600, z: 30 },
                type: 'club',
                atmosphere: 'party',
                drinks: ['rum', 'vodka', 'tequila'],
                cocktails: ['mojito', 'margarita', 'pina_colada'],
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'bar_3',
                name: 'Wine Bar',
                location: { x: 1000, y: 1200, z: 30 },
                type: 'wine_bar',
                atmosphere: 'sophisticated',
                drinks: ['red_wine', 'white_wine', 'champagne'],
                cocktails: ['mimosa', 'bellini'],
                status: 'active',
                owner: null,
                created: Date.now()
            }
        ];
        
        bars.forEach(bar => {
            this.createBar(bar);
        });
        
        console.log(`[ALCOHOL] ${bars.length} Bars erstellt`);
    },
    
    // Bar erstellen
    createBar(barData) {
        const bar = {
            id: barData.id,
            name: barData.name,
            location: barData.location,
            type: barData.type,
            atmosphere: barData.atmosphere,
            drinks: [...barData.drinks],
            cocktails: [...barData.cocktails],
            status: barData.status,
            owner: barData.owner,
            created: barData.created,
            customers: [],
            sales: 0,
            profit: 0,
            inventory: new Map()
        };
        
        this.barsAndClubs.set(barData.id, bar);
        
        console.log(`[ALCOHOL] Bar ${barData.name} erstellt`);
        return true;
    },
    
    // Standard-Märkte erstellen
    createDefaultMarkets() {
        const markets = [
            {
                id: 'market_1',
                name: 'Liquor Store',
                location: { x: 200, y: 300, z: 30 },
                type: 'retail',
                products: ['beer', 'wine', 'spirits'],
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'market_2',
                name: 'Craft Brewery',
                location: { x: 600, y: 700, z: 30 },
                type: 'craft',
                products: ['beer', 'ale', 'stout'],
                status: 'active',
                owner: null,
                created: Date.now()
            },
            {
                id: 'market_3',
                name: 'Wine Shop',
                location: { x: 1100, y: 1300, z: 30 },
                type: 'wine',
                products: ['wine', 'champagne', 'spirits'],
                status: 'active',
                owner: null,
                created: Date.now()
            }
        ];
        
        markets.forEach(market => {
            this.createMarket(market);
        });
        
        console.log(`[ALCOHOL] ${markets.length} Märkte erstellt`);
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
        
        this.alcoholMarkets.set(marketData.id, market);
        
        console.log(`[ALCOHOL] Markt ${marketData.name} erstellt`);
        return true;
    },
    
    // Alkohol konsumieren
    consumeAlcohol(player, alcoholType, amount = 1) {
        const alcoholConfig = this.alcoholConfig[alcoholType];
        if (!alcoholConfig) {
            player.outputChatBox('Unbekannter Alkohol!');
            return false;
        }
        
        // Alkohol-Effekte anwenden
        const effects = alcoholConfig.effects;
        const sideEffects = alcoholConfig.sideEffects;
        const duration = alcoholConfig.duration;
        const intensity = alcoholConfig.intensity;
        const alcoholContent = alcoholConfig.alcoholContent;
        
        // Spieler über Effekte informieren
        player.outputChatBox(`${alcoholConfig.name} konsumiert! Effekte: ${effects.join(', ')}`);
        
        // Alkohol-Status setzen
        player.alcoholStatus = {
            alcohol: alcoholType,
            effects: effects,
            sideEffects: sideEffects,
            duration: duration,
            intensity: intensity,
            alcoholContent: alcoholContent,
            startTime: Date.now(),
            endTime: Date.now() + duration
        };
        
        // Alkohol-UI anzeigen
        player.call('ui:show', 'AlcoholEffects', { 
            alcohol: alcoholConfig,
            effects: effects,
            duration: duration
        });
        
        console.log(`[ALCOHOL] ${alcoholConfig.name} von Spieler ${player.id} konsumiert`);
        return true;
    },
    
    // Alkohol verarbeiten
    processAlcohol(player, alcoholType, recipeName) {
        const recipe = this.processingRecipes[recipeName];
        if (!recipe) {
            player.outputChatBox('Rezept nicht gefunden!');
            return false;
        }
        
        // Zutaten prüfen
        for (const ingredient of recipe.ingredients) {
            if (ingredient.alcohol) {
                const alcoholConfig = this.alcoholConfig[ingredient.alcohol];
                if (!alcoholConfig) {
                    player.outputChatBox(`Zutat ${ingredient.alcohol} nicht gefunden!`);
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
        console.log(`[ALCOHOL] ${recipe.name} von Spieler ${player.id} gestartet`);
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
        player.money += result.amount * 20; // Vereinfacht für Demo
        
        player.outputChatBox(`${recipe.name} fertig! ${result.amount}x ${result.alcohol} erhalten`);
        console.log(`[ALCOHOL] ${recipe.name} von Spieler ${player.id} abgeschlossen`);
        
        // Verarbeitung entfernen
        this.processingFacilities.delete(processingId);
    },
    
    // Alkohol verkaufen
    sellAlcohol(player, alcoholType, amount, price) {
        const alcoholConfig = this.alcoholConfig[alcoholType];
        if (!alcoholConfig) {
            player.outputChatBox('Unbekannter Alkohol!');
            return false;
        }
        
        const totalValue = amount * price;
        if (player.money < totalValue) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        // Verkauf durchführen
        player.money -= totalValue;
        
        player.outputChatBox(`${amount}x ${alcoholConfig.name} für $${totalValue} gekauft!`);
        console.log(`[ALCOHOL] ${amount}x ${alcoholConfig.name} von Spieler ${player.id} gekauft`);
        return true;
    },
    
    // Alkohol-Statistiken
    getStatistics() {
        return {
            totalAlcohols: Object.keys(this.alcoholConfig).length,
            totalFacilities: this.processingFacilities.size,
            totalBars: this.barsAndClubs.size,
            totalMarkets: this.alcoholMarkets.size,
            totalRecipes: Object.keys(this.processingRecipes).length,
            alcoholTypes: Object.keys(this.alcoholTypes).length
        };
    }
};

// Events
mp.events.add('alcohol:consume', (player, alcoholType, amount) => {
    alcoholSystem.consumeAlcohol(player, alcoholType, amount);
});

mp.events.add('alcohol:process', (player, alcoholType, recipeName) => {
    alcoholSystem.processAlcohol(player, alcoholType, recipeName);
});

mp.events.add('alcohol:sell', (player, alcoholType, amount, price) => {
    alcoholSystem.sellAlcohol(player, alcoholType, amount, price);
});

// Commands
mp.events.addCommand('alcohol', (player, fullText, action, alcoholType, amount) => {
    if (!action) {
        player.outputChatBox('Verwendung: /alcohol [consume|process|sell] [Alkohol] [Menge]');
        player.outputChatBox('Verfügbare Alkohole: lager, red_wine, vodka, whiskey, rum, gin, tequila');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'consume':
            if (alcoholType) {
                alcoholSystem.consumeAlcohol(player, alcoholType, parseInt(amount) || 1);
            } else {
                player.outputChatBox('Alkohol-Typ erforderlich!');
            }
            break;
            
        case 'process':
            if (alcoholType && amount) {
                alcoholSystem.processAlcohol(player, alcoholType, amount);
            } else {
                player.outputChatBox('Alkohol-Typ und Rezept erforderlich!');
            }
            break;
            
        case 'sell':
            if (alcoholType && amount) {
                const price = parseInt(amount) * 50; // Vereinfacht für Demo
                alcoholSystem.sellAlcohol(player, alcoholType, parseInt(amount), price);
            } else {
                player.outputChatBox('Alkohol-Typ und Menge erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('alcoholstats', (player) => {
    const stats = alcoholSystem.getStatistics();
    player.outputChatBox('=== Alkohol-Statistiken ===');
    player.outputChatBox(`Gesamt Alkohole: ${stats.totalAlcohols}`);
    player.outputChatBox(`Gesamt Anlagen: ${stats.totalFacilities}`);
    player.outputChatBox(`Gesamt Bars: ${stats.totalBars}`);
    player.outputChatBox(`Gesamt Märkte: ${stats.totalMarkets}`);
    player.outputChatBox(`Gesamt Rezepte: ${stats.totalRecipes}`);
    player.outputChatBox(`Alkohol-Typen: ${stats.alcoholTypes}`);
});

// Alkohol-System initialisieren
alcoholSystem.init();

module.exports = alcoholSystem;
