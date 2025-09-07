// Garage System - Garage-System
// Behandelt alle Garage-Funktionen für Horizont-City Roleplay

const garageSystem = {
    // Garage-Typen
    garageTypes: {
        PERSONAL: 'personal',
        PUBLIC: 'public',
        PRIVATE: 'private',
        BUSINESS: 'business',
        GOVERNMENT: 'government',
        UNDERGROUND: 'underground',
        MULTI_LEVEL: 'multi_level',
        SECURE: 'secure'
    },
    
    // Garage-Konfiguration
    garageConfig: {
        personal: {
            name: 'Private Garage',
            maxVehicles: 5,
            pricePerMonth: 500,
            features: ['storage', 'repair', 'customization'],
            security: 'basic',
            access: 'owner_only'
        },
        public: {
            name: 'Öffentliche Garage',
            maxVehicles: 50,
            pricePerHour: 3,
            features: ['storage'],
            security: 'basic',
            access: 'public'
        },
        private: {
            name: 'Private Garage',
            maxVehicles: 10,
            pricePerMonth: 1000,
            features: ['storage', 'repair', 'customization', 'security'],
            security: 'high',
            access: 'owner_only'
        },
        business: {
            name: 'Geschäftsgarage',
            maxVehicles: 20,
            pricePerMonth: 2000,
            features: ['storage', 'repair', 'customization', 'security', 'fleet_management'],
            security: 'high',
            access: 'business_members'
        },
        government: {
            name: 'Behörden-Garage',
            maxVehicles: 100,
            pricePerMonth: 0,
            features: ['storage', 'repair', 'customization', 'security', 'fleet_management'],
            security: 'maximum',
            access: 'government_only'
        },
        underground: {
            name: 'Untergrund-Garage',
            maxVehicles: 30,
            pricePerMonth: 1500,
            features: ['storage', 'repair', 'customization', 'security'],
            security: 'high',
            access: 'owner_only'
        },
        multi_level: {
            name: 'Mehretagen-Garage',
            maxVehicles: 100,
            pricePerMonth: 3000,
            features: ['storage', 'repair', 'customization', 'security', 'elevator'],
            security: 'high',
            access: 'owner_only'
        },
        secure: {
            name: 'Sicherheitsgarage',
            maxVehicles: 15,
            pricePerMonth: 5000,
            features: ['storage', 'repair', 'customization', 'security', 'surveillance'],
            security: 'maximum',
            access: 'owner_only'
        }
    },
    
    // Garagen
    garages: new Map(),
    
    // Fahrzeug-Plätze
    vehicleSlots: new Map(),
    
    // Mietverträge
    rentalContracts: new Map(),
    
    // Garage-Initialisierung
    init() {
        console.log('[GARAGE] Garage-System initialisiert');
        this.createDefaultGarages();
    },
    
    // Standard-Garagen erstellen
    createDefaultGarages() {
        const garages = [
            { id: 'garage_1', type: 'public', position: { x: 200, y: 300, z: 30 }, name: 'Hauptgarage', capacity: 50 },
            { id: 'garage_2', type: 'personal', position: { x: 100, y: 200, z: 30 }, name: 'Private Garage 1', capacity: 5 },
            { id: 'garage_3', type: 'personal', position: { x: 150, y: 250, z: 30 }, name: 'Private Garage 2', capacity: 5 },
            { id: 'garage_4', type: 'business', position: { x: 300, y: 400, z: 30 }, name: 'Geschäftsgarage', capacity: 20 },
            { id: 'garage_5', type: 'underground', position: { x: 400, y: 500, z: 30 }, name: 'Untergrund-Garage', capacity: 30 },
            { id: 'garage_6', type: 'multi_level', position: { x: 500, y: 600, z: 30 }, name: 'Mehretagen-Garage', capacity: 100 },
            { id: 'garage_7', type: 'secure', position: { x: 600, y: 700, z: 30 }, name: 'Sicherheitsgarage', capacity: 15 },
            { id: 'garage_8', type: 'government', position: { x: 700, y: 800, z: 30 }, name: 'Behörden-Garage', capacity: 100 }
        ];
        
        garages.forEach(garage => {
            this.createGarage(garage);
        });
        
        console.log(`[GARAGE] ${garages.length} Garagen erstellt`);
    },
    
    // Garage erstellen
    createGarage(garageData) {
        const config = this.garageConfig[garageData.type];
        const garage = {
            id: garageData.id,
            type: garageData.type,
            name: garageData.name,
            position: garageData.position,
            config: config,
            capacity: garageData.capacity,
            vehicles: [],
            owner: null,
            renters: [],
            features: config.features,
            security: config.security,
            access: config.access,
            status: 'active',
            created: Date.now()
        };
        
        this.garages.set(garageData.id, garage);
        
        // Blip erstellen
        const blip = mp.blips.new(357, new mp.Vector3(garageData.position.x, garageData.position.y, garageData.position.z), {
            name: garageData.name,
            color: this.getGarageColor(garageData.type),
            shortRange: true,
            scale: 0.8
        });
        
        garage.blip = blip;
        
        console.log(`[GARAGE] Garage ${garageData.name} (${config.name}) erstellt`);
    },
    
    // Garage-Farbe basierend auf Typ
    getGarageColor(type) {
        switch (type) {
            case 'personal': return 2; // Grün
            case 'public': return 3; // Blau
            case 'private': return 5; // Gelb
            case 'business': return 1; // Rot
            case 'government': return 0; // Weiß
            case 'underground': return 4; // Lila
            case 'multi_level': return 6; // Orange
            case 'secure': return 1; // Rot
            default: return 3;
        }
    },
    
    // Fahrzeug in Garage einparken
    parkVehicleInGarage(player, vehicle, garageId, slotId = null) {
        const garage = this.garages.get(garageId);
        if (!garage) {
            player.outputChatBox('Garage nicht gefunden!');
            return false;
        }
        
        // Zugang prüfen
        if (!this.checkAccess(player, garage)) {
            player.outputChatBox('Kein Zugang zu dieser Garage!');
            return false;
        }
        
        // Kapazität prüfen
        if (garage.vehicles.length >= garage.capacity) {
            player.outputChatBox('Garage ist voll!');
            return false;
        }
        
        // Slot prüfen
        if (slotId && this.vehicleSlots.has(slotId)) {
            player.outputChatBox('Slot bereits belegt!');
            return false;
        }
        
        // Fahrzeug in Garage parken
        const vehicleData = {
            id: vehicle.id,
            model: vehicle.model,
            playerId: player.id,
            slotId: slotId || `slot_${Date.now()}`,
            parkedAt: Date.now(),
            position: vehicle.position,
            rotation: vehicle.rotation,
            health: vehicle.health,
            engineHealth: vehicle.engineHealth,
            fuel: vehicle.getVariable('fuel') || 100,
            modifications: this.getVehicleModifications(vehicle),
            locked: vehicle.getVariable('locked') || false
        };
        
        garage.vehicles.push(vehicleData);
        this.vehicleSlots.set(vehicleData.slotId, vehicleData);
        
        // Fahrzeug despawen
        vehicle.destroy();
        
        player.outputChatBox(`Fahrzeug in ${garage.name} eingeparkt!`);
        console.log(`[GARAGE] Fahrzeug ${vehicle.id} von Spieler ${player.id} in Garage ${garageId} eingeparkt`);
        return true;
    },
    
    // Fahrzeug aus Garage holen
    takeVehicleFromGarage(player, garageId, slotId) {
        const garage = this.garages.get(garageId);
        if (!garage) {
            player.outputChatBox('Garage nicht gefunden!');
            return false;
        }
        
        // Zugang prüfen
        if (!this.checkAccess(player, garage)) {
            player.outputChatBox('Kein Zugang zu dieser Garage!');
            return false;
        }
        
        // Fahrzeug finden
        const vehicleData = garage.vehicles.find(v => v.slotId === slotId);
        if (!vehicleData) {
            player.outputChatBox('Fahrzeug nicht gefunden!');
            return false;
        }
        
        // Besitz prüfen
        if (vehicleData.playerId !== player.id) {
            player.outputChatBox('Das ist nicht dein Fahrzeug!');
            return false;
        }
        
        // Fahrzeug spawnen
        const vehicle = mp.vehicles.new(vehicleData.model, new mp.Vector3(garage.position.x, garage.position.y, garage.position.z));
        vehicle.rotation = new mp.Vector3(0, 0, 0);
        vehicle.health = vehicleData.health;
        vehicle.engineHealth = vehicleData.engineHealth;
        vehicle.setVariable('fuel', vehicleData.fuel);
        vehicle.setVariable('locked', vehicleData.locked);
        
        // Modifikationen anwenden
        this.applyVehicleModifications(vehicle, vehicleData.modifications);
        
        // Fahrzeug aus Garage entfernen
        garage.vehicles = garage.vehicles.filter(v => v.slotId !== slotId);
        this.vehicleSlots.delete(slotId);
        
        player.outputChatBox(`Fahrzeug aus ${garage.name} geholt!`);
        console.log(`[GARAGE] Fahrzeug von Spieler ${player.id} aus Garage ${garageId} geholt`);
        return true;
    },
    
    // Garage mieten
    rentGarage(player, garageId, duration = 30) {
        const garage = this.garages.get(garageId);
        if (!garage) {
            player.outputChatBox('Garage nicht gefunden!');
            return false;
        }
        
        // Mietbarkeit prüfen
        if (garage.type === 'government' || garage.type === 'personal') {
            player.outputChatBox('Diese Garage kann nicht gemietet werden!');
            return false;
        }
        
        // Bereits gemietet prüfen
        if (garage.owner && garage.owner !== player.id) {
            player.outputChatBox('Garage bereits vermietet!');
            return false;
        }
        
        // Kosten berechnen
        const cost = this.calculateRentalCost(garage, duration);
        if (!this.checkPayment(player, cost)) {
            player.outputChatBox(`Nicht genug Geld! Kosten: $${cost}`);
            return false;
        }
        
        // Mietvertrag erstellen
        const contractId = Date.now();
        const contract = {
            id: contractId,
            garageId: garageId,
            playerId: player.id,
            startDate: Date.now(),
            endDate: Date.now() + (duration * 24 * 60 * 60 * 1000), // Tage zu Millisekunden
            cost: cost,
            status: 'active'
        };
        
        this.rentalContracts.set(contractId, contract);
        
        // Garage zuweisen
        garage.owner = player.id;
        garage.renters = [player.id];
        
        // Zahlung abwickeln
        this.processPayment(player, cost);
        
        player.outputChatBox(`Garage ${garage.name} für ${duration} Tage gemietet! Kosten: $${cost}`);
        console.log(`[GARAGE] Garage ${garageId} von Spieler ${player.id} für ${duration} Tage gemietet`);
        return true;
    },
    
    // Mietkosten berechnen
    calculateRentalCost(garage, duration) {
        const dailyRate = garage.config.pricePerMonth / 30;
        return Math.floor(dailyRate * duration);
    },
    
    // Zugang prüfen
    checkAccess(player, garage) {
        switch (garage.access) {
            case 'public':
                return true;
            case 'owner_only':
                return garage.owner === player.id;
            case 'business_members':
                return garage.renters.includes(player.id) || garage.owner === player.id;
            case 'government_only':
                return player.getVariable('job') === 'government';
            default:
                return false;
        }
    },
    
    // Fahrzeug-Modifikationen abrufen
    getVehicleModifications(vehicle) {
        // Hier würden die Fahrzeug-Modifikationen abgerufen werden
        return {};
    },
    
    // Fahrzeug-Modifikationen anwenden
    applyVehicleModifications(vehicle, modifications) {
        // Hier würden die Modifikationen angewendet werden
    },
    
    // Zahlung prüfen
    checkPayment(player, amount) {
        return player.getVariable('money') >= amount;
    },
    
    // Zahlung abwickeln
    processPayment(player, amount) {
        player.setVariable('money', player.getVariable('money') - amount);
    },
    
    // Verfügbare Garagen abrufen
    getAvailableGarages(playerId) {
        return Array.from(this.garages.values()).filter(garage => 
            this.checkAccess({ id: playerId }, garage)
        );
    },
    
    // Spieler-Fahrzeuge abrufen
    getPlayerVehicles(playerId) {
        const vehicles = [];
        this.garages.forEach(garage => {
            garage.vehicles.forEach(vehicle => {
                if (vehicle.playerId === playerId) {
                    vehicles.push({ ...vehicle, garageId: garage.id, garageName: garage.name });
                }
            });
        });
        return vehicles;
    },
    
    // Garage-Statistiken
    getStatistics() {
        return {
            totalGarages: this.garages.size,
            totalVehicles: Array.from(this.garages.values()).reduce((total, garage) => total + garage.vehicles.length, 0),
            activeRentals: this.rentalContracts.size,
            garageTypes: Object.keys(this.garageConfig).length
        };
    }
};

// Events
mp.events.add('garage:park', (player, vehicle, garageId, slotId) => {
    garageSystem.parkVehicleInGarage(player, vehicle, garageId, slotId);
});

mp.events.add('garage:take', (player, garageId, slotId) => {
    garageSystem.takeVehicleFromGarage(player, garageId, slotId);
});

mp.events.add('garage:rent', (player, garageId, duration) => {
    garageSystem.rentGarage(player, garageId, duration);
});

mp.events.add('garage:getGarages', (player) => {
    const garages = garageSystem.getAvailableGarages(player.id);
    player.call('garage:updateGarages', [garages]);
});

mp.events.add('garage:getVehicles', (player) => {
    const vehicles = garageSystem.getPlayerVehicles(player.id);
    player.call('garage:updateVehicles', [vehicles]);
});

// Commands
mp.events.addCommand('garage', (player, fullText, action, garageId, slotId) => {
    if (!action) {
        const garages = garageSystem.getAvailableGarages(player.id);
        player.outputChatBox('Verwendung: /garage [park|take|rent] [GarageID] [SlotID]');
        player.outputChatBox('Verfügbare Garagen:');
        garages.forEach(garage => {
            player.outputChatBox(`- ${garage.id}: ${garage.name} (${garage.vehicles.length}/${garage.capacity})`);
        });
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'park':
            if (garageId) {
                const vehicle = player.vehicle;
                if (vehicle) {
                    garageSystem.parkVehicleInGarage(player, vehicle, garageId, slotId);
                } else {
                    player.outputChatBox('Du sitzt in keinem Fahrzeug!');
                }
            } else {
                player.outputChatBox('Garage ID erforderlich!');
            }
            break;
            
        case 'take':
            if (garageId && slotId) {
                garageSystem.takeVehicleFromGarage(player, garageId, slotId);
            } else {
                player.outputChatBox('Garage ID und Slot ID erforderlich!');
            }
            break;
            
        case 'rent':
            if (garageId) {
                const duration = parseInt(slotId) || 30;
                garageSystem.rentGarage(player, garageId, duration);
            } else {
                player.outputChatBox('Garage ID erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('myvehicles', (player) => {
    const vehicles = garageSystem.getPlayerVehicles(player.id);
    player.outputChatBox('=== Meine Fahrzeuge ===');
    
    if (vehicles.length === 0) {
        player.outputChatBox('Keine Fahrzeuge gefunden!');
        return;
    }
    
    vehicles.forEach(vehicle => {
        const parkedTime = Math.floor((Date.now() - vehicle.parkedAt) / 60000); // Minuten
        player.outputChatBox(`${vehicle.model} in ${vehicle.garageName} - ${parkedTime} Min geparkt`);
    });
});

// Garage-System initialisieren
garageSystem.init();

module.exports = garageSystem;
