// Faction API - Faction-API
// REST API Endpunkte für Faction-Management

const express = require('express');
const router = express.Router();

// Faction-Daten abrufen
router.get('/:id', (req, res) => {
    const factionId = req.params.id;
    
    try {
        const factionData = {
            id: factionId,
            name: `Faction_${factionId}`,
            description: 'Eine mächtige Faction',
            type: 'gang',
            level: Math.floor(Math.random() * 10) + 1,
            experience: Math.floor(Math.random() * 10000),
            money: Math.floor(Math.random() * 100000),
            bankMoney: Math.floor(Math.random() * 500000),
            members: Math.floor(Math.random() * 50) + 1,
            maxMembers: 100,
            leader: `Player_${Math.floor(Math.random() * 10) + 1}`,
            coLeader: `Player_${Math.floor(Math.random() * 10) + 1}`,
            territory: {
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 2000 - 1000,
                z: Math.random() * 100,
                radius: Math.random() * 500 + 100
            },
            headquarters: {
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 2000 - 1000,
                z: Math.random() * 100
            },
            created: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            statistics: {
                wars: Math.floor(Math.random() * 20),
                wins: Math.floor(Math.random() * 15),
                losses: Math.floor(Math.random() * 10),
                territory: Math.floor(Math.random() * 5),
                influence: Math.floor(Math.random() * 100)
            }
        };
        
        res.json({
            success: true,
            data: factionData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Alle Factions abrufen
router.get('/', (req, res) => {
    try {
        const factions = [];
        
        for (let i = 1; i <= 10; i++) {
            factions.push({
                id: i,
                name: `Faction_${i}`,
                description: `Beschreibung für Faction ${i}`,
                type: i % 2 === 0 ? 'gang' : 'organization',
                level: Math.floor(Math.random() * 10) + 1,
                experience: Math.floor(Math.random() * 10000),
                money: Math.floor(Math.random() * 100000),
                bankMoney: Math.floor(Math.random() * 500000),
                members: Math.floor(Math.random() * 50) + 1,
                maxMembers: 100,
                leader: `Player_${Math.floor(Math.random() * 10) + 1}`,
                coLeader: `Player_${Math.floor(Math.random() * 10) + 1}`,
                territory: {
                    x: Math.random() * 2000 - 1000,
                    y: Math.random() * 2000 - 1000,
                    z: Math.random() * 100,
                    radius: Math.random() * 500 + 100
                },
                headquarters: {
                    x: Math.random() * 2000 - 1000,
                    y: Math.random() * 2000 - 1000,
                    z: Math.random() * 100
                },
                created: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                statistics: {
                    wars: Math.floor(Math.random() * 20),
                    wins: Math.floor(Math.random() * 15),
                    losses: Math.floor(Math.random() * 10),
                    territory: Math.floor(Math.random() * 5),
                    influence: Math.floor(Math.random() * 100)
                }
            });
        }
        
        res.json({
            success: true,
            data: factions
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction erstellen
router.post('/', (req, res) => {
    try {
        const { name, description, type, leader } = req.body;
        
        // Validierung
        if (!name) {
            return res.status(400).json({
                success: false,
                error: 'Name ist erforderlich'
            });
        }
        
        if (!leader) {
            return res.status(400).json({
                success: false,
                error: 'Leader ist erforderlich'
            });
        }
        
        const factionData = {
            id: Date.now(), // Temporäre ID
            name: name,
            description: description || 'Eine neue Faction',
            type: type || 'gang',
            level: 1,
            experience: 0,
            money: 10000,
            bankMoney: 50000,
            members: 1,
            maxMembers: 100,
            leader: leader,
            coLeader: null,
            territory: {
                x: 0,
                y: 0,
                z: 0,
                radius: 100
            },
            headquarters: {
                x: 0,
                y: 0,
                z: 0
            },
            created: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            statistics: {
                wars: 0,
                wins: 0,
                losses: 0,
                territory: 0,
                influence: 0
            }
        };
        
        // Hier würde normalerweise die Datenbank aktualisiert werden
        
        res.json({
            success: true,
            data: factionData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction aktualisieren
router.put('/:id', (req, res) => {
    try {
        const factionId = req.params.id;
        const updateData = req.body;
        
        // Hier würde normalerweise die Datenbank aktualisiert werden
        
        res.json({
            success: true,
            message: 'Faction erfolgreich aktualisiert',
            data: { id: factionId, ...updateData }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction löschen
router.delete('/:id', (req, res) => {
    try {
        const factionId = req.params.id;
        
        // Hier würde normalerweise die Datenbank aktualisiert werden
        
        res.json({
            success: true,
            message: 'Faction erfolgreich gelöscht'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction-Mitglieder abrufen
router.get('/:id/members', (req, res) => {
    try {
        const factionId = req.params.id;
        const members = [];
        
        for (let i = 1; i <= 10; i++) {
            members.push({
                id: i,
                name: `Player_${i}`,
                rank: Math.floor(Math.random() * 10) + 1,
                role: i === 1 ? 'leader' : i === 2 ? 'co_leader' : 'member',
                joinDate: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                contribution: Math.floor(Math.random() * 1000),
                permissions: {
                    invite: i <= 3,
                    kick: i <= 2,
                    promote: i === 1,
                    demote: i === 1,
                    manage: i === 1
                }
            });
        }
        
        res.json({
            success: true,
            data: members
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction-Mitglied hinzufügen
router.post('/:id/members', (req, res) => {
    try {
        const factionId = req.params.id;
        const { playerId, rank, role } = req.body;
        
        if (!playerId) {
            return res.status(400).json({
                success: false,
                error: 'Player ID ist erforderlich'
            });
        }
        
        const memberData = {
            id: playerId,
            name: `Player_${playerId}`,
            rank: rank || 1,
            role: role || 'member',
            joinDate: new Date().toISOString(),
            lastActivity: new Date().toISOString(),
            contribution: 0,
            permissions: {
                invite: false,
                kick: false,
                promote: false,
                demote: false,
                manage: false
            }
        };
        
        res.json({
            success: true,
            data: memberData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction-Mitglied entfernen
router.delete('/:id/members/:memberId', (req, res) => {
    try {
        const factionId = req.params.id;
        const memberId = req.params.memberId;
        
        res.json({
            success: true,
            message: 'Mitglied erfolgreich entfernt'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Faction-Statistiken abrufen
router.get('/:id/statistics', (req, res) => {
    try {
        const factionId = req.params.id;
        
        const statistics = {
            wars: Math.floor(Math.random() * 20),
            wins: Math.floor(Math.random() * 15),
            losses: Math.floor(Math.random() * 10),
            territory: Math.floor(Math.random() * 5),
            influence: Math.floor(Math.random() * 100),
            members: Math.floor(Math.random() * 50) + 1,
            level: Math.floor(Math.random() * 10) + 1,
            experience: Math.floor(Math.random() * 10000),
            money: Math.floor(Math.random() * 100000),
            bankMoney: Math.floor(Math.random() * 500000)
        };
        
        res.json({
            success: true,
            data: statistics
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;