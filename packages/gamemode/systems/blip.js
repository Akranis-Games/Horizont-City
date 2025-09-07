// Blip System - Blip Maker mit Templates und Routen
// Behandelt alle Blip-Funktionen für Horizont-City Roleplay

const blipSystem = {
    // Blip-Typen
    blipTypes: {
        STANDARD: 'standard',
        CUSTOM: 'custom',
        ROUTE: 'route',
        AREA: 'area',
        TEMPORARY: 'temporary',
        DYNAMIC: 'dynamic',
        INTERACTIVE: 'interactive',
        ANIMATED: 'animated'
    },
    
    // Blip-Kategorien
    blipCategories: {
        LOCATION: 'location',
        SERVICE: 'service',
        BUSINESS: 'business',
        RESIDENTIAL: 'residential',
        GOVERNMENT: 'government',
        EMERGENCY: 'emergency',
        ENTERTAINMENT: 'entertainment',
        TRANSPORT: 'transport',
        SHOPPING: 'shopping',
        MEDICAL: 'medical',
        EDUCATION: 'education',
        RELIGIOUS: 'religious',
        RECREATION: 'recreation',
        INDUSTRIAL: 'industrial',
        MILITARY: 'military',
        CUSTOM: 'custom'
    },
    
    // Blip-Templates
    blipTemplates: {
        // Standorte
        location: {
            name: 'Standort',
            sprite: 1,
            color: 3,
            scale: 0.8,
            shortRange: true,
            category: 'location'
        },
        service: {
            name: 'Service',
            sprite: 2,
            color: 2,
            scale: 0.8,
            shortRange: true,
            category: 'service'
        },
        business: {
            name: 'Geschäft',
            sprite: 52,
            color: 2,
            scale: 0.8,
            shortRange: true,
            category: 'business'
        },
        residential: {
            name: 'Wohngebiet',
            sprite: 40,
            color: 2,
            scale: 0.8,
            shortRange: true,
            category: 'residential'
        },
        government: {
            name: 'Behörde',
            sprite: 60,
            color: 0,
            scale: 0.8,
            shortRange: true,
            category: 'government'
        },
        emergency: {
            name: 'Notfall',
            sprite: 61,
            color: 1,
            scale: 0.8,
            shortRange: false,
            category: 'emergency'
        },
        entertainment: {
            name: 'Unterhaltung',
            sprite: 84,
            color: 5,
            scale: 0.8,
            shortRange: true,
            category: 'entertainment'
        },
        transport: {
            name: 'Transport',
            sprite: 38,
            color: 3,
            scale: 0.8,
            shortRange: true,
            category: 'transport'
        },
        shopping: {
            name: 'Einkaufen',
            sprite: 52,
            color: 2,
            scale: 0.8,
            shortRange: true,
            category: 'shopping'
        },
        medical: {
            name: 'Medizin',
            sprite: 61,
            color: 1,
            scale: 0.8,
            shortRange: true,
            category: 'medical'
        },
        education: {
            name: 'Bildung',
            sprite: 84,
            color: 4,
            scale: 0.8,
            shortRange: true,
            category: 'education'
        },
        religious: {
            name: 'Religiös',
            sprite: 84,
            color: 0,
            scale: 0.8,
            shortRange: true,
            category: 'religious'
        },
        recreation: {
            name: 'Freizeit',
            sprite: 84,
            color: 5,
            scale: 0.8,
            shortRange: true,
            category: 'recreation'
        },
        industrial: {
            name: 'Industrie',
            sprite: 84,
            color: 6,
            scale: 0.8,
            shortRange: true,
            category: 'industrial'
        },
        military: {
            name: 'Militär',
            sprite: 84,
            color: 0,
            scale: 0.8,
            shortRange: false,
            category: 'military'
        }
    },
    
    // Blip-Farben
    blipColors: {
        0: 'Weiß',
        1: 'Rot',
        2: 'Grün',
        3: 'Blau',
        4: 'Gelb',
        5: 'Orange',
        6: 'Lila',
        7: 'Pink',
        8: 'Grau',
        9: 'Schwarz'
    },
    
    // Blip-Sprites
    blipSprites: {
        1: 'Standard',
        2: 'Service',
        3: 'Geschäft',
        4: 'Haus',
        5: 'Fahrzeug',
        6: 'Person',
        7: 'Waffe',
        8: 'Geld',
        9: 'Gesundheit',
        10: 'Ammo',
        11: 'Fahrzeug',
        12: 'Fahrzeug',
        13: 'Fahrzeug',
        14: 'Fahrzeug',
        15: 'Fahrzeug',
        16: 'Fahrzeug',
        17: 'Fahrzeug',
        18: 'Fahrzeug',
        19: 'Fahrzeug',
        20: 'Fahrzeug',
        21: 'Fahrzeug',
        22: 'Fahrzeug',
        23: 'Fahrzeug',
        24: 'Fahrzeug',
        25: 'Fahrzeug',
        26: 'Fahrzeug',
        27: 'Fahrzeug',
        28: 'Fahrzeug',
        29: 'Fahrzeug',
        30: 'Fahrzeug',
        31: 'Fahrzeug',
        32: 'Fahrzeug',
        33: 'Fahrzeug',
        34: 'Fahrzeug',
        35: 'Fahrzeug',
        36: 'Fahrzeug',
        37: 'Fahrzeug',
        38: 'Fahrzeug',
        39: 'Fahrzeug',
        40: 'Fahrzeug',
        41: 'Fahrzeug',
        42: 'Fahrzeug',
        43: 'Fahrzeug',
        44: 'Fahrzeug',
        45: 'Fahrzeug',
        46: 'Fahrzeug',
        47: 'Fahrzeug',
        48: 'Fahrzeug',
        49: 'Fahrzeug',
        50: 'Fahrzeug',
        51: 'Fahrzeug',
        52: 'Fahrzeug',
        53: 'Fahrzeug',
        54: 'Fahrzeug',
        55: 'Fahrzeug',
        56: 'Fahrzeug',
        57: 'Fahrzeug',
        58: 'Fahrzeug',
        59: 'Fahrzeug',
        60: 'Fahrzeug',
        61: 'Fahrzeug',
        62: 'Fahrzeug',
        63: 'Fahrzeug',
        64: 'Fahrzeug',
        65: 'Fahrzeug',
        66: 'Fahrzeug',
        67: 'Fahrzeug',
        68: 'Fahrzeug',
        69: 'Fahrzeug',
        70: 'Fahrzeug',
        71: 'Fahrzeug',
        72: 'Fahrzeug',
        73: 'Fahrzeug',
        74: 'Fahrzeug',
        75: 'Fahrzeug',
        76: 'Fahrzeug',
        77: 'Fahrzeug',
        78: 'Fahrzeug',
        79: 'Fahrzeug',
        80: 'Fahrzeug',
        81: 'Fahrzeug',
        82: 'Fahrzeug',
        83: 'Fahrzeug',
        84: 'Fahrzeug',
        85: 'Fahrzeug',
        86: 'Fahrzeug',
        87: 'Fahrzeug',
        88: 'Fahrzeug',
        89: 'Fahrzeug',
        90: 'Fahrzeug',
        91: 'Fahrzeug',
        92: 'Fahrzeug',
        93: 'Fahrzeug',
        94: 'Fahrzeug',
        95: 'Fahrzeug',
        96: 'Fahrzeug',
        97: 'Fahrzeug',
        98: 'Fahrzeug',
        99: 'Fahrzeug',
        100: 'Fahrzeug'
    },
    
    // Aktive Blips
    activeBlips: new Map(),
    
    // Blip-Projekte
    blipProjects: new Map(),
    
    // Blip-Routen
    blipRoutes: new Map(),
    
    // Blip-System-Initialisierung
    init() {
        console.log('[BLIP] Blip-System initialisiert');
        this.createDefaultBlips();
    },
    
    // Standard-Blips erstellen
    createDefaultBlips() {
        const blips = [
            // Geschäfte
            { id: 'blip_1', template: 'business', position: { x: 25, y: -1347, z: 29 }, name: '24/7 Store' },
            { id: 'blip_2', template: 'business', position: { x: -47, y: -1757, z: 29 }, name: '24/7 Store' },
            { id: 'blip_3', template: 'business', position: { x: 1135, y: -982, z: 46 }, name: '24/7 Store' },
            { id: 'blip_4', template: 'business', position: { x: -1222, y: -906, z: 12 }, name: '24/7 Store' },
            
            // Banken
            { id: 'blip_5', template: 'business', position: { x: 150, y: -1040, z: 29 }, name: 'Fleeca Bank' },
            { id: 'blip_6', template: 'business', position: { x: -1212, y: -330, z: 37 }, name: 'Fleeca Bank' },
            { id: 'blip_7', template: 'business', position: { x: 1175, y: 2706, z: 38 }, name: 'Fleeca Bank' },
            { id: 'blip_8', template: 'business', position: { x: -2957, y: 481, z: 15 }, name: 'Fleeca Bank' },
            
            // Krankenhäuser
            { id: 'blip_9', template: 'medical', position: { x: 1839, y: 3672, z: 34 }, name: 'Krankenhaus' },
            { id: 'blip_10', template: 'medical', position: { x: -449, y: -340, z: 34 }, name: 'Krankenhaus' },
            
            // Polizeiwachen
            { id: 'blip_11', template: 'emergency', position: { x: 425, y: -979, z: 30 }, name: 'Polizeiwache' },
            { id: 'blip_12', template: 'emergency', position: { x: -1108, y: -845, z: 19 }, name: 'Polizeiwache' },
            
            // Tankstellen
            { id: 'blip_13', template: 'service', position: { x: 49, y: 1758, z: 29 }, name: 'Tankstelle' },
            { id: 'blip_14', template: 'service', position: { x: 263, y: 2606, z: 44 }, name: 'Tankstelle' },
            { id: 'blip_15', template: 'service', position: { x: 1039, y: 2671, z: 39 }, name: 'Tankstelle' },
            { id: 'blip_16', template: 'service', position: { x: 1207, y: 2660, z: 37 }, name: 'Tankstelle' },
            
            // Garagen
            { id: 'blip_17', template: 'service', position: { x: 200, y: 300, z: 30 }, name: 'Garage' },
            { id: 'blip_18', template: 'service', position: { x: 300, y: 400, z: 30 }, name: 'Garage' },
            
            // Casinos
            { id: 'blip_19', template: 'entertainment', position: { x: 925, y: 46, z: 81 }, name: 'Casino' },
            { id: 'blip_20', template: 'entertainment', position: { x: 1111, y: 230, z: -50 }, name: 'Underground Casino' },
            
            // Juwelier
            { id: 'blip_21', template: 'business', position: { x: -630, y: -236, z: 38 }, name: 'Juwelier' },
            
            // Flughafen
            { id: 'blip_22', template: 'transport', position: { x: -1037, y: -2737, z: 20 }, name: 'Flughafen' },
            
            // Hafen
            { id: 'blip_23', template: 'transport', position: { x: 1208, y: -3114, z: 5 }, name: 'Hafen' },
            
            // Rathaus
            { id: 'blip_24', template: 'government', position: { x: -544, y: -204, z: 37 }, name: 'Rathaus' },
            
            // Schulen
            { id: 'blip_25', template: 'education', position: { x: -1037, y: -2737, z: 20 }, name: 'Schule' },
            
            // Kirchen
            { id: 'blip_26', template: 'religious', position: { x: -1037, y: -2737, z: 20 }, name: 'Kirche' },
            
            // Parks
            { id: 'blip_27', template: 'recreation', position: { x: -1037, y: -2737, z: 20 }, name: 'Park' },
            
            // Fabriken
            { id: 'blip_28', template: 'industrial', position: { x: -1037, y: -2737, z: 20 }, name: 'Fabrik' },
            
            // Militär
            { id: 'blip_29', template: 'military', position: { x: -1037, y: -2737, z: 20 }, name: 'Militärbasis' }
        ];
        
        blips.forEach(blip => {
            this.createBlip(blip);
        });
        
        console.log(`[BLIP] ${blips.length} Standard-Blips erstellt`);
    },
    
    // Blip erstellen
    createBlip(blipData) {
        const template = this.blipTemplates[blipData.template];
        if (!template) {
            console.error(`[BLIP] Unbekanntes Template: ${blipData.template}`);
            return false;
        }
        
        const blip = {
            id: blipData.id,
            name: blipData.name,
            template: blipData.template,
            position: blipData.position,
            sprite: template.sprite,
            color: template.color,
            scale: template.scale,
            shortRange: template.shortRange,
            category: template.category,
            visible: true,
            created: Date.now(),
            creator: null,
            project: null,
            route: null,
            animated: false,
            interactive: false,
            temporary: false,
            expiration: null
        };
        
        this.activeBlips.set(blipData.id, blip);
        
        // Blip-Objekt erstellen
        this.spawnBlipObject(blip);
        
        console.log(`[BLIP] Blip ${blipData.name} (${template.name}) erstellt`);
        return true;
    },
    
    // Blip-Objekt spawnen
    spawnBlipObject(blip) {
        // Hier würde das Blip-Objekt in der Welt erstellt werden
        console.log(`[BLIP] Blip-Objekt für ${blip.name} gespawnt`);
    },
    
    // Custom Blip erstellen
    createCustomBlip(player, name, position, sprite, color, scale = 0.8, shortRange = true) {
        const blipId = `custom_${Date.now()}`;
        const blip = {
            id: blipId,
            name: name,
            template: 'custom',
            position: position,
            sprite: sprite,
            color: color,
            scale: scale,
            shortRange: shortRange,
            category: 'custom',
            visible: true,
            created: Date.now(),
            creator: player.id,
            project: null,
            route: null,
            animated: false,
            interactive: false,
            temporary: false,
            expiration: null
        };
        
        this.activeBlips.set(blipId, blip);
        this.spawnBlipObject(blip);
        
        player.outputChatBox(`Custom Blip ${name} erstellt!`);
        console.log(`[BLIP] Custom Blip ${name} von Spieler ${player.id} erstellt`);
        return blipId;
    },
    
    // Blip bearbeiten
    editBlip(player, blipId, properties) {
        const blip = this.activeBlips.get(blipId);
        if (!blip) {
            player.outputChatBox('Blip nicht gefunden!');
            return false;
        }
        
        // Berechtigung prüfen
        if (blip.creator && blip.creator !== player.id) {
            player.outputChatBox('Du kannst diesen Blip nicht bearbeiten!');
            return false;
        }
        
        // Eigenschaften aktualisieren
        Object.keys(properties).forEach(key => {
            if (blip.hasOwnProperty(key)) {
                blip[key] = properties[key];
            }
        });
        
        // Blip-Objekt aktualisieren
        this.updateBlipObject(blip);
        
        player.outputChatBox(`Blip ${blip.name} bearbeitet!`);
        console.log(`[BLIP] Blip ${blipId} von Spieler ${player.id} bearbeitet`);
        return true;
    },
    
    // Blip-Objekt aktualisieren
    updateBlipObject(blip) {
        // Hier würde das Blip-Objekt aktualisiert werden
        console.log(`[BLIP] Blip-Objekt für ${blip.name} aktualisiert`);
    },
    
    // Blip löschen
    deleteBlip(player, blipId) {
        const blip = this.activeBlips.get(blipId);
        if (!blip) {
            player.outputChatBox('Blip nicht gefunden!');
            return false;
        }
        
        // Berechtigung prüfen
        if (blip.creator && blip.creator !== player.id) {
            player.outputChatBox('Du kannst diesen Blip nicht löschen!');
            return false;
        }
        
        // Blip-Objekt entfernen
        this.removeBlipObject(blip);
        
        // Blip aus Map entfernen
        this.activeBlips.delete(blipId);
        
        player.outputChatBox(`Blip ${blip.name} gelöscht!`);
        console.log(`[BLIP] Blip ${blipId} von Spieler ${player.id} gelöscht`);
        return true;
    },
    
    // Blip-Objekt entfernen
    removeBlipObject(blip) {
        // Hier würde das Blip-Objekt entfernt werden
        console.log(`[BLIP] Blip-Objekt für ${blip.name} entfernt`);
    },
    
    // Blip-Projekt erstellen
    createBlipProject(player, name, description) {
        const projectId = `project_${Date.now()}`;
        const project = {
            id: projectId,
            name: name,
            description: description,
            creator: player.id,
            blips: [],
            routes: [],
            created: Date.now(),
            status: 'active'
        };
        
        this.blipProjects.set(projectId, project);
        
        player.outputChatBox(`Blip-Projekt ${name} erstellt!`);
        console.log(`[BLIP] Blip-Projekt ${name} von Spieler ${player.id} erstellt`);
        return projectId;
    },
    
    // Blip zu Projekt hinzufügen
    addBlipToProject(player, blipId, projectId) {
        const blip = this.activeBlips.get(blipId);
        const project = this.blipProjects.get(projectId);
        
        if (!blip) {
            player.outputChatBox('Blip nicht gefunden!');
            return false;
        }
        
        if (!project) {
            player.outputChatBox('Projekt nicht gefunden!');
            return false;
        }
        
        // Berechtigung prüfen
        if (project.creator !== player.id) {
            player.outputChatBox('Du kannst diesem Projekt keine Blips hinzufügen!');
            return false;
        }
        
        // Blip zu Projekt hinzufügen
        project.blips.push(blipId);
        blip.project = projectId;
        
        player.outputChatBox(`Blip ${blip.name} zu Projekt ${project.name} hinzugefügt!`);
        console.log(`[BLIP] Blip ${blipId} zu Projekt ${projectId} hinzugefügt`);
        return true;
    },
    
    // Blip-Route erstellen
    createBlipRoute(player, name, blipIds) {
        const routeId = `route_${Date.now()}`;
        const route = {
            id: routeId,
            name: name,
            creator: player.id,
            blips: blipIds,
            waypoints: [],
            created: Date.now(),
            status: 'active'
        };
        
        // Wegpunkte aus Blips erstellen
        blipIds.forEach(blipId => {
            const blip = this.activeBlips.get(blipId);
            if (blip) {
                route.waypoints.push({
                    blipId: blipId,
                    position: blip.position,
                    name: blip.name
                });
            }
        });
        
        this.blipRoutes.set(routeId, route);
        
        player.outputChatBox(`Blip-Route ${name} erstellt!`);
        console.log(`[BLIP] Blip-Route ${name} von Spieler ${player.id} erstellt`);
        return routeId;
    },
    
    // Blip-Route folgen
    followBlipRoute(player, routeId) {
        const route = this.blipRoutes.get(routeId);
        if (!route) {
            player.outputChatBox('Route nicht gefunden!');
            return false;
        }
        
        // Route-UI anzeigen
        player.call('ui:show', 'BlipRoute', { route: route });
        
        player.outputChatBox(`Route ${route.name} gestartet!`);
        console.log(`[BLIP] Spieler ${player.id} folgt Route ${routeId}`);
        return true;
    },
    
    // Blip animieren
    animateBlip(player, blipId, animationType) {
        const blip = this.activeBlips.get(blipId);
        if (!blip) {
            player.outputChatBox('Blip nicht gefunden!');
            return false;
        }
        
        // Berechtigung prüfen
        if (blip.creator && blip.creator !== player.id) {
            player.outputChatBox('Du kannst diesen Blip nicht animieren!');
            return false;
        }
        
        blip.animated = true;
        blip.animationType = animationType;
        
        // Animation starten
        this.startBlipAnimation(blip);
        
        player.outputChatBox(`Blip ${blip.name} animiert!`);
        console.log(`[BLIP] Blip ${blipId} animiert von Spieler ${player.id}`);
        return true;
    },
    
    // Blip-Animation starten
    startBlipAnimation(blip) {
        // Hier würde die Blip-Animation implementiert werden
        console.log(`[BLIP] Animation für ${blip.name} gestartet`);
    },
    
    // Blip interaktiv machen
    makeBlipInteractive(player, blipId, interactionType) {
        const blip = this.activeBlips.get(blipId);
        if (!blip) {
            player.outputChatBox('Blip nicht gefunden!');
            return false;
        }
        
        // Berechtigung prüfen
        if (blip.creator && blip.creator !== player.id) {
            player.outputChatBox('Du kannst diesen Blip nicht interaktiv machen!');
            return false;
        }
        
        blip.interactive = true;
        blip.interactionType = interactionType;
        
        player.outputChatBox(`Blip ${blip.name} ist jetzt interaktiv!`);
        console.log(`[BLIP] Blip ${blipId} interaktiv gemacht von Spieler ${player.id}`);
        return true;
    },
    
    // Temporären Blip erstellen
    createTemporaryBlip(player, name, position, sprite, color, duration) {
        const blipId = `temp_${Date.now()}`;
        const blip = {
            id: blipId,
            name: name,
            template: 'temporary',
            position: position,
            sprite: sprite,
            color: color,
            scale: 0.8,
            shortRange: true,
            category: 'temporary',
            visible: true,
            created: Date.now(),
            creator: player.id,
            project: null,
            route: null,
            animated: false,
            interactive: false,
            temporary: true,
            expiration: Date.now() + duration
        };
        
        this.activeBlips.set(blipId, blip);
        this.spawnBlipObject(blip);
        
        // Auto-Delete Timer
        setTimeout(() => {
            this.deleteBlip(player, blipId);
        }, duration);
        
        player.outputChatBox(`Temporärer Blip ${name} erstellt!`);
        console.log(`[BLIP] Temporärer Blip ${name} von Spieler ${player.id} erstellt`);
        return blipId;
    },
    
    // Blip-Statistiken
    getStatistics() {
        return {
            totalBlips: this.activeBlips.size,
            totalProjects: this.blipProjects.size,
            totalRoutes: this.blipRoutes.size,
            templates: Object.keys(this.blipTemplates).length,
            colors: Object.keys(this.blipColors).length,
            sprites: Object.keys(this.blipSprites).length
        };
    }
};

// Events
mp.events.add('blip:create', (player, name, position, sprite, color, scale, shortRange) => {
    blipSystem.createCustomBlip(player, name, position, sprite, color, scale, shortRange);
});

mp.events.add('blip:edit', (player, blipId, properties) => {
    blipSystem.editBlip(player, blipId, properties);
});

mp.events.add('blip:delete', (player, blipId) => {
    blipSystem.deleteBlip(player, blipId);
});

mp.events.add('blip:createProject', (player, name, description) => {
    blipSystem.createBlipProject(player, name, description);
});

mp.events.add('blip:addToProject', (player, blipId, projectId) => {
    blipSystem.addBlipToProject(player, blipId, projectId);
});

mp.events.add('blip:createRoute', (player, name, blipIds) => {
    blipSystem.createBlipRoute(player, name, blipIds);
});

mp.events.add('blip:followRoute', (player, routeId) => {
    blipSystem.followBlipRoute(player, routeId);
});

mp.events.add('blip:animate', (player, blipId, animationType) => {
    blipSystem.animateBlip(player, blipId, animationType);
});

mp.events.add('blip:makeInteractive', (player, blipId, interactionType) => {
    blipSystem.makeBlipInteractive(player, blipId, interactionType);
});

mp.events.add('blip:createTemporary', (player, name, position, sprite, color, duration) => {
    blipSystem.createTemporaryBlip(player, name, position, sprite, color, duration);
});

// Commands
mp.events.addCommand('createblip', (player, fullText, name, sprite, color, scale, shortRange) => {
    if (!name || !sprite || !color) {
        player.outputChatBox('Verwendung: /createblip [Name] [Sprite] [Farbe] [Skala] [ShortRange]');
        player.outputChatBox('Sprites: 1-100, Farben: 0-9');
        return;
    }
    
    const position = player.position;
    const spriteNum = parseInt(sprite);
    const colorNum = parseInt(color);
    const scaleNum = parseFloat(scale) || 0.8;
    const shortRangeBool = shortRange === 'true';
    
    blipSystem.createCustomBlip(player, name, position, spriteNum, colorNum, scaleNum, shortRangeBool);
});

mp.events.addCommand('editblip', (player, fullText, blipId, property, value) => {
    if (!blipId || !property || !value) {
        player.outputChatBox('Verwendung: /editblip [BlipID] [Eigenschaft] [Wert]');
        player.outputChatBox('Eigenschaften: name, sprite, color, scale, shortRange');
        return;
    }
    
    const properties = {};
    properties[property] = value;
    
    blipSystem.editBlip(player, blipId, properties);
});

mp.events.addCommand('deleteblip', (player, fullText, blipId) => {
    if (!blipId) {
        player.outputChatBox('Verwendung: /deleteblip [BlipID]');
        return;
    }
    
    blipSystem.deleteBlip(player, blipId);
});

mp.events.addCommand('blipproject', (player, fullText, action, name, description) => {
    if (!action) {
        player.outputChatBox('Verwendung: /blipproject [create|add] [Name] [Beschreibung]');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (name && description) {
                blipSystem.createBlipProject(player, name, description);
            } else {
                player.outputChatBox('Name und Beschreibung erforderlich!');
            }
            break;
            
        case 'add':
            if (name && description) {
                blipSystem.addBlipToProject(player, name, description);
            } else {
                player.outputChatBox('BlipID und ProjektID erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('bliproute', (player, fullText, action, name, blipIds) => {
    if (!action) {
        player.outputChatBox('Verwendung: /bliproute [create|follow] [Name] [BlipIDs]');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (name && blipIds) {
                const blipIdArray = blipIds.split(',');
                blipSystem.createBlipRoute(player, name, blipIdArray);
            } else {
                player.outputChatBox('Name und BlipIDs erforderlich!');
            }
            break;
            
        case 'follow':
            if (name) {
                blipSystem.followBlipRoute(player, name);
            } else {
                player.outputChatBox('RouteID erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('blipstats', (player) => {
    const stats = blipSystem.getStatistics();
    player.outputChatBox('=== Blip Statistiken ===');
    player.outputChatBox(`Gesamt Blips: ${stats.totalBlips}`);
    player.outputChatBox(`Projekte: ${stats.totalProjects}`);
    player.outputChatBox(`Routen: ${stats.totalRoutes}`);
    player.outputChatBox(`Templates: ${stats.templates}`);
    player.outputChatBox(`Farben: ${stats.colors}`);
    player.outputChatBox(`Sprites: ${stats.sprites}`);
});

// Blip-System initialisieren
blipSystem.init();

module.exports = blipSystem;
