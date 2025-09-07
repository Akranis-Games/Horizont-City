// Player System - MariaDB Version - Vollständiges Spieler-Management mit Profilen, Statistiken und Verwaltung
// Implementiert das umfassende Player-System für Horizont-City mit MariaDB

const config = require('../../../conf.json');
const { query, insert, selectOne, select, update, delete: dbDelete, count } = require('../database');

// Player-Datenbank (In-Memory Cache)
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
        this.money = 0;
        this.bankMoney = 0;
        this.level = 1;
        this.experience = 0;
        this.health = 100;
        this.armor = 0;
        this.position = { x: 0, y: 0, z: 0 };
        this.rotation = 0;
        this.skin = 0;
        this.factionId = null;
        this.jobId = null;
        this.isOnline = true;
        this.lastSeen = new Date();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.stats = {
            playTime: 0,
            deaths: 0,
            kills: 0,
            arrests: 0,
            jobsCompleted: 0,
            moneyEarned: 0,
            moneySpent: 0
        };
    }

    // Spieler in Datenbank speichern
    async save() {
        try {
            const playerData = {
                name: this.name,
                socialId: this.socialClubId,
                money: this.money,
                level: this.level,
                experience: this.experience,
                health: this.health,
                armor: this.armor,
                position_x: this.position.x,
                position_y: this.position.y,
                position_z: this.position.z,
                rotation: this.rotation,
                skin: this.skin,
                faction_id: this.factionId,
                job_id: this.jobId,
                updated_at: new Date()
            };

            // Prüfen ob Spieler existiert
            const existingPlayer = await selectOne('players', { name: this.name });
            
            if (existingPlayer) {
                await update('players', playerData, { id: existingPlayer.id });
                this.id = existingPlayer.id;
            } else {
                playerData.created_at = new Date();
                this.id = await insert('players', playerData);
            }

            // Statistiken speichern
            await this.saveStats();
            
            console.log(`[PLAYER] Spieler ${this.name} gespeichert`);
        } catch (error) {
            console.error(`[PLAYER] Fehler beim Speichern von ${this.name}:`, error);
        }
    }

    // Statistiken speichern
    async saveStats() {
        try {
            const statsData = {
                player_id: this.id,
                play_time: this.stats.playTime,
                deaths: this.stats.deaths,
                kills: this.stats.kills,
                arrests: this.stats.arrests,
                jobs_completed: this.stats.jobsCompleted,
                money_earned: this.stats.moneyEarned,
                money_spent: this.stats.moneySpent,
                updated_at: new Date()
            };

            const existingStats = await selectOne('player_stats', { player_id: this.id });
            
            if (existingStats) {
                await update('player_stats', statsData, { player_id: this.id });
            } else {
                statsData.created_at = new Date();
                await insert('player_stats', statsData);
            }
        } catch (error) {
            console.error(`[PLAYER] Fehler beim Speichern der Statistiken:`, error);
        }
    }

    // Spieler aus Datenbank laden
    async load() {
        try {
            const playerData = await selectOne('players', { name: this.name });
            if (playerData) {
                this.id = playerData.id;
                this.money = playerData.money;
                this.level = playerData.level;
                this.experience = playerData.experience;
                this.health = playerData.health;
                this.armor = playerData.armor;
                this.position = {
                    x: playerData.position_x,
                    y: playerData.position_y,
                    z: playerData.position_z
                };
                this.rotation = playerData.rotation;
                this.skin = playerData.skin;
                this.factionId = playerData.faction_id;
                this.jobId = playerData.job_id;
                this.createdAt = playerData.created_at;
                this.updatedAt = playerData.updated_at;
            }

            // Statistiken laden
            await this.loadStats();
            
            console.log(`[PLAYER] Spieler ${this.name} geladen`);
        } catch (error) {
            console.error(`[PLAYER] Fehler beim Laden von ${this.name}:`, error);
        }
    }

    // Statistiken laden
    async loadStats() {
        try {
            const statsData = await selectOne('player_stats', { player_id: this.id });
            if (statsData) {
                this.stats = {
                    playTime: statsData.play_time,
                    deaths: statsData.deaths,
                    kills: statsData.kills,
                    arrests: statsData.arrests,
                    jobsCompleted: statsData.jobs_completed,
                    moneyEarned: statsData.money_earned,
                    moneySpent: statsData.money_spent
                };
            }
        } catch (error) {
            console.error(`[PLAYER] Fehler beim Laden der Statistiken:`, error);
        }
    }

    // Geld hinzufügen
    addMoney(amount) {
        this.money += amount;
        this.stats.moneyEarned += amount;
        this.save();
    }

    // Geld entfernen
    removeMoney(amount) {
        if (this.money >= amount) {
            this.money -= amount;
            this.stats.moneySpent += amount;
            this.save();
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
            console.log(`[PLAYER] ${this.name} ist Level ${this.level} erreicht!`);
        }
        
        this.save();
    }

    // Position setzen
    setPosition(x, y, z, rotation = 0) {
        this.position = { x, y, z };
        this.rotation = rotation;
        this.save();
    }

    // Gesundheit setzen
    setHealth(health) {
        this.health = Math.max(0, Math.min(100, health));
        this.save();
    }

    // Rüstung setzen
    setArmor(armor) {
        this.armor = Math.max(0, Math.min(100, armor));
        this.save();
    }

    // Faction setzen
    setFaction(factionId) {
        this.factionId = factionId;
        this.save();
    }

    // Job setzen
    setJob(jobId) {
        this.jobId = jobId;
        this.save();
    }

    // Spielzeit hinzufügen
    addPlayTime(minutes) {
        this.stats.playTime += minutes;
        this.save();
    }

    // Tod hinzufügen
    addDeath() {
        this.stats.deaths++;
        this.save();
    }

    // Kill hinzufügen
    addKill() {
        this.stats.kills++;
        this.save();
    }

    // Verhaftung hinzufügen
    addArrest() {
        this.stats.arrests++;
        this.save();
    }

    // Job abgeschlossen
    completeJob() {
        this.stats.jobsCompleted++;
        this.save();
    }

    // Berechtigung prüfen
    hasPermission(permission) {
        const rank = PLAYER_RANKS[this.rank];
        return rank && (rank.permissions.includes('all') || rank.permissions.includes(permission));
    }

    // Spieler-Objekt für Client
    toClient() {
        return {
            id: this.id,
            name: this.name,
            rank: this.rank,
            money: this.money,
            bankMoney: this.bankMoney,
            level: this.level,
            experience: this.experience,
            health: this.health,
            armor: this.armor,
            position: this.position,
            rotation: this.rotation,
            skin: this.skin,
            factionId: this.factionId,
            jobId: this.jobId,
            stats: this.stats
        };
    }
}

// Player-System
const playerSystem = {
    // Spieler erstellen
    createPlayer(player) {
        const newPlayer = new Player(player);
        players.set(player.id, newPlayer);
        return newPlayer;
    },

    // Spieler abrufen
    getPlayer(playerId) {
        return players.get(playerId);
    },

    // Spieler laden
    async loadPlayer(playerId) {
        const player = players.get(playerId);
        if (player) {
            await player.load();
        }
        return player;
    },

    // Alle Spieler abrufen
    getAllPlayers() {
        return Array.from(players.values());
    },

    // Spieler suchen
    findPlayerByName(name) {
        return Array.from(players.values()).find(p => p.name === name);
    },

    // Spieler entfernen
    removePlayer(playerId) {
        players.delete(playerId);
    },

    // Spieler-Statistiken abrufen
    async getPlayerStats(playerId) {
        try {
            const stats = await selectOne('player_stats', { player_id: playerId });
            return stats;
        } catch (error) {
            console.error('[PLAYER] Fehler beim Abrufen der Statistiken:', error);
            return null;
        }
    },

    // Top-Spieler abrufen
    async getTopPlayers(limit = 10) {
        try {
            const topPlayers = await select('player_stats', {}, '*', {
                orderBy: 'play_time DESC',
                limit: limit
            });
            return topPlayers;
        } catch (error) {
            console.error('[PLAYER] Fehler beim Abrufen der Top-Spieler:', error);
            return [];
        }
    },

    // Spieler-Anzahl
    getPlayerCount() {
        return players.size;
    },

    // Online-Spieler
    getOnlinePlayers() {
        return Array.from(players.values()).filter(p => p.isOnline);
    },

    // Spieler speichern
    async savePlayer(playerId) {
        const player = players.get(playerId);
        if (player) {
            await player.save();
        }
    },

    // Alle Spieler speichern
    async saveAllPlayers() {
        for (const player of players.values()) {
            await player.save();
        }
    },

    // System initialisieren
    async init() {
        try {
            // Player Stats Tabelle erstellen
            await query(`
                CREATE TABLE IF NOT EXISTS player_stats (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    player_id INT NOT NULL,
                    play_time INT DEFAULT 0,
                    deaths INT DEFAULT 0,
                    kills INT DEFAULT 0,
                    arrests INT DEFAULT 0,
                    jobs_completed INT DEFAULT 0,
                    money_earned INT DEFAULT 0,
                    money_spent INT DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    INDEX idx_player_id (player_id),
                    FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
                )
            `);

            console.log('[PLAYER] Player-System mit MariaDB initialisiert');
        } catch (error) {
            console.error('[PLAYER] Fehler bei der Initialisierung:', error);
        }
    }
};

// Events
mp.events.add('playerJoin', (player) => {
    const newPlayer = playerSystem.createPlayer(player);
    console.log(`[PLAYER] ${player.name} ist dem Server beigetreten`);
    
    // Spieler-Daten laden
    newPlayer.load();
});

mp.events.add('playerQuit', (player) => {
    const playerObj = playerSystem.getPlayer(player.id);
    if (playerObj) {
        playerObj.isOnline = false;
        playerObj.lastSeen = new Date();
        playerObj.save();
        playerSystem.removePlayer(player.id);
    }
    console.log(`[PLAYER] ${player.name} hat den Server verlassen`);
});

mp.events.add('playerDeath', (player, reason, killer) => {
    const playerObj = playerSystem.getPlayer(player.id);
    if (playerObj) {
        playerObj.addDeath();
        if (killer) {
            const killerObj = playerSystem.getPlayer(killer.id);
            if (killerObj) {
                killerObj.addKill();
            }
        }
    }
});

// Commands
mp.events.add('playerCommand', (player, command) => {
    const playerObj = playerSystem.getPlayer(player.id);
    if (!playerObj) return;

    const args = command.split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
        case 'stats':
            const stats = playerObj.stats;
            player.outputChatBox(`=== Statistiken von ${playerObj.name} ===`);
            player.outputChatBox(`Spielzeit: ${Math.floor(stats.playTime / 60)} Stunden`);
            player.outputChatBox(`Level: ${playerObj.level} (${playerObj.experience} XP)`);
            player.outputChatBox(`Geld: $${playerObj.money}`);
            player.outputChatBox(`Tode: ${stats.deaths} | Kills: ${stats.kills}`);
            player.outputChatBox(`Verhaftungen: ${stats.arrests}`);
            player.outputChatBox(`Jobs abgeschlossen: ${stats.jobsCompleted}`);
            break;

        case 'save':
            playerObj.save();
            player.outputChatBox('Spieler-Daten gespeichert!');
            break;

        case 'money':
            if (args.length >= 2) {
                const amount = parseInt(args[1]);
                if (!isNaN(amount)) {
                    playerObj.addMoney(amount);
                    player.outputChatBox(`$${amount} hinzugefügt! Neues Guthaben: $${playerObj.money}`);
                }
            }
            break;

        case 'level':
            if (args.length >= 2) {
                const amount = parseInt(args[1]);
                if (!isNaN(amount)) {
                    playerObj.addExperience(amount);
                    player.outputChatBox(`${amount} Erfahrung hinzugefügt!`);
                }
            }
            break;
    }
});

// System initialisieren (wird nach Datenbank-Verbindung aufgerufen)
// playerSystem.init();

module.exports = playerSystem;
