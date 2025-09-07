// Pension System - Rentensystem mit Altersvorsorge und Rentenverwaltung
// Behandelt alle Renten-Funktionen für Horizont-City Roleplay

const pensionSystem = {
    // Renten-Typen
    pensionTypes: {
        STATE_PENSION: 'state_pension',
        PRIVATE_PENSION: 'private_pension',
        COMPANY_PENSION: 'company_pension',
        DISABILITY_PENSION: 'disability_pension',
        WIDOW_PENSION: 'widow_pension',
        ORPHAN_PENSION: 'orphan_pension',
        EARLY_PENSION: 'early_pension',
        PARTIAL_PENSION: 'partial_pension'
    },
    
    // Renten-Konfiguration
    pensionConfig: {
        state_pension: {
            name: 'Staatsrente',
            minAge: 65,
            minContributions: 35, // Jahre
            baseAmount: 1200,
            maxAmount: 2500,
            contributionRate: 0.15, // 15% des Gehalts
            inflationAdjustment: true,
            survivorBenefits: true
        },
        private_pension: {
            name: 'Private Rente',
            minAge: 60,
            minContributions: 5,
            baseAmount: 0,
            maxAmount: 10000,
            contributionRate: 0.05, // 5% des Gehalts
            inflationAdjustment: false,
            survivorBenefits: false
        },
        company_pension: {
            name: 'Betriebsrente',
            minAge: 62,
            minContributions: 10,
            baseAmount: 500,
            maxAmount: 3000,
            contributionRate: 0.08, // 8% des Gehalts
            inflationAdjustment: true,
            survivorBenefits: true
        },
        disability_pension: {
            name: 'Erwerbsunfähigkeitsrente',
            minAge: 0,
            minContributions: 5,
            baseAmount: 800,
            maxAmount: 2000,
            contributionRate: 0.0,
            inflationAdjustment: true,
            survivorBenefits: true
        },
        widow_pension: {
            name: 'Witwenrente',
            minAge: 0,
            minContributions: 0,
            baseAmount: 600,
            maxAmount: 1500,
            contributionRate: 0.0,
            inflationAdjustment: true,
            survivorBenefits: false
        },
        orphan_pension: {
            name: 'Waisenrente',
            minAge: 0,
            maxAge: 18,
            minContributions: 0,
            baseAmount: 300,
            maxAmount: 800,
            contributionRate: 0.0,
            inflationAdjustment: true,
            survivorBenefits: false
        }
    },
    
    // Renten-Konten
    pensionAccounts: new Map(),
    
    // Renten-Zahlungen
    pensionPayments: new Map(),
    
    // Renten-Anträge
    pensionApplications: new Map(),
    
    // Renten-Statistiken
    pensionStats: {
        totalPensioners: 0,
        totalPensionAmount: 0,
        averagePension: 0,
        newApplications: 0,
        approvedApplications: 0,
        rejectedApplications: 0
    },
    
    // Renten-System-Initialisierung
    init() {
        console.log('[PENSION] Rentensystem initialisiert');
        this.initializePensionOffice();
    },
    
    // Renten-Amt initialisieren
    initializePensionOffice() {
        // Hier würden bestehende Renten-Konten aus der Datenbank geladen
        console.log('[PENSION] Renten-Amt initialisiert');
    },
    
    // Renten-Konto erstellen
    createPensionAccount(player, pensionType) {
        if (player.pensionAccount) {
            player.outputChatBox('Du hast bereits ein Renten-Konto!');
            return false;
        }
        
        const config = this.pensionConfig[pensionType];
        if (!config) {
            player.outputChatBox('Renten-Typ nicht gefunden!');
            return false;
        }
        
        const accountId = `pension_${player.id}_${Date.now()}`;
        const account = {
            id: accountId,
            playerId: player.id,
            playerName: player.name,
            pensionType: pensionType,
            config: config,
            contributions: 0,
            totalContributions: 0,
            monthlyPension: 0,
            status: 'active',
            startDate: Date.now(),
            lastContribution: Date.now(),
            created: Date.now()
        };
        
        this.pensionAccounts.set(accountId, account);
        
        player.pensionAccount = accountId;
        player.pensionType = pensionType;
        
        player.outputChatBox(`Renten-Konto (${config.name}) erstellt!`);
        player.call('ui:show', 'PensionAccountCreated', { account: account });
        
        console.log(`[PENSION] Renten-Konto für Spieler ${player.id} erstellt`);
        return accountId;
    },
    
    // Renten-Beitrag zahlen
    payContribution(player, amount) {
        const account = this.getPensionAccount(player);
        if (!account) {
            player.outputChatBox('Du hast kein Renten-Konto!');
            return false;
        }
        
        if (player.money < amount) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${amount}`);
            return false;
        }
        
        const contributionId = `contribution_${player.id}_${Date.now()}`;
        const contribution = {
            id: contributionId,
            playerId: player.id,
            accountId: account.id,
            amount: amount,
            date: Date.now(),
            type: 'voluntary',
            created: Date.now()
        };
        
        account.contributions += amount;
        account.totalContributions += amount;
        account.lastContribution = Date.now();
        
        // Monatliche Rente berechnen
        account.monthlyPension = this.calculateMonthlyPension(account);
        
        player.money -= amount;
        
        player.outputChatBox(`Renten-Beitrag von $${amount} gezahlt!`);
        player.outputChatBox(`Aktuelle monatliche Rente: $${account.monthlyPension}`);
        player.call('ui:show', 'ContributionPaid', { contribution: contribution, account: account });
        
        console.log(`[PENSION] Beitrag von $${amount} für Spieler ${player.id} gezahlt`);
        return contributionId;
    },
    
    // Monatliche Rente berechnen
    calculateMonthlyPension(account) {
        const config = account.config;
        const yearsContributed = (Date.now() - account.startDate) / (365 * 24 * 60 * 60 * 1000);
        
        let basePension = config.baseAmount;
        
        // Beitrags-basierte Berechnung
        if (config.contributionRate > 0) {
            const contributionFactor = Math.min(yearsContributed / config.minContributions, 1);
            basePension += (account.totalContributions * 0.1 * contributionFactor);
        }
        
        // Alters-Faktor
        const ageFactor = Math.min((player.age - config.minAge) / 10, 1);
        basePension *= (1 + ageFactor * 0.2);
        
        // Inflation-Anpassung
        if (config.inflationAdjustment) {
            basePension *= 1.02; // 2% Inflation
        }
        
        return Math.min(Math.max(basePension, config.baseAmount), config.maxAmount);
    },
    
    // Renten-Antrag stellen
    applyForPension(player, pensionType, reason) {
        const account = this.getPensionAccount(player);
        if (!account) {
            player.outputChatBox('Du musst ein Renten-Konto haben!');
            return false;
        }
        
        const config = this.pensionConfig[pensionType];
        if (!config) {
            player.outputChatBox('Renten-Typ nicht gefunden!');
            return false;
        }
        
        // Alters-Anforderung prüfen
        if (player.age < config.minAge) {
            player.outputChatBox(`Mindestalter für ${config.name}: ${config.minAge} Jahre`);
            return false;
        }
        
        // Beitrags-Anforderung prüfen
        const yearsContributed = (Date.now() - account.startDate) / (365 * 24 * 60 * 60 * 1000);
        if (yearsContributed < config.minContributions) {
            player.outputChatBox(`Mindestbeitragszeit für ${config.name}: ${config.minContributions} Jahre`);
            return false;
        }
        
        const applicationId = `application_${player.id}_${Date.now()}`;
        const application = {
            id: applicationId,
            playerId: player.id,
            playerName: player.name,
            pensionType: pensionType,
            reason: reason,
            applicationDate: Date.now(),
            status: 'pending',
            monthlyAmount: this.calculateMonthlyPension(account),
            created: Date.now()
        };
        
        this.pensionApplications.set(applicationId, application);
        
        player.outputChatBox(`Renten-Antrag für ${config.name} eingereicht!`);
        player.outputChatBox(`Beantragte monatliche Rente: $${application.monthlyAmount}`);
        player.call('ui:show', 'PensionApplicationSubmitted', { application: application });
        
        this.pensionStats.newApplications++;
        
        console.log(`[PENSION] Renten-Antrag von Spieler ${player.id} eingereicht`);
        return applicationId;
    },
    
    // Renten-Antrag genehmigen
    approvePensionApplication(applicationId, approverId) {
        const application = this.pensionApplications.get(applicationId);
        if (!application) {
            return false;
        }
        
        application.status = 'approved';
        application.approvedBy = approverId;
        application.approvalDate = Date.now();
        
        // Renten-Zahlung aktivieren
        this.activatePension(application);
        
        this.pensionStats.approvedApplications++;
        this.pensionStats.totalPensioners++;
        this.pensionStats.totalPensionAmount += application.monthlyAmount;
        
        console.log(`[PENSION] Renten-Antrag ${applicationId} genehmigt`);
        return true;
    },
    
    // Rente aktivieren
    activatePension(application) {
        const account = this.getPensionAccountById(application.playerId);
        if (account) {
            account.status = 'pensioner';
            account.monthlyPension = application.monthlyAmount;
            account.pensionStartDate = Date.now();
        }
        
        // Renten-Zahlung erstellen
        const paymentId = `payment_${application.playerId}_${Date.now()}`;
        const payment = {
            id: paymentId,
            playerId: application.playerId,
            applicationId: application.id,
            monthlyAmount: application.monthlyAmount,
            startDate: Date.now(),
            status: 'active',
            created: Date.now()
        };
        
        this.pensionPayments.set(paymentId, payment);
    },
    
    // Renten-Zahlung ausführen
    processPensionPayments() {
        const activePayments = Array.from(this.pensionPayments.values()).filter(payment => 
            payment.status === 'active'
        );
        
        activePayments.forEach(payment => {
            const player = mp.players.at(payment.playerId);
            if (player) {
                player.money += payment.monthlyAmount;
                player.outputChatBox(`Renten-Zahlung erhalten: $${payment.monthlyAmount}`);
                player.call('ui:show', 'PensionPaymentReceived', { payment: payment });
            }
        });
        
        // console.log(`[PENSION] ${activePayments.length} Renten-Zahlungen verarbeitet`);
    },
    
    // Renten-Konto abrufen
    getPensionAccount(player) {
        const accounts = Array.from(this.pensionAccounts.values()).filter(account => 
            account.playerId === player.id && account.status === 'active'
        );
        
        return accounts.length > 0 ? accounts[0] : null;
    },
    
    // Renten-Konto nach ID abrufen
    getPensionAccountById(playerId) {
        const accounts = Array.from(this.pensionAccounts.values()).filter(account => 
            account.playerId === playerId && account.status === 'active'
        );
        
        return accounts.length > 0 ? accounts[0] : null;
    },
    
    // Renten-Statistiken
    getStatistics() {
        const totalPensioners = Array.from(this.pensionAccounts.values()).filter(account => 
            account.status === 'pensioner'
        ).length;
        
        const totalPensionAmount = Array.from(this.pensionPayments.values()).filter(payment => 
            payment.status === 'active'
        ).reduce((sum, payment) => sum + payment.monthlyAmount, 0);
        
        return {
            ...this.pensionStats,
            totalPensioners: totalPensioners,
            totalPensionAmount: totalPensionAmount,
            averagePension: totalPensioners > 0 ? totalPensionAmount / totalPensioners : 0,
            activeAccounts: this.pensionAccounts.size,
            activePayments: this.pensionPayments.size,
            pendingApplications: Array.from(this.pensionApplications.values()).filter(app => 
                app.status === 'pending'
            ).length
        };
    }
};

// Events
mp.events.add('pension:createAccount', (player, pensionType) => {
    pensionSystem.createPensionAccount(player, pensionType);
});

mp.events.add('pension:payContribution', (player, amount) => {
    pensionSystem.payContribution(player, amount);
});

mp.events.add('pension:apply', (player, pensionType, reason) => {
    pensionSystem.applyForPension(player, pensionType, reason);
});

// Commands
mp.events.addCommand('pension', (player, fullText, action, pensionType, amount) => {
    if (!action) {
        player.outputChatBox('Verwendung: /pension [create|contribute|apply|status] [Typ] [Betrag]');
        player.outputChatBox('Verfügbare Typen: state_pension, private_pension, company_pension, disability_pension');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (pensionType) {
                pensionSystem.createPensionAccount(player, pensionType);
            } else {
                player.outputChatBox('Renten-Typ erforderlich!');
            }
            break;
            
        case 'contribute':
            if (amount) {
                pensionSystem.payContribution(player, parseInt(amount));
            } else {
                player.outputChatBox('Betrag erforderlich!');
            }
            break;
            
        case 'apply':
            if (pensionType) {
                pensionSystem.applyForPension(player, pensionType, 'Altersrente');
            } else {
                player.outputChatBox('Renten-Typ erforderlich!');
            }
            break;
            
        case 'status':
            const account = pensionSystem.getPensionAccount(player);
            if (account) {
                player.outputChatBox('=== Renten-Konto ===');
                player.outputChatBox(`Typ: ${account.config.name}`);
                player.outputChatBox(`Beiträge: $${account.totalContributions}`);
                player.outputChatBox(`Monatliche Rente: $${account.monthlyPension}`);
                player.outputChatBox(`Status: ${account.status}`);
            } else {
                player.outputChatBox('Kein Renten-Konto gefunden!');
            }
            break;
    }
});

// Monatliche Renten-Zahlungen (alle 30 Tage) - DEAKTIVIERT
// setInterval(() => {
//     pensionSystem.processPensionPayments();
// }, 30 * 24 * 60 * 60 * 1000);

// Renten-System initialisieren
pensionSystem.init();

module.exports = pensionSystem;
