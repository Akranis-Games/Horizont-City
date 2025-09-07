// Trading System - Handels-System mit Märkten und Börsen
// Behandelt alle Handels-Funktionen für Horizont-City Roleplay

const tradingSystem = {
    // Handels-Typen
    tradingTypes: {
        STOCK_MARKET: 'stock_market',
        COMMODITY_MARKET: 'commodity_market',
        CRYPTO_MARKET: 'crypto_market',
        REAL_ESTATE: 'real_estate',
        VEHICLE_MARKET: 'vehicle_market',
        ITEM_MARKET: 'item_market',
        SERVICE_MARKET: 'service_market',
        FUTURES_MARKET: 'futures_market',
        OPTIONS_MARKET: 'options_market',
        FOREX_MARKET: 'forex_market'
    },
    
    // Handels-Instrumente
    tradingInstruments: {
        // Aktien
        stocks: {
            'AAPL': { name: 'Apple Inc.', price: 150.00, volatility: 0.15, sector: 'technology' },
            'GOOGL': { name: 'Alphabet Inc.', price: 2800.00, volatility: 0.18, sector: 'technology' },
            'MSFT': { name: 'Microsoft Corp.', price: 300.00, volatility: 0.12, sector: 'technology' },
            'TSLA': { name: 'Tesla Inc.', price: 800.00, volatility: 0.35, sector: 'automotive' },
            'AMZN': { name: 'Amazon.com Inc.', price: 3200.00, volatility: 0.20, sector: 'retail' },
            'META': { name: 'Meta Platforms Inc.', price: 250.00, volatility: 0.25, sector: 'technology' },
            'NVDA': { name: 'NVIDIA Corp.', price: 400.00, volatility: 0.30, sector: 'technology' },
            'JPM': { name: 'JPMorgan Chase & Co.', price: 140.00, volatility: 0.10, sector: 'finance' }
        },
        
        // Rohstoffe
        commodities: {
            'GOLD': { name: 'Gold', price: 1800.00, volatility: 0.08, unit: 'oz' },
            'SILVER': { name: 'Silber', price: 25.00, volatility: 0.12, unit: 'oz' },
            'OIL': { name: 'Rohöl', price: 70.00, volatility: 0.15, unit: 'barrel' },
            'GAS': { name: 'Erdgas', price: 3.50, volatility: 0.20, unit: 'mmbtu' },
            'WHEAT': { name: 'Weizen', price: 8.00, volatility: 0.18, unit: 'bushel' },
            'CORN': { name: 'Mais', price: 6.50, volatility: 0.16, unit: 'bushel' },
            'COPPER': { name: 'Kupfer', price: 4.20, volatility: 0.14, unit: 'lb' },
            'PLATINUM': { name: 'Platin', price: 1000.00, volatility: 0.10, unit: 'oz' }
        },
        
        // Kryptowährungen
        crypto: {
            'BTC': { name: 'Bitcoin', price: 45000.00, volatility: 0.40, marketCap: 850000000000 },
            'ETH': { name: 'Ethereum', price: 3000.00, volatility: 0.35, marketCap: 360000000000 },
            'ADA': { name: 'Cardano', price: 0.50, volatility: 0.30, marketCap: 17000000000 },
            'SOL': { name: 'Solana', price: 100.00, volatility: 0.45, marketCap: 32000000000 },
            'DOT': { name: 'Polkadot', price: 25.00, volatility: 0.38, marketCap: 25000000000 },
            'MATIC': { name: 'Polygon', price: 1.20, volatility: 0.42, marketCap: 10000000000 }
        }
    },
    
    // Handels-Orders
    orderTypes: {
        MARKET_ORDER: 'market_order',
        LIMIT_ORDER: 'limit_order',
        STOP_ORDER: 'stop_order',
        STOP_LIMIT_ORDER: 'stop_limit_order',
        TRAILING_STOP: 'trailing_stop'
    },
    
    // Handels-Status
    orderStatus: {
        PENDING: 'pending',
        FILLED: 'filled',
        PARTIALLY_FILLED: 'partially_filled',
        CANCELLED: 'cancelled',
        REJECTED: 'rejected'
    },
    
    // Handels-Konten
    tradingAccounts: new Map(),
    
    // Handels-Orders
    tradingOrders: new Map(),
    
    // Handels-Transaktionen
    tradingTransactions: new Map(),
    
    // Markt-Daten
    marketData: new Map(),
    
    // Handels-Statistiken
    tradingStats: {
        totalVolume: 0,
        totalTrades: 0,
        activeTraders: 0,
        marketCap: 0,
        dailyChange: 0
    },
    
    // Trading-System-Initialisierung
    init() {
        console.log('[TRADING] Trading-System initialisiert');
        this.initializeMarkets();
        this.startMarketSimulation();
    },
    
    // Märkte initialisieren
    initializeMarkets() {
        // Aktien-Markt
        Object.keys(this.tradingInstruments.stocks).forEach(symbol => {
            this.marketData.set(symbol, {
                ...this.tradingInstruments.stocks[symbol],
                lastPrice: this.tradingInstruments.stocks[symbol].price,
                change: 0,
                changePercent: 0,
                volume: 0,
                high: this.tradingInstruments.stocks[symbol].price,
                low: this.tradingInstruments.stocks[symbol].price
            });
        });
        
        // Rohstoff-Markt
        Object.keys(this.tradingInstruments.commodities).forEach(symbol => {
            this.marketData.set(symbol, {
                ...this.tradingInstruments.commodities[symbol],
                lastPrice: this.tradingInstruments.commodities[symbol].price,
                change: 0,
                changePercent: 0,
                volume: 0,
                high: this.tradingInstruments.commodities[symbol].price,
                low: this.tradingInstruments.commodities[symbol].price
            });
        });
        
        // Krypto-Markt
        Object.keys(this.tradingInstruments.crypto).forEach(symbol => {
            this.marketData.set(symbol, {
                ...this.tradingInstruments.crypto[symbol],
                lastPrice: this.tradingInstruments.crypto[symbol].price,
                change: 0,
                changePercent: 0,
                volume: 0,
                high: this.tradingInstruments.crypto[symbol].price,
                low: this.tradingInstruments.crypto[symbol].price
            });
        });
        
        console.log('[TRADING] Märkte initialisiert');
    },
    
    // Markt-Simulation starten
    startMarketSimulation() {
        setInterval(() => {
            this.updateMarketPrices();
        }, 5000); // Alle 5 Sekunden
    },
    
    // Markt-Preise aktualisieren
    updateMarketPrices() {
        this.marketData.forEach((data, symbol) => {
            const volatility = data.volatility;
            const randomChange = (Math.random() - 0.5) * 2 * volatility;
            const newPrice = data.lastPrice * (1 + randomChange);
            
            data.change = newPrice - data.lastPrice;
            data.changePercent = (data.change / data.lastPrice) * 100;
            data.lastPrice = newPrice;
            data.volume += Math.floor(Math.random() * 1000);
            
            if (newPrice > data.high) data.high = newPrice;
            if (newPrice < data.low) data.low = newPrice;
        });
    },
    
    // Trading-Konto erstellen
    createTradingAccount(player, initialBalance) {
        if (player.tradingAccount) {
            player.outputChatBox('Du hast bereits ein Trading-Konto!');
            return false;
        }
        
        if (player.money < initialBalance) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${initialBalance}`);
            return false;
        }
        
        const accountId = `trading_${player.id}_${Date.now()}`;
        const account = {
            id: accountId,
            playerId: player.id,
            playerName: player.name,
            balance: initialBalance,
            portfolio: {},
            totalValue: initialBalance,
            profitLoss: 0,
            status: 'active',
            created: Date.now()
        };
        
        this.tradingAccounts.set(accountId, account);
        
        player.tradingAccount = accountId;
        player.money -= initialBalance;
        
        player.outputChatBox(`Trading-Konto mit $${initialBalance} erstellt!`);
        player.call('ui:show', 'TradingAccountCreated', { account: account });
        
        this.tradingStats.activeTraders++;
        
        console.log(`[TRADING] Trading-Konto für Spieler ${player.id} erstellt`);
        return accountId;
    },
    
    // Order platzieren
    placeOrder(player, symbol, orderType, side, quantity, price = null) {
        const account = this.getTradingAccount(player);
        if (!account) {
            player.outputChatBox('Du hast kein Trading-Konto!');
            return false;
        }
        
        const marketData = this.marketData.get(symbol);
        if (!marketData) {
            player.outputChatBox('Symbol nicht gefunden!');
            return false;
        }
        
        const orderPrice = price || marketData.lastPrice;
        const totalCost = quantity * orderPrice;
        
        if (side === 'buy' && account.balance < totalCost) {
            player.outputChatBox(`Nicht genug Guthaben! Benötigt: $${totalCost}`);
            return false;
        }
        
        if (side === 'sell' && (!account.portfolio[symbol] || account.portfolio[symbol] < quantity)) {
            player.outputChatBox(`Nicht genug ${symbol} im Portfolio!`);
            return false;
        }
        
        const orderId = `order_${player.id}_${Date.now()}`;
        const order = {
            id: orderId,
            playerId: player.id,
            accountId: account.id,
            symbol: symbol,
            orderType: orderType,
            side: side,
            quantity: quantity,
            price: orderPrice,
            filledQuantity: 0,
            status: 'pending',
            timestamp: Date.now(),
            created: Date.now()
        };
        
        this.tradingOrders.set(orderId, order);
        
        // Order sofort ausführen (vereinfacht)
        this.executeOrder(order);
        
        player.outputChatBox(`Order für ${quantity} ${symbol} @ $${orderPrice} platziert!`);
        player.call('ui:show', 'OrderPlaced', { order: order });
        
        console.log(`[TRADING] Order von Spieler ${player.id} platziert`);
        return orderId;
    },
    
    // Order ausführen
    executeOrder(order) {
        const account = this.getTradingAccountById(order.accountId);
        if (!account) return false;
        
        const marketData = this.marketData.get(order.symbol);
        if (!marketData) return false;
        
        const executionPrice = marketData.lastPrice;
        const totalCost = order.quantity * executionPrice;
        
        if (order.side === 'buy') {
            account.balance -= totalCost;
            account.portfolio[order.symbol] = (account.portfolio[order.symbol] || 0) + order.quantity;
        } else {
            account.balance += totalCost;
            account.portfolio[order.symbol] = (account.portfolio[order.symbol] || 0) - order.quantity;
        }
        
        order.filledQuantity = order.quantity;
        order.status = 'filled';
        order.executionPrice = executionPrice;
        
        // Transaktion erstellen
        const transactionId = `transaction_${order.id}_${Date.now()}`;
        const transaction = {
            id: transactionId,
            orderId: order.id,
            playerId: order.playerId,
            symbol: order.symbol,
            side: order.side,
            quantity: order.quantity,
            price: executionPrice,
            totalValue: totalCost,
            timestamp: Date.now(),
            created: Date.now()
        };
        
        this.tradingTransactions.set(transactionId, transaction);
        
        // Portfolio-Wert aktualisieren
        this.updatePortfolioValue(account);
        
        this.tradingStats.totalTrades++;
        this.tradingStats.totalVolume += totalCost;
        
        console.log(`[TRADING] Order ${order.id} ausgeführt`);
        return true;
    },
    
    // Portfolio-Wert aktualisieren
    updatePortfolioValue(account) {
        let totalValue = account.balance;
        
        Object.keys(account.portfolio).forEach(symbol => {
            const quantity = account.portfolio[symbol];
            const marketData = this.marketData.get(symbol);
            if (marketData && quantity > 0) {
                totalValue += quantity * marketData.lastPrice;
            }
        });
        
        account.totalValue = totalValue;
        account.profitLoss = totalValue - 10000; // Anfangsguthaben
    },
    
    // Trading-Konto abrufen
    getTradingAccount(player) {
        const accounts = Array.from(this.tradingAccounts.values()).filter(account => 
            account.playerId === player.id && account.status === 'active'
        );
        
        return accounts.length > 0 ? accounts[0] : null;
    },
    
    // Trading-Konto nach ID abrufen
    getTradingAccountById(accountId) {
        return this.tradingAccounts.get(accountId);
    },
    
    // Markt-Daten abrufen
    getMarketData(symbol) {
        return this.marketData.get(symbol);
    },
    
    // Alle Markt-Daten abrufen
    getAllMarketData() {
        return Array.from(this.marketData.entries()).map(([symbol, data]) => ({
            symbol,
            ...data
        }));
    },
    
    // Trading-Statistiken
    getStatistics() {
        return {
            ...this.tradingStats,
            activeAccounts: this.tradingAccounts.size,
            activeOrders: Array.from(this.tradingOrders.values()).filter(order => 
                order.status === 'pending'
            ).length,
            totalTransactions: this.tradingTransactions.size
        };
    }
};

// Events
mp.events.add('trading:createAccount', (player, initialBalance) => {
    tradingSystem.createTradingAccount(player, initialBalance);
});

mp.events.add('trading:placeOrder', (player, symbol, orderType, side, quantity, price) => {
    tradingSystem.placeOrder(player, symbol, orderType, side, quantity, price);
});

mp.events.add('trading:getMarketData', (player, symbol) => {
    const data = tradingSystem.getMarketData(symbol);
    if (data) {
        player.call('ui:show', 'MarketData', { symbol, data });
    }
});

// Commands
mp.events.addCommand('trading', (player, fullText, action, symbol, quantity, price) => {
    if (!action) {
        player.outputChatBox('Verwendung: /trading [create|buy|sell|portfolio|market] [Symbol] [Menge] [Preis]');
        player.outputChatBox('Verfügbare Symbole: AAPL, GOOGL, MSFT, TSLA, GOLD, SILVER, BTC, ETH');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            tradingSystem.createTradingAccount(player, 10000);
            break;
            
        case 'buy':
            if (symbol && quantity) {
                tradingSystem.placeOrder(player, symbol, 'market_order', 'buy', parseInt(quantity));
            } else {
                player.outputChatBox('Symbol und Menge erforderlich!');
            }
            break;
            
        case 'sell':
            if (symbol && quantity) {
                tradingSystem.placeOrder(player, symbol, 'market_order', 'sell', parseInt(quantity));
            } else {
                player.outputChatBox('Symbol und Menge erforderlich!');
            }
            break;
            
        case 'portfolio':
            const account = tradingSystem.getTradingAccount(player);
            if (account) {
                player.outputChatBox('=== Trading-Portfolio ===');
                player.outputChatBox(`Guthaben: $${account.balance}`);
                player.outputChatBox(`Portfolio-Wert: $${account.totalValue}`);
                player.outputChatBox(`Gewinn/Verlust: $${account.profitLoss}`);
                player.outputChatBox('=== Positionen ===');
                Object.keys(account.portfolio).forEach(symbol => {
                    const quantity = account.portfolio[symbol];
                    if (quantity > 0) {
                        player.outputChatBox(`${symbol}: ${quantity} Stück`);
                    }
                });
            } else {
                player.outputChatBox('Kein Trading-Konto gefunden!');
            }
            break;
            
        case 'market':
            const allData = tradingSystem.getAllMarketData();
            player.outputChatBox('=== Markt-Daten ===');
            allData.slice(0, 10).forEach(data => {
                player.outputChatBox(`${data.symbol}: $${data.lastPrice.toFixed(2)} (${data.changePercent.toFixed(2)}%)`);
            });
            break;
    }
});

// Trading-System initialisieren
tradingSystem.init();

module.exports = tradingSystem;
