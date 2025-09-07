// Disaster System - Katastrophen-System mit Notfällen und Rettungsdiensten
// Behandelt alle Katastrophen-Funktionen für Horizont-City Roleplay

const disasterSystem = {
    // Katastrophen-Typen
    disasterTypes: {
        EARTHQUAKE: 'earthquake',
        FLOOD: 'flood',
        FIRE: 'fire',
        TORNADO: 'tornado',
        HURRICANE: 'hurricane',
        TSUNAMI: 'tsunami',
        VOLCANO: 'volcano',
        DROUGHT: 'drought',
        BLIZZARD: 'blizzard',
        HEATWAVE: 'heatwave',
        PANDEMIC: 'pandemic',
        NUCLEAR: 'nuclear',
        CYBER_ATTACK: 'cyber_attack',
        TERRORISM: 'terrorism',
        EXPLOSION: 'explosion',
        GAS_LEAK: 'gas_leak',
        POWER_OUTAGE: 'power_outage',
        WATER_SHORTAGE: 'water_shortage',
        TRANSPORT_ACCIDENT: 'transport_accident',
        BUILDING_COLLAPSE: 'building_collapse',
        BRIDGE_COLLAPSE: 'bridge_collapse',
        DAM_BREAK: 'dam_break',
        OIL_SPILL: 'oil_spill',
        CHEMICAL_SPILL: 'chemical_spill',
        BIOLOGICAL: 'biological',
        RADIATION: 'radiation',
        AVALANCHE: 'avalanche',
        LANDSLIDE: 'landslide',
        METEOR: 'meteor',
        SOLAR_STORM: 'solar_storm'
    },
    
    // Katastrophen-Konfiguration
    disasterConfig: {
        earthquake: {
            name: 'Erdbeben',
            type: 'earthquake',
            severity: 'high',
            duration: 300, // 5 Minuten
            damage: 0.8,
            casualties: 0.3,
            evacuation: true,
            radius: 5000, // 5km
            warning: 30, // 30 Sekunden Vorwarnung
            description: 'Starkes Erdbeben mit massiven Schäden',
            effects: ['building_damage', 'infrastructure_damage', 'power_outage', 'gas_leak'],
            response: ['fire_department', 'police', 'ambulance', 'search_rescue', 'engineers']
        },
        flood: {
            name: 'Überschwemmung',
            type: 'flood',
            severity: 'medium',
            duration: 1800, // 30 Minuten
            damage: 0.6,
            casualties: 0.2,
            evacuation: true,
            radius: 3000, // 3km
            warning: 300, // 5 Minuten Vorwarnung
            description: 'Schwere Überschwemmung durch Starkregen',
            effects: ['water_damage', 'transport_disruption', 'power_outage', 'contamination'],
            response: ['fire_department', 'police', 'ambulance', 'coast_guard', 'engineers']
        },
        fire: {
            name: 'Großbrand',
            type: 'fire',
            severity: 'high',
            duration: 600, // 10 Minuten
            damage: 0.7,
            casualties: 0.4,
            evacuation: true,
            radius: 1000, // 1km
            warning: 60, // 1 Minute Vorwarnung
            description: 'Großbrand mit starker Rauchentwicklung',
            effects: ['fire_damage', 'smoke_damage', 'air_pollution', 'power_outage'],
            response: ['fire_department', 'police', 'ambulance', 'hazmat', 'engineers']
        },
        tornado: {
            name: 'Tornado',
            type: 'tornado',
            severity: 'extreme',
            duration: 180, // 3 Minuten
            damage: 0.9,
            casualties: 0.5,
            evacuation: true,
            radius: 2000, // 2km
            warning: 120, // 2 Minuten Vorwarnung
            description: 'Zerstörerischer Tornado mit hoher Windgeschwindigkeit',
            effects: ['building_destruction', 'flying_debris', 'power_outage', 'transport_disruption'],
            response: ['fire_department', 'police', 'ambulance', 'search_rescue', 'engineers']
        },
        hurricane: {
            name: 'Hurrikan',
            type: 'hurricane',
            severity: 'extreme',
            duration: 3600, // 60 Minuten
            damage: 0.8,
            casualties: 0.3,
            evacuation: true,
            radius: 10000, // 10km
            warning: 3600, // 60 Minuten Vorwarnung
            description: 'Starker Hurrikan mit Regen und Wind',
            effects: ['building_damage', 'flooding', 'power_outage', 'transport_disruption'],
            response: ['fire_department', 'police', 'ambulance', 'coast_guard', 'military']
        },
        tsunami: {
            name: 'Tsunami',
            type: 'tsunami',
            severity: 'extreme',
            duration: 600, // 10 Minuten
            damage: 0.95,
            casualties: 0.6,
            evacuation: true,
            radius: 5000, // 5km
            warning: 600, // 10 Minuten Vorwarnung
            description: 'Zerstörerischer Tsunami mit hohen Wellen',
            effects: ['massive_flooding', 'building_destruction', 'infrastructure_damage', 'contamination'],
            response: ['coast_guard', 'military', 'fire_department', 'police', 'ambulance']
        },
        volcano: {
            name: 'Vulkanausbruch',
            type: 'volcano',
            severity: 'extreme',
            duration: 1800, // 30 Minuten
            damage: 0.7,
            casualties: 0.4,
            evacuation: true,
            radius: 8000, // 8km
            warning: 1800, // 30 Minuten Vorwarnung
            description: 'Vulkanausbruch mit Lava und Asche',
            effects: ['lava_damage', 'ash_fall', 'air_pollution', 'transport_disruption'],
            response: ['volcanologists', 'military', 'fire_department', 'police', 'ambulance']
        },
        drought: {
            name: 'Dürre',
            type: 'drought',
            severity: 'medium',
            duration: 86400, // 24 Stunden
            damage: 0.3,
            casualties: 0.1,
            evacuation: false,
            radius: 20000, // 20km
            warning: 86400, // 24 Stunden Vorwarnung
            description: 'Langanhaltende Dürre mit Wassermangel',
            effects: ['water_shortage', 'crop_failure', 'fire_risk', 'economic_damage'],
            response: ['water_authorities', 'agriculture_department', 'fire_department', 'economists']
        },
        blizzard: {
            name: 'Blizzard',
            type: 'blizzard',
            severity: 'high',
            duration: 7200, // 2 Stunden
            damage: 0.4,
            casualties: 0.2,
            evacuation: false,
            radius: 5000, // 5km
            warning: 1800, // 30 Minuten Vorwarnung
            description: 'Schwerer Schneesturm mit starkem Wind',
            effects: ['snow_damage', 'transport_disruption', 'power_outage', 'cold_exposure'],
            response: ['snow_removal', 'police', 'ambulance', 'power_company', 'transport_authorities']
        },
        heatwave: {
            name: 'Hitzewelle',
            type: 'heatwave',
            severity: 'medium',
            duration: 86400, // 24 Stunden
            damage: 0.2,
            casualties: 0.15,
            evacuation: false,
            radius: 15000, // 15km
            warning: 86400, // 24 Stunden Vorwarnung
            description: 'Extreme Hitze mit hohen Temperaturen',
            effects: ['heat_exhaustion', 'power_outage', 'water_shortage', 'fire_risk'],
            response: ['health_department', 'power_company', 'water_authorities', 'fire_department']
        },
        pandemic: {
            name: 'Pandemie',
            type: 'pandemic',
            severity: 'extreme',
            duration: 604800, // 7 Tage
            damage: 0.1,
            casualties: 0.3,
            evacuation: false,
            radius: 50000, // 50km
            warning: 86400, // 24 Stunden Vorwarnung
            description: 'Schwere Pandemie mit hoher Ansteckungsrate',
            effects: ['illness', 'quarantine', 'economic_damage', 'healthcare_overload'],
            response: ['health_department', 'medical_teams', 'police', 'government', 'scientists']
        },
        nuclear: {
            name: 'Nuklearunfall',
            type: 'nuclear',
            severity: 'extreme',
            duration: 3600, // 60 Minuten
            damage: 0.6,
            casualties: 0.7,
            evacuation: true,
            radius: 10000, // 10km
            warning: 300, // 5 Minuten Vorwarnung
            description: 'Schwerer Nuklearunfall mit Strahlung',
            effects: ['radiation', 'contamination', 'evacuation', 'long_term_damage'],
            response: ['nuclear_experts', 'military', 'hazmat', 'medical_teams', 'government']
        },
        cyber_attack: {
            name: 'Cyberangriff',
            type: 'cyber_attack',
            severity: 'high',
            duration: 1800, // 30 Minuten
            damage: 0.3,
            casualties: 0.05,
            evacuation: false,
            radius: 0, // Global
            warning: 0, // Keine Vorwarnung
            description: 'Großangelegter Cyberangriff auf kritische Infrastruktur',
            effects: ['power_outage', 'communication_disruption', 'financial_damage', 'data_loss'],
            response: ['cyber_security', 'it_departments', 'police', 'government', 'experts']
        },
        terrorism: {
            name: 'Terroranschlag',
            type: 'terrorism',
            severity: 'extreme',
            duration: 300, // 5 Minuten
            damage: 0.8,
            casualties: 0.6,
            evacuation: true,
            radius: 2000, // 2km
            warning: 0, // Keine Vorwarnung
            description: 'Schwerer Terroranschlag mit Explosionen',
            effects: ['explosion_damage', 'casualties', 'panic', 'security_lockdown'],
            response: ['police', 'ambulance', 'fire_department', 'military', 'government']
        },
        explosion: {
            name: 'Explosion',
            type: 'explosion',
            severity: 'high',
            duration: 60, // 1 Minute
            damage: 0.7,
            casualties: 0.5,
            evacuation: true,
            radius: 1000, // 1km
            warning: 0, // Keine Vorwarnung
            description: 'Schwere Explosion mit Trümmern und Feuer',
            effects: ['explosion_damage', 'fire', 'flying_debris', 'casualties'],
            response: ['fire_department', 'police', 'ambulance', 'hazmat', 'engineers']
        },
        gas_leak: {
            name: 'Gasleck',
            type: 'gas_leak',
            severity: 'high',
            duration: 1800, // 30 Minuten
            damage: 0.4,
            casualties: 0.3,
            evacuation: true,
            radius: 2000, // 2km
            warning: 300, // 5 Minuten Vorwarnung
            description: 'Gefährliches Gasleck mit Explosionsgefahr',
            effects: ['gas_contamination', 'explosion_risk', 'health_hazard', 'evacuation'],
            response: ['hazmat', 'fire_department', 'police', 'ambulance', 'gas_company']
        },
        power_outage: {
            name: 'Stromausfall',
            type: 'power_outage',
            severity: 'medium',
            duration: 3600, // 60 Minuten
            damage: 0.1,
            casualties: 0.05,
            evacuation: false,
            radius: 10000, // 10km
            warning: 0, // Keine Vorwarnung
            description: 'Großflächiger Stromausfall',
            effects: ['power_loss', 'communication_disruption', 'transport_disruption', 'economic_damage'],
            response: ['power_company', 'emergency_services', 'government', 'engineers']
        },
        water_shortage: {
            name: 'Wassermangel',
            type: 'water_shortage',
            severity: 'medium',
            duration: 86400, // 24 Stunden
            damage: 0.2,
            casualties: 0.1,
            evacuation: false,
            radius: 20000, // 20km
            warning: 86400, // 24 Stunden Vorwarnung
            description: 'Schwerer Wassermangel in der Stadt',
            effects: ['water_rationing', 'health_risks', 'economic_damage', 'fire_risk'],
            response: ['water_authorities', 'health_department', 'fire_department', 'government']
        },
        transport_accident: {
            name: 'Transportunfall',
            type: 'transport_accident',
            severity: 'high',
            duration: 300, // 5 Minuten
            damage: 0.6,
            casualties: 0.4,
            evacuation: true,
            radius: 500, // 500m
            warning: 0, // Keine Vorwarnung
            description: 'Schwerer Unfall im öffentlichen Verkehr',
            effects: ['casualties', 'transport_disruption', 'infrastructure_damage', 'traffic_jam'],
            response: ['ambulance', 'fire_department', 'police', 'transport_authorities', 'engineers']
        },
        building_collapse: {
            name: 'Gebäudeeinsturz',
            type: 'building_collapse',
            severity: 'extreme',
            duration: 180, // 3 Minuten
            damage: 0.9,
            casualties: 0.7,
            evacuation: true,
            radius: 500, // 500m
            warning: 60, // 1 Minute Vorwarnung
            description: 'Schwerer Gebäudeeinsturz mit Trümmern',
            effects: ['building_destruction', 'casualties', 'flying_debris', 'infrastructure_damage'],
            response: ['search_rescue', 'fire_department', 'police', 'ambulance', 'engineers']
        },
        bridge_collapse: {
            name: 'Brückeneinsturz',
            type: 'bridge_collapse',
            severity: 'extreme',
            duration: 120, // 2 Minuten
            damage: 0.8,
            casualties: 0.6,
            evacuation: true,
            radius: 1000, // 1km
            warning: 30, // 30 Sekunden Vorwarnung
            description: 'Schwerer Brückeneinsturz mit Fahrzeugen',
            effects: ['infrastructure_destruction', 'casualties', 'transport_disruption', 'water_damage'],
            response: ['search_rescue', 'fire_department', 'police', 'ambulance', 'engineers']
        },
        dam_break: {
            name: 'Dammbruch',
            type: 'dam_break',
            severity: 'extreme',
            duration: 600, // 10 Minuten
            damage: 0.9,
            casualties: 0.8,
            evacuation: true,
            radius: 15000, // 15km
            warning: 300, // 5 Minuten Vorwarnung
            description: 'Schwerer Dammbruch mit massiven Überschwemmungen',
            effects: ['massive_flooding', 'infrastructure_destruction', 'casualties', 'contamination'],
            response: ['coast_guard', 'military', 'fire_department', 'police', 'ambulance']
        },
        oil_spill: {
            name: 'Ölkatastrophe',
            type: 'oil_spill',
            severity: 'high',
            duration: 3600, // 60 Minuten
            damage: 0.5,
            casualties: 0.2,
            evacuation: false,
            radius: 5000, // 5km
            warning: 600, // 10 Minuten Vorwarnung
            description: 'Schwere Ölkatastrophe mit Umweltverschmutzung',
            effects: ['environmental_damage', 'water_contamination', 'health_risks', 'economic_damage'],
            response: ['environmental_teams', 'coast_guard', 'hazmat', 'government', 'experts']
        },
        chemical_spill: {
            name: 'Chemieunfall',
            type: 'chemical_spill',
            severity: 'extreme',
            duration: 1800, // 30 Minuten
            damage: 0.6,
            casualties: 0.5,
            evacuation: true,
            radius: 3000, // 3km
            warning: 300, // 5 Minuten Vorwarnung
            description: 'Schwerer Chemieunfall mit giftigen Substanzen',
            effects: ['chemical_contamination', 'health_hazard', 'environmental_damage', 'evacuation'],
            response: ['hazmat', 'fire_department', 'police', 'ambulance', 'environmental_teams']
        },
        biological: {
            name: 'Biologischer Unfall',
            type: 'biological',
            severity: 'extreme',
            duration: 7200, // 2 Stunden
            damage: 0.3,
            casualties: 0.4,
            evacuation: true,
            radius: 5000, // 5km
            warning: 600, // 10 Minuten Vorwarnung
            description: 'Schwerer biologischer Unfall mit gefährlichen Substanzen',
            effects: ['biological_contamination', 'health_hazard', 'quarantine', 'panic'],
            response: ['biological_experts', 'health_department', 'hazmat', 'police', 'government']
        },
        radiation: {
            name: 'Strahlungsunfall',
            type: 'radiation',
            severity: 'extreme',
            duration: 3600, // 60 Minuten
            damage: 0.7,
            casualties: 0.6,
            evacuation: true,
            radius: 8000, // 8km
            warning: 300, // 5 Minuten Vorwarnung
            description: 'Schwerer Strahlungsunfall mit radioaktiver Kontamination',
            effects: ['radiation_contamination', 'health_hazard', 'evacuation', 'long_term_damage'],
            response: ['radiation_experts', 'hazmat', 'military', 'medical_teams', 'government']
        },
        avalanche: {
            name: 'Lawine',
            type: 'avalanche',
            severity: 'extreme',
            duration: 180, // 3 Minuten
            damage: 0.9,
            casualties: 0.8,
            evacuation: true,
            radius: 2000, // 2km
            warning: 60, // 1 Minute Vorwarnung
            description: 'Schwere Lawine mit massiven Schneemassen',
            effects: ['snow_damage', 'casualties', 'infrastructure_destruction', 'transport_disruption'],
            response: ['avalanche_rescue', 'search_rescue', 'police', 'ambulance', 'military']
        },
        landslide: {
            name: 'Erdrutsch',
            type: 'landslide',
            severity: 'high',
            duration: 300, // 5 Minuten
            damage: 0.8,
            casualties: 0.6,
            evacuation: true,
            radius: 1500, // 1.5km
            warning: 120, // 2 Minuten Vorwarnung
            description: 'Schwerer Erdrutsch mit Erd- und Gesteinsmassen',
            effects: ['earth_damage', 'casualties', 'infrastructure_destruction', 'transport_disruption'],
            response: ['search_rescue', 'fire_department', 'police', 'ambulance', 'engineers']
        },
        meteor: {
            name: 'Meteoriteneinschlag',
            type: 'meteor',
            severity: 'extreme',
            duration: 60, // 1 Minute
            damage: 0.95,
            casualties: 0.9,
            evacuation: true,
            radius: 10000, // 10km
            warning: 0, // Keine Vorwarnung
            description: 'Schwerer Meteoriteneinschlag mit massiven Zerstörungen',
            effects: ['massive_destruction', 'casualties', 'shockwave', 'fire', 'dust_cloud'],
            response: ['military', 'search_rescue', 'fire_department', 'police', 'ambulance']
        },
        solar_storm: {
            name: 'Sonnensturm',
            type: 'solar_storm',
            severity: 'high',
            duration: 86400, // 24 Stunden
            damage: 0.4,
            casualties: 0.1,
            evacuation: false,
            radius: 0, // Global
            warning: 86400, // 24 Stunden Vorwarnung
            description: 'Starker Sonnensturm mit elektromagnetischen Störungen',
            effects: ['power_outage', 'communication_disruption', 'satellite_damage', 'navigation_errors'],
            response: ['power_company', 'communication_authorities', 'space_agencies', 'government']
        }
    },
    
    // Rettungsdienste
    emergencyServices: {
        'fire_department': {
            name: 'Feuerwehr',
            type: 'fire_department',
            vehicles: ['fire_truck', 'ladder_truck', 'rescue_truck', 'hazmat_truck'],
            personnel: 50,
            responseTime: 5, // Minuten
            capabilities: ['fire_fighting', 'rescue', 'hazmat', 'medical'],
            status: 'active'
        },
        'police': {
            name: 'Polizei',
            type: 'police',
            vehicles: ['police_car', 'swat_truck', 'command_vehicle'],
            personnel: 100,
            responseTime: 3, // Minuten
            capabilities: ['law_enforcement', 'crowd_control', 'investigation', 'security'],
            status: 'active'
        },
        'ambulance': {
            name: 'Rettungsdienst',
            type: 'ambulance',
            vehicles: ['ambulance', 'medical_helicopter', 'mobile_hospital'],
            personnel: 80,
            responseTime: 4, // Minuten
            capabilities: ['medical_emergency', 'trauma_care', 'transport', 'triage'],
            status: 'active'
        },
        'search_rescue': {
            name: 'Such- und Rettungsdienst',
            type: 'search_rescue',
            vehicles: ['rescue_truck', 'helicopter', 'boat'],
            personnel: 30,
            responseTime: 10, // Minuten
            capabilities: ['search', 'rescue', 'technical_rescue', 'water_rescue'],
            status: 'active'
        },
        'hazmat': {
            name: 'Gefahrgut-Team',
            type: 'hazmat',
            vehicles: ['hazmat_truck', 'decontamination_unit'],
            personnel: 20,
            responseTime: 15, // Minuten
            capabilities: ['hazardous_materials', 'decontamination', 'chemical_analysis'],
            status: 'active'
        },
        'military': {
            name: 'Militär',
            type: 'military',
            vehicles: ['military_truck', 'helicopter', 'armored_vehicle'],
            personnel: 200,
            responseTime: 30, // Minuten
            capabilities: ['security', 'logistics', 'engineering', 'medical', 'transport'],
            status: 'active'
        }
    },
    
    // Aktive Katastrophen
    activeDisasters: new Map(),
    
    // Rettungsdienste
    activeEmergencyServices: new Map(),
    
    // Evakuierungen
    evacuations: new Map(),
    
    // Katastrophen-System-Initialisierung
    init() {
        console.log('[DISASTER] Katastrophen-System initialisiert');
        this.initializeEmergencyServices();
        this.startDisasterMonitoring();
    },
    
    // Rettungsdienste initialisieren
    initializeEmergencyServices() {
        Object.keys(this.emergencyServices).forEach(serviceId => {
            const service = this.emergencyServices[serviceId];
            service.id = serviceId;
            service.available = true;
            service.currentMissions = [];
            service.completedMissions = [];
            
            this.activeEmergencyServices.set(serviceId, service);
        });
        
        console.log(`[DISASTER] ${Object.keys(this.emergencyServices).length} Rettungsdienste initialisiert`);
    },
    
    // Katastrophen-Überwachung starten
    startDisasterMonitoring() {
        setInterval(() => {
            this.checkForDisasters();
        }, 300000); // Alle 5 Minuten prüfen
        
        console.log('[DISASTER] Katastrophen-Überwachung gestartet');
    },
    
    // Katastrophen prüfen
    checkForDisasters() {
        // Zufällige Katastrophe mit geringer Wahrscheinlichkeit
        if (Math.random() < 0.01) { // 1% Chance alle 5 Minuten
            const disasterTypes = Object.keys(this.disasterTypes);
            const randomType = disasterTypes[Math.floor(Math.random() * disasterTypes.length)];
            this.triggerDisaster(randomType);
        }
    },
    
    // Katastrophe auslösen
    triggerDisaster(disasterType) {
        const config = this.disasterConfig[disasterType];
        if (!config) {
            console.log(`[DISASTER] Unbekannter Katastrophen-Typ: ${disasterType}`);
            return false;
        }
        
        const disasterId = `disaster_${Date.now()}`;
        const disaster = {
            id: disasterId,
            type: disasterType,
            config: config,
            startTime: Date.now(),
            endTime: Date.now() + (config.duration * 1000),
            location: this.getRandomLocation(),
            radius: config.radius,
            severity: config.severity,
            status: 'active',
            damage: 0,
            casualties: 0,
            evacuated: 0,
            response: [],
            created: Date.now()
        };
        
        this.activeDisasters.set(disasterId, disaster);
        
        // Warnung senden
        this.sendDisasterWarning(disaster);
        
        // Rettungsdienste alarmieren
        this.alertEmergencyServices(disaster);
        
        // Evakuierung starten
        if (config.evacuation) {
            this.startEvacuation(disaster);
        }
        
        // Katastrophe beenden nach der Dauer
        setTimeout(() => {
            this.endDisaster(disasterId);
        }, config.duration * 1000);
        
        console.log(`[DISASTER] Katastrophe ${config.name} ausgelöst`);
        return disasterId;
    },
    
    // Zufällige Position generieren
    getRandomLocation() {
        return {
            x: Math.random() * 10000 - 5000,
            y: Math.random() * 10000 - 5000,
            z: 30
        };
    },
    
    // Katastrophen-Warnung senden
    sendDisasterWarning(disaster) {
        const players = mp.players.toArray();
        const warningMessage = `WARNUNG: ${disaster.config.name} in der Nähe! Schwere: ${disaster.severity}`;
        
        players.forEach(player => {
            const distance = this.getDistance(player.position, disaster.location);
            if (distance < disaster.radius) {
                player.outputChatBox(warningMessage);
                player.call('ui:show', 'DisasterWarning', { disaster: disaster });
            }
        });
    },
    
    // Rettungsdienste alarmieren
    alertEmergencyServices(disaster) {
        const requiredServices = disaster.config.response;
        
        requiredServices.forEach(serviceType => {
            const service = this.activeEmergencyServices.get(serviceType);
            if (service && service.available) {
                this.deployService(service, disaster);
            }
        });
    },
    
    // Rettungsdienst einsetzen
    deployService(service, disaster) {
        const missionId = `mission_${service.id}_${Date.now()}`;
        const mission = {
            id: missionId,
            serviceId: service.id,
            disasterId: disaster.id,
            startTime: Date.now(),
            status: 'active',
            location: disaster.location,
            priority: this.getPriority(disaster.severity),
            created: Date.now()
        };
        
        service.currentMissions.push(missionId);
        disaster.response.push(missionId);
        
        console.log(`[DISASTER] ${service.name} zu ${disaster.config.name} entsandt`);
    },
    
    // Priorität ermitteln
    getPriority(severity) {
        switch (severity) {
            case 'low': return 1;
            case 'medium': return 2;
            case 'high': return 3;
            case 'extreme': return 4;
            default: return 2;
        }
    },
    
    // Evakuierung starten
    startEvacuation(disaster) {
        const evacuationId = `evacuation_${disaster.id}`;
        const evacuation = {
            id: evacuationId,
            disasterId: disaster.id,
            startTime: Date.now(),
            status: 'active',
            evacuated: 0,
            total: 0,
            shelters: [],
            created: Date.now()
        };
        
        this.evacuations.set(evacuationId, evacuation);
        
        // Spieler in der Nähe evakuieren
        this.evacuatePlayers(disaster);
        
        console.log(`[DISASTER] Evakuierung für ${disaster.config.name} gestartet`);
    },
    
    // Spieler evakuieren
    evacuatePlayers(disaster) {
        const players = mp.players.toArray();
        
        players.forEach(player => {
            const distance = this.getDistance(player.position, disaster.location);
            if (distance < disaster.radius) {
                this.evacuatePlayer(player, disaster);
            }
        });
    },
    
    // Einzelnen Spieler evakuieren
    evacuatePlayer(player, disaster) {
        const evacuation = Array.from(this.evacuations.values()).find(evac => 
            evac.disasterId === disaster.id
        );
        
        if (evacuation) {
            evacuation.evacuated++;
            disaster.evacuated++;
            
            // Spieler zu sicherem Ort teleportieren
            const safeLocation = this.getSafeLocation(disaster);
            player.position = safeLocation;
            
            player.outputChatBox(`Du wurdest evakuiert! Grund: ${disaster.config.name}`);
            player.call('ui:show', 'Evacuation', { disaster: disaster });
        }
    },
    
    // Sicheren Ort finden
    getSafeLocation(disaster) {
        // Vereinfachte Implementierung - außerhalb des Radius
        return {
            x: disaster.location.x + disaster.radius + 1000,
            y: disaster.location.y + disaster.radius + 1000,
            z: 30
        };
    },
    
    // Katastrophe beenden
    endDisaster(disasterId) {
        const disaster = this.activeDisasters.get(disasterId);
        if (!disaster) return;
        
        disaster.status = 'ended';
        disaster.endTime = Date.now();
        
        // Schäden berechnen
        disaster.damage = this.calculateDamage(disaster);
        disaster.casualties = this.calculateCasualties(disaster);
        
        // Rettungsdienste zurückrufen
        this.recallEmergencyServices(disaster);
        
        // Evakuierung beenden
        this.endEvacuation(disaster);
        
        // Nachricht an Spieler
        this.sendDisasterEndMessage(disaster);
        
        console.log(`[DISASTER] Katastrophe ${disaster.config.name} beendet`);
    },
    
    // Schäden berechnen
    calculateDamage(disaster) {
        const baseDamage = disaster.config.damage;
        const severityMultiplier = this.getSeverityMultiplier(disaster.severity);
        return baseDamage * severityMultiplier;
    },
    
    // Opfer berechnen
    calculateCasualties(disaster) {
        const baseCasualties = disaster.config.casualties;
        const severityMultiplier = this.getSeverityMultiplier(disaster.severity);
        return Math.floor(baseCasualties * severityMultiplier * 100); // 100 Spieler als Basis
    },
    
    // Schweregrad-Multiplikator
    getSeverityMultiplier(severity) {
        switch (severity) {
            case 'low': return 0.5;
            case 'medium': return 1.0;
            case 'high': return 1.5;
            case 'extreme': return 2.0;
            default: return 1.0;
        }
    },
    
    // Rettungsdienste zurückrufen
    recallEmergencyServices(disaster) {
        disaster.response.forEach(missionId => {
            // Mission als abgeschlossen markieren
            console.log(`[DISASTER] Mission ${missionId} abgeschlossen`);
        });
    },
    
    // Evakuierung beenden
    endEvacuation(disaster) {
        const evacuation = Array.from(this.evacuations.values()).find(evac => 
            evac.disasterId === disaster.id
        );
        
        if (evacuation) {
            evacuation.status = 'completed';
            evacuation.endTime = Date.now();
        }
    },
    
    // Katastrophen-Ende-Nachricht senden
    sendDisasterEndMessage(disaster) {
        const players = mp.players.toArray();
        const endMessage = `Katastrophe ${disaster.config.name} beendet. Schäden: ${disaster.damage.toFixed(2)}, Opfer: ${disaster.casualties}`;
        
        players.forEach(player => {
            player.outputChatBox(endMessage);
            player.call('ui:show', 'DisasterEnd', { disaster: disaster });
        });
    },
    
    // Entfernung berechnen
    getDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Katastrophen-System-Statistiken
    getStatistics() {
        return {
            totalDisasters: this.activeDisasters.size,
            totalServices: this.activeEmergencyServices.size,
            totalEvacuations: this.evacuations.size,
            activeDisasters: Array.from(this.activeDisasters.values()).filter(d => d.status === 'active').length
        };
    }
};

// Events
mp.events.add('disaster:trigger', (player, disasterType) => {
    disasterSystem.triggerDisaster(disasterType);
});

mp.events.add('disaster:evacuate', (player, disasterId) => {
    const disaster = disasterSystem.activeDisasters.get(disasterId);
    if (disaster) {
        disasterSystem.evacuatePlayer(player, disaster);
    }
});

// Commands
mp.events.addCommand('disaster', (player, fullText, action, disasterType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /disaster [trigger|info|stats] [Typ]');
        player.outputChatBox('Verfügbare Typen: earthquake, flood, fire, tornado, hurricane, tsunami, volcano');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'trigger':
            if (disasterType) {
                disasterSystem.triggerDisaster(disasterType);
            } else {
                player.outputChatBox('Katastrophen-Typ erforderlich!');
            }
            break;
            
        case 'info':
            if (disasterType) {
                const config = disasterSystem.disasterConfig[disasterType];
                if (config) {
                    player.outputChatBox(`=== ${config.name} ===`);
                    player.outputChatBox(`Schwere: ${config.severity}`);
                    player.outputChatBox(`Dauer: ${config.duration} Sekunden`);
                    player.outputChatBox(`Radius: ${config.radius} Meter`);
                    player.outputChatBox(`Beschreibung: ${config.description}`);
                } else {
                    player.outputChatBox('Katastrophen-Typ nicht gefunden!');
                }
            } else {
                player.outputChatBox('Katastrophen-Typ erforderlich!');
            }
            break;
            
        case 'stats':
            const stats = disasterSystem.getStatistics();
            player.outputChatBox('=== Katastrophen-System-Statistiken ===');
            player.outputChatBox(`Gesamt Katastrophen: ${stats.totalDisasters}`);
            player.outputChatBox(`Gesamt Rettungsdienste: ${stats.totalServices}`);
            player.outputChatBox(`Gesamt Evakuierungen: ${stats.totalEvacuations}`);
            player.outputChatBox(`Aktive Katastrophen: ${stats.activeDisasters}`);
            break;
    }
});

// Katastrophen-System initialisieren
disasterSystem.init();

module.exports = disasterSystem;
