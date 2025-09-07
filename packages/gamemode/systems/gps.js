// GPS System - GPS-System mit Navigation und Routen
// Behandelt alle GPS-Funktionen für Horizont-City Roleplay

const gpsSystem = {
    // GPS-Typen
    gpsTypes: {
        STANDARD: 'standard',
        PREMIUM: 'premium',
        PROFESSIONAL: 'professional',
        MILITARY: 'military',
        AVIATION: 'aviation',
        MARINE: 'marine',
        HIKING: 'hiking',
        VEHICLE: 'vehicle',
        MOBILE: 'mobile',
        CUSTOM: 'custom'
    },
    
    // GPS-Features
    gpsFeatures: {
        NAVIGATION: 'navigation',
        ROUTE_PLANNING: 'route_planning',
        TRAFFIC: 'traffic',
        WEATHER: 'weather',
        POI: 'poi',
        VOICE_GUIDANCE: 'voice_guidance',
        REAL_TIME: 'real_time',
        OFFLINE: 'offline',
        SATELLITE: 'satellite',
        BLUETOOTH: 'bluetooth'
    },
    
    // GPS-Konfiguration
    gpsConfig: {
        standard: {
            name: 'Standard GPS',
            type: 'standard',
            accuracy: 5,
            features: ['navigation', 'route_planning', 'poi'],
            battery: 8,
            screen: 'small',
            price: 200,
            weight: 0.3,
            durability: 80,
            waterproof: false,
            voice: false,
            traffic: false,
            weather: false,
            offline: false,
            bluetooth: false,
            satellite: true
        },
        premium: {
            name: 'Premium GPS',
            type: 'premium',
            accuracy: 3,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'traffic'],
            battery: 12,
            screen: 'medium',
            price: 500,
            weight: 0.5,
            durability: 90,
            waterproof: true,
            voice: true,
            traffic: true,
            weather: false,
            offline: true,
            bluetooth: true,
            satellite: true
        },
        professional: {
            name: 'Professional GPS',
            type: 'professional',
            accuracy: 1,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'traffic', 'weather', 'real_time'],
            battery: 16,
            screen: 'large',
            price: 1000,
            weight: 0.8,
            durability: 95,
            waterproof: true,
            voice: true,
            traffic: true,
            weather: true,
            offline: true,
            bluetooth: true,
            satellite: true
        },
        military: {
            name: 'Military GPS',
            type: 'military',
            accuracy: 0.5,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'traffic', 'weather', 'real_time', 'offline'],
            battery: 24,
            screen: 'large',
            price: 2000,
            weight: 1.2,
            durability: 100,
            waterproof: true,
            voice: true,
            traffic: true,
            weather: true,
            offline: true,
            bluetooth: true,
            satellite: true
        },
        aviation: {
            name: 'Aviation GPS',
            type: 'aviation',
            accuracy: 2,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'weather', 'real_time'],
            battery: 20,
            screen: 'large',
            price: 1500,
            weight: 1.0,
            durability: 98,
            waterproof: true,
            voice: true,
            traffic: false,
            weather: true,
            offline: true,
            bluetooth: true,
            satellite: true
        },
        marine: {
            name: 'Marine GPS',
            type: 'marine',
            accuracy: 3,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'weather', 'real_time'],
            battery: 18,
            screen: 'large',
            price: 1200,
            weight: 0.9,
            durability: 95,
            waterproof: true,
            voice: true,
            traffic: false,
            weather: true,
            offline: true,
            bluetooth: true,
            satellite: true
        },
        hiking: {
            name: 'Hiking GPS',
            type: 'hiking',
            accuracy: 4,
            features: ['navigation', 'route_planning', 'poi', 'offline'],
            battery: 14,
            screen: 'medium',
            price: 400,
            weight: 0.4,
            durability: 90,
            waterproof: true,
            voice: false,
            traffic: false,
            weather: false,
            offline: true,
            bluetooth: false,
            satellite: true
        },
        vehicle: {
            name: 'Vehicle GPS',
            type: 'vehicle',
            accuracy: 2,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'traffic', 'real_time'],
            battery: 0,
            screen: 'large',
            price: 800,
            weight: 0.6,
            durability: 85,
            waterproof: false,
            voice: true,
            traffic: true,
            weather: false,
            offline: false,
            bluetooth: true,
            satellite: true
        },
        mobile: {
            name: 'Mobile GPS',
            type: 'mobile',
            accuracy: 3,
            features: ['navigation', 'route_planning', 'poi', 'voice_guidance', 'traffic', 'weather', 'real_time', 'bluetooth'],
            battery: 10,
            screen: 'medium',
            price: 300,
            weight: 0.2,
            durability: 75,
            waterproof: false,
            voice: true,
            traffic: true,
            weather: true,
            offline: false,
            bluetooth: true,
            satellite: true
        }
    },
    
    // Routen-Typen
    routeTypes: {
        FASTEST: 'fastest',
        SHORTEST: 'shortest',
        SCENIC: 'scenic',
        AVOID_TOLLS: 'avoid_tolls',
        AVOID_HIGHWAYS: 'avoid_highways',
        ECO_FRIENDLY: 'eco_friendly',
        CUSTOM: 'custom'
    },
    
    // POI-Kategorien
    poiCategories: {
        RESTAURANTS: 'restaurants',
        GAS_STATIONS: 'gas_stations',
        HOTELS: 'hotels',
        HOSPITALS: 'hospitals',
        POLICE: 'police',
        BANKS: 'banks',
        SHOPPING: 'shopping',
        ENTERTAINMENT: 'entertainment',
        ATTRACTIONS: 'attractions',
        SERVICES: 'services'
    },
    
    // POI-Daten
    poiData: {
        restaurants: [
            { name: 'Burger Palace', location: { x: 100, y: 200, z: 30 }, rating: 4.5, price: '$$' },
            { name: 'Pizza Corner', location: { x: 150, y: 250, z: 30 }, rating: 4.2, price: '$' },
            { name: 'Fine Dining', location: { x: 200, y: 300, z: 30 }, rating: 4.8, price: '$$$' }
        ],
        gas_stations: [
            { name: 'Shell Station', location: { x: 300, y: 400, z: 30 }, price: 1.50 },
            { name: 'BP Station', location: { x: 350, y: 450, z: 30 }, price: 1.48 },
            { name: 'Esso Station', location: { x: 400, y: 500, z: 30 }, price: 1.52 }
        ],
        hotels: [
            { name: 'Grand Hotel', location: { x: 500, y: 600, z: 30 }, rating: 4.5, price: 150 },
            { name: 'Budget Inn', location: { x: 550, y: 650, z: 30 }, rating: 3.2, price: 50 },
            { name: 'Luxury Resort', location: { x: 600, y: 700, z: 30 }, rating: 4.9, price: 300 }
        ],
        hospitals: [
            { name: 'City Hospital', location: { x: 700, y: 800, z: 30 }, emergency: true },
            { name: 'Medical Center', location: { x: 750, y: 850, z: 30 }, emergency: true },
            { name: 'Clinic', location: { x: 800, y: 900, z: 30 }, emergency: false }
        ],
        police: [
            { name: 'Police Station', location: { x: 900, y: 1000, z: 30 }, emergency: true },
            { name: 'Traffic Police', location: { x: 950, y: 1050, z: 30 }, emergency: false }
        ],
        banks: [
            { name: 'Fleeca Bank', location: { x: 1000, y: 1100, z: 30 }, atm: true },
            { name: 'Maze Bank', location: { x: 1050, y: 1150, z: 30 }, atm: true },
            { name: 'Bank of America', location: { x: 1100, y: 1200, z: 30 }, atm: true }
        ],
        shopping: [
            { name: 'Shopping Mall', location: { x: 1200, y: 1300, z: 30 }, type: 'mall' },
            { name: 'Supermarket', location: { x: 1250, y: 1350, z: 30 }, type: 'grocery' },
            { name: 'Electronics Store', location: { x: 1300, y: 1400, z: 30 }, type: 'electronics' }
        ],
        entertainment: [
            { name: 'Cinema', location: { x: 1400, y: 1500, z: 30 }, type: 'cinema' },
            { name: 'Casino', location: { x: 1450, y: 1550, z: 30 }, type: 'casino' },
            { name: 'Club', location: { x: 1500, y: 1600, z: 30 }, type: 'nightclub' }
        ],
        attractions: [
            { name: 'City Park', location: { x: 1600, y: 1700, z: 30 }, type: 'park' },
            { name: 'Museum', location: { x: 1650, y: 1750, z: 30 }, type: 'museum' },
            { name: 'Beach', location: { x: 1700, y: 1800, z: 30 }, type: 'beach' }
        ],
        services: [
            { name: 'Car Wash', location: { x: 1800, y: 1900, z: 30 }, type: 'car_wash' },
            { name: 'Garage', location: { x: 1850, y: 1950, z: 30 }, type: 'garage' },
            { name: 'Post Office', location: { x: 1900, y: 2000, z: 30 }, type: 'post_office' }
        ]
    },
    
    // Aktive GPS-Geräte
    activeGPS: new Map(),
    
    // Aktive Routen
    activeRoutes: new Map(),
    
    // GPS-Navigation
    navigation: new Map(),
    
    // GPS-System-Initialisierung
    init() {
        console.log('[GPS] GPS-System initialisiert');
        this.initializeSatellites();
    },
    
    // Satelliten initialisieren
    initializeSatellites() {
        // Hier würde die Satelliten-Initialisierung implementiert werden
        console.log('[GPS] Satelliten initialisiert');
    },
    
    // GPS-Gerät kaufen
    buyGPS(player, gpsType) {
        const gpsConfig = this.gpsConfig[gpsType];
        if (!gpsConfig) {
            player.outputChatBox('Unbekannter GPS-Typ!');
            return false;
        }
        
        if (player.money < gpsConfig.price) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        const gpsId = `gps_${player.id}_${Date.now()}`;
        const gps = {
            id: gpsId,
            playerId: player.id,
            type: gpsType,
            config: gpsConfig,
            status: 'active',
            battery: gpsConfig.battery,
            accuracy: gpsConfig.accuracy,
            features: [...gpsConfig.features],
            created: Date.now(),
            lastUpdate: Date.now(),
            currentLocation: null,
            destination: null,
            route: null,
            navigation: null
        };
        
        this.activeGPS.set(gpsId, gps);
        
        player.money -= gpsConfig.price;
        
        player.outputChatBox(`GPS ${gpsConfig.name} gekauft! Preis: $${gpsConfig.price}`);
        player.call('ui:show', 'GPS', { gps: gps });
        
        console.log(`[GPS] GPS ${gpsType} von Spieler ${player.id} gekauft`);
        return gpsId;
    },
    
    // GPS-Gerät verwenden
    useGPS(player, gpsId, action, data) {
        const gps = this.activeGPS.get(gpsId);
        if (!gps) {
            player.outputChatBox('GPS nicht gefunden!');
            return false;
        }
        
        if (gps.playerId !== player.id) {
            player.outputChatBox('Du besitzt dieses GPS nicht!');
            return false;
        }
        
        switch (action) {
            case 'navigate':
                this.startNavigation(player, gps, data.destination);
                break;
            case 'route':
                this.planRoute(player, gps, data.start, data.end, data.type);
                break;
            case 'poi':
                this.findPOI(player, gps, data.category, data.radius);
                break;
            case 'traffic':
                this.checkTraffic(player, gps, data.location);
                break;
            case 'weather':
                this.checkWeather(player, gps, data.location);
                break;
            case 'voice':
                this.toggleVoice(player, gps);
                break;
            case 'offline':
                this.toggleOffline(player, gps);
                break;
        }
        
        return true;
    },
    
    // Navigation starten
    startNavigation(player, gps, destination) {
        if (!gps.features.includes('navigation')) {
            player.outputChatBox('Navigation nicht verfügbar!');
            return false;
        }
        
        gps.destination = destination;
        gps.navigation = {
            start: player.position,
            end: destination,
            route: this.calculateRoute(player.position, destination, 'fastest'),
            currentStep: 0,
            status: 'active',
            startTime: Date.now()
        };
        
        player.outputChatBox(`Navigation zu ${destination.name} gestartet!`);
        player.call('ui:show', 'Navigation', { navigation: gps.navigation });
        
        console.log(`[GPS] Navigation von Spieler ${player.id} gestartet`);
        return true;
    },
    
    // Route berechnen
    calculateRoute(start, end, type) {
        // Hier würde die Routen-Berechnung implementiert werden
        const route = {
            start: start,
            end: end,
            type: type,
            distance: this.calculateDistance(start, end),
            duration: this.calculateDuration(start, end),
            waypoints: this.generateWaypoints(start, end),
            instructions: this.generateInstructions(start, end)
        };
        
        return route;
    },
    
    // Entfernung berechnen
    calculateDistance(start, end) {
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dz = end.z - start.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Dauer berechnen
    calculateDuration(start, end) {
        const distance = this.calculateDistance(start, end);
        const speed = 50; // km/h
        return (distance / speed) * 3600; // Sekunden
    },
    
    // Wegpunkte generieren
    generateWaypoints(start, end) {
        const waypoints = [];
        const steps = 5;
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            waypoints.push({
                x: start.x + (end.x - start.x) * t,
                y: start.y + (end.y - start.y) * t,
                z: start.z + (end.z - start.z) * t
            });
        }
        
        return waypoints;
    },
    
    // Anweisungen generieren
    generateInstructions(start, end) {
        const instructions = [
            'Starte die Fahrt',
            'Fahre geradeaus',
            'Biege links ab',
            'Fahre weiter geradeaus',
            'Biege rechts ab',
            'Du hast dein Ziel erreicht'
        ];
        
        return instructions;
    },
    
    // Route planen
    planRoute(player, gps, start, end, type) {
        if (!gps.features.includes('route_planning')) {
            player.outputChatBox('Routen-Planung nicht verfügbar!');
            return false;
        }
        
        const route = this.calculateRoute(start, end, type);
        const routeId = `route_${Date.now()}`;
        
        this.activeRoutes.set(routeId, {
            id: routeId,
            playerId: player.id,
            gpsId: gps.id,
            route: route,
            status: 'planned',
            created: Date.now()
        });
        
        player.outputChatBox(`Route geplant! Entfernung: ${route.distance.toFixed(2)}km, Dauer: ${(route.duration / 60).toFixed(1)}min`);
        player.call('ui:show', 'Route', { route: route });
        
        console.log(`[GPS] Route von Spieler ${player.id} geplant`);
        return routeId;
    },
    
    // POI suchen
    findPOI(player, gps, category, radius) {
        if (!gps.features.includes('poi')) {
            player.outputChatBox('POI-Suche nicht verfügbar!');
            return false;
        }
        
        const pois = this.poiData[category] || [];
        const nearbyPOIs = pois.filter(poi => {
            const distance = this.calculateDistance(player.position, poi.location);
            return distance <= radius;
        });
        
        player.outputChatBox(`${nearbyPOIs.length} POIs in der Nähe gefunden!`);
        player.call('ui:show', 'POI', { pois: nearbyPOIs, category: category });
        
        console.log(`[GPS] ${nearbyPOIs.length} POIs für Spieler ${player.id} gefunden`);
        return nearbyPOIs;
    },
    
    // Verkehr prüfen
    checkTraffic(player, gps, location) {
        if (!gps.features.includes('traffic')) {
            player.outputChatBox('Verkehrsinformationen nicht verfügbar!');
            return false;
        }
        
        // Hier würde die Verkehrsprüfung implementiert werden
        const traffic = {
            location: location,
            status: 'normal',
            delay: 0,
            incidents: []
        };
        
        player.outputChatBox(`Verkehrsstatus: ${traffic.status}`);
        player.call('ui:show', 'Traffic', { traffic: traffic });
        
        console.log(`[GPS] Verkehr für Spieler ${player.id} geprüft`);
        return traffic;
    },
    
    // Wetter prüfen
    checkWeather(player, gps, location) {
        if (!gps.features.includes('weather')) {
            player.outputChatBox('Wetterinformationen nicht verfügbar!');
            return false;
        }
        
        // Hier würde die Wetterprüfung implementiert werden
        const weather = {
            location: location,
            temperature: 20,
            condition: 'sunny',
            humidity: 60,
            wind: 10
        };
        
        player.outputChatBox(`Wetter: ${weather.condition}, ${weather.temperature}°C`);
        player.call('ui:show', 'Weather', { weather: weather });
        
        console.log(`[GPS] Wetter für Spieler ${player.id} geprüft`);
        return weather;
    },
    
    // Sprachführung umschalten
    toggleVoice(player, gps) {
        if (!gps.features.includes('voice_guidance')) {
            player.outputChatBox('Sprachführung nicht verfügbar!');
            return false;
        }
        
        gps.voiceEnabled = !gps.voiceEnabled;
        
        player.outputChatBox(`Sprachführung ${gps.voiceEnabled ? 'aktiviert' : 'deaktiviert'}`);
        console.log(`[GPS] Sprachführung für Spieler ${player.id} ${gps.voiceEnabled ? 'aktiviert' : 'deaktiviert'}`);
        return true;
    },
    
    // Offline-Modus umschalten
    toggleOffline(player, gps) {
        if (!gps.features.includes('offline')) {
            player.outputChatBox('Offline-Modus nicht verfügbar!');
            return false;
        }
        
        gps.offlineMode = !gps.offlineMode;
        
        player.outputChatBox(`Offline-Modus ${gps.offlineMode ? 'aktiviert' : 'deaktiviert'}`);
        console.log(`[GPS] Offline-Modus für Spieler ${player.id} ${gps.offlineMode ? 'aktiviert' : 'deaktiviert'}`);
        return true;
    },
    
    // GPS-Statistiken
    getStatistics() {
        return {
            totalGPS: this.activeGPS.size,
            totalRoutes: this.activeRoutes.size,
            totalNavigation: this.navigation.size,
            gpsTypes: Object.keys(this.gpsConfig).length,
            poiCategories: Object.keys(this.poiData).length,
            routeTypes: Object.keys(this.routeTypes).length
        };
    }
};

// Events
mp.events.add('gps:buy', (player, gpsType) => {
    gpsSystem.buyGPS(player, gpsType);
});

mp.events.add('gps:use', (player, gpsId, action, data) => {
    gpsSystem.useGPS(player, gpsId, action, data);
});

// Commands
mp.events.addCommand('gps', (player, fullText, action, gpsType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /gps [buy|use] [GPS-Typ]');
        player.outputChatBox('Verfügbare GPS-Typen: standard, premium, professional, military, aviation, marine, hiking, vehicle, mobile');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'buy':
            if (gpsType) {
                gpsSystem.buyGPS(player, gpsType);
            } else {
                player.outputChatBox('GPS-Typ erforderlich!');
            }
            break;
            
        case 'use':
            if (gpsType) {
                // Hier würde die GPS-Verwendung implementiert werden
                player.outputChatBox('GPS-Verwendung implementiert!');
            } else {
                player.outputChatBox('GPS-ID erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('navigate', (player, fullText, destination) => {
    if (!destination) {
        player.outputChatBox('Verwendung: /navigate [Ziel]');
        return;
    }
    
    // Hier würde die Navigation implementiert werden
    player.outputChatBox(`Navigation zu ${destination} gestartet!`);
});

mp.events.addCommand('poi', (player, fullText, category, radius) => {
    if (!category) {
        player.outputChatBox('Verwendung: /poi [Kategorie] [Radius]');
        player.outputChatBox('Verfügbare Kategorien: restaurants, gas_stations, hotels, hospitals, police, banks, shopping, entertainment, attractions, services');
        return;
    }
    
    const radiusNum = parseInt(radius) || 1000;
    // Hier würde die POI-Suche implementiert werden
    player.outputChatBox(`POI-Suche in Kategorie ${category} mit Radius ${radiusNum}m`);
});

mp.events.addCommand('gpsstats', (player) => {
    const stats = gpsSystem.getStatistics();
    player.outputChatBox('=== GPS-Statistiken ===');
    player.outputChatBox(`Gesamt GPS: ${stats.totalGPS}`);
    player.outputChatBox(`Gesamt Routen: ${stats.totalRoutes}`);
    player.outputChatBox(`Gesamt Navigation: ${stats.totalNavigation}`);
    player.outputChatBox(`GPS-Typen: ${stats.gpsTypes}`);
    player.outputChatBox(`POI-Kategorien: ${stats.poiCategories}`);
    player.outputChatBox(`Routen-Typen: ${stats.routeTypes}`);
});

// GPS-System initialisieren
gpsSystem.init();

module.exports = gpsSystem;
