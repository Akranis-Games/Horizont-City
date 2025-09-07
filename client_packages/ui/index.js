// React UI System - Moderne Benutzeroberfläche mit React 18 und Tailwind CSS
// Haupt-UI-System für Horizont-City Roleplay

const React = require('react');
const ReactDOM = require('react-dom');

// UI-Komponenten laden
const HUD = require('./components/HUD');
const Phone = require('./components/Phone');
const Inventory = require('./components/Inventory');
const Faction = require('./components/Faction');
const Bank = require('./components/Bank');
const Job = require('./components/Job');
const Vehicle = require('./components/Vehicle');
const Housing = require('./components/Housing');
const Settings = require('./components/Settings');

// UI-Manager
class UIManager {
    constructor() {
        this.isVisible = false;
        this.currentUI = null;
        this.uiData = {};
        this.components = {
            HUD,
            Phone,
            Inventory,
            Faction,
            Bank,
            Job,
            Vehicle,
            Housing,
            Settings
        };
        
        this.init();
    }

    init() {
        // CEF-Browser erstellen
        this.browser = mp.browsers.new('package://ui/index.html');
        
        // Events registrieren
        this.registerEvents();
        
        // HUD standardmäßig anzeigen
        this.showUI('HUD');
    }

    registerEvents() {
        // UI-Show Event
        mp.events.add('ui:show', (uiType, data) => {
            this.showUI(uiType, data);
        });

        // UI-Hide Event
        mp.events.add('ui:hide', (uiType) => {
            this.hideUI(uiType);
        });

        // UI-Update Event
        mp.events.add('ui:update', (uiType, data) => {
            this.updateUI(uiType, data);
        });

        // UI-Action Event
        mp.events.add('ui:action', (uiType, action, data) => {
            this.handleAction(uiType, action, data);
        });

        // CEF-Events
        this.browser.on('ui:action', (uiType, action, data) => {
            this.handleAction(uiType, action, data);
        });

        this.browser.on('ui:close', (uiType) => {
            this.hideUI(uiType);
        });
    }

    showUI(uiType, data = {}) {
        if (!this.components[uiType]) {
            console.error(`UI-Komponente ${uiType} nicht gefunden!`);
            return;
        }

        this.currentUI = uiType;
        this.uiData = data;
        this.isVisible = true;

        // CEF anzeigen
        this.browser.active = true;
        mp.gui.cursor.show(true, true);

        // React-Komponente rendern
        this.renderUI();
    }

    hideUI(uiType) {
        if (this.currentUI === uiType) {
            this.currentUI = null;
            this.isVisible = false;
            this.uiData = {};

            // CEF verstecken
            this.browser.active = false;
            mp.gui.cursor.show(false, false);
        }
    }

    updateUI(uiType, data) {
        if (this.currentUI === uiType) {
            this.uiData = { ...this.uiData, ...data };
            this.renderUI();
        }
    }

    renderUI() {
        if (!this.currentUI || !this.components[this.currentUI]) {
            return;
        }

        const Component = this.components[this.currentUI];
        const element = React.createElement(Component, {
            data: this.uiData,
            onAction: (action, data) => this.handleAction(this.currentUI, action, data),
            onClose: () => this.hideUI(this.currentUI)
        });

        // React-Komponente in CEF rendern
        this.browser.execute(`
            ReactDOM.render(React.createElement(${this.currentUI}, {
                data: ${JSON.stringify(this.uiData)},
                onAction: (action, data) => {
                    mp.trigger('ui:action', '${this.currentUI}', action, data);
                },
                onClose: () => {
                    mp.trigger('ui:close', '${this.currentUI}');
                }
            }), document.getElementById('root'));
        `);
    }

    handleAction(uiType, action, data) {
        console.log(`UI-Aktion: ${uiType} - ${action}`, data);

        // Aktion an Server senden
        mp.events.callRemote('ui:action', uiType, action, data);
    }

    // Tastatur-Events
    handleKeyPress(key) {
        switch (key) {
            case 'F1':
                this.toggleUI('HUD');
                break;
            case 'F2':
                this.toggleUI('Phone');
                break;
            case 'F3':
                this.toggleUI('Inventory');
                break;
            case 'F4':
                this.toggleUI('Faction');
                break;
            case 'F5':
                this.toggleUI('Bank');
                break;
            case 'F6':
                this.toggleUI('Job');
                break;
            case 'F7':
                this.toggleUI('Vehicle');
                break;
            case 'F8':
                this.toggleUI('Housing');
                break;
            case 'F9':
                this.toggleUI('Settings');
                break;
            case 'Escape':
                if (this.isVisible) {
                    this.hideUI(this.currentUI);
                }
                break;
        }
    }

    toggleUI(uiType) {
        if (this.currentUI === uiType) {
            this.hideUI(uiType);
        } else {
            this.showUI(uiType);
        }
    }
}

// Globale UI-Instanz
const uiManager = new UIManager();

// Tastatur-Events
mp.keys.bind(0x70, true, () => uiManager.handleKeyPress('F1')); // F1
mp.keys.bind(0x71, true, () => uiManager.handleKeyPress('F2')); // F2
mp.keys.bind(0x72, true, () => uiManager.handleKeyPress('F3')); // F3
mp.keys.bind(0x73, true, () => uiManager.handleKeyPress('F4')); // F4
mp.keys.bind(0x74, true, () => uiManager.handleKeyPress('F5')); // F5
mp.keys.bind(0x75, true, () => uiManager.handleKeyPress('F6')); // F6
mp.keys.bind(0x76, true, () => uiManager.handleKeyPress('F7')); // F7
mp.keys.bind(0x77, true, () => uiManager.handleKeyPress('F8')); // F8
mp.keys.bind(0x78, true, () => uiManager.handleKeyPress('F9')); // F9
mp.keys.bind(0x1B, true, () => uiManager.handleKeyPress('Escape')); // Escape

// Server-Events
mp.events.add('player:updateUI', (data) => {
    uiManager.updateUI('HUD', data);
});

mp.events.add('faction:updateUI', (data) => {
    uiManager.updateUI('Faction', data);
});

mp.events.add('bank:updateUI', (data) => {
    uiManager.updateUI('Bank', data);
});

mp.events.add('job:updateUI', (data) => {
    uiManager.updateUI('Job', data);
});

mp.events.add('vehicle:updateUI', (data) => {
    uiManager.updateUI('Vehicle', data);
});

mp.events.add('housing:updateUI', (data) => {
    uiManager.updateUI('Housing', data);
});

console.log('[UI] React UI-System geladen!');

module.exports = { UIManager, uiManager };
