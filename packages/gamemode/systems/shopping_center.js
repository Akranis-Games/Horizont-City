// Shopping Center System - Einkaufszentrum-System mit Läden und Services
// Behandelt alle Einkaufszentrum-Funktionen für Horizont-City Roleplay

const shoppingCenterSystem = {
    // Geschäfts-Typen
    storeTypes: {
        CLOTHING: 'clothing',
        ELECTRONICS: 'electronics',
        FOOD: 'food',
        BOOKS: 'books',
        JEWELRY: 'jewelry',
        SHOES: 'shoes',
        BEAUTY: 'beauty',
        SPORTS: 'sports',
        TOYS: 'toys',
        HOME: 'home',
        PHARMACY: 'pharmacy',
        OPTICS: 'optics',
        WATCHES: 'watches',
        BAGS: 'bags',
        PERFUME: 'perfume',
        FLOWERS: 'flowers',
        GIFTS: 'gifts',
        STATIONERY: 'stationery',
        MUSIC: 'music',
        GAMES: 'games',
        FURNITURE: 'furniture',
        APPLIANCES: 'appliances',
        AUTOMOTIVE: 'automotive',
        PET: 'pet',
        GARDEN: 'garden',
        OFFICE: 'office',
        TRAVEL: 'travel',
        INSURANCE: 'insurance',
        BANK: 'bank',
        RESTAURANT: 'restaurant',
        CAFE: 'cafe',
        FAST_FOOD: 'fast_food',
        CINEMA: 'cinema',
        GYM: 'gym',
        SPA: 'spa',
        HAIRDRESSER: 'hairdresser',
        NAIL_SALON: 'nail_salon',
        TATTOO: 'tattoo',
        BARBER: 'barber',
        MASSAGE: 'massage',
        DENTIST: 'dentist',
        DOCTOR: 'doctor',
        VETERINARY: 'veterinary',
        LEGAL: 'legal',
        ACCOUNTING: 'accounting',
        REAL_ESTATE: 'real_estate',
        CAR_RENTAL: 'car_rental',
        PHOTO: 'photo',
        PRINTING: 'printing',
        CLEANING: 'cleaning',
        SECURITY: 'security',
        MAINTENANCE: 'maintenance'
    },
    
    // Geschäfts-Konfiguration
    storeConfig: {
        clothing: {
            name: 'Bekleidungsgeschäft',
            type: 'clothing',
            category: 'fashion',
            description: 'Mode und Bekleidung für alle Altersgruppen',
            products: ['shirts', 'pants', 'dresses', 'jackets', 'shoes', 'accessories'],
            priceRange: { min: 20, max: 500 },
            targetAudience: 'all',
            openingHours: '9:00-20:00',
            rent: 2000,
            size: 100,
            employees: 3,
            popularity: 0.8
        },
        electronics: {
            name: 'Elektronikgeschäft',
            type: 'electronics',
            category: 'technology',
            description: 'Elektronik und Technologie',
            products: ['phones', 'computers', 'tablets', 'headphones', 'cameras', 'gaming'],
            priceRange: { min: 50, max: 2000 },
            targetAudience: 'adults',
            openingHours: '9:00-21:00',
            rent: 3000,
            size: 150,
            employees: 5,
            popularity: 0.9
        },
        food: {
            name: 'Supermarkt',
            type: 'food',
            category: 'grocery',
            description: 'Lebensmittel und Getränke',
            products: ['fruits', 'vegetables', 'meat', 'dairy', 'beverages', 'snacks'],
            priceRange: { min: 1, max: 50 },
            targetAudience: 'all',
            openingHours: '7:00-22:00',
            rent: 2500,
            size: 200,
            employees: 8,
            popularity: 0.95
        },
        books: {
            name: 'Buchhandlung',
            type: 'books',
            category: 'education',
            description: 'Bücher und Bildungsmaterialien',
            products: ['fiction', 'non-fiction', 'textbooks', 'magazines', 'stationery'],
            priceRange: { min: 5, max: 100 },
            targetAudience: 'all',
            openingHours: '9:00-19:00',
            rent: 1500,
            size: 80,
            employees: 2,
            popularity: 0.6
        },
        jewelry: {
            name: 'Juwelier',
            type: 'jewelry',
            category: 'luxury',
            description: 'Schmuck und Uhren',
            products: ['rings', 'necklaces', 'earrings', 'watches', 'bracelets'],
            priceRange: { min: 100, max: 10000 },
            targetAudience: 'adults',
            openingHours: '10:00-18:00',
            rent: 4000,
            size: 60,
            employees: 3,
            popularity: 0.7
        },
        shoes: {
            name: 'Schuhgeschäft',
            type: 'shoes',
            category: 'fashion',
            description: 'Schuhe und Accessoires',
            products: ['sneakers', 'boots', 'sandals', 'dress_shoes', 'socks'],
            priceRange: { min: 30, max: 300 },
            targetAudience: 'all',
            openingHours: '9:00-20:00',
            rent: 1800,
            size: 90,
            employees: 2,
            popularity: 0.75
        },
        beauty: {
            name: 'Drogerie',
            type: 'beauty',
            category: 'health',
            description: 'Kosmetik und Körperpflege',
            products: ['makeup', 'skincare', 'haircare', 'perfume', 'vitamins'],
            priceRange: { min: 5, max: 200 },
            targetAudience: 'adults',
            openingHours: '8:00-21:00',
            rent: 2200,
            size: 120,
            employees: 4,
            popularity: 0.85
        },
        sports: {
            name: 'Sportgeschäft',
            type: 'sports',
            category: 'recreation',
            description: 'Sportartikel und Ausrüstung',
            products: ['clothing', 'equipment', 'shoes', 'accessories', 'supplements'],
            priceRange: { min: 20, max: 500 },
            targetAudience: 'all',
            openingHours: '9:00-20:00',
            rent: 2000,
            size: 110,
            employees: 3,
            popularity: 0.7
        },
        toys: {
            name: 'Spielzeugladen',
            type: 'toys',
            category: 'children',
            description: 'Spielzeug und Kinderartikel',
            products: ['toys', 'games', 'books', 'clothing', 'accessories'],
            priceRange: { min: 10, max: 200 },
            targetAudience: 'children',
            openingHours: '9:00-19:00',
            rent: 1600,
            size: 100,
            employees: 2,
            popularity: 0.8
        },
        home: {
            name: 'Möbelhaus',
            type: 'home',
            category: 'furniture',
            description: 'Möbel und Wohnaccessoires',
            products: ['furniture', 'decorations', 'lighting', 'textiles', 'kitchen'],
            priceRange: { min: 50, max: 2000 },
            targetAudience: 'adults',
            openingHours: '9:00-20:00',
            rent: 3500,
            size: 300,
            employees: 6,
            popularity: 0.75
        },
        pharmacy: {
            name: 'Apotheke',
            type: 'pharmacy',
            category: 'health',
            description: 'Medikamente und Gesundheitsprodukte',
            products: ['medicines', 'supplements', 'medical_devices', 'first_aid'],
            priceRange: { min: 5, max: 100 },
            targetAudience: 'all',
            openingHours: '8:00-20:00',
            rent: 2800,
            size: 70,
            employees: 3,
            popularity: 0.9
        },
        restaurant: {
            name: 'Restaurant',
            type: 'restaurant',
            category: 'food_service',
            description: 'Restaurant mit verschiedenen Küchen',
            products: ['meals', 'beverages', 'desserts', 'alcohol'],
            priceRange: { min: 15, max: 100 },
            targetAudience: 'all',
            openingHours: '11:00-23:00',
            rent: 4000,
            size: 150,
            employees: 8,
            popularity: 0.85
        },
        cafe: {
            name: 'Café',
            type: 'cafe',
            category: 'food_service',
            description: 'Kaffee und leichte Speisen',
            products: ['coffee', 'tea', 'pastries', 'sandwiches', 'smoothies'],
            priceRange: { min: 3, max: 25 },
            targetAudience: 'all',
            openingHours: '7:00-19:00',
            rent: 1800,
            size: 80,
            employees: 4,
            popularity: 0.8
        },
        fast_food: {
            name: 'Fast Food',
            type: 'fast_food',
            category: 'food_service',
            description: 'Schnelles Essen und Getränke',
            products: ['burgers', 'fries', 'drinks', 'desserts', 'salads'],
            priceRange: { min: 5, max: 30 },
            targetAudience: 'all',
            openingHours: '10:00-24:00',
            rent: 2500,
            size: 100,
            employees: 6,
            popularity: 0.9
        },
        cinema: {
            name: 'Kino',
            type: 'cinema',
            category: 'entertainment',
            description: 'Filme und Unterhaltung',
            products: ['tickets', 'popcorn', 'drinks', 'candy'],
            priceRange: { min: 8, max: 50 },
            targetAudience: 'all',
            openingHours: '10:00-24:00',
            rent: 5000,
            size: 500,
            employees: 10,
            popularity: 0.85
        },
        gym: {
            name: 'Fitnessstudio',
            type: 'gym',
            category: 'fitness',
            description: 'Fitness und Wellness',
            products: ['memberships', 'personal_training', 'supplements', 'equipment'],
            priceRange: { min: 30, max: 200 },
            targetAudience: 'adults',
            openingHours: '6:00-22:00',
            rent: 4000,
            size: 300,
            employees: 8,
            popularity: 0.8
        },
        hairdresser: {
            name: 'Friseur',
            type: 'hairdresser',
            category: 'beauty_service',
            description: 'Haarschnitte und Styling',
            products: ['haircuts', 'coloring', 'styling', 'products'],
            priceRange: { min: 20, max: 150 },
            targetAudience: 'all',
            openingHours: '9:00-19:00',
            rent: 1500,
            size: 60,
            employees: 3,
            popularity: 0.75
        }
    },
    
    // Einkaufszentren
    shoppingCenters: {
        'center_1': {
            name: 'Horizont Shopping Center',
            location: { x: 1000, y: 2000, z: 30 },
            floors: 3,
            stores: 50,
            parking: 200,
            facilities: ['food_court', 'cinema', 'gym', 'pharmacy', 'bank', 'atm'],
            openingHours: '9:00-22:00',
            status: 'active',
            created: Date.now()
        },
        'center_2': {
            name: 'City Center Mall',
            location: { x: 1500, y: 2500, z: 30 },
            floors: 4,
            stores: 80,
            parking: 300,
            facilities: ['food_court', 'cinema', 'gym', 'pharmacy', 'bank', 'atm', 'spa'],
            openingHours: '8:00-23:00',
            status: 'active',
            created: Date.now()
        },
        'center_3': {
            name: 'North Plaza',
            location: { x: 2000, y: 3000, z: 30 },
            floors: 2,
            stores: 30,
            parking: 150,
            facilities: ['food_court', 'pharmacy', 'bank', 'atm'],
            openingHours: '9:00-21:00',
            status: 'active',
            created: Date.now()
        }
    },
    
    // Aktive Einkaufszentren
    activeShoppingCenters: new Map(),
    
    // Aktive Geschäfte
    activeStores: new Map(),
    
    // Einkäufe
    purchases: new Map(),
    
    // Einkaufszentrum-System-Initialisierung
    init() {
        console.log('[SHOPPING_CENTER] Einkaufszentrum-System initialisiert');
        this.initializeShoppingCenters();
        this.initializeStores();
    },
    
    // Einkaufszentren initialisieren
    initializeShoppingCenters() {
        Object.keys(this.shoppingCenters).forEach(centerId => {
            const center = this.shoppingCenters[centerId];
            center.id = centerId;
            center.stores = [];
            center.visitors = [];
            center.revenue = 0;
            center.rating = 4.5;
            
            this.activeShoppingCenters.set(centerId, center);
        });
        
        console.log(`[SHOPPING_CENTER] ${Object.keys(this.shoppingCenters).length} Einkaufszentren initialisiert`);
    },
    
    // Geschäfte initialisieren
    initializeStores() {
        Object.keys(this.storeConfig).forEach(storeType => {
            const config = this.storeConfig[storeType];
            const storeId = `store_${storeType}_${Date.now()}`;
            
            const store = {
                id: storeId,
                type: storeType,
                config: config,
                name: config.name,
                centerId: 'center_1', // Standard-Zentrum
                floor: 1,
                position: { x: 0, y: 0, z: 0 },
                status: 'active',
                revenue: 0,
                customers: 0,
                rating: 4.0,
                inventory: this.generateInventory(config),
                sales: [],
                created: Date.now()
            };
            
            this.activeStores.set(storeId, store);
            
            // Geschäft zum Zentrum hinzufügen
            const center = this.activeShoppingCenters.get(store.centerId);
            if (center) {
                center.stores.push(storeId);
            }
        });
        
        console.log(`[SHOPPING_CENTER] ${Object.keys(this.storeConfig).length} Geschäfte initialisiert`);
    },
    
    // Inventar generieren
    generateInventory(config) {
        const inventory = [];
        
        config.products.forEach(product => {
            const quantity = Math.floor(Math.random() * 50) + 10;
            const price = Math.floor(Math.random() * (config.priceRange.max - config.priceRange.min)) + config.priceRange.min;
            
            inventory.push({
                product: product,
                quantity: quantity,
                price: price,
                category: config.category,
                popularity: Math.random()
            });
        });
        
        return inventory;
    },
    
    // Geschäft mieten
    rentStore(player, storeType, centerId, floor, position) {
        const config = this.storeConfig[storeType];
        if (!config) {
            player.outputChatBox('Geschäfts-Typ nicht gefunden!');
            return false;
        }
        
        const center = this.activeShoppingCenters.get(centerId);
        if (!center) {
            player.outputChatBox('Einkaufszentrum nicht gefunden!');
            return false;
        }
        
        if (player.money < config.rent) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${config.rent}`);
            return false;
        }
        
        const storeId = `store_${player.id}_${Date.now()}`;
        const store = {
            id: storeId,
            ownerId: player.id,
            type: storeType,
            config: config,
            name: `${config.name} von ${player.name}`,
            centerId: centerId,
            floor: floor,
            position: position,
            status: 'active',
            revenue: 0,
            customers: 0,
            rating: 4.0,
            inventory: this.generateInventory(config),
            sales: [],
            rent: config.rent,
            rentDue: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 Tage
            created: Date.now()
        };
        
        this.activeStores.set(storeId, store);
        center.stores.push(storeId);
        
        player.money -= config.rent;
        center.revenue += config.rent;
        
        player.outputChatBox(`Geschäft ${config.name} gemietet! Miete: $${config.rent}`);
        player.call('ui:show', 'StoreRented', { store: store });
        
        console.log(`[SHOPPING_CENTER] Geschäft ${storeType} von Spieler ${player.id} gemietet`);
        return storeId;
    },
    
    // Einkauf tätigen
    makePurchase(player, storeId, product, quantity) {
        const store = this.activeStores.get(storeId);
        if (!store) {
            player.outputChatBox('Geschäft nicht gefunden!');
            return false;
        }
        
        const inventoryItem = store.inventory.find(item => item.product === product);
        if (!inventoryItem) {
            player.outputChatBox('Produkt nicht verfügbar!');
            return false;
        }
        
        if (inventoryItem.quantity < quantity) {
            player.outputChatBox(`Nicht genug Lagerbestand! Verfügbar: ${inventoryItem.quantity}`);
            return false;
        }
        
        const totalPrice = inventoryItem.price * quantity;
        if (player.money < totalPrice) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${totalPrice}`);
            return false;
        }
        
        // Einkauf durchführen
        const purchaseId = `purchase_${player.id}_${Date.now()}`;
        const purchase = {
            id: purchaseId,
            playerId: player.id,
            storeId: storeId,
            product: product,
            quantity: quantity,
            unitPrice: inventoryItem.price,
            totalPrice: totalPrice,
            timestamp: Date.now(),
            created: Date.now()
        };
        
        this.purchases.set(purchaseId, purchase);
        
        // Inventar aktualisieren
        inventoryItem.quantity -= quantity;
        
        // Geld abziehen
        player.money -= totalPrice;
        
        // Geschäfts-Statistiken aktualisieren
        store.revenue += totalPrice;
        store.customers += 1;
        store.sales.push(purchaseId);
        
        // Einkaufszentrum-Statistiken aktualisieren
        const center = this.activeShoppingCenters.get(store.centerId);
        if (center) {
            center.revenue += totalPrice;
        }
        
        player.outputChatBox(`Einkauf abgeschlossen! ${quantity}x ${product} für $${totalPrice}`);
        player.call('ui:show', 'PurchaseCompleted', { purchase: purchase });
        
        console.log(`[SHOPPING_CENTER] Einkauf von Spieler ${player.id} in ${storeId}`);
        return purchaseId;
    },
    
    // Geschäft besuchen
    visitStore(player, storeId) {
        const store = this.activeStores.get(storeId);
        if (!store) {
            player.outputChatBox('Geschäft nicht gefunden!');
            return false;
        }
        
        if (store.status !== 'active') {
            player.outputChatBox('Geschäft ist geschlossen!');
            return false;
        }
        
        // Geschäft-Informationen anzeigen
        player.outputChatBox(`=== ${store.name} ===`);
        player.outputChatBox(`Typ: ${store.config.name}`);
        player.outputChatBox(`Bewertung: ${store.rating}/5`);
        player.outputChatBox(`Kunden heute: ${store.customers}`);
        player.outputChatBox(`Umsatz heute: $${store.revenue}`);
        
        // Inventar anzeigen
        player.outputChatBox('Verfügbare Produkte:');
        store.inventory.forEach(item => {
            if (item.quantity > 0) {
                player.outputChatBox(`- ${item.product}: $${item.price} (${item.quantity} verfügbar)`);
            }
        });
        
        player.call('ui:show', 'StoreVisit', { store: store });
        
        console.log(`[SHOPPING_CENTER] Spieler ${player.id} besucht ${storeId}`);
        return true;
    },
    
    // Geschäft bewerten
    rateStore(player, storeId, rating, comment) {
        const store = this.activeStores.get(storeId);
        if (!store) {
            player.outputChatBox('Geschäft nicht gefunden!');
            return false;
        }
        
        if (rating < 1 || rating > 5) {
            player.outputChatBox('Bewertung muss zwischen 1 und 5 liegen!');
            return false;
        }
        
        // Bewertung hinzufügen
        const review = {
            playerId: player.id,
            rating: rating,
            comment: comment,
            timestamp: Date.now()
        };
        
        store.reviews = store.reviews || [];
        store.reviews.push(review);
        
        // Durchschnittsbewertung aktualisieren
        const totalRating = store.reviews.reduce((sum, review) => sum + review.rating, 0);
        store.rating = totalRating / store.reviews.length;
        
        player.outputChatBox(`Bewertung abgegeben! Bewertung: ${rating}/5`);
        player.call('ui:show', 'StoreRated', { review: review });
        
        console.log(`[SHOPPING_CENTER] Bewertung für ${storeId} von Spieler ${player.id}`);
        return true;
    },
    
    // Einkaufszentrum besuchen
    visitShoppingCenter(player, centerId) {
        const center = this.activeShoppingCenters.get(centerId);
        if (!center) {
            player.outputChatBox('Einkaufszentrum nicht gefunden!');
            return false;
        }
        
        // Besucher hinzufügen
        center.visitors.push({
            playerId: player.id,
            visitTime: Date.now()
        });
        
        // Einkaufszentrum-Informationen anzeigen
        player.outputChatBox(`=== ${center.name} ===`);
        player.outputChatBox(`Etagen: ${center.floors}`);
        player.outputChatBox(`Geschäfte: ${center.stores.length}`);
        player.outputChatBox(`Parkplätze: ${center.parking}`);
        player.outputChatBox(`Bewertung: ${center.rating}/5`);
        player.outputChatBox(`Öffnungszeiten: ${center.openingHours}`);
        
        // Einrichtungen anzeigen
        player.outputChatBox('Einrichtungen:');
        center.facilities.forEach(facility => {
            player.outputChatBox(`- ${facility}`);
        });
        
        player.call('ui:show', 'ShoppingCenterVisit', { center: center });
        
        console.log(`[SHOPPING_CENTER] Spieler ${player.id} besucht ${centerId}`);
        return true;
    },
    
    // Einkaufszentrum-System-Statistiken
    getStatistics() {
        return {
            totalCenters: this.activeShoppingCenters.size,
            totalStores: this.activeStores.size,
            totalPurchases: this.purchases.size,
            totalRevenue: Array.from(this.activeShoppingCenters.values()).reduce((sum, center) => sum + center.revenue, 0)
        };
    }
};

// Events
mp.events.add('shopping_center:rentStore', (player, storeType, centerId, floor, position) => {
    shoppingCenterSystem.rentStore(player, storeType, centerId, floor, position);
});

mp.events.add('shopping_center:makePurchase', (player, storeId, product, quantity) => {
    shoppingCenterSystem.makePurchase(player, storeId, product, quantity);
});

mp.events.add('shopping_center:visitStore', (player, storeId) => {
    shoppingCenterSystem.visitStore(player, storeId);
});

mp.events.add('shopping_center:rateStore', (player, storeId, rating, comment) => {
    shoppingCenterSystem.rateStore(player, storeId, rating, comment);
});

// Commands
mp.events.addCommand('shopping', (player, fullText, action, storeType, centerId) => {
    if (!action) {
        player.outputChatBox('Verwendung: /shopping [rent|visit|buy|rate] [Typ] [Zentrum]');
        player.outputChatBox('Verfügbare Typen: clothing, electronics, food, books, jewelry, shoes, beauty, sports, toys, home');
        player.outputChatBox('Verfügbare Zentren: center_1, center_2, center_3');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'rent':
            if (storeType && centerId) {
                shoppingCenterSystem.rentStore(player, storeType, centerId, 1, player.position);
            } else {
                player.outputChatBox('Geschäfts-Typ und Zentrum erforderlich!');
            }
            break;
            
        case 'visit':
            if (storeType) {
                shoppingCenterSystem.visitStore(player, storeType);
            } else {
                player.outputChatBox('Geschäfts-ID erforderlich!');
            }
            break;
            
        case 'buy':
            if (storeType && centerId) {
                shoppingCenterSystem.makePurchase(player, storeType, centerId, 1);
            } else {
                player.outputChatBox('Geschäfts-ID und Produkt erforderlich!');
            }
            break;
            
        case 'rate':
            if (storeType && centerId) {
                shoppingCenterSystem.rateStore(player, storeType, parseInt(centerId), 'Gut!');
            } else {
                player.outputChatBox('Geschäfts-ID und Bewertung erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('mall', (player, fullText, action, centerId) => {
    if (!action) {
        player.outputChatBox('Verwendung: /mall [visit|info|stats] [Zentrum]');
        player.outputChatBox('Verfügbare Zentren: center_1, center_2, center_3');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'visit':
            if (centerId) {
                shoppingCenterSystem.visitShoppingCenter(player, centerId);
            } else {
                player.outputChatBox('Zentrum-ID erforderlich!');
            }
            break;
            
        case 'info':
            player.outputChatBox('=== Einkaufszentrum-Informationen ===');
            player.outputChatBox('Verfügbare Zentren: Horizont Shopping Center, City Center Mall, North Plaza');
            player.outputChatBox('Geschäfts-Typen: Bekleidung, Elektronik, Lebensmittel, Bücher, Schmuck, Schuhe, Beauty, Sport, Spielzeug, Möbel');
            break;
            
        case 'stats':
            const stats = shoppingCenterSystem.getStatistics();
            player.outputChatBox('=== Einkaufszentrum-Statistiken ===');
            player.outputChatBox(`Gesamt Zentren: ${stats.totalCenters}`);
            player.outputChatBox(`Gesamt Geschäfte: ${stats.totalStores}`);
            player.outputChatBox(`Gesamt Einkäufe: ${stats.totalPurchases}`);
            player.outputChatBox(`Gesamt Umsatz: $${stats.totalRevenue.toFixed(2)}`);
            break;
    }
});

// Einkaufszentrum-System initialisieren
shoppingCenterSystem.init();

module.exports = shoppingCenterSystem;
