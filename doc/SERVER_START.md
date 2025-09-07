# Horizont-City Roleplay Server - Startanleitung

## Voraussetzungen

1. **RageMP Server** muss installiert sein
2. **Node.js** (Version 16 oder höher)
3. **MongoDB** (für die Datenbank)

## Installation

1. **Dependencies installieren:**
   ```bash
   npm install
   ```

2. **Datenbank konfigurieren:**
   - MongoDB starten
   - In `conf.json` die MongoDB-Verbindung anpassen:
   ```json
   {
     "database": {
       "mongoUrl": "mongodb://localhost:27017/horizont-city"
     }
   }
   ```

## Server starten

### Option 1: Mit RageMP Server (Empfohlen)
1. RageMP Server herunterladen und installieren
2. `ragemp-server.exe` in das Hauptverzeichnis kopieren
3. Server starten:
   ```bash
   ragemp-server.exe
   ```

### Option 2: Mit Node.js (nur für Tests)
```bash
node core/packages/gamemode/index.js
```
**Hinweis:** Dies funktioniert nur teilweise, da RageMP-spezifische Objekte (`mp`) nicht verfügbar sind.

## Verzeichnisstruktur

```
Horizont-City/
├── meta.xml              # RageMP Resource Definition
├── conf.json             # Server Konfiguration
├── package.json          # Node.js Dependencies
├── core/                 # Hauptverzeichnis
│   ├── packages/         # Server-side Code
│   ├── client_packages/  # Client-side Code
│   └── maps/            # Karten
├── logs/                # Server Logs
├── maps/                # Zusätzliche Karten
└── plugins/             # Server Plugins
```

## Fehlerbehebung

### "meta.xml has not been found"
- Stelle sicher, dass `meta.xml` im Hauptverzeichnis liegt
- Überprüfe, dass der RageMP Server im richtigen Verzeichnis gestartet wird

### "Cannot find module 'node:events'"
- Node.js Version prüfen (mindestens 16.0.0)
- Dependencies neu installieren: `npm install`

### "mp is not defined"
- Normal bei Node.js-Tests, tritt nur im RageMP Server auf

## Nächste Schritte

1. RageMP Server installieren
2. Datenbank konfigurieren
3. Server starten
4. Client verbinden und testen

## Support

Bei Problemen die Logs in `logs/` überprüfen oder die README.md konsultieren.
