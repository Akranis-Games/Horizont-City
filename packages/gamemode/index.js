// Horizont-City Roleplay Server - Haupt-Gamemode
// Einstiegspunkt für den RageMP Roleplay Server

// Server-Konfiguration
const config = require('../../conf.json');

// Datenbank initialisieren
const { initialize } = require('./database');

// Migration zu MariaDB
const { migrateAll } = require('./migrate_to_mariadb');

// Fehlende Tabellen erstellen
const { createAll } = require('./create_missing_tables');

// Core-Tabellen erstellen
const { createAll: createCoreTables } = require('./create_core_tables');


// Core-Systeme laden
require('./systems/player_mariadb');
require('./systems/faction');
require('./systems/job');
require('./systems/vehicle');
require('./systems/economy');
require('./systems/bank');
require('./systems/animation');
require('./systems/emotion');
require('./systems/robbery');
require('./systems/housing');
require('./systems/phone');
require('./systems/health');
require('./systems/brand');
require('./systems/lumberjack');
require('./systems/construction');
require('./systems/alarm');
require('./systems/key');
require('./systems/parking');
require('./systems/garage');
require('./systems/casino');
require('./systems/sync');
require('./systems/weather');
require('./systems/ped');
require('./systems/blip');
require('./systems/npc');
require('./systems/disability');
require('./systems/agriculture');
require('./systems/drug');
require('./systems/alcohol');
require('./systems/oil_pump');
require('./systems/gps');
require('./systems/city_hall');
require('./systems/radio');
require('./systems/cinema');
require('./systems/sport_studio');
require('./systems/crime');
require('./systems/power_production');
require('./systems/tax');
require('./systems/tram');
require('./systems/driver_license');
require('./systems/shopping_center');
require('./systems/disaster');
require('./systems/news');
require('./systems/moderator');
require('./systems/club');
require('./systems/unemployment');
require('./systems/pension');
require('./systems/trading');
require('./systems/digital_records');
require('./systems/civil_registry');
require('./systems/family_life');
require('./systems/resource_collection');
require('./systems/production');
require('./systems/diamond_cutting');
require('./systems/gold_processing');
require('./systems/emerald_processing');
require('./systems/factory');
require('./systems/inventory');
require('./systems/event');
require('./systems/admin');

// Tutorial-Systeme laden
require('./systems/weapon_shop');
require('./systems/license_office');
require('./systems/tuning_shop');
require('./systems/character_creator');
require('./systems/enhanced_auth');

// Events laden
require('./events');

// Commands laden
require('./commands');

// Datenbank initialisieren
initialize().then(async () => {
    console.log('[DATABASE] Datenbank erfolgreich initialisiert');
    
    // Migration zu MariaDB ausführen
    try {
        await migrateAll();
        console.log('[MIGRATION] Migration zu MariaDB abgeschlossen');
        
        // Core-Tabellen erstellen
        await createCoreTables();
        console.log('[CORE_TABLES] Core-Tabellen erstellt');
        
        // Fehlende Tabellen erstellen
        await createAll();
        console.log('[TABLES] Fehlende Tabellen erstellt');
        
        // Player-System initialisieren nach Migration
        const playerSystem = require('./systems/player_mariadb');
        await playerSystem.init();
        console.log('[PLAYER] Player-System mit MariaDB initialisiert');
    } catch (error) {
        console.error('[MIGRATION] Fehler bei der Migration:', error);
    }
}).catch((error) => {
    console.error('[DATABASE] Fehler bei der Datenbank-Initialisierung:', error);
});

// Spieler Join Event
mp.events.add('playerJoin', (player) => {
    console.log(`[JOIN] ${player.name} hat den Server betreten`);
    
    // Willkommensnachricht
    player.outputChatBox('Willkommen auf Horizont-City Roleplay!');
    player.outputChatBox('Verwende /help für eine Liste der verfügbaren Commands.');
    
    // Spieler-Daten laden
    mp.events.call('player:load', player);
});

// Spieler Quit Event
mp.events.add('playerQuit', (player, exitType, reason) => {
    console.log(`[QUIT] ${player.name} hat den Server verlassen (${exitType}: ${reason})`);
    
    // Spieler-Daten speichern
    mp.events.call('player:save', player);
});

// Chat Event
mp.events.add('playerChat', (player, message) => {
    // Chat-Logik hier
    const playerName = player.name;
    const chatMessage = `[CHAT] ${playerName}: ${message}`;
    
    // Nachricht an alle Spieler senden
    mp.players.forEach(targetPlayer => {
        if (targetPlayer !== player) {
            targetPlayer.outputChatBox(chatMessage);
        }
    });
    
    console.log(chatMessage);
});

console.log('[GAMEMODE] Horizont-City Roleplay Server geladen!');
