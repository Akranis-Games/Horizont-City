# Tutorial: Login- und Registrierungssystem für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial erklärt, wie du ein Login- und Registrierungssystem für einen RageMP Roleplay-Server mit MongoDB als Datenbank erstellst. Es verwendet ein CEF-basiertes UI für die Benutzeroberfläche und serverseitige Logik mit JavaScript, um Spielerdaten (z. B. Benutzername, Passwort) in einer MongoDB-Datenbank zu speichern. Das System ermöglicht neuen Spielern die Registrierung und bestehenden Spielern das Einloggen, bevor sie die Charaktererstellung nutzen (siehe [charcreator-tutorial.md](#)).

## Voraussetzungen

- Ein laufender RageMP-Server (siehe [Tutorial.md](#)).
- MongoDB-Server (lokal oder Cloud, z. B. MongoDB Atlas) installiert und erreichbar.
- Node.js und die Module `mongodb` und `bcrypt` (`npm install mongodb bcrypt` im Server-Ordner).
- Grundkenntnisse in JavaScript, HTML, CSS und MongoDB.
- Dateistruktur wie in [Dateistruktur.md](#) beschrieben.

## 1. MongoDB einrichten

1. Installiere MongoDB lokal oder nutze MongoDB Atlas (Cloud).
2. Erstelle eine Datenbank namens `rp_server`.
3. Erstelle eine Collection `players` (MongoDB erstellt Collections automatisch beim ersten Insert, siehe unten).

Die `players`-Collection wird dokumentenbasiert sein, z. B.:

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "password": "$2b$10$...", // Gehashtes Passwort
    "email": "spieler@example.com",
    "createdAt": "2025-09-06T02:43:00Z"
}
```

## 2. Dateistruktur erweitern

Die Struktur bleibt gleich wie im ursprünglichen Tutorial:

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── login/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── auth.js
│   │   ├── database.js
│   │   └── events.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Login/Registrierung

Die clientseitige UI bleibt unverändert, da sie unabhängig von der Datenbank ist. Hier ist sie zur Referenz:

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Login/Registrierung</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="auth">
        <h1>Willkommen!</h1>
        <div id="loginForm">
            <h2>Login</h2>
            <label>Benutzername: <input type="text" id="loginUsername"></label><br>
            <label>Passwort: <input type="password" id="loginPassword"></label><br>
            <button id="loginBtn">Einloggen</button>
            <p>Kein Konto? <a href="#" id="showRegister">Registrieren</a></p>
        </div>
        <div id="registerForm" style="display: none;">
            <h2>Registrierung</h2>
            <label>Benutzername: <input type="text" id="regUsername"></label><br>
            <label>E-Mail: <input type="email" id="regEmail"></label><br>
            <label>Passwort: <input type="password" id="regPassword"></label><br>
            <button id="registerBtn">Registrieren</button>
            <p>Bereits registriert? <a href="#" id="showLogin">Login</a></p>
        </div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

### css/style.css

```css
body {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-family: Arial, sans-serif;
    text-align: center;
}
#auth {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: rgba(50, 50, 50, 0.9);
    border-radius: 10px;
}
input, button {
    margin: 10px;
    padding: 5px;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}
a {
    color: #1e90ff;
    cursor: pointer;
}
```

### js/main.js

```javascript
let browser;

mp.events.add('showAuth', () => {
    browser = mp.browsers.new('package://ui/login/index.html');
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayHud(false);
    mp.players.local.freezePosition(true);
});

document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    mp.events.callRemote('loginPlayer', username, password);
});

document.getElementById('registerBtn').addEventListener('click', () => {
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    mp.events.callRemote('registerPlayer', username, email, password);
});

document.getElementById('showRegister').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});

mp.events.add('authResponse', (success, message) => {
    mp.gui.chat.push(message);
    if (success) {
        browser.destroy();
        mp.gui.cursor.show(false, false);
        mp.game.ui.displayHud(true);
        mp.players.local.freezePosition(false);
        mp.events.callRemote('proceedToCharCreator');
    }
});
```

## 4. Server-seitige Logik mit MongoDB

Passe die serverseitige Logik an, um MongoDB zu verwenden.

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

### auth.js

```javascript
const { getDB } = require('./database.js');
const bcrypt = require('bcrypt');

mp.events.add('playerJoin', async (player) => {
    player.position = new mp.Vector3(0, 0, 72); // Temporäre Position
    player.dimension = player.id + 1; // Eigene Dimension
    mp.events.callRemote('showAuth');
});

mp.events.add('loginPlayer', async (player, username, password) => {
    const db = getDB();
    const playerDoc = await db.collection('players').findOne({ username });
    if (!playerDoc) {
        mp.events.callRemote('authResponse', false, 'Benutzername oder Passwort falsch.');
        return;
    }
    const match = await bcrypt.compare(password, playerDoc.password);
    if (match && playerDoc.socialClub === player.socialClub) {
        mp.events.callRemote('authResponse', true, 'Erfolgreich eingeloggt!');
    } else {
        mp.events.callRemote('authResponse', false, 'Benutzername oder Passwort falsch.');
    }
});

mp.events.add('registerPlayer', async (player, username, email, password) => {
    const db = getDB();
    const existingPlayer = await db.collection('players').findOne({ username });
    if (existingPlayer) {
        mp.events.callRemote('authResponse', false, 'Benutzername existiert bereits.');
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('players').insertOne({
        socialClub: player.socialClub,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date()
    });
    mp.events.callRemote('authResponse', true, 'Erfolgreich registriert! Du kannst dich jetzt einloggen.');
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./auth.js');
});
```

## 5. Testen

1. Installiere MongoDB-Module: `npm install mongodb bcrypt` im Server-Ordner.
2. Starte MongoDB (lokal oder via Atlas).
3. Starte den Server (`ragemp-server.exe` oder `./ragemp-server`).
4. Verbinde dich mit dem RageMP-Client (`127.0.0.1:22005`).
5. Teste Registrierung und Login. Überprüfe die `players`-Collection in MongoDB (z. B. mit MongoDB Compass).
6. Prüfe Logs bei Fehlern (`.settings/logs/`).

## 6. Erweiterungen

- **Passwort-Wiederherstellung**: Implementiere E-Mail-Funktionen mit einem SMTP-Modul.
- **Sicherheit**: Füge Validierung für Benutzernamen (z. B. Regex) hinzu.
- **Charaktererstellung**: Verknüpfe mit `proceedToCharCreator` (siehe [charcreator-tutorial.md](#)).