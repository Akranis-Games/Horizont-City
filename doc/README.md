# Horizont-City Roleplay Server

Ein umfassendes Roleplay-Server für RageMP mit modernen Features und intuitiver Benutzeroberfläche.

## 🚀 Features

### Core Systems
- **Player Management** - Umfassendes Spieler-Management
- **Faction System** - Fraktions- und Gang-System mit Rängen
- **Economy System** - Realistische Wirtschaftssimulation
- **Bank System** - Vollständiges Bankensystem
- **Job System** - Verschiedene Jobs und Karrieren
- **Vehicle System** - Fahrzeug-Management und -Tuning
- **Housing System** - Immobilien und Wohnungen
- **Health System** - Gesundheit, Hunger, Durst, Energie
- **Phone System** - Smartphone mit Apps und Funktionen
- **Inventory System** - Umfassendes Inventar-System
- **Weather System** - Dynamisches Wetter
- **Animation System** - Spieler-Animationen
- **Emotion System** - Emotionen und Stimmungen

### Advanced Systems
- **Cinema System** - Kino und Unterhaltung
- **Sport Studio** - Fitness und Training
- **Crime System** - Kriminalität und Strafen
- **Power Production** - Stromerzeugung
- **Tax System** - Steuersystem
- **Tram System** - Öffentlicher Nahverkehr
- **Driver License** - Führerschein-System
- **Shopping Center** - Einkaufszentren
- **Disaster System** - Katastrophen-Events
- **News System** - Nachrichten und Medien
- **Moderator System** - Moderations-Tools
- **Club System** - Clubs und Veranstaltungen
- **Trading System** - Handel zwischen Spielern
- **Digital Records** - Digitale Akten
- **Civil Registry** - Einwohnermeldeamt
- **Family Life** - Familien-System
- **Resource Collection** - Ressourcen sammeln
- **Production System** - Produktions-Systeme
- **Factory System** - Fabriken und Produktion
- **Event System** - Events und Veranstaltungen

### Tutorial-Systeme
- **Weapon Shop** - Waffen-Shop mit Tastatur-Interaktionen
- **License Office** - Lizenz-Büro
- **Tuning Shop** - Fahrzeug-Tuning
- **Character Creator** - Charaktererstellung
- **Enhanced Auth** - Erweiterte Authentifizierung

## 📋 Voraussetzungen

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MongoDB** >= 5.0
- **MySQL** >= 8.0 (optional, für Character Creator)
- **RageMP Server** >= 1.1.0

## 🛠️ Installation

### 1. Repository klonen
```bash
git clone https://github.com/horizont-city/roleplay-server.git
cd roleplay-server
```

### 2. Abhängigkeiten installieren
```bash
npm install
```

### 3. Datenbanken einrichten

#### MongoDB
```bash
# MongoDB starten
mongod

# Datenbank erstellen
mongo
use horizontcity
```

#### MySQL (optional)
```bash
# MySQL starten
mysql -u root -p

# Datenbank erstellen
CREATE DATABASE horizontcity;
```

### 4. Umgebungsvariablen konfigurieren
Erstelle eine `.env` Datei im Hauptverzeichnis:

```env
# Server-Konfiguration
SERVER_NAME=Horizont-City Roleplay
SERVER_PORT=22005
SERVER_MAX_PLAYERS=100

# Datenbank-Konfiguration
MONGODB_URL=mongodb://localhost:27017/horizontcity
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your-password
MYSQL_DATABASE=horizontcity

# Authentifizierung
JWT_SECRET=your-super-secret-jwt-key
BCRYPT_ROUNDS=12

# Weitere Konfiguration...
```

### 5. Server starten
```bash
# Entwicklung
npm run dev

# Produktion
npm start
```

## 🎮 Tastatur-Shortcuts

### Allgemein
- **ESC** - Schließen/Zurück
- **TAB** - Nächstes Element
- **Enter** - Bestätigen/Auswählen
- **Pfeiltasten** - Navigation
- **Ctrl + H** - Hilfe anzeigen

### HUD
- **F1** - Telefon öffnen
- **F2** - Inventar öffnen
- **F3** - Faction öffnen
- **F4** - Bank öffnen
- **F5** - Job öffnen
- **F6** - Fahrzeug öffnen
- **F7** - Wohnung öffnen
- **F8** - Einstellungen öffnen
- **F9** - Admin öffnen
- **F10** - Radio öffnen
- **F11** - GPS öffnen
- **F12** - Hilfe anzeigen

### Inventar
- **U** - Item verwenden
- **D** - Item wegwerfen
- **G** - Item geben
- **S** - Item verkaufen
- **Ctrl + F** - Suchen fokussieren

### Phone
- **1-5** - App-Schnellzugriff
- **0** - Home Screen
- **Pfeiltasten** - App-Navigation

## 📁 Projektstruktur

```
horizont-city-roleplay/
├── packages/
│   └── gamemode/
│       ├── systems/          # Server-seitige Systeme
│       ├── api/              # REST API Routen
│       ├── events.js         # Event Handler
│       ├── commands.js       # Command Handler
│       ├── database.js       # Datenbank-Management
│       └── config.json       # Konfiguration
├── client_packages/
│   └── ui/
│       ├── components/       # React UI-Komponenten
│       ├── index.html        # Haupt-HTML
│       └── css/              # Styling
├── maps/                     # Karten-Dateien
├── plugins/                  # RageMP Plugins
├── meta.xml                  # RageMP Konfiguration
├── package.json              # Node.js Abhängigkeiten
└── README.md                 # Diese Datei
```

## 🔧 Konfiguration

### Server-Einstellungen
Bearbeite `packages/gamemode/config.json`:

```json
{
  "server": {
    "name": "Horizont-City Roleplay",
    "maxPlayers": 100,
    "port": 22005
  },
  "database": {
    "mongodb": "mongodb://localhost:27017/horizontcity",
    "mysql": {
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "horizontcity"
    }
  }
}
```

### Spawn-Punkte
Bearbeite `packages/gamemode/spawn_points.json`:

```json
[
  {
    "x": -1037.0,
    "y": -2737.0,
    "z": 20.0,
    "heading": 240.0,
    "name": "Flughafen"
  }
]
```

## 🐛 Troubleshooting

### Häufige Probleme

1. **"meta.xml has not been found"**
   - Stelle sicher, dass die `meta.xml` im Hauptverzeichnis liegt
   - Überprüfe die Pfade in der `meta.xml`

2. **Datenbank-Verbindungsfehler**
   - Überprüfe, ob MongoDB/MySQL läuft
   - Kontrolliere die Verbindungsdaten in der `.env`

3. **UI lädt nicht**
   - Überprüfe die Browser-Konsole auf Fehler
   - Stelle sicher, dass alle UI-Komponenten korrekt geladen werden

4. **Tastatur-Shortcuts funktionieren nicht**
   - Überprüfe, ob die Event-Listener korrekt registriert sind
   - Stelle sicher, dass die UI fokussiert ist

## 📞 Support

Bei Problemen oder Fragen:

- **GitHub Issues**: [Issues](https://github.com/horizont-city/roleplay-server/issues)
- **Discord**: [Horizont-City Discord](https://discord.gg/horizontcity)
- **E-Mail**: support@horizontcity.com

## 📄 Lizenz

MIT License - siehe [LICENSE](LICENSE) für Details.

## 🤝 Beitragen

Wir freuen uns über Beiträge! Bitte:

1. Fork das Repository
2. Erstelle einen Feature-Branch
3. Committe deine Änderungen
4. Erstelle einen Pull Request

## 📊 Statistiken

- **Systeme**: 50+
- **UI-Komponenten**: 15+
- **Tastatur-Shortcuts**: 50+
- **API-Endpunkte**: 100+
- **Datenbank-Tabellen**: 20+

---

**Horizont-City Roleplay** - Wo deine Geschichte beginnt! 🏙️
