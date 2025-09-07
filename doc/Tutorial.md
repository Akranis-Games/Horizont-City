# Tutorial: Einen eigenen Roleplay-Server mit RageMP erstellen

Dieses Tutorial führt dich Schritt für Schritt durch die Erstellung eines eigenen Roleplay-Servers (RP-Servers) mit RageMP. RageMP ist eine Multiplayer-Modifikation für GTA V, die es ermöglicht, benutzerdefinierte Server zu hosten, einschließlich Roleplay-Szenarien, in denen Spieler Charaktere übernehmen und in einer simulierten Welt interagieren. 

**Hinweis:** Dies basiert auf der offiziellen RageMP-Dokumentation und Community-Guides. Stelle sicher, dass du eine legale Kopie von GTA V besitzt. RageMP ist kostenlos und open-source. Das Tutorial ist für Anfänger gedacht und deckt Windows und Linux ab. Für aktuelle Updates schau auf der [RageMP Wiki](https://wiki.rage.mp/) nach.

## 1. Voraussetzungen

Bevor du beginnst, stelle sicher, dass du folgendes hast:

- **GTA V**: Eine legale Version (Steam oder Epic Games). RageMP funktioniert nur mit der PC-Version.
- **RageMP-Client**: Lade den Client von [rage.mp](https://rage.mp/) herunter und installiere ihn.
- **Hardware**: Ein PC/Server mit mindestens 4 GB RAM (empfohlen 8+ GB für mehrere Spieler), guter CPU und Internetverbindung.
- **Software**:
  - Windows: Microsoft Visual C++ Redistributable 2017 (x64). Lade es von [Microsoft](https://aka.ms/vs/15/release/VC_redist.x64.exe).
  - Linux: Debian 10+ oder Ubuntu 18.10+, GCC/G++ 6+.
  - Node.js (für JavaScript-Skripte): Installiere die neueste LTS-Version von [nodejs.org](https://nodejs.org/).
  - Optional: Eine Datenbank wie MySQL für persistente Daten (z. B. Spieler-Accounts).
- **Ports**: Öffne UDP-Port 22005 (Server) und 22006 (HTTP für Client-Packages) in deiner Firewall/Router.
- **Kenntnisse**: Grundlagen in JavaScript (für Skripte), HTML/CSS (für UIs).

## 2. RageMP-Server herunterladen und installieren

### Für Windows:
1. Lade den RageMP-Client von [rage.mp](https://rage.mp/) herunter und installiere ihn (z. B. `RAGEMultiplayer_Setup.exe`).
2. Bearbeite die Datei `RAGEMP/config.xml` und ändere `<prerelease>prerelease</prerelease>` zu `<prerelease>prerelease_server</prerelease>`.
3. Führe `updater.exe` aus, um die Server-Dateien herunterzuladen.
4. Kopiere den Ordner `server_files` an einen sicheren Ort.
5. Ändere die `config.xml` zurück zu `prerelease` und führe `updater.exe` erneut aus, um den Client wiederherzustellen.

### Für Linux:
1. Lade die Server-Dateien mit dem Befehl herunter:
   ```
   wget https://cdn.rage.mp/updater/prerelease/server-files/linux_x64.tar.gz
   ```
2. Entpacke sie:
   ```
   tar -xzf linux_x64.tar.gz
   ```
3. Wechsle in den Ordner:
   ```
   cd ragemp-srv
   ```
4. Mache die Server-Datei ausführbar:
   ```
   chmod +x ragemp-server
   ```

**Tipp:** Für Linux als Daemon einrichten (automatischer Start):
- Verschiebe den Ordner nach `/opt/ragemp-srv`.
- Erstelle `/etc/systemd/system/rageserv.service` mit folgendem Inhalt:
  ```
  [Unit]
  Description=RAGE-MP Dedicated server
  After=network.target
  StartLimitIntervalSec=0

  [Service]
  Type=simple
  Restart=always
  RestartSec=1
  User=root
  WorkingDirectory=/opt/ragemp-srv
  ExecStart=/opt/ragemp-srv/ragemp-server

  [Install]
  WantedBy=multi-user.target
  ```
- Aktiviere und starte: `systemctl enable rageserv && systemctl start rageserv`.

## 3. Server konfigurieren

Im Root-Ordner (`server-files` oder `ragemp-srv`) findest du `conf.json`. Bearbeite sie mit einem Texteditor:

```json
{
  "name": "Mein RP-Server",
  "gamemode": "roleplay",
  "maxplayers": 100,
  "port": 22005,
  "language": "de",
  "announce": true,
  "modules": ["javascript-module"]
}
```

- `name`: Server-Name, der in der Server-Liste erscheint.
- `gamemode`: Setze auf "roleplay" oder deinen Modus.
- `maxplayers`: Maximale Spieleranzahl.
- `announce`: True, um den Server öffentlich zu listen.

Speichere und starte den Server zum Testen (siehe Abschnitt 6).

## 4. Dateistruktur einrichten

Erstelle die folgende Struktur im Root-Ordner (basierend auf typischen RageMP-Setups):

```
server-files/
├── client_packages/
│   ├── index.js  // Einstiegspunkt für Client-Skripte
│   ├── ui/       // Für UIs (z. B. Login-Screen)
│   │   ├── index.html
│   │   ├── css/
│   │   └── js/
│   └── events.js // Client-Events
├── packages/
│   ├── roleplay/ // Dein Gamemode-Ordner
│   │   ├── index.js
│   │   ├── events.js
│   │   ├── commands.js
│   │   └── config.json
├── maps/         // Für Custom-Maps
├── plugins/      // Für DLL-Plugins (z. B. Anti-Cheat)
├── conf.json
└── ragemp-server.exe  // Oder ragemp-server für Linux
```

## 5. Skripte schreiben (JavaScript)

RageMP verwendet JavaScript für Skripte. Client-seitig für UIs und Effekte, Server-seitig für Logik.

### Client-seitig (in `client_packages/`)

- **index.js** (Einstiegspunkt):
  ```javascript
  require('./events.js');
  require('./ui/main.js');  // Wenn du UIs hast
  ```

- **events.js** (Beispiel für Events, z. B. Discord-Status für RP):
  ```javascript
  mp.events.add('setDiscordStatus', (serverName, status) => {
    mp.discord.update(serverName, status);  // z. B. "Spielt als Polizist"
  });

  mp.events.add('playerReady', () => {
    mp.events.call('setDiscordStatus', 'Mein RP-Server', 'Im Roleplay');
  });
  ```

- **UI mit CEF** (z. B. Login-Screen in `ui/`):
  - `index.html`:
    ```html
    <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
      <div id="login">Login: <input type="text" id="username"></div>
      <script src="js/main.js"></script>
    </body>
    </html>
    ```
  - `js/main.js`:
    ```javascript
    // Zeige UI beim Join
    mp.events.add('showLogin', () => {
      mp.gui.browser.execute('document.getElementById("login").style.display = "block";');
    });

    // Sende Login-Daten an Server
    document.getElementById('submit').addEventListener('click', () => {
      let username = document.getElementById('username').value;
      mp.events.callRemote('loginPlayer', username);
    });
    ```
  - Erstelle ein Browser-Objekt im Skript: `let browser = mp.browsers.new('package://ui/index.html');`

Für RP: Nutze das für HUDs (z. B. Gesundheit, Job-Info) oder Charakter-Erstellung.

### Server-seitig (in `packages/roleplay/`)

- **index.js**:
  ```javascript
  require('./events.js');
  require('./commands.js');
  ```

- **events.js** (Beispiel für RP-Features):
  ```javascript
  mp.events.add('playerJoin', (player) => {
    player.outputChatBox('Willkommen im Roleplay! Erstelle deinen Charakter.');
    player.spawn(new mp.Vector3(0, 0, 72));  // Spawn-Point
    mp.events.callRemote('showLogin');  // Zeige Client-UI
  });

  mp.events.add('loginPlayer', (player, username) => {
    // Überprüfe in Datenbank (siehe unten)
    player.name = username;
    player.outputChatBox('Eingeloggt als ' + username);
  });

  mp.events.add('playerDeath', (player) => {
    player.spawn(new mp.Vector3(0, 0, 72));  // Respawn
  });
  ```

- **commands.js** (RP-Commands):
  ```javascript
  mp.events.addCommand('me', (player, message) => {
    mp.players.broadcastInRange(player.position, 10, `* ${player.name} ${message}`);  // /me Aktion
  });

  mp.events.addCommand('job', (player, job) => {
    player.outputChatBox(`Du bist jetzt ${job}!`);  // Einfaches Job-System
  });
  ```

### Datenbank-Integration (z. B. MySQL für Accounts)
1. Installiere MySQL und erstelle eine DB (z. B. "rp_server").
2. In `packages/roleplay/` füge `database.js` hinzu und require es in `index.js`.
3. Verwende `mysql` NPM-Modul (installiere mit `npm install mysql` im Server-Ordner).
   ```javascript
   const mysql = require('mysql');
   const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'rp_server'
   });

   connection.connect();
   // In events.js: connection.query('SELECT * FROM players WHERE name = ?', [username], ...);
   ```

Für RP: Speichere Spieler-Daten wie Geld, Job, Inventar.

## 6. Server starten und testen

- Windows: Führe `ragemp-server.exe` aus.
- Linux: `./ragemp-server`.
- Verbinde dich im RageMP-Client mit `127.0.0.1:22005` (lokal) oder deiner IP.
- Teste: Join, Commands, UIs. Schaue in der Konsole nach Fehlern.

## 7. Erweiterungen für Roleplay

- **Maps**: Füge JSON-Dateien in `maps/` für Custom-Objekte (z. B. RP-Städte).
- **Plugins**: Lade DLLs in `plugins/` für Voice-Chat oder Anti-Cheat.
- **Economy-System**: Erweitere Skripte für Jobs, Shops, Fahrzeuge.
- **Factions**: Gruppen wie Polizei, Gangs mit eigenen Commands.
- **Community-Resources**: Schaue auf Foren wie rage.mp/forums für fertige RP-Skripte.

## 8. Tipps und Troubleshooting

- **Fehler**: Überprüfe Logs in `.settings/logs/`. Häufig: Ports nicht offen, falsche Konfig.
- **Performance**: Für viele Spieler brauchst du einen dedizierten Server (z. B. VPS).
- **Sicherheit**: Implementiere Anti-Cheat und Auth-Systeme.
- **Updates**: Führe `updater.exe` regelmäßig aus.
- **Community**: Schau Videos wie [GTA RP Beginner's Guide](https://www.youtube.com/watch?v=N0okYQgryNA) oder [RageMP Setup](https://www.youtube.com/watch?v=_Nvh_T0QosY) für visuelle Hilfen.
- **Rechtliches**: Halte dich an RP-Regeln und vermeide illegale Mods.

Viel Erfolg bei deinem RP-Server! Wenn Probleme auftauchen, frage in der RageMP-Community.