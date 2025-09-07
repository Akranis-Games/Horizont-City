// Client Events - Clientseitige Event-Verwaltung
// Behandelt alle clientseitigen Events für Horizont-City Roleplay

// UI Events
mp.events.add('ui:show', (uiType, data) => {
    console.log(`[UI] Zeige UI: ${uiType}`, data);
    // UI wird von der UIManager-Klasse behandelt
});

mp.events.add('ui:hide', (uiType) => {
    console.log(`[UI] Verstecke UI: ${uiType}`);
    // UI wird von der UIManager-Klasse behandelt
});

mp.events.add('ui:update', (uiType, data) => {
    console.log(`[UI] Aktualisiere UI: ${uiType}`, data);
    // UI wird von der UIManager-Klasse behandelt
});

// Player Events
mp.events.add('player:updateUI', (data) => {
    console.log('[PLAYER] Spieler-Daten aktualisiert:', data);
    // HUD wird aktualisiert
});

mp.events.add('player:notification', (message, type = 'info') => {
    console.log(`[NOTIFICATION] ${type}: ${message}`);
    
    // Notification anzeigen
    mp.gui.chat.push(`[${type.toUpperCase()}] ${message}`);
});

// Faction Events
mp.events.add('faction:updateUI', (data) => {
    console.log('[FACTION] Faction-Daten aktualisiert:', data);
    // Faction UI wird aktualisiert
});

mp.events.add('faction:invite', (factionName, inviterName) => {
    console.log(`[FACTION] Einladung von ${inviterName} zur Faction ${factionName}`);
    
    // Faction-Einladung anzeigen
    mp.gui.chat.push(`[FACTION] Du wurdest von ${inviterName} zur Faction ${factionName} eingeladen!`);
});

// Economy Events
mp.events.add('economy:updateUI', (data) => {
    console.log('[ECONOMY] Economy-Daten aktualisiert:', data);
    // Economy UI wird aktualisiert
});

mp.events.add('economy:transaction', (amount, type, description) => {
    console.log(`[ECONOMY] Transaktion: ${type} ${amount}€ - ${description}`);
    
    // Transaktion anzeigen
    const sign = amount > 0 ? '+' : '';
    mp.gui.chat.push(`[ECONOMY] ${sign}${amount}€ - ${description}`);
});

// Bank Events
mp.events.add('bank:updateUI', (data) => {
    console.log('[BANK] Bank-Daten aktualisiert:', data);
    // Bank UI wird aktualisiert
});

mp.events.add('bank:transaction', (amount, type, description) => {
    console.log(`[BANK] Transaktion: ${type} ${amount}€ - ${description}`);
    
    // Bank-Transaktion anzeigen
    const sign = amount > 0 ? '+' : '';
    mp.gui.chat.push(`[BANK] ${sign}${amount}€ - ${description}`);
});

// Job Events
mp.events.add('job:updateUI', (data) => {
    console.log('[JOB] Job-Daten aktualisiert:', data);
    // Job UI wird aktualisiert
});

mp.events.add('job:notification', (message, type = 'info') => {
    console.log(`[JOB] ${type}: ${message}`);
    
    // Job-Notification anzeigen
    mp.gui.chat.push(`[JOB] ${message}`);
});

// Vehicle Events
mp.events.add('vehicle:updateUI', (data) => {
    console.log('[VEHICLE] Vehicle-Daten aktualisiert:', data);
    // Vehicle UI wird aktualisiert
});

mp.events.add('vehicle:spawn', (vehicleId, model, position) => {
    console.log(`[VEHICLE] Fahrzeug gespawnt: ${model} (${vehicleId})`);
    
    // Fahrzeug-Spawn anzeigen
    mp.gui.chat.push(`[VEHICLE] Fahrzeug ${model} gespawnt!`);
});

mp.events.add('vehicle:despawn', (vehicleId) => {
    console.log(`[VEHICLE] Fahrzeug despawnt: ${vehicleId}`);
    
    // Fahrzeug-Despawn anzeigen
    mp.gui.chat.push(`[VEHICLE] Fahrzeug despawnt!`);
});

// Housing Events
mp.events.add('housing:updateUI', (data) => {
    console.log('[HOUSING] Housing-Daten aktualisiert:', data);
    // Housing UI wird aktualisiert
});

mp.events.add('housing:notification', (message, type = 'info') => {
    console.log(`[HOUSING] ${type}: ${message}`);
    
    // Housing-Notification anzeigen
    mp.gui.chat.push(`[HOUSING] ${message}`);
});

// Phone Events
mp.events.add('phone:updateUI', (data) => {
    console.log('[PHONE] Phone-Daten aktualisiert:', data);
    // Phone UI wird aktualisiert
});

mp.events.add('phone:call', (caller, target) => {
    console.log(`[PHONE] Anruf von ${caller} an ${target}`);
    
    // Anruf anzeigen
    mp.gui.chat.push(`[PHONE] Anruf von ${caller}`);
});

mp.events.add('phone:message', (sender, message) => {
    console.log(`[PHONE] Nachricht von ${sender}: ${message}`);
    
    // Nachricht anzeigen
    mp.gui.chat.push(`[PHONE] ${sender}: ${message}`);
});

// Health Events
mp.events.add('health:updateUI', (data) => {
    console.log('[HEALTH] Health-Daten aktualisiert:', data);
    // Health UI wird aktualisiert
});

mp.events.add('health:damage', (amount, source) => {
    console.log(`[HEALTH] Schaden: ${amount} von ${source}`);
    
    // Schaden anzeigen
    mp.gui.chat.push(`[HEALTH] Schaden: ${amount} von ${source}`);
});

mp.events.add('health:heal', (amount, source) => {
    console.log(`[HEALTH] Heilung: ${amount} von ${source}`);
    
    // Heilung anzeigen
    mp.gui.chat.push(`[HEALTH] Heilung: ${amount} von ${source}`);
});

// Weather Events
mp.events.add('weather:update', (data) => {
    console.log('[WEATHER] Wetter aktualisiert:', data);
    // Wetter UI wird aktualisiert
});

mp.events.add('weather:change', (oldWeather, newWeather) => {
    console.log(`[WEATHER] Wetter geändert: ${oldWeather} -> ${newWeather}`);
    
    // Wetter-Änderung anzeigen
    mp.gui.chat.push(`[WEATHER] Wetter geändert: ${newWeather}`);
});

// Inventory Events
mp.events.add('inventory:updateUI', (data) => {
    console.log('[INVENTORY] Inventory-Daten aktualisiert:', data);
    // Inventory UI wird aktualisiert
});

mp.events.add('inventory:itemAdded', (item, quantity) => {
    console.log(`[INVENTORY] Item hinzugefügt: ${item.name} x${quantity}`);
    
    // Item-Hinzufügung anzeigen
    mp.gui.chat.push(`[INVENTORY] ${item.name} x${quantity} hinzugefügt!`);
});

mp.events.add('inventory:itemRemoved', (item, quantity) => {
    console.log(`[INVENTORY] Item entfernt: ${item.name} x${quantity}`);
    
    // Item-Entfernung anzeigen
    mp.gui.chat.push(`[INVENTORY] ${item.name} x${quantity} entfernt!`);
});

// Chat Events
mp.events.add('chat:message', (player, message) => {
    console.log(`[CHAT] ${player}: ${message}`);
    // Chat wird von RageMP behandelt
});

mp.events.add('chat:command', (command, args) => {
    console.log(`[CHAT] Command: ${command}`, args);
    // Commands werden von RageMP behandelt
});

// Error Events
mp.events.add('error:ui', (error) => {
    console.error('[ERROR] UI-Fehler:', error);
    
    // Fehler anzeigen
    mp.gui.chat.push(`[ERROR] UI-Fehler: ${error.message}`);
});

mp.events.add('error:network', (error) => {
    console.error('[ERROR] Netzwerk-Fehler:', error);
    
    // Fehler anzeigen
    mp.gui.chat.push(`[ERROR] Netzwerk-Fehler: ${error.message}`);
});

// Debug Events
mp.events.add('debug:info', (info) => {
    console.log('[DEBUG]', info);
    
    // Debug-Info anzeigen (nur im Debug-Modus)
    if (mp.localPlayer.getVariable('debugMode')) {
        mp.gui.chat.push(`[DEBUG] ${info}`);
    }
});

// Server Events
mp.events.add('server:message', (message) => {
    console.log('[SERVER]', message);
    
    // Server-Nachricht anzeigen
    mp.gui.chat.push(`[SERVER] ${message}`);
});

mp.events.add('server:announcement', (announcement) => {
    console.log('[SERVER] Ankündigung:', announcement);
    
    // Ankündigung anzeigen
    mp.gui.chat.push(`[ANNOUNCEMENT] ${announcement}`);
});

// Connection Events
mp.events.add('connection:lost', () => {
    console.log('[CONNECTION] Verbindung verloren');
    
    // Verbindungsverlust anzeigen
    mp.gui.chat.push('[CONNECTION] Verbindung zum Server verloren!');
});

mp.events.add('connection:restored', () => {
    console.log('[CONNECTION] Verbindung wiederhergestellt');
    
    // Verbindungswiederherstellung anzeigen
    mp.gui.chat.push('[CONNECTION] Verbindung zum Server wiederhergestellt!');
});

console.log('[CLIENT] Client Events geladen!');
