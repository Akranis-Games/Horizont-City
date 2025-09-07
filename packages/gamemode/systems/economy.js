// Economy System - Erweiterte Wirtschaft mit Märkten, Investitionen, Krediten und Versicherungen
// Implementiert das umfassende Wirtschaftssystem für Horizont-City

const config = require('../../../conf.json');

// Wirtschafts-Datenbank
const economy = {
    markets: new Map(),
    investments: new Map(),
    loans: new Map(),
    insurance: new Map(),
    transactions: new Map(),
    inflation: config.economy?.inflationRate || 0.02,
    taxRate: config.economy?.taxRate || 0.1
};

// Markt-Klasse
class Market {
    constructor(id, name, type, location, items) {
        this.id = id;
        this.name = name;
        this.type = type; // 'general', 'vehicle', 'property', 'weapon', 'drug'
        this.location = location;
        this.items = items || new Map();
        this.isOpen = true;
        this.taxRate = 0.1;
        this.createdAt = new Date();
    }

    // Item hinzufügen
    addItem(itemId, name, price, stock, category) {
        this.items.set(itemId, {
            id: itemId,
            name: name,
            price: price,
            stock: stock,
            category: category,
            originalPrice: price,
            demand: 1.0,
            supply: 1.0
        });
    }

    // Item kaufen
    buyItem(playerId, itemId, quantity) {
        const item = this.items.get(itemId);
        if (!item) {
            return { success: false, message: 'Item nicht gefunden!' };
        }

        if (item.stock < quantity) {
            return { success: false, message: 'Nicht genügend Vorrat!' };
        }

        const totalPrice = item.price * quantity;
        const tax = totalPrice * this.taxRate;
        const finalPrice = totalPrice + tax;

        // Spieler-Geld prüfen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData || !playerData.removeMoney(finalPrice)) {
            return { success: false, message: 'Nicht genügend Geld!' };
        }

        // Item verkaufen
        item.stock -= quantity;
        item.demand += 0.1;
        item.supply -= 0.1;

        // Preis anpassen basierend auf Angebot und Nachfrage
        this.adjustPrice(itemId);

        // Transaktion speichern
        this.recordTransaction(playerId, itemId, quantity, finalPrice, 'buy');

        return { 
            success: true, 
            message: `${quantity}x ${item.name} für ${finalPrice}€ gekauft!`,
            item: item,
            totalPrice: finalPrice
        };
    }

    // Item verkaufen
    sellItem(playerId, itemId, quantity, sellPrice) {
        const item = this.items.get(itemId);
        if (!item) {
            return { success: false, message: 'Item nicht gefunden!' };
        }

        const totalPrice = sellPrice * quantity;
        const tax = totalPrice * this.taxRate;
        const finalPrice = totalPrice - tax;

        // Item zum Markt hinzufügen
        item.stock += quantity;
        item.demand -= 0.1;
        item.supply += 0.1;

        // Preis anpassen
        this.adjustPrice(itemId);

        // Spieler bezahlen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (playerData) {
            playerData.addMoney(finalPrice);
        }

        // Transaktion speichern
        this.recordTransaction(playerId, itemId, quantity, finalPrice, 'sell');

        return { 
            success: true, 
            message: `${quantity}x ${item.name} für ${finalPrice}€ verkauft!`,
            item: item,
            totalPrice: finalPrice
        };
    }

    // Preis anpassen
    adjustPrice(itemId) {
        const item = this.items.get(itemId);
        if (!item) return;

        const priceChange = (item.demand - item.supply) * 0.05;
        item.price = Math.max(item.originalPrice * 0.5, item.price + priceChange);
        item.price = Math.min(item.originalPrice * 2, item.price);
    }

    // Transaktion aufzeichnen
    recordTransaction(playerId, itemId, quantity, price, type) {
        const transaction = {
            id: Date.now() + Math.random(),
            playerId: playerId,
            itemId: itemId,
            quantity: quantity,
            price: price,
            type: type,
            timestamp: new Date(),
            marketId: this.id
        };

        economy.transactions.set(transaction.id, transaction);
    }

    // Markt-Informationen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            location: this.location,
            isOpen: this.isOpen,
            itemCount: this.items.size,
            taxRate: this.taxRate
        };
    }
}

// Investment-Klasse
class Investment {
    constructor(id, name, type, initialAmount, returnRate, risk, duration) {
        this.id = id;
        this.name = name;
        this.type = type; // 'stocks', 'bonds', 'real_estate', 'crypto', 'business'
        this.initialAmount = initialAmount;
        this.returnRate = returnRate;
        this.risk = risk; // 1-10 (1 = sicher, 10 = riskant)
        this.duration = duration; // in Tagen
        this.createdAt = new Date();
        this.maturityDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
        this.isActive = true;
        this.currentValue = initialAmount;
    }

    // Investment berechnen
    calculateReturn() {
        const daysPassed = Math.floor((Date.now() - this.createdAt.getTime()) / (24 * 60 * 60 * 1000));
        const progress = daysPassed / this.duration;
        
        // Zufällige Schwankungen basierend auf Risiko
        const volatility = (Math.random() - 0.5) * this.risk * 0.1;
        const expectedReturn = this.returnRate * progress;
        const actualReturn = expectedReturn + volatility;
        
        this.currentValue = this.initialAmount * (1 + actualReturn);
        return this.currentValue;
    }

    // Investment auflösen
    liquidate() {
        if (!this.isActive) {
            return { success: false, message: 'Investment ist nicht aktiv!' };
        }

        const finalValue = this.calculateReturn();
        const profit = finalValue - this.initialAmount;
        
        this.isActive = false;
        
        return {
            success: true,
            message: `Investment aufgelöst! Gewinn: ${profit.toFixed(2)}€`,
            initialAmount: this.initialAmount,
            finalValue: finalValue,
            profit: profit
        };
    }
}

// Kredit-Klasse
class Loan {
    constructor(id, borrowerId, amount, interestRate, duration, collateral) {
        this.id = id;
        this.borrowerId = borrowerId;
        this.amount = amount;
        this.interestRate = interestRate;
        this.duration = duration; // in Tagen
        this.collateral = collateral;
        this.createdAt = new Date();
        this.dueDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
        this.isActive = true;
        this.paidAmount = 0;
        this.remainingAmount = amount;
    }

    // Kredit berechnen
    calculateTotalAmount() {
        const daysPassed = Math.floor((Date.now() - this.createdAt.getTime()) / (24 * 60 * 60 * 1000));
        const interest = this.amount * (this.interestRate / 100) * (daysPassed / 365);
        return this.amount + interest;
    }

    // Kredit tilgen
    makePayment(amount) {
        if (!this.isActive) {
            return { success: false, message: 'Kredit ist nicht aktiv!' };
        }

        this.paidAmount += amount;
        this.remainingAmount = this.calculateTotalAmount() - this.paidAmount;

        if (this.remainingAmount <= 0) {
            this.isActive = false;
            return { success: true, message: 'Kredit vollständig getilgt!' };
        }

        return { 
            success: true, 
            message: `Zahlung von ${amount}€ geleistet. Restbetrag: ${this.remainingAmount.toFixed(2)}€`,
            remainingAmount: this.remainingAmount
        };
    }
}

// Economy-Manager
class EconomyManager {
    constructor() {
        this.markets = economy.markets;
        this.investments = economy.investments;
        this.loans = economy.loans;
        this.insurance = economy.insurance;
        this.transactions = economy.transactions;
        this.inflation = economy.inflation;
        this.taxRate = economy.taxRate;
    }

    // Markt erstellen
    createMarket(name, type, location) {
        const id = this.generateId();
        const market = new Market(id, name, type, location);
        this.markets.set(id, market);
        return { success: true, market: market };
    }

    // Investment erstellen
    createInvestment(name, type, amount, returnRate, risk, duration) {
        const id = this.generateId();
        const investment = new Investment(id, name, type, amount, returnRate, risk, duration);
        this.investments.set(id, investment);
        return { success: true, investment: investment };
    }

    // Kredit vergeben
    grantLoan(borrowerId, amount, interestRate, duration, collateral) {
        const id = this.generateId();
        const loan = new Loan(id, borrowerId, amount, interestRate, duration, collateral);
        this.loans.set(id, loan);
        return { success: true, loan: loan };
    }

    // Wirtschafts-Update (täglich)
    updateEconomy() {
        // Inflation anwenden
        this.applyInflation();
        
        // Investments aktualisieren
        this.updateInvestments();
        
        // Kredite prüfen
        this.checkLoans();
        
        // Marktpreise anpassen
        this.updateMarketPrices();
    }

    // Inflation anwenden
    applyInflation() {
        this.markets.forEach(market => {
            market.items.forEach(item => {
                item.price *= (1 + this.inflation);
                item.originalPrice *= (1 + this.inflation);
            });
        });
    }

    // Investments aktualisieren
    updateInvestments() {
        this.investments.forEach(investment => {
            if (investment.isActive) {
                investment.calculateReturn();
            }
        });
    }

    // Kredite prüfen
    checkLoans() {
        this.loans.forEach(loan => {
            if (loan.isActive && new Date() > loan.dueDate) {
                // Kredit fällig - Collateral einziehen
                this.forecloseLoan(loan);
            }
        });
    }

    // Marktpreise anpassen
    updateMarketPrices() {
        this.markets.forEach(market => {
            market.items.forEach((item, itemId) => {
                market.adjustPrice(itemId);
            });
        });
    }

    // Kredit pfänden
    forecloseLoan(loan) {
        loan.isActive = false;
        
        // Collateral einziehen
        const playerData = require('./player').playerManager.getPlayer(loan.borrowerId);
        if (playerData) {
            // Hier würde das Collateral eingezogen werden
            console.log(`Kredit ${loan.id} wurde gepfändet!`);
        }
    }

    // Eindeutige ID generieren
    generateId() {
        return 'econ_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Globale Instanz
const economyManager = new EconomyManager();

// Events
mp.events.add('economy:createMarket', (player, name, type, location) => {
    const result = economyManager.createMarket(name, type, location);
    player.outputChatBox(result.success ? `Markt '${name}' erstellt!` : 'Fehler beim Erstellen des Marktes!');
});

mp.events.add('economy:buyItem', (player, marketId, itemId, quantity) => {
    const market = economyManager.markets.get(marketId);
    if (!market) {
        player.outputChatBox('Markt nicht gefunden!');
        return;
    }

    const result = market.buyItem(player.id, itemId, quantity);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('economy:updateUI', player, market.getInfo());
    }
});

mp.events.add('economy:sellItem', (player, marketId, itemId, quantity, price) => {
    const market = economyManager.markets.get(marketId);
    if (!market) {
        player.outputChatBox('Markt nicht gefunden!');
        return;
    }

    const result = market.sellItem(player.id, itemId, quantity, price);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('economy:updateUI', player, market.getInfo());
    }
});

mp.events.add('economy:createInvestment', (player, name, type, amount, returnRate, risk, duration) => {
    const playerData = require('./player').playerManager.getPlayer(player.id);
    if (!playerData || !playerData.removeMoney(amount)) {
        player.outputChatBox('Nicht genügend Geld!');
        return;
    }

    const result = economyManager.createInvestment(name, type, amount, returnRate, risk, duration);
    if (result.success) {
        player.outputChatBox(`Investment '${name}' für ${amount}€ erstellt!`);
    } else {
        playerData.addMoney(amount); // Geld zurückgeben
        player.outputChatBox('Fehler beim Erstellen des Investments!');
    }
});

mp.events.add('economy:liquidateInvestment', (player, investmentId) => {
    const investment = economyManager.investments.get(investmentId);
    if (!investment) {
        player.outputChatBox('Investment nicht gefunden!');
        return;
    }

    const result = investment.liquidate();
    player.outputChatBox(result.message);
    
    if (result.success) {
        const playerData = require('./player').playerManager.getPlayer(player.id);
        if (playerData) {
            playerData.addMoney(result.finalValue);
        }
    }
});

// Commands
mp.events.addCommand('market', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /market [list|info|buy|sell]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'list':
            player.outputChatBox('=== Verfügbare Märkte ===');
            economyManager.markets.forEach(market => {
                player.outputChatBox(`${market.name} (${market.type}) - ${market.location}`);
            });
            break;
            
        case 'info':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /market info [Markt-ID]');
                return;
            }
            const market = economyManager.markets.get(args[0]);
            if (market) {
                const info = market.getInfo();
                player.outputChatBox(`=== ${info.name} ===`);
                player.outputChatBox(`Typ: ${info.type}`);
                player.outputChatBox(`Standort: ${info.location}`);
                player.outputChatBox(`Status: ${info.isOpen ? 'Geöffnet' : 'Geschlossen'}`);
                player.outputChatBox(`Items: ${info.itemCount}`);
            } else {
                player.outputChatBox('Markt nicht gefunden!');
            }
            break;
            
        case 'buy':
            if (!args[0] || !args[1] || !args[2]) {
                player.outputChatBox('Verwendung: /market buy [Markt-ID] [Item-ID] [Anzahl]');
                return;
            }
            mp.events.call('economy:buyItem', player, args[0], args[1], parseInt(args[2]));
            break;
            
        case 'sell':
            if (!args[0] || !args[1] || !args[2] || !args[3]) {
                player.outputChatBox('Verwendung: /market sell [Markt-ID] [Item-ID] [Anzahl] [Preis]');
                return;
            }
            mp.events.call('economy:sellItem', player, args[0], args[1], parseInt(args[2]), parseFloat(args[3]));
            break;
    }
});

mp.events.addCommand('invest', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /invest [create|liquidate|list]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'create':
            if (!args[0] || !args[1] || !args[2] || !args[3] || !args[4] || !args[5]) {
                player.outputChatBox('Verwendung: /invest create [Name] [Typ] [Betrag] [Rendite%] [Risiko] [Dauer]');
                return;
            }
            mp.events.call('economy:createInvestment', player, args[0], args[1], parseFloat(args[2]), parseFloat(args[3]), parseInt(args[4]), parseInt(args[5]));
            break;
            
        case 'liquidate':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /invest liquidate [Investment-ID]');
                return;
            }
            mp.events.call('economy:liquidateInvestment', player, args[0]);
            break;
            
        case 'list':
            player.outputChatBox('=== Deine Investments ===');
            economyManager.investments.forEach(investment => {
                if (investment.borrowerId === player.id) {
                    player.outputChatBox(`${investment.name} - ${investment.type} - ${investment.currentValue.toFixed(2)}€`);
                }
            });
            break;
    }
});

// Tägliches Update
setInterval(() => {
    economyManager.updateEconomy();
}, 24 * 60 * 60 * 1000); // 24 Stunden

console.log('[ECONOMY] Economy-System geladen!');

module.exports = { Market, Investment, Loan, EconomyManager, economyManager };
