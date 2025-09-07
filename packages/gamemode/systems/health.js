// Health System - Umfassendes Krankheits-System mit Krankenhäusern und Medikamenten
// Implementiert das umfassende Health-System für Horizont-City

const config = require('../../../conf.json');

// Health-Datenbank
const hospitals = new Map();
const medications = new Map();
const diseases = new Map();
const injuries = new Map();

// Krankheit-Klasse
class Disease {
    constructor(id, name, symptoms, severity, contagious, treatment, duration) {
        this.id = id;
        this.name = name;
        this.symptoms = symptoms; // Array von Symptomen
        this.severity = severity; // 1-5 (1 = mild, 5 = kritisch)
        this.contagious = contagious; // Ansteckend oder nicht
        this.treatment = treatment; // Behandlungsmethode
        this.duration = duration; // Dauer in Tagen
        this.cureRate = 0.8; // Heilungschance
        this.createdAt = new Date();
    }

    // Krankheit heilen
    cure() {
        const random = Math.random();
        return random < this.cureRate;
    }
}

// Verletzung-Klasse
class Injury {
    constructor(id, name, type, severity, treatment, healingTime) {
        this.id = id;
        this.name = name;
        this.type = type; // 'cut', 'burn', 'fracture', 'concussion', 'internal'
        this.severity = severity; // 1-5
        this.treatment = treatment; // Behandlungsmethode
        this.healingTime = healingTime; // Heilungszeit in Stunden
        this.painLevel = severity * 20; // Schmerzlevel 0-100
        this.createdAt = new Date();
    }

    // Verletzung heilen
    heal(amount) {
        this.severity = Math.max(0, this.severity - amount);
        this.painLevel = this.severity * 20;
        
        if (this.severity <= 0) {
            return { success: true, message: 'Verletzung geheilt!' };
        }
        
        return { success: false, message: 'Verletzung teilweise geheilt!' };
    }
}

// Medikament-Klasse
class Medication {
    constructor(id, name, type, effects, dosage, sideEffects, price) {
        this.id = id;
        this.name = name;
        this.type = type; // 'painkiller', 'antibiotic', 'vitamin', 'stimulant', 'sedative'
        this.effects = effects; // Wirkungen
        this.dosage = dosage; // Dosierung
        this.sideEffects = sideEffects; // Nebenwirkungen
        this.price = price;
        this.isPrescription = false; // Rezeptpflichtig
        this.createdAt = new Date();
    }

    // Medikament anwenden
    apply(playerId) {
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData) {
            return { success: false, message: 'Spieler nicht gefunden!' };
        }

        // Effekte anwenden
        this.effects.forEach(effect => {
            switch (effect.type) {
                case 'heal':
                    playerData.setHealth(Math.min(100, playerData.health + effect.value));
                    break;
                case 'reduce_pain':
                    // Schmerz reduzieren
                    break;
                case 'boost_energy':
                    playerData.setFatigue(Math.max(0, playerData.fatigue - effect.value));
                    break;
                case 'reduce_stress':
                    playerData.setStress(Math.max(0, playerData.stress - effect.value));
                    break;
            }
        });

        playerData.save();
        return { success: true, message: `${this.name} angewendet!` };
    }
}

// Krankenhaus-Klasse
class Hospital {
    constructor(id, name, location, capacity, services, staff) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.services = services; // Array von verfügbaren Services
        this.staff = staff; // Anzahl der Mitarbeiter
        this.patients = new Map();
        this.emergencyQueue = [];
        this.isOpen = true;
        this.createdAt = new Date();
    }

    // Patient aufnehmen
    admitPatient(playerId, condition, priority = 'normal') {
        if (this.patients.size >= this.capacity) {
            return { success: false, message: 'Krankenhaus ist voll!' };
        }

        const patient = {
            id: playerId,
            condition: condition,
            priority: priority,
            admittedAt: new Date(),
            status: 'admitted',
            treatment: null,
            room: null
        };

        this.patients.set(playerId, patient);

        if (priority === 'emergency') {
            this.emergencyQueue.push(playerId);
        }

        return { success: true, message: 'Patient aufgenommen!' };
    }

    // Patient entlassen
    dischargePatient(playerId) {
        const patient = this.patients.get(playerId);
        if (!patient) {
            return { success: false, message: 'Patient nicht gefunden!' };
        }

        this.patients.delete(playerId);
        
        // Aus Notfall-Queue entfernen
        const emergencyIndex = this.emergencyQueue.indexOf(playerId);
        if (emergencyIndex > -1) {
            this.emergencyQueue.splice(emergencyIndex, 1);
        }

        return { success: true, message: 'Patient entlassen!' };
    }

    // Behandlung durchführen
    treatPatient(playerId, treatment) {
        const patient = this.patients.get(playerId);
        if (!patient) {
            return { success: false, message: 'Patient nicht gefunden!' };
        }

        patient.treatment = treatment;
        patient.status = 'treated';

        // Behandlungskosten berechnen
        const cost = this.calculateTreatmentCost(treatment);
        
        // Spieler-Geld prüfen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData || !playerData.removeMoney(cost)) {
            return { success: false, message: 'Nicht genügend Geld für Behandlung!' };
        }

        playerData.save();

        return { success: true, message: `Behandlung durchgeführt! Kosten: ${cost}€`, cost: cost };
    }

    // Behandlungskosten berechnen
    calculateTreatmentCost(treatment) {
        const baseCost = 100;
        const treatmentCosts = {
            'surgery': 500,
            'medication': 50,
            'therapy': 150,
            'emergency': 300,
            'checkup': 75
        };

        return baseCost + (treatmentCosts[treatment] || 0);
    }

    // Krankenhaus-Informationen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            capacity: this.capacity,
            currentPatients: this.patients.size,
            services: this.services,
            staff: this.staff,
            isOpen: this.isOpen,
            emergencyQueue: this.emergencyQueue.length
        };
    }
}

// Health-Manager
class HealthManager {
    constructor() {
        this.hospitals = hospitals;
        this.medications = medications;
        this.diseases = diseases;
        this.injuries = injuries;
    }

    // Krankheit erstellen
    createDisease(name, symptoms, severity, contagious, treatment, duration) {
        const id = Date.now() + Math.random();
        const disease = new Disease(id, name, symptoms, severity, contagious, treatment, duration);
        this.diseases.set(id, disease);
        return { success: true, disease: disease };
    }

    // Verletzung erstellen
    createInjury(name, type, severity, treatment, healingTime) {
        const id = Date.now() + Math.random();
        const injury = new Injury(id, name, type, severity, treatment, healingTime);
        this.injuries.set(id, injury);
        return { success: true, injury: injury };
    }

    // Medikament erstellen
    createMedication(name, type, effects, dosage, sideEffects, price) {
        const id = Date.now() + Math.random();
        const medication = new Medication(id, name, type, effects, dosage, sideEffects, price);
        this.medications.set(id, medication);
        return { success: true, medication: medication };
    }

    // Krankenhaus erstellen
    createHospital(name, location, capacity, services, staff) {
        const id = Date.now() + Math.random();
        const hospital = new Hospital(id, name, location, capacity, services, staff);
        this.hospitals.set(id, hospital);
        return { success: true, hospital: hospital };
    }

    // Spieler-Gesundheit prüfen
    checkPlayerHealth(playerId) {
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData) {
            return { success: false, message: 'Spieler nicht gefunden!' };
        }

        const health = playerData.health;
        const armor = playerData.armor;
        const hunger = playerData.hunger;
        const thirst = playerData.thirst;
        const stress = playerData.stress;
        const fatigue = playerData.fatigue;

        let status = 'healthy';
        let issues = [];

        if (health < 25) {
            status = 'critical';
            issues.push('Kritische Gesundheit');
        } else if (health < 50) {
            status = 'poor';
            issues.push('Schlechte Gesundheit');
        }

        if (hunger < 25) {
            issues.push('Hunger');
        }

        if (thirst < 25) {
            issues.push('Durst');
        }

        if (stress > 75) {
            issues.push('Hoher Stress');
        }

        if (fatigue > 75) {
            issues.push('Erschöpfung');
        }

        return {
            success: true,
            status: status,
            health: health,
            armor: armor,
            hunger: hunger,
            thirst: thirst,
            stress: stress,
            fatigue: fatigue,
            issues: issues
        };
    }

    // Spieler heilen
    healPlayer(playerId, amount) {
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData) {
            return { success: false, message: 'Spieler nicht gefunden!' };
        }

        const newHealth = Math.min(100, playerData.health + amount);
        playerData.setHealth(newHealth);
        playerData.save();

        return { success: true, message: `Gesundheit um ${amount} wiederhergestellt!`, newHealth: newHealth };
    }
}

// Globale Instanz
const healthManager = new HealthManager();

// Vordefinierte Krankheiten
const predefinedDiseases = [
    {
        name: 'Grippe',
        symptoms: ['Fieber', 'Husten', 'Kopfschmerzen'],
        severity: 2,
        contagious: true,
        treatment: 'medication',
        duration: 7
    },
    {
        name: 'Erkältung',
        symptoms: ['Schnupfen', 'Halsweh'],
        severity: 1,
        contagious: true,
        treatment: 'medication',
        duration: 3
    },
    {
        name: 'Lungenentzündung',
        symptoms: ['Fieber', 'Husten', 'Atemnot'],
        severity: 4,
        contagious: false,
        treatment: 'surgery',
        duration: 14
    },
    {
        name: 'Herzinfarkt',
        symptoms: ['Brustschmerzen', 'Atemnot', 'Schwindel'],
        severity: 5,
        contagious: false,
        treatment: 'emergency',
        duration: 30
    }
];

// Vordefinierte Verletzungen
const predefinedInjuries = [
    {
        name: 'Schnittwunde',
        type: 'cut',
        severity: 2,
        treatment: 'medication',
        healingTime: 24
    },
    {
        name: 'Knochenbruch',
        type: 'fracture',
        severity: 4,
        treatment: 'surgery',
        healingTime: 168 // 7 Tage
    },
    {
        name: 'Verbrennung',
        type: 'burn',
        severity: 3,
        treatment: 'medication',
        healingTime: 72 // 3 Tage
    },
    {
        name: 'Gehirnerschütterung',
        type: 'concussion',
        severity: 3,
        treatment: 'therapy',
        healingTime: 120 // 5 Tage
    }
];

// Vordefinierte Medikamente
const predefinedMedications = [
    {
        name: 'Aspirin',
        type: 'painkiller',
        effects: [{ type: 'reduce_pain', value: 30 }],
        dosage: '2x täglich',
        sideEffects: ['Magenreizung'],
        price: 15
    },
    {
        name: 'Antibiotikum',
        type: 'antibiotic',
        effects: [{ type: 'heal', value: 20 }],
        dosage: '3x täglich',
        sideEffects: ['Durchfall'],
        price: 25
    },
    {
        name: 'Vitamin C',
        type: 'vitamin',
        effects: [{ type: 'boost_energy', value: 15 }],
        dosage: '1x täglich',
        sideEffects: [],
        price: 10
    },
    {
        name: 'Beruhigungsmittel',
        type: 'sedative',
        effects: [{ type: 'reduce_stress', value: 40 }],
        dosage: '1x bei Bedarf',
        sideEffects: ['Müdigkeit'],
        price: 20
    }
];

// Vordefinierte Daten erstellen
predefinedDiseases.forEach(diseaseData => {
    healthManager.createDisease(
        diseaseData.name,
        diseaseData.symptoms,
        diseaseData.severity,
        diseaseData.contagious,
        diseaseData.treatment,
        diseaseData.duration
    );
});

predefinedInjuries.forEach(injuryData => {
    healthManager.createInjury(
        injuryData.name,
        injuryData.type,
        injuryData.severity,
        injuryData.treatment,
        injuryData.healingTime
    );
});

predefinedMedications.forEach(medicationData => {
    healthManager.createMedication(
        medicationData.name,
        medicationData.type,
        medicationData.effects,
        medicationData.dosage,
        medicationData.sideEffects,
        medicationData.price
    );
});

// Events
mp.events.add('health:check', (player) => {
    const result = healthManager.checkPlayerHealth(player.id);
    player.outputChatBox(`=== Gesundheitsstatus ===`);
    player.outputChatBox(`Status: ${result.status}`);
    player.outputChatBox(`Gesundheit: ${result.health}%`);
    player.outputChatBox(`Rüstung: ${result.armor}%`);
    player.outputChatBox(`Hunger: ${result.hunger}%`);
    player.outputChatBox(`Durst: ${result.thirst}%`);
    player.outputChatBox(`Stress: ${result.stress}%`);
    player.outputChatBox(`Müdigkeit: ${result.fatigue}%`);
    
    if (result.issues.length > 0) {
        player.outputChatBox(`Probleme: ${result.issues.join(', ')}`);
    }
});

mp.events.add('health:heal', (player, amount) => {
    const result = healthManager.healPlayer(player.id, amount);
    player.outputChatBox(result.message);
});

mp.events.add('health:admit', (player, hospitalId, condition, priority) => {
    const hospital = healthManager.hospitals.get(hospitalId);
    if (!hospital) {
        player.outputChatBox('Krankenhaus nicht gefunden!');
        return;
    }

    const result = hospital.admitPatient(player.id, condition, priority);
    player.outputChatBox(result.message);
});

mp.events.add('health:treat', (player, hospitalId, treatment) => {
    const hospital = healthManager.hospitals.get(hospitalId);
    if (!hospital) {
        player.outputChatBox('Krankenhaus nicht gefunden!');
        return;
    }

    const result = hospital.treatPatient(player.id, treatment);
    player.outputChatBox(result.message);
});

mp.events.add('health:medicate', (player, medicationId) => {
    const medication = healthManager.medications.get(medicationId);
    if (!medication) {
        player.outputChatBox('Medikament nicht gefunden!');
        return;
    }

    const result = medication.apply(player.id);
    player.outputChatBox(result.message);
});

// Commands
mp.events.addCommand('health', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /health [check|heal|hospitals|medications|diseases|injuries]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'check':
            mp.events.call('health:check', player);
            break;
            
        case 'heal':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /health heal [Betrag]');
                return;
            }
            mp.events.call('health:heal', player, parseInt(args[0]));
            break;
            
        case 'hospitals':
            player.outputChatBox('=== Krankenhäuser ===');
            healthManager.hospitals.forEach(hospital => {
                const info = hospital.getInfo();
                player.outputChatBox(`${info.name} - ${info.location} - ${info.currentPatients}/${info.capacity} Patienten`);
            });
            break;
            
        case 'medications':
            player.outputChatBox('=== Medikamente ===');
            healthManager.medications.forEach(medication => {
                player.outputChatBox(`${medication.name} - ${medication.type} - ${medication.price}€`);
            });
            break;
            
        case 'diseases':
            player.outputChatBox('=== Krankheiten ===');
            healthManager.diseases.forEach(disease => {
                player.outputChatBox(`${disease.name} - Schwere: ${disease.severity}/5 - Ansteckend: ${disease.contagious ? 'Ja' : 'Nein'}`);
            });
            break;
            
        case 'injuries':
            player.outputChatBox('=== Verletzungen ===');
            healthManager.injuries.forEach(injury => {
                player.outputChatBox(`${injury.name} - Typ: ${injury.type} - Schwere: ${injury.severity}/5`);
            });
            break;
    }
});

mp.events.addCommand('hospital', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /hospital [admit|treat|discharge|info]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'admit':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /hospital admit [Krankenhaus-ID] [Zustand] [Priorität]');
                return;
            }
            mp.events.call('health:admit', player, args[0], args[1], args[2] || 'normal');
            break;
            
        case 'treat':
            if (!args[0] || !args[1]) {
                player.outputChatBox('Verwendung: /hospital treat [Krankenhaus-ID] [Behandlung]');
                return;
            }
            mp.events.call('health:treat', player, args[0], args[1]);
            break;
            
        case 'discharge':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /hospital discharge [Krankenhaus-ID]');
                return;
            }
            const hospital = healthManager.hospitals.get(args[0]);
            if (hospital) {
                const result = hospital.dischargePatient(player.id);
                player.outputChatBox(result.message);
            } else {
                player.outputChatBox('Krankenhaus nicht gefunden!');
            }
            break;
            
        case 'info':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /hospital info [Krankenhaus-ID]');
                return;
            }
            const hospital2 = healthManager.hospitals.get(args[0]);
            if (hospital2) {
                const info = hospital2.getInfo();
                player.outputChatBox(`=== ${info.name} ===`);
                player.outputChatBox(`Standort: ${info.location}`);
                player.outputChatBox(`Kapazität: ${info.currentPatients}/${info.capacity}`);
                player.outputChatBox(`Mitarbeiter: ${info.staff}`);
                player.outputChatBox(`Services: ${info.services.join(', ')}`);
                player.outputChatBox(`Notfall-Queue: ${info.emergencyQueue}`);
            } else {
                player.outputChatBox('Krankenhaus nicht gefunden!');
            }
            break;
    }
});

mp.events.addCommand('medicate', (player, fullText, medicationId) => {
    if (!medicationId) {
        player.outputChatBox('Verwendung: /medicate [Medikament-ID]');
        return;
    }

    mp.events.call('health:medicate', player, medicationId);
});

console.log('[HEALTH] Health-System geladen!');

module.exports = { Disease, Injury, Medication, Hospital, HealthManager, healthManager };
