// Robbery System - Raub-System
// Behandelt alle Raub-Funktionen für Horizont-City Roleplay

const robberySystem = {
    // Raub-Typen
    robberyTypes: {
        STORE: 'store',
        BANK: 'bank',
        ATM: 'atm',
        GAS_STATION: 'gas_station',
        JEWELRY: 'jewelry',
        VEHICLE: 'vehicle',
        PERSON: 'person',
        HOUSE: 'house',
        WAREHOUSE: 'warehouse',
        CASINO: 'casino'
    },
    
    // Raub-Konfiguration
    robberyConfig: {
        store: {
            name: 'Laden',
            minPlayers: 1,
            maxPlayers: 3,
            duration: 300000, // 5 Minuten
            cooldown: 1800000, // 30 Minuten
            difficulty: 1,
            reward: { min: 500, max: 2000 },
            requirements: {
                level: 1,
                items: ['weapon']
            }
        },
        bank: {
            name: 'Bank',
            minPlayers: 3,
            maxPlayers: 6,
            duration: 900000, // 15 Minuten
            cooldown: 3600000, // 1 Stunde
            difficulty: 5,
            reward: { min: 10000, max: 50000 },
            requirements: {
                level: 10,
                items: ['weapon', 'mask', 'gloves']
            }
        },
        atm: {
            name: 'Geldautomat',
            minPlayers: 1,
            maxPlayers: 2,
            duration: 60000, // 1 Minute
            cooldown: 300000, // 5 Minuten
            difficulty: 1,
            reward: { min: 100, max: 1000 },
            requirements: {
                level: 1,
                items: ['weapon']
            }
        },
        gas_station: {
            name: 'Tankstelle',
            minPlayers: 1,
            maxPlayers: 3,
            duration: 180000, // 3 Minuten
            cooldown: 900000, // 15 Minuten
            difficulty: 2,
            reward: { min: 1000, max: 5000 },
            requirements: {
                level: 3,
                items: ['weapon']
            }
        },
        jewelry: {
            name: 'Juwelier',
            minPlayers: 2,
            maxPlayers: 4,
            duration: 600000, // 10 Minuten
            cooldown: 1800000, // 30 Minuten
            difficulty: 4,
            reward: { min: 5000, max: 25000 },
            requirements: {
                level: 8,
                items: ['weapon', 'mask', 'gloves', 'crowbar']
            }
        },
        vehicle: {
            name: 'Fahrzeug',
            minPlayers: 1,
            maxPlayers: 2,
            duration: 120000, // 2 Minuten
            cooldown: 600000, // 10 Minuten
            difficulty: 2,
            reward: { min: 200, max: 2000 },
            requirements: {
                level: 2,
                items: ['weapon', 'lockpick']
            }
        },
        person: {
            name: 'Person',
            minPlayers: 1,
            maxPlayers: 2,
            duration: 60000, // 1 Minute
            cooldown: 300000, // 5 Minuten
            difficulty: 1,
            reward: { min: 50, max: 500 },
            requirements: {
                level: 1,
                items: ['weapon']
            }
        }
    },
    
    // Raub-Standorte
    robberyLocations: {
        store: [
            { x: 25.7, y: -1347.3, z: 29.5, name: '24/7 Store' },
            { x: -47.4, y: -1757.2, z: 29.4, name: '24/7 Store' },
            { x: 1135.8, y: -982.3, z: 46.4, name: '24/7 Store' },
            { x: -1222.9, y: -906.1, z: 12.3, name: '24/7 Store' }
        ],
        bank: [
            { x: 150.3, y: -1040.2, z: 29.4, name: 'Fleeca Bank' },
            { x: -1212.9, y: -330.8, z: 37.8, name: 'Fleeca Bank' },
            { x: 1175.1, y: 2706.4, z: 38.1, name: 'Fleeca Bank' },
            { x: -2957.2, y: 481.3, z: 15.7, name: 'Fleeca Bank' }
        ],
        atm: [
            { x: 147.0, y: -1035.8, z: 29.3, name: 'ATM' },
            { x: -1205.0, y: -324.8, z: 37.9, name: 'ATM' },
            { x: 1172.0, y: 2702.0, z: 38.2, name: 'ATM' },
            { x: -2962.0, y: 482.0, z: 15.7, name: 'ATM' }
        ],
        gas_station: [
            { x: 49.4, y: 1758.9, z: 29.6, name: 'Gas Station' },
            { x: 263.9, y: 2606.5, z: 44.9, name: 'Gas Station' },
            { x: 1039.9, y: 2671.1, z: 39.6, name: 'Gas Station' },
            { x: 1207.3, y: 2660.2, z: 37.9, name: 'Gas Station' }
        ],
        jewelry: [
            { x: -630.0, y: -236.5, z: 38.1, name: 'Jewelry Store' }
        ]
    },
    
    // Aktive Raubüberfälle
    activeRobberies: new Map(),
    
    // Cooldowns
    cooldowns: new Map(),
    
    // Raub-Initialisierung
    init() {
        console.log('[ROBBERY] Raub-System initialisiert');
        this.createBlips();
    },
    
    // Blips erstellen
    createBlips() {
        Object.keys(this.robberyLocations).forEach(type => {
            this.robberyLocations[type].forEach(location => {
                const blip = mp.blips.new(1, new mp.Vector3(location.x, location.y, location.z), {
                    name: location.name,
                    color: 1,
                    shortRange: true,
                    scale: 0.8
                });
            });
        });
    },
    
    // Raub starten
    startRobbery(player, robberyType, locationIndex = 0) {
        const config = this.robberyConfig[robberyType];
        if (!config) {
            player.outputChatBox('Ungültiger Raub-Typ!');
            return false;
        }
        
        // Cooldown prüfen
        if (this.cooldowns.has(robberyType)) {
            const cooldownEnd = this.cooldowns.get(robberyType);
            if (Date.now() < cooldownEnd) {
                const remaining = Math.ceil((cooldownEnd - Date.now()) / 1000);
                player.outputChatBox(`Cooldown: ${remaining} Sekunden verbleibend!`);
                return false;
            }
        }
        
        // Anforderungen prüfen
        if (!this.checkRequirements(player, config.requirements)) {
            player.outputChatBox('Du erfüllst nicht die Anforderungen!');
            return false;
        }
        
        // Standort prüfen
        const locations = this.robberyLocations[robberyType];
        if (!locations || !locations[locationIndex]) {
            player.outputChatBox('Ungültiger Standort!');
            return false;
        }
        
        const location = locations[locationIndex];
        const distance = this.getDistance(player.position, location);
        
        if (distance > 10) {
            player.outputChatBox('Du bist zu weit vom Standort entfernt!');
            return false;
        }
        
        // Raub starten
        const robberyId = Date.now();
        const robbery = {
            id: robberyId,
            type: robberyType,
            location: location,
            players: [player.id],
            startTime: Date.now(),
            endTime: Date.now() + config.duration,
            status: 'active',
            reward: this.calculateReward(config.reward),
            difficulty: config.difficulty
        };
        
        this.activeRobberies.set(robberyId, robbery);
        
        // Cooldown setzen
        this.cooldowns.set(robberyType, Date.now() + config.cooldown);
        
        // Spieler benachrichtigen
        player.outputChatBox(`Raub ${config.name} gestartet! Dauer: ${config.duration / 1000} Sekunden`);
        player.call('robbery:start', [robbery]);
        
        // Timer setzen
        setTimeout(() => {
            this.endRobbery(robberyId, 'timeout');
        }, config.duration);
        
        console.log(`[ROBBERY] Raub ${robberyType} von Spieler ${player.id} gestartet`);
        return true;
    },
    
    // Raub beenden
    endRobbery(robberyId, reason = 'completed') {
        const robbery = this.activeRobberies.get(robberyId);
        if (!robbery) return;
        
        robbery.status = 'ended';
        robbery.endReason = reason;
        
        // Belohnung verteilen
        if (reason === 'completed') {
            this.distributeReward(robbery);
        }
        
        // Spieler benachrichtigen
        robbery.players.forEach(playerId => {
            const player = mp.players.at(playerId);
            if (player) {
                player.call('robbery:end', [robbery, reason]);
                
                if (reason === 'completed') {
                    player.outputChatBox(`Raub erfolgreich! Belohnung: $${robbery.reward}`);
                } else {
                    player.outputChatBox(`Raub fehlgeschlagen: ${reason}`);
                }
            }
        });
        
        this.activeRobberies.delete(robberyId);
        console.log(`[ROBBERY] Raub ${robberyId} beendet: ${reason}`);
    },
    
    // Belohnung berechnen
    calculateReward(rewardConfig) {
        const min = rewardConfig.min;
        const max = rewardConfig.max;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    
    // Belohnung verteilen
    distributeReward(robbery) {
        const rewardPerPlayer = Math.floor(robbery.reward / robbery.players.length);
        
        robbery.players.forEach(playerId => {
            const player = mp.players.at(playerId);
            if (player) {
                // Hier würde das Economy-System aufgerufen werden
                player.call('economy:addMoney', [rewardPerPlayer, 'robbery']);
            }
        });
    },
    
    // Anforderungen prüfen
    checkRequirements(player, requirements) {
        // Level prüfen
        if (requirements.level && player.getVariable('level') < requirements.level) {
            return false;
        }
        
        // Items prüfen
        if (requirements.items) {
            for (const item of requirements.items) {
                // Hier würde das Inventory-System aufgerufen werden
                if (!player.getVariable(`hasItem_${item}`)) {
                    return false;
                }
            }
        }
        
        return true;
    },
    
    // Distanz berechnen
    getDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Raub-Liste abrufen
    getRobberyList() {
        return Object.keys(this.robberyConfig).map(type => ({
            type: type,
            name: this.robberyConfig[type].name,
            difficulty: this.robberyConfig[type].difficulty,
            reward: this.robberyConfig[type].reward,
            cooldown: this.cooldowns.has(type) ? this.cooldowns.get(type) - Date.now() : 0
        }));
    },
    
    // Aktive Raubüberfälle abrufen
    getActiveRobberies() {
        return Array.from(this.activeRobberies.values());
    },
    
    // Raub-Statistiken
    getStatistics() {
        return {
            totalTypes: Object.keys(this.robberyConfig).length,
            activeRobberies: this.activeRobberies.size,
            totalLocations: Object.values(this.robberyLocations).reduce((total, locations) => total + locations.length, 0)
        };
    }
};

// Events
mp.events.add('robbery:start', (player, robberyType, locationIndex) => {
    robberySystem.startRobbery(player, robberyType, locationIndex);
});

mp.events.add('robbery:end', (player, robberyId, reason) => {
    robberySystem.endRobbery(robberyId, reason);
});

mp.events.add('robbery:list', (player) => {
    const robberies = robberySystem.getRobberyList();
    player.outputChatBox('=== Verfügbare Raubüberfälle ===');
    
    robberies.forEach(robbery => {
        const cooldownText = robbery.cooldown > 0 ? ` (Cooldown: ${Math.ceil(robbery.cooldown / 1000)}s)` : '';
        player.outputChatBox(`${robbery.name}: Schwierigkeit ${robbery.difficulty}, Belohnung $${robbery.reward.min}-${robbery.reward.max}${cooldownText}`);
    });
});

// Commands
mp.events.addCommand('robbery', (player, fullText, robberyType, locationIndex) => {
    if (!robberyType) {
        const robberies = robberySystem.getRobberyList();
        player.outputChatBox('Verwendung: /robbery [Typ] [Standort]');
        player.outputChatBox('Typen: store, bank, atm, gas_station, jewelry, vehicle, person');
        return;
    }
    
    const index = locationIndex ? parseInt(locationIndex) : 0;
    robberySystem.startRobbery(player, robberyType, index);
});

mp.events.addCommand('stoprobbery', (player) => {
    // Hier würde der aktive Raub des Spielers gestoppt werden
    player.outputChatBox('Raub gestoppt!');
});

// Raub-System initialisieren
robberySystem.init();

module.exports = robberySystem;
