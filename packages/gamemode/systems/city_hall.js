// City Hall System - Rathaus-System mit Verwaltung und Services
// Behandelt alle Rathaus-Funktionen für Horizont-City Roleplay

const cityHallSystem = {
    // Rathaus-Services
    services: {
        BIRTH_CERTIFICATE: 'birth_certificate',
        ID_CARD: 'id_card',
        PASSPORT: 'passport',
        DRIVER_LICENSE: 'driver_license',
        MARRIAGE_LICENSE: 'marriage_license',
        DIVORCE_PAPERS: 'divorce_papers',
        BUSINESS_LICENSE: 'business_license',
        PROPERTY_DEED: 'property_deed',
        TAX_RETURN: 'tax_return',
        VOTING_REGISTRATION: 'voting_registration',
        CITIZENSHIP: 'citizenship',
        IMMIGRATION: 'immigration',
        NOTARY: 'notary',
        LEGAL_AID: 'legal_aid',
        COMPLAINT: 'complaint',
        PERMIT: 'permit',
        LICENSE_RENEWAL: 'license_renewal',
        RECORD_REQUEST: 'record_request',
        APPEAL: 'appeal',
        HEARING: 'hearing'
    },
    
    // Service-Konfiguration
    serviceConfig: {
        birth_certificate: {
            name: 'Geburtsurkunde',
            description: 'Ausstellung einer Geburtsurkunde',
            cost: 25,
            processingTime: 1800, // 30 Minuten
            requirements: ['valid_id', 'birth_info'],
            documents: ['application_form', 'id_copy'],
            validity: 'permanent',
            category: 'vital_records',
            department: 'vital_statistics'
        },
        id_card: {
            name: 'Personalausweis',
            description: 'Ausstellung eines Personalausweises',
            cost: 50,
            processingTime: 3600, // 1 Stunde
            requirements: ['birth_certificate', 'photo', 'address_proof'],
            documents: ['application_form', 'photo', 'proof_of_address'],
            validity: 31536000, // 1 Jahr
            category: 'identification',
            department: 'citizen_services'
        },
        passport: {
            name: 'Reisepass',
            description: 'Ausstellung eines Reisepasses',
            cost: 100,
            processingTime: 7200, // 2 Stunden
            requirements: ['birth_certificate', 'id_card', 'photo', 'emergency_contact'],
            documents: ['application_form', 'photo', 'emergency_contact_info'],
            validity: 31536000, // 1 Jahr
            category: 'travel',
            department: 'citizen_services'
        },
        driver_license: {
            name: 'Führerschein',
            description: 'Ausstellung eines Führerscheins',
            cost: 75,
            processingTime: 5400, // 1.5 Stunden
            requirements: ['id_card', 'medical_certificate', 'theory_test', 'practical_test'],
            documents: ['application_form', 'medical_cert', 'test_results'],
            validity: 15768000, // 6 Monate
            category: 'transportation',
            department: 'motor_vehicle'
        },
        marriage_license: {
            name: 'Eheurkunde',
            description: 'Ausstellung einer Eheurkunde',
            cost: 150,
            processingTime: 3600, // 1 Stunde
            requirements: ['id_cards', 'birth_certificates', 'witnesses'],
            documents: ['application_form', 'witness_forms'],
            validity: 'permanent',
            category: 'vital_records',
            department: 'vital_statistics'
        },
        divorce_papers: {
            name: 'Scheidungspapiere',
            description: 'Ausstellung von Scheidungspapieren',
            cost: 200,
            processingTime: 7200, // 2 Stunden
            requirements: ['marriage_certificate', 'legal_representation', 'settlement_agreement'],
            documents: ['application_form', 'legal_documents'],
            validity: 'permanent',
            category: 'legal',
            department: 'family_court'
        },
        business_license: {
            name: 'Gewerbeschein',
            description: 'Ausstellung eines Gewerbescheins',
            cost: 300,
            processingTime: 14400, // 4 Stunden
            requirements: ['id_card', 'business_plan', 'tax_id', 'insurance'],
            documents: ['application_form', 'business_plan', 'insurance_cert'],
            validity: 31536000, // 1 Jahr
            category: 'business',
            department: 'economic_development'
        },
        property_deed: {
            name: 'Grundbuchauszug',
            description: 'Ausstellung eines Grundbuchauszugs',
            cost: 100,
            processingTime: 3600, // 1 Stunde
            requirements: ['id_card', 'property_address', 'ownership_proof'],
            documents: ['application_form', 'property_info'],
            validity: 2592000, // 1 Monat
            category: 'property',
            department: 'land_records'
        },
        tax_return: {
            name: 'Steuererklärung',
            description: 'Einreichung einer Steuererklärung',
            cost: 0,
            processingTime: 7200, // 2 Stunden
            requirements: ['income_documents', 'expense_receipts', 'id_card'],
            documents: ['tax_forms', 'supporting_documents'],
            validity: 31536000, // 1 Jahr
            category: 'taxation',
            department: 'revenue'
        },
        voting_registration: {
            name: 'Wählerregistrierung',
            description: 'Registrierung zur Wahl',
            cost: 0,
            processingTime: 1800, // 30 Minuten
            requirements: ['id_card', 'address_proof', 'citizenship'],
            documents: ['registration_form', 'address_proof'],
            validity: 15768000, // 6 Monate
            category: 'civic',
            department: 'elections'
        },
        citizenship: {
            name: 'Staatsbürgerschaft',
            description: 'Beantragung der Staatsbürgerschaft',
            cost: 500,
            processingTime: 86400, // 24 Stunden
            requirements: ['residence_permit', 'language_test', 'civic_test', 'background_check'],
            documents: ['application_form', 'test_results', 'background_check'],
            validity: 'permanent',
            category: 'immigration',
            department: 'immigration_services'
        },
        immigration: {
            name: 'Einwanderung',
            description: 'Einwanderungsantrag',
            cost: 300,
            processingTime: 43200, // 12 Stunden
            requirements: ['passport', 'visa', 'employment_offer', 'background_check'],
            documents: ['application_form', 'employment_contract', 'background_check'],
            validity: 31536000, // 1 Jahr
            category: 'immigration',
            department: 'immigration_services'
        },
        notary: {
            name: 'Notar',
            description: 'Notarielle Beglaubigung',
            cost: 50,
            processingTime: 1800, // 30 Minuten
            requirements: ['id_card', 'document_to_notarize'],
            documents: ['document', 'application_form'],
            validity: 'permanent',
            category: 'legal',
            department: 'legal_services'
        },
        legal_aid: {
            name: 'Rechtshilfe',
            description: 'Beantragung von Rechtshilfe',
            cost: 0,
            processingTime: 3600, // 1 Stunde
            requirements: ['income_proof', 'legal_issue', 'id_card'],
            documents: ['application_form', 'income_documents', 'legal_documents'],
            validity: 31536000, // 1 Jahr
            category: 'legal',
            department: 'legal_services'
        },
        complaint: {
            name: 'Beschwerde',
            description: 'Einreichung einer Beschwerde',
            cost: 0,
            processingTime: 1800, // 30 Minuten
            requirements: ['id_card', 'complaint_details'],
            documents: ['complaint_form', 'supporting_evidence'],
            validity: 2592000, // 1 Monat
            category: 'civic',
            department: 'citizen_services'
        },
        permit: {
            name: 'Genehmigung',
            description: 'Beantragung einer Genehmigung',
            cost: 100,
            processingTime: 7200, // 2 Stunden
            requirements: ['id_card', 'permit_type', 'supporting_documents'],
            documents: ['application_form', 'supporting_docs'],
            validity: 31536000, // 1 Jahr
            category: 'regulatory',
            department: 'permits'
        },
        license_renewal: {
            name: 'Lizenzverlängerung',
            description: 'Verlängerung einer Lizenz',
            cost: 50,
            processingTime: 3600, // 1 Stunde
            requirements: ['current_license', 'id_card', 'renewal_fee'],
            documents: ['renewal_form', 'current_license'],
            validity: 31536000, // 1 Jahr
            category: 'regulatory',
            department: 'licensing'
        },
        record_request: {
            name: 'Akteneinsicht',
            description: 'Beantragung von Akteneinsicht',
            cost: 25,
            processingTime: 3600, // 1 Stunde
            requirements: ['id_card', 'record_type', 'authorization'],
            documents: ['request_form', 'authorization_doc'],
            validity: 2592000, // 1 Monat
            category: 'records',
            department: 'records_management'
        },
        appeal: {
            name: 'Widerspruch',
            description: 'Einlegung eines Widerspruchs',
            cost: 100,
            processingTime: 7200, // 2 Stunden
            requirements: ['id_card', 'original_decision', 'appeal_grounds'],
            documents: ['appeal_form', 'original_decision', 'supporting_docs'],
            validity: 2592000, // 1 Monat
            category: 'legal',
            department: 'legal_services'
        },
        hearing: {
            name: 'Anhörung',
            description: 'Beantragung einer Anhörung',
            cost: 150,
            processingTime: 14400, // 4 Stunden
            requirements: ['id_card', 'hearing_request', 'legal_representation'],
            documents: ['hearing_form', 'legal_docs'],
            validity: 2592000, // 1 Monat
            category: 'legal',
            department: 'legal_services'
        }
    },
    
    // Abteilungen
    departments: {
        vital_statistics: {
            name: 'Standesamt',
            location: { x: -544, y: -204, z: 37 },
            services: ['birth_certificate', 'marriage_license', 'divorce_papers'],
            hours: '9:00-17:00',
            staff: 5
        },
        citizen_services: {
            name: 'Bürgerservice',
            location: { x: -544, y: -204, z: 37 },
            services: ['id_card', 'passport', 'voting_registration'],
            hours: '8:00-18:00',
            staff: 8
        },
        motor_vehicle: {
            name: 'Fahrzeugamt',
            location: { x: -544, y: -204, z: 37 },
            services: ['driver_license', 'license_renewal'],
            hours: '8:00-16:00',
            staff: 6
        },
        economic_development: {
            name: 'Wirtschaftsförderung',
            location: { x: -544, y: -204, z: 37 },
            services: ['business_license', 'permit'],
            hours: '9:00-17:00',
            staff: 4
        },
        land_records: {
            name: 'Grundbuchamt',
            location: { x: -544, y: -204, z: 37 },
            services: ['property_deed', 'record_request'],
            hours: '9:00-15:00',
            staff: 3
        },
        revenue: {
            name: 'Finanzamt',
            location: { x: -544, y: -204, z: 37 },
            services: ['tax_return'],
            hours: '8:00-16:00',
            staff: 10
        },
        elections: {
            name: 'Wahlamt',
            location: { x: -544, y: -204, z: 37 },
            services: ['voting_registration'],
            hours: '9:00-17:00',
            staff: 2
        },
        immigration_services: {
            name: 'Einwanderungsbehörde',
            location: { x: -544, y: -204, z: 37 },
            services: ['citizenship', 'immigration'],
            hours: '9:00-16:00',
            staff: 6
        },
        legal_services: {
            name: 'Rechtsabteilung',
            location: { x: -544, y: -204, z: 37 },
            services: ['notary', 'legal_aid', 'appeal', 'hearing'],
            hours: '9:00-17:00',
            staff: 8
        },
        family_court: {
            name: 'Familiengericht',
            location: { x: -544, y: -204, z: 37 },
            services: ['divorce_papers'],
            hours: '9:00-16:00',
            staff: 4
        },
        permits: {
            name: 'Genehmigungsbehörde',
            location: { x: -544, y: -204, z: 37 },
            services: ['permit'],
            hours: '9:00-17:00',
            staff: 5
        },
        licensing: {
            name: 'Lizenzbehörde',
            location: { x: -544, y: -204, z: 37 },
            services: ['license_renewal'],
            hours: '9:00-16:00',
            staff: 3
        },
        records_management: {
            name: 'Aktenverwaltung',
            location: { x: -544, y: -204, z: 37 },
            services: ['record_request'],
            hours: '9:00-15:00',
            staff: 2
        }
    },
    
    // Aktive Services
    activeServices: new Map(),
    
    // Warteschlangen
    queues: new Map(),
    
    // Termine
    appointments: new Map(),
    
    // Rathaus-System-Initialisierung
    init() {
        console.log('[CITY_HALL] Rathaus-System initialisiert');
        this.initializeDepartments();
    },
    
    // Abteilungen initialisieren
    initializeDepartments() {
        Object.keys(this.departments).forEach(deptId => {
            const dept = this.departments[deptId];
            dept.id = deptId;
            dept.queue = [];
            dept.currentService = null;
            dept.status = 'open';
            
            this.queues.set(deptId, dept);
        });
        
        console.log(`[CITY_HALL] ${Object.keys(this.departments).length} Abteilungen initialisiert`);
    },
    
    // Service beantragen
    requestService(player, serviceType, department) {
        const serviceConfig = this.serviceConfig[serviceType];
        if (!serviceConfig) {
            player.outputChatBox('Service nicht verfügbar!');
            return false;
        }
        
        const dept = this.departments[department];
        if (!dept) {
            player.outputChatBox('Abteilung nicht gefunden!');
            return false;
        }
        
        if (!dept.services.includes(serviceType)) {
            player.outputChatBox('Service nicht in dieser Abteilung verfügbar!');
            return false;
        }
        
        if (player.money < serviceConfig.cost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${serviceConfig.cost}`);
            return false;
        }
        
        const serviceId = `service_${player.id}_${Date.now()}`;
        const service = {
            id: serviceId,
            playerId: player.id,
            type: serviceType,
            department: department,
            config: serviceConfig,
            status: 'pending',
            created: Date.now(),
            startTime: null,
            endTime: null,
            cost: serviceConfig.cost,
            requirements: [...serviceConfig.requirements],
            documents: [...serviceConfig.documents]
        };
        
        this.activeServices.set(serviceId, service);
        dept.queue.push(serviceId);
        
        player.money -= serviceConfig.cost;
        
        player.outputChatBox(`Service ${serviceConfig.name} beantragt! Kosten: $${serviceConfig.cost}`);
        player.call('ui:show', 'CityHallService', { service: service });
        
        console.log(`[CITY_HALL] Service ${serviceType} von Spieler ${player.id} beantragt`);
        return serviceId;
    },
    
    // Service bearbeiten
    processService(player, serviceId) {
        const service = this.activeServices.get(serviceId);
        if (!service) {
            player.outputChatBox('Service nicht gefunden!');
            return false;
        }
        
        if (service.status !== 'pending') {
            player.outputChatBox('Service bereits bearbeitet!');
            return false;
        }
        
        // Service bearbeiten
        service.status = 'processing';
        service.startTime = Date.now();
        service.endTime = Date.now() + service.config.processingTime;
        
        // Timer für Service
        setTimeout(() => {
            this.completeService(player, serviceId);
        }, service.config.processingTime);
        
        player.outputChatBox(`Service ${service.config.name} wird bearbeitet... Dauer: ${service.config.processingTime / 60} Minuten`);
        console.log(`[CITY_HALL] Service ${serviceId} von Spieler ${player.id} bearbeitet`);
        return true;
    },
    
    // Service abschließen
    completeService(player, serviceId) {
        const service = this.activeServices.get(serviceId);
        if (!service) {
            return;
        }
        
        service.status = 'completed';
        service.endTime = Date.now();
        
        // Service-Ergebnis geben
        const result = this.generateServiceResult(service);
        
        player.outputChatBox(`${service.config.name} abgeschlossen!`);
        player.call('ui:show', 'ServiceResult', { result: result });
        
        console.log(`[CITY_HALL] Service ${serviceId} von Spieler ${player.id} abgeschlossen`);
    },
    
    // Service-Ergebnis generieren
    generateServiceResult(service) {
        const result = {
            serviceId: service.id,
            serviceName: service.config.name,
            status: 'completed',
            completionTime: service.endTime,
            validity: service.config.validity,
            documents: service.config.documents,
            nextRenewal: service.config.validity !== 'permanent' ? 
                service.endTime + service.config.validity : null
        };
        
        return result;
    },
    
    // Termin vereinbaren
    scheduleAppointment(player, serviceType, department, dateTime) {
        const serviceConfig = this.serviceConfig[serviceType];
        if (!serviceConfig) {
            player.outputChatBox('Service nicht verfügbar!');
            return false;
        }
        
        const dept = this.departments[department];
        if (!dept) {
            player.outputChatBox('Abteilung nicht gefunden!');
            return false;
        }
        
        const appointmentId = `appointment_${player.id}_${Date.now()}`;
        const appointment = {
            id: appointmentId,
            playerId: player.id,
            serviceType: serviceType,
            department: department,
            dateTime: dateTime,
            status: 'scheduled',
            created: Date.now()
        };
        
        this.appointments.set(appointmentId, appointment);
        
        player.outputChatBox(`Termin für ${serviceConfig.name} vereinbart! Datum: ${new Date(dateTime).toLocaleString()}`);
        console.log(`[CITY_HALL] Termin von Spieler ${player.id} vereinbart`);
        return appointmentId;
    },
    
    // Warteschlange abfragen
    getQueueStatus(player, department) {
        const dept = this.departments[department];
        if (!dept) {
            player.outputChatBox('Abteilung nicht gefunden!');
            return false;
        }
        
        const queueLength = dept.queue.length;
        const estimatedWait = queueLength * 15; // 15 Minuten pro Person
        
        player.outputChatBox(`Warteschlange ${dept.name}: ${queueLength} Personen, geschätzte Wartezeit: ${estimatedWait} Minuten`);
        return { queueLength, estimatedWait };
    },
    
    // Rathaus-Statistiken
    getStatistics() {
        return {
            totalServices: Object.keys(this.serviceConfig).length,
            totalDepartments: Object.keys(this.departments).length,
            activeServices: this.activeServices.size,
            totalAppointments: this.appointments.size,
            totalQueues: this.queues.size
        };
    }
};

// Events
mp.events.add('city_hall:requestService', (player, serviceType, department) => {
    cityHallSystem.requestService(player, serviceType, department);
});

mp.events.add('city_hall:processService', (player, serviceId) => {
    cityHallSystem.processService(player, serviceId);
});

mp.events.add('city_hall:scheduleAppointment', (player, serviceType, department, dateTime) => {
    cityHallSystem.scheduleAppointment(player, serviceType, department, dateTime);
});

mp.events.add('city_hall:getQueueStatus', (player, department) => {
    cityHallSystem.getQueueStatus(player, department);
});

// Commands
mp.events.addCommand('cityhall', (player, fullText, action, serviceType, department) => {
    if (!action) {
        player.outputChatBox('Verwendung: /cityhall [request|schedule|queue] [Service] [Abteilung]');
        player.outputChatBox('Verfügbare Services: birth_certificate, id_card, passport, driver_license, marriage_license');
        player.outputChatBox('Verfügbare Abteilungen: vital_statistics, citizen_services, motor_vehicle, economic_development');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'request':
            if (serviceType && department) {
                cityHallSystem.requestService(player, serviceType, department);
            } else {
                player.outputChatBox('Service und Abteilung erforderlich!');
            }
            break;
            
        case 'schedule':
            if (serviceType && department) {
                const dateTime = Date.now() + 3600000; // 1 Stunde später
                cityHallSystem.scheduleAppointment(player, serviceType, department, dateTime);
            } else {
                player.outputChatBox('Service und Abteilung erforderlich!');
            }
            break;
            
        case 'queue':
            if (department) {
                cityHallSystem.getQueueStatus(player, department);
            } else {
                player.outputChatBox('Abteilung erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('cityhallstats', (player) => {
    const stats = cityHallSystem.getStatistics();
    player.outputChatBox('=== Rathaus-Statistiken ===');
    player.outputChatBox(`Gesamt Services: ${stats.totalServices}`);
    player.outputChatBox(`Gesamt Abteilungen: ${stats.totalDepartments}`);
    player.outputChatBox(`Aktive Services: ${stats.activeServices}`);
    player.outputChatBox(`Gesamt Termine: ${stats.totalAppointments}`);
    player.outputChatBox(`Gesamt Warteschlangen: ${stats.totalQueues}`);
});

// Rathaus-System initialisieren
cityHallSystem.init();

module.exports = cityHallSystem;
