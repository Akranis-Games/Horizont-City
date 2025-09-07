# Tutorial: Waffensystem für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial zeigt, wie du ein Waffensystem für einen RageMP Roleplay-Server implementierst, das Spielern erlaubt, Waffen zu kaufen, zu speichern und zu benutzen, integriert mit dem Inventarsystem (siehe [inventory-shops-Tutorial.md](#)). Die Daten werden in MongoDB gespeichert, und ein CEF-basiertes UI zeigt verfügbare Waffen an. Es berücksichtigt Roleplay-Aspekte wie Waffenlizenzen (siehe [Lizensen-Tutorial.md](#)).

## Voraussetzungen

- RageMP-Server mit Struktur wie in [Dateistruktur.md](#).
- MongoDB-Server (lokal oder MongoDB Atlas).
- Node.js und das `mongodb`-Modul (`npm install mongodb`).
- Vorhandenes Inventarsystem ([inventory-shops-Tutorial.md](#)).
- Grundkenntnisse in JavaScript, HTML, CSS und MongoDB.

## 1. MongoDB einrichten

Erweitere die `players`-Collection um ein Feld für Waffen und erstelle eine `weapon_shops`-Collection.

### Beispiel: `players`-Collection

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "inventory": [
        { "itemId": "weapon_pistol", "name": "Pistole", "quantity": 1, "type": "weapon", "ammo": 50 }
    ]
}
```

### Beispiel: `weapon_shops`-Collection

```json
{
    "shopId": "weapon_shop",
    "name": "Waffenladen",
    "location": { "x": 22.0, "y": -1107.0, "z": 29.8 },
    "items": [
        { "itemId": "weapon_pistol", "name": "Pistole", "price": 500, "type": "weapon", "ammo": 50 },
        { "itemId": "weapon_rifle", "name": "Gewehr", "price": 1000, "type": "weapon", "ammo": 100 }
    ]
}
```

## 2. Dateistruktur erweitern

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── weapon_shop/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── weapons.js
│   │   ├── database.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Waffenshop

### weapon_shop/index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Waffenladen</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="weaponShop">
        <h1>Waffenladen</h1>
        <ul id="weaponList"></ul>
        <button id="buyWeapon">Kaufen</button>
        <button id="closeShop">Schließen</button>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

### weapon_shop/css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
}
#weaponShop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: rgba(50, 50, 50, 0.9);
    border-radius: 10px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin: 5px 0;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background: #ff4500;
}
```

### weapon_shop/js/main.js

```javascript
let weaponShopBrowser;

mp.events.add('showWeaponShop', (weapons) => {
    weaponShopBrowser = mp.browsers.new('package://ui/weapon_shop/index.html');
    mp.gui.cursor.show(true, true);
    weapons = JSON.parse(weapons);
    let weaponList = document.getElementById('weaponList');
    weaponList.innerHTML = '';
    weapons.forEach(weapon => {
        let li = document.createElement('li');
        li.innerHTML = `${weapon.name} ($${weapon.price}, Munition: ${weapon.ammo}) <input type="radio" name="weapon" value="${weapon.itemId}">`;
        weaponList.appendChild(li);
    });
});

document.getElementById('buyWeapon').addEventListener('click', () => {
    const selectedWeapon = document.querySelector('input[name="weapon"]:checked');
    if (selectedWeapon) {
        mp.events.callRemote('buyWeapon', selectedWeapon.value);
    }
});

document.getElementById('closeShop').addEventListener('click', () => {
    weaponShopBrowser.destroy();
    mp.gui.cursor.show(false, false);
});
```

## 4. Server-seitige Logik mit MongoDB

### database.js (wiederverwendet)

```javascript
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // Oder MongoDB Atlas URL
const dbName = 'rp_server';
let db;

async function connectDB() {
    const client = new MongoClient(url, { useUnifiedTopology: true });
    await client.connect();
    console.log('MongoDB verbunden');
    db = client.db(dbName);
    return db;
}

module.exports = { connectDB, getDB: () => db };
```

### weapons.js

```javascript
const { getDB } = require('./database.js');

// Initialisiere Waffenshop
async function initWeaponShops() {
    const db = getDB();
    const shopExists = await db.collection('weapon_shops').findOne({ shopId: 'weapon_shop' });
    if (!shopExists) {
        await db.collection('weapon_shops').insertOne({
            shopId: 'weapon_shop',
            name: 'Waffenladen',
            location: { x: 22.0, y: -1107.0, z: 29.8 },
            items: [
                { itemId: 'weapon_pistol', name: 'Pistole', price: 500, type: 'weapon', ammo: 50 },
                { itemId: 'weapon_rifle', name: 'Gewehr', price: 1000, type: 'weapon', ammo: 100 }
            ]
        });
    }
}

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (shape.shopId === 'weapon_shop') {
        const db = getDB();
        const shop = await db.collection('weapon_shops').findOne({ shopId: 'weapon_shop' });
        player.call('showWeaponShop', [JSON.stringify(shop.items)]);
    }
});

mp.events.add('buyWeapon', async (player, itemId) => {
    const db = getDB();
    const shop = await db.collection('weapon_shops').findOne({ shopId: 'weapon_shop' });
    const weapon = shop.items.find(i => i.itemId === itemId);
    if (!weapon) {
        player.outputChatBox('Waffe nicht verfügbar.');
        return;
    }
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    if (playerDoc.money < weapon.price) {
        player.outputChatBox('Nicht genug Geld.');
        return;
    }
    const inventory = playerDoc.inventory || [];
    const existingWeapon = inventory.find(i => i.itemId === itemId);
    if (existingWeapon) {
        existingWeapon.ammo += weapon.ammo;
    } else {
        inventory.push({ ...weapon, quantity: 1 });
    }
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { money: playerDoc.money - weapon.price, inventory } }
    );
    player.giveWeapon(mp.joaat(itemId), weapon.ammo);
    player.outputChatBox(`Du hast ${weapon.name} für $${weapon.price} gekauft.`);
});

mp.events.add('useItem', async (player, itemId) => {
    const db = getDB();
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    const inventory = playerDoc.inventory || [];
    const item = inventory.find(i => i.itemId === itemId);
    if (!item || item.quantity <= 0) {
        player.outputChatBox('Gegenstand nicht gefunden oder leer.');
        return;
    }
    if (item.type === 'weapon') {
        player.giveWeapon(mp.joaat(itemId), item.ammo);
        player.outputChatBox(`Du hast ${item.name} ausgerüstet.`);
    }
});

// Shop-Colshape
mp.events.add('packagesLoaded', async () => {
    await initWeaponShops();
    const db = getDB();
    const shop = await db.collection('weapon_shops').findOne({ shopId: 'weapon_shop' });
    mp.colshapes.newSphere(shop.location.x, shop.location.y, shop.location.z, 3.0).shopId = 'weapon_shop';
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./weapons.js');
});
```

## 5. Testen

1. Installiere `mongodb`: `npm install mongodb`.
2. Starte MongoDB und den Server.
3. Gehe zum Waffenshop (Koordinaten: 22.0, -1107.0, 29.8).
4. Kaufe eine Waffe und überprüfe das Inventar (`I`).
5. Teste das Ausrüsten der Waffe. Überprüfe die `players`- und `weapon_shops`-Collections.

## 6. Erweiterungen

- **Waffenlizenzen**: Verknüpfe mit [Lizensen-Tutorial.md](#) für rechtliche RP-Beschränkungen.
- **Munitionssystem**: Trenne Munition und Waffen in der UI.
- **Waffenmodifikationen**: Füge Anbauteile (z. B. Schalldämpfer) hinzu.

---

### 2. Lizensen-Tutorial.md (angepasst für MongoDB)

<xaiArtifact artifact_id="287f25ec-c092-4479-9195-a1d8ed4b0f66" artifact_version_id="7ff2a36a-bc93-48bc-92ea-a638103276d7" title="Lizensen-Tutorial.md" contentType="text/markdown">

# Tutorial: Lizenzsystem für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial zeigt, wie du ein Lizenzsystem für deinen RageMP Roleplay-Server erstellst, das Spielern erlaubt, Lizenzen (z. B. Führerschein, Waffenschein) zu erwerben. Die Daten werden in MongoDB gespeichert, und ein CEF-UI ermöglicht den Kauf und die Verwaltung von Lizenzen.

## Voraussetzungen

- RageMP-Server mit Struktur wie in [Dateistruktur.md](#).
- MongoDB-Server und `mongodb`-Modul (`npm install mongodb`).
- Grundkenntnisse in JavaScript, HTML, CSS und MongoDB.

## 1. MongoDB einrichten

Füge ein `licenses`-Feld zur `players`-Collection hinzu.

### Beispiel: `players`-Collection

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "licenses": [
        { "licenseId": "drivers_license", "name": "Führerschein", "acquired": "2025-09-06T02:48:00Z" },
        { "licenseId": "weapon_license", "name": "Waffenschein", "acquired": "2025-09-06T02:48:00Z" }
    ]
}
```

## 2. Dateistruktur erweitern

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── licenses/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── licenses.js
│   │   ├── database.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Lizenzen

### licenses/index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Lizenzen</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="licenses">
        <h1>Lizenzen</h1>
        <h2>Deine Lizenzen</h2>
        <ul id="playerLicenses"></ul>
        <h2>Verfügbare Lizenzen</h2>
        <ul id="availableLicenses"></ul>
        <button id="buyLicense">Lizenz kaufen</button>
        <button id="closeLicenses">Schließen</button>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

### licenses/css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
}
#licenses {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: rgba(50, 50, 50, 0.9);
    border-radius: 10px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin: 5px 0;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background: #ff4500;
}
```

### licenses/js/main.js

```javascript
let licenseBrowser;

mp.events.add('showLicenses', (playerLicenses, availableLicenses) => {
    licenseBrowser = mp.browsers.new('package://ui/licenses/index.html');
    mp.gui.cursor.show(true, true);
    playerLicenses = JSON.parse(playerLicenses);
    availableLicenses = JSON.parse(availableLicenses);
    let playerList = document.getElementById('playerLicenses');
    let availableList = document.getElementById('availableLicenses');
    playerList.innerHTML = playerLicenses.length ? '' : '<li>Keine Lizenzen</li>';
    playerLicenses.forEach(license => {
        let li = document.createElement('li');
        li.innerText = `${license.name} (Erworben: ${new Date(license.acquired).toLocaleDateString()})`;
        playerList.appendChild(li);
    });
    availableList.innerHTML = '';
    availableLicenses.forEach(license => {
        let li = document.createElement('li');
        li.innerHTML = `${license.name} ($${license.price}) <input type="radio" name="license" value="${license.licenseId}">`;
        availableList.appendChild(li);
    });
});

document.getElementById('buyLicense').addEventListener('click', () => {
    const selectedLicense = document.querySelector('input[name="license"]:checked');
    if (selectedLicense) {
        mp.events.callRemote('buyLicense', selectedLicense.value);
    }
});

document.getElementById('closeLicenses').addEventListener('click', () => {
    licenseBrowser.destroy();
    mp.gui.cursor.show(false, false);
});
```

## 4. Server-seitige Logik mit MongoDB

### licenses.js

```javascript
const { getDB } = require('./database.js');

const availableLicenses = [
    { licenseId: 'drivers_license', name: 'Führerschein', price: 200 },
    { licenseId: 'weapon_license', name: 'Waffenschein', price: 1000 }
];

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (shape.shopId === 'license_office') {
        const db = getDB();
        const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
        const playerLicenses = playerDoc?.licenses || [];
        player.call('showLicenses', [JSON.stringify(playerLicenses), JSON.stringify(availableLicenses)]);
    }
});

mp.events.add('buyLicense', async (player, licenseId) => {
    const db = getDB();
    const license = availableLicenses.find(l => l.licenseId === licenseId);
    if (!license) {
        player.outputChatBox('Lizenz nicht verfügbar.');
        return;
    }
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    if (playerDoc.licenses?.find(l => l.licenseId === licenseId)) {
        player.outputChatBox('Du besitzt diese Lizenz bereits.');
        return;
    }
    if (playerDoc.money < license.price) {
        player.outputChatBox('Nicht genug Geld.');
        return;
    }
    const licenses = playerDoc.licenses || [];
    licenses.push({ ...license, acquired: new Date() });
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { money: playerDoc.money - license.price, licenses } }
    );
    player.outputChatBox(`Du hast den ${license.name} für $${license.price} gekauft.`);
    player.call('showLicenses', [JSON.stringify(licenses), JSON.stringify(availableLicenses)]);
});

mp.events.add('packagesLoaded', () => {
    mp.colshapes.newSphere(441.0, -978.0, 30.7, 3.0).shopId = 'license_office';
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./licenses.js');
});
```

## 5. Testen

1. Installiere `mongodb`: `npm install mongodb`.
2. Gehe zum Lizenzbüro (Koordinaten: 441.0, -978.0, 30.7).
3. Kaufe eine Lizenz und überprüfe die `players`-Collection.
4. Teste die UI und Fehlermeldungen.

## 6. Erweiterungen

- **Lizenzprüfung**: Verknüpfe mit dem Waffensystem (z. B. Waffenkauf nur mit Waffenschein).
- **Ablaufdatum**: Füge ein Ablaufdatum für Lizenzen hinzu.
- **Behörden**: Implementiere Polizei-Checks für Lizenzen.

---

### 3. Tuningsystem-und-shop-Tutorial.md (angepasst für MongoDB)

<xaiArtifact artifact_id="a3f2cae3-a0e0-4be0-b6ad-1feeccf2f0b1" artifact_version_id="e7d6c8f6-b1f6-4ba0-b370-31f64e364431" title="Tuningsystem-und-shop-Tutorial.md" contentType="text/markdown">

# Tutorial: Tuningsystem und Shop für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial zeigt, wie du ein Tuningsystem mit einem Shop für Fahrzeuge in deinem RageMP Roleplay-Server implementierst. Spieler können Fahrzeuge tunen (z. B. Farbe, Spoiler) und die Änderungen werden in MongoDB gespeichert. Ein CEF-UI ermöglicht den Kauf von Tuningteilen.

## Voraussetzungen

- RageMP-Server mit Struktur wie in [Dateistruktur.md](#).
- MongoDB-Server und `mongodb`-Modul (`npm install mongodb`).
- Grundkenntnisse in JavaScript, HTML, CSS und MongoDB.

## 1. MongoDB einrichten

Erweitere die `players`-Collection um ein `vehicles`-Feld für Fahrzeugdaten.

### Beispiel: `players`-Collection

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "vehicles": [
        {
            "vehicleId": "vehicle1",
            "model": "elegy",
            "tuning": {
                "color": { "r": 255, "g": 0, "b": 0 },
                "spoiler": 1
            }
        }
    ]
}
```

### Beispiel: `tuning_shops`-Collection

```json
{
    "shopId": "tuning_shop",
    "name": "Tuning Shop",
    "location": { "x": -205.0, "y": -1309.0, "z": 31.3 },
    "items": [
        { "itemId": "color_red", "name": "Rote Farbe", "price": 200, "type": "color", "value": { "r": 255, "g": 0, "b": 0 } },
        { "itemId": "spoiler_1", "name": "Spoiler 1", "price": 500, "type": "spoiler", "value": 1 }
    ]
}
```

## 2. Dateistruktur erweitern

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── tuning_shop/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── tuning.js
│   │   ├── database.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Tuning-Shop

### tuning_shop/index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Tuning Shop</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="tuningShop">
        <h1>Tuning Shop</h1>
        <ul id="tuningItems"></ul>
        <button id="buyTuning">Kaufen</button>
        <button id="closeShop">Schließen</button>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

### tuning_shop/css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
}
#tuningShop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: rgba(50, 50, 50, 0.9);
    border-radius: 10px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin: 5px 0;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background: #ff4500;
}
```

### tuning_shop/js/main.js

```javascript
let tuningShopBrowser;

mp.events.add('showTuningShop', (items) => {
    tuningShopBrowser = mp.browsers.new('package://ui/tuning_shop/index.html');
    mp.gui.cursor.show(true, true);
    items = JSON.parse(items);
    let tuningList = document.getElementById('tuningItems');
    tuningList.innerHTML = '';
    items.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `${item.name} ($${item.price}) <input type="radio" name="tuning" value="${item.itemId}">`;
        tuningList.appendChild(li);
    });
});

document.getElementById('buyTuning').addEventListener('click', () => {
    const selectedTuning = document.querySelector('input[name="tuning"]:checked');
    if (selectedTuning) {
        mp.events.callRemote('buyTuning', selectedTuning.value);
    }
});

document.getElementById('closeShop').addEventListener('click', () => {
    tuningShopBrowser.destroy();
    mp.gui.cursor.show(false, false);
});
```

## 4. Server-seitige Logik mit MongoDB

### tuning.js

```javascript
const { getDB } = require('./database.js');

async function initTuningShops() {
    const db = getDB();
    const shopExists = await db.collection('tuning_shops').findOne({ shopId: 'tuning_shop' });
    if (!shopExists) {
        await db.collection('tuning_shops').insertOne({
            shopId: 'tuning_shop',
            name: 'Tuning Shop',
            location: { x: -205.0, y: -1309.0, z: 31.3 },
            items: [
                { itemId: 'color_red', name: 'Rote Farbe', price: 200, type: 'color', value: { r: 255, g: 0, b: 0 } },
                { itemId: 'spoiler_1', name: 'Spoiler 1', price: 500, type: 'spoiler', value: 1 }
            ]
        });
    }
}

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (shape.shopId === 'tuning_shop' && player.vehicle) {
        const db = getDB();
        const shop = await db.collection('tuning_shops').findOne({ shopId: 'tuning_shop' });
        player.call('showTuningShop', [JSON.stringify(shop.items)]);
    }
});

mp.events.add('buyTuning', async (player, itemId) => {
    if (!player.vehicle) {
        player.outputChatBox('Du musst in einem Fahrzeug sein.');
        return;
    }
    const db = getDB();
    const shop = await db.collection('tuning_shops').findOne({ shopId: 'tuning_shop' });
    const item = shop.items.find(i => i.itemId === itemId);
    if (!item) {
        player.outputChatBox('Tuningteil nicht verfügbar.');
        return;
    }
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    if (playerDoc.money < item.price) {
        player.outputChatBox('Nicht genug Geld.');
        return;
    }
    const vehicles = playerDoc.vehicles || [];
    const vehicle = vehicles.find(v => v.vehicleId === player.vehicle.id.toString());
    if (!vehicle) {
        vehicles.push({ vehicleId: player.vehicle.id.toString(), model: player.vehicle.modelName, tuning: {} });
    }
    const targetVehicle = vehicles.find(v => v.vehicleId === player.vehicle.id.toString());
    targetVehicle.tuning[item.type] = item.value;
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { money: playerDoc.money - item.price, vehicles } }
    );
    if (item.type === 'color') {
        player.vehicle.setColorRGB(item.value.r, item.value.g, item.value.b);
    } else if (item.type === 'spoiler') {
        player.vehicle.setMod(0, item.value);
    }
    player.outputChatBox(`Du hast ${item.name} für $${item.price} gekauft.`);
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./tuning.js');
});
```

## 5. Testen

1. Installiere `mongodb`: `npm install mongodb`.
2. Fahre ein Fahrzeug zum Tuning-Shop (Koordinaten: -205.0, -1309.0, 31.3).
3. Kaufe ein Tuningteil und überprüfe die `players`-Collection.
4. Teste die UI und Fahrzeugänderungen.

## 6. Erweiterungen

- **Mehr Tuningoptionen**: Füge Felgen, Fenster oder Lackierungen hinzu.
- **Fahrzeugbesitz**: Verknüpfe mit einem Fahrzeugkaufsystem.
- **Vorschau**: Zeige Tuningänderungen in Echtzeit.

---

### 4. Jobs-Tutorial.md (angepasst für MongoDB)

<xaiArtifact artifact_id="8346151c-f7ee-48f6-8db3-4e1cd5c508bf" artifact_version_id="78b9bbfd-6c97-40c6-8a49-05437a8420b5" title="Jobs-Tutorial.md" contentType="text/markdown">

# Tutorial: Job-System für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial zeigt, wie du ein Job-System für deinen RageMP Roleplay-Server erstellst, das Spielern erlaubt, Jobs (z. B. Taxifahrer, Polizist) anzunehmen und Aufgaben zu erfüllen. Die Daten werden in MongoDB gespeichert, und ein CEF-UI zeigt verfügbare Jobs an.

## Voraussetzungen

- RageMP-Server mit Struktur wie in [Dateistruktur.md](#).
- MongoDB-Server und `mongodb`-Modul (`npm install mongodb`).
- Grundkenntnisse in JavaScript, HTML, CSS und MongoDB.

## 1. MongoDB einrichten

Erweitere die `players`-Collection um ein `job`-Feld und erstelle eine `jobs`-Collection.

### Beispiel: `players`-Collection

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "job": { "jobId": "taxi", "name": "Taxifahrer", "level": 1 }
}
```

### Beispiel: `jobs`-Collection

```json
{
    "jobId": "taxi",
    "name": "Taxifahrer",
    "location": { "x": 895.0, "y": -179.0, "z": 74.7 },
    "tasks": [
        { "taskId": "taxi_task_1", "description": "Fahre Kunden", "reward": 100 }
    ]
}
```

## 2. Dateistruktur erweitern

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── jobs/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── jobs.js
│   │   ├── database.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Jobs

### jobs/index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Jobs</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="jobs">
        <h1>Job-Center</h1>
        <h2>Dein Job: <span id="currentJob">Keiner</span></h2>
        <h2>Verfügbare Jobs</h2>
        <ul id="jobList"></ul>
        <button id="takeJob">Job annehmen</button>
        <button id="closeJobs">Schließen</button>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

### jobs/css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
}
#jobs {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: rgba(50, 50, 50, 0.9);
    border-radius: 10px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin: 5px 0;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background: #ff4500;
}
```

### jobs/js/main.js

```javascript
let jobBrowser;

mp.events.add('showJobs', (currentJob, availableJobs) => {
    jobBrowser = mp.browsers.new('package://ui/jobs/index.html');
    mp.gui.cursor.show(true, true);
    currentJob = JSON.parse(currentJob);
    availableJobs = JSON.parse(availableJobs);
    document.getElementById('currentJob').innerText = currentJob?.name || 'Keiner';
    let jobList = document.getElementById('jobList');
    jobList.innerHTML = '';
    availableJobs.forEach(job => {
        let li = document.createElement('li');
        li.innerHTML = `${job.name} <input type="radio" name="job" value="${job.jobId}">`;
        jobList.appendChild(li);
    });
});

document.getElementById('takeJob').addEventListener('click', () => {
    const selectedJob = document.querySelector('input[name="job"]:checked');
    if (selectedJob) {
        mp.events.callRemote('takeJob', selectedJob.value);
    }
});

document.getElementById('closeJobs').addEventListener('click', () => {
    jobBrowser.destroy();
    mp.gui.cursor.show(false, false);
});
```

## 4. Server-seitige Logik mit MongoDB

### jobs.js

```javascript
const { getDB } = require('./database.js');

async function initJobs() {
    const db = getDB();
    const jobExists = await db.collection('jobs').findOne({ jobId: 'taxi' });
    if (!jobExists) {
        await db.collection('jobs').insertOne({
            jobId: 'taxi',
            name: 'Taxifahrer',
            location: { x: 895.0, y: -179.0, z: 74.7 },
            tasks: [
                { taskId: 'taxi_task_1', description: 'Fahre Kunden', reward: 100 }
            ]
        });
    }
}

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (shape.jobId === 'job_center') {
        const db = getDB();
        const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
        const jobs = await db.collection('jobs').find().toArray();
        player.call('showJobs', [JSON.stringify(playerDoc.job || {}), JSON.stringify(jobs)]);
    }
});

mp.events.add('takeJob', async (player, jobId) => {
    const db = getDB();
    const job = await db.collection('jobs').findOne({ jobId });
    if (!job) {
        player.outputChatBox('Job nicht verfügbar.');
        return;
    }
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { job: { jobId, name: job.name, level: 1 } } }
    );
    player.outputChatBox(`Du bist jetzt ${job.name}!`);
    player.call('showJobs', [JSON.stringify(job), JSON.stringify(await db.collection('jobs').find().toArray())]);
});

// Job-Colshape
mp.events.add('packagesLoaded', async () => {
    await initJobs();
    mp.colshapes.newSphere(895.0, -179.0, 74.7, 3.0).jobId = 'job_center';
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./jobs.js');
});
```

## 5. Testen

1. Installiere `mongodb`: `npm install mongodb`.
2. Gehe zum Job-Center (Koordinaten: 895.0, -179.0, 74.7).
3. Nimm einen Job an und überprüfe die `players`-Collection.
4. Teste die UI und Fehlermeldungen.

## 6. Erweiterungen

- **Job-Aufgaben**: Implementiere Aufgaben (z. B. Kunden-Transport für Taxifahrer).
- **Job-Level**: Füge Fortschritt und Belohnungen hinzu.
- **Fraktionen**: Verknüpfe Jobs mit Fraktionen (z. B. Polizei).

---

## Zusammenfassung

- **Waffen-Tutorial.md**: Implementiert ein Waffensystem mit Shop und Inventar-Integration.
- **Lizensen-Tutorial.md**: Erstellt ein System für den Kauf und die Verwaltung von Lizenzen.
- **Tuningsystem-und-shop-Tutorial.md**: Ermöglicht Fahrzeug-Tuning mit persistenten Daten.
- **Jobs-Tutorial.md**: Fügt ein Job-System mit Job-Center und Aufgaben hinzu.

### Testanweisungen

1. Installiere MongoDB und Module (`npm install mongodb`).
2. Starte MongoDB und den Server (`ragemp-server.exe` oder `./ragemp-server`).
3. Teste jedes System an den angegebenen Koordinaten und überprüfe die MongoDB-Collections.
4. Prüfe Logs (`.settings/logs/`) bei Fehlern.

Für weitere Hilfe besuche die [RageMP-Wiki](https://wiki.rage.mp/) oder [MongoDB-Dokumentation](https://docs.mongodb.com/).