// Bank API - Bank-API
// REST API Endpunkte für Bank-Management

const express = require('express');
const router = express.Router();

// Bank-Konto abrufen
router.get('/:id', (req, res) => {
    const accountId = req.params.id;
    
    try {
        const accountData = {
            id: accountId,
            owner: `Player_${accountId}`,
            balance: Math.floor(Math.random() * 1000000),
            accountType: 'savings',
            interestRate: 0.02,
            lastTransaction: new Date().toISOString(),
            transactions: Math.floor(Math.random() * 500),
            statistics: {
                deposits: Math.floor(Math.random() * 100),
                withdrawals: Math.floor(Math.random() * 50),
                transfers: Math.floor(Math.random() * 200),
                interest: Math.floor(Math.random() * 5000)
            }
        };
        
        res.json({
            success: true,
            data: accountData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Einzahlung
router.post('/deposit', (req, res) => {
    try {
        const { accountId, amount, description } = req.body;
        
        if (!accountId || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Account ID und Amount sind erforderlich'
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
            accountId: accountId,
            amount: amount,
            type: 'deposit',
            description: description || 'Einzahlung',
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

// Abhebung
router.post('/withdraw', (req, res) => {
    try {
        const { accountId, amount, description } = req.body;
        
        if (!accountId || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Account ID und Amount sind erforderlich'
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
            accountId: accountId,
            amount: -amount,
            type: 'withdrawal',
            description: description || 'Abhebung',
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

// Überweisung
router.post('/transfer', (req, res) => {
    try {
        const { fromAccount, toAccount, amount, description } = req.body;
        
        if (!fromAccount || !toAccount || !amount) {
            return res.status(400).json({
                success: false,
                error: 'From Account, To Account und Amount sind erforderlich'
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
            fromAccount: fromAccount,
            toAccount: toAccount,
            amount: amount,
            type: 'transfer',
            description: description || 'Überweisung',
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
