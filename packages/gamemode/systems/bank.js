// Bank System - Vollständiges Bankensystem mit ATMs, Tresoren und Sicherheit
// Implementiert das umfassende Bankensystem für Horizont-City

const config = require('../../../conf.json');

// Bank-Datenbank
const banks = new Map();
const accounts = new Map();
const transactions = new Map();
const loans = new Map();
const creditCards = new Map();

// Bank-Klasse
class Bank {
    constructor(id, name, location, type) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.type = type; // 'main', 'branch', 'atm'
        this.isOpen = true;
        this.securityLevel = 1; // 1-5 (1 = niedrig, 5 = hoch)
        this.services = ['deposit', 'withdraw', 'transfer', 'loan', 'investment'];
        this.atms = new Map();
        this.vaults = new Map();
        this.createdAt = new Date();
    }

    // ATM hinzufügen
    addATM(atmId, location, maxAmount) {
        this.atms.set(atmId, {
            id: atmId,
            location: location,
            maxAmount: maxAmount,
            isWorking: true,
            lastMaintenance: new Date()
        });
    }

    // Tresor hinzufügen
    addVault(vaultId, capacity, securityLevel) {
        this.vaults.set(vaultId, {
            id: vaultId,
            capacity: capacity,
            securityLevel: securityLevel,
            items: new Map(),
            isLocked: true
        });
    }

    // Bank-Informationen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            type: this.type,
            isOpen: this.isOpen,
            securityLevel: this.securityLevel,
            services: this.services,
            atmCount: this.atms.size,
            vaultCount: this.vaults.size
        };
    }
}

// Bankkonto-Klasse
class BankAccount {
    constructor(accountId, playerId, bankId, accountType) {
        this.accountId = accountId;
        this.playerId = playerId;
        this.bankId = bankId;
        this.accountType = accountType; // 'checking', 'savings', 'business', 'investment'
        this.balance = 0;
        this.creditLimit = 0;
        this.interestRate = 0.01; // 1% pro Jahr
        this.isActive = true;
        this.createdAt = new Date();
        this.lastTransaction = null;
        this.transactionHistory = [];
        this.securityLevel = 1;
        this.pin = null;
        this.isLocked = false;
        this.failedAttempts = 0;
    }

    // PIN setzen
    setPin(pin) {
        if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
            return { success: false, message: 'PIN muss 4 Ziffern lang sein!' };
        }
        
        this.pin = pin;
        return { success: true, message: 'PIN gesetzt!' };
    }

    // PIN prüfen
    verifyPin(pin) {
        if (this.isLocked) {
            return { success: false, message: 'Konto ist gesperrt!' };
        }

        if (this.pin !== pin) {
            this.failedAttempts++;
            if (this.failedAttempts >= 3) {
                this.isLocked = true;
                return { success: false, message: 'Konto wurde gesperrt! Zu viele falsche PIN-Eingaben!' };
            }
            return { success: false, message: 'Falsche PIN!' };
        }

        this.failedAttempts = 0;
        return { success: true, message: 'PIN korrekt!' };
    }

    // Einzahlung
    deposit(amount, description = 'Einzahlung') {
        if (amount <= 0) {
            return { success: false, message: 'Betrag muss positiv sein!' };
        }

        this.balance += amount;
        this.recordTransaction('deposit', amount, description);
        return { success: true, message: `${amount}€ eingezahlt!`, newBalance: this.balance };
    }

    // Abhebung
    withdraw(amount, description = 'Abhebung') {
        if (amount <= 0) {
            return { success: false, message: 'Betrag muss positiv sein!' };
        }

        if (this.balance < amount) {
            return { success: false, message: 'Nicht genügend Guthaben!' };
        }

        this.balance -= amount;
        this.recordTransaction('withdraw', -amount, description);
        return { success: true, message: `${amount}€ abgehoben!`, newBalance: this.balance };
    }

    // Überweisung
    transfer(targetAccountId, amount, description = 'Überweisung') {
        if (amount <= 0) {
            return { success: false, message: 'Betrag muss positiv sein!' };
        }

        if (this.balance < amount) {
            return { success: false, message: 'Nicht genügend Guthaben!' };
        }

        const targetAccount = accounts.get(targetAccountId);
        if (!targetAccount) {
            return { success: false, message: 'Zielkonto nicht gefunden!' };
        }

        this.balance -= amount;
        targetAccount.balance += amount;
        
        this.recordTransaction('transfer_out', -amount, `Überweisung an ${targetAccountId}: ${description}`);
        targetAccount.recordTransaction('transfer_in', amount, `Überweisung von ${this.accountId}: ${description}`);
        
        return { success: true, message: `${amount}€ an ${targetAccountId} überwiesen!`, newBalance: this.balance };
    }

    // Transaktion aufzeichnen
    recordTransaction(type, amount, description) {
        const transaction = {
            id: Date.now() + Math.random(),
            type: type,
            amount: amount,
            description: description,
            timestamp: new Date(),
            balance: this.balance
        };

        this.transactionHistory.push(transaction);
        this.lastTransaction = transaction;
        
        // In globale Transaktions-Datenbank
        transactions.set(transaction.id, {
            ...transaction,
            accountId: this.accountId,
            playerId: this.playerId
        });
    }

    // Zinsen berechnen
    calculateInterest() {
        const daysSinceLastInterest = Math.floor((Date.now() - this.createdAt.getTime()) / (24 * 60 * 60 * 1000));
        const interest = this.balance * this.interestRate * (daysSinceLastInterest / 365);
        return interest;
    }

    // Zinsen anwenden
    applyInterest() {
        const interest = this.calculateInterest();
        if (interest > 0) {
            this.balance += interest;
            this.recordTransaction('interest', interest, 'Zinsen');
        }
    }

    // Konto-Informationen
    getInfo() {
        return {
            accountId: this.accountId,
            playerId: this.playerId,
            bankId: this.bankId,
            accountType: this.accountType,
            balance: this.balance,
            creditLimit: this.creditLimit,
            interestRate: this.interestRate,
            isActive: this.isActive,
            isLocked: this.isLocked,
            createdAt: this.createdAt,
            lastTransaction: this.lastTransaction,
            transactionCount: this.transactionHistory.length
        };
    }
}

// Kreditkarte-Klasse
class CreditCard {
    constructor(cardId, accountId, cardType, limit) {
        this.cardId = cardId;
        this.accountId = accountId;
        this.cardType = cardType; // 'visa', 'mastercard', 'amex'
        this.limit = limit;
        this.usedAmount = 0;
        this.isActive = true;
        this.expiryDate = new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000); // 3 Jahre
        this.cvv = Math.floor(100 + Math.random() * 900); // 3-stellige CVV
        this.pin = Math.floor(1000 + Math.random() * 9000); // 4-stellige PIN
        this.createdAt = new Date();
    }

    // Karte verwenden
    useCard(amount, merchant, description) {
        if (!this.isActive) {
            return { success: false, message: 'Karte ist nicht aktiv!' };
        }

        if (new Date() > this.expiryDate) {
            return { success: false, message: 'Karte ist abgelaufen!' };
        }

        if (this.usedAmount + amount > this.limit) {
            return { success: false, message: 'Kreditlimit überschritten!' };
        }

        this.usedAmount += amount;
        
        // Transaktion aufzeichnen
        const account = accounts.get(this.accountId);
        if (account) {
            account.recordTransaction('credit_card', -amount, `${description} bei ${merchant}`);
        }

        return { success: true, message: `${amount}€ mit Kreditkarte bezahlt!`, newUsedAmount: this.usedAmount };
    }

    // Karte bezahlen
    payCard(amount) {
        if (amount <= 0) {
            return { success: false, message: 'Betrag muss positiv sein!' };
        }

        if (amount > this.usedAmount) {
            return { success: false, message: 'Betrag überschreitet verwendeten Betrag!' };
        }

        this.usedAmount -= amount;
        return { success: true, message: `${amount}€ Kreditkarte bezahlt!`, newUsedAmount: this.usedAmount };
    }
}

// Bank-Manager
class BankManager {
    constructor() {
        this.banks = banks;
        this.accounts = accounts;
        this.transactions = transactions;
        this.loans = loans;
        this.creditCards = creditCards;
    }

    // Bank erstellen
    createBank(name, location, type) {
        const id = this.generateId();
        const bank = new Bank(id, name, location, type);
        this.banks.set(id, bank);
        return { success: true, bank: bank };
    }

    // Konto erstellen
    createAccount(playerId, bankId, accountType) {
        const accountId = this.generateId();
        const account = new BankAccount(accountId, playerId, bankId, accountType);
        this.accounts.set(accountId, account);
        return { success: true, account: account };
    }

    // Kreditkarte ausstellen
    issueCreditCard(accountId, cardType, limit) {
        const cardId = this.generateId();
        const card = new CreditCard(cardId, accountId, cardType, limit);
        this.creditCards.set(cardId, card);
        return { success: true, card: card };
    }

    // Konto abrufen
    getAccount(accountId) {
        return this.accounts.get(accountId);
    }

    // Spieler-Konten abrufen
    getPlayerAccounts(playerId) {
        const playerAccounts = [];
        this.accounts.forEach(account => {
            if (account.playerId === playerId) {
                playerAccounts.push(account);
            }
        });
        return playerAccounts;
    }

    // Eindeutige ID generieren
    generateId() {
        return 'bank_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Globale Instanz
const bankManager = new BankManager();

// Events
mp.events.add('bank:createAccount', (player, bankId, accountType) => {
    const result = bankManager.createAccount(player.id, bankId, accountType);
    if (result.success) {
        player.outputChatBox(`Bankkonto erstellt! Kontonummer: ${result.account.accountId}`);
    } else {
        player.outputChatBox('Fehler beim Erstellen des Kontos!');
    }
});

mp.events.add('bank:deposit', (player, accountId, amount, pin) => {
    const account = bankManager.getAccount(accountId);
    if (!account) {
        player.outputChatBox('Konto nicht gefunden!');
        return;
    }

    const pinResult = account.verifyPin(pin);
    if (!pinResult.success) {
        player.outputChatBox(pinResult.message);
        return;
    }

    const playerData = require('./player').playerManager.getPlayer(player.id);
    if (!playerData || !playerData.removeMoney(amount)) {
        player.outputChatBox('Nicht genügend Geld!');
        return;
    }

    const result = account.deposit(amount);
    player.outputChatBox(result.message);
    
    if (result.success) {
        playerData.save();
    }
});

mp.events.add('bank:withdraw', (player, accountId, amount, pin) => {
    const account = bankManager.getAccount(accountId);
    if (!account) {
        player.outputChatBox('Konto nicht gefunden!');
        return;
    }

    const pinResult = account.verifyPin(pin);
    if (!pinResult.success) {
        player.outputChatBox(pinResult.message);
        return;
    }

    const result = account.withdraw(amount);
    if (result.success) {
        const playerData = require('./player').playerManager.getPlayer(player.id);
        if (playerData) {
            playerData.addMoney(amount);
            playerData.save();
        }
    }
    
    player.outputChatBox(result.message);
});

mp.events.add('bank:transfer', (player, fromAccountId, toAccountId, amount, pin, description) => {
    const account = bankManager.getAccount(fromAccountId);
    if (!account) {
        player.outputChatBox('Konto nicht gefunden!');
        return;
    }

    const pinResult = account.verifyPin(pin);
    if (!pinResult.success) {
        player.outputChatBox(pinResult.message);
        return;
    }

    const result = account.transfer(toAccountId, amount, description);
    player.outputChatBox(result.message);
});

mp.events.add('bank:setPin', (player, accountId, newPin) => {
    const account = bankManager.getAccount(accountId);
    if (!account) {
        player.outputChatBox('Konto nicht gefunden!');
        return;
    }

    const result = account.setPin(newPin);
    player.outputChatBox(result.message);
});

// Commands
mp.events.addCommand('bank', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /bank [create|deposit|withdraw|transfer|balance|history|setpin]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'create':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /bank create [Bank-ID] [Konto-Typ]');
                player.outputChatBox('Konto-Typen: checking, savings, business, investment');
                return;
            }
            mp.events.call('bank:createAccount', player, args[0], args[1]);
            break;
            
        case 'deposit':
            if (!args[0] || !args[1] || !args[2]) {
                player.outputChatBox('Verwendung: /bank deposit [Konto-ID] [Betrag] [PIN]');
                return;
            }
            mp.events.call('bank:deposit', player, args[0], parseFloat(args[1]), args[2]);
            break;
            
        case 'withdraw':
            if (!args[0] || !args[1] || !args[2]) {
                player.outputChatBox('Verwendung: /bank withdraw [Konto-ID] [Betrag] [PIN]');
                return;
            }
            mp.events.call('bank:withdraw', player, args[0], parseFloat(args[1]), args[2]);
            break;
            
        case 'transfer':
            if (!args[0] || !args[1] || !args[2] || !args[3]) {
                player.outputChatBox('Verwendung: /bank transfer [Von-Konto] [Zu-Konto] [Betrag] [PIN] [Beschreibung]');
                return;
            }
            mp.events.call('bank:transfer', player, args[0], args[1], parseFloat(args[2]), args[3], args[4] || 'Überweisung');
            break;
            
        case 'balance':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /bank balance [Konto-ID]');
                return;
            }
            const account = bankManager.getAccount(args[0]);
            if (account) {
                const info = account.getInfo();
                player.outputChatBox(`Kontostand: ${info.balance}€`);
            } else {
                player.outputChatBox('Konto nicht gefunden!');
            }
            break;
            
        case 'history':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /bank history [Konto-ID]');
                return;
            }
            const account2 = bankManager.getAccount(args[0]);
            if (account2) {
                player.outputChatBox('=== Transaktionshistorie ===');
                account2.transactionHistory.slice(-10).forEach(transaction => {
                    player.outputChatBox(`${transaction.timestamp.toLocaleString()}: ${transaction.type} ${transaction.amount}€ - ${transaction.description}`);
                });
            } else {
                player.outputChatBox('Konto nicht gefunden!');
            }
            break;
            
        case 'setpin':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /bank setpin [Konto-ID] [Neue-PIN]');
                return;
            }
            mp.events.call('bank:setPin', player, args[0], args[1]);
            break;
    }
});

mp.events.addCommand('atms', (player) => {
    player.outputChatBox('=== Verfügbare ATMs ===');
    bankManager.banks.forEach(bank => {
        bank.atms.forEach(atm => {
            player.outputChatBox(`${bank.name} - ${atm.location} (Max: ${atm.maxAmount}€)`);
        });
    });
});

// Tägliches Update für Zinsen
setInterval(() => {
    bankManager.accounts.forEach(account => {
        account.applyInterest();
    });
}, 24 * 60 * 60 * 1000); // 24 Stunden

console.log('[BANK] Bank-System geladen!');

module.exports = { Bank, BankAccount, CreditCard, BankManager, bankManager };
