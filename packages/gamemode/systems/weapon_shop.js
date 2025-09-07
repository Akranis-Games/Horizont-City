// Weapon Shop System - Erweiterte Waffen-Shop-Funktionalität basierend auf Tutorial
// Behandelt alle Waffen-Shop-Funktionen für Horizont-City Roleplay

const weaponShopSystem = {
    // Waffen-Shops
    weaponShops: new Map(),
    
    // Waffen-Kategorien
    weaponCategories: {
        PISTOLS: { name: 'Pistolen', level: 1, license: 'weapon_license' },
        RIFLES: { name: 'Gewehre', level: 3, license: 'weapon_license' },
        SHOTGUNS: { name: 'Schrotflinten', level: 2, license: 'weapon_license' },
        SMGS: { name: 'Maschinenpistolen', level: 2, license: 'weapon_license' },
        SNIPERS: { name: 'Scharfschützengewehre', level: 4, license: 'weapon_license' },
        HEAVY: { name: 'Schwere Waffen', level: 5, license: 'weapon_license' },
        MELEE: { name: 'Nahkampfwaffen', level: 0, license: null },
        THROWABLES: { name: 'Wurfwaffen', level: 1, license: 'weapon_license' }
    },
    
    // Waffen-Datenbank
    weapons: {
        // Pistolen
        weapon_pistol: {
            name: 'Pistole',
            category: 'PISTOLS',
            price: 500,
            ammo: 50,
            damage: 25,
            range: 50,
            accuracy: 0.8,
            level: 1,
            license: 'weapon_license'
        },
        weapon_combatpistol: {
            name: 'Kampfpistole',
            category: 'PISTOLS',
            price: 750,
            ammo: 60,
            damage: 30,
            range: 60,
            accuracy: 0.85,
            level: 2,
            license: 'weapon_license'
        },
        weapon_pistol50: {
            name: 'Pistole .50',
            category: 'PISTOLS',
            price: 1000,
            ammo: 40,
            damage: 45,
            range: 70,
            accuracy: 0.75,
            level: 3,
            license: 'weapon_license'
        },
        
        // Gewehre
        weapon_assaultrifle: {
            name: 'Sturmgewehr',
            category: 'RIFLES',
            price: 2500,
            ammo: 100,
            damage: 35,
            range: 100,
            accuracy: 0.9,
            level: 3,
            license: 'weapon_license'
        },
        weapon_carbinerifle: {
            name: 'Karabiner',
            category: 'RIFLES',
            price: 3000,
            ammo: 80,
            damage: 40,
            range: 120,
            accuracy: 0.95,
            level: 4,
            license: 'weapon_license'
        },
        
        // Schrotflinten
        weapon_pumpshotgun: {
            name: 'Pumpgun',
            category: 'SHOTGUNS',
            price: 1200,
            ammo: 30,
            damage: 60,
            range: 30,
            accuracy: 0.7,
            level: 2,
            license: 'weapon_license'
        },
        weapon_sawnoffshotgun: {
            name: 'Abgesägte Schrotflinte',
            category: 'SHOTGUNS',
            price: 800,
            ammo: 20,
            damage: 50,
            range: 25,
            accuracy: 0.6,
            level: 1,
            license: 'weapon_license'
        },
        
        // Maschinenpistolen
        weapon_microsmg: {
            name: 'Micro SMG',
            category: 'SMGS',
            price: 1500,
            ammo: 80,
            damage: 20,
            range: 40,
            accuracy: 0.75,
            level: 2,
            license: 'weapon_license'
        },
        weapon_smg: {
            name: 'SMG',
            category: 'SMGS',
            price: 2000,
            ammo: 100,
            damage: 25,
            range: 60,
            accuracy: 0.8,
            level: 3,
            license: 'weapon_license'
        },
        
        // Scharfschützengewehre
        weapon_sniperrifle: {
            name: 'Scharfschützengewehr',
            category: 'SNIPERS',
            price: 5000,
            ammo: 20,
            damage: 100,
            range: 200,
            accuracy: 0.98,
            level: 4,
            license: 'weapon_license'
        },
        
        // Nahkampfwaffen
        weapon_knife: {
            name: 'Messer',
            category: 'MELEE',
            price: 50,
            ammo: 1,
            damage: 15,
            range: 2,
            accuracy: 1.0,
            level: 0,
            license: null
        },
        weapon_bat: {
            name: 'Baseballschläger',
            category: 'MELEE',
            price: 100,
            ammo: 1,
            damage: 20,
            range: 3,
            accuracy: 0.9,
            level: 0,
            license: null
        },
        
        // Wurfwaffen
        weapon_grenade: {
            name: 'Granate',
            category: 'THROWABLES',
            price: 300,
            ammo: 1,
            damage: 80,
            range: 20,
            accuracy: 0.8,
            level: 1,
            license: 'weapon_license'
        },
        weapon_molotov: {
            name: 'Molotow-Cocktail',
            category: 'THROWABLES',
            price: 200,
            ammo: 1,
            damage: 40,
            range: 15,
            accuracy: 0.7,
            level: 1,
            license: 'weapon_license'
        }
    },
    
    // Munitions-Typen
    ammoTypes: {
        PISTOL_AMMO: { name: 'Pistolenmunition', price: 2, capacity: 50 },
        RIFLE_AMMO: { name: 'Gewehrmunition', price: 3, capacity: 100 },
        SHOTGUN_AMMO: { name: 'Schrotmunition', price: 5, capacity: 30 },
        SMG_AMMO: { name: 'SMG-Munition', price: 2.5, capacity: 80 },
        SNIPER_AMMO: { name: 'Scharfschützenmunition', price: 10, capacity: 20 },
        HEAVY_AMMO: { name: 'Schwere Munition', price: 15, capacity: 50 }
    },
    
    // Waffen-Statistiken
    weaponStats: {
        totalWeaponsSold: 0,
        totalAmmoSold: 0,
        totalRevenue: 0,
        mostPopularWeapon: null,
        activeShops: 0
    },
    
    // Weapon Shop System-Initialisierung
    init() {
        this.initializeWeaponShops();
        console.log('[WEAPON_SHOP] Waffen-Shop-System initialisiert');
    },
    
    // Waffen-Shops initialisieren
    initializeWeaponShops() {
        // Hauptwaffenladen
        const mainShop = {
            id: 'weapon_shop_main',
            name: 'Hauptwaffenladen',
            location: { x: 22.0, y: -1107.0, z: 29.8 },
            blip: { sprite: 110, color: 1 },
            items: Object.keys(this.weapons),
            level: 5,
            created: Date.now()
        };
        
        // Illegaler Waffenladen
        const illegalShop = {
            id: 'weapon_shop_illegal',
            name: 'Illegaler Waffenladen',
            location: { x: 1692.0, y: 3759.0, z: 34.7 },
            blip: { sprite: 110, color: 1 },
            items: Object.keys(this.weapons).filter(weaponId => 
                this.weapons[weaponId].level >= 3
            ),
            level: 3,
            illegal: true,
            created: Date.now()
        };
        
        this.weaponShops.set(mainShop.id, mainShop);
        this.weaponShops.set(illegalShop.id, illegalShop);
        
        // Colshapes erstellen
        this.createShopColshapes();
    },
    
    // Shop-Colshapes erstellen
    createShopColshapes() {
        this.weaponShops.forEach(shop => {
            const colshape = mp.colshapes.newSphere(
                shop.location.x, 
                shop.location.y, 
                shop.location.z, 
                3.0
            );
            colshape.shopId = shop.id;
            colshape.shopType = 'weapon';
            
            // Blip erstellen
            const blip = mp.blips.new(shop.blip.sprite, new mp.Vector3(
                shop.location.x, 
                shop.location.y, 
                shop.location.z
            ), {
                name: shop.name,
                color: shop.blip.color,
                shortRange: true
            });
        });
    },
    
    // Waffe kaufen
    buyWeapon(player, weaponId, shopId) {
        const shop = this.weaponShops.get(shopId);
        if (!shop) {
            player.outputChatBox('Waffenladen nicht gefunden!');
            return false;
        }
        
        const weapon = this.weapons[weaponId];
        if (!weapon) {
            player.outputChatBox('Waffe nicht gefunden!');
            return false;
        }
        
        // Lizenz prüfen
        if (weapon.license && !this.hasLicense(player, weapon.license)) {
            player.outputChatBox(`Du benötigst eine ${weapon.license} für diese Waffe!`);
            return false;
        }
        
        // Level prüfen
        if (weapon.level > shop.level) {
            player.outputChatBox('Diese Waffe ist in diesem Laden nicht verfügbar!');
            return false;
        }
        
        // Geld prüfen
        if (player.money < weapon.price) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${weapon.price}`);
            return false;
        }
        
        // Waffe zum Inventar hinzufügen
        const weaponItem = {
            type: weaponId,
            name: weapon.name,
            quantity: 1,
            value: weapon.price,
            weight: 2.0,
            ammo: weapon.ammo,
            damage: weapon.damage,
            range: weapon.range,
            accuracy: weapon.accuracy,
            category: weapon.category,
            level: weapon.level,
            license: weapon.license
        };
        
        if (!player.inventory) player.inventory = [];
        
        const existingWeapon = player.inventory.find(item => item.type === weaponId);
        if (existingWeapon) {
            existingWeapon.quantity += 1;
            existingWeapon.ammo += weapon.ammo;
        } else {
            player.inventory.push(weaponItem);
        }
        
        // Geld abziehen
        player.money -= weapon.price;
        
        // Statistiken aktualisieren
        this.weaponStats.totalWeaponsSold++;
        this.weaponStats.totalRevenue += weapon.price;
        
        player.outputChatBox(`${weapon.name} für $${weapon.price} gekauft!`);
        player.call('ui:show', 'WeaponPurchased', { weapon: weaponItem });
        
        console.log(`[WEAPON_SHOP] Spieler ${player.id} kaufte ${weapon.name}`);
        return true;
    },
    
    // Munition kaufen
    buyAmmo(player, ammoType, quantity, shopId) {
        const shop = this.weaponShops.get(shopId);
        if (!shop) {
            player.outputChatBox('Waffenladen nicht gefunden!');
            return false;
        }
        
        const ammo = this.ammoTypes[ammoType];
        if (!ammo) {
            player.outputChatBox('Munitionstyp nicht gefunden!');
            return false;
        }
        
        const totalPrice = ammo.price * quantity;
        if (player.money < totalPrice) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${totalPrice}`);
            return false;
        }
        
        // Munition zum Inventar hinzufügen
        const ammoItem = {
            type: ammoType,
            name: ammo.name,
            quantity: quantity,
            value: totalPrice,
            weight: 0.1 * quantity,
            capacity: ammo.capacity
        };
        
        if (!player.inventory) player.inventory = [];
        
        const existingAmmo = player.inventory.find(item => item.type === ammoType);
        if (existingAmmo) {
            existingAmmo.quantity += quantity;
        } else {
            player.inventory.push(ammoItem);
        }
        
        // Geld abziehen
        player.money -= totalPrice;
        
        // Statistiken aktualisieren
        this.weaponStats.totalAmmoSold += quantity;
        this.weaponStats.totalRevenue += totalPrice;
        
        player.outputChatBox(`${quantity}x ${ammo.name} für $${totalPrice} gekauft!`);
        player.call('ui:show', 'AmmoPurchased', { ammo: ammoItem });
        
        console.log(`[WEAPON_SHOP] Spieler ${player.id} kaufte ${quantity}x ${ammo.name}`);
        return true;
    },
    
    // Lizenz prüfen
    hasLicense(player, licenseType) {
        if (!player.licenses) return false;
        return player.licenses.some(license => license.type === licenseType && license.valid);
    },
    
    // Verfügbare Waffen anzeigen
    showWeapons(player, shopId) {
        const shop = this.weaponShops.get(shopId);
        if (!shop) {
            player.outputChatBox('Waffenladen nicht gefunden!');
            return false;
        }
        
        const availableWeapons = shop.items
            .map(weaponId => this.weapons[weaponId])
            .filter(weapon => weapon && weapon.level <= shop.level);
        
        player.outputChatBox(`=== Verfügbare Waffen in ${shop.name} ===`);
        availableWeapons.forEach(weapon => {
            const licenseText = weapon.license ? ` (${weapon.license})` : '';
            player.outputChatBox(`${weapon.name}: $${weapon.price}${licenseText}`);
        });
        
        return true;
    },
    
    // Waffen-Shop-Statistiken
    getStatistics() {
        return {
            ...this.weaponStats,
            totalShops: this.weaponShops.size,
            totalWeapons: Object.keys(this.weapons).length,
            totalAmmoTypes: Object.keys(this.ammoTypes).length
        };
    }
};

// Events
mp.events.add('weapon_shop:buyWeapon', (player, weaponId, shopId) => {
    weaponShopSystem.buyWeapon(player, weaponId, shopId);
});

mp.events.add('weapon_shop:buyAmmo', (player, ammoType, quantity, shopId) => {
    weaponShopSystem.buyAmmo(player, ammoType, quantity, shopId);
});

mp.events.add('weapon_shop:showWeapons', (player, shopId) => {
    weaponShopSystem.showWeapons(player, shopId);
});

// Colshape Events
mp.events.add('playerEnterColshape', (player, shape) => {
    if (shape.shopType === 'weapon') {
        const shop = weaponShopSystem.weaponShops.get(shape.shopId);
        if (shop) {
            player.call('ui:show', 'WeaponShop', { shop: shop });
        }
    }
});

// Commands
mp.events.addCommand('weaponshop', (player, fullText, action, weaponId, quantity) => {
    if (!action) {
        player.outputChatBox('Verwendung: /weaponshop [show|buy] [waffe] [menge]');
        player.outputChatBox('Verfügbare Aktionen: show, buy');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'show':
            weaponShopSystem.showWeapons(player, 'weapon_shop_main');
            break;
            
        case 'buy':
            if (weaponId) {
                weaponShopSystem.buyWeapon(player, weaponId, 'weapon_shop_main');
            } else {
                player.outputChatBox('Waffen-ID erforderlich!');
            }
            break;
    }
});

// Weapon Shop System initialisieren
weaponShopSystem.init();

module.exports = weaponShopSystem;
