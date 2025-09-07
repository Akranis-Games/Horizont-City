// Admin System - Admin-System
// Behandelt alle Admin-Funktionen für Horizont-City Roleplay

const adminSystem = {
    // Admin-Ränge (gemäß ToDo.txt)
    adminRanks: {
        0: 'Player',
        1: 'Guide',
        2: 'Moderator',
        3: 'Administrator',
        4: 'High Administrator',
        5: 'Manager',
        6: 'Developer',
        7: 'Lead Developer',
        8: 'Project Founder'
    },
    
    // Admin-Berechtigungen
    permissions: {
        // Grundlegende Berechtigungen
        basic: {
            kick: [2, 3, 4, 5, 6, 7, 8],
            ban: [3, 4, 5, 6, 7, 8],
            mute: [2, 3, 4, 5, 6, 7, 8],
            warn: [2, 3, 4, 5, 6, 7, 8],
            spectate: [2, 3, 4, 5, 6, 7, 8],
            teleport: [3, 4, 5, 6, 7, 8],
            goto: [3, 4, 5, 6, 7, 8],
            bring: [3, 4, 5, 6, 7, 8]
        },
        
        // Erweiterte Berechtigungen
        advanced: {
            freeze: [3, 4, 5, 6, 7, 8],
            unfreeze: [3, 4, 5, 6, 7, 8],
            heal: [3, 4, 5, 6, 7, 8],
            armor: [3, 4, 5, 6, 7, 8],
            giveWeapon: [4, 5, 6, 7, 8],
            removeWeapon: [4, 5, 6, 7, 8],
            giveMoney: [4, 5, 6, 7, 8],
            removeMoney: [4, 5, 6, 7, 8],
            setLevel: [5, 6, 7, 8],
            setJob: [5, 6, 7, 8],
            setFaction: [5, 6, 7, 8]
        },
        
        // Management-Berechtigungen
        management: {
            restartServer: [6, 7, 8],
            stopServer: [7, 8],
            updateConfig: [6, 7, 8],
            managePlugins: [6, 7, 8],
            viewLogs: [4, 5, 6, 7, 8],
            clearLogs: [5, 6, 7, 8],
            backupData: [6, 7, 8],
            restoreData: [7, 8]
        },
        
        // Entwickler-Berechtigungen
        developer: {
            executeCode: [6, 7, 8],
            debugMode: [6, 7, 8],
            testCommands: [6, 7, 8],
            performanceMonitor: [6, 7, 8],
            databaseAccess: [6, 7, 8],
            apiAccess: [6, 7, 8]
        }
    },
    
    // Admin-Logs
    adminLogs: [],
    
    // Admin-Sessions
    adminSessions: new Map(),
    
    // Admin-Initialisierung
    init() {
        console.log('[ADMIN] Admin-System initialisiert');
        this.loadAdminData();
    },
    
    // Admin-Daten laden
    loadAdminData() {
        // Hier würden Admin-Daten aus der Datenbank geladen werden
        console.log('[ADMIN] Admin-Daten geladen');
    },
    
    // Berechtigung prüfen
    hasPermission(player, permission) {
        const playerRank = player.getVariable('adminRank') || 0;
        
        // Alle Berechtigungen durchsuchen
        for (const category of Object.values(this.permissions)) {
            if (category[permission] && category[permission].includes(playerRank)) {
                return true;
            }
        }
        
        return false;
    },
    
    // Spieler kicken
    kickPlayer(admin, targetId, reason = 'Kein Grund angegeben') {
        if (!this.hasPermission(admin, 'kick')) {
            admin.outputChatBox('Du hast keine Berechtigung zum Kicken!');
            return false;
        }
        
        const target = mp.players.at(targetId);
        if (!target) {
            admin.outputChatBox('Spieler nicht gefunden!');
            return false;
        }
        
        // Log erstellen
        this.logAdminAction(admin, 'kick', target.name, reason);
        
        // Spieler kicken
        target.kick(reason);
        
        // Alle Admins benachrichtigen
        this.notifyAdmins(`${admin.name} hat ${target.name} gekickt. Grund: ${reason}`);
        
        admin.outputChatBox(`${target.name} wurde gekickt!`);
        return true;
    },
    
    // Spieler bannen
    banPlayer(admin, targetId, duration, reason = 'Kein Grund angegeben') {
        if (!this.hasPermission(admin, 'ban')) {
            admin.outputChatBox('Du hast keine Berechtigung zum Bannen!');
            return false;
        }
        
        const target = mp.players.at(targetId);
        if (!target) {
            admin.outputChatBox('Spieler nicht gefunden!');
            return false;
        }
        
        // Ban-Daten
        const banData = {
            playerId: targetId,
            playerName: target.name,
            adminId: admin.id,
            adminName: admin.name,
            reason: reason,
            duration: duration,
            startTime: Date.now(),
            endTime: duration > 0 ? Date.now() + duration : null,
            permanent: duration === 0
        };
        
        // Log erstellen
        this.logAdminAction(admin, 'ban', target.name, reason);
        
        // Spieler bannen
        target.kick(`Du wurdest gebannt! Grund: ${reason} | Dauer: ${duration > 0 ? this.formatDuration(duration) : 'Permanent'}`);
        
        // Ban in Datenbank speichern
        this.saveBan(banData);
        
        // Alle Admins benachrichtigen
        this.notifyAdmins(`${admin.name} hat ${target.name} gebannt. Grund: ${reason}`);
        
        admin.outputChatBox(`${target.name} wurde gebannt!`);
        return true;
    },
    
    // Spieler stummschalten
    mutePlayer(admin, targetId, duration, reason = 'Kein Grund angegeben') {
        if (!this.hasPermission(admin, 'mute')) {
            admin.outputChatBox('Du hast keine Berechtigung zum Stummschalten!');
            return false;
        }
        
        const target = mp.players.at(targetId);
        if (!target) {
            admin.outputChatBox('Spieler nicht gefunden!');
            return false;
        }
        
        // Mute-Daten
        const muteData = {
            playerId: targetId,
            duration: duration,
            startTime: Date.now(),
            endTime: Date.now() + duration,
            reason: reason
        };
        
        // Log erstellen
        this.logAdminAction(admin, 'mute', target.name, reason);
        
        // Spieler stummschalten
        target.setVariable('muted', true);
        target.setVariable('muteData', muteData);
        
        // Alle Admins benachrichtigen
        this.notifyAdmins(`${admin.name} hat ${target.name} stummgeschaltet. Grund: ${reason}`);
        
        admin.outputChatBox(`${target.name} wurde stummgeschaltet!`);
        return true;
    },
    
    // Spieler warnen
    warnPlayer(admin, targetId, reason = 'Kein Grund angegeben') {
        if (!this.hasPermission(admin, 'warn')) {
            admin.outputChatBox('Du hast keine Berechtigung zum Warnen!');
            return false;
        }
        
        const target = mp.players.at(targetId);
        if (!target) {
            admin.outputChatBox('Spieler nicht gefunden!');
            return false;
        }
        
        // Warn-Daten
        const warnData = {
            playerId: targetId,
            adminId: admin.id,
            reason: reason,
            timestamp: Date.now()
        };
        
        // Log erstellen
        this.logAdminAction(admin, 'warn', target.name, reason);
        
        // Warnung hinzufügen
        this.addWarning(targetId, warnData);
        
        // Spieler benachrichtigen
        target.outputChatBox(`Du wurdest von ${admin.name} gewarnt! Grund: ${reason}`);
        
        // Alle Admins benachrichtigen
        this.notifyAdmins(`${admin.name} hat ${target.name} gewarnt. Grund: ${reason}`);
        
        admin.outputChatBox(`${target.name} wurde gewarnt!`);
        return true;
    },
    
    // Teleportation
    teleportPlayer(admin, targetId, x, y, z) {
        if (!this.hasPermission(admin, 'teleport')) {
            admin.outputChatBox('Du hast keine Berechtigung zum Teleportieren!');
            return false;
        }
        
        const target = mp.players.at(targetId);
        if (!target) {
            admin.outputChatBox('Spieler nicht gefunden!');
            return false;
        }
        
        // Teleportation
        target.position = new mp.Vector3(x, y, z);
        
        // Log erstellen
        this.logAdminAction(admin, 'teleport', target.name, `zu ${x}, ${y}, ${z}`);
        
        admin.outputChatBox(`${target.name} wurde teleportiert!`);
        return true;
    },
    
    // Spieler zu Admin bringen
    bringPlayer(admin, targetId) {
        if (!this.hasPermission(admin, 'bring')) {
            admin.outputChatBox('Du hast keine Berechtigung zum Bringen!');
            return false;
        }
        
        const target = mp.players.at(targetId);
        if (!target) {
            admin.outputChatBox('Spieler nicht gefunden!');
            return false;
        }
        
        // Spieler zu Admin bringen
        target.position = admin.position;
        
        // Log erstellen
        this.logAdminAction(admin, 'bring', target.name, 'zu Admin');
        
        admin.outputChatBox(`${target.name} wurde zu dir gebracht!`);
        return true;
    },
    
    // Admin-Log erstellen
    logAdminAction(admin, action, target, reason) {
        const logEntry = {
            id: Date.now(),
            adminId: admin.id,
            adminName: admin.name,
            action: action,
            target: target,
            reason: reason,
            timestamp: Date.now(),
            ip: admin.ip
        };
        
        this.adminLogs.push(logEntry);
        
        // Log in Datei speichern
        this.saveLog(logEntry);
        
        console.log(`[ADMIN] ${admin.name} ${action} ${target}: ${reason}`);
    },
    
    // Admins benachrichtigen
    notifyAdmins(message) {
        mp.players.forEach(player => {
            if (this.hasPermission(player, 'viewLogs')) {
                player.outputChatBox(`[ADMIN] ${message}`);
            }
        });
    },
    
    // Warnung hinzufügen
    addWarning(playerId, warnData) {
        // Hier würden Warnungen in der Datenbank gespeichert werden
        console.log(`[ADMIN] Warnung für Spieler ${playerId} hinzugefügt`);
    },
    
    // Ban speichern
    saveBan(banData) {
        // Hier würde der Ban in der Datenbank gespeichert werden
        console.log(`[ADMIN] Ban für Spieler ${banData.playerId} gespeichert`);
    },
    
    // Log speichern
    saveLog(logEntry) {
        // Hier würde das Log in einer Datei gespeichert werden
        console.log(`[ADMIN] Log gespeichert: ${logEntry.action}`);
    },
    
    // Dauer formatieren
    formatDuration(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}d ${hours % 24}h`;
        if (hours > 0) return `${hours}h ${minutes % 60}m`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    },
    
    // Admin-Statistiken
    getStatistics() {
        return {
            totalLogs: this.adminLogs.length,
            activeAdmins: Array.from(mp.players).filter(p => this.hasPermission(p, 'kick')).length,
            totalBans: this.adminLogs.filter(log => log.action === 'ban').length,
            totalKicks: this.adminLogs.filter(log => log.action === 'kick').length,
            totalWarns: this.adminLogs.filter(log => log.action === 'warn').length
        };
    }
};

// Events
mp.events.add('admin:kick', (admin, targetId, reason) => {
    adminSystem.kickPlayer(admin, targetId, reason);
});

mp.events.add('admin:ban', (admin, targetId, duration, reason) => {
    adminSystem.banPlayer(admin, targetId, duration, reason);
});

mp.events.add('admin:mute', (admin, targetId, duration, reason) => {
    adminSystem.mutePlayer(admin, targetId, duration, reason);
});

mp.events.add('admin:warn', (admin, targetId, reason) => {
    adminSystem.warnPlayer(admin, targetId, reason);
});

mp.events.add('admin:teleport', (admin, targetId, x, y, z) => {
    adminSystem.teleportPlayer(admin, targetId, x, y, z);
});

mp.events.add('admin:bring', (admin, targetId) => {
    adminSystem.bringPlayer(admin, targetId);
});

// Commands
mp.events.addCommand('kick', (player, fullText, targetId, ...reason) => {
    const reasonText = reason.join(' ') || 'Kein Grund angegeben';
    adminSystem.kickPlayer(player, parseInt(targetId), reasonText);
});

mp.events.addCommand('ban', (player, fullText, targetId, duration, ...reason) => {
    const reasonText = reason.join(' ') || 'Kein Grund angegeben';
    const durationMs = parseInt(duration) * 1000; // Minuten zu Millisekunden
    adminSystem.banPlayer(player, parseInt(targetId), durationMs, reasonText);
});

mp.events.addCommand('mute', (player, fullText, targetId, duration, ...reason) => {
    const reasonText = reason.join(' ') || 'Kein Grund angegeben';
    const durationMs = parseInt(duration) * 1000; // Minuten zu Millisekunden
    adminSystem.mutePlayer(player, parseInt(targetId), durationMs, reasonText);
});

mp.events.addCommand('warn', (player, fullText, targetId, ...reason) => {
    const reasonText = reason.join(' ') || 'Kein Grund angegeben';
    adminSystem.warnPlayer(player, parseInt(targetId), reasonText);
});

mp.events.addCommand('tp', (player, fullText, targetId, x, y, z) => {
    adminSystem.teleportPlayer(player, parseInt(targetId), parseFloat(x), parseFloat(y), parseFloat(z));
});

mp.events.addCommand('bring', (player, fullText, targetId) => {
    adminSystem.bringPlayer(player, parseInt(targetId));
});

mp.events.addCommand('goto', (player, fullText, targetId) => {
    const target = mp.players.at(parseInt(targetId));
    if (target) {
        player.position = target.position;
        player.outputChatBox(`Du wurdest zu ${target.name} teleportiert!`);
    } else {
        player.outputChatBox('Spieler nicht gefunden!');
    }
});

mp.events.addCommand('adminstats', (player) => {
    if (!adminSystem.hasPermission(player, 'viewLogs')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }
    
    const stats = adminSystem.getStatistics();
    player.outputChatBox('=== Admin Statistiken ===');
    player.outputChatBox(`Gesamt Logs: ${stats.totalLogs}`);
    player.outputChatBox(`Aktive Admins: ${stats.activeAdmins}`);
    player.outputChatBox(`Bans: ${stats.totalBans}`);
    player.outputChatBox(`Kicks: ${stats.totalKicks}`);
    player.outputChatBox(`Warnungen: ${stats.totalWarns}`);
});

// Admin-System initialisieren
adminSystem.init();

module.exports = adminSystem;
