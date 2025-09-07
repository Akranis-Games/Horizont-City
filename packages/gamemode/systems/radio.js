// Radio System - Radio-System mit Stationen und Musik
// Behandelt alle Radio-Funktionen für Horizont-City Roleplay

const radioSystem = {
    // Radio-Typen
    radioTypes: {
        AM: 'am',
        FM: 'fm',
        DIGITAL: 'digital',
        SATELLITE: 'satellite',
        INTERNET: 'internet',
        HAM: 'ham',
        CB: 'cb',
        EMERGENCY: 'emergency',
        POLICE: 'police',
        EMS: 'ems',
        FIRE: 'fire',
        TAXI: 'taxi',
        TRUCK: 'truck',
        AVIATION: 'aviation',
        MARINE: 'marine',
        MILITARY: 'military',
        CUSTOM: 'custom'
    },
    
    // Radio-Stationen
    radioStations: {
        // Musik-Stationen
        '101.5': {
            name: 'Horizont FM',
            frequency: 101.5,
            type: 'fm',
            genre: 'pop',
            description: 'Die beste Pop-Musik der Stadt',
            dj: 'DJ Max',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: true,
            news: true,
            weather: true,
            traffic: true,
            callSign: 'HZFM',
            power: 5000,
            location: { x: 1000, y: 2000, z: 100 }
        },
        '98.7': {
            name: 'Rock City Radio',
            frequency: 98.7,
            type: 'fm',
            genre: 'rock',
            description: 'Hard Rock und Metal 24/7',
            dj: 'DJ Thunder',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: true,
            news: false,
            weather: false,
            traffic: false,
            callSign: 'RCR',
            power: 3000,
            location: { x: 1500, y: 2500, z: 100 }
        },
        '95.3': {
            name: 'Classic Hits',
            frequency: 95.3,
            type: 'fm',
            genre: 'classic',
            description: 'Die größten Hits aller Zeiten',
            dj: 'DJ Vintage',
            listeners: 0,
            quality: 'medium',
            coverage: 'city',
            language: 'german',
            ads: true,
            news: true,
            weather: true,
            traffic: false,
            callSign: 'CHR',
            power: 2000,
            location: { x: 2000, y: 3000, z: 100 }
        },
        '89.1': {
            name: 'Jazz Lounge',
            frequency: 89.1,
            type: 'fm',
            genre: 'jazz',
            description: 'Smooth Jazz und Lounge Music',
            dj: 'DJ Smooth',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: false,
            news: false,
            weather: false,
            traffic: false,
            callSign: 'JZL',
            power: 1500,
            location: { x: 2500, y: 3500, z: 100 }
        },
        '106.9': {
            name: 'Electronic Beats',
            frequency: 106.9,
            type: 'fm',
            genre: 'electronic',
            description: 'Electronic Dance Music',
            dj: 'DJ Pulse',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: true,
            news: false,
            weather: false,
            traffic: false,
            callSign: 'EBR',
            power: 4000,
            location: { x: 3000, y: 4000, z: 100 }
        },
        
        // Nachrichten-Stationen
        '103.7': {
            name: 'News Radio',
            frequency: 103.7,
            type: 'fm',
            genre: 'news',
            description: 'Aktuelle Nachrichten und Informationen',
            dj: 'News Anchor',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: true,
            news: true,
            weather: true,
            traffic: true,
            callSign: 'NRZ',
            power: 5000,
            location: { x: 3500, y: 4500, z: 100 }
        },
        
        // Talk-Stationen
        '97.5': {
            name: 'Talk Radio',
            frequency: 97.5,
            type: 'fm',
            genre: 'talk',
            description: 'Diskussionen und Gespräche',
            dj: 'Talk Host',
            listeners: 0,
            quality: 'medium',
            coverage: 'city',
            language: 'german',
            ads: true,
            news: true,
            weather: true,
            traffic: true,
            callSign: 'TRZ',
            power: 2500,
            location: { x: 4000, y: 5000, z: 100 }
        },
        
        // Spezial-Stationen
        '91.3': {
            name: 'Emergency Radio',
            frequency: 91.3,
            type: 'fm',
            genre: 'emergency',
            description: 'Notfall-Informationen und Warnungen',
            dj: 'Emergency Broadcast',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: false,
            news: true,
            weather: true,
            traffic: true,
            callSign: 'EMR',
            power: 10000,
            location: { x: 4500, y: 5500, z: 100 }
        },
        '88.5': {
            name: 'Police Radio',
            frequency: 88.5,
            type: 'fm',
            genre: 'police',
            description: 'Polizei-Funk und Sicherheitsinformationen',
            dj: 'Police Dispatch',
            listeners: 0,
            quality: 'high',
            coverage: 'city',
            language: 'german',
            ads: false,
            news: false,
            weather: false,
            traffic: true,
            callSign: 'POL',
            power: 8000,
            location: { x: 5000, y: 6000, z: 100 }
        },
        '92.1': {
            name: 'Taxi Radio',
            frequency: 92.1,
            type: 'fm',
            genre: 'taxi',
            description: 'Taxi-Dispatch und Fahrgast-Informationen',
            dj: 'Taxi Dispatch',
            listeners: 0,
            quality: 'medium',
            coverage: 'city',
            language: 'german',
            ads: false,
            news: false,
            weather: false,
            traffic: true,
            callSign: 'TAXI',
            power: 3000,
            location: { x: 5500, y: 6500, z: 100 }
        }
    },
    
    // Musik-Genres
    musicGenres: {
        pop: {
            name: 'Pop',
            description: 'Populäre Musik',
            artists: ['Ariana Grande', 'Ed Sheeran', 'Taylor Swift', 'Justin Bieber'],
            mood: 'upbeat',
            energy: 'high',
            popularity: 'very_high'
        },
        rock: {
            name: 'Rock',
            description: 'Rock und Metal Musik',
            artists: ['AC/DC', 'Metallica', 'Guns N\' Roses', 'Led Zeppelin'],
            mood: 'aggressive',
            energy: 'very_high',
            popularity: 'high'
        },
        classic: {
            name: 'Classic',
            description: 'Klassische Hits',
            artists: ['The Beatles', 'Queen', 'Elvis Presley', 'Michael Jackson'],
            mood: 'nostalgic',
            energy: 'medium',
            popularity: 'high'
        },
        jazz: {
            name: 'Jazz',
            description: 'Jazz und Lounge Musik',
            artists: ['Miles Davis', 'John Coltrane', 'Ella Fitzgerald', 'Louis Armstrong'],
            mood: 'relaxed',
            energy: 'low',
            popularity: 'medium'
        },
        electronic: {
            name: 'Electronic',
            description: 'Electronic Dance Music',
            artists: ['Deadmau5', 'Skrillex', 'Calvin Harris', 'David Guetta'],
            mood: 'energetic',
            energy: 'very_high',
            popularity: 'high'
        },
        country: {
            name: 'Country',
            description: 'Country Musik',
            artists: ['Johnny Cash', 'Dolly Parton', 'Willie Nelson', 'Kenny Rogers'],
            mood: 'folksy',
            energy: 'medium',
            popularity: 'medium'
        },
        hip_hop: {
            name: 'Hip Hop',
            description: 'Hip Hop und Rap',
            artists: ['Eminem', 'Jay-Z', 'Kanye West', 'Drake'],
            mood: 'urban',
            energy: 'high',
            popularity: 'very_high'
        },
        classical: {
            name: 'Classical',
            description: 'Klassische Musik',
            artists: ['Mozart', 'Beethoven', 'Bach', 'Chopin'],
            mood: 'sophisticated',
            energy: 'low',
            popularity: 'low'
        }
    },
    
    // Aktive Radios
    activeRadios: new Map(),
    
    // Radio-Listeners
    radioListeners: new Map(),
    
    // Radio-Programme
    radioPrograms: new Map(),
    
    // Radio-System-Initialisierung
    init() {
        console.log('[RADIO] Radio-System initialisiert');
        this.initializeStations();
        this.startRadioPrograms();
    },
    
    // Stationen initialisieren
    initializeStations() {
        Object.keys(this.radioStations).forEach(frequency => {
            const station = this.radioStations[frequency];
            station.frequency = parseFloat(frequency);
            station.listeners = 0;
            station.status = 'active';
            station.currentSong = null;
            station.playlist = this.generatePlaylist(station.genre);
            station.nextSong = 0;
        });
        
        console.log(`[RADIO] ${Object.keys(this.radioStations).length} Stationen initialisiert`);
    },
    
    // Playlist generieren
    generatePlaylist(genre) {
        const genreConfig = this.musicGenres[genre];
        if (!genreConfig) {
            return [];
        }
        
        const playlist = [];
        const songsPerArtist = 3;
        
        genreConfig.artists.forEach(artist => {
            for (let i = 0; i < songsPerArtist; i++) {
                playlist.push({
                    title: `${artist} - Song ${i + 1}`,
                    artist: artist,
                    duration: 180 + Math.random() * 120, // 3-5 Minuten
                    genre: genre,
                    year: 2000 + Math.floor(Math.random() * 24)
                });
            }
        });
        
        return playlist;
    },
    
    // Radio-Programme starten
    startRadioPrograms() {
        Object.keys(this.radioStations).forEach(frequency => {
            const station = this.radioStations[frequency];
            this.startStationProgram(station);
        });
    },
    
    // Stations-Programm starten
    startStationProgram(station) {
        const playNextSong = () => {
            if (station.playlist.length === 0) {
                return;
            }
            
            const song = station.playlist[station.nextSong];
            station.currentSong = song;
            station.nextSong = (station.nextSong + 1) % station.playlist.length;
            
            // Song an alle Hörer senden
            this.broadcastSong(station, song);
            
            // Nächsten Song planen
            setTimeout(playNextSong, song.duration * 1000);
        };
        
        // Ersten Song starten
        playNextSong();
    },
    
    // Song an Hörer senden
    broadcastSong(station, song) {
        const listeners = Array.from(this.radioListeners.values()).filter(listener => 
            listener.station === station.frequency
        );
        
        listeners.forEach(listener => {
            const player = mp.players.at(listener.playerId);
            if (player) {
                player.call('radio:playSong', { 
                    station: station.name,
                    song: song,
                    frequency: station.frequency
                });
            }
        });
        
        station.listeners = listeners.length;
    },
    
    // Radio kaufen
    buyRadio(player, radioType) {
        const radioConfig = this.getRadioConfig(radioType);
        if (!radioConfig) {
            player.outputChatBox('Unbekannter Radio-Typ!');
            return false;
        }
        
        if (player.money < radioConfig.price) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        const radioId = `radio_${player.id}_${Date.now()}`;
        const radio = {
            id: radioId,
            playerId: player.id,
            type: radioType,
            config: radioConfig,
            status: 'active',
            currentStation: null,
            volume: 50,
            created: Date.now(),
            battery: radioConfig.battery || 100,
            signal: 100
        };
        
        this.activeRadios.set(radioId, radio);
        
        player.money -= radioConfig.price;
        
        player.outputChatBox(`Radio ${radioConfig.name} gekauft! Preis: $${radioConfig.price}`);
        player.call('ui:show', 'Radio', { radio: radio });
        
        console.log(`[RADIO] Radio ${radioType} von Spieler ${player.id} gekauft`);
        return radioId;
    },
    
    // Radio-Konfiguration abrufen
    getRadioConfig(radioType) {
        const configs = {
            portable: {
                name: 'Tragbares Radio',
                type: 'portable',
                price: 50,
                battery: 100,
                range: 'short',
                features: ['am', 'fm'],
                quality: 'medium'
            },
            car: {
                name: 'Auto-Radio',
                type: 'car',
                price: 200,
                battery: 0,
                range: 'medium',
                features: ['am', 'fm', 'cd'],
                quality: 'high'
            },
            home: {
                name: 'Heimradio',
                type: 'home',
                price: 300,
                battery: 0,
                range: 'long',
                features: ['am', 'fm', 'digital'],
                quality: 'high'
            },
            professional: {
                name: 'Professionelles Radio',
                type: 'professional',
                price: 500,
                battery: 100,
                range: 'very_long',
                features: ['am', 'fm', 'digital', 'satellite'],
                quality: 'very_high'
            }
        };
        
        return configs[radioType];
    },
    
    // Radio verwenden
    useRadio(player, radioId, action, data) {
        const radio = this.activeRadios.get(radioId);
        if (!radio) {
            player.outputChatBox('Radio nicht gefunden!');
            return false;
        }
        
        if (radio.playerId !== player.id) {
            player.outputChatBox('Du besitzt dieses Radio nicht!');
            return false;
        }
        
        switch (action) {
            case 'tune':
                this.tuneRadio(player, radio, data.frequency);
                break;
            case 'volume':
                this.setVolume(player, radio, data.volume);
                break;
            case 'scan':
                this.scanStations(player, radio);
                break;
            case 'preset':
                this.setPreset(player, radio, data.preset, data.frequency);
                break;
            case 'off':
                this.turnOffRadio(player, radio);
                break;
        }
        
        return true;
    },
    
    // Radio einstellen
    tuneRadio(player, radio, frequency) {
        const station = this.radioStations[frequency.toString()];
        if (!station) {
            player.outputChatBox('Station nicht gefunden!');
            return false;
        }
        
        radio.currentStation = frequency;
        
        // Hörer hinzufügen
        const listenerId = `listener_${player.id}_${Date.now()}`;
        this.radioListeners.set(listenerId, {
            id: listenerId,
            playerId: player.id,
            radioId: radio.id,
            station: frequency,
            startTime: Date.now()
        });
        
        player.outputChatBox(`Radio auf ${station.name} (${frequency} FM) eingestellt!`);
        player.call('ui:show', 'RadioStation', { station: station });
        
        console.log(`[RADIO] Spieler ${player.id} hört ${station.name}`);
        return true;
    },
    
    // Lautstärke einstellen
    setVolume(player, radio, volume) {
        if (volume < 0 || volume > 100) {
            player.outputChatBox('Lautstärke muss zwischen 0 und 100 liegen!');
            return false;
        }
        
        radio.volume = volume;
        
        player.outputChatBox(`Lautstärke auf ${volume}% eingestellt!`);
        player.call('ui:show', 'RadioVolume', { volume: volume });
        
        console.log(`[RADIO] Lautstärke für Spieler ${player.id} auf ${volume}% eingestellt`);
        return true;
    },
    
    // Stationen scannen
    scanStations(player, radio) {
        const availableStations = Object.keys(this.radioStations).filter(freq => {
            const station = this.radioStations[freq];
            return this.isStationInRange(player, station);
        });
        
        player.outputChatBox(`${availableStations.length} Stationen gefunden!`);
        player.call('ui:show', 'RadioScan', { stations: availableStations });
        
        console.log(`[RADIO] ${availableStations.length} Stationen für Spieler ${player.id} gefunden`);
        return availableStations;
    },
    
    // Station in Reichweite prüfen
    isStationInRange(player, station) {
        const distance = this.calculateDistance(player.position, station.location);
        const maxRange = this.getStationRange(station);
        return distance <= maxRange;
    },
    
    // Entfernung berechnen
    calculateDistance(pos1, pos2) {
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const dz = pos2.z - pos1.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Stations-Reichweite abrufen
    getStationRange(station) {
        const powerRanges = {
            1000: 1000,
            2000: 2000,
            3000: 3000,
            4000: 4000,
            5000: 5000,
            8000: 8000,
            10000: 10000
        };
        
        return powerRanges[station.power] || 2000;
    },
    
    // Preset setzen
    setPreset(player, radio, preset, frequency) {
        if (preset < 1 || preset > 6) {
            player.outputChatBox('Preset muss zwischen 1 und 6 liegen!');
            return false;
        }
        
        if (!radio.presets) {
            radio.presets = {};
        }
        
        radio.presets[preset] = frequency;
        
        player.outputChatBox(`Preset ${preset} auf ${frequency} FM gesetzt!`);
        console.log(`[RADIO] Preset ${preset} für Spieler ${player.id} gesetzt`);
        return true;
    },
    
    // Radio ausschalten
    turnOffRadio(player, radio) {
        radio.currentStation = null;
        
        // Hörer entfernen
        const listeners = Array.from(this.radioListeners.values()).filter(listener => 
            listener.radioId === radio.id
        );
        
        listeners.forEach(listener => {
            this.radioListeners.delete(listener.id);
        });
        
        player.outputChatBox('Radio ausgeschaltet!');
        player.call('ui:show', 'RadioOff');
        
        console.log(`[RADIO] Radio für Spieler ${player.id} ausgeschaltet`);
        return true;
    },
    
    // Radio-Statistiken
    getStatistics() {
        return {
            totalStations: Object.keys(this.radioStations).length,
            totalRadios: this.activeRadios.size,
            totalListeners: this.radioListeners.size,
            totalPrograms: this.radioPrograms.size,
            musicGenres: Object.keys(this.musicGenres).length
        };
    }
};

// Events
mp.events.add('radio:buy', (player, radioType) => {
    radioSystem.buyRadio(player, radioType);
});

mp.events.add('radio:use', (player, radioId, action, data) => {
    radioSystem.useRadio(player, radioId, action, data);
});

// Commands
mp.events.addCommand('radio', (player, fullText, action, radioType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /radio [buy|tune|scan|off] [Typ/Frequenz]');
        player.outputChatBox('Verfügbare Radio-Typen: portable, car, home, professional');
        player.outputChatBox('Verfügbare Frequenzen: 88.5, 89.1, 91.3, 92.1, 95.3, 97.5, 98.7, 101.5, 103.7, 106.9');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'buy':
            if (radioType) {
                radioSystem.buyRadio(player, radioType);
            } else {
                player.outputChatBox('Radio-Typ erforderlich!');
            }
            break;
            
        case 'tune':
            if (radioType) {
                const frequency = parseFloat(radioType);
                // Hier würde die Radio-Einstellung implementiert werden
                player.outputChatBox(`Radio auf ${frequency} FM eingestellt!`);
            } else {
                player.outputChatBox('Frequenz erforderlich!');
            }
            break;
            
        case 'scan':
            // Hier würde die Stations-Suche implementiert werden
            player.outputChatBox('Stationen werden gescannt...');
            break;
            
        case 'off':
            // Hier würde das Radio ausgeschaltet werden
            player.outputChatBox('Radio ausgeschaltet!');
            break;
    }
});

mp.events.addCommand('radiostats', (player) => {
    const stats = radioSystem.getStatistics();
    player.outputChatBox('=== Radio-Statistiken ===');
    player.outputChatBox(`Gesamt Stationen: ${stats.totalStations}`);
    player.outputChatBox(`Gesamt Radios: ${stats.totalRadios}`);
    player.outputChatBox(`Gesamt Hörer: ${stats.totalListeners}`);
    player.outputChatBox(`Gesamt Programme: ${stats.totalPrograms}`);
    player.outputChatBox(`Musik-Genres: ${stats.musicGenres}`);
});

// Radio-System initialisieren
radioSystem.init();

module.exports = radioSystem;
