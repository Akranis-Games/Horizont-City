// HUD Komponente - Haupt-Head-Up-Display für Horizont-City Roleplay
// Zeigt wichtige Spieler-Informationen an

const HUD = ({ data, onAction, onClose }) => {
    const [playerData, setPlayerData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [showHelp, setShowHelp] = React.useState(false);
    const [selectedTab, setSelectedTab] = React.useState('main');

    React.useEffect(() => {
        setPlayerData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'f1':
                    event.preventDefault();
                    onAction('openPhone');
                    break;
                case 'f2':
                    event.preventDefault();
                    onAction('openInventory');
                    break;
                case 'f3':
                    event.preventDefault();
                    onAction('openFaction');
                    break;
                case 'f4':
                    event.preventDefault();
                    onAction('openBank');
                    break;
                case 'f5':
                    event.preventDefault();
                    onAction('openJob');
                    break;
                case 'f6':
                    event.preventDefault();
                    onAction('openVehicle');
                    break;
                case 'f7':
                    event.preventDefault();
                    onAction('openHousing');
                    break;
                case 'f8':
                    event.preventDefault();
                    onAction('openSettings');
                    break;
                case 'f9':
                    event.preventDefault();
                    onAction('openAdmin');
                    break;
                case 'f10':
                    event.preventDefault();
                    onAction('openRadio');
                    break;
                case 'f11':
                    event.preventDefault();
                    onAction('openGPS');
                    break;
                case 'f12':
                    event.preventDefault();
                    setShowHelp(!showHelp);
                    break;
                case 'escape':
                    event.preventDefault();
                    if (showHelp) {
                        setShowHelp(false);
                    } else {
                        onClose();
                    }
                    break;
                case 'tab':
                    event.preventDefault();
                    setSelectedTab(selectedTab === 'main' ? 'stats' : 'main');
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onAction, onClose, showHelp, selectedTab]);

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getHealthColor = (health) => {
        if (health > 75) return 'text-green-400';
        if (health > 50) return 'text-yellow-400';
        if (health > 25) return 'text-orange-400';
        return 'text-red-400';
    };

    const getArmorColor = (armor) => {
        if (armor > 75) return 'text-blue-400';
        if (armor > 50) return 'text-cyan-400';
        if (armor > 25) return 'text-indigo-400';
        return 'text-purple-400';
    };

    const getThirstColor = (thirst) => {
        if (thirst > 75) return 'text-blue-400';
        if (thirst > 50) return 'text-cyan-400';
        if (thirst > 25) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getHungerColor = (hunger) => {
        if (hunger > 75) return 'text-green-400';
        if (hunger > 50) return 'text-yellow-400';
        if (hunger > 25) return 'text-orange-400';
        return 'text-red-400';
    };

    const getEnergyColor = (energy) => {
        if (energy > 75) return 'text-yellow-400';
        if (energy > 50) return 'text-orange-400';
        if (energy > 25) return 'text-red-400';
        return 'text-red-600';
    };

    const getIntoxicationColor = (intoxication) => {
        if (intoxication < 25) return 'text-green-400';
        if (intoxication < 50) return 'text-yellow-400';
        if (intoxication < 75) return 'text-orange-400';
        return 'text-red-400';
    };

    const getAddictionColor = (addiction) => {
        if (addiction < 25) return 'text-green-400';
        if (addiction < 50) return 'text-yellow-400';
        if (addiction < 75) return 'text-orange-400';
        return 'text-red-400';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Top-Left: Spieler-Info */}
            <div className="absolute top-4 left-4 glass rounded-lg p-4 min-w-[300px]">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                            {playerData.name ? playerData.name.charAt(0).toUpperCase() : 'P'}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg">
                            {playerData.name || 'Unbekannt'}
                        </h3>
                        <p className="text-gray-300 text-sm">
                            {playerData.rankName || 'Player'} (Level {playerData.level || 1})
                        </p>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Geld:</span>
                        <span className="text-green-400 font-semibold">
                            {formatMoney(playerData.money || 0)}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Bank:</span>
                        <span className="text-blue-400 font-semibold">
                            {formatMoney(playerData.bankMoney || 0)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Top-Right: Zeit und Wetter */}
            <div className="absolute top-4 right-4 glass rounded-lg p-4 min-w-[200px]">
                <div className="text-center">
                    <div className="text-white font-bold text-xl">
                        {formatTime(Date.now())}
                    </div>
                    <div className="text-gray-300 text-sm">
                        {new Date().toLocaleDateString('de-DE')}
                    </div>
                    <div className="text-gray-300 text-sm mt-1">
                        Wetter: {playerData.weather || 'Klar'}
                    </div>
                </div>
            </div>

            {/* Bottom-Left: Gesundheit und Rüstung */}
            <div className="absolute bottom-4 left-4 glass rounded-lg p-4 min-w-[250px]">
                <div className="space-y-3">
                    {/* Gesundheit */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Gesundheit</span>
                            <span className={`font-semibold ${getHealthColor(playerData.health || 100)}`}>
                                {playerData.health || 100}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${playerData.health || 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Rüstung */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Rüstung</span>
                            <span className={`font-semibold ${getArmorColor(playerData.armor || 0)}`}>
                                {playerData.armor || 0}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${playerData.armor || 0}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Hunger */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Hunger</span>
                            <span className="text-orange-400 font-semibold">
                                {playerData.hunger || 100}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${playerData.hunger || 100}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Durst */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-300 text-sm">Durst</span>
                            <span className="text-cyan-400 font-semibold">
                                {playerData.thirst || 100}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${playerData.thirst || 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom-Right: Schnellzugriff */}
            <div className="absolute bottom-4 right-4 glass rounded-lg p-4">
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => onAction('openPhone')}
                        className="btn-primary text-sm py-2 px-3 relative group"
                        title="F1 - Telefon öffnen"
                    >
                        📱 Telefon
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F1
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openInventory')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F2 - Inventar öffnen"
                    >
                        🎒 Inventar
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F2
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openFaction')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F3 - Faction öffnen"
                    >
                        👥 Faction
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F3
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openBank')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F4 - Bank öffnen"
                    >
                        🏦 Bank
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F4
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openJob')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F5 - Job öffnen"
                    >
                        💼 Job
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F5
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openVehicle')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F6 - Fahrzeug öffnen"
                    >
                        🚗 Fahrzeug
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F6
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openHousing')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F7 - Wohnung öffnen"
                    >
                        🏠 Wohnung
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F7
                        </span>
                    </button>
                    <button
                        onClick={() => onAction('openSettings')}
                        className="btn-secondary text-sm py-2 px-3 relative group"
                        title="F8 - Einstellungen öffnen"
                    >
                        ⚙️ Einstellungen
                        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            F8
                        </span>
                    </button>
                </div>
            </div>

            {/* Center: Notifications */}
            {playerData.notifications && playerData.notifications.length > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="space-y-2">
                        {playerData.notifications.map((notification, index) => (
                            <div
                                key={index}
                                className={`glass rounded-lg p-4 min-w-[300px] fade-in ${
                                    notification.type === 'success' ? 'border-green-500' :
                                    notification.type === 'error' ? 'border-red-500' :
                                    notification.type === 'warning' ? 'border-yellow-500' :
                                    'border-blue-500'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-2 rounded-full ${
                                        notification.type === 'success' ? 'bg-green-500' :
                                        notification.type === 'error' ? 'bg-red-500' :
                                        notification.type === 'warning' ? 'bg-yellow-500' :
                                        'bg-blue-500'
                                    }`}></div>
                                    <span className="text-white font-medium">
                                        {notification.message}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Minimap */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                <div className="glass rounded-lg p-2">
                    <div className="w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-sm">Minimap</span>
                    </div>
                </div>
            </div>

            {/* Help Overlay */}
            {showHelp && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-bold">Tastatur-Shortcuts</h2>
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
                                    <span className="text-gray-300">F1</span>
                                    <span className="text-white">Telefon öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F2</span>
                                    <span className="text-white">Inventar öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F3</span>
                                    <span className="text-white">Faction öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F4</span>
                                    <span className="text-white">Bank öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F5</span>
                                    <span className="text-white">Job öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F6</span>
                                    <span className="text-white">Fahrzeug öffnen</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F7</span>
                                    <span className="text-white">Wohnung öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F8</span>
                                    <span className="text-white">Einstellungen öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F9</span>
                                    <span className="text-white">Admin öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F10</span>
                                    <span className="text-white">Radio öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F11</span>
                                    <span className="text-white">GPS öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">F12</span>
                                    <span className="text-white">Hilfe anzeigen</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-600">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">TAB</span>
                                    <span className="text-white">HUD-Tab wechseln</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">ESC</span>
                                    <span className="text-white">Schließen</span>
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
    );
};

// HUD als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HUD;
} else {
    window.HUD = HUD;
}
