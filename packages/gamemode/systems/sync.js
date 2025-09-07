// Sync System - Sync-System für Echtzeit-Daten
// Behandelt alle Sync-Funktionen für Horizont-City Roleplay

const syncSystem = {
    // Sync-Typen
    syncTypes: {
        PLAYER: 'player',
        VEHICLE: 'vehicle',
        OBJECT: 'object',
        PED: 'ped',
        WEATHER: 'weather',
        TIME: 'time',
        ECONOMY: 'economy',
        FACTION: 'faction',
        INVENTORY: 'inventory',
        HEALTH: 'health',
        POSITION: 'position',
        ANIMATION: 'animation',
        EMOTION: 'emotion'
    },
    
    // Sync-Konfiguration
    syncConfig: {
        player: {
            interval: 1000, // 1 Sekunde
            priority: 'high',
            data: ['position', 'health', 'armor', 'money', 'level', 'job', 'faction']
        },
        vehicle: {
            interval: 500, // 0.5 Sekunden
            priority: 'high',
            data: ['position', 'rotation', 'health', 'engineHealth', 'fuel', 'locked', 'modifications']
        },
        object: {
            interval: 2000, // 2 Sekunden
            priority: 'medium',
            data: ['position', 'rotation', 'health', 'status']
        },
        ped: {
            interval: 1000, // 1 Sekunde
            priority: 'medium',
            data: ['position', 'health', 'animation', 'emotion']
        },
        weather: {
            interval: 30000, // 30 Sekunden
            priority: 'low',
            data: ['weather', 'windSpeed', 'windDirection', 'rainLevel', 'snowLevel', 'fogLevel']
        },
        time: {
            interval: 60000, // 1 Minute
            priority: 'low',
            data: ['hour', 'minute', 'day', 'month', 'year']
        },
        economy: {
            interval: 5000, // 5 Sekunden
            priority: 'medium',
            data: ['money', 'bankMoney', 'transactions']
        },
        faction: {
            interval: 10000, // 10 Sekunden
            priority: 'medium',
            data: ['members', 'territory', 'money', 'level']
        },
        inventory: {
            interval: 2000, // 2 Sekunden
            priority: 'high',
            data: ['items', 'weight', 'capacity']
        },
        health: {
            interval: 1000, // 1 Sekunde
            priority: 'high',
            data: ['health', 'armor', 'hunger', 'thirst', 'fatigue']
        },
        position: {
            interval: 100, // 0.1 Sekunden
            priority: 'critical',
            data: ['x', 'y', 'z', 'heading']
        },
        animation: {
            interval: 500, // 0.5 Sekunden
            priority: 'medium',
            data: ['animation', 'flag', 'duration']
        },
        emotion: {
            interval: 2000, // 2 Sekunden
            priority: 'low',
            data: ['emotion', 'intensity', 'duration']
        }
    },
    
    // Sync-Queues
    syncQueues: new Map(),
    
    // Sync-Timer
    syncTimers: new Map(),
    
    // Sync-Statistiken
    syncStats: {
        totalSyncs: 0,
        successfulSyncs: 0,
        failedSyncs: 0,
        averageLatency: 0,
        lastSync: null
    },
    
    // Sync-Initialisierung
    init() {
        console.log('[SYNC] Sync-System initialisiert');
        this.startSyncTimers();
    },
    
    // Sync-Timer starten
    startSyncTimers() {
        Object.keys(this.syncConfig).forEach(syncType => {
            const config = this.syncConfig[syncType];
            const timer = setInterval(() => {
                this.processSyncQueue(syncType);
            }, config.interval);
            
            this.syncTimers.set(syncType, timer);
        });
        
        console.log(`[SYNC] ${Object.keys(this.syncConfig).length} Sync-Timer gestartet`);
    },
    
    // Sync-Queue verarbeiten
    processSyncQueue(syncType) {
        const queue = this.syncQueues.get(syncType) || [];
        if (queue.length === 0) return;
        
        const config = this.syncConfig[syncType];
        const batchSize = this.getBatchSize(config.priority);
        const batch = queue.splice(0, batchSize);
        
        batch.forEach(syncData => {
            this.syncData(syncData);
        });
        
        this.syncStats.totalSyncs += batch.length;
    },
    
    // Batch-Größe basierend auf Priorität
    getBatchSize(priority) {
        switch (priority) {
            case 'critical': return 50;
            case 'high': return 30;
            case 'medium': return 20;
            case 'low': return 10;
            default: return 10;
        }
    },
    
    // Daten synchronisieren
    syncData(syncData) {
        try {
            const { type, targetId, data, timestamp } = syncData;
            
            // Daten validieren
            if (!this.validateSyncData(syncData)) {
                this.syncStats.failedSyncs++;
                return false;
            }
            
            // Sync durchführen
            switch (type) {
                case 'player':
                    this.syncPlayerData(targetId, data);
                    break;
                case 'vehicle':
                    this.syncVehicleData(targetId, data);
                    break;
                case 'object':
                    this.syncObjectData(targetId, data);
                    break;
                case 'ped':
                    this.syncPedData(targetId, data);
                    break;
                case 'weather':
                    this.syncWeatherData(data);
                    break;
                case 'time':
                    this.syncTimeData(data);
                    break;
                case 'economy':
                    this.syncEconomyData(targetId, data);
                    break;
                case 'faction':
                    this.syncFactionData(targetId, data);
                    break;
                case 'inventory':
                    this.syncInventoryData(targetId, data);
                    break;
                case 'health':
                    this.syncHealthData(targetId, data);
                    break;
                case 'position':
                    this.syncPositionData(targetId, data);
                    break;
                case 'animation':
                    this.syncAnimationData(targetId, data);
                    break;
                case 'emotion':
                    this.syncEmotionData(targetId, data);
                    break;
            }
            
            this.syncStats.successfulSyncs++;
            this.syncStats.lastSync = Date.now();
            
            return true;
        } catch (error) {
            console.error(`[SYNC] Fehler beim Synchronisieren: ${error.message}`);
            this.syncStats.failedSyncs++;
            return false;
        }
    },
    
    // Sync-Daten validieren
    validateSyncData(syncData) {
        const { type, targetId, data, timestamp } = syncData;
        
        if (!type || !targetId || !data || !timestamp) {
            return false;
        }
        
        if (!this.syncConfig[type]) {
            return false;
        }
        
        // Zeitstempel prüfen (nicht älter als 30 Sekunden)
        if (Date.now() - timestamp > 30000) {
            return false;
        }
        
        return true;
    },
    
    // Spieler-Daten synchronisieren
    syncPlayerData(playerId, data) {
        const player = mp.players.at(playerId);
        if (!player) return;
        
        // Position synchronisieren
        if (data.position) {
            player.position = new mp.Vector3(data.position.x, data.position.y, data.position.z);
        }
        
        // Gesundheit synchronisieren
        if (data.health !== undefined) {
            player.health = data.health;
        }
        
        // Rüstung synchronisieren
        if (data.armor !== undefined) {
            player.armor = data.armor;
        }
        
        // Variablen synchronisieren
        Object.keys(data).forEach(key => {
            if (key !== 'position' && key !== 'health' && key !== 'armor') {
                player.setVariable(key, data[key]);
            }
        });
    },
    
    // Fahrzeug-Daten synchronisieren
    syncVehicleData(vehicleId, data) {
        const vehicle = mp.vehicles.at(vehicleId);
        if (!vehicle) return;
        
        // Position synchronisieren
        if (data.position) {
            vehicle.position = new mp.Vector3(data.position.x, data.position.y, data.position.z);
        }
        
        // Rotation synchronisieren
        if (data.rotation) {
            vehicle.rotation = new mp.Vector3(data.rotation.x, data.rotation.y, data.rotation.z);
        }
        
        // Gesundheit synchronisieren
        if (data.health !== undefined) {
            vehicle.health = data.health;
        }
        
        // Motor-Gesundheit synchronisieren
        if (data.engineHealth !== undefined) {
            vehicle.engineHealth = data.engineHealth;
        }
        
        // Variablen synchronisieren
        Object.keys(data).forEach(key => {
            if (key !== 'position' && key !== 'rotation' && key !== 'health' && key !== 'engineHealth') {
                vehicle.setVariable(key, data[key]);
            }
        });
    },
    
    // Objekt-Daten synchronisieren
    syncObjectData(objectId, data) {
        const object = mp.objects.at(objectId);
        if (!object) return;
        
        // Position synchronisieren
        if (data.position) {
            object.position = new mp.Vector3(data.position.x, data.position.y, data.position.z);
        }
        
        // Rotation synchronisieren
        if (data.rotation) {
            object.rotation = new mp.Vector3(data.rotation.x, data.rotation.y, data.rotation.z);
        }
        
        // Gesundheit synchronisieren
        if (data.health !== undefined) {
            object.health = data.health;
        }
        
        // Status synchronisieren
        if (data.status !== undefined) {
            object.setVariable('status', data.status);
        }
    },
    
    // Ped-Daten synchronisieren
    syncPedData(pedId, data) {
        const ped = mp.peds.at(pedId);
        if (!ped) return;
        
        // Position synchronisieren
        if (data.position) {
            ped.position = new mp.Vector3(data.position.x, data.position.y, data.position.z);
        }
        
        // Gesundheit synchronisieren
        if (data.health !== undefined) {
            ped.health = data.health;
        }
        
        // Animation synchronisieren
        if (data.animation) {
            ped.taskPlayAnim(data.animation.dict, data.animation.name, 8.0, -8.0, -1, 1, 0, false, false, false);
        }
        
        // Emotion synchronisieren
        if (data.emotion) {
            ped.setVariable('emotion', data.emotion);
        }
    },
    
    // Wetter-Daten synchronisieren
    syncWeatherData(data) {
        // Wetter synchronisieren
        if (data.weather) {
            mp.world.setWeather(data.weather);
        }
        
        // Wind synchronisieren
        if (data.windSpeed !== undefined) {
            mp.world.setWindSpeed(data.windSpeed);
        }
        
        if (data.windDirection !== undefined) {
            mp.world.setWindDirection(data.windDirection);
        }
        
        // Regen synchronisieren
        if (data.rainLevel !== undefined) {
            mp.world.setRainLevel(data.rainLevel);
        }
        
        // Schnee synchronisieren
        if (data.snowLevel !== undefined) {
            mp.world.setSnowLevel(data.snowLevel);
        }
        
        // Nebel synchronisieren
        if (data.fogLevel !== undefined) {
            mp.world.setFogLevel(data.fogLevel);
        }
    },
    
    // Zeit-Daten synchronisieren
    syncTimeData(data) {
        // Zeit synchronisieren
        if (data.hour !== undefined && data.minute !== undefined) {
            mp.world.setTime(data.hour, data.minute, 0);
        }
        
        // Datum synchronisieren
        if (data.day !== undefined && data.month !== undefined && data.year !== undefined) {
            mp.world.setDate(data.day, data.month, data.year);
        }
    },
    
    // Wirtschafts-Daten synchronisieren
    syncEconomyData(playerId, data) {
        const player = mp.players.at(playerId);
        if (!player) return;
        
        // Geld synchronisieren
        if (data.money !== undefined) {
            player.setVariable('money', data.money);
        }
        
        // Bank-Geld synchronisieren
        if (data.bankMoney !== undefined) {
            player.setVariable('bankMoney', data.bankMoney);
        }
        
        // Transaktionen synchronisieren
        if (data.transactions) {
            player.setVariable('transactions', data.transactions);
        }
    },
    
    // Faction-Daten synchronisieren
    syncFactionData(factionId, data) {
        // Hier würden Faction-Daten synchronisiert werden
        console.log(`[SYNC] Faction ${factionId} synchronisiert`);
    },
    
    // Inventar-Daten synchronisieren
    syncInventoryData(playerId, data) {
        const player = mp.players.at(playerId);
        if (!player) return;
        
        // Inventar synchronisieren
        if (data.items) {
            player.setVariable('inventory', data.items);
        }
        
        // Gewicht synchronisieren
        if (data.weight !== undefined) {
            player.setVariable('inventoryWeight', data.weight);
        }
        
        // Kapazität synchronisieren
        if (data.capacity !== undefined) {
            player.setVariable('inventoryCapacity', data.capacity);
        }
    },
    
    // Gesundheits-Daten synchronisieren
    syncHealthData(playerId, data) {
        const player = mp.players.at(playerId);
        if (!player) return;
        
        // Gesundheit synchronisieren
        if (data.health !== undefined) {
            player.health = data.health;
        }
        
        // Rüstung synchronisieren
        if (data.armor !== undefined) {
            player.armor = data.armor;
        }
        
        // Hunger synchronisieren
        if (data.hunger !== undefined) {
            player.setVariable('hunger', data.hunger);
        }
        
        // Durst synchronisieren
        if (data.thirst !== undefined) {
            player.setVariable('thirst', data.thirst);
        }
        
        // Müdigkeit synchronisieren
        if (data.fatigue !== undefined) {
            player.setVariable('fatigue', data.fatigue);
        }
    },
    
    // Positions-Daten synchronisieren
    syncPositionData(targetId, data) {
        const target = mp.players.at(targetId) || mp.vehicles.at(targetId) || mp.peds.at(targetId);
        if (!target) return;
        
        // Position synchronisieren
        if (data.x !== undefined && data.y !== undefined && data.z !== undefined) {
            target.position = new mp.Vector3(data.x, data.y, data.z);
        }
        
        // Heading synchronisieren
        if (data.heading !== undefined) {
            target.rotation = new mp.Vector3(0, 0, data.heading);
        }
    },
    
    // Animations-Daten synchronisieren
    syncAnimationData(targetId, data) {
        const target = mp.players.at(targetId) || mp.peds.at(targetId);
        if (!target) return;
        
        // Animation synchronisieren
        if (data.animation && data.flag !== undefined) {
            target.taskPlayAnim(data.animation.dict, data.animation.name, 8.0, -8.0, -1, data.flag, 0, false, false, false);
        }
    },
    
    // Emotions-Daten synchronisieren
    syncEmotionData(targetId, data) {
        const target = mp.players.at(targetId) || mp.peds.at(targetId);
        if (!target) return;
        
        // Emotion synchronisieren
        if (data.emotion) {
            target.setVariable('emotion', data.emotion);
        }
        
        // Intensität synchronisieren
        if (data.intensity !== undefined) {
            target.setVariable('emotionIntensity', data.intensity);
        }
        
        // Dauer synchronisieren
        if (data.duration !== undefined) {
            target.setVariable('emotionDuration', data.duration);
        }
    },
    
    // Sync-Queue hinzufügen
    addToSyncQueue(syncType, targetId, data) {
        if (!this.syncQueues.has(syncType)) {
            this.syncQueues.set(syncType, []);
        }
        
        const syncData = {
            type: syncType,
            targetId: targetId,
            data: data,
            timestamp: Date.now()
        };
        
        this.syncQueues.get(syncType).push(syncData);
    },
    
    // Sync-Statistiken abrufen
    getStatistics() {
        const successRate = this.syncStats.totalSyncs > 0 ? 
            (this.syncStats.successfulSyncs / this.syncStats.totalSyncs) * 100 : 0;
        
        return {
            ...this.syncStats,
            successRate: Math.round(successRate * 100) / 100,
            activeQueues: this.syncQueues.size,
            activeTimers: this.syncTimers.size
        };
    },
    
    // Sync-System stoppen
    stop() {
        this.syncTimers.forEach(timer => {
            clearInterval(timer);
        });
        this.syncTimers.clear();
        this.syncQueues.clear();
        
        console.log('[SYNC] Sync-System gestoppt');
    }
};

// Events
mp.events.add('sync:data', (syncType, targetId, data) => {
    syncSystem.addToSyncQueue(syncType, targetId, data);
});

mp.events.add('sync:getStats', (player) => {
    const stats = syncSystem.getStatistics();
    player.call('sync:updateStats', [stats]);
});

// Commands
mp.events.addCommand('syncstats', (player) => {
    const stats = syncSystem.getStatistics();
    player.outputChatBox('=== Sync Statistiken ===');
    player.outputChatBox(`Gesamt Syncs: ${stats.totalSyncs}`);
    player.outputChatBox(`Erfolgreich: ${stats.successfulSyncs}`);
    player.outputChatBox(`Fehlgeschlagen: ${stats.failedSyncs}`);
    player.outputChatBox(`Erfolgsrate: ${stats.successRate}%`);
    player.outputChatBox(`Aktive Queues: ${stats.activeQueues}`);
    player.outputChatBox(`Aktive Timer: ${stats.activeTimers}`);
});

// Sync-System initialisieren
syncSystem.init();

module.exports = syncSystem;
