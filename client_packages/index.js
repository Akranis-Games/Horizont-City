// Horizont-City Roleplay Client - Haupt-Einstiegspunkt
// Lädt alle clientseitigen Module und UI-Komponenten

// UI-System laden
require('./ui/index.js');

// Events laden
require('./events.js');

// Commands laden
require('./commands.js');

// HUD laden
require('./hud/index.js');

// CEF-System laden
require('./cef/index.js');

console.log('[CLIENT] Horizont-City Roleplay Client geladen!');
