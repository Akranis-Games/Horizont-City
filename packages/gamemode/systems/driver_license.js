// Driver License System - Führerschein-System mit Prüfungen und Verwaltung
// Behandelt alle Führerschein-Funktionen für Horizont-City Roleplay

const driverLicenseSystem = {
    // Führerschein-Klassen
    licenseClasses: {
        AM: { name: 'Mofa', minAge: 15, description: 'Mofa bis 50ccm' },
        A1: { name: 'Leichtkraftrad', minAge: 16, description: 'Motorrad bis 125ccm' },
        A2: { name: 'Mittleres Motorrad', minAge: 18, description: 'Motorrad bis 35kW' },
        A: { name: 'Motorrad', minAge: 20, description: 'Unbegrenztes Motorrad' },
        B: { name: 'PKW', minAge: 18, description: 'Personenkraftwagen bis 3,5t' },
        BE: { name: 'PKW mit Anhänger', minAge: 18, description: 'PKW mit Anhänger über 750kg' },
        C1: { name: 'Leicht-LKW', minAge: 18, description: 'LKW bis 7,5t' },
        C: { name: 'LKW', minAge: 21, description: 'LKW über 3,5t' },
        CE: { name: 'LKW mit Anhänger', minAge: 21, description: 'LKW mit Anhänger' },
        D1: { name: 'Kleinbus', minAge: 21, description: 'Bus bis 16 Personen' },
        D: { name: 'Bus', minAge: 24, description: 'Bus über 8 Personen' },
        T: { name: 'Traktor', minAge: 16, description: 'Land- und forstwirtschaftliche Fahrzeuge' },
        L: { name: 'Landwirtschaft', minAge: 16, description: 'Landwirtschaftliche Zugmaschinen' }
    },
    
    // Prüfungs-Typen
    examTypes: {
        THEORY: 'theory',
        PRACTICAL: 'practical',
        MEDICAL: 'medical',
        EYE_TEST: 'eye_test',
        FIRST_AID: 'first_aid',
        NIGHT_DRIVING: 'night_driving',
        HIGHWAY: 'highway',
        CITY: 'city',
        PARKING: 'parking',
        EMERGENCY: 'emergency'
    },
    
    // Prüfungs-Konfiguration
    examConfig: {
        theory: {
            name: 'Theorieprüfung',
            type: 'theory',
            duration: 45, // Minuten
            questions: 30,
            passScore: 24, // 80% richtig
            cost: 50,
            retakeCost: 25,
            maxAttempts: 3,
            description: 'Theoretische Prüfung der Verkehrsregeln'
        },
        practical: {
            name: 'Praktische Prüfung',
            type: 'practical',
            duration: 60, // Minuten
            requirements: ['theory', 'medical', 'eye_test', 'first_aid'],
            cost: 150,
            retakeCost: 75,
            maxAttempts: 3,
            description: 'Praktische Fahrprüfung'
        },
        medical: {
            name: 'Medizinische Untersuchung',
            type: 'medical',
            duration: 30, // Minuten
            cost: 80,
            validFor: 2, // Jahre
            description: 'Gesundheitscheck für Führerschein'
        },
        eye_test: {
            name: 'Sehtest',
            type: 'eye_test',
            duration: 15, // Minuten
            cost: 25,
            validFor: 2, // Jahre
            description: 'Augenuntersuchung für Führerschein'
        },
        first_aid: {
            name: 'Erste-Hilfe-Kurs',
            type: 'first_aid',
            duration: 480, // Minuten (8 Stunden)
            cost: 60,
            validFor: 3, // Jahre
            description: 'Erste-Hilfe-Grundkurs'
        },
        night_driving: {
            name: 'Nachtfahrt',
            type: 'night_driving',
            duration: 45, // Minuten
            requirements: ['theory'],
            cost: 100,
            retakeCost: 50,
            maxAttempts: 2,
            description: 'Praktische Nachtfahrt'
        },
        highway: {
            name: 'Autobahnfahrt',
            type: 'highway',
            duration: 60, // Minuten
            requirements: ['theory'],
            cost: 120,
            retakeCost: 60,
            maxAttempts: 2,
            description: 'Praktische Autobahnfahrt'
        },
        city: {
            name: 'Stadtfahrt',
            type: 'city',
            duration: 45, // Minuten
            requirements: ['theory'],
            cost: 100,
            retakeCost: 50,
            maxAttempts: 2,
            description: 'Praktische Stadtfahrt'
        },
        parking: {
            name: 'Parken',
            type: 'parking',
            duration: 30, // Minuten
            requirements: ['theory'],
            cost: 80,
            retakeCost: 40,
            maxAttempts: 2,
            description: 'Praktische Parkübungen'
        },
        emergency: {
            name: 'Notfallübungen',
            type: 'emergency',
            duration: 30, // Minuten
            requirements: ['theory'],
            cost: 90,
            retakeCost: 45,
            maxAttempts: 2,
            description: 'Notfall- und Bremsübungen'
        }
    },
    
    // Fahrschulen
    drivingSchools: {
        'school_1': {
            name: 'Fahrschule Mitte',
            location: { x: 1000, y: 2000, z: 30 },
            instructors: 5,
            vehicles: 8,
            classes: ['B', 'A', 'C'],
            opening_hours: '8:00-18:00',
            phone: '+49 30 12345678',
            website: 'www.fahrschule-mitte.de',
            status: 'active',
            created: Date.now()
        },
        'school_2': {
            name: 'Fahrschule Nord',
            location: { x: 1500, y: 2500, z: 30 },
            instructors: 3,
            vehicles: 5,
            classes: ['B', 'A1', 'A2'],
            opening_hours: '9:00-17:00',
            phone: '+49 30 87654321',
            website: 'www.fahrschule-nord.de',
            status: 'active',
            created: Date.now()
        },
        'school_3': {
            name: 'Fahrschule Süd',
            location: { x: 2000, y: 3000, z: 30 },
            instructors: 7,
            vehicles: 12,
            classes: ['B', 'A', 'C', 'D'],
            opening_hours: '7:00-19:00',
            phone: '+49 30 11223344',
            website: 'www.fahrschule-sued.de',
            status: 'active',
            created: Date.now()
        }
    },
    
    // Prüfungsfragen
    examQuestions: {
        theory: [
            {
                id: 1,
                question: 'Wie schnell darf man innerorts fahren?',
                options: ['30 km/h', '50 km/h', '70 km/h', '100 km/h'],
                correct: 1,
                explanation: 'Innerorts gilt eine Höchstgeschwindigkeit von 50 km/h.'
            },
            {
                id: 2,
                question: 'Was bedeutet ein rotes Verkehrszeichen?',
                options: ['Vorsicht', 'Verbot', 'Gefahr', 'Hinweis'],
                correct: 1,
                explanation: 'Rote Verkehrszeichen bedeuten ein Verbot.'
            },
            {
                id: 3,
                question: 'Wie weit vor einer Kreuzung muss man blinken?',
                options: ['10 Meter', '30 Meter', '50 Meter', '100 Meter'],
                correct: 1,
                explanation: 'Man muss etwa 30 Meter vor der Kreuzung blinken.'
            },
            {
                id: 4,
                question: 'Was ist der Mindestabstand zum Vordermann?',
                options: ['Halbe Tachoanzeige', 'Volle Tachoanzeige', 'Doppelte Tachoanzeige', 'Kein Mindestabstand'],
                correct: 0,
                explanation: 'Der Mindestabstand ist die halbe Tachoanzeige in Metern.'
            },
            {
                id: 5,
                question: 'Wann muss man die Lichthupe benutzen?',
                options: ['Immer', 'Nur nachts', 'Nur bei Gefahr', 'Nur zum Überholen'],
                correct: 2,
                explanation: 'Die Lichthupe darf nur bei Gefahr benutzt werden.'
            }
        ]
    },
    
    // Aktive Fahrschulen
    activeDrivingSchools: new Map(),
    
    // Aktive Prüfungen
    activeExams: new Map(),
    
    // Führerscheine
    driverLicenses: new Map(),
    
    // Fahrstunden
    drivingLessons: new Map(),
    
    // Führerschein-System-Initialisierung
    init() {
        console.log('[DRIVER_LICENSE] Führerschein-System initialisiert');
        this.initializeDrivingSchools();
    },
    
    // Fahrschulen initialisieren
    initializeDrivingSchools() {
        Object.keys(this.drivingSchools).forEach(schoolId => {
            const school = this.drivingSchools[schoolId];
            school.id = schoolId;
            school.students = [];
            school.exams = [];
            school.lessons = [];
            school.revenue = 0;
            
            this.activeDrivingSchools.set(schoolId, school);
        });
        
        console.log(`[DRIVER_LICENSE] ${Object.keys(this.drivingSchools).length} Fahrschulen initialisiert`);
    },
    
    // Führerschein beantragen
    applyForLicense(player, licenseClass, schoolId) {
        const license = this.licenseClasses[licenseClass];
        if (!license) {
            player.outputChatBox('Führerschein-Klasse nicht gefunden!');
            return false;
        }
        
        const school = this.activeDrivingSchools.get(schoolId);
        if (!school) {
            player.outputChatBox('Fahrschule nicht gefunden!');
            return false;
        }
        
        if (player.age < license.minAge) {
            player.outputChatBox(`Mindestalter für ${license.name} ist ${license.minAge} Jahre!`);
            return false;
        }
        
        if (!school.classes.includes(licenseClass)) {
            player.outputChatBox('Diese Fahrschule bietet diese Führerschein-Klasse nicht an!');
            return false;
        }
        
        const applicationId = `application_${player.id}_${Date.now()}`;
        const application = {
            id: applicationId,
            playerId: player.id,
            licenseClass: licenseClass,
            schoolId: schoolId,
            status: 'pending',
            applicationDate: Date.now(),
            requiredExams: this.getRequiredExams(licenseClass),
            completedExams: [],
            lessons: [],
            totalCost: 0,
            created: Date.now()
        };
        
        school.students.push(applicationId);
        
        player.outputChatBox(`Führerschein-Antrag für ${license.name} eingereicht!`);
        player.call('ui:show', 'DriverLicenseApplication', { application: application });
        
        console.log(`[DRIVER_LICENSE] Antrag für ${licenseClass} von Spieler ${player.id} eingereicht`);
        return applicationId;
    },
    
    // Erforderliche Prüfungen ermitteln
    getRequiredExams(licenseClass) {
        const required = ['theory', 'practical', 'medical', 'eye_test', 'first_aid'];
        
        switch (licenseClass) {
            case 'A':
            case 'A2':
            case 'A1':
                required.push('night_driving', 'highway');
                break;
            case 'C':
            case 'CE':
            case 'D':
            case 'D1':
                required.push('highway', 'city');
                break;
        }
        
        return required;
    },
    
    // Prüfung ablegen
    takeExam(player, examType, schoolId) {
        const exam = this.examConfig[examType];
        if (!exam) {
            player.outputChatBox('Prüfung-Typ nicht gefunden!');
            return false;
        }
        
        const school = this.activeDrivingSchools.get(schoolId);
        if (!school) {
            player.outputChatBox('Fahrschule nicht gefunden!');
            return false;
        }
        
        if (player.money < exam.cost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${exam.cost}`);
            return false;
        }
        
        const examId = `exam_${player.id}_${Date.now()}`;
        const examData = {
            id: examId,
            playerId: player.id,
            examType: examType,
            schoolId: schoolId,
            config: exam,
            startTime: Date.now(),
            endTime: Date.now() + (exam.duration * 60 * 1000),
            status: 'active',
            score: 0,
            passed: false,
            attempts: 1,
            created: Date.now()
        };
        
        this.activeExams.set(examId, examData);
        school.exams.push(examId);
        
        player.money -= exam.cost;
        school.revenue += exam.cost;
        
        player.outputChatBox(`Prüfung ${exam.name} gestartet! Dauer: ${exam.duration} Minuten`);
        player.call('ui:show', 'DriverLicenseExam', { exam: examData });
        
        // Prüfung beenden nach der Dauer
        setTimeout(() => {
            this.completeExam(player, examId);
        }, exam.duration * 60 * 1000);
        
        console.log(`[DRIVER_LICENSE] Prüfung ${examType} für Spieler ${player.id} gestartet`);
        return examId;
    },
    
    // Prüfung abschließen
    completeExam(player, examId) {
        const exam = this.activeExams.get(examId);
        if (!exam) {
            return;
        }
        
        exam.status = 'completed';
        exam.endTime = Date.now();
        
        // Prüfungsergebnis simulieren
        if (exam.examType === 'theory') {
            exam.score = this.simulateTheoryExam();
            exam.passed = exam.score >= exam.config.passScore;
        } else {
            exam.score = Math.random() * 100;
            exam.passed = exam.score >= 70; // 70% für praktische Prüfungen
        }
        
        if (exam.passed) {
            player.outputChatBox(`Prüfung ${exam.config.name} bestanden! Punktzahl: ${exam.score.toFixed(1)}`);
            player.call('ui:show', 'DriverLicenseExamPassed', { exam: exam });
        } else {
            player.outputChatBox(`Prüfung ${exam.config.name} nicht bestanden! Punktzahl: ${exam.score.toFixed(1)}`);
            player.call('ui:show', 'DriverLicenseExamFailed', { exam: exam });
        }
        
        console.log(`[DRIVER_LICENSE] Prüfung ${examId} für Spieler ${player.id} abgeschlossen`);
    },
    
    // Theorieprüfung simulieren
    simulateTheoryExam() {
        const questions = this.examQuestions.theory;
        let correctAnswers = 0;
        
        for (let i = 0; i < 30; i++) {
            const question = questions[Math.floor(Math.random() * questions.length)];
            const userAnswer = Math.floor(Math.random() * 4);
            
            if (userAnswer === question.correct) {
                correctAnswers++;
            }
        }
        
        return correctAnswers;
    },
    
    // Fahrstunde buchen
    bookLesson(player, schoolId, instructorId, lessonType) {
        const school = this.activeDrivingSchools.get(schoolId);
        if (!school) {
            player.outputChatBox('Fahrschule nicht gefunden!');
            return false;
        }
        
        const lessonCost = 80; // $80 pro Fahrstunde
        if (player.money < lessonCost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${lessonCost}`);
            return false;
        }
        
        const lessonId = `lesson_${player.id}_${Date.now()}`;
        const lesson = {
            id: lessonId,
            playerId: player.id,
            schoolId: schoolId,
            instructorId: instructorId,
            lessonType: lessonType,
            startTime: Date.now(),
            endTime: Date.now() + (60 * 60 * 1000), // 1 Stunde
            status: 'active',
            cost: lessonCost,
            created: Date.now()
        };
        
        this.drivingLessons.set(lessonId, lesson);
        school.lessons.push(lessonId);
        
        player.money -= lessonCost;
        school.revenue += lessonCost;
        
        player.outputChatBox(`Fahrstunde gebucht! Kosten: $${lessonCost}`);
        player.call('ui:show', 'DriverLicenseLesson', { lesson: lesson });
        
        // Fahrstunde beenden nach 1 Stunde
        setTimeout(() => {
            this.completeLesson(player, lessonId);
        }, 60 * 60 * 1000);
        
        console.log(`[DRIVER_LICENSE] Fahrstunde für Spieler ${player.id} gebucht`);
        return lessonId;
    },
    
    // Fahrstunde abschließen
    completeLesson(player, lessonId) {
        const lesson = this.drivingLessons.get(lessonId);
        if (!lesson) {
            return;
        }
        
        lesson.status = 'completed';
        lesson.endTime = Date.now();
        
        player.outputChatBox('Fahrstunde abgeschlossen!');
        player.call('ui:show', 'DriverLicenseLessonCompleted', { lesson: lesson });
        
        console.log(`[DRIVER_LICENSE] Fahrstunde ${lessonId} für Spieler ${player.id} abgeschlossen`);
    },
    
    // Führerschein ausstellen
    issueLicense(player, licenseClass) {
        const license = this.licenseClasses[licenseClass];
        if (!license) {
            player.outputChatBox('Führerschein-Klasse nicht gefunden!');
            return false;
        }
        
        const licenseId = `license_${player.id}_${Date.now()}`;
        const driverLicense = {
            id: licenseId,
            playerId: player.id,
            licenseClass: licenseClass,
            config: license,
            issueDate: Date.now(),
            expiryDate: Date.now() + (15 * 365 * 24 * 60 * 60 * 1000), // 15 Jahre
            status: 'valid',
            points: 0,
            restrictions: [],
            created: Date.now()
        };
        
        this.driverLicenses.set(licenseId, driverLicense);
        
        player.driverLicense = licenseClass;
        player.outputChatBox(`Führerschein ${license.name} ausgestellt!`);
        player.call('ui:show', 'DriverLicenseIssued', { license: driverLicense });
        
        console.log(`[DRIVER_LICENSE] Führerschein ${licenseClass} für Spieler ${player.id} ausgestellt`);
        return licenseId;
    },
    
    // Führerschein prüfen
    checkLicense(player, licenseClass) {
        const licenses = Array.from(this.driverLicenses.values()).filter(license => 
            license.playerId === player.id && 
            license.licenseClass === licenseClass && 
            license.status === 'valid' &&
            license.expiryDate > Date.now()
        );
        
        return licenses.length > 0 ? licenses[0] : null;
    },
    
    // Führerschein entziehen
    revokeLicense(player, licenseId, reason) {
        const license = this.driverLicenses.get(licenseId);
        if (!license) {
            player.outputChatBox('Führerschein nicht gefunden!');
            return false;
        }
        
        if (license.playerId !== player.id) {
            player.outputChatBox('Du besitzt diesen Führerschein nicht!');
            return false;
        }
        
        license.status = 'revoked';
        license.revocationDate = Date.now();
        license.revocationReason = reason;
        
        player.outputChatBox(`Führerschein ${license.config.name} entzogen! Grund: ${reason}`);
        player.call('ui:show', 'DriverLicenseRevoked', { license: license });
        
        console.log(`[DRIVER_LICENSE] Führerschein ${licenseId} für Spieler ${player.id} entzogen`);
        return true;
    },
    
    // Führerschein-System-Statistiken
    getStatistics() {
        return {
            totalSchools: this.activeDrivingSchools.size,
            totalExams: this.activeExams.size,
            totalLicenses: this.driverLicenses.size,
            totalLessons: this.drivingLessons.size,
            totalRevenue: Array.from(this.activeDrivingSchools.values()).reduce((sum, school) => sum + school.revenue, 0)
        };
    }
};

// Events
mp.events.add('driver_license:apply', (player, licenseClass, schoolId) => {
    driverLicenseSystem.applyForLicense(player, licenseClass, schoolId);
});

mp.events.add('driver_license:takeExam', (player, examType, schoolId) => {
    driverLicenseSystem.takeExam(player, examType, schoolId);
});

mp.events.add('driver_license:bookLesson', (player, schoolId, instructorId, lessonType) => {
    driverLicenseSystem.bookLesson(player, schoolId, instructorId, lessonType);
});

mp.events.add('driver_license:issueLicense', (player, licenseClass) => {
    driverLicenseSystem.issueLicense(player, licenseClass);
});

// Commands
mp.events.addCommand('driverlicense', (player, fullText, action, licenseClass, schoolId) => {
    if (!action) {
        player.outputChatBox('Verwendung: /driverlicense [apply|exam|lesson|issue|check] [Klasse] [Schule]');
        player.outputChatBox('Verfügbare Klassen: AM, A1, A2, A, B, BE, C1, C, CE, D1, D, T, L');
        player.outputChatBox('Verfügbare Schulen: school_1, school_2, school_3');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'apply':
            if (licenseClass && schoolId) {
                driverLicenseSystem.applyForLicense(player, licenseClass, schoolId);
            } else {
                player.outputChatBox('Führerschein-Klasse und Schule erforderlich!');
            }
            break;
            
        case 'exam':
            if (licenseClass && schoolId) {
                driverLicenseSystem.takeExam(player, licenseClass, schoolId);
            } else {
                player.outputChatBox('Prüfung-Typ und Schule erforderlich!');
            }
            break;
            
        case 'lesson':
            if (licenseClass && schoolId) {
                driverLicenseSystem.bookLesson(player, schoolId, 'instructor_1', 'practical');
            } else {
                player.outputChatBox('Schule erforderlich!');
            }
            break;
            
        case 'issue':
            if (licenseClass) {
                driverLicenseSystem.issueLicense(player, licenseClass);
            } else {
                player.outputChatBox('Führerschein-Klasse erforderlich!');
            }
            break;
            
        case 'check':
            if (licenseClass) {
                const license = driverLicenseSystem.checkLicense(player, licenseClass);
                if (license) {
                    player.outputChatBox(`Führerschein ${license.config.name} gültig bis ${new Date(license.expiryDate).toLocaleDateString()}`);
                } else {
                    player.outputChatBox('Kein gültiger Führerschein gefunden!');
                }
            } else {
                player.outputChatBox('Führerschein-Klasse erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('drivingstats', (player) => {
    const stats = driverLicenseSystem.getStatistics();
    player.outputChatBox('=== Führerschein-System-Statistiken ===');
    player.outputChatBox(`Gesamt Fahrschulen: ${stats.totalSchools}`);
    player.outputChatBox(`Gesamt Prüfungen: ${stats.totalExams}`);
    player.outputChatBox(`Gesamt Führerscheine: ${stats.totalLicenses}`);
    player.outputChatBox(`Gesamt Fahrstunden: ${stats.totalLessons}`);
    player.outputChatBox(`Gesamt Einnahmen: $${stats.totalRevenue.toFixed(2)}`);
});

// Führerschein-System initialisieren
driverLicenseSystem.init();

module.exports = driverLicenseSystem;
