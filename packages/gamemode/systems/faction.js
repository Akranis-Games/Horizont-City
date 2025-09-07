// Faction System - Fraktions- und Gang-System mit Rängen und Berechtigungen
// Implementiert das umfassende Faction-System für Horizont-City

const config = require('../../../conf.json');

// Faction-Datenbank
const factions = new Map();
const factionMembers = new Map();

// Faction-Ränge (0 = niedrigster, 10 = höchster)
const FACTION_RANKS = {
    0: { name: 'Rekrut', permissions: ['chat', 'basic'] },
    1: { name: 'Mitglied', permissions: ['chat', 'basic', 'invite'] },
    2: { name: 'Soldat', permissions: ['chat', 'basic', 'invite', 'kick'] },
    3: { name: 'Korporal', permissions: ['chat', 'basic', 'invite', 'kick', 'promote'] },
    4: { name: 'Sergeant', permissions: ['chat', 'basic', 'invite', 'kick', 'promote', 'territory'] },
    5: { name: 'Leutnant', permissions: ['chat', 'basic', 'invite', 'kick', 'promote', 'territory', 'bank'] },
    6: { name: 'Hauptmann', permissions: ['chat', 'basic', 'invite', 'kick', 'promote', 'territory', 'bank', 'war'] },
    7: { name: 'Major', permissions: ['chat', 'basic', 'invite', 'kick', 'promote', 'territory', 'bank', 'war', 'alliance'] },
    8: { name: 'Oberst', permissions: ['chat', 'basic', 'invite', 'kick', 'promote', 'territory', 'bank', 'war', 'alliance', 'settings'] },
    9: { name: 'General', permissions: ['chat', 'basic', 'invite', 'kick', 'promote', 'territory', 'bank', 'war', 'alliance', 'settings', 'delete'] },
    10: { name: 'Führer', permissions: ['all'] }
};

// Faction-Klassen
class Faction {
    constructor(id, name, type, leader, color, description) {
        this.id = id;
        this.name = name;
        this.type = type; // 'gang', 'police', 'ems', 'government', 'business'
        this.leader = leader;
        this.color = color;
        this.description = description;
        this.members = new Map();
        this.territories = [];
        this.bank = 0;
        this.createdAt = new Date();
        this.settings = {
            inviteOnly: false,
            maxMembers: config.factions?.maxMembers || 50,
            allowWar: true,
            allowAlliance: true
        };
        this.alliances = [];
        this.wars = [];
        this.rankNames = FACTION_RANKS;
    }

    // Mitglied hinzufügen
    addMember(player, rank = 0) {
        if (this.members.size >= this.settings.maxMembers) {
            return { success: false, message: 'Faction ist voll!' };
        }

        const memberData = {
            id: player.id,
            name: player.name,
            rank: rank,
            joinedAt: new Date(),
            permissions: this.getRankPermissions(rank),
            isOnline: true
        };

        this.members.set(player.id, memberData);
        factionMembers.set(player.id, this.id);
        
        return { success: true, message: `${player.name} wurde zur Faction hinzugefügt!` };
    }

    // Mitglied entfernen
    removeMember(playerId) {
        if (this.members.has(playerId)) {
            this.members.delete(playerId);
            factionMembers.delete(playerId);
            return { success: true, message: 'Mitglied wurde entfernt!' };
        }
        return { success: false, message: 'Mitglied nicht gefunden!' };
    }

    // Rang ändern
    changeRank(playerId, newRank) {
        if (this.members.has(playerId)) {
            const member = this.members.get(playerId);
            member.rank = newRank;
            member.permissions = this.getRankPermissions(newRank);
            return { success: true, message: `Rang wurde auf ${this.rankNames[newRank].name} geändert!` };
        }
        return { success: false, message: 'Mitglied nicht gefunden!' };
    }

    // Berechtigungen für Rang abrufen
    getRankPermissions(rank) {
        return this.rankNames[rank] ? this.rankNames[rank].permissions : [];
    }

    // Berechtigung prüfen
    hasPermission(playerId, permission) {
        const member = this.members.get(playerId);
        if (!member) return false;
        
        return member.permissions.includes('all') || member.permissions.includes(permission);
    }

    // Territorium hinzufügen
    addTerritory(territory) {
        this.territories.push(territory);
    }

    // Krieg erklären
    declareWar(targetFactionId) {
        if (!this.settings.allowWar) {
            return { success: false, message: 'Kriege sind nicht erlaubt!' };
        }

        const targetFaction = factions.get(targetFactionId);
        if (!targetFaction) {
            return { success: false, message: 'Ziel-Faction nicht gefunden!' };
        }

        this.wars.push({
            targetFactionId: targetFactionId,
            declaredAt: new Date(),
            status: 'active'
        });

        return { success: true, message: `Krieg gegen ${targetFaction.name} erklärt!` };
    }

    // Allianz schließen
    createAlliance(targetFactionId) {
        if (!this.settings.allowAlliance) {
            return { success: false, message: 'Allianzen sind nicht erlaubt!' };
        }

        const targetFaction = factions.get(targetFactionId);
        if (!targetFaction) {
            return { success: false, message: 'Ziel-Faction nicht gefunden!' };
        }

        this.alliances.push({
            targetFactionId: targetFactionId,
            createdAt: new Date(),
            status: 'active'
        });

        return { success: true, message: `Allianz mit ${targetFaction.name} geschlossen!` };
    }

    // Faction-Informationen abrufen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            leader: this.leader,
            color: this.color,
            description: this.description,
            memberCount: this.members.size,
            maxMembers: this.settings.maxMembers,
            bank: this.bank,
            territories: this.territories.length,
            alliances: this.alliances.length,
            wars: this.wars.length
        };
    }
}

// Faction-Manager
class FactionManager {
    constructor() {
        this.factions = factions;
        this.members = factionMembers;
    }

    // Faction erstellen
    createFaction(name, type, leader, color, description) {
        const id = this.generateFactionId();
        const faction = new Faction(id, name, type, leader, color, description);
        
        this.factions.set(id, faction);
        this.members.set(leader.id, id);
        
        // Führer als Mitglied hinzufügen
        faction.addMember(leader, 10);
        
        return { success: true, faction: faction, message: `Faction '${name}' wurde erstellt!` };
    }

    // Faction löschen
    deleteFaction(factionId, requesterId) {
        const faction = this.factions.get(factionId);
        if (!faction) {
            return { success: false, message: 'Faction nicht gefunden!' };
        }

        // Nur Führer kann Faction löschen
        if (faction.leader.id !== requesterId) {
            return { success: false, message: 'Nur der Führer kann die Faction löschen!' };
        }

        // Alle Mitglieder entfernen
        faction.members.forEach((member, playerId) => {
            this.members.delete(playerId);
        });

        this.factions.delete(factionId);
        return { success: true, message: 'Faction wurde gelöscht!' };
    }

    // Spieler-Faction abrufen
    getPlayerFaction(playerId) {
        const factionId = this.members.get(playerId);
        return factionId ? this.factions.get(factionId) : null;
    }

    // Faction-Liste abrufen
    getAllFactions() {
        const factionList = [];
        this.factions.forEach(faction => {
            factionList.push(faction.getInfo());
        });
        return factionList;
    }

    // Eindeutige Faction-ID generieren
    generateFactionId() {
        return 'faction_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Globale Instanz
const factionManager = new FactionManager();

// Events
mp.events.add('faction:create', (player, name, type, color, description) => {
    const result = factionManager.createFaction(name, type, player, color, description);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('faction:updateUI', player, result.faction.getInfo());
    }
});

mp.events.add('faction:join', (player, factionId) => {
    const faction = factionManager.factions.get(factionId);
    if (!faction) {
        player.outputChatBox('Faction nicht gefunden!');
        return;
    }

    const result = faction.addMember(player);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('faction:updateUI', player, faction.getInfo());
    }
});

mp.events.add('faction:leave', (player) => {
    const faction = factionManager.getPlayerFaction(player.id);
    if (!faction) {
        player.outputChatBox('Du bist in keiner Faction!');
        return;
    }

    const result = faction.removeMember(player.id);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('faction:updateUI', player, null);
    }
});

mp.events.add('faction:promote', (player, targetPlayerId, newRank) => {
    const faction = factionManager.getPlayerFaction(player.id);
    if (!faction) {
        player.outputChatBox('Du bist in keiner Faction!');
        return;
    }

    if (!faction.hasPermission(player.id, 'promote')) {
        player.outputChatBox('Du hast keine Berechtigung zum Befördern!');
        return;
    }

    const result = faction.changeRank(targetPlayerId, newRank);
    player.outputChatBox(result.message);
});

mp.events.add('faction:kick', (player, targetPlayerId) => {
    const faction = factionManager.getPlayerFaction(player.id);
    if (!faction) {
        player.outputChatBox('Du bist in keiner Faction!');
        return;
    }

    if (!faction.hasPermission(player.id, 'kick')) {
        player.outputChatBox('Du hast keine Berechtigung zum Kicken!');
        return;
    }

    const result = faction.removeMember(targetPlayerId);
    player.outputChatBox(result.message);
});

mp.events.add('faction:info', (player, factionId) => {
    const faction = factionManager.factions.get(factionId);
    if (!faction) {
        player.outputChatBox('Faction nicht gefunden!');
        return;
    }

    const info = faction.getInfo();
    player.outputChatBox(`=== ${info.name} ===`);
    player.outputChatBox(`Typ: ${info.type}`);
    player.outputChatBox(`Mitglieder: ${info.memberCount}/${info.maxMembers}`);
    player.outputChatBox(`Bank: ${info.bank}€`);
    player.outputChatBox(`Territorien: ${info.territories}`);
    player.outputChatBox(`Allianzen: ${info.alliances}`);
    player.outputChatBox(`Kriege: ${info.wars}`);
});

// Commands
mp.events.addCommand('fcreate', (player, fullText, name, type, color, description) => {
    if (!name || !type) {
        player.outputChatBox('Verwendung: /fcreate [Name] [Typ] [Farbe] [Beschreibung]');
        player.outputChatBox('Typen: gang, police, ems, government, business');
        return;
    }

    const validTypes = ['gang', 'police', 'ems', 'government', 'business'];
    if (!validTypes.includes(type.toLowerCase())) {
        player.outputChatBox('Ungültiger Faction-Typ!');
        return;
    }

    mp.events.call('faction:create', player, name, type.toLowerCase(), color || '#FF0000', description || '');
});

mp.events.addCommand('fjoin', (player, fullText, factionId) => {
    if (!factionId) {
        player.outputChatBox('Verwendung: /fjoin [Faction-ID]');
        return;
    }

    mp.events.call('faction:join', player, factionId);
});

mp.events.addCommand('fleave', (player) => {
    mp.events.call('faction:leave', player);
});

mp.events.addCommand('fpromote', (player, fullText, targetPlayerId, newRank) => {
    if (!targetPlayerId || !newRank) {
        player.outputChatBox('Verwendung: /fpromote [Spieler-ID] [Rang]');
        return;
    }

    mp.events.call('faction:promote', player, parseInt(targetPlayerId), parseInt(newRank));
});

mp.events.addCommand('fkick', (player, fullText, targetPlayerId) => {
    if (!targetPlayerId) {
        player.outputChatBox('Verwendung: /fkick [Spieler-ID]');
        return;
    }

    mp.events.call('faction:kick', player, parseInt(targetPlayerId));
});

mp.events.addCommand('finfo', (player, fullText, factionId) => {
    if (!factionId) {
        player.outputChatBox('Verwendung: /finfo [Faction-ID]');
        return;
    }

    mp.events.call('faction:info', player, factionId);
});

mp.events.addCommand('flist', (player) => {
    const factionList = factionManager.getAllFactions();
    player.outputChatBox('=== Verfügbare Factions ===');
    
    factionList.forEach(faction => {
        player.outputChatBox(`${faction.name} (${faction.type}) - ${faction.memberCount} Mitglieder`);
    });
});

console.log('[FACTION] Faction-System geladen!');

module.exports = { Faction, FactionManager, factionManager };
