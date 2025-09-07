// Club System - Club-System mit Mitgliedschaften und Events
// Behandelt alle Club-Funktionen für Horizont-City Roleplay

const clubSystem = {
    // Club-Typen
    clubTypes: {
        NIGHTCLUB: 'nightclub',
        SPORTS_CLUB: 'sports_club',
        BOOK_CLUB: 'book_club',
        MUSIC_CLUB: 'music_club',
        DANCE_CLUB: 'dance_club',
        GAMING_CLUB: 'gaming_club',
        ART_CLUB: 'art_club',
        PHOTOGRAPHY_CLUB: 'photography_club',
        COOKING_CLUB: 'cooking_club',
        TRAVEL_CLUB: 'travel_club',
        FITNESS_CLUB: 'fitness_club',
        BUSINESS_CLUB: 'business_club',
        POLITICAL_CLUB: 'political_club',
        RELIGIOUS_CLUB: 'religious_club',
        HOBBIES_CLUB: 'hobbies_club',
        PROFESSIONAL_CLUB: 'professional_club',
        SOCIAL_CLUB: 'social_club',
        YOUTH_CLUB: 'youth_club',
        SENIOR_CLUB: 'senior_club',
        FAMILY_CLUB: 'family_club'
    },
    
    // Club-Konfiguration
    clubConfig: {
        nightclub: {
            name: 'Nachtclub',
            type: 'nightclub',
            description: 'Club für Nachtleben und Partys',
            activities: ['dancing', 'drinking', 'socializing', 'music'],
            ageRestriction: 18,
            membershipFee: 50,
            monthlyFee: 20,
            capacity: 200,
            facilities: ['dance_floor', 'bar', 'vip_area', 'sound_system', 'lighting'],
            openingHours: '22:00-06:00',
            dressCode: 'smart_casual',
            popularity: 0.9
        },
        sports_club: {
            name: 'Sportclub',
            type: 'sports_club',
            description: 'Club für Sport und Fitness',
            activities: ['training', 'competitions', 'team_sports', 'fitness'],
            ageRestriction: 0,
            membershipFee: 100,
            monthlyFee: 30,
            capacity: 150,
            facilities: ['gym', 'field', 'locker_room', 'equipment', 'shower'],
            openingHours: '06:00-22:00',
            dressCode: 'sportswear',
            popularity: 0.8
        },
        book_club: {
            name: 'Buchclub',
            type: 'book_club',
            description: 'Club für Literatur und Diskussionen',
            activities: ['reading', 'discussions', 'book_reviews', 'author_meetings'],
            ageRestriction: 0,
            membershipFee: 20,
            monthlyFee: 5,
            capacity: 50,
            facilities: ['library', 'meeting_room', 'coffee_corner', 'books'],
            openingHours: '10:00-20:00',
            dressCode: 'casual',
            popularity: 0.6
        },
        music_club: {
            name: 'Musikclub',
            type: 'music_club',
            description: 'Club für Musik und Konzerte',
            activities: ['concerts', 'jam_sessions', 'music_lessons', 'recording'],
            ageRestriction: 0,
            membershipFee: 80,
            monthlyFee: 25,
            capacity: 100,
            facilities: ['stage', 'instruments', 'recording_studio', 'sound_system'],
            openingHours: '14:00-24:00',
            dressCode: 'casual',
            popularity: 0.7
        },
        dance_club: {
            name: 'Tanzclub',
            type: 'dance_club',
            description: 'Club für Tanz und Choreografie',
            activities: ['dancing', 'lessons', 'performances', 'competitions'],
            ageRestriction: 0,
            membershipFee: 60,
            monthlyFee: 20,
            capacity: 80,
            facilities: ['dance_floor', 'mirrors', 'sound_system', 'changing_room'],
            openingHours: '16:00-22:00',
            dressCode: 'dancewear',
            popularity: 0.75
        },
        gaming_club: {
            name: 'Gaming Club',
            type: 'gaming_club',
            description: 'Club für Gaming und E-Sports',
            activities: ['gaming', 'tournaments', 'lan_parties', 'streaming'],
            ageRestriction: 0,
            membershipFee: 40,
            monthlyFee: 15,
            capacity: 60,
            facilities: ['gaming_room', 'computers', 'consoles', 'internet'],
            openingHours: '12:00-24:00',
            dressCode: 'casual',
            popularity: 0.85
        },
        art_club: {
            name: 'Kunstclub',
            type: 'art_club',
            description: 'Club für Kunst und Kreativität',
            activities: ['painting', 'sculpting', 'exhibitions', 'workshops'],
            ageRestriction: 0,
            membershipFee: 70,
            monthlyFee: 20,
            capacity: 40,
            facilities: ['studio', 'gallery', 'materials', 'tools'],
            openingHours: '10:00-18:00',
            dressCode: 'casual',
            popularity: 0.65
        },
        photography_club: {
            name: 'Fotoclub',
            type: 'photography_club',
            description: 'Club für Fotografie und Bildbearbeitung',
            activities: ['photography', 'editing', 'exhibitions', 'workshops'],
            ageRestriction: 0,
            membershipFee: 90,
            monthlyFee: 25,
            capacity: 30,
            facilities: ['studio', 'darkroom', 'computers', 'equipment'],
            openingHours: '09:00-21:00',
            dressCode: 'casual',
            popularity: 0.7
        },
        cooking_club: {
            name: 'Kochclub',
            type: 'cooking_club',
            description: 'Club für Kochen und Gastronomie',
            activities: ['cooking', 'baking', 'tastings', 'competitions'],
            ageRestriction: 0,
            membershipFee: 50,
            monthlyFee: 15,
            capacity: 25,
            facilities: ['kitchen', 'dining_room', 'equipment', 'ingredients'],
            openingHours: '10:00-20:00',
            dressCode: 'apron',
            popularity: 0.8
        },
        travel_club: {
            name: 'Reiseclub',
            type: 'travel_club',
            description: 'Club für Reisen und Abenteuer',
            activities: ['trips', 'planning', 'presentations', 'discussions'],
            ageRestriction: 0,
            membershipFee: 30,
            monthlyFee: 10,
            capacity: 100,
            facilities: ['meeting_room', 'maps', 'presentation_equipment'],
            openingHours: '19:00-21:00',
            dressCode: 'casual',
            popularity: 0.75
        }
    },
    
    // Club-Ränge
    clubRanks: {
        MEMBER: { name: 'Mitglied', level: 1, permissions: ['attend_events', 'use_facilities'] },
        ACTIVE_MEMBER: { name: 'Aktives Mitglied', level: 2, permissions: ['attend_events', 'use_facilities', 'vote'] },
        OFFICER: { name: 'Beamter', level: 3, permissions: ['attend_events', 'use_facilities', 'vote', 'organize_events'] },
        VICE_PRESIDENT: { name: 'Vizepräsident', level: 4, permissions: ['attend_events', 'use_facilities', 'vote', 'organize_events', 'manage_members'] },
        PRESIDENT: { name: 'Präsident', level: 5, permissions: ['all'] }
    },
    
    // Aktive Clubs
    activeClubs: new Map(),
    
    // Club-Mitglieder
    clubMembers: new Map(),
    
    // Club-Events
    clubEvents: new Map(),
    
    // Club-System-Initialisierung
    init() {
        console.log('[CLUB] Club-System initialisiert');
        this.initializeClubs();
    },
    
    // Clubs initialisieren
    initializeClubs() {
        Object.keys(this.clubConfig).forEach(clubType => {
            const config = this.clubConfig[clubType];
            const clubId = `club_${clubType}_${Date.now()}`;
            
            const club = {
                id: clubId,
                type: clubType,
                config: config,
                name: config.name,
                description: config.description,
                members: [],
                events: [],
                president: null,
                officers: [],
                budget: 10000,
                reputation: 0.8,
                status: 'active',
                created: Date.now()
            };
            
            this.activeClubs.set(clubId, club);
        });
        
        console.log(`[CLUB] ${Object.keys(this.clubConfig).length} Clubs initialisiert`);
    },
    
    // Club beitreten
    joinClub(player, clubId) {
        const club = this.activeClubs.get(clubId);
        if (!club) {
            player.outputChatBox('Club nicht gefunden!');
            return false;
        }
        
        if (player.age < club.config.ageRestriction) {
            player.outputChatBox(`Mindestalter für ${club.name} ist ${club.config.ageRestriction} Jahre!`);
            return false;
        }
        
        if (player.money < club.config.membershipFee) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${club.config.membershipFee}`);
            return false;
        }
        
        const membershipId = `membership_${player.id}_${Date.now()}`;
        const membership = {
            id: membershipId,
            playerId: player.id,
            playerName: player.name,
            clubId: clubId,
            club: club,
            rank: 'member',
            config: this.clubRanks.MEMBER,
            joinDate: Date.now(),
            status: 'active',
            eventsAttended: 0,
            contributions: 0,
            created: Date.now()
        };
        
        this.clubMembers.set(membershipId, membership);
        club.members.push(membershipId);
        
        player.money -= club.config.membershipFee;
        club.budget += club.config.membershipFee;
        
        player.outputChatBox(`Du bist ${club.name} beigetreten!`);
        player.call('ui:show', 'ClubJoined', { membership: membership });
        
        console.log(`[CLUB] Spieler ${player.id} ist ${clubId} beigetreten`);
        return membershipId;
    },
    
    // Club verlassen
    leaveClub(player, clubId) {
        const memberships = Array.from(this.clubMembers.values()).filter(membership => 
            membership.playerId === player.id && 
            membership.clubId === clubId && 
            membership.status === 'active'
        );
        
        if (memberships.length === 0) {
            player.outputChatBox('Du bist kein Mitglied dieses Clubs!');
            return false;
        }
        
        const membership = memberships[0];
        membership.status = 'left';
        membership.leaveDate = Date.now();
        
        const club = this.activeClubs.get(clubId);
        if (club) {
            club.members = club.members.filter(id => id !== membership.id);
        }
        
        player.outputChatBox(`Du hast ${club.name} verlassen!`);
        player.call('ui:show', 'ClubLeft', { membership: membership });
        
        console.log(`[CLUB] Spieler ${player.id} hat ${clubId} verlassen`);
        return true;
    },
    
    // Club-Event erstellen
    createEvent(player, clubId, eventName, description, date, location) {
        const club = this.activeClubs.get(clubId);
        if (!club) {
            player.outputChatBox('Club nicht gefunden!');
            return false;
        }
        
        const membership = this.getMembership(player, clubId);
        if (!membership) {
            player.outputChatBox('Du bist kein Mitglied dieses Clubs!');
            return false;
        }
        
        if (!this.hasPermission(membership, 'organize_events')) {
            player.outputChatBox('Du hast keine Berechtigung, Events zu organisieren!');
            return false;
        }
        
        const eventId = `event_${clubId}_${Date.now()}`;
        const event = {
            id: eventId,
            clubId: clubId,
            club: club,
            name: eventName,
            description: description,
            date: date,
            location: location,
            organizerId: player.id,
            organizerName: player.name,
            attendees: [],
            maxAttendees: club.config.capacity,
            status: 'scheduled',
            created: Date.now()
        };
        
        this.clubEvents.set(eventId, event);
        club.events.push(eventId);
        
        player.outputChatBox(`Event "${eventName}" erstellt!`);
        player.call('ui:show', 'EventCreated', { event: event });
        
        console.log(`[CLUB] Event ${eventName} für ${clubId} erstellt`);
        return eventId;
    },
    
    // Event beitreten
    joinEvent(player, eventId) {
        const event = this.clubEvents.get(eventId);
        if (!event) {
            player.outputChatBox('Event nicht gefunden!');
            return false;
        }
        
        if (event.attendees.length >= event.maxAttendees) {
            player.outputChatBox('Event ist voll!');
            return false;
        }
        
        const membership = this.getMembership(player, event.clubId);
        if (!membership) {
            player.outputChatBox('Du musst Mitglied des Clubs sein!');
            return false;
        }
        
        event.attendees.push({
            playerId: player.id,
            playerName: player.name,
            joinTime: Date.now()
        });
        
        membership.eventsAttended++;
        
        player.outputChatBox(`Du bist dem Event "${event.name}" beigetreten!`);
        player.call('ui:show', 'EventJoined', { event: event });
        
        console.log(`[CLUB] Spieler ${player.id} ist Event ${eventId} beigetreten`);
        return true;
    },
    
    // Mitgliedschaft abrufen
    getMembership(player, clubId) {
        const memberships = Array.from(this.clubMembers.values()).filter(membership => 
            membership.playerId === player.id && 
            membership.clubId === clubId && 
            membership.status === 'active'
        );
        
        return memberships.length > 0 ? memberships[0] : null;
    },
    
    // Berechtigung prüfen
    hasPermission(membership, permission) {
        return membership.config.permissions.includes(permission) || 
               membership.config.permissions.includes('all');
    }
};

// Events
mp.events.add('club:join', (player, clubId) => {
    clubSystem.joinClub(player, clubId);
});

mp.events.add('club:leave', (player, clubId) => {
    clubSystem.leaveClub(player, clubId);
});

mp.events.add('club:createEvent', (player, clubId, eventName, description, date, location) => {
    clubSystem.createEvent(player, clubId, eventName, description, date, location);
});

mp.events.add('club:joinEvent', (player, eventId) => {
    clubSystem.joinEvent(player, eventId);
});

// Commands
mp.events.addCommand('club', (player, fullText, action, clubId, eventName) => {
    if (!action) {
        player.outputChatBox('Verwendung: /club [join|leave|create|joinEvent|list] [ClubID] [EventName]');
        player.outputChatBox('Verfügbare Clubs: nightclub, sports_club, book_club, music_club, dance_club, gaming_club');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'join':
            if (clubId) {
                clubSystem.joinClub(player, clubId);
            } else {
                player.outputChatBox('Club-ID erforderlich!');
            }
            break;
            
        case 'leave':
            if (clubId) {
                clubSystem.leaveClub(player, clubId);
            } else {
                player.outputChatBox('Club-ID erforderlich!');
            }
            break;
            
        case 'create':
            if (clubId && eventName) {
                clubSystem.createEvent(player, clubId, eventName, 'Event-Beschreibung', Date.now(), 'Club-Location');
            } else {
                player.outputChatBox('Club-ID und Event-Name erforderlich!');
            }
            break;
            
        case 'joinEvent':
            if (clubId) {
                clubSystem.joinEvent(player, clubId);
            } else {
                player.outputChatBox('Event-ID erforderlich!');
            }
            break;
            
        case 'list':
            player.outputChatBox('=== Verfügbare Clubs ===');
            Object.keys(clubSystem.clubConfig).forEach(type => {
                const config = clubSystem.clubConfig[type];
                player.outputChatBox(`${type}: ${config.name} - $${config.membershipFee}`);
            });
            break;
    }
});

// Club-System initialisieren
clubSystem.init();

module.exports = clubSystem;
