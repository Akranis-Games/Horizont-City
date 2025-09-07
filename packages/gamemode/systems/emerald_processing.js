// Emerald Processing System - Smaragdverarbeitungs-System mit Schleifen und Fassen
// Behandelt alle Smaragdverarbeitungs-Funktionen für Horizont-City Roleplay

const emeraldProcessingSystem = {
    // Smaragd-Schliffe
    emeraldCuts: {
        EMERALD_CUT: { name: 'Emeraldschliff', multiplier: 1.0, difficulty: 2, time: 45000 },
        ROUND: { name: 'Rundschliff', multiplier: 0.9, difficulty: 1, time: 35000 },
        OVAL: { name: 'Ovalschliff', multiplier: 0.95, difficulty: 2, time: 40000 },
        PEAR: { name: 'Birnenschliff', multiplier: 0.9, difficulty: 2, time: 42000 },
        CUSHION: { name: 'Kissenschliff', multiplier: 1.1, difficulty: 3, time: 50000 },
        RADIANT: { name: 'Radiantschliff', multiplier: 1.2, difficulty: 3, time: 55000 },
        PRINCESS: { name: 'Princessschliff', multiplier: 1.15, difficulty: 2, time: 48000 },
        HEART: { name: 'Herzschliff', multiplier: 0.8, difficulty: 4, time: 60000 }
    },
    
    // Smaragd-Qualitäten
    emeraldQualities: {
        COMMERCIAL: { name: 'Kommerziell', multiplier: 0.4, color: 'Light Green', clarity: 'I3' },
        GOOD: { name: 'Gut', multiplier: 0.6, color: 'Medium Green', clarity: 'I2' },
        FINE: { name: 'Fein', multiplier: 0.8, color: 'Rich Green', clarity: 'I1' },
        VERY_FINE: { name: 'Sehr fein', multiplier: 1.0, color: 'Vivid Green', clarity: 'SI2' },
        EXCELLENT: { name: 'Ausgezeichnet', multiplier: 1.3, color: 'Intense Green', clarity: 'SI1' },
        EXCEPTIONAL: { name: 'Außergewöhnlich', multiplier: 1.6, color: 'Deep Green', clarity: 'VS2' },
        RARE: { name: 'Selten', multiplier: 2.0, color: 'Forest Green', clarity: 'VS1' },
        LEGENDARY: { name: 'Legendär', multiplier: 3.0, color: 'Emerald Green', clarity: 'VVS1' }
    },
    
    // Smaragd-Größen
    emeraldSizes: {
        SMALL: { name: 'Klein', carat: 0.5, multiplier: 1.0 },
        MEDIUM: { name: 'Mittel', carat: 1.0, multiplier: 2.5 },
        LARGE: { name: 'Groß', carat: 2.0, multiplier: 6.0 },
        VERY_LARGE: { name: 'Sehr groß', carat: 3.0, multiplier: 10.0 },
        HUGE: { name: 'Riesig', carat: 5.0, multiplier: 25.0 }
    },
    
    // Smaragd-Produkte
    emeraldProducts: {
        EMERALD_GEM: { name: 'Smaragd', value: 800, weight: 0.1, cut: 'emerald_cut' },
        EMERALD_RING: { name: 'Smaragdring', value: 1500, weight: 0.05, cut: 'emerald_cut' },
        EMERALD_NECKLACE: { name: 'Smaragdkette', value: 2500, weight: 0.08, cut: 'emerald_cut' },
        EMERALD_EARRINGS: { name: 'Smaragdohrringe', value: 1200, weight: 0.03, cut: 'emerald_cut' },
        EMERALD_BRACELET: { name: 'Smaragdarmband', value: 2000, weight: 0.06, cut: 'emerald_cut' },
        EMERALD_PENDANT: { name: 'Smaragdanhänger', value: 1800, weight: 0.04, cut: 'emerald_cut' },
        EMERALD_TIARA: { name: 'Smaragddiadem', value: 8000, weight: 0.15, cut: 'emerald_cut' },
        EMERALD_CROWN: { name: 'Smaragdkrone', value: 15000, weight: 0.3, cut: 'emerald_cut' }
    },
    
    // Verarbeitungs-Werkzeuge
    processingTools: {
        EMERALD_SAW: { name: 'Smaragdsäge', efficiency: 1.0, durability: 120, cost: 800 },
        PRECISION_CUTTER: { name: 'Präzisionsschneider', efficiency: 1.5, durability: 150, cost: 1200 },
        POLISHING_WHEEL: { name: 'Polierrad', efficiency: 1.3, durability: 100, cost: 600 },
        FACETING_MACHINE: { name: 'Facettier-Maschine', efficiency: 2.0, durability: 200, cost: 2000 },
        MASTER_CUTTER: { name: 'Meisterschneider', efficiency: 2.5, durability: 300, cost: 5000 },
        LASER_CUTTER: { name: 'Laserschneider', efficiency: 1.8, durability: 180, cost: 3000 }
    },
    
    // Aktive Verarbeitungs-Aktivitäten
    processingActivities: new Map(),
    
    // Smaragd-Verarbeitungs-Statistiken
    processingStats: {
        totalEmeraldsProcessed: 0,
        totalValueCreated: 0,
        activeProcessors: 0,
        mostPopularCut: null,
        totalProcessingTime: 0
    },
    
    // Emerald Processing System-Initialisierung
    init() {
        console.log('[EMERALD_PROCESSING] Smaragdverarbeitungs-System initialisiert');
    },
    
    // Smaragd verarbeiten
    processEmerald(player, emeraldOreId, cutType, toolType, productType = null) {
        const cut = this.emeraldCuts[cutType];
        if (!cut) {
            player.outputChatBox('Schliff-Typ nicht gefunden!');
            return false;
        }
        
        const tool = this.processingTools[toolType];
        if (!tool) {
            player.outputChatBox('Verarbeitungswerkzeug nicht gefunden!');
            return false;
        }
        
        if (!player.inventory || !player.inventory.some(item => item.type === 'emerald_ore')) {
            player.outputChatBox('Du benötigst Smaragderz!');
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
            cutType: cutType,
            cut: cut,
            toolType: toolType,
            tool: tool,
            productType: productType,
            startTime: Date.now(),
            duration: cut.time,
            status: 'active',
            created: Date.now()
        };
        
        this.processingActivities.set(activityId, activity);
        
        player.outputChatBox(`Beginne Smaragd im ${cut.name} zu verarbeiten...`);
        player.call('ui:show', 'EmeraldProcessingStarted', { activity: activity });
        
        // Verarbeitungs-Prozess nach Zeit abschließen
        setTimeout(() => {
            this.completeProcessing(activityId);
        }, cut.time);
        
        console.log(`[EMERALD_PROCESSING] Verarbeitungs-Aktivität für Spieler ${player.id} gestartet`);
        return activityId;
    },
    
    // Verarbeitungs-Aktivität abschließen
    completeProcessing(activityId) {
        const activity = this.processingActivities.get(activityId);
        if (!activity) return false;
        
        const player = mp.players.at(activity.playerId);
        if (!player) return false;
        
        // Smaragderz verbrauchen
        const emeraldItem = player.inventory.find(item => item.type === 'emerald_ore');
        if (emeraldItem) {
            emeraldItem.quantity -= 1;
            if (emeraldItem.quantity <= 0) {
                player.inventory = player.inventory.filter(item => item !== emeraldItem);
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
        if (activity.productType && this.emeraldProducts[activity.productType]) {
            product = { ...this.emeraldProducts[activity.productType] };
        } else {
            product = { ...this.emeraldProducts.EMERALD_GEM };
        }
        
        // Wert basierend auf Schliff, Qualität und Größe berechnen
        const baseValue = product.value;
        const cutMultiplier = activity.cut.multiplier;
        const qualityMultiplier = this.getRandomQuality().multiplier;
        const sizeMultiplier = this.getRandomSize().multiplier;
        const toolMultiplier = activity.tool.efficiency;
        
        const finalValue = Math.floor(baseValue * cutMultiplier * qualityMultiplier * sizeMultiplier * toolMultiplier);
        
        product.value = finalValue;
        product.cut = activity.cutType;
        product.quality = this.getRandomQuality().name;
        product.size = this.getRandomSize().name;
        
        if (!player.inventory) player.inventory = [];
        player.inventory.push(product);
        
        activity.status = 'completed';
        activity.completionTime = Date.now();
        activity.finalProduct = product;
        
        player.outputChatBox(`${product.name} (${activity.cut.name}) hergestellt! Wert: $${finalValue}`);
        player.call('ui:show', 'EmeraldProcessingCompleted', { activity: activity, product: product });
        
        // Statistiken aktualisieren
        this.processingStats.totalEmeraldsProcessed++;
        this.processingStats.totalValueCreated += finalValue;
        this.processingStats.totalProcessingTime += activity.duration;
        
        console.log(`[EMERALD_PROCESSING] Verarbeitungs-Aktivität ${activityId} abgeschlossen`);
        return true;
    },
    
    // Zufällige Qualität ermitteln
    getRandomQuality() {
        const qualities = Object.values(this.emeraldQualities);
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
        const sizes = Object.values(this.emeraldSizes);
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
        player.outputChatBox('=== Verfügbare Smaragd-Schliffe ===');
        Object.keys(this.emeraldCuts).forEach(cutType => {
            const cut = this.emeraldCuts[cutType];
            player.outputChatBox(`${cut.name}: Schwierigkeit ${cut.difficulty}, Zeit ${cut.time/1000}s`);
        });
    },
    
    // Verfügbare Produkte anzeigen
    showProducts(player) {
        player.outputChatBox('=== Verfügbare Smaragd-Produkte ===');
        Object.keys(this.emeraldProducts).forEach(productType => {
            const product = this.emeraldProducts[productType];
            player.outputChatBox(`${product.name}: $${product.value}`);
        });
    },
    
    // Verarbeitungs-Statistiken
    getStatistics() {
        return {
            ...this.processingStats,
            activeActivities: this.processingActivities.size,
            totalCuts: Object.keys(this.emeraldCuts).length,
            totalProducts: Object.keys(this.emeraldProducts).length,
            totalQualities: Object.keys(this.emeraldQualities).length
        };
    }
};

// Events
mp.events.add('emerald_processing:process', (player, cutType, toolType, productType) => {
    emeraldProcessingSystem.processEmerald(player, 'emerald_ore', cutType, toolType, productType);
});

mp.events.add('emerald_processing:showCuts', (player) => {
    emeraldProcessingSystem.showCuts(player);
});

mp.events.add('emerald_processing:showProducts', (player) => {
    emeraldProcessingSystem.showProducts(player);
});

// Commands
mp.events.addCommand('processemerald', (player, fullText, cutType, toolType, productType) => {
    if (!cutType || !toolType) {
        player.outputChatBox('Verwendung: /processemerald [Schliff] [Werkzeug] [Produkt]');
        player.outputChatBox('Verfügbare Schliffe: emerald_cut, round, oval, pear, cushion, radiant, princess, heart');
        player.outputChatBox('Verfügbare Werkzeuge: emerald_saw, precision_cutter, polishing_wheel, faceting_machine');
        return;
    }
    
    emeraldProcessingSystem.processEmerald(player, 'emerald_ore', cutType, toolType, productType);
});

mp.events.addCommand('emeraldcuts', (player) => {
    emeraldProcessingSystem.showCuts(player);
});

mp.events.addCommand('emeraldproducts', (player) => {
    emeraldProcessingSystem.showProducts(player);
});

// Emerald Processing System initialisieren
emeraldProcessingSystem.init();

module.exports = emeraldProcessingSystem;
