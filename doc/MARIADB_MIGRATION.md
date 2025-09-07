# MariaDB Migration Guide

## Übersicht
Dieses Dokument beschreibt die Migration von MongoDB zu MariaDB für den Horizont-City Roleplay Server.

## Was wurde geändert

### 1. Dependencies
- **Entfernt**: `mongodb` (^4.17.2)
- **Hinzugefügt**: `mariadb` (^3.2.2)
- **Beibehalten**: `mysql2` (für Character Creator)

### 2. Datenbank-Konfiguration
```json
{
  "database": {
    "mariadb": {
      "host": "localhost",
      "port": 3306,
      "user": "root",
      "password": "",
      "database": "horizontcity"
    },
    "mysql": {
      "host": "localhost",
      "user": "root",
      "password": "",
      "database": "horizontcity"
    }
  }
}
```

### 3. Datenbank-Schema
Alle MongoDB Collections wurden zu MariaDB Tabellen konvertiert:

#### Haupt-Tabellen
- `players` - Spieler-Daten
- `factions` - Fraktionen
- `vehicles` - Fahrzeuge
- `houses` - Häuser
- `jobs` - Jobs
- `bank_accounts` - Bank-Konten
- `inventories` - Inventare
- `phones` - Telefone

#### Zusätzliche Tabellen
- `player_stats` - Spieler-Statistiken
- `faction_members` - Fraktions-Mitglieder
- `vehicle_modifications` - Fahrzeug-Modifikationen
- `house_keys` - Haus-Schlüssel
- `job_applications` - Job-Bewerbungen
- `bank_transactions` - Bank-Transaktionen
- `inventory_items` - Inventar-Items
- `phone_contacts` - Telefon-Kontakte
- `phone_messages` - Telefon-Nachrichten
- `economy_transactions` - Wirtschafts-Transaktionen
- `admin_logs` - Admin-Logs

### 4. API-Änderungen

#### Alte MongoDB API
```javascript
const { getDB, getMongoCollection, insertOne, findOne, find, updateOne, deleteOne } = require('./database');

// Collection abrufen
const players = getMongoCollection('players');

// Daten einfügen
await insertOne('players', { name: 'Test', money: 1000 });

// Daten suchen
const player = await findOne('players', { name: 'Test' });
const allPlayers = await find('players', { level: { $gte: 5 } });

// Daten aktualisieren
await updateOne('players', { name: 'Test' }, { money: 2000 });

// Daten löschen
await deleteOne('players', { name: 'Test' });
```

#### Neue MariaDB API
```javascript
const { query, insert, selectOne, select, update, delete: dbDelete } = require('./database');

// Daten einfügen
const playerId = await insert('players', { name: 'Test', money: 1000 });

// Daten suchen
const player = await selectOne('players', { name: 'Test' });
const allPlayers = await select('players', { level: 5 }, '*', { orderBy: 'level DESC' });

// Daten aktualisieren
await update('players', { money: 2000 }, { name: 'Test' });

// Daten löschen
await dbDelete('players', { name: 'Test' });

// Custom Query
const result = await query('SELECT * FROM players WHERE level >= ? AND money > ?', [5, 1000]);
```

## Installation

### 1. MariaDB installieren
```bash
# Windows (mit Chocolatey)
choco install mariadb

# Linux (Ubuntu/Debian)
sudo apt-get install mariadb-server

# Linux (CentOS/RHEL)
sudo yum install mariadb-server
```

### 2. MariaDB konfigurieren
```sql
-- Datenbank erstellen
CREATE DATABASE horizontcity CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Benutzer erstellen
CREATE USER 'horizontcity'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON horizontcity.* TO 'horizontcity'@'localhost';
FLUSH PRIVILEGES;
```

### 3. Dependencies installieren
```bash
npm install
```

### 4. Server starten
```bash
# MariaDB starten
# Windows
net start mariadb

# Linux
sudo systemctl start mariadb

# Server starten
ragemp-server.exe
```

## Migration ausführen

### Automatische Migration
Die Migration wird automatisch beim Server-Start ausgeführt.

### Manuelle Migration
```javascript
const { migrateAll, getStatus } = require('./packages/gamemode/migrate_to_mariadb');

// Migration ausführen
await migrateAll();

// Status abrufen
const status = getStatus();
console.log('Migrierte Systeme:', status.migrated);
console.log('Fehler:', status.errors);
```

## Vorteile von MariaDB

### 1. Performance
- **Bessere Performance** bei komplexen Queries
- **ACID-Compliance** für Datenintegrität
- **Optimierte Indizes** für schnelle Suchen

### 2. Stabilität
- **Bewährte Technologie** seit über 20 Jahren
- **Weniger Speicherverbrauch** als MongoDB
- **Bessere Fehlerbehandlung**

### 3. Wartbarkeit
- **SQL-Standard** - bekanntes Interface
- **Bessere Tools** für Backup und Monitoring
- **Einfachere Debugging**

### 4. Skalierbarkeit
- **Master-Slave Replikation**
- **Sharding-Unterstützung**
- **Cloud-Integration**

## Troubleshooting

### Verbindungsfehler
```bash
# MariaDB Status prüfen
# Windows
sc query mariadb

# Linux
sudo systemctl status mariadb
```

### Port-Konflikte
```bash
# Port 3306 prüfen
netstat -an | findstr :3306
```

### Berechtigungsfehler
```sql
-- Benutzer-Berechtigungen prüfen
SHOW GRANTS FOR 'horizontcity'@'localhost';
```

## Support

Bei Problemen mit der Migration:
1. Logs in `logs/` prüfen
2. MariaDB Error Log prüfen
3. Datenbank-Verbindung testen
4. Migration-Status abrufen

## Rollback

Falls ein Rollback zu MongoDB erforderlich ist:
1. `package.json` - `mariadb` entfernen, `mongodb` hinzufügen
2. `database.js` - MongoDB-Code wiederherstellen
3. `index.js` - `player_mariadb` zu `player` ändern
4. Dependencies neu installieren
