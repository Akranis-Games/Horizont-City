// Disability System - Behinderungs-System mit Hilfsmitteln und Unterstützung
// Behandelt alle Behinderungs-Funktionen für Horizont-City Roleplay

const disabilitySystem = {
    // Behinderungs-Typen
    disabilityTypes: {
        PHYSICAL: 'physical',
        VISUAL: 'visual',
        HEARING: 'hearing',
        COGNITIVE: 'cognitive',
        MOBILITY: 'mobility',
        SPEECH: 'speech',
        MENTAL: 'mental',
        TEMPORARY: 'temporary',
        PERMANENT: 'permanent',
        CUSTOM: 'custom'
    },
    
    // Spezifische Behinderungen
    specificDisabilities: {
        // Körperliche Behinderungen
        WHEELCHAIR: 'wheelchair',
        AMPUTATION: 'amputation',
        PARALYSIS: 'paralysis',
        ARTHRITIS: 'arthritis',
        CHRONIC_PAIN: 'chronic_pain',
        MUSCULAR_DYSTROPHY: 'muscular_dystrophy',
        CEREBRAL_PALSY: 'cerebral_palsy',
        SPINA_BIFIDA: 'spina_bifida',
        
        // Sehbehinderungen
        BLINDNESS: 'blindness',
        LOW_VISION: 'low_vision',
        COLOR_BLINDNESS: 'color_blindness',
        NIGHT_BLINDNESS: 'night_blindness',
        TUNNEL_VISION: 'tunnel_vision',
        
        // Hörbehinderungen
        DEAFNESS: 'deafness',
        HEARING_IMPAIRMENT: 'hearing_impairment',
        TINNITUS: 'tinnitus',
        AUDITORY_PROCESSING: 'auditory_processing',
        
        // Kognitive Behinderungen
        AUTISM: 'autism',
        ADHD: 'adhd',
        DYSLEXIA: 'dyslexia',
        DOWN_SYNDROME: 'down_syndrome',
        INTELLECTUAL_DISABILITY: 'intellectual_disability',
        MEMORY_IMPAIRMENT: 'memory_impairment',
        
        // Mobilitätsbehinderungen
        WALKING_DIFFICULTY: 'walking_difficulty',
        BALANCE_ISSUES: 'balance_issues',
        COORDINATION_PROBLEMS: 'coordination_problems',
        FATIGUE: 'fatigue',
        
        // Sprachbehinderungen
        SPEECH_IMPAIRMENT: 'speech_impairment',
        STUTTERING: 'stuttering',
        APHASIA: 'aphasia',
        MUTE: 'mute',
        
        // Psychische Behinderungen
        DEPRESSION: 'depression',
        ANXIETY: 'anxiety',
        PTSD: 'ptsd',
        BIPOLAR: 'bipolar',
        SCHIZOPHRENIA: 'schizophrenia',
        OCD: 'ocd'
    },
    
    // Hilfsmittel-Typen
    assistiveDevices: {
        // Mobilitätshilfen
        WHEELCHAIR: 'wheelchair',
        WALKER: 'walker',
        CANE: 'cane',
        CRUTCHES: 'crutches',
        PROSTHESIS: 'prosthesis',
        ORTHOSIS: 'orthosis',
        SCOOTER: 'scooter',
        STAIR_LIFT: 'stair_lift',
        
        // Sehhilfen
        GLASSES: 'glasses',
        CONTACT_LENSES: 'contact_lenses',
        MAGNIFYING_GLASS: 'magnifying_glass',
        BRAILLE_READER: 'braille_reader',
        SCREEN_READER: 'screen_reader',
        TACTILE_MAPS: 'tactile_maps',
        GUIDE_DOG: 'guide_dog',
        
        // Hörhilfen
        HEARING_AID: 'hearing_aid',
        COCHLEAR_IMPLANT: 'cochlear_implant',
        SIGN_LANGUAGE: 'sign_language',
        VIBRATING_ALARM: 'vibrating_alarm',
        FLASHING_LIGHTS: 'flashing_lights',
        
        // Kommunikationshilfen
        SPEECH_DEVICE: 'speech_device',
        COMMUNICATION_BOARD: 'communication_board',
        TEXT_TO_SPEECH: 'text_to_speech',
        VOICE_RECOGNITION: 'voice_recognition',
        
        // Kognitive Hilfen
        MEMORY_AIDS: 'memory_aids',
        SCHEDULE_APPS: 'schedule_apps',
        REMINDER_SYSTEMS: 'reminder_systems',
        SIMPLIFIED_INTERFACES: 'simplified_interfaces',
        
        // Medizinische Hilfen
        MEDICATION_REMINDER: 'medication_reminder',
        VITAL_SIGNS_MONITOR: 'vital_signs_monitor',
        EMERGENCY_ALERT: 'emergency_alert',
        MEDICAL_BRACELET: 'medical_bracelet'
    },
    
    // Behinderungs-Konfiguration
    disabilityConfig: {
        wheelchair: {
            name: 'Rollstuhl',
            type: 'physical',
            severity: 'moderate',
            mobilityImpact: 'high',
            independenceLevel: 'medium',
            requiredDevices: ['wheelchair'],
            accommodations: ['ramp_access', 'elevator', 'wide_doors'],
            limitations: ['stairs', 'narrow_spaces', 'high_objects'],
            benefits: ['mobility', 'independence'],
            cost: 500,
            maintenance: 50
        },
        blindness: {
            name: 'Blindheit',
            type: 'visual',
            severity: 'severe',
            mobilityImpact: 'high',
            independenceLevel: 'low',
            requiredDevices: ['guide_dog', 'braille_reader', 'screen_reader'],
            accommodations: ['audio_descriptions', 'tactile_maps', 'guide_system'],
            limitations: ['visual_tasks', 'driving', 'reading'],
            benefits: ['enhanced_hearing', 'tactile_sensitivity'],
            cost: 1000,
            maintenance: 100
        },
        deafness: {
            name: 'Taubheit',
            type: 'hearing',
            severity: 'severe',
            mobilityImpact: 'low',
            independenceLevel: 'medium',
            requiredDevices: ['hearing_aid', 'cochlear_implant', 'sign_language'],
            accommodations: ['visual_alerts', 'sign_language_interpreter', 'text_communication'],
            limitations: ['audio_communication', 'phone_calls', 'alerts'],
            benefits: ['visual_awareness', 'concentration'],
            cost: 800,
            maintenance: 80
        },
        autism: {
            name: 'Autismus',
            type: 'cognitive',
            severity: 'moderate',
            mobilityImpact: 'low',
            independenceLevel: 'medium',
            requiredDevices: ['communication_board', 'schedule_apps', 'sensory_tools'],
            accommodations: ['quiet_spaces', 'routine_support', 'clear_instructions'],
            limitations: ['social_interaction', 'change_adaptation', 'sensory_overload'],
            benefits: ['pattern_recognition', 'attention_to_detail'],
            cost: 300,
            maintenance: 30
        },
        depression: {
            name: 'Depression',
            type: 'mental',
            severity: 'moderate',
            mobilityImpact: 'medium',
            independenceLevel: 'low',
            requiredDevices: ['medication_reminder', 'mood_tracker', 'therapy_apps'],
            accommodations: ['flexible_schedule', 'emotional_support', 'therapy_access'],
            limitations: ['motivation', 'concentration', 'social_interaction'],
            benefits: ['empathy', 'resilience'],
            cost: 200,
            maintenance: 20
        },
        adhd: {
            name: 'ADHS',
            type: 'cognitive',
            severity: 'moderate',
            mobilityImpact: 'low',
            independenceLevel: 'medium',
            requiredDevices: ['focus_apps', 'timer_systems', 'organizational_tools'],
            accommodations: ['structured_environment', 'frequent_breaks', 'clear_goals'],
            limitations: ['focus', 'organization', 'impulse_control'],
            benefits: ['creativity', 'hyperfocus', 'energy'],
            cost: 250,
            maintenance: 25
        }
    },
    
    // Hilfsmittel-Konfiguration
    deviceConfig: {
        wheelchair: {
            name: 'Rollstuhl',
            type: 'mobility',
            cost: 500,
            maintenance: 50,
            durability: 100,
            effectiveness: 0.9,
            requirements: ['physical_disability'],
            features: ['manual', 'electric', 'foldable'],
            weight: 15,
            size: 'large'
        },
        guide_dog: {
            name: 'Blindenführhund',
            type: 'visual',
            cost: 2000,
            maintenance: 200,
            durability: 80,
            effectiveness: 0.95,
            requirements: ['visual_disability'],
            features: ['navigation', 'obstacle_avoidance', 'companionship'],
            weight: 25,
            size: 'medium'
        },
        hearing_aid: {
            name: 'Hörgerät',
            type: 'hearing',
            cost: 800,
            maintenance: 80,
            durability: 90,
            effectiveness: 0.8,
            requirements: ['hearing_disability'],
            features: ['digital', 'rechargeable', 'bluetooth'],
            weight: 0.1,
            size: 'tiny'
        },
        communication_board: {
            name: 'Kommunikationstafel',
            type: 'communication',
            cost: 100,
            maintenance: 10,
            durability: 95,
            effectiveness: 0.7,
            requirements: ['speech_disability'],
            features: ['pictures', 'words', 'symbols'],
            weight: 0.5,
            size: 'small'
        },
        memory_aids: {
            name: 'Gedächtnishilfen',
            type: 'cognitive',
            cost: 50,
            maintenance: 5,
            durability: 98,
            effectiveness: 0.6,
            requirements: ['cognitive_disability'],
            features: ['reminders', 'notes', 'alarms'],
            weight: 0.2,
            size: 'tiny'
        }
    },
    
    // Aktive Behinderungen
    activeDisabilities: new Map(),
    
    // Hilfsmittel-Inventar
    assistiveDevices: new Map(),
    
    // Unterstützungs-Services
    supportServices: new Map(),
    
    // Behinderungs-System-Initialisierung
    init() {
        console.log('[DISABILITY] Behinderungs-System initialisiert');
        this.createDefaultServices();
    },
    
    // Standard-Services erstellen
    createDefaultServices() {
        const services = [
            {
                id: 'service_1',
                name: 'Mobilitäts-Service',
                type: 'mobility',
                description: 'Hilfe bei Mobilitätsproblemen',
                cost: 100,
                availability: '24/7',
                location: { x: 200, y: 300, z: 30 }
            },
            {
                id: 'service_2',
                name: 'Sehbehinderten-Service',
                type: 'visual',
                description: 'Unterstützung für Sehbehinderte',
                cost: 150,
                availability: '8-20',
                location: { x: 250, y: 350, z: 30 }
            },
            {
                id: 'service_3',
                name: 'Hörbehinderten-Service',
                type: 'hearing',
                description: 'Unterstützung für Hörbehinderte',
                cost: 120,
                availability: '8-20',
                location: { x: 300, y: 400, z: 30 }
            },
            {
                id: 'service_4',
                name: 'Kognitiver Support',
                type: 'cognitive',
                description: 'Hilfe bei kognitiven Problemen',
                cost: 200,
                availability: '9-17',
                location: { x: 350, y: 450, z: 30 }
            },
            {
                id: 'service_5',
                name: 'Psychologischer Service',
                type: 'mental',
                description: 'Psychologische Unterstützung',
                cost: 300,
                availability: '9-17',
                location: { x: 400, y: 500, z: 30 }
            }
        ];
        
        services.forEach(service => {
            this.createSupportService(service);
        });
        
        console.log(`[DISABILITY] ${services.length} Support-Services erstellt`);
    },
    
    // Support-Service erstellen
    createSupportService(serviceData) {
        const service = {
            id: serviceData.id,
            name: serviceData.name,
            type: serviceData.type,
            description: serviceData.description,
            cost: serviceData.cost,
            availability: serviceData.availability,
            location: serviceData.location,
            status: 'active',
            created: Date.now(),
            staff: [],
            equipment: []
        };
        
        this.supportServices.set(serviceData.id, service);
        
        console.log(`[DISABILITY] Support-Service ${serviceData.name} erstellt`);
        return true;
    },
    
    // Behinderung hinzufügen
    addDisability(player, disabilityType, severity = 'moderate') {
        const config = this.disabilityConfig[disabilityType];
        if (!config) {
            player.outputChatBox('Unbekannte Behinderung!');
            return false;
        }
        
        const disabilityId = `disability_${player.id}_${Date.now()}`;
        const disability = {
            id: disabilityId,
            playerId: player.id,
            type: disabilityType,
            severity: severity,
            config: config,
            status: 'active',
            created: Date.now(),
            lastTreatment: null,
            progress: 0,
            accommodations: [...config.accommodations],
            limitations: [...config.limitations],
            benefits: [...config.benefits]
        };
        
        this.activeDisabilities.set(disabilityId, disability);
        
        // Spieler über Behinderung informieren
        player.outputChatBox(`Behinderung ${config.name} hinzugefügt!`);
        player.call('ui:show', 'DisabilityInfo', { disability: disability });
        
        console.log(`[DISABILITY] Behinderung ${disabilityType} für Spieler ${player.id} hinzugefügt`);
        return disabilityId;
    },
    
    // Behinderung entfernen
    removeDisability(player, disabilityId) {
        const disability = this.activeDisabilities.get(disabilityId);
        if (!disability || disability.playerId !== player.id) {
            player.outputChatBox('Behinderung nicht gefunden!');
            return false;
        }
        
        this.activeDisabilities.delete(disabilityId);
        
        player.outputChatBox(`Behinderung ${disability.config.name} entfernt!`);
        console.log(`[DISABILITY] Behinderung ${disabilityId} für Spieler ${player.id} entfernt`);
        return true;
    },
    
    // Hilfsmittel hinzufügen
    addAssistiveDevice(player, deviceType, quality = 'standard') {
        const config = this.deviceConfig[deviceType];
        if (!config) {
            player.outputChatBox('Unbekanntes Hilfsmittel!');
            return false;
        }
        
        const deviceId = `device_${player.id}_${Date.now()}`;
        const device = {
            id: deviceId,
            playerId: player.id,
            type: deviceType,
            quality: quality,
            config: config,
            status: 'active',
            durability: config.durability,
            effectiveness: config.effectiveness,
            created: Date.now(),
            lastMaintenance: Date.now(),
            maintenanceCost: config.maintenance
        };
        
        this.assistiveDevices.set(deviceId, device);
        
        // Spieler über Hilfsmittel informieren
        player.outputChatBox(`Hilfsmittel ${config.name} hinzugefügt!`);
        player.call('ui:show', 'AssistiveDevice', { device: device });
        
        console.log(`[DISABILITY] Hilfsmittel ${deviceType} für Spieler ${player.id} hinzugefügt`);
        return deviceId;
    },
    
    // Hilfsmittel entfernen
    removeAssistiveDevice(player, deviceId) {
        const device = this.assistiveDevices.get(deviceId);
        if (!device || device.playerId !== player.id) {
            player.outputChatBox('Hilfsmittel nicht gefunden!');
            return false;
        }
        
        this.assistiveDevices.delete(deviceId);
        
        player.outputChatBox(`Hilfsmittel ${device.config.name} entfernt!`);
        console.log(`[DISABILITY] Hilfsmittel ${deviceId} für Spieler ${player.id} entfernt`);
        return true;
    },
    
    // Hilfsmittel reparieren
    repairAssistiveDevice(player, deviceId) {
        const device = this.assistiveDevices.get(deviceId);
        if (!device || device.playerId !== player.id) {
            player.outputChatBox('Hilfsmittel nicht gefunden!');
            return false;
        }
        
        const repairCost = device.maintenanceCost;
        if (player.money < repairCost) {
            player.outputChatBox('Nicht genug Geld für Reparatur!');
            return false;
        }
        
        // Reparatur durchführen
        device.durability = Math.min(100, device.durability + 20);
        device.effectiveness = Math.min(1.0, device.effectiveness + 0.1);
        device.lastMaintenance = Date.now();
        
        player.money -= repairCost;
        
        player.outputChatBox(`Hilfsmittel ${device.config.name} repariert! Kosten: $${repairCost}`);
        console.log(`[DISABILITY] Hilfsmittel ${deviceId} für Spieler ${player.id} repariert`);
        return true;
    },
    
    // Unterstützung anfordern
    requestSupport(player, serviceType) {
        const services = Array.from(this.supportServices.values()).filter(service => 
            service.type === serviceType && service.status === 'active'
        );
        
        if (services.length === 0) {
            player.outputChatBox('Kein Support-Service verfügbar!');
            return false;
        }
        
        const service = services[0];
        const cost = service.cost;
        
        if (player.money < cost) {
            player.outputChatBox('Nicht genug Geld für Support!');
            return false;
        }
        
        // Support anbieten
        player.money -= cost;
        
        player.outputChatBox(`Support von ${service.name} angefordert! Kosten: $${cost}`);
        player.call('ui:show', 'SupportService', { service: service });
        
        console.log(`[DISABILITY] Support ${serviceType} für Spieler ${player.id} angefordert`);
        return true;
    },
    
    // Barrierefreiheit prüfen
    checkAccessibility(player, location, disabilityType) {
        const disability = this.getPlayerDisability(player, disabilityType);
        if (!disability) {
            return true; // Keine Behinderung = barrierefrei
        }
        
        const accommodations = disability.accommodations;
        const limitations = disability.limitations;
        
        // Hier würde die Barrierefreiheits-Prüfung implementiert werden
        // z.B. Rampen, Aufzüge, breite Türen, etc.
        
        return true; // Vereinfacht für Demo
    },
    
    // Spieler-Behinderung abrufen
    getPlayerDisability(player, disabilityType) {
        const disabilities = Array.from(this.activeDisabilities.values()).filter(disability => 
            disability.playerId === player.id && disability.type === disabilityType
        );
        
        return disabilities.length > 0 ? disabilities[0] : null;
    },
    
    // Spieler-Hilfsmittel abrufen
    getPlayerDevices(player, deviceType) {
        const devices = Array.from(this.assistiveDevices.values()).filter(device => 
            device.playerId === player.id && device.type === deviceType
        );
        
        return devices;
    },
    
    // Behinderungs-Statistiken
    getStatistics() {
        return {
            totalDisabilities: this.activeDisabilities.size,
            totalDevices: this.assistiveDevices.size,
            totalServices: this.supportServices.size,
            disabilityTypes: Object.keys(this.disabilityConfig).length,
            deviceTypes: Object.keys(this.deviceConfig).length
        };
    }
};

// Events
mp.events.add('disability:add', (player, disabilityType, severity) => {
    disabilitySystem.addDisability(player, disabilityType, severity);
});

mp.events.add('disability:remove', (player, disabilityId) => {
    disabilitySystem.removeDisability(player, disabilityId);
});

mp.events.add('disability:addDevice', (player, deviceType, quality) => {
    disabilitySystem.addAssistiveDevice(player, deviceType, quality);
});

mp.events.add('disability:removeDevice', (player, deviceId) => {
    disabilitySystem.removeAssistiveDevice(player, deviceId);
});

mp.events.add('disability:repairDevice', (player, deviceId) => {
    disabilitySystem.repairAssistiveDevice(player, deviceId);
});

mp.events.add('disability:requestSupport', (player, serviceType) => {
    disabilitySystem.requestSupport(player, serviceType);
});

// Commands
mp.events.addCommand('disability', (player, fullText, action, type, severity) => {
    if (!action) {
        player.outputChatBox('Verwendung: /disability [add|remove|list] [Typ] [Schwere]');
        player.outputChatBox('Verfügbare Typen: wheelchair, blindness, deafness, autism, depression, adhd');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'add':
            if (type) {
                disabilitySystem.addDisability(player, type, severity || 'moderate');
            } else {
                player.outputChatBox('Behinderungs-Typ erforderlich!');
            }
            break;
            
        case 'remove':
            if (type) {
                disabilitySystem.removeDisability(player, type);
            } else {
                player.outputChatBox('Behinderungs-ID erforderlich!');
            }
            break;
            
        case 'list':
            const disabilities = Array.from(disabilitySystem.activeDisabilities.values()).filter(d => d.playerId === player.id);
            player.outputChatBox('=== Deine Behinderungen ===');
            disabilities.forEach(disability => {
                player.outputChatBox(`- ${disability.config.name} (${disability.severity})`);
            });
            break;
    }
});

mp.events.addCommand('device', (player, fullText, action, type, quality) => {
    if (!action) {
        player.outputChatBox('Verwendung: /device [add|remove|repair|list] [Typ] [Qualität]');
        player.outputChatBox('Verfügbare Typen: wheelchair, guide_dog, hearing_aid, communication_board, memory_aids');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'add':
            if (type) {
                disabilitySystem.addAssistiveDevice(player, type, quality || 'standard');
            } else {
                player.outputChatBox('Geräte-Typ erforderlich!');
            }
            break;
            
        case 'remove':
            if (type) {
                disabilitySystem.removeAssistiveDevice(player, type);
            } else {
                player.outputChatBox('Geräte-ID erforderlich!');
            }
            break;
            
        case 'repair':
            if (type) {
                disabilitySystem.repairAssistiveDevice(player, type);
            } else {
                player.outputChatBox('Geräte-ID erforderlich!');
            }
            break;
            
        case 'list':
            const devices = Array.from(disabilitySystem.assistiveDevices.values()).filter(d => d.playerId === player.id);
            player.outputChatBox('=== Deine Hilfsmittel ===');
            devices.forEach(device => {
                player.outputChatBox(`- ${device.config.name} (${device.durability}% Haltbarkeit)`);
            });
            break;
    }
});

mp.events.addCommand('support', (player, fullText, serviceType) => {
    if (!serviceType) {
        player.outputChatBox('Verwendung: /support [Service-Typ]');
        player.outputChatBox('Verfügbare Services: mobility, visual, hearing, cognitive, mental');
        return;
    }
    
    disabilitySystem.requestSupport(player, serviceType);
});

mp.events.addCommand('disabilitystats', (player) => {
    const stats = disabilitySystem.getStatistics();
    player.outputChatBox('=== Behinderungs-Statistiken ===');
    player.outputChatBox(`Gesamt Behinderungen: ${stats.totalDisabilities}`);
    player.outputChatBox(`Gesamt Hilfsmittel: ${stats.totalDevices}`);
    player.outputChatBox(`Gesamt Services: ${stats.totalServices}`);
    player.outputChatBox(`Behinderungs-Typen: ${stats.disabilityTypes}`);
    player.outputChatBox(`Geräte-Typen: ${stats.deviceTypes}`);
});

// Behinderungs-System initialisieren
disabilitySystem.init();

module.exports = disabilitySystem;
