# Tutorial: Charakter-Erstellung für einen RageMP Roleplay-Server

Dieses Tutorial erklärt, wie du ein Charakter-Erstellungssystem für einen RageMP Roleplay-Server implementierst, das es Spielern ermöglicht, mehrere Charaktere zu erstellen und ihr Aussehen anzupassen. Es umfasst ein UI (basierend auf CEF), serverseitige Logik für die Speicherung von Charakter-Daten in einer MySQL-Datenbank und clientseitige Skripte für die Anpassung von Charakter-Features wie Kleidung, Frisur und Gesichtszügen. Das Tutorial ist für Anfänger und Fortgeschrittene geeignet und basiert auf der RageMP-Dokumentation sowie Community-Best-Practices.

## Voraussetzungen

- Ein laufender RageMP-Server (siehe [Tutorial.md](#)).
- Grundkenntnisse in JavaScript, HTML, CSS und MySQL.
- Installiertes Node.js und das `mysql`-Modul (`npm install mysql` im Server-Ordner).
- MySQL-Server mit einer Datenbank (z. B. `rp_server`).
- Der Server sollte die in [Dateistruktur.md](#) beschriebene Struktur verwenden.

## 1. Datenbank einrichten

Erstelle eine Tabelle für Charaktere in deiner MySQL-Datenbank, um mehrere Charaktere pro Spieler zu speichern.

1. Verbinde dich mit deinem MySQL-Server (z. B. via phpMyAdmin oder Kommandozeile).
2. Erstelle die Datenbank und Tabelle:

```sql
CREATE DATABASE rp_server;
USE rp_server;

CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    playerSocialClub VARCHAR(50), -- Social Club ID des Spielers
    characterName VARCHAR(50),    -- Name des Charakters
    model VARCHAR(50),            -- Skin-Modell (z. B. mp_m_freemode_01)
    hair INT,                     -- Frisur-ID
    hairColor INT,                -- Haarfarbe-ID
    faceFeatures JSON,            -- JSON für Gesichtszüge
    clothing JSON,                -- JSON für Kleidung
    position JSON,                -- Spawn-Position
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- `playerSocialClub`: Eindeutige ID des Spielers (RageMP verwendet Social Club IDs).
- `faceFeatures` und `clothing`: JSON-Felder für komplexe Anpassungen.
- `position`: Speichert die letzte Position des Charakters.

## 2. Dateistruktur erweitern

Erweitere die bestehende Struktur (`server-files/`) um die Charaktererstellung:

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── charcreator/
│   │   │   ├── index.html
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   └── js/
│   │   │       ├── main.js
│   │   │       └── controls.js
│   ├── events.js
├── packages/
│   ├── roleplay/
│   │   ├── index.js
│   │   ├── charcreator.js
│   │   ├── database.js
│   │   └── events.js
├── conf.json
└── ragemp-server.exe
```

## 3. Client-seitige UI für Charaktererstellung

Erstelle ein CEF-basiertes UI für die Charaktererstellung in `client_packages/ui/charcreator/`.

### index.html

```html
<!DOCTYPE html>
<html>
<head>
    <title>Charaktererstellung</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="charcreator">
        <h1>Charakter erstellen</h1>
        <label>Name: <input type="text" id="charName"></label><br>
        <label>Geschlecht:
            <select id="gender">
                <option value="mp_m_freemode_01">Männlich</option>
                <option value="mp_f_freemode_01">Weiblich</option>
            </select>
        </label><br>
        <label>Frisur:
            <select id="hair"></select> <!-- Wird dynamisch gefüllt -->
        </label><br>
        <label>Haarfarbe:
            <select id="hairColor"></select>
        </label><br>
        <div>
            <h3>Gesichtszüge</h3>
            <label>Nase Breite: <input type="range" id="noseWidth" min="-1" max="1" step="0.1" value="0"></label><br>
            <label>Augenbrauen: <input type="range" id="eyebrows" min="-1" max="1" step="0.1" value="0"></label><br>
        </div>
        <div>
            <h3>Kleidung</h3>
            <label>Hemd: <select id="shirt"></select></label><br>
            <label>Hose: <select id="pants"></select></label><br>
        </div>
        <button id="saveChar">Charakter speichern</button>
        <button id="switchChar">Charakter wechseln</button>
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
#charcreator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: rgba(50, 50, 50, 0.9);
    border-radius: 10px;
}
input, select, button {
    margin: 10px;
    padding: 5px;
}
button {
    background: #1e90ff;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}
```

### js/main.js

```javascript
let browser;

mp.events.add('showCharCreator', () => {
    browser = mp.browsers.new('package://ui/charcreator/index.html');
    mp.gui.cursor.show(true, true);
    mp.game.cam.renderScriptCams(true, false, 0, true, false);
    mp.players.local.position = new mp.Vector3(402.5, -996.5, -99.0); // Charaktererstellung-Position
    mp.players.local.heading = 180;
});

// Dynamisch Frisuren und Kleidung laden
mp.events.add('client:loadCustomizationOptions', (hairOptions, shirtOptions, pantsOptions) => {
    let hairSelect = document.getElementById('hair');
    let shirtSelect = document.getElementById('shirt');
    let pantsSelect = document.getElementById('pants');
    
    hairOptions.forEach((hair, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = `Frisur ${index + 1}`;
        hairSelect.appendChild(option);
    });

    shirtOptions.forEach((shirt, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = `Hemd ${index + 1}`;
        shirtSelect.appendChild(option);
    });

    // Ähnlich für pants
});

// Speichern-Button
document.getElementById('saveChar').addEventListener('click', () => {
    let charData = {
        name: document.getElementById('charName').value,
        model: document.getElementById('gender').value,
        hair: parseInt(document.getElementById('hair').value),
        hairColor: parseInt(document.getElementById('hairColor').value),
        faceFeatures: {
            noseWidth: parseFloat(document.getElementById('noseWidth').value),
            eyebrows: parseFloat(document.getElementById('eyebrows').value)
        },
        clothing: {
            shirt: parseInt(document.getElementById('shirt').value),
            pants: parseInt(document.getElementById('pants').value)
        }
    };
    mp.events.callRemote('saveCharacter', JSON.stringify(charData));
});

// Charakter wechseln
document.getElementById('switchChar').addEventListener('click', () => {
    mp.events.callRemote('showCharacterSelection');
});
```

### js/controls.js

```javascript
// Live-Anpassung der Charakter-Features
mp.events.add('render', () => {
    if (browser) {
        let model = document.getElementById('gender')?.value;
        let hair = parseInt(document.getElementById('hair')?.value);
        let hairColor = parseInt(document.getElementById('hairColor')?.value);
        let noseWidth = parseFloat(document.getElementById('noseWidth')?.value);
        let eyebrows = parseFloat(document.getElementById('eyebrows')?.value);
        let shirt = parseInt(document.getElementById('shirt')?.value);
        let pants = parseInt(document.getElementById('pants')?.value);

        mp.players.local.model = mp.game.joaat(model);
        mp.players.local.setComponentVariation(2, hair, 0, 2); // Frisur
        mp.players.local.setHairColor(hairColor, 0);
        mp.players.local.setFaceFeature(0, noseWidth); // Nase
        mp.players.local.setFaceFeature(5, eyebrows); // Augenbrauen
        mp.players.local.setComponentVariation(3, shirt, 0, 2); // Hemd
        mp.players.local.setComponentVariation(4, pants, 0, 2); // Hose
    }
});
```

## 4. Server-seitige Logik

Implementiere die Charaktererstellung und -auswahl in `packages/roleplay/`.

### database.js

```javascript
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rp_server'
});

connection.connect((err) => {
    if (err) console.error('Datenbankfehler:', err);
    else console.log('Datenbank verbunden');
});

module.exports = connection;
```

### charcreator.js

```javascript
const db = require('./database.js');

mp.events.add('playerJoin', (player) => {
    player.position = new mp.Vector3(402.5, -996.5, -99.0); // Interieur für Charaktererstellung
    player.dimension = player.id + 1; // Eigene Dimension
    mp.events.callRemote('showCharCreator');
});

mp.events.add('saveCharacter', (player, charData) => {
    charData = JSON.parse(charData);
    const query = `INSERT INTO characters (playerSocialClub, characterName, model, hair, hairColor, faceFeatures, clothing, position) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const position = JSON.stringify({ x: 0, y: 0, z: 72 });
    db.query(query, [
        player.socialClub,
        charData.name,
        charData.model,
        charData.hair,
        charData.hairColor,
        JSON.stringify(charData.faceFeatures),
        JSON.stringify(charData.clothing),
        position
    ], (err) => {
        if (err) {
            console.error('Fehler beim Speichern:', err);
            player.outputChatBox('Fehler beim Speichern des Charakters.');
        } else {
            player.outputChatBox('Charakter gespeichert!');
            mp.events.callRemote('showCharacterSelection');
        }
    });
});

mp.events.add('showCharacterSelection', (player) => {
    db.query('SELECT * FROM characters WHERE playerSocialClub = ?', [player.socialClub], (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Charaktere:', err);
            return;
        }
        if (results.length === 0) {
            mp.events.callRemote('showCharCreator');
            return;
        }
        // Sende Liste der Charaktere an Client (z. B. als Dropdown)
        mp.events.callRemote('showCharSelectUI', JSON.stringify(results));
    });
});

mp.events.add('selectCharacter', (player, charId) => {
    db.query('SELECT * FROM characters WHERE id = ?', [charId], (err, result) => {
        if (err || result.length === 0) {
            player.outputChatBox('Charakter nicht gefunden.');
            return;
        }
        const char = result[0];
        player.model = mp.game.joaat(char.model);
        player.setComponentVariation(2, char.hair, 0, 2);
        player.setHairColor(char.hairColor, 0);
        const face = JSON.parse(char.faceFeatures);
        player.setFaceFeature(0, face.noseWidth);
        player.setFaceFeature(5, face.eyebrows);
        const clothing = JSON.parse(char.clothing);
        player.setComponentVariation(3, clothing.shirt, 0, 2);
        player.setComponentVariation(4, clothing.pants, 0, 2);
        const pos = JSON.parse(char.position);
        player.position = new mp.Vector3(pos.x, pos.y, pos.z);
        player.dimension = 0;
        player.outputChatBox(`Willkommen zurück, ${char.characterName}!`);
    });
});
```

### index.js

```javascript
require('./charcreator.js');
require('./database.js');
```

## 5. Charakterauswahl-UI hinzufügen

Erweitere `client_packages/ui/charcreator/` um ein Auswahl-UI.

### index.html (erweitern)

```html
<div id="charSelect" style="display: none;">
    <h1>Charakter auswählen</h1>
    <select id="charList"></select>
    <button id="selectChar">Auswählen</button>
    <button id="newChar">Neuen Charakter erstellen</button>
</div>
```

### js/main.js (erweitern)

```javascript
mp.events.add('showCharSelectUI', (characters) => {
    browser.execute('document.getElementById("charcreator").style.display = "none";');
    browser.execute('document.getElementById("charSelect").style.display = "block";');
    characters = JSON.parse(characters);
    let charList = document.getElementById('charList');
    charList.innerHTML = '';
    characters.forEach(char => {
        let option = document.createElement('option');
        option.value = char.id;
        option.text = char.characterName;
        charList.appendChild(option);
    });
});

document.getElementById('selectChar').addEventListener('click', () => {
    let charId = document.getElementById('charList').value;
    mp.events.callRemote('selectCharacter', charId);
    browser.destroy();
    mp.gui.cursor.show(false, false);
    mp.game.cam.renderScriptCams(false, false, 0, true, false);
});

document.getElementById('newChar').addEventListener('click', () => {
    browser.execute('document.getElementById("charSelect").style.display = "none";');
    browser.execute('document.getElementById("charcreator").style.display = "block";');
});
```

## 6. Testen

1. Starte den Server (`ragemp-server.exe` oder `./ragemp-server`).
2. Verbinde dich mit dem RageMP-Client (`127.0.0.1:22005`).
3. Teste:
   - Wird das Charaktererstellungs-UI beim Join angezeigt?
   - Kannst du Frisuren, Gesichtszüge und Kleidung anpassen?
   - Werden Charaktere in der Datenbank gespeichert?
   - Kannst du zwischen Charakteren wechseln?
4. Überprüfe Logs (`.settings/logs/`) bei Fehlern.

## 7. Erweiterungen für Roleplay

- **Mehr Anpassungen**: Füge weitere Gesichtszüge (z. B. `setFaceFeature`) oder Kleidung (`setComponentVariation`) hinzu.
- **Vorschau-Kamera**: Nutze `mp.game.cam.createCam` für dynamische Kamerabewegungen.
- **Charakter-Limit**: Begrenze die Anzahl der Charaktere pro Spieler in `charcreator.js`.
- **Datenbank-Erweiterung**: Speichere Inventar, Geld oder Jobs in der `characters`-Tabelle.
- **Community-Resources**: Schaue auf [rage.mp/forums](https://rage.mp/forums) für vorgefertigte Charakter-Systeme.

## 8. Troubleshooting

- **UI wird nicht angezeigt**: Überprüfe den Pfad in `mp.browsers.new` und Browser-Konsole (F12 im Spiel).
- **Datenbankfehler**: Stelle sicher, dass MySQL läuft und die Zugangsdaten korrekt sind.
- **Anpassungen fehlerhaft**: Prüfe die IDs für Frisuren/Kleidung (siehe RageMP-Wiki).
- **Performance**: Halte `client_packages/` leicht, da diese Dateien an Spieler gesendet werden.

Für weitere Hilfe besuche die [RageMP-Wiki](https://wiki.rage.mp/) oder frage in der Community. Viel Erfolg mit deinem Roleplay-Server!