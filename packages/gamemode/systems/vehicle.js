// Vehicle System - Komplettes Fahrzeug-System mit Modifikationen und Verwaltung
// Implementiert das umfassende Fahrzeug-System für Horizont-City

const config = require('../../../conf.json');

// Fahrzeug-Datenbank
const vehicles = new Map();
const vehicleMods = new Map();
const vehicleDealers = new Map();
const vehicleGarages = new Map();

// Fahrzeug-Klasse
class Vehicle {
    constructor(id, model, owner, price, location) {
        this.id = id;
        this.model = model;
        this.owner = owner;
        this.price = price;
        this.location = location;
        this.createdAt = new Date();
        this.isSpawned = false;
        this.vehicleObject = null;
        this.health = 1000;
        this.engineHealth = 1000;
        this.fuel = 100;
        this.mileage = 0;
        this.licensePlate = this.generateLicensePlate();
        this.color = { primary: 0, secondary: 0 };
        this.modifications = new Map();
        this.insurance = {
            isInsured: false,
            provider: null,
            premium: 0,
            expiresAt: null
        };
        this.registration = {
            isRegistered: false,
            expiresAt: null,
            fees: 0
        };
        this.maintenance = {
            lastService: new Date(),
            nextService: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 Tage
            condition: 100
        };
    }

    // Kennzeichen generieren
    generateLicensePlate() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numbers = '0123456789';
        let plate = '';
        
        // 2 Buchstaben
        for (let i = 0; i < 2; i++) {
            plate += letters.charAt(Math.floor(Math.random() * letters.length));
        }
        
        // 4 Zahlen
        for (let i = 0; i < 4; i++) {
            plate += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        
        return plate;
    }

    // Fahrzeug spawnen
    spawn() {
        if (this.isSpawned) {
            return { success: false, message: 'Fahrzeug ist bereits gespawnt!' };
        }

        try {
            this.vehicleObject = mp.vehicles.new(this.model, this.location);
            this.vehicleObject.setVariable('vehicleId', this.id);
            this.vehicleObject.setVariable('owner', this.owner);
            this.vehicleObject.setVariable('licensePlate', this.licensePlate);
            
            // Fahrzeug-Eigenschaften setzen
            this.vehicleObject.health = this.health;
            this.vehicleObject.engineHealth = this.engineHealth;
            this.vehicleObject.setColorRGB(this.color.primary, this.color.secondary);
            
            // Modifikationen anwenden
            this.applyModifications();
            
            this.isSpawned = true;
            return { success: true, message: 'Fahrzeug gespawnt!', vehicle: this.vehicleObject };
        } catch (error) {
            return { success: false, message: 'Fehler beim Spawnen des Fahrzeugs!' };
        }
    }

    // Fahrzeug despawnen
    despawn() {
        if (!this.isSpawned || !this.vehicleObject) {
            return { success: false, message: 'Fahrzeug ist nicht gespawnt!' };
        }

        try {
            this.vehicleObject.destroy();
            this.vehicleObject = null;
            this.isSpawned = false;
            return { success: true, message: 'Fahrzeug despawnt!' };
        } catch (error) {
            return { success: false, message: 'Fehler beim Despawnen des Fahrzeugs!' };
        }
    }

    // Modifikation hinzufügen
    addModification(modType, modIndex) {
        this.modifications.set(modType, modIndex);
        
        if (this.isSpawned && this.vehicleObject) {
            this.vehicleObject.setMod(modType, modIndex);
        }
        
        return { success: true, message: 'Modifikation hinzugefügt!' };
    }

    // Modifikationen anwenden
    applyModifications() {
        if (!this.isSpawned || !this.vehicleObject) {
            return;
        }

        this.modifications.forEach((modIndex, modType) => {
            this.vehicleObject.setMod(modType, modIndex);
        });
    }

    // Farbe setzen
    setColor(primary, secondary) {
        this.color.primary = primary;
        this.color.secondary = secondary;
        
        if (this.isSpawned && this.vehicleObject) {
            this.vehicleObject.setColorRGB(primary, secondary);
        }
        
        return { success: true, message: 'Farbe geändert!' };
    }

    // Kraftstoff tanken
    refuel(amount) {
        const maxFuel = 100;
        const newFuel = Math.min(maxFuel, this.fuel + amount);
        const fuelAdded = newFuel - this.fuel;
        this.fuel = newFuel;
        
        if (this.isSpawned && this.vehicleObject) {
            this.vehicleObject.setVariable('fuel', this.fuel);
        }
        
        return { success: true, message: `${fuelAdded}% Kraftstoff getankt!`, fuelAdded: fuelAdded };
    }

    // Reparatur
    repair() {
        const repairCost = this.calculateRepairCost();
        this.health = 1000;
        this.engineHealth = 1000;
        
        if (this.isSpawned && this.vehicleObject) {
            this.vehicleObject.health = this.health;
            this.vehicleObject.engineHealth = this.engineHealth;
        }
        
        return { success: true, message: 'Fahrzeug repariert!', cost: repairCost };
    }

    // Reparaturkosten berechnen
    calculateRepairCost() {
        const healthLoss = 1000 - this.health;
        const engineLoss = 1000 - this.engineHealth;
        return Math.floor((healthLoss + engineLoss) * 0.1); // 0.1€ pro Schadenspunkt
    }

    // Wartung
    service() {
        this.maintenance.lastService = new Date();
        this.maintenance.nextService = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        this.maintenance.condition = 100;
        
        return { success: true, message: 'Wartung durchgeführt!' };
    }

    // Versicherung abschließen
    insure(provider, premium, duration) {
        this.insurance.isInsured = true;
        this.insurance.provider = provider;
        this.insurance.premium = premium;
        this.insurance.expiresAt = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
        
        return { success: true, message: 'Versicherung abgeschlossen!' };
    }

    // Registrierung
    register(fees, duration) {
        this.registration.isRegistered = true;
        this.registration.fees = fees;
        this.registration.expiresAt = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
        
        return { success: true, message: 'Fahrzeug registriert!' };
    }

    // Fahrzeug-Informationen
    getInfo() {
        return {
            id: this.id,
            model: this.model,
            owner: this.owner,
            price: this.price,
            location: this.location,
            isSpawned: this.isSpawned,
            health: this.health,
            engineHealth: this.engineHealth,
            fuel: this.fuel,
            mileage: this.mileage,
            licensePlate: this.licensePlate,
            color: this.color,
            modifications: Object.fromEntries(this.modifications),
            insurance: this.insurance,
            registration: this.registration,
            maintenance: this.maintenance
        };
    }
}

// Fahrzeughändler-Klasse
class VehicleDealer {
    constructor(id, name, location, vehicleTypes) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.vehicleTypes = vehicleTypes; // ['sports', 'sedan', 'suv', 'motorcycle', 'truck']
        this.vehicles = new Map();
        this.isOpen = true;
        this.discount = 0; // Rabatt in Prozent
        this.createdAt = new Date();
    }

    // Fahrzeug hinzufügen
    addVehicle(vehicleId, model, price, stock) {
        this.vehicles.set(vehicleId, {
            id: vehicleId,
            model: model,
            price: price,
            stock: stock,
            originalPrice: price
        });
    }

    // Fahrzeug kaufen
    buyVehicle(playerId, vehicleId) {
        const vehicle = this.vehicles.get(vehicleId);
        if (!vehicle) {
            return { success: false, message: 'Fahrzeug nicht verfügbar!' };
        }

        if (vehicle.stock <= 0) {
            return { success: false, message: 'Fahrzeug ausverkauft!' };
        }

        const finalPrice = vehicle.price * (1 - this.discount / 100);
        
        // Spieler-Geld prüfen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData || !playerData.removeMoney(finalPrice)) {
            return { success: false, message: 'Nicht genügend Geld!' };
        }

        // Fahrzeug erstellen
        const newVehicleId = Date.now() + Math.random();
        const newVehicle = new Vehicle(newVehicleId, vehicle.model, playerId, finalPrice, this.location);
        vehicles.set(newVehicleId, newVehicle);

        // Bestand reduzieren
        vehicle.stock--;

        // Spieler-Statistiken aktualisieren
        playerData.stats.vehiclesOwned++;
        playerData.stats.moneySpent += finalPrice;
        playerData.save();

        return { 
            success: true, 
            message: `Fahrzeug für ${finalPrice}€ gekauft!`,
            vehicleId: newVehicleId,
            vehicle: newVehicle
        };
    }

    // Fahrzeug verkaufen
    sellVehicle(playerId, vehicleId, price) {
        const vehicle = vehicles.get(vehicleId);
        if (!vehicle) {
            return { success: false, message: 'Fahrzeug nicht gefunden!' };
        }

        if (vehicle.owner !== playerId) {
            return { success: false, message: 'Du besitzt dieses Fahrzeug nicht!' };
        }

        // Fahrzeug despawnen
        vehicle.despawn();

        // Spieler bezahlen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (playerData) {
            playerData.addMoney(price);
            playerData.stats.moneyEarned += price;
            playerData.save();
        }

        // Fahrzeug aus Datenbank entfernen
        vehicles.delete(vehicleId);

        return { 
            success: true, 
            message: `Fahrzeug für ${price}€ verkauft!`,
            price: price
        };
    }
}

// Garage-Klasse
class Garage {
    constructor(id, name, location, capacity, owner) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.owner = owner;
        this.vehicles = new Map();
        this.isPublic = false;
        this.rent = 0;
        this.createdAt = new Date();
    }

    // Fahrzeug einparken
    parkVehicle(vehicleId) {
        if (this.vehicles.size >= this.capacity) {
            return { success: false, message: 'Garage ist voll!' };
        }

        const vehicle = vehicles.get(vehicleId);
        if (!vehicle) {
            return { success: false, message: 'Fahrzeug nicht gefunden!' };
        }

        // Fahrzeug despawnen
        vehicle.despawn();
        vehicle.location = this.location;

        this.vehicles.set(vehicleId, vehicle);
        return { success: true, message: 'Fahrzeug eingeparkt!' };
    }

    // Fahrzeug ausparken
    unparkVehicle(vehicleId, spawnLocation) {
        const vehicle = this.vehicles.get(vehicleId);
        if (!vehicle) {
            return { success: false, message: 'Fahrzeug nicht in dieser Garage!' };
        }

        vehicle.location = spawnLocation;
        const spawnResult = vehicle.spawn();
        
        if (spawnResult.success) {
            this.vehicles.delete(vehicleId);
            return { success: true, message: 'Fahrzeug ausgeparkt!' };
        } else {
            return { success: false, message: 'Fehler beim Ausparken!' };
        }
    }
}

// Vehicle-Manager
class VehicleManager {
    constructor() {
        this.vehicles = vehicles;
        this.dealers = vehicleDealers;
        this.garages = vehicleGarages;
    }

    // Fahrzeug erstellen
    createVehicle(model, owner, price, location) {
        const id = Date.now() + Math.random();
        const vehicle = new Vehicle(id, model, owner, price, location);
        this.vehicles.set(id, vehicle);
        return { success: true, vehicle: vehicle };
    }

    // Händler erstellen
    createDealer(name, location, vehicleTypes) {
        const id = Date.now() + Math.random();
        const dealer = new VehicleDealer(id, name, location, vehicleTypes);
        this.dealers.set(id, dealer);
        return { success: true, dealer: dealer };
    }

    // Garage erstellen
    createGarage(name, location, capacity, owner) {
        const id = Date.now() + Math.random();
        const garage = new Garage(id, name, location, capacity, owner);
        this.garages.set(id, garage);
        return { success: true, garage: garage };
    }

    // Spieler-Fahrzeuge abrufen
    getPlayerVehicles(playerId) {
        const playerVehicles = [];
        this.vehicles.forEach(vehicle => {
            if (vehicle.owner === playerId) {
                playerVehicles.push(vehicle);
            }
        });
        return playerVehicles;
    }
}

// Globale Instanz
const vehicleManager = new VehicleManager();

// Events
mp.events.add('vehicle:buy', (player, dealerId, vehicleId) => {
    const dealer = vehicleManager.dealers.get(dealerId);
    if (!dealer) {
        player.outputChatBox('Händler nicht gefunden!');
        return;
    }

    const result = dealer.buyVehicle(player.id, vehicleId);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('vehicle:updateUI', player, vehicleManager.getPlayerVehicles(player.id));
    }
});

mp.events.add('vehicle:sell', (player, dealerId, vehicleId, price) => {
    const dealer = vehicleManager.dealers.get(dealerId);
    if (!dealer) {
        player.outputChatBox('Händler nicht gefunden!');
        return;
    }

    const result = dealer.sellVehicle(player.id, vehicleId, price);
    player.outputChatBox(result.message);
});

mp.events.add('vehicle:spawn', (player, vehicleId) => {
    const vehicle = vehicleManager.vehicles.get(vehicleId);
    if (!vehicle) {
        player.outputChatBox('Fahrzeug nicht gefunden!');
        return;
    }

    if (vehicle.owner !== player.id) {
        player.outputChatBox('Du besitzt dieses Fahrzeug nicht!');
        return;
    }

    const result = vehicle.spawn();
    player.outputChatBox(result.message);
});

mp.events.add('vehicle:despawn', (player, vehicleId) => {
    const vehicle = vehicleManager.vehicles.get(vehicleId);
    if (!vehicle) {
        player.outputChatBox('Fahrzeug nicht gefunden!');
        return;
    }

    if (vehicle.owner !== player.id) {
        player.outputChatBox('Du besitzt dieses Fahrzeug nicht!');
        return;
    }

    const result = vehicle.despawn();
    player.outputChatBox(result.message);
});

mp.events.add('vehicle:park', (player, vehicleId, garageId) => {
    const garage = vehicleManager.garages.get(garageId);
    if (!garage) {
        player.outputChatBox('Garage nicht gefunden!');
        return;
    }

    const result = garage.parkVehicle(vehicleId);
    player.outputChatBox(result.message);
});

mp.events.add('vehicle:unpark', (player, vehicleId, garageId, spawnLocation) => {
    const garage = vehicleManager.garages.get(garageId);
    if (!garage) {
        player.outputChatBox('Garage nicht gefunden!');
        return;
    }

    const result = garage.unparkVehicle(vehicleId, spawnLocation);
    player.outputChatBox(result.message);
});

// Commands
mp.events.addCommand('vehicles', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /vehicles [list|spawn|despawn|park|unpark|info|modify]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'list':
            const playerVehicles = vehicleManager.getPlayerVehicles(player.id);
            player.outputChatBox('=== Meine Fahrzeuge ===');
            if (playerVehicles.length === 0) {
                player.outputChatBox('Du besitzt keine Fahrzeuge!');
            } else {
                playerVehicles.forEach(vehicle => {
                    const info = vehicle.getInfo();
                    player.outputChatBox(`${info.model} - ${info.licensePlate} - ${info.isSpawned ? 'Gespawnt' : 'Eingeparkt'}`);
                });
            }
            break;
            
        case 'spawn':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /vehicles spawn [Fahrzeug-ID]');
                return;
            }
            mp.events.call('vehicle:spawn', player, args[0]);
            break;
            
        case 'despawn':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /vehicles despawn [Fahrzeug-ID]');
                return;
            }
            mp.events.call('vehicle:despawn', player, args[0]);
            break;
            
        case 'park':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /vehicles park [Fahrzeug-ID] [Garage-ID]');
                return;
            }
            mp.events.call('vehicle:park', player, args[0], args[1]);
            break;
            
        case 'unpark':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /vehicles unpark [Fahrzeug-ID] [Garage-ID]');
                return;
            }
            const spawnLocation = player.position;
            mp.events.call('vehicle:unpark', player, args[0], args[1], spawnLocation);
            break;
            
        case 'info':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /vehicles info [Fahrzeug-ID]');
                return;
            }
            const vehicle = vehicleManager.vehicles.get(args[0]);
            if (vehicle) {
                const info = vehicle.getInfo();
                player.outputChatBox(`=== ${info.model} ===`);
                player.outputChatBox(`Kennzeichen: ${info.licensePlate}`);
                player.outputChatBox(`Gesundheit: ${info.health}/1000`);
                player.outputChatBox(`Motor: ${info.engineHealth}/1000`);
                player.outputChatBox(`Kraftstoff: ${info.fuel}%`);
                player.outputChatBox(`Kilometerstand: ${info.mileage} km`);
                player.outputChatBox(`Status: ${info.isSpawned ? 'Gespawnt' : 'Eingeparkt'}`);
            } else {
                player.outputChatBox('Fahrzeug nicht gefunden!');
            }
            break;
    }
});

mp.events.addCommand('dealers', (player) => {
    player.outputChatBox('=== Fahrzeughändler ===');
    vehicleManager.dealers.forEach(dealer => {
        player.outputChatBox(`${dealer.name} - ${dealer.location} - ${dealer.isOpen ? 'Geöffnet' : 'Geschlossen'}`);
    });
});

mp.events.addCommand('garages', (player) => {
    player.outputChatBox('=== Garagen ===');
    vehicleManager.garages.forEach(garage => {
        player.outputChatBox(`${garage.name} - ${garage.location} - ${garage.vehicles.size}/${garage.capacity} Plätze`);
    });
});

console.log('[VEHICLE] Vehicle-System geladen!');

module.exports = { Vehicle, VehicleDealer, Garage, VehicleManager, vehicleManager };
