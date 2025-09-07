// Moderator System - Moderations-System mit Verwaltung und Überwachung
// Behandelt alle Moderations-Funktionen für Horizont-City Roleplay

const moderatorSystem = {
    // Moderator-Ränge
    moderatorRanks: {
        HELPER: { name: 'Helper', level: 1, permissions: ['chat_moderation', 'basic_commands'] },
        MODERATOR: { name: 'Moderator', level: 2, permissions: ['chat_moderation', 'basic_commands', 'player_management'] },
        SENIOR_MODERATOR: { name: 'Senior Moderator', level: 3, permissions: ['chat_moderation', 'basic_commands', 'player_management', 'advanced_commands'] },
        ADMIN: { name: 'Admin', level: 4, permissions: ['all'] },
        SUPER_ADMIN: { name: 'Super Admin', level: 5, permissions: ['all'] }
    },
    
    // Moderations-Aktionen
    moderationActions: {
        WARN: 'warn',
        KICK: 'kick',
        BAN: 'ban',
        MUTE: 'mute',
        FREEZE: 'freeze',
        TELEPORT: 'teleport',
        HEAL: 'heal',
        GIVE_MONEY: 'give_money',
        TAKE_MONEY: 'take_money',
        GIVE_ITEM: 'give_item',
        TAKE_ITEM: 'take_item',
        SET_HEALTH: 'set_health',
        SET_ARMOR: 'set_armor',
        SET_MONEY: 'set_money',
        RESPAWN: 'respawn',
        SPECTATE: 'spectate',
        JAIL: 'jail',
        UNJAIL: 'unjail',
        SET_JOB: 'set_job',
        SET_RANK: 'set_rank',
        SET_FACTION: 'set_faction',
        CLEAR_INVENTORY: 'clear_inventory',
        RESET_PLAYER: 'reset_player',
        FORCE_QUIT: 'force_quit'
    },
    
    // Verstöße-Typen
    violationTypes: {
        SPAM: 'spam',
        INAPPROPRIATE_LANGUAGE: 'inappropriate_language',
        HARASSMENT: 'harassment',
        CHEATING: 'cheating',
        EXPLOITING: 'exploiting',
        RDM: 'rdm', // Random Death Match
        VDM: 'vdm', // Vehicle Death Match
        METAGAMING: 'metagaming',
        POWERGAMING: 'powergaming',
        FAIL_RP: 'fail_rp',
        COMBAT_LOGGING: 'combat_logging',
        ADVERTISING: 'advertising',
        SCAMMING: 'scamming',
        GRIEFING: 'griefing',
        HACKING: 'hacking',
        BUG_ABUSE: 'bug_abuse',
        INSULTING: 'insulting',
        RACISM: 'racism',
        SEXISM: 'sexism',
        HOMOPHOBIA: 'homophobia',
        THREATS: 'threats',
        INAPPROPRIATE_NAME: 'inappropriate_name',
        INAPPROPRIATE_SKIN: 'inappropriate_skin',
        INAPPROPRIATE_VEHICLE: 'inappropriate_vehicle',
        OTHER: 'other'
    },
    
    // Aktive Moderatoren
    activeModerators: new Map(),
    
    // Moderations-Logs
    moderationLogs: new Map(),
    
    // Verstöße
    violations: new Map(),
    
    // Moderations-System-Initialisierung
    init() {
        console.log('[MODERATOR] Moderations-System initialisiert');
        this.initializeModerators();
    },
    
    // Moderatoren initialisieren
    initializeModerators() {
        // Hier würden bestehende Moderatoren aus der Datenbank geladen
        console.log('[MODERATOR] Moderatoren initialisiert');
    },
    
    // Moderator werden
    becomeModerator(player, rank, permissions) {
        const moderatorRank = this.moderatorRanks[rank];
        if (!moderatorRank) {
            player.outputChatBox('Moderator-Rang nicht gefunden!');
            return false;
        }
        
        const moderatorId = `moderator_${player.id}_${Date.now()}`;
        const moderator = {
            id: moderatorId,
            playerId: player.id,
            name: player.name,
            rank: rank,
            config: moderatorRank,
            permissions: permissions || moderatorRank.permissions,
            status: 'active',
            actions: [],
            warnings: 0,
            kicks: 0,
            bans: 0,
            mutes: 0,
            created: Date.now()
        };
        
        this.activeModerators.set(moderatorId, moderator);
        
        player.moderator = true;
        player.moderatorId = moderatorId;
        player.moderatorRank = rank;
        player.moderatorPermissions = moderator.permissions;
        
        player.outputChatBox(`Du bist jetzt ${moderatorRank.name}!`);
        player.call('ui:show', 'ModeratorJoined', { moderator: moderator });
        
        console.log(`[MODERATOR] Spieler ${player.id} wurde Moderator`);
        return moderatorId;
    },
    
    // Verstoß melden
    reportViolation(player, targetId, violationType, description) {
        const target = mp.players.at(targetId);
        if (!target) {
            player.outputChatBox('Zielspieler nicht gefunden!');
            return false;
        }
        
        const violationId = `violation_${Date.now()}`;
        const violation = {
            id: violationId,
            reporterId: player.id,
            reporterName: player.name,
            targetId: targetId,
            targetName: target.name,
            violationType: violationType,
            description: description,
            timestamp: Date.now(),
            status: 'pending',
            moderatorId: null,
            action: null,
            created: Date.now()
        };
        
        this.violations.set(violationId, violation);
        
        // Moderatoren benachrichtigen
        this.notifyModerators(violation);
        
        player.outputChatBox('Verstoß gemeldet! Moderatoren wurden benachrichtigt.');
        player.call('ui:show', 'ViolationReported', { violation: violation });
        
        console.log(`[MODERATOR] Verstoß von ${player.id} gegen ${targetId} gemeldet`);
        return violationId;
    },
    
    // Moderatoren benachrichtigen
    notifyModerators(violation) {
        const moderators = Array.from(this.activeModerators.values()).filter(mod => 
            mod.status === 'active'
        );
        
        moderators.forEach(moderator => {
            const player = mp.players.at(moderator.playerId);
            if (player) {
                player.outputChatBox(`NEUE MELDUNG: ${violation.violationType} von ${violation.reporterName} gegen ${violation.targetName}`);
                player.call('ui:show', 'ModeratorAlert', { violation: violation });
            }
        });
    },
    
    // Moderations-Aktion durchführen
    performAction(moderator, targetId, action, reason, duration = null) {
        const target = mp.players.at(targetId);
        if (!target) {
            moderator.outputChatBox('Zielspieler nicht gefunden!');
            return false;
        }
        
        const actionId = `action_${moderator.id}_${Date.now()}`;
        const moderationAction = {
            id: actionId,
            moderatorId: moderator.id,
            moderatorName: moderator.name,
            targetId: targetId,
            targetName: target.name,
            action: action,
            reason: reason,
            duration: duration,
            timestamp: Date.now(),
            status: 'completed',
            created: Date.now()
        };
        
        this.moderationLogs.set(actionId, moderationAction);
        moderator.actions.push(actionId);
        
        // Aktion ausführen
        this.executeAction(target, action, reason, duration);
        
        // Statistiken aktualisieren
        this.updateModeratorStats(moderator, action);
        
        moderator.outputChatBox(`Aktion ${action} gegen ${target.name} ausgeführt!`);
        target.outputChatBox(`Moderations-Aktion: ${action} - Grund: ${reason}`);
        
        console.log(`[MODERATOR] Aktion ${action} von ${moderator.id} gegen ${targetId}`);
        return actionId;
    },
    
    // Aktion ausführen
    executeAction(target, action, reason, duration) {
        switch (action) {
            case 'warn':
                target.warnings = (target.warnings || 0) + 1;
                target.outputChatBox(`WARNUNG: ${reason}`);
                break;
                
            case 'kick':
                target.kick(reason);
                break;
                
            case 'ban':
                target.ban(reason, duration);
                break;
                
            case 'mute':
                target.muted = true;
                target.muteEnd = Date.now() + (duration * 1000);
                target.outputChatBox(`Du wurdest für ${duration} Sekunden gemutet!`);
                break;
                
            case 'freeze':
                target.freezePosition = true;
                target.outputChatBox('Du wurdest eingefroren!');
                break;
                
            case 'teleport':
                // Teleportation würde hier implementiert werden
                target.outputChatBox('Du wurdest teleportiert!');
                break;
                
            case 'heal':
                target.health = 100;
                target.armor = 100;
                target.outputChatBox('Du wurdest geheilt!');
                break;
                
            case 'give_money':
                target.money += 1000;
                target.outputChatBox('Du hast $1000 erhalten!');
                break;
                
            case 'take_money':
                target.money = Math.max(0, target.money - 1000);
                target.outputChatBox('Dir wurden $1000 abgezogen!');
                break;
                
            case 'jail':
                target.position = new mp.Vector3(1641.0, 2570.0, 45.0);
                target.outputChatBox('Du wurdest ins Gefängnis geschickt!');
                break;
                
            case 'unjail':
                target.position = new mp.Vector3(1000, 2000, 30);
                target.outputChatBox('Du wurdest aus dem Gefängnis entlassen!');
                break;
                
            case 'respawn':
                target.spawn(new mp.Vector3(1000, 2000, 30));
                target.outputChatBox('Du wurdest respawnt!');
                break;
                
            case 'clear_inventory':
                target.inventory = [];
                target.outputChatBox('Dein Inventar wurde geleert!');
                break;
                
            case 'reset_player':
                target.health = 100;
                target.armor = 0;
                target.money = 1000;
                target.inventory = [];
                target.outputChatBox('Du wurdest zurückgesetzt!');
                break;
        }
    },
    
    // Moderator-Statistiken aktualisieren
    updateModeratorStats(moderator, action) {
        switch (action) {
            case 'warn':
                moderator.warnings++;
                break;
            case 'kick':
                moderator.kicks++;
                break;
            case 'ban':
                moderator.bans++;
                break;
            case 'mute':
                moderator.mutes++;
                break;
        }
    },
    
    // Moderations-Log anzeigen
    showModerationLog(player, targetId) {
        const logs = Array.from(this.moderationLogs.values()).filter(log => 
            log.targetId === targetId
        );
        
        if (logs.length === 0) {
            player.outputChatBox('Keine Moderations-Logs für diesen Spieler gefunden!');
            return;
        }
        
        player.outputChatBox(`=== Moderations-Log für ${logs[0].targetName} ===`);
        logs.forEach(log => {
            player.outputChatBox(`${log.timestamp}: ${log.action} von ${log.moderatorName} - ${log.reason}`);
        });
    },
    
    // Moderator-Statistiken
    getModeratorStats(moderatorId) {
        const moderator = this.activeModerators.get(moderatorId);
        if (!moderator) return null;
        
        return {
            name: moderator.name,
            rank: moderator.rank,
            actions: moderator.actions.length,
            warnings: moderator.warnings,
            kicks: moderator.kicks,
            bans: moderator.bans,
            mutes: moderator.mutes
        };
    },
    
    // Moderations-System-Statistiken
    getStatistics() {
        return {
            totalModerators: this.activeModerators.size,
            totalLogs: this.moderationLogs.size,
            totalViolations: this.violations.size,
            activeModerators: Array.from(this.activeModerators.values()).filter(mod => mod.status === 'active').length
        };
    }
};

// Events
mp.events.add('moderator:report', (player, targetId, violationType, description) => {
    moderatorSystem.reportViolation(player, targetId, violationType, description);
});

mp.events.add('moderator:action', (player, targetId, action, reason, duration) => {
    const moderator = moderatorSystem.activeModerators.get(player.moderatorId);
    if (moderator) {
        moderatorSystem.performAction(moderator, targetId, action, reason, duration);
    }
});

// Commands
mp.events.addCommand('mod', (player, fullText, action, targetId, reason) => {
    if (!player.moderator) {
        player.outputChatBox('Du bist kein Moderator!');
        return;
    }
    
    const moderator = moderatorSystem.activeModerators.get(player.moderatorId);
    if (!moderator) {
        player.outputChatBox('Moderator-Profil nicht gefunden!');
        return;
    }
    
    if (!action) {
        player.outputChatBox('Verwendung: /mod [warn|kick|ban|mute|freeze|heal|jail|unjail] [SpielerID] [Grund]');
        return;
    }
    
    if (!targetId) {
        player.outputChatBox('Spieler-ID erforderlich!');
        return;
    }
    
    const target = mp.players.at(parseInt(targetId));
    if (!target) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }
    
    const reasonText = reason || 'Kein Grund angegeben';
    
    switch (action.toLowerCase()) {
        case 'warn':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'warn', reasonText);
            break;
        case 'kick':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'kick', reasonText);
            break;
        case 'ban':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'ban', reasonText, 3600);
            break;
        case 'mute':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'mute', reasonText, 300);
            break;
        case 'freeze':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'freeze', reasonText);
            break;
        case 'heal':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'heal', reasonText);
            break;
        case 'jail':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'jail', reasonText);
            break;
        case 'unjail':
            moderatorSystem.performAction(moderator, parseInt(targetId), 'unjail', reasonText);
            break;
    }
});

mp.events.addCommand('report', (player, fullText, targetId, violationType, description) => {
    if (!targetId || !violationType) {
        player.outputChatBox('Verwendung: /report [SpielerID] [Verstoß-Typ] [Beschreibung]');
        player.outputChatBox('Verfügbare Typen: spam, inappropriate_language, harassment, cheating, rdm, vdm, fail_rp');
        return;
    }
    
    const desc = description || 'Keine Beschreibung angegeben';
    moderatorSystem.reportViolation(player, parseInt(targetId), violationType, desc);
});

mp.events.addCommand('modstats', (player) => {
    if (!player.moderator) {
        player.outputChatBox('Du bist kein Moderator!');
        return;
    }
    
    const stats = moderatorSystem.getModeratorStats(player.moderatorId);
    if (stats) {
        player.outputChatBox('=== Moderator-Statistiken ===');
        player.outputChatBox(`Rang: ${stats.rank}`);
        player.outputChatBox(`Aktionen: ${stats.actions}`);
        player.outputChatBox(`Warnungen: ${stats.warnings}`);
        player.outputChatBox(`Kicks: ${stats.kicks}`);
        player.outputChatBox(`Bans: ${stats.bans}`);
        player.outputChatBox(`Mutes: ${stats.mutes}`);
    }
});

// Moderations-System initialisieren
moderatorSystem.init();

module.exports = moderatorSystem;
