# Tutorial: HUD (Head-Up Display) für einen RageMP Roleplay-Server mit MongoDB

Dieses Tutorial zeigt, wie du ein Head-Up Display (HUD) für deinen RageMP Roleplay-Server erstellst, das Spielerinformationen wie Gesundheit, Geld und Job anzeigt. Die Daten werden in MongoDB gespeichert, um Persistenz zu gewährleisten. Das HUD nutzt ein CEF-basiertes UI.

## Voraussetzungen

- RageMP-Server mit Struktur wie in [Dateistruktur.md](#).
- MongoDB-Server (lokal oder MongoDB Atlas).
- Node.js und das `mongodb`-Modul (`npm install mongodb`).
- Grundkenntnisse in JavaScript, HTML, CSS.

## 1. MongoDB Collection

Füge Felder für `money` und `job` zur `players`-Collection hinzu (wird dynamisch erstellt):

```json
{
    "socialClub": "Spieler123",
    "username": "SpielerName",
    "money": 1000,
    "job": "Keiner"
}
```

## 2. Dateistruktur

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── hud/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── hud.js
│   │   ├── database.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitiges HUD-UI

Das HUD-UI bleibt unverändert.

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>HUD</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="hud">
        <div id="health">Gesundheit: <span id="healthValue">100</span>%</div>
        <div id="money">Geld: $<span id="moneyValue">0</span></div>
        <div id="job">Job: <span id="jobValue">Keiner</span></div>
    </div>
    <script src="js/main.js"></script>
</body>
</html>
```

### css/style.css

```css
#hud {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.7);
    padding: 10px;
    border-radius: 5px;
    color: white;
    font-family: Arial, sans-serif;
}
#health, #money, #job {
    margin: 5px 0;
}
```

### js/main.js

```javascript
let hudBrowser;

mp.events.add('showHUD', () => {
    hudBrowser = mp.browsers.new('package://ui/hud/index.html');
});

mp.events.add('updateHUD', (health, money, job) => {
    if (hudBrowser) {
        hudBrowser.execute(`document.getElementById('healthValue').innerText = '${health}';`);
        hudBrowser.execute(`document.getElementById('moneyValue').innerText = '${money}';`);
        hudBrowser.execute(`document.getElementById('jobValue').innerText = '${job || "Keiner"}';`);
    }
});

mp.events.add('playerDeath', () => {
    if (hudBrowser) hudBrowser.execute(`document.getElementById('hud').style.display = 'none';`);
});

mp.events.add('playerSpawn', () => {
    if (hudBrowser) hudBrowser.execute(`document.getElementById('hud').style.display = 'block';`);
});
```

## 4. Server-seitige Logik mit MongoDB

Passe die HUD-Logik an, um Daten aus MongoDB zu laden.

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

### hud.js

```javascript
const { getDB } = require('./database.js');

mp.events.add('proceedToCharCreator', async (player) => {
    const db = getDB();
    const playerDoc = await db.collection('players').findOne({ socialClub: player.socialClub });
    player.data.money = playerDoc?.money || 1000;
    player.data.job = playerDoc?.job || 'Keiner';
    player.call('showHUD');
    updateHUD(player);
});

mp.events.add('playerSpawn', (player) => {
    updateHUD(player);
});

async function updateHUD(player) {
    player.call('updateHUD', [player.health, player.data.money, player.data.job]);
}

mp.events.addCommand('setjob', async (player, _, job) => {
    const db = getDB();
    player.data.job = job || 'Keiner';
    await db.collection('players').updateOne(
        { socialClub: player.socialClub },
        { $set: { job: player.data.job } }
    );
    updateHUD(player);
});
```

### index.js

```javascript
const { connectDB } = require('./database.js');

connectDB().then(() => {
    require('./hud.js');
});
```

## 5. Testen

1. Installiere `mongodb`: `npm install mongodb`.
2. Starte MongoDB und den Server.
3. Teste das HUD: Wird es nach dem Spawn angezeigt? Ändert sich der Job mit `/setjob`?
4. Überprüfe die `players`-Collection in MongoDB.

## 6. Erweiterungen

- **Datenbank**: Speichere weitere Daten wie Hunger oder Fahrzeug-Status.
- **Animationen**: Füge CSS-Animationen hinzu.
- **Mehr Infos**: Zeige zusätzliche RP-Daten (z. B. Fraktion).

---

### 3. UI-UX-tutorial.md (unverändert, da datenbankunabhängig)

<xaiArtifact artifact_id="56de2f16-6fd8-48d3-a3d9-01df864a2646" artifact_version_id="656d8ebc-cf71-48ad-9ef2-321e3177ee1c" title="UI-UX-tutorial.md" contentType="text/markdown">

# Tutorial: UI/UX-Best-Practices für einen RageMP Roleplay-Server

Dieses Tutorial beschreibt Best-Practices für die Gestaltung von Benutzeroberflächen (UI) und Benutzererfahrung (UX) für RageMP Roleplay-Server, basierend auf CEF (Chromium Embedded Framework). Es deckt Designprinzipien, Performance-Optimierung und Barrierefreiheit ab, um intuitive und ansprechende Interfaces für Spieler zu schaffen. Da die UI/UX-Logik unabhängig von der Datenbank ist, bleibt dieses Tutorial unverändert.

## 1. Grundprinzipien von UI/UX

- **Klarheit**: Interfaces müssen intuitiv sein (z. B. klare Buttons für Login).
- **Konsistenz**: Einheitliches Design (Farben, Schriftarten) über alle UIs.
- **Performance**: Minimierte Ladezeiten, da `client_packages/` an Spieler gesendet wird.
- **Immersion**: UI-Design sollte zur Roleplay-Welt passen (z. B. GTA-ähnliche Ästhetik).
- **Barrierefreiheit**: Unterstütze Tastatur- und Gamepad-Navigation.

## 2. Technische Umsetzung

### Dateistruktur

```
client_packages/
├── ui/
│   ├── shared/
│   │   ├── css/
│   │   │   └── global.css
│   │   └── js/
│   │       └── utils.js
│   ├── login/
│   ├── hud/
│   ├── charcreator/
```

### shared/css/global.css

```css
body {
    font-family: 'Roboto', Arial, sans-serif;
    background: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    user-select: none;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
}
button:hover {
    background: #ff4500;
}
input, select {
    background: #333;
    border: 1px solid #555;
    color: white;
    padding: 5px;
}
```

### shared/js/utils.js

```javascript
function showError(message) {
    mp.gui.chat.push(`[Fehler] ${message}`);
}

function toggleUI(elementId, show) {
    mp.gui.execute(`document.getElementById('${elementId}').style.display = '${show ? 'block' : 'none'}';`);
}
```

## 3. UI-Design-Tipps

- **Farbschema**: Nutze dunkle Hintergründe mit Akzentfarben (z. B. Blau/Orange für GTA-Ästhetik).
- **Schriftarten**: Verwende moderne, klare Schriftarten wie Roboto oder Open Sans.
- **Animationen**: Nutze CSS-Transitions für Buttons und Menüs, aber vermeide Überladung.
- **Responsive Design**: Stelle sicher, dass UIs auf verschiedenen Auflösungen funktionieren (`vw`/`vh` in CSS).
- **Feedback**: Zeige Ladeanimationen oder Fehlermeldungen (z. B. via `mp.gui.chat.push`).

## 4. UX-Best-Practices

- **Einfacher Einstieg**: Zeige das Login-UI direkt beim Join.
- **Navigation**: Unterstütze Maus, Tastatur (`Tab` für Fokus) und Gamepad.
- **Fehlerbehandlung**: Klare Fehlermeldungen (z. B. "Benutzername existiert bereits").
- **Immersion**: Passe UIs an die RP-Welt an (z. B. Polizeicomputer-Design).
- **Performance**: Minimiere Bildgrößen in `client_packages/assets/` und komprimiere JS/CSS.

## 5. Beispiel: Optimierte Login-UI

```javascript
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (document.getElementById('loginForm').style.display === 'block') {
            document.getElementById('loginBtn').click();
        } else {
            document.getElementById('registerBtn').click();
        }
    }
});
```

In `css/style.css`:

```css
#auth {
    animation: fadeIn 0.5s;
}
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
```

## 6. Testen

- Teste UIs auf verschiedenen Auflösungen.
- Überprüfe Performance (keine Lags bei UI-Anzeige).
- Teste mit mehreren Spielern.

## 7. Erweiterungen

- **Themen**: Implementiere Dark/Light-Modes.
- **Interaktive Elemente**: Nutze Canvas für dynamische HUDs.
- **Barrierefreiheit**: Füge Sprachausgabe hinzu.
- **Tools**: Nutze Frameworks wie Vue.js (via CDN).

## 8. Ressourcen

- [RageMP-Wiki](https://wiki.rage.mp/) für CEF-Dokumentation.
- [W3Schools](https://www.w3schools.com/) für HTML/CSS-Grundlagen.
- [MongoDB Docs](https://docs.mongodb.com/) für Datenbank-Details.