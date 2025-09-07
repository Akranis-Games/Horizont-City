// Emotion System - Emotions-System
// Behandelt alle Emotion-Funktionen für Horizont-City Roleplay

const emotionSystem = {
    // Emotion-Typen
    emotionTypes: {
        HAPPY: 'happy',
        SAD: 'sad',
        ANGRY: 'angry',
        EXCITED: 'excited',
        TIRED: 'tired',
        STRESSED: 'stressed',
        CALM: 'calm',
        NERVOUS: 'nervous',
        CONFUSED: 'confused',
        SURPRISED: 'surprised',
        DISGUSTED: 'disgusted',
        FEARFUL: 'fearful',
        LOVING: 'loving',
        JEALOUS: 'jealous',
        PROUD: 'proud',
        ASHAMED: 'ashamed',
        HOPEFUL: 'hopeful',
        DISAPPOINTED: 'disappointed',
        GRATEFUL: 'grateful',
        LONELY: 'lonely'
    },
    
    // Emotion-Effekte
    emotionEffects: {
        happy: {
            healthModifier: 0.1,
            staminaModifier: 0.05,
            speedModifier: 0.02,
            animation: { category: 'emotions', name: 'happy' },
            duration: 30000,
            color: '#FFD700'
        },
        sad: {
            healthModifier: -0.05,
            staminaModifier: -0.1,
            speedModifier: -0.05,
            animation: { category: 'emotions', name: 'sad' },
            duration: 60000,
            color: '#4169E1'
        },
        angry: {
            healthModifier: -0.02,
            staminaModifier: 0.1,
            speedModifier: 0.05,
            animation: { category: 'emotions', name: 'angry' },
            duration: 45000,
            color: '#FF0000'
        },
        excited: {
            healthModifier: 0.05,
            staminaModifier: 0.15,
            speedModifier: 0.1,
            animation: { category: 'emotions', name: 'excited' },
            duration: 20000,
            color: '#FF4500'
        },
        tired: {
            healthModifier: -0.1,
            staminaModifier: -0.2,
            speedModifier: -0.1,
            animation: { category: 'emotions', name: 'tired' },
            duration: 120000,
            color: '#808080'
        },
        stressed: {
            healthModifier: -0.08,
            staminaModifier: -0.05,
            speedModifier: 0.02,
            animation: { category: 'emotions', name: 'confused' },
            duration: 90000,
            color: '#8B0000'
        },
        calm: {
            healthModifier: 0.02,
            staminaModifier: 0.05,
            speedModifier: -0.02,
            animation: { category: 'emotions', name: 'happy' },
            duration: 60000,
            color: '#00CED1'
        },
        nervous: {
            healthModifier: -0.03,
            staminaModifier: 0.05,
            speedModifier: 0.03,
            animation: { category: 'emotions', name: 'confused' },
            duration: 45000,
            color: '#FFA500'
        },
        confused: {
            healthModifier: 0,
            staminaModifier: -0.05,
            speedModifier: -0.03,
            animation: { category: 'emotions', name: 'confused' },
            duration: 30000,
            color: '#9370DB'
        },
        surprised: {
            healthModifier: 0.02,
            staminaModifier: 0.1,
            speedModifier: 0.05,
            animation: { category: 'emotions', name: 'excited' },
            duration: 15000,
            color: '#FF69B4'
        }
    },
    
    // Spieler-Emotionen
    playerEmotions: new Map(),
    
    // Emotion-Trigger
    triggers: {
        // Gesundheit-basierte Trigger
        health: {
            low: ['sad', 'tired', 'stressed'],
            high: ['happy', 'excited', 'proud']
        },
        
        // Geld-basierte Trigger
        money: {
            low: ['sad', 'stressed', 'disappointed'],
            high: ['happy', 'excited', 'proud']
        },
        
        // Job-basierte Trigger
        job: {
            success: ['happy', 'proud', 'excited'],
            failure: ['sad', 'disappointed', 'stressed']
        },
        
        // Sozial-basierte Trigger
        social: {
            positive: ['happy', 'loving', 'grateful'],
            negative: ['sad', 'angry', 'jealous']
        }
    },
    
    // Emotion-Initialisierung
    init() {
        console.log('[EMOTION] Emotionssystem initialisiert');
    },
    
    // Emotion setzen
    setEmotion(player, emotionType, duration = null) {
        if (!this.emotionTypes[emotionType]) {
            console.error(`[EMOTION] Unbekannter Emotionstyp: ${emotionType}`);
            return false;
        }
        
        const emotion = emotionType.toLowerCase();
        const effect = this.emotionEffects[emotion];
        
        if (!effect) {
            console.error(`[EMOTION] Keine Effekte für Emotion: ${emotion}`);
            return false;
        }
        
        // Vorherige Emotion entfernen
        this.removeEmotion(player);
        
        // Emotion setzen
        const emotionData = {
            type: emotion,
            startTime: Date.now(),
            duration: duration || effect.duration,
            effects: effect
        };
        
        this.playerEmotions.set(player.id, emotionData);
        
        // Effekte anwenden
        this.applyEmotionEffects(player, emotionData);
        
        // Animation abspielen
        if (effect.animation) {
            mp.events.call('animation:play', player, effect.animation.category, effect.animation.name);
        }
        
        // UI aktualisieren
        player.call('emotion:update', [emotionData]);
        
        console.log(`[EMOTION] Emotion ${emotion} für Spieler ${player.id} gesetzt`);
        return true;
    },
    
    // Emotion entfernen
    removeEmotion(player) {
        if (this.playerEmotions.has(player.id)) {
            const emotion = this.playerEmotions.get(player.id);
            
            // Effekte entfernen
            this.removeEmotionEffects(player, emotion);
            
            // Animation stoppen
            mp.events.call('animation:stop', player);
            
            this.playerEmotions.delete(player.id);
            
            // UI aktualisieren
            player.call('emotion:update', [null]);
            
            console.log(`[EMOTION] Emotion für Spieler ${player.id} entfernt`);
            return true;
        }
        return false;
    },
    
    // Emotion-Effekte anwenden
    applyEmotionEffects(player, emotionData) {
        const effects = emotionData.effects;
        
        // Gesundheit anpassen
        if (effects.healthModifier !== 0) {
            const healthChange = Math.floor(100 * effects.healthModifier);
            player.health = Math.max(0, Math.min(100, player.health + healthChange));
        }
        
        // Ausdauer anpassen
        if (effects.staminaModifier !== 0) {
            // Hier würde die Ausdauer angepasst werden
            console.log(`[EMOTION] Ausdauer-Modifikator: ${effects.staminaModifier}`);
        }
        
        // Geschwindigkeit anpassen
        if (effects.speedModifier !== 0) {
            // Hier würde die Geschwindigkeit angepasst werden
            console.log(`[EMOTION] Geschwindigkeits-Modifikator: ${effects.speedModifier}`);
        }
        
        // UI-Effekte
        player.call('emotion:effects', [effects]);
    },
    
    // Emotion-Effekte entfernen
    removeEmotionEffects(player, emotionData) {
        const effects = emotionData.effects;
        
        // Gesundheit zurücksetzen
        if (effects.healthModifier !== 0) {
            const healthChange = Math.floor(100 * effects.healthModifier);
            player.health = Math.max(0, Math.min(100, player.health - healthChange));
        }
        
        // Andere Effekte zurücksetzen
        player.call('emotion:effects', [null]);
    },
    
    // Emotion-Trigger prüfen
    checkTriggers(player, triggerType, value) {
        const triggers = this.triggers[triggerType];
        if (!triggers) return;
        
        let emotions = [];
        
        if (triggerType === 'health') {
            if (value < 30) emotions = triggers.low;
            else if (value > 80) emotions = triggers.high;
        } else if (triggerType === 'money') {
            if (value < 1000) emotions = triggers.low;
            else if (value > 50000) emotions = triggers.high;
        }
        
        if (emotions.length > 0) {
            const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
            this.setEmotion(player, randomEmotion);
        }
    },
    
    // Emotion-Update (regelmäßig aufgerufen)
    updateEmotions() {
        this.playerEmotions.forEach((emotionData, playerId) => {
            const player = mp.players.at(playerId);
            if (!player) {
                this.playerEmotions.delete(playerId);
                return;
            }
            
            const elapsed = Date.now() - emotionData.startTime;
            if (elapsed >= emotionData.duration) {
                this.removeEmotion(player);
            }
        });
    },
    
    // Aktuelle Emotion abrufen
    getCurrentEmotion(playerId) {
        return this.playerEmotions.get(playerId) || null;
    },
    
    // Alle Emotionen abrufen
    getAllEmotions() {
        return Array.from(this.playerEmotions.entries()).map(([playerId, emotion]) => ({
            playerId: playerId,
            emotion: emotion.type,
            duration: Date.now() - emotion.startTime,
            remaining: emotion.duration - (Date.now() - emotion.startTime)
        }));
    },
    
    // Emotion-Statistiken
    getStatistics() {
        return {
            activeEmotions: this.playerEmotions.size,
            emotionTypes: Object.keys(this.emotionTypes).length,
            effects: Object.keys(this.emotionEffects).length
        };
    }
};

// Events
mp.events.add('emotion:set', (player, emotionType, duration) => {
    const success = emotionSystem.setEmotion(player, emotionType, duration);
    if (success) {
        player.outputChatBox(`Emotion auf ${emotionType} gesetzt!`);
    } else {
        player.outputChatBox('Emotion konnte nicht gesetzt werden!');
    }
});

mp.events.add('emotion:remove', (player) => {
    const success = emotionSystem.removeEmotion(player);
    if (success) {
        player.outputChatBox('Emotion entfernt!');
    } else {
        player.outputChatBox('Keine aktive Emotion!');
    }
});

mp.events.add('emotion:get', (player) => {
    const emotion = emotionSystem.getCurrentEmotion(player.id);
    if (emotion) {
        player.outputChatBox(`Aktuelle Emotion: ${emotion.type}`);
    } else {
        player.outputChatBox('Keine aktive Emotion');
    }
});

// Commands
mp.events.addCommand('emotion', (player, fullText, emotionType) => {
    if (!emotionType) {
        player.outputChatBox('Verwendung: /emotion [Emotion]');
        player.outputChatBox('Emotionen: happy, sad, angry, excited, tired, stressed, calm, nervous, confused, surprised');
        return;
    }
    
    emotionSystem.setEmotion(player, emotionType.toUpperCase());
});

mp.events.addCommand('stopemotion', (player) => {
    emotionSystem.removeEmotion(player);
});

// Regelmäßige Updates
setInterval(() => {
    emotionSystem.updateEmotions();
}, 5000);

// Emotionssystem initialisieren
emotionSystem.init();

module.exports = emotionSystem;
