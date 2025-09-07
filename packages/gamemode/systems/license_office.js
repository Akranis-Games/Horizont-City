// License Office System - Erweiterte Lizenz-Verwaltung basierend auf Tutorial
// Behandelt alle Lizenz-Funktionen für Horizont-City Roleplay

const licenseOfficeSystem = {
    // Lizenz-Typen
    licenseTypes: {
        DRIVERS_LICENSE: {
            name: 'Führerschein',
            price: 200,
            description: 'Berechtigt zum Führen von Fahrzeugen',
            category: 'transport',
            level: 1,
            validFor: 365, // Tage
            requirements: { age: 18, test: true }
        },
        WEAPON_LICENSE: {
            name: 'Waffenschein',
            price: 1000,
            description: 'Berechtigt zum Besitz und Führen von Waffen',
            category: 'weapon',
            level: 3,
            validFor: 180,
            requirements: { age: 21, backgroundCheck: true, test: true }
        },
        PILOT_LICENSE: {
            name: 'Pilotenlizenz',
            price: 5000,
            description: 'Berechtigt zum Führen von Flugzeugen',
            category: 'aviation',
            level: 5,
            validFor: 365,
            requirements: { age: 21, flightHours: 50, test: true }
        },
        BOAT_LICENSE: {
            name: 'Bootsführerschein',
            price: 500,
            description: 'Berechtigt zum Führen von Booten',
            category: 'maritime',
            level: 2,
            validFor: 365,
            requirements: { age: 18, test: true }
        },
        BUSINESS_LICENSE: {
            name: 'Gewerbeschein',
            price: 1500,
            description: 'Berechtigt zum Betreiben eines Geschäfts',
            category: 'business',
            level: 2,
            validFor: 365,
            requirements: { age: 18, businessPlan: true }
        },
        MEDICAL_LICENSE: {
            name: 'Medizinische Lizenz',
            price: 10000,
            description: 'Berechtigt zur Ausübung medizinischer Tätigkeiten',
            category: 'medical',
            level: 8,
            validFor: 365,
            requirements: { age: 25, education: 'medical', test: true }
        },
        LAWYER_LICENSE: {
            name: 'Anwaltslizenz',
            price: 8000,
            description: 'Berechtigt zur Ausübung anwaltlicher Tätigkeiten',
            category: 'legal',
            level: 7,
            validFor: 365,
            requirements: { age: 25, education: 'law', test: true }
        },
        CONTRACTOR_LICENSE: {
            name: 'Bauunternehmer-Lizenz',
            price: 3000,
            description: 'Berechtigt zur Durchführung von Bauarbeiten',
            category: 'construction',
            level: 4,
            validFor: 365,
            requirements: { age: 21, experience: 'construction', test: true }
        },
        TAXI_LICENSE: {
            name: 'Taxi-Lizenz',
            price: 800,
            description: 'Berechtigt zum Betreiben eines Taxi-Services',
            category: 'transport',
            level: 2,
            validFor: 180,
            requirements: { age: 18, cleanRecord: true, test: true }
        },
        FISHING_LICENSE: {
            name: 'Angelschein',
            price: 100,
            description: 'Berechtigt zum Angeln in öffentlichen Gewässern',
            category: 'recreation',
            level: 0,
            validFor: 365,
            requirements: { age: 16 }
        }
    },
    
    // Lizenz-Status
    licenseStatus: {
        VALID: 'valid',
        EXPIRED: 'expired',
        SUSPENDED: 'suspended',
        REVOKED: 'revoked',
        PENDING: 'pending'
    },
    
    // Lizenz-Büros
    licenseOffices: new Map(),
    
    // Lizenz-Tests
    licenseTests: {
        DRIVERS_LICENSE: {
            questions: [
                {
                    question: 'Wie schnell darfst du innerorts fahren?',
                    options: ['50 km/h', '60 km/h', '70 km/h', '80 km/h'],
                    correct: 0
                },
                {
                    question: 'Was bedeutet ein rotes Verkehrszeichen?',
                    options: ['Vorsicht', 'Verbot', 'Gefahr', 'Hinweis'],
                    correct: 1
                },
                {
                    question: 'Wann musst du blinken?',
                    options: ['Beim Abbiegen', 'Beim Überholen', 'Beide', 'Nie'],
                    correct: 2
                }
            ],
            passScore: 0.7 // 70% richtig
        },
        WEAPON_LICENSE: {
            questions: [
                {
                    question: 'Wie bewahrst du eine Waffe sicher auf?',
                    options: ['Geladen im Schrank', 'Entladen im Safe', 'Unter dem Bett', 'Im Auto'],
                    correct: 1
                },
                {
                    question: 'Wann darfst du eine Waffe einsetzen?',
                    options: ['Bei jeder Bedrohung', 'Nur zur Selbstverteidigung', 'Zum Spaß', 'Immer'],
                    correct: 1
                }
            ],
            passScore: 0.8
        }
    },
    
    // Lizenz-Statistiken
    licenseStats: {
        totalLicensesIssued: 0,
        totalRevenue: 0,
        activeLicenses: 0,
        expiredLicenses: 0,
        mostPopularLicense: null
    },
    
    // License Office System-Initialisierung
    init() {
        this.initializeLicenseOffices();
        console.log('[LICENSE_OFFICE] Lizenz-Büro-System initialisiert');
    },
    
    // Lizenz-Büros initialisieren
    initializeLicenseOffices() {
        // Hauptlizenz-Büro
        const mainOffice = {
            id: 'license_office_main',
            name: 'Hauptlizenz-Büro',
            location: { x: 441.0, y: -978.0, z: 30.7 },
            blip: { sprite: 408, color: 3 },
            services: Object.keys(this.licenseTypes),
            level: 10,
            created: Date.now()
        };
        
        // Bezirkslizenz-Büro
        const districtOffice = {
            id: 'license_office_district',
            name: 'Bezirkslizenz-Büro',
            location: { x: -1091.0, y: -830.0, z: 19.0 },
            blip: { sprite: 408, color: 3 },
            services: Object.keys(this.licenseTypes).filter(licenseType => 
                this.licenseTypes[licenseType].level <= 5
            ),
            level: 5,
            created: Date.now()
        };
        
        this.licenseOffices.set(mainOffice.id, mainOffice);
        this.licenseOffices.set(districtOffice.id, districtOffice);
        
        // Colshapes erstellen
        this.createOfficeColshapes();
    },
    
    // Büro-Colshapes erstellen
    createOfficeColshapes() {
        this.licenseOffices.forEach(office => {
            const colshape = mp.colshapes.newSphere(
                office.location.x, 
                office.location.y, 
                office.location.z, 
                3.0
            );
            colshape.officeId = office.id;
            colshape.officeType = 'license';
            
            // Blip erstellen
            const blip = mp.blips.new(office.blip.sprite, new mp.Vector3(
                office.location.x, 
                office.location.y, 
                office.location.z
            ), {
                name: office.name,
                color: office.blip.color,
                shortRange: true
            });
        });
    },
    
    // Lizenz kaufen
    buyLicense(player, licenseType, officeId) {
        const office = this.licenseOffices.get(officeId);
        if (!office) {
            player.outputChatBox('Lizenz-Büro nicht gefunden!');
            return false;
        }
        
        const license = this.licenseTypes[licenseType];
        if (!license) {
            player.outputChatBox('Lizenz-Typ nicht gefunden!');
            return false;
        }
        
        // Verfügbarkeit prüfen
        if (!office.services.includes(licenseType)) {
            player.outputChatBox('Diese Lizenz ist in diesem Büro nicht verfügbar!');
            return false;
        }
        
        // Level prüfen
        if (license.level > office.level) {
            player.outputChatBox('Dein Level ist zu niedrig für diese Lizenz!');
            return false;
        }
        
        // Bereits vorhandene Lizenz prüfen
        if (this.hasValidLicense(player, licenseType)) {
            player.outputChatBox('Du besitzt bereits eine gültige Lizenz dieses Typs!');
            return false;
        }
        
        // Anforderungen prüfen
        if (!this.checkRequirements(player, license)) {
            player.outputChatBox('Du erfüllst nicht alle Anforderungen für diese Lizenz!');
            return false;
        }
        
        // Geld prüfen
        if (player.money < license.price) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${license.price}`);
            return false;
        }
        
        // Lizenz erstellen
        const newLicense = {
            type: licenseType,
            name: license.name,
            issued: new Date(),
            expires: new Date(Date.now() + license.validFor * 24 * 60 * 60 * 1000),
            status: 'valid',
            office: officeId,
            price: license.price
        };
        
        // Lizenz zum Spieler hinzufügen
        if (!player.licenses) player.licenses = [];
        player.licenses.push(newLicense);
        
        // Geld abziehen
        player.money -= license.price;
        
        // Statistiken aktualisieren
        this.licenseStats.totalLicensesIssued++;
        this.licenseStats.totalRevenue += license.price;
        this.licenseStats.activeLicenses++;
        
        player.outputChatBox(`${license.name} für $${license.price} erworben!`);
        player.call('ui:show', 'LicensePurchased', { license: newLicense });
        
        console.log(`[LICENSE_OFFICE] Spieler ${player.id} erwarb ${license.name}`);
        return true;
    },
    
    // Lizenz-Test durchführen
    takeLicenseTest(player, licenseType, officeId) {
        const office = this.licenseOffices.get(officeId);
        if (!office) {
            player.outputChatBox('Lizenz-Büro nicht gefunden!');
            return false;
        }
        
        const license = this.licenseTypes[licenseType];
        if (!license) {
            player.outputChatBox('Lizenz-Typ nicht gefunden!');
            return false;
        }
        
        const test = this.licenseTests[licenseType];
        if (!test) {
            player.outputChatBox('Kein Test für diese Lizenz verfügbar!');
            return false;
        }
        
        // Test-UI anzeigen
        player.call('ui:show', 'LicenseTest', { 
            licenseType: licenseType,
            questions: test.questions,
            passScore: test.passScore
        });
        
        return true;
    },
    
    // Test-Ergebnis verarbeiten
    processTestResult(player, licenseType, answers, officeId) {
        const test = this.licenseTests[licenseType];
        if (!test) {
            player.outputChatBox('Test nicht gefunden!');
            return false;
        }
        
        let correctAnswers = 0;
        answers.forEach((answer, index) => {
            if (test.questions[index] && answer === test.questions[index].correct) {
                correctAnswers++;
            }
        });
        
        const score = correctAnswers / test.questions.length;
        const passed = score >= test.passScore;
        
        if (passed) {
            player.outputChatBox(`Test bestanden! (${Math.round(score * 100)}%)`);
            // Lizenz kaufen ohne weitere Prüfungen
            this.buyLicense(player, licenseType, officeId);
        } else {
            player.outputChatBox(`Test nicht bestanden. (${Math.round(score * 100)}%)`);
            player.outputChatBox(`Mindestens ${Math.round(test.passScore * 100)}% erforderlich.`);
        }
        
        return passed;
    },
    
    // Anforderungen prüfen
    checkRequirements(player, license) {
        const requirements = license.requirements;
        
        // Alter prüfen
        if (requirements.age && player.age < requirements.age) {
            return false;
        }
        
        // Hintergrundprüfung
        if (requirements.backgroundCheck && player.criminalRecord) {
            return false;
        }
        
        // Saubere Akte
        if (requirements.cleanRecord && player.criminalRecord) {
            return false;
        }
        
        // Bildung
        if (requirements.education && player.education !== requirements.education) {
            return false;
        }
        
        // Erfahrung
        if (requirements.experience && !player.experience.includes(requirements.experience)) {
            return false;
        }
        
        // Flugstunden
        if (requirements.flightHours && player.flightHours < requirements.flightHours) {
            return false;
        }
        
        return true;
    },
    
    // Gültige Lizenz prüfen
    hasValidLicense(player, licenseType) {
        if (!player.licenses) return false;
        
        return player.licenses.some(license => 
            license.type === licenseType && 
            license.status === 'valid' && 
            new Date(license.expires) > new Date()
        );
    },
    
    // Lizenz erneuern
    renewLicense(player, licenseType, officeId) {
        const office = this.licenseOffices.get(officeId);
        if (!office) {
            player.outputChatBox('Lizenz-Büro nicht gefunden!');
            return false;
        }
        
        const license = this.licenseTypes[licenseType];
        if (!license) {
            player.outputChatBox('Lizenz-Typ nicht gefunden!');
            return false;
        }
        
        const playerLicense = player.licenses?.find(l => l.type === licenseType);
        if (!playerLicense) {
            player.outputChatBox('Du besitzt keine Lizenz dieses Typs!');
            return false;
        }
        
        if (playerLicense.status !== 'expired') {
            player.outputChatBox('Diese Lizenz ist noch gültig!');
            return false;
        }
        
        const renewalPrice = Math.floor(license.price * 0.5); // 50% des Originalpreises
        if (player.money < renewalPrice) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${renewalPrice}`);
            return false;
        }
        
        // Lizenz erneuern
        playerLicense.status = 'valid';
        playerLicense.issued = new Date();
        playerLicense.expires = new Date(Date.now() + license.validFor * 24 * 60 * 60 * 1000);
        playerLicense.renewed = true;
        
        // Geld abziehen
        player.money -= renewalPrice;
        
        // Statistiken aktualisieren
        this.licenseStats.totalRevenue += renewalPrice;
        this.licenseStats.activeLicenses++;
        this.licenseStats.expiredLicenses--;
        
        player.outputChatBox(`${license.name} für $${renewalPrice} erneuert!`);
        player.call('ui:show', 'LicenseRenewed', { license: playerLicense });
        
        console.log(`[LICENSE_OFFICE] Spieler ${player.id} erneuerte ${license.name}`);
        return true;
    },
    
    // Verfügbare Lizenzen anzeigen
    showLicenses(player, officeId) {
        const office = this.licenseOffices.get(officeId);
        if (!office) {
            player.outputChatBox('Lizenz-Büro nicht gefunden!');
            return false;
        }
        
        const availableLicenses = office.services
            .map(licenseType => this.licenseTypes[licenseType])
            .filter(license => license && license.level <= office.level);
        
        player.outputChatBox(`=== Verfügbare Lizenzen in ${office.name} ===`);
        availableLicenses.forEach(license => {
            const hasLicense = this.hasValidLicense(player, license.type);
            const status = hasLicense ? '✓' : '✗';
            player.outputChatBox(`${status} ${license.name}: $${license.price} (Level ${license.level})`);
        });
        
        return true;
    },
    
    // Lizenz-Statistiken
    getStatistics() {
        return {
            ...this.licenseStats,
            totalOffices: this.licenseOffices.size,
            totalLicenseTypes: Object.keys(this.licenseTypes).length,
            totalTests: Object.keys(this.licenseTests).length
        };
    }
};

// Events
mp.events.add('license_office:buyLicense', (player, licenseType, officeId) => {
    licenseOfficeSystem.buyLicense(player, licenseType, officeId);
});

mp.events.add('license_office:takeTest', (player, licenseType, officeId) => {
    licenseOfficeSystem.takeLicenseTest(player, licenseType, officeId);
});

mp.events.add('license_office:processTest', (player, licenseType, answers, officeId) => {
    licenseOfficeSystem.processTestResult(player, licenseType, answers, officeId);
});

mp.events.add('license_office:renewLicense', (player, licenseType, officeId) => {
    licenseOfficeSystem.renewLicense(player, licenseType, officeId);
});

mp.events.add('license_office:showLicenses', (player, officeId) => {
    licenseOfficeSystem.showLicenses(player, officeId);
});

// Colshape Events
mp.events.add('playerEnterColshape', (player, shape) => {
    if (shape.officeType === 'license') {
        const office = licenseOfficeSystem.licenseOffices.get(shape.officeId);
        if (office) {
            player.call('ui:show', 'LicenseOffice', { office: office });
        }
    }
});

// Commands
mp.events.addCommand('license', (player, fullText, action, licenseType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /license [show|buy|renew|test] [typ]');
        player.outputChatBox('Verfügbare Aktionen: show, buy, renew, test');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'show':
            licenseOfficeSystem.showLicenses(player, 'license_office_main');
            break;
            
        case 'buy':
            if (licenseType) {
                licenseOfficeSystem.buyLicense(player, licenseType, 'license_office_main');
            } else {
                player.outputChatBox('Lizenz-Typ erforderlich!');
            }
            break;
            
        case 'renew':
            if (licenseType) {
                licenseOfficeSystem.renewLicense(player, licenseType, 'license_office_main');
            } else {
                player.outputChatBox('Lizenz-Typ erforderlich!');
            }
            break;
            
        case 'test':
            if (licenseType) {
                licenseOfficeSystem.takeLicenseTest(player, licenseType, 'license_office_main');
            } else {
                player.outputChatBox('Lizenz-Typ erforderlich!');
            }
            break;
    }
});

// License Office System initialisieren
licenseOfficeSystem.init();

module.exports = licenseOfficeSystem;
