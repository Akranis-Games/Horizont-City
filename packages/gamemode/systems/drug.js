// Drug System - Drogen-System mit Verarbeitung und Handel
// Behandelt alle Drogen-Funktionen für Horizont-City Roleplay

const drugSystem = {
    // Drogen-Typen
    drugTypes: {
        STIMULANTS: 'stimulants',
        DEPRESSANTS: 'depressants',
        HALLUCINOGENS: 'hallucinogens',
        OPIOIDS: 'opioids',
        CANNABINOIDS: 'cannabinoids',
        SYNTHETIC: 'synthetic',
        PRESCRIPTION: 'prescription',
        ILLEGAL: 'illegal',
        MEDICAL: 'medical',
        RECREATIONAL: 'recreational'
    },
    
    // Spezifische Drogen
    specificDrugs: {
        // Stimulanzien
        COCAINE: 'cocaine',
        METHAMPHETAMINE: 'methamphetamine',
        AMPHETAMINE: 'amphetamine',
        MDMA: 'mdma',
        ADDERALL: 'adderall',
        RITALIN: 'ritalin',
        CAFFEINE: 'caffeine',
        NICOTINE: 'nicotine',
        
        // Depressiva
        HEROIN: 'heroin',
        MORPHINE: 'morphine',
        FENTANYL: 'fentanyl',
        OXYCODONE: 'oxycodone',
        XANAX: 'xanax',
        VALIUM: 'valium',
        ALCOHOL: 'alcohol',
        GHB: 'ghb',
        
        // Halluzinogene
        LSD: 'lsd',
        PSILOCYBIN: 'psilocybin',
        DMT: 'dmt',
        KETAMINE: 'ketamine',
        PCP: 'pcp',
        MESCALINE: 'mescaline',
        AYAHUASCA: 'ayahuasca',
        
        // Cannabinoide
        MARIJUANA: 'marijuana',
        HASH: 'hash',
        THC_OIL: 'thc_oil',
        CBD_OIL: 'cbd_oil',
        EDIBLES: 'edibles',
        CONCENTRATES: 'concentrates',
        
        // Synthetische Drogen
        BATH_SALTS: 'bath_salts',
        SPICE: 'spice',
        K2: 'k2',
        SYNTHETIC_CANNABINOIDS: 'synthetic_cannabinoids',
        RESEARCH_CHEMICALS: 'research_chemicals',
        
        // Verschreibungspflichtige Medikamente
        OPIATES: 'opiates',
        BENZODIAZEPINES: 'benzodiazepines',
        STIMULANTS: 'stimulants',
        ANTIDEPRESSANTS: 'antidepressants',
        PAINKILLERS: 'painkillers'
    },
    
    // Drogen-Konfiguration
    drugConfig: {
        cocaine: {
            name: 'Kokain',
            type: 'stimulants',
            category: 'illegal',
            effects: ['euphoria', 'energy', 'confidence', 'alertness'],
            sideEffects: ['anxiety', 'paranoia', 'addiction', 'heart_problems'],
            duration: 3600, // 1 Stunde
            intensity: 8,
            addiction: 9,
            danger: 8,
            legal: false,
            price: 500,
            purity: 80,
            processing: ['cutting', 'packaging'],
            ingredients: ['coca_leaf', 'chemicals'],
            productionTime: 7200, // 2 Stunden
            skill: 'chemistry',
            equipment: ['lab', 'scales', 'cutting_tools']
        },
        marijuana: {
            name: 'Marihuana',
            type: 'cannabinoids',
            category: 'recreational',
            effects: ['relaxation', 'euphoria', 'creativity', 'appetite'],
            sideEffects: ['dry_mouth', 'red_eyes', 'memory_issues', 'anxiety'],
            duration: 7200, // 2 Stunden
            intensity: 6,
            addiction: 3,
            danger: 2,
            legal: true,
            price: 50,
            purity: 90,
            processing: ['drying', 'trimming', 'curing'],
            ingredients: ['cannabis_plant'],
            productionTime: 86400, // 24 Stunden
            skill: 'gardening',
            equipment: ['grow_room', 'drying_rack', 'trimming_tools']
        },
        heroin: {
            name: 'Heroin',
            type: 'opioids',
            category: 'illegal',
            effects: ['euphoria', 'pain_relief', 'relaxation', 'numbness'],
            sideEffects: ['addiction', 'overdose', 'respiratory_depression', 'withdrawal'],
            duration: 10800, // 3 Stunden
            intensity: 9,
            addiction: 10,
            danger: 10,
            legal: false,
            price: 800,
            purity: 70,
            processing: ['refining', 'packaging'],
            ingredients: ['opium', 'chemicals'],
            productionTime: 14400, // 4 Stunden
            skill: 'chemistry',
            equipment: ['lab', 'refining_tools', 'scales']
        },
        lsd: {
            name: 'LSD',
            type: 'hallucinogens',
            category: 'illegal',
            effects: ['hallucinations', 'euphoria', 'spiritual_experience', 'creativity'],
            sideEffects: ['bad_trip', 'anxiety', 'flashbacks', 'psychosis'],
            duration: 43200, // 12 Stunden
            intensity: 9,
            addiction: 1,
            danger: 6,
            legal: false,
            price: 200,
            purity: 95,
            processing: ['synthesis', 'blotting'],
            ingredients: ['ergot', 'chemicals'],
            productionTime: 28800, // 8 Stunden
            skill: 'chemistry',
            equipment: ['lab', 'synthesis_tools', 'blotter_paper']
        },
        mdma: {
            name: 'MDMA',
            type: 'stimulants',
            category: 'illegal',
            effects: ['euphoria', 'empathy', 'energy', 'sensory_enhancement'],
            sideEffects: ['depression', 'anxiety', 'memory_issues', 'overheating'],
            duration: 14400, // 4 Stunden
            intensity: 8,
            addiction: 6,
            danger: 7,
            legal: false,
            price: 300,
            purity: 85,
            processing: ['synthesis', 'pressing'],
            ingredients: ['safrole', 'chemicals'],
            productionTime: 21600, // 6 Stunden
            skill: 'chemistry',
            equipment: ['lab', 'synthesis_tools', 'pill_press']
        },
        methamphetamine: {
            name: 'Methamphetamin',
            type: 'stimulants',
            category: 'illegal',
            effects: ['euphoria', 'energy', 'alertness', 'confidence'],
            sideEffects: ['addiction', 'psychosis', 'dental_problems', 'weight_loss'],
            duration: 28800, // 8 Stunden
            intensity: 9,
            addiction: 10,
            danger: 9,
            legal: false,
            price: 400,
            purity: 75,
            processing: ['cooking', 'crystallization'],
            ingredients: ['pseudoephedrine', 'chemicals'],
            productionTime: 18000, // 5 Stunden
            skill: 'chemistry',
            equipment: ['lab', 'cooking_tools', 'crystallization_kit']
        },
        oxycodone: {
            name: 'Oxycodon',
            type: 'opioids',
            category: 'prescription',
            effects: ['pain_relief', 'euphoria', 'relaxation', 'numbness'],
            sideEffects: ['addiction', 'constipation', 'respiratory_depression', 'withdrawal'],
            duration: 14400, // 4 Stunden
            intensity: 7,
            addiction: 8,
            danger: 7,
            legal: true,
            price: 100,
            purity: 95,
            processing: ['pharmaceutical'],
            ingredients: ['thebaine', 'chemicals'],
            productionTime: 3600, // 1 Stunde
            skill: 'pharmacy',
            equipment: ['pharmacy', 'pill_maker', 'scales']
        },
        xanax: {
            name: 'Xanax',
            type: 'depressants',
            category: 'prescription',
            effects: ['anxiety_relief', 'relaxation', 'sleep', 'calmness'],
            sideEffects: ['addiction', 'memory_issues', 'withdrawal', 'drowsiness'],
            duration: 10800, // 3 Stunden
            intensity: 6,
            addiction: 7,
            danger: 5,
            legal: true,
            price: 80,
            purity: 98,
            processing: ['pharmaceutical'],
            ingredients: ['alprazolam', 'fillers'],
            productionTime: 1800, // 30 Minuten
            skill: 'pharmacy',
            equipment: ['pharmacy', 'pill_maker', 'scales']
        },
        lsd: {
            name: 'LSD',
            type: 'hallucinogens',
            category: 'illegal',
            effects: ['hallucinations', 'euphoria', 'spiritual_experience', 'creativity'],
            sideEffects: ['bad_trip', 'anxiety', 'flashbacks', 'psychosis'],
            duration: 43200, // 12 Stunden
            intensity: 9,
            addiction: 1,
            danger: 6,
            legal: false,
            price: 200,
            purity: 95,
            processing: ['synthesis', 'blotting'],
            ingredients: ['ergot', 'chemicals'],
            productionTime: 28800, // 8 Stunden
            skill: 'chemistry',
            equipment: ['lab', 'synthesis_tools', 'blotter_paper']
        }
    },
    
    // Verarbeitungs-Typen
    processingTypes: {
        SYNTHESIS: 'synthesis',
        EXTRACTION: 'extraction',
        REFINING: 'refining',
        CUTTING: 'cutting',
        PACKAGING: 'packaging',
        PRESSING: 'pressing',
        BLOTTING: 'blotting',
        CRYSTALLIZATION: 'crystallization',
        FERMENTATION: 'fermentation',
        DISTILLATION: 'distillation'
    },
    
    // Verarbeitungs-Rezepte
    processingRecipes: {
        // Kokain-Verarbeitung
        'cocaine_powder': {
            name: 'Kokain-Pulver',
            ingredients: [{ drug: 'coca_leaf', amount: 10 }],
            processingTime: 7200, // 2 Stunden
            result: { drug: 'cocaine', amount: 1 },
            skill: 'chemistry',
            equipment: 'lab',
            cost: 200,
            purity: 80
        },
        'cocaine_cut': {
            name: 'Geschnittenes Kokain',
            ingredients: [{ drug: 'cocaine', amount: 1 }, { item: 'cutting_agent', amount: 1 }],
            processingTime: 1800, // 30 Minuten
            result: { drug: 'cocaine_cut', amount: 2 },
            skill: 'chemistry',
            equipment: 'cutting_tools',
            cost: 50,
            purity: 60
        },
        
        // Marihuana-Verarbeitung
        'marijuana_dried': {
            name: 'Getrocknetes Marihuana',
            ingredients: [{ drug: 'cannabis_plant', amount: 1 }],
            processingTime: 86400, // 24 Stunden
            result: { drug: 'marijuana', amount: 1 },
            skill: 'gardening',
            equipment: 'drying_room',
            cost: 20,
            purity: 90
        },
        'hash': {
            name: 'Haschisch',
            ingredients: [{ drug: 'marijuana', amount: 5 }],
            processingTime: 14400, // 4 Stunden
            result: { drug: 'hash', amount: 1 },
            skill: 'gardening',
            equipment: 'pressing_tools',
            cost: 100,
            purity: 85
        },
        'thc_oil': {
            name: 'THC-Öl',
            ingredients: [{ drug: 'marijuana', amount: 10 }],
            processingTime: 21600, // 6 Stunden
            result: { drug: 'thc_oil', amount: 1 },
            skill: 'chemistry',
            equipment: 'extraction_lab',
            cost: 200,
            purity: 95
        },
        
        // Heroin-Verarbeitung
        'heroin_refined': {
            name: 'Raffiniertes Heroin',
            ingredients: [{ drug: 'opium', amount: 5 }],
            processingTime: 14400, // 4 Stunden
            result: { drug: 'heroin', amount: 1 },
            skill: 'chemistry',
            equipment: 'refining_lab',
            cost: 300,
            purity: 70
        },
        
        // LSD-Verarbeitung
        'lsd_synthesis': {
            name: 'LSD-Synthese',
            ingredients: [{ drug: 'ergot', amount: 1 }],
            processingTime: 28800, // 8 Stunden
            result: { drug: 'lsd', amount: 1 },
            skill: 'chemistry',
            equipment: 'synthesis_lab',
            cost: 500,
            purity: 95
        },
        'lsd_blotter': {
            name: 'LSD-Blotter',
            ingredients: [{ drug: 'lsd', amount: 1 }],
            processingTime: 3600, // 1 Stunde
            result: { drug: 'lsd_blotter', amount: 100 },
            skill: 'chemistry',
            equipment: 'blotting_tools',
            cost: 100,
            purity: 95
        },
        
        // MDMA-Verarbeitung
        'mdma_synthesis': {
            name: 'MDMA-Synthese',
            ingredients: [{ drug: 'safrole', amount: 2 }],
            processingTime: 21600, // 6 Stunden
            result: { drug: 'mdma', amount: 1 },
            skill: 'chemistry',
            equipment: 'synthesis_lab',
            cost: 400,
            purity: 85
        },
        'mdma_pills': {
            name: 'MDMA-Pillen',
            ingredients: [{ drug: 'mdma', amount: 1 }],
            processingTime: 1800, // 30 Minuten
            result: { drug: 'mdma_pills', amount: 10 },
            skill: 'chemistry',
            equipment: 'pill_press',
            cost: 50,
            purity: 85
        },
        
        // Methamphetamin-Verarbeitung
        'meth_cooking': {
            name: 'Meth-Kochen',
            ingredients: [{ drug: 'pseudoephedrine', amount: 3 }],
            processingTime: 18000, // 5 Stunden
            result: { drug: 'methamphetamine', amount: 1 },
            skill: 'chemistry',
            equipment: 'cooking_lab',
            cost: 300,
            purity: 75
        },
        'meth_crystals': {
            name: 'Meth-Kristalle',
            ingredients: [{ drug: 'methamphetamine', amount: 1 }],
            processingTime: 3600, // 1 Stunde
            result: { drug: 'meth_crystals', amount: 1 },
            skill: 'chemistry',
            equipment: 'crystallization_kit',
            cost: 100,
            purity: 80
        }
    },
    
    // Aktive Drogen
    activeDrugs: new Map(),
    
    // Verarbeitungs-Anlagen
    processingLabs: new Map(),
    
    // Drogen-Händler
    drugDealers: new Map(),
    
    // Drogen-Märkte
    drugMarkets: new Map(),
    
    // Drogen-System-Initialisierung
    init() {
        console.log('[DRUG] Drogen-System initialisiert');
        this.createDefaultLabs();
        this.createDefaultDealers();
        this.createDefaultMarkets();
    },
    
    // Standard-Labore erstellen
    createDefaultLabs() {
        const labs = [
            {
                id: 'lab_1',
                name: 'Chemie-Labor',
                type: 'synthesis',
                location: { x: 1000, y: 2000, z: 30 },
                equipment: ['lab', 'synthesis_tools', 'scales'],
                status: 'active',
                owner: null,
                security: 'high',
                created: Date.now()
            },
            {
                id: 'lab_2',
                name: 'Extraktions-Labor',
                type: 'extraction',
                location: { x: 1500, y: 2500, z: 30 },
                equipment: ['extraction_lab', 'distiller', 'filters'],
                status: 'active',
                owner: null,
                security: 'medium',
                created: Date.now()
            },
            {
                id: 'lab_3',
                name: 'Grow-Room',
                type: 'cultivation',
                location: { x: 2000, y: 3000, z: 30 },
                equipment: ['grow_lights', 'ventilation', 'hydroponics'],
                status: 'active',
                owner: null,
                security: 'low',
                created: Date.now()
            }
        ];
        
        labs.forEach(lab => {
            this.createLab(lab);
        });
        
        console.log(`[DRUG] ${labs.length} Labore erstellt`);
    },
    
    // Labor erstellen
    createLab(labData) {
        const lab = {
            id: labData.id,
            name: labData.name,
            type: labData.type,
            location: labData.location,
            equipment: [...labData.equipment],
            status: labData.status,
            owner: labData.owner,
            security: labData.security,
            created: labData.created,
            production: [],
            workers: [],
            income: 0,
            expenses: 0
        };
        
        this.processingLabs.set(labData.id, lab);
        
        console.log(`[DRUG] Labor ${labData.name} erstellt`);
        return true;
    },
    
    // Standard-Händler erstellen
    createDefaultDealers() {
        const dealers = [
            {
                id: 'dealer_1',
                name: 'Street Dealer',
                location: { x: 100, y: 200, z: 30 },
                drugs: ['marijuana', 'cocaine', 'heroin'],
                reputation: 50,
                status: 'active',
                created: Date.now()
            },
            {
                id: 'dealer_2',
                name: 'Club Dealer',
                location: { x: 500, y: 600, z: 30 },
                drugs: ['mdma', 'cocaine', 'lsd'],
                reputation: 70,
                status: 'active',
                created: Date.now()
            },
            {
                id: 'dealer_3',
                name: 'Pharmacy',
                location: { x: 1000, y: 1200, z: 30 },
                drugs: ['oxycodone', 'xanax', 'adderall'],
                reputation: 90,
                status: 'active',
                created: Date.now()
            }
        ];
        
        dealers.forEach(dealer => {
            this.createDealer(dealer);
        });
        
        console.log(`[DRUG] ${dealers.length} Händler erstellt`);
    },
    
    // Händler erstellen
    createDealer(dealerData) {
        const dealer = {
            id: dealerData.id,
            name: dealerData.name,
            location: dealerData.location,
            drugs: [...dealerData.drugs],
            reputation: dealerData.reputation,
            status: dealerData.status,
            created: dealerData.created,
            inventory: new Map(),
            prices: new Map(),
            customers: [],
            sales: 0,
            profit: 0
        };
        
        this.drugDealers.set(dealerData.id, dealer);
        
        console.log(`[DRUG] Händler ${dealerData.name} erstellt`);
        return true;
    },
    
    // Standard-Märkte erstellen
    createDefaultMarkets() {
        const markets = [
            {
                id: 'market_1',
                name: 'Street Market',
                location: { x: 200, y: 300, z: 30 },
                type: 'illegal',
                drugs: ['marijuana', 'cocaine', 'heroin', 'mdma'],
                security: 'low',
                status: 'active',
                created: Date.now()
            },
            {
                id: 'market_2',
                name: 'Club Market',
                location: { x: 600, y: 700, z: 30 },
                type: 'recreational',
                drugs: ['mdma', 'cocaine', 'lsd', 'marijuana'],
                security: 'medium',
                status: 'active',
                created: Date.now()
            },
            {
                id: 'market_3',
                name: 'Pharmacy Market',
                location: { x: 1100, y: 1300, z: 30 },
                type: 'legal',
                drugs: ['oxycodone', 'xanax', 'adderall', 'ritalin'],
                security: 'high',
                status: 'active',
                created: Date.now()
            }
        ];
        
        markets.forEach(market => {
            this.createMarket(market);
        });
        
        console.log(`[DRUG] ${markets.length} Märkte erstellt`);
    },
    
    // Markt erstellen
    createMarket(marketData) {
        const market = {
            id: marketData.id,
            name: marketData.name,
            location: marketData.location,
            type: marketData.type,
            drugs: [...marketData.drugs],
            security: marketData.security,
            status: marketData.status,
            created: marketData.created,
            vendors: [],
            prices: new Map(),
            transactions: [],
            volume: 0,
            profit: 0
        };
        
        this.drugMarkets.set(marketData.id, market);
        
        console.log(`[DRUG] Markt ${marketData.name} erstellt`);
        return true;
    },
    
    // Droge konsumieren
    consumeDrug(player, drugType, amount = 1) {
        const drugConfig = this.drugConfig[drugType];
        if (!drugConfig) {
            player.outputChatBox('Unbekannte Droge!');
            return false;
        }
        
        // Drogen-Effekte anwenden
        const effects = drugConfig.effects;
        const sideEffects = drugConfig.sideEffects;
        const duration = drugConfig.duration;
        const intensity = drugConfig.intensity;
        
        // Spieler über Effekte informieren
        player.outputChatBox(`${drugConfig.name} konsumiert! Effekte: ${effects.join(', ')}`);
        
        // Drogen-Status setzen
        player.drugStatus = {
            drug: drugType,
            effects: effects,
            sideEffects: sideEffects,
            duration: duration,
            intensity: intensity,
            startTime: Date.now(),
            endTime: Date.now() + duration
        };
        
        // Drogen-UI anzeigen
        player.call('ui:show', 'DrugEffects', { 
            drug: drugConfig,
            effects: effects,
            duration: duration
        });
        
        console.log(`[DRUG] ${drugConfig.name} von Spieler ${player.id} konsumiert`);
        return true;
    },
    
    // Droge verarbeiten
    processDrug(player, drugType, recipeName) {
        const recipe = this.processingRecipes[recipeName];
        if (!recipe) {
            player.outputChatBox('Rezept nicht gefunden!');
            return false;
        }
        
        // Zutaten prüfen
        for (const ingredient of recipe.ingredients) {
            if (ingredient.drug) {
                const drugConfig = this.drugConfig[ingredient.drug];
                if (!drugConfig) {
                    player.outputChatBox(`Zutat ${ingredient.drug} nicht gefunden!`);
                    return false;
                }
            }
        }
        
        // Verarbeitung starten
        const processingId = `processing_${Date.now()}`;
        const processing = {
            id: processingId,
            playerId: player.id,
            recipe: recipe,
            startTime: Date.now(),
            endTime: Date.now() + recipe.processingTime,
            status: 'processing'
        };
        
        // Timer für Verarbeitung
        setTimeout(() => {
            this.completeProcessing(player, processingId);
        }, recipe.processingTime);
        
        player.outputChatBox(`${recipe.name} wird verarbeitet... Dauer: ${recipe.processingTime / 60} Minuten`);
        console.log(`[DRUG] ${recipe.name} von Spieler ${player.id} gestartet`);
        return processingId;
    },
    
    // Verarbeitung abschließen
    completeProcessing(player, processingId) {
        const processing = this.processingFacilities.get(processingId);
        if (!processing) {
            return;
        }
        
        const recipe = processing.recipe;
        const result = recipe.result;
        
        // Ergebnis geben
        player.money += result.amount * 50; // Vereinfacht für Demo
        
        player.outputChatBox(`${recipe.name} fertig! ${result.amount}x ${result.drug} erhalten`);
        console.log(`[DRUG] ${recipe.name} von Spieler ${player.id} abgeschlossen`);
        
        // Verarbeitung entfernen
        this.processingFacilities.delete(processingId);
    },
    
    // Droge verkaufen
    sellDrug(player, drugType, amount, price) {
        const drugConfig = this.drugConfig[drugType];
        if (!drugConfig) {
            player.outputChatBox('Unbekannte Droge!');
            return false;
        }
        
        const totalValue = amount * price;
        if (player.money < totalValue) {
            player.outputChatBox('Nicht genug Geld!');
            return false;
        }
        
        // Verkauf durchführen
        player.money -= totalValue;
        
        player.outputChatBox(`${amount}x ${drugConfig.name} für $${totalValue} gekauft!`);
        console.log(`[DRUG] ${amount}x ${drugConfig.name} von Spieler ${player.id} gekauft`);
        return true;
    },
    
    // Drogen-Statistiken
    getStatistics() {
        return {
            totalDrugs: Object.keys(this.drugConfig).length,
            totalLabs: this.processingLabs.size,
            totalDealers: this.drugDealers.size,
            totalMarkets: this.drugMarkets.size,
            totalRecipes: Object.keys(this.processingRecipes).length,
            drugTypes: Object.keys(this.drugTypes).length
        };
    }
};

// Events
mp.events.add('drug:consume', (player, drugType, amount) => {
    drugSystem.consumeDrug(player, drugType, amount);
});

mp.events.add('drug:process', (player, drugType, recipeName) => {
    drugSystem.processDrug(player, drugType, recipeName);
});

mp.events.add('drug:sell', (player, drugType, amount, price) => {
    drugSystem.sellDrug(player, drugType, amount, price);
});

// Commands
mp.events.addCommand('drug', (player, fullText, action, drugType, amount) => {
    if (!action) {
        player.outputChatBox('Verwendung: /drug [consume|process|sell] [Droge] [Menge]');
        player.outputChatBox('Verfügbare Drogen: cocaine, marijuana, heroin, lsd, mdma, methamphetamine');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'consume':
            if (drugType) {
                drugSystem.consumeDrug(player, drugType, parseInt(amount) || 1);
            } else {
                player.outputChatBox('Drogen-Typ erforderlich!');
            }
            break;
            
        case 'process':
            if (drugType && amount) {
                drugSystem.processDrug(player, drugType, amount);
            } else {
                player.outputChatBox('Drogen-Typ und Rezept erforderlich!');
            }
            break;
            
        case 'sell':
            if (drugType && amount) {
                const price = parseInt(amount) * 100; // Vereinfacht für Demo
                drugSystem.sellDrug(player, drugType, parseInt(amount), price);
            } else {
                player.outputChatBox('Drogen-Typ und Menge erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('drugstats', (player) => {
    const stats = drugSystem.getStatistics();
    player.outputChatBox('=== Drogen-Statistiken ===');
    player.outputChatBox(`Gesamt Drogen: ${stats.totalDrugs}`);
    player.outputChatBox(`Gesamt Labore: ${stats.totalLabs}`);
    player.outputChatBox(`Gesamt Händler: ${stats.totalDealers}`);
    player.outputChatBox(`Gesamt Märkte: ${stats.totalMarkets}`);
    player.outputChatBox(`Gesamt Rezepte: ${stats.totalRecipes}`);
    player.outputChatBox(`Drogen-Typen: ${stats.drugTypes}`);
});

// Drogen-System initialisieren
drugSystem.init();

module.exports = drugSystem;
