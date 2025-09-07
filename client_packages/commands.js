// Client Commands - Clientseitige Commands
// Behandelt alle clientseitigen Commands für Horizont-City Roleplay

// UI Commands
mp.events.addCommand('hud', (player) => {
    mp.events.call('ui:show', 'HUD');
});

mp.events.addCommand('phone', (player) => {
    mp.events.call('ui:show', 'Phone');
});

mp.events.addCommand('inventory', (player) => {
    mp.events.call('ui:show', 'Inventory');
});

mp.events.addCommand('faction', (player) => {
    mp.events.call('ui:show', 'Faction');
});

mp.events.addCommand('bank', (player) => {
    mp.events.call('ui:show', 'Bank');
});

mp.events.addCommand('job', (player) => {
    mp.events.call('ui:show', 'Job');
});

mp.events.addCommand('vehicle', (player) => {
    mp.events.call('ui:show', 'Vehicle');
});

mp.events.addCommand('housing', (player) => {
    mp.events.call('ui:show', 'Housing');
});

mp.events.addCommand('settings', (player) => {
    mp.events.call('ui:show', 'Settings');
});

// Debug Commands
mp.events.addCommand('debug', (player, fullText, action) => {
    if (!action) {
        player.outputChatBox('Verwendung: /debug [on|off|info|ui|network]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'on':
            player.setVariable('debugMode', true);
            player.outputChatBox('Debug-Modus aktiviert!');
            break;
            
        case 'off':
            player.setVariable('debugMode', false);
            player.outputChatBox('Debug-Modus deaktiviert!');
            break;
            
        case 'info':
            const debugInfo = {
                position: player.position,
                rotation: player.rotation,
                health: player.health,
                armor: player.armor,
                dimension: player.dimension,
                vehicle: player.vehicle ? player.vehicle.id : null
            };
            player.outputChatBox(`Debug-Info: ${JSON.stringify(debugInfo, null, 2)}`);
            break;
            
        case 'ui':
            player.outputChatBox('UI-Debug-Info wird angezeigt...');
            mp.events.call('debug:info', 'UI-Debug-Info');
            break;
            
        case 'network':
            player.outputChatBox('Netzwerk-Debug-Info wird angezeigt...');
            mp.events.call('debug:info', 'Netzwerk-Debug-Info');
            break;
    }
});

// Test Commands
mp.events.addCommand('test', (player, fullText, action) => {
    if (!action) {
        player.outputChatBox('Verwendung: /test [ui|notification|error|success]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'ui':
            player.outputChatBox('Teste UI-System...');
            mp.events.call('ui:show', 'HUD', { test: true });
            break;
            
        case 'notification':
            mp.events.call('player:notification', 'Test-Notification', 'info');
            break;
            
        case 'error':
            mp.events.call('player:notification', 'Test-Fehler', 'error');
            break;
            
        case 'success':
            mp.events.call('player:notification', 'Test-Erfolg', 'success');
            break;
    }
});

// Position Commands
mp.events.addCommand('pos', (player) => {
    const pos = player.position;
    const rot = player.rotation;
    player.outputChatBox(`Position: ${pos.x}, ${pos.y}, ${pos.z}`);
    player.outputChatBox(`Rotation: ${rot.x}, ${rot.y}, ${rot.z}`);
});

mp.events.addCommand('goto', (player, fullText, x, y, z) => {
    if (!x || !y || !z) {
        player.outputChatBox('Verwendung: /goto [X] [Y] [Z]');
        return;
    }

    const position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    player.position = position;
    player.outputChatBox(`Teleportiert zu ${x}, ${y}, ${z}`);
});

// Vehicle Commands
mp.events.addCommand('veh', (player, fullText, model) => {
    if (!model) {
        player.outputChatBox('Verwendung: /veh [Model]');
        return;
    }

    const position = player.position;
    const rotation = player.rotation;
    
    try {
        const vehicle = mp.vehicles.new(model, position);
        vehicle.rotation = rotation;
        player.outputChatBox(`Fahrzeug ${model} erstellt!`);
    } catch (error) {
        player.outputChatBox(`Fehler beim Erstellen des Fahrzeugs: ${error.message}`);
    }
});

mp.events.addCommand('fix', (player) => {
    if (player.vehicle) {
        player.vehicle.health = 1000;
        player.vehicle.engineHealth = 1000;
        player.outputChatBox('Fahrzeug repariert!');
    } else {
        player.outputChatBox('Du sitzt in keinem Fahrzeug!');
    }
});

// Health Commands
mp.events.addCommand('heal', (player) => {
    player.health = 100;
    player.armor = 100;
    player.outputChatBox('Gesundheit und Rüstung wiederhergestellt!');
});

mp.events.addCommand('armor', (player, fullText, amount) => {
    const armorAmount = amount ? parseInt(amount) : 100;
    player.armor = Math.min(100, Math.max(0, armorAmount));
    player.outputChatBox(`Rüstung auf ${player.armor} gesetzt!`);
});

// Weather Commands
mp.events.addCommand('weather', (player, fullText, condition) => {
    if (!condition) {
        player.outputChatBox('Verwendung: /weather [Bedingung]');
        player.outputChatBox('Bedingungen: sunny, cloudy, rainy, stormy, foggy, snowy');
        return;
    }

    mp.events.callRemote('weather:set', condition);
    player.outputChatBox(`Wetter auf ${condition} geändert!`);
});

// Time Commands
mp.events.addCommand('time', (player, fullText, hour) => {
    if (!hour) {
        const now = new Date();
        player.outputChatBox(`Aktuelle Zeit: ${now.toLocaleTimeString('de-DE')}`);
        return;
    }

    const hourValue = parseInt(hour);
    if (hourValue < 0 || hourValue > 23) {
        player.outputChatBox('Stunde muss zwischen 0 und 23 liegen!');
        return;
    }

    mp.events.callRemote('time:set', hourValue);
    player.outputChatBox(`Zeit auf ${hourValue}:00 gesetzt!`);
});

// Animation Commands
mp.events.addCommand('anim', (player, fullText, animDict, animName) => {
    if (!animDict || !animName) {
        player.outputChatBox('Verwendung: /anim [AnimDict] [AnimName]');
        return;
    }

    player.taskPlayAnim(animDict, animName, 8.0, -8.0, -1, 1, 0, false, false, false);
    player.outputChatBox(`Animation ${animName} gestartet!`);
});

mp.events.addCommand('stopanim', (player) => {
    player.clearTasks();
    player.outputChatBox('Animation gestoppt!');
});

// Camera Commands
mp.events.addCommand('cam', (player, fullText, action) => {
    if (!action) {
        player.outputChatBox('Verwendung: /cam [free|follow|reset]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'free':
            mp.cameras.new('default', player.position, player.rotation, 60);
            player.outputChatBox('Freie Kamera aktiviert!');
            break;
            
        case 'follow':
            mp.cameras.new('default', player.position, player.rotation, 60);
            player.outputChatBox('Folge-Kamera aktiviert!');
            break;
            
        case 'reset':
            mp.cameras.destroyAll();
            player.outputChatBox('Kamera zurückgesetzt!');
            break;
    }
});

// Sound Commands
mp.events.addCommand('sound', (player, fullText, soundName) => {
    if (!soundName) {
        player.outputChatBox('Verwendung: /sound [SoundName]');
        return;
    }

    mp.audio.playSound(soundName);
    player.outputChatBox(`Sound ${soundName} abgespielt!`);
});

// Notification Commands
mp.events.addCommand('notify', (player, fullText, message) => {
    if (!message) {
        player.outputChatBox('Verwendung: /notify [Nachricht]');
        return;
    }

    mp.events.call('player:notification', message, 'info');
});

// Help Command
mp.events.addCommand('help', (player) => {
    player.outputChatBox('=== Horizont-City Roleplay Commands ===');
    player.outputChatBox('UI: /hud, /phone, /inventory, /faction, /bank, /job, /vehicle, /housing, /settings');
    player.outputChatBox('Debug: /debug [on|off|info|ui|network]');
    player.outputChatBox('Test: /test [ui|notification|error|success]');
    player.outputChatBox('Position: /pos, /goto [X] [Y] [Z]');
    player.outputChatBox('Fahrzeug: /veh [Model], /fix');
    player.outputChatBox('Gesundheit: /heal, /armor [Betrag]');
    player.outputChatBox('Wetter: /weather [Bedingung]');
    player.outputChatBox('Zeit: /time [Stunde]');
    player.outputChatBox('Animation: /anim [Dict] [Name], /stopanim');
    player.outputChatBox('Kamera: /cam [free|follow|reset]');
    player.outputChatBox('Sound: /sound [Name]');
    player.outputChatBox('Notification: /notify [Nachricht]');
});

console.log('[CLIENT] Client Commands geladen!');
