// Inventory System - Inventarsystem
// Behandelt alle Inventar-Funktionen für Horizont-City Roleplay

const inventorySystem = {
    // Item-Konfiguration
    itemTypes: {
        WEAPON: 'weapon',
        AMMO: 'ammo',
        FOOD: 'food',
        DRINK: 'drink',
        DRUG: 'drug',
        ALCOHOL: 'alcohol',
        TOOL: 'tool',
        KEY: 'key',
        PHONE: 'phone',
        MONEY: 'money',
        DOCUMENT: 'document',
        CLOTHING: 'clothing',
        VEHICLE: 'vehicle',
        HOUSE: 'house',
        OTHER: 'other'
    },
    
    // Standard-Items (erweitert basierend auf Tutorial)
    defaultItems: [
        { id: 'phone', name: 'Handy', type: 'phone', weight: 0.5, stackable: false },
        { id: 'money', name: 'Geld', type: 'money', weight: 0.0, stackable: true },
        { id: 'id_card', name: 'Personalausweis', type: 'document', weight: 0.1, stackable: false },
        { id: 'driver_license', name: 'Führerschein', type: 'document', weight: 0.1, stackable: false },
        { id: 'apple', name: 'Apfel', type: 'food', weight: 0.2, stackable: true, health: 20 },
        { id: 'water', name: 'Wasser', type: 'drink', weight: 0.3, stackable: true, thirst: 30 },
        { id: 'bread', name: 'Brot', type: 'food', weight: 0.4, stackable: true, health: 25 },
        { id: 'sandwich', name: 'Sandwich', type: 'food', weight: 0.5, stackable: true, health: 40 },
        { id: 'coffee', name: 'Kaffee', type: 'drink', weight: 0.2, stackable: true, energy: 20 },
        { id: 'energy_drink', name: 'Energy Drink', type: 'drink', weight: 0.3, stackable: true, energy: 50 },
        { id: 'cigarettes', name: 'Zigaretten', type: 'drug', weight: 0.1, stackable: true, addiction: 5 },
        { id: 'beer', name: 'Bier', type: 'alcohol', weight: 0.5, stackable: true, intoxication: 15 },
        { id: 'wine', name: 'Wein', type: 'alcohol', weight: 0.6, stackable: true, intoxication: 25 },
        { id: 'whiskey', name: 'Whiskey', type: 'alcohol', weight: 0.7, stackable: true, intoxication: 40 },
        { id: 'first_aid', name: 'Erste Hilfe', type: 'tool', weight: 1.0, stackable: true, health: 80 },
        { id: 'bandage', name: 'Verband', type: 'tool', weight: 0.2, stackable: true, health: 30 },
        { id: 'lockpick', name: 'Dietrich', type: 'tool', weight: 0.1, stackable: true },
        { id: 'rope', name: 'Seil', type: 'tool', weight: 0.8, stackable: true },
        { id: 'flashlight', name: 'Taschenlampe', type: 'tool', weight: 0.3, stackable: false },
        { id: 'camera', name: 'Kamera', type: 'tool', weight: 0.4, stackable: false },
        { id: 'radio', name: 'Funkgerät', type: 'tool', weight: 0.6, stackable: false },
        { id: 'handcuffs', name: 'Handschellen', type: 'tool', weight: 0.3, stackable: true },
        { id: 'baton', name: 'Schlagstock', type: 'weapon', weight: 0.8, stackable: false, damage: 20 },
        { id: 'knife', name: 'Messer', type: 'weapon', weight: 0.5, stackable: false, damage: 35 },
        { id: 'pistol', name: 'Pistole', type: 'weapon', weight: 1.2, stackable: false, damage: 50, ammo: 12 },
        { id: 'rifle', name: 'Gewehr', type: 'weapon', weight: 3.5, stackable: false, damage: 80, ammo: 30 },
        { id: 'pistol_ammo', name: 'Pistolenmunition', type: 'ammo', weight: 0.1, stackable: true, capacity: 50 },
        { id: 'rifle_ammo', name: 'Gewehrmunition', type: 'ammo', weight: 0.2, stackable: true, capacity: 100 },
        { id: 'house_key', name: 'Hausschlüssel', type: 'key', weight: 0.05, stackable: false },
        { id: 'car_key', name: 'Autoschlüssel', type: 'key', weight: 0.05, stackable: false },
        { id: 'business_card', name: 'Visitenkarte', type: 'document', weight: 0.01, stackable: true },
        { id: 'contract', name: 'Vertrag', type: 'document', weight: 0.1, stackable: false },
        { id: 'passport', name: 'Reisepass', type: 'document', weight: 0.1, stackable: false },
        { id: 'insurance_card', name: 'Versicherungskarte', type: 'document', weight: 0.05, stackable: false }
    ],
    
    // Spieler-Inventare
    playerInventories: new Map(),
    
    // Inventar-Initialisierung
    init() {
        console.log('[INVENTORY] Inventarsystem initialisiert');
    },
    
    // Spieler-Inventar erstellen
    createPlayerInventory(playerId, maxWeight = 50.0) {
        const inventory = {
            items: new Map(),
            maxWeight: maxWeight,
            currentWeight: 0.0,
            maxSlots: 30
        };
        
        this.playerInventories.set(playerId, inventory);
        
        // Standard-Items hinzufügen
        this.addItem(playerId, 'phone', 1);
        this.addItem(playerId, 'money', 1000);
        this.addItem(playerId, 'id_card', 1);
        this.addItem(playerId, 'driver_license', 1);
        
        console.log(`[INVENTORY] Inventar für Spieler ${playerId} erstellt`);
        return inventory;
    },
    
    // Item hinzufügen
    addItem(playerId, itemId, quantity = 1) {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            console.error(`[INVENTORY] Inventar für Spieler ${playerId} nicht gefunden`);
            return false;
        }
        
        const item = this.getItemInfo(itemId);
        if (!item) {
            console.error(`[INVENTORY] Item ${itemId} nicht gefunden`);
            return false;
        }
        
        // Gewicht prüfen
        const totalWeight = item.weight * quantity;
        if (inventory.currentWeight + totalWeight > inventory.maxWeight) {
            console.log(`[INVENTORY] Nicht genug Platz im Inventar für ${item.name}`);
            return false;
        }
        
        // Item hinzufügen oder Menge erhöhen
        if (inventory.items.has(itemId)) {
            const existingItem = inventory.items.get(itemId);
            existingItem.quantity += quantity;
        } else {
            inventory.items.set(itemId, {
                ...item,
                quantity: quantity
            });
        }
        
        inventory.currentWeight += totalWeight;
        
        // Spieler benachrichtigen
        const player = mp.players.at(playerId);
        if (player) {
            player.call('inventory:itemAdded', [item, quantity]);
            player.call('inventory:updateUI', this.getInventoryData(playerId));
        }
        
        console.log(`[INVENTORY] Item ${item.name} x${quantity} zu Spieler ${playerId} hinzugefügt`);
        return true;
    },
    
    // Item entfernen
    removeItem(playerId, itemId, quantity = 1) {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            console.error(`[INVENTORY] Inventar für Spieler ${playerId} nicht gefunden`);
            return false;
        }
        
        if (!inventory.items.has(itemId)) {
            console.log(`[INVENTORY] Item ${itemId} nicht im Inventar von Spieler ${playerId}`);
            return false;
        }
        
        const item = inventory.items.get(itemId);
        if (item.quantity < quantity) {
            console.log(`[INVENTORY] Nicht genug ${item.name} im Inventar`);
            return false;
        }
        
        item.quantity -= quantity;
        inventory.currentWeight -= item.weight * quantity;
        
        // Item komplett entfernen wenn Menge 0
        if (item.quantity <= 0) {
            inventory.items.delete(itemId);
        }
        
        // Spieler benachrichtigen
        const player = mp.players.at(playerId);
        if (player) {
            player.call('inventory:itemRemoved', [item, quantity]);
            player.call('inventory:updateUI', this.getInventoryData(playerId));
        }
        
        console.log(`[INVENTORY] Item ${item.name} x${quantity} von Spieler ${playerId} entfernt`);
        return true;
    },
    
    // Item-Informationen abrufen
    getItemInfo(itemId) {
        // Standard-Items durchsuchen
        for (const item of this.defaultItems) {
            if (item.id === itemId) {
                return item;
            }
        }
        
        // Hier könnten weitere Item-Quellen hinzugefügt werden (Datenbank, etc.)
        return null;
    },
    
    // Inventar-Daten abrufen
    getInventoryData(playerId) {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            return null;
        }
        
        return {
            items: Array.from(inventory.items.values()),
            maxWeight: inventory.maxWeight,
            currentWeight: inventory.currentWeight,
            maxSlots: inventory.maxSlots,
            usedSlots: inventory.items.size
        };
    },
    
    // Item verwenden
    useItem(playerId, itemId) {
        const inventory = this.playerInventories.get(playerId);
        if (!inventory) {
            return false;
        }
        
        if (!inventory.items.has(itemId)) {
            return false;
        }
        
        const item = inventory.items.get(itemId);
        
        // Item-spezifische Aktionen
        switch (item.type) {
            case 'food':
                this.useFood(playerId, item);
                break;
            case 'drink':
                this.useDrink(playerId, item);
                break;
            case 'drug':
                this.useDrug(playerId, item);
                break;
            case 'alcohol':
                this.useAlcohol(playerId, item);
                break;
            case 'phone':
                this.usePhone(playerId, item);
                break;
            default:
                console.log(`[INVENTORY] Item ${item.name} kann nicht verwendet werden`);
                return false;
        }
        
        // Item nach Verwendung entfernen (außer bei stackbaren Items)
        if (!item.stackable) {
            this.removeItem(playerId, itemId, 1);
        }
        
        return true;
    },
    
    // Essen verwenden
    useFood(playerId, item) {
        const player = mp.players.at(playerId);
        if (player) {
            player.health = Math.min(100, player.health + 20);
            player.outputChatBox(`Du isst ${item.name} und fühlst dich besser!`);
        }
    },
    
    // Trinken verwenden
    useDrink(playerId, item) {
        const player = mp.players.at(playerId);
        if (player) {
            player.health = Math.min(100, player.health + 10);
            player.outputChatBox(`Du trinkst ${item.name} und fühlst dich erfrischt!`);
        }
    },
    
    // Droge verwenden
    useDrug(playerId, item) {
        const player = mp.players.at(playerId);
        if (player) {
            // Hier könnten Drogen-Effekte implementiert werden
            player.outputChatBox(`Du nimmst ${item.name}...`);
        }
    },
    
    // Alkohol verwenden
    useAlcohol(playerId, item) {
        const player = mp.players.at(playerId);
        if (player) {
            // Hier könnten Alkohol-Effekte implementiert werden
            player.outputChatBox(`Du trinkst ${item.name}...`);
        }
    },
    
    // Handy verwenden
    usePhone(playerId, item) {
        const player = mp.players.at(playerId);
        if (player) {
            player.call('ui:show', 'Phone');
        }
    },
    
    // Inventar löschen
    clearInventory(playerId) {
        const inventory = this.playerInventories.get(playerId);
        if (inventory) {
            inventory.items.clear();
            inventory.currentWeight = 0.0;
            
            const player = mp.players.at(playerId);
            if (player) {
                player.call('inventory:updateUI', this.getInventoryData(playerId));
            }
            
            console.log(`[INVENTORY] Inventar von Spieler ${playerId} geleert`);
        }
    },
    
    // Item droppen (erweitert basierend auf Tutorial)
    dropItem(player, itemId, quantity = 1) {
        const inventory = this.playerInventories.get(player.id);
        if (!inventory) {
            player.outputChatBox('Kein Inventar gefunden!');
            return false;
        }
        
        const item = inventory.items.get(itemId);
        if (!item || item.quantity < quantity) {
            player.outputChatBox('Item nicht gefunden oder nicht genug vorhanden!');
            return false;
        }
        
        const itemConfig = this.defaultItems.find(i => i.id === itemId);
        if (!itemConfig) {
            player.outputChatBox('Item-Konfiguration nicht gefunden!');
            return false;
        }
        
        // Item aus Inventar entfernen
        this.removeItem(player.id, itemId, quantity);
        
        // Item in der Welt erstellen (vereinfacht)
        const dropPosition = {
            x: player.position.x + Math.random() * 2 - 1,
            y: player.position.y + Math.random() * 2 - 1,
            z: player.position.z
        };
        
        // Hier würde normalerweise ein Objekt in der Welt erstellt werden
        player.outputChatBox(`${quantity}x ${itemConfig.name} gedroppt!`);
        
        console.log(`[INVENTORY] Spieler ${player.id} droppte ${quantity}x ${itemConfig.name}`);
        return true;
    },
    
    // Item an anderen Spieler geben (erweitert basierend auf Tutorial)
    giveItem(player, targetPlayer, itemId, quantity = 1) {
        const inventory = this.playerInventories.get(player.id);
        if (!inventory) {
            player.outputChatBox('Kein Inventar gefunden!');
            return false;
        }
        
        const targetInventory = this.playerInventories.get(targetPlayer.id);
        if (!targetInventory) {
            player.outputChatBox('Zielspieler hat kein Inventar!');
            return false;
        }
        
        const item = inventory.items.get(itemId);
        if (!item || item.quantity < quantity) {
            player.outputChatBox('Item nicht gefunden oder nicht genug vorhanden!');
            return false;
        }
        
        const itemConfig = this.defaultItems.find(i => i.id === itemId);
        if (!itemConfig) {
            player.outputChatBox('Item-Konfiguration nicht gefunden!');
            return false;
        }
        
        // Prüfen ob Zielspieler Platz hat
        if (!this.canAddItem(targetPlayer.id, itemId, quantity)) {
            player.outputChatBox('Zielspieler hat keinen Platz im Inventar!');
            return false;
        }
        
        // Item übertragen
        this.removeItem(player.id, itemId, quantity);
        this.addItem(targetPlayer.id, itemId, quantity);
        
        player.outputChatBox(`${quantity}x ${itemConfig.name} an ${targetPlayer.name} gegeben!`);
        targetPlayer.outputChatBox(`${quantity}x ${itemConfig.name} von ${player.name} erhalten!`);
        
        console.log(`[INVENTORY] Spieler ${player.id} gab ${quantity}x ${itemConfig.name} an ${targetPlayer.id}`);
        return true;
    },
    
    // Inventar durchsuchen (erweitert basierend auf Tutorial)
    searchInventory(player, searchTerm) {
        const inventory = this.playerInventories.get(player.id);
        if (!inventory) {
            player.outputChatBox('Kein Inventar gefunden!');
            return false;
        }
        
        const results = [];
        for (let [itemId, item] of inventory.items) {
            const itemConfig = this.defaultItems.find(i => i.id === itemId);
            if (itemConfig && itemConfig.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                results.push({
                    id: itemId,
                    name: itemConfig.name,
                    quantity: item.quantity,
                    type: itemConfig.type
                });
            }
        }
        
        if (results.length === 0) {
            player.outputChatBox(`Keine Items gefunden für "${searchTerm}"`);
            return false;
        }
        
        player.outputChatBox(`=== Suchergebnisse für "${searchTerm}" ===`);
        results.forEach(result => {
            player.outputChatBox(`${result.name} (${result.quantity}x) - ${result.type}`);
        });
        
        return results;
    },
    
    // Inventar sortieren (erweitert basierend auf Tutorial)
    sortInventory(player, sortBy = 'name') {
        const inventory = this.playerInventories.get(player.id);
        if (!inventory) {
            player.outputChatBox('Kein Inventar gefunden!');
            return false;
        }
        
        const items = Array.from(inventory.items.entries());
        
        switch (sortBy.toLowerCase()) {
            case 'name':
                items.sort((a, b) => {
                    const nameA = this.defaultItems.find(i => i.id === a[0])?.name || '';
                    const nameB = this.defaultItems.find(i => i.id === b[0])?.name || '';
                    return nameA.localeCompare(nameB);
                });
                break;
                
            case 'type':
                items.sort((a, b) => {
                    const typeA = this.defaultItems.find(i => i.id === a[0])?.type || '';
                    const typeB = this.defaultItems.find(i => i.id === b[0])?.type || '';
                    return typeA.localeCompare(typeB);
                });
                break;
                
            case 'quantity':
                items.sort((a, b) => b[1].quantity - a[1].quantity);
                break;
                
            case 'weight':
                items.sort((a, b) => {
                    const weightA = this.defaultItems.find(i => i.id === a[0])?.weight || 0;
                    const weightB = this.defaultItems.find(i => i.id === b[0])?.weight || 0;
                    return weightB - weightA;
                });
                break;
        }
        
        // Inventar neu aufbauen
        inventory.items.clear();
        items.forEach(([itemId, item]) => {
            inventory.items.set(itemId, item);
        });
        
        player.outputChatBox(`Inventar nach ${sortBy} sortiert!`);
        return true;
    }
};

// Events
mp.events.add('inventory:addItem', (player, itemId, quantity) => {
    const success = inventorySystem.addItem(player.id, itemId, quantity);
    if (success) {
        player.outputChatBox(`Item ${itemId} x${quantity} hinzugefügt!`);
    } else {
        player.outputChatBox('Item konnte nicht hinzugefügt werden!');
    }
});

mp.events.add('inventory:removeItem', (player, itemId, quantity) => {
    const success = inventorySystem.removeItem(player.id, itemId, quantity);
    if (success) {
        player.outputChatBox(`Item ${itemId} x${quantity} entfernt!`);
    } else {
        player.outputChatBox('Item konnte nicht entfernt werden!');
    }
});

mp.events.add('inventory:useItem', (player, itemId) => {
    const success = inventorySystem.useItem(player.id, itemId);
    if (!success) {
        player.outputChatBox('Item konnte nicht verwendet werden!');
    }
});

mp.events.add('inventory:getData', (player) => {
    const data = inventorySystem.getInventoryData(player.id);
    player.call('inventory:updateUI', data);
});

// Commands
mp.events.addCommand('inv', (player) => {
    const data = inventorySystem.getInventoryData(player.id);
    if (data) {
        player.call('ui:show', 'Inventory', data);
    }
});

mp.events.addCommand('giveitem', (player, fullText, itemId, quantity) => {
    if (!itemId) {
        player.outputChatBox('Verwendung: /giveitem [ItemID] [Menge]');
        return;
    }
    
    const qty = quantity ? parseInt(quantity) : 1;
    inventorySystem.addItem(player.id, itemId, qty);
});

mp.events.addCommand('dropitem', (player, fullText, itemId, quantity) => {
    if (!itemId) {
        player.outputChatBox('Verwendung: /dropitem [ItemID] [Menge]');
        return;
    }
    
    const qty = quantity ? parseInt(quantity) : 1;
    inventorySystem.dropItem(player, itemId, qty);
});

mp.events.addCommand('giveitemto', (player, fullText, targetId, itemId, quantity) => {
    if (!targetId || !itemId) {
        player.outputChatBox('Verwendung: /giveitemto [SpielerID] [ItemID] [Menge]');
        return;
    }
    
    const targetPlayer = mp.players.at(parseInt(targetId));
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const qty = quantity ? parseInt(quantity) : 1;
    inventorySystem.giveItem(player, targetPlayer, itemId, qty);
});

mp.events.addCommand('searchinv', (player, fullText, searchTerm) => {
    if (!searchTerm) {
        player.outputChatBox('Verwendung: /searchinv [Suchbegriff]');
        return;
    }
    
    inventorySystem.searchInventory(player, searchTerm);
});

mp.events.addCommand('sortinv', (player, fullText, sortBy) => {
    if (!sortBy) {
        player.outputChatBox('Verwendung: /sortinv [name|type|quantity|weight]');
        return;
    }
    
    inventorySystem.sortInventory(player, sortBy);
});

// Inventarsystem initialisieren
inventorySystem.init();

module.exports = inventorySystem;