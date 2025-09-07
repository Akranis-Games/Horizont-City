// Parking System - Parkplatz-System
// Behandelt alle Parkplatz-Funktionen für Horizont-City Roleplay

const parkingSystem = {
    // Parkplatz-Typen
    parkingTypes: {
        STREET: 'street',
        GARAGE: 'garage',
        MALL: 'mall',
        AIRPORT: 'airport',
        HOSPITAL: 'hospital',
        GOVERNMENT: 'government',
        PRIVATE: 'private',
        DISABLED: 'disabled',
        ELECTRIC: 'electric',
        MOTORCYCLE: 'motorcycle'
    },
    
    // Parkplatz-Konfiguration
    parkingConfig: {
        street: {
            name: 'Straßenparkplatz',
            pricePerHour: 2,
            maxDuration: 7200000, // 2 Stunden
            allowedVehicles: ['car', 'motorcycle'],
            disabled: false,
            electric: false
        },
        garage: {
            name: 'Parkhaus',
            pricePerHour: 5,
            maxDuration: 86400000, // 24 Stunden
            allowedVehicles: ['car', 'motorcycle', 'truck'],
            disabled: true,
            electric: true
        },
        mall: {
            name: 'Einkaufszentrum',
            pricePerHour: 3,
            maxDuration: 14400000, // 4 Stunden
            allowedVehicles: ['car', 'motorcycle'],
            disabled: true,
            electric: true
        },
        airport: {
            name: 'Flughafen',
            pricePerHour: 8,
            maxDuration: 604800000, // 7 Tage
            allowedVehicles: ['car', 'motorcycle', 'truck', 'bus'],
            disabled: true,
            electric: true
        },
        hospital: {
            name: 'Krankenhaus',
            pricePerHour: 1,
            maxDuration: 86400000, // 24 Stunden
            allowedVehicles: ['car', 'motorcycle', 'ambulance'],
            disabled: true,
            electric: true
        },
        government: {
            name: 'Behörde',
            pricePerHour: 0,
            maxDuration: 28800000, // 8 Stunden
            allowedVehicles: ['car', 'motorcycle'],
            disabled: true,
            electric: false
        },
        private: {
            name: 'Privatparkplatz',
            pricePerHour: 0,
            maxDuration: 86400000, // 24 Stunden
            allowedVehicles: ['car', 'motorcycle'],
            disabled: true,
            electric: false
        },
        disabled: {
            name: 'Behindertenparkplatz',
            pricePerHour: 0,
            maxDuration: 86400000, // 24 Stunden
            allowedVehicles: ['car', 'motorcycle'],
            disabled: true,
            electric: true
        },
        electric: {
            name: 'E-Parkplatz',
            pricePerHour: 4,
            maxDuration: 28800000, // 8 Stunden
            allowedVehicles: ['car'],
            disabled: true,
            electric: true
        },
        motorcycle: {
            name: 'Motorrad-Parkplatz',
            pricePerHour: 1,
            maxDuration: 14400000, // 4 Stunden
            allowedVehicles: ['motorcycle'],
            disabled: false,
            electric: false
        }
    },
    
    // Parkplätze
    parkingSpots: new Map(),
    
    // Aktive Parkvorgänge
    activeParkings: new Map(),
    
    // Parkplatz-Initialisierung
    init() {
        console.log('[PARKING] Parkplatz-System initialisiert');
        this.createDefaultParkingSpots();
    },
    
    // Standard-Parkplätze erstellen
    createDefaultParkingSpots() {
        const spots = [
            // Straßenparkplätze
            { id: 'spot_1', type: 'street', position: { x: 100, y: 200, z: 30 }, rotation: 0, occupied: false },
            { id: 'spot_2', type: 'street', position: { x: 110, y: 200, z: 30 }, rotation: 0, occupied: false },
            { id: 'spot_3', type: 'street', position: { x: 120, y: 200, z: 30 }, rotation: 0, occupied: false },
            
            // Parkhaus
            { id: 'spot_4', type: 'garage', position: { x: 200, y: 300, z: 30 }, rotation: 90, occupied: false },
            { id: 'spot_5', type: 'garage', position: { x: 200, y: 310, z: 30 }, rotation: 90, occupied: false },
            { id: 'spot_6', type: 'garage', position: { x: 200, y: 320, z: 30 }, rotation: 90, occupied: false },
            
            // Einkaufszentrum
            { id: 'spot_7', type: 'mall', position: { x: 300, y: 400, z: 30 }, rotation: 180, occupied: false },
            { id: 'spot_8', type: 'mall', position: { x: 310, y: 400, z: 30 }, rotation: 180, occupied: false },
            
            // Flughafen
            { id: 'spot_9', type: 'airport', position: { x: -1000, y: -2000, z: 20 }, rotation: 270, occupied: false },
            { id: 'spot_10', type: 'airport', position: { x: -1010, y: -2000, z: 20 }, rotation: 270, occupied: false },
            
            // Krankenhaus
            { id: 'spot_11', type: 'hospital', position: { x: 1800, y: 3600, z: 35 }, rotation: 45, occupied: false },
            { id: 'spot_12', type: 'hospital', position: { x: 1810, y: 3600, z: 35 }, rotation: 45, occupied: false },
            
            // Behindertenparkplätze
            { id: 'spot_13', type: 'disabled', position: { x: 400, y: 500, z: 30 }, rotation: 0, occupied: false },
            { id: 'spot_14', type: 'disabled', position: { x: 410, y: 500, z: 30 }, rotation: 0, occupied: false },
            
            // E-Parkplätze
            { id: 'spot_15', type: 'electric', position: { x: 500, y: 600, z: 30 }, rotation: 90, occupied: false },
            { id: 'spot_16', type: 'electric', position: { x: 500, y: 610, z: 30 }, rotation: 90, occupied: false },
            
            // Motorrad-Parkplätze
            { id: 'spot_17', type: 'motorcycle', position: { x: 600, y: 700, z: 30 }, rotation: 0, occupied: false },
            { id: 'spot_18', type: 'motorcycle', position: { x: 610, y: 700, z: 30 }, rotation: 0, occupied: false }
        ];
        
        spots.forEach(spot => {
            this.createParkingSpot(spot);
        });
        
        console.log(`[PARKING] ${spots.length} Parkplätze erstellt`);
    },
    
    // Parkplatz erstellen
    createParkingSpot(spotData) {
        const config = this.parkingConfig[spotData.type];
        const spot = {
            id: spotData.id,
            type: spotData.type,
            position: spotData.position,
            rotation: spotData.rotation,
            config: config,
            occupied: spotData.occupied,
            vehicleId: null,
            playerId: null,
            startTime: null,
            endTime: null,
            cost: 0
        };
        
        this.parkingSpots.set(spotData.id, spot);
        
        // Marker erstellen
        const color = spotData.occupied ? [255, 0, 0, 100] : [0, 255, 0, 100];
        mp.markers.new(1, new mp.Vector3(spotData.position.x, spotData.position.y, spotData.position.z), 3.0, {
            color: color,
            visible: true
        });
        
        console.log(`[PARKING] Parkplatz ${spotData.id} (${config.name}) erstellt`);
    },
    
    // Fahrzeug parken
    parkVehicle(player, vehicle, spotId) {
        const spot = this.parkingSpots.get(spotId);
        if (!spot) {
            player.outputChatBox('Parkplatz nicht gefunden!');
            return false;
        }
        
        if (spot.occupied) {
            player.outputChatBox('Parkplatz ist bereits belegt!');
            return false;
        }
        
        // Fahrzeug-Typ prüfen
        if (!this.checkVehicleType(vehicle, spot.config.allowedVehicles)) {
            player.outputChatBox('Fahrzeug-Typ nicht erlaubt!');
            return false;
        }
        
        // Behindertenparkplatz prüfen
        if (spot.type === 'disabled' && !this.checkDisabledAccess(player)) {
            player.outputChatBox('Keine Berechtigung für Behindertenparkplatz!');
            return false;
        }
        
        // E-Parkplatz prüfen
        if (spot.type === 'electric' && !this.checkElectricVehicle(vehicle)) {
            player.outputChatBox('Nur Elektrofahrzeuge erlaubt!');
            return false;
        }
        
        // Parkplatz belegen
        spot.occupied = true;
        spot.vehicleId = vehicle.id;
        spot.playerId = player.id;
        spot.startTime = Date.now();
        spot.cost = 0;
        
        // Fahrzeug positionieren
        vehicle.position = new mp.Vector3(spot.position.x, spot.position.y, spot.position.z);
        vehicle.rotation = new mp.Vector3(0, 0, spot.rotation);
        
        // Parkvorgang erstellen
        const parkingId = Date.now();
        const parking = {
            id: parkingId,
            spotId: spotId,
            playerId: player.id,
            vehicleId: vehicle.id,
            startTime: Date.now(),
            endTime: null,
            cost: 0,
            status: 'active'
        };
        
        this.activeParkings.set(parkingId, parking);
        
        // Marker aktualisieren
        this.updateSpotMarker(spot);
        
        player.outputChatBox(`Fahrzeug geparkt! Parkplatz: ${spot.config.name}`);
        console.log(`[PARKING] Fahrzeug ${vehicle.id} von Spieler ${player.id} geparkt`);
        return true;
    },
    
    // Fahrzeug abholen
    unparkVehicle(player, spotId) {
        const spot = this.parkingSpots.get(spotId);
        if (!spot) {
            player.outputChatBox('Parkplatz nicht gefunden!');
            return false;
        }
        
        if (!spot.occupied) {
            player.outputChatBox('Parkplatz ist leer!');
            return false;
        }
        
        if (spot.playerId !== player.id) {
            player.outputChatBox('Das ist nicht dein Fahrzeug!');
            return false;
        }
        
        // Kosten berechnen
        const cost = this.calculateParkingCost(spot);
        
        // Zahlung prüfen
        if (!this.checkPayment(player, cost)) {
            player.outputChatBox(`Nicht genug Geld! Kosten: $${cost}`);
            return false;
        }
        
        // Zahlung abwickeln
        this.processPayment(player, cost);
        
        // Parkplatz freigeben
        spot.occupied = false;
        spot.vehicleId = null;
        spot.playerId = null;
        spot.startTime = null;
        spot.endTime = Date.now();
        spot.cost = cost;
        
        // Parkvorgang beenden
        const parking = Array.from(this.activeParkings.values()).find(p => p.spotId === spotId);
        if (parking) {
            parking.endTime = Date.now();
            parking.cost = cost;
            parking.status = 'completed';
            this.activeParkings.delete(parking.id);
        }
        
        // Marker aktualisieren
        this.updateSpotMarker(spot);
        
        player.outputChatBox(`Fahrzeug abgeholt! Kosten: $${cost}`);
        console.log(`[PARKING] Fahrzeug von Spieler ${player.id} abgeholt, Kosten: $${cost}`);
        return true;
    },
    
    // Parkkosten berechnen
    calculateParkingCost(spot) {
        if (spot.config.pricePerHour === 0) {
            return 0;
        }
        
        const duration = Date.now() - spot.startTime;
        const hours = duration / 3600000; // Millisekunden zu Stunden
        const cost = Math.ceil(hours * spot.config.pricePerHour);
        
        return Math.max(0, cost);
    },
    
    // Fahrzeug-Typ prüfen
    checkVehicleType(vehicle, allowedTypes) {
        // Hier würde der Fahrzeug-Typ ermittelt werden
        return true; // Vereinfacht für jetzt
    },
    
    // Behinderten-Zugang prüfen
    checkDisabledAccess(player) {
        // Hier würde geprüft werden, ob der Spieler behindert ist
        return player.getVariable('disabled') || false;
    },
    
    // Elektrofahrzeug prüfen
    checkElectricVehicle(vehicle) {
        // Hier würde geprüft werden, ob es ein Elektrofahrzeug ist
        return vehicle.getVariable('electric') || false;
    },
    
    // Zahlung prüfen
    checkPayment(player, amount) {
        return player.getVariable('money') >= amount;
    },
    
    // Zahlung abwickeln
    processPayment(player, amount) {
        player.setVariable('money', player.getVariable('money') - amount);
    },
    
    // Marker aktualisieren
    updateSpotMarker(spot) {
        const color = spot.occupied ? [255, 0, 0, 100] : [0, 255, 0, 100];
        // Hier würde der Marker aktualisiert werden
    },
    
    // Verfügbare Parkplätze abrufen
    getAvailableSpots(type = null) {
        const spots = Array.from(this.parkingSpots.values());
        return spots.filter(spot => !spot.occupied && (!type || spot.type === type));
    },
    
    // Spieler-Parkvorgänge abrufen
    getPlayerParkings(playerId) {
        return Array.from(this.activeParkings.values()).filter(p => p.playerId === playerId);
    },
    
    // Parkplatz-Statistiken
    getStatistics() {
        const spots = Array.from(this.parkingSpots.values());
        return {
            totalSpots: spots.length,
            occupiedSpots: spots.filter(s => s.occupied).length,
            availableSpots: spots.filter(s => !s.occupied).length,
            activeParkings: this.activeParkings.size,
            parkingTypes: Object.keys(this.parkingConfig).length
        };
    }
};

// Events
mp.events.add('parking:park', (player, vehicle, spotId) => {
    parkingSystem.parkVehicle(player, vehicle, spotId);
});

mp.events.add('parking:unpark', (player, spotId) => {
    parkingSystem.unparkVehicle(player, spotId);
});

mp.events.add('parking:getSpots', (player, type) => {
    const spots = parkingSystem.getAvailableSpots(type);
    player.call('parking:updateSpots', [spots]);
});

// Commands
mp.events.addCommand('park', (player, fullText, spotId) => {
    if (!spotId) {
        const spots = parkingSystem.getAvailableSpots();
        player.outputChatBox('Verwendung: /park [ParkplatzID]');
        player.outputChatBox('Verfügbare Parkplätze:');
        spots.forEach(spot => {
            player.outputChatBox(`- ${spot.id}: ${spot.config.name} ($${spot.config.pricePerHour}/h)`);
        });
        return;
    }
    
    const vehicle = player.vehicle;
    if (!vehicle) {
        player.outputChatBox('Du sitzt in keinem Fahrzeug!');
        return;
    }
    
    parkingSystem.parkVehicle(player, vehicle, spotId);
});

mp.events.addCommand('unpark', (player, fullText, spotId) => {
    if (!spotId) {
        player.outputChatBox('Verwendung: /unpark [ParkplatzID]');
        return;
    }
    
    parkingSystem.unparkVehicle(player, spotId);
});

mp.events.addCommand('parkingspots', (player, fullText, type) => {
    const spots = parkingSystem.getAvailableSpots(type);
    player.outputChatBox('=== Verfügbare Parkplätze ===');
    
    if (spots.length === 0) {
        player.outputChatBox('Keine verfügbaren Parkplätze!');
        return;
    }
    
    spots.forEach(spot => {
        const price = spot.config.pricePerHour === 0 ? 'Kostenlos' : `$${spot.config.pricePerHour}/h`;
        player.outputChatBox(`${spot.id}: ${spot.config.name} - ${price}`);
    });
});

mp.events.addCommand('myparking', (player) => {
    const parkings = parkingSystem.getPlayerParkings(player.id);
    player.outputChatBox('=== Meine Parkvorgänge ===');
    
    if (parkings.length === 0) {
        player.outputChatBox('Keine aktiven Parkvorgänge!');
        return;
    }
    
    parkings.forEach(parking => {
        const spot = parkingSystem.parkingSpots.get(parking.spotId);
        const duration = Math.floor((Date.now() - parking.startTime) / 60000); // Minuten
        player.outputChatBox(`Parkplatz ${parking.spotId}: ${spot.config.name} - ${duration} Min`);
    });
});

// Parkplatz-System initialisieren
parkingSystem.init();

module.exports = parkingSystem;
