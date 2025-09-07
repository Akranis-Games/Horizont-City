// Construction System - Bauarbeiter-System
// Behandelt alle Bau-Funktionen für Horizont-City Roleplay

const constructionSystem = {
    // Bau-Typen
    constructionTypes: {
        HOUSE: 'house',
        BRIDGE: 'bridge',
        ROAD: 'road',
        WALL: 'wall',
        FENCE: 'fence',
        FOUNDATION: 'foundation',
        ROOF: 'roof',
        FLOOR: 'floor'
    },
    
    // Bau-Phasen
    constructionPhases: {
        PLANNING: 'planning',
        FOUNDATION: 'foundation',
        FRAMING: 'framing',
        WALLS: 'walls',
        ROOF: 'roof',
        FINISHING: 'finishing',
        COMPLETED: 'completed'
    },
    
    // Bau-Konfiguration
    constructionConfig: {
        house: {
            name: 'Haus',
            phases: ['foundation', 'framing', 'walls', 'roof', 'finishing'],
            duration: 3600000, // 1 Stunde
            workers: { min: 2, max: 6 },
            materials: {
                concrete: 50,
                steel: 30,
                wood: 100,
                bricks: 200,
                tiles: 50
            },
            experience: 100,
            reward: 5000
        },
        bridge: {
            name: 'Brücke',
            phases: ['foundation', 'framing', 'finishing'],
            duration: 7200000, // 2 Stunden
            workers: { min: 4, max: 10 },
            materials: {
                concrete: 200,
                steel: 150,
                cables: 50
            },
            experience: 200,
            reward: 15000
        },
        road: {
            name: 'Straße',
            phases: ['foundation', 'finishing'],
            duration: 1800000, // 30 Minuten
            workers: { min: 1, max: 4 },
            materials: {
                asphalt: 100,
                concrete: 50
            },
            experience: 50,
            reward: 2000
        },
        wall: {
            name: 'Mauer',
            phases: ['foundation', 'finishing'],
            duration: 900000, // 15 Minuten
            workers: { min: 1, max: 3 },
            materials: {
                bricks: 100,
                mortar: 20
            },
            experience: 25,
            reward: 1000
        }
    },
    
    // Baustellen
    constructionSites: new Map(),
    
    // Aktive Bauprojekte
    activeProjects: new Map(),
    
    // Spieler-Statistiken
    playerStats: new Map(),
    
    // Construction-Initialisierung
    init() {
        console.log('[CONSTRUCTION] Bau-System initialisiert');
        this.createConstructionSites();
    },
    
    // Baustellen erstellen
    createConstructionSites() {
        const sites = [
            { x: 100, y: 200, z: 30, type: 'house', id: 'site_1' },
            { x: 200, y: 300, z: 30, type: 'bridge', id: 'site_2' },
            { x: 300, y: 400, z: 30, type: 'road', id: 'site_3' },
            { x: 400, y: 500, z: 30, type: 'wall', id: 'site_4' }
        ];
        
        sites.forEach(site => {
            this.createConstructionSite(site);
        });
        
        console.log(`[CONSTRUCTION] ${sites.length} Baustellen erstellt`);
    },
    
    // Baustelle erstellen
    createConstructionSite(site) {
        const config = this.constructionConfig[site.type];
        if (!config) return;
        
        const constructionSite = {
            id: site.id,
            type: site.type,
            position: { x: site.x, y: site.y, z: site.z },
            config: config,
            phase: 'planning',
            progress: 0,
            workers: [],
            materials: { ...config.materials },
            startTime: null,
            endTime: null,
            status: 'available'
        };
        
        this.constructionSites.set(site.id, constructionSite);
        
        // Marker erstellen
        mp.markers.new(1, new mp.Vector3(site.x, site.y, site.z), 5.0, {
            color: [255, 165, 0, 100],
            visible: true
        });
        
        console.log(`[CONSTRUCTION] Baustelle ${site.id} (${config.name}) erstellt`);
    },
    
    // Bauprojekt starten
    startConstruction(player, siteId) {
        const site = this.constructionSites.get(siteId);
        if (!site) {
            player.outputChatBox('Baustelle nicht gefunden!');
            return false;
        }
        
        if (site.status !== 'available') {
            player.outputChatBox('Baustelle ist nicht verfügbar!');
            return false;
        }
        
        // Materialien prüfen
        if (!this.checkMaterials(player, site.materials)) {
            player.outputChatBox('Nicht genug Materialien!');
            return false;
        }
        
        // Bauprojekt erstellen
        const projectId = Date.now();
        const project = {
            id: projectId,
            siteId: siteId,
            leader: player.id,
            workers: [player.id],
            phase: 'foundation',
            progress: 0,
            startTime: Date.now(),
            endTime: Date.now() + site.config.duration,
            status: 'active'
        };
        
        this.activeProjects.set(projectId, project);
        
        // Baustelle aktualisieren
        site.status = 'active';
        site.workers = [player.id];
        site.startTime = Date.now();
        
        // Materialien verbrauchen
        this.consumeMaterials(player, site.materials);
        
        // Spieler benachrichtigen
        player.outputChatBox(`Bauprojekt ${site.config.name} gestartet!`);
        player.call('construction:start', [project]);
        
        // Timer setzen
        setTimeout(() => {
            this.completeConstruction(projectId);
        }, site.config.duration);
        
        console.log(`[CONSTRUCTION] Bauprojekt ${projectId} von Spieler ${player.id} gestartet`);
        return true;
    },
    
    // Bauphase abschließen
    completePhase(player, projectId, phase) {
        const project = this.activeProjects.get(projectId);
        if (!project) {
            player.outputChatBox('Bauprojekt nicht gefunden!');
            return false;
        }
        
        if (project.status !== 'active') {
            player.outputChatBox('Bauprojekt ist nicht aktiv!');
            return false;
        }
        
        const site = this.constructionSites.get(project.siteId);
        if (!site) {
            player.outputChatBox('Baustelle nicht gefunden!');
            return false;
        }
        
        // Phase prüfen
        const phases = site.config.phases;
        const currentPhaseIndex = phases.indexOf(site.phase);
        const nextPhaseIndex = currentPhaseIndex + 1;
        
        if (nextPhaseIndex >= phases.length) {
            // Bauprojekt abgeschlossen
            this.completeConstruction(projectId);
            return true;
        }
        
        // Nächste Phase
        const nextPhase = phases[nextPhaseIndex];
        site.phase = nextPhase;
        site.progress = Math.floor((nextPhaseIndex / phases.length) * 100);
        
        // Spieler-Statistiken aktualisieren
        this.updatePlayerStats(player.id, 'phasesCompleted', 1);
        
        // Belohnung für Phase
        const phaseReward = Math.floor(site.config.reward / phases.length);
        this.giveReward(player, phaseReward, site.config.experience / phases.length);
        
        player.outputChatBox(`Phase ${nextPhase} abgeschlossen! Fortschritt: ${site.progress}%`);
        player.call('construction:updatePhase', [project, nextPhase]);
        
        console.log(`[CONSTRUCTION] Phase ${nextPhase} für Projekt ${projectId} abgeschlossen`);
        return true;
    },
    
    // Bauprojekt abschließen
    completeConstruction(projectId) {
        const project = this.activeProjects.get(projectId);
        if (!project) return;
        
        const site = this.constructionSites.get(project.siteId);
        if (!site) return;
        
        // Projekt abschließen
        project.status = 'completed';
        project.endTime = Date.now();
        
        // Baustelle zurücksetzen
        site.status = 'available';
        site.phase = 'planning';
        site.progress = 0;
        site.workers = [];
        site.startTime = null;
        site.endTime = null;
        
        // Belohnungen verteilen
        project.workers.forEach(workerId => {
            const worker = mp.players.at(workerId);
            if (worker) {
                const finalReward = Math.floor(site.config.reward / project.workers.length);
                this.giveReward(worker, finalReward, site.config.experience);
                worker.outputChatBox(`Bauprojekt abgeschlossen! Belohnung: $${finalReward}, XP: ${site.config.experience}`);
            }
        });
        
        this.activeProjects.delete(projectId);
        console.log(`[CONSTRUCTION] Bauprojekt ${projectId} abgeschlossen`);
    },
    
    // Materialien prüfen
    checkMaterials(player, materials) {
        // Hier würde das Inventory-System aufgerufen werden
        for (const [material, amount] of Object.entries(materials)) {
            if (!player.getVariable(`hasItem_${material}`) || player.getVariable(`itemCount_${material}`) < amount) {
                return false;
            }
        }
        return true;
    },
    
    // Materialien verbrauchen
    consumeMaterials(player, materials) {
        // Hier würde das Inventory-System aufgerufen werden
        for (const [material, amount] of Object.entries(materials)) {
            player.call('inventory:removeItem', [material, amount]);
        }
    },
    
    // Belohnung geben
    giveReward(player, money, experience) {
        // Geld geben
        player.call('economy:addMoney', [money, 'construction']);
        
        // Erfahrung geben
        player.call('player:addExperience', [experience]);
    },
    
    // Spieler-Statistiken aktualisieren
    updatePlayerStats(playerId, stat, value) {
        if (!this.playerStats.has(playerId)) {
            this.playerStats.set(playerId, {
                projectsCompleted: 0,
                phasesCompleted: 0,
                experience: 0,
                level: 1
            });
        }
        
        const stats = this.playerStats.get(playerId);
        stats[stat] += value;
        
        // Level prüfen
        if (stat === 'experience') {
            const newLevel = Math.floor(stats.experience / 200) + 1;
            if (newLevel > stats.level) {
                stats.level = newLevel;
                const player = mp.players.at(playerId);
                if (player) {
                    player.outputChatBox(`Level up! Neues Level: ${newLevel}`);
                }
            }
        }
    },
    
    // Verfügbare Baustellen abrufen
    getAvailableSites() {
        return Array.from(this.constructionSites.values()).filter(site => site.status === 'available');
    },
    
    // Aktive Projekte abrufen
    getActiveProjects() {
        return Array.from(this.activeProjects.values());
    },
    
    // Spieler-Statistiken abrufen
    getPlayerStats(playerId) {
        return this.playerStats.get(playerId) || {
            projectsCompleted: 0,
            phasesCompleted: 0,
            experience: 0,
            level: 1
        };
    },
    
    // Construction-Statistiken
    getStatistics() {
        return {
            totalSites: this.constructionSites.size,
            availableSites: this.getAvailableSites().length,
            activeProjects: this.activeProjects.size,
            constructionTypes: Object.keys(this.constructionConfig).length
        };
    }
};

// Events
mp.events.add('construction:start', (player, siteId) => {
    constructionSystem.startConstruction(player, siteId);
});

mp.events.add('construction:completePhase', (player, projectId, phase) => {
    constructionSystem.completePhase(player, projectId, phase);
});

mp.events.add('construction:getSites', (player) => {
    const sites = constructionSystem.getAvailableSites();
    player.call('construction:updateSites', [sites]);
});

mp.events.add('construction:getStats', (player) => {
    const stats = constructionSystem.getPlayerStats(player.id);
    player.call('construction:updateStats', [stats]);
});

// Commands
mp.events.addCommand('build', (player, fullText, siteId) => {
    if (!siteId) {
        const sites = constructionSystem.getAvailableSites();
        player.outputChatBox('Verwendung: /build [BaustellenID]');
        player.outputChatBox('Verfügbare Baustellen:');
        sites.forEach(site => {
            player.outputChatBox(`- ${site.id}: ${site.config.name}`);
        });
        return;
    }
    
    constructionSystem.startConstruction(player, siteId);
});

mp.events.addCommand('construction', (player) => {
    const stats = constructionSystem.getPlayerStats(player.id);
    player.outputChatBox('=== Bau-Statistiken ===');
    player.outputChatBox(`Level: ${stats.level}`);
    player.outputChatBox(`Erfahrung: ${stats.experience}`);
    player.outputChatBox(`Projekte abgeschlossen: ${stats.projectsCompleted}`);
    player.outputChatBox(`Phasen abgeschlossen: ${stats.phasesCompleted}`);
});

// Construction-System initialisieren
constructionSystem.init();

module.exports = constructionSystem;
