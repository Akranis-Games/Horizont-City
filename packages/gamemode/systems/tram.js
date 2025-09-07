// Tram System - Straßenbahn-System mit Routen und Fahrplänen
// Behandelt alle Straßenbahn-Funktionen für Horizont-City Roleplay

const tramSystem = {
    // Straßenbahn-Typen
    tramTypes: {
        CLASSIC: 'classic',
        MODERN: 'modern',
        LOW_FLOOR: 'low_floor',
        ARTICULATED: 'articulated',
        DOUBLE_DECKER: 'double_decker',
        LIGHT_RAIL: 'light_rail',
        MONORAIL: 'monorail',
        CABLE_CAR: 'cable_car',
        TROLLEY: 'trolley',
        HORSE_CAR: 'horse_car'
    },
    
    // Straßenbahn-Konfiguration
    tramConfig: {
        classic: {
            name: 'Klassische Straßenbahn',
            type: 'classic',
            capacity: 80,
            speed: 30, // km/h
            acceleration: 0.8, // m/s²
            deceleration: 1.2, // m/s²
            length: 20, // Meter
            width: 2.5, // Meter
            height: 3.5, // Meter
            weight: 25000, // kg
            power: 200, // kW
            voltage: 750, // V DC
            current: 300, // A
            efficiency: 0.85,
            maintenance: 0.9,
            reliability: 0.88,
            comfort: 0.7,
            accessibility: 0.5,
            cost: 2000000,
            lifespan: 30,
            description: 'Traditionelle Straßenbahn mit hoher Kapazität'
        },
        modern: {
            name: 'Moderne Straßenbahn',
            type: 'modern',
            capacity: 120,
            speed: 40, // km/h
            acceleration: 1.0, // m/s²
            deceleration: 1.5, // m/s²
            length: 25, // Meter
            width: 2.6, // Meter
            height: 3.6, // Meter
            weight: 30000, // kg
            power: 300, // kW
            voltage: 750, // V DC
            current: 400, // A
            efficiency: 0.90,
            maintenance: 0.95,
            reliability: 0.92,
            comfort: 0.85,
            accessibility: 0.8,
            cost: 3500000,
            lifespan: 35,
            description: 'Moderne Straßenbahn mit verbesserter Technologie'
        },
        low_floor: {
            name: 'Niederflurstraßenbahn',
            type: 'low_floor',
            capacity: 100,
            speed: 35, // km/h
            acceleration: 0.9, // m/s²
            deceleration: 1.3, // m/s²
            length: 22, // Meter
            width: 2.5, // Meter
            height: 3.4, // Meter
            weight: 28000, // kg
            power: 250, // kW
            voltage: 750, // V DC
            current: 350, // A
            efficiency: 0.88,
            maintenance: 0.92,
            reliability: 0.90,
            comfort: 0.8,
            accessibility: 0.95,
            cost: 3000000,
            lifespan: 32,
            description: 'Barrierefreie Straßenbahn mit niedrigem Einstieg'
        },
        articulated: {
            name: 'Gelenkstraßenbahn',
            type: 'articulated',
            capacity: 150,
            speed: 35, // km/h
            acceleration: 0.8, // m/s²
            deceleration: 1.2, // m/s²
            length: 30, // Meter
            width: 2.6, // Meter
            height: 3.6, // Meter
            weight: 40000, // kg
            power: 400, // kW
            voltage: 750, // V DC
            current: 500, // A
            efficiency: 0.87,
            maintenance: 0.88,
            reliability: 0.85,
            comfort: 0.75,
            accessibility: 0.7,
            cost: 4500000,
            lifespan: 30,
            description: 'Große Gelenkstraßenbahn mit hoher Kapazität'
        },
        double_decker: {
            name: 'Doppelstockstraßenbahn',
            type: 'double_decker',
            capacity: 200,
            speed: 25, // km/h
            acceleration: 0.6, // m/s²
            deceleration: 1.0, // m/s²
            length: 20, // Meter
            width: 2.5, // Meter
            height: 4.5, // Meter
            weight: 35000, // kg
            power: 350, // kW
            voltage: 750, // V DC
            current: 450, // A
            efficiency: 0.82,
            maintenance: 0.85,
            reliability: 0.80,
            comfort: 0.9,
            accessibility: 0.6,
            cost: 5000000,
            lifespan: 25,
            description: 'Doppelstockstraßenbahn mit maximaler Kapazität'
        },
        light_rail: {
            name: 'Stadtbahn',
            type: 'light_rail',
            capacity: 180,
            speed: 50, // km/h
            acceleration: 1.2, // m/s²
            deceleration: 1.8, // m/s²
            length: 35, // Meter
            width: 2.8, // Meter
            height: 3.8, // Meter
            weight: 45000, // kg
            power: 500, // kW
            voltage: 750, // V DC
            current: 650, // A
            efficiency: 0.92,
            maintenance: 0.90,
            reliability: 0.88,
            comfort: 0.85,
            accessibility: 0.8,
            cost: 6000000,
            lifespan: 40,
            description: 'Moderne Stadtbahn mit hoher Geschwindigkeit'
        },
        monorail: {
            name: 'Einschienenbahn',
            type: 'monorail',
            capacity: 160,
            speed: 60, // km/h
            acceleration: 1.5, // m/s²
            deceleration: 2.0, // m/s²
            length: 30, // Meter
            width: 3.0, // Meter
            height: 4.0, // Meter
            weight: 50000, // kg
            power: 600, // kW
            voltage: 750, // V DC
            current: 800, // A
            efficiency: 0.90,
            maintenance: 0.85,
            reliability: 0.82,
            comfort: 0.8,
            accessibility: 0.7,
            cost: 8000000,
            lifespan: 35,
            description: 'Futuristische Einschienenbahn'
        },
        cable_car: {
            name: 'Seilbahn',
            type: 'cable_car',
            capacity: 40,
            speed: 15, // km/h
            acceleration: 0.5, // m/s²
            deceleration: 0.8, // m/s²
            length: 15, // Meter
            width: 2.0, // Meter
            height: 3.0, // Meter
            weight: 15000, // kg
            power: 100, // kW
            voltage: 400, // V AC
            current: 250, // A
            efficiency: 0.75,
            maintenance: 0.80,
            reliability: 0.85,
            comfort: 0.6,
            accessibility: 0.4,
            cost: 1000000,
            lifespan: 20,
            description: 'Traditionelle Seilbahn für steile Strecken'
        },
        trolley: {
            name: 'Oberleitungsbus',
            type: 'trolley',
            capacity: 60,
            speed: 25, // km/h
            acceleration: 0.7, // m/s²
            deceleration: 1.0, // m/s²
            length: 18, // Meter
            width: 2.5, // Meter
            height: 3.2, // Meter
            weight: 20000, // kg
            power: 150, // kW
            voltage: 600, // V DC
            current: 250, // A
            efficiency: 0.80,
            maintenance: 0.85,
            reliability: 0.82,
            comfort: 0.7,
            accessibility: 0.6,
            cost: 1500000,
            lifespan: 25,
            description: 'Oberleitungsbus mit Straßenbahn-Charakter'
        },
        horse_car: {
            name: 'Pferdebahn',
            type: 'horse_car',
            capacity: 30,
            speed: 10, // km/h
            acceleration: 0.3, // m/s²
            deceleration: 0.5, // m/s²
            length: 12, // Meter
            width: 2.0, // Meter
            height: 2.8, // Meter
            weight: 8000, // kg
            power: 0, // kW
            voltage: 0, // V
            current: 0, // A
            efficiency: 0.60,
            maintenance: 0.70,
            reliability: 0.75,
            comfort: 0.5,
            accessibility: 0.3,
            cost: 500000,
            lifespan: 15,
            description: 'Historische Pferdebahn für Touristen'
        }
    },
    
    // Haltestellen-Typen
    stopTypes: {
        SIMPLE: 'simple',
        SHELTER: 'shelter',
        PLATFORM: 'platform',
        TERMINAL: 'terminal',
        INTERCHANGE: 'interchange',
        ELEVATED: 'elevated',
        UNDERGROUND: 'underground',
        BRIDGE: 'bridge',
        TUNNEL: 'tunnel',
        CUT_AND_COVER: 'cut_and_cover'
    },
    
    // Haltestellen-Konfiguration
    stopConfig: {
        simple: {
            name: 'Einfache Haltestelle',
            type: 'simple',
            capacity: 20,
            facilities: ['bench'],
            accessibility: 0.3,
            cost: 50000,
            description: 'Grundlegende Haltestelle mit Bank'
        },
        shelter: {
            name: 'Haltestelle mit Wartehäuschen',
            type: 'shelter',
            capacity: 30,
            facilities: ['bench', 'shelter', 'lighting'],
            accessibility: 0.5,
            cost: 100000,
            description: 'Haltestelle mit Wartehäuschen und Beleuchtung'
        },
        platform: {
            name: 'Haltestelle mit Bahnsteig',
            type: 'platform',
            capacity: 50,
            facilities: ['bench', 'shelter', 'lighting', 'platform', 'signage'],
            accessibility: 0.7,
            cost: 200000,
            description: 'Haltestelle mit erhöhtem Bahnsteig'
        },
        terminal: {
            name: 'Endhaltestelle',
            type: 'terminal',
            capacity: 100,
            facilities: ['bench', 'shelter', 'lighting', 'platform', 'signage', 'ticket_office', 'toilet', 'shop'],
            accessibility: 0.9,
            cost: 500000,
            description: 'Große Endhaltestelle mit allen Einrichtungen'
        },
        interchange: {
            name: 'Umsteigehaltestelle',
            type: 'interchange',
            capacity: 150,
            facilities: ['bench', 'shelter', 'lighting', 'platform', 'signage', 'ticket_office', 'toilet', 'shop', 'escalator', 'elevator'],
            accessibility: 0.95,
            cost: 1000000,
            description: 'Große Umsteigehaltestelle mit mehreren Linien'
        }
    },
    
    // Linien-Konfiguration
    lineConfig: {
        'line_1': {
            name: 'Linie 1 - Hauptlinie',
            number: '1',
            color: '#FF0000',
            startStop: 'stop_1',
            endStop: 'stop_10',
            stops: ['stop_1', 'stop_2', 'stop_3', 'stop_4', 'stop_5', 'stop_6', 'stop_7', 'stop_8', 'stop_9', 'stop_10'],
            distance: 15.5, // km
            duration: 45, // Minuten
            frequency: 5, // Minuten
            trams: 8,
            status: 'active',
            created: Date.now()
        },
        'line_2': {
            name: 'Linie 2 - Ringlinie',
            number: '2',
            color: '#00FF00',
            startStop: 'stop_11',
            endStop: 'stop_20',
            stops: ['stop_11', 'stop_12', 'stop_13', 'stop_14', 'stop_15', 'stop_16', 'stop_17', 'stop_18', 'stop_19', 'stop_20'],
            distance: 12.0, // km
            duration: 35, // Minuten
            frequency: 7, // Minuten
            trams: 6,
            status: 'active',
            created: Date.now()
        },
        'line_3': {
            name: 'Linie 3 - Expresslinie',
            number: '3',
            color: '#0000FF',
            startStop: 'stop_21',
            endStop: 'stop_25',
            stops: ['stop_21', 'stop_23', 'stop_25'],
            distance: 8.0, // km
            duration: 20, // Minuten
            frequency: 10, // Minuten
            trams: 4,
            status: 'active',
            created: Date.now()
        }
    },
    
    // Haltestellen-Standorte
    stopLocations: {
        'stop_1': { name: 'Hauptbahnhof', location: { x: 1000, y: 2000, z: 30 }, type: 'terminal' },
        'stop_2': { name: 'Stadtmitte', location: { x: 1200, y: 2200, z: 30 }, type: 'platform' },
        'stop_3': { name: 'Universität', location: { x: 1400, y: 2400, z: 30 }, type: 'platform' },
        'stop_4': { name: 'Krankenhaus', location: { x: 1600, y: 2600, z: 30 }, type: 'shelter' },
        'stop_5': { name: 'Einkaufszentrum', location: { x: 1800, y: 2800, z: 30 }, type: 'platform' },
        'stop_6': { name: 'Flughafen', location: { x: 2000, y: 3000, z: 30 }, type: 'terminal' },
        'stop_7': { name: 'Industriegebiet', location: { x: 2200, y: 3200, z: 30 }, type: 'simple' },
        'stop_8': { name: 'Wohngebiet Nord', location: { x: 2400, y: 3400, z: 30 }, type: 'shelter' },
        'stop_9': { name: 'Park', location: { x: 2600, y: 3600, z: 30 }, type: 'simple' },
        'stop_10': { name: 'Stadtrand', location: { x: 2800, y: 3800, z: 30 }, type: 'terminal' }
    },
    
    // Aktive Straßenbahnen
    activeTrams: new Map(),
    
    // Aktive Linien
    activeLines: new Map(),
    
    // Aktive Haltestellen
    activeStops: new Map(),
    
    // Fahrgäste
    passengers: new Map(),
    
    // Tickets
    tickets: new Map(),
    
    // Straßenbahn-System-Initialisierung
    init() {
        console.log('[TRAM] Straßenbahn-System initialisiert');
        this.initializeStops();
        this.initializeLines();
        this.startTramService();
    },
    
    // Haltestellen initialisieren
    initializeStops() {
        Object.keys(this.stopLocations).forEach(stopId => {
            const stop = this.stopLocations[stopId];
            const config = this.stopConfig[stop.type];
            
            stop.id = stopId;
            stop.config = config;
            stop.passengers = [];
            stop.waitingTime = 0;
            stop.departures = [];
            stop.arrivals = [];
            
            this.activeStops.set(stopId, stop);
        });
        
        console.log(`[TRAM] ${Object.keys(this.stopLocations).length} Haltestellen initialisiert`);
    },
    
    // Linien initialisieren
    initializeLines() {
        Object.keys(this.lineConfig).forEach(lineId => {
            const line = this.lineConfig[lineId];
            line.id = lineId;
            line.trams = [];
            line.schedule = this.generateSchedule(line);
            line.delays = 0;
            line.punctuality = 0.95;
            
            this.activeLines.set(lineId, line);
        });
        
        console.log(`[TRAM] ${Object.keys(this.lineConfig).length} Linien initialisiert`);
    },
    
    // Fahrplan generieren
    generateSchedule(line) {
        const schedule = [];
        const startTime = 6 * 60; // 6:00 Uhr in Minuten
        const endTime = 24 * 60; // 24:00 Uhr in Minuten
        const frequency = line.frequency;
        
        for (let time = startTime; time < endTime; time += frequency) {
            const departure = {
                time: time,
                stop: line.startStop,
                direction: 'forward',
                tram: null
            };
            schedule.push(departure);
        }
        
        return schedule;
    },
    
    // Straßenbahn-Service starten
    startTramService() {
        setInterval(() => {
            this.updateTramService();
        }, 60000); // Alle 60 Sekunden
        
        console.log('[TRAM] Straßenbahn-Service gestartet');
    },
    
    // Straßenbahn-Service aktualisieren
    updateTramService() {
        this.activeLines.forEach(line => {
            this.updateLine(line);
        });
        
        this.activeTrams.forEach(tram => {
            this.updateTram(tram);
        });
    },
    
    // Linie aktualisieren
    updateLine(line) {
        const currentTime = new Date();
        const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
        
        // Fahrplan abarbeiten
        line.schedule.forEach(departure => {
            if (departure.time <= currentMinutes && !departure.tram) {
                this.departTram(line, departure);
            }
        });
        
        // Verspätungen berechnen
        line.delays = this.calculateDelays(line);
        line.punctuality = 1 - (line.delays / line.schedule.length);
    },
    
    // Straßenbahn abfahren lassen
    departTram(line, departure) {
        const tramId = `tram_${line.id}_${Date.now()}`;
        const tram = {
            id: tramId,
            lineId: line.id,
            line: line,
            currentStop: departure.stop,
            nextStop: this.getNextStop(line, departure.stop),
            direction: departure.direction,
            passengers: [],
            capacity: 100,
            speed: 0,
            status: 'boarding',
            departureTime: Date.now(),
            arrivalTime: null,
            delay: 0,
            created: Date.now()
        };
        
        this.activeTrams.set(tramId, tram);
        line.trams.push(tramId);
        departure.tram = tramId;
        
        console.log(`[TRAM] Straßenbahn ${tramId} fährt von ${departure.stop} ab`);
    },
    
    // Nächste Haltestelle ermitteln
    getNextStop(line, currentStop) {
        const stops = line.stops;
        const currentIndex = stops.indexOf(currentStop);
        
        if (currentIndex === -1) return null;
        
        const nextIndex = (currentIndex + 1) % stops.length;
        return stops[nextIndex];
    },
    
    // Straßenbahn aktualisieren
    updateTram(tram) {
        if (tram.status === 'boarding') {
            // Einsteigen
            this.boardPassengers(tram);
            tram.status = 'traveling';
        } else if (tram.status === 'traveling') {
            // Fahren
            this.moveTram(tram);
        } else if (tram.status === 'arriving') {
            // Ankommen
            this.arriveTram(tram);
        }
    },
    
    // Fahrgäste einsteigen lassen
    boardPassengers(tram) {
        const stop = this.activeStops.get(tram.currentStop);
        if (!stop) return;
        
        const availableSeats = tram.capacity - tram.passengers.length;
        const boardingPassengers = stop.passengers.slice(0, availableSeats);
        
        boardingPassengers.forEach(passenger => {
            tram.passengers.push(passenger);
            stop.passengers.splice(stop.passengers.indexOf(passenger), 1);
        });
        
        console.log(`[TRAM] ${boardingPassengers.length} Fahrgäste in ${tram.id} eingestiegen`);
    },
    
    // Straßenbahn bewegen
    moveTram(tram) {
        const nextStop = this.activeStops.get(tram.nextStop);
        if (!nextStop) return;
        
        // Vereinfachte Bewegung
        tram.speed = 30; // km/h
        tram.status = 'arriving';
        tram.arrivalTime = Date.now() + (5 * 60 * 1000); // 5 Minuten Fahrtzeit
    },
    
    // Straßenbahn ankommen lassen
    arriveTram(tram) {
        if (tram.arrivalTime && Date.now() >= tram.arrivalTime) {
            const stop = this.activeStops.get(tram.nextStop);
            if (stop) {
                // Fahrgäste aussteigen lassen
                this.alightPassengers(tram, stop);
                
                // Nächste Haltestelle setzen
                tram.currentStop = tram.nextStop;
                tram.nextStop = this.getNextStop(tram.line, tram.nextStop);
                
                if (tram.nextStop === tram.line.startStop) {
                    // Linie beendet
                    this.endTramService(tram);
                } else {
                    tram.status = 'boarding';
                }
            }
        }
    },
    
    // Fahrgäste aussteigen lassen
    alightPassengers(tram, stop) {
        const alightingPassengers = tram.passengers.filter(passenger => 
            passenger.destination === stop.id
        );
        
        alightingPassengers.forEach(passenger => {
            tram.passengers.splice(tram.passengers.indexOf(passenger), 1);
            stop.passengers.push(passenger);
        });
        
        console.log(`[TRAM] ${alightingPassengers.length} Fahrgäste aus ${tram.id} ausgestiegen`);
    },
    
    // Straßenbahn-Service beenden
    endTramService(tram) {
        const line = this.activeLines.get(tram.lineId);
        if (line) {
            line.trams.splice(line.trams.indexOf(tram.id), 1);
        }
        
        this.activeTrams.delete(tram.id);
        console.log(`[TRAM] Straßenbahn ${tram.id} beendet Service`);
    },
    
    // Verspätungen berechnen
    calculateDelays(line) {
        let delays = 0;
        
        line.trams.forEach(tramId => {
            const tram = this.activeTrams.get(tramId);
            if (tram && tram.delay > 0) {
                delays++;
            }
        });
        
        return delays;
    },
    
    // Ticket kaufen
    buyTicket(player, fromStop, toStop, ticketType = 'single') {
        const from = this.activeStops.get(fromStop);
        const to = this.activeStops.get(toStop);
        
        if (!from || !to) {
            player.outputChatBox('Haltestelle nicht gefunden!');
            return false;
        }
        
        const distance = this.calculateDistance(from.location, to.location);
        const price = this.calculateTicketPrice(distance, ticketType);
        
        if (player.money < price) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${price}`);
            return false;
        }
        
        const ticketId = `ticket_${player.id}_${Date.now()}`;
        const ticket = {
            id: ticketId,
            playerId: player.id,
            fromStop: fromStop,
            toStop: toStop,
            ticketType: ticketType,
            price: price,
            validFrom: Date.now(),
            validUntil: Date.now() + (2 * 60 * 60 * 1000), // 2 Stunden
            status: 'valid',
            created: Date.now()
        };
        
        this.tickets.set(ticketId, ticket);
        
        player.money -= price;
        player.outputChatBox(`Ticket gekauft! Preis: $${price}, Gültig bis: ${new Date(ticket.validUntil).toLocaleTimeString()}`);
        player.call('ui:show', 'TramTicket', { ticket: ticket });
        
        console.log(`[TRAM] Ticket für Spieler ${player.id} gekauft`);
        return ticketId;
    },
    
    // Entfernung berechnen
    calculateDistance(pos1, pos2) {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz) / 1000; // in km
    },
    
    // Ticket-Preis berechnen
    calculateTicketPrice(distance, ticketType) {
        const basePrice = 2.0; // $2 Grundpreis
        const distancePrice = distance * 0.5; // $0.5 pro km
        const totalPrice = basePrice + distancePrice;
        
        switch (ticketType) {
            case 'single':
                return totalPrice;
            case 'day':
                return totalPrice * 3;
            case 'week':
                return totalPrice * 10;
            case 'month':
                return totalPrice * 30;
            default:
                return totalPrice;
        }
    },
    
    // Straßenbahn besteigen
    boardTram(player, tramId) {
        const tram = this.activeTrams.get(tramId);
        if (!tram) {
            player.outputChatBox('Straßenbahn nicht gefunden!');
            return false;
        }
        
        if (tram.passengers.length >= tram.capacity) {
            player.outputChatBox('Straßenbahn ist voll!');
            return false;
        }
        
        // Ticket prüfen
        const validTicket = this.getValidTicket(player);
        if (!validTicket) {
            player.outputChatBox('Kein gültiges Ticket!');
            return false;
        }
        
        const passenger = {
            playerId: player.id,
            destination: validTicket.toStop,
            ticketId: validTicket.id,
            boardTime: Date.now()
        };
        
        tram.passengers.push(passenger);
        
        player.outputChatBox('Du bist in die Straßenbahn eingestiegen!');
        player.call('ui:show', 'TramBoarded', { tram: tram });
        
        console.log(`[TRAM] Spieler ${player.id} in ${tramId} eingestiegen`);
        return true;
    },
    
    // Gültiges Ticket finden
    getValidTicket(player) {
        const playerTickets = Array.from(this.tickets.values()).filter(ticket => 
            ticket.playerId === player.id && 
            ticket.status === 'valid' && 
            ticket.validUntil > Date.now()
        );
        
        return playerTickets.length > 0 ? playerTickets[0] : null;
    },
    
    // Straßenbahn-System-Statistiken
    getStatistics() {
        return {
            totalTrams: this.activeTrams.size,
            totalLines: this.activeLines.size,
            totalStops: this.activeStops.size,
            totalPassengers: Array.from(this.activeTrams.values()).reduce((sum, tram) => sum + tram.passengers.length, 0),
            totalTickets: this.tickets.size
        };
    }
};

// Events
mp.events.add('tram:buyTicket', (player, fromStop, toStop, ticketType) => {
    tramSystem.buyTicket(player, fromStop, toStop, ticketType);
});

mp.events.add('tram:boardTram', (player, tramId) => {
    tramSystem.boardTram(player, tramId);
});

// Commands
mp.events.addCommand('tram', (player, fullText, action, fromStop, toStop) => {
    if (!action) {
        player.outputChatBox('Verwendung: /tram [buy|board|info|stats] [Von] [Nach]');
        player.outputChatBox('Verfügbare Haltestellen: stop_1, stop_2, stop_3, stop_4, stop_5');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'buy':
            if (fromStop && toStop) {
                tramSystem.buyTicket(player, fromStop, toStop);
            } else {
                player.outputChatBox('Von- und Nach-Haltestelle erforderlich!');
            }
            break;
            
        case 'board':
            if (fromStop) {
                tramSystem.boardTram(player, fromStop);
            } else {
                player.outputChatBox('Straßenbahn-ID erforderlich!');
            }
            break;
            
        case 'info':
            player.outputChatBox('=== Straßenbahn-Informationen ===');
            player.outputChatBox('Verfügbare Linien: Linie 1, Linie 2, Linie 3');
            player.outputChatBox('Ticket-Typen: single, day, week, month');
            break;
            
        case 'stats':
            const stats = tramSystem.getStatistics();
            player.outputChatBox('=== Straßenbahn-Statistiken ===');
            player.outputChatBox(`Gesamt Straßenbahnen: ${stats.totalTrams}`);
            player.outputChatBox(`Gesamt Linien: ${stats.totalLines}`);
            player.outputChatBox(`Gesamt Haltestellen: ${stats.totalStops}`);
            player.outputChatBox(`Gesamt Fahrgäste: ${stats.totalPassengers}`);
            player.outputChatBox(`Gesamt Tickets: ${stats.totalTickets}`);
            break;
    }
});

// Straßenbahn-System initialisieren
tramSystem.init();

module.exports = tramSystem;
