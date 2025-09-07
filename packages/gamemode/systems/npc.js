// NPC System - NPC-System mit Dialogen und Interaktionen
// Behandelt alle NPC-Funktionen für Horizont-City Roleplay

const npcSystem = {
    // NPC-Typen
    npcTypes: {
        VENDOR: 'vendor',
        QUEST_GIVER: 'quest_giver',
        GUARD: 'guard',
        MERCHANT: 'merchant',
        CIVILIAN: 'civilian',
        OFFICIAL: 'official',
        ENTERTAINER: 'entertainer',
        WORKER: 'worker',
        GUIDE: 'guide',
        TRAINER: 'trainer',
        HEALER: 'healer',
        BLACKSMITH: 'blacksmith',
        BANKER: 'banker',
        RECEPTIONIST: 'receptionist',
        CUSTOM: 'custom'
    },
    
    // Dialog-Typen
    dialogTypes: {
        GREETING: 'greeting',
        QUEST: 'quest',
        TRADE: 'trade',
        INFORMATION: 'information',
        GOSSIP: 'gossip',
        THREAT: 'threat',
        FRIENDLY: 'friendly',
        NEUTRAL: 'neutral',
        HOSTILE: 'hostile',
        ROMANTIC: 'romantic',
        BUSINESS: 'business',
        CUSTOM: 'custom'
    },
    
    // NPC-Konfiguration
    npcConfig: {
        vendor: {
            name: 'Verkäufer',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['trade', 'talk', 'buy', 'sell'],
            dialogs: ['greeting', 'trade', 'goodbye'],
            inventory: [],
            money: 1000,
            reputation: 0,
            faction: null,
            quests: []
        },
        quest_giver: {
            name: 'Quest-Geber',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['talk', 'quest', 'reward'],
            dialogs: ['greeting', 'quest', 'reward', 'goodbye'],
            inventory: [],
            money: 500,
            reputation: 0,
            faction: null,
            quests: []
        },
        guard: {
            name: 'Wächter',
            health: 150,
            armor: 50,
            weapons: ['pistol', 'baton'],
            behavior: 'neutral',
            interactions: ['talk', 'question', 'arrest'],
            dialogs: ['greeting', 'warning', 'threat', 'goodbye'],
            inventory: [],
            money: 200,
            reputation: 0,
            faction: 'police',
            quests: []
        },
        merchant: {
            name: 'Händler',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['trade', 'talk', 'negotiate'],
            dialogs: ['greeting', 'trade', 'negotiate', 'goodbye'],
            inventory: [],
            money: 2000,
            reputation: 0,
            faction: null,
            quests: []
        },
        civilian: {
            name: 'Zivilist',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['talk', 'gossip', 'help'],
            dialogs: ['greeting', 'gossip', 'information', 'goodbye'],
            inventory: [],
            money: 100,
            reputation: 0,
            faction: null,
            quests: []
        },
        official: {
            name: 'Beamter',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'neutral',
            interactions: ['talk', 'service', 'document'],
            dialogs: ['greeting', 'service', 'information', 'goodbye'],
            inventory: [],
            money: 300,
            reputation: 0,
            faction: 'government',
            quests: []
        },
        entertainer: {
            name: 'Unterhalter',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['talk', 'perform', 'entertain'],
            dialogs: ['greeting', 'perform', 'entertain', 'goodbye'],
            inventory: [],
            money: 150,
            reputation: 0,
            faction: null,
            quests: []
        },
        worker: {
            name: 'Arbeiter',
            health: 120,
            armor: 0,
            weapons: [],
            behavior: 'neutral',
            interactions: ['talk', 'work', 'help'],
            dialogs: ['greeting', 'work', 'information', 'goodbye'],
            inventory: [],
            money: 80,
            reputation: 0,
            faction: null,
            quests: []
        },
        guide: {
            name: 'Führer',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['talk', 'guide', 'information'],
            dialogs: ['greeting', 'guide', 'information', 'goodbye'],
            inventory: [],
            money: 200,
            reputation: 0,
            faction: null,
            quests: []
        },
        trainer: {
            name: 'Trainer',
            health: 150,
            armor: 25,
            weapons: ['fist'],
            behavior: 'friendly',
            interactions: ['talk', 'train', 'teach'],
            dialogs: ['greeting', 'train', 'teach', 'goodbye'],
            inventory: [],
            money: 300,
            reputation: 0,
            faction: null,
            quests: []
        },
        healer: {
            name: 'Heiler',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['talk', 'heal', 'cure'],
            dialogs: ['greeting', 'heal', 'cure', 'goodbye'],
            inventory: [],
            money: 250,
            reputation: 0,
            faction: 'medical',
            quests: []
        },
        blacksmith: {
            name: 'Schmied',
            health: 120,
            armor: 0,
            weapons: ['hammer'],
            behavior: 'neutral',
            interactions: ['talk', 'craft', 'repair'],
            dialogs: ['greeting', 'craft', 'repair', 'goodbye'],
            inventory: [],
            money: 400,
            reputation: 0,
            faction: null,
            quests: []
        },
        banker: {
            name: 'Banker',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'neutral',
            interactions: ['talk', 'banking', 'loan'],
            dialogs: ['greeting', 'banking', 'loan', 'goodbye'],
            inventory: [],
            money: 10000,
            reputation: 0,
            faction: 'bank',
            quests: []
        },
        receptionist: {
            name: 'Empfangsdame',
            health: 100,
            armor: 0,
            weapons: [],
            behavior: 'friendly',
            interactions: ['talk', 'service', 'information'],
            dialogs: ['greeting', 'service', 'information', 'goodbye'],
            inventory: [],
            money: 150,
            reputation: 0,
            faction: null,
            quests: []
        }
    },
    
    // Dialog-System
    dialogs: {
        greeting: [
            "Hallo! Wie kann ich dir helfen?",
            "Willkommen! Was führt dich hierher?",
            "Guten Tag! Brauchst du etwas?",
            "Hey! Schön dich zu sehen!",
            "Hallo! Wie geht es dir?"
        ],
        trade: [
            "Was möchtest du kaufen?",
            "Ich habe verschiedene Waren im Angebot.",
            "Schau dir meine Waren an!",
            "Was brauchst du?",
            "Ich kann dir verschiedene Dinge verkaufen."
        ],
        quest: [
            "Ich habe eine Aufgabe für dich.",
            "Kannst du mir helfen?",
            "Ich brauche jemanden für eine Mission.",
            "Hast du Zeit für eine Aufgabe?",
            "Ich könnte deine Hilfe gebrauchen."
        ],
        information: [
            "Was möchtest du wissen?",
            "Ich kann dir Informationen geben.",
            "Frag mich ruhig!",
            "Ich weiß einiges über die Stadt.",
            "Was interessiert dich?"
        ],
        gossip: [
            "Hast du schon gehört...",
            "Ich habe etwas Interessantes gehört.",
            "Weißt du was?",
            "Lass mich dir erzählen...",
            "Das ist ja interessant!"
        ],
        threat: [
            "Du solltest gehen!",
            "Das ist nicht dein Gebiet!",
            "Verschwinde!",
            "Du bist hier nicht willkommen!",
            "Geh weg!"
        ],
        friendly: [
            "Es ist schön dich zu sehen!",
            "Wie geht es dir denn?",
            "Hast du schon gegessen?",
            "Lass uns plaudern!",
            "Du siehst gut aus!"
        ],
        neutral: [
            "Was willst du?",
            "Ich bin beschäftigt.",
            "Kann ich dir helfen?",
            "Was ist los?",
            "Ja?"
        ],
        hostile: [
            "Du bist hier nicht willkommen!",
            "Geh weg!",
            "Ich will nichts mit dir zu tun haben!",
            "Verschwinde!",
            "Du störst mich!"
        ],
        romantic: [
            "Du siehst heute besonders gut aus!",
            "Hast du Lust auf einen Spaziergang?",
            "Du machst mich verrückt!",
            "Ich denke viel an dich.",
            "Du bist wunderschön!"
        ],
        business: [
            "Lass uns über Geschäfte sprechen.",
            "Ich habe ein Angebot für dich.",
            "Das könnte profitabel sein.",
            "Interessiert dich das?",
            "Lass uns verhandeln."
        ],
        goodbye: [
            "Auf Wiedersehen!",
            "Bis bald!",
            "Pass auf dich auf!",
            "Tschüss!",
            "Bis zum nächsten Mal!"
        ]
    },
    
    // Aktive NPCs
    activeNPCs: new Map(),
    
    // NPC-Dialoge
    npcDialogs: new Map(),
    
    // NPC-Questen
    npcQuests: new Map(),
    
    // NPC-System-Initialisierung
    init() {
        console.log('[NPC] NPC-System initialisiert');
        this.createDefaultNPCs();
    },
    
    // Standard-NPCs erstellen
    createDefaultNPCs() {
        const npcs = [
            // Verkäufer
            { id: 'npc_1', type: 'vendor', position: { x: 25, y: -1347, z: 29 }, name: 'Ladenbesitzer' },
            { id: 'npc_2', type: 'vendor', position: { x: -47, y: -1757, z: 29 }, name: 'Ladenbesitzer' },
            { id: 'npc_3', type: 'vendor', position: { x: 1135, y: -982, z: 46 }, name: 'Ladenbesitzer' },
            
            // Quest-Geber
            { id: 'npc_4', type: 'quest_giver', position: { x: 200, y: 300, z: 30 }, name: 'Quest-Meister' },
            { id: 'npc_5', type: 'quest_giver', position: { x: 300, y: 400, z: 30 }, name: 'Abenteurer' },
            
            // Wächter
            { id: 'npc_6', type: 'guard', position: { x: 425, y: -979, z: 30 }, name: 'Stadtwächter' },
            { id: 'npc_7', type: 'guard', position: { x: -1108, y: -845, z: 19 }, name: 'Stadtwächter' },
            
            // Händler
            { id: 'npc_8', type: 'merchant', position: { x: 150, y: -1040, z: 29 }, name: 'Händler' },
            { id: 'npc_9', type: 'merchant', position: { x: -1212, y: -330, z: 37 }, name: 'Händler' },
            
            // Zivilisten
            { id: 'npc_10', type: 'civilian', position: { x: 100, y: 200, z: 30 }, name: 'Zivilist' },
            { id: 'npc_11', type: 'civilian', position: { x: 150, y: 250, z: 30 }, name: 'Zivilist' },
            { id: 'npc_12', type: 'civilian', position: { x: 200, y: 300, z: 30 }, name: 'Zivilist' },
            
            // Beamte
            { id: 'npc_13', type: 'official', position: { x: -544, y: -204, z: 37 }, name: 'Beamter' },
            { id: 'npc_14', type: 'official', position: { x: -1037, y: -2737, z: 20 }, name: 'Beamter' },
            
            // Unterhalter
            { id: 'npc_15', type: 'entertainer', position: { x: 925, y: 46, z: 81 }, name: 'Unterhalter' },
            { id: 'npc_16', type: 'entertainer', position: { x: 1111, y: 230, z: -50 }, name: 'Unterhalter' },
            
            // Arbeiter
            { id: 'npc_17', type: 'worker', position: { x: 400, y: 500, z: 30 }, name: 'Arbeiter' },
            { id: 'npc_18', type: 'worker', position: { x: 450, y: 550, z: 30 }, name: 'Arbeiter' },
            
            // Führer
            { id: 'npc_19', type: 'guide', position: { x: 500, y: 600, z: 30 }, name: 'Stadtführer' },
            
            // Trainer
            { id: 'npc_20', type: 'trainer', position: { x: 600, y: 700, z: 30 }, name: 'Kampftrainer' },
            
            // Heiler
            { id: 'npc_21', type: 'healer', position: { x: 1839, y: 3672, z: 34 }, name: 'Heiler' },
            { id: 'npc_22', type: 'healer', position: { x: -449, y: -340, z: 34 }, name: 'Heiler' },
            
            // Schmied
            { id: 'npc_23', type: 'blacksmith', position: { x: 700, y: 800, z: 30 }, name: 'Schmied' },
            
            // Banker
            { id: 'npc_24', type: 'banker', position: { x: 150, y: -1040, z: 29 }, name: 'Banker' },
            { id: 'npc_25', type: 'banker', position: { x: -1212, y: -330, z: 37 }, name: 'Banker' },
            
            // Empfangsdame
            { id: 'npc_26', type: 'receptionist', position: { x: 800, y: 900, z: 30 }, name: 'Empfangsdame' }
        ];
        
        npcs.forEach(npc => {
            this.createNPC(npc);
        });
        
        console.log(`[NPC] ${npcs.length} NPCs erstellt`);
    },
    
    // NPC erstellen
    createNPC(npcData) {
        const config = this.npcConfig[npcData.type];
        if (!config) {
            console.error(`[NPC] Unbekannter NPC-Typ: ${npcData.type}`);
            return false;
        }
        
        const npc = {
            id: npcData.id,
            type: npcData.type,
            name: npcData.name,
            position: npcData.position,
            config: config,
            health: config.health,
            armor: config.armor,
            weapons: [...config.weapons],
            behavior: config.behavior,
            interactions: [...config.interactions],
            dialogs: [...config.dialogs],
            inventory: [...config.inventory],
            money: config.money,
            reputation: config.reputation,
            faction: config.faction,
            quests: [...config.quests],
            status: 'active',
            created: Date.now(),
            lastInteraction: null,
            conversationState: 'idle',
            currentDialog: null,
            dialogHistory: []
        };
        
        this.activeNPCs.set(npcData.id, npc);
        
        // NPC-Objekt erstellen
        this.spawnNPCObject(npc);
        
        console.log(`[NPC] NPC ${npcData.name} (${config.name}) erstellt`);
        return true;
    },
    
    // NPC-Objekt spawnen
    spawnNPCObject(npc) {
        // Hier würde das NPC-Objekt in der Welt erstellt werden
        console.log(`[NPC] NPC-Objekt für ${npc.name} gespawnt`);
    },
    
    // Mit NPC interagieren
    interactWithNPC(player, npcId, interaction) {
        const npc = this.activeNPCs.get(npcId);
        if (!npc) {
            player.outputChatBox('NPC nicht gefunden!');
            return false;
        }
        
        if (!npc.interactions.includes(interaction)) {
            player.outputChatBox('Diese Interaktion ist nicht möglich!');
            return false;
        }
        
        // Interaktion durchführen
        switch (interaction) {
            case 'talk':
                this.talkToNPC(player, npc);
                break;
            case 'trade':
                this.tradeWithNPC(player, npc);
                break;
            case 'buy':
                this.buyFromNPC(player, npc);
                break;
            case 'sell':
                this.sellToNPC(player, npc);
                break;
            case 'quest':
                this.questWithNPC(player, npc);
                break;
            case 'reward':
                this.rewardFromNPC(player, npc);
                break;
            case 'question':
                this.questionNPC(player, npc);
                break;
            case 'arrest':
                this.arrestNPC(player, npc);
                break;
            case 'negotiate':
                this.negotiateWithNPC(player, npc);
                break;
            case 'gossip':
                this.gossipWithNPC(player, npc);
                break;
            case 'help':
                this.helpNPC(player, npc);
                break;
            case 'service':
                this.serviceFromNPC(player, npc);
                break;
            case 'document':
                this.documentFromNPC(player, npc);
                break;
            case 'perform':
                this.performWithNPC(player, npc);
                break;
            case 'entertain':
                this.entertainWithNPC(player, npc);
                break;
            case 'work':
                this.workWithNPC(player, npc);
                break;
            case 'guide':
                this.guideWithNPC(player, npc);
                break;
            case 'information':
                this.informationFromNPC(player, npc);
                break;
            case 'train':
                this.trainWithNPC(player, npc);
                break;
            case 'teach':
                this.teachWithNPC(player, npc);
                break;
            case 'heal':
                this.healWithNPC(player, npc);
                break;
            case 'cure':
                this.cureWithNPC(player, npc);
                break;
            case 'craft':
                this.craftWithNPC(player, npc);
                break;
            case 'repair':
                this.repairWithNPC(player, npc);
                break;
            case 'banking':
                this.bankingWithNPC(player, npc);
                break;
            case 'loan':
                this.loanFromNPC(player, npc);
                break;
        }
        
        // Interaktion aufzeichnen
        npc.lastInteraction = Date.now();
        
        return true;
    },
    
    // Mit NPC sprechen
    talkToNPC(player, npc) {
        const dialogType = this.getDialogType(npc, 'greeting');
        const dialog = this.getDialog(dialogType);
        
        player.outputChatBox(`${npc.name}: ${dialog}`);
        
        // Dialog-UI anzeigen
        player.call('ui:show', 'NPCDialog', { 
            npcId: npc.id, 
            npcName: npc.name, 
            dialogType: dialogType,
            availableInteractions: npc.interactions
        });
        
        // Dialog-Status aktualisieren
        npc.conversationState = 'talking';
        npc.currentDialog = dialogType;
        npc.dialogHistory.push({
            type: dialogType,
            dialog: dialog,
            timestamp: Date.now()
        });
    },
    
    // Dialog-Typ bestimmen
    getDialogType(npc, interaction) {
        // Hier würde die Logik für die Dialog-Typ-Bestimmung implementiert werden
        return interaction;
    },
    
    // Dialog abrufen
    getDialog(dialogType) {
        const dialogs = this.dialogs[dialogType];
        if (!dialogs || dialogs.length === 0) {
            return "Ich habe nichts zu sagen.";
        }
        
        return dialogs[Math.floor(Math.random() * dialogs.length)];
    },
    
    // Mit NPC handeln
    tradeWithNPC(player, npc) {
        if (npc.type === 'vendor' || npc.type === 'merchant') {
            player.call('ui:show', 'Trade', { 
                npcId: npc.id, 
                npcName: npc.name,
                npcInventory: npc.inventory,
                npcMoney: npc.money
            });
        } else {
            player.outputChatBox(`${npc.name}: Ich handele nicht!`);
        }
    },
    
    // Von NPC kaufen
    buyFromNPC(player, npc) {
        if (npc.type === 'vendor' || npc.type === 'merchant') {
            player.call('ui:show', 'Buy', { 
                npcId: npc.id, 
                npcName: npc.name,
                npcInventory: npc.inventory
            });
        } else {
            player.outputChatBox(`${npc.name}: Ich verkaufe nichts!`);
        }
    },
    
    // An NPC verkaufen
    sellToNPC(player, npc) {
        if (npc.type === 'vendor' || npc.type === 'merchant') {
            player.call('ui:show', 'Sell', { 
                npcId: npc.id, 
                npcName: npc.name,
                npcMoney: npc.money
            });
        } else {
            player.outputChatBox(`${npc.name}: Ich kaufe nichts!`);
        }
    },
    
    // Quest mit NPC
    questWithNPC(player, npc) {
        if (npc.type === 'quest_giver') {
            player.call('ui:show', 'Quest', { 
                npcId: npc.id, 
                npcName: npc.name,
                availableQuests: npc.quests
            });
        } else {
            player.outputChatBox(`${npc.name}: Ich habe keine Quests für dich!`);
        }
    },
    
    // Belohnung von NPC
    rewardFromNPC(player, npc) {
        if (npc.type === 'quest_giver') {
            player.outputChatBox(`${npc.name}: Hier ist deine Belohnung!`);
            // Hier würde die Belohnungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich habe keine Belohnung für dich!`);
        }
    },
    
    // NPC befragen
    questionNPC(player, npc) {
        const dialogType = this.getDialogType(npc, 'information');
        const dialog = this.getDialog(dialogType);
        
        player.outputChatBox(`${npc.name}: ${dialog}`);
    },
    
    // NPC verhaften
    arrestNPC(player, npc) {
        if (npc.type === 'guard') {
            player.outputChatBox(`${npc.name}: Ich kann dir nicht helfen, ich bin selbst Wächter!`);
        } else {
            player.outputChatBox(`${npc.name}: Du hast mich verhaftet!`);
            // Hier würde die Verhaftungs-Logik implementiert werden
        }
    },
    
    // Mit NPC verhandeln
    negotiateWithNPC(player, npc) {
        if (npc.type === 'merchant') {
            player.outputChatBox(`${npc.name}: Lass uns verhandeln!`);
            // Hier würde die Verhandlungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich verhandle nicht!`);
        }
    },
    
    // Mit NPC tratschen
    gossipWithNPC(player, npc) {
        const dialogType = this.getDialogType(npc, 'gossip');
        const dialog = this.getDialog(dialogType);
        
        player.outputChatBox(`${npc.name}: ${dialog}`);
    },
    
    // NPC helfen
    helpNPC(player, npc) {
        player.outputChatBox(`${npc.name}: Danke für deine Hilfe!`);
        // Hier würde die Hilfe-Logik implementiert werden
    },
    
    // Service von NPC
    serviceFromNPC(player, npc) {
        if (npc.type === 'official' || npc.type === 'receptionist') {
            player.call('ui:show', 'Service', { 
                npcId: npc.id, 
                npcName: npc.name,
                availableServices: this.getAvailableServices(npc)
            });
        } else {
            player.outputChatBox(`${npc.name}: Ich biete keine Services an!`);
        }
    },
    
    // Verfügbare Services abrufen
    getAvailableServices(npc) {
        const services = {
            official: ['Dokumente', 'Lizenzen', 'Informationen'],
            receptionist: ['Termine', 'Informationen', 'Hilfe'],
            banker: ['Konto', 'Kredit', 'Investment'],
            healer: ['Heilung', 'Medizin', 'Behandlung'],
            trainer: ['Training', 'Unterricht', 'Fähigkeiten'],
            blacksmith: ['Handwerk', 'Reparatur', 'Waffen'],
            guide: ['Führung', 'Informationen', 'Tipps']
        };
        
        return services[npc.type] || [];
    },
    
    // Dokument von NPC
    documentFromNPC(player, npc) {
        if (npc.type === 'official') {
            player.outputChatBox(`${npc.name}: Hier sind deine Dokumente!`);
            // Hier würde die Dokumenten-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich kann keine Dokumente ausstellen!`);
        }
    },
    
    // Mit NPC auftreten
    performWithNPC(player, npc) {
        if (npc.type === 'entertainer') {
            player.outputChatBox(`${npc.name}: Lass uns zusammen auftreten!`);
            // Hier würde die Auftritts-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Unterhalter!`);
        }
    },
    
    // Mit NPC unterhalten
    entertainWithNPC(player, npc) {
        if (npc.type === 'entertainer') {
            player.outputChatBox(`${npc.name}: Ich unterhalte dich gerne!`);
            // Hier würde die Unterhaltungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Unterhalter!`);
        }
    },
    
    // Mit NPC arbeiten
    workWithNPC(player, npc) {
        if (npc.type === 'worker') {
            player.outputChatBox(`${npc.name}: Lass uns zusammen arbeiten!`);
            // Hier würde die Arbeits-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Arbeiter!`);
        }
    },
    
    // Mit NPC führen
    guideWithNPC(player, npc) {
        if (npc.type === 'guide') {
            player.outputChatBox(`${npc.name}: Ich führe dich gerne!`);
            // Hier würde die Führungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Führer!`);
        }
    },
    
    // Information von NPC
    informationFromNPC(player, npc) {
        const dialogType = this.getDialogType(npc, 'information');
        const dialog = this.getDialog(dialogType);
        
        player.outputChatBox(`${npc.name}: ${dialog}`);
    },
    
    // Mit NPC trainieren
    trainWithNPC(player, npc) {
        if (npc.type === 'trainer') {
            player.outputChatBox(`${npc.name}: Lass uns trainieren!`);
            // Hier würde die Trainings-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Trainer!`);
        }
    },
    
    // Von NPC lernen
    teachWithNPC(player, npc) {
        if (npc.type === 'trainer') {
            player.outputChatBox(`${npc.name}: Ich bringe dir gerne etwas bei!`);
            // Hier würde die Lehr-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Trainer!`);
        }
    },
    
    // Mit NPC heilen
    healWithNPC(player, npc) {
        if (npc.type === 'healer') {
            player.outputChatBox(`${npc.name}: Ich heile dich gerne!`);
            // Hier würde die Heilungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Heiler!`);
        }
    },
    
    // Von NPC heilen lassen
    cureWithNPC(player, npc) {
        if (npc.type === 'healer') {
            player.outputChatBox(`${npc.name}: Ich heile dich!`);
            // Hier würde die Heilungs-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Heiler!`);
        }
    },
    
    // Mit NPC handwerken
    craftWithNPC(player, npc) {
        if (npc.type === 'blacksmith') {
            player.outputChatBox(`${npc.name}: Lass uns handwerken!`);
            // Hier würde die Handwerks-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Schmied!`);
        }
    },
    
    // Bei NPC reparieren lassen
    repairWithNPC(player, npc) {
        if (npc.type === 'blacksmith') {
            player.outputChatBox(`${npc.name}: Ich repariere das gerne!`);
            // Hier würde die Reparatur-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Schmied!`);
        }
    },
    
    // Banking mit NPC
    bankingWithNPC(player, npc) {
        if (npc.type === 'banker') {
            player.call('ui:show', 'Banking', { 
                npcId: npc.id, 
                npcName: npc.name
            });
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Banker!`);
        }
    },
    
    // Kredit von NPC
    loanFromNPC(player, npc) {
        if (npc.type === 'banker') {
            player.outputChatBox(`${npc.name}: Lass uns über einen Kredit sprechen!`);
            // Hier würde die Kredit-Logik implementiert werden
        } else {
            player.outputChatBox(`${npc.name}: Ich bin kein Banker!`);
        }
    },
    
    // NPC-Statistiken
    getStatistics() {
        return {
            totalNPCs: this.activeNPCs.size,
            npcTypes: Object.keys(this.npcConfig).length,
            dialogTypes: Object.keys(this.dialogs).length,
            activeConversations: Array.from(this.activeNPCs.values()).filter(npc => npc.conversationState === 'talking').length
        };
    }
};

// Events
mp.events.add('npc:interact', (player, npcId, interaction) => {
    npcSystem.interactWithNPC(player, npcId, interaction);
});

mp.events.add('npc:getNPCs', (player) => {
    const npcs = Array.from(npcSystem.activeNPCs.values());
    player.call('npc:updateNPCs', [npcs]);
});

// Commands
mp.events.addCommand('npc', (player, fullText, action, npcId, interaction) => {
    if (!action) {
        const npcs = Array.from(npcSystem.activeNPCs.values());
        player.outputChatBox('Verwendung: /npc [interact] [NPCID] [Interaktion]');
        player.outputChatBox('Verfügbare NPCs:');
        npcs.forEach(npc => {
            player.outputChatBox(`- ${npc.id}: ${npc.name} (${npc.type})`);
        });
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'interact':
            if (npcId && interaction) {
                npcSystem.interactWithNPC(player, npcId, interaction);
            } else {
                player.outputChatBox('NPC ID und Interaktion erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('npcs', (player) => {
    const stats = npcSystem.getStatistics();
    player.outputChatBox('=== NPC Statistiken ===');
    player.outputChatBox(`Gesamt NPCs: ${stats.totalNPCs}`);
    player.outputChatBox(`NPC-Typen: ${stats.npcTypes}`);
    player.outputChatBox(`Dialog-Typen: ${stats.dialogTypes}`);
    player.outputChatBox(`Aktive Gespräche: ${stats.activeConversations}`);
});

// NPC-System initialisieren
npcSystem.init();

module.exports = npcSystem;
