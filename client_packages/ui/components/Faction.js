// Faction Komponente - Fraktions- und Gang-System mit Rängen und Berechtigungen
// Moderne Faction-UI für Horizont-City Roleplay

const Faction = ({ data, onAction, onClose }) => {
    const [factionData, setFactionData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedMember, setSelectedMember] = React.useState(null);
    const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);
    const [selectedMemberIndex, setSelectedMemberIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);

    React.useEffect(() => {
        setFactionData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    if (selectedMember) {
                        setSelectedMember(null);
                    } else {
                        onClose();
                    }
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    setSelectedTabIndex(Math.max(0, selectedTabIndex - 1));
                    setActiveTab(tabs[selectedTabIndex - 1]?.id || tabs[0].id);
                    break;
                case 'arrowright':
                    event.preventDefault();
                    setSelectedTabIndex(Math.min(tabs.length - 1, selectedTabIndex + 1));
                    setActiveTab(tabs[selectedTabIndex + 1]?.id || tabs[tabs.length - 1].id);
                    break;
                case 'arrowup':
                    event.preventDefault();
                    if (activeTab === 'members') {
                        setSelectedMemberIndex(Math.max(0, selectedMemberIndex - 1));
                    }
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    if (activeTab === 'members') {
                        setSelectedMemberIndex(Math.min((factionData.members?.length || 1) - 1, selectedMemberIndex + 1));
                    }
                    break;
                case 'enter':
                    event.preventDefault();
                    if (activeTab === 'members' && factionData.members?.[selectedMemberIndex]) {
                        setSelectedMember(factionData.members[selectedMemberIndex]);
                    }
                    break;
                case 'tab':
                    event.preventDefault();
                    setSelectedTabIndex((selectedTabIndex + 1) % tabs.length);
                    setActiveTab(tabs[(selectedTabIndex + 1) % tabs.length].id);
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
                    }
                    break;
                case '1':
                    event.preventDefault();
                    setSelectedTabIndex(0);
                    setActiveTab(tabs[0].id);
                    break;
                case '2':
                    event.preventDefault();
                    setSelectedTabIndex(1);
                    setActiveTab(tabs[1].id);
                    break;
                case '3':
                    event.preventDefault();
                    setSelectedTabIndex(2);
                    setActiveTab(tabs[2].id);
                    break;
                case '4':
                    event.preventDefault();
                    setSelectedTabIndex(3);
                    setActiveTab(tabs[3].id);
                    break;
                case '5':
                    event.preventDefault();
                    setSelectedTabIndex(4);
                    setActiveTab(tabs[4].id);
                    break;
                case '6':
                    event.preventDefault();
                    setSelectedTabIndex(5);
                    setActiveTab(tabs[5].id);
                    break;
                case '7':
                    event.preventDefault();
                    setSelectedTabIndex(6);
                    setActiveTab(tabs[6].id);
                    break;
                case '8':
                    event.preventDefault();
                    setSelectedTabIndex(7);
                    setActiveTab(tabs[7].id);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [activeTab, selectedTabIndex, selectedMemberIndex, factionData.members, selectedMember, onClose, showHelp]);

    const tabs = [
        { id: 'overview', name: 'Übersicht', icon: '📊' },
        { id: 'members', name: 'Mitglieder', icon: '👥' },
        { id: 'ranks', name: 'Ränge', icon: '⭐' },
        { id: 'territory', name: 'Territorium', icon: '🗺️' },
        { id: 'wars', name: 'Kriege', icon: '⚔️' },
        { id: 'alliances', name: 'Allianzen', icon: '🤝' },
        { id: 'bank', name: 'Bank', icon: '💰' },
        { id: 'settings', name: 'Einstellungen', icon: '⚙️' }
    ];

    const getRankColor = (rank) => {
        const colors = {
            0: 'text-gray-400',
            1: 'text-green-400',
            2: 'text-blue-400',
            3: 'text-purple-400',
            4: 'text-orange-400',
            5: 'text-red-400',
            6: 'text-yellow-400',
            7: 'text-pink-400',
            8: 'text-cyan-400',
            9: 'text-indigo-400',
            10: 'text-yellow-300'
        };
        return colors[rank] || 'text-gray-400';
    };

    const getRankBadgeColor = (rank) => {
        const colors = {
            0: 'bg-gray-600',
            1: 'bg-green-600',
            2: 'bg-blue-600',
            3: 'bg-purple-600',
            4: 'bg-orange-600',
            5: 'bg-red-600',
            6: 'bg-yellow-600',
            7: 'bg-pink-600',
            8: 'bg-cyan-600',
            9: 'bg-indigo-600',
            10: 'bg-yellow-500'
        };
        return colors[rank] || 'bg-gray-600';
    };

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* Faction-Info */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
                <div className="text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">{factionData.name || 'Keine Faction'}</h3>
                    <p className="text-blue-200 text-sm">{factionData.type || 'Unbekannt'}</p>
                    <p className="text-blue-100 text-xs mt-2">{factionData.description || 'Keine Beschreibung'}</p>
                </div>
            </div>

            {/* Statistiken */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{factionData.memberCount || 0}</div>
                        <div className="text-gray-400 text-sm">Mitglieder</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{factionData.territories || 0}</div>
                        <div className="text-gray-400 text-sm">Territorien</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{factionData.alliances || 0}</div>
                        <div className="text-gray-400 text-sm">Allianzen</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{factionData.wars || 0}</div>
                        <div className="text-gray-400 text-sm">Kriege</div>
                    </div>
                </div>
            </div>

            {/* Bank-Guthaben */}
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bank-Guthaben:</span>
                    <span className="text-green-400 font-bold text-lg">
                        {formatMoney(factionData.bank || 0)}
                    </span>
                </div>
            </div>

            {/* Aktuelle Aktivitäten */}
            <div className="space-y-3">
                <h4 className="text-white font-medium">Aktuelle Aktivitäten</h4>
                {factionData.activities?.map((activity, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="flex-1">
                                <div className="text-white text-sm">{activity.message}</div>
                                <div className="text-gray-400 text-xs">{activity.time}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderMembersTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Mitglieder ({factionData.members?.length || 0})</h4>
                <button
                    onClick={() => onAction('inviteMember')}
                    className="btn-primary text-sm py-2 px-3"
                >
                    Einladen
                </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
                {factionData.members?.map((member, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedMember(member)}
                        className="bg-white bg-opacity-10 rounded-lg p-3 cursor-pointer hover:bg-opacity-20 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">
                                        {member.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <div className="text-white font-medium">{member.name}</div>
                                    <div className={`text-xs ${getRankColor(member.rank)}`}>
                                        {member.rankName}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className={`px-2 py-1 rounded-full text-xs ${getRankBadgeColor(member.rank)} text-white`}>
                                    Rang {member.rank}
                                </div>
                                <div className={`w-2 h-2 rounded-full ${member.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderRanksTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Rang-System</h4>
            
            <div className="space-y-2">
                {factionData.ranks?.map((rank, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center space-x-3">
                                    <div className={`px-3 py-1 rounded-full text-sm ${getRankBadgeColor(rank.level)} text-white`}>
                                        Rang {rank.level}
                                    </div>
                                    <div className="text-white font-medium">{rank.name}</div>
                                </div>
                                <div className="text-gray-400 text-sm mt-1">
                                    Berechtigungen: {rank.permissions.join(', ')}
                                </div>
                            </div>
                            <div className="text-gray-400 text-sm">
                                {rank.memberCount} Mitglieder
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">Rang-Beförderung</h5>
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Spieler-Name"
                        className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Rang auswählen</option>
                        {factionData.ranks?.map((rank, index) => (
                            <option key={index} value={rank.level}>{rank.name}</option>
                        ))}
                    </select>
                    <button className="w-full btn-primary py-2">
                        Befördern
                    </button>
                </div>
            </div>
        </div>
    );

    const renderTerritoryTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Territorium</h4>
            
            <div className="space-y-3">
                {factionData.territories?.map((territory, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white font-medium">{territory.name}</div>
                                <div className="text-gray-400 text-sm">{territory.location}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-green-400 text-sm">Kontrolliert</div>
                                <div className="text-gray-400 text-xs">{territory.income}€/Tag</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <h5 className="text-white font-medium mb-2">Neues Territorium</h5>
                <button className="w-full btn-primary py-2">
                    Territorium beanspruchen
                </button>
            </div>
        </div>
    );

    const renderWarsTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Kriege</h4>
                <button
                    onClick={() => onAction('declareWar')}
                    className="btn-danger text-sm py-2 px-3"
                >
                    Krieg erklären
                </button>
            </div>

            <div className="space-y-3">
                {factionData.wars?.map((war, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white font-medium">Krieg gegen {war.targetFaction}</div>
                                <div className="text-gray-400 text-sm">Status: {war.status}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-red-400 text-sm">Aktiv</div>
                                <div className="text-gray-400 text-xs">{war.duration} Tage</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAlliancesTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Allianzen</h4>
                <button
                    onClick={() => onAction('createAlliance')}
                    className="btn-success text-sm py-2 px-3"
                >
                    Allianz schließen
                </button>
            </div>

            <div className="space-y-3">
                {factionData.alliances?.map((alliance, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white font-medium">Allianz mit {alliance.targetFaction}</div>
                                <div className="text-gray-400 text-sm">Status: {alliance.status}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-green-400 text-sm">Aktiv</div>
                                <div className="text-gray-400 text-xs">{alliance.duration} Tage</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBankTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Faction-Bank</h4>
            
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6">
                <div className="text-center">
                    <div className="text-white text-3xl font-bold">
                        {formatMoney(factionData.bank || 0)}
                    </div>
                    <div className="text-green-200 text-sm">Verfügbares Guthaben</div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => onAction('deposit')}
                    className="btn-success py-3"
                >
                    Einzahlen
                </button>
                <button
                    onClick={() => onAction('withdraw')}
                    className="btn-primary py-3"
                >
                    Abheben
                </button>
            </div>

            <div className="space-y-2">
                <h5 className="text-white font-medium">Letzte Transaktionen</h5>
                {factionData.transactions?.map((transaction, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white text-sm">{transaction.description}</div>
                                <div className="text-gray-400 text-xs">{transaction.time}</div>
                            </div>
                            <div className={`font-semibold ${
                                transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {transaction.amount > 0 ? '+' : ''}{transaction.amount}€
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSettingsTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Faction-Einstellungen</h4>
            
            <div className="space-y-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-3">Allgemein</h5>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Einladungen erlauben</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Kriege erlauben</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Allianzen erlauben</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                    </div>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-3">Mitglieder</h5>
                    <div className="space-y-3">
                        <div>
                            <label className="text-gray-400 text-sm">Max. Mitglieder</label>
                            <input
                                type="number"
                                defaultValue={factionData.maxMembers || 50}
                                className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-3">Gefährlich</h5>
                    <button className="w-full btn-danger py-2">
                        Faction löschen
                    </button>
                </div>
            </div>
        </div>
    );

    const renderCurrentTab = () => {
        switch (activeTab) {
            case 'overview': return renderOverviewTab();
            case 'members': return renderMembersTab();
            case 'ranks': return renderRanksTab();
            case 'territory': return renderTerritoryTab();
            case 'wars': return renderWarsTab();
            case 'alliances': return renderAlliancesTab();
            case 'bank': return renderBankTab();
            case 'settings': return renderSettingsTab();
            default: return renderOverviewTab();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[700px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Faction</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setShowHelp(!showHelp)}
                            className="text-white text-xl hover:text-gray-300"
                            title="Ctrl + H - Hilfe"
                        >
                            ❓
                        </button>
                        <button
                            onClick={onClose}
                            className="text-white text-xl hover:text-gray-300"
                            title="ESC - Schließen"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSelectedTabIndex(index);
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap relative group ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : selectedTabIndex === index
                                    ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400 text-white'
                                    : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                            }`}
                            title={`${tab.name} - Taste ${index + 1}`}
                        >
                            {tab.icon} {tab.name}
                            {index < 8 && (
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    {index + 1}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="h-full overflow-y-auto">
                    {renderCurrentTab()}
                </div>

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Faction Shortcuts</h2>
                                <button
                                    onClick={() => setShowHelp(false)}
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">ESC</span>
                                        <span className="text-white">Schließen/Zurück</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten ←→</span>
                                        <span className="text-white">Tab-Navigation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten ↑↓</span>
                                        <span className="text-white">Mitglied-Navigation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Enter</span>
                                        <span className="text-white">Mitglied auswählen</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">TAB</span>
                                        <span className="text-white">Nächster Tab</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">1-8</span>
                                        <span className="text-white">Tab-Schnellzugriff</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Ctrl + H</span>
                                        <span className="text-white">Hilfe anzeigen</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Faction als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Faction;
} else {
    window.Faction = Faction;
}
