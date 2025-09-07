// Player System - Vollständiges Spieler-Management mit Profilen, Statistiken und Verwaltung
// Implementiert das umfassende Player-System für Horizont-City

const config = require('../../../conf.json');

// Player-Datenbank
const players = new Map();
const playerStats = new Map();

// Spieler-Ränge (0 = niedrigster, 8 = höchster)
const PLAYER_RANKS = {
    0: { name: 'Player', permissions: ['basic'] },
    1: { name: 'Guide', permissions: ['basic', 'help'] },
    2: { name: 'Moderator', permissions: ['basic', 'help', 'moderate'] },
    3: { name: 'Administrator', permissions: ['basic', 'help', 'moderate', 'admin'] },
    4: { name: 'High Administrator', permissions: ['basic', 'help', 'moderate', 'admin', 'highadmin'] },
    5: { name: 'Manager', permissions: ['basic', 'help', 'moderate', 'admin', 'highadmin', 'manage'] },
    6: { name: 'Developer', permissions: ['basic', 'help', 'moderate', 'admin', 'highadmin', 'manage', 'develop'] },
    7: { name: 'Lead Developer', permissions: ['basic', 'help', 'moderate', 'admin', 'highadmin', 'manage', 'develop', 'lead'] },
    8: { name: 'Project Founder', permissions: ['all'] }
};

// Spieler-Klasse
class Player {
    constructor(player) {
        this.id = player.id;
        this.name = player.name;
        this.socialClubId = player.socialClubId;
        this.hwid = player.hwid;
        this.ip = player.ip;
        this.rank = 0;
        this.permissions = PLAYER_RANKS[0].permissions;
        this.money = config.economy?.startingMoney || 1000;
        this.bankMoney = 0;
        this.level = 1;
        this.experience = 0;
        this.health = 100;
        this.armor = 0;
        this.hunger = 100;
        this.thirst = 100;
        this.stress = 0;
        this.fatigue = 0;
        this.createdAt = new Date();
        this.lastLogin = new Date();
        this.playTime = 0;
        this.isOnline = true;
        this.isJailed = false;
        this.jailTime = 0;
        this.isMuted = false;
        this.muteTime = 0;
        this.isBanned = false;
        this.banReason = '';
        this.banExpires = null;
        this.character = {
            firstName: '',
            lastName: '',
            age: 18,
            gender: 'male',
            nationality: 'German',
            appearance: {}
        };
        this.stats = {
            kills: 0,
            deaths: 0,
            arrests: 0,
            jobsCompleted: 0,
            moneyEarned: 0,
            moneySpent: 0,
            distanceTraveled: 0,
            vehiclesOwned: 0,
            housesOwned: 0
        };
        this.settings = {
            language: 'de',
            notifications: true,
            music: true,
            voiceChat: true,
            uiScale: 1.0
        };
    }

    // Rang ändern
    setRank(rank) {
        this.rank = rank;
        this.permissions = PLAYER_RANKS[rank] ? PLAYER_RANKS[rank].permissions : PLAYER_RANKS[0].permissions;
    }

    // Berechtigung prüfen
    hasPermission(permission) {
        return this.permissions.includes('all') || this.permissions.includes(permission);
    }

    // Geld hinzufügen
    addMoney(amount) {
        this.money += amount;
        this.stats.moneyEarned += amount;
        return this.money;
    }

    // Geld entfernen
    removeMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            this.stats.moneySpent += amount;
            return true;
        }
        return false;
    }

    // Bank-Geld hinzufügen
    addBankMoney(amount) {
        this.bankMoney += amount;
        return this.bankMoney;
    }

    // Bank-Geld entfernen
    removeBankMoney(amount) {
        if (this.bankMoney >= amount) {
            this.bankMoney -= amount;
            return true;
        }
        return false;
    }

    // Erfahrung hinzufügen
    addExperience(amount) {
        this.experience += amount;
        
        // Level-Up prüfen
        const requiredExp = this.level * 1000;
        if (this.experience >= requiredExp) {
            this.level++;
            this.experience -= requiredExp;
            return { leveledUp: true, newLevel: this.level };
        }
        
        return { leveledUp: false, newLevel: this.level };
    }

    // Gesundheit setzen
    setHealth(amount) {
        this.health = Math.max(0, Math.min(100, amount));
        return this.health;
    }

    // Rüstung setzen
    setArmor(amount) {
        this.armor = Math.max(0, Math.min(100, amount));
        return this.armor;
    }

    // Hunger setzen
    setHunger(amount) {
        this.hunger = Math.max(0, Math.min(100, amount));
        return this.hunger;
    }

    // Durst setzen
    setThirst(amount) {
        this.thirst = Math.max(0, Math.min(100, amount));
        return this.thirst;
    }

    // Stress setzen
    setStress(amount) {
        this.stress = Math.max(0, Math.min(100, amount));
        return this.stress;
    }

    // Müdigkeit setzen
    setFatigue(amount) {
        this.fatigue = Math.max(0, Math.min(100, amount));
        return this.fatigue;
    }

    // Spieler sperren
    jail(duration, reason) {
        this.isJailed = true;
        this.jailTime = duration;
        this.jailReason = reason;
        return true;
    }

    // Spieler entlassen
    unjail() {
        this.isJailed = false;
        this.jailTime = 0;
        this.jailReason = '';
        return true;
    }

    // Spieler stumm schalten
    mute(duration, reason) {
        this.isMuted = true;
        this.muteTime = duration;
        this.muteReason = reason;
        return true;
    }

    // Stummschaltung aufheben
    unmute() {
        this.isMuted = false;
        this.muteTime = 0;
        this.muteReason = '';
        return true;
    }

    // Spieler bannen
    ban(duration, reason) {
        this.isBanned = true;
        this.banReason = reason;
        this.banExpires = duration ? new Date(Date.now() + duration) : null;
        return true;
    }

    // Bann aufheben
    unban() {
        this.isBanned = false;
        this.banReason = '';
        this.banExpires = null;
        return true;
    }

    // Charakter-Informationen abrufen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            rank: this.rank,
            rankName: PLAYER_RANKS[this.rank].name,
            money: this.money,
            bankMoney: this.bankMoney,
            level: this.level,
            experience: this.experience,
            health: this.health,
            armor: this.armor,
            hunger: this.hunger,
            thirst: this.thirst,
            stress: this.stress,
            fatigue: this.fatigue,
            character: this.character,
            stats: this.stats,
            isOnline: this.isOnline,
            isJailed: this.isJailed,
            isMuted: this.isMuted,
            isBanned: this.isBanned,
            playTime: this.playTime,
            createdAt: this.createdAt,
            lastLogin: this.lastLogin
        };
    }

    // Spieler-Daten speichern
    save() {
        // Hier würde normalerweise die Datenbank-Speicherung stattfinden
        players.set(this.id, this);
        return true;
    }

    // Spieler-Daten laden
    load() {
        const savedPlayer = players.get(this.id);
        if (savedPlayer) {
            Object.assign(this, savedPlayer);
            this.isOnline = true;
            this.lastLogin = new Date();
        }
        return true;
    }
}

// Player-Manager
class PlayerManager {
    constructor() {
        this.players = players;
        this.stats = playerStats;
    }

    // Spieler erstellen
    createPlayer(player) {
        const newPlayer = new Player(player);
        this.players.set(player.id, newPlayer);
        return newPlayer;
    }

    // Spieler abrufen
    getPlayer(playerId) {
        return this.players.get(playerId);
    }

    // Alle Spieler abrufen
    getAllPlayers() {
        return Array.from(this.players.values());
    }

    // Online-Spieler abrufen
    getOnlinePlayers() {
        return Array.from(this.players.values()).filter(player => player.isOnline);
    }

    // Spieler nach Name suchen
    findPlayerByName(name) {
        return Array.from(this.players.values()).find(player => 
            player.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // Spieler-Statistiken abrufen
    getPlayerStats(playerId) {
        return this.stats.get(playerId) || {};
    }

    // Spieler-Statistiken aktualisieren
    updatePlayerStats(playerId, stats) {
        const currentStats = this.stats.get(playerId) || {};
        this.stats.set(playerId, { ...currentStats, ...stats });
    }
}

// Globale Instanz
const playerManager = new PlayerManager();

// Events
mp.events.add('player:load', (player) => {
    let playerData = playerManager.getPlayer(player.id);
    
    if (!playerData) {
        playerData = playerManager.createPlayer(player);
        player.outputChatBox('Willkommen! Dein Charakter wurde erstellt.');
    } else {
        playerData.load();
        player.outputChatBox('Willkommen zurück!');
    }

    // Spieler-Daten an Client senden
    mp.events.call('player:updateUI', player, playerData.getInfo());
});

mp.events.add('player:save', (player) => {
    const playerData = playerManager.getPlayer(player.id);
    if (playerData) {
        playerData.isOnline = false;
        playerData.save();
    }
});

mp.events.add('player:setRank', (player, targetPlayerId, rank) => {
    const targetPlayer = playerManager.getPlayer(targetPlayerId);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.setRank(rank);
    player.outputChatBox(`${targetPlayer.name} wurde auf Rang ${PLAYER_RANKS[rank].name} gesetzt!`);
});

mp.events.add('player:giveMoney', (player, targetPlayerId, amount) => {
    const targetPlayer = playerManager.getPlayer(targetPlayerId);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.addMoney(amount);
    player.outputChatBox(`${amount}€ wurden an ${targetPlayer.name} überwiesen!`);
});

mp.events.add('player:jail', (player, targetPlayerId, duration, reason) => {
    const targetPlayer = playerManager.getPlayer(targetPlayerId);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('moderate')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.jail(duration, reason);
    player.outputChatBox(`${targetPlayer.name} wurde für ${duration} Minuten eingesperrt!`);
});

mp.events.add('player:unjail', (player, targetPlayerId) => {
    const targetPlayer = playerManager.getPlayer(targetPlayerId);
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('moderate')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.unjail();
    player.outputChatBox(`${targetPlayer.name} wurde entlassen!`);
});

// Commands
mp.events.addCommand('setrank', (player, fullText, targetPlayerId, rank) => {
    if (!targetPlayerId || !rank) {
        player.outputChatBox('Verwendung: /setrank [Spieler-ID] [Rang]');
        player.outputChatBox('Ränge: 0=Player, 1=Guide, 2=Moderator, 3=Administrator, 4=High Admin, 5=Manager, 6=Developer, 7=Lead Dev, 8=Founder');
        return;
    }

    mp.events.call('player:setRank', player, parseInt(targetPlayerId), parseInt(rank));
});

mp.events.addCommand('givemoney', (player, fullText, targetPlayerId, amount) => {
    if (!targetPlayerId || !amount) {
        player.outputChatBox('Verwendung: /givemoney [Spieler-ID] [Betrag]');
        return;
    }

    mp.events.call('player:giveMoney', player, parseInt(targetPlayerId), parseInt(amount));
});

mp.events.addCommand('jail', (player, fullText, targetPlayerId, duration, reason) => {
    if (!targetPlayerId || !duration) {
        player.outputChatBox('Verwendung: /jail [Spieler-ID] [Dauer in Minuten] [Grund]');
        return;
    }

    mp.events.call('player:jail', player, parseInt(targetPlayerId), parseInt(duration), reason || 'Kein Grund angegeben');
});

mp.events.addCommand('unjail', (player, fullText, targetPlayerId) => {
    if (!targetPlayerId) {
        player.outputChatBox('Verwendung: /unjail [Spieler-ID]');
        return;
    }

    mp.events.call('player:unjail', player, parseInt(targetPlayerId));
});

mp.events.addCommand('mute', (player, fullText, targetPlayerId, duration, reason) => {
    if (!targetPlayerId || !duration) {
        player.outputChatBox('Verwendung: /mute [Spieler-ID] [Dauer in Minuten] [Grund]');
        return;
    }

    const targetPlayer = playerManager.getPlayer(parseInt(targetPlayerId));
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('moderate')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.mute(parseInt(duration), reason || 'Kein Grund angegeben');
    player.outputChatBox(`${targetPlayer.name} wurde für ${duration} Minuten stumm geschaltet!`);
});

mp.events.addCommand('unmute', (player, fullText, targetPlayerId) => {
    if (!targetPlayerId) {
        player.outputChatBox('Verwendung: /unmute [Spieler-ID]');
        return;
    }

    const targetPlayer = playerManager.getPlayer(parseInt(targetPlayerId));
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('moderate')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.unmute();
    player.outputChatBox(`${targetPlayer.name} wurde entstummt!`);
});

mp.events.addCommand('ban', (player, fullText, targetPlayerId, duration, reason) => {
    if (!targetPlayerId || !reason) {
        player.outputChatBox('Verwendung: /ban [Spieler-ID] [Dauer in Minuten] [Grund]');
        player.outputChatBox('Dauer 0 = permanenter Bann');
        return;
    }

    const targetPlayer = playerManager.getPlayer(parseInt(targetPlayerId));
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.ban(parseInt(duration), reason);
    player.outputChatBox(`${targetPlayer.name} wurde gebannt! Grund: ${reason}`);
});

mp.events.addCommand('unban', (player, fullText, targetPlayerId) => {
    if (!targetPlayerId) {
        player.outputChatBox('Verwendung: /unban [Spieler-ID]');
        return;
    }

    const targetPlayer = playerManager.getPlayer(parseInt(targetPlayerId));
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const playerData = playerManager.getPlayer(player.id);
    if (!playerData.hasPermission('admin')) {
        player.outputChatBox('Du hast keine Berechtigung!');
        return;
    }

    targetPlayer.unban();
    player.outputChatBox(`${targetPlayer.name} wurde entbannt!`);
});

mp.events.addCommand('playerinfo', (player, fullText, targetPlayerId) => {
    if (!targetPlayerId) {
        player.outputChatBox('Verwendung: /playerinfo [Spieler-ID]');
        return;
    }

    const targetPlayer = playerManager.getPlayer(parseInt(targetPlayerId));
    if (!targetPlayer) {
        player.outputChatBox('Spieler nicht gefunden!');
        return;
    }

    const info = targetPlayer.getInfo();
    player.outputChatBox(`=== ${info.name} ===`);
    player.outputChatBox(`Rang: ${info.rankName} (${info.rank})`);
    player.outputChatBox(`Geld: ${info.money}€ | Bank: ${info.bankMoney}€`);
    player.outputChatBox(`Level: ${info.level} | Erfahrung: ${info.experience}`);
    player.outputChatBox(`Gesundheit: ${info.health}% | Rüstung: ${info.armor}%`);
    player.outputChatBox(`Hunger: ${info.hunger}% | Durst: ${info.thirst}%`);
    player.outputChatBox(`Stress: ${info.stress}% | Müdigkeit: ${info.fatigue}%`);
    player.outputChatBox(`Spielzeit: ${Math.floor(info.playTime / 3600)} Stunden`);
    player.outputChatBox(`Gesperrt: ${info.isJailed ? 'Ja' : 'Nein'}`);
    player.outputChatBox(`Stumm: ${info.isMuted ? 'Ja' : 'Nein'}`);
    player.outputChatBox(`Gebannt: ${info.isBanned ? 'Ja' : 'Nein'}`);
});

console.log('[PLAYER] Player-System geladen!');

module.exports = { Player, PlayerManager, playerManager };
