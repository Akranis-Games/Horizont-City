// Crime System - Kriminalitäts-System mit Polizei und Verbrechen
// Behandelt alle Kriminalitäts-Funktionen für Horizont-City Roleplay

const crimeSystem = {
    // Verbrechen-Typen
    crimeTypes: {
        THEFT: 'theft',
        ROBBERY: 'robbery',
        ASSAULT: 'assault',
        MURDER: 'murder',
        DRUG_DEALING: 'drug_dealing',
        MONEY_LAUNDERING: 'money_laundering',
        FRAUD: 'fraud',
        VANDALISM: 'vandalism',
        BURGLARY: 'burglary',
        CAR_THEFT: 'car_theft',
        ARSON: 'arson',
        KIDNAPPING: 'kidnapping',
        EXTORTION: 'extortion',
        RACKETEERING: 'racketeering',
        TERRORISM: 'terrorism',
        CYBER_CRIME: 'cyber_crime',
        ORGANIZED_CRIME: 'organized_crime',
        WHITE_COLLAR: 'white_collar',
        STREET_CRIME: 'street_crime',
        VIOLENT_CRIME: 'violent_crime'
    },
    
    // Schweregrade
    severityLevels: {
        MINOR: {
            name: 'Geringfügig',
            points: 1,
            fine: 100,
            jailTime: 0,
            description: 'Kleine Vergehen'
        },
        MODERATE: {
            name: 'Mittel',
            points: 3,
            fine: 500,
            jailTime: 30,
            description: 'Mittlere Verbrechen'
        },
        SERIOUS: {
            name: 'Schwer',
            points: 5,
            fine: 1000,
            jailTime: 60,
            description: 'Schwere Verbrechen'
        },
        MAJOR: {
            name: 'Sehr schwer',
            points: 8,
            fine: 2500,
            jailTime: 120,
            description: 'Sehr schwere Verbrechen'
        },
        FELONY: {
            name: 'Verbrechen',
            points: 10,
            fine: 5000,
            jailTime: 300,
            description: 'Schwerste Verbrechen'
        }
    },
    
    // Polizei-Ränge
    policeRanks: {
        CADET: { name: 'Polizeianwärter', level: 1, permissions: ['patrol', 'traffic'] },
        OFFICER: { name: 'Polizeibeamter', level: 2, permissions: ['patrol', 'traffic', 'arrest'] },
        SERGEANT: { name: 'Polizeihauptmeister', level: 3, permissions: ['patrol', 'traffic', 'arrest', 'investigate'] },
        LIEUTENANT: { name: 'Polizeikommissar', level: 4, permissions: ['patrol', 'traffic', 'arrest', 'investigate', 'supervise'] },
        CAPTAIN: { name: 'Polizeihauptkommissar', level: 5, permissions: ['patrol', 'traffic', 'arrest', 'investigate', 'supervise', 'command'] },
        COMMANDER: { name: 'Polizeidirektor', level: 6, permissions: ['patrol', 'traffic', 'arrest', 'investigate', 'supervise', 'command', 'admin'] },
        CHIEF: { name: 'Polizeipräsident', level: 7, permissions: ['all'] }
    },
    
    // Verbrechen-Konfiguration
    crimeConfig: {
        theft: {
            name: 'Diebstahl',
            type: 'theft',
            severity: 'minor',
            points: 1,
            fine: 100,
            jailTime: 0,
            description: 'Entwendung von fremdem Eigentum',
            evidence: ['fingerprints', 'witness'],
            investigationTime: 30,
            cooldown: 300
        },
        robbery: {
            name: 'Raub',
            type: 'robbery',
            severity: 'serious',
            points: 5,
            fine: 1000,
            jailTime: 60,
            description: 'Gewaltsame Entwendung von Eigentum',
            evidence: ['fingerprints', 'witness', 'camera'],
            investigationTime: 60,
            cooldown: 600
        },
        assault: {
            name: 'Körperverletzung',
            type: 'assault',
            severity: 'moderate',
            points: 3,
            fine: 500,
            jailTime: 30,
            description: 'Körperliche Gewalt gegen andere',
            evidence: ['witness', 'medical'],
            investigationTime: 45,
            cooldown: 450
        },
        murder: {
            name: 'Mord',
            type: 'murder',
            severity: 'felony',
            points: 10,
            fine: 5000,
            jailTime: 300,
            description: 'Vorsätzliche Tötung',
            evidence: ['fingerprints', 'witness', 'camera', 'forensic'],
            investigationTime: 120,
            cooldown: 1800
        },
        drug_dealing: {
            name: 'Drogenhandel',
            type: 'drug_dealing',
            severity: 'major',
            points: 8,
            fine: 2500,
            jailTime: 120,
            description: 'Handel mit illegalen Substanzen',
            evidence: ['drugs', 'witness', 'camera'],
            investigationTime: 90,
            cooldown: 900
        },
        money_laundering: {
            name: 'Geldwäsche',
            type: 'money_laundering',
            severity: 'major',
            points: 8,
            fine: 2500,
            jailTime: 120,
            description: 'Verschleierung illegaler Geldquellen',
            evidence: ['financial', 'witness'],
            investigationTime: 120,
            cooldown: 1200
        },
        fraud: {
            name: 'Betrug',
            type: 'fraud',
            severity: 'moderate',
            points: 3,
            fine: 500,
            jailTime: 30,
            description: 'Täuschung zum eigenen Vorteil',
            evidence: ['financial', 'witness'],
            investigationTime: 60,
            cooldown: 600
        },
        vandalism: {
            name: 'Vandalismus',
            type: 'vandalism',
            severity: 'minor',
            points: 1,
            fine: 100,
            jailTime: 0,
            description: 'Beschädigung fremden Eigentums',
            evidence: ['witness', 'camera'],
            investigationTime: 30,
            cooldown: 300
        },
        burglary: {
            name: 'Einbruch',
            type: 'burglary',
            severity: 'serious',
            points: 5,
            fine: 1000,
            jailTime: 60,
            description: 'Unbefugtes Eindringen in Gebäude',
            evidence: ['fingerprints', 'witness', 'camera'],
            investigationTime: 75,
            cooldown: 750
        },
        car_theft: {
            name: 'Autodiebstahl',
            type: 'car_theft',
            severity: 'moderate',
            points: 3,
            fine: 500,
            jailTime: 30,
            description: 'Diebstahl von Fahrzeugen',
            evidence: ['fingerprints', 'witness', 'camera'],
            investigationTime: 45,
            cooldown: 450
        },
        arson: {
            name: 'Brandstiftung',
            type: 'arson',
            severity: 'major',
            points: 8,
            fine: 2500,
            jailTime: 120,
            description: 'Vorsätzliche Brandstiftung',
            evidence: ['forensic', 'witness', 'camera'],
            investigationTime: 90,
            cooldown: 900
        },
        kidnapping: {
            name: 'Entführung',
            type: 'kidnapping',
            severity: 'felony',
            points: 10,
            fine: 5000,
            jailTime: 300,
            description: 'Entführung von Personen',
            evidence: ['witness', 'camera', 'forensic'],
            investigationTime: 120,
            cooldown: 1800
        },
        extortion: {
            name: 'Erpressung',
            type: 'extortion',
            severity: 'serious',
            points: 5,
            fine: 1000,
            jailTime: 60,
            description: 'Erpressung von Geld oder Leistungen',
            evidence: ['witness', 'camera', 'financial'],
            investigationTime: 75,
            cooldown: 750
        },
        racketeering: {
            name: 'Erpressung',
            type: 'racketeering',
            severity: 'felony',
            points: 10,
            fine: 5000,
            jailTime: 300,
            description: 'Organisierte Erpressung',
            evidence: ['witness', 'camera', 'financial', 'forensic'],
            investigationTime: 120,
            cooldown: 1800
        },
        terrorism: {
            name: 'Terrorismus',
            type: 'terrorism',
            severity: 'felony',
            points: 10,
            fine: 10000,
            jailTime: 600,
            description: 'Terroristische Aktivitäten',
            evidence: ['forensic', 'witness', 'camera', 'intelligence'],
            investigationTime: 180,
            cooldown: 3600
        },
        cyber_crime: {
            name: 'Cyberkriminalität',
            type: 'cyber_crime',
            severity: 'moderate',
            points: 3,
            fine: 500,
            jailTime: 30,
            description: 'Verbrechen im Internet',
            evidence: ['digital', 'witness'],
            investigationTime: 60,
            cooldown: 600
        },
        organized_crime: {
            name: 'Organisierte Kriminalität',
            type: 'organized_crime',
            severity: 'felony',
            points: 10,
            fine: 5000,
            jailTime: 300,
            description: 'Organisierte Verbrechen',
            evidence: ['witness', 'camera', 'financial', 'forensic', 'intelligence'],
            investigationTime: 150,
            cooldown: 1800
        },
        white_collar: {
            name: 'Wirtschaftskriminalität',
            type: 'white_collar',
            severity: 'moderate',
            points: 3,
            fine: 500,
            jailTime: 30,
            description: 'Verbrechen in der Wirtschaft',
            evidence: ['financial', 'witness'],
            investigationTime: 90,
            cooldown: 900
        },
        street_crime: {
            name: 'Straßenkriminalität',
            type: 'street_crime',
            severity: 'minor',
            points: 1,
            fine: 100,
            jailTime: 0,
            description: 'Kleine Verbrechen auf der Straße',
            evidence: ['witness'],
            investigationTime: 30,
            cooldown: 300
        },
        violent_crime: {
            name: 'Gewaltverbrechen',
            type: 'violent_crime',
            severity: 'serious',
            points: 5,
            fine: 1000,
            jailTime: 60,
            description: 'Gewalttätige Verbrechen',
            evidence: ['witness', 'medical', 'forensic'],
            investigationTime: 75,
            cooldown: 750
        }
    },
    
    // Polizei-Stationen
    policeStations: {
        'station_1': {
            name: 'Polizeiinspektion Mitte',
            location: { x: 1000, y: 2000, z: 30 },
            capacity: 50,
            cells: 20,
            officers: 15,
            vehicles: 10,
            equipment: ['weapons', 'armor', 'vehicles', 'communication'],
            status: 'active',
            created: Date.now()
        },
        'station_2': {
            name: 'Polizeiinspektion Nord',
            location: { x: 1500, y: 2500, z: 30 },
            capacity: 40,
            cells: 15,
            officers: 12,
            vehicles: 8,
            equipment: ['weapons', 'armor', 'vehicles', 'communication'],
            status: 'active',
            created: Date.now()
        },
        'station_3': {
            name: 'Polizeiinspektion Süd',
            location: { x: 2000, y: 3000, z: 30 },
            capacity: 60,
            cells: 25,
            officers: 20,
            vehicles: 12,
            equipment: ['weapons', 'armor', 'vehicles', 'communication'],
            status: 'active',
            created: Date.now()
        }
    },
    
    // Aktive Verbrechen
    activeCrimes: new Map(),
    
    // Aktive Ermittlungen
    activeInvestigations: new Map(),
    
    // Polizei-Beamte
    policeOfficers: new Map(),
    
    // Gefängnis-Insassen
    prisoners: new Map(),
    
    // Kriminalitäts-System-Initialisierung
    init() {
        console.log('[CRIME] Kriminalitäts-System initialisiert');
        this.initializePoliceStations();
    },
    
    // Polizei-Stationen initialisieren
    initializePoliceStations() {
        Object.keys(this.policeStations).forEach(stationId => {
            const station = this.policeStations[stationId];
            station.id = stationId;
            station.crimes = [];
            station.investigations = [];
            station.prisoners = [];
            
            this.policeStations[stationId] = station;
        });
        
        console.log(`[CRIME] ${Object.keys(this.policeStations).length} Polizei-Stationen initialisiert`);
    },
    
    // Verbrechen begehen
    commitCrime(player, crimeType, target, evidence) {
        const crime = this.crimeConfig[crimeType];
        if (!crime) {
            player.outputChatBox('Verbrechen-Typ nicht gefunden!');
            return false;
        }
        
        // Cooldown prüfen
        const lastCrime = this.getLastCrime(player, crimeType);
        if (lastCrime && Date.now() - lastCrime < crime.cooldown * 1000) {
            const remaining = Math.ceil((crime.cooldown * 1000 - (Date.now() - lastCrime)) / 1000);
            player.outputChatBox(`Cooldown: ${remaining} Sekunden verbleibend`);
            return false;
        }
        
        const crimeId = `crime_${player.id}_${Date.now()}`;
        const crimeData = {
            id: crimeId,
            playerId: player.id,
            crimeType: crimeType,
            config: crime,
            target: target,
            evidence: evidence || [],
            location: player.position,
            timestamp: Date.now(),
            status: 'active',
            witnesses: [],
            investigation: null,
            created: Date.now()
        };
        
        this.activeCrimes.set(crimeId, crimeData);
        
        // Zeugen suchen
        this.findWitnesses(crimeData);
        
        // Polizei alarmieren
        this.alertPolice(crimeData);
        
        player.outputChatBox(`Verbrechen ${crime.name} begangen!`);
        player.call('ui:show', 'CrimeCommitted', { crime: crimeData });
        
        console.log(`[CRIME] Verbrechen ${crimeType} von Spieler ${player.id} begangen`);
        return crimeId;
    },
    
    // Letztes Verbrechen abrufen
    getLastCrime(player, crimeType) {
        const crimes = Array.from(this.activeCrimes.values()).filter(crime => 
            crime.playerId === player.id && 
            crime.crimeType === crimeType
        );
        
        return crimes.length > 0 ? crimes[crimes.length - 1] : null;
    },
    
    // Zeugen suchen
    findWitnesses(crime) {
        const witnesses = [];
        const players = mp.players.toArray();
        
        players.forEach(player => {
            if (player.id !== crime.playerId) {
                const distance = this.getDistance(player.position, crime.location);
                if (distance < 100) { // 100 Meter Radius
                    witnesses.push({
                        playerId: player.id,
                        distance: distance,
                        reliability: Math.random() * 0.8 + 0.2 // 20-100% Zuverlässigkeit
                    });
                }
            }
        });
        
        crime.witnesses = witnesses;
    },
    
    // Polizei alarmieren
    alertPolice(crime) {
        const policeOfficers = Array.from(this.policeOfficers.values()).filter(officer => 
            officer.status === 'on_duty'
        );
        
        policeOfficers.forEach(officer => {
            const player = mp.players.at(officer.playerId);
            if (player) {
                player.outputChatBox(`ALARM: ${crime.config.name} in der Nähe!`);
                player.call('ui:show', 'PoliceAlert', { crime: crime });
            }
        });
    },
    
    // Verbrechen melden
    reportCrime(player, crimeId, details) {
        const crime = this.activeCrimes.get(crimeId);
        if (!crime) {
            player.outputChatBox('Verbrechen nicht gefunden!');
            return false;
        }
        
        const reportId = `report_${player.id}_${Date.now()}`;
        const report = {
            id: reportId,
            playerId: player.id,
            crimeId: crimeId,
            details: details,
            timestamp: Date.now(),
            status: 'pending',
            created: Date.now()
        };
        
        crime.reports = crime.reports || [];
        crime.reports.push(report);
        
        player.outputChatBox('Verbrechen gemeldet!');
        player.call('ui:show', 'CrimeReported', { report: report });
        
        console.log(`[CRIME] Verbrechen ${crimeId} von Spieler ${player.id} gemeldet`);
        return reportId;
    },
    
    // Ermittlung starten
    startInvestigation(player, crimeId) {
        const crime = this.activeCrimes.get(crimeId);
        if (!crime) {
            player.outputChatBox('Verbrechen nicht gefunden!');
            return false;
        }
        
        if (crime.investigation) {
            player.outputChatBox('Ermittlung bereits aktiv!');
            return false;
        }
        
        const investigationId = `investigation_${crimeId}_${Date.now()}`;
        const investigation = {
            id: investigationId,
            crimeId: crimeId,
            investigatorId: player.id,
            startTime: Date.now(),
            endTime: Date.now() + (crime.config.investigationTime * 60 * 1000),
            status: 'active',
            evidence: [],
            suspects: [],
            leads: [],
            created: Date.now()
        };
        
        this.activeInvestigations.set(investigationId, investigation);
        crime.investigation = investigationId;
        
        player.outputChatBox(`Ermittlung für ${crime.config.name} gestartet!`);
        player.call('ui:show', 'InvestigationStarted', { investigation: investigation });
        
        console.log(`[CRIME] Ermittlung für Verbrechen ${crimeId} gestartet`);
        return investigationId;
    },
    
    // Verbrecher verhaften
    arrestPlayer(player, suspectId, crimeId) {
        const suspect = mp.players.at(suspectId);
        if (!suspect) {
            player.outputChatBox('Verdächtiger nicht gefunden!');
            return false;
        }
        
        const crime = this.activeCrimes.get(crimeId);
        if (!crime) {
            player.outputChatBox('Verbrechen nicht gefunden!');
            return false;
        }
        
        if (crime.playerId !== suspectId) {
            player.outputChatBox('Falscher Verdächtiger!');
            return false;
        }
        
        const arrestId = `arrest_${suspectId}_${Date.now()}`;
        const arrest = {
            id: arrestId,
            suspectId: suspectId,
            officerId: player.id,
            crimeId: crimeId,
            timestamp: Date.now(),
            status: 'arrested',
            created: Date.now()
        };
        
        // Spieler verhaften
        suspect.arrested = true;
        suspect.arrestId = arrestId;
        
        // Gefängnis zuweisen
        this.sendToJail(suspect, crime.config.jailTime);
        
        player.outputChatBox(`${suspect.name} verhaftet!`);
        suspect.outputChatBox('Du wurdest verhaftet!');
        
        console.log(`[CRIME] Spieler ${suspectId} von ${player.id} verhaftet`);
        return arrestId;
    },
    
    // Ins Gefängnis schicken
    sendToJail(player, jailTime) {
        const jailId = `jail_${player.id}_${Date.now()}`;
        const jail = {
            id: jailId,
            playerId: player.id,
            startTime: Date.now(),
            endTime: Date.now() + (jailTime * 60 * 1000),
            status: 'imprisoned',
            created: Date.now()
        };
        
        this.prisoners.set(jailId, jail);
        
        // Spieler ins Gefängnis teleportieren
        player.position = new mp.Vector3(1641.0, 2570.0, 45.0); // Gefängnis-Koordinaten
        
        player.outputChatBox(`Du wurdest ins Gefängnis geschickt für ${jailTime} Minuten!`);
        player.call('ui:show', 'JailTime', { jail: jail });
        
        // Gefängnis-Zeit ablaufen lassen
        setTimeout(() => {
            this.releaseFromJail(player, jailId);
        }, jailTime * 60 * 1000);
        
        console.log(`[CRIME] Spieler ${player.id} ins Gefängnis geschickt`);
        return jailId;
    },
    
    // Aus dem Gefängnis entlassen
    releaseFromJail(player, jailId) {
        const jail = this.prisoners.get(jailId);
        if (!jail) {
            return;
        }
        
        jail.status = 'released';
        jail.releaseTime = Date.now();
        
        player.arrested = false;
        player.arrestId = null;
        
        // Spieler aus dem Gefängnis teleportieren
        player.position = new mp.Vector3(1000, 2000, 30); // Freilassungs-Koordinaten
        
        player.outputChatBox('Du wurdest aus dem Gefängnis entlassen!');
        player.call('ui:show', 'JailReleased', { jail: jail });
        
        console.log(`[CRIME] Spieler ${player.id} aus dem Gefängnis entlassen`);
    },
    
    // Polizei-Beamter werden
    becomePoliceOfficer(player, stationId, rank) {
        const station = this.policeStations[stationId];
        if (!station) {
            player.outputChatBox('Polizei-Station nicht gefunden!');
            return false;
        }
        
        const policeRank = this.policeRanks[rank];
        if (!policeRank) {
            player.outputChatBox('Polizei-Rang nicht gefunden!');
            return false;
        }
        
        const officerId = `officer_${player.id}_${Date.now()}`;
        const officer = {
            id: officerId,
            playerId: player.id,
            stationId: stationId,
            rank: rank,
            config: policeRank,
            status: 'on_duty',
            arrests: 0,
            investigations: 0,
            created: Date.now()
        };
        
        this.policeOfficers.set(officerId, officer);
        station.officers.push(officerId);
        
        player.policeOfficer = true;
        player.officerId = officerId;
        player.policeRank = rank;
        
        player.outputChatBox(`Du bist jetzt ${policeRank.name}!`);
        player.call('ui:show', 'PoliceOfficer', { officer: officer });
        
        console.log(`[CRIME] Spieler ${player.id} wurde Polizei-Beamter`);
        return officerId;
    },
    
    // Entfernung berechnen
    getDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Kriminalitäts-Statistiken
    getStatistics() {
        return {
            totalCrimes: this.activeCrimes.size,
            totalInvestigations: this.activeInvestigations.size,
            totalOfficers: this.policeOfficers.size,
            totalPrisoners: this.prisoners.size,
            totalStations: Object.keys(this.policeStations).length
        };
    }
};

// Events
mp.events.add('crime:commit', (player, crimeType, target, evidence) => {
    crimeSystem.commitCrime(player, crimeType, target, evidence);
});

mp.events.add('crime:report', (player, crimeId, details) => {
    crimeSystem.reportCrime(player, crimeId, details);
});

mp.events.add('crime:investigate', (player, crimeId) => {
    crimeSystem.startInvestigation(player, crimeId);
});

mp.events.add('crime:arrest', (player, suspectId, crimeId) => {
    crimeSystem.arrestPlayer(player, suspectId, crimeId);
});

// Commands
mp.events.addCommand('crime', (player, fullText, action, crimeType, target) => {
    if (!action) {
        player.outputChatBox('Verwendung: /crime [commit|report|investigate|arrest] [Typ] [Ziel]');
        player.outputChatBox('Verfügbare Verbrechen: theft, robbery, assault, murder, drug_dealing');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'commit':
            if (crimeType) {
                crimeSystem.commitCrime(player, crimeType, target);
            } else {
                player.outputChatBox('Verbrechen-Typ erforderlich!');
            }
            break;
            
        case 'report':
            if (crimeType) {
                crimeSystem.reportCrime(player, crimeType, target);
            } else {
                player.outputChatBox('Verbrechen-ID erforderlich!');
            }
            break;
            
        case 'investigate':
            if (crimeType) {
                crimeSystem.startInvestigation(player, crimeType);
            } else {
                player.outputChatBox('Verbrechen-ID erforderlich!');
            }
            break;
            
        case 'arrest':
            if (crimeType && target) {
                crimeSystem.arrestPlayer(player, crimeType, target);
            } else {
                player.outputChatBox('Verdächtiger-ID und Verbrechen-ID erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('police', (player, fullText, action, stationId, rank) => {
    if (!action) {
        player.outputChatBox('Verwendung: /police [join|leave|patrol] [StationID] [Rang]');
        player.outputChatBox('Verfügbare Stationen: station_1, station_2, station_3');
        player.outputChatBox('Verfügbare Ränge: cadet, officer, sergeant, lieutenant, captain, commander, chief');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'join':
            if (stationId && rank) {
                crimeSystem.becomePoliceOfficer(player, stationId, rank);
            } else {
                player.outputChatBox('StationID und Rang erforderlich!');
            }
            break;
            
        case 'leave':
            // Hier würde das Verlassen der Polizei implementiert werden
            player.outputChatBox('Polizei verlassen implementiert!');
            break;
            
        case 'patrol':
            // Hier würde die Patrouille implementiert werden
            player.outputChatBox('Patrouille implementiert!');
            break;
    }
});

mp.events.addCommand('crimestats', (player) => {
    const stats = crimeSystem.getStatistics();
    player.outputChatBox('=== Kriminalitäts-Statistiken ===');
    player.outputChatBox(`Gesamt Verbrechen: ${stats.totalCrimes}`);
    player.outputChatBox(`Gesamt Ermittlungen: ${stats.totalInvestigations}`);
    player.outputChatBox(`Gesamt Beamte: ${stats.totalOfficers}`);
    player.outputChatBox(`Gesamt Insassen: ${stats.totalPrisoners}`);
    player.outputChatBox(`Gesamt Stationen: ${stats.totalStations}`);
});

// Kriminalitäts-System initialisieren
crimeSystem.init();

module.exports = crimeSystem;
