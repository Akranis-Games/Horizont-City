// Casino System - Casino-System
// Behandelt alle Casino-Funktionen für Horizont-City Roleplay

const casinoSystem = {
    // Casino-Typen
    casinoTypes: {
        SLOTS: 'slots',
        POKER: 'poker',
        BLACKJACK: 'blackjack',
        ROULETTE: 'roulette',
        BACCARAT: 'baccarat',
        CRAPS: 'craps',
        BINGO: 'bingo',
        LOTTERY: 'lottery'
    },
    
    // Casino-Konfiguration
    casinoConfig: {
        slots: {
            name: 'Spielautomaten',
            minBet: 10,
            maxBet: 1000,
            houseEdge: 0.05,
            jackpot: 10000,
            games: ['classic', 'fruit', 'diamond', 'gold']
        },
        poker: {
            name: 'Poker',
            minBet: 50,
            maxBet: 5000,
            houseEdge: 0.02,
            maxPlayers: 6,
            variants: ['texas_holdem', 'omaha', 'seven_card']
        },
        blackjack: {
            name: 'Blackjack',
            minBet: 25,
            maxBet: 2500,
            houseEdge: 0.01,
            maxPlayers: 7,
            rules: {
                doubleDown: true,
                split: true,
                insurance: true,
                surrender: false
            }
        },
        roulette: {
            name: 'Roulette',
            minBet: 5,
            maxBet: 1000,
            houseEdge: 0.027,
            wheel: 'european',
            bets: ['red', 'black', 'even', 'odd', 'high', 'low', 'number']
        },
        baccarat: {
            name: 'Baccarat',
            minBet: 100,
            maxBet: 10000,
            houseEdge: 0.01,
            maxPlayers: 8,
            variants: ['punto_banco', 'chemin_de_fer', 'baccarat_banque']
        },
        craps: {
            name: 'Craps',
            minBet: 10,
            maxBet: 2000,
            houseEdge: 0.014,
            maxPlayers: 12,
            bets: ['pass_line', 'don_t_pass', 'come', 'don_come', 'field', 'any_seven']
        },
        bingo: {
            name: 'Bingo',
            minBet: 5,
            maxBet: 100,
            houseEdge: 0.15,
            maxPlayers: 50,
            variants: ['75_ball', '90_ball', '80_ball']
        },
        lottery: {
            name: 'Lotterie',
            minBet: 1,
            maxBet: 100,
            houseEdge: 0.5,
            maxPlayers: 1000,
            drawTime: '20:00',
            variants: ['daily', 'weekly', 'monthly']
        }
    },
    
    // Casino-Standorte
    casinoLocations: [
        { x: 925.0, y: 46.0, z: 81.0, name: 'Casino', type: 'main' },
        { x: 1111.0, y: 230.0, z: -50.0, name: 'Underground Casino', type: 'underground' },
        { x: 1986.0, y: 3044.0, z: 50.0, name: 'Desert Casino', type: 'desert' }
    ],
    
    // Aktive Spiele
    activeGames: new Map(),
    
    // Spieler-Statistiken
    playerStats: new Map(),
    
    // Jackpots
    jackpots: new Map(),
    
    // Casino-Initialisierung
    init() {
        console.log('[CASINO] Casino-System initialisiert');
        this.createCasinos();
        this.initializeJackpots();
    },
    
    // Casinos erstellen
    createCasinos() {
        this.casinoLocations.forEach(location => {
            this.createCasino(location);
        });
        console.log(`[CASINO] ${this.casinoLocations.length} Casinos erstellt`);
    },
    
    // Einzelnes Casino erstellen
    createCasino(location) {
        const casino = {
            id: location.name.toLowerCase().replace(' ', '_'),
            name: location.name,
            position: { x: location.x, y: location.y, z: location.z },
            type: location.type,
            games: [],
            players: [],
            revenue: 0,
            status: 'open'
        };
        
        // Spiele hinzufügen
        Object.keys(this.casinoConfig).forEach(gameType => {
            casino.games.push({
                type: gameType,
                config: this.casinoConfig[gameType],
                active: true,
                players: []
            });
        });
        
        // Blip erstellen
        const blip = mp.blips.new(679, new mp.Vector3(location.x, location.y, location.z), {
            name: location.name,
            color: 2,
            shortRange: true,
            scale: 1.0
        });
        
        console.log(`[CASINO] Casino ${location.name} erstellt`);
    },
    
    // Jackpots initialisieren
    initializeJackpots() {
        Object.keys(this.casinoConfig).forEach(gameType => {
            const config = this.casinoConfig[gameType];
            if (config.jackpot) {
                this.jackpots.set(gameType, {
                    current: config.jackpot,
                    max: config.jackpot * 10,
                    lastWon: null,
                    winner: null
                });
            }
        });
    },
    
    // Spiel starten
    startGame(player, gameType, betAmount) {
        const config = this.casinoConfig[gameType];
        if (!config) {
            player.outputChatBox('Ungültiges Spiel!');
            return false;
        }
        
        // Bet prüfen
        if (betAmount < config.minBet || betAmount > config.maxBet) {
            player.outputChatBox(`Bet muss zwischen $${config.minBet} und $${config.maxBet} liegen!`);
            return false;
        }
        
        // Geld prüfen
        if (!this.checkMoney(player, betAmount)) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        // Spiel erstellen
        const gameId = Date.now();
        const game = {
            id: gameId,
            type: gameType,
            player: player.id,
            bet: betAmount,
            startTime: Date.now(),
            status: 'active',
            result: null
        };
        
        this.activeGames.set(gameId, game);
        
        // Geld abziehen
        this.deductMoney(player, betAmount);
        
        // Spiel-spezifische Logik
        this.playGame(player, game);
        
        console.log(`[CASINO] Spiel ${gameType} von Spieler ${player.id} gestartet`);
        return true;
    },
    
    // Spiel spielen
    playGame(player, game) {
        const config = this.casinoConfig[game.type];
        
        switch (game.type) {
            case 'slots':
                this.playSlots(player, game);
                break;
            case 'poker':
                this.playPoker(player, game);
                break;
            case 'blackjack':
                this.playBlackjack(player, game);
                break;
            case 'roulette':
                this.playRoulette(player, game);
                break;
            case 'baccarat':
                this.playBaccarat(player, game);
                break;
            case 'craps':
                this.playCraps(player, game);
                break;
            case 'bingo':
                this.playBingo(player, game);
                break;
            case 'lottery':
                this.playLottery(player, game);
                break;
        }
    },
    
    // Slots spielen
    playSlots(player, game) {
        const config = this.casinoConfig.slots;
        const symbols = ['cherry', 'lemon', 'orange', 'plum', 'bell', 'bar', 'seven', 'diamond'];
        
        // Zufällige Symbole generieren
        const reels = [
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)],
            symbols[Math.floor(Math.random() * symbols.length)]
        ];
        
        // Gewinn prüfen
        let win = 0;
        let multiplier = 1;
        
        if (reels[0] === reels[1] && reels[1] === reels[2]) {
            // Drei gleiche Symbole
            if (reels[0] === 'diamond') {
                multiplier = 100; // Jackpot
            } else if (reels[0] === 'seven') {
                multiplier = 50;
            } else if (reels[0] === 'bar') {
                multiplier = 25;
            } else {
                multiplier = 10;
            }
            win = game.bet * multiplier;
        } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
            // Zwei gleiche Symbole
            multiplier = 2;
            win = game.bet * multiplier;
        }
        
        // Ergebnis
        game.result = { reels, win, multiplier };
        game.status = 'completed';
        
        // Gewinn auszahlen
        if (win > 0) {
            this.payWinnings(player, win);
            player.outputChatBox(`Gewinn! ${reels.join(' - ')} | Multiplikator: ${multiplier}x | Gewinn: $${win}`);
        } else {
            player.outputChatBox(`Verloren! ${reels.join(' - ')}`);
        }
        
        this.updatePlayerStats(player.id, 'slots', game.bet, win);
    },
    
    // Poker spielen
    playPoker(player, game) {
        // Vereinfachte Poker-Logik
        const hands = ['high_card', 'pair', 'two_pair', 'three_kind', 'straight', 'flush', 'full_house', 'four_kind', 'straight_flush', 'royal_flush'];
        const hand = hands[Math.floor(Math.random() * hands.length)];
        
        let win = 0;
        let multiplier = 1;
        
        switch (hand) {
            case 'royal_flush':
                multiplier = 1000;
                break;
            case 'straight_flush':
                multiplier = 200;
                break;
            case 'four_kind':
                multiplier = 50;
                break;
            case 'full_house':
                multiplier = 20;
                break;
            case 'flush':
                multiplier = 10;
                break;
            case 'straight':
                multiplier = 5;
                break;
            case 'three_kind':
                multiplier = 2;
                break;
            case 'two_pair':
                multiplier = 1.5;
                break;
            case 'pair':
                multiplier = 1;
                break;
            default:
                multiplier = 0;
        }
        
        win = game.bet * multiplier;
        
        game.result = { hand, win, multiplier };
        game.status = 'completed';
        
        if (win > 0) {
            this.payWinnings(player, win);
            player.outputChatBox(`Poker Hand: ${hand} | Multiplikator: ${multiplier}x | Gewinn: $${win}`);
        } else {
            player.outputChatBox(`Poker Hand: ${hand} | Verloren!`);
        }
        
        this.updatePlayerStats(player.id, 'poker', game.bet, win);
    },
    
    // Blackjack spielen
    playBlackjack(player, game) {
        // Vereinfachte Blackjack-Logik
        const playerCards = [this.drawCard(), this.drawCard()];
        const dealerCards = [this.drawCard(), this.drawCard()];
        
        const playerValue = this.calculateHandValue(playerCards);
        const dealerValue = this.calculateHandValue(dealerCards);
        
        let win = 0;
        let result = '';
        
        if (playerValue > 21) {
            result = 'Bust';
            win = 0;
        } else if (dealerValue > 21) {
            result = 'Dealer Bust';
            win = game.bet * 2;
        } else if (playerValue > dealerValue) {
            result = 'Win';
            win = game.bet * 2;
        } else if (playerValue === dealerValue) {
            result = 'Push';
            win = game.bet;
        } else {
            result = 'Lose';
            win = 0;
        }
        
        game.result = { playerCards, dealerCards, playerValue, dealerValue, result, win };
        game.status = 'completed';
        
        if (win > 0) {
            this.payWinnings(player, win);
            player.outputChatBox(`Blackjack: ${result} | Dealer: ${dealerValue} | Du: ${playerValue} | Gewinn: $${win}`);
        } else {
            player.outputChatBox(`Blackjack: ${result} | Dealer: ${dealerValue} | Du: ${playerValue}`);
        }
        
        this.updatePlayerStats(player.id, 'blackjack', game.bet, win);
    },
    
    // Karte ziehen
    drawCard() {
        const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        
        return {
            suit: suits[Math.floor(Math.random() * suits.length)],
            value: values[Math.floor(Math.random() * values.length)]
        };
    },
    
    // Hand-Wert berechnen
    calculateHandValue(cards) {
        let value = 0;
        let aces = 0;
        
        cards.forEach(card => {
            if (card.value === 'A') {
                aces++;
                value += 11;
            } else if (['J', 'Q', 'K'].includes(card.value)) {
                value += 10;
            } else {
                value += parseInt(card.value);
            }
        });
        
        // Aces als 1 behandeln wenn nötig
        while (value > 21 && aces > 0) {
            value -= 10;
            aces--;
        }
        
        return value;
    },
    
    // Roulette spielen
    playRoulette(player, game) {
        const number = Math.floor(Math.random() * 37); // 0-36
        const color = this.getRouletteColor(number);
        
        // Vereinfachte Roulette-Logik
        let win = 0;
        let result = '';
        
        // Hier würde die Bet-Logik implementiert werden
        // Für jetzt: zufälliger Gewinn
        if (Math.random() < 0.4) {
            win = game.bet * 2;
            result = 'Win';
        } else {
            win = 0;
            result = 'Lose';
        }
        
        game.result = { number, color, result, win };
        game.status = 'completed';
        
        if (win > 0) {
            this.payWinnings(player, win);
            player.outputChatBox(`Roulette: ${number} ${color} | ${result} | Gewinn: $${win}`);
        } else {
            player.outputChatBox(`Roulette: ${number} ${color} | ${result}`);
        }
        
        this.updatePlayerStats(player.id, 'roulette', game.bet, win);
    },
    
    // Roulette-Farbe ermitteln
    getRouletteColor(number) {
        if (number === 0) return 'green';
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        return redNumbers.includes(number) ? 'red' : 'black';
    },
    
    // Geld prüfen
    checkMoney(player, amount) {
        return player.getVariable('money') >= amount;
    },
    
    // Geld abziehen
    deductMoney(player, amount) {
        player.setVariable('money', player.getVariable('money') - amount);
    },
    
    // Gewinn auszahlen
    payWinnings(player, amount) {
        player.setVariable('money', player.getVariable('money') + amount);
    },
    
    // Spieler-Statistiken aktualisieren
    updatePlayerStats(playerId, gameType, bet, win) {
        if (!this.playerStats.has(playerId)) {
            this.playerStats.set(playerId, {
                totalBets: 0,
                totalWins: 0,
                totalLoss: 0,
                gamesPlayed: 0,
                favoriteGame: 'slots'
            });
        }
        
        const stats = this.playerStats.get(playerId);
        stats.totalBets += bet;
        stats.totalWins += win;
        stats.totalLoss += bet - win;
        stats.gamesPlayed++;
        
        // Lieblingsspiel aktualisieren
        if (!stats.gamesByType) {
            stats.gamesByType = {};
        }
        stats.gamesByType[gameType] = (stats.gamesByType[gameType] || 0) + 1;
        
        // Lieblingsspiel ermitteln
        let maxGames = 0;
        for (const [game, count] of Object.entries(stats.gamesByType)) {
            if (count > maxGames) {
                maxGames = count;
                stats.favoriteGame = game;
            }
        }
    },
    
    // Spieler-Statistiken abrufen
    getPlayerStats(playerId) {
        return this.playerStats.get(playerId) || {
            totalBets: 0,
            totalWins: 0,
            totalLoss: 0,
            gamesPlayed: 0,
            favoriteGame: 'slots'
        };
    },
    
    // Casino-Statistiken
    getStatistics() {
        return {
            totalGames: this.activeGames.size,
            totalPlayers: this.playerStats.size,
            totalRevenue: Array.from(this.playerStats.values()).reduce((total, stats) => total + stats.totalBets, 0),
            jackpots: this.jackpots.size
        };
    }
};

// Events
mp.events.add('casino:play', (player, gameType, betAmount) => {
    casinoSystem.startGame(player, gameType, betAmount);
});

mp.events.add('casino:getStats', (player) => {
    const stats = casinoSystem.getPlayerStats(player.id);
    player.call('casino:updateStats', [stats]);
});

// Commands
mp.events.addCommand('casino', (player, fullText, gameType, betAmount) => {
    if (!gameType || !betAmount) {
        player.outputChatBox('Verwendung: /casino [Spiel] [Bet]');
        player.outputChatBox('Spiele: slots, poker, blackjack, roulette, baccarat, craps, bingo, lottery');
        return;
    }
    
    const bet = parseInt(betAmount);
    if (isNaN(bet)) {
        player.outputChatBox('Ungültiger Bet-Betrag!');
        return;
    }
    
    casinoSystem.startGame(player, gameType, bet);
});

mp.events.addCommand('casinostats', (player) => {
    const stats = casinoSystem.getPlayerStats(player.id);
    player.outputChatBox('=== Casino Statistiken ===');
    player.outputChatBox(`Spiele gespielt: ${stats.gamesPlayed}`);
    player.outputChatBox(`Gesamtbets: $${stats.totalBets}`);
    player.outputChatBox(`Gesamtgewinne: $${stats.totalWins}`);
    player.outputChatBox(`Gesamtverluste: $${stats.totalLoss}`);
    player.outputChatBox(`Lieblingsspiel: ${stats.favoriteGame}`);
});

// Casino-System initialisieren
casinoSystem.init();

module.exports = casinoSystem;
