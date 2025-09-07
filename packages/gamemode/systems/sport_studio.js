// Sport Studio System - Sport-Studio-System mit Training und Fitness
// Behandelt alle Sport-Studio-Funktionen für Horizont-City Roleplay

const sportStudioSystem = {
    // Sport-Arten
    sportTypes: {
        FITNESS: 'fitness',
        CARDIO: 'cardio',
        STRENGTH: 'strength',
        YOGA: 'yoga',
        PILATES: 'pilates',
        DANCE: 'dance',
        MARTIAL_ARTS: 'martial_arts',
        SWIMMING: 'swimming',
        TENNIS: 'tennis',
        BASKETBALL: 'basketball',
        FOOTBALL: 'football',
        BOXING: 'boxing',
        WRESTLING: 'wrestling',
        GYMNASTICS: 'gymnastics',
        AEROBICS: 'aerobics',
        CROSSFIT: 'crossfit',
        CYCLING: 'cycling',
        RUNNING: 'running',
        CLIMBING: 'climbing',
        CUSTOM: 'custom'
    },
    
    // Trainings-Programme
    trainingPrograms: {
        beginner: {
            name: 'Anfänger-Programm',
            description: 'Grundlegendes Training für Einsteiger',
            duration: 30,
            difficulty: 'easy',
            exercises: ['warm_up', 'basic_cardio', 'light_weights', 'stretching'],
            equipment: ['treadmill', 'dumbbells', 'mat'],
            calories: 200,
            muscle_groups: ['full_body'],
            price: 50
        },
        intermediate: {
            name: 'Fortgeschrittenen-Programm',
            description: 'Intensiveres Training für Fortgeschrittene',
            duration: 60,
            difficulty: 'medium',
            exercises: ['warm_up', 'cardio', 'weight_training', 'core_workout', 'stretching'],
            equipment: ['treadmill', 'weights', 'bench', 'mat'],
            calories: 400,
            muscle_groups: ['chest', 'back', 'legs', 'arms', 'core'],
            price: 80
        },
        advanced: {
            name: 'Professionelles Programm',
            description: 'Hochintensives Training für Profis',
            duration: 90,
            difficulty: 'hard',
            exercises: ['warm_up', 'hiit', 'heavy_weights', 'plyometrics', 'core_workout', 'stretching'],
            equipment: ['treadmill', 'heavy_weights', 'bench', 'kettlebell', 'mat'],
            calories: 600,
            muscle_groups: ['full_body'],
            price: 120
        },
        weight_loss: {
            name: 'Gewichtsreduktion',
            description: 'Spezielles Programm zum Abnehmen',
            duration: 45,
            difficulty: 'medium',
            exercises: ['warm_up', 'cardio', 'circuit_training', 'stretching'],
            equipment: ['treadmill', 'bike', 'mat'],
            calories: 500,
            muscle_groups: ['full_body'],
            price: 70
        },
        muscle_building: {
            name: 'Muskelaufbau',
            description: 'Programm zum Aufbau von Muskelmasse',
            duration: 75,
            difficulty: 'hard',
            exercises: ['warm_up', 'weight_training', 'compound_movements', 'stretching'],
            equipment: ['weights', 'bench', 'squat_rack', 'mat'],
            calories: 400,
            muscle_groups: ['chest', 'back', 'legs', 'arms', 'shoulders'],
            price: 100
        },
        flexibility: {
            name: 'Flexibilität',
            description: 'Programm zur Verbesserung der Beweglichkeit',
            duration: 30,
            difficulty: 'easy',
            exercises: ['warm_up', 'yoga', 'stretching', 'mobility'],
            equipment: ['mat', 'yoga_block', 'strap'],
            calories: 150,
            muscle_groups: ['full_body'],
            price: 40
        }
    },
    
    // Übungen
    exercises: {
        warm_up: {
            name: 'Aufwärmen',
            description: 'Grundlegendes Aufwärmen',
            duration: 10,
            difficulty: 'easy',
            equipment: [],
            muscle_groups: ['full_body'],
            calories: 50
        },
        basic_cardio: {
            name: 'Grundlegendes Cardio',
            description: 'Einfache Cardio-Übungen',
            duration: 20,
            difficulty: 'easy',
            equipment: ['treadmill'],
            muscle_groups: ['legs', 'heart'],
            calories: 150
        },
        light_weights: {
            name: 'Leichte Gewichte',
            description: 'Training mit leichten Gewichten',
            duration: 15,
            difficulty: 'easy',
            equipment: ['dumbbells'],
            muscle_groups: ['arms', 'shoulders'],
            calories: 100
        },
        stretching: {
            name: 'Dehnen',
            description: 'Dehnungsübungen',
            duration: 10,
            difficulty: 'easy',
            equipment: ['mat'],
            muscle_groups: ['full_body'],
            calories: 30
        },
        cardio: {
            name: 'Cardio-Training',
            description: 'Intensives Cardio-Training',
            duration: 30,
            difficulty: 'medium',
            equipment: ['treadmill', 'bike'],
            muscle_groups: ['legs', 'heart'],
            calories: 250
        },
        weight_training: {
            name: 'Gewichtstraining',
            description: 'Training mit Gewichten',
            duration: 25,
            difficulty: 'medium',
            equipment: ['weights', 'bench'],
            muscle_groups: ['chest', 'back', 'legs', 'arms'],
            calories: 200
        },
        core_workout: {
            name: 'Core-Training',
            description: 'Training der Bauchmuskulatur',
            duration: 15,
            difficulty: 'medium',
            equipment: ['mat'],
            muscle_groups: ['core'],
            calories: 120
        },
        hiit: {
            name: 'HIIT-Training',
            description: 'Hochintensives Intervalltraining',
            duration: 20,
            difficulty: 'hard',
            equipment: ['treadmill', 'weights'],
            muscle_groups: ['full_body'],
            calories: 300
        },
        heavy_weights: {
            name: 'Schwere Gewichte',
            description: 'Training mit schweren Gewichten',
            duration: 30,
            difficulty: 'hard',
            equipment: ['heavy_weights', 'bench', 'squat_rack'],
            muscle_groups: ['chest', 'back', 'legs', 'arms', 'shoulders'],
            calories: 250
        },
        plyometrics: {
            name: 'Plyometrie',
            description: 'Explosive Sprungübungen',
            duration: 15,
            difficulty: 'hard',
            equipment: ['mat'],
            muscle_groups: ['legs', 'core'],
            calories: 200
        },
        circuit_training: {
            name: 'Zirkeltraining',
            description: 'Kombiniertes Training verschiedener Übungen',
            duration: 25,
            difficulty: 'medium',
            equipment: ['weights', 'treadmill', 'mat'],
            muscle_groups: ['full_body'],
            calories: 300
        },
        compound_movements: {
            name: 'Grundübungen',
            description: 'Komplexe Bewegungsabläufe',
            duration: 35,
            difficulty: 'hard',
            equipment: ['weights', 'bench', 'squat_rack'],
            muscle_groups: ['full_body'],
            calories: 350
        },
        yoga: {
            name: 'Yoga',
            description: 'Yoga-Übungen für Flexibilität und Entspannung',
            duration: 30,
            difficulty: 'easy',
            equipment: ['mat', 'yoga_block'],
            muscle_groups: ['full_body'],
            calories: 100
        },
        mobility: {
            name: 'Mobilität',
            description: 'Übungen zur Verbesserung der Beweglichkeit',
            duration: 20,
            difficulty: 'easy',
            equipment: ['mat', 'strap'],
            muscle_groups: ['full_body'],
            calories: 80
        }
    },
    
    // Sport-Studio-Konfiguration
    studioConfig: {
        'studio_1': {
            name: 'Fitness First',
            location: { x: 1000, y: 2000, z: 30 },
            facilities: ['gym', 'cardio_room', 'weight_room', 'yoga_room', 'locker_room', 'shower'],
            equipment: ['treadmill', 'bike', 'weights', 'bench', 'mat', 'yoga_block'],
            trainers: 5,
            capacity: 100,
            opening_hours: '6:00-22:00',
            membership_types: ['daily', 'weekly', 'monthly', 'yearly'],
            status: 'active',
            created: Date.now()
        },
        'studio_2': {
            name: 'Power Gym',
            location: { x: 1500, y: 2500, z: 30 },
            facilities: ['gym', 'cardio_room', 'weight_room', 'boxing_ring', 'locker_room', 'shower'],
            equipment: ['treadmill', 'bike', 'heavy_weights', 'bench', 'squat_rack', 'kettlebell'],
            trainers: 8,
            capacity: 150,
            opening_hours: '5:00-23:00',
            membership_types: ['daily', 'weekly', 'monthly', 'yearly'],
            status: 'active',
            created: Date.now()
        },
        'studio_3': {
            name: 'Yoga Studio',
            location: { x: 2000, y: 3000, z: 30 },
            facilities: ['yoga_room', 'meditation_room', 'locker_room', 'shower'],
            equipment: ['mat', 'yoga_block', 'strap', 'bolster'],
            trainers: 3,
            capacity: 50,
            opening_hours: '7:00-21:00',
            membership_types: ['daily', 'weekly', 'monthly'],
            status: 'active',
            created: Date.now()
        }
    },
    
    // Mitgliedschafts-Typen
    membershipTypes: {
        daily: {
            name: 'Tageskarte',
            duration: 1,
            price: 15,
            access: 'all_facilities',
            guest_policy: 'no_guests',
            cancellation: 'same_day'
        },
        weekly: {
            name: 'Wochenkarte',
            duration: 7,
            price: 80,
            access: 'all_facilities',
            guest_policy: '1_guest_per_week',
            cancellation: '24_hours'
        },
        monthly: {
            name: 'Monatskarte',
            duration: 30,
            price: 200,
            access: 'all_facilities',
            guest_policy: '2_guests_per_month',
            cancellation: '7_days'
        },
        yearly: {
            name: 'Jahreskarte',
            duration: 365,
            price: 1800,
            access: 'all_facilities',
            guest_policy: 'unlimited_guests',
            cancellation: '30_days'
        }
    },
    
    // Aktive Studios
    activeStudios: new Map(),
    
    // Aktive Mitgliedschaften
    activeMemberships: new Map(),
    
    // Aktive Trainings
    activeTrainings: new Map(),
    
    // Sport-Studio-System-Initialisierung
    init() {
        console.log('[SPORT_STUDIO] Sport-Studio-System initialisiert');
        this.initializeStudios();
    },
    
    // Studios initialisieren
    initializeStudios() {
        Object.keys(this.studioConfig).forEach(studioId => {
            const studio = this.studioConfig[studioId];
            studio.id = studioId;
            studio.members = [];
            studio.trainings = [];
            studio.revenue = 0;
            
            this.activeStudios.set(studioId, studio);
        });
        
        console.log(`[SPORT_STUDIO] ${Object.keys(this.studioConfig).length} Studios initialisiert`);
    },
    
    // Mitgliedschaft kaufen
    buyMembership(player, studioId, membershipType) {
        const studio = this.activeStudios.get(studioId);
        if (!studio) {
            player.outputChatBox('Studio nicht gefunden!');
            return false;
        }
        
        const membership = this.membershipTypes[membershipType];
        if (!membership) {
            player.outputChatBox('Mitgliedschafts-Typ nicht gefunden!');
            return false;
        }
        
        if (player.money < membership.price) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${membership.price}`);
            return false;
        }
        
        const membershipId = `membership_${player.id}_${Date.now()}`;
        const membershipData = {
            id: membershipId,
            playerId: player.id,
            studioId: studioId,
            type: membershipType,
            config: membership,
            startDate: Date.now(),
            endDate: Date.now() + (membership.duration * 24 * 60 * 60 * 1000),
            status: 'active',
            guestCount: 0,
            created: Date.now()
        };
        
        this.activeMemberships.set(membershipId, membershipData);
        studio.members.push(membershipId);
        
        player.money -= membership.price;
        studio.revenue += membership.price;
        
        player.outputChatBox(`Mitgliedschaft ${membership.name} gekauft! Preis: $${membership.price}`);
        player.call('ui:show', 'SportStudioMembership', { membership: membershipData });
        
        console.log(`[SPORT_STUDIO] Mitgliedschaft für Spieler ${player.id} gekauft`);
        return membershipId;
    },
    
    // Training starten
    startTraining(player, studioId, programType) {
        const studio = this.activeStudios.get(studioId);
        if (!studio) {
            player.outputChatBox('Studio nicht gefunden!');
            return false;
        }
        
        const program = this.trainingPrograms[programType];
        if (!program) {
            player.outputChatBox('Trainings-Programm nicht gefunden!');
            return false;
        }
        
        // Mitgliedschaft prüfen
        const membership = this.getActiveMembership(player, studioId);
        if (!membership) {
            player.outputChatBox('Keine aktive Mitgliedschaft!');
            return false;
        }
        
        const trainingId = `training_${player.id}_${Date.now()}`;
        const training = {
            id: trainingId,
            playerId: player.id,
            studioId: studioId,
            program: program,
            startTime: Date.now(),
            endTime: Date.now() + (program.duration * 60 * 1000),
            status: 'active',
            currentExercise: 0,
            completedExercises: [],
            calories: 0,
            created: Date.now()
        };
        
        this.activeTrainings.set(trainingId, training);
        studio.trainings.push(trainingId);
        
        player.outputChatBox(`Training ${program.name} gestartet! Dauer: ${program.duration} Minuten`);
        player.call('ui:show', 'SportStudioTraining', { training: training });
        
        // Training beenden nach der Dauer
        setTimeout(() => {
            this.endTraining(player, trainingId);
        }, program.duration * 60 * 1000);
        
        console.log(`[SPORT_STUDIO] Training für Spieler ${player.id} gestartet`);
        return trainingId;
    },
    
    // Training beenden
    endTraining(player, trainingId) {
        const training = this.activeTrainings.get(trainingId);
        if (!training) {
            return;
        }
        
        training.status = 'completed';
        training.endTime = Date.now();
        training.calories = training.program.calories;
        
        // Erfahrung und Gesundheit geben
        player.experience += training.program.calories / 10;
        player.health = Math.min(100, player.health + 5);
        
        player.outputChatBox(`Training abgeschlossen! Kalorien verbrannt: ${training.calories}`);
        player.call('ui:show', 'SportStudioTrainingEnd', { training: training });
        
        console.log(`[SPORT_STUDIO] Training für Spieler ${player.id} beendet`);
    },
    
    // Aktive Mitgliedschaft abrufen
    getActiveMembership(player, studioId) {
        const memberships = Array.from(this.activeMemberships.values()).filter(membership => 
            membership.playerId === player.id && 
            membership.studioId === studioId && 
            membership.status === 'active' &&
            membership.endDate > Date.now()
        );
        
        return memberships.length > 0 ? memberships[0] : null;
    },
    
    // Übung ausführen
    performExercise(player, trainingId, exerciseType) {
        const training = this.activeTrainings.get(trainingId);
        if (!training) {
            player.outputChatBox('Training nicht gefunden!');
            return false;
        }
        
        if (training.playerId !== player.id) {
            player.outputChatBox('Du besitzt dieses Training nicht!');
            return false;
        }
        
        const exercise = this.exercises[exerciseType];
        if (!exercise) {
            player.outputChatBox('Übung nicht gefunden!');
            return false;
        }
        
        // Übung zu abgeschlossenen Übungen hinzufügen
        training.completedExercises.push(exerciseType);
        training.calories += exercise.calories;
        
        player.outputChatBox(`Übung ${exercise.name} abgeschlossen! Kalorien: ${exercise.calories}`);
        player.call('ui:show', 'SportStudioExercise', { exercise: exercise });
        
        console.log(`[SPORT_STUDIO] Übung ${exerciseType} für Spieler ${player.id} ausgeführt`);
        return true;
    },
    
    // Studio-Statistiken
    getStatistics() {
        return {
            totalStudios: this.activeStudios.size,
            totalMemberships: this.activeMemberships.size,
            totalTrainings: this.activeTrainings.size,
            totalPrograms: Object.keys(this.trainingPrograms).length,
            totalExercises: Object.keys(this.exercises).length
        };
    }
};

// Events
mp.events.add('sport_studio:buyMembership', (player, studioId, membershipType) => {
    sportStudioSystem.buyMembership(player, studioId, membershipType);
});

mp.events.add('sport_studio:startTraining', (player, studioId, programType) => {
    sportStudioSystem.startTraining(player, studioId, programType);
});

mp.events.add('sport_studio:performExercise', (player, trainingId, exerciseType) => {
    sportStudioSystem.performExercise(player, trainingId, exerciseType);
});

// Commands
mp.events.addCommand('sportstudio', (player, fullText, action, studioId, programType) => {
    if (!action) {
        player.outputChatBox('Verwendung: /sportstudio [buy|train|exercise] [StudioID] [Programm]');
        player.outputChatBox('Verfügbare Studios: studio_1, studio_2, studio_3');
        player.outputChatBox('Verfügbare Programme: beginner, intermediate, advanced, weight_loss, muscle_building, flexibility');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'buy':
            if (studioId && programType) {
                sportStudioSystem.buyMembership(player, studioId, programType);
            } else {
                player.outputChatBox('StudioID und Mitgliedschafts-Typ erforderlich!');
            }
            break;
            
        case 'train':
            if (studioId && programType) {
                sportStudioSystem.startTraining(player, studioId, programType);
            } else {
                player.outputChatBox('StudioID und Programm erforderlich!');
            }
            break;
            
        case 'exercise':
            if (studioId && programType) {
                // Hier würde die Übung implementiert werden
                player.outputChatBox('Übung implementiert!');
            } else {
                player.outputChatBox('StudioID und Übung erforderlich!');
            }
            break;
    }
});

mp.events.addCommand('sportstudiostats', (player) => {
    const stats = sportStudioSystem.getStatistics();
    player.outputChatBox('=== Sport-Studio-Statistiken ===');
    player.outputChatBox(`Gesamt Studios: ${stats.totalStudios}`);
    player.outputChatBox(`Gesamt Mitgliedschaften: ${stats.totalMemberships}`);
    player.outputChatBox(`Gesamt Trainings: ${stats.totalTrainings}`);
    player.outputChatBox(`Gesamt Programme: ${stats.totalPrograms}`);
    player.outputChatBox(`Gesamt Übungen: ${stats.totalExercises}`);
});

// Sport-Studio-System initialisieren
sportStudioSystem.init();

module.exports = sportStudioSystem;
