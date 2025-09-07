// Alarm System - Alarmsystem
// Behandelt alle Alarm-Funktionen für Horizont-City Roleplay

const alarmSystem = {
    // Alarm-Typen
    alarmTypes: {
        BURGLAR: 'burglar',
        FIRE: 'fire',
        MEDICAL: 'medical',
        PANIC: 'panic',
        CAR: 'car',
        HOUSE: 'house',
        BUSINESS: 'business',
        SECURITY: 'security'
    },
    
    // Sensor-Typen
    sensorTypes: {
        MOTION: 'motion',
        DOOR: 'door',
        WINDOW: 'window',
        GLASS: 'glass',
        SMOKE: 'smoke',
        HEAT: 'heat',
        VIBRATION: 'vibration',
        PRESSURE: 'pressure'
    },
    
    // Alarm-Konfiguration
    alarmConfig: {
        burglar: {
            name: 'Einbruchsalarm',
            priority: 'high',
            responseTime: 300000, // 5 Minuten
            sensors: ['motion', 'door', 'window', 'glass', 'vibration'],
            sound: 'burglar_alarm',
            light: true,
            notification: true
        },
        fire: {
            name: 'Feueralarm',
            priority: 'critical',
            responseTime: 120000, // 2 Minuten
            sensors: ['smoke', 'heat'],
            sound: 'fire_alarm',
            light: true,
            notification: true
        },
        medical: {
            name: 'Notfallalarm',
            priority: 'critical',
            responseTime: 60000, // 1 Minute
            sensors: ['pressure'],
            sound: 'medical_alarm',
            light: false,
            notification: true
        },
        panic: {
            name: 'Panikalarm',
            priority: 'high',
            responseTime: 180000, // 3 Minuten
            sensors: ['motion', 'pressure'],
            sound: 'panic_alarm',
            light: true,
            notification: true
        },
        car: {
            name: 'Fahrzeugalarm',
            priority: 'medium',
            responseTime: 600000, // 10 Minuten
            sensors: ['vibration', 'motion'],
            sound: 'car_alarm',
            light: true,
            notification: false
        },
        house: {
            name: 'Hausalarm',
            priority: 'high',
            responseTime: 300000, // 5 Minuten
            sensors: ['motion', 'door', 'window'],
            sound: 'house_alarm',
            light: true,
            notification: true
        },
        business: {
            name: 'Geschäftsalarm',
            priority: 'high',
            responseTime: 240000, // 4 Minuten
            sensors: ['motion', 'door', 'glass'],
            sound: 'business_alarm',
            light: true,
            notification: true
        },
        security: {
            name: 'Sicherheitsalarm',
            priority: 'medium',
            responseTime: 900000, // 15 Minuten
            sensors: ['motion', 'door'],
            sound: 'security_alarm',
            light: false,
            notification: true
        }
    },
    
    // Alarm-Zonen
    alarmZones: new Map(),
    
    // Aktive Alarme
    activeAlarms: new Map(),
    
    // Sensoren
    sensors: new Map(),
    
    // Alarm-Initialisierung
    init() {
        console.log('[ALARM] Alarmsystem initialisiert');
        this.createDefaultZones();
    },
    
    // Standard-Zonen erstellen
    createDefaultZones() {
        const zones = [
            { id: 'zone_1', name: 'Bank', type: 'business', position: { x: 150, y: -1040, z: 29 }, radius: 50 },
            { id: 'zone_2', name: 'Juwelier', type: 'business', position: { x: -630, y: -236, z: 38 }, radius: 30 },
            { id: 'zone_3', name: 'Tankstelle', type: 'business', position: { x: 49, y: 1758, z: 29 }, radius: 20 },
            { id: 'zone_4', name: 'Wohngebiet', type: 'house', position: { x: 100, y: 200, z: 30 }, radius: 100 },
            { id: 'zone_5', name: 'Parkplatz', type: 'car', position: { x: 200, y: 300, z: 30 }, radius: 40 }
        ];
        
        zones.forEach(zone => {
            this.createAlarmZone(zone);
        });
        
        console.log(`[ALARM] ${zones.length} Alarm-Zonen erstellt`);
    },
    
    // Alarm-Zone erstellen
    createAlarmZone(zoneData) {
        const zone = {
            id: zoneData.id,
            name: zoneData.name,
            type: zoneData.type,
            position: zoneData.position,
            radius: zoneData.radius,
            sensors: [],
            alarms: [],
            status: 'armed',
            owner: null,
            permissions: []
        };
        
        this.alarmZones.set(zoneData.id, zone);
        
        // Marker erstellen
        mp.markers.new(1, new mp.Vector3(zoneData.position.x, zoneData.position.y, zoneData.position.z), zoneData.radius, {
            color: [255, 0, 0, 50],
            visible: true
        });
        
        console.log(`[ALARM] Zone ${zoneData.name} erstellt`);
    },
    
    // Sensor hinzufügen
    addSensor(zoneId, sensorType, position) {
        const zone = this.alarmZones.get(zoneId);
        if (!zone) {
            console.error(`[ALARM] Zone ${zoneId} nicht gefunden`);
            return false;
        }
        
        const sensor = {
            id: `sensor_${Date.now()}`,
            zoneId: zoneId,
            type: sensorType,
            position: position,
            status: 'active',
            sensitivity: 1.0,
            lastTrigger: null
        };
        
        zone.sensors.push(sensor);
        this.sensors.set(sensor.id, sensor);
        
        console.log(`[ALARM] Sensor ${sensorType} zu Zone ${zoneId} hinzugefügt`);
        return true;
    },
    
    // Alarm auslösen
    triggerAlarm(zoneId, alarmType, triggerData = {}) {
        const zone = this.alarmZones.get(zoneId);
        if (!zone) {
            console.error(`[ALARM] Zone ${zoneId} nicht gefunden`);
            return false;
        }
        
        if (zone.status !== 'armed') {
            console.log(`[ALARM] Zone ${zoneId} ist nicht scharfgeschaltet`);
            return false;
        }
        
        const config = this.alarmConfig[alarmType];
        if (!config) {
            console.error(`[ALARM] Unbekannter Alarm-Typ: ${alarmType}`);
            return false;
        }
        
        // Alarm erstellen
        const alarmId = Date.now();
        const alarm = {
            id: alarmId,
            zoneId: zoneId,
            type: alarmType,
            config: config,
            triggerData: triggerData,
            startTime: Date.now(),
            endTime: null,
            status: 'active',
            responseTime: config.responseTime,
            responders: [],
            resolved: false
        };
        
        this.activeAlarms.set(alarmId, alarm);
        zone.alarms.push(alarm);
        
        // Alarm-Effekte aktivieren
        this.activateAlarmEffects(zone, alarm);
        
        // Notifikationen senden
        this.sendAlarmNotifications(zone, alarm);
        
        // Response-Timer setzen
        setTimeout(() => {
            this.handleAlarmResponse(alarmId);
        }, config.responseTime);
        
        console.log(`[ALARM] ${config.name} in Zone ${zone.name} ausgelöst`);
        return true;
    },
    
    // Alarm-Effekte aktivieren
    activateAlarmEffects(zone, alarm) {
        const config = alarm.config;
        
        // Sound-Effekte
        if (config.sound) {
            this.playAlarmSound(zone.position, config.sound);
        }
        
        // Licht-Effekte
        if (config.light) {
            this.activateAlarmLights(zone.position, zone.radius);
        }
        
        // Blip erstellen
        const blip = mp.blips.new(161, new mp.Vector3(zone.position.x, zone.position.y, zone.position.z), {
            name: `${config.name} - ${zone.name}`,
            color: this.getAlarmColor(config.priority),
            shortRange: false,
            scale: 1.0
        });
        
        alarm.blip = blip;
    },
    
    // Alarm-Sound abspielen
    playAlarmSound(position, soundType) {
        // Hier würde der Sound abgespielt werden
        console.log(`[ALARM] Sound ${soundType} an Position ${position.x}, ${position.y}, ${position.z}`);
    },
    
    // Alarm-Lichter aktivieren
    activateAlarmLights(position, radius) {
        // Hier würden die Lichter aktiviert werden
        console.log(`[ALARM] Lichter in Radius ${radius} um ${position.x}, ${position.y}, ${position.z} aktiviert`);
    },
    
    // Alarm-Farbe basierend auf Priorität
    getAlarmColor(priority) {
        switch (priority) {
            case 'critical': return 1; // Rot
            case 'high': return 3; // Orange
            case 'medium': return 5; // Gelb
            case 'low': return 2; // Grün
            default: return 1;
        }
    },
    
    // Alarm-Notifikationen senden
    sendAlarmNotifications(zone, alarm) {
        const config = alarm.config;
        
        // Alle Spieler in der Nähe benachrichtigen
        mp.players.forEach(player => {
            const distance = this.getDistance(player.position, zone.position);
            if (distance <= zone.radius * 2) {
                player.call('alarm:notification', [alarm, zone]);
                player.outputChatBox(`🚨 ${config.name} in ${zone.name}!`);
            }
        });
        
        // Notfallservices benachrichtigen
        this.notifyEmergencyServices(alarm, zone);
    },
    
    // Notfallservices benachrichtigen
    notifyEmergencyServices(alarm, zone) {
        const config = alarm.config;
        
        // Polizei benachrichtigen
        if (['burglar', 'panic', 'car', 'house', 'business', 'security'].includes(alarm.type)) {
            this.notifyPolice(alarm, zone);
        }
        
        // Feuerwehr benachrichtigen
        if (alarm.type === 'fire') {
            this.notifyFireDepartment(alarm, zone);
        }
        
        // Rettungsdienst benachrichtigen
        if (alarm.type === 'medical') {
            this.notifyEMS(alarm, zone);
        }
    },
    
    // Polizei benachrichtigen
    notifyPolice(alarm, zone) {
        mp.players.forEach(player => {
            if (player.getVariable('job') === 'police') {
                player.call('alarm:police', [alarm, zone]);
                player.outputChatBox(`🚨 Polizei: ${alarm.config.name} in ${zone.name}!`);
            }
        });
    },
    
    // Feuerwehr benachrichtigen
    notifyFireDepartment(alarm, zone) {
        mp.players.forEach(player => {
            if (player.getVariable('job') === 'firefighter') {
                player.call('alarm:fire', [alarm, zone]);
                player.outputChatBox(`🔥 Feuerwehr: ${alarm.config.name} in ${zone.name}!`);
            }
        });
    },
    
    // Rettungsdienst benachrichtigen
    notifyEMS(alarm, zone) {
        mp.players.forEach(player => {
            if (player.getVariable('job') === 'ems') {
                player.call('alarm:medical', [alarm, zone]);
                player.outputChatBox(`🚑 Rettungsdienst: ${alarm.config.name} in ${zone.name}!`);
            }
        });
    },
    
    // Alarm-Response behandeln
    handleAlarmResponse(alarmId) {
        const alarm = this.activeAlarms.get(alarmId);
        if (!alarm) return;
        
        if (!alarm.resolved) {
            // Alarm nicht rechtzeitig behandelt
            this.escalateAlarm(alarm);
        }
    },
    
    // Alarm eskalieren
    escalateAlarm(alarm) {
        const zone = this.alarmZones.get(alarm.zoneId);
        
        // Höhere Priorität setzen
        alarm.config.priority = 'critical';
        
        // Weitere Notifikationen senden
        this.sendAlarmNotifications(zone, alarm);
        
        console.log(`[ALARM] Alarm ${alarm.id} eskaliert`);
    },
    
    // Alarm auflösen
    resolveAlarm(alarmId, responderId) {
        const alarm = this.activeAlarms.get(alarmId);
        if (!alarm) {
            console.error(`[ALARM] Alarm ${alarmId} nicht gefunden`);
            return false;
        }
        
        alarm.status = 'resolved';
        alarm.endTime = Date.now();
        alarm.resolved = true;
        alarm.responders.push(responderId);
        
        // Blip entfernen
        if (alarm.blip) {
            alarm.blip.destroy();
        }
        
        // Zone zurücksetzen
        const zone = this.alarmZones.get(alarm.zoneId);
        if (zone) {
            zone.alarms = zone.alarms.filter(a => a.id !== alarmId);
        }
        
        this.activeAlarms.delete(alarmId);
        
        console.log(`[ALARM] Alarm ${alarmId} von ${responderId} aufgelöst`);
        return true;
    },
    
    // Zone scharfschalten
    armZone(zoneId, playerId) {
        const zone = this.alarmZones.get(zoneId);
        if (!zone) {
            console.error(`[ALARM] Zone ${zoneId} nicht gefunden`);
            return false;
        }
        
        zone.status = 'armed';
        zone.owner = playerId;
        
        console.log(`[ALARM] Zone ${zone.name} scharfgeschaltet`);
        return true;
    },
    
    // Zone entschärfen
    disarmZone(zoneId, playerId) {
        const zone = this.alarmZones.get(zoneId);
        if (!zone) {
            console.error(`[ALARM] Zone ${zoneId} nicht gefunden`);
            return false;
        }
        
        zone.status = 'disarmed';
        
        // Alle aktiven Alarme in dieser Zone auflösen
        zone.alarms.forEach(alarm => {
            this.resolveAlarm(alarm.id, playerId);
        });
        
        console.log(`[ALARM] Zone ${zone.name} entschärft`);
        return true;
    },
    
    // Distanz berechnen
    getDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Aktive Alarme abrufen
    getActiveAlarms() {
        return Array.from(this.activeAlarms.values());
    },
    
    // Alarm-Statistiken
    getStatistics() {
        return {
            totalZones: this.alarmZones.size,
            activeAlarms: this.activeAlarms.size,
            totalSensors: this.sensors.size,
            alarmTypes: Object.keys(this.alarmConfig).length
        };
    }
};

// Events
mp.events.add('alarm:trigger', (player, zoneId, alarmType, triggerData) => {
    alarmSystem.triggerAlarm(zoneId, alarmType, triggerData);
});

mp.events.add('alarm:resolve', (player, alarmId) => {
    alarmSystem.resolveAlarm(alarmId, player.id);
});

mp.events.add('alarm:arm', (player, zoneId) => {
    alarmSystem.armZone(zoneId, player.id);
});

mp.events.add('alarm:disarm', (player, zoneId) => {
    alarmSystem.disarmZone(zoneId, player.id);
});

// Commands
mp.events.addCommand('alarm', (player, fullText, action, zoneId, alarmType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /alarm [arm|disarm|trigger|resolve] [ZoneID] [AlarmTyp]');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'arm':
            if (zoneId) {
                alarmSystem.armZone(zoneId, player.id);
            } else {
                player.outputChatBox('Zone ID erforderlich!');
            }
            break;
            
        case 'disarm':
            if (zoneId) {
                alarmSystem.disarmZone(zoneId, player.id);
            } else {
                player.outputChatBox('Zone ID erforderlich!');
            }
            break;
            
        case 'trigger':
            if (zoneId && alarmType) {
                alarmSystem.triggerAlarm(zoneId, alarmType);
            } else {
                player.outputChatBox('Zone ID und Alarm-Typ erforderlich!');
            }
            break;
            
        case 'resolve':
            if (zoneId) {
                alarmSystem.resolveAlarm(zoneId, player.id);
            } else {
                player.outputChatBox('Alarm ID erforderlich!');
            }
            break;
    }
});

// Alarm-System initialisieren
alarmSystem.init();

module.exports = alarmSystem;
