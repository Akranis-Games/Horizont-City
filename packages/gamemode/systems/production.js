// Production System - Produktions-System mit Herstellung und Verarbeitung
// Behandelt alle Produktions-Funktionen für Horizont-City Roleplay

const productionSystem = {
    // Produktions-Typen
    productionTypes: {
        CRAFTING: 'crafting',
        SMELTING: 'smelting',
        REFINING: 'refining',
        ASSEMBLY: 'assembly',
        PROCESSING: 'processing',
        MANUFACTURING: 'manufacturing',
        COOKING: 'cooking',
        BREWING: 'brewing',
        DISTILLING: 'distilling',
        WEAVING: 'weaving',
        CARVING: 'carving',
        FORGING: 'forging',
        MOLDING: 'molding',
        CUTTING: 'cutting',
        POLISHING: 'polishing',
        ENGRAVING: 'engraving',
        PAINTING: 'painting',
        COATING: 'coating',
        TREATING: 'treating',
        PACKAGING: 'packaging'
    },
    
    // Produktions-Rezepte
    recipes: {
        // Metallverarbeitung
        iron_bar: {
            name: 'Eisenbarren',
            type: 'smelting',
            inputs: [{ type: 'iron_ore', quantity: 2 }, { type: 'coal', quantity: 1 }],
            output: { type: 'iron_bar', quantity: 1 },
            time: 30000,
            skill: 'metallurgy',
            level: 1
        },
        steel_bar: {
            name: 'Stahlbarren',
            type: 'smelting',
            inputs: [{ type: 'iron_bar', quantity: 1 }, { type: 'coal', quantity: 2 }],
            output: { type: 'steel_bar', quantity: 1 },
            time: 45000,
            skill: 'metallurgy',
            level: 2
        },
        copper_bar: {
            name: 'Kupferbarren',
            type: 'smelting',
            inputs: [{ type: 'copper_ore', quantity: 2 }, { type: 'coal', quantity: 1 }],
            output: { type: 'copper_bar', quantity: 1 },
            time: 25000,
            skill: 'metallurgy',
            level: 1
        },
        gold_bar: {
            name: 'Goldbarren',
            type: 'smelting',
            inputs: [{ type: 'gold_ore', quantity: 3 }, { type: 'coal', quantity: 2 }],
            output: { type: 'gold_bar', quantity: 1 },
            time: 60000,
            skill: 'metallurgy',
            level: 3
        },
        silver_bar: {
            name: 'Silberbarren',
            type: 'smelting',
            inputs: [{ type: 'silver_ore', quantity: 3 }, { type: 'coal', quantity: 2 }],
            output: { type: 'silver_bar', quantity: 1 },
            time: 50000,
            skill: 'metallurgy',
            level: 3
        },
        
        // Werkzeuge
        iron_pickaxe: {
            name: 'Eisenspitzhacke',
            type: 'crafting',
            inputs: [{ type: 'iron_bar', quantity: 2 }, { type: 'wood', quantity: 1 }],
            output: { type: 'iron_pickaxe', quantity: 1 },
            time: 20000,
            skill: 'crafting',
            level: 2
        },
        steel_sword: {
            name: 'Stahlschwert',
            type: 'forging',
            inputs: [{ type: 'steel_bar', quantity: 3 }, { type: 'leather', quantity: 1 }],
            output: { type: 'steel_sword', quantity: 1 },
            time: 40000,
            skill: 'weaponsmithing',
            level: 3
        },
        
        // Textilien
        cloth: {
            name: 'Stoff',
            type: 'weaving',
            inputs: [{ type: 'cotton', quantity: 3 }],
            output: { type: 'cloth', quantity: 1 },
            time: 15000,
            skill: 'weaving',
            level: 1
        },
        silk_cloth: {
            name: 'Seidenstoff',
            type: 'weaving',
            inputs: [{ type: 'silk', quantity: 2 }],
            output: { type: 'silk_cloth', quantity: 1 },
            time: 25000,
            skill: 'weaving',
            level: 2
        },
        
        // Lebensmittel
        bread: {
            name: 'Brot',
            type: 'cooking',
            inputs: [{ type: 'grain', quantity: 2 }, { type: 'water', quantity: 1 }],
            output: { type: 'bread', quantity: 2 },
            time: 10000,
            skill: 'cooking',
            level: 1
        },
        wine: {
            name: 'Wein',
            type: 'brewing',
            inputs: [{ type: 'grape', quantity: 5 }, { type: 'water', quantity: 2 }],
            output: { type: 'wine', quantity: 1 },
            time: 300000, // 5 Minuten
            skill: 'brewing',
            level: 2
        },
        beer: {
            name: 'Bier',
            type: 'brewing',
            inputs: [{ type: 'grain', quantity: 3 }, { type: 'water', quantity: 2 }, { type: 'hops', quantity: 1 }],
            output: { type: 'beer', quantity: 2 },
            time: 180000, // 3 Minuten
            skill: 'brewing',
            level: 1
        },
        
        // Schmuck
        gold_ring: {
            name: 'Goldring',
            type: 'crafting',
            inputs: [{ type: 'gold_bar', quantity: 1 }],
            output: { type: 'gold_ring', quantity: 1 },
            time: 30000,
            skill: 'jewelry',
            level: 2
        },
        silver_necklace: {
            name: 'Silberkette',
            type: 'crafting',
            inputs: [{ type: 'silver_bar', quantity: 1 }],
            output: { type: 'silver_necklace', quantity: 1 },
            time: 25000,
            skill: 'jewelry',
            level: 1
        }
    },
    
    // Produktions-Standorte
    productionFacilities: {
        FORGE: { name: 'Schmiede', types: ['smelting', 'forging', 'crafting'], level: 2 },
        WORKSHOP: { name: 'Werkstatt', types: ['crafting', 'assembly', 'processing'], level: 1 },
        KITCHEN: { name: 'Küche', types: ['cooking', 'brewing', 'distilling'], level: 1 },
        LABORATORY: { name: 'Labor', types: ['refining', 'processing', 'treating'], level: 3 },
        TEXTILE_MILL: { name: 'Textilfabrik', types: ['weaving', 'processing'], level: 2 },
        JEWELRY_SHOP: { name: 'Juwelier', types: ['crafting', 'polishing', 'engraving'], level: 3 },
        CARPENTER_SHOP: { name: 'Tischlerei', types: ['crafting', 'carving', 'assembly'], level: 1 },
        POTTERY: { name: 'Töpferei', types: ['molding', 'firing', 'glazing'], level: 1 }
    },
    
    // Aktive Produktionen
    activeProductions: new Map(),
    
    // Produktions-Statistiken
    productionStats: {
        totalItemsProduced: 0,
        totalValueProduced: 0,
        activeProductions: 0,
        mostProducedItem: null,
        totalProductionTime: 0
    },
    
    // Production System-Initialisierung
    init() {
        console.log('[PRODUCTION] Produktions-System initialisiert');
    },
    
    // Produktion starten
    startProduction(player, recipeName, facilityType, quantity = 1) {
        const recipe = this.recipes[recipeName];
        if (!recipe) {
            player.outputChatBox('Rezept nicht gefunden!');
            return false;
        }
        
        const facility = this.productionFacilities[facilityType];
        if (!facility) {
            player.outputChatBox('Produktionsstätte nicht gefunden!');
            return false;
        }
        
        if (!facility.types.includes(recipe.type)) {
            player.outputChatBox('Diese Produktionsstätte kann dieses Rezept nicht herstellen!');
            return false;
        }
        
        if (facility.level < recipe.level) {
            player.outputChatBox('Produktionsstätte hat nicht das erforderliche Level!');
            return false;
        }
        
        // Eingangs-Materialien prüfen
        const totalInputs = recipe.inputs.map(input => ({
            ...input,
            quantity: input.quantity * quantity
        }));
        
        if (!this.checkInputs(player, totalInputs)) {
            player.outputChatBox('Nicht genug Eingangs-Materialien!');
            return false;
        }
        
        const productionId = `production_${player.id}_${Date.now()}`;
        const production = {
            id: productionId,
            playerId: player.id,
            playerName: player.name,
            recipe: recipe,
            facility: facility,
            quantity: quantity,
            startTime: Date.now(),
            duration: recipe.time * quantity,
            status: 'active',
            created: Date.now()
        };
        
        this.activeProductions.set(productionId, production);
        
        // Eingangs-Materialien verbrauchen
        this.consumeInputs(player, totalInputs);
        
        player.outputChatBox(`Produktion von ${recipe.name} gestartet!`);
        player.call('ui:show', 'ProductionStarted', { production: production });
        
        // Produktion nach Zeit abschließen
        setTimeout(() => {
            this.completeProduction(productionId);
        }, production.duration);
        
        console.log(`[PRODUCTION] Produktion ${recipeName} für Spieler ${player.id} gestartet`);
        return productionId;
    },
    
    // Eingangs-Materialien prüfen
    checkInputs(player, inputs) {
        if (!player.inventory) return false;
        
        return inputs.every(input => {
            const item = player.inventory.find(invItem => invItem.type === input.type);
            return item && item.quantity >= input.quantity;
        });
    },
    
    // Eingangs-Materialien verbrauchen
    consumeInputs(player, inputs) {
        inputs.forEach(input => {
            const item = player.inventory.find(invItem => invItem.type === input.type);
            if (item) {
                item.quantity -= input.quantity;
                if (item.quantity <= 0) {
                    player.inventory = player.inventory.filter(invItem => invItem !== item);
                }
            }
        });
    },
    
    // Produktion abschließen
    completeProduction(productionId) {
        const production = this.activeProductions.get(productionId);
        if (!production) return false;
        
        const player = mp.players.at(production.playerId);
        if (!player) return false;
        
        // Ausgangs-Produkt hinzufügen
        const output = {
            type: production.recipe.output.type,
            name: production.recipe.name,
            quantity: production.recipe.output.quantity * production.quantity,
            value: 100, // Vereinfacht
            weight: 1.0
        };
        
        if (!player.inventory) player.inventory = [];
        
        const existingItem = player.inventory.find(item => item.type === output.type);
        if (existingItem) {
            existingItem.quantity += output.quantity;
        } else {
            player.inventory.push(output);
        }
        
        production.status = 'completed';
        production.completionTime = Date.now();
        
        player.outputChatBox(`${output.quantity}x ${output.name} hergestellt!`);
        player.call('ui:show', 'ProductionCompleted', { production: production });
        
        // Statistiken aktualisieren
        this.productionStats.totalItemsProduced += output.quantity;
        this.productionStats.totalValueProduced += output.quantity * output.value;
        this.productionStats.totalProductionTime += production.duration;
        
        console.log(`[PRODUCTION] Produktion ${productionId} abgeschlossen`);
        return true;
    },
    
    // Verfügbare Rezepte anzeigen
    showRecipes(player, facilityType) {
        const facility = this.productionFacilities[facilityType];
        if (!facility) {
            player.outputChatBox('Produktionsstätte nicht gefunden!');
            return false;
        }
        
        player.outputChatBox(`=== Verfügbare Rezepte in ${facility.name} ===`);
        Object.keys(this.recipes).forEach(recipeName => {
            const recipe = this.recipes[recipeName];
            if (facility.types.includes(recipe.type) && facility.level >= recipe.level) {
                player.outputChatBox(`${recipe.name}: ${recipe.inputs.map(i => `${i.quantity}x ${i.type}`).join(', ')}`);
            }
        });
        
        return true;
    },
    
    // Produktions-Statistiken
    getStatistics() {
        return {
            ...this.productionStats,
            activeProductions: this.activeProductions.size,
            totalRecipes: Object.keys(this.recipes).length,
            totalFacilities: Object.keys(this.productionFacilities).length
        };
    }
};

// Events
mp.events.add('production:start', (player, recipeName, facilityType, quantity) => {
    productionSystem.startProduction(player, recipeName, facilityType, quantity);
});

mp.events.add('production:showRecipes', (player, facilityType) => {
    productionSystem.showRecipes(player, facilityType);
});

// Commands
mp.events.addCommand('produce', (player, fullText, recipeName, facilityType, quantity) => {
    if (!recipeName || !facilityType) {
        player.outputChatBox('Verwendung: /produce [Rezept] [Anlage] [Menge]');
        player.outputChatBox('Verfügbare Anlagen: forge, workshop, kitchen, laboratory, textile_mill, jewelry_shop');
        return;
    }
    
    const qty = quantity ? parseInt(quantity) : 1;
    productionSystem.startProduction(player, recipeName, facilityType, qty);
});

mp.events.addCommand('recipes', (player, fullText, facilityType) => {
    if (facilityType) {
        productionSystem.showRecipes(player, facilityType);
    } else {
        player.outputChatBox('Verfügbare Produktionsstätten:');
        Object.keys(productionSystem.productionFacilities).forEach(facility => {
            player.outputChatBox(`- ${facility}: ${productionSystem.productionFacilities[facility].name}`);
        });
    }
});

// Production System initialisieren
productionSystem.init();

module.exports = productionSystem;
