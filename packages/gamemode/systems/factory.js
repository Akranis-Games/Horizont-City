// Factory System - Fabrik-System mit automatischer Produktion und Verwaltung
// Behandelt alle Fabrik-Funktionen für Horizont-City Roleplay

const factorySystem = {
    // Fabrik-Typen
    factoryTypes: {
        AUTOMOTIVE: { name: 'Automobilfabrik', products: ['car', 'truck', 'motorcycle'], level: 3 },
        ELECTRONICS: { name: 'Elektronikfabrik', products: ['phone', 'computer', 'tv'], level: 2 },
        TEXTILE: { name: 'Textilfabrik', products: ['clothing', 'fabric', 'shoes'], level: 1 },
        FOOD: { name: 'Lebensmittelfabrik', products: ['bread', 'canned_food', 'beverages'], level: 1 },
        CHEMICAL: { name: 'Chemiefabrik', products: ['plastic', 'paint', 'fertilizer'], level: 3 },
        METALLURGY: { name: 'Metallurgiefabrik', products: ['steel', 'aluminum', 'copper'], level: 2 },
        PHARMACEUTICAL: { name: 'Pharmafabrik', products: ['medicine', 'vitamins', 'supplements'], level: 4 },
        WEAPONS: { name: 'Waffenfabrik', products: ['gun', 'ammunition', 'armor'], level: 5 },
        JEWELRY: { name: 'Schmuckfabrik', products: ['ring', 'necklace', 'watch'], level: 2 },
        FURNITURE: { name: 'Möbelfabrik', products: ['chair', 'table', 'bed'], level: 1 }
    },
    
    // Produktionslinien
    productionLines: {
        ASSEMBLY: { name: 'Montagelinie', efficiency: 1.0, workers: 5, cost: 10000 },
        QUALITY_CONTROL: { name: 'Qualitätskontrolle', efficiency: 1.2, workers: 3, cost: 8000 },
        PACKAGING: { name: 'Verpackungslinie', efficiency: 0.8, workers: 2, cost: 5000 },
        RESEARCH: { name: 'Forschungsabteilung', efficiency: 1.5, workers: 8, cost: 20000 },
        MAINTENANCE: { name: 'Wartungsabteilung', efficiency: 1.1, workers: 4, cost: 12000 }
    },
    
    // Fabrik-Status
    factoryStatus: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        MAINTENANCE: 'maintenance',
        UPGRADING: 'upgrading',
        SHUTDOWN: 'shutdown'
    },
    
    // Fabriken
    factories: new Map(),
    
    // Produktions-Aufträge
    productionOrders: new Map(),
    
    // Fabrik-Arbeiter
    factoryWorkers: new Map(),
    
    // Fabrik-Statistiken
    factoryStats: {
        totalFactories: 0,
        activeFactories: 0,
        totalProduction: 0,
        totalValue: 0,
        totalWorkers: 0,
        averageEfficiency: 0
    },
    
    // Factory System-Initialisierung
    init() {
        console.log('[FACTORY] Fabrik-System initialisiert');
    },
    
    // Fabrik erstellen
    createFactory(player, factoryType, location) {
        const factoryConfig = this.factoryTypes[factoryType];
        if (!factoryConfig) {
            player.outputChatBox('Fabrik-Typ nicht gefunden!');
            return false;
        }
        
        const factoryId = `factory_${player.id}_${Date.now()}`;
        const factory = {
            id: factoryId,
            ownerId: player.id,
            ownerName: player.name,
            type: factoryType,
            config: factoryConfig,
            location: location,
            status: 'inactive',
            level: 1,
            efficiency: 1.0,
            workers: [],
            productionLines: [],
            orders: [],
            inventory: [],
            budget: 50000,
            maintenance: 100,
            created: Date.now()
        };
        
        this.factories.set(factoryId, factory);
        
        player.outputChatBox(`Fabrik "${factoryConfig.name}" erstellt!`);
        player.call('ui:show', 'FactoryCreated', { factory: factory });
        
        this.factoryStats.totalFactories++;
        
        console.log(`[FACTORY] Fabrik ${factoryType} für Spieler ${player.id} erstellt`);
        return factoryId;
    },
    
    // Produktionslinie hinzufügen
    addProductionLine(player, factoryId, lineType) {
        const factory = this.factories.get(factoryId);
        if (!factory) {
            player.outputChatBox('Fabrik nicht gefunden!');
            return false;
        }
        
        if (factory.ownerId !== player.id) {
            player.outputChatBox('Du besitzt diese Fabrik nicht!');
            return false;
        }
        
        const lineConfig = this.productionLines[lineType];
        if (!lineConfig) {
            player.outputChatBox('Produktionslinie nicht gefunden!');
            return false;
        }
        
        if (factory.budget < lineConfig.cost) {
            player.outputChatBox(`Nicht genug Budget! Benötigt: $${lineConfig.cost}`);
            return false;
        }
        
        const lineId = `line_${factoryId}_${Date.now()}`;
        const productionLine = {
            id: lineId,
            type: lineType,
            config: lineConfig,
            efficiency: lineConfig.efficiency,
            workers: [],
            status: 'active',
            created: Date.now()
        };
        
        factory.productionLines.push(productionLine);
        factory.budget -= lineConfig.cost;
        
        player.outputChatBox(`Produktionslinie "${lineConfig.name}" hinzugefügt!`);
        player.call('ui:show', 'ProductionLineAdded', { line: productionLine });
        
        console.log(`[FACTORY] Produktionslinie ${lineType} zu Fabrik ${factoryId} hinzugefügt`);
        return lineId;
    },
    
    // Produktionsauftrag erstellen
    createProductionOrder(player, factoryId, productType, quantity) {
        const factory = this.factories.get(factoryId);
        if (!factory) {
            player.outputChatBox('Fabrik nicht gefunden!');
            return false;
        }
        
        if (factory.ownerId !== player.id) {
            player.outputChatBox('Du besitzt diese Fabrik nicht!');
            return false;
        }
        
        if (!factory.config.products.includes(productType)) {
            player.outputChatBox('Diese Fabrik kann dieses Produkt nicht herstellen!');
            return false;
        }
        
        const orderId = `order_${factoryId}_${Date.now()}`;
        const order = {
            id: orderId,
            factoryId: factoryId,
            productType: productType,
            quantity: quantity,
            status: 'pending',
            progress: 0,
            startTime: Date.now(),
            estimatedTime: quantity * 30000, // 30 Sekunden pro Stück
            created: Date.now()
        };
        
        this.productionOrders.set(orderId, order);
        factory.orders.push(orderId);
        
        player.outputChatBox(`Produktionsauftrag für ${quantity}x ${productType} erstellt!`);
        player.call('ui:show', 'ProductionOrderCreated', { order: order });
        
        console.log(`[FACTORY] Produktionsauftrag ${orderId} für Fabrik ${factoryId} erstellt`);
        return orderId;
    },
    
    // Fabrik starten
    startFactory(player, factoryId) {
        const factory = this.factories.get(factoryId);
        if (!factory) {
            player.outputChatBox('Fabrik nicht gefunden!');
            return false;
        }
        
        if (factory.ownerId !== player.id) {
            player.outputChatBox('Du besitzt diese Fabrik nicht!');
            return false;
        }
        
        if (factory.status !== 'inactive') {
            player.outputChatBox('Fabrik ist bereits aktiv oder in Wartung!');
            return false;
        }
        
        factory.status = 'active';
        
        player.outputChatBox('Fabrik gestartet!');
        player.call('ui:show', 'FactoryStarted', { factory: factory });
        
        this.factoryStats.activeFactories++;
        
        // Produktions-Prozess starten
        this.startProductionProcess(factoryId);
        
        console.log(`[FACTORY] Fabrik ${factoryId} gestartet`);
        return true;
    },
    
    // Produktions-Prozess starten
    startProductionProcess(factoryId) {
        const factory = this.factories.get(factoryId);
        if (!factory || factory.status !== 'active') return;
        
        // Alle aktiven Aufträge verarbeiten
        factory.orders.forEach(orderId => {
            const order = this.productionOrders.get(orderId);
            if (order && order.status === 'pending') {
                this.processProductionOrder(orderId);
            }
        });
        
        // Nächste Produktions-Runde in 30 Sekunden
        setTimeout(() => {
            this.startProductionProcess(factoryId);
        }, 30000);
    },
    
    // Produktionsauftrag verarbeiten
    processProductionOrder(orderId) {
        const order = this.productionOrders.get(orderId);
        if (!order) return false;
        
        const factory = this.factories.get(order.factoryId);
        if (!factory || factory.status !== 'active') return false;
        
        order.status = 'processing';
        order.progress += 10; // 10% pro Runde
        
        if (order.progress >= 100) {
            order.status = 'completed';
            order.completionTime = Date.now();
            
            // Produkte zur Fabrik-Inventar hinzufügen
            const product = {
                type: order.productType,
                quantity: order.quantity,
                value: order.quantity * 100, // Vereinfacht
                created: Date.now()
            };
            
            factory.inventory.push(product);
            
            // Statistiken aktualisieren
            this.factoryStats.totalProduction += order.quantity;
            this.factoryStats.totalValue += product.value;
            
            console.log(`[FACTORY] Produktionsauftrag ${orderId} abgeschlossen`);
        }
        
        return true;
    },
    
    // Arbeiter einstellen
    hireWorker(player, factoryId, workerId) {
        const factory = this.factories.get(factoryId);
        if (!factory) {
            player.outputChatBox('Fabrik nicht gefunden!');
            return false;
        }
        
        if (factory.ownerId !== player.id) {
            player.outputChatBox('Du besitzt diese Fabrik nicht!');
            return false;
        }
        
        const worker = mp.players.at(workerId);
        if (!worker) {
            player.outputChatBox('Arbeiter nicht gefunden!');
            return false;
        }
        
        if (factory.workers.length >= 20) {
            player.outputChatBox('Maximale Anzahl Arbeiter erreicht!');
            return false;
        }
        
        const workerData = {
            id: workerId,
            name: worker.name,
            skill: 'factory_worker',
            salary: 1000,
            efficiency: 1.0,
            hiredDate: Date.now()
        };
        
        factory.workers.push(workerData);
        worker.job = 'factory_worker';
        worker.factoryId = factoryId;
        
        player.outputChatBox(`${worker.name} als Arbeiter eingestellt!`);
        player.call('ui:show', 'WorkerHired', { worker: workerData });
        
        this.factoryStats.totalWorkers++;
        
        console.log(`[FACTORY] Arbeiter ${workerId} in Fabrik ${factoryId} eingestellt`);
        return true;
    },
    
    // Fabrik-Statistiken
    getStatistics() {
        return {
            ...this.factoryStats,
            totalOrders: this.productionOrders.size,
            totalProductionLines: Array.from(this.factories.values()).reduce((sum, factory) => 
                sum + factory.productionLines.length, 0
            )
        };
    }
};

// Events
mp.events.add('factory:create', (player, factoryType, location) => {
    factorySystem.createFactory(player, factoryType, location);
});

mp.events.add('factory:addLine', (player, factoryId, lineType) => {
    factorySystem.addProductionLine(player, factoryId, lineType);
});

mp.events.add('factory:createOrder', (player, factoryId, productType, quantity) => {
    factorySystem.createProductionOrder(player, factoryId, productType, quantity);
});

mp.events.add('factory:start', (player, factoryId) => {
    factorySystem.startFactory(player, factoryId);
});

mp.events.add('factory:hireWorker', (player, factoryId, workerId) => {
    factorySystem.hireWorker(player, factoryId, workerId);
});

// Commands
mp.events.addCommand('factory', (player, fullText, action, factoryType, productType, quantity) => {
    if (!action) {
        player.outputChatBox('Verwendung: /factory [create|addline|order|start|hire] [Typ] [Produkt] [Menge]');
        player.outputChatBox('Verfügbare Typen: automotive, electronics, textile, food, chemical, metallurgy');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (factoryType) {
                factorySystem.createFactory(player, factoryType, 'Industrial Zone');
            } else {
                player.outputChatBox('Fabrik-Typ erforderlich!');
            }
            break;
            
        case 'addline':
            if (factoryType) {
                factorySystem.addProductionLine(player, factoryType, 'assembly');
            } else {
                player.outputChatBox('Fabrik-ID erforderlich!');
            }
            break;
            
        case 'order':
            if (factoryType && productType && quantity) {
                factorySystem.createProductionOrder(player, factoryType, productType, parseInt(quantity));
            } else {
                player.outputChatBox('Fabrik-ID, Produkt-Typ und Menge erforderlich!');
            }
            break;
            
        case 'start':
            if (factoryType) {
                factorySystem.startFactory(player, factoryType);
            } else {
                player.outputChatBox('Fabrik-ID erforderlich!');
            }
            break;
            
        case 'hire':
            if (factoryType) {
                factorySystem.hireWorker(player, factoryType, player.id);
            } else {
                player.outputChatBox('Fabrik-ID erforderlich!');
            }
            break;
    }
});

// Factory System initialisieren
factorySystem.init();

module.exports = factorySystem;
