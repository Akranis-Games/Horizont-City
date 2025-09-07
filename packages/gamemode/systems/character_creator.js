// Character Creator System - Erweiterte Charaktererstellung basierend auf Tutorial
// Behandelt alle Charaktererstellungs-Funktionen für Horizont-City Roleplay

const characterCreatorSystem = {
    // Charakter-Modelle
    characterModels: {
        MALE: {
            model: 'mp_m_freemode_01',
            name: 'Männlich',
            components: {
                head: { min: 0, max: 45 },
                hair: { min: 0, max: 73 },
                hairColor: { min: 0, max: 63 },
                hairHighlight: { min: 0, max: 63 },
                beard: { min: 0, max: 28 },
                beardColor: { min: 0, max: 63 },
                eyebrows: { min: 0, max: 33 },
                eyebrowsColor: { min: 0, max: 63 },
                eyes: { min: 0, max: 31 },
                nose: { min: 0, max: 20 },
                mouth: { min: 0, max: 19 },
                jaw: { min: 0, max: 20 },
                chin: { min: 0, max: 20 },
                neck: { min: 0, max: 20 }
            }
        },
        FEMALE: {
            model: 'mp_f_freemode_01',
            name: 'Weiblich',
            components: {
                head: { min: 0, max: 45 },
                hair: { min: 0, max: 76 },
                hairColor: { min: 0, max: 63 },
                hairHighlight: { min: 0, max: 63 },
                eyebrows: { min: 0, max: 33 },
                eyebrowsColor: { min: 0, max: 63 },
                eyes: { min: 0, max: 31 },
                nose: { min: 0, max: 20 },
                mouth: { min: 0, max: 19 },
                jaw: { min: 0, max: 20 },
                chin: { min: 0, max: 20 },
                neck: { min: 0, max: 20 },
                makeup: { min: 0, max: 74 },
                makeupColor: { min: 0, max: 63 },
                lipstick: { min: 0, max: 9 },
                lipstickColor: { min: 0, max: 63 }
            }
        }
    },
    
    // Kleidungs-Kategorien
    clothingCategories: {
        MASK: { name: 'Maske', component: 1, drawable: { min: 0, max: 47 }, texture: { min: 0, max: 10 } },
        HAIR: { name: 'Haare', component: 2, drawable: { min: 0, max: 76 }, texture: { min: 0, max: 10 } },
        TORSO: { name: 'Oberkörper', component: 3, drawable: { min: 0, max: 200 }, texture: { min: 0, max: 20 } },
        LEGS: { name: 'Beine', component: 4, drawable: { min: 0, max: 150 }, texture: { min: 0, max: 20 } },
        BAGS: { name: 'Taschen', component: 5, drawable: { min: 0, max: 50 }, texture: { min: 0, max: 10 } },
        SHOES: { name: 'Schuhe', component: 6, drawable: { min: 0, max: 100 }, texture: { min: 0, max: 20 } },
        ACCESSORIES: { name: 'Accessoires', component: 7, drawable: { min: 0, max: 100 }, texture: { min: 0, max: 20 } },
        UNDERSHIRTS: { name: 'Unterhemden', component: 8, drawable: { min: 0, max: 100 }, texture: { min: 0, max: 20 } },
        KEVLAR: { name: 'Schutzweste', component: 9, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 10 } },
        BADGES: { name: 'Abzeichen', component: 10, drawable: { min: 0, max: 50 }, texture: { min: 0, max: 10 } },
        TORSO2: { name: 'Oberkörper 2', component: 11, drawable: { min: 0, max: 200 }, texture: { min: 0, max: 20 } }
    },
    
    // Charakter-Presets
    characterPresets: {
        BUSINESS_MAN: {
            name: 'Geschäftsmann',
            model: 'MALE',
            clothing: {
                TORSO: { drawable: 11, texture: 0 },
                LEGS: { drawable: 24, texture: 0 },
                SHOES: { drawable: 10, texture: 0 },
                ACCESSORIES: { drawable: 0, texture: 0 }
            },
            features: {
                hair: 0,
                hairColor: 0,
                eyebrows: 0,
                eyes: 0,
                nose: 0,
                mouth: 0,
                jaw: 0,
                chin: 0
            }
        },
        BUSINESS_WOMAN: {
            name: 'Geschäftsfrau',
            model: 'FEMALE',
            clothing: {
                TORSO: { drawable: 15, texture: 0 },
                LEGS: { drawable: 25, texture: 0 },
                SHOES: { drawable: 8, texture: 0 },
                ACCESSORIES: { drawable: 0, texture: 0 }
            },
            features: {
                hair: 0,
                hairColor: 0,
                eyebrows: 0,
                eyes: 0,
                nose: 0,
                mouth: 0,
                jaw: 0,
                chin: 0
            }
        },
        CASUAL_MALE: {
            name: 'Casual Mann',
            model: 'MALE',
            clothing: {
                TORSO: { drawable: 15, texture: 0 },
                LEGS: { drawable: 21, texture: 0 },
                SHOES: { drawable: 5, texture: 0 },
                ACCESSORIES: { drawable: 0, texture: 0 }
            },
            features: {
                hair: 0,
                hairColor: 0,
                eyebrows: 0,
                eyes: 0,
                nose: 0,
                mouth: 0,
                jaw: 0,
                chin: 0
            }
        },
        CASUAL_FEMALE: {
            name: 'Casual Frau',
            model: 'FEMALE',
            clothing: {
                TORSO: { drawable: 11, texture: 0 },
                LEGS: { drawable: 15, texture: 0 },
                SHOES: { drawable: 3, texture: 0 },
                ACCESSORIES: { drawable: 0, texture: 0 }
            },
            features: {
                hair: 0,
                hairColor: 0,
                eyebrows: 0,
                eyes: 0,
                nose: 0,
                mouth: 0,
                jaw: 0,
                chin: 0
            }
        }
    },
    
    // Aktive Charaktererstellungen
    activeCreations: new Map(),
    
    // Charaktererstellungs-Statistiken
    creatorStats: {
        totalCharactersCreated: 0,
        activeCreations: 0,
        mostPopularModel: null,
        mostPopularPreset: null,
        averageCreationTime: 0
    },
    
    // Character Creator System-Initialisierung
    init() {
        console.log('[CHARACTER_CREATOR] Charaktererstellungs-System initialisiert');
    },
    
    // Charaktererstellung starten
    startCharacterCreation(player) {
        const creationId = `creation_${player.id}_${Date.now()}`;
        const creation = {
            id: creationId,
            playerId: player.id,
            playerName: player.name,
            model: 'MALE',
            features: {},
            clothing: {},
            position: player.position,
            dimension: player.dimension,
            startTime: Date.now(),
            status: 'active',
            created: Date.now()
        };
        
        this.activeCreations.set(creationId, creation);
        
        // Spieler in Charaktererstellungs-Modus versetzen
        player.position = new mp.Vector3(402.5, -996.5, -99.0);
        player.dimension = player.id + 1000;
        player.freezePosition(true);
        
        // UI anzeigen
        player.call('ui:show', 'CharacterCreator', { 
            creation: creation,
            models: this.characterModels,
            clothing: this.clothingCategories,
            presets: this.characterPresets
        });
        
        this.creatorStats.activeCreations++;
        
        console.log(`[CHARACTER_CREATOR] Charaktererstellung für Spieler ${player.id} gestartet`);
        return creationId;
    },
    
    // Modell ändern
    changeModel(player, modelType) {
        const model = this.characterModels[modelType];
        if (!model) {
            player.outputChatBox('Modell nicht gefunden!');
            return false;
        }
        
        player.model = mp.joaat(model.model);
        
        // Aktive Erstellung aktualisieren
        const creation = this.getActiveCreation(player.id);
        if (creation) {
            creation.model = modelType;
        }
        
        player.outputChatBox(`Modell zu ${model.name} geändert`);
        return true;
    },
    
    // Gesichtszüge ändern
    changeFeature(player, featureType, value) {
        const creation = this.getActiveCreation(player.id);
        if (!creation) {
            player.outputChatBox('Keine aktive Charaktererstellung!');
            return false;
        }
        
        const model = this.characterModels[creation.model];
        if (!model || !model.components[featureType]) {
            player.outputChatBox('Ungültiger Gesichtszug!');
            return false;
        }
        
        const component = model.components[featureType];
        const normalizedValue = Math.max(component.min, Math.min(component.max, value));
        
        // Gesichtszug anwenden
        switch (featureType) {
            case 'hair':
                player.setComponentVariation(2, normalizedValue, 0, 2);
                break;
            case 'hairColor':
                player.setHairColor(normalizedValue, 0);
                break;
            case 'hairHighlight':
                player.setHairColor(0, normalizedValue);
                break;
            case 'beard':
                player.setHeadBlend(0, 0, 0, 0, 0, 0, normalizedValue, 0, 0);
                break;
            case 'eyebrows':
                player.setHeadBlend(0, 0, 0, 0, 0, 0, 0, normalizedValue, 0);
                break;
            case 'eyes':
                player.setEyeColor(normalizedValue);
                break;
            case 'nose':
                player.setFaceFeature(0, (normalizedValue - 10) / 10);
                break;
            case 'mouth':
                player.setFaceFeature(1, (normalizedValue - 10) / 10);
                break;
            case 'jaw':
                player.setFaceFeature(2, (normalizedValue - 10) / 10);
                break;
            case 'chin':
                player.setFaceFeature(3, (normalizedValue - 10) / 10);
                break;
            case 'neck':
                player.setFaceFeature(4, (normalizedValue - 10) / 10);
                break;
            case 'makeup':
                player.setHeadBlend(0, 0, 0, 0, 0, 0, 0, 0, normalizedValue);
                break;
            case 'lipstick':
                player.setHeadBlend(0, 0, 0, 0, 0, 0, 0, 0, 0, normalizedValue);
                break;
        }
        
        // Feature speichern
        if (!creation.features) creation.features = {};
        creation.features[featureType] = normalizedValue;
        
        return true;
    },
    
    // Kleidung ändern
    changeClothing(player, category, drawable, texture = 0) {
        const creation = this.getActiveCreation(player.id);
        if (!creation) {
            player.outputChatBox('Keine aktive Charaktererstellung!');
            return false;
        }
        
        const clothingCategory = this.clothingCategories[category];
        if (!clothingCategory) {
            player.outputChatBox('Ungültige Kleidungskategorie!');
            return false;
        }
        
        const normalizedDrawable = Math.max(clothingCategory.drawable.min, 
            Math.min(clothingCategory.drawable.max, drawable));
        const normalizedTexture = Math.max(clothingCategory.texture.min, 
            Math.min(clothingCategory.texture.max, texture));
        
        // Kleidung anwenden
        player.setComponentVariation(
            clothingCategory.component, 
            normalizedDrawable, 
            normalizedTexture, 
            2
        );
        
        // Kleidung speichern
        if (!creation.clothing) creation.clothing = {};
        creation.clothing[category] = {
            drawable: normalizedDrawable,
            texture: normalizedTexture
        };
        
        return true;
    },
    
    // Preset anwenden
    applyPreset(player, presetName) {
        const preset = this.characterPresets[presetName];
        if (!preset) {
            player.outputChatBox('Preset nicht gefunden!');
            return false;
        }
        
        const creation = this.getActiveCreation(player.id);
        if (!creation) {
            player.outputChatBox('Keine aktive Charaktererstellung!');
            return false;
        }
        
        // Modell ändern
        this.changeModel(player, preset.model);
        
        // Gesichtszüge anwenden
        Object.keys(preset.features).forEach(feature => {
            this.changeFeature(player, feature, preset.features[feature]);
        });
        
        // Kleidung anwenden
        Object.keys(preset.clothing).forEach(category => {
            const clothing = preset.clothing[category];
            this.changeClothing(player, category, clothing.drawable, clothing.texture);
        });
        
        // Preset speichern
        creation.preset = presetName;
        
        player.outputChatBox(`Preset "${preset.name}" angewendet`);
        return true;
    },
    
    // Charakter speichern
    saveCharacter(player, characterName) {
        const creation = this.getActiveCreation(player.id);
        if (!creation) {
            player.outputChatBox('Keine aktive Charaktererstellung!');
            return false;
        }
        
        if (!characterName || characterName.length < 3) {
            player.outputChatBox('Charaktername muss mindestens 3 Zeichen lang sein!');
            return false;
        }
        
        // Charakter-Daten erstellen
        const character = {
            id: `char_${player.id}_${Date.now()}`,
            name: characterName,
            model: creation.model,
            features: creation.features,
            clothing: creation.clothing,
            position: { x: 0, y: 0, z: 72 },
            money: 1000,
            level: 1,
            experience: 0,
            job: 'Keiner',
            faction: null,
            created: new Date(),
            lastPlayed: new Date()
        };
        
        // Charakter zum Spieler hinzufügen
        if (!player.characters) player.characters = [];
        player.characters.push(character);
        
        // Erstellung abschließen
        creation.status = 'completed';
        creation.completionTime = Date.now();
        creation.character = character;
        
        // Statistiken aktualisieren
        this.creatorStats.totalCharactersCreated++;
        this.creatorStats.activeCreations--;
        
        player.outputChatBox(`Charakter "${characterName}" erfolgreich erstellt!`);
        player.call('ui:show', 'CharacterCreated', { character: character });
        
        // Spieler zur Charakterauswahl
        this.showCharacterSelection(player);
        
        console.log(`[CHARACTER_CREATOR] Charakter "${characterName}" für Spieler ${player.id} erstellt`);
        return true;
    },
    
    // Charakterauswahl anzeigen
    showCharacterSelection(player) {
        if (!player.characters || player.characters.length === 0) {
            player.outputChatBox('Keine Charaktere vorhanden!');
            return false;
        }
        
        player.call('ui:show', 'CharacterSelection', { 
            characters: player.characters 
        });
        
        return true;
    },
    
    // Charakter auswählen
    selectCharacter(player, characterId) {
        const character = player.characters?.find(char => char.id === characterId);
        if (!character) {
            player.outputChatBox('Charakter nicht gefunden!');
            return false;
        }
        
        // Charakter laden
        this.loadCharacter(player, character);
        
        // Spieler aus Charaktererstellungs-Modus holen
        player.position = new mp.Vector3(character.position.x, character.position.y, character.position.z);
        player.dimension = 0;
        player.freezePosition(false);
        
        player.outputChatBox(`Willkommen zurück, ${character.name}!`);
        player.call('ui:show', 'CharacterSelected', { character: character });
        
        console.log(`[CHARACTER_CREATOR] Charakter "${character.name}" für Spieler ${player.id} ausgewählt`);
        return true;
    },
    
    // Charakter laden
    loadCharacter(player, character) {
        // Modell setzen
        const model = this.characterModels[character.model];
        if (model) {
            player.model = mp.joaat(model.model);
        }
        
        // Gesichtszüge anwenden
        if (character.features) {
            Object.keys(character.features).forEach(feature => {
                this.changeFeature(player, feature, character.features[feature]);
            });
        }
        
        // Kleidung anwenden
        if (character.clothing) {
            Object.keys(character.clothing).forEach(category => {
                const clothing = character.clothing[category];
                this.changeClothing(player, category, clothing.drawable, clothing.texture);
            });
        }
        
        // Spielerdaten setzen
        player.name = character.name;
        player.money = character.money;
        player.level = character.level;
        player.experience = character.experience;
        player.job = character.job;
        player.faction = character.faction;
        
        // Letzte Spielzeit aktualisieren
        character.lastPlayed = new Date();
    },
    
    // Aktive Erstellung abrufen
    getActiveCreation(playerId) {
        for (let [id, creation] of this.activeCreations) {
            if (creation.playerId === playerId && creation.status === 'active') {
                return creation;
            }
        }
        return null;
    },
    
    // Charaktererstellung abbrechen
    cancelCharacterCreation(player) {
        const creation = this.getActiveCreation(player.id);
        if (!creation) {
            player.outputChatBox('Keine aktive Charaktererstellung!');
            return false;
        }
        
        creation.status = 'cancelled';
        this.creatorStats.activeCreations--;
        
        // Spieler zur Charakterauswahl
        this.showCharacterSelection(player);
        
        player.outputChatBox('Charaktererstellung abgebrochen');
        return true;
    },
    
    // Charaktererstellungs-Statistiken
    getStatistics() {
        return {
            ...this.creatorStats,
            totalModels: Object.keys(this.characterModels).length,
            totalPresets: Object.keys(this.characterPresets).length,
            totalClothingCategories: Object.keys(this.clothingCategories).length
        };
    }
};

// Events
mp.events.add('character_creator:start', (player) => {
    characterCreatorSystem.startCharacterCreation(player);
});

mp.events.add('character_creator:changeModel', (player, modelType) => {
    characterCreatorSystem.changeModel(player, modelType);
});

mp.events.add('character_creator:changeFeature', (player, featureType, value) => {
    characterCreatorSystem.changeFeature(player, featureType, value);
});

mp.events.add('character_creator:changeClothing', (player, category, drawable, texture) => {
    characterCreatorSystem.changeClothing(player, category, drawable, texture);
});

mp.events.add('character_creator:applyPreset', (player, presetName) => {
    characterCreatorSystem.applyPreset(player, presetName);
});

mp.events.add('character_creator:saveCharacter', (player, characterName) => {
    characterCreatorSystem.saveCharacter(player, characterName);
});

mp.events.add('character_creator:selectCharacter', (player, characterId) => {
    characterCreatorSystem.selectCharacter(player, characterId);
});

mp.events.add('character_creator:cancel', (player) => {
    characterCreatorSystem.cancelCharacterCreation(player);
});

// Commands
mp.events.addCommand('charcreator', (player, fullText, action, characterName) => {
    if (!action) {
        player.outputChatBox('Verwendung: /charcreator [start|select|preset] [name]');
        player.outputChatBox('Verfügbare Aktionen: start, select, preset');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'start':
            characterCreatorSystem.startCharacterCreation(player);
            break;
            
        case 'select':
            if (characterName) {
                characterCreatorSystem.selectCharacter(player, characterName);
            } else {
                characterCreatorSystem.showCharacterSelection(player);
            }
            break;
            
        case 'preset':
            if (characterName) {
                characterCreatorSystem.applyPreset(player, characterName);
            } else {
                player.outputChatBox('Preset-Name erforderlich!');
            }
            break;
    }
});

// Character Creator System initialisieren
characterCreatorSystem.init();

module.exports = characterCreatorSystem;
