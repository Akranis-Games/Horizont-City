# Dateistruktur eines RageMP-Servers

Dieses Dokument beschreibt die typische Dateistruktur eines RageMP-Servers, basierend auf der offiziellen RageMP-Dokumentation und gängigen Best Practices. Der Root-Ordner `server-files` enthält alle notwendigen Dateien und Ordner, die nach dem Ausführen von `updater.exe` generiert werden. Jeder Ordner und jede Datei wird mit einer kurzen Erklärung versehen, um die Struktur und deren Zweck klarzumachen.

## Übersicht der Dateistruktur

```
server-files/
├── client_packages/
│   ├── index.js
│   ├── ui/
│   │   ├── index.html
│   │   ├── css/
│   │   │   ├── style.css
│   │   │   └── ...
│   │   └── js/
│   │       ├── main.js
│   │       ├── events.js
│   │       └── ...
│   ├── cef/
│   ├── events.js
│   ├── commands.js
│   └── ...
├── packages/
│   ├── gamemode/
│   │   ├── index.js
│   │   ├── events.js
│   │   ├── commands.js
│   │   ├── spawn_points.json
│   │   ├── config.json
│   │   └── ...
│   ├── plugins/
│   └── ...
├── maps/
│   ├── example_map.json
│   └── ...
├── plugins/
│   ├── example_plugin.dll
│   └── ...
├── conf.json
├── .settings/
│   └── logs/
└── ragemp-server.exe
```

## Beschreibung der Ordner und Dateien

- **`server-files/`**: Der Hauptordner (Root) des RageMP-Servers. Wird beim Herunterladen des Servers von [rage.mp](https://rage.mp/) erstellt und enthält alle notwendigen Dateien und Ordner. Starte den Server mit `ragemp-server.exe`.

- **`client_packages/`**: Enthält alle clientseitigen Skripte und Ressourcen, die an die Spieler gesendet und auf deren Gerät heruntergeladen werden. Hier liegt die Logik für clientseitige Funktionen und das User Interface (UI).
  - **`index.js`**: Einstiegspunkt für clientseitige Skripte. Hier werden andere JavaScript-Dateien oder Module geladen (z. B. `require('./ui/index.js');`).
  - **`ui/`**: Unterordner für CEF-basierte (Chromium Embedded Framework) User Interfaces, z. B. Menüs, HUDs oder Inventare.
    - **`index.html`**: Haupt-HTML-Datei für das UI. Definiert die Struktur von Menüs oder anderen Schnittstellen.
    - **`css/`**: Enthält Stylesheets für das UI-Design.
      - **`style.css`**: Beispiel für eine CSS-Datei, die Farben, Layouts und Animationen für das UI definiert (z. B. `body { background: black; }`).
      - **`...`**: Weitere CSS-Dateien, z. B. für spezifische Komponenten wie `buttons.css`.
    - **`js/`**: Enthält JavaScript-Dateien für die UI-Logik und Interaktionen.
      - **`main.js`**: Beispiel für ein Skript, das UI-Interaktionen (z. B. Button-Klicks) und Server-Kommunikation (z. B. `mp.events.callRemote()`) handhabt.
      - **`events.js`**: Beispiel für clientseitige UI-Events, z. B. für das Öffnen/Schließen von Menüs.
      - **`...`**: Weitere JS-Dateien, z. B. `utils.js` für Hilfsfunktionen.
  - **`cef/`**: Optionaler Ordner für erweiterte CEF-basierte UIs (ähnlich zu `ui/`, aber für komplexere Browser-Inhalte).
  - **`events.js`**: Globale clientseitige Events, z. B. `mp.events.add('playerChat', ...);` für Chat-Funktionen.
  - **`commands.js`**: Clientseitige Commands, z. B. für lokale Tests oder UI-Shortcuts.
  - **`...`**: Weitere Dateien/Ordner, z. B. `assets/` für Bilder, Sounds oder Models, die clientseitig geladen werden.

- **`packages/`**: Enthält serverseitige Skripte, die nur auf dem Server ausgeführt werden. Hier liegt die Logik für Events, Spieler-Management, Datenbanken und mehr.
  - **`gamemode/`**: Beispiel-Unterordner für den Haupt-Gamemode (beliebig benennbar, z. B. `myrp` für Roleplay).
    - **`index.js`**: Einstiegspunkt für den Gamemode. Lädt andere Dateien, z. B. `require('./events.js');`.
    - **`events.js`**: Handhabt serverseitige Events, z. B. `mp.events.add('playerJoin', (player) => { player.outputChatBox('Willkommen!'); });`.
    - **`commands.js`**: Server-Commands, z. B. `mp.events.addCommand('hp', (player) => { player.health = 100; });`.
    - **`spawn_points.json`**: JSON-Datei mit Koordinaten für Spawn-Punkte, z. B. `{ "SpawnPoints": [{ "x": -425.517, "y": 1123.620, "z": 325.8544 }, ...] }`.
    - **`config.json`**: Konfigurationsdatei für Gamemode-spezifische Einstellungen, z. B. Datenbank-Details oder Spielregeln.
    - **`...`**: Weitere Dateien, z. B. `database.js` für MySQL-Integration oder `vehicles.js` für Fahrzeug-Management.
  - **`plugins/`**: Optionaler Unterordner für serverseitige Plugins (oft im Root unter `plugins/`).
  - **`...`**: Weitere Gamemodes oder Ressourcen, z. B. `auth/` für Login-Systeme oder `economy/` für Wirtschaftssysteme.

- **`maps/`**: Enthält JSON-Dateien für Custom-Maps, die Objekte, Props oder Innenräume in die Spielwelt laden.
  - **`example_map.json`**: Beispiel für eine Map-Datei, z. B. `{ "objects": [{ "model": "prop_barrier", "pos": { "x": 0, "y": 0, "z": 0 } }] }`.
  - **`...`**: Weitere Maps, z. B. `interior.json` für Innenräume.

- **`plugins/`**: Ordner für serverseitige DLL-Plugins, geschrieben in C# oder C++.
  - **`example_plugin.dll`**: Beispiel für ein Plugin, z. B. für Voice-Chat oder Anti-Cheat.
  - **`...`**: Weitere DLLs, z. B. `mysql.dll` für Datenbank-Verbindungen.

- **`conf.json`**: Wichtige Konfigurationsdatei für den Server. Enthält Einstellungen wie Servername, Port, Spielerzahl usw. Beispiel:
  ```json
  {
    "name": "Mein RageMP Server",
    "gamemode": "freeroam",
    "maxplayers": 100,
    "port": 22005,
    "language": "de",
    "announce": true,
    "modules": ["javascript-module"]
  }
  ```

- **`.settings/`**: Optionaler Ordner für erweiterte Einstellungen oder Logs.
  - **`logs/`**: Unterordner für Server-Logs, z. B. `error.log` oder `access.log`.

- **`ragemp-server.exe`**: Die ausführbare Datei, um den Server zu starten. Öffnet eine Konsole mit Logs und Fehlerausgaben.

## Tipps für die Nutzung

- **Installation**: Lade den RageMP-Server von [rage.mp](https://rage.mp/) herunter, extrahiere ihn und führe `updater.exe` aus, um die Basisstruktur zu erstellen.
- **Client-Packages**: Halte `client_packages/` leicht, da diese Dateien an jeden Spieler gesendet werden. Nutze CEF für moderne UIs mit HTML/CSS/JS.
- **Packages**: Organisiere serverseitige Logik in `packages/` mit klaren Modulen (z. B. `events.js`, `commands.js`). Integriere Datenbanken wie MySQL für persistente Daten.
- **Testing**: Starte den Server mit `ragemp-server.exe` und verbinde dich lokal mit `127.0.0.1:22005` im RageMP-Client.
- **Erweiterungen**: Für Roleplay-Server füge Ordner wie `jobs/`, `factions/` oder `vehicles/` in `packages/` hinzu. Nutze `maps/` für Custom-Objekte.
- **Dokumentation**: Siehe die [RageMP-Wiki](https://wiki.rage.mp/) für detaillierte Infos zu Events, Commands und CEF.

Falls du Fragen oder Erweiterungen für diese Struktur hast, öffne ein Issue oder kontaktiere die Maintainer!