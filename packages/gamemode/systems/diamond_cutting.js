// Diamond Cutting System - Diamantschleif-System mit verschiedenen Schliffen
// Behandelt alle Diamantschleif-Funktionen für Horizont-City Roleplay

const diamondCuttingSystem = {
    // Diamant-Schliffe
    diamondCuts: {
        ROUND: { name: 'Rundschliff', multiplier: 1.0, difficulty: 1, time: 30000 },
        EMERALD: { name: 'Emeraldschliff', multiplier: 0.9, difficulty: 2, time: 40000 },
        PRINCESS: { name: 'Princessschliff', multiplier: 1.1, difficulty: 2, time: 35000 },
        OVAL: { name: 'Ovalschliff', multiplier: 0.95, difficulty: 1, time: 32000 },
        PEAR: { name: 'Birnenschliff', multiplier: 0.9, difficulty: 2, time: 38000 },
        MARQUISE: { name: 'Marquiseschliff', multiplier: 1.05, difficulty: 3, time: 45000 },
        HEART: { name: 'Herzschliff', multiplier: 0.85, difficulty: 4, time: 50000 },
        CUSHION: { name: 'Kissenschliff', multiplier: 0.9, difficulty: 2, time: 36000 },
        RADIANT: { name: 'Radiantschliff', multiplier: 1.15, difficulty: 3, time: 42000 },
        ASSCHER: { name: 'Asscherschliff', multiplier: 0.8, difficulty: 3, time: 40000 },
        BAGUETTE: { name: 'Baguetteschliff', multiplier: 0.7, difficulty: 1, time: 25000 },
        TRILLION: { name: 'Trillionschliff', multiplier: 0.75, difficulty: 2, time: 30000 }
    },
    
    // Diamant-Qualitäten
    diamondQualities: {
        POOR: { name: 'Schlecht', multiplier: 0.3, color: 'Brown', clarity: 'I3' },
        FAIR: { name: 'Mäßig', multiplier: 0.5, color: 'K', clarity: 'I2' },
        GOOD: { name: 'Gut', multiplier: 0.7, color: 'J', clarity: 'I1' },
        VERY_GOOD: { name: 'Sehr gut', multiplier: 0.85, color: 'H', clarity: 'SI2' },
        EXCELLENT: { name: 'Ausgezeichnet', multiplier: 1.0, color: 'G', clarity: 'SI1' },
        PREMIUM: { name: 'Premium', multiplier: 1.2, color: 'F', clarity: 'VS2' },
        IDEAL: { name: 'Ideal', multiplier: 1.5, color: 'E', clarity: 'VS1' },
        FLAWLESS: { name: 'Fehlerfrei', multiplier: 2.0, color: 'D', clarity: 'FL' }
    },
    
    // Diamant-Größen
    diamondSizes: {
        SMALL: { name: 'Klein', carat: 0.25, multiplier: 0.5 },
        MEDIUM: { name: 'Mittel', carat: 0.5, multiplier: 1.0 },
        LARGE: { name: 'Groß', carat: 1.0, multiplier: 2.0 },
        VERY_LARGE: { name: 'Sehr groß', carat: 2.0, multiplier: 4.0 },
        HUGE: { name: 'Riesig', carat: 5.0, multiplier: 10.0 }
    },
    
    // Schleif-Werkzeuge
    cuttingTools: {
        DIAMOND_SAW: { name: 'Diamantsäge', efficiency: 1.0, durability: 100, cost: 500 },
        LASER_CUTTER: { name: 'Laserschneider', efficiency: 1.5, durability: 150, cost: 1000 },
        DIAMOND_WHEEL: { name: 'Diamantrad', efficiency: 1.2, durability: 120, cost: 750 },
        PRECISION_CUTTER: { name: 'Präzisionsschneider', efficiency: 1.8, durability: 200, cost: 2000 },
        MASTER_CUTTER: { name: 'Meisterschneider', efficiency: 2.0, durability: 300, cost: 5000 }
    },
    
    // Aktive Schleif-Aktivitäten
    cuttingActivities: new Map(),
    
    // Diamant-Schleif-Statistiken
    cuttingStats: {
        totalDiamondsCut: 0,
        totalValueCreated: 0,
        activeCutters: 0,
        mostPopularCut: null,
        totalCuttingTime: 0
    },
    
    // Diamond Cutting System-Initialisierung
    init() {
        console.log('[DIAMOND_CUTTING] Diamantschleif-System initialisiert');
    },
    
    // Diamant schleifen
    cutDiamond(player, diamondId, cutType, toolType) {
        const cut = this.diamondCuts[cutType];
        if (!cut) {
            player.outputChatBox('Schliff-Typ nicht gefunden!');
            return false;
        }
        
        const tool = this.cuttingTools[toolType];
        if (!tool) {
            player.outputChatBox('Schleif-Werkzeug nicht gefunden!');
            return false;
        }
        
        if (!player.inventory || !player.inventory.some(item => item.type === 'diamond_ore')) {
            player.outputChatBox('Du benötigst Diamanterz!');
            return false;
        }
        
        if (!player.inventory.some(item => item.type === toolType)) {
            player.outputChatBox(`Du benötigst eine ${tool.name}!`);
            return false;
        }
        
        const activityId = `cutting_${player.id}_${Date.now()}`;
        const activity = {
            id: activityId,
            playerId: player.id,
            playerName: player.name,
            cutType: cutType,
            cut: cut,
            toolType: toolType,
            tool: tool,
            startTime: Date.now(),
            duration: cut.time,
            status: 'active',
            created: Date.now()
        };
        
        this.cuttingActivities.set(activityId, activity);
        
        player.outputChatBox(`Beginne Diamant im ${cut.name} zu schleifen...`);
        player.call('ui:show', 'DiamondCuttingStarted', { activity: activity });
        
        // Schleif-Prozess nach Zeit abschließen
        setTimeout(() => {
            this.completeCutting(activityId);
        }, cut.time);
        
        console.log(`[DIAMOND_CUTTING] Schleif-Aktivität für Spieler ${player.id} gestartet`);
        return activityId;
    },
    
    // Schleif-Aktivität abschließen
    completeCutting(activityId) {
        const activity = this.cuttingActivities.get(activityId);
        if (!activity) return false;
        
        const player = mp.players.at(activity.playerId);
        if (!player) return false;
        
        // Diamanterz verbrauchen
        const diamondItem = player.inventory.find(item => item.type === 'diamond_ore');
        if (diamondItem) {
            diamondItem.quantity -= 1;
            if (diamondItem.quantity <= 0) {
                player.inventory = player.inventory.filter(item => item !== diamondItem);
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
        
        // Geschliffenen Diamanten erstellen
        const baseValue = 500;
        const cutMultiplier = activity.cut.multiplier;
        const qualityMultiplier = this.getRandomQuality().multiplier;
        const sizeMultiplier = this.getRandomSize().multiplier;
        const finalValue = Math.floor(baseValue * cutMultiplier * qualityMultiplier * sizeMultiplier);
        
        const cutDiamond = {
            type: 'cut_diamond',
            name: `Geschliffener Diamant (${activity.cut.name})`,
            quantity: 1,
            value: finalValue,
            weight: 0.1,
            cut: activity.cutType,
            quality: this.getRandomQuality().name,
            size: this.getRandomSize().name
        };
        
        if (!player.inventory) player.inventory = [];
        player.inventory.push(cutDiamond);
        
        activity.status = 'completed';
        activity.completionTime = Date.now();
        activity.finalValue = finalValue;
        
        player.outputChatBox(`Diamant im ${activity.cut.name} geschliffen! Wert: $${finalValue}`);
        player.call('ui:show', 'DiamondCuttingCompleted', { activity: activity, diamond: cutDiamond });
        
        // Statistiken aktualisieren
        this.cuttingStats.totalDiamondsCut++;
        this.cuttingStats.totalValueCreated += finalValue;
        this.cuttingStats.totalCuttingTime += activity.duration;
        
        console.log(`[DIAMOND_CUTTING] Schleif-Aktivität ${activityId} abgeschlossen`);
        return true;
    },
    
    // Zufällige Qualität ermitteln
    getRandomQuality() {
        const qualities = Object.values(this.diamondQualities);
        const weights = qualities.map(q => q.multiplier);
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < qualities.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return qualities[i];
            }
        }
        
        return qualities[0];
    },
    
    // Zufällige Größe ermitteln
    getRandomSize() {
        const sizes = Object.values(this.diamondSizes);
        const weights = sizes.map(s => s.multiplier);
        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;
        
        for (let i = 0; i < sizes.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return sizes[i];
            }
        }
        
        return sizes[0];
    },
    
    // Verfügbare Schliffe anzeigen
    showCuts(player) {
        player.outputChatBox('=== Verfügbare Diamant-Schliffe ===');
        Object.keys(this.diamondCuts).forEach(cutType => {
            const cut = this.diamondCuts[cutType];
            player.outputChatBox(`${cut.name}: Schwierigkeit ${cut.difficulty}, Zeit ${cut.time/1000}s`);
        });
    },
    
    // Schleif-Statistiken
    getStatistics() {
        return {
            ...this.cuttingStats,
            activeActivities: this.cuttingActivities.size,
            totalCuts: Object.keys(this.diamondCuts).length,
            totalQualities: Object.keys(this.diamondQualities).length,
            totalSizes: Object.keys(this.diamondSizes).length
        };
    }
};

// Events
mp.events.add('diamond_cutting:cut', (player, cutType, toolType) => {
    diamondCuttingSystem.cutDiamond(player, 'diamond_ore', cutType, toolType);
});

mp.events.add('diamond_cutting:showCuts', (player) => {
    diamondCuttingSystem.showCuts(player);
});

// Commands
mp.events.addCommand('cutdiamond', (player, fullText, cutType, toolType) => {
    if (!cutType || !toolType) {
        player.outputChatBox('Verwendung: /cutdiamond [Schliff] [Werkzeug]');
        player.outputChatBox('Verfügbare Schliffe: round, emerald, princess, oval, pear, marquise, heart');
        player.outputChatBox('Verfügbare Werkzeuge: diamond_saw, laser_cutter, diamond_wheel, precision_cutter');
        return;
    }
    
    diamondCuttingSystem.cutDiamond(player, 'diamond_ore', cutType, toolType);
});

mp.events.addCommand('diamondcuts', (player) => {
    diamondCuttingSystem.showCuts(player);
});

// Diamond Cutting System initialisieren
diamondCuttingSystem.init();

module.exports = diamondCuttingSystem;
