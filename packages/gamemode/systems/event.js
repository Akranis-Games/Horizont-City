// Event System - Event-System mit verschiedenen Veranstaltungen und Events
// Behandelt alle Event-Funktionen für Horizont-City Roleplay

const eventSystem = {
    // Event-Typen
    eventTypes: {
        CONCERT: { name: 'Konzert', duration: 1800000, participants: 100, cost: 50000 },
        FESTIVAL: { name: 'Festival', duration: 3600000, participants: 500, cost: 100000 },
        CONFERENCE: { name: 'Konferenz', duration: 14400000, participants: 200, cost: 75000 },
        EXHIBITION: { name: 'Ausstellung', duration: 28800000, participants: 300, cost: 60000 },
        SPORTS_EVENT: { name: 'Sportveranstaltung', duration: 7200000, participants: 150, cost: 80000 },
        WEDDING: { name: 'Hochzeit', duration: 3600000, participants: 50, cost: 30000 },
        BIRTHDAY: { name: 'Geburtstag', duration: 1800000, participants: 25, cost: 15000 },
        CORPORATE: { name: 'Firmenveranstaltung', duration: 14400000, participants: 100, cost: 40000 },
        CHARITY: { name: 'Wohltätigkeitsveranstaltung', duration: 21600000, participants: 200, cost: 25000 },
        POLITICAL: { name: 'Politische Veranstaltung', duration: 7200000, participants: 300, cost: 90000 },
        RELIGIOUS: { name: 'Religiöse Veranstaltung', duration: 3600000, participants: 150, cost: 20000 },
        CULTURAL: { name: 'Kulturveranstaltung', duration: 1800000, participants: 80, cost: 35000 },
        EDUCATIONAL: { name: 'Bildungsveranstaltung', duration: 14400000, participants: 120, cost: 45000 },
        ENTERTAINMENT: { name: 'Unterhaltungsveranstaltung', duration: 1800000, participants: 60, cost: 25000 },
        NETWORKING: { name: 'Networking-Event', duration: 7200000, participants: 100, cost: 30000 }
    },
    
    // Event-Status
    eventStatus: {
        PLANNING: 'planning',
        SCHEDULED: 'scheduled',
        ACTIVE: 'active',
        COMPLETED: 'completed',
        CANCELLED: 'cancelled',
        POSTPONED: 'postponed'
    },
    
    // Event-Locations
    eventLocations: {
        CONVENTION_CENTER: { name: 'Kongresszentrum', capacity: 1000, cost: 50000, facilities: ['stage', 'sound', 'lighting', 'catering'] },
        STADIUM: { name: 'Stadion', capacity: 5000, cost: 100000, facilities: ['stage', 'sound', 'lighting', 'security'] },
        THEATER: { name: 'Theater', capacity: 500, cost: 30000, facilities: ['stage', 'sound', 'lighting', 'seating'] },
        HOTEL: { name: 'Hotel', capacity: 300, cost: 25000, facilities: ['catering', 'seating', 'sound', 'lighting'] },
        PARK: { name: 'Park', capacity: 2000, cost: 15000, facilities: ['outdoor', 'space', 'nature'] },
        MUSEUM: { name: 'Museum', capacity: 400, cost: 20000, facilities: ['exhibition', 'seating', 'lighting'] },
        CHURCH: { name: 'Kirche', capacity: 200, cost: 10000, facilities: ['seating', 'sound', 'lighting'] },
        RESTAURANT: { name: 'Restaurant', capacity: 100, cost: 15000, facilities: ['catering', 'seating', 'sound'] },
        CLUB: { name: 'Club', capacity: 150, cost: 20000, facilities: ['dance_floor', 'sound', 'lighting', 'bar'] },
        BEACH: { name: 'Strand', capacity: 1000, cost: 10000, facilities: ['outdoor', 'space', 'nature'] }
    },
    
    // Event-Services
    eventServices: {
        CATERING: { name: 'Catering', cost: 5000, description: 'Essen und Getränke' },
        SOUND: { name: 'Tontechnik', cost: 3000, description: 'Beschallungsanlage' },
        LIGHTING: { name: 'Beleuchtung', cost: 2000, description: 'Lichtshow und Beleuchtung' },
        SECURITY: { name: 'Sicherheit', cost: 4000, description: 'Sicherheitspersonal' },
        PHOTOGRAPHY: { name: 'Fotografie', cost: 2500, description: 'Fotograf und Videograf' },
        DECORATION: { name: 'Dekoration', cost: 1500, description: 'Blumen und Dekoration' },
        TRANSPORT: { name: 'Transport', cost: 2000, description: 'Transport und Shuttle' },
        CLEANING: { name: 'Reinigung', cost: 1000, description: 'Nachbereitung und Reinigung' }
    },
    
    // Events
    events: new Map(),
    
    // Event-Teilnehmer
    eventParticipants: new Map(),
    
    // Event-Buchungen
    eventBookings: new Map(),
    
    // Event-Statistiken
    eventStats: {
        totalEvents: 0,
        activeEvents: 0,
        totalParticipants: 0,
        totalRevenue: 0,
        averageEventSize: 0,
        mostPopularType: null
    },
    
    // Event System-Initialisierung
    init() {
        console.log('[EVENT] Event-System initialisiert');
    },
    
    // Event erstellen
    createEvent(player, eventType, location, date, description) {
        const eventConfig = this.eventTypes[eventType];
        if (!eventConfig) {
            player.outputChatBox('Event-Typ nicht gefunden!');
            return false;
        }
        
        const locationConfig = this.eventLocations[location];
        if (!locationConfig) {
            player.outputChatBox('Event-Location nicht gefunden!');
            return false;
        }
        
        if (player.money < eventConfig.cost + locationConfig.cost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${eventConfig.cost + locationConfig.cost}`);
            return false;
        }
        
        const eventId = `event_${player.id}_${Date.now()}`;
        const event = {
            id: eventId,
            organizerId: player.id,
            organizerName: player.name,
            type: eventType,
            config: eventConfig,
            location: location,
            locationConfig: locationConfig,
            date: date,
            description: description || 'Event-Beschreibung',
            status: 'scheduled',
            participants: [],
            services: [],
            budget: eventConfig.cost + locationConfig.cost,
            revenue: 0,
            created: Date.now()
        };
        
        this.events.set(eventId, event);
        
        player.money -= event.budget;
        
        player.outputChatBox(`Event "${eventConfig.name}" erstellt!`);
        player.call('ui:show', 'EventCreated', { event: event });
        
        this.eventStats.totalEvents++;
        
        console.log(`[EVENT] Event ${eventType} für Spieler ${player.id} erstellt`);
        return eventId;
    },
    
    // Event buchen
    bookEvent(player, eventId) {
        const event = this.events.get(eventId);
        if (!event) {
            player.outputChatBox('Event nicht gefunden!');
            return false;
        }
        
        if (event.status !== 'scheduled') {
            player.outputChatBox('Event ist nicht buchbar!');
            return false;
        }
        
        if (event.participants.length >= event.config.participants) {
            player.outputChatBox('Event ist ausgebucht!');
            return false;
        }
        
        const bookingId = `booking_${eventId}_${player.id}`;
        const booking = {
            id: bookingId,
            eventId: eventId,
            playerId: player.id,
            playerName: player.name,
            bookingDate: Date.now(),
            status: 'confirmed',
            created: Date.now()
        };
        
        this.eventBookings.set(bookingId, booking);
        event.participants.push(player.id);
        
        player.outputChatBox(`Event "${event.config.name}" gebucht!`);
        player.call('ui:show', 'EventBooked', { event: event, booking: booking });
        
        this.eventStats.totalParticipants++;
        
        console.log(`[EVENT] Event ${eventId} von Spieler ${player.id} gebucht`);
        return bookingId;
    },
    
    // Event starten
    startEvent(player, eventId) {
        const event = this.events.get(eventId);
        if (!event) {
            player.outputChatBox('Event nicht gefunden!');
            return false;
        }
        
        if (event.organizerId !== player.id) {
            player.outputChatBox('Du bist nicht der Organisator dieses Events!');
            return false;
        }
        
        if (event.status !== 'scheduled') {
            player.outputChatBox('Event kann nicht gestartet werden!');
            return false;
        }
        
        event.status = 'active';
        event.startTime = Date.now();
        
        player.outputChatBox(`Event "${event.config.name}" gestartet!`);
        player.call('ui:show', 'EventStarted', { event: event });
        
        this.eventStats.activeEvents++;
        
        // Event nach Dauer beenden
        setTimeout(() => {
            this.endEvent(eventId);
        }, event.config.duration);
        
        console.log(`[EVENT] Event ${eventId} gestartet`);
        return true;
    },
    
    // Event beenden
    endEvent(eventId) {
        const event = this.events.get(eventId);
        if (!event) return false;
        
        event.status = 'completed';
        event.endTime = Date.now();
        
        // Einnahmen berechnen
        const ticketPrice = 50; // Vereinfacht
        event.revenue = event.participants.length * ticketPrice;
        
        // Organisator bezahlen
        const organizer = mp.players.at(event.organizerId);
        if (organizer) {
            organizer.money += event.revenue;
            organizer.outputChatBox(`Event abgeschlossen! Einnahmen: $${event.revenue}`);
        }
        
        this.eventStats.activeEvents--;
        this.eventStats.totalRevenue += event.revenue;
        
        console.log(`[EVENT] Event ${eventId} beendet`);
        return true;
    },
    
    // Service hinzufügen
    addService(player, eventId, serviceType) {
        const event = this.events.get(eventId);
        if (!event) {
            player.outputChatBox('Event nicht gefunden!');
            return false;
        }
        
        if (event.organizerId !== player.id) {
            player.outputChatBox('Du bist nicht der Organisator dieses Events!');
            return false;
        }
        
        const service = this.eventServices[serviceType];
        if (!service) {
            player.outputChatBox('Service nicht gefunden!');
            return false;
        }
        
        if (player.money < service.cost) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${service.cost}`);
            return false;
        }
        
        event.services.push(serviceType);
        event.budget += service.cost;
        player.money -= service.cost;
        
        player.outputChatBox(`Service "${service.name}" hinzugefügt!`);
        player.call('ui:show', 'ServiceAdded', { event: event, service: service });
        
        console.log(`[EVENT] Service ${serviceType} zu Event ${eventId} hinzugefügt`);
        return true;
    },
    
    // Verfügbare Events anzeigen
    showEvents(player, eventType = null) {
        const events = Array.from(this.events.values()).filter(event => 
            event.status === 'scheduled' && 
            (!eventType || event.type === eventType)
        );
        
        if (events.length === 0) {
            player.outputChatBox('Keine verfügbaren Events gefunden!');
            return false;
        }
        
        player.outputChatBox('=== Verfügbare Events ===');
        events.forEach(event => {
            player.outputChatBox(`${event.config.name} - ${event.locationConfig.name} - Teilnehmer: ${event.participants.length}/${event.config.participants}`);
        });
        
        return true;
    },
    
    // Event-Statistiken
    getStatistics() {
        return {
            ...this.eventStats,
            totalBookings: this.eventBookings.size,
            totalEventTypes: Object.keys(this.eventTypes).length,
            totalLocations: Object.keys(this.eventLocations).length,
            totalServices: Object.keys(this.eventServices).length
        };
    }
};

// Events
mp.events.add('event:create', (player, eventType, location, date, description) => {
    eventSystem.createEvent(player, eventType, location, date, description);
});

mp.events.add('event:book', (player, eventId) => {
    eventSystem.bookEvent(player, eventId);
});

mp.events.add('event:start', (player, eventId) => {
    eventSystem.startEvent(player, eventId);
});

mp.events.add('event:addService', (player, eventId, serviceType) => {
    eventSystem.addService(player, eventId, serviceType);
});

mp.events.add('event:showEvents', (player, eventType) => {
    eventSystem.showEvents(player, eventType);
});

// Commands
mp.events.addCommand('event', (player, fullText, action, eventType, location, date) => {
    if (!action) {
        player.outputChatBox('Verwendung: /event [create|book|start|addservice|list] [Typ] [Location] [Datum]');
        player.outputChatBox('Verfügbare Typen: concert, festival, conference, exhibition, sports_event, wedding');
        player.outputChatBox('Verfügbare Locations: convention_center, stadium, theater, hotel, park, museum');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (eventType && location) {
                const eventDate = date ? new Date(date) : new Date(Date.now() + 24 * 60 * 60 * 1000);
                eventSystem.createEvent(player, eventType, location, eventDate, 'Event-Beschreibung');
            } else {
                player.outputChatBox('Event-Typ und Location erforderlich!');
            }
            break;
            
        case 'book':
            if (eventType) {
                eventSystem.bookEvent(player, eventType);
            } else {
                player.outputChatBox('Event-ID erforderlich!');
            }
            break;
            
        case 'start':
            if (eventType) {
                eventSystem.startEvent(player, eventType);
            } else {
                player.outputChatBox('Event-ID erforderlich!');
            }
            break;
            
        case 'addservice':
            if (eventType && location) {
                eventSystem.addService(player, eventType, location);
            } else {
                player.outputChatBox('Event-ID und Service-Typ erforderlich!');
            }
            break;
            
        case 'list':
            eventSystem.showEvents(player, eventType);
            break;
    }
});

// Event System initialisieren
eventSystem.init();

module.exports = eventSystem;
