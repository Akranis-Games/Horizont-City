// Family Life System - Familienleben-System mit Beziehungen und Kindern
// Behandelt alle Familien-Funktionen für Horizont-City Roleplay

const familyLifeSystem = {
    // Familien-Beziehungen
    familyRelationships: {
        PARENT: 'parent',
        CHILD: 'child',
        SIBLING: 'sibling',
        GRANDPARENT: 'grandparent',
        GRANDCHILD: 'grandchild',
        AUNT: 'aunt',
        UNCLE: 'uncle',
        NEPHEW: 'nephew',
        NIECE: 'niece',
        COUSIN: 'cousin',
        SPOUSE: 'spouse',
        STEP_PARENT: 'step_parent',
        STEP_CHILD: 'step_child',
        ADOPTIVE_PARENT: 'adoptive_parent',
        ADOPTED_CHILD: 'adopted_child',
        GUARDIAN: 'guardian',
        WARD: 'ward'
    },
    
    // Familien-Status
    familyStatus: {
        NUCLEAR: 'nuclear', // Vater, Mutter, Kinder
        SINGLE_PARENT: 'single_parent', // Ein Elternteil mit Kindern
        EXTENDED: 'extended', // Großeltern, Eltern, Kinder
        BLENDED: 'blended', // Stieffamilie
        ADOPTIVE: 'adoptive', // Adoptivfamilie
        FOSTER: 'foster', // Pflegefamilie
        CHILD_FREE: 'child_free', // Ehepaar ohne Kinder
        DIVORCED: 'divorced', // Geschiedene Familie
        WIDOWED: 'widowed', // Witwenfamilie
        SEPARATED: 'separated' // Getrennt lebende Familie
    },
    
    // Kinder-Entwicklungsstufen
    childStages: {
        INFANT: { name: 'Säugling', ageRange: [0, 2], needs: ['feeding', 'sleeping', 'care'] },
        TODDLER: { name: 'Kleinkind', ageRange: [2, 5], needs: ['playing', 'learning', 'socializing'] },
        CHILD: { name: 'Kind', ageRange: [5, 12], needs: ['school', 'friends', 'activities'] },
        TEENAGER: { name: 'Jugendlicher', ageRange: [12, 18], needs: ['independence', 'education', 'social_life'] },
        ADULT: { name: 'Erwachsener', ageRange: [18, 999], needs: ['career', 'relationships', 'independence'] }
    },
    
    // Familien-Aktivitäten
    familyActivities: {
        DINNER: 'dinner',
        MOVIE_NIGHT: 'movie_night',
        GAME_NIGHT: 'game_night',
        VACATION: 'vacation',
        SPORTS: 'sports',
        SHOPPING: 'shopping',
        COOKING: 'cooking',
        GARDENING: 'gardening',
        READING: 'reading',
        MUSIC: 'music',
        ART: 'art',
        TRAVEL: 'travel',
        CELEBRATION: 'celebration',
        RELIGIOUS: 'religious',
        VOLUNTEER: 'volunteer'
    },
    
    // Familien-Konfiguration
    familyConfig: {
        maxChildren: 5,
        minMarriageAge: 18,
        minChildAge: 16,
        maxChildAge: 50,
        familySizeLimit: 10,
        adoptionFee: 5000,
        childSupportAmount: 500,
        familyTherapyCost: 200
    },
    
    // Familien
    families: new Map(),
    
    // Familien-Mitglieder
    familyMembers: new Map(),
    
    // Kinder
    children: new Map(),
    
    // Familien-Aktivitäten
    familyActivities: new Map(),
    
    // Familien-Statistiken
    familyStats: {
        totalFamilies: 0,
        totalChildren: 0,
        totalMarriages: 0,
        totalDivorces: 0,
        totalAdoptions: 0,
        averageFamilySize: 0,
        happyFamilies: 0
    },
    
    // Family Life System-Initialisierung
    init() {
        console.log('[FAMILY_LIFE] Familienleben-System initialisiert');
        this.initializeFamilyDatabase();
    },
    
    // Familien-Datenbank initialisieren
    initializeFamilyDatabase() {
        // Hier würden bestehende Familien aus der Datenbank geladen
        console.log('[FAMILY_LIFE] Familien-Datenbank initialisiert');
    },
    
    // Familie gründen
    createFamily(player1, player2, familyData) {
        if (player1.relationshipStatus !== 'single' || player2.relationshipStatus !== 'single') {
            player1.outputChatBox('Beide Partner müssen ledig sein!');
            return false;
        }
        
        if (player1.age < this.familyConfig.minMarriageAge || player2.age < this.familyConfig.minMarriageAge) {
            player1.outputChatBox(`Mindestalter für Heirat: ${this.familyConfig.minMarriageAge} Jahre!`);
            return false;
        }
        
        const familyId = `family_${player1.id}_${player2.id}_${Date.now()}`;
        const family = {
            id: familyId,
            player1Id: player1.id,
            player1Name: player1.name,
            player2Id: player2.id,
            player2Name: player2.name,
            familyName: familyData.familyName || `${player1.name} Family`,
            status: 'nuclear',
            children: [],
            happiness: 100,
            income: (player1.salary || 0) + (player2.salary || 0),
            expenses: 0,
            savings: 0,
            created: Date.now()
        };
        
        this.families.set(familyId, family);
        
        // Spieler-Status aktualisieren
        player1.familyId = familyId;
        player1.relationshipStatus = 'married';
        player1.spouse = player2.id;
        player1.familyRole = 'parent';
        
        player2.familyId = familyId;
        player2.relationshipStatus = 'married';
        player2.spouse = player1.id;
        player2.familyRole = 'parent';
        
        player1.outputChatBox(`Familie "${family.familyName}" gegründet!`);
        player2.outputChatBox(`Familie "${family.familyName}" gegründet!`);
        
        player1.call('ui:show', 'FamilyCreated', { family: family });
        player2.call('ui:show', 'FamilyCreated', { family: family });
        
        this.familyStats.totalFamilies++;
        this.familyStats.totalMarriages++;
        
        console.log(`[FAMILY_LIFE] Familie für ${player1.id} und ${player2.id} gegründet`);
        return familyId;
    },
    
    // Kind adoptieren
    adoptChild(player, childData) {
        if (!player.familyId) {
            player.outputChatBox('Du musst einer Familie angehören!');
            return false;
        }
        
        const family = this.families.get(player.familyId);
        if (!family) {
            player.outputChatBox('Familie nicht gefunden!');
            return false;
        }
        
        if (family.children.length >= this.familyConfig.maxChildren) {
            player.outputChatBox(`Maximale Anzahl Kinder erreicht: ${this.familyConfig.maxChildren}!`);
            return false;
        }
        
        if (player.money < this.familyConfig.adoptionFee) {
            player.outputChatBox(`Nicht genug Geld! Benötigt: $${this.familyConfig.adoptionFee}`);
            return false;
        }
        
        const childId = `child_${player.familyId}_${Date.now()}`;
        const child = {
            id: childId,
            familyId: player.familyId,
            name: childData.name || 'Adopted Child',
            age: childData.age || 5,
            gender: childData.gender || 'male',
            stage: this.getChildStage(childData.age || 5),
            happiness: 100,
            health: 100,
            education: 0,
            skills: [],
            needs: this.getChildNeeds(childData.age || 5),
            adoptedBy: player.id,
            adoptionDate: Date.now(),
            created: Date.now()
        };
        
        this.children.set(childId, child);
        family.children.push(childId);
        
        player.money -= this.familyConfig.adoptionFee;
        family.expenses += this.familyConfig.adoptionFee;
        
        player.outputChatBox(`Kind "${child.name}" adoptiert!`);
        player.call('ui:show', 'ChildAdopted', { child: child });
        
        this.familyStats.totalChildren++;
        this.familyStats.totalAdoptions++;
        
        console.log(`[FAMILY_LIFE] Kind ${childId} von Familie ${player.familyId} adoptiert`);
        return childId;
    },
    
    // Kindes-Entwicklungsstufe ermitteln
    getChildStage(age) {
        for (const [stageName, stage] of Object.entries(this.childStages)) {
            if (age >= stage.ageRange[0] && age < stage.ageRange[1]) {
                return stageName;
            }
        }
        return 'ADULT';
    },
    
    // Kindes-Bedürfnisse ermitteln
    getChildNeeds(age) {
        const stage = this.getChildStage(age);
        return this.childStages[stage].needs || [];
    },
    
    // Familien-Aktivität planen
    planFamilyActivity(player, activityType, activityData) {
        if (!player.familyId) {
            player.outputChatBox('Du musst einer Familie angehören!');
            return false;
        }
        
        const family = this.families.get(player.familyId);
        if (!family) {
            player.outputChatBox('Familie nicht gefunden!');
            return false;
        }
        
        const activityId = `activity_${player.familyId}_${Date.now()}`;
        const activity = {
            id: activityId,
            familyId: player.familyId,
            activityType: activityType,
            organizer: player.id,
            participants: [player.id],
            date: activityData.date || Date.now(),
            location: activityData.location || 'Home',
            cost: activityData.cost || 0,
            description: activityData.description || 'Family Activity',
            status: 'planned',
            created: Date.now()
        };
        
        this.familyActivities.set(activityId, activity);
        
        player.outputChatBox(`Familien-Aktivität "${activityType}" geplant!`);
        player.call('ui:show', 'FamilyActivityPlanned', { activity: activity });
        
        console.log(`[FAMILY_LIFE] Familien-Aktivität ${activityType} für Familie ${player.familyId} geplant`);
        return activityId;
    },
    
    // Familien-Aktivität durchführen
    executeFamilyActivity(activityId) {
        const activity = this.familyActivities.get(activityId);
        if (!activity) return false;
        
        const family = this.families.get(activity.familyId);
        if (!family) return false;
        
        // Kosten abziehen
        if (activity.cost > 0) {
            family.expenses += activity.cost;
            family.savings -= activity.cost;
        }
        
        // Glück erhöhen
        family.happiness = Math.min(100, family.happiness + 10);
        
        // Kinder-Glück erhöhen
        family.children.forEach(childId => {
            const child = this.children.get(childId);
            if (child) {
                child.happiness = Math.min(100, child.happiness + 15);
            }
        });
        
        activity.status = 'completed';
        activity.completionDate = Date.now();
        
        // Teilnehmer benachrichtigen
        activity.participants.forEach(participantId => {
            const participant = mp.players.at(participantId);
            if (participant) {
                participant.outputChatBox(`Familien-Aktivität "${activity.activityType}" abgeschlossen!`);
                participant.call('ui:show', 'FamilyActivityCompleted', { activity: activity });
            }
        });
        
        console.log(`[FAMILY_LIFE] Familien-Aktivität ${activityId} durchgeführt`);
        return true;
    },
    
    // Kindes-Bedürfnisse erfüllen
    fulfillChildNeeds(player, childId, needType) {
        const child = this.children.get(childId);
        if (!child) {
            player.outputChatBox('Kind nicht gefunden!');
            return false;
        }
        
        if (child.familyId !== player.familyId) {
            player.outputChatBox('Du gehörst nicht zur Familie dieses Kindes!');
            return false;
        }
        
        if (!child.needs.includes(needType)) {
            player.outputChatBox('Dieses Bedürfnis ist nicht relevant für dieses Kind!');
            return false;
        }
        
        // Bedürfnis erfüllen
        child.needs = child.needs.filter(need => need !== needType);
        child.happiness = Math.min(100, child.happiness + 20);
        
        // Neue Bedürfnisse generieren
        const stage = this.getChildStage(child.age);
        const newNeeds = this.childStages[stage].needs;
        child.needs = newNeeds;
        
        player.outputChatBox(`Bedürfnis "${needType}" für ${child.name} erfüllt!`);
        player.call('ui:show', 'ChildNeedFulfilled', { child: child, need: needType });
        
        console.log(`[FAMILY_LIFE] Bedürfnis ${needType} für Kind ${childId} erfüllt`);
        return true;
    },
    
    // Familie auflösen
    dissolveFamily(player, reason) {
        if (!player.familyId) {
            player.outputChatBox('Du gehörst keiner Familie an!');
            return false;
        }
        
        const family = this.families.get(player.familyId);
        if (!family) {
            player.outputChatBox('Familie nicht gefunden!');
            return false;
        }
        
        // Kinder-Pflege regeln
        family.children.forEach(childId => {
            const child = this.children.get(childId);
            if (child) {
                child.status = 'orphaned';
                child.guardian = null;
            }
        });
        
        // Familien-Status aktualisieren
        family.status = 'divorced';
        family.dissolutionDate = Date.now();
        family.dissolutionReason = reason;
        
        // Spieler-Status aktualisieren
        const spouse = mp.players.at(family.player1Id === player.id ? family.player2Id : family.player1Id);
        if (spouse) {
            spouse.familyId = null;
            spouse.relationshipStatus = 'divorced';
            spouse.spouse = null;
            spouse.familyRole = null;
        }
        
        player.familyId = null;
        player.relationshipStatus = 'divorced';
        player.spouse = null;
        player.familyRole = null;
        
        player.outputChatBox(`Familie "${family.familyName}" aufgelöst!`);
        player.call('ui:show', 'FamilyDissolved', { family: family });
        
        this.familyStats.totalDivorces++;
        
        console.log(`[FAMILY_LIFE] Familie ${player.familyId} aufgelöst`);
        return true;
    },
    
    // Familie abrufen
    getFamily(familyId) {
        return this.families.get(familyId);
    },
    
    // Spieler-Familie abrufen
    getPlayerFamily(playerId) {
        const families = Array.from(this.families.values()).filter(family => 
            family.player1Id === playerId || family.player2Id === playerId
        );
        
        return families.length > 0 ? families[0] : null;
    },
    
    // Familien-Statistiken
    getStatistics() {
        const totalFamilies = this.families.size;
        const totalChildren = this.children.size;
        const totalMembers = Array.from(this.families.values()).reduce((sum, family) => 
            sum + 2 + family.children.length, 0
        );
        
        return {
            ...this.familyStats,
            totalFamilies: totalFamilies,
            totalChildren: totalChildren,
            averageFamilySize: totalFamilies > 0 ? totalMembers / totalFamilies : 0,
            totalActivities: this.familyActivities.size
        };
    }
};

// Events
mp.events.add('family_life:createFamily', (player1, player2, familyData) => {
    familyLifeSystem.createFamily(player1, player2, familyData);
});

mp.events.add('family_life:adoptChild', (player, childData) => {
    familyLifeSystem.adoptChild(player, childData);
});

mp.events.add('family_life:planActivity', (player, activityType, activityData) => {
    familyLifeSystem.planFamilyActivity(player, activityType, activityData);
});

mp.events.add('family_life:fulfillNeeds', (player, childId, needType) => {
    familyLifeSystem.fulfillChildNeeds(player, childId, needType);
});

mp.events.add('family_life:dissolveFamily', (player, reason) => {
    familyLifeSystem.dissolveFamily(player, reason);
});

// Commands
mp.events.addCommand('family', (player, fullText, action, targetId, childName) => {
    if (!action) {
        player.outputChatBox('Verwendung: /family [create|adopt|activity|needs|dissolve] [SpielerID] [KindName]');
        player.outputChatBox('Verfügbare Aktivitäten: dinner, movie_night, game_night, vacation, sports');
        return;
    }
    
    switch (action.toLowerCase()) {
        case 'create':
            if (targetId) {
                const target = mp.players.at(parseInt(targetId));
                if (target) {
                    const familyData = {
                        familyName: `${player.name} Family`
                    };
                    familyLifeSystem.createFamily(player, target, familyData);
                } else {
                    player.outputChatBox('Spieler nicht gefunden!');
                }
            } else {
                player.outputChatBox('Spieler-ID erforderlich!');
            }
            break;
            
        case 'adopt':
            const childData = {
                name: childName || 'Adopted Child',
                age: 5,
                gender: 'male'
            };
            familyLifeSystem.adoptChild(player, childData);
            break;
            
        case 'activity':
            const activityData = {
                date: Date.now(),
                location: 'Home',
                cost: 100,
                description: 'Family Activity'
            };
            familyLifeSystem.planFamilyActivity(player, 'dinner', activityData);
            break;
            
        case 'needs':
            const family = familyLifeSystem.getPlayerFamily(player.id);
            if (family && family.children.length > 0) {
                const childId = family.children[0];
                familyLifeSystem.fulfillChildNeeds(player, childId, 'playing');
            } else {
                player.outputChatBox('Keine Kinder in der Familie!');
            }
            break;
            
        case 'dissolve':
            familyLifeSystem.dissolveFamily(player, 'Manuell aufgelöst');
            break;
    }
});

// Family Life System initialisieren
familyLifeSystem.init();

module.exports = familyLifeSystem;
