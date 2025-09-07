// Weather System - Wettersystem
// Behandelt alle Wetter-Funktionen für Horizont-City Roleplay

const weatherSystem = {
    // Wetter-Konfiguration
    weatherTypes: [
        'SUNNY',      // Sonnig
        'CLOUDY',     // Bewölkt
        'RAINY',      // Regnerisch
        'STORMY',     // Stürmisch
        'FOGGY',      // Nebelig
        'SNOWY'       // Schnee
    ],
    
    currentWeather: 'SUNNY',
    weatherDuration: 300000, // 5 Minuten in Millisekunden
    weatherTimer: null,
    
    // Wetter-Übergänge
    weatherTransitions: {
        'SUNNY': ['CLOUDY', 'FOGGY'],
        'CLOUDY': ['SUNNY', 'RAINY', 'FOGGY'],
        'RAINY': ['CLOUDY', 'STORMY'],
        'STORMY': ['RAINY', 'CLOUDY'],
        'FOGGY': ['SUNNY', 'CLOUDY'],
        'SNOWY': ['CLOUDY', 'FOGGY']
    },
    
    // Wetter-Effekte
    weatherEffects: {
        'SUNNY': {
            windSpeed: 0.0,
            windDirection: 0.0,
            rainLevel: 0.0,
            snowLevel: 0.0,
            fogLevel: 0.0
        },
        'CLOUDY': {
            windSpeed: 0.2,
            windDirection: 45.0,
            rainLevel: 0.0,
            snowLevel: 0.0,
            fogLevel: 0.1
        },
        'RAINY': {
            windSpeed: 0.5,
            windDirection: 90.0,
            rainLevel: 0.8,
            snowLevel: 0.0,
            fogLevel: 0.2
        },
        'STORMY': {
            windSpeed: 1.0,
            windDirection: 135.0,
            rainLevel: 1.0,
            snowLevel: 0.0,
            fogLevel: 0.3
        },
        'FOGGY': {
            windSpeed: 0.1,
            windDirection: 0.0,
            rainLevel: 0.0,
            snowLevel: 0.0,
            fogLevel: 0.9
        },
        'SNOWY': {
            windSpeed: 0.3,
            windDirection: 180.0,
            rainLevel: 0.0,
            snowLevel: 1.0,
            fogLevel: 0.4
        }
    },
    
    // Wetter-Initialisierung
    init() {
        console.log('[WEATHER] Wettersystem initialisiert');
        this.startWeatherCycle();
    },
    
    // Wetter-Zyklus starten
    startWeatherCycle() {
        this.weatherTimer = setInterval(() => {
            this.changeWeather();
        }, this.weatherDuration);
        
        console.log('[WEATHER] Wetter-Zyklus gestartet');
    },
    
    // Wetter ändern
    changeWeather() {
        const possibleWeathers = this.weatherTransitions[this.currentWeather];
        const newWeather = possibleWeathers[Math.floor(Math.random() * possibleWeathers.length)];
        
        this.setWeather(newWeather);
    },
    
    // Wetter setzen
    setWeather(weatherType) {
        if (!this.weatherTypes.includes(weatherType)) {
            console.error(`[WEATHER] Unbekannter Wettertyp: ${weatherType}`);
            return false;
        }
        
        const oldWeather = this.currentWeather;
        this.currentWeather = weatherType;
        
        // Wetter-Effekte anwenden
        this.applyWeatherEffects(weatherType);
        
        // Alle Spieler benachrichtigen
        mp.players.forEach(player => {
            player.call('weather:change', [oldWeather, weatherType]);
        });
        
        console.log(`[WEATHER] Wetter geändert: ${oldWeather} -> ${weatherType}`);
        return true;
    },
    
    // Wetter-Effekte anwenden
    applyWeatherEffects(weatherType) {
        const effects = this.weatherEffects[weatherType];
        
        // Wind-Effekte
        mp.world.setWindSpeed(effects.windSpeed);
        mp.world.setWindDirection(effects.windDirection);
        
        // Regen-Effekte
        mp.world.setRainLevel(effects.rainLevel);
        
        // Schnee-Effekte
        mp.world.setSnowLevel(effects.snowLevel);
        
        // Nebel-Effekte
        mp.world.setFogLevel(effects.fogLevel);
        
        console.log(`[WEATHER] Wetter-Effekte angewendet: ${weatherType}`);
    },
    
    // Wetter-Informationen abrufen
    getWeatherInfo() {
        return {
            current: this.currentWeather,
            effects: this.weatherEffects[this.currentWeather],
            duration: this.weatherDuration
        };
    },
    
    // Wetter-Zyklus stoppen
    stopWeatherCycle() {
        if (this.weatherTimer) {
            clearInterval(this.weatherTimer);
            this.weatherTimer = null;
        }
        
        console.log('[WEATHER] Wetter-Zyklus gestoppt');
    },
    
    // Wetter-Reset
    reset() {
        this.stopWeatherCycle();
        this.currentWeather = 'SUNNY';
        this.applyWeatherEffects('SUNNY');
        
        console.log('[WEATHER] Wettersystem zurückgesetzt');
    }
};

// Events
mp.events.add('weather:set', (player, weatherType) => {
    if (weatherSystem.setWeather(weatherType)) {
        player.outputChatBox(`Wetter auf ${weatherType} geändert!`);
    } else {
        player.outputChatBox('Ungültiger Wettertyp!');
    }
});

mp.events.add('weather:get', (player) => {
    const weatherInfo = weatherSystem.getWeatherInfo();
    player.outputChatBox(`Aktuelles Wetter: ${weatherInfo.current}`);
    player.outputChatBox(`Wind: ${weatherInfo.effects.windSpeed}, Regen: ${weatherInfo.effects.rainLevel}`);
});

mp.events.add('weather:cycle', (player, action) => {
    if (action === 'start') {
        weatherSystem.startWeatherCycle();
        player.outputChatBox('Wetter-Zyklus gestartet!');
    } else if (action === 'stop') {
        weatherSystem.stopWeatherCycle();
        player.outputChatBox('Wetter-Zyklus gestoppt!');
    }
});

// Commands
mp.events.addCommand('weather', (player, fullText, weatherType) => {
    if (!weatherType) {
        const weatherInfo = weatherSystem.getWeatherInfo();
        player.outputChatBox(`Aktuelles Wetter: ${weatherInfo.current}`);
        player.outputChatBox('Verfügbare Wetter: SUNNY, CLOUDY, RAINY, STORMY, FOGGY, SNOWY');
        return;
    }
    
    weatherSystem.setWeather(weatherType.toUpperCase());
    player.outputChatBox(`Wetter auf ${weatherType.toUpperCase()} geändert!`);
});

// Wettersystem initialisieren
weatherSystem.init();

module.exports = weatherSystem;