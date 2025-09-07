// Ped System - Ped-System mit Einsatz-Tieren und Missionen
// Behandelt alle Ped-Funktionen für Horizont-City Roleplay

const pedSystem = {
    // Ped-Typen
    pedTypes: {
        CIVILIAN: 'civilian',
        POLICE: 'police',
        EMS: 'ems',
        FIREFIGHTER: 'firefighter',
        SECURITY: 'security',
        VENDOR: 'vendor',
        ANIMAL: 'animal',
        PET: 'pet',
        WORKER: 'worker',
        HOMELESS: 'homeless',
        GANG_MEMBER: 'gang_member',
        BUSINESS_OWNER: 'business_owner'
    },
    
    // Tier-Typen
    animalTypes: {
        DOG: 'dog',
        CAT: 'cat',
        BIRD: 'bird',
        HORSE: 'horse',
        COW: 'cow',
        PIG: 'pig',
        CHICKEN: 'chicken',
        FISH: 'fish',
        SNAKE: 'snake',
        LION: 'lion',
        TIGER: 'tiger',
        ELEPHANT: 'elephant',
        BEAR: 'bear',
        WOLF: 'wolf',
        FOX: 'fox',
        RABBIT: 'rabbit',
        DEER: 'deer'
    },
    
    // Ped-Konfiguration
    pedConfig: {
        civilian: {
            name: 'Zivilist',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'passive',
            interactions: ['talk', 'trade', 'ask_directions'],
            missions: ['delivery', 'escort', 'information']
        },
        police: {
            name: 'Polizist',
            health: 100,
            armor: 50,
            weapons: ['pistol', 'stungun', 'baton'],
            behavior: 'aggressive',
            interactions: ['arrest', 'question', 'patrol'],
            missions: ['patrol', 'arrest', 'investigate']
        },
        ems: {
            name: 'Sanitäter',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['heal', 'revive', 'medical_check'],
            missions: ['rescue', 'medical_emergency', 'transport']
        },
        firefighter: {
            name: 'Feuerwehrmann',
            health: 100,
            armor: 25,
            weapons: ['fire_extinguisher', 'axe'],
            behavior: 'friendly',
            interactions: ['extinguish', 'rescue', 'fire_safety'],
            missions: ['fire_fighting', 'rescue', 'prevention']
        },
        security: {
            name: 'Sicherheitsdienst',
            health: 100,
            armor: 25,
            weapons: ['pistol', 'baton'],
            behavior: 'neutral',
            interactions: ['check_id', 'patrol', 'remove'],
            missions: ['patrol', 'security_check', 'remove_trespassers']
        },
        vendor: {
            name: 'Verkäufer',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['sell', 'buy', 'trade'],
            missions: ['sell_items', 'restock', 'customer_service']
        },
        animal: {
            name: 'Tier',
            health: 50,
            armor: 0,
            weapons: [],
            behavior: 'neutral',
            interactions: ['feed', 'pet', 'command'],
            missions: ['hunt', 'guard', 'companion']
        },
        pet: {
            name: 'Haustier',
            health: 30,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['feed', 'pet', 'play', 'command'],
            missions: ['companion', 'guard', 'entertainment']
        },
        worker: {
            name: 'Arbeiter',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'neutral',
            interactions: ['work', 'help', 'trade'],
            missions: ['construction', 'maintenance', 'delivery']
        },
        homeless: {
            name: 'Obdachloser',
            health: 50,
            armor: 0,
            weapons: [],
            behavior: 'passive',
            interactions: ['beg', 'talk', 'help'],
            missions: ['survive', 'find_shelter', 'get_food']
        },
        gang_member: {
            name: 'Gang-Mitglied',
            health: 100,
            armor: 25,
            weapons: ['pistol', 'knife'],
            behavior: 'aggressive',
            interactions: ['threaten', 'fight', 'recruit'],
            missions: ['territory_control', 'drug_dealing', 'protection']
        },
        business_owner: {
            name: 'Geschäftsinhaber',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['business_deal', 'hire', 'negotiate'],
            missions: ['manage_business', 'hire_workers', 'expand']
        }
    },
    
    // Tier-Konfiguration
    animalConfig: {
        dog: {
            name: 'Hund',
            health: 50,
            speed: 1.2,
            strength: 3,
            intelligence: 4,
            loyalty: 5,
            skills: ['guard', 'hunt', 'companion'],
            diet: 'meat',
            habitat: 'urban',
            size: 'medium'
        },
        cat: {
            name: 'Katze',
            health: 30,
            speed: 1.5,
            strength: 2,
            intelligence: 3,
            loyalty: 2,
            skills: ['hunt', 'climb', 'companion'],
            diet: 'meat',
            habitat: 'urban',
            size: 'small'
        },
        bird: {
            name: 'Vogel',
            health: 20,
            speed: 2.0,
            strength: 1,
            intelligence: 2,
            loyalty: 1,
            skills: ['fly', 'sing', 'messenger'],
            diet: 'seeds',
            habitat: 'sky',
            size: 'tiny'
        },
        horse: {
            name: 'Pferd',
            health: 100,
            speed: 1.8,
            strength: 5,
            intelligence: 3,
            loyalty: 4,
            skills: ['ride', 'carry', 'companion'],
            diet: 'grass',
            habitat: 'rural',
            size: 'large'
        },
        cow: {
            name: 'Kuh',
            health: 80,
            speed: 0.8,
            strength: 4,
            intelligence: 2,
            loyalty: 3,
            skills: ['milk', 'meat', 'companion'],
            diet: 'grass',
            habitat: 'farm',
            size: 'large'
        },
        pig: {
            name: 'Schwein',
            health: 60,
            speed: 1.0,
            strength: 3,
            intelligence: 4,
            loyalty: 2,
            skills: ['find_truffles', 'meat', 'companion'],
            diet: 'omnivore',
            habitat: 'farm',
            size: 'medium'
        },
        chicken: {
            name: 'Huhn',
            health: 25,
            speed: 1.2,
            strength: 1,
            intelligence: 1,
            loyalty: 1,
            skills: ['lay_eggs', 'meat', 'companion'],
            diet: 'seeds',
            habitat: 'farm',
            size: 'small'
        },
        fish: {
            name: 'Fisch',
            health: 15,
            speed: 1.5,
            strength: 1,
            intelligence: 1,
            loyalty: 0,
            skills: ['swim', 'food'],
            diet: 'plankton',
            habitat: 'water',
            size: 'small'
        },
        snake: {
            name: 'Schlange',
            health: 40,
            speed: 1.0,
            strength: 2,
            intelligence: 2,
            loyalty: 1,
            skills: ['poison', 'hunt', 'companion'],
            diet: 'meat',
            habitat: 'wild',
            size: 'medium'
        },
        lion: {
            name: 'Löwe',
            health: 120,
            speed: 1.8,
            strength: 6,
            intelligence: 3,
            loyalty: 2,
            skills: ['hunt', 'guard', 'intimidate'],
            diet: 'meat',
            habitat: 'savanna',
            size: 'large'
        },
        tiger: {
            name: 'Tiger',
            health: 110,
            speed: 1.9,
            strength: 6,
            intelligence: 4,
            loyalty: 1,
            skills: ['hunt', 'stealth', 'intimidate'],
            diet: 'meat',
            habitat: 'jungle',
            size: 'large'
        },
        elephant: {
            name: 'Elefant',
            health: 200,
            speed: 1.2,
            strength: 8,
            intelligence: 5,
            loyalty: 4,
            skills: ['carry', 'guard', 'companion'],
            diet: 'plants',
            habitat: 'savanna',
            size: 'huge'
        },
        bear: {
            name: 'Bär',
            health: 150,
            speed: 1.5,
            strength: 7,
            intelligence: 3,
            loyalty: 2,
            skills: ['hunt', 'guard', 'intimidate'],
            diet: 'omnivore',
            habitat: 'forest',
            size: 'large'
        },
        wolf: {
            name: 'Wolf',
            health: 80,
            speed: 1.8,
            strength: 4,
            intelligence: 4,
            loyalty: 3,
            skills: ['hunt', 'pack', 'guard'],
            diet: 'meat',
            habitat: 'forest',
            size: 'medium'
        },
        fox: {
            name: 'Fuchs',
            health: 40,
            speed: 1.6,
            strength: 2,
            intelligence: 4,
            loyalty: 1,
            skills: ['hunt', 'stealth', 'companion'],
            diet: 'omnivore',
            habitat: 'forest',
            size: 'small'
        },
        rabbit: {
            name: 'Hase',
            health: 20,
            speed: 1.8,
            strength: 1,
            intelligence: 2,
            loyalty: 1,
            skills: ['run', 'hide', 'companion'],
            diet: 'plants',
            habitat: 'meadow',
            size: 'tiny'
        },
        deer: {
            name: 'Hirsch',
            health: 60,
            speed: 1.7,
            strength: 3,
            intelligence: 2,
            loyalty: 1,
            skills: ['run', 'jump', 'companion'],
            diet: 'plants',
            habitat: 'forest',
            size: 'medium'
        }
    },
    
    // Aktive Peds
    activePeds: new Map(),
    
    // Ped-Missionen
    pedMissions: new Map(),
    
    // Tier-Besitzer
    petOwners: new Map(),
    
    // Ped-System-Initialisierung
    init() {
        console.log('[PED] Ped-System initialisiert');
        this.createDefaultPeds();
    },
    
    // Standard-Peds erstellen
    createDefaultPeds() {
        const peds = [
            // Zivilisten
            { id: 'ped_1', type: 'civilian', position: { x: 100, y: 200, z: 30 }, name: 'Zivilist 1' },
            { id: 'ped_2', type: 'civilian', position: { x: 150, y: 250, z: 30 }, name: 'Zivilist 2' },
            { id: 'ped_3', type: 'civilian', position: { x: 200, y: 300, z: 30 }, name: 'Zivilist 3' },
            
            // Polizei
            { id: 'ped_4', type: 'police', position: { x: 425, y: -979, z: 30 }, name: 'Polizist 1' },
            { id: 'ped_5', type: 'police', position: { x: 450, y: -950, z: 30 }, name: 'Polizist 2' },
            
            // Sanitäter
            { id: 'ped_6', type: 'ems', position: { x: 1839, y: 3672, z: 34 }, name: 'Sanitäter 1' },
            { id: 'ped_7', type: 'ems', position: { x: 1850, y: 3680, z: 34 }, name: 'Sanitäter 2' },
            
            // Verkäufer
            { id: 'ped_8', type: 'vendor', position: { x: 25, y: -1347, z: 29 }, name: 'Ladenbesitzer' },
            { id: 'ped_9', type: 'vendor', position: { x: -47, y: -1757, z: 29 }, name: 'Ladenbesitzer' },
            
            // Tiere
            { id: 'ped_10', type: 'animal', animalType: 'dog', position: { x: 300, y: 400, z: 30 }, name: 'Hund' },
            { id: 'ped_11', type: 'animal', animalType: 'cat', position: { x: 350, y: 450, z: 30 }, name: 'Katze' },
            { id: 'ped_12', type: 'animal', animalType: 'bird', position: { x: 400, y: 500, z: 35 }, name: 'Vogel' }
        ];
        
        peds.forEach(ped => {
            this.createPed(ped);
        });
        
        console.log(`[PED] ${peds.length} Peds erstellt`);
    },
    
    // Ped erstellen
    createPed(pedData) {
        const config = this.pedConfig[pedData.type];
        if (!config) {
            console.error(`[PED] Unbekannter Ped-Typ: ${pedData.type}`);
            return false;
        }
        
        const ped = {
            id: pedData.id,
            type: pedData.type,
            name: pedData.name,
            position: pedData.position,
            config: config,
            health: config.health,
            armor: config.armor,
            weapons: [...config.weapons],
            behavior: config.behavior,
            interactions: [...config.interactions],
            missions: [...config.missions],
            status: 'active',
            owner: null,
            created: Date.now()
        };
        
        // Tier-spezifische Eigenschaften
        if (pedData.animalType) {
            const animalConfig = this.animalConfig[pedData.animalType];
            if (animalConfig) {
                ped.animalType = pedData.animalType;
                ped.animalConfig = animalConfig;
                ped.health = animalConfig.health;
                ped.speed = animalConfig.speed;
                ped.strength = animalConfig.strength;
                ped.intelligence = animalConfig.intelligence;
                ped.loyalty = animalConfig.loyalty;
                ped.skills = [...animalConfig.skills];
                ped.diet = animalConfig.diet;
                ped.habitat = animalConfig.habitat;
                ped.size = animalConfig.size;
            }
        }
        
        this.activePeds.set(pedData.id, ped);
        
        // Ped-Objekt erstellen
        this.spawnPedObject(ped);
        
        console.log(`[PED] Ped ${pedData.name} (${config.name}) erstellt`);
        return true;
    },
    
    // Ped-Objekt spawnen
    spawnPedObject(ped) {
        // Hier würde das Ped-Objekt in der Welt erstellt werden
        console.log(`[PED] Ped-Objekt für ${ped.name} gespawnt`);
    },
    
    // Ped-Interaktion
    interactWithPed(player, pedId, interaction) {
        const ped = this.activePeds.get(pedId);
        if (!ped) {
            player.outputChatBox('Ped nicht gefunden!');
            return false;
        }
        
        if (!ped.interactions.includes(interaction)) {
            player.outputChatBox('Diese Interaktion ist nicht möglich!');
            return false;
        }
        
        // Interaktion durchführen
        switch (interaction) {
            case 'talk':
                this.talkToPed(player, ped);
                break;
            case 'trade':
                this.tradeWithPed(player, ped);
                break;
            case 'ask_directions':
                this.askDirections(player, ped);
                break;
            case 'arrest':
                this.arrestPed(player, ped);
                break;
            case 'question':
                this.questionPed(player, ped);
                break;
            case 'patrol':
                this.patrolWithPed(player, ped);
                break;
            case 'heal':
                this.healPed(player, ped);
                break;
            case 'revive':
                this.revivePed(player, ped);
                break;
            case 'medical_check':
                this.medicalCheckPed(player, ped);
                break;
            case 'extinguish':
                this.extinguishFire(player, ped);
                break;
            case 'rescue':
                this.rescuePed(player, ped);
                break;
            case 'fire_safety':
                this.fireSafetyCheck(player, ped);
                break;
            case 'check_id':
                this.checkId(player, ped);
                break;
            case 'remove':
                this.removePed(player, ped);
                break;
            case 'sell':
                this.sellToPed(player, ped);
                break;
            case 'buy':
                this.buyFromPed(player, ped);
                break;
            case 'feed':
                this.feedAnimal(player, ped);
                break;
            case 'pet':
                this.petAnimal(player, ped);
                break;
            case 'command':
                this.commandAnimal(player, ped);
                break;
            case 'work':
                this.workWithPed(player, ped);
                break;
            case 'help':
                this.helpPed(player, ped);
                break;
            case 'beg':
                this.begFromPed(player, ped);
                break;
            case 'threaten':
                this.threatenPed(player, ped);
                break;
            case 'fight':
                this.fightPed(player, ped);
                break;
            case 'recruit':
                this.recruitPed(player, ped);
                break;
            case 'business_deal':
                this.businessDeal(player, ped);
                break;
            case 'hire':
                this.hirePed(player, ped);
                break;
            case 'negotiate':
                this.negotiateWithPed(player, ped);
                break;
        }
        
        return true;
    },
    
    // Mit Ped sprechen
    talkToPed(player, ped) {
        const responses = [
            "Hallo! Wie geht es dir?",
            "Schönes Wetter heute, nicht wahr?",
            "Kann ich dir bei etwas helfen?",
            "Hast du etwas Interessantes gehört?",
            "Wie ist das Leben in der Stadt?"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        player.outputChatBox(`${ped.name}: ${response}`);
    },
    
    // Mit Ped handeln
    tradeWithPed(player, ped) {
        if (ped.type === 'vendor') {
            player.call('ui:show', 'Trade', { pedId: ped.id, pedName: ped.name });
        } else {
            player.outputChatBox(`${ped.name}: Ich handele nicht mit dir!`);
        }
    },
    
    // Nach dem Weg fragen
    askDirections(player, ped) {
        const directions = [
            "Gehe geradeaus und dann links.",
            "Es ist gleich um die Ecke.",
            "Du musst zwei Blöcke nach Norden.",
            "Frage jemand anderen, ich bin neu hier.",
            "Folge der Hauptstraße."
        ];
        
        const direction = directions[Math.floor(Math.random() * directions.length)];
        player.outputChatBox(`${ped.name}: ${direction}`);
    },
    
    // Ped verhaften
    arrestPed(player, ped) {
        if (ped.type === 'police') {
            player.outputChatBox(`${ped.name}: Ich kann dir nicht helfen, ich bin selbst Polizist!`);
        } else {
            player.outputChatBox(`${ped.name}: Du hast mich verhaftet!`);
            // Hier würde die Verhaftungs-Logik implementiert werden
        }
    },
    
    // Ped befragen
    questionPed(player, ped) {
        if (ped.type === 'police') {
            player.outputChatBox(`${ped.name}: Ich beantworte gerne deine Fragen. Was möchtest du wissen?`);
        } else {
            player.outputChatBox(`${ped.name}: Ich weiß nicht viel, aber ich versuche zu helfen.`);
        }
    },
    
    // Mit Ped patrouillieren
    patrolWithPed(player, ped) {
        if (ped.type === 'police') {
            player.outputChatBox(`${ped.name}: Lass uns zusammen patrouillieren!`);
            // Hier würde die Patrouillen-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Polizist!`);
        }
    },
    
    // Ped heilen
    healPed(player, ped) {
        if (ped.type === 'ems') {
            player.outputChatBox(`${ped.name}: Ich helfe dir gerne!`);
            // Hier würde die Heilungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Sanitäter!`);
        }
    },
    
    // Ped wiederbeleben
    revivePed(player, ped) {
        if (ped.type === 'ems') {
            player.outputChatBox(`${ped.name}: Ich versuche dich wiederzubeleben!`);
            // Hier würde die Wiederbelebungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Sanitäter!`);
        }
    },
    
    // Medizinische Untersuchung
    medicalCheckPed(player, ped) {
        if (ped.type === 'ems') {
            player.outputChatBox(`${ped.name}: Lass mich dich untersuchen...`);
            // Hier würde die medizinische Untersuchung implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Sanitäter!`);
        }
    },
    
    // Feuer löschen
    extinguishFire(player, ped) {
        if (ped.type === 'firefighter') {
            player.outputChatBox(`${ped.name}: Ich helfe dir beim Löschen!`);
            // Hier würde die Feuerlösch-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Feuerwehrmann!`);
        }
    },
    
    // Ped retten
    rescuePed(player, ped) {
        if (ped.type === 'firefighter' || ped.type === 'ems') {
            player.outputChatBox(`${ped.name}: Ich rette dich!`);
            // Hier würde die Rettungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Rettungskraft!`);
        }
    },
    
    // Brandschutz-Check
    fireSafetyCheck(player, ped) {
        if (ped.type === 'firefighter') {
            player.outputChatBox(`${ped.name}: Lass mich die Brandschutzmaßnahmen überprüfen...`);
            // Hier würde der Brandschutz-Check implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Feuerwehrmann!`);
        }
    },
    
    // Ausweis prüfen
    checkId(player, ped) {
        if (ped.type === 'security') {
            player.outputChatBox(`${ped.name}: Zeig mir deinen Ausweis!`);
            // Hier würde die Ausweis-Prüfung implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Sicherheitsdienst!`);
        }
    },
    
    // Ped entfernen
    removePed(player, ped) {
        if (ped.type === 'security') {
            player.outputChatBox(`${ped.name}: Du musst gehen!`);
            // Hier würde die Entfernungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Sicherheitsdienst!`);
        }
    },
    
    // An Ped verkaufen
    sellToPed(player, ped) {
        if (ped.type === 'vendor') {
            player.call('ui:show', 'Sell', { pedId: ped.id, pedName: ped.name });
        } else {
            player.outputChatBox(`${ped.name}: Ich kaufe nichts!`);
        }
    },
    
    // Von Ped kaufen
    buyFromPed(player, ped) {
        if (ped.type === 'vendor') {
            player.call('ui:show', 'Buy', { pedId: ped.id, pedName: ped.name });
        } else {
            player.outputChatBox(`${ped.name}: Ich verkaufe nichts!`);
        }
    },
    
    // Tier füttern
    feedAnimal(player, ped) {
        if (ped.type === 'animal' || ped.type === 'pet') {
            player.outputChatBox(`${ped.name}: *frisst glücklich*`);
            // Hier würde die Fütterungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Tier!`);
        }
    },
    
    // Tier streicheln
    petAnimal(player, ped) {
        if (ped.type === 'animal' || ped.type === 'pet') {
            player.outputChatBox(`${ped.name}: *schnurrt zufrieden*`);
            // Hier würde die Streichel-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Tier!`);
        }
    },
    
    // Tier befehligen
    commandAnimal(player, ped) {
        if (ped.type === 'animal' || ped.type === 'pet') {
            if (ped.owner === player.id) {
                player.outputChatBox(`${ped.name}: *folgt deinem Befehl*`);
                // Hier würde die Befehls-Logik implementiert werden
            } else {
                player.outputChatBox(`${ped.name}: Du bist nicht mein Besitzer!`);
            }
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Tier!`);
        }
    },
    
    // Mit Ped arbeiten
    workWithPed(player, ped) {
        if (ped.type === 'worker') {
            player.outputChatBox(`${ped.name}: Lass uns zusammen arbeiten!`);
            // Hier würde die Arbeits-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Arbeiter!`);
        }
    },
    
    // Ped helfen
    helpPed(player, ped) {
        player.outputChatBox(`${ped.name}: Danke für deine Hilfe!`);
        // Hier würde die Hilfe-Logik implementiert werden
    },
    
    // Von Ped betteln
    begFromPed(player, ped) {
        if (ped.type === 'homeless') {
            player.outputChatBox(`${ped.name}: Ich habe selbst nichts!`);
        } else {
            const responses = [
                "Hier, nimm das!",
                "Ich kann dir nicht helfen.",
                "Geh weg von mir!",
                "Versuch es woanders."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            player.outputChatBox(`${ped.name}: ${response}`);
        }
    },
    
    // Ped bedrohen
    threatenPed(player, ped) {
        if (ped.type === 'gang_member') {
            player.outputChatBox(`${ped.name}: Du willst Ärger?`);
            // Hier würde die Bedrohungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Bitte tu mir nichts!`);
        }
    },
    
    // Mit Ped kämpfen
    fightPed(player, ped) {
        if (ped.type === 'gang_member') {
            player.outputChatBox(`${ped.name}: Lass uns kämpfen!`);
            // Hier würde die Kampf-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich kämpfe nicht!`);
        }
    },
    
    // Ped rekrutieren
    recruitPed(player, ped) {
        if (ped.type === 'gang_member') {
            player.outputChatBox(`${ped.name}: Ich bin bereits in einer Gang!`);
        } else {
            player.outputChatBox(`${ped.name}: Ich denke darüber nach...`);
        }
    },
    
    // Geschäftsdeal mit Ped
    businessDeal(player, ped) {
        if (ped.type === 'business_owner') {
            player.outputChatBox(`${ped.name}: Lass uns über Geschäfte sprechen!`);
            // Hier würde die Geschäfts-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Geschäftsmann!`);
        }
    },
    
    // Ped einstellen
    hirePed(player, ped) {
        if (ped.type === 'worker') {
            player.outputChatBox(`${ped.name}: Ich würde gerne für dich arbeiten!`);
            // Hier würde die Einstellungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich bin kein Arbeiter!`);
        }
    },
    
    // Mit Ped verhandeln
    negotiateWithPed(player, ped) {
        if (ped.type === 'business_owner') {
            player.outputChatBox(`${ped.name}: Lass uns verhandeln!`);
            // Hier würde die Verhandlungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${ped.name}: Ich verhandle nicht!`);
        }
    },
    
    // Ped-Mission starten
    startPedMission(player, pedId, missionType) {
        const ped = this.activePeds.get(pedId);
        if (!ped) {
            player.outputChatBox('Ped nicht gefunden!');
            return false;
        }
        
        if (!ped.missions.includes(missionType)) {
            player.outputChatBox('Diese Mission ist nicht verfügbar!');
            return false;
        }
        
        const missionId = Date.now();
        const mission = {
            id: missionId,
            pedId: pedId,
            playerId: player.id,
            type: missionType,
            status: 'active',
            startTime: Date.now(),
            endTime: null,
            reward: this.calculateMissionReward(missionType),
            progress: 0
        };
        
        this.pedMissions.set(missionId, mission);
        
        player.outputChatBox(`Mission ${missionType} mit ${ped.name} gestartet!`);
        console.log(`[PED] Mission ${missionType} von Spieler ${player.id} mit Ped ${pedId} gestartet`);
        return true;
    },
    
    // Missions-Belohnung berechnen
    calculateMissionReward(missionType) {
        const rewards = {
            'delivery': 100,
            'escort': 150,
            'information': 50,
            'patrol': 200,
            'arrest': 300,
            'investigate': 250,
            'rescue': 400,
            'medical_emergency': 350,
            'transport': 200,
            'fire_fighting': 500,
            'prevention': 300,
            'security_check': 150,
            'remove_trespassers': 200,
            'sell_items': 100,
            'restock': 80,
            'customer_service': 120,
            'hunt': 200,
            'guard': 300,
            'companion': 100,
            'construction': 250,
            'maintenance': 200,
            'survive': 50,
            'find_shelter': 75,
            'get_food': 60,
            'territory_control': 400,
            'drug_dealing': 500,
            'protection': 300,
            'manage_business': 600,
            'hire_workers': 200,
            'expand': 800
        };
        
        return rewards[missionType] || 100;
    },
    
    // Ped-Statistiken
    getStatistics() {
        return {
            totalPeds: this.activePeds.size,
            activeMissions: this.pedMissions.size,
            pedTypes: Object.keys(this.pedConfig).length,
            animalTypes: Object.keys(this.animalConfig).length,
            petOwners: this.petOwners.size
        };
    }
};

// Events
mp.events.add('ped:interact', (player, pedId, interaction) => {
    pedSystem.interactWithPed(player, pedId, interaction);
});

mp.events.add('ped:startMission', (player, pedId, missionType) => {
    pedSystem.startPedMission(player, pedId, missionType);
});

mp.events.add('ped:getPeds', (player) => {
    const peds = Array.from(pedSystem.activePeds.values());
    player.call('ped:updatePeds', [peds]);
});

// Commands
mp.events.addCommand('ped', (player, fullText, action, pedId, interaction) => {
    if (!action) {
        const peds = Array.from(pedSystem.activePeds.values());
        player.outputChatBox('Verwendung: /ped [interact|mission] [PedID] [Interaktion]');
        player.outputChatBox('Verfügbare Peds:');
        peds.forEach(ped => {
            player.outputChatBox(`- ${ped.id}: ${ped.name} (${ped.type})`);
        });
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'interact':
            if (pedId && interaction) {
                pedSystem.interactWithPed(player, pedId, interaction);
            } else {
                player.outputChatBox('Ped ID und Interaktion erforderlich!');
            }
            break;
            
        case 'mission':
            if (pedId && interaction) {
                pedSystem.startPedMission(player, pedId, interaction);
            } else {
                player.outputChatBox('Ped ID und Mission-Typ erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('peds', (player) => {
    const stats = pedSystem.getStatistics();
    player.outputChatBox('=== Ped Statistiken ===');
    player.outputChatBox(`Gesamt Peds: ${stats.totalPeds}`);
    player.outputChatBox(`Aktive Missionen: ${stats.activeMissions}`);
    player.outputChatBox(`Ped-Typen: ${stats.pedTypes}`);
    player.outputChatBox(`Tier-Typen: ${stats.animalTypes}`);
    player.outputChatBox(`Haustier-Besitzer: ${stats.petOwners}`);
});

// Ped-System initialisieren
pedSystem.init();

module.exports = pedSystem;
