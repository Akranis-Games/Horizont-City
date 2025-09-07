// Events - Zentrale Event-Verwaltung für den Horizont-City Roleplay Server
// Behandelt alle serverseitigen Events

const config = require('../../conf.json');

// Spieler-Events
mp.events.add('playerJoin', (player) => {
    console.log(`[JOIN] ${player.name} hat den Server betreten`);
    
    // Willkommensnachricht
    player.outputChatBox('=== Willkommen auf Horizont-City Roleplay ===');
    player.outputChatBox('Verwende /help für eine Liste der verfügbaren Commands.');
    player.outputChatBox('Verwende /rules für die Serverregeln.');
    
    // Spieler-Daten laden
    mp.events.call('player:load', player);
    
    // Spawn-Punkt setzen
    player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
    player.heading = 0;
    
    // Spieler-Status setzen
    player.health = 100;
    player.armor = 0;
});

mp.events.add('playerQuit', (player, exitType, reason) => {
    console.log(`[QUIT] ${player.name} hat den Server verlassen (${exitType}: ${reason})`);
    
    // Spieler-Daten speichern
    mp.events.call('player:save', player);
});

mp.events.add('playerChat', (player, message) => {
    // Chat-Logik mit Berechtigungen
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    
    if (playerData && playerData.isMuted) {
        player.outputChatBox('Du bist stumm geschaltet!');
        return;
    }
    
    if (playerData && playerData.isJailed) {
        player.outputChatBox('Du kannst im Gefängnis nicht chatten!');
        return;
    }
    
    // Chat-Format basierend auf Rang
    const rankName = playerData ? playerData.rankName : 'Player';
    const rankColor = getRankColor(playerData ? playerData.rank : 0);
    const chatMessage = `[${rankColor}]${rankName}[FFFFFF] ${player.name}: ${message}`;
    
    // Nachricht an alle Spieler senden
    mp.players.forEach(targetPlayer => {
        if (targetPlayer !== player) {
            targetPlayer.outputChatBox(chatMessage);
        }
    });
    
    console.log(`[CHAT] ${player.name}: ${message}`);
});

mp.events.add('playerDeath', (player, reason, killer) => {
    console.log(`[DEATH] ${player.name} ist gestorben (Grund: ${reason})`);
    
    // Todes-Statistiken aktualisieren
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData) {
        playerData.stats.deaths++;
        playerData.save();
    }
    
    // Killer-Statistiken aktualisieren
    if (killer && killer.type === 'player') {
        const killerData = require('./systems/player_mariadb').getPlayer(killer.id);
        if (killerData) {
            killerData.stats.kills++;
            killerData.save();
        }
    }
    
    // Respawn nach 5 Sekunden
    setTimeout(() => {
        player.spawn(new mp.Vector3(-425.517, 1123.620, 325.8544));
        player.health = 100;
        player.armor = 0;
    }, 5000);
});

mp.events.add('playerSpawn', (player) => {
    console.log(`[SPAWN] ${player.name} ist gespawnt`);
    
    // Spieler-Status setzen
    player.health = 100;
    player.armor = 0;
    
    // UI aktualisieren
    mp.events.call('player:updateUI', player);
});

// Fahrzeug-Events
mp.events.add('vehicleEnter', (player, vehicle, seat) => {
    console.log(`[VEHICLE] ${player.name} ist in Fahrzeug ${vehicle.id} eingestiegen (Sitz: ${seat})`);
    
    // Fahrzeug-Informationen anzeigen
    if (vehicle.getVariable('owner') === player.id) {
        player.outputChatBox('Dies ist dein Fahrzeug!');
    }
});

mp.events.add('vehicleExit', (player, vehicle, seat) => {
    console.log(`[VEHICLE] ${player.name} ist aus Fahrzeug ${vehicle.id} ausgestiegen (Sitz: ${seat})`);
});

mp.events.add('vehicleDamage', (vehicle, bodyHealthLoss, engineHealthLoss) => {
    console.log(`[VEHICLE] Fahrzeug ${vehicle.id} beschädigt - Motor: ${engineHealthLoss}, Karosserie: ${bodyHealthLoss}`);
    
    // Fahrzeug-Reparatur-Kosten berechnen
    const repairCost = Math.floor((bodyHealthLoss + engineHealthLoss) * 10);
    vehicle.setVariable('repairCost', repairCost);
});

// Interaktion-Events
mp.events.add('playerInteract', (player, target, type) => {
    console.log(`[INTERACT] ${player.name} interagiert mit ${type} ${target.id}`);
    
    // Interaktion basierend auf Typ behandeln
    switch (type) {
        case 'player':
            mp.events.call('interaction:player', player, target);
            break;
        case 'vehicle':
            mp.events.call('interaction:vehicle', player, target);
            break;
        case 'object':
            mp.events.call('interaction:object', player, target);
            break;
        case 'npc':
            mp.events.call('interaction:npc', player, target);
            break;
    }
});

// UI-Events
mp.events.add('ui:open', (player, uiType, data) => {
    console.log(`[UI] ${player.name} öffnet UI: ${uiType}`);
    
    // UI-Daten an Client senden
    player.call('ui:show', uiType, data);
});

mp.events.add('ui:close', (player, uiType) => {
    console.log(`[UI] ${player.name} schließt UI: ${uiType}`);
    
    // UI an Client senden
    player.call('ui:hide', uiType);
});

mp.events.add('ui:action', (player, uiType, action, data) => {
    console.log(`[UI] ${player.name} UI-Aktion: ${uiType} - ${action}`);
    
    // UI-Aktion behandeln
    mp.events.call(`ui:${uiType}:${action}`, player, data);
});

// Wirtschafts-Events
mp.events.add('economy:transaction', (player, amount, type, description) => {
    console.log(`[ECONOMY] ${player.name} - ${type}: ${amount}€ - ${description}`);
    
    // Transaktion in Datenbank speichern
    mp.events.call('database:saveTransaction', {
        playerId: player.id,
        amount: amount,
        type: type,
        description: description,
        timestamp: new Date()
    });
});

// Faction-Events
mp.events.add('faction:war', (faction1, faction2) => {
    console.log(`[FACTION] Krieg zwischen ${faction1.name} und ${faction2.name}`);
    
    // Krieg-Notification an alle Spieler
    mp.players.forEach(player => {
        player.outputChatBox(`[FACTION] Krieg zwischen ${faction1.name} und ${faction2.name}!`);
    });
});

mp.events.add('faction:alliance', (faction1, faction2) => {
    console.log(`[FACTION] Allianz zwischen ${faction1.name} und ${faction2.name}`);
    
    // Allianz-Notification an alle Spieler
    mp.players.forEach(player => {
        player.outputChatBox(`[FACTION] Allianz zwischen ${faction1.name} und ${faction2.name}!`);
    });
});

// Job-Events
mp.events.add('job:start', (player, jobType) => {
    console.log(`[JOB] ${player.name} startet Job: ${jobType}`);
    
    // Job-Status setzen
    player.setVariable('currentJob', jobType);
    player.setVariable('jobStartTime', Date.now());
});

mp.events.add('job:complete', (player, jobType, payment) => {
    console.log(`[JOB] ${player.name} beendet Job: ${jobType} - Bezahlung: ${payment}€`);
    
    // Bezahlung auszahlen
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData) {
        playerData.addMoney(payment);
        playerData.stats.jobsCompleted++;
        playerData.stats.moneyEarned += payment;
        playerData.save();
    }
    
    // Job-Status zurücksetzen
    player.setVariable('currentJob', null);
    player.setVariable('jobStartTime', null);
});

// Fahrzeug-Events
mp.events.add('vehicle:buy', (player, vehicleId, price) => {
    console.log(`[VEHICLE] ${player.name} kauft Fahrzeug ${vehicleId} für ${price}€`);
    
    // Fahrzeug kaufen
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData && playerData.removeMoney(price)) {
        // Fahrzeug-Datenbank-Eintrag erstellen
        mp.events.call('database:saveVehicle', {
            id: vehicleId,
            owner: player.id,
            model: vehicle.model,
            price: price,
            purchasedAt: new Date()
        });
        
        player.outputChatBox(`Fahrzeug für ${price}€ gekauft!`);
    } else {
        player.outputChatBox('Nicht genügend Geld!');
    }
});

mp.events.add('vehicle:sell', (player, vehicleId, price) => {
    console.log(`[VEHICLE] ${player.name} verkauft Fahrzeug ${vehicleId} für ${price}€`);
    
    // Fahrzeug verkaufen
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData) {
        playerData.addMoney(price);
        playerData.stats.moneyEarned += price;
        playerData.save();
        
        // Fahrzeug aus Datenbank entfernen
        mp.events.call('database:deleteVehicle', vehicleId);
        
        player.outputChatBox(`Fahrzeug für ${price}€ verkauft!`);
    }
});

// Haus-Events
mp.events.add('house:buy', (player, houseId, price) => {
    console.log(`[HOUSE] ${player.name} kauft Haus ${houseId} für ${price}€`);
    
    // Haus kaufen
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData && playerData.removeMoney(price)) {
        // Haus-Datenbank-Eintrag erstellen
        mp.events.call('database:saveHouse', {
            id: houseId,
            owner: player.id,
            price: price,
            purchasedAt: new Date()
        });
        
        player.outputChatBox(`Haus für ${price}€ gekauft!`);
    } else {
        player.outputChatBox('Nicht genügend Geld!');
    }
});

mp.events.add('house:sell', (player, houseId, price) => {
    console.log(`[HOUSE] ${player.name} verkauft Haus ${houseId} für ${price}€`);
    
    // Haus verkaufen
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData) {
        playerData.addMoney(price);
        playerData.stats.moneyEarned += price;
        playerData.save();
        
        // Haus aus Datenbank entfernen
        mp.events.call('database:deleteHouse', houseId);
        
        player.outputChatBox(`Haus für ${price}€ verkauft!`);
    }
});

// Bank-Events
mp.events.add('bank:deposit', (player, amount) => {
    console.log(`[BANK] ${player.name} zahlt ${amount}€ ein`);
    
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData && playerData.removeMoney(amount)) {
        playerData.addBankMoney(amount);
        playerData.save();
        
        player.outputChatBox(`${amount}€ auf dein Bankkonto eingezahlt!`);
    } else {
        player.outputChatBox('Nicht genügend Geld!');
    }
});

mp.events.add('bank:withdraw', (player, amount) => {
    console.log(`[BANK] ${player.name} hebt ${amount}€ ab`);
    
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData && playerData.removeBankMoney(amount)) {
        playerData.addMoney(amount);
        playerData.save();
        
        player.outputChatBox(`${amount}€ von deinem Bankkonto abgehoben!`);
    } else {
        player.outputChatBox('Nicht genügend Geld auf dem Bankkonto!');
    }
});

// Hilfsfunktionen
function getRankColor(rank) {
    const colors = {
        0: 'FFFFFF', // Player - Weiß
        1: '00FF00', // Guide - Grün
        2: '0080FF', // Moderator - Blau
        3: 'FF8000', // Administrator - Orange
        4: 'FF0080', // High Administrator - Pink
        5: '8000FF', // Manager - Lila
        6: 'FF0000', // Developer - Rot
        7: 'FFD700', // Lead Developer - Gold
        8: 'C0C0C0'  // Project Founder - Silber
    };
    
    return colors[rank] || 'FFFFFF';
}

console.log('[EVENTS] Event-System geladen!');
