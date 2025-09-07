// Resource Collection System - Ressourcen-Sammlung-System mit verschiedenen Materialien
// Behandelt alle Ressourcen-Sammlung-Funktionen für Horizont-City Roleplay

const resourceCollectionSystem = {
    // Ressourcen-Typen
    resourceTypes: {
        WOOD: 'wood',
        STONE: 'stone',
        METAL: 'metal',
        COAL: 'coal',
        OIL: 'oil',
        GAS: 'gas',
        WATER: 'water',
        SAND: 'sand',
        CLAY: 'clay',
        GRAVEL: 'gravel',
        IRON_ORE: 'iron_ore',
        COPPER_ORE: 'copper_ore',
        GOLD_ORE: 'gold_ore',
        SILVER_ORE: 'silver_ore',
        DIAMOND_ORE: 'diamond_ore',
        EMERALD_ORE: 'emerald_ore',
        RUBY_ORE: 'ruby_ore',
        SAPPHIRE_ORE: 'sapphire_ore',
        CRYSTAL: 'crystal',
        GEMSTONE: 'gemstone',
        FOSSIL: 'fossil',
        HERB: 'herb',
        MUSHROOM: 'mushroom',
        FRUIT: 'fruit',
        VEGETABLE: 'vegetable',
        FISH: 'fish',
        MEAT: 'meat',
        LEATHER: 'leather',
        WOOL: 'wool',
        COTTON: 'cotton',
        SILK: 'silk',
        HONEY: 'honey',
        WAX: 'wax',
        RESIN: 'resin',
        SAP: 'sap',
        BARK: 'bark',
        LEAF: 'leaf',
        ROOT: 'root',
        SEED: 'seed',
        POLLEN: 'pollen',
        NECTAR: 'nectar',
        MILK: 'milk',
        EGG: 'egg',
        FEATHER: 'feather',
        BONE: 'bone',
        SHELL: 'shell',
        PEARL: 'pearl',
        CORAL: 'coral',
        SPONGE: 'sponge',
        ALGAE: 'algae',
        KELP: 'kelp',
        MOSS: 'moss',
        LICHEN: 'lichen',
        FUNGUS: 'fungus',
        BACTERIA: 'bacteria',
        VIRUS: 'virus',
        PROTEIN: 'protein',
        ENZYME: 'enzyme',
        HORMONE: 'hormone',
        VITAMIN: 'vitamin',
        MINERAL: 'mineral',
        SALT: 'salt',
        SUGAR: 'sugar',
        STARCH: 'starch',
        FIBER: 'fiber',
        OIL_SEED: 'oil_seed',
        NUT: 'nut',
        BERRY: 'berry',
        GRAIN: 'grain',
        LEGUME: 'legume',
        TUBER: 'tuber',
        BULB: 'bulb',
        RHIZOME: 'rhizome',
        SPORE: 'spore',
        POLLEN: 'pollen',
        NECTAR: 'nectar',
        HONEY: 'honey',
        WAX: 'wax',
        RESIN: 'resin',
        SAP: 'sap',
        BARK: 'bark',
        LEAF: 'leaf',
        ROOT: 'root',
        SEED: 'seed',
        POLLEN: 'pollen',
        NECTAR: 'nectar',
        HONEY: 'honey',
        WAX: 'wax',
        RESIN: 'resin',
        SAP: 'sap',
        BARK: 'bark',
        LEAF: 'leaf',
        ROOT: 'root',
        SEED: 'seed'
    },
    
    // Sammel-Tools
    collectionTools: {
        PICKAXE: { name: 'Spitzhacke', efficiency: 1.0, durability: 100, cost: 50 },
        SHOVEL: { name: 'Schaufel', efficiency: 0.8, durability: 80, cost: 30 },
        AXE: { name: 'Axt', efficiency: 1.2, durability: 120, cost: 60 },
        HAMMER: { name: 'Hammer', efficiency: 0.9, durability: 90, cost: 40 },
        DRILL: { name: 'Bohrer', efficiency: 1.5, durability: 150, cost: 100 },
        CHAINSAW: { name: 'Kettensäge', efficiency: 2.0, durability: 200, cost: 200 },
        EXCAVATOR: { name: 'Bagger', efficiency: 3.0, durability: 300, cost: 500 },
        MINING_DRILL: { name: 'Bergbau-Bohrer', efficiency: 4.0, durability: 400, cost: 1000 },
        FISHING_ROD: { name: 'Angel', efficiency: 0.7, durability: 60, cost: 25 },
        NET: { name: 'Netz', efficiency: 0.6, durability: 50, cost: 20 },
        BASKET: { name: 'Korb', efficiency: 0.5, durability: 40, cost: 15 },
        BUCKET: { name: 'Eimer', efficiency: 0.4, durability: 30, cost: 10 },
        BAG: { name: 'Tasche', efficiency: 0.3, durability: 20, cost: 5 },
        CONTAINER: { name: 'Behälter', efficiency: 0.2, durability: 15, cost: 3 }
    },
    
    // Sammel-Standorte
    collectionSites: {
        FOREST: { name: 'Wald', resources: ['wood', 'bark', 'leaf', 'resin', 'sap'], difficulty: 1 },
        MOUNTAIN: { name: 'Berg', resources: ['stone', 'iron_ore', 'copper_ore', 'crystal'], difficulty: 3 },
        MINE: { name: 'Mine', resources: ['coal', 'iron_ore', 'copper_ore', 'gold_ore'], difficulty: 4 },
        QUARRY: { name: 'Steinbruch', resources: ['stone', 'sand', 'gravel', 'clay'], difficulty: 2 },
        RIVER: { name: 'Fluss', resources: ['water', 'sand', 'clay', 'fish'], difficulty: 1 },
        LAKE: { name: 'See', resources: ['water', 'fish', 'algae', 'kelp'], difficulty: 1 },
        OCEAN: { name: 'Ozean', resources: ['water', 'fish', 'pearl', 'coral'], difficulty: 2 },
        FIELD: { name: 'Feld', resources: ['grain', 'vegetable', 'herb', 'seed'], difficulty: 1 },
        GARDEN: { name: 'Garten', resources: ['fruit', 'vegetable', 'herb', 'flower'], difficulty: 1 },
        FARM: { name: 'Bauernhof', resources: ['grain', 'vegetable', 'fruit', 'milk'], difficulty: 1 },
        RANCH: { name: 'Ranch', resources: ['meat', 'leather', 'wool', 'milk'], difficulty: 2 },
        APIARY: { name: 'Bienenstock', resources: ['honey', 'wax', 'pollen', 'nectar'], difficulty: 1 },
        ORCHARD: { name: 'Obstgarten', resources: ['fruit', 'nut', 'berry', 'seed'], difficulty: 1 },
        VINEYARD: { name: 'Weinberg', resources: ['grape', 'wine', 'vine', 'leaf'], difficulty: 2 },
        PLANTATION: { name: 'Plantage', resources: ['cotton', 'sugar', 'coffee', 'tea'], difficulty: 3 },
        SWAMP: { name: 'Sumpf', resources: ['moss', 'lichen', 'fungus', 'mushroom'], difficulty: 2 },
        DESERT: { name: 'Wüste', resources: ['sand', 'salt', 'crystal', 'fossil'], difficulty: 3 },
        TUNDRA: { name: 'Tundra', resources: ['ice', 'snow', 'moss', 'lichen'], difficulty: 4 },
        JUNGLE: { name: 'Dschungel', resources: ['wood', 'fruit', 'herb', 'spice'], difficulty: 3 },
        CAVE: { name: 'Höhle', resources: ['crystal', 'gemstone', 'fossil', 'mineral'], difficulty: 4 }
    },
    
    // Ressourcen-Konfiguration
    resourceConfig: {
        wood: { name: 'Holz', value: 5, weight: 1.0, rarity: 'common', uses: ['construction', 'fuel', 'crafting'] },
        stone: { name: 'Stein', value: 3, weight: 2.0, rarity: 'common', uses: ['construction', 'crafting'] },
        metal: { name: 'Metall', value: 15, weight: 3.0, rarity: 'uncommon', uses: ['construction', 'crafting', 'tools'] },
        coal: { name: 'Kohle', value: 8, weight: 1.5, rarity: 'common', uses: ['fuel', 'smelting'] },
        oil: { name: 'Öl', value: 25, weight: 0.8, rarity: 'uncommon', uses: ['fuel', 'lubrication', 'chemicals'] },
        gas: { name: 'Gas', value: 20, weight: 0.5, rarity: 'uncommon', uses: ['fuel', 'heating', 'chemicals'] },
        water: { name: 'Wasser', value: 1, weight: 1.0, rarity: 'common', uses: ['drinking', 'irrigation', 'cleaning'] },
        sand: { name: 'Sand', value: 2, weight: 1.5, rarity: 'common', uses: ['construction', 'glass', 'concrete'] },
        clay: { name: 'Ton', value: 4, weight: 1.2, rarity: 'common', uses: ['pottery', 'construction', 'crafting'] },
        gravel: { name: 'Kies', value: 3, weight: 1.8, rarity: 'common', uses: ['construction', 'concrete', 'drainage'] },
        iron_ore: { name: 'Eisenerz', value: 12, weight: 2.5, rarity: 'uncommon', uses: ['smelting', 'metallurgy'] },
        copper_ore: { name: 'Kupfererz', value: 18, weight: 2.2, rarity: 'uncommon', uses: ['smelting', 'electronics'] },
        gold_ore: { name: 'Golderz', value: 100, weight: 3.0, rarity: 'rare', uses: ['smelting', 'jewelry', 'electronics'] },
        silver_ore: { name: 'Silbererz', value: 50, weight: 2.8, rarity: 'rare', uses: ['smelting', 'jewelry', 'electronics'] },
        diamond_ore: { name: 'Diamanterz', value: 500, weight: 1.0, rarity: 'legendary', uses: ['jewelry', 'tools', 'electronics'] },
        emerald_ore: { name: 'Smaragderz', value: 300, weight: 1.2, rarity: 'epic', uses: ['jewelry', 'decoration'] },
        ruby_ore: { name: 'Rubinerz', value: 250, weight: 1.1, rarity: 'epic', uses: ['jewelry', 'decoration'] },
        sapphire_ore: { name: 'Saphirerz', value: 200, weight: 1.3, rarity: 'epic', uses: ['jewelry', 'decoration'] },
        crystal: { name: 'Kristall', value: 80, weight: 1.5, rarity: 'rare', uses: ['electronics', 'decoration', 'magic'] },
        gemstone: { name: 'Edelstein', value: 150, weight: 0.8, rarity: 'rare', uses: ['jewelry', 'decoration'] },
        fossil: { name: 'Fossil', value: 200, weight: 2.0, rarity: 'rare', uses: ['research', 'decoration', 'education'] },
        herb: { name: 'Kraut', value: 10, weight: 0.3, rarity: 'common', uses: ['medicine', 'cooking', 'potions'] },
        mushroom: { name: 'Pilz', value: 15, weight: 0.2, rarity: 'uncommon', uses: ['cooking', 'medicine', 'poison'] },
        fruit: { name: 'Obst', value: 8, weight: 0.5, rarity: 'common', uses: ['food', 'cooking', 'juice'] },
        vegetable: { name: 'Gemüse', value: 6, weight: 0.4, rarity: 'common', uses: ['food', 'cooking', 'nutrition'] },
        fish: { name: 'Fisch', value: 12, weight: 0.6, rarity: 'common', uses: ['food', 'cooking', 'bait'] },
        meat: { name: 'Fleisch', value: 20, weight: 1.0, rarity: 'uncommon', uses: ['food', 'cooking', 'leather'] },
        leather: { name: 'Leder', value: 25, weight: 0.8, rarity: 'uncommon', uses: ['clothing', 'armor', 'furniture'] },
        wool: { name: 'Wolle', value: 18, weight: 0.3, rarity: 'uncommon', uses: ['clothing', 'textiles', 'insulation'] },
        cotton: { name: 'Baumwolle', value: 15, weight: 0.2, rarity: 'common', uses: ['clothing', 'textiles', 'medical'] },
        silk: { name: 'Seide', value: 40, weight: 0.1, rarity: 'rare', uses: ['clothing', 'textiles', 'luxury'] },
        honey: { name: 'Honig', value: 30, weight: 0.4, rarity: 'uncommon', uses: ['food', 'medicine', 'cooking'] },
        wax: { name: 'Wachs', value: 22, weight: 0.3, rarity: 'uncommon', uses: ['candles', 'waterproofing', 'cosmetics'] },
        resin: { name: 'Harz', value: 35, weight: 0.6, rarity: 'uncommon', uses: ['adhesive', 'varnish', 'medicine'] },
        sap: { name: 'Saft', value: 8, weight: 0.4, rarity: 'common', uses: ['food', 'medicine', 'fermentation'] },
        bark: { name: 'Rinde', value: 6, weight: 0.5, rarity: 'common', uses: ['medicine', 'dye', 'crafting'] },
        leaf: { name: 'Blatt', value: 2, weight: 0.1, rarity: 'common', uses: ['medicine', 'compost', 'crafting'] },
        root: { name: 'Wurzel', value: 12, weight: 0.3, rarity: 'uncommon', uses: ['medicine', 'food', 'dye'] },
        seed: { name: 'Samen', value: 5, weight: 0.05, rarity: 'common', uses: ['planting', 'food', 'oil'] },
        pollen: { name: 'Pollen', value: 20, weight: 0.02, rarity: 'rare', uses: ['medicine', 'research', 'allergy'] },
        nectar: { name: 'Nektar', value: 25, weight: 0.3, rarity: 'uncommon', uses: ['food', 'medicine', 'fermentation'] },
        milk: { name: 'Milch', value: 8, weight: 1.0, rarity: 'common', uses: ['food', 'cooking', 'cheese'] },
        egg: { name: 'Ei', value: 6, weight: 0.1, rarity: 'common', uses: ['food', 'cooking', 'baking'] },
        feather: { name: 'Feder', value: 15, weight: 0.05, rarity: 'uncommon', uses: ['decoration', 'crafting', 'writing'] },
        bone: { name: 'Knochen', value: 10, weight: 0.8, rarity: 'common', uses: ['tools', 'decoration', 'fertilizer'] },
        shell: { name: 'Muschel', value: 18, weight: 0.2, rarity: 'uncommon', uses: ['decoration', 'jewelry', 'lime'] },
        pearl: { name: 'Perle', value: 200, weight: 0.1, rarity: 'rare', uses: ['jewelry', 'decoration', 'medicine'] },
        coral: { name: 'Koralle', value: 80, weight: 0.5, rarity: 'rare', uses: ['decoration', 'jewelry', 'medicine'] },
        sponge: { name: 'Schwamm', value: 25, weight: 0.1, rarity: 'uncommon', uses: ['cleaning', 'medicine', 'crafting'] },
        algae: { name: 'Alge', value: 12, weight: 0.2, rarity: 'common', uses: ['food', 'medicine', 'biofuel'] },
        kelp: { name: 'Seetang', value: 15, weight: 0.3, rarity: 'common', uses: ['food', 'medicine', 'fertilizer'] },
        moss: { name: 'Moos', value: 8, weight: 0.1, rarity: 'common', uses: ['decoration', 'medicine', 'insulation'] },
        lichen: { name: 'Flechte', value: 20, weight: 0.1, rarity: 'uncommon', uses: ['medicine', 'dye', 'indicator'] },
        fungus: { name: 'Pilz', value: 25, weight: 0.2, rarity: 'uncommon', uses: ['food', 'medicine', 'decomposition'] },
        bacteria: { name: 'Bakterie', value: 50, weight: 0.001, rarity: 'rare', uses: ['medicine', 'research', 'fermentation'] },
        virus: { name: 'Virus', value: 100, weight: 0.0001, rarity: 'legendary', uses: ['research', 'medicine', 'weapon'] },
        protein: { name: 'Protein', value: 30, weight: 0.1, rarity: 'uncommon', uses: ['food', 'medicine', 'research'] },
        enzyme: { name: 'Enzym', value: 80, weight: 0.01, rarity: 'rare', uses: ['medicine', 'research', 'industry'] },
        hormone: { name: 'Hormon', value: 120, weight: 0.001, rarity: 'rare', uses: ['medicine', 'research', 'agriculture'] },
        vitamin: { name: 'Vitamin', value: 60, weight: 0.01, rarity: 'uncommon', uses: ['medicine', 'food', 'supplement'] },
        mineral: { name: 'Mineral', value: 40, weight: 0.5, rarity: 'uncommon', uses: ['medicine', 'supplement', 'industry'] },
        salt: { name: 'Salz', value: 5, weight: 0.8, rarity: 'common', uses: ['food', 'preservation', 'industry'] },
        sugar: { name: 'Zucker', value: 8, weight: 0.6, rarity: 'common', uses: ['food', 'cooking', 'fermentation'] },
        starch: { name: 'Stärke', value: 6, weight: 0.4, rarity: 'common', uses: ['food', 'cooking', 'industry'] },
        fiber: { name: 'Faser', value: 10, weight: 0.2, rarity: 'common', uses: ['textiles', 'rope', 'paper'] },
        oil_seed: { name: 'Ölsaat', value: 12, weight: 0.3, rarity: 'common', uses: ['oil', 'food', 'fuel'] },
        nut: { name: 'Nuss', value: 15, weight: 0.4, rarity: 'uncommon', uses: ['food', 'oil', 'medicine'] },
        berry: { name: 'Beere', value: 10, weight: 0.2, rarity: 'common', uses: ['food', 'medicine', 'dye'] },
        grain: { name: 'Getreide', value: 7, weight: 0.5, rarity: 'common', uses: ['food', 'cooking', 'feed'] },
        legume: { name: 'Hülsenfrucht', value: 9, weight: 0.3, rarity: 'common', uses: ['food', 'protein', 'fertilizer'] },
        tuber: { name: 'Knolle', value: 8, weight: 0.6, rarity: 'common', uses: ['food', 'starch', 'medicine'] },
        bulb: { name: 'Zwiebel', value: 11, weight: 0.4, rarity: 'common', uses: ['food', 'medicine', 'dye'] },
        rhizome: { name: 'Rhizom', value: 13, weight: 0.3, rarity: 'uncommon', uses: ['food', 'medicine', 'propagation'] },
        spore: { name: 'Spore', value: 35, weight: 0.001, rarity: 'rare', uses: ['propagation', 'medicine', 'research'] }
    },
    
    // Aktive Sammel-Aktivitäten
    collectionActivities: new Map(),
    
    // Sammel-Statistiken
    collectionStats: {
        totalResourcesCollected: 0,
        totalValueCollected: 0,
        activeCollectors: 0,
        mostCollectedResource: null,
        totalCollectionTime: 0
    },
    
    // Resource Collection System-Initialisierung
    init() {
        console.log('[RESOURCE_COLLECTION] Ressourcen-Sammlung-System initialisiert');
        this.initializeCollectionSites();
    },
    
    // Sammel-Standorte initialisieren
    initializeCollectionSites() {
        // Hier würden Sammel-Standorte in der Welt platziert werden
        console.log('[RESOURCE_COLLECTION] Sammel-Standorte initialisiert');
    },
    
    // Ressourcen sammeln
    collectResource(player, siteType, resourceType, toolType) {
        const site = this.collectionSites[siteType];
        if (!site) {
            player.outputChatBox('Sammel-Standort nicht gefunden!');
            return false;
        }
        
        if (!site.resources.includes(resourceType)) {
            player.outputChatBox('Diese Ressource ist an diesem Standort nicht verfügbar!');
            return false;
        }
        
        const tool = this.collectionTools[toolType];
        if (!tool) {
            player.outputChatBox('Sammel-Werkzeug nicht gefunden!');
            return false;
        }
        
        if (!player.inventory || !player.inventory.some(item => item.type === toolType)) {
            player.outputChatBox(`Du benötigst eine ${tool.name}!`);
            return false;
        }
        
        const resource = this.resourceConfig[resourceType];
        if (!resource) {
            player.outputChatBox('Ressourcen-Typ nicht gefunden!');
            return false;
        }
        
        // Sammel-Zeit berechnen
        const baseTime = 5000; // 5 Sekunden
        const difficultyMultiplier = site.difficulty;
        const toolEfficiency = tool.efficiency;
        const collectionTime = baseTime * difficultyMultiplier / toolEfficiency;
        
        const activityId = `collection_${player.id}_${Date.now()}`;
        const activity = {
            id: activityId,
            playerId: player.id,
            playerName: player.name,
            siteType: siteType,
            site: site,
            resourceType: resourceType,
            resource: resource,
            toolType: toolType,
            tool: tool,
            startTime: Date.now(),
            duration: collectionTime,
            status: 'active',
            created: Date.now()
        };
        
        this.collectionActivities.set(activityId, activity);
        
        player.outputChatBox(`Beginne ${resource.name} zu sammeln...`);
        player.call('ui:show', 'CollectionStarted', { activity: activity });
        
        // Sammel-Prozess nach Zeit abschließen
        setTimeout(() => {
            this.completeCollection(activityId);
        }, collectionTime);
        
        console.log(`[RESOURCE_COLLECTION] Sammel-Aktivität für Spieler ${player.id} gestartet`);
        return activityId;
    },
    
    // Sammel-Aktivität abschließen
    completeCollection(activityId) {
        const activity = this.collectionActivities.get(activityId);
        if (!activity) return false;
        
        const player = mp.players.at(activity.playerId);
        if (!player) return false;
        
        // Ressourcen-Menge berechnen
        const baseAmount = 1;
        const toolEfficiency = activity.tool.efficiency;
        const randomFactor = 0.5 + Math.random() * 0.5; // 0.5 bis 1.0
        const amount = Math.floor(baseAmount * toolEfficiency * randomFactor);
        
        // Ressourcen hinzufügen
        if (!player.inventory) player.inventory = [];
        
        const existingItem = player.inventory.find(item => item.type === activity.resourceType);
        if (existingItem) {
            existingItem.quantity += amount;
        } else {
            player.inventory.push({
                type: activity.resourceType,
                name: activity.resource.name,
                quantity: amount,
                value: activity.resource.value,
                weight: activity.resource.weight
            });
        }
        
        // Werkzeug-Abnutzung
        const toolItem = player.inventory.find(item => item.type === activity.toolType);
        if (toolItem) {
            toolItem.durability = Math.max(0, toolItem.durability - 1);
            if (toolItem.durability <= 0) {
                player.inventory = player.inventory.filter(item => item !== toolItem);
                player.outputChatBox(`${activity.tool.name} ist kaputt!`);
            }
        }
        
        activity.status = 'completed';
        activity.completionTime = Date.now();
        activity.amountCollected = amount;
        
        player.outputChatBox(`${amount}x ${activity.resource.name} gesammelt!`);
        player.call('ui:show', 'CollectionCompleted', { activity: activity });
        
        // Statistiken aktualisieren
        this.collectionStats.totalResourcesCollected += amount;
        this.collectionStats.totalValueCollected += amount * activity.resource.value;
        this.collectionStats.totalCollectionTime += activity.duration;
        
        console.log(`[RESOURCE_COLLECTION] Sammel-Aktivität ${activityId} abgeschlossen`);
        return true;
    },
    
    // Sammel-Aktivität abbrechen
    cancelCollection(player, activityId) {
        const activity = this.collectionActivities.get(activityId);
        if (!activity || activity.playerId !== player.id) {
            player.outputChatBox('Sammel-Aktivität nicht gefunden!');
            return false;
        }
        
        activity.status = 'cancelled';
        activity.cancellationTime = Date.now();
        
        player.outputChatBox('Sammel-Aktivität abgebrochen!');
        player.call('ui:show', 'CollectionCancelled', { activity: activity });
        
        console.log(`[RESOURCE_COLLECTION] Sammel-Aktivität ${activityId} abgebrochen`);
        return true;
    },
    
    // Verfügbare Ressourcen anzeigen
    showAvailableResources(player, siteType) {
        const site = this.collectionSites[siteType];
        if (!site) {
            player.outputChatBox('Sammel-Standort nicht gefunden!');
            return false;
        }
        
        player.outputChatBox(`=== Verfügbare Ressourcen in ${site.name} ===`);
        site.resources.forEach(resourceType => {
            const resource = this.resourceConfig[resourceType];
            if (resource) {
                player.outputChatBox(`${resource.name}: $${resource.value} (${resource.rarity})`);
            }
        });
        
        return true;
    },
    
    // Sammel-Statistiken
    getStatistics() {
        return {
            ...this.collectionStats,
            activeActivities: this.collectionActivities.size,
            totalSites: Object.keys(this.collectionSites).length,
            totalResources: Object.keys(this.resourceConfig).length,
            totalTools: Object.keys(this.collectionTools).length
        };
    }
};

// Events
mp.events.add('resource_collection:collect', (player, siteType, resourceType, toolType) => {
    resourceCollectionSystem.collectResource(player, siteType, resourceType, toolType);
});

mp.events.add('resource_collection:cancel', (player, activityId) => {
    resourceCollectionSystem.cancelCollection(player, activityId);
});

mp.events.add('resource_collection:showResources', (player, siteType) => {
    resourceCollectionSystem.showAvailableResources(player, siteType);
});

// Commands
mp.events.addCommand('collect', (player, fullText, siteType, resourceType, toolType) => {
    if (!siteType || !resourceType || !toolType) {
        player.outputChatBox('Verwendung: /collect [Standort] [Ressource] [Werkzeug]');
        player.outputChatBox('Verfügbare Standorte: forest, mountain, mine, quarry, river, lake, ocean, field');
        player.outputChatBox('Verfügbare Ressourcen: wood, stone, metal, coal, oil, water, sand, clay');
        player.outputChatBox('Verfügbare Werkzeuge: pickaxe, shovel, axe, hammer, drill, chainsaw');
        return;
    }
    
    resourceCollectionSystem.collectResource(player, siteType, resourceType, toolType);
});

mp.events.addCommand('resources', (player, fullText, siteType) => {
    if (siteType) {
        resourceCollectionSystem.showAvailableResources(player, siteType);
    } else {
        player.outputChatBox('Verfügbare Sammel-Standorte:');
        Object.keys(resourceCollectionSystem.collectionSites).forEach(site => {
            player.outputChatBox(`- ${site}: ${resourceCollectionSystem.collectionSites[site].name}`);
        });
    }
});

// Resource Collection System initialisieren
resourceCollectionSystem.init();

module.exports = resourceCollectionSystem;
