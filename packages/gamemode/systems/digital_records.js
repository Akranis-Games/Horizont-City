// Digital Records System - Digitales Akten-System mit Verwaltung und Archivierung
// Behandelt alle digitalen Akten-Funktionen für Horizont-City Roleplay

const digitalRecordsSystem = {
    // Akten-Typen
    recordTypes: {
        CRIMINAL_RECORD: 'criminal_record',
        MEDICAL_RECORD: 'medical_record',
        EMPLOYMENT_RECORD: 'employment_record',
        EDUCATION_RECORD: 'education_record',
        FINANCIAL_RECORD: 'financial_record',
        PROPERTY_RECORD: 'property_record',
        VEHICLE_RECORD: 'vehicle_record',
        LICENSE_RECORD: 'license_record',
        INSURANCE_RECORD: 'insurance_record',
        COURT_RECORD: 'court_record',
        ADMINISTRATIVE_RECORD: 'administrative_record',
        PERSONAL_RECORD: 'personal_record',
        FAMILY_RECORD: 'family_record',
        MILITARY_RECORD: 'military_record',
        IMMIGRATION_RECORD: 'immigration_record'
    },
    
    // Akten-Status
    recordStatus: {
        ACTIVE: 'active',
        ARCHIVED: 'archived',
        PENDING: 'pending',
        REJECTED: 'rejected',
        EXPIRED: 'expired',
        DELETED: 'deleted',
        RESTRICTED: 'restricted',
        CLASSIFIED: 'classified'
    },
    
    // Zugriffs-Berechtigungen
    accessLevels: {
        PUBLIC: { name: 'Öffentlich', level: 1, permissions: ['read'] },
        RESTRICTED: { name: 'Eingeschränkt', level: 2, permissions: ['read', 'comment'] },
        CONFIDENTIAL: { name: 'Vertraulich', level: 3, permissions: ['read', 'comment', 'edit'] },
        SECRET: { name: 'Geheim', level: 4, permissions: ['read', 'comment', 'edit', 'delete'] },
        TOP_SECRET: { name: 'Streng Geheim', level: 5, permissions: ['all'] }
    },
    
    // Akten-Kategorien
    recordCategories: {
        criminal_record: {
            name: 'Strafregister',
            description: 'Kriminelle Vergehen und Strafen',
            accessLevel: 'confidential',
            retentionPeriod: 10, // Jahre
            fields: ['offense', 'date', 'location', 'officer', 'sentence', 'status']
        },
        medical_record: {
            name: 'Medizinische Akte',
            description: 'Gesundheitsdaten und Behandlungen',
            accessLevel: 'secret',
            retentionPeriod: 7,
            fields: ['condition', 'diagnosis', 'treatment', 'doctor', 'medication', 'notes']
        },
        employment_record: {
            name: 'Arbeitsakte',
            description: 'Berufliche Laufbahn und Beschäftigungen',
            accessLevel: 'restricted',
            retentionPeriod: 5,
            fields: ['company', 'position', 'start_date', 'end_date', 'salary', 'performance']
        },
        education_record: {
            name: 'Bildungsakte',
            description: 'Schulische und berufliche Ausbildung',
            accessLevel: 'restricted',
            retentionPeriod: 10,
            fields: ['institution', 'degree', 'graduation_date', 'gpa', 'certificates']
        },
        financial_record: {
            name: 'Finanzakte',
            description: 'Finanzielle Daten und Transaktionen',
            accessLevel: 'secret',
            retentionPeriod: 7,
            fields: ['income', 'expenses', 'assets', 'debts', 'taxes', 'bank_accounts']
        },
        property_record: {
            name: 'Immobilienakte',
            description: 'Eigentum und Immobilien',
            accessLevel: 'restricted',
            retentionPeriod: 15,
            fields: ['address', 'type', 'value', 'purchase_date', 'mortgage', 'insurance']
        },
        vehicle_record: {
            name: 'Fahrzeugakte',
            description: 'Fahrzeuge und Zulassungen',
            accessLevel: 'restricted',
            retentionPeriod: 5,
            fields: ['make', 'model', 'year', 'plate', 'registration', 'insurance']
        },
        license_record: {
            name: 'Lizenzakte',
            description: 'Lizenzen und Berechtigungen',
            accessLevel: 'restricted',
            retentionPeriod: 5,
            fields: ['type', 'number', 'issue_date', 'expiry_date', 'issuer', 'restrictions']
        }
    },
    
    // Digitale Akten
    digitalRecords: new Map(),
    
    // Akten-Zugriffe
    recordAccess: new Map(),
    
    // Akten-Änderungen
    recordChanges: new Map(),
    
    // Akten-Statistiken
    recordStats: {
        totalRecords: 0,
        activeRecords: 0,
        archivedRecords: 0,
        totalAccesses: 0,
        unauthorizedAccesses: 0,
        recordTypes: {}
    },
    
    // Digital Records System-Initialisierung
    init() {
        console.log('[DIGITAL_RECORDS] Digitales Akten-System initialisiert');
        this.initializeRecordDatabase();
    },
    
    // Akten-Datenbank initialisieren
    initializeRecordDatabase() {
        // Hier würden bestehende Akten aus der Datenbank geladen
        console.log('[DIGITAL_RECORDS] Akten-Datenbank initialisiert');
    },
    
    // Digitale Akte erstellen
    createRecord(player, recordType, data, accessLevel = 'restricted') {
        const category = this.recordCategories[recordType];
        if (!category) {
            player.outputChatBox('Akten-Typ nicht gefunden!');
            return false;
        }
        
        const recordId = `record_${player.id}_${Date.now()}`;
        const record = {
            id: recordId,
            playerId: player.id,
            playerName: player.name,
            recordType: recordType,
            category: category,
            data: data,
            accessLevel: accessLevel,
            status: 'active',
            createdBy: player.id,
            createdDate: Date.now(),
            lastModified: Date.now(),
            version: 1,
            changes: [],
            created: Date.now()
        };
        
        this.digitalRecords.set(recordId, record);
        
        player.outputChatBox(`Digitale Akte (${category.name}) erstellt!`);
        player.call('ui:show', 'RecordCreated', { record: record });
        
        this.recordStats.totalRecords++;
        this.recordStats.activeRecords++;
        this.recordStats.recordTypes[recordType] = (this.recordStats.recordTypes[recordType] || 0) + 1;
        
        console.log(`[DIGITAL_RECORDS] Akte für Spieler ${player.id} erstellt`);
        return recordId;
    },
    
    // Akte abrufen
    getRecord(recordId, requesterId) {
        const record = this.digitalRecords.get(recordId);
        if (!record) {
            return null;
        }
        
        // Zugriffs-Berechtigung prüfen
        if (!this.checkAccess(record, requesterId)) {
            this.recordStats.unauthorizedAccesses++;
            return null;
        }
        
        // Zugriff protokollieren
        this.logAccess(recordId, requesterId, 'read');
        
        return record;
    },
    
    // Akte aktualisieren
    updateRecord(player, recordId, newData, reason) {
        const record = this.digitalRecords.get(recordId);
        if (!record) {
            player.outputChatBox('Akte nicht gefunden!');
            return false;
        }
        
        if (!this.checkAccess(record, player.id, 'edit')) {
            player.outputChatBox('Keine Berechtigung zum Bearbeiten!');
            return false;
        }
        
        const changeId = `change_${recordId}_${Date.now()}`;
        const change = {
            id: changeId,
            recordId: recordId,
            changedBy: player.id,
            changedDate: Date.now(),
            oldData: { ...record.data },
            newData: newData,
            reason: reason,
            created: Date.now()
        };
        
        record.data = { ...record.data, ...newData };
        record.lastModified = Date.now();
        record.version++;
        record.changes.push(changeId);
        
        this.recordChanges.set(changeId, change);
        this.logAccess(recordId, player.id, 'edit');
        
        player.outputChatBox('Akte aktualisiert!');
        player.call('ui:show', 'RecordUpdated', { record: record, change: change });
        
        console.log(`[DIGITAL_RECORDS] Akte ${recordId} von Spieler ${player.id} aktualisiert`);
        return changeId;
    },
    
    // Akte archivieren
    archiveRecord(player, recordId, reason) {
        const record = this.digitalRecords.get(recordId);
        if (!record) {
            player.outputChatBox('Akte nicht gefunden!');
            return false;
        }
        
        if (!this.checkAccess(record, player.id, 'edit')) {
            player.outputChatBox('Keine Berechtigung zum Archivieren!');
            return false;
        }
        
        record.status = 'archived';
        record.archivedBy = player.id;
        record.archivedDate = Date.now();
        record.archiveReason = reason;
        
        this.recordStats.activeRecords--;
        this.recordStats.archivedRecords++;
        
        player.outputChatBox('Akte archiviert!');
        player.call('ui:show', 'RecordArchived', { record: record });
        
        console.log(`[DIGITAL_RECORDS] Akte ${recordId} von Spieler ${player.id} archiviert`);
        return true;
    },
    
    // Akte löschen
    deleteRecord(player, recordId, reason) {
        const record = this.digitalRecords.get(recordId);
        if (!record) {
            player.outputChatBox('Akte nicht gefunden!');
            return false;
        }
        
        if (!this.checkAccess(record, player.id, 'delete')) {
            player.outputChatBox('Keine Berechtigung zum Löschen!');
            return false;
        }
        
        record.status = 'deleted';
        record.deletedBy = player.id;
        record.deletedDate = Date.now();
        record.deleteReason = reason;
        
        this.recordStats.activeRecords--;
        
        player.outputChatBox('Akte gelöscht!');
        player.call('ui:show', 'RecordDeleted', { record: record });
        
        console.log(`[DIGITAL_RECORDS] Akte ${recordId} von Spieler ${player.id} gelöscht`);
        return true;
    },
    
    // Zugriffs-Berechtigung prüfen
    checkAccess(record, requesterId, action = 'read') {
        const requester = mp.players.at(requesterId);
        if (!requester) return false;
        
        // Eigentümer hat immer Zugriff
        if (record.playerId === requesterId) return true;
        
        // Admin-Zugriff
        if (requester.admin && requester.adminLevel >= 3) return true;
        
        // Moderator-Zugriff
        if (requester.moderator && record.accessLevel !== 'top_secret') return true;
        
        // Polizei-Zugriff auf Strafregister
        if (requester.job === 'police' && record.recordType === 'criminal_record') return true;
        
        // Arzt-Zugriff auf medizinische Akten
        if (requester.job === 'doctor' && record.recordType === 'medical_record') return true;
        
        // Zugriffs-Level prüfen
        const accessLevel = this.accessLevels[record.accessLevel];
        if (!accessLevel) return false;
        
        return accessLevel.permissions.includes(action) || accessLevel.permissions.includes('all');
    },
    
    // Zugriff protokollieren
    logAccess(recordId, requesterId, action) {
        const accessId = `access_${recordId}_${Date.now()}`;
        const access = {
            id: accessId,
            recordId: recordId,
            requesterId: requesterId,
            action: action,
            timestamp: Date.now(),
            ip: '127.0.0.1', // Vereinfacht
            created: Date.now()
        };
        
        this.recordAccess.set(accessId, access);
        this.recordStats.totalAccesses++;
    },
    
    // Akten suchen
    searchRecords(player, criteria) {
        const results = Array.from(this.digitalRecords.values()).filter(record => {
            // Status-Filter
            if (criteria.status && record.status !== criteria.status) return false;
            
            // Typ-Filter
            if (criteria.recordType && record.recordType !== criteria.recordType) return false;
            
            // Zugriffs-Berechtigung
            if (!this.checkAccess(record, player.id)) return false;
            
            // Text-Suche
            if (criteria.searchText) {
                const searchText = criteria.searchText.toLowerCase();
                const recordText = JSON.stringify(record.data).toLowerCase();
                if (!recordText.includes(searchText)) return false;
            }
            
            return true;
        });
        
        player.outputChatBox(`Gefunden: ${results.length} Akten`);
        player.call('ui:show', 'RecordSearchResults', { results: results });
        
        console.log(`[DIGITAL_RECORDS] Suche von Spieler ${player.id}: ${results.length} Ergebnisse`);
        return results;
    },
    
    // Akten-Statistiken
    getStatistics() {
        return {
            ...this.recordStats,
            totalAccesses: this.recordAccess.size,
            totalChanges: this.recordChanges.size,
            recordTypes: Object.keys(this.recordStats.recordTypes).length
        };
    }
};

// Events
mp.events.add('digital_records:create', (player, recordType, data, accessLevel) => {
    digitalRecordsSystem.createRecord(player, recordType, data, accessLevel);
});

mp.events.add('digital_records:update', (player, recordId, newData, reason) => {
    digitalRecordsSystem.updateRecord(player, recordId, newData, reason);
});

mp.events.add('digital_records:archive', (player, recordId, reason) => {
    digitalRecordsSystem.archiveRecord(player, recordId, reason);
});

mp.events.add('digital_records:delete', (player, recordId, reason) => {
    digitalRecordsSystem.deleteRecord(player, recordId, reason);
});

mp.events.add('digital_records:search', (player, criteria) => {
    digitalRecordsSystem.searchRecords(player, criteria);
});

// Commands
mp.events.addCommand('records', (player, fullText, action, recordType, searchText) => {
    if (!action) {
        player.outputChatBox('Verwendung: /records [create|search|list|archive|delete] [Typ] [Suchtext]');
        player.outputChatBox('Verfügbare Typen: criminal_record, medical_record, employment_record, education_record');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (recordType) {
                const sampleData = { note: 'Beispiel-Akte', created_by: player.name };
                digitalRecordsSystem.createRecord(player, recordType, sampleData);
            } else {
                player.outputChatBox('Akten-Typ erforderlich!');
            }
            break;
            
        case 'search':
            const criteria = {
                recordType: recordType,
                searchText: searchText,
                status: 'active'
            };
            digitalRecordsSystem.searchRecords(player, criteria);
            break;
            
        case 'list':
            digitalRecordsSystem.searchRecords(player, { status: 'active' });
            break;
            
        case 'archive':
            if (recordType) {
                digitalRecordsSystem.archiveRecord(player, recordType, 'Manuell archiviert');
            } else {
                player.outputChatBox('Akten-ID erforderlich!');
            }
            break;
            
        case 'delete':
            if (recordType) {
                digitalRecordsSystem.deleteRecord(player, recordType, 'Manuell gelöscht');
            } else {
                player.outputChatBox('Akten-ID erforderlich!');
            }
            break;
    }
});

// Digital Records System initialisieren
digitalRecordsSystem.init();

module.exports = digitalRecordsSystem;
