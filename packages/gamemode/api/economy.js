// Economy API - Wirtschafts-API
// REST API Endpunkte für Wirtschafts-Management

const express = require('express');
const router = express.Router();

// Wirtschafts-Daten abrufen
router.get('/:id', (req, res) => {
    const economyId = req.params.id;
    
    try {
        const economyData = {
            id: economyId,
            name: `Economy_${economyId}`,
            type: 'player',
            money: Math.floor(Math.random() * 100000),
            bankMoney: Math.floor(Math.random() * 500000),
            totalMoney: 0,
            transactions: Math.floor(Math.random() * 1000),
            lastTransaction: new Date().toISOString(),
            statistics: {
                income: Math.floor(Math.random() * 50000),
                expenses: Math.floor(Math.random() * 30000),
                profit: 0,
                investments: Math.floor(Math.random() * 10000)
            }
        };
        
        economyData.totalMoney = economyData.money + economyData.bankMoney;
        economyData.statistics.profit = economyData.statistics.income - economyData.statistics.expenses;
        
        res.json({
            success: true,
            data: economyData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Transaktion durchführen
router.post('/transaction', (req, res) => {
    try {
        const { from, to, amount, type, description } = req.body;
        
        // Validierung
        if (!from || !to || !amount) {
            return res.status(400).json({
                success: false,
                error: 'From, To und Amount sind erforderlich'
            });
        }
        
        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                error: 'Amount muss größer als 0 sein'
            });
        }
        
        const transaction = {
            id: Date.now(),
            from: from,
            to: to,
            amount: amount,
            type: type || 'transfer',
            description: description || 'Transaktion',
            timestamp: new Date().toISOString(),
            status: 'completed'
        };
        
        // Hier würde normalerweise die Datenbank aktualisiert werden
        
        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Geld hinzufügen
router.post('/add', (req, res) => {
    try {
        const { playerId, amount, type, description } = req.body;
        
        if (!playerId || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Player ID und Amount sind erforderlich'
            });
        }
        
        const transaction = {
            id: Date.now(),
            playerId: playerId,
            amount: amount,
            type: type || 'add',
            description: description || 'Geld hinzugefügt',
            timestamp: new Date().toISOString(),
            status: 'completed'
        };
        
        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Geld entfernen
router.post('/remove', (req, res) => {
    try {
        const { playerId, amount, type, description } = req.body;
        
        if (!playerId || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Player ID und Amount sind erforderlich'
            });
        }
        
        const transaction = {
            id: Date.now(),
            playerId: playerId,
            amount: -amount,
            type: type || 'remove',
            description: description || 'Geld entfernt',
            timestamp: new Date().toISOString(),
            status: 'completed'
        };
        
        res.json({
            success: true,
            data: transaction
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;