// Animation System - Animations-System
// Behandelt alle Animation-Funktionen für Horizont-City Roleplay

const animationSystem = {
    // Animation-Kategorien
    categories: {
        EMOTIONS: 'emotions',
        GESTURES: 'gestures',
        DANCES: 'dances',
        SPORTS: 'sports',
        WORK: 'work',
        COMBAT: 'combat',
        SOCIAL: 'social',
        VEHICLE: 'vehicle',
        WEAPON: 'weapon',
        CUSTOM: 'custom'
    },
    
    // Animation-Presets
    presets: {
        // Emotionen
        emotions: {
            'happy': { dict: 'gestures@m@standing@casual', name: 'gesture_hello' },
            'sad': { dict: 'gestures@m@standing@casual', name: 'gesture_point' },
            'angry': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_down' },
            'confused': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_left' },
            'excited': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_right' },
            'tired': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_up' }
        },
        
        // Gesten
        gestures: {
            'wave': { dict: 'gestures@m@standing@casual', name: 'gesture_hello' },
            'point': { dict: 'gestures@m@standing@casual', name: 'gesture_point' },
            'thumbs_up': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_up' },
            'thumbs_down': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_down' },
            'shrug': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_left' },
            'nod': { dict: 'gestures@m@standing@casual', name: 'gesture_hand_right' }
        },
        
        // Tänze
        dances: {
            'dance1': { dict: 'anim@mp_player_intcelebrationmale@dance', name: 'dance_01' },
            'dance2': { dict: 'anim@mp_player_intcelebrationmale@dance', name: 'dance_02' },
            'dance3': { dict: 'anim@mp_player_intcelebrationmale@dance', name: 'dance_03' },
            'dance4': { dict: 'anim@mp_player_intcelebrationmale@dance', name: 'dance_04' },
            'dance5': { dict: 'anim@mp_player_intcelebrationmale@dance', name: 'dance_05' }
        },
        
        // Sport
        sports: {
            'pushup': { dict: 'amb@world_human_push_ups@male@base', name: 'base' },
            'situp': { dict: 'amb@world_human_sit_ups@male@base', name: 'base' },
            'yoga': { dict: 'amb@world_human_yoga@male@base', name: 'base' },
            'jog': { dict: 'amb@world_human_jog_standing@male@base', name: 'base' },
            'stretch': { dict: 'amb@world_human_muscle_flex@male@base', name: 'base' }
        },
        
        // Arbeit
        work: {
            'hammer': { dict: 'amb@world_human_hammering@male@base', name: 'base' },
            'dig': { dict: 'amb@world_human_gardener_plant@male@base', name: 'base' },
            'clean': { dict: 'amb@world_human_maid_clean@base', name: 'base' },
            'cook': { dict: 'amb@world_human_bbq@male@base', name: 'base' },
            'repair': { dict: 'amb@world_human_vehicle_mechanic@male@base', name: 'base' }
        },
        
        // Kampf
        combat: {
            'punch': { dict: 'melee@unarmed@streamed_variations', name: 'plyr_takedown_front_headbutt' },
            'kick': { dict: 'melee@unarmed@streamed_variations', name: 'plyr_takedown_front_kick' },
            'block': { dict: 'melee@unarmed@streamed_variations', name: 'plyr_takedown_front_block' },
            'dodge': { dict: 'melee@unarmed@streamed_variations', name: 'plyr_takedown_front_dodge' }
        },
        
        // Sozial
        social: {
            'handshake': { dict: 'mp_ped_interaction', name: 'handshake_guy_a' },
            'hug': { dict: 'mp_ped_interaction', name: 'hugs_guy_a' },
            'kiss': { dict: 'mp_ped_interaction', name: 'kisses_guy_a' },
            'highfive': { dict: 'mp_ped_interaction', name: 'highfive_guy_a' }
        }
    },
    
    // Aktive Animationen
    activeAnimations: new Map(),
    
    // Animation-Initialisierung
    init() {
        console.log('[ANIMATION] Animationssystem initialisiert');
    },
    
    // Animation abspielen
    playAnimation(player, category, animationName, options = {}) {
        const preset = this.presets[category]?.[animationName];
        if (!preset) {
            console.error(`[ANIMATION] Animation ${animationName} in Kategorie ${category} nicht gefunden`);
            return false;
        }
        
        const animationOptions = {
            dict: preset.dict,
            name: preset.name,
            duration: options.duration || -1,
            flag: options.flag || 1,
            blendIn: options.blendIn || 8.0,
            blendOut: options.blendOut || -8.0,
            playbackRate: options.playbackRate || 1.0,
            lockX: options.lockX || false,
            lockY: options.lockY || false,
            lockZ: options.lockZ || false
        };
        
        // Animation stoppen falls bereits aktiv
        this.stopAnimation(player);
        
        // Animation abspielen
        player.taskPlayAnim(
            animationOptions.dict,
            animationOptions.name,
            animationOptions.blendIn,
            animationOptions.blendOut,
            animationOptions.duration,
            animationOptions.flag,
            animationOptions.playbackRate,
            animationOptions.lockX,
            animationOptions.lockY,
            animationOptions.lockZ
        );
        
        // Animation speichern
        this.activeAnimations.set(player.id, {
            category: category,
            name: animationName,
            options: animationOptions,
            startTime: Date.now()
        });
        
        console.log(`[ANIMATION] Animation ${animationName} für Spieler ${player.id} gestartet`);
        return true;
    },
    
    // Animation stoppen
    stopAnimation(player) {
        if (this.activeAnimations.has(player.id)) {
            player.clearTasks();
            this.activeAnimations.delete(player.id);
            console.log(`[ANIMATION] Animation für Spieler ${player.id} gestoppt`);
            return true;
        }
        return false;
    },
    
    // Alle Animationen stoppen
    stopAllAnimations() {
        this.activeAnimations.forEach((animation, playerId) => {
            const player = mp.players.at(playerId);
            if (player) {
                player.clearTasks();
            }
        });
        this.activeAnimations.clear();
        console.log('[ANIMATION] Alle Animationen gestoppt');
    },
    
    // Animation-Liste abrufen
    getAnimationList(category = null) {
        if (category) {
            return this.presets[category] || {};
        }
        return this.presets;
    },
    
    // Kategorien abrufen
    getCategories() {
        return Object.keys(this.presets);
    },
    
    // Aktive Animationen abrufen
    getActiveAnimations() {
        return Array.from(this.activeAnimations.entries()).map(([playerId, animation]) => ({
            playerId: playerId,
            category: animation.category,
            name: animation.name,
            duration: Date.now() - animation.startTime
        }));
    },
    
    // Animation-Gruppe erstellen
    createAnimationGroup(name, animations) {
        this.presets[name] = animations;
        console.log(`[ANIMATION] Animation-Gruppe ${name} erstellt`);
    },
    
    // Custom Animation hinzufügen
    addCustomAnimation(category, name, dict, animName) {
        if (!this.presets[category]) {
            this.presets[category] = {};
        }
        
        this.presets[category][name] = {
            dict: dict,
            name: animName
        };
        
        console.log(`[ANIMATION] Custom Animation ${name} zu Kategorie ${category} hinzugefügt`);
    },
    
    // Animation-Statistiken
    getStatistics() {
        return {
            totalAnimations: Object.values(this.presets).reduce((total, category) => total + Object.keys(category).length, 0),
            activeAnimations: this.activeAnimations.size,
            categories: Object.keys(this.presets).length
        };
    }
};

// Events
mp.events.add('animation:play', (player, category, animationName, options) => {
    const success = animationSystem.playAnimation(player, category, animationName, options);
    if (success) {
        player.outputChatBox(`Animation ${animationName} gestartet!`);
    } else {
        player.outputChatBox('Animation konnte nicht gestartet werden!');
    }
});

mp.events.add('animation:stop', (player) => {
    const success = animationSystem.stopAnimation(player);
    if (success) {
        player.outputChatBox('Animation gestoppt!');
    } else {
        player.outputChatBox('Keine aktive Animation!');
    }
});

mp.events.add('animation:list', (player, category) => {
    const animations = animationSystem.getAnimationList(category);
    player.outputChatBox(`=== Animationen ${category || 'Alle'} ===`);
    
    if (category) {
        Object.keys(animations).forEach(name => {
            player.outputChatBox(`- ${name}`);
        });
    } else {
        Object.keys(animations).forEach(cat => {
            player.outputChatBox(`${cat}: ${Object.keys(animations[cat]).length} Animationen`);
        });
    }
});

// Commands
mp.events.addCommand('anim', (player, fullText, category, animationName) => {
    if (!category || !animationName) {
        player.outputChatBox('Verwendung: /anim [Kategorie] [Animation]');
        player.outputChatBox('Kategorien: emotions, gestures, dances, sports, work, combat, social');
        return;
    }
    
    animationSystem.playAnimation(player, category, animationName);
});

mp.events.addCommand('stopanim', (player) => {
    animationSystem.stopAnimation(player);
});

mp.events.addCommand('animlist', (player, fullText, category) => {
    animationSystem.getAnimationList(category);
    player.call('animation:list', [category]);
});

// Animationssystem initialisieren
animationSystem.init();

module.exports = animationSystem;
