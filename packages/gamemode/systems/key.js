// Key System - Schlüssel & Sicherheitskarten-System
// Behandelt alle Schlüssel-Funktionen für Horizont-City Roleplay

const keySystem = {
    // Schlüssel-Typen
    keyTypes: {
        HOUSE: 'house',
        VEHICLE: 'vehicle',
        BUSINESS: 'business',
        GARAGE: 'garage',
        SAFE: 'safe',
        ELEVATOR: 'elevator',
        GATE: 'gate',
        DOOR: 'door',
        SECURITY_CARD: 'security_card',
        MASTER_KEY: 'master_key'
    },
    
    // Zugangs-Level
    accessLevels: {
        NONE: 0,
        BASIC: 1,
        STANDARD: 2,
        PREMIUM: 3,
        VIP: 4,
        ADMIN: 5,
        MASTER: 6
    },
    
    // Schlüssel-Konfiguration
    keyConfig: {
        house: {
            name: 'Hausschlüssel',
            accessLevel: 2,
            durability: 100,
            copyable: true,
            transferable: true,
            price: 50,
            description: 'Schlüssel für ein Haus'
        },
        vehicle: {
            name: 'Fahrzeugschlüssel',
            accessLevel: 2,
            durability: 80,
            copyable: true,
            transferable: true,
            price: 100,
            description: 'Schlüssel für ein Fahrzeug'
        },
        business: {
            name: 'Geschäftsschlüssel',
            accessLevel: 3,
            durability: 120,
            copyable: false,
            transferable: false,
            price: 200,
            description: 'Schlüssel für ein Geschäft'
        },
        garage: {
            name: 'Garagenschlüssel',
            accessLevel: 2,
            durability: 90,
            copyable: true,
            transferable: true,
            price: 75,
            description: 'Schlüssel für eine Garage'
        },
        safe: {
            name: 'Tresorschlüssel',
            accessLevel: 4,
            durability: 150,
            copyable: false,
            transferable: false,
            price: 500,
            description: 'Schlüssel für einen Tresor'
        },
        elevator: {
            name: 'Aufzugsschlüssel',
            accessLevel: 3,
            durability: 100,
            copyable: false,
            transferable: false,
            price: 300,
            description: 'Schlüssel für einen Aufzug'
        },
        gate: {
            name: 'Torschlüssel',
            accessLevel: 2,
            durability: 110,
            copyable: true,
            transferable: true,
            price: 60,
            description: 'Schlüssel für ein Tor'
        },
        door: {
            name: 'Türschlüssel',
            accessLevel: 1,
            durability: 70,
            copyable: true,
            transferable: true,
            price: 25,
            description: 'Schlüssel für eine Tür'
        },
        security_card: {
            name: 'Sicherheitskarte',
            accessLevel: 3,
            durability: 200,
            copyable: false,
            transferable: false,
            price: 400,
            description: 'Elektronische Sicherheitskarte'
        },
        master_key: {
            name: 'Hauptschlüssel',
            accessLevel: 6,
            durability: 1000,
            copyable: false,
            transferable: false,
            price: 5000,
            description: 'Hauptschlüssel für alle Bereiche'
        }
    },
    
    // Spieler-Schlüssel
    playerKeys: new Map(),
    
    // Schlüssel-Objekte
    keyObjects: new Map(),
    
    // Zugangs-Kontrollen
    accessControls: new Map(),
    
    // Key-System-Initialisierung
    init() {
        console.log('[KEY] Schlüssel-System initialisiert');
        this.createDefaultAccessControls();
    },
    
    // Standard-Zugangskontrollen erstellen
    createDefaultAccessControls() {
        const controls = [
            { id: 'control_1', name: 'Bank Haupteingang', type: 'business', position: { x: 150, y: -1040, z: 29 }, requiredLevel: 3, requiredKeys: ['business', 'security_card'] },
            { id: 'control_2', name: 'Juwelier Tresor', type: 'safe', position: { x: -630, y: -236, z: 38 }, requiredLevel: 4, requiredKeys: ['safe', 'security_card'] },
            { id: 'control_3', name: 'Garage Tor', type: 'garage', position: { x: 200, y: 300, z: 30 }, requiredLevel: 2, requiredKeys: ['garage'] },
            { id: 'control_4', name: 'Haus Eingang', type: 'house', position: { x: 100, y: 200, z: 30 }, requiredLevel: 2, requiredKeys: ['house'] },
            { id: 'control_5', name: 'Aufzug', type: 'elevator', position: { x: 300, y: 400, z: 30 }, requiredLevel: 3, requiredKeys: ['elevator'] }
        ];
        
        controls.forEach(control => {
            this.createAccessControl(control);
        });
        
        console.log(`[KEY] ${controls.length} Zugangskontrollen erstellt`);
    },
    
    // Zugangskontrolle erstellen
    createAccessControl(controlData) {
        const control = {
            id: controlData.id,
            name: controlData.name,
            type: controlData.type,
            position: controlData.position,
            requiredLevel: controlData.requiredLevel,
            requiredKeys: controlData.requiredKeys,
            status: 'locked',
            lastAccess: null,
            accessLog: []
        };
        
        this.accessControls.set(controlData.id, control);
        
        // Marker erstellen
        mp.markers.new(1, new mp.Vector3(controlData.position.x, controlData.position.y, controlData.position.z), 2.0, {
            color: [255, 255, 0, 100],
            visible: true
        });
        
        console.log(`[KEY] Zugangskontrolle ${controlData.name} erstellt`);
    },
    
    // Schlüssel erstellen
    createKey(player, keyType, targetId, customName = null) {
        const config = this.keyConfig[keyType];
        if (!config) {
            player.outputChatBox('Ungültiger Schlüssel-Typ!');
            return false;
        }
        
        // Preis prüfen
        if (!this.checkPayment(player, config.price)) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        // Schlüssel erstellen
        const keyId = Date.now();
        const key = {
            id: keyId,
            type: keyType,
            name: customName || config.name,
            targetId: targetId,
            owner: player.id,
            config: config,
            durability: config.durability,
            maxDurability: config.durability,
            created: Date.now(),
            lastUsed: null,
            uses: 0
        };
        
        // Spieler-Schlüssel hinzufügen
        if (!this.playerKeys.has(player.id)) {
            this.playerKeys.set(player.id, []);
        }
        
        this.playerKeys.get(player.id).push(key);
        this.keyObjects.set(keyId, key);
        
        // Zahlung abwickeln
        this.processPayment(player, config.price);
        
        // Schlüssel zum Inventar hinzufügen
        player.call('inventory:addItem', ['key', 1, { keyId: keyId, keyData: key }]);
        
        player.outputChatBox(`Schlüssel ${key.name} erstellt! Kosten: $${config.price}`);
        console.log(`[KEY] Schlüssel ${keyType} für Spieler ${player.id} erstellt`);
        return true;
    },
    
    // Schlüssel kopieren
    copyKey(player, keyId, targetPlayerId) {
        const key = this.keyObjects.get(keyId);
        if (!key) {
            player.outputChatBox('Schlüssel nicht gefunden!');
            return false;
        }
        
        // Kopierbarkeit prüfen
        if (!key.config.copyable) {
            player.outputChatBox('Dieser Schlüssel kann nicht kopiert werden!');
            return false;
        }
        
        // Berechtigung prüfen
        if (key.owner !== player.id) {
            player.outputChatBox('Du besitzt diesen Schlüssel nicht!');
            return false;
        }
        
        // Kopierkosten
        const copyPrice = Math.floor(key.config.price * 0.5);
        if (!this.checkPayment(player, copyPrice)) {
            player.outputChatBox('Nicht genug Geld für Kopie!');
            return false;
        }
        
        // Kopie erstellen
        const copyId = Date.now();
        const keyCopy = {
            ...key,
            id: copyId,
            owner: targetPlayerId,
            created: Date.now(),
            uses: 0,
            isCopy: true,
            originalId: keyId
        };
        
        // Kopie hinzufügen
        if (!this.playerKeys.has(targetPlayerId)) {
            this.playerKeys.set(targetPlayerId, []);
        }
        
        this.playerKeys.get(targetPlayerId).push(keyCopy);
        this.keyObjects.set(copyId, keyCopy);
        
        // Zahlung abwickeln
        this.processPayment(player, copyPrice);
        
        // Zielspieler benachrichtigen
        const targetPlayer = mp.players.at(targetPlayerId);
        if (targetPlayer) {
            targetPlayer.call('inventory:addItem', ['key', 1, { keyId: copyId, keyData: keyCopy }]);
            targetPlayer.outputChatBox(`Du hast eine Kopie von ${key.name} erhalten!`);
        }
        
        player.outputChatBox(`Schlüssel-Kopie erstellt! Kosten: $${copyPrice}`);
        console.log(`[KEY] Schlüssel ${keyId} für Spieler ${targetPlayerId} kopiert`);
        return true;
    },
    
    // Schlüssel verwenden
    useKey(player, keyId, controlId) {
        const key = this.keyObjects.get(keyId);
        if (!key) {
            player.outputChatBox('Schlüssel nicht gefunden!');
            return false;
        }
        
        const control = this.accessControls.get(controlId);
        if (!control) {
            player.outputChatBox('Zugangskontrolle nicht gefunden!');
            return false;
        }
        
        // Besitz prüfen
        if (key.owner !== player.id) {
            player.outputChatBox('Du besitzt diesen Schlüssel nicht!');
            return false;
        }
        
        // Zugangsberechtigung prüfen
        if (!this.checkAccess(key, control)) {
            player.outputChatBox('Schlüssel passt nicht!');
            return false;
        }
        
        // Schlüssel-Abnutzung
        this.damageKey(key);
        
        // Zugang gewähren
        this.grantAccess(player, control, key);
        
        // Log erstellen
        this.logAccess(player, control, key);
        
        player.outputChatBox(`Zugang zu ${control.name} gewährt!`);
        console.log(`[KEY] Spieler ${player.id} hat Zugang zu ${control.name} erhalten`);
        return true;
    },
    
    // Zugang prüfen
    checkAccess(key, control) {
        // Zugangs-Level prüfen
        if (key.config.accessLevel < control.requiredLevel) {
            return false;
        }
        
        // Benötigte Schlüssel prüfen
        if (control.requiredKeys && !control.requiredKeys.includes(key.type)) {
            return false;
        }
        
        return true;
    },
    
    // Zugang gewähren
    grantAccess(player, control, key) {
        control.status = 'unlocked';
        control.lastAccess = Date.now();
        
        // Spieler teleportieren oder Tür öffnen
        if (control.type === 'elevator') {
            this.operateElevator(player, control);
        } else if (control.type === 'gate') {
            this.openGate(control);
        } else {
            // Standard-Zugang
            player.outputChatBox(`Zugang zu ${control.name} gewährt!`);
        }
        
        // Auto-Lock Timer
        setTimeout(() => {
            control.status = 'locked';
            console.log(`[KEY] ${control.name} automatisch gesperrt`);
        }, 30000); // 30 Sekunden
    },
    
    // Aufzug bedienen
    operateElevator(player, control) {
        player.outputChatBox('Aufzug wird bedient...');
        // Hier würde die Aufzug-Logik implementiert werden
    },
    
    // Tor öffnen
    openGate(control) {
        console.log(`[KEY] Tor ${control.name} geöffnet`);
        // Hier würde die Tor-Öffnungs-Logik implementiert werden
    },
    
    // Schlüssel-Abnutzung
    damageKey(key) {
        key.durability -= 1;
        key.uses += 1;
        key.lastUsed = Date.now();
        
        if (key.durability <= 0) {
            this.breakKey(key);
        }
    },
    
    // Schlüssel reparieren
    repairKey(player, keyId) {
        const key = this.keyObjects.get(keyId);
        if (!key) {
            player.outputChatBox('Schlüssel nicht gefunden!');
            return false;
        }
        
        const repairCost = Math.floor(key.config.price * 0.3);
        if (!this.checkPayment(player, repairCost)) {
            player.outputChatBox('Nicht genug Geld für Reparatur!');
            return false;
        }
        
        key.durability = key.maxDurability;
        this.processPayment(player, repairCost);
        
        player.outputChatBox(`Schlüssel ${key.name} repariert! Kosten: $${repairCost}`);
        return true;
    },
    
    // Schlüssel brechen
    breakKey(key) {
        key.durability = 0;
        key.broken = true;
        
        // Besitzer benachrichtigen
        const owner = mp.players.at(key.owner);
        if (owner) {
            owner.outputChatBox(`Schlüssel ${key.name} ist kaputt!`);
        }
        
        console.log(`[KEY] Schlüssel ${key.id} ist kaputt`);
    },
    
    // Zugang loggen
    logAccess(player, control, key) {
        const logEntry = {
            timestamp: Date.now(),
            playerId: player.id,
            playerName: player.name,
            controlId: control.id,
            controlName: control.name,
            keyId: key.id,
            keyName: key.name
        };
        
        control.accessLog.push(logEntry);
        
        // Log in Datei speichern
        console.log(`[KEY] Zugang: ${player.name} -> ${control.name} mit ${key.name}`);
    },
    
    // Zahlung prüfen
    checkPayment(player, amount) {
        return player.getVariable('money') >= amount;
    },
    
    // Zahlung abwickeln
    processPayment(player, amount) {
        player.setVariable('money', player.getVariable('money') - amount);
    },
    
    // Spieler-Schlüssel abrufen
    getPlayerKeys(playerId) {
        return this.playerKeys.get(playerId) || [];
    },
    
    // Key-Statistiken
    getStatistics() {
        return {
            totalKeys: this.keyObjects.size,
            totalPlayers: this.playerKeys.size,
            totalControls: this.accessControls.size,
            keyTypes: Object.keys(this.keyConfig).length
        };
    }
};

// Events
mp.events.add('key:create', (player, keyType, targetId, customName) => {
    keySystem.createKey(player, keyType, targetId, customName);
});

mp.events.add('key:copy', (player, keyId, targetPlayerId) => {
    keySystem.copyKey(player, keyId, targetPlayerId);
});

mp.events.add('key:use', (player, keyId, controlId) => {
    keySystem.useKey(player, keyId, controlId);
});

mp.events.add('key:repair', (player, keyId) => {
    keySystem.repairKey(player, keyId);
});

// Commands
mp.events.addCommand('createkey', (player, fullText, keyType, targetId, customName) => {
    if (!keyType || !targetId) {
        player.outputChatBox('Verwendung: /createkey [Typ] [ZielID] [Name]');
        player.outputChatBox('Typen: house, vehicle, business, garage, safe, elevator, gate, door, security_card, master_key');
        return;
    }
    
    keySystem.createKey(player, keyType, targetId, customName);
});

mp.events.addCommand('copykey', (player, fullText, keyId, targetPlayerId) => {
    if (!keyId || !targetPlayerId) {
        player.outputChatBox('Verwendung: /copykey [SchlüsselID] [SpielerID]');
        return;
    }
    
    keySystem.copyKey(player, parseInt(keyId), parseInt(targetPlayerId));
});

mp.events.addCommand('usekey', (player, fullText, keyId, controlId) => {
    if (!keyId || !controlId) {
        player.outputChatBox('Verwendung: /usekey [SchlüsselID] [KontrolleID]');
        return;
    }
    
    keySystem.useKey(player, parseInt(keyId), controlId);
});

mp.events.addCommand('repairkey', (player, fullText, keyId) => {
    if (!keyId) {
        player.outputChatBox('Verwendung: /repairkey [SchlüsselID]');
        return;
    }
    
    keySystem.repairKey(player, parseInt(keyId));
});

mp.events.addCommand('mykeys', (player) => {
    const keys = keySystem.getPlayerKeys(player.id);
    player.outputChatBox('=== Deine Schlüssel ===');
    
    if (keys.length === 0) {
        player.outputChatBox('Keine Schlüssel gefunden!');
        return;
    }
    
    keys.forEach(key => {
        const status = key.broken ? 'KAPUTT' : `${key.durability}/${key.maxDurability}`;
        player.outputChatBox(`${key.name} (${key.type}) - Haltbarkeit: ${status}`);
    });
});

// Key-System initialisieren
keySystem.init();

module.exports = keySystem;
