// Phone System - iPhone 16 und iPad mit Apps, Nachrichten und Einstellungen
// Implementiert das umfassende Phone-System für Horizont-City

const config = require('../../../conf.json');

// Phone-Datenbank
const phones = new Map();
const contacts = new Map();
const messages = new Map();
const calls = new Map();
const apps = new Map();

// Telefon-Klasse
class Phone {
    constructor(id, owner, phoneNumber, model) {
        this.id = id;
        this.owner = owner;
        this.phoneNumber = phoneNumber;
        this.model = model; // 'iphone16', 'ipad', 'android'
        this.isActive = true;
        this.battery = 100;
        this.signal = 100;
        this.wifi = true;
        this.bluetooth = false;
        this.location = true;
        this.notifications = true;
        this.silent = false;
        this.volume = 50;
        this.brightness = 80;
        this.wallpaper = 'default';
        this.ringtone = 'default';
        this.createdAt = new Date();
        this.lastUsed = new Date();
    }

    // Anruf tätigen
    makeCall(targetNumber) {
        if (!this.isActive) {
            return { success: false, message: 'Telefon ist ausgeschaltet!' };
        }

        if (this.battery < 10) {
            return { success: false, message: 'Batterie zu niedrig!' };
        }

        if (this.signal < 20) {
            return { success: false, message: 'Kein Signal!' };
        }

        const callId = Date.now() + Math.random();
        const call = {
            id: callId,
            caller: this.phoneNumber,
            target: targetNumber,
            startTime: new Date(),
            duration: 0,
            status: 'ringing',
            cost: 0
        };

        calls.set(callId, call);
        this.battery -= 1; // Batterieverbrauch
        this.lastUsed = new Date();

        return { success: true, message: `Anruf an ${targetNumber} gestartet!`, callId: callId };
    }

    // Anruf annehmen
    acceptCall(callId) {
        const call = calls.get(callId);
        if (!call) {
            return { success: false, message: 'Anruf nicht gefunden!' };
        }

        if (call.target !== this.phoneNumber) {
            return { success: false, message: 'Anruf nicht für dieses Telefon!' };
        }

        call.status = 'active';
        call.startTime = new Date();

        return { success: true, message: 'Anruf angenommen!' };
    }

    // Anruf beenden
    endCall(callId) {
        const call = calls.get(callId);
        if (!call) {
            return { success: false, message: 'Anruf nicht gefunden!' };
        }

        call.status = 'ended';
        call.duration = Math.floor((Date.now() - call.startTime.getTime()) / 1000);
        call.cost = Math.floor(call.duration / 60) * 0.1; // 0.1€ pro Minute

        this.battery -= Math.floor(call.duration / 60); // Batterieverbrauch
        this.lastUsed = new Date();

        return { 
            success: true, 
            message: `Anruf beendet! Dauer: ${call.duration}s, Kosten: ${call.cost}€`,
            duration: call.duration,
            cost: call.cost
        };
    }

    // Nachricht senden
    sendMessage(targetNumber, message) {
        if (!this.isActive) {
            return { success: false, message: 'Telefon ist ausgeschaltet!' };
        }

        if (this.battery < 5) {
            return { success: false, message: 'Batterie zu niedrig!' };
        }

        const messageId = Date.now() + Math.random();
        const sms = {
            id: messageId,
            sender: this.phoneNumber,
            target: targetNumber,
            message: message,
            timestamp: new Date(),
            status: 'sent',
            cost: 0.05 // 0.05€ pro SMS
        };

        messages.set(messageId, sms);
        this.battery -= 0.5; // Batterieverbrauch
        this.lastUsed = new Date();

        return { success: true, message: 'Nachricht gesendet!', messageId: messageId };
    }

    // Kontakt hinzufügen
    addContact(name, phoneNumber, email, notes) {
        const contactId = Date.now() + Math.random();
        const contact = {
            id: contactId,
            name: name,
            phoneNumber: phoneNumber,
            email: email || '',
            notes: notes || '',
            addedAt: new Date(),
            lastContact: null
        };

        contacts.set(contactId, contact);
        return { success: true, message: `Kontakt ${name} hinzugefügt!`, contactId: contactId };
    }

    // Kontakt bearbeiten
    editContact(contactId, name, phoneNumber, email, notes) {
        const contact = contacts.get(contactId);
        if (!contact) {
            return { success: false, message: 'Kontakt nicht gefunden!' };
        }

        contact.name = name;
        contact.phoneNumber = phoneNumber;
        contact.email = email || '';
        contact.notes = notes || '';

        return { success: true, message: 'Kontakt bearbeitet!' };
    }

    // Kontakt löschen
    deleteContact(contactId) {
        if (contacts.has(contactId)) {
            contacts.delete(contactId);
            return { success: true, message: 'Kontakt gelöscht!' };
        }
        return { success: false, message: 'Kontakt nicht gefunden!' };
    }

    // App installieren
    installApp(appId, appName, version) {
        const app = {
            id: appId,
            name: appName,
            version: version,
            installedAt: new Date(),
            isActive: true,
            permissions: []
        };

        apps.set(appId, app);
        return { success: true, message: `App ${appName} installiert!` };
    }

    // App deinstallieren
    uninstallApp(appId) {
        if (apps.has(appId)) {
            apps.delete(appId);
            return { success: true, message: 'App deinstalliert!' };
        }
        return { success: false, message: 'App nicht gefunden!' };
    }

    // Einstellungen ändern
    updateSettings(settings) {
        Object.keys(settings).forEach(key => {
            if (this.hasOwnProperty(key)) {
                this[key] = settings[key];
            }
        });

        return { success: true, message: 'Einstellungen aktualisiert!' };
    }

    // Batterie aufladen
    chargeBattery(amount) {
        this.battery = Math.min(100, this.battery + amount);
        return { success: true, message: `Batterie um ${amount}% aufgeladen!`, battery: this.battery };
    }

    // Telefon-Informationen
    getInfo() {
        return {
            id: this.id,
            owner: this.owner,
            phoneNumber: this.phoneNumber,
            model: this.model,
            isActive: this.isActive,
            battery: this.battery,
            signal: this.signal,
            wifi: this.wifi,
            bluetooth: this.bluetooth,
            location: this.location,
            notifications: this.notifications,
            silent: this.silent,
            volume: this.volume,
            brightness: this.brightness,
            wallpaper: this.wallpaper,
            ringtone: this.ringtone,
            contactCount: contacts.size,
            appCount: apps.size,
            lastUsed: this.lastUsed
        };
    }
}

// App-Klasse
class App {
    constructor(id, name, version, category, permissions, price) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.category = category; // 'social', 'utility', 'game', 'productivity', 'entertainment'
        this.permissions = permissions;
        this.price = price;
        this.isFree = price === 0;
        this.rating = 0;
        this.downloads = 0;
        this.description = '';
        this.createdAt = new Date();
    }

    // App installieren
    install(phoneId) {
        const phone = phones.get(phoneId);
        if (!phone) {
            return { success: false, message: 'Telefon nicht gefunden!' };
        }

        return phone.installApp(this.id, this.name, this.version);
    }

    // App-Informationen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            version: this.version,
            category: this.category,
            permissions: this.permissions,
            price: this.price,
            isFree: this.isFree,
            rating: this.rating,
            downloads: this.downloads,
            description: this.description
        };
    }
}

// Phone-Manager
class PhoneManager {
    constructor() {
        this.phones = phones;
        this.contacts = contacts;
        this.messages = messages;
        this.calls = calls;
        this.apps = apps;
    }

    // Telefon erstellen
    createPhone(owner, phoneNumber, model) {
        const id = Date.now() + Math.random();
        const phone = new Phone(id, owner, phoneNumber, model);
        this.phones.set(id, phone);
        return { success: true, phone: phone };
    }

    // App erstellen
    createApp(name, version, category, permissions, price) {
        const id = Date.now() + Math.random();
        const app = new App(id, name, version, category, permissions, price);
        this.apps.set(id, app);
        return { success: true, app: app };
    }

    // Spieler-Telefon abrufen
    getPlayerPhone(playerId) {
        for (let phone of this.phones.values()) {
            if (phone.owner === playerId) {
                return phone;
            }
        }
        return null;
    }

    // Telefonnummer suchen
    findPhoneByNumber(phoneNumber) {
        for (let phone of this.phones.values()) {
            if (phone.phoneNumber === phoneNumber) {
                return phone;
            }
        }
        return null;
    }

    // Eindeutige Telefonnummer generieren
    generatePhoneNumber() {
        const prefix = '555';
        const number = Math.floor(1000000 + Math.random() * 9000000);
        return prefix + number;
    }
}

// Globale Instanz
const phoneManager = new PhoneManager();

// Vordefinierte Apps erstellen
const predefinedApps = [
    {
        name: 'Nachrichten',
        version: '1.0.0',
        category: 'utility',
        permissions: ['sms', 'contacts'],
        price: 0
    },
    {
        name: 'Kontakte',
        version: '1.0.0',
        category: 'utility',
        permissions: ['contacts'],
        price: 0
    },
    {
        name: 'Kamera',
        version: '1.0.0',
        category: 'utility',
        permissions: ['camera', 'storage'],
        price: 0
    },
    {
        name: 'Galerie',
        version: '1.0.0',
        category: 'utility',
        permissions: ['storage'],
        price: 0
    },
    {
        name: 'Musik',
        version: '1.0.0',
        category: 'entertainment',
        permissions: ['storage', 'audio'],
        price: 0
    },
    {
        name: 'Karten',
        version: '1.0.0',
        category: 'utility',
        permissions: ['location'],
        price: 0
    },
    {
        name: 'Wetter',
        version: '1.0.0',
        category: 'utility',
        permissions: ['location'],
        price: 0
    },
    {
        name: 'Taschenrechner',
        version: '1.0.0',
        category: 'utility',
        permissions: [],
        price: 0
    },
    {
        name: 'Notizen',
        version: '1.0.0',
        category: 'productivity',
        permissions: ['storage'],
        price: 0
    },
    {
        name: 'Einstellungen',
        version: '1.0.0',
        category: 'utility',
        permissions: ['system'],
        price: 0
    },
    {
        name: 'Bank',
        version: '1.0.0',
        category: 'utility',
        permissions: ['internet'],
        price: 0
    },
    {
        name: 'Job',
        version: '1.0.0',
        category: 'productivity',
        permissions: ['internet'],
        price: 0
    }
];

// Vordefinierte Apps erstellen
predefinedApps.forEach(appData => {
    phoneManager.createApp(
        appData.name,
        appData.version,
        appData.category,
        appData.permissions,
        appData.price
    );
});

// Events
mp.events.add('phone:create', (player, model) => {
    const phoneNumber = phoneManager.generatePhoneNumber();
    const result = phoneManager.createPhone(player.id, phoneNumber, model);
    
    if (result.success) {
        player.outputChatBox(`Telefon erstellt! Nummer: ${phoneNumber}`);
        
        // Standard-Apps installieren
        phoneManager.apps.forEach(app => {
            result.phone.installApp(app.id, app.name, app.version);
        });
    } else {
        player.outputChatBox('Fehler beim Erstellen des Telefons!');
    }
});

mp.events.add('phone:call', (player, targetNumber) => {
    const phone = phoneManager.getPlayerPhone(player.id);
    if (!phone) {
        player.outputChatBox('Du besitzt kein Telefon!');
        return;
    }

    const result = phone.makeCall(targetNumber);
    player.outputChatBox(result.message);
});

mp.events.add('phone:answer', (player, callId) => {
    const phone = phoneManager.getPlayerPhone(player.id);
    if (!phone) {
        player.outputChatBox('Du besitzt kein Telefon!');
        return;
    }

    const result = phone.acceptCall(callId);
    player.outputChatBox(result.message);
});

mp.events.add('phone:hangup', (player, callId) => {
    const phone = phoneManager.getPlayerPhone(player.id);
    if (!phone) {
        player.outputChatBox('Du besitzt kein Telefon!');
        return;
    }

    const result = phone.endCall(callId);
    player.outputChatBox(result.message);
});

mp.events.add('phone:message', (player, targetNumber, message) => {
    const phone = phoneManager.getPlayerPhone(player.id);
    if (!phone) {
        player.outputChatBox('Du besitzt kein Telefon!');
        return;
    }

    const result = phone.sendMessage(targetNumber, message);
    player.outputChatBox(result.message);
});

mp.events.add('phone:addContact', (player, name, phoneNumber, email, notes) => {
    const phone = phoneManager.getPlayerPhone(player.id);
    if (!phone) {
        player.outputChatBox('Du besitzt kein Telefon!');
        return;
    }

    const result = phone.addContact(name, phoneNumber, email, notes);
    player.outputChatBox(result.message);
});

mp.events.add('phone:charge', (player, amount) => {
    const phone = phoneManager.getPlayerPhone(player.id);
    if (!phone) {
        player.outputChatBox('Du besitzt kein Telefon!');
        return;
    }

    const result = phone.chargeBattery(amount);
    player.outputChatBox(result.message);
});

// Commands
mp.events.addCommand('phone', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /phone [create|call|message|contacts|apps|settings|charge]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'create':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /phone create [Modell]');
                player.outputChatBox('Modelle: iphone16, ipad, android');
                return;
            }
            mp.events.call('phone:create', player, args[0]);
            break;
            
        case 'call':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /phone call [Telefonnummer]');
                return;
            }
            mp.events.call('phone:call', player, args[0]);
            break;
            
        case 'message':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /phone message [Telefonnummer] [Nachricht]');
                return;
            }
            const message = args.slice(1).join(' ');
            mp.events.call('phone:message', player, args[0], message);
            break;
            
        case 'contacts':
            const phone = phoneManager.getPlayerPhone(player.id);
            if (!phone) {
                player.outputChatBox('Du besitzt kein Telefon!');
                return;
            }
            
            player.outputChatBox('=== Kontakte ===');
            phoneManager.contacts.forEach(contact => {
                player.outputChatBox(`${contact.name} - ${contact.phoneNumber}`);
            });
            break;
            
        case 'apps':
            const phone2 = phoneManager.getPlayerPhone(player.id);
            if (!phone2) {
                player.outputChatBox('Du besitzt kein Telefon!');
                return;
            }
            
            player.outputChatBox('=== Apps ===');
            phone2.apps.forEach(app => {
                player.outputChatBox(`${app.name} - ${app.version}`);
            });
            break;
            
        case 'charge':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /phone charge [Betrag]');
                return;
            }
            mp.events.call('phone:charge', player, parseInt(args[0]));
            break;
    }
});

mp.events.addCommand('call', (player, fullText, phoneNumber) => {
    if (!phoneNumber) {
        player.outputChatBox('Verwendung: /call [Telefonnummer]');
        return;
    }

    mp.events.call('phone:call', player, phoneNumber);
});

mp.events.addCommand('sms', (player, fullText, phoneNumber, message) => {
    if (!phoneNumber || !message) {
        player.outputChatBox('Verwendung: /sms [Telefonnummer] [Nachricht]');
        return;
    }

    mp.events.call('phone:message', player, phoneNumber, message);
});

console.log('[PHONE] Phone-System geladen!');

module.exports = { Phone, App, PhoneManager, phoneManager };
