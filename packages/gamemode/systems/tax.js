// Tax System - Steuer-System mit Steuerbehörden und Verwaltung
// Behandelt alle Steuer-Funktionen für Horizont-City Roleplay

const taxSystem = {
    // Steuer-Typen
    taxTypes: {
        INCOME_TAX: 'income_tax',
        CORPORATE_TAX: 'corporate_tax',
        SALES_TAX: 'sales_tax',
        PROPERTY_TAX: 'property_tax',
        VEHICLE_TAX: 'vehicle_tax',
        LUXURY_TAX: 'luxury_tax',
        INHERITANCE_TAX: 'inheritance_tax',
        GIFT_TAX: 'gift_tax',
        CAPITAL_GAINS_TAX: 'capital_gains_tax',
        DIVIDEND_TAX: 'dividend_tax',
        INTEREST_TAX: 'interest_tax',
        RENTAL_TAX: 'rental_tax',
        BUSINESS_TAX: 'business_tax',
        PROFESSIONAL_TAX: 'professional_tax',
        ENTERTAINMENT_TAX: 'entertainment_tax',
        TOBACCO_TAX: 'tobacco_tax',
        ALCOHOL_TAX: 'alcohol_tax',
        FUEL_TAX: 'fuel_tax',
        CARBON_TAX: 'carbon_tax',
        IMPORT_TAX: 'import_tax',
        EXPORT_TAX: 'export_tax',
        CUSTOMS_DUTY: 'customs_duty',
        STAMP_DUTY: 'stamp_duty',
        TRANSFER_TAX: 'transfer_tax',
        REGISTRATION_TAX: 'registration_tax'
    },
    
    // Steuer-Klassen
    taxBrackets: {
        income_tax: [
            { min: 0, max: 10000, rate: 0.10, name: 'Grundfreibetrag' },
            { min: 10000, max: 25000, rate: 0.15, name: 'Niedrigeinkommen' },
            { min: 25000, max: 50000, rate: 0.25, name: 'Mittleres Einkommen' },
            { min: 50000, max: 100000, rate: 0.35, name: 'Höheres Einkommen' },
            { min: 100000, max: 200000, rate: 0.45, name: 'Hohes Einkommen' },
            { min: 200000, max: Infinity, rate: 0.50, name: 'Spitzeneinkommen' }
        ],
        corporate_tax: [
            { min: 0, max: 50000, rate: 0.15, name: 'Kleinunternehmen' },
            { min: 50000, max: 200000, rate: 0.25, name: 'Mittelunternehmen' },
            { min: 200000, max: 500000, rate: 0.30, name: 'Großunternehmen' },
            { min: 500000, max: Infinity, rate: 0.35, name: 'Konzerne' }
        ],
        sales_tax: [
            { category: 'food', rate: 0.07, name: 'Lebensmittel' },
            { category: 'clothing', rate: 0.19, name: 'Bekleidung' },
            { category: 'electronics', rate: 0.19, name: 'Elektronik' },
            { category: 'vehicles', rate: 0.19, name: 'Fahrzeuge' },
            { category: 'luxury', rate: 0.25, name: 'Luxusgüter' },
            { category: 'services', rate: 0.19, name: 'Dienstleistungen' },
            { category: 'entertainment', rate: 0.19, name: 'Unterhaltung' },
            { category: 'tobacco', rate: 0.30, name: 'Tabakwaren' },
            { category: 'alcohol', rate: 0.25, name: 'Alkohol' },
            { category: 'fuel', rate: 0.20, name: 'Kraftstoff' }
        ],
        property_tax: [
            { min: 0, max: 100000, rate: 0.005, name: 'Einfamilienhaus' },
            { min: 100000, max: 500000, rate: 0.01, name: 'Mehrfamilienhaus' },
            { min: 500000, max: 1000000, rate: 0.015, name: 'Luxusimmobilie' },
            { min: 1000000, max: Infinity, rate: 0.02, name: 'Premiumimmobilie' }
        ],
        vehicle_tax: [
            { type: 'car', rate: 0.02, name: 'PKW' },
            { type: 'motorcycle', rate: 0.01, name: 'Motorrad' },
            { type: 'truck', rate: 0.03, name: 'LKW' },
            { type: 'bus', rate: 0.025, name: 'Bus' },
            { type: 'boat', rate: 0.015, name: 'Boot' },
            { type: 'aircraft', rate: 0.05, name: 'Flugzeug' }
        ]
    },
    
    // Steuerbehörden
    taxOffices: {
        'office_1': {
            name: 'Finanzamt Mitte',
            location: { x: 1000, y: 2000, z: 30 },
            services: ['income_tax', 'corporate_tax', 'property_tax', 'vehicle_tax'],
            officers: 10,
            capacity: 50,
            opening_hours: '8:00-16:00',
            status: 'active',
            created: Date.now()
        },
        'office_2': {
            name: 'Finanzamt Nord',
            location: { x: 1500, y: 2500, z: 30 },
            services: ['income_tax', 'corporate_tax', 'sales_tax', 'business_tax'],
            officers: 8,
            capacity: 40,
            opening_hours: '8:00-16:00',
            status: 'active',
            created: Date.now()
        },
        'office_3': {
            name: 'Finanzamt Süd',
            location: { x: 2000, y: 3000, z: 30 },
            services: ['income_tax', 'corporate_tax', 'luxury_tax', 'inheritance_tax'],
            officers: 12,
            capacity: 60,
            opening_hours: '8:00-16:00',
            status: 'active',
            created: Date.now()
        }
    },
    
    // Steuer-Konfiguration
    taxConfig: {
        income_tax: {
            name: 'Einkommensteuer',
            type: 'income_tax',
            description: 'Steuer auf persönliches Einkommen',
            brackets: 'income_tax',
            filing_deadline: '31.03', // 31. März
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 100,
            maximum_amount: 1000000
        },
        corporate_tax: {
            name: 'Körperschaftsteuer',
            type: 'corporate_tax',
            description: 'Steuer auf Unternehmensgewinne',
            brackets: 'corporate_tax',
            filing_deadline: '31.07', // 31. Juli
            payment_deadline: '31.05', // 31. Mai
            penalty_rate: 0.015, // 1.5% pro Monat
            interest_rate: 0.06, // 6% pro Jahr
            minimum_amount: 500,
            maximum_amount: 5000000
        },
        sales_tax: {
            name: 'Umsatzsteuer',
            type: 'sales_tax',
            description: 'Steuer auf Waren und Dienstleistungen',
            brackets: 'sales_tax',
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        property_tax: {
            name: 'Grundsteuer',
            type: 'property_tax',
            description: 'Steuer auf Immobilienbesitz',
            brackets: 'property_tax',
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 50,
            maximum_amount: 100000
        },
        vehicle_tax: {
            name: 'Kraftfahrzeugsteuer',
            type: 'vehicle_tax',
            description: 'Steuer auf Fahrzeugbesitz',
            brackets: 'vehicle_tax',
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 25,
            maximum_amount: 50000
        },
        luxury_tax: {
            name: 'Luxussteuer',
            type: 'luxury_tax',
            description: 'Steuer auf Luxusgüter',
            rate: 0.25,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        inheritance_tax: {
            name: 'Erbschaftsteuer',
            type: 'inheritance_tax',
            description: 'Steuer auf Erbschaften',
            rate: 0.20,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 1000,
            maximum_amount: 10000000
        },
        gift_tax: {
            name: 'Schenkungssteuer',
            type: 'gift_tax',
            description: 'Steuer auf Schenkungen',
            rate: 0.15,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 500,
            maximum_amount: 5000000
        },
        capital_gains_tax: {
            name: 'Kapitalertragsteuer',
            type: 'capital_gains_tax',
            description: 'Steuer auf Kapitalgewinne',
            rate: 0.25,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 100,
            maximum_amount: 1000000
        },
        dividend_tax: {
            name: 'Dividendensteuer',
            type: 'dividend_tax',
            description: 'Steuer auf Dividenden',
            rate: 0.25,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        interest_tax: {
            name: 'Zinsertragsteuer',
            type: 'interest_tax',
            description: 'Steuer auf Zinserträge',
            rate: 0.25,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        rental_tax: {
            name: 'Mietsteuer',
            type: 'rental_tax',
            description: 'Steuer auf Mieteinnahmen',
            rate: 0.20,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        business_tax: {
            name: 'Gewerbesteuer',
            type: 'business_tax',
            description: 'Steuer auf Gewerbeerträge',
            rate: 0.15,
            filing_deadline: '31.07', // 31. Juli
            payment_deadline: '31.05', // 31. Mai
            penalty_rate: 0.015, // 1.5% pro Monat
            interest_rate: 0.06, // 6% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        professional_tax: {
            name: 'Berufssteuer',
            type: 'professional_tax',
            description: 'Steuer auf freiberufliche Tätigkeiten',
            rate: 0.12,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 0,
            maximum_amount: 500000
        },
        entertainment_tax: {
            name: 'Vergnügungssteuer',
            type: 'entertainment_tax',
            description: 'Steuer auf Unterhaltungsangebote',
            rate: 0.10,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 100000
        },
        tobacco_tax: {
            name: 'Tabaksteuer',
            type: 'tobacco_tax',
            description: 'Steuer auf Tabakwaren',
            rate: 0.30,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 100000
        },
        alcohol_tax: {
            name: 'Alkoholsteuer',
            type: 'alcohol_tax',
            description: 'Steuer auf alkoholische Getränke',
            rate: 0.25,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 100000
        },
        fuel_tax: {
            name: 'Mineralölsteuer',
            type: 'fuel_tax',
            description: 'Steuer auf Kraftstoffe',
            rate: 0.20,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 100000
        },
        carbon_tax: {
            name: 'CO2-Steuer',
            type: 'carbon_tax',
            description: 'Steuer auf CO2-Emissionen',
            rate: 0.05,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        import_tax: {
            name: 'Einfuhrsteuer',
            type: 'import_tax',
            description: 'Steuer auf Importe',
            rate: 0.10,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        export_tax: {
            name: 'Ausfuhrsteuer',
            type: 'export_tax',
            description: 'Steuer auf Exporte',
            rate: 0.05,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        customs_duty: {
            name: 'Zollgebühr',
            type: 'customs_duty',
            description: 'Gebühr für Zollabfertigung',
            rate: 0.08,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        stamp_duty: {
            name: 'Stempelsteuer',
            type: 'stamp_duty',
            description: 'Steuer auf Dokumente und Verträge',
            rate: 0.02,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 100000
        },
        transfer_tax: {
            name: 'Grunderwerbsteuer',
            type: 'transfer_tax',
            description: 'Steuer auf Immobilientransfers',
            rate: 0.05,
            filing_deadline: '31.12', // 31. Dezember
            payment_deadline: '31.01', // 31. Januar
            penalty_rate: 0.01, // 1% pro Monat
            interest_rate: 0.05, // 5% pro Jahr
            minimum_amount: 0,
            maximum_amount: 1000000
        },
        registration_tax: {
            name: 'Anmeldegebühr',
            type: 'registration_tax',
            description: 'Gebühr für Anmeldungen',
            rate: 0.01,
            filing_deadline: '10.02', // 10. des Folgemonats
            payment_deadline: '10.02', // 10. des Folgemonats
            penalty_rate: 0.02, // 2% pro Monat
            interest_rate: 0.07, // 7% pro Jahr
            minimum_amount: 0,
            maximum_amount: 10000
        }
    },
    
    // Aktive Steuerbehörden
    activeTaxOffices: new Map(),
    
    // Steuererklärungen
    taxReturns: new Map(),
    
    // Steuerzahlungen
    taxPayments: new Map(),
    
    // Steuerprüfungen
    taxAudits: new Map(),
    
    // Steuer-System-Initialisierung
    init() {
        console.log('[TAX] Steuer-System initialisiert');
        this.initializeTaxOffices();
    },
    
    // Steuerbehörden initialisieren
    initializeTaxOffices() {
        Object.keys(this.taxOffices).forEach(officeId => {
            const office = this.taxOffices[officeId];
            office.id = officeId;
            office.returns = [];
            office.payments = [];
            office.audits = [];
            office.revenue = 0;
            
            this.activeTaxOffices.set(officeId, office);
        });
        
        console.log(`[TAX] ${Object.keys(this.taxOffices).length} Steuerbehörden initialisiert`);
    },
    
    // Steuer berechnen
    calculateTax(player, taxType, amount, additionalData = {}) {
        const config = this.taxConfig[taxType];
        if (!config) {
            player.outputChatBox('Steuer-Typ nicht gefunden!');
            return false;
        }
        
        let taxAmount = 0;
        
        if (config.brackets) {
            // Progressionsteuer mit Steuerklassen
            const brackets = this.taxBrackets[config.brackets];
            let remainingAmount = amount;
            
            for (const bracket of brackets) {
                if (remainingAmount <= 0) break;
                
                const taxableAmount = Math.min(remainingAmount, bracket.max - bracket.min);
                const bracketTax = taxableAmount * bracket.rate;
                taxAmount += bracketTax;
                remainingAmount -= taxableAmount;
            }
        } else {
            // Einheitliche Steuer
            taxAmount = amount * config.rate;
        }
        
        // Mindest- und Höchstbeträge prüfen
        taxAmount = Math.max(config.minimum_amount, taxAmount);
        taxAmount = Math.min(config.maximum_amount, taxAmount);
        
        return {
            taxType: taxType,
            config: config,
            amount: amount,
            taxAmount: taxAmount,
            rate: taxAmount / amount,
            additionalData: additionalData,
            calculated: Date.now()
        };
    },
    
    // Steuererklärung einreichen
    fileTaxReturn(player, taxType, amount, additionalData = {}) {
        const config = this.taxConfig[taxType];
        if (!config) {
            player.outputChatBox('Steuer-Typ nicht gefunden!');
            return false;
        }
        
        const calculation = this.calculateTax(player, taxType, amount, additionalData);
        if (!calculation) {
            return false;
        }
        
        const returnId = `return_${player.id}_${Date.now()}`;
        const taxReturn = {
            id: returnId,
            playerId: player.id,
            taxType: taxType,
            config: config,
            amount: amount,
            taxAmount: calculation.taxAmount,
            additionalData: additionalData,
            status: 'filed',
            filingDate: Date.now(),
            dueDate: this.calculateDueDate(config.filing_deadline),
            paymentDate: null,
            penalty: 0,
            interest: 0,
            totalAmount: calculation.taxAmount,
            created: Date.now()
        };
        
        this.taxReturns.set(returnId, taxReturn);
        
        player.outputChatBox(`Steuererklärung für ${config.name} eingereicht!`);
        player.outputChatBox(`Steuerbetrag: $${calculation.taxAmount.toFixed(2)}`);
        player.call('ui:show', 'TaxReturnFiled', { taxReturn: taxReturn });
        
        console.log(`[TAX] Steuererklärung ${taxType} von Spieler ${player.id} eingereicht`);
        return returnId;
    },
    
    // Fälligkeitsdatum berechnen
    calculateDueDate(deadline) {
        const currentYear = new Date().getFullYear();
        const [day, month] = deadline.split('.');
        const dueDate = new Date(currentYear, parseInt(month) - 1, parseInt(day));
        
        // Wenn das Datum bereits vergangen ist, nächstes Jahr
        if (dueDate < new Date()) {
            dueDate.setFullYear(currentYear + 1);
        }
        
        return dueDate.getTime();
    },
    
    // Steuer zahlen
    payTax(player, returnId, amount) {
        const taxReturn = this.taxReturns.get(returnId);
        if (!taxReturn) {
            player.outputChatBox('Steuererklärung nicht gefunden!');
            return false;
        }
        
        if (taxReturn.playerId !== player.id) {
            player.outputChatBox('Du besitzt diese Steuererklärung nicht!');
            return false;
        }
        
        if (taxReturn.status !== 'filed') {
            player.outputChatBox('Steuererklärung bereits bezahlt!');
            return false;
        }
        
        const totalAmount = taxReturn.totalAmount;
        if (amount < totalAmount) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${totalAmount}`);
            return false;
        }
        
        // Steuer bezahlen
        const paymentId = `payment_${player.id}_${Date.now()}`;
        const payment = {
            id: paymentId,
            playerId: player.id,
            returnId: returnId,
            amount: amount,
            paymentDate: Date.now(),
            method: 'cash',
            status: 'completed',
            created: Date.now()
        };
        
        this.taxPayments.set(paymentId, payment);
        
        taxReturn.status = 'paid';
        taxReturn.paymentDate = Date.now();
        
        player.money -= amount;
        
        // Steuerbehörde-Einnahmen erhöhen
        const office = this.activeTaxOffices.get('office_1'); // Standard-Büro
        if (office) {
            office.revenue += amount;
        }
        
        player.outputChatBox(`Steuer von $${amount} bezahlt!`);
        player.call('ui:show', 'TaxPaid', { payment: payment });
        
        console.log(`[TAX] Steuer von Spieler ${player.id} bezahlt`);
        return paymentId;
    },
    
    // Steuerprüfung starten
    startTaxAudit(player, returnId) {
        const taxReturn = this.taxReturns.get(returnId);
        if (!taxReturn) {
            player.outputChatBox('Steuererklärung nicht gefunden!');
            return false;
        }
        
        if (taxReturn.status !== 'filed') {
            player.outputChatBox('Steuererklärung bereits bearbeitet!');
            return false;
        }
        
        const auditId = `audit_${returnId}_${Date.now()}`;
        const audit = {
            id: auditId,
            returnId: returnId,
            playerId: taxReturn.playerId,
            auditorId: player.id,
            startDate: Date.now(),
            endDate: Date.now() + (30 * 24 * 60 * 60 * 1000), // 30 Tage
            status: 'active',
            findings: [],
            penalties: 0,
            interest: 0,
            totalAmount: 0,
            created: Date.now()
        };
        
        this.taxAudits.set(auditId, audit);
        taxReturn.status = 'audit';
        
        player.outputChatBox(`Steuerprüfung für ${taxReturn.config.name} gestartet!`);
        player.call('ui:show', 'TaxAuditStarted', { audit: audit });
        
        console.log(`[TAX] Steuerprüfung für ${returnId} gestartet`);
        return auditId;
    },
    
    // Steuerprüfung abschließen
    completeTaxAudit(player, auditId, findings, penalties, interest) {
        const audit = this.taxAudits.get(auditId);
        if (!audit) {
            player.outputChatBox('Steuerprüfung nicht gefunden!');
            return false;
        }
        
        if (audit.auditorId !== player.id) {
            player.outputChatBox('Du führst diese Steuerprüfung nicht durch!');
            return false;
        }
        
        if (audit.status !== 'active') {
            player.outputChatBox('Steuerprüfung bereits abgeschlossen!');
            return false;
        }
        
        audit.status = 'completed';
        audit.endDate = Date.now();
        audit.findings = findings;
        audit.penalties = penalties;
        audit.interest = interest;
        audit.totalAmount = penalties + interest;
        
        const taxReturn = this.taxReturns.get(audit.returnId);
        if (taxReturn) {
            taxReturn.penalty = penalties;
            taxReturn.interest = interest;
            taxReturn.totalAmount += penalties + interest;
            taxReturn.status = 'audit_completed';
        }
        
        player.outputChatBox(`Steuerprüfung abgeschlossen!`);
        player.outputChatBox(`Strafen: $${penalties}, Zinsen: $${interest}`);
        player.call('ui:show', 'TaxAuditCompleted', { audit: audit });
        
        console.log(`[TAX] Steuerprüfung ${auditId} abgeschlossen`);
        return true;
    },
    
    // Steuerbefreiung beantragen
    applyForTaxExemption(player, taxType, reason, documents) {
        const config = this.taxConfig[taxType];
        if (!config) {
            player.outputChatBox('Steuer-Typ nicht gefunden!');
            return false;
        }
        
        const exemptionId = `exemption_${player.id}_${Date.now()}`;
        const exemption = {
            id: exemptionId,
            playerId: player.id,
            taxType: taxType,
            config: config,
            reason: reason,
            documents: documents,
            status: 'pending',
            applicationDate: Date.now(),
            reviewDate: null,
            decision: null,
            created: Date.now()
        };
        
        player.outputChatBox(`Steuerbefreiung für ${config.name} beantragt!`);
        player.call('ui:show', 'TaxExemptionApplied', { exemption: exemption });
        
        console.log(`[TAX] Steuerbefreiung ${taxType} von Spieler ${player.id} beantragt`);
        return exemptionId;
    },
    
    // Steuer-System-Statistiken
    getStatistics() {
        return {
            totalOffices: this.activeTaxOffices.size,
            totalReturns: this.taxReturns.size,
            totalPayments: this.taxPayments.size,
            totalAudits: this.taxAudits.size,
            totalRevenue: Array.from(this.activeTaxOffices.values()).reduce((sum, office) => sum + office.revenue, 0)
        };
    }
};

// Events
mp.events.add('tax:fileReturn', (player, taxType, amount, additionalData) => {
    taxSystem.fileTaxReturn(player, taxType, amount, additionalData);
});

mp.events.add('tax:payTax', (player, returnId, amount) => {
    taxSystem.payTax(player, returnId, amount);
});

mp.events.add('tax:startAudit', (player, returnId) => {
    taxSystem.startTaxAudit(player, returnId);
});

mp.events.add('tax:completeAudit', (player, auditId, findings, penalties, interest) => {
    taxSystem.completeTaxAudit(player, auditId, findings, penalties, interest);
});

// Commands
mp.events.addCommand('tax', (player, fullText, action, taxType, amount) => {
    if (!action) {
        player.outputChatBox('Verwendung: /tax [file|pay|audit|exemption] [Typ] [Betrag]');
        player.outputChatBox('Verfügbare Typen: income_tax, corporate_tax, sales_tax, property_tax, vehicle_tax');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'file':
            if (taxType && amount) {
                taxSystem.fileTaxReturn(player, taxType, parseInt(amount));
            } else {
                player.outputChatBox('Steuer-Typ und Betrag erforderlich!');
            }
            break;
            
        case 'pay':
            if (taxType && amount) {
                taxSystem.payTax(player, taxType, parseInt(amount));
            } else {
                player.outputChatBox('Steuererklärungs-ID und Betrag erforderlich!');
            }
            break;
            
        case 'audit':
            if (taxType) {
                taxSystem.startTaxAudit(player, taxType);
            } else {
                player.outputChatBox('Steuererklärungs-ID erforderlich!');
            }
            break;
            
        case 'exemption':
            if (taxType) {
                taxSystem.applyForTaxExemption(player, taxType, 'Steuerbefreiung beantragt', []);
            } else {
                player.outputChatBox('Steuer-Typ erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('taxstats', (player) => {
    const stats = taxSystem.getStatistics();
    player.outputChatBox('=== Steuer-System-Statistiken ===');
    player.outputChatBox(`Gesamt Büros: ${stats.totalOffices}`);
    player.outputChatBox(`Gesamt Erklärungen: ${stats.totalReturns}`);
    player.outputChatBox(`Gesamt Zahlungen: ${stats.totalPayments}`);
    player.outputChatBox(`Gesamt Prüfungen: ${stats.totalAudits}`);
    player.outputChatBox(`Gesamt Einnahmen: $${stats.totalRevenue.toFixed(2)}`);
});

// Steuer-System initialisieren
taxSystem.init();

module.exports = taxSystem;
