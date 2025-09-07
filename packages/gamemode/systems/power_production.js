// Power Production System - Stromerzeugungs-System mit Kraftwerken und Verteilung
// Behandelt alle Stromerzeugungs-Funktionen für Horizont-City Roleplay

const powerProductionSystem = {
    // Kraftwerk-Typen
    powerPlantTypes: {
        COAL: 'coal',
        GAS: 'gas',
        NUCLEAR: 'nuclear',
        HYDRO: 'hydro',
        WIND: 'wind',
        SOLAR: 'solar',
        GEOTHERMAL: 'geothermal',
        BIOMASS: 'biomass',
        WAVE: 'wave',
        TIDAL: 'tidal',
        FUEL_CELL: 'fuel_cell',
        BATTERY: 'battery',
        PUMPED_STORAGE: 'pumped_storage',
        COMBINED_CYCLE: 'combined_cycle',
        COGENERATION: 'cogeneration'
    },
    
    // Kraftwerk-Konfiguration
    powerPlantConfig: {
        coal: {
            name: 'Kohlekraftwerk',
            type: 'coal',
            capacity: 1000, // MW
            efficiency: 0.35,
            fuelConsumption: 2.5, // Tonnen Kohle pro MWh
            co2Emission: 0.8, // Tonnen CO2 pro MWh
            maintenanceCost: 50000,
            fuelCost: 30, // $ pro Tonne
            constructionTime: 48, // Monate
            lifespan: 40, // Jahre
            reliability: 0.85,
            startupTime: 8, // Stunden
            shutdownTime: 4, // Stunden
            minLoad: 0.3,
            maxLoad: 1.0,
            description: 'Traditionelles Kohlekraftwerk mit hoher CO2-Emission'
        },
        gas: {
            name: 'Gaskraftwerk',
            type: 'gas',
            capacity: 500, // MW
            efficiency: 0.55,
            fuelConsumption: 0.18, // MWh Gas pro MWh Strom
            co2Emission: 0.4, // Tonnen CO2 pro MWh
            maintenanceCost: 30000,
            fuelCost: 50, // $ pro MWh
            constructionTime: 24, // Monate
            lifespan: 30, // Jahre
            reliability: 0.90,
            startupTime: 2, // Stunden
            shutdownTime: 1, // Stunden
            minLoad: 0.2,
            maxLoad: 1.0,
            description: 'Flexibles Gaskraftwerk mit schneller Reaktionszeit'
        },
        nuclear: {
            name: 'Kernkraftwerk',
            type: 'nuclear',
            capacity: 1500, // MW
            efficiency: 0.33,
            fuelConsumption: 0.003, // kg Uran pro MWh
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 100000,
            fuelCost: 2000, // $ pro kg Uran
            constructionTime: 84, // Monate
            lifespan: 60, // Jahre
            reliability: 0.95,
            startupTime: 72, // Stunden
            shutdownTime: 24, // Stunden
            minLoad: 0.5,
            maxLoad: 1.0,
            description: 'Hochkapazitäts-Kernkraftwerk mit niedrigen CO2-Emissionen'
        },
        hydro: {
            name: 'Wasserkraftwerk',
            type: 'hydro',
            capacity: 200, // MW
            efficiency: 0.90,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 20000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 36, // Monate
            lifespan: 80, // Jahre
            reliability: 0.95,
            startupTime: 0.5, // Stunden
            shutdownTime: 0.5, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Erneuerbares Wasserkraftwerk mit hoher Effizienz'
        },
        wind: {
            name: 'Windkraftanlage',
            type: 'wind',
            capacity: 100, // MW
            efficiency: 0.45,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 15000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 12, // Monate
            lifespan: 25, // Jahre
            reliability: 0.80,
            startupTime: 0, // Stunden
            shutdownTime: 0, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Erneuerbare Windkraftanlage mit variabler Leistung'
        },
        solar: {
            name: 'Solaranlage',
            type: 'solar',
            capacity: 50, // MW
            efficiency: 0.20,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 10000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 6, // Monate
            lifespan: 25, // Jahre
            reliability: 0.85,
            startupTime: 0, // Stunden
            shutdownTime: 0, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Erneuerbare Solaranlage mit Tagesabhängigkeit'
        },
        geothermal: {
            name: 'Geothermie-Kraftwerk',
            type: 'geothermal',
            capacity: 75, // MW
            efficiency: 0.15,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 25000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 18, // Monate
            lifespan: 30, // Jahre
            reliability: 0.90,
            startupTime: 2, // Stunden
            shutdownTime: 1, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Erneuerbares Geothermie-Kraftwerk mit konstanter Leistung'
        },
        biomass: {
            name: 'Biomasse-Kraftwerk',
            type: 'biomass',
            capacity: 150, // MW
            efficiency: 0.30,
            fuelConsumption: 1.5, // Tonnen Biomasse pro MWh
            co2Emission: 0.1, // Tonnen CO2 pro MWh
            maintenanceCost: 35000,
            fuelCost: 40, // $ pro Tonne
            constructionTime: 24, // Monate
            lifespan: 25, // Jahre
            reliability: 0.85,
            startupTime: 4, // Stunden
            shutdownTime: 2, // Stunden
            minLoad: 0.3,
            maxLoad: 1.0,
            description: 'Erneuerbares Biomasse-Kraftwerk mit CO2-Neutralität'
        },
        wave: {
            name: 'Wellenkraftwerk',
            type: 'wave',
            capacity: 25, // MW
            efficiency: 0.25,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 20000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 18, // Monate
            lifespan: 20, // Jahre
            reliability: 0.75,
            startupTime: 0, // Stunden
            shutdownTime: 0, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Erneuerbares Wellenkraftwerk mit Meeresabhängigkeit'
        },
        tidal: {
            name: 'Gezeitenkraftwerk',
            type: 'tidal',
            capacity: 40, // MW
            efficiency: 0.30,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 30000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 24, // Monate
            lifespan: 30, // Jahre
            reliability: 0.80,
            startupTime: 0, // Stunden
            shutdownTime: 0, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Erneuerbares Gezeitenkraftwerk mit Gezeitenabhängigkeit'
        },
        fuel_cell: {
            name: 'Brennstoffzellen-Kraftwerk',
            type: 'fuel_cell',
            capacity: 30, // MW
            efficiency: 0.60,
            fuelConsumption: 0.17, // MWh Wasserstoff pro MWh Strom
            co2Emission: 0.0, // Tonnen CO2 pro MWh
            maintenanceCost: 40000,
            fuelCost: 80, // $ pro MWh
            constructionTime: 12, // Monate
            lifespan: 20, // Jahre
            reliability: 0.90,
            startupTime: 1, // Stunden
            shutdownTime: 0.5, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Sauberes Brennstoffzellen-Kraftwerk mit Wasserstoff'
        },
        battery: {
            name: 'Batterie-Speicher',
            type: 'battery',
            capacity: 100, // MW
            efficiency: 0.90,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.0, // Tonnen CO2 pro MWh
            maintenanceCost: 25000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 6, // Monate
            lifespan: 15, // Jahre
            reliability: 0.95,
            startupTime: 0, // Stunden
            shutdownTime: 0, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Energiespeicher-System mit hoher Effizienz'
        },
        pumped_storage: {
            name: 'Pumpspeicher-Kraftwerk',
            type: 'pumped_storage',
            capacity: 200, // MW
            efficiency: 0.80,
            fuelConsumption: 0, // Kein Brennstoff
            co2Emission: 0.01, // Tonnen CO2 pro MWh
            maintenanceCost: 30000,
            fuelCost: 0, // Kein Brennstoff
            constructionTime: 36, // Monate
            lifespan: 50, // Jahre
            reliability: 0.90,
            startupTime: 0.5, // Stunden
            shutdownTime: 0.5, // Stunden
            minLoad: 0.0,
            maxLoad: 1.0,
            description: 'Pumpspeicher-Kraftwerk mit großer Speicherkapazität'
        },
        combined_cycle: {
            name: 'GuD-Kraftwerk',
            type: 'combined_cycle',
            capacity: 800, // MW
            efficiency: 0.60,
            fuelConsumption: 0.17, // MWh Gas pro MWh Strom
            co2Emission: 0.3, // Tonnen CO2 pro MWh
            maintenanceCost: 60000,
            fuelCost: 50, // $ pro MWh
            constructionTime: 30, // Monate
            lifespan: 35, // Jahre
            reliability: 0.92,
            startupTime: 4, // Stunden
            shutdownTime: 2, // Stunden
            minLoad: 0.3,
            maxLoad: 1.0,
            description: 'Hocheffizientes Gas- und Dampf-Kraftwerk'
        },
        cogeneration: {
            name: 'Kraft-Wärme-Kopplung',
            type: 'cogeneration',
            capacity: 100, // MW
            efficiency: 0.85,
            fuelConsumption: 0.12, // MWh Gas pro MWh Strom
            co2Emission: 0.2, // Tonnen CO2 pro MWh
            maintenanceCost: 35000,
            fuelCost: 50, // $ pro MWh
            constructionTime: 18, // Monate
            lifespan: 25, // Jahre
            reliability: 0.88,
            startupTime: 2, // Stunden
            shutdownTime: 1, // Stunden
            minLoad: 0.2,
            maxLoad: 1.0,
            description: 'Kraft-Wärme-Kopplung mit hoher Gesamteffizienz'
        }
    },
    
    // Brennstoff-Typen
    fuelTypes: {
        COAL: 'coal',
        NATURAL_GAS: 'natural_gas',
        URANIUM: 'uranium',
        BIOMASS: 'biomass',
        HYDROGEN: 'hydrogen',
        DIESEL: 'diesel',
        HEATING_OIL: 'heating_oil',
        LPG: 'lpg',
        PROPANE: 'propane',
        BUTANE: 'butane',
        METHANE: 'methane',
        ETHANE: 'ethane',
        PROPENE: 'propene',
        BUTENE: 'butene',
        PENTANE: 'pentane',
        HEXANE: 'hexane',
        HEPTANE: 'heptane',
        OCTANE: 'octane',
        NONANE: 'nonane',
        DECANE: 'decane'
    },
    
    // Brennstoff-Konfiguration
    fuelConfig: {
        coal: {
            name: 'Kohle',
            type: 'coal',
            energyDensity: 24, // MJ/kg
            carbonContent: 0.8,
            sulfurContent: 0.02,
            ashContent: 0.1,
            moistureContent: 0.08,
            price: 30, // $ pro Tonne
            availability: 'high',
            storage: 'bulk',
            transport: 'rail',
            description: 'Traditioneller Brennstoff mit hoher CO2-Emission'
        },
        natural_gas: {
            name: 'Erdgas',
            type: 'natural_gas',
            energyDensity: 55, // MJ/kg
            carbonContent: 0.75,
            sulfurContent: 0.001,
            ashContent: 0.0,
            moistureContent: 0.0,
            price: 50, // $ pro MWh
            availability: 'high',
            storage: 'tank',
            transport: 'pipeline',
            description: 'Sauberer Brennstoff mit niedriger CO2-Emission'
        },
        uranium: {
            name: 'Uran',
            type: 'uranium',
            energyDensity: 80000000, // MJ/kg
            carbonContent: 0.0,
            sulfurContent: 0.0,
            ashContent: 0.0,
            moistureContent: 0.0,
            price: 2000, // $ pro kg
            availability: 'medium',
            storage: 'secure',
            transport: 'special',
            description: 'Hochenergetischer Brennstoff für Kernkraftwerke'
        },
        biomass: {
            name: 'Biomasse',
            type: 'biomass',
            energyDensity: 18, // MJ/kg
            carbonContent: 0.5,
            sulfurContent: 0.001,
            ashContent: 0.05,
            moistureContent: 0.15,
            price: 40, // $ pro Tonne
            availability: 'medium',
            storage: 'bulk',
            transport: 'truck',
            description: 'Erneuerbarer Brennstoff mit CO2-Neutralität'
        },
        hydrogen: {
            name: 'Wasserstoff',
            type: 'hydrogen',
            energyDensity: 142, // MJ/kg
            carbonContent: 0.0,
            sulfurContent: 0.0,
            ashContent: 0.0,
            moistureContent: 0.0,
            price: 80, // $ pro MWh
            availability: 'low',
            storage: 'tank',
            transport: 'truck',
            description: 'Sauberer Brennstoff mit hoher Energiedichte'
        }
    },
    
    // Kraftwerk-Standorte
    powerPlantLocations: {
        'plant_1': {
            name: 'Kohlekraftwerk Mitte',
            location: { x: 1000, y: 2000, z: 30 },
            type: 'coal',
            capacity: 1000,
            status: 'active',
            efficiency: 0.35,
            fuelLevel: 0.8,
            maintenance: 0.9,
            created: Date.now()
        },
        'plant_2': {
            name: 'Gaskraftwerk Nord',
            location: { x: 1500, y: 2500, z: 30 },
            type: 'gas',
            capacity: 500,
            status: 'active',
            efficiency: 0.55,
            fuelLevel: 0.7,
            maintenance: 0.85,
            created: Date.now()
        },
        'plant_3': {
            name: 'Windpark Ost',
            location: { x: 2000, y: 3000, z: 30 },
            type: 'wind',
            capacity: 200,
            status: 'active',
            efficiency: 0.45,
            fuelLevel: 1.0,
            maintenance: 0.95,
            created: Date.now()
        },
        'plant_4': {
            name: 'Solarpark Süd',
            location: { x: 2500, y: 3500, z: 30 },
            type: 'solar',
            capacity: 100,
            status: 'active',
            efficiency: 0.20,
            fuelLevel: 1.0,
            maintenance: 0.90,
            created: Date.now()
        },
        'plant_5': {
            name: 'Kernkraftwerk West',
            location: { x: 3000, y: 4000, z: 30 },
            type: 'nuclear',
            capacity: 1500,
            status: 'active',
            efficiency: 0.33,
            fuelLevel: 0.9,
            maintenance: 0.98,
            created: Date.now()
        }
    },
    
    // Aktive Kraftwerke
    activePowerPlants: new Map(),
    
    // Brennstoff-Lager
    fuelStorage: new Map(),
    
    // Stromnetz
    powerGrid: {
        totalCapacity: 0,
        totalProduction: 0,
        totalConsumption: 0,
        efficiency: 0.95,
        losses: 0.05,
        frequency: 50, // Hz
        voltage: 230, // V
        status: 'stable'
    },
    
    // Stromerzeugungs-System-Initialisierung
    init() {
        console.log('[POWER_PRODUCTION] Stromerzeugungs-System initialisiert');
        this.initializePowerPlants();
        this.initializeFuelStorage();
        this.startPowerGrid();
    },
    
    // Kraftwerke initialisieren
    initializePowerPlants() {
        Object.keys(this.powerPlantLocations).forEach(plantId => {
            const plant = this.powerPlantLocations[plantId];
            const config = this.powerPlantConfig[plant.type];
            
            plant.id = plantId;
            plant.config = config;
            plant.currentOutput = 0;
            plant.maxOutput = plant.capacity;
            plant.fuelConsumption = 0;
            plant.co2Emission = 0;
            plant.maintenanceCost = 0;
            plant.fuelCost = 0;
            plant.revenue = 0;
            plant.profit = 0;
            plant.uptime = 0;
            plant.downtime = 0;
            plant.lastMaintenance = Date.now();
            plant.nextMaintenance = Date.now() + (30 * 24 * 60 * 60 * 1000); // 30 Tage
            
            this.activePowerPlants.set(plantId, plant);
        });
        
        console.log(`[POWER_PRODUCTION] ${Object.keys(this.powerPlantLocations).length} Kraftwerke initialisiert`);
    },
    
    // Brennstoff-Lager initialisieren
    initializeFuelStorage() {
        Object.keys(this.fuelConfig).forEach(fuelType => {
            const fuel = this.fuelConfig[fuelType];
            const storage = {
                type: fuelType,
                config: fuel,
                amount: 1000, // Tonnen
                maxCapacity: 10000, // Tonnen
                price: fuel.price,
                quality: 1.0,
                lastDelivery: Date.now(),
                nextDelivery: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 Tage
            };
            
            this.fuelStorage.set(fuelType, storage);
        });
        
        console.log(`[POWER_PRODUCTION] ${Object.keys(this.fuelConfig).length} Brennstoff-Lager initialisiert`);
    },
    
    // Stromnetz starten
    startPowerGrid() {
        setInterval(() => {
            this.updatePowerGrid();
        }, 60000); // Alle 60 Sekunden
        
        console.log('[POWER_PRODUCTION] Stromnetz gestartet');
    },
    
    // Stromnetz aktualisieren
    updatePowerGrid() {
        let totalCapacity = 0;
        let totalProduction = 0;
        let totalConsumption = 0;
        let totalCo2Emission = 0;
        let totalFuelConsumption = 0;
        let totalMaintenanceCost = 0;
        let totalFuelCost = 0;
        
        this.activePowerPlants.forEach(plant => {
            if (plant.status === 'active') {
                totalCapacity += plant.capacity;
                
                // Stromerzeugung berechnen
                const weatherFactor = this.getWeatherFactor(plant.type);
                const maintenanceFactor = plant.maintenance;
                const fuelFactor = plant.fuelLevel;
                
                const efficiency = plant.config.efficiency * weatherFactor * maintenanceFactor * fuelFactor;
                const output = plant.capacity * efficiency;
                
                plant.currentOutput = output;
                totalProduction += output;
                
                // Brennstoffverbrauch berechnen
                const fuelConsumption = (output / 1000) * plant.config.fuelConsumption; // Tonnen pro Stunde
                plant.fuelConsumption = fuelConsumption;
                totalFuelConsumption += fuelConsumption;
                
                // CO2-Emissionen berechnen
                const co2Emission = (output / 1000) * plant.config.co2Emission; // Tonnen CO2 pro Stunde
                plant.co2Emission = co2Emission;
                totalCo2Emission += co2Emission;
                
                // Wartungskosten berechnen
                const maintenanceCost = (plant.config.maintenanceCost / 24) / 60; // $ pro Minute
                plant.maintenanceCost = maintenanceCost;
                totalMaintenanceCost += maintenanceCost;
                
                // Brennstoffkosten berechnen
                const fuelCost = fuelConsumption * plant.config.fuelCost; // $ pro Stunde
                plant.fuelCost = fuelCost;
                totalFuelCost += fuelCost;
                
                // Gewinn berechnen
                const revenue = output * 0.05; // $0.05 pro kWh
                plant.revenue = revenue;
                plant.profit = revenue - maintenanceCost - fuelCost;
                
                // Brennstoff verbrauchen
                this.consumeFuel(plant.type, fuelConsumption);
                
                // Wartung prüfen
                if (Date.now() > plant.nextMaintenance) {
                    this.performMaintenance(plant);
                }
            }
        });
        
        // Stromverbrauch simulieren
        totalConsumption = totalProduction * 0.9; // 90% der Produktion wird verbraucht
        
        // Stromnetz aktualisieren
        this.powerGrid.totalCapacity = totalCapacity;
        this.powerGrid.totalProduction = totalProduction;
        this.powerGrid.totalConsumption = totalConsumption;
        this.powerGrid.efficiency = totalConsumption / totalProduction;
        this.powerGrid.losses = 1 - this.powerGrid.efficiency;
        
        // Netzstabilität prüfen
        if (totalProduction < totalConsumption) {
            this.powerGrid.status = 'deficit';
            this.handlePowerDeficit(totalConsumption - totalProduction);
        } else if (totalProduction > totalConsumption * 1.1) {
            this.powerGrid.status = 'surplus';
            this.handlePowerSurplus(totalProduction - totalConsumption);
        } else {
            this.powerGrid.status = 'stable';
        }
        
        console.log(`[POWER_PRODUCTION] Netz: ${totalProduction.toFixed(2)}MW Produktion, ${totalConsumption.toFixed(2)}MW Verbrauch`);
    },
    
    // Wetter-Faktor berechnen
    getWeatherFactor(plantType) {
        // Vereinfachte Wetter-Simulation
        const hour = new Date().getHours();
        const weather = Math.random();
        
        switch (plantType) {
            case 'solar':
                if (hour >= 6 && hour <= 18) {
                    return 0.3 + (weather * 0.7); // 30-100% je nach Wetter
                } else {
                    return 0; // Nachts keine Produktion
                }
            case 'wind':
                return 0.2 + (weather * 0.8); // 20-100% je nach Wind
            case 'hydro':
                return 0.8 + (weather * 0.2); // 80-100% konstant
            case 'nuclear':
            case 'coal':
            case 'gas':
                return 0.9 + (weather * 0.1); // 90-100% konstant
            default:
                return 1.0;
        }
    },
    
    // Brennstoff verbrauchen
    consumeFuel(fuelType, amount) {
        const storage = this.fuelStorage.get(fuelType);
        if (storage) {
            storage.amount = Math.max(0, storage.amount - amount);
            
            // Nachbestellung prüfen
            if (storage.amount < storage.maxCapacity * 0.2) {
                this.orderFuel(fuelType, storage.maxCapacity * 0.5);
            }
        }
    },
    
    // Brennstoff bestellen
    orderFuel(fuelType, amount) {
        const storage = this.fuelStorage.get(fuelType);
        if (storage) {
            const cost = amount * storage.price;
            storage.amount += amount;
            storage.lastDelivery = Date.now();
            storage.nextDelivery = Date.now() + (7 * 24 * 60 * 60 * 1000);
            
            console.log(`[POWER_PRODUCTION] ${amount} Tonnen ${fuelType} bestellt für $${cost}`);
            return cost;
        }
        return 0;
    },
    
    // Wartung durchführen
    performMaintenance(plant) {
        plant.maintenance = 1.0;
        plant.lastMaintenance = Date.now();
        plant.nextMaintenance = Date.now() + (30 * 24 * 60 * 60 * 1000);
        
        const cost = plant.config.maintenanceCost * 0.1; // 10% der jährlichen Wartungskosten
        plant.maintenanceCost += cost;
        
        console.log(`[POWER_PRODUCTION] Wartung für ${plant.name} durchgeführt`);
    },
    
    // Stromdefizit behandeln
    handlePowerDeficit(deficit) {
        // Notfall-Kraftwerke aktivieren
        this.activePowerPlants.forEach(plant => {
            if (plant.status === 'standby' && plant.type === 'gas') {
                plant.status = 'active';
                console.log(`[POWER_PRODUCTION] Notfall-Kraftwerk ${plant.name} aktiviert`);
            }
        });
        
        // Stromausfall simulieren
        if (deficit > 100) { // Mehr als 100MW Defizit
            this.simulateBlackout();
        }
    },
    
    // Stromüberschuss behandeln
    handlePowerSurplus(surplus) {
        // Überschüssigen Strom speichern oder exportieren
        console.log(`[POWER_PRODUCTION] Stromüberschuss: ${surplus.toFixed(2)}MW`);
    },
    
    // Stromausfall simulieren
    simulateBlackout() {
        console.log('[POWER_PRODUCTION] STROMAUSFALL!');
        // Hier würde der Stromausfall implementiert werden
    },
    
    // Kraftwerk kaufen
    buyPowerPlant(player, plantType, location) {
        const config = this.powerPlantConfig[plantType];
        if (!config) {
            player.outputChatBox('Kraftwerk-Typ nicht gefunden!');
            return false;
        }
        
        const cost = config.capacity * 1000; // $1000 pro MW
        if (player.money < cost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${cost}`);
            return false;
        }
        
        const plantId = `plant_${player.id}_${Date.now()}`;
        const plant = {
            id: plantId,
            ownerId: player.id,
            name: `${config.name} von ${player.name}`,
            type: plantType,
            config: config,
            location: location,
            capacity: config.capacity,
            status: 'construction',
            efficiency: config.efficiency,
            fuelLevel: 0,
            maintenance: 1.0,
            currentOutput: 0,
            maxOutput: config.capacity,
            fuelConsumption: 0,
            co2Emission: 0,
            maintenanceCost: 0,
            fuelCost: 0,
            revenue: 0,
            profit: 0,
            uptime: 0,
            downtime: 0,
            lastMaintenance: Date.now(),
            nextMaintenance: Date.now() + (30 * 24 * 60 * 60 * 1000),
            constructionStart: Date.now(),
            constructionEnd: Date.now() + (config.constructionTime * 30 * 24 * 60 * 60 * 1000),
            created: Date.now()
        };
        
        this.activePowerPlants.set(plantId, plant);
        
        player.money -= cost;
        player.outputChatBox(`Kraftwerk ${config.name} gekauft! Bauzeit: ${config.constructionTime} Monate`);
        player.call('ui:show', 'PowerPlantBought', { plant: plant });
        
        // Bauzeit simulieren
        setTimeout(() => {
            this.completeConstruction(plantId);
        }, config.constructionTime * 30 * 24 * 60 * 60 * 1000);
        
        console.log(`[POWER_PRODUCTION] Kraftwerk ${plantType} von Spieler ${player.id} gekauft`);
        return plantId;
    },
    
    // Bau abschließen
    completeConstruction(plantId) {
        const plant = this.activePowerPlants.get(plantId);
        if (plant) {
            plant.status = 'active';
            plant.fuelLevel = 1.0;
            
            const player = mp.players.at(plant.ownerId);
            if (player) {
                player.outputChatBox(`Kraftwerk ${plant.name} ist fertig gebaut!`);
                player.call('ui:show', 'PowerPlantCompleted', { plant: plant });
            }
            
            console.log(`[POWER_PRODUCTION] Kraftwerk ${plantId} fertig gebaut`);
        }
    },
    
    // Stromerzeugungs-Statistiken
    getStatistics() {
        return {
            totalPlants: this.activePowerPlants.size,
            totalCapacity: this.powerGrid.totalCapacity,
            totalProduction: this.powerGrid.totalProduction,
            totalConsumption: this.powerGrid.totalConsumption,
            gridEfficiency: this.powerGrid.efficiency,
            gridStatus: this.powerGrid.status
        };
    }
};

// Events
mp.events.add('power_production:buyPlant', (player, plantType, location) => {
    powerProductionSystem.buyPowerPlant(player, plantType, location);
});

mp.events.add('power_production:orderFuel', (player, fuelType, amount) => {
    const cost = powerProductionSystem.orderFuel(fuelType, amount);
    if (cost > 0) {
        player.money -= cost;
        player.outputChatBox(`Brennstoff bestellt: ${amount} Tonnen ${fuelType} für $${cost}`);
    }
});

// Commands
mp.events.addCommand('powerplant', (player, fullText, action, plantType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /powerplant [buy|info|stats] [Typ]');
        player.outputChatBox('Verfügbare Typen: coal, gas, nuclear, hydro, wind, solar, geothermal, biomass');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'buy':
            if (plantType) {
                const location = player.position;
                powerProductionSystem.buyPowerPlant(player, plantType, location);
            } else {
                player.outputChatBox('Kraftwerk-Typ erforderlich!');
            }
            break;
            
        case 'info':
            if (plantType) {
                const config = powerProductionSystem.powerPlantConfig[plantType];
                if (config) {
                    player.outputChatBox(`=== ${config.name} ===`);
                    player.outputChatBox(`Kapazität: ${config.capacity} MW`);
                    player.outputChatBox(`Effizienz: ${(config.efficiency * 100).toFixed(1)}%`);
                    player.outputChatBox(`CO2-Emission: ${config.co2Emission} t/MWh`);
                    player.outputChatBox(`Baukosten: $${config.capacity * 1000}`);
                } else {
                    player.outputChatBox('Kraftwerk-Typ nicht gefunden!');
                }
            } else {
                player.outputChatBox('Kraftwerk-Typ erforderlich!');
            }
            break;
            
        case 'stats':
            const stats = powerProductionSystem.getStatistics();
            player.outputChatBox('=== Stromerzeugungs-Statistiken ===');
            player.outputChatBox(`Gesamt Kraftwerke: ${stats.totalPlants}`);
            player.outputChatBox(`Gesamt Kapazität: ${stats.totalCapacity.toFixed(2)} MW`);
            player.outputChatBox(`Gesamt Produktion: ${stats.totalProduction.toFixed(2)} MW`);
            player.outputChatBox(`Gesamt Verbrauch: ${stats.totalConsumption.toFixed(2)} MW`);
            player.outputChatBox(`Netz-Effizienz: ${(stats.gridEfficiency * 100).toFixed(1)}%`);
            player.outputChatBox(`Netz-Status: ${stats.gridStatus}`);
            break;
    }
});

mp.events.addCommand('fuel', (player, fullText, action, fuelType, amount) => {
    if (!action) {
        player.outputChatBox('Verwendung: /fuel [order|info] [Typ] [Menge]');
        player.outputChatBox('Verfügbare Typen: coal, natural_gas, uranium, biomass, hydrogen');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'order':
            if (fuelType && amount) {
                const cost = powerProductionSystem.orderFuel(fuelType, parseInt(amount));
                if (cost > 0) {
                    player.money -= cost;
                    player.outputChatBox(`Brennstoff bestellt: ${amount} Tonnen ${fuelType} für $${cost}`);
                }
            } else {
                player.outputChatBox('Brennstoff-Typ und Menge erforderlich!');
            }
            break;
            
        case 'info':
            if (fuelType) {
                const config = powerProductionSystem.fuelConfig[fuelType];
                if (config) {
                    player.outputChatBox(`=== ${config.name} ===`);
                    player.outputChatBox(`Energiedichte: ${config.energyDensity} MJ/kg`);
                    player.outputChatBox(`Kohlenstoffgehalt: ${(config.carbonContent * 100).toFixed(1)}%`);
                    player.outputChatBox(`Preis: $${config.price} pro ${fuelType === 'uranium' ? 'kg' : 'Tonne'}`);
                } else {
                    player.outputChatBox('Brennstoff-Typ nicht gefunden!');
                }
            } else {
                player.outputChatBox('Brennstoff-Typ erforderlich!');
            }
            break;
    }
});

// Stromerzeugungs-System initialisieren
powerProductionSystem.init();

module.exports = powerProductionSystem;
