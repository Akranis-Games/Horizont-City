// Brand System - Branding-System
// Behandelt alle Tattoo- und Branding-Funktionen für Horizont-City Roleplay

const brandSystem = {
    // Branding-Typen
    brandTypes: {
        TATTOO: 'tattoo',
        SCAR: 'scar',
        BRAND: 'brand',
        PIERCING: 'piercing',
        MAKEUP: 'makeup',
        HAIRSTYLE: 'hairstyle',
        CLOTHING: 'clothing'
    },
    
    // Tattoo-Kategorien
    tattooCategories: {
        ARMS: 'arms',
        LEGS: 'legs',
        TORSO: 'torso',
        BACK: 'back',
        HEAD: 'head',
        HANDS: 'hands',
        FEET: 'feet'
    },
    
    // Tattoo-Designs
    tattooDesigns: {
        arms: [
            { id: 'tattoo_arm_1', name: 'Drache', price: 500, category: 'arms', location: 'left_arm' },
            { id: 'tattoo_arm_2', name: 'Schlange', price: 400, category: 'arms', location: 'right_arm' },
            { id: 'tattoo_arm_3', name: 'Rose', price: 300, category: 'arms', location: 'left_arm' },
            { id: 'tattoo_arm_4', name: 'Kreuz', price: 200, category: 'arms', location: 'right_arm' },
            { id: 'tattoo_arm_5', name: 'Tribal', price: 600, category: 'arms', location: 'both_arms' }
        ],
        legs: [
            { id: 'tattoo_leg_1', name: 'Tiger', price: 700, category: 'legs', location: 'left_leg' },
            { id: 'tattoo_leg_2', name: 'Wolf', price: 600, category: 'legs', location: 'right_leg' },
            { id: 'tattoo_leg_3', name: 'Eagle', price: 500, category: 'legs', location: 'left_leg' },
            { id: 'tattoo_leg_4', name: 'Skull', price: 400, category: 'legs', location: 'right_leg' }
        ],
        torso: [
            { id: 'tattoo_torso_1', name: 'Chest Dragon', price: 1000, category: 'torso', location: 'chest' },
            { id: 'tattoo_torso_2', name: 'Back Piece', price: 1500, category: 'torso', location: 'back' },
            { id: 'tattoo_torso_3', name: 'Rib Cage', price: 800, category: 'torso', location: 'ribs' },
            { id: 'tattoo_torso_4', name: 'Stomach', price: 600, category: 'torso', location: 'stomach' }
        ],
        head: [
            { id: 'tattoo_head_1', name: 'Face Tribal', price: 2000, category: 'head', location: 'face' },
            { id: 'tattoo_head_2', name: 'Neck Piece', price: 1200, category: 'head', location: 'neck' },
            { id: 'tattoo_head_3', name: 'Behind Ear', price: 300, category: 'head', location: 'behind_ear' }
        ]
    },
    
    // Piercing-Typen
    piercingTypes: {
        EARS: 'ears',
        NOSE: 'nose',
        LIP: 'lip',
        EYEBROW: 'eyebrow',
        TONGUE: 'tongue',
        NAVEL: 'navel'
    },
    
    // Piercing-Designs
    piercingDesigns: {
        ears: [
            { id: 'piercing_ear_1', name: 'Ohrring Gold', price: 100, type: 'ears', location: 'left_ear' },
            { id: 'piercing_ear_2', name: 'Ohrring Silber', price: 80, type: 'ears', location: 'right_ear' },
            { id: 'piercing_ear_3', name: 'Tunnel', price: 150, type: 'ears', location: 'both_ears' },
            { id: 'piercing_ear_4', name: 'Helix', price: 120, type: 'ears', location: 'left_ear' }
        ],
        nose: [
            { id: 'piercing_nose_1', name: 'Nasenring', price: 90, type: 'nose', location: 'left_nostril' },
            { id: 'piercing_nose_2', name: 'Septum', price: 110, type: 'nose', location: 'septum' },
            { id: 'piercing_nose_3', name: 'Bridge', price: 130, type: 'nose', location: 'bridge' }
        ],
        lip: [
            { id: 'piercing_lip_1', name: 'Labret', price: 95, type: 'lip', location: 'lower_lip' },
            { id: 'piercing_lip_2', name: 'Monroe', price: 85, type: 'lip', location: 'upper_lip' },
            { id: 'piercing_lip_3', name: 'Snake Bites', price: 180, type: 'lip', location: 'both_lips' }
        ]
    },
    
    // Branding-Shops
    shops: [
        { x: 1322.6, y: -1651.9, z: 52.3, name: 'Tattoo Studio', type: 'tattoo' },
        { x: -1153.7, y: -1425.7, z: 4.9, name: 'Piercing Studio', type: 'piercing' },
        { x: 1864.6, y: 3747.7, z: 33.0, name: 'Branding Shop', type: 'brand' }
    ],
    
    // Spieler-Brandings
    playerBrandings: new Map(),
    
    // Branding-Initialisierung
    init() {
        console.log('[BRAND] Branding-System initialisiert');
        this.createShops();
    },
    
    // Shops erstellen
    createShops() {
        this.shops.forEach(shop => {
            const blip = mp.blips.new(75, new mp.Vector3(shop.x, shop.y, shop.z), {
                name: shop.name,
                color: 3,
                shortRange: true,
                scale: 0.8
            });
            
            // Marker erstellen
            mp.markers.new(1, new mp.Vector3(shop.x, shop.y, shop.z), 2.0, {
                color: [255, 0, 0, 100],
                visible: true
            });
        });
    },
    
    // Branding anwenden
    applyBranding(player, brandingType, designId, location = null) {
        const design = this.getDesign(brandingType, designId);
        if (!design) {
            player.outputChatBox('Design nicht gefunden!');
            return false;
        }
        
        // Preis prüfen
        if (!this.checkPayment(player, design.price)) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        // Branding speichern
        const playerId = player.id;
        if (!this.playerBrandings.has(playerId)) {
            this.playerBrandings.set(playerId, {
                tattoos: [],
                piercings: [],
                scars: [],
                brands: []
            });
        }
        
        const playerBranding = this.playerBrandings.get(playerId);
        
        switch (brandingType) {
            case 'tattoo':
                playerBranding.tattoos.push({
                    id: designId,
                    name: design.name,
                    category: design.category,
                    location: location || design.location,
                    appliedAt: Date.now()
                });
                break;
            case 'piercing':
                playerBranding.piercings.push({
                    id: designId,
                    name: design.name,
                    type: design.type,
                    location: location || design.location,
                    appliedAt: Date.now()
                });
                break;
        }
        
        // Zahlung abziehen
        this.processPayment(player, design.price);
        
        // Branding anwenden
        this.applyBrandingToPlayer(player, brandingType, design, location);
        
        // UI aktualisieren
        player.call('branding:update', [playerBranding]);
        
        player.outputChatBox(`${design.name} wurde angewendet! Kosten: $${design.price}`);
        console.log(`[BRAND] ${brandingType} ${designId} für Spieler ${playerId} angewendet`);
        return true;
    },
    
    // Branding entfernen
    removeBranding(player, brandingType, designId) {
        const playerId = player.id;
        const playerBranding = this.playerBrandings.get(playerId);
        
        if (!playerBranding) {
            player.outputChatBox('Keine Brandings gefunden!');
            return false;
        }
        
        let removed = false;
        
        switch (brandingType) {
            case 'tattoo':
                const tattooIndex = playerBranding.tattoos.findIndex(t => t.id === designId);
                if (tattooIndex !== -1) {
                    playerBranding.tattoos.splice(tattooIndex, 1);
                    removed = true;
                }
                break;
            case 'piercing':
                const piercingIndex = playerBranding.piercings.findIndex(p => p.id === designId);
                if (piercingIndex !== -1) {
                    playerBranding.piercings.splice(piercingIndex, 1);
                    removed = true;
                }
                break;
        }
        
        if (removed) {
            // Branding vom Spieler entfernen
            this.removeBrandingFromPlayer(player, brandingType, designId);
            
            // UI aktualisieren
            player.call('branding:update', [playerBranding]);
            
            player.outputChatBox('Branding entfernt!');
            console.log(`[BRAND] ${brandingType} ${designId} von Spieler ${playerId} entfernt`);
            return true;
        }
        
        player.outputChatBox('Branding nicht gefunden!');
        return false;
    },
    
    // Design abrufen
    getDesign(brandingType, designId) {
        switch (brandingType) {
            case 'tattoo':
                for (const category of Object.values(this.tattooDesigns)) {
                    const design = category.find(d => d.id === designId);
                    if (design) return design;
                }
                break;
            case 'piercing':
                for (const category of Object.values(this.piercingDesigns)) {
                    const design = category.find(d => d.id === designId);
                    if (design) return design;
                }
                break;
        }
        return null;
    },
    
    // Zahlung prüfen
    checkPayment(player, amount) {
        // Hier würde das Economy-System aufgerufen werden
        return player.getVariable('money') >= amount;
    },
    
    // Zahlung abwickeln
    processPayment(player, amount) {
        // Hier würde das Economy-System aufgerufen werden
        player.setVariable('money', player.getVariable('money') - amount);
    },
    
    // Branding auf Spieler anwenden
    applyBrandingToPlayer(player, brandingType, design, location) {
        // Hier würde das Branding visuell auf den Spieler angewendet werden
        console.log(`[BRAND] Branding ${design.name} auf ${location} angewendet`);
    },
    
    // Branding vom Spieler entfernen
    removeBrandingFromPlayer(player, brandingType, designId) {
        // Hier würde das Branding visuell vom Spieler entfernt werden
        console.log(`[BRAND] Branding ${designId} entfernt`);
    },
    
    // Spieler-Brandings abrufen
    getPlayerBrandings(playerId) {
        return this.playerBrandings.get(playerId) || {
            tattoos: [],
            piercings: [],
            scars: [],
            brands: []
        };
    },
    
    // Verfügbare Designs abrufen
    getAvailableDesigns(brandingType, category = null) {
        switch (brandingType) {
            case 'tattoo':
                if (category) {
                    return this.tattooDesigns[category] || [];
                }
                return Object.values(this.tattooDesigns).flat();
            case 'piercing':
                if (category) {
                    return this.piercingDesigns[category] || [];
                }
                return Object.values(this.piercingDesigns).flat();
        }
        return [];
    },
    
    // Branding-Statistiken
    getStatistics() {
        return {
            totalTattoos: Object.values(this.tattooDesigns).reduce((total, category) => total + category.length, 0),
            totalPiercings: Object.values(this.piercingDesigns).reduce((total, category) => total + category.length, 0),
            totalShops: this.shops.length,
            playersWithBrandings: this.playerBrandings.size
        };
    }
};

// Events
mp.events.add('branding:apply', (player, brandingType, designId, location) => {
    brandSystem.applyBranding(player, brandingType, designId, location);
});

mp.events.add('branding:remove', (player, brandingType, designId) => {
    brandSystem.removeBranding(player, brandingType, designId);
});

mp.events.add('branding:get', (player) => {
    const brandings = brandSystem.getPlayerBrandings(player.id);
    player.call('branding:update', [brandings]);
});

// Commands
mp.events.addCommand('tattoo', (player, fullText, designId, location) => {
    if (!designId) {
        const designs = brandSystem.getAvailableDesigns('tattoo');
        player.outputChatBox('Verwendung: /tattoo [DesignID] [Standort]');
        player.outputChatBox('Verfügbare Designs:');
        designs.forEach(design => {
            player.outputChatBox(`- ${design.id}: ${design.name} ($${design.price})`);
        });
        return;
    }
    
    brandSystem.applyBranding(player, 'tattoo', designId, location);
});

mp.events.addCommand('piercing', (player, fullText, designId, location) => {
    if (!designId) {
        const designs = brandSystem.getAvailableDesigns('piercing');
        player.outputChatBox('Verwendung: /piercing [DesignID] [Standort]');
        player.outputChatBox('Verfügbare Designs:');
        designs.forEach(design => {
            player.outputChatBox(`- ${design.id}: ${design.name} ($${design.price})`);
        });
        return;
    }
    
    brandSystem.applyBranding(player, 'piercing', designId, location);
});

mp.events.addCommand('removebranding', (player, fullText, brandingType, designId) => {
    if (!brandingType || !designId) {
        player.outputChatBox('Verwendung: /removebranding [Typ] [DesignID]');
        player.outputChatBox('Typen: tattoo, piercing');
        return;
    }
    
    brandSystem.removeBranding(player, brandingType, designId);
});

// Branding-System initialisieren
brandSystem.init();

module.exports = brandSystem;
