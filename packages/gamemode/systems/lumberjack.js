// Lumberjack System - Baumfällen-System
// Behandelt alle Baumfäll-Funktionen für Horizont-City Roleplay

const lumberjackSystem = {
    // Baum-Typen
    treeTypes: {
        OAK: 'oak',
        PINE: 'pine',
        MAPLE: 'maple',
        BIRCH: 'birch',
        CHERRY: 'cherry',
        WALNUT: 'walnut',
        CEDAR: 'cedar',
        REDWOOD: 'redwood'
    },
    
    // Baum-Konfiguration
    treeConfig: {
        oak: {
            name: 'Eiche',
            health: 100,
            respawnTime: 300000, // 5 Minuten
            experience: 10,
            woodAmount: { min: 3, max: 8 },
            rarity: 'common',
            color: '#8B4513'
        },
        pine: {
            name: 'Kiefer',
            health: 80,
            respawnTime: 240000, // 4 Minuten
            experience: 8,
            woodAmount: { min: 2, max: 6 },
            rarity: 'common',
            color: '#228B22'
        },
        maple: {
            name: 'Ahorn',
            health: 90,
            respawnTime: 270000, // 4.5 Minuten
            experience: 9,
            woodAmount: { min: 2, max: 7 },
            rarity: 'common',
            color: '#FF4500'
        },
        birch: {
            name: 'Birke',
            health: 70,
            respawnTime: 210000, // 3.5 Minuten
            experience: 7,
            woodAmount: { min: 1, max: 5 },
            rarity: 'common',
            color: '#F5F5DC'
        },
        cherry: {
            name: 'Kirsche',
            health: 85,
            respawnTime: 255000, // 4.25 Minuten
            experience: 8,
            woodAmount: { min: 2, max: 6 },
            rarity: 'uncommon',
            color: '#DC143C'
        },
        walnut: {
            name: 'Walnuss',
            health: 95,
            respawnTime: 285000, // 4.75 Minuten
            experience: 9,
            woodAmount: { min: 3, max: 7 },
            rarity: 'uncommon',
            color: '#8B4513'
        },
        cedar: {
            name: 'Zeder',
            health: 110,
            respawnTime: 330000, // 5.5 Minuten
            experience: 11,
            woodAmount: { min: 4, max: 9 },
            rarity: 'rare',
            color: '#2F4F4F'
        },
        redwood: {
            name: 'Redwood',
            health: 150,
            respawnTime: 600000, // 10 Minuten
            experience: 20,
            woodAmount: { min: 8, max: 15 },
            rarity: 'legendary',
            color: '#8B0000'
        }
    },
    
    // Werkzeuge
    tools: {
        AXE: 'axe',
        CHAINSAW: 'chainsaw',
        HANDSAW: 'handsaw',
        MACHETE: 'machete'
    },
    
    // Werkzeug-Konfiguration
    toolConfig: {
        axe: {
            name: 'Axt',
            damage: 15,
            speed: 1000, // 1 Sekunde
            durability: 100,
            price: 50,
            level: 1
        },
        chainsaw: {
            name: 'Kettensäge',
            damage: 25,
            speed: 500, // 0.5 Sekunden
            durability: 200,
            price: 200,
            level: 5
        },
        handsaw: {
            name: 'Handsäge',
            damage: 10,
            speed: 1500, // 1.5 Sekunden
            durability: 80,
            price: 25,
            level: 1
        },
        machete: {
            name: 'Machete',
            damage: 12,
            speed: 800, // 0.8 Sekunden
            durability: 60,
            price: 30,
            level: 2
        }
    },
    
    // Baum-Standorte
    treeLocations: [
        // Eichen
        { x: -2000, y: 2000, z: 50, type: 'oak', id: 'oak_1' },
        { x: -1950, y: 2050, z: 52, type: 'oak', id: 'oak_2' },
        { x: -1900, y: 2100, z: 48, type: 'oak', id: 'oak_3' },
        
        // Kiefern
        { x: -1800, y: 2200, z: 55, type: 'pine', id: 'pine_1' },
        { x: -1750, y: 2250, z: 53, type: 'pine', id: 'pine_2' },
        { x: -1700, y: 2300, z: 51, type: 'pine', id: 'pine_3' },
        
        // Ahorn
        { x: -1600, y: 2400, z: 49, type: 'maple', id: 'maple_1' },
        { x: -1550, y: 2450, z: 47, type: 'maple', id: 'maple_2' },
        
        // Birken
        { x: -1400, y: 2600, z: 46, type: 'birch', id: 'birch_1' },
        { x: -1350, y: 2650, z: 44, type: 'birch', id: 'birch_2' },
        
        // Kirschen
        { x: -1200, y: 2800, z: 45, type: 'cherry', id: 'cherry_1' },
        { x: -1150, y: 2850, z: 43, type: 'cherry', id: 'cherry_2' },
        
        // Walnuss
        { x: -1000, y: 3000, z: 48, type: 'walnut', id: 'walnut_1' },
        { x: -950, y: 3050, z: 46, type: 'walnut', id: 'walnut_2' },
        
        // Zedern
        { x: -800, y: 3200, z: 52, type: 'cedar', id: 'cedar_1' },
        { x: -750, y: 3250, z: 50, type: 'cedar', id: 'cedar_2' },
        
        // Redwood
        { x: -600, y: 3400, z: 60, type: 'redwood', id: 'redwood_1' },
        { x: -550, y: 3450, z: 58, type: 'redwood', id: 'redwood_2' }
    ],
    
    // Aktive Bäume
    activeTrees: new Map(),
    
    // Spieler-Statistiken
    playerStats: new Map(),
    
    // Lumberjack-Initialisierung
    init() {
        console.log('[LUMBERJACK] Baumfäll-System initialisiert');
        this.spawnTrees();
    },
    
    // Bäume spawnen
    spawnTrees() {
        this.treeLocations.forEach(location => {
            this.spawnTree(location);
        });
        console.log(`[LUMBERJACK] ${this.treeLocations.length} Bäume gespawnt`);
    },
    
    // Einzelnen Baum spawnen
    spawnTree(location) {
        const treeConfig = this.treeConfig[location.type];
        if (!treeConfig) return;
        
        const tree = {
            id: location.id,
            type: location.type,
            position: { x: location.x, y: location.y, z: location.z },
            health: treeConfig.health,
            maxHealth: treeConfig.health,
            config: treeConfig,
            spawnTime: Date.now(),
            status: 'alive'
        };
        
        this.activeTrees.set(location.id, tree);
        
        // Baum-Objekt erstellen (hier würde ein 3D-Objekt erstellt werden)
        console.log(`[LUMBERJACK] Baum ${location.id} (${treeConfig.name}) gespawnt`);
    },
    
    // Baum fällen
    cutTree(player, treeId, toolType) {
        const tree = this.activeTrees.get(treeId);
        if (!tree) {
            player.outputChatBox('Baum nicht gefunden!');
            return false;
        }
        
        if (tree.status !== 'alive') {
            player.outputChatBox('Baum ist bereits gefällt!');
            return false;
        }
        
        const tool = this.toolConfig[toolType];
        if (!tool) {
            player.outputChatBox('Ungültiges Werkzeug!');
            return false;
        }
        
        // Werkzeug prüfen
        if (!this.checkTool(player, toolType)) {
            player.outputChatBox('Du hast kein passendes Werkzeug!');
            return false;
        }
        
        // Schaden berechnen
        const damage = tool.damage;
        tree.health -= damage;
        
        // Werkzeug-Abnutzung
        this.damageTool(player, toolType);
        
        // Spieler-Statistiken aktualisieren
        this.updatePlayerStats(player.id, 'cuts', 1);
        
        // Baum-Status prüfen
        if (tree.health <= 0) {
            this.fellTree(player, tree);
        } else {
            player.outputChatBox(`Baum: ${tree.health}/${tree.maxHealth} HP`);
        }
        
        return true;
    },
    
    // Baum fällen (komplett)
    fellTree(player, tree) {
        tree.status = 'felled';
        tree.fellTime = Date.now();
        
        // Holz berechnen
        const woodAmount = this.calculateWoodAmount(tree);
        
        // Erfahrung geben
        const experience = tree.config.experience;
        
        // Belohnungen geben
        this.giveRewards(player, woodAmount, experience, tree.type);
        
        // Spieler-Statistiken aktualisieren
        this.updatePlayerStats(player.id, 'treesFelled', 1);
        this.updatePlayerStats(player.id, 'woodCollected', woodAmount);
        this.updatePlayerStats(player.id, 'experience', experience);
        
        // Baum-Despawn
        this.despawnTree(tree.id);
        
        // Respawn-Timer
        setTimeout(() => {
            this.respawnTree(tree.id);
        }, tree.config.respawnTime);
        
        player.outputChatBox(`Baum gefällt! Holz: ${woodAmount}, Erfahrung: ${experience}`);
        console.log(`[LUMBERJACK] Baum ${tree.id} von Spieler ${player.id} gefällt`);
    },
    
    // Holz-Menge berechnen
    calculateWoodAmount(tree) {
        const config = tree.config.woodAmount;
        return Math.floor(Math.random() * (config.max - config.min + 1)) + config.min;
    },
    
    // Belohnungen geben
    giveRewards(player, woodAmount, experience, treeType) {
        // Holz zum Inventar hinzufügen
        player.call('inventory:addItem', ['wood', woodAmount]);
        
        // Erfahrung geben
        player.call('player:addExperience', [experience]);
        
        // Geld geben (basierend auf Holz-Menge)
        const money = woodAmount * 10;
        player.call('economy:addMoney', [money, 'lumberjack']);
        
        player.outputChatBox(`Belohnung: ${woodAmount} Holz, ${experience} XP, $${money}`);
    },
    
    // Werkzeug prüfen
    checkTool(player, toolType) {
        // Hier würde das Inventory-System aufgerufen werden
        return player.getVariable(`hasItem_${toolType}`) || false;
    },
    
    // Werkzeug-Abnutzung
    damageTool(player, toolType) {
        // Hier würde das Inventory-System aufgerufen werden
        console.log(`[LUMBERJACK] Werkzeug ${toolType} abgenutzt`);
    },
    
    // Spieler-Statistiken aktualisieren
    updatePlayerStats(playerId, stat, value) {
        if (!this.playerStats.has(playerId)) {
            this.playerStats.set(playerId, {
                cuts: 0,
                treesFelled: 0,
                woodCollected: 0,
                experience: 0,
                level: 1
            });
        }
        
        const stats = this.playerStats.get(playerId);
        stats[stat] += value;
        
        // Level prüfen
        if (stat === 'experience') {
            const newLevel = Math.floor(stats.experience / 100) + 1;
            if (newLevel > stats.level) {
                stats.level = newLevel;
                const player = mp.players.at(playerId);
                if (player) {
                    player.outputChatBox(`Level up! Neues Level: ${newLevel}`);
                }
            }
        }
    },
    
    // Baum despawnen
    despawnTree(treeId) {
        const tree = this.activeTrees.get(treeId);
        if (tree) {
            tree.status = 'despawned';
            // Hier würde das 3D-Objekt entfernt werden
            console.log(`[LUMBERJACK] Baum ${treeId} despawnt`);
        }
    },
    
    // Baum respawnen
    respawnTree(treeId) {
        const tree = this.activeTrees.get(treeId);
        if (tree) {
            tree.health = tree.maxHealth;
            tree.status = 'alive';
            tree.spawnTime = Date.now();
            // Hier würde das 3D-Objekt wieder erstellt werden
            console.log(`[LUMBERJACK] Baum ${treeId} respawnt`);
        }
    },
    
    // Verfügbare Bäume abrufen
    getAvailableTrees() {
        return Array.from(this.activeTrees.values()).filter(tree => tree.status === 'alive');
    },
    
    // Spieler-Statistiken abrufen
    getPlayerStats(playerId) {
        return this.playerStats.get(playerId) || {
            cuts: 0,
            treesFelled: 0,
            woodCollected: 0,
            experience: 0,
            level: 1
        };
    },
    
    // Lumberjack-Statistiken
    getStatistics() {
        return {
            totalTrees: this.treeLocations.length,
            activeTrees: this.getAvailableTrees().length,
            totalPlayers: this.playerStats.size,
            treeTypes: Object.keys(this.treeConfig).length
        };
    }
};

// Events
mp.events.add('lumberjack:cut', (player, treeId, toolType) => {
    lumberjackSystem.cutTree(player, treeId, toolType);
});

mp.events.add('lumberjack:getTrees', (player) => {
    const trees = lumberjackSystem.getAvailableTrees();
    player.call('lumberjack:updateTrees', [trees]);
});

mp.events.add('lumberjack:getStats', (player) => {
    const stats = lumberjackSystem.getPlayerStats(player.id);
    player.call('lumberjack:updateStats', [stats]);
});

// Commands
mp.events.addCommand('cut', (player, fullText, treeId, toolType) => {
    if (!treeId || !toolType) {
        player.outputChatBox('Verwendung: /cut [BaumID] [Werkzeug]');
        player.outputChatBox('Werkzeuge: axe, chainsaw, handsaw, machete');
        return;
    }
    
    lumberjackSystem.cutTree(player, treeId, toolType);
});

mp.events.addCommand('lumberjack', (player) => {
    const stats = lumberjackSystem.getPlayerStats(player.id);
    player.outputChatBox('=== Lumberjack Statistiken ===');
    player.outputChatBox(`Level: ${stats.level}`);
    player.outputChatBox(`Erfahrung: ${stats.experience}`);
    player.outputChatBox(`Bäume gefällt: ${stats.treesFelled}`);
    player.outputChatBox(`Holz gesammelt: ${stats.woodCollected}`);
    player.outputChatBox(`Schläge: ${stats.cuts}`);
});

// Lumberjack-System initialisieren
lumberjackSystem.init();

module.exports = lumberjackSystem;
