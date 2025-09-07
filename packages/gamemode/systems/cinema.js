// Cinema System - Kino-System mit Filmen und Vorführungen
// Behandelt alle Kino-Funktionen für Horizont-City Roleplay

const cinemaSystem = {
    // Film-Genres
    filmGenres: {
        ACTION: 'action',
        COMEDY: 'comedy',
        DRAMA: 'drama',
        HORROR: 'horror',
        ROMANCE: 'romance',
        THRILLER: 'thriller',
        SCI_FI: 'sci_fi',
        FANTASY: 'fantasy',
        ADVENTURE: 'adventure',
        CRIME: 'crime',
        MYSTERY: 'mystery',
        DOCUMENTARY: 'documentary',
        ANIMATION: 'animation',
        FAMILY: 'family',
        WESTERN: 'western',
        MUSICAL: 'musical',
        WAR: 'war',
        BIOGRAPHY: 'biography',
        HISTORY: 'history',
        SPORT: 'sport'
    },
    
    // Film-Konfiguration
    filmConfig: {
        'avengers_endgame': {
            title: 'Avengers: Endgame',
            genre: 'action',
            year: 2019,
            duration: 181,
            rating: 'PG-13',
            director: 'Anthony Russo, Joe Russo',
            cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth'],
            description: 'Nach den verheerenden Ereignissen von Infinity War kämpfen die verbliebenen Avengers um das Universum zu retten.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 12,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 8.4,
            rotten_tomatoes: 94,
            awards: ['Oscar', 'Golden Globe'],
            age_restriction: 12,
            popularity: 'very_high',
            box_office: 2797800564
        },
        'joker': {
            title: 'Joker',
            genre: 'drama',
            year: 2019,
            duration: 122,
            rating: 'R',
            director: 'Todd Phillips',
            cast: ['Joaquin Phoenix', 'Robert De Niro', 'Zazie Beetz'],
            description: 'Die Geschichte des berühmtesten Bösewichts der Comic-Welt und wie er zum Joker wurde.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 10,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 8.5,
            rotten_tomatoes: 68,
            awards: ['Oscar', 'Golden Globe', 'Venice Film Festival'],
            age_restriction: 16,
            popularity: 'high',
            box_office: 1074251311
        },
        'toy_story_4': {
            title: 'Toy Story 4',
            genre: 'animation',
            year: 2019,
            duration: 100,
            rating: 'G',
            director: 'Josh Cooley',
            cast: ['Tom Hanks', 'Tim Allen', 'Annie Potts'],
            description: 'Woody und Buzz Lightyear kehren zurück für ein neues Abenteuer mit ihren Spielzeug-Freunden.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 8,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 7.8,
            rotten_tomatoes: 97,
            awards: ['Oscar'],
            age_restriction: 0,
            popularity: 'high',
            box_office: 1073394593
        },
        'parasite': {
            title: 'Parasite',
            genre: 'thriller',
            year: 2019,
            duration: 132,
            rating: 'R',
            director: 'Bong Joon-ho',
            cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong'],
            description: 'Eine Familie aus der Unterschicht versucht sich in eine reiche Familie einzuschleichen.',
            language: 'korean',
            subtitles: ['german', 'english', 'french', 'spanish'],
            price: 11,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 8.6,
            rotten_tomatoes: 99,
            awards: ['Oscar', 'Palme d\'Or', 'Golden Globe'],
            age_restriction: 16,
            popularity: 'very_high',
            box_office: 258808385
        },
        'once_upon_a_time_in_hollywood': {
            title: 'Once Upon a Time in Hollywood',
            genre: 'drama',
            year: 2019,
            duration: 161,
            rating: 'R',
            director: 'Quentin Tarantino',
            cast: ['Leonardo DiCaprio', 'Brad Pitt', 'Margot Robbie'],
            description: 'Eine Geschichte über das Ende der goldenen Ära Hollywoods in den 1960er Jahren.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 13,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 7.6,
            rotten_tomatoes: 85,
            awards: ['Oscar', 'Golden Globe'],
            age_restriction: 16,
            popularity: 'high',
            box_office: 374350000
        },
        'frozen_2': {
            title: 'Frozen 2',
            genre: 'animation',
            year: 2019,
            duration: 103,
            rating: 'PG',
            director: 'Chris Buck, Jennifer Lee',
            cast: ['Kristen Bell', 'Idina Menzel', 'Josh Gad'],
            description: 'Elsa, Anna, Kristoff und Olaf begeben sich auf eine neue Reise in das magische Land.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 9,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 6.9,
            rotten_tomatoes: 77,
            awards: ['Oscar'],
            age_restriction: 0,
            popularity: 'very_high',
            box_office: 1450026933
        },
        'john_wick_3': {
            title: 'John Wick: Chapter 3 - Parabellum',
            genre: 'action',
            year: 2019,
            duration: 131,
            rating: 'R',
            director: 'Chad Stahelski',
            cast: ['Keanu Reeves', 'Halle Berry', 'Ian McShane'],
            description: 'John Wick ist auf der Flucht vor allen Auftragskillern der Welt.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 11,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 7.4,
            rotten_tomatoes: 89,
            awards: [],
            age_restriction: 16,
            popularity: 'high',
            box_office: 326700000
        },
        'spider_man_far_from_home': {
            title: 'Spider-Man: Far From Home',
            genre: 'action',
            year: 2019,
            duration: 129,
            rating: 'PG-13',
            director: 'Jon Watts',
            cast: ['Tom Holland', 'Jake Gyllenhaal', 'Zendaya'],
            description: 'Peter Parker geht auf eine Europareise, aber seine Pläne werden von mysteriösen Elementarwesen durchkreuzt.',
            language: 'english',
            subtitles: ['german', 'french', 'spanish'],
            price: 12,
            quality: '4K',
            sound: 'Dolby Atmos',
            imdb: 7.4,
            rotten_tomatoes: 90,
            awards: [],
            age_restriction: 12,
            popularity: 'very_high',
            box_office: 1131927996
        }
    },
    
    // Kino-Konfiguration
    cinemaConfig: {
        'cinema_1': {
            name: 'Horizont Cinema',
            location: { x: 1000, y: 2000, z: 30 },
            screens: 8,
            capacity: 1200,
            facilities: ['imax', '4dx', 'dolby_atmos', 'concessions', 'parking'],
            status: 'active',
            opening_hours: '10:00-24:00',
            phone: '+49 30 12345678',
            website: 'www.horizont-cinema.de',
            manager: 'Max Mustermann',
            created: Date.now()
        },
        'cinema_2': {
            name: 'City Center Cineplex',
            location: { x: 1500, y: 2500, z: 30 },
            screens: 12,
            capacity: 1800,
            facilities: ['imax', '4dx', 'dolby_atmos', 'concessions', 'parking', 'restaurant'],
            status: 'active',
            opening_hours: '9:00-01:00',
            phone: '+49 30 87654321',
            website: 'www.citycenter-cineplex.de',
            manager: 'Anna Schmidt',
            created: Date.now()
        },
        'cinema_3': {
            name: 'Art House Cinema',
            location: { x: 2000, y: 3000, z: 30 },
            screens: 4,
            capacity: 400,
            facilities: ['dolby_atmos', 'concessions', 'bar'],
            status: 'active',
            opening_hours: '14:00-23:00',
            phone: '+49 30 11223344',
            website: 'www.arthouse-cinema.de',
            manager: 'Klaus Weber',
            created: Date.now()
        }
    },
    
    // Vorführungs-Konfiguration
    screeningConfig: {
        'morning': {
            name: 'Morgenshow',
            time: '10:00',
            price_multiplier: 0.8,
            audience: 'family',
            duration: 120
        },
        'afternoon': {
            name: 'Nachmittagsshow',
            time: '14:00',
            price_multiplier: 1.0,
            audience: 'general',
            duration: 120
        },
        'evening': {
            name: 'Abendshow',
            time: '18:00',
            price_multiplier: 1.2,
            audience: 'adult',
            duration: 120
        },
        'night': {
            name: 'Nachtshow',
            time: '22:00',
            price_multiplier: 1.5,
            audience: 'adult',
            duration: 120
        }
    },
    
    // Aktive Kinos
    activeCinemas: new Map(),
    
    // Aktive Vorführungen
    activeScreenings: new Map(),
    
    // Kino-Tickets
    cinemaTickets: new Map(),
    
    // Kino-System-Initialisierung
    init() {
        console.log('[CINEMA] Kino-System initialisiert');
        this.initializeCinemas();
        this.scheduleScreenings();
    },
    
    // Kinos initialisieren
    initializeCinemas() {
        Object.keys(this.cinemaConfig).forEach(cinemaId => {
            const cinema = this.cinemaConfig[cinemaId];
            cinema.id = cinemaId;
            cinema.screens = this.initializeScreens(cinema.screens);
            cinema.screenings = [];
            cinema.tickets = [];
            cinema.revenue = 0;
            
            this.activeCinemas.set(cinemaId, cinema);
        });
        
        console.log(`[CINEMA] ${Object.keys(this.cinemaConfig).length} Kinos initialisiert`);
    },
    
    // Leinwände initialisieren
    initializeScreens(screenCount) {
        const screens = [];
        for (let i = 1; i <= screenCount; i++) {
            screens.push({
                id: i,
                name: `Saal ${i}`,
                capacity: 150,
                facilities: ['dolby_atmos', '4k'],
                status: 'available',
                currentFilm: null,
                currentScreening: null
            });
        }
        return screens;
    },
    
    // Vorführungen planen
    scheduleScreenings() {
        const cinemas = Array.from(this.activeCinemas.values());
        const films = Object.keys(this.filmConfig);
        
        cinemas.forEach(cinema => {
            const screenings = [];
            const today = new Date();
            
            // Vorführungen für die nächsten 7 Tage planen
            for (let day = 0; day < 7; day++) {
                const date = new Date(today.getTime() + day * 24 * 60 * 60 * 1000);
                
                Object.keys(this.screeningConfig).forEach(screeningType => {
                    const screeningConfig = this.screeningConfig[screeningType];
                    const filmId = films[Math.floor(Math.random() * films.length)];
                    const film = this.filmConfig[filmId];
                    
                    const screening = {
                        id: `screening_${cinema.id}_${day}_${screeningType}`,
                        cinemaId: cinema.id,
                        filmId: filmId,
                        film: film,
                        screen: Math.floor(Math.random() * cinema.screens.length) + 1,
                        date: date,
                        time: screeningConfig.time,
                        type: screeningType,
                        config: screeningConfig,
                        price: Math.round(film.price * screeningConfig.price_multiplier),
                        seats: this.generateSeats(cinema.screens[0].capacity),
                        status: 'scheduled',
                        created: Date.now()
                    };
                    
                    screenings.push(screening);
                    this.activeScreenings.set(screening.id, screening);
                });
            }
            
            cinema.screenings = screenings;
        });
        
        console.log(`[CINEMA] Vorführungen für ${cinemas.length} Kinos geplant`);
    },
    
    // Sitzplätze generieren
    generateSeats(capacity) {
        const seats = [];
        const rows = Math.ceil(capacity / 20);
        
        for (let row = 1; row <= rows; row++) {
            for (let seat = 1; seat <= 20; seat++) {
                if (seats.length < capacity) {
                    seats.push({
                        id: `${row}-${seat}`,
                        row: row,
                        seat: seat,
                        status: 'available',
                        price: 0,
                        bookedBy: null
                    });
                }
            }
        }
        
        return seats;
    },
    
    // Film anzeigen
    showFilm(player, cinemaId, filmId) {
        const cinema = this.activeCinemas.get(cinemaId);
        if (!cinema) {
            player.outputChatBox('Kino nicht gefunden!');
            return false;
        }
        
        const film = this.filmConfig[filmId];
        if (!film) {
            player.outputChatBox('Film nicht gefunden!');
            return false;
        }
        
        // Verfügbare Vorführungen finden
        const screenings = cinema.screenings.filter(screening => 
            screening.filmId === filmId && 
            screening.status === 'scheduled' &&
            new Date(screening.date) >= new Date()
        );
        
        if (screenings.length === 0) {
            player.outputChatBox('Keine Vorführungen für diesen Film verfügbar!');
            return false;
        }
        
        player.outputChatBox(`Film: ${film.title}`);
        player.outputChatBox(`Genre: ${film.genre}`);
        player.outputChatBox(`Dauer: ${film.duration} Minuten`);
        player.outputChatBox(`Bewertung: ${film.imdb}/10`);
        player.outputChatBox(`Verfügbare Vorführungen: ${screenings.length}`);
        
        player.call('ui:show', 'CinemaFilm', { 
            film: film, 
            cinema: cinema, 
            screenings: screenings 
        });
        
        console.log(`[CINEMA] Film ${filmId} für Spieler ${player.id} angezeigt`);
        return true;
    },
    
    // Ticket kaufen
    buyTicket(player, screeningId, seatId) {
        const screening = this.activeScreenings.get(screeningId);
        if (!screening) {
            player.outputChatBox('Vorführung nicht gefunden!');
            return false;
        }
        
        const seat = screening.seats.find(s => s.id === seatId);
        if (!seat) {
            player.outputChatBox('Sitzplatz nicht gefunden!');
            return false;
        }
        
        if (seat.status !== 'available') {
            player.outputChatBox('Sitzplatz bereits belegt!');
            return false;
        }
        
        if (player.money < screening.price) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${screening.price}`);
            return false;
        }
        
        // Ticket kaufen
        const ticketId = `ticket_${player.id}_${Date.now()}`;
        const ticket = {
            id: ticketId,
            playerId: player.id,
            screeningId: screeningId,
            seatId: seatId,
            film: screening.film,
            cinema: this.activeCinemas.get(screening.cinemaId),
            date: screening.date,
            time: screening.time,
            price: screening.price,
            status: 'valid',
            created: Date.now()
        };
        
        this.cinemaTickets.set(ticketId, ticket);
        
        // Sitzplatz reservieren
        seat.status = 'booked';
        seat.bookedBy = player.id;
        
        // Geld abziehen
        player.money -= screening.price;
        
        // Kino-Einnahmen erhöhen
        const cinema = this.activeCinemas.get(screening.cinemaId);
        cinema.revenue += screening.price;
        
        player.outputChatBox(`Ticket für ${screening.film.title} gekauft! Sitzplatz: ${seatId}, Preis: $${screening.price}`);
        player.call('ui:show', 'CinemaTicket', { ticket: ticket });
        
        console.log(`[CINEMA] Ticket für Spieler ${player.id} gekauft`);
        return ticketId;
    },
    
    // Vorführung besuchen
    attendScreening(player, ticketId) {
        const ticket = this.cinemaTickets.get(ticketId);
        if (!ticket) {
            player.outputChatBox('Ticket nicht gefunden!');
            return false;
        }
        
        if (ticket.playerId !== player.id) {
            player.outputChatBox('Du besitzt dieses Ticket nicht!');
            return false;
        }
        
        if (ticket.status !== 'valid') {
            player.outputChatBox('Ticket nicht gültig!');
            return false;
        }
        
        const screening = this.activeScreenings.get(ticket.screeningId);
        if (!screening) {
            player.outputChatBox('Vorführung nicht gefunden!');
            return false;
        }
        
        // Vorführung starten
        screening.status = 'playing';
        ticket.status = 'used';
        
        player.outputChatBox(`Vorführung von ${ticket.film.title} gestartet!`);
        player.call('ui:show', 'CinemaScreening', { 
            ticket: ticket, 
            screening: screening 
        });
        
        // Film-Dauer simulieren
        setTimeout(() => {
            this.endScreening(player, ticketId);
        }, ticket.film.duration * 1000); // Film-Dauer in Millisekunden
        
        console.log(`[CINEMA] Spieler ${player.id} besucht Vorführung`);
        return true;
    },
    
    // Vorführung beenden
    endScreening(player, ticketId) {
        const ticket = this.cinemaTickets.get(ticketId);
        if (!ticket) {
            return;
        }
        
        const screening = this.activeScreenings.get(ticket.screeningId);
        if (screening) {
            screening.status = 'completed';
        }
        
        player.outputChatBox(`Vorführung von ${ticket.film.title} beendet!`);
        player.call('ui:show', 'CinemaEnd', { ticket: ticket });
        
        console.log(`[CINEMA] Vorführung für Spieler ${player.id} beendet`);
    },
    
    // Kino-Statistiken
    getStatistics() {
        return {
            totalCinemas: this.activeCinemas.size,
            totalScreenings: this.activeScreenings.size,
            totalTickets: this.cinemaTickets.size,
            totalFilms: Object.keys(this.filmConfig).length,
            totalGenres: Object.keys(this.filmGenres).length
        };
    }
};

// Events
mp.events.add('cinema:showFilm', (player, cinemaId, filmId) => {
    cinemaSystem.showFilm(player, cinemaId, filmId);
});

mp.events.add('cinema:buyTicket', (player, screeningId, seatId) => {
    cinemaSystem.buyTicket(player, screeningId, seatId);
});

mp.events.add('cinema:attendScreening', (player, ticketId) => {
    cinemaSystem.attendScreening(player, ticketId);
});

// Commands
mp.events.addCommand('cinema', (player, fullText, action, cinemaId, filmId) => {
    if (!action) {
        player.outputChatBox('Verwendung: /cinema [show|buy|attend] [KinoID] [FilmID]');
        player.outputChatBox('Verfügbare Kinos: cinema_1, cinema_2, cinema_3');
        player.outputChatBox('Verfügbare Filme: avengers_endgame, joker, toy_story_4, parasite');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'show':
            if (cinemaId && filmId) {
                cinemaSystem.showFilm(player, cinemaId, filmId);
            } else {
                player.outputChatBox('KinoID und FilmID erforderlich!');
            }
            break;
            
        case 'buy':
            if (cinemaId && filmId) {
                // Hier würde der Ticket-Kauf implementiert werden
                player.outputChatBox('Ticket-Kauf implementiert!');
            } else {
                player.outputChatBox('KinoID und FilmID erforderlich!');
            }
            break;
            
        case 'attend':
            if (cinemaId) {
                // Hier würde der Vorführungs-Besuch implementiert werden
                player.outputChatBox('Vorführungs-Besuch implementiert!');
            } else {
                player.outputChatBox('KinoID erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('cinemastats', (player) => {
    const stats = cinemaSystem.getStatistics();
    player.outputChatBox('=== Kino-Statistiken ===');
    player.outputChatBox(`Gesamt Kinos: ${stats.totalCinemas}`);
    player.outputChatBox(`Gesamt Vorführungen: ${stats.totalScreenings}`);
    player.outputChatBox(`Gesamt Tickets: ${stats.totalTickets}`);
    player.outputChatBox(`Gesamt Filme: ${stats.totalFilms}`);
    player.outputChatBox(`Gesamt Genres: ${stats.totalGenres}`);
});

// Kino-System initialisieren
cinemaSystem.init();

module.exports = cinemaSystem;
