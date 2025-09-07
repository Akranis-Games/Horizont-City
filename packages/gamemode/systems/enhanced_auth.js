// Enhanced Auth System - Erweiterte Authentifizierung basierend auf Tutorial
// Behandelt alle erweiterten Auth-Funktionen für Horizont-City Roleplay

const enhancedAuthSystem = {
    // Benutzer-Rollen
    userRoles: {
        PLAYER: { name: 'Spieler', level: 0, permissions: ['basic'] },
        VIP: { name: 'VIP', level: 1, permissions: ['basic', 'vip'] },
        MODERATOR: { name: 'Moderator', level: 2, permissions: ['basic', 'vip', 'moderate'] },
        ADMIN: { name: 'Administrator', level: 3, permissions: ['basic', 'vip', 'moderate', 'admin'] },
        OWNER: { name: 'Besitzer', level: 4, permissions: ['basic', 'vip', 'moderate', 'admin', 'owner'] }
    },
    
    // Authentifizierungs-Status
    authStatus: {
        GUEST: 'guest',
        LOGGED_IN: 'logged_in',
        VERIFIED: 'verified',
        BANNED: 'banned',
        SUSPENDED: 'suspended'
    },
    
    // Sicherheits-Einstellungen
    securitySettings: {
        maxLoginAttempts: 5,
        lockoutDuration: 300000, // 5 Minuten
        sessionTimeout: 3600000, // 1 Stunde
        passwordMinLength: 8,
        requireEmailVerification: true,
        twoFactorEnabled: false
    },
    
    // Aktive Sitzungen
    activeSessions: new Map(),
    
    // Login-Versuche
    loginAttempts: new Map(),
    
    // Auth-Statistiken
    authStats: {
        totalLogins: 0,
        totalRegistrations: 0,
        failedLogins: 0,
        activeSessions: 0,
        bannedUsers: 0,
        suspendedUsers: 0
    },
    
    // Enhanced Auth System-Initialisierung
    init() {
        console.log('[ENHANCED_AUTH] Erweiterte Authentifizierung initialisiert');
    },
    
    // Benutzer registrieren (erweitert basierend auf Tutorial)
    registerUser(player, username, email, password, confirmPassword) {
        // Validierung
        if (!this.validateRegistration(username, email, password, confirmPassword)) {
            return { success: false, message: 'Ungültige Registrierungsdaten!' };
        }
        
        // Benutzername bereits vorhanden
        if (this.isUsernameTaken(username)) {
            return { success: false, message: 'Benutzername bereits vergeben!' };
        }
        
        // E-Mail bereits vorhanden
        if (this.isEmailTaken(email)) {
            return { success: false, message: 'E-Mail-Adresse bereits registriert!' };
        }
        
        // Passwort-Hashing
        const hashedPassword = this.hashPassword(password);
        
        // Benutzer erstellen
        const user = {
            id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            socialClub: player.socialClub,
            username: username,
            email: email,
            password: hashedPassword,
            role: 'PLAYER',
            status: 'guest',
            createdAt: new Date(),
            lastLogin: null,
            loginCount: 0,
            isVerified: false,
            verificationToken: this.generateVerificationToken(),
            twoFactorSecret: null,
            preferences: {
                language: 'de',
                notifications: true,
                privacy: 'public'
            },
            statistics: {
                playTime: 0,
                level: 1,
                experience: 0,
                money: 1000
            }
        };
        
        // Benutzer speichern (hier würde normalerweise die Datenbank verwendet)
        this.saveUser(user);
        
        // Statistiken aktualisieren
        this.authStats.totalRegistrations++;
        
        player.outputChatBox('Registrierung erfolgreich! Bitte verifiziere deine E-Mail-Adresse.');
        player.call('ui:show', 'RegistrationSuccess', { user: user });
        
        console.log(`[ENHANCED_AUTH] Benutzer ${username} registriert`);
        return { success: true, message: 'Registrierung erfolgreich!', user: user };
    },
    
    // Benutzer anmelden (erweitert basierend auf Tutorial)
    loginUser(player, username, password, rememberMe = false) {
        // Login-Versuche prüfen
        if (this.isAccountLocked(player.socialClub)) {
            return { success: false, message: 'Konto temporär gesperrt! Versuche es später erneut.' };
        }
        
        // Benutzer finden
        const user = this.findUserByUsername(username);
        if (!user) {
            this.recordFailedLogin(player.socialClub);
            return { success: false, message: 'Benutzername oder Passwort falsch!' };
        }
        
        // Passwort prüfen
        if (!this.verifyPassword(password, user.password)) {
            this.recordFailedLogin(player.socialClub);
            return { success: false, message: 'Benutzername oder Passwort falsch!' };
        }
        
        // Konto-Status prüfen
        if (user.status === 'banned') {
            return { success: false, message: 'Dein Konto wurde gesperrt!' };
        }
        
        if (user.status === 'suspended') {
            return { success: false, message: 'Dein Konto wurde temporär gesperrt!' };
        }
        
        // Zwei-Faktor-Authentifizierung prüfen
        if (user.twoFactorSecret && !this.verifyTwoFactor(player, user.twoFactorSecret)) {
            return { success: false, message: 'Zwei-Faktor-Authentifizierung erforderlich!' };
        }
        
        // Sitzung erstellen
        const session = this.createSession(player, user, rememberMe);
        
        // Benutzer aktualisieren
        user.lastLogin = new Date();
        user.loginCount++;
        user.status = 'logged_in';
        this.saveUser(user);
        
        // Statistiken aktualisieren
        this.authStats.totalLogins++;
        this.authStats.activeSessions++;
        
        player.outputChatBox(`Willkommen zurück, ${user.username}!`);
        player.call('ui:show', 'LoginSuccess', { user: user, session: session });
        
        console.log(`[ENHANCED_AUTH] Benutzer ${username} angemeldet`);
        return { success: true, message: 'Anmeldung erfolgreich!', user: user, session: session };
    },
    
    // Benutzer abmelden
    logoutUser(player) {
        const session = this.activeSessions.get(player.socialClub);
        if (session) {
            // Sitzung beenden
            session.endTime = new Date();
            session.isActive = false;
            
            // Benutzer aktualisieren
            const user = this.findUserBySocialClub(player.socialClub);
            if (user) {
                user.status = 'guest';
                this.saveUser(user);
            }
            
            // Statistiken aktualisieren
            this.authStats.activeSessions--;
            
            player.outputChatBox('Erfolgreich abgemeldet!');
            player.call('ui:show', 'LogoutSuccess', {});
            
            console.log(`[ENHANCED_AUTH] Benutzer ${player.socialClub} abgemeldet`);
        }
    },
    
    // Sitzung erstellen
    createSession(player, user, rememberMe = false) {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const session = {
            id: sessionId,
            userId: user.id,
            socialClub: player.socialClub,
            ipAddress: player.ipAddress || 'unknown',
            userAgent: player.userAgent || 'unknown',
            startTime: new Date(),
            endTime: null,
            isActive: true,
            rememberMe: rememberMe,
            lastActivity: new Date()
        };
        
        this.activeSessions.set(player.socialClub, session);
        
        // Spieler-Daten setzen
        player.data = {
            userId: user.id,
            username: user.username,
            role: user.role,
            permissions: this.userRoles[user.role].permissions,
            sessionId: sessionId
        };
        
        return session;
    },
    
    // Registrierung validieren
    validateRegistration(username, email, password, confirmPassword) {
        // Benutzername validieren
        if (!username || username.length < 3 || username.length > 20) {
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return false;
        }
        
        // E-Mail validieren
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return false;
        }
        
        // Passwort validieren
        if (!password || password.length < this.securitySettings.passwordMinLength) {
            return false;
        }
        
        if (password !== confirmPassword) {
            return false;
        }
        
        return true;
    },
    
    // Passwort hashen
    hashPassword(password) {
        // Hier würde normalerweise bcrypt verwendet werden
        // Für Demo-Zwecke wird ein einfacher Hash verwendet
        return Buffer.from(password).toString('base64');
    },
    
    // Passwort verifizieren
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    },
    
    // Verifikations-Token generieren
    generateVerificationToken() {
        return Math.random().toString(36).substr(2, 15) + Date.now().toString(36);
    },
    
    // Zwei-Faktor-Authentifizierung verifizieren
    verifyTwoFactor(player, secret) {
        // Hier würde normalerweise TOTP implementiert werden
        // Für Demo-Zwecke wird true zurückgegeben
        return true;
    },
    
    // Fehlgeschlagene Login-Versuche aufzeichnen
    recordFailedLogin(socialClub) {
        const attempts = this.loginAttempts.get(socialClub) || { count: 0, lastAttempt: 0 };
        attempts.count++;
        attempts.lastAttempt = Date.now();
        
        this.loginAttempts.set(socialClub, attempts);
        this.authStats.failedLogins++;
        
        // Konto sperren bei zu vielen Versuchen
        if (attempts.count >= this.securitySettings.maxLoginAttempts) {
            this.lockAccount(socialClub);
        }
    },
    
    // Konto sperren
    lockAccount(socialClub) {
        const lockout = {
            socialClub: socialClub,
            lockedUntil: Date.now() + this.securitySettings.lockoutDuration,
            reason: 'Too many failed login attempts'
        };
        
        this.loginAttempts.set(socialClub, lockout);
        console.log(`[ENHANCED_AUTH] Konto ${socialClub} gesperrt`);
    },
    
    // Konto-Status prüfen
    isAccountLocked(socialClub) {
        const attempts = this.loginAttempts.get(socialClub);
        if (!attempts) return false;
        
        if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
            return true;
        }
        
        // Sperre aufheben
        this.loginAttempts.delete(socialClub);
        return false;
    },
    
    // Benutzername prüfen
    isUsernameTaken(username) {
        // Hier würde normalerweise die Datenbank abgefragt werden
        return false;
    },
    
    // E-Mail prüfen
    isEmailTaken(email) {
        // Hier würde normalerweise die Datenbank abgefragt werden
        return false;
    },
    
    // Benutzer finden
    findUserByUsername(username) {
        // Hier würde normalerweise die Datenbank abgefragt werden
        return null;
    },
    
    findUserBySocialClub(socialClub) {
        // Hier würde normalerweise die Datenbank abgefragt werden
        return null;
    },
    
    // Benutzer speichern
    saveUser(user) {
        // Hier würde normalerweise die Datenbank verwendet werden
        console.log(`[ENHANCED_AUTH] Benutzer ${user.username} gespeichert`);
    },
    
    // Berechtigung prüfen
    hasPermission(player, permission) {
        const user = this.findUserBySocialClub(player.socialClub);
        if (!user) return false;
        
        const role = this.userRoles[user.role];
        return role && role.permissions.includes(permission);
    },
    
    // Rolle prüfen
    hasRole(player, role) {
        const user = this.findUserBySocialClub(player.socialClub);
        if (!user) return false;
        
        return user.role === role;
    },
    
    // Sitzung validieren
    validateSession(player) {
        const session = this.activeSessions.get(player.socialClub);
        if (!session || !session.isActive) {
            return false;
        }
        
        // Session-Timeout prüfen
        if (Date.now() - session.lastActivity.getTime() > this.securitySettings.sessionTimeout) {
            this.logoutUser(player);
            return false;
        }
        
        // Letzte Aktivität aktualisieren
        session.lastActivity = new Date();
        return true;
    },
    
    // Auth-Statistiken
    getStatistics() {
        return {
            ...this.authStats,
            activeSessions: this.activeSessions.size,
            lockedAccounts: this.loginAttempts.size,
            totalRoles: Object.keys(this.userRoles).length
        };
    }
};

// Events
mp.events.add('enhanced_auth:register', (player, username, email, password, confirmPassword) => {
    const result = enhancedAuthSystem.registerUser(player, username, email, password, confirmPassword);
    player.call('ui:show', 'AuthResponse', result);
});

mp.events.add('enhanced_auth:login', (player, username, password, rememberMe) => {
    const result = enhancedAuthSystem.loginUser(player, username, password, rememberMe);
    player.call('ui:show', 'AuthResponse', result);
});

mp.events.add('enhanced_auth:logout', (player) => {
    enhancedAuthSystem.logoutUser(player);
});

mp.events.add('enhanced_auth:validateSession', (player) => {
    const isValid = enhancedAuthSystem.validateSession(player);
    if (!isValid) {
        player.kick('Ungültige Sitzung!');
    }
});

// Commands
mp.events.addCommand('login', (player, fullText, username, password) => {
    if (!username || !password) {
        player.outputChatBox('Verwendung: /login [Benutzername] [Passwort]');
        return;
    }
    
    const result = enhancedAuthSystem.loginUser(player, username, password);
    player.call('ui:show', 'AuthResponse', result);
});

mp.events.addCommand('logout', (player) => {
    enhancedAuthSystem.logoutUser(player);
});

mp.events.addCommand('register', (player, fullText, username, email, password, confirmPassword) => {
    if (!username || !email || !password || !confirmPassword) {
        player.outputChatBox('Verwendung: /register [Benutzername] [E-Mail] [Passwort] [Passwort bestätigen]');
        return;
    }
    
    const result = enhancedAuthSystem.registerUser(player, username, email, password, confirmPassword);
    player.call('ui:show', 'AuthResponse', result);
});

// Player Join Event
mp.events.add('playerJoin', (player) => {
    // Sitzung validieren
    if (!enhancedAuthSystem.validateSession(player)) {
        player.call('ui:show', 'LoginRequired', {});
    }
});

// Enhanced Auth System initialisieren
enhancedAuthSystem.init();

module.exports = enhancedAuthSystem;
