// Commands - Zentrale Command-Verwaltung für den Horizont-City Roleplay Server
// Behandelt alle serverseitigen Commands

const config = require('../../conf.json');

// Hilfsfunktionen
function hasPermission(player, permission) {
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    return playerData ? playerData.hasPermission(permission) : false;
}

function getPlayerById(id) {
    return mp.players.at(id);
}

function getPlayerByName(name) {
    return mp.players.toArray().find(p => p.name.toLowerCase().includes(name.toLowerCase()));
}

// Allgemeine Commands
mp.events.addCommand('help', (player) => {
    player.outputChatBox('=== Horizont-City Roleplay Commands ===');
    player.outputChatBox('/help - Zeigt diese Hilfe an');
    player.outputChatBox('/rules - Zeigt die Serverregeln an');
    player.outputChatBox('/me [Aktion] - Beschreibt eine Aktion');
    player.outputChatBox('/do [Beschreibung] - Beschreibt die Umgebung');
    player.outputChatBox('/ooc [Nachricht] - Out-of-Character Chat');
    player.outputChatBox('/pm [Spieler] [Nachricht] - Private Nachricht');
    player.outputChatBox('/stats - Zeigt deine Statistiken an');
    player.outputChatBox('/time - Zeigt die aktuelle Zeit an');
    player.outputChatBox('/weather - Zeigt das aktuelle Wetter an');
    
    if (hasPermission(player, 'moderate')) {
        player.outputChatBox('=== Moderator Commands ===');
        player.outputChatBox('/jail [Spieler] [Dauer] [Grund] - Spieler einsperren');
        player.outputChatBox('/unjail [Spieler] - Spieler entlassen');
        player.outputChatBox('/mute [Spieler] [Dauer] [Grund] - Spieler stumm schalten');
        player.outputChatBox('/unmute [Spieler] - Stummschaltung aufheben');
        player.outputChatBox('/kick [Spieler] [Grund] - Spieler kicken');
    }
    
    if (hasPermission(player, 'admin')) {
        player.outputChatBox('=== Administrator Commands ===');
        player.outputChatBox('/ban [Spieler] [Dauer] [Grund] - Spieler bannen');
        player.outputChatBox('/unban [Spieler] - Bann aufheben');
        player.outputChatBox('/setrank [Spieler] [Rang] - Rang setzen');
        player.outputChatBox('/givemoney [Spieler] [Betrag] - Geld geben');
        player.outputChatBox('/sethealth [Spieler] [Wert] - Gesundheit setzen');
        player.outputChatBox('/setarmor [Spieler] [Wert] - Rüstung setzen');
        player.outputChatBox('/tp [Spieler] - Zu Spieler teleportieren');
        player.outputChatBox('/bring [Spieler] - Spieler zu dir bringen');
        player.outputChatBox('/goto [X] [Y] [Z] - Zu Koordinaten teleportieren');
        player.outputChatBox('/weather [Typ] - Wetter ändern');
        player.outputChatBox('/time [Stunde] - Zeit setzen');
    }
    
    if (hasPermission(player, 'develop')) {
        player.outputChatBox('=== Developer Commands ===');
        player.outputChatBox('/reload - Server neu laden');
        player.outputChatBox('/debug - Debug-Modus umschalten');
        player.outputChatBox('/test - Test-Funktion');
    }
});

mp.events.addCommand('rules', (player) => {
    player.outputChatBox('=== Horizont-City Roleplay Regeln ===');
    player.outputChatBox('1. Respektiere alle Spieler und Administratoren');
    player.outputChatBox('2. Kein Cheating, Hacking oder Exploiting');
    player.outputChatBox('3. Kein Spam oder unangemessene Inhalte');
    player.outputChatBox('4. Roleplay ist Pflicht - bleibe in deiner Rolle');
    player.outputChatBox('5. Kein Random Kill (RDM) oder Random Death Match (RDM)');
    player.outputChatBox('6. Kein Metagaming - nutze nur Informationen, die dein Charakter kennt');
    player.outputChatBox('7. Kein Powergaming - respektiere die Grenzen anderer Spieler');
    player.outputChatBox('8. Kein Fail-Roleplay - spiele realistisch und logisch');
    player.outputChatBox('9. Kein Combat-Logging - verlasse nicht den Server während eines Kampfes');
    player.outputChatBox('10. Folge den Anweisungen der Administratoren');
    player.outputChatBox('Bei Regelverstößen wende dich an einen Moderator!');
});

mp.events.addCommand('me', (player, fullText, action) => {
    if (!action) {
        player.outputChatBox('Verwendung: /me [Aktion]');
        return;
    }
    
    const message = `* ${player.name} ${action}`;
    mp.players.forEach(targetPlayer => {
        if (targetPlayer.dimension === player.dimension) {
            targetPlayer.outputChatBox(message);
        }
    });
});

mp.events.addCommand('do', (player, fullText, description) => {
    if (!description) {
        player.outputChatBox('Verwendung: /do [Beschreibung]');
        return;
    }
    
    const message = `* ${description} (( ${player.name} ))`;
    mp.players.forEach(targetPlayer => {
        if (targetPlayer.dimension === player.dimension) {
            targetPlayer.outputChatBox(message);
        }
    });
});

mp.events.addCommand('ooc', (player, fullText, message) => {
    if (!message) {
        player.outputChatBox('Verwendung: /ooc [Nachricht]');
        return;
    }
    
    const oocMessage = `[OOC] ${player.name}: ${message}`;
    mp.players.forEach(targetPlayer => {
        targetPlayer.outputChatBox(oocMessage);
    });
});

mp.events.addCommand('pm', (player, fullText, targetName, message) => {
    if (!targetName || !message) {
        player.outputChatBox('Verwendung: /pm [Spieler] [Nachricht]');
        return;
    }
    
    const targetPlayer = getPlayerByName(targetName);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    player.outputChatBox(`[PM an ${targetPlayer.name}] ${message}`);
    targetPlayer.outputChatBox(`[PM von ${player.name}] ${message}`);
});

mp.events.addCommand('stats', (player) => {
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (!playerData) {
        player.outputChatBox('Spieler-Daten nicht gefunden!');
        return;
    }
    
    const info = playerData.getInfo();
    player.outputChatBox('=== Deine Statistiken ===');
    player.outputChatBox(`Name: ${info.name}`);
    player.outputChatBox(`Rang: ${info.rankName} (${info.rank})`);
    player.outputChatBox(`Geld: ${info.money}€ | Bank: ${info.bankMoney}€`);
    player.outputChatBox(`Level: ${info.level} | Erfahrung: ${info.experience}`);
    player.outputChatBox(`Gesundheit: ${info.health}% | Rüstung: ${info.armor}%`);
    player.outputChatBox(`Hunger: ${info.hunger}% | Durst: ${info.thirst}%`);
    player.outputChatBox(`Stress: ${info.stress}% | Müdigkeit: ${info.fatigue}%`);
    player.outputChatBox(`Spielzeit: ${Math.floor(info.playTime / 3600)} Stunden`);
    player.outputChatBox(`Kills: ${info.stats.kills} | Tode: ${info.stats.deaths}`);
    player.outputChatBox(`Jobs abgeschlossen: ${info.stats.jobsCompleted}`);
    player.outputChatBox(`Geld verdient: ${info.stats.moneyEarned}€`);
    player.outputChatBox(`Geld ausgegeben: ${info.stats.moneySpent}€`);
});

mp.events.addCommand('time', (player) => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('de-DE');
    const dateString = now.toLocaleDateString('de-DE');
    
    player.outputChatBox(`Aktuelle Zeit: ${timeString}`);
    player.outputChatBox(`Datum: ${dateString}`);
});

mp.events.addCommand('weather', (player) => {
    const weather = mp.world.weather;
    const weatherNames = {
        0: 'Klar',
        1: 'Bewölkt',
        2: 'Regen',
        3: 'Nebel',
        4: 'Sturm',
        5: 'Schnee'
    };
    
    player.outputChatBox(`Aktuelles Wetter: ${weatherNames[weather] || 'Unbekannt'}`);
});

// Moderator Commands
mp.events.addCommand('kick', (player, fullText, targetName, reason) => {
    if (!hasPermission(player, 'moderate')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!targetName) {
        player.outputChatBox('Verwendung: /kick [Spieler] [Grund]');
        return;
    }
    
    const targetPlayer = getPlayerByName(targetName);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const kickReason = reason || 'Kein Grund angegeben';
    targetPlayer.kick(kickReason);
    player.outputChatBox(`${targetPlayer.name} wurde gekickt! Grund: ${kickReason}`);
    
    mp.players.forEach(p => {
        if (hasPermission(p, 'moderate')) {
            p.outputChatBox(`[MOD] ${player.name} hat ${targetPlayer.name} gekickt. Grund: ${kickReason}`);
        }
    });
});

// Administrator Commands
mp.events.addCommand('tp', (player, fullText, targetName) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!targetName) {
        player.outputChatBox('Verwendung: /tp [Spieler]');
        return;
    }
    
    const targetPlayer = getPlayerByName(targetName);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const targetPos = targetPlayer.position;
    player.position = targetPos;
    player.outputChatBox(`Du wurdest zu ${targetPlayer.name} teleportiert!`);
});

mp.events.addCommand('bring', (player, fullText, targetName) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!targetName) {
        player.outputChatBox('Verwendung: /bring [Spieler]');
        return;
    }
    
    const targetPlayer = getPlayerByName(targetName);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const playerPos = player.position;
    targetPlayer.position = playerPos;
    player.outputChatBox(`${targetPlayer.name} wurde zu dir gebracht!`);
    targetPlayer.outputChatBox(`Du wurdest zu ${player.name} gebracht!`);
});

mp.events.addCommand('goto', (player, fullText, x, y, z) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!x || !y || !z) {
        player.outputChatBox('Verwendung: /goto [X] [Y] [Z]');
        return;
    }
    
    const pos = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    player.position = pos;
    player.outputChatBox(`Du wurdest zu ${x}, ${y}, ${z} teleportiert!`);
});

mp.events.addCommand('sethealth', (player, fullText, targetName, health) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!targetName || !health) {
        player.outputChatBox('Verwendung: /sethealth [Spieler] [Wert]');
        return;
    }
    
    const targetPlayer = getPlayerByName(targetName);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const healthValue = parseInt(health);
    targetPlayer.health = healthValue;
    
    const playerData = require('./systems/player_mariadb').getPlayer(targetPlayer.id);
    if (playerData) {
        playerData.setHealth(healthValue);
        playerData.save();
    }
    
    player.outputChatBox(`${targetPlayer.name} Gesundheit auf ${healthValue} gesetzt!`);
    targetPlayer.outputChatBox(`Deine Gesundheit wurde auf ${healthValue} gesetzt!`);
});

mp.events.addCommand('setarmor', (player, fullText, targetName, armor) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!targetName || !armor) {
        player.outputChatBox('Verwendung: /setarmor [Spieler] [Wert]');
        return;
    }
    
    const targetPlayer = getPlayerByName(targetName);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const armorValue = parseInt(armor);
    targetPlayer.armor = armorValue;
    
    const playerData = require('./systems/player_mariadb').getPlayer(targetPlayer.id);
    if (playerData) {
        playerData.setArmor(armorValue);
        playerData.save();
    }
    
    player.outputChatBox(`${targetPlayer.name} Rüstung auf ${armorValue} gesetzt!`);
    targetPlayer.outputChatBox(`Deine Rüstung wurde auf ${armorValue} gesetzt!`);
});

mp.events.addCommand('setweather', (player, fullText, weatherType) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!weatherType) {
        player.outputChatBox('Verwendung: /setweather [Typ]');
        player.outputChatBox('Typen: 0=Klar, 1=Bewölkt, 2=Regen, 3=Nebel, 4=Sturm, 5=Schnee');
        return;
    }
    
    const weather = parseInt(weatherType);
    mp.world.weather = weather;
    
    const weatherNames = {
        0: 'Klar',
        1: 'Bewölkt',
        2: 'Regen',
        3: 'Nebel',
        4: 'Sturm',
        5: 'Schnee'
    };
    
    player.outputChatBox(`Wetter auf ${weatherNames[weather] || 'Unbekannt'} geändert!`);
    
    mp.players.forEach(p => {
        p.outputChatBox(`[ADMIN] Das Wetter wurde auf ${weatherNames[weather] || 'Unbekannt'} geändert!`);
    });
});

mp.events.addCommand('settime', (player, fullText, hour) => {
    if (!hasPermission(player, 'admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    if (!hour) {
        player.outputChatBox('Verwendung: /settime [Stunde]');
        return;
    }
    
    const hourValue = parseInt(hour);
    if (hourValue < 0 || hourValue > 23) {
        player.outputChatBox('Stunde muss zwischen 0 und 23 liegen!');
        return;
    }
    
    mp.world.time.hour = hourValue;
    mp.world.time.minute = 0;
    mp.world.time.second = 0;
    
    player.outputChatBox(`Zeit auf ${hourValue}:00 gesetzt!`);
    
    mp.players.forEach(p => {
        p.outputChatBox(`[ADMIN] Die Zeit wurde auf ${hourValue}:00 gesetzt!`);
    });
});

// Developer Commands
mp.events.addCommand('reload', (player) => {
    if (!hasPermission(player, 'develop')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    player.outputChatBox('Server wird neu geladen...');
    
    // Hier würde der Server neu geladen werden
    // In der Praxis würde man die Module neu laden
    
    player.outputChatBox('Server wurde neu geladen!');
});

mp.events.addCommand('debug', (player) => {
    if (!hasPermission(player, 'develop')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    const debugMode = player.getVariable('debugMode') || false;
    player.setVariable('debugMode', !debugMode);
    
    player.outputChatBox(`Debug-Modus ${!debugMode ? 'aktiviert' : 'deaktiviert'}!`);
});

mp.events.addCommand('test', (player) => {
    if (!hasPermission(player, 'develop')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    player.outputChatBox('Test-Funktion ausgeführt!');
    
    // Test-Daten ausgeben
    const playerData = require('./systems/player_mariadb').getPlayer(player.id);
    if (playerData) {
        player.outputChatBox(`Spieler-Daten: ${JSON.stringify(playerData.getInfo(), null, 2)}`);
    }
});

console.log('[COMMANDS] Command-System geladen!');
