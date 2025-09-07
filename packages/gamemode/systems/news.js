// News System - Nachrichten-System mit Medien und Journalismus
// Behandelt alle Nachrichten-Funktionen für Horizont-City Roleplay

const newsSystem = {
    // Medien-Typen
    mediaTypes: {
        NEWSPAPER: 'newspaper',
        TELEVISION: 'television',
        RADIO: 'radio',
        ONLINE: 'online',
        MAGAZINE: 'magazine',
        BLOG: 'blog',
        PODCAST: 'podcast',
        SOCIAL_MEDIA: 'social_media',
        NEWS_AGENCY: 'news_agency',
        PRESS_RELEASE: 'press_release'
    },
    
    // Nachrichten-Kategorien
    newsCategories: {
        POLITICS: 'politics',
        ECONOMY: 'economy',
        CRIME: 'crime',
        SPORTS: 'sports',
        ENTERTAINMENT: 'entertainment',
        TECHNOLOGY: 'technology',
        HEALTH: 'health',
        EDUCATION: 'education',
        ENVIRONMENT: 'environment',
        WEATHER: 'weather',
        TRAFFIC: 'traffic',
        BUSINESS: 'business',
        CULTURE: 'culture',
        LIFESTYLE: 'lifestyle',
        INTERNATIONAL: 'international',
        LOCAL: 'local',
        BREAKING: 'breaking',
        INVESTIGATIVE: 'investigative',
        OPINION: 'opinion',
        FEATURE: 'feature'
    },
    
    // Nachrichten-Konfiguration
    newsConfig: {
        politics: {
            name: 'Politik',
            category: 'politics',
            priority: 'high',
            audience: 'adults',
            duration: 300, // 5 Minuten
            credibility: 0.8,
            description: 'Politische Nachrichten und Entscheidungen'
        },
        economy: {
            name: 'Wirtschaft',
            category: 'economy',
            priority: 'high',
            audience: 'adults',
            duration: 240, // 4 Minuten
            credibility: 0.85,
            description: 'Wirtschaftsnachrichten und Finanzmärkte'
        },
        crime: {
            name: 'Kriminalität',
            category: 'crime',
            priority: 'very_high',
            audience: 'all',
            duration: 180, // 3 Minuten
            credibility: 0.9,
            description: 'Verbrechen und Polizeiberichte'
        },
        sports: {
            name: 'Sport',
            category: 'sports',
            priority: 'medium',
            audience: 'all',
            duration: 120, // 2 Minuten
            credibility: 0.95,
            description: 'Sportnachrichten und Ergebnisse'
        },
        entertainment: {
            name: 'Unterhaltung',
            category: 'entertainment',
            priority: 'low',
            audience: 'all',
            duration: 90, // 1.5 Minuten
            credibility: 0.7,
            description: 'Unterhaltungsnachrichten und Prominente'
        },
        technology: {
            name: 'Technologie',
            category: 'technology',
            priority: 'medium',
            audience: 'adults',
            duration: 150, // 2.5 Minuten
            credibility: 0.8,
            description: 'Technologie und Innovation'
        },
        health: {
            name: 'Gesundheit',
            category: 'health',
            priority: 'high',
            audience: 'all',
            duration: 200, // 3.3 Minuten
            credibility: 0.9,
            description: 'Gesundheitsnachrichten und Medizin'
        },
        education: {
            name: 'Bildung',
            category: 'education',
            priority: 'medium',
            audience: 'adults',
            duration: 120, // 2 Minuten
            credibility: 0.85,
            description: 'Bildungsnachrichten und Schulen'
        },
        environment: {
            name: 'Umwelt',
            category: 'environment',
            priority: 'high',
            audience: 'all',
            duration: 180, // 3 Minuten
            credibility: 0.8,
            description: 'Umweltnachrichten und Klima'
        },
        weather: {
            name: 'Wetter',
            category: 'weather',
            priority: 'medium',
            audience: 'all',
            duration: 60, // 1 Minute
            credibility: 0.95,
            description: 'Wettervorhersage und Warnungen'
        },
        traffic: {
            name: 'Verkehr',
            category: 'traffic',
            priority: 'high',
            audience: 'all',
            duration: 90, // 1.5 Minuten
            credibility: 0.9,
            description: 'Verkehrsnachrichten und Staus'
        },
        business: {
            name: 'Wirtschaft',
            category: 'business',
            priority: 'high',
            audience: 'adults',
            duration: 180, // 3 Minuten
            credibility: 0.85,
            description: 'Geschäftsnachrichten und Unternehmen'
        },
        culture: {
            name: 'Kultur',
            category: 'culture',
            priority: 'low',
            audience: 'adults',
            duration: 120, // 2 Minuten
            credibility: 0.75,
            description: 'Kulturnachrichten und Events'
        },
        lifestyle: {
            name: 'Lifestyle',
            category: 'lifestyle',
            priority: 'low',
            audience: 'adults',
            duration: 90, // 1.5 Minuten
            credibility: 0.7,
            description: 'Lifestyle-Nachrichten und Trends'
        },
        international: {
            name: 'International',
            category: 'international',
            priority: 'high',
            audience: 'adults',
            duration: 240, // 4 Minuten
            credibility: 0.8,
            description: 'Internationale Nachrichten'
        },
        local: {
            name: 'Lokal',
            category: 'local',
            priority: 'medium',
            audience: 'all',
            duration: 120, // 2 Minuten
            credibility: 0.9,
            description: 'Lokale Nachrichten und Events'
        },
        breaking: {
            name: 'Eilmeldung',
            category: 'breaking',
            priority: 'very_high',
            audience: 'all',
            duration: 60, // 1 Minute
            credibility: 0.95,
            description: 'Wichtige Eilmeldungen'
        },
        investigative: {
            name: 'Investigativ',
            category: 'investigative',
            priority: 'high',
            audience: 'adults',
            duration: 600, // 10 Minuten
            credibility: 0.9,
            description: 'Investigative Berichterstattung'
        },
        opinion: {
            name: 'Meinung',
            category: 'opinion',
            priority: 'low',
            audience: 'adults',
            duration: 180, // 3 Minuten
            credibility: 0.6,
            description: 'Meinungsbeiträge und Kommentare'
        },
        feature: {
            name: 'Feature',
            category: 'feature',
            priority: 'low',
            audience: 'adults',
            duration: 300, // 5 Minuten
            credibility: 0.8,
            description: 'Detaillierte Feature-Berichte'
        }
    },
    
    // Medien-Unternehmen
    mediaCompanies: {
        'company_1': {
            name: 'Horizont News',
            type: 'news_agency',
            location: { x: 1000, y: 2000, z: 30 },
            employees: 50,
            budget: 1000000,
            reputation: 0.9,
            bias: 'neutral',
            coverage: ['politics', 'economy', 'crime', 'local'],
            status: 'active',
            created: Date.now()
        },
        'company_2': {
            name: 'City TV',
            type: 'television',
            location: { x: 1500, y: 2500, z: 30 },
            employees: 80,
            budget: 2000000,
            reputation: 0.85,
            bias: 'liberal',
            coverage: ['politics', 'entertainment', 'sports', 'lifestyle'],
            status: 'active',
            created: Date.now()
        },
        'company_3': {
            name: 'Radio Horizont',
            type: 'radio',
            location: { x: 2000, y: 3000, z: 30 },
            employees: 30,
            budget: 500000,
            reputation: 0.8,
            bias: 'conservative',
            coverage: ['politics', 'business', 'culture', 'local'],
            status: 'active',
            created: Date.now()
        },
        'company_4': {
            name: 'Digital Times',
            type: 'online',
            location: { x: 2500, y: 3500, z: 30 },
            employees: 40,
            budget: 800000,
            reputation: 0.75,
            bias: 'progressive',
            coverage: ['technology', 'environment', 'health', 'international'],
            status: 'active',
            created: Date.now()
        },
        'company_5': {
            name: 'Sports Weekly',
            type: 'magazine',
            location: { x: 3000, y: 4000, z: 30 },
            employees: 20,
            budget: 300000,
            reputation: 0.9,
            bias: 'neutral',
            coverage: ['sports', 'lifestyle', 'health'],
            status: 'active',
            created: Date.now()
        }
    },
    
    // Journalisten
    journalists: {
        'journalist_1': {
            name: 'Max Mustermann',
            company: 'company_1',
            specialization: 'politics',
            experience: 10,
            reputation: 0.9,
            salary: 5000,
            status: 'active',
            stories: [],
            awards: ['Pulitzer Prize', 'Journalist of the Year'],
            created: Date.now()
        },
        'journalist_2': {
            name: 'Anna Schmidt',
            company: 'company_2',
            specialization: 'crime',
            experience: 8,
            reputation: 0.85,
            salary: 4500,
            status: 'active',
            stories: [],
            awards: ['Crime Reporter Award'],
            created: Date.now()
        },
        'journalist_3': {
            name: 'Klaus Weber',
            company: 'company_3',
            specialization: 'economy',
            experience: 12,
            reputation: 0.9,
            salary: 5500,
            status: 'active',
            stories: [],
            awards: ['Economic Journalist Award'],
            created: Date.now()
        },
        'journalist_4': {
            name: 'Lisa Müller',
            company: 'company_4',
            specialization: 'technology',
            experience: 6,
            reputation: 0.8,
            salary: 4000,
            status: 'active',
            stories: [],
            awards: [],
            created: Date.now()
        },
        'journalist_5': {
            name: 'Tom Johnson',
            company: 'company_5',
            specialization: 'sports',
            experience: 5,
            reputation: 0.85,
            salary: 3500,
            status: 'active',
            stories: [],
            awards: ['Sports Journalist Award'],
            created: Date.now()
        }
    },
    
    // Aktive Medien-Unternehmen
    activeMediaCompanies: new Map(),
    
    // Aktive Journalisten
    activeJournalists: new Map(),
    
    // Nachrichten
    newsStories: new Map(),
    
    // Nachrichten-System-Initialisierung
    init() {
        console.log('[NEWS] Nachrichten-System initialisiert');
        this.initializeMediaCompanies();
        this.initializeJournalists();
        this.startNewsCycle();
    },
    
    // Medien-Unternehmen initialisieren
    initializeMediaCompanies() {
        Object.keys(this.mediaCompanies).forEach(companyId => {
            const company = this.mediaCompanies[companyId];
            company.id = companyId;
            company.stories = [];
            company.revenue = 0;
            company.viewers = 0;
            
            this.activeMediaCompanies.set(companyId, company);
        });
        
        console.log(`[NEWS] ${Object.keys(this.mediaCompanies).length} Medien-Unternehmen initialisiert`);
    },
    
    // Journalisten initialisieren
    initializeJournalists() {
        Object.keys(this.journalists).forEach(journalistId => {
            const journalist = this.journalists[journalistId];
            journalist.id = journalistId;
            journalist.active = true;
            
            this.activeJournalists.set(journalistId, journalist);
        });
        
        console.log(`[NEWS] ${Object.keys(this.journalists).length} Journalisten initialisiert`);
    },
    
    // Nachrichten-Zyklus starten
    startNewsCycle() {
        setInterval(() => {
            this.generateNews();
        }, 300000); // Alle 5 Minuten neue Nachrichten
        
        console.log('[NEWS] Nachrichten-Zyklus gestartet');
    },
    
    // Nachrichten generieren
    generateNews() {
        const categories = Object.keys(this.newsCategories);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        this.createNewsStory(randomCategory);
    },
    
    // Nachrichten-Artikel erstellen
    createNewsStory(category) {
        const config = this.newsConfig[category];
        if (!config) return;
        
        const storyId = `story_${Date.now()}`;
        const journalist = this.getRandomJournalist(category);
        const company = this.activeMediaCompanies.get(journalist.company);
        
        const story = {
            id: storyId,
            category: category,
            config: config,
            title: this.generateTitle(category),
            content: this.generateContent(category),
            journalist: journalist,
            company: company,
            timestamp: Date.now(),
            priority: config.priority,
            credibility: config.credibility,
            views: 0,
            shares: 0,
            likes: 0,
            comments: [],
            status: 'published',
            created: Date.now()
        };
        
        this.newsStories.set(storyId, story);
        
        // Story zum Journalisten und Unternehmen hinzufügen
        journalist.stories.push(storyId);
        company.stories.push(storyId);
        
        // Nachrichten an Spieler senden
        this.broadcastNews(story);
        
        console.log(`[NEWS] Nachrichten-Artikel ${category} erstellt`);
    },
    
    // Zufälligen Journalisten auswählen
    getRandomJournalist(category) {
        const journalists = Array.from(this.activeJournalists.values()).filter(j => 
            j.active && j.specialization === category
        );
        
        if (journalists.length === 0) {
            // Fallback zu beliebigem Journalisten
            const allJournalists = Array.from(this.activeJournalists.values()).filter(j => j.active);
            return allJournalists[Math.floor(Math.random() * allJournalists.length)];
        }
        
        return journalists[Math.floor(Math.random() * journalists.length)];
    },
    
    // Titel generieren
    generateTitle(category) {
        const titles = {
            politics: [
                'Neue Gesetze verabschiedet',
                'Politiker tritt zurück',
                'Wahlkampf beginnt',
                'Koalition zerbricht',
                'Regierung kündigt Reformen an'
            ],
            economy: [
                'Börse steigt um 5%',
                'Neue Arbeitsplätze geschaffen',
                'Inflation steigt',
                'Wirtschaftswachstum verlangsamt',
                'Neue Steuern beschlossen'
            ],
            crime: [
                'Großer Drogenring zerschlagen',
                'Banküberfall in der Innenstadt',
                'Mordfall aufgeklärt',
                'Cyberkriminalität nimmt zu',
                'Polizei verhaftet Verdächtigen'
            ],
            sports: [
                'Fußballteam gewinnt Meisterschaft',
                'Olympische Spiele beginnen',
                'Neuer Rekord aufgestellt',
                'Sportler verletzt',
                'Transfer-Sensation'
            ],
            entertainment: [
                'Neuer Film kommt in die Kinos',
                'Prominenter heiratet',
                'Musikfestival geplant',
                'Schauspieler erhält Auszeichnung',
                'Neue TV-Serie startet'
            ],
            technology: [
                'Neue Technologie vorgestellt',
                'Smartphone-Update verfügbar',
                'Künstliche Intelligenz macht Fortschritte',
                'Cybersicherheit verbessert',
                'Neue App entwickelt'
            ],
            health: [
                'Neue Behandlungsmethode entdeckt',
                'Gesundheitswarnung ausgegeben',
                'Medikament zugelassen',
                'Krankenhaus erweitert',
                'Gesundheitsstudie veröffentlicht'
            ],
            weather: [
                'Sturmwarnung ausgegeben',
                'Sonniges Wetter erwartet',
                'Schneefall in den Bergen',
                'Hitzewelle vorbei',
                'Regen bringt Erleichterung'
            ],
            traffic: [
                'Stau auf der Autobahn',
                'Brücke gesperrt',
                'Neue Buslinie eröffnet',
                'Verkehrsunfall blockiert Straße',
                'Parkgebühren erhöht'
            ]
        };
        
        const categoryTitles = titles[category] || ['Wichtige Nachricht'];
        return categoryTitles[Math.floor(Math.random() * categoryTitles.length)];
    },
    
    // Inhalt generieren
    generateContent(category) {
        const contents = {
            politics: 'Die Regierung hat heute wichtige Entscheidungen getroffen, die das Leben der Bürger beeinflussen werden.',
            economy: 'Die Wirtschaftslage zeigt positive Entwicklungen mit neuen Investitionen und Arbeitsplätzen.',
            crime: 'Die Polizei konnte einen wichtigen Fall lösen und die Sicherheit in der Stadt verbessern.',
            sports: 'Ein spannendes Spiel endete mit einem überraschenden Ergebnis für die Fans.',
            entertainment: 'Die Unterhaltungsbranche präsentiert neue Projekte und talentierte Künstler.',
            technology: 'Innovative Technologien versprechen Verbesserungen für den Alltag der Menschen.',
            health: 'Neue Erkenntnisse in der Medizin bringen Hoffnung für Patienten und Ärzte.',
            weather: 'Das Wetter beeinflusst das tägliche Leben und die Stimmung der Menschen.',
            traffic: 'Verkehrsbehörden arbeiten an Lösungen für die Mobilität in der Stadt.'
        };
        
        return contents[category] || 'Eine wichtige Nachricht wurde veröffentlicht.';
    },
    
    // Nachrichten senden
    broadcastNews(story) {
        const players = mp.players.toArray();
        const message = `📰 ${story.title} - ${story.company.name}`;
        
        players.forEach(player => {
            player.outputChatBox(message);
            player.call('ui:show', 'NewsStory', { story: story });
        });
    },
    
    // Nachrichten lesen
    readNews(player, storyId) {
        const story = this.newsStories.get(storyId);
        if (!story) {
            player.outputChatBox('Nachrichten-Artikel nicht gefunden!');
            return false;
        }
        
        story.views++;
        
        player.outputChatBox(`=== ${story.title} ===`);
        player.outputChatBox(`Kategorie: ${story.config.name}`);
        player.outputChatBox(`Journalist: ${story.journalist.name}`);
        player.outputChatBox(`Unternehmen: ${story.company.name}`);
        player.outputChatBox(`Glaubwürdigkeit: ${(story.credibility * 100).toFixed(1)}%`);
        player.outputChatBox(`Aufrufe: ${story.views}`);
        player.outputChatBox(`Inhalt: ${story.content}`);
        
        player.call('ui:show', 'NewsRead', { story: story });
        
        console.log(`[NEWS] Spieler ${player.id} liest Nachrichten-Artikel ${storyId}`);
        return true;
    },
    
    // Nachrichten teilen
    shareNews(player, storyId) {
        const story = this.newsStories.get(storyId);
        if (!story) {
            player.outputChatBox('Nachrichten-Artikel nicht gefunden!');
            return false;
        }
        
        story.shares++;
        
        const players = mp.players.toArray();
        const shareMessage = `📤 ${player.name} teilt: ${story.title}`;
        
        players.forEach(p => {
            if (p.id !== player.id) {
                p.outputChatBox(shareMessage);
            }
        });
        
        player.outputChatBox('Nachrichten-Artikel geteilt!');
        player.call('ui:show', 'NewsShared', { story: story });
        
        console.log(`[NEWS] Spieler ${player.id} teilt Nachrichten-Artikel ${storyId}`);
        return true;
    },
    
    // Nachrichten kommentieren
    commentNews(player, storyId, comment) {
        const story = this.newsStories.get(storyId);
        if (!story) {
            player.outputChatBox('Nachrichten-Artikel nicht gefunden!');
            return false;
        }
        
        const commentId = `comment_${player.id}_${Date.now()}`;
        const newsComment = {
            id: commentId,
            playerId: player.id,
            playerName: player.name,
            comment: comment,
            timestamp: Date.now(),
            likes: 0,
            created: Date.now()
        };
        
        story.comments.push(newsComment);
        
        player.outputChatBox('Kommentar hinzugefügt!');
        player.call('ui:show', 'NewsCommented', { comment: newsComment });
        
        console.log(`[NEWS] Spieler ${player.id} kommentiert Nachrichten-Artikel ${storyId}`);
        return commentId;
    },
    
    // Journalist werden
    becomeJournalist(player, companyId, specialization) {
        const company = this.activeMediaCompanies.get(companyId);
        if (!company) {
            player.outputChatBox('Medien-Unternehmen nicht gefunden!');
            return false;
        }
        
        const journalistId = `journalist_${player.id}_${Date.now()}`;
        const journalist = {
            id: journalistId,
            playerId: player.id,
            name: player.name,
            company: companyId,
            specialization: specialization,
            experience: 0,
            reputation: 0.5,
            salary: 2000,
            status: 'active',
            stories: [],
            awards: [],
            created: Date.now()
        };
        
        this.activeJournalists.set(journalistId, journalist);
        
        player.journalist = true;
        player.journalistId = journalistId;
        player.journalistCompany = companyId;
        player.journalistSpecialization = specialization;
        
        player.outputChatBox(`Du bist jetzt Journalist bei ${company.name}!`);
        player.call('ui:show', 'JournalistJoined', { journalist: journalist });
        
        console.log(`[NEWS] Spieler ${player.id} wurde Journalist`);
        return journalistId;
    },
    
    // Nachrichten-Artikel schreiben
    writeArticle(player, category, title, content) {
        if (!player.journalist) {
            player.outputChatBox('Du bist kein Journalist!');
            return false;
        }
        
        const journalist = this.activeJournalists.get(player.journalistId);
        if (!journalist) {
            player.outputChatBox('Journalist-Profil nicht gefunden!');
            return false;
        }
        
        const storyId = `story_${player.id}_${Date.now()}`;
        const company = this.activeMediaCompanies.get(journalist.company);
        
        const story = {
            id: storyId,
            category: category,
            config: this.newsConfig[category],
            title: title,
            content: content,
            journalist: journalist,
            company: company,
            timestamp: Date.now(),
            priority: 'medium',
            credibility: journalist.reputation,
            views: 0,
            shares: 0,
            likes: 0,
            comments: [],
            status: 'published',
            created: Date.now()
        };
        
        this.newsStories.set(storyId, story);
        journalist.stories.push(storyId);
        company.stories.push(storyId);
        
        // Nachrichten senden
        this.broadcastNews(story);
        
        player.outputChatBox('Artikel veröffentlicht!');
        player.call('ui:show', 'ArticlePublished', { story: story });
        
        console.log(`[NEWS] Artikel von Spieler ${player.id} veröffentlicht`);
        return storyId;
    },
    
    // Nachrichten-System-Statistiken
    getStatistics() {
        return {
            totalCompanies: this.activeMediaCompanies.size,
            totalJournalists: this.activeJournalists.size,
            totalStories: this.newsStories.size,
            totalViews: Array.from(this.newsStories.values()).reduce((sum, story) => sum + story.views, 0),
            totalShares: Array.from(this.newsStories.values()).reduce((sum, story) => sum + story.shares, 0)
        };
    }
};

// Events
mp.events.add('news:read', (player, storyId) => {
    newsSystem.readNews(player, storyId);
});

mp.events.add('news:share', (player, storyId) => {
    newsSystem.shareNews(player, storyId);
});

mp.events.add('news:comment', (player, storyId, comment) => {
    newsSystem.commentNews(player, storyId, comment);
});

mp.events.add('news:write', (player, category, title, content) => {
    newsSystem.writeArticle(player, category, title, content);
});

// Commands
mp.events.addCommand('news', (player, fullText, action, storyId, comment) => {
    if (!action) {
        player.outputChatBox('Verwendung: /news [read|share|comment|write|become] [ID] [Text]');
        player.outputChatBox('Verfügbare Kategorien: politics, economy, crime, sports, entertainment, technology, health, weather, traffic');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'read':
            if (storyId) {
                newsSystem.readNews(player, storyId);
            } else {
                player.outputChatBox('Story-ID erforderlich!');
            }
            break;
            
        case 'share':
            if (storyId) {
                newsSystem.shareNews(player, storyId);
            } else {
                player.outputChatBox('Story-ID erforderlich!');
            }
            break;
            
        case 'comment':
            if (storyId && comment) {
                newsSystem.commentNews(player, storyId, comment);
            } else {
                player.outputChatBox('Story-ID und Kommentar erforderlich!');
            }
            break;
            
        case 'write':
            if (storyId && comment) {
                newsSystem.writeArticle(player, storyId, comment, 'Artikel-Inhalt');
            } else {
                player.outputChatBox('Kategorie und Titel erforderlich!');
            }
            break;
            
        case 'become':
            if (storyId && comment) {
                newsSystem.becomeJournalist(player, storyId, comment);
            } else {
                player.outputChatBox('Unternehmen-ID und Spezialisierung erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('newsstats', (player) => {
    const stats = newsSystem.getStatistics();
    player.outputChatBox('=== Nachrichten-System-Statistiken ===');
    player.outputChatBox(`Gesamt Unternehmen: ${stats.totalCompanies}`);
    player.outputChatBox(`Gesamt Journalisten: ${stats.totalJournalists}`);
    player.outputChatBox(`Gesamt Artikel: ${stats.totalStories}`);
    player.outputChatBox(`Gesamt Aufrufe: ${stats.totalViews}`);
    player.outputChatBox(`Gesamt Shares: ${stats.totalShares}`);
});

// Nachrichten-System initialisieren
newsSystem.init();

module.exports = newsSystem;
