// Job API - Job-API
// REST API Endpunkte für Job-Management

const express = require('express');
const router = express.Router();

// Job-Daten abrufen
router.get('/:id', (req, res) => {
    const jobId = req.params.id;
    
    try {
        const jobData = {
            id: jobId,
            name: `Job_${jobId}`,
            type: 'legal',
            level: Math.floor(Math.random() * 10) + 1,
            experience: Math.floor(Math.random() * 1000),
            salary: Math.floor(Math.random() * 5000) + 1000,
            requirements: {
                level: Math.floor(Math.random() * 5) + 1,
                experience: Math.floor(Math.random() * 500),
                skills: ['communication', 'teamwork']
            },
            location: {
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 2000 - 1000,
                z: Math.random() * 100
            },
            workingHours: {
                start: '09:00',
                end: '17:00',
                days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
            },
            statistics: {
                completed: Math.floor(Math.random() * 100),
                failed: Math.floor(Math.random() * 20),
                rating: Math.random() * 5
            }
        };
        
        res.json({
            success: true,
            data: jobData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Alle Jobs abrufen
router.get('/', (req, res) => {
    try {
        const jobs = [];
        const jobTypes = ['police', 'ems', 'mechanic', 'taxi', 'delivery', 'construction', 'farming'];
        
        for (let i = 1; i <= 10; i++) {
            const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
            jobs.push({
                id: i,
                name: `${jobType.charAt(0).toUpperCase() + jobType.slice(1)} Job`,
                type: jobType,
                level: Math.floor(Math.random() * 10) + 1,
                experience: Math.floor(Math.random() * 1000),
                salary: Math.floor(Math.random() * 5000) + 1000,
                requirements: {
                    level: Math.floor(Math.random() * 5) + 1,
                    experience: Math.floor(Math.random() * 500),
                    skills: ['communication', 'teamwork']
                },
                location: {
                    x: Math.random() * 2000 - 1000,
                    y: Math.random() * 2000 - 1000,
                    z: Math.random() * 100
                },
                workingHours: {
                    start: '09:00',
                    end: '17:00',
                    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
                },
                statistics: {
                    completed: Math.floor(Math.random() * 100),
                    failed: Math.floor(Math.random() * 20),
                    rating: Math.random() * 5
                }
            });
        }
        
        res.json({
            success: true,
            data: jobs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Job bewerben
router.post('/apply', (req, res) => {
    try {
        const { jobId, playerId, coverLetter } = req.body;
        
        if (!jobId || !playerId) {
            return res.status(400).json({
                success: false,
                error: 'Job ID und Player ID sind erforderlich'
            });
        }
        
        const application = {
            id: Date.now(),
            jobId: jobId,
            playerId: playerId,
            coverLetter: coverLetter || '',
            status: 'pending',
            appliedAt: new Date().toISOString()
        };
        
        res.json({
            success: true,
            data: application
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Job annehmen
router.post('/accept', (req, res) => {
    try {
        const { jobId, playerId } = req.body;
        
        if (!jobId || !playerId) {
            return res.status(400).json({
                success: false,
                error: 'Job ID und Player ID sind erforderlich'
            });
        }
        
        const employment = {
            id: Date.now(),
            jobId: jobId,
            playerId: playerId,
            startDate: new Date().toISOString(),
            status: 'active',
            salary: Math.floor(Math.random() * 5000) + 1000
        };
        
        res.json({
            success: true,
            data: employment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Job kündigen
router.post('/quit', (req, res) => {
    try {
        const { jobId, playerId, reason } = req.body;
        
        if (!jobId || !playerId) {
            return res.status(400).json({
                success: false,
                error: 'Job ID und Player ID sind erforderlich'
            });
        }
        
        const resignation = {
            id: Date.now(),
            jobId: jobId,
            playerId: playerId,
            reason: reason || 'Kein Grund angegeben',
            quitDate: new Date().toISOString(),
            status: 'inactive'
        };
        
        res.json({
            success: true,
            data: resignation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
