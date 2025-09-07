// Civil Registry System - Standesamt-System mit Geburten, Heiraten und Sterbefällen
// Behandelt alle standesamtlichen Funktionen für Horizont-City Roleplay

const civilRegistrySystem = {
    // Standesamt-Typen
    registryTypes: {
        BIRTH_CERTIFICATE: 'birth_certificate',
        MARRIAGE_CERTIFICATE: 'marriage_certificate',
        DEATH_CERTIFICATE: 'death_certificate',
        DIVORCE_CERTIFICATE: 'divorce_certificate',
        ADOPTION_CERTIFICATE: 'adoption_certificate',
        NAME_CHANGE: 'name_change',
        GENDER_CHANGE: 'gender_change',
        CITIZENSHIP: 'citizenship',
        ID_CARD: 'id_card',
        PASSPORT: 'passport',
        DRIVER_LICENSE: 'driver_license',
        RESIDENCE_PERMIT: 'residence_permit'
    },
    
    // Dokument-Status
    documentStatus: {
        PENDING: 'pending',
        APPROVED: 'approved',
        REJECTED: 'rejected',
        EXPIRED: 'expired',
        REVOKED: 'revoked',
        SUSPENDED: 'suspended',
        ACTIVE: 'active'
    },
    
    // Beziehungs-Status
    relationshipStatus: {
        SINGLE: 'single',
        MARRIED: 'married',
        DIVORCED: 'divorced',
        WIDOWED: 'widowed',
        SEPARATED: 'separated',
        ENGAGED: 'engaged',
        CIVIL_UNION: 'civil_union',
        DOMESTIC_PARTNERSHIP: 'domestic_partnership'
    },
    
    // Geschlechter
    genders: {
        MALE: 'male',
        FEMALE: 'female',
        NON_BINARY: 'non_binary',
        OTHER: 'other'
    },
    
    // Standesamt-Konfiguration
    registryConfig: {
        birth_certificate: {
            name: 'Geburtsurkunde',
            description: 'Amtliche Geburtsbescheinigung',
            validityPeriod: 0, // Unbegrenzt
            requirements: ['birth_date', 'birth_place', 'parents'],
            fee: 0,
            processingTime: 1 // Tage
        },
        marriage_certificate: {
            name: 'Heiratsurkunde',
            description: 'Amtliche Heiratsbescheinigung',
            validityPeriod: 0,
            requirements: ['spouse', 'wedding_date', 'witnesses'],
            fee: 50,
            processingTime: 7
        },
        death_certificate: {
            name: 'Sterbeurkunde',
            description: 'Amtliche Sterbebescheinigung',
            validityPeriod: 0,
            requirements: ['death_date', 'death_place', 'cause_of_death'],
            fee: 0,
            processingTime: 1
        },
        divorce_certificate: {
            name: 'Scheidungsurkunde',
            description: 'Amtliche Scheidungsbescheinigung',
            validityPeriod: 0,
            requirements: ['divorce_date', 'court_order', 'property_settlement'],
            fee: 100,
            processingTime: 30
        },
        id_card: {
            name: 'Personalausweis',
            description: 'Amtlicher Personalausweis',
            validityPeriod: 10, // Jahre
            requirements: ['birth_certificate', 'photo', 'address'],
            fee: 25,
            processingTime: 14
        },
        passport: {
            name: 'Reisepass',
            description: 'Amtlicher Reisepass',
            validityPeriod: 10,
            requirements: ['id_card', 'photo', 'birth_certificate'],
            fee: 60,
            processingTime: 21
        },
        driver_license: {
            name: 'Führerschein',
            description: 'Amtlicher Führerschein',
            validityPeriod: 15,
            requirements: ['id_card', 'medical_certificate', 'test_results'],
            fee: 40,
            processingTime: 7
        }
    },
    
    // Standesamt-Dokumente
    civilDocuments: new Map(),
    
    // Standesamt-Anträge
    civilApplications: new Map(),
    
    // Familien-Register
    familyRegistry: new Map(),
    
    // Standesamt-Statistiken
    registryStats: {
        totalDocuments: 0,
        totalApplications: 0,
        approvedApplications: 0,
        rejectedApplications: 0,
        activeMarriages: 0,
        totalBirths: 0,
        totalDeaths: 0
    },
    
    // Civil Registry System-Initialisierung
    init() {
        console.log('[CIVIL_REGISTRY] Standesamt-System initialisiert');
        this.initializeRegistry();
    },
    
    // Standesamt initialisieren
    initializeRegistry() {
        // Hier würden bestehende Dokumente aus der Datenbank geladen
        console.log('[CIVIL_REGISTRY] Standesamt initialisiert');
    },
    
    // Geburtsurkunde erstellen
    createBirthCertificate(player, birthData) {
        const config = this.registryConfig.birth_certificate;
        const documentId = `birth_${player.id}_${Date.now()}`;
        
        const document = {
            id: documentId,
            playerId: player.id,
            playerName: player.name,
            documentType: 'birth_certificate',
            config: config,
            data: {
                fullName: birthData.fullName || player.name,
                birthDate: birthData.birthDate || Date.now(),
                birthPlace: birthData.birthPlace || 'Horizont-City',
                gender: birthData.gender || 'male',
                parents: birthData.parents || { father: 'Unknown', mother: 'Unknown' },
                weight: birthData.weight || 3.5,
                height: birthData.height || 50,
                doctor: birthData.doctor || 'Dr. Smith'
            },
            status: 'approved',
            issueDate: Date.now(),
            expiryDate: null,
            created: Date.now()
        };
        
        this.civilDocuments.set(documentId, document);
        
        player.birthCertificate = documentId;
        player.birthDate = document.data.birthDate;
        player.gender = document.data.gender;
        player.relationshipStatus = 'single';
        
        player.outputChatBox('Geburtsurkunde erstellt!');
        player.call('ui:show', 'BirthCertificateCreated', { document: document });
        
        this.registryStats.totalDocuments++;
        this.registryStats.totalBirths++;
        
        console.log(`[CIVIL_REGISTRY] Geburtsurkunde für Spieler ${player.id} erstellt`);
        return documentId;
    },
    
    // Heiratsurkunde erstellen
    createMarriageCertificate(player1, player2, marriageData) {
        if (player1.relationshipStatus !== 'single' || player2.relationshipStatus !== 'single') {
            player1.outputChatBox('Beide Partner müssen ledig sein!');
            return false;
        }
        
        const config = this.registryConfig.marriage_certificate;
        const documentId = `marriage_${player1.id}_${player2.id}_${Date.now()}`;
        
        const document = {
            id: documentId,
            player1Id: player1.id,
            player1Name: player1.name,
            player2Id: player2.id,
            player2Name: player2.name,
            documentType: 'marriage_certificate',
            config: config,
            data: {
                weddingDate: marriageData.weddingDate || Date.now(),
                weddingPlace: marriageData.weddingPlace || 'Horizont-City City Hall',
                officiant: marriageData.officiant || 'Mayor Johnson',
                witnesses: marriageData.witnesses || ['Witness 1', 'Witness 2'],
                vows: marriageData.vows || 'Standard vows'
            },
            status: 'approved',
            issueDate: Date.now(),
            expiryDate: null,
            created: Date.now()
        };
        
        this.civilDocuments.set(documentId, document);
        
        // Spieler-Status aktualisieren
        player1.relationshipStatus = 'married';
        player1.spouse = player2.id;
        player1.marriageCertificate = documentId;
        
        player2.relationshipStatus = 'married';
        player2.spouse = player1.id;
        player2.marriageCertificate = documentId;
        
        player1.outputChatBox(`Du hast ${player2.name} geheiratet!`);
        player2.outputChatBox(`Du hast ${player1.name} geheiratet!`);
        
        player1.call('ui:show', 'MarriageCertificateCreated', { document: document });
        player2.call('ui:show', 'MarriageCertificateCreated', { document: document });
        
        this.registryStats.totalDocuments++;
        this.registryStats.activeMarriages++;
        
        console.log(`[CIVIL_REGISTRY] Heiratsurkunde für ${player1.id} und ${player2.id} erstellt`);
        return documentId;
    },
    
    // Scheidungsurkunde erstellen
    createDivorceCertificate(player1, player2, divorceData) {
        if (player1.relationshipStatus !== 'married' || player2.relationshipStatus !== 'married') {
            player1.outputChatBox('Beide Partner müssen verheiratet sein!');
            return false;
        }
        
        if (player1.spouse !== player2.id || player2.spouse !== player1.id) {
            player1.outputChatBox('Die Partner sind nicht miteinander verheiratet!');
            return false;
        }
        
        const config = this.registryConfig.divorce_certificate;
        const documentId = `divorce_${player1.id}_${player2.id}_${Date.now()}`;
        
        const document = {
            id: documentId,
            player1Id: player1.id,
            player1Name: player1.name,
            player2Id: player2.id,
            player2Name: player2.name,
            documentType: 'divorce_certificate',
            config: config,
            data: {
                divorceDate: divorceData.divorceDate || Date.now(),
                court: divorceData.court || 'Horizont-City Family Court',
                judge: divorceData.judge || 'Judge Williams',
                reason: divorceData.reason || 'Irreconcilable differences',
                propertySettlement: divorceData.propertySettlement || 'Equal division',
                alimony: divorceData.alimony || 0,
                childCustody: divorceData.childCustody || 'Joint custody'
            },
            status: 'approved',
            issueDate: Date.now(),
            expiryDate: null,
            created: Date.now()
        };
        
        this.civilDocuments.set(documentId, document);
        
        // Spieler-Status aktualisieren
        player1.relationshipStatus = 'divorced';
        player1.spouse = null;
        player1.divorceCertificate = documentId;
        
        player2.relationshipStatus = 'divorced';
        player2.spouse = null;
        player2.divorceCertificate = documentId;
        
        player1.outputChatBox(`Du hast dich von ${player2.name} scheiden lassen!`);
        player2.outputChatBox(`Du hast dich von ${player1.name} scheiden lassen!`);
        
        player1.call('ui:show', 'DivorceCertificateCreated', { document: document });
        player2.call('ui:show', 'DivorceCertificateCreated', { document: document });
        
        this.registryStats.totalDocuments++;
        this.registryStats.activeMarriages--;
        
        console.log(`[CIVIL_REGISTRY] Scheidungsurkunde für ${player1.id} und ${player2.id} erstellt`);
        return documentId;
    },
    
    // Personalausweis beantragen
    applyForIdCard(player, idData) {
        if (!player.birthCertificate) {
            player.outputChatBox('Du benötigst eine Geburtsurkunde!');
            return false;
        }
        
        const config = this.registryConfig.id_card;
        const applicationId = `id_application_${player.id}_${Date.now()}`;
        
        const application = {
            id: applicationId,
            playerId: player.id,
            playerName: player.name,
            documentType: 'id_card',
            config: config,
            data: {
                fullName: idData.fullName || player.name,
                birthDate: player.birthDate,
                address: idData.address || '123 Main Street, Horizont-City',
                photo: idData.photo || 'default_photo.jpg',
                height: idData.height || 175,
                eyeColor: idData.eyeColor || 'brown',
                hairColor: idData.hairColor || 'black'
            },
            status: 'pending',
            applicationDate: Date.now(),
            processingTime: config.processingTime,
            created: Date.now()
        };
        
        this.civilApplications.set(applicationId, application);
        
        player.money -= config.fee;
        
        player.outputChatBox(`Personalausweis beantragt! Bearbeitungszeit: ${config.processingTime} Tage`);
        player.call('ui:show', 'IdCardApplicationSubmitted', { application: application });
        
        this.registryStats.totalApplications++;
        
        console.log(`[CIVIL_REGISTRY] Personalausweis-Antrag von Spieler ${player.id}`);
        return applicationId;
    },
    
    // Antrag genehmigen
    approveApplication(applicationId, approverId) {
        const application = this.civilApplications.get(applicationId);
        if (!application) return false;
        
        application.status = 'approved';
        application.approvedBy = approverId;
        application.approvalDate = Date.now();
        
        // Dokument erstellen
        const documentId = `${application.documentType}_${application.playerId}_${Date.now()}`;
        const document = {
            id: documentId,
            playerId: application.playerId,
            playerName: application.playerName,
            documentType: application.documentType,
            config: application.config,
            data: application.data,
            status: 'active',
            issueDate: Date.now(),
            expiryDate: application.config.validityPeriod > 0 ? 
                Date.now() + (application.config.validityPeriod * 365 * 24 * 60 * 60 * 1000) : null,
            created: Date.now()
        };
        
        this.civilDocuments.set(documentId, document);
        
        // Spieler-Status aktualisieren
        const player = mp.players.at(application.playerId);
        if (player) {
            if (application.documentType === 'id_card') {
                player.idCard = documentId;
            } else if (application.documentType === 'passport') {
                player.passport = documentId;
            } else if (application.documentType === 'driver_license') {
                player.driverLicense = documentId;
            }
            
            player.outputChatBox(`${application.config.name} genehmigt!`);
            player.call('ui:show', 'DocumentApproved', { document: document });
        }
        
        this.registryStats.approvedApplications++;
        this.registryStats.totalDocuments++;
        
        console.log(`[CIVIL_REGISTRY] Antrag ${applicationId} genehmigt`);
        return documentId;
    },
    
    // Dokument abrufen
    getDocument(documentId) {
        return this.civilDocuments.get(documentId);
    },
    
    // Spieler-Dokumente abrufen
    getPlayerDocuments(playerId) {
        return Array.from(this.civilDocuments.values()).filter(doc => 
            doc.playerId === playerId || 
            doc.player1Id === playerId || 
            doc.player2Id === playerId
        );
    },
    
    // Standesamt-Statistiken
    getStatistics() {
        return {
            ...this.registryStats,
            totalDocuments: this.civilDocuments.size,
            totalApplications: this.civilApplications.size,
            pendingApplications: Array.from(this.civilApplications.values()).filter(app => 
                app.status === 'pending'
            ).length
        };
    }
};

// Events
mp.events.add('civil_registry:createBirth', (player, birthData) => {
    civilRegistrySystem.createBirthCertificate(player, birthData);
});

mp.events.add('civil_registry:createMarriage', (player1, player2, marriageData) => {
    civilRegistrySystem.createMarriageCertificate(player1, player2, marriageData);
});

mp.events.add('civil_registry:createDivorce', (player1, player2, divorceData) => {
    civilRegistrySystem.createDivorceCertificate(player1, player2, divorceData);
});

mp.events.add('civil_registry:applyId', (player, idData) => {
    civilRegistrySystem.applyForIdCard(player, idData);
});

mp.events.add('civil_registry:approve', (applicationId, approverId) => {
    civilRegistrySystem.approveApplication(applicationId, approverId);
});

// Commands
mp.events.addCommand('registry', (player, fullText, action, targetId, data) => {
    if (!action) {
        player.outputChatBox('Verwendung: /registry [birth|marry|divorce|id|passport|license] [SpielerID] [Daten]');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'birth':
            const birthData = {
                fullName: player.name,
                birthPlace: 'Horizont-City',
                gender: 'male',
                parents: { father: 'Unknown', mother: 'Unknown' }
            };
            civilRegistrySystem.createBirthCertificate(player, birthData);
            break;
            
        case 'marry':
            if (targetId) {
                const target = mp.players.at(parseInt(targetId));
                if (target) {
                    const marriageData = {
                        weddingPlace: 'Horizont-City City Hall',
                        officiant: 'Mayor Johnson'
                    };
                    civilRegistrySystem.createMarriageCertificate(player, target, marriageData);
                } else {
                    player.outputChatBox('Spieler nicht gefunden!');
                }
            } else {
                player.outputChatBox('Spieler-ID erforderlich!');
            }
            break;
            
        case 'divorce':
            if (targetId) {
                const target = mp.players.at(parseInt(targetId));
                if (target) {
                    const divorceData = {
                        reason: 'Irreconcilable differences',
                        court: 'Horizont-City Family Court'
                    };
                    civilRegistrySystem.createDivorceCertificate(player, target, divorceData);
                } else {
                    player.outputChatBox('Spieler nicht gefunden!');
                }
            } else {
                player.outputChatBox('Spieler-ID erforderlich!');
            }
            break;
            
        case 'id':
            const idData = {
                address: '123 Main Street, Horizont-City',
                height: 175,
                eyeColor: 'brown',
                hairColor: 'black'
            };
            civilRegistrySystem.applyForIdCard(player, idData);
            break;
            
        case 'passport':
            if (player.idCard) {
                const passportData = {
                    fullName: player.name,
                    birthDate: player.birthDate
                };
                // Passport application würde hier implementiert werden
                player.outputChatBox('Reisepass-Antrag würde hier implementiert werden!');
            } else {
                player.outputChatBox('Du benötigst einen Personalausweis!');
            }
            break;
            
        case 'license':
            if (player.idCard) {
                const licenseData = {
                    fullName: player.name,
                    birthDate: player.birthDate
                };
                // Driver license application würde hier implementiert werden
                player.outputChatBox('Führerschein-Antrag würde hier implementiert werden!');
            } else {
                player.outputChatBox('Du benötigst einen Personalausweis!');
            }
            break;
    }
});

// Civil Registry System initialisieren
civilRegistrySystem.init();

module.exports = civilRegistrySystem;
