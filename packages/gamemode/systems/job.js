// Job System - Vollständiges Job-System mit Bewerbungen, Gehältern und Arbeitszeiten
// Implementiert das umfassende Job-System für Horizont-City

const config = require('../../../conf.json');

// Job-Datenbank
const jobs = new Map();
const jobApplications = new Map();
const jobAssignments = new Map();
const jobPayments = new Map();

// Job-Klasse
class Job {
    constructor(id, name, description, category, salary, requirements, location, maxEmployees) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category; // 'police', 'ems', 'mechanic', 'taxi', 'delivery', 'construction', 'retail', 'restaurant'
        this.salary = salary; // pro Stunde
        this.requirements = requirements; // Mindestlevel, Fähigkeiten, etc.
        this.location = location;
        this.maxEmployees = maxEmployees;
        this.currentEmployees = 0;
        this.isActive = true;
        this.createdAt = new Date();
        this.workHours = {
            start: 8, // 8:00 Uhr
            end: 17,  // 17:00 Uhr
            days: [1, 2, 3, 4, 5] // Montag bis Freitag
        };
        this.benefits = [];
        this.experience = 0; // Erfahrungspunkte pro Stunde
    }

    // Bewerbung einreichen
    apply(playerId, coverLetter) {
        if (this.currentEmployees >= this.maxEmployees) {
            return { success: false, message: 'Keine freien Stellen verfügbar!' };
        }

        if (!this.isActive) {
            return { success: false, message: 'Job ist nicht mehr verfügbar!' };
        }

        // Anforderungen prüfen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (!playerData) {
            return { success: false, message: 'Spieler nicht gefunden!' };
        }

        if (playerData.level < this.requirements.minLevel) {
            return { success: false, message: `Mindestlevel ${this.requirements.minLevel} erforderlich!` };
        }

        // Bewerbung erstellen
        const applicationId = Date.now() + Math.random();
        const application = {
            id: applicationId,
            jobId: this.id,
            playerId: playerId,
            coverLetter: coverLetter,
            status: 'pending', // pending, accepted, rejected
            appliedAt: new Date(),
            reviewedAt: null,
            reviewedBy: null
        };

        jobApplications.set(applicationId, application);
        return { success: true, message: 'Bewerbung eingereicht!', applicationId: applicationId };
    }

    // Bewerbung annehmen
    acceptApplication(applicationId, reviewerId) {
        const application = jobApplications.get(applicationId);
        if (!application) {
            return { success: false, message: 'Bewerbung nicht gefunden!' };
        }

        if (application.jobId !== this.id) {
            return { success: false, message: 'Bewerbung gehört nicht zu diesem Job!' };
        }

        if (this.currentEmployees >= this.maxEmployees) {
            return { success: false, message: 'Keine freien Stellen verfügbar!' };
        }

        application.status = 'accepted';
        application.reviewedAt = new Date();
        application.reviewedBy = reviewerId;

        this.currentEmployees++;

        // Job-Zuweisung erstellen
        const assignmentId = Date.now() + Math.random();
        const assignment = {
            id: assignmentId,
            jobId: this.id,
            playerId: application.playerId,
            startDate: new Date(),
            status: 'active',
            hoursWorked: 0,
            totalEarnings: 0
        };

        jobAssignments.set(assignmentId, assignment);

        return { success: true, message: 'Bewerbung angenommen!', assignmentId: assignmentId };
    }

    // Bewerbung ablehnen
    rejectApplication(applicationId, reviewerId, reason) {
        const application = jobApplications.get(applicationId);
        if (!application) {
            return { success: false, message: 'Bewerbung nicht gefunden!' };
        }

        application.status = 'rejected';
        application.reviewedAt = new Date();
        application.reviewedBy = reviewerId;
        application.rejectionReason = reason;

        return { success: true, message: 'Bewerbung abgelehnt!', reason: reason };
    }

    // Arbeit beginnen
    startWork(playerId) {
        const assignment = this.getPlayerAssignment(playerId);
        if (!assignment) {
            return { success: false, message: 'Du hast keine Zuweisung für diesen Job!' };
        }

        if (assignment.status !== 'active') {
            return { success: false, message: 'Job-Zuweisung ist nicht aktiv!' };
        }

        // Arbeitszeiten prüfen
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay();

        if (!this.workHours.days.includes(currentDay)) {
            return { success: false, message: 'Heute ist kein Arbeitstag!' };
        }

        if (currentHour < this.workHours.start || currentHour >= this.workHours.end) {
            return { success: false, message: 'Arbeitszeit ist vorbei!' };
        }

        assignment.status = 'working';
        assignment.workStartTime = now;

        return { success: true, message: 'Arbeit begonnen!' };
    }

    // Arbeit beenden
    endWork(playerId) {
        const assignment = this.getPlayerAssignment(playerId);
        if (!assignment) {
            return { success: false, message: 'Du hast keine Zuweisung für diesen Job!' };
        }

        if (assignment.status !== 'working') {
            return { success: false, message: 'Du arbeitest gerade nicht!' };
        }

        const now = new Date();
        const workTime = now - assignment.workStartTime;
        const workHours = workTime / (1000 * 60 * 60); // Stunden

        // Gehalt berechnen
        const earnings = workHours * this.salary;
        assignment.hoursWorked += workHours;
        assignment.totalEarnings += earnings;
        assignment.status = 'active';
        assignment.workStartTime = null;

        // Spieler bezahlen
        const playerData = require('./player').playerManager.getPlayer(playerId);
        if (playerData) {
            playerData.addMoney(earnings);
            playerData.stats.jobsCompleted++;
            playerData.stats.moneyEarned += earnings;
            playerData.addExperience(this.experience * workHours);
            playerData.save();
        }

        // Zahlung aufzeichnen
        const paymentId = Date.now() + Math.random();
        const payment = {
            id: paymentId,
            jobId: this.id,
            playerId: playerId,
            amount: earnings,
            hours: workHours,
            date: now
        };

        jobPayments.set(paymentId, payment);

        return { 
            success: true, 
            message: `Arbeit beendet! Verdient: ${earnings.toFixed(2)}€ (${workHours.toFixed(2)} Stunden)`,
            earnings: earnings,
            hours: workHours
        };
    }

    // Spieler-Zuweisung abrufen
    getPlayerAssignment(playerId) {
        for (let assignment of jobAssignments.values()) {
            if (assignment.jobId === this.id && assignment.playerId === playerId) {
                return assignment;
            }
        }
        return null;
    }

    // Job-Informationen
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            category: this.category,
            salary: this.salary,
            requirements: this.requirements,
            location: this.location,
            maxEmployees: this.maxEmployees,
            currentEmployees: this.currentEmployees,
            isActive: this.isActive,
            workHours: this.workHours,
            benefits: this.benefits,
            experience: this.experience
        };
    }
}

// Job-Manager
class JobManager {
    constructor() {
        this.jobs = jobs;
        this.applications = jobApplications;
        this.assignments = jobAssignments;
        this.payments = jobPayments;
    }

    // Job erstellen
    createJob(name, description, category, salary, requirements, location, maxEmployees) {
        const id = this.generateId();
        const job = new Job(id, name, description, category, salary, requirements, location, maxEmployees);
        this.jobs.set(id, job);
        return { success: true, job: job };
    }

    // Job löschen
    deleteJob(jobId) {
        const job = this.jobs.get(jobId);
        if (!job) {
            return { success: false, message: 'Job nicht gefunden!' };
        }

        job.isActive = false;
        return { success: true, message: 'Job deaktiviert!' };
    }

    // Verfügbare Jobs abrufen
    getAvailableJobs() {
        const availableJobs = [];
        this.jobs.forEach(job => {
            if (job.isActive && job.currentEmployees < job.maxEmployees) {
                availableJobs.push(job.getInfo());
            }
        });
        return availableJobs;
    }

    // Spieler-Jobs abrufen
    getPlayerJobs(playerId) {
        const playerJobs = [];
        this.assignments.forEach(assignment => {
            if (assignment.playerId === playerId) {
                const job = this.jobs.get(assignment.jobId);
                if (job) {
                    playerJobs.push({
                        job: job.getInfo(),
                        assignment: assignment
                    });
                }
            }
        });
        return playerJobs;
    }

    // Eindeutige ID generieren
    generateId() {
        return 'job_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Globale Instanz
const jobManager = new JobManager();

// Vordefinierte Jobs erstellen
const predefinedJobs = [
    {
        name: 'Polizist',
        description: 'Aufrechterhaltung der Ordnung und Sicherheit in der Stadt',
        category: 'police',
        salary: 25,
        requirements: { minLevel: 5, skills: ['leadership', 'communication'] },
        location: 'Polizeiwache',
        maxEmployees: 20
    },
    {
        name: 'Sanitäter',
        description: 'Medizinische Hilfe und Rettungsdienste',
        category: 'ems',
        salary: 22,
        requirements: { minLevel: 3, skills: ['medical', 'empathy'] },
        location: 'Krankenhaus',
        maxEmployees: 15
    },
    {
        name: 'Mechaniker',
        description: 'Reparatur und Wartung von Fahrzeugen',
        category: 'mechanic',
        salary: 18,
        requirements: { minLevel: 2, skills: ['technical', 'repair'] },
        location: 'Werkstatt',
        maxEmployees: 10
    },
    {
        name: 'Taxifahrer',
        description: 'Transport von Passagieren durch die Stadt',
        category: 'taxi',
        salary: 15,
        requirements: { minLevel: 1, skills: ['driving', 'customer_service'] },
        location: 'Taxi-Zentrale',
        maxEmployees: 25
    },
    {
        name: 'Lieferant',
        description: 'Lieferung von Paketen und Waren',
        category: 'delivery',
        salary: 12,
        requirements: { minLevel: 1, skills: ['driving', 'time_management'] },
        location: 'Lieferzentrum',
        maxEmployees: 30
    },
    {
        name: 'Bauarbeiter',
        description: 'Bauarbeiten und Renovierungen',
        category: 'construction',
        salary: 16,
        requirements: { minLevel: 2, skills: ['physical', 'construction'] },
        location: 'Baustelle',
        maxEmployees: 20
    },
    {
        name: 'Verkäufer',
        description: 'Verkauf von Waren in Geschäften',
        category: 'retail',
        salary: 14,
        requirements: { minLevel: 1, skills: ['customer_service', 'sales'] },
        location: 'Einkaufszentrum',
        maxEmployees: 40
    },
    {
        name: 'Koch',
        description: 'Zubereitung von Speisen in Restaurants',
        category: 'restaurant',
        salary: 13,
        requirements: { minLevel: 1, skills: ['cooking', 'creativity'] },
        location: 'Restaurant',
        maxEmployees: 25
    }
];

// Vordefinierte Jobs erstellen
predefinedJobs.forEach(jobData => {
    jobManager.createJob(
        jobData.name,
        jobData.description,
        jobData.category,
        jobData.salary,
        jobData.requirements,
        jobData.location,
        jobData.maxEmployees
    );
});

// Events
mp.events.add('job:apply', (player, jobId, coverLetter) => {
    const job = jobManager.jobs.get(jobId);
    if (!job) {
        player.outputChatBox('Job nicht gefunden!');
        return;
    }

    const result = job.apply(player.id, coverLetter);
    player.outputChatBox(result.message);
    
    if (result.success) {
        mp.events.call('job:updateUI', player, jobManager.getPlayerJobs(player.id));
    }
});

mp.events.add('job:start', (player, jobId) => {
    const job = jobManager.jobs.get(jobId);
    if (!job) {
        player.outputChatBox('Job nicht gefunden!');
        return;
    }

    const result = job.startWork(player.id);
    player.outputChatBox(result.message);
});

mp.events.add('job:end', (player, jobId) => {
    const job = jobManager.jobs.get(jobId);
    if (!job) {
        player.outputChatBox('Job nicht gefunden!');
        return;
    }

    const result = job.endWork(player.id);
    player.outputChatBox(result.message);
});

mp.events.add('job:acceptApplication', (player, applicationId) => {
    const application = jobManager.applications.get(applicationId);
    if (!application) {
        player.outputChatBox('Bewerbung nicht gefunden!');
        return;
    }

    const job = jobManager.jobs.get(application.jobId);
    if (!job) {
        player.outputChatBox('Job nicht gefunden!');
        return;
    }

    const result = job.acceptApplication(applicationId, player.id);
    player.outputChatBox(result.message);
});

mp.events.add('job:rejectApplication', (player, applicationId, reason) => {
    const application = jobManager.applications.get(applicationId);
    if (!application) {
        player.outputChatBox('Bewerbung nicht gefunden!');
        return;
    }

    const job = jobManager.jobs.get(application.jobId);
    if (!job) {
        player.outputChatBox('Job nicht gefunden!');
        return;
    }

    const result = job.rejectApplication(applicationId, player.id, reason);
    player.outputChatBox(result.message);
});

// Commands
mp.events.addCommand('jobs', (player, fullText, action, ...args) => {
    if (!action) {
        player.outputChatBox('Verwendung: /jobs [list|apply|start|end|myjobs|applications]');
        return;
    }

    switch (action.toLowerCase()) {
        case 'list':
            const availableJobs = jobManager.getAvailableJobs();
            player.outputChatBox('=== Verfügbare Jobs ===');
            availableJobs.forEach(job => {
                player.outputChatBox(`${job.name} - ${job.category} - ${job.salary}€/h - ${job.currentEmployees}/${job.maxEmployees} Mitarbeiter`);
            });
            break;
            
        case 'apply':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /jobs apply [Job-ID] [Bewerbungsschreiben]');
                return;
            }
            const coverLetter = args.slice(1).join(' ') || 'Ich bewerbe mich für diesen Job.';
            mp.events.call('job:apply', player, args[0], coverLetter);
            break;
            
        case 'start':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /jobs start [Job-ID]');
                return;
            }
            mp.events.call('job:start', player, args[0]);
            break;
            
        case 'end':
            if (!args[0]) {
                player.outputChatBox('Verwendung: /jobs end [Job-ID]');
                return;
            }
            mp.events.call('job:end', player, args[0]);
            break;
            
        case 'myjobs':
            const playerJobs = jobManager.getPlayerJobs(player.id);
            player.outputChatBox('=== Meine Jobs ===');
            if (playerJobs.length === 0) {
                player.outputChatBox('Du hast keine Jobs!');
            } else {
                playerJobs.forEach(({ job, assignment }) => {
                    player.outputChatBox(`${job.name} - Status: ${assignment.status} - Verdient: ${assignment.totalEarnings.toFixed(2)}€`);
                });
            }
            break;
            
        case 'applications':
            player.outputChatBox('=== Meine Bewerbungen ===');
            jobManager.applications.forEach(application => {
                if (application.playerId === player.id) {
                    const job = jobManager.jobs.get(application.jobId);
                    player.outputChatBox(`${job.name} - Status: ${application.status}`);
                }
            });
            break;
    }
});

mp.events.addCommand('jobinfo', (player, fullText, jobId) => {
    if (!jobId) {
        player.outputChatBox('Verwendung: /jobinfo [Job-ID]');
        return;
    }

    const job = jobManager.jobs.get(jobId);
    if (!job) {
        player.outputChatBox('Job nicht gefunden!');
        return;
    }

    const info = job.getInfo();
    player.outputChatBox(`=== ${info.name} ===`);
    player.outputChatBox(`Beschreibung: ${info.description}`);
    player.outputChatBox(`Kategorie: ${info.category}`);
    player.outputChatBox(`Gehalt: ${info.salary}€/Stunde`);
    player.outputChatBox(`Anforderungen: Level ${info.requirements.minLevel}`);
    player.outputChatBox(`Standort: ${info.location}`);
    player.outputChatBox(`Mitarbeiter: ${info.currentEmployees}/${info.maxEmployees}`);
    player.outputChatBox(`Arbeitszeiten: ${info.workHours.start}:00 - ${info.workHours.end}:00`);
    player.outputChatBox(`Erfahrung: ${info.experience} XP/Stunde`);
});

console.log('[JOB] Job-System geladen!');

module.exports = { Job, JobManager, jobManager };
