// Gold Processing System - Goldverarbeitungs-System mit Raffination und Schmuckherstellung
// Behandelt alle Goldverarbeitungs-Funktionen für Horizont-City Roleplay

const goldProcessingSystem = {
    // Gold-Verarbeitungsstufen
    processingStages: {
        SMELTING: { name: 'Schmelzen', time: 30000, skill: 'metallurgy', level: 1 },
        REFINING: { name: 'Raffination', time: 45000, skill: 'metallurgy', level: 2 },
        ALLOYING: { name: 'Legierung', time: 25000, skill: 'metallurgy', level: 2 },
        CASTING: { name: 'Gießen', time: 20000, skill: 'casting', level: 1 },
        FORGING: { name: 'Schmieden', time: 35000, skill: 'forging', level: 2 },
        POLISHING: { name: 'Polieren', time: 15000, skill: 'jewelry', level: 1 },
        ENGRAVING: { name: 'Gravieren', time: 40000, skill: 'jewelry', level: 3 },
        SETTING: { name: 'Fassen', time: 30000, skill: 'jewelry', level: 2 }
    },
    
    // Gold-Legierungen
    goldAlloys: {
        PURE_GOLD: { name: 'Reines Gold', purity: 24, karat: 24, value: 1000 },
        ROSE_GOLD: { name: 'Roségold', purity: 18, karat: 18, value: 750, copper: 25 },
        WHITE_GOLD: { name: 'Weißgold', purity: 18, karat: 18, value: 800, palladium: 20 },
        YELLOW_GOLD: { name: 'Gelbgold', purity: 18, karat: 18, value: 750, silver: 15 },
        GREEN_GOLD: { name: 'Grüngold', purity: 18, karat: 18, value: 700, silver: 25 },
        PLATINUM_GOLD: { name: 'Platingold', purity: 18, karat: 18, value: 900, platinum: 30 }
    },
    
    // Gold-Produkte
    goldProducts: {
        GOLD_BAR: { name: 'Goldbarren', value: 5000, weight: 1.0, purity: 24 },
        GOLD_COIN: { name: 'Goldmünze', value: 100, weight: 0.02, purity: 24 },
        GOLD_RING: { name: 'Goldring', value: 800, weight: 0.01, purity: 18 },
        GOLD_NECKLACE: { name: 'Goldkette', value: 1200, weight: 0.02, purity: 18 },
        GOLD_BRACELET: { name: 'Goldarmband', value: 1000, weight: 0.015, purity: 18 },
        GOLD_EARRINGS: { name: 'Goldohrringe', value: 600, weight: 0.008, purity: 18 },
        GOLD_WATCH: { name: 'Golduhr', value: 3000, weight: 0.05, purity: 18 },
        GOLD_CROWN: { name: 'Goldkrone', value: 10000, weight: 0.2, purity: 24 }
    },
    
    // Verarbeitungs-Werkzeuge
    processingTools: {
        FURNACE: { name: 'Ofen', efficiency: 1.0, durability: 200, cost: 1000 },
        CRUCIBLE: { name: 'Tiegel', efficiency: 1.2, durability: 150, cost: 500 },
        MOLD: { name: 'Gussform', efficiency: 1.1, durability: 100, cost: 300 },
        HAMMER: { name: 'Hammer', efficiency: 1.0, durability: 120, cost: 200 },
        FILE: { name: 'Feile', efficiency: 0.8, durability: 80, cost: 100 },
        POLISHING_WHEEL: { name: 'Polierrad', efficiency: 1.5, durability: 180, cost: 800 },
        ENGRAVING_TOOL: { name: 'Graviermesser', efficiency: 1.3, durability: 100, cost: 600 },
        SETTING_TOOL: { name: 'Fasswerkzeug', efficiency: 1.4, durability: 90, cost: 400 }
    },
    
    // Aktive Verarbeitungs-Aktivitäten
    processingActivities: new Map(),
    
    // Gold-Verarbeitungs-Statistiken
    processingStats: {
        totalGoldProcessed: 0,
        totalValueCreated: 0,
        activeProcessors: 0,
        mostPopularProduct: null,
        totalProcessingTime: 0
    },
    
    // Gold Processing System-Initialisierung
    init() {
        console.log('[GOLD_PROCESSING] Goldverarbeitungs-System initialisiert');
    },
    
    // Gold verarbeiten
    processGold(player, goldOreId, stage, toolType, productType = null) {
        const processingStage = this.processingStages[stage];
        if (!processingStage) {
            player.outputChatBox('Verarbeitungsstufe nicht gefunden!');
            return false;
        }
        
        const tool = this.processingTools[toolType];
        if (!tool) {
            player.outputChatBox('Verarbeitungswerkzeug nicht gefunden!');
            return false;
        }
        
        if (!player.inventory || !player.inventory.some(item => item.type === 'gold_ore')) {
            player.outputChatBox('Du benötigst Golderz!');
            return false;
        }
        
        if (!player.inventory.some(item => item.type === toolType)) {
            player.outputChatBox(`Du benötigst ein ${tool.name}!`);
            return false;
        }
        
        const activityId = `processing_${player.id}_${Date.now()}`;
        const activity = {
            id: activityId,
            playerId: player.id,
            playerName: player.name,
            stage: stage,
            processingStage: processingStage,
            toolType: toolType,
            tool: tool,
            productType: productType,
            startTime: Date.now(),
            duration: processingStage.time,
            status: 'active',
            created: Date.now()
        };
        
        this.processingActivities.set(activityId, activity);
        
        player.outputChatBox(`Beginne Gold ${processingStage.name}...`);
        player.call('ui:show', 'GoldProcessingStarted', { activity: activity });
        
        // Verarbeitungs-Prozess nach Zeit abschließen
        setTimeout(() => {
            this.completeProcessing(activityId);
        }, processingStage.time);
        
        console.log(`[GOLD_PROCESSING] Verarbeitungs-Aktivität für Spieler ${player.id} gestartet`);
        return activityId;
    },
    
    // Verarbeitungs-Aktivität abschließen
    completeProcessing(activityId) {
        const activity = this.processingActivities.get(activityId);
        if (!activity) return false;
        
        const player = mp.players.at(activity.playerId);
        if (!player) return false;
        
        // Golderz verbrauchen
        const goldItem = player.inventory.find(item => item.type === 'gold_ore');
        if (goldItem) {
            goldItem.quantity -= 1;
            if (goldItem.quantity <= 0) {
                player.inventory = player.inventory.filter(item => item !== goldItem);
            }
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
        
        // Verarbeitetes Produkt erstellen
        let product;
        if (activity.productType && this.goldProducts[activity.productType]) {
            product = { ...this.goldProducts[activity.productType] };
        } else {
            // Standard-Produkt basierend auf Verarbeitungsstufe
            switch (activity.stage) {
                case 'SMELTING':
                    product = { ...this.goldProducts.GOLD_BAR };
                    break;
                case 'REFINING':
                    product = { ...this.goldProducts.GOLD_COIN };
                    break;
                case 'CASTING':
                    product = { ...this.goldProducts.GOLD_RING };
                    break;
                default:
                    product = { ...this.goldProducts.GOLD_BAR };
            }
        }
        
        // Wert basierend auf Verarbeitungsstufe anpassen
        const stageMultiplier = activity.processingStage.level * 0.2 + 1;
        product.value = Math.floor(product.value * stageMultiplier);
        
        if (!player.inventory) player.inventory = [];
        player.inventory.push(product);
        
        activity.status = 'completed';
        activity.completionTime = Date.now();
        activity.finalProduct = product;
        
        player.outputChatBox(`${product.name} hergestellt! Wert: $${product.value}`);
        player.call('ui:show', 'GoldProcessingCompleted', { activity: activity, product: product });
        
        // Statistiken aktualisieren
        this.processingStats.totalGoldProcessed++;
        this.processingStats.totalValueCreated += product.value;
        this.processingStats.totalProcessingTime += activity.duration;
        
        console.log(`[GOLD_PROCESSING] Verarbeitungs-Aktivität ${activityId} abgeschlossen`);
        return true;
    },
    
    // Verfügbare Verarbeitungsstufen anzeigen
    showStages(player) {
        player.outputChatBox('=== Verfügbare Gold-Verarbeitungsstufen ===');
        Object.keys(this.processingStages).forEach(stage => {
            const processingStage = this.processingStages[stage];
            player.outputChatBox(`${processingStage.name}: Level ${processingStage.level}, Zeit ${processingStage.time/1000}s`);
        });
    },
    
    // Verfügbare Produkte anzeigen
    showProducts(player) {
        player.outputChatBox('=== Verfügbare Gold-Produkte ===');
        Object.keys(this.goldProducts).forEach(productType => {
            const product = this.goldProducts[productType];
            player.outputChatBox(`${product.name}: $${product.value} (${product.purity}K)`);
        });
    },
    
    // Verarbeitungs-Statistiken
    getStatistics() {
        return {
            ...this.processingStats,
            activeActivities: this.processingActivities.size,
            totalStages: Object.keys(this.processingStages).length,
            totalProducts: Object.keys(this.goldProducts).length,
            totalAlloys: Object.keys(this.goldAlloys).length
        };
    }
};

// Events
mp.events.add('gold_processing:process', (player, stage, toolType, productType) => {
    goldProcessingSystem.processGold(player, 'gold_ore', stage, toolType, productType);
});

mp.events.add('gold_processing:showStages', (player) => {
    goldProcessingSystem.showStages(player);
});

mp.events.add('gold_processing:showProducts', (player) => {
    goldProcessingSystem.showProducts(player);
});

// Commands
mp.events.addCommand('processgold', (player, fullText, stage, toolType, productType) => {
    if (!stage || !toolType) {
        player.outputChatBox('Verwendung: /processgold [Stufe] [Werkzeug] [Produkt]');
        player.outputChatBox('Verfügbare Stufen: smelting, refining, alloying, casting, forging, polishing');
        player.outputChatBox('Verfügbare Werkzeuge: furnace, crucible, mold, hammer, file, polishing_wheel');
        return;
    }
    
    goldProcessingSystem.processGold(player, 'gold_ore', stage, toolType, productType);
});

mp.events.addCommand('goldstages', (player) => {
    goldProcessingSystem.showStages(player);
});

mp.events.addCommand('goldproducts', (player) => {
    goldProcessingSystem.showProducts(player);
});

// Gold Processing System initialisieren
goldProcessingSystem.init();

module.exports = goldProcessingSystem;
