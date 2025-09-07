// Unemployment System - Arbeitslosensystem mit Unterstützung und Vermittlung
// Behandelt alle Arbeitslosen-Funktionen für Horizont-City Roleplay

const unemploymentSystem = {
    // Arbeitslosen-Status
    unemploymentStatus: {
        EMPLOYED: 'employed',
        UNEMPLOYED: 'unemployed',
        SEEKING_WORK: 'seeking_work',
        TRAINING: 'training',
        RETIRED: 'retired',
        DISABLED: 'disabled',
        STUDENT: 'student',
        SELF_EMPLOYED: 'self_employed',
        PART_TIME: 'part_time',
        TEMPORARY: 'temporary'
    },
    
    // Arbeitslosen-Unterstützung
    unemploymentBenefits: {
        BASIC: { name: 'Grundsicherung', amount: 500, duration: 12, requirements: ['registered', 'job_search'] },
        EXTENDED: { name: 'Erweiterte Unterstützung', amount: 750, duration: 24, requirements: ['registered', 'job_search', 'training'] },
        SPECIAL: { name: 'Sonderunterstützung', amount: 1000, duration: 36, requirements: ['registered', 'job_search', 'training', 'special_circumstances'] },
        EMERGENCY: { name: 'Notfallhilfe', amount: 300, duration: 6, requirements: ['registered', 'emergency'] }
    },
    
    // Job-Vermittlung
    jobMatching: {
        SKILLS: 'skills',
        EXPERIENCE: 'experience',
        EDUCATION: 'education',
        LOCATION: 'location',
        PREFERENCES: 'preferences',
        AVAILABILITY: 'availability',
        SALARY: 'salary',
        BENEFITS: 'benefits'
    },
    
    // Trainings-Programme
    trainingPrograms: {
        BASIC_SKILLS: { name: 'Grundfertigkeiten', duration: 4, cost: 0, skills: ['communication', 'computer', 'math'] },
        TECHNICAL_SKILLS: { name: 'Technische Fertigkeiten', duration: 8, cost: 200, skills: ['programming', 'mechanics', 'electronics'] },
        BUSINESS_SKILLS: { name: 'Business-Fertigkeiten', duration: 6, cost: 150, skills: ['management', 'marketing', 'finance'] },
        TRADE_SKILLS: { name: 'Handwerks-Fertigkeiten', duration: 10, cost: 300, skills: ['construction', 'repair', 'crafting'] },
        SERVICE_SKILLS: { name: 'Service-Fertigkeiten', duration: 3, cost: 100, skills: ['customer_service', 'hospitality', 'sales'] },
        CREATIVE_SKILLS: { name: 'Kreative Fertigkeiten', duration: 5, cost: 250, skills: ['design', 'art', 'writing'] }
    },
    
    // Arbeitslosen-Registrierung
    unemploymentRegistrations: new Map(),
    
    // Job-Vermittlungen
    jobPlacements: new Map(),
    
    // Trainings-Teilnehmer
    trainingParticipants: new Map(),
    
    // Arbeitslosen-Statistiken
    unemploymentStats: {
        totalUnemployed: 0,
        newRegistrations: 0,
        jobPlacements: 0,
        trainingCompletions: 0,
        averageUnemploymentDuration: 0
    },
    
    // Arbeitslosen-System-Initialisierung
    init() {
        console.log('[UNEMPLOYMENT] Arbeitslosen-System initialisiert');
        this.initializeUnemploymentOffice();
    },
    
    // Arbeitslosen-Amt initialisieren
    initializeUnemploymentOffice() {
        // Hier würden bestehende Registrierungen aus der Datenbank geladen
        console.log('[UNEMPLOYMENT] Arbeitslosen-Amt initialisiert');
    },
    
    // Arbeitslos melden
    registerUnemployed(player, reason, previousJob, skills) {
        if (player.unemploymentStatus === 'unemployed') {
            player.outputChatBox('Du bist bereits als arbeitslos registriert!');
            return false;
        }
        
        const registrationId = `unemployment_${player.id}_${Date.now()}`;
        const registration = {
            id: registrationId,
            playerId: player.id,
            playerName: player.name,
            reason: reason,
            previousJob: previousJob,
            skills: skills || [],
            status: 'unemployed',
            registrationDate: Date.now(),
            lastJobSearch: Date.now(),
            benefitsReceived: 0,
            trainingCompleted: [],
            jobApplications: [],
            status: 'active',
            created: Date.now()
        };
        
        this.unemploymentRegistrations.set(registrationId, registration);
        
        player.unemploymentStatus = 'unemployed';
        player.unemploymentId = registrationId;
        player.job = null;
        player.salary = 0;
        
        // Grundsicherung gewähren
        this.grantBenefits(player, 'BASIC');
        
        player.outputChatBox('Du hast dich als arbeitslos registriert!');
        player.outputChatBox('Du erhältst Grundsicherung von $500 pro Woche.');
        player.call('ui:show', 'UnemploymentRegistered', { registration: registration });
        
        this.unemploymentStats.totalUnemployed++;
        this.unemploymentStats.newRegistrations++;
        
        console.log(`[UNEMPLOYMENT] Spieler ${player.id} als arbeitslos registriert`);
        return registrationId;
    },
    
    // Arbeitslosen-Unterstützung gewähren
    grantBenefits(player, benefitType) {
        const registration = this.getUnemploymentRegistration(player);
        if (!registration) {
            player.outputChatBox('Du bist nicht als arbeitslos registriert!');
            return false;
        }
        
        const benefit = this.unemploymentBenefits[benefitType];
        if (!benefit) {
            player.outputChatBox('Unterstützungstyp nicht gefunden!');
            return false;
        }
        
        // Anforderungen prüfen
        if (!this.checkBenefitRequirements(registration, benefit)) {
            player.outputChatBox('Du erfüllst nicht die Anforderungen für diese Unterstützung!');
            return false;
        }
        
        player.money += benefit.amount;
        registration.benefitsReceived += benefit.amount;
        
        player.outputChatBox(`Du hast ${benefit.name} in Höhe von $${benefit.amount} erhalten!`);
        player.call('ui:show', 'BenefitsReceived', { benefit: benefit, amount: benefit.amount });
        
        console.log(`[UNEMPLOYMENT] ${benefit.name} für Spieler ${player.id} gewährt`);
        return true;
    },
    
    // Anforderungen für Unterstützung prüfen
    checkBenefitRequirements(registration, benefit) {
        return benefit.requirements.every(req => {
            switch (req) {
                case 'registered':
                    return registration.status === 'active';
                case 'job_search':
                    return (Date.now() - registration.lastJobSearch) < (7 * 24 * 60 * 60 * 1000); // 7 Tage
                case 'training':
                    return registration.trainingCompleted.length > 0;
                case 'special_circumstances':
                    return registration.reason === 'disability' || registration.reason === 'family';
                case 'emergency':
                    return registration.reason === 'emergency';
                default:
                    return true;
            }
        });
    },
    
    // Job-Suche
    searchJobs(player, criteria) {
        const registration = this.getUnemploymentRegistration(player);
        if (!registration) {
            player.outputChatBox('Du musst als arbeitslos registriert sein!');
            return false;
        }
        
        // Job-Suche aktualisieren
        registration.lastJobSearch = Date.now();
        
        // Verfügbare Jobs finden
        const availableJobs = this.findMatchingJobs(registration, criteria);
        
        if (availableJobs.length === 0) {
            player.outputChatBox('Keine passenden Jobs gefunden!');
            return false;
        }
        
        player.outputChatBox(`Gefunden: ${availableJobs.length} passende Jobs`);
        player.call('ui:show', 'JobSearchResults', { jobs: availableJobs });
        
        console.log(`[UNEMPLOYMENT] Job-Suche für Spieler ${player.id}: ${availableJobs.length} Jobs gefunden`);
        return availableJobs;
    },
    
    // Passende Jobs finden
    findMatchingJobs(registration, criteria) {
        // Hier würde die Job-Datenbank durchsucht werden
        const mockJobs = [
            {
                id: 'job_1',
                title: 'Kassierer',
                company: 'Supermarkt',
                salary: 800,
                requirements: ['communication'],
                location: 'Downtown',
                type: 'part_time'
            },
            {
                id: 'job_2',
                title: 'Fahrer',
                company: 'Taxi-Unternehmen',
                salary: 1200,
                requirements: ['driving'],
                location: 'City',
                type: 'full_time'
            },
            {
                id: 'job_3',
                title: 'Verkäufer',
                company: 'Modegeschäft',
                salary: 900,
                requirements: ['communication', 'sales'],
                location: 'Mall',
                type: 'part_time'
            }
        ];
        
        return mockJobs.filter(job => {
            // Kriterien-basierte Filterung
            if (criteria.salary && job.salary < criteria.salary) return false;
            if (criteria.location && job.location !== criteria.location) return false;
            if (criteria.type && job.type !== criteria.type) return false;
            
            // Skill-basierte Filterung
            const hasRequiredSkills = job.requirements.every(req => 
                registration.skills.includes(req)
            );
            
            return hasRequiredSkills;
        });
    },
    
    // Job bewerben
    applyForJob(player, jobId, coverLetter) {
        const registration = this.getUnemploymentRegistration(player);
        if (!registration) {
            player.outputChatBox('Du musst als arbeitslos registriert sein!');
            return false;
        }
        
        const applicationId = `application_${player.id}_${Date.now()}`;
        const application = {
            id: applicationId,
            playerId: player.id,
            playerName: player.name,
            jobId: jobId,
            coverLetter: coverLetter || 'Standard-Bewerbung',
            applicationDate: Date.now(),
            status: 'pending',
            created: Date.now()
        };
        
        registration.jobApplications.push(applicationId);
        
        player.outputChatBox('Bewerbung eingereicht! Du wirst benachrichtigt, wenn sich der Status ändert.');
        player.call('ui:show', 'JobApplicationSubmitted', { application: application });
        
        console.log(`[UNEMPLOYMENT] Bewerbung von Spieler ${player.id} für Job ${jobId}`);
        return applicationId;
    },
    
    // Training beginnen
    startTraining(player, programType) {
        const registration = this.getUnemploymentRegistration(player);
        if (!registration) {
            player.outputChatBox('Du musst als arbeitslos registriert sein!');
            return false;
        }
        
        const program = this.trainingPrograms[programType];
        if (!program) {
            player.outputChatBox('Trainings-Programm nicht gefunden!');
            return false;
        }
        
        if (player.money < program.cost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${program.cost}`);
            return false;
        }
        
        const trainingId = `training_${player.id}_${Date.now()}`;
        const training = {
            id: trainingId,
            playerId: player.id,
            playerName: player.name,
            programType: programType,
            program: program,
            startDate: Date.now(),
            endDate: Date.now() + (program.duration * 7 * 24 * 60 * 60 * 1000), // Wochen in Millisekunden
            status: 'active',
            progress: 0,
            created: Date.now()
        };
        
        this.trainingParticipants.set(trainingId, training);
        
        player.money -= program.cost;
        player.trainingId = trainingId;
        player.trainingStatus = 'training';
        
        player.outputChatBox(`Training "${program.name}" gestartet! Dauer: ${program.duration} Wochen`);
        player.call('ui:show', 'TrainingStarted', { training: training });
        
        console.log(`[UNEMPLOYMENT] Training ${programType} für Spieler ${player.id} gestartet`);
        return trainingId;
    },
    
    // Training abschließen
    completeTraining(player) {
        const training = this.trainingParticipants.get(player.trainingId);
        if (!training) {
            player.outputChatBox('Du bist in keinem Training!');
            return false;
        }
        
        if (Date.now() < training.endDate) {
            player.outputChatBox('Training noch nicht abgeschlossen!');
            return false;
        }
        
        training.status = 'completed';
        training.progress = 100;
        
        // Skills hinzufügen
        const registration = this.getUnemploymentRegistration(player);
        if (registration) {
            training.program.skills.forEach(skill => {
                if (!registration.skills.includes(skill)) {
                    registration.skills.push(skill);
                }
            });
            registration.trainingCompleted.push(training.id);
        }
        
        player.trainingId = null;
        player.trainingStatus = 'unemployed';
        
        player.outputChatBox(`Training "${training.program.name}" abgeschlossen!`);
        player.outputChatBox(`Neue Skills: ${training.program.skills.join(', ')}`);
        player.call('ui:show', 'TrainingCompleted', { training: training });
        
        this.unemploymentStats.trainingCompletions++;
        
        console.log(`[UNEMPLOYMENT] Training für Spieler ${player.id} abgeschlossen`);
        return true;
    },
    
    // Arbeitslos-Registrierung abrufen
    getUnemploymentRegistration(player) {
        const registrations = Array.from(this.unemploymentRegistrations.values()).filter(reg => 
            reg.playerId === player.id && reg.status === 'active'
        );
        
        return registrations.length > 0 ? registrations[0] : null;
    },
    
    // Arbeitslos-Statistiken
    getStatistics() {
        return {
            ...this.unemploymentStats,
            activeRegistrations: this.unemploymentRegistrations.size,
            activeTrainings: this.trainingParticipants.size,
            jobPlacements: this.jobPlacements.size
        };
    }
};

// Events
mp.events.add('unemployment:register', (player, reason, previousJob, skills) => {
    unemploymentSystem.registerUnemployed(player, reason, previousJob, skills);
});

mp.events.add('unemployment:searchJobs', (player, criteria) => {
    unemploymentSystem.searchJobs(player, criteria);
});

mp.events.add('unemployment:applyJob', (player, jobId, coverLetter) => {
    unemploymentSystem.applyForJob(player, jobId, coverLetter);
});

mp.events.add('unemployment:startTraining', (player, programType) => {
    unemploymentSystem.startTraining(player, programType);
});

mp.events.add('unemployment:completeTraining', (player) => {
    unemploymentSystem.completeTraining(player);
});

// Commands
mp.events.addCommand('unemployment', (player, fullText, action, programType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /unemployment [register|search|apply|training|benefits] [Programm]');
        player.outputChatBox('Verfügbare Programme: BASIC_SKILLS, TECHNICAL_SKILLS, BUSINESS_SKILLS, TRADE_SKILLS');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'register':
            unemploymentSystem.registerUnemployed(player, 'job_loss', 'Previous Job', ['communication']);
            break;
            
        case 'search':
            unemploymentSystem.searchJobs(player, { salary: 500, location: 'any' });
            break;
            
        case 'apply':
            if (programType) {
                unemploymentSystem.applyForJob(player, programType, 'Ich bewerbe mich für diese Position.');
            } else {
                player.outputChatBox('Job-ID erforderlich!');
            }
            break;
            
        case 'training':
            if (programType) {
                unemploymentSystem.startTraining(player, programType);
            } else {
                player.outputChatBox('Programm-Typ erforderlich!');
            }
            break;
            
        case 'benefits':
            unemploymentSystem.grantBenefits(player, 'BASIC');
            break;
    }
});

// Arbeitslosen-System initialisieren
unemploymentSystem.init();

module.exports = unemploymentSystem;
