# Tutorial: Inventar- und Shopsystem für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial erklärt, wie du ein Inventar- und Shopsystem für einen RageMP Roleplay-Server implementierst, das mit MongoDB als Datenbank arbeitet. Das System ermöglicht Spielern, Gegenstände zu speichern, zu kaufen und zu verwenden, mit einer CEF-basierten Benutzeroberfläche (UI) für Inventar und Shop. Es integriert sich in die bestehende Struktur (siehe [Dateistruktur.md](#)) und nutzt MongoDB für die Persistenz von Inventardaten. Das Tutorial ist für Anfänger und Fortgeschrittene geeignet und basiert auf RageMP-Dokumentation und Community-Best-Practices.

## Voraussetzungen

- Ein laufender RageMP-Server (siehe [Tutorial.md](#)).
- MongoDB-Server (lokal oder MongoDB Atlas) installiert und erreichbar.
- Node.js und die Module `mongodb` und `bcrypt` (`npm install mongodb bcrypt` im Server-Ordner).
- Grundkenntnisse in JavaScript, HTML, CSS und MongoDB.
- Vorhandene Authentifizierung (siehe [Login-und-register-tutorial.md](#)) und Charaktererstellung (siehe [charcreator-tutorial.md](#)).
- Dateistruktur wie in [Dateistruktur.md](#) beschrieben.

## 1. MongoDB einrichten

Nutze die bestehende `rp_server`-Datenbank und erweitere die `players`-Collection, um Inventardaten zu speichern. Füge ein `inventory`-Feld hinzu, das ein Array von Gegenständen enthält, und eine `shops`-Collection für Shop-Daten.

### Beispiel: `players`-Collection

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "money": 1000,
    "job": "Keiner",
    "inventory": [
        { "itemId": "apple", "name": "Apfel", "quantity": 5, "type": "food" },
        { "itemId": "water", "name": "Wasser", "quantity": 2, "type": "drink" }
    ]
}
```

### Beispiel: `shops`-Collection

```json
{
    "shopId": "general_store",
    "name": "Allgemeiner Laden",
    "location": { "x": 25.0, "y": -134.0, "z": 69.0 },
    "items": [
        { "itemId": "apple", "name": "Apfel", "price": 5, "type": "food" },
        { "itemId": "water", "name": "Wasser", "price": 10, "type": "drink" }
    ]
}
```

Die `shops`-Collection definiert verfügbare Shops und deren Inventar. Du kannst später weitere Shops hinzufügen (z. B. Waffenshop).

## 2. Dateistruktur erweitern

Erweitere die Struktur in `server-files/`:

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── inventory/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   │   ├── shop/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── inventory.js
│   │   ├── shop.js
│   │   ├── database.js
│   │   └── events.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Inventar und Shop

### Inventar-UI (`client_packages/ui/inventory/`)

#### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Inventar</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="inventory">
        <h1>Inventar</h1>
        <ul id="itemList"></ul>
        <button id="useItem">Gegenstand verwenden</button>
        <button id="closeInventory">Schließen</button>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

#### css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
}
#inventory {
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

#### js/main.js

```javascript
let inventoryBrowser;

mp.events.add('showInventory', (items) => {
    inventoryBrowser = mp.browsers.new('package://ui/inventory/index.html');
    mp.gui.cursor.show(true, true);
    items = JSON.parse(items);
    let itemList = document.getElementById('itemList');
    itemList.innerHTML = '';
    items.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `${item.name} (x${item.quantity}) <input type="radio" name="item" value="${item.itemId}">`;
        itemList.appendChild(li);
    });
});

document.getElementById('useItem').addEventListener('click', () => {
    const selectedItem = document.querySelector('input[name="item"]:checked');
    if (selectedItem) {
        mp.events.callRemote('useItem', selectedItem.value);
    }
});

document.getElementById('closeInventory').addEventListener('click', () => {
    inventoryBrowser.destroy();
    mp.gui.cursor.show(false, false);
});

// Tastenkürzel für Inventar (z. B. I)
mp.keys.bind(0x49, true, () => {
    mp.events.callRemote('requestInventory');
});
```

### Shop-UI (`client_packages/ui/shop/`)

#### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Shop</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="shop">
        <h1>Shop</h1>
        <ul id="shopItems"></ul>
        <button id="buyItem">Kaufen</button>
        <button id="closeShop">Schließen</button>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

#### css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
}
#shop {
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

#### js/main.js

```javascript
let shopBrowser;

mp.events.add('showShop', (shopItems) => {
    shopBrowser = mp.browsers.new('package://ui/shop/index.html');
    mp.gui.cursor.show(true, true);
    shopItems = JSON.parse(shopItems);
    let shopItemsList = document.getElementById('shopItems');
    shopItemsList.innerHTML = '';
    shopItems.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `${item.name} ($${item.price}) <input type="radio" name="item" value="${item.itemId}">`;
        shopItemsList.appendChild(li);
    });
});

document.getElementById('buyItem').addEventListener('click', () => {
    const selectedItem = document.querySelector('input[name="item"]:checked');
    if (selectedItem) {
        mp.events.callRemote('buyItem', selectedItem.value);
    }
});

document.getElementById('closeShop').addEventListener('click', () => {
    shopBrowser.destroy();
    mp.gui.cursor.show(false, false);
});
```

## 4. Server-seitige Logik mit MongoDB

Implementiere die Inventar- und Shop-Logik in `packages/roleplay/`.

### database.js

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

### inventory.js

```javascript
const { getDB } = require('./database.js');

mp.events.add('requestInventory', async (player) => {
    const db = getDB();
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    const inventory = playerDoc?.inventory || [];
    player.call('showInventory', [JSON.stringify(inventory)]);
});

mp.events.add('useItem', async (player, itemId) => {
    const db = getDB();
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    const inventory = playerDoc?.inventory || [];
    const item = inventory.find(i => i.itemId === itemId);
    if (!item || item.quantity <= 0) {
        player.outputChatBox('Gegenstand nicht gefunden oder leer.');
        return;
    }
    item.quantity -= 1;
    if (item.quantity === 0) {
        inventory.splice(inventory.indexOf(item), 1);
    }
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { inventory } }
    );
    player.outputChatBox(`Du hast ${item.name} verwendet.`);
    player.call('showInventory', [JSON.stringify(inventory)]);
    // Beispiel: Effekt des Gegenstands
    if (item.type === 'food') {
        player.health = Math.min(player.health + 20, 100);
    }
});
```

### shop.js

```javascript
const { getDB } = require('./database.js');

// Beispiel-Shop initialisieren
async function initShops() {
    const db = getDB();
    const shopExists = await db.collection('shops').findOne({ shopId: 'general_store' });
    if (!shopExists) {
        await db.collection('shops').insertOne({
            shopId: 'general_store',
            name: 'Allgemeiner Laden',
            location: { x: 25.0, y: -134.0, z: 69.0 },
            items: [
                { itemId: 'apple', name: 'Apfel', price: 5, type: 'food' },
                { itemId: 'water', name: 'Wasser', price: 10, type: 'drink' }
            ]
        });
    }
}

mp.events.add('playerEnterColshape', async (player, shape) => {
    if (shape.shopId) {
        const db = getDB();
        const shop = await db.collection('shops').findOne({ shopId: shape.shopId });
        player.call('showShop', [JSON.stringify(shop.items)]);
    }
});

mp.events.add('buyItem', async (player, itemId) => {
    const db = getDB();
    const shop = await db.collection('shops').findOne({ shopId: 'general_store' });
    const item = shop.items.find(i => i.itemId === itemId);
    if (!item) {
        player.outputChatBox('Gegenstand nicht im Shop verfügbar.');
        return;
    }
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    if (playerDoc.money < item.price) {
        player.outputChatBox('Nicht genug Geld.');
        return;
    }
    const inventory = playerDoc.inventory || [];
    const existingItem = inventory.find(i => i.itemId === itemId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        inventory.push({ ...item, quantity: 1 });
    }
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { money: playerDoc.money - item.price, inventory } }
    );
    player.outputChatBox(`Du hast ${item.name} für $${item.price} gekauft.`);
    player.call('showInventory', [JSON.stringify(inventory)]);
});

// Shop-Colshape beim Serverstart
mp.events.add('packagesLoaded', async () => {
    await initShops();
    const db = getDB();
    const shop = await db.collection('shops').findOne({ shopId: 'general_store' });
    mp.colshapes.newSphere(shop.location.x, shop.location.y, shop.location.z, 3.0).shopId = 'general_store';
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./inventory.js');
    require('./shop.js');
});
```

## 5. Testen

1. Installiere MongoDB-Module: `npm install mongodb`.
2. Starte MongoDB (lokal oder via Atlas).
3. Starte den Server (`ragemp-server.exe` oder `./ragemp-server`).
4. Verbinde dich mit dem RageMP-Client (`127.0.0.1:22005`).
5. Teste:
   - Öffne das Inventar mit der Taste `I`.
   - Gehe zum Shop (Koordinaten: 25.0, -134.0, 69.0) und kaufe einen Gegenstand.
   - Verwende einen Gegenstand und überprüfe die Effekte (z. B. Gesundheit +20).
6. Überprüfe die `players`- und `shops`-Collections in MongoDB (z. B. mit MongoDB Compass).
7. Prüfe Logs bei Fehlern (`.settings/logs/`).

## 6. Erweiterungen

- **Mehr Gegenstände**: Füge Waffen, Werkzeuge oder RP-spezifische Items hinzu.
- **Shop-Typen**: Erstelle spezialisierte Shops (z. B. Waffenshop, Autohändler).
- **Inventar-Limit**: Begrenze die Anzahl oder das Gewicht von Gegenständen.
- **Interaktionen**: Implementiere Item-Drop, Handel zwischen Spielern oder Crafting.
- **UI-Design**: Nutze CSS-Grid für ein besseres Inventar-Layout (siehe [UI-UX-tutorial.md](#)).

## 7. Troubleshooting

- **UI wird nicht angezeigt**: Überprüfe den Pfad in `mp.browsers.new` und die Browser-Konsole (F12 im Spiel).
- **Datenbankfehler**: Stelle sicher, dass MongoDB läuft und die URL korrekt ist.
- **Colshape-Probleme**: Überprüfe die Koordinaten und die Reichweite des Colshapes.
- **Performance**: Minimiere die Größe von `client_packages/` für schnelle Downloads.

## 8. Ressourcen

- [RageMP-Wiki](https://wiki.rage.mp/) für Events und CEF-Dokumentation.
- [MongoDB Docs](https://docs.mongodb.com/) für Datenbank-Details.
- [rage.mp/forums](https://rage.mp/forums) für Community-Beispiele.

Viel Erfolg mit deinem Inventar- und Shopsystem!