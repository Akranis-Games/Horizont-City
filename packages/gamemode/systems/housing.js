// Housing System - Vollständiges Immobilien-System mit Einrichtung und Möbeln
// Implementiert das umfassende Housing-System für Horizont-City

const config = require('../../../conf.json');

// Housing-Datenbank
const houses = new Map();
const apartments = new Map();
const furniture = new Map();
const realEstateAgents = new Map();

// Haus-Klasse
class House {
    constructor(id, address, price, size, bedrooms, bathrooms, location, owner) {
        this.id = id;
        this.address = address;
        this.price = price;
        this.size = size; // Quadratmeter
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.location = location;
        this.owner = owner;
        this.isForSale = true;
        this.isRented = false;
        this.rentPrice = 0;
        this.tenant = null;
        this.furniture = new Map();
        this.utilities = {
            electricity: 0,
            water: 0,
            gas: 0,
            internet: 0
        };
        this.maintenance = {
            condition: 100,
            lastInspection: new Date(),
            nextInspection: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        };
        this.security = {
            level: 1, // 1-5
            alarm: false,
            cameras: false,
            guards: false
        };
        this.createdAt = new Date();
    }

    // Haus kaufen
    buy(playerId) {
        if (!this.isForSale) {
            return { success: false, message: 'Haus ist nicht zum Verkauf!' };
        }

        if (this.owner) {
            return { success: false, message: 'Haus ist bereits verkauft!' };
        }

        // Spieler-Geld prüfen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData || !playerData.removeMoney(this.price)) {
            return { success: false, message: 'Nicht genügend Geld!' };
        }

        this.owner = playerId;
        this.isForSale = false;

        // Spieler-Statistiken aktualisieren
        playerData.stats.housesOwned++;
        playerData.stats.moneySpent += this.price;
        playerData.save();

        return { success: true, message: `Haus für ${this.price}€ gekauft!` };
    }

    // Haus verkaufen
    sell(playerId, price) {
        if (this.owner !== playerId) {
            return { success: false, message: 'Du besitzt dieses Haus nicht!' };
        }

        if (this.isRented && this.tenant) {
            return { success: false, message: 'Haus ist vermietet! Mieter muss zuerst ausziehen!' };
        }

        this.owner = null;
        this.isForSale = true;
        this.price = price;

        // Spieler bezahlen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (playerData) {
            playerData.addMoney(price);
            playerData.stats.moneyEarned += price;
            playerData.save();
        }

        return { success: true, message: `Haus für ${price}€ verkauft!` };
    }

    // Haus vermieten
    rent(playerId, rentPrice, duration) {
        if (this.owner !== playerId) {
            return { success: false, message: 'Du besitzt dieses Haus nicht!' };
        }

        if (this.isRented) {
            return { success: false, message: 'Haus ist bereits vermietet!' };
        }

        this.isRented = true;
        this.rentPrice = rentPrice;
        this.tenant = null; // Wird später gesetzt
        this.rentExpires = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);

        return { success: true, message: `Haus für ${rentPrice}€/Monat vermietet!` };
    }

    // Miete bezahlen
    payRent(tenantId) {
        if (!this.isRented) {
            return { success: false, message: 'Haus ist nicht vermietet!' };
        }

        if (this.tenant !== tenantId) {
            return { success: false, message: 'Du bist nicht der Mieter!' };
        }

        // Mieter-Geld prüfen
        const tenantData = require('./player').playerManager.getPlayer(tenantId);
        if (!tenantData || !tenantData.removeMoney(this.rentPrice)) {
            return { success: false, message: 'Nicht genügend Geld für Miete!' };
        }

        // Besitzer bezahlen
        const ownerData = require('./player').playerManager.getPlayer(this.owner);
        if (ownerData) {
            ownerData.addMoney(this.rentPrice);
            ownerData.stats.moneyEarned += this.rentPrice;
            ownerData.save();
        }

        return { success: true, message: `Miete von ${this.rentPrice}€ bezahlt!` };
    }

    // Möbel hinzufügen
    addFurniture(furnitureId, name, position, rotation) {
        this.furniture.set(furnitureId, {
            id: furnitureId,
            name: name,
            position: position,
            rotation: rotation,
            addedAt: new Date()
        });

        return { success: true, message: 'Möbel hinzugefügt!' };
    }

    // Möbel entfernen
    removeFurniture(furnitureId) {
        if (this.furniture.has(furnitureId)) {
            this.furniture.delete(furnitureId);
            return { success: true, message: 'Möbel entfernt!' };
        }
        return { success: false, message: 'Möbel nicht gefunden!' };
    }

    // Nebenkosten berechnen
    calculateUtilities() {
        const total = this.utilities.electricity + this.utilities.water + this.utilities.gas + this.utilities.internet;
        return total;
    }

    // Wartung durchführen
    performMaintenance() {
        this.maintenance.condition = 100;
        this.maintenance.lastInspection = new Date();
        this.maintenance.nextInspection = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        return { success: true, message: 'Wartung durchgeführt!' };
    }

    // Sicherheit verbessern
    upgradeSecurity(level) {
        if (level < 1 || level > 5) {
            return { success: false, message: 'Sicherheitslevel muss zwischen 1 und 5 liegen!' };
        }

        this.security.level = level;
        
        // Sicherheitsfeatures basierend auf Level
        if (level >= 2) this.security.alarm = true;
        if (level >= 3) this.security.cameras = true;
        if (level >= 4) this.security.guards = true;

        return { success: true, message: `Sicherheit auf Level ${level} verbessert!` };
    }

    // Haus-Informationen
    getInfo() {
        return {
            id: this.id,
            address: this.address,
            price: this.price,
            size: this.size,
            bedrooms: this.bedrooms,
            bathrooms: this.bathrooms,
            location: this.location,
            owner: this.owner,
            isForSale: this.isForSale,
            isRented: this.isRented,
            rentPrice: this.rentPrice,
            tenant: this.tenant,
            furnitureCount: this.furniture.size,
            utilities: this.utilities,
            maintenance: this.maintenance,
            security: this.security
        };
    }
}

// Wohnung-Klasse
class Apartment {
    constructor(id, buildingId, floor, number, price, size, bedrooms, bathrooms, location) {
        this.id = id;
        this.buildingId = buildingId;
        this.floor = floor;
        this.number = number;
        this.price = price;
        this.size = size;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        this.location = location;
        this.owner = null;
        this.isForSale = true;
        this.isRented = false;
        this.rentPrice = 0;
        this.tenant = null;
        this.furniture = new Map();
        this.utilities = {
            electricity: 0,
            water: 0,
            gas: 0,
            internet: 0
        };
        this.maintenance = {
            condition: 100,
            lastInspection: new Date(),
            nextInspection: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        };
        this.createdAt = new Date();
    }

    // Ähnliche Methoden wie House
    buy(playerId) {
        if (!this.isForSale) {
            return { success: false, message: 'Wohnung ist nicht zum Verkauf!' };
        }

        if (this.owner) {
            return { success: false, message: 'Wohnung ist bereits verkauft!' };
        }

        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData || !playerData.removeMoney(this.price)) {
            return { success: false, message: 'Nicht genügend Geld!' };
        }

        this.owner = playerId;
        this.isForSale = false;

        playerData.stats.housesOwned++;
        playerData.stats.moneySpent += this.price;
        playerData.save();

        return { success: true, message: `Wohnung für ${this.price}€ gekauft!` };
    }

    getInfo() {
        return {
            id: this.id,
            buildingId: this.buildingId,
            floor: this.floor,
            number: this.number,
            price: this.price,
            size: this.size,
            bedrooms: this.bedrooms,
            bathrooms: this.bathrooms,
            location: this.location,
            owner: this.owner,
            isForSale: this.isForSale,
            isRented: this.isRented,
            rentPrice: this.rentPrice,
            tenant: this.tenant,
            furnitureCount: this.furniture.size,
            utilities: this.utilities,
            maintenance: this.maintenance
        };
    }
}

// Immobilienmakler-Klasse
class RealEstateAgent {
    constructor(id, name, location, commission) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.commission = commission; // Provision in Prozent
        this.properties = new Map();
        this.isActive = true;
        this.createdAt = new Date();
    }

    // Immobilie hinzufügen
    addProperty(propertyId, propertyType) {
        this.properties.set(propertyId, {
            id: propertyId,
            type: propertyType,
            addedAt: new Date()
        });
    }

    // Immobilie verkaufen
    sellProperty(playerId, propertyId, price) {
        const property = this.properties.get(propertyId);
        if (!property) {
            return { success: false, message: 'Immobilie nicht gefunden!' };
        }

        const commission = price * (this.commission / 100);
        const finalPrice = price + commission;

        // Spieler-Geld prüfen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData || !playerData.removeMoney(finalPrice)) {
            return { success: false, message: 'Nicht genügend Geld!' };
        }

        // Provision an Makler
        const agentData = require('./player').playerManager.getPlayer(this.id);
        if (agentData) {
            agentData.addMoney(commission);
            agentData.stats.moneyEarned += commission;
            agentData.save();
        }

        return { 
            success: true, 
            message: `Immobilie für ${finalPrice}€ gekauft! (Provision: ${commission}€)`,
            price: finalPrice,
            commission: commission
        };
    }
}

// Housing-Manager
class HousingManager {
    constructor() {
        this.houses = houses;
        this.apartments = apartments;
        this.furniture = furniture;
        this.agents = realEstateAgents;
    }

    // Haus erstellen
    createHouse(address, price, size, bedrooms, bathrooms, location) {
        const id = Date.now() + Math.random();
        const house = new House(id, address, price, size, bedrooms, bathrooms, location, null);
        this.houses.set(id, house);
        return { success: true, house: house };
    }

    // Wohnung erstellen
    createApartment(buildingId, floor, number, price, size, bedrooms, bathrooms, location) {
        const id = Date.now() + Math.random();
        const apartment = new Apartment(id, buildingId, floor, number, price, size, bedrooms, bathrooms, location);
        this.apartments.set(id, apartment);
        return { success: true, apartment: apartment };
    }

    // Makler erstellen
    createAgent(name, location, commission) {
        const id = Date.now() + Math.random();
        const agent = new RealEstateAgent(id, name, location, commission);
        this.agents.set(id, agent);
        return { success: true, agent: agent };
    }

    // Verfügbare Immobilien abrufen
    getAvailableProperties() {
        const properties = [];
        
        this.houses.forEach(house => {
            if (house.isForSale) {
                properties.push({ ...house.getInfo(), type: 'house' });
            }
        });
        
        this.apartments.forEach(apartment => {
            if (apartment.isForSale) {
                properties.push({ ...apartment.getInfo(), type: 'apartment' });
            }
        });
        
        return properties;
    }

    // Spieler-Immobilien abrufen
    getPlayerProperties(playerId) {
        const properties = [];
        
        this.houses.forEach(house => {
            if (house.owner === playerId) {
                properties.push({ ...house.getInfo(), type: 'house' });
            }
        });
        
        this.apartments.forEach(apartment => {
            if (apartment.owner === playerId) {
                properties.push({ ...apartment.getInfo(), type: 'apartment' });
            }
        });
        
        return properties;
    }
}

// Globale Instanz
const housingManager = new HousingManager();

// Events
mp.events.add('housing:buy', (player, propertyId, propertyType) => {
    let property;
    
    if (propertyType === 'house') {
        property = housingManager.houses.get(propertyId);
    } else if (propertyType === 'apartment') {
        property = housingManager.apartments.get(propertyId);
    } else {
        player.outputChatBox('Ungültiger Immobilientyp!');
        return;
    }

    if (!property) {
        player.outputChatBox('Immobilie nicht gefunden!');
        return;
    }

    const result = property.buy(player.id);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('housing:updateUI', player, housingManager.getPlayerProperties(player.id));
    }
});

mp.events.add('housing:sell', (player, propertyId, propertyType, price) => {
    let property;
    
    if (propertyType === 'house') {
        property = housingManager.houses.get(propertyId);
    } else if (propertyType === 'apartment') {
        property = housingManager.apartments.get(propertyId);
    } else {
        player.outputChatBox('Ungültiger Immobilientyp!');
        return;
    }

    if (!property) {
        player.outputChatBox('Immobilie nicht gefunden!');
        return;
    }

    const result = property.sell(player.id, price);
    player.outputChatBox(result.message);
});

mp.events.add('housing:addFurniture', (player, propertyId, propertyType, furnitureId, name, position, rotation) => {
    let property;
    
    if (propertyType === 'house') {
        property = housingManager.houses.get(propertyId);
    } else if (propertyType === 'apartment') {
        property = housingManager.apartments.get(propertyId);
    } else {
        player.outputChatBox('Ungültiger Immobilientyp!');
        return;
    }

    if (!property) {
        player.outputChatBox('Immobilie nicht gefunden!');
        return;
    }

    if (property.owner !== player.id) {
        player.outputChatBox('Du besitzt diese Immobilie nicht!');
        return;
    }

    const result = property.addFurniture(furnitureId, name, position, rotation);
    player.outputChatBox(result.message);
});

// Commands
mp.events.addCommand('housing', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /housing [list|buy|sell|furniture|utilities|maintenance]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'list':
            const availableProperties = housingManager.getAvailableProperties();
            player.outputChatBox('=== Verfügbare Immobilien ===');
            if (availableProperties.length === 0) {
                player.outputChatBox('Keine Immobilien verfügbar!');
            } else {
                availableProperties.forEach(property => {
                    player.outputChatBox(`${property.address || `Wohnung ${property.number}`} - ${property.type} - ${property.price}€ - ${property.size}m²`);
                });
            }
            break;
            
        case 'buy':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /housing buy [Immobilien-ID] [Typ]');
                player.outputChatBox('Typen: house, apartment');
                return;
            }
            mp.events.call('housing:buy', player, args[0], args[1]);
            break;
            
        case 'sell':
            if (!args[0] || !args[1] || !args[2]) {
                player.outputChatBox('Verwendung: /housing sell [Immobilien-ID] [Typ] [Preis]');
                return;
            }
            mp.events.call('housing:sell', player, args[0], args[1], parseFloat(args[2]));
            break;
            
        case 'myproperties':
            const playerProperties = housingManager.getPlayerProperties(player.id);
            player.outputChatBox('=== Meine Immobilien ===');
            if (playerProperties.length === 0) {
                player.outputChatBox('Du besitzt keine Immobilien!');
            } else {
                playerProperties.forEach(property => {
                    player.outputChatBox(`${property.address || `Wohnung ${property.number}`} - ${property.type} - ${property.price}€ - ${property.size}m²`);
                });
            }
            break;
            
        case 'furniture':
            if (!args[0] || !args[1] || !args[2]) {
                player.outputChatBox('Verwendung: /housing furniture [Immobilien-ID] [Typ] [Möbel-Name]');
                return;
            }
            const furnitureId = Date.now() + Math.random();
            const position = { x: 0, y: 0, z: 0 };
            const rotation = { x: 0, y: 0, z: 0 };
            mp.events.call('housing:addFurniture', player, args[0], args[1], furnitureId, args[2], position, rotation);
            break;
    }
});

mp.events.addCommand('properties', (player) => {
    const playerProperties = housingManager.getPlayerProperties(player.id);
    player.outputChatBox('=== Meine Immobilien ===');
    if (playerProperties.length === 0) {
        player.outputChatBox('Du besitzt keine Immobilien!');
    } else {
        playerProperties.forEach(property => {
            player.outputChatBox(`${property.address || `Wohnung ${property.number}`} - ${property.type} - ${property.price}€ - ${property.size}m²`);
        });
    }
});

console.log('[HOUSING] Housing-System geladen!');

module.exports = { House, Apartment, RealEstateAgent, HousingManager, housingManager };
