// Enhanced HUD Komponente - Erweiterte Head-Up-Display-Funktionalität basierend auf Tutorial
// Zeigt erweiterte Spieler-Informationen an

const EnhancedHUD = ({ data, onAction, onClose }) => {
    const [playerData, setPlayerData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [currentTime, setCurrentTime] = React.useState(new Date());
    const [showHelp, setShowHelp] = React.useState(false);
    const [hudScale, setHudScale] = React.useState(1);
    const [selectedStatIndex, setSelectedStatIndex] = React.useState(0);

    React.useEffect(() => {
        setPlayerData(data || {});
    }, [data]);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'f12':
                    event.preventDefault();
                    setShowHelp(!showHelp);
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
                    }
                    break;
                case '=':
                case '+':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setHudScale(Math.min(2, hudScale + 0.1));
                    }
                    break;
                case '-':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setHudScale(Math.max(0.5, hudScale - 0.1));
                    }
                    break;
                case '0':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setHudScale(1);
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();
                    setSelectedStatIndex(Math.max(0, selectedStatIndex - 1));
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    setSelectedStatIndex(Math.min(5, selectedStatIndex + 1));
                    break;
                case 'enter':
                    event.preventDefault();
                    if (selectedStatIndex === 0) onAction('openPhone');
                    else if (selectedStatIndex === 1) onAction('openInventory');
                    else if (selectedStatIndex === 2) onAction('openFaction');
                    else if (selectedStatIndex === 3) onAction('openBank');
                    else if (selectedStatIndex === 4) onAction('openJob');
                    else if (selectedStatIndex === 5) onAction('openSettings');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [showHelp, hudScale, selectedStatIndex, onAction]);

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

    const getLevelColor = (level) => {
        if (level >= 50) return 'text-purple-400';
        if (level >= 25) return 'text-blue-400';
        if (level >= 10) return 'text-green-400';
        return 'text-gray-400';
    };

    if (!isVisible) return null;

    return (
        <div 
            className="fixed inset-0 pointer-events-none z-50"
            style={{ transform: `scale(${hudScale})`, transformOrigin: 'top left' }}
        >
            {/* Top-Left: Erweiterte Spieler-Info */}
            <div className="absolute top-4 left-4 glass rounded-lg p-4 min-w-[350px]">
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                            {playerData.name ? playerData.name.charAt(0).toUpperCase() : 'P'}
                        </span>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-bold text-lg">
                            {playerData.name || 'Unbekannt'}
                        </h3>
                        <p className="text-gray-300 text-sm">
                            Level {playerData.level || 1} • {playerData.job || 'Kein Job'}
                        </p>
                    </div>
                </div>

                {/* Geld und Level */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="bg-black bg-opacity-30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-green-400 text-lg">💰</span>
                            <div>
                                <p className="text-gray-300 text-xs">Geld</p>
                                <p className="text-white font-bold">
                                    {formatMoney(playerData.money || 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black bg-opacity-30 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-yellow-400 text-lg">⭐</span>
                            <div>
                                <p className="text-gray-300 text-xs">Level</p>
                                <p className={`font-bold ${getLevelColor(playerData.level || 1)}`}>
                                    {playerData.level || 1}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fraktion */}
                {playerData.faction && (
                    <div className="bg-black bg-opacity-30 rounded-lg p-3 mb-3">
                        <div className="flex items-center space-x-2">
                            <span className="text-red-400 text-lg">🏴</span>
                            <div>
                                <p className="text-gray-300 text-xs">Fraktion</p>
                                <p className="text-white font-bold">{playerData.faction}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Lizenzen */}
                {playerData.licenses && playerData.licenses.length > 0 && (
                    <div className="bg-black bg-opacity-30 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-2">
                            <span className="text-blue-400 text-lg">📜</span>
                            <p className="text-gray-300 text-xs">Lizenzen</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {playerData.licenses.map((license, index) => (
                                <span 
                                    key={index}
                                    className="bg-blue-600 bg-opacity-50 text-blue-200 text-xs px-2 py-1 rounded"
                                >
                                    {license.name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Top-Right: Zeit und Wetter */}
            <div className="absolute top-4 right-4 glass rounded-lg p-4 min-w-[200px]">
                <div className="text-center">
                    <div className="text-white font-bold text-2xl mb-2">
                        {currentTime.toLocaleTimeString('de-DE', {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </div>
                    <div className="text-gray-300 text-sm mb-3">
                        {currentTime.toLocaleDateString('de-DE', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>
                    
                    {/* Wetter */}
                    {playerData.weather && (
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-2xl">
                                {playerData.weather === 'sunny' && '☀️'}
                                {playerData.weather === 'cloudy' && '☁️'}
                                {playerData.weather === 'rainy' && '🌧️'}
                                {playerData.weather === 'foggy' && '🌫️'}
                            </span>
                            <span className="text-gray-300 text-sm capitalize">
                                {playerData.weather}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom-Right: Erweiterte Status-Bars */}
            <div className="absolute bottom-4 right-4 glass rounded-lg p-4 min-w-[300px]">
                <div className="space-y-3">
                    {/* Gesundheit */}
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-red-500 text-lg">❤️</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Gesundheit</span>
                                <span className={getHealthColor(playerData.health || 100)}>
                                    {playerData.health || 100}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${playerData.health || 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Rüstung */}
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-blue-500 text-lg">🛡️</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Rüstung</span>
                                <span className={getArmorColor(playerData.armor || 0)}>
                                    {playerData.armor || 0}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${playerData.armor || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Durst */}
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-blue-400 text-lg">💧</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Durst</span>
                                <span className={getThirstColor(playerData.thirst || 100)}>
                                    {playerData.thirst || 100}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${playerData.thirst || 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Hunger */}
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-green-500 text-lg">🍎</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Hunger</span>
                                <span className={getHungerColor(playerData.hunger || 100)}>
                                    {playerData.hunger || 100}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${playerData.hunger || 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Energie */}
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 flex items-center justify-center">
                            <span className="text-yellow-500 text-lg">⚡</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Energie</span>
                                <span className={getEnergyColor(playerData.energy || 100)}>
                                    {playerData.energy || 100}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-gradient-to-r from-yellow-500 to-yellow-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${playerData.energy || 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    {/* Alkoholpegel */}
                    {playerData.intoxication > 0 && (
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <span className="text-orange-500 text-lg">🍺</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Alkoholpegel</span>
                                    <span className={getIntoxicationColor(playerData.intoxication)}>
                                        {playerData.intoxication}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-orange-500 to-orange-400 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${playerData.intoxication}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Suchtlevel */}
                    {playerData.addiction > 0 && (
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <span className="text-red-500 text-lg">💊</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">Suchtlevel</span>
                                    <span className={getAddictionColor(playerData.addiction)}>
                                        {playerData.addiction}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div 
                                        className="bg-gradient-to-r from-red-500 to-red-400 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${playerData.addiction}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom-Left: Minimap und Navigation */}
            <div className="absolute bottom-4 left-4 glass rounded-lg p-4 min-w-[250px]">
                <div className="text-center">
                    <h4 className="text-white font-bold mb-3">Navigation</h4>
                    
                    {/* Aktuelle Position */}
                    <div className="bg-black bg-opacity-30 rounded-lg p-3 mb-3">
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-green-400 text-lg">📍</span>
                            <div>
                                <p className="text-gray-300 text-xs">Position</p>
                                <p className="text-white font-bold text-sm">
                                    X: {Math.round(playerData.position?.x || 0)} | 
                                    Y: {Math.round(playerData.position?.y || 0)} | 
                                    Z: {Math.round(playerData.position?.z || 0)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Geschwindigkeit */}
                    {playerData.vehicle && (
                        <div className="bg-black bg-opacity-30 rounded-lg p-3 mb-3">
                            <div className="flex items-center justify-center space-x-2">
                                <span className="text-blue-400 text-lg">🚗</span>
                                <div>
                                    <p className="text-gray-300 text-xs">Geschwindigkeit</p>
                                    <p className="text-white font-bold text-sm">
                                        {Math.round(playerData.speed || 0)} km/h
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Letzte Aktivität */}
                    <div className="bg-black bg-opacity-30 rounded-lg p-3">
                        <div className="flex items-center justify-center space-x-2">
                            <span className="text-purple-400 text-lg">⏰</span>
                            <div>
                                <p className="text-gray-300 text-xs">Letzte Aktivität</p>
                                <p className="text-white font-bold text-sm">
                                    {playerData.lastActivity ? formatTime(playerData.lastActivity) : 'Jetzt'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Center: Notifications */}
            {playerData.notifications && playerData.notifications.length > 0 && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="space-y-2">
                        {playerData.notifications.map((notification, index) => (
                            <div 
                                key={index}
                                className={`glass rounded-lg p-4 min-w-[300px] ${
                                    notification.type === 'error' ? 'border-l-4 border-red-500' :
                                    notification.type === 'warning' ? 'border-l-4 border-yellow-500' :
                                    notification.type === 'success' ? 'border-l-4 border-green-500' :
                                    'border-l-4 border-blue-500'
                                }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-2xl">
                                        {notification.type === 'error' && '❌'}
                                        {notification.type === 'warning' && '⚠️'}
                                        {notification.type === 'success' && '✅'}
                                        {notification.type === 'info' && 'ℹ️'}
                                    </span>
                                    <div>
                                        <p className="text-white font-bold">{notification.title}</p>
                                        <p className="text-gray-300 text-sm">{notification.message}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Help Overlay */}
            {showHelp && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-xl font-bold">Enhanced HUD Shortcuts</h2>
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
                                    <span className="text-gray-300">F12</span>
                                    <span className="text-white">Hilfe anzeigen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + H</span>
                                    <span className="text-white">Hilfe anzeigen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Pfeiltasten ↑↓</span>
                                    <span className="text-white">Stat-Navigation</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Enter</span>
                                    <span className="text-white">Stat öffnen</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + +</span>
                                    <span className="text-white">HUD vergrößern</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + -</span>
                                    <span className="text-white">HUD verkleinern</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + 0</span>
                                    <span className="text-white">HUD zurücksetzen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// HUD Toggle Funktion
const toggleHUD = () => {
    const hudElement = document.getElementById('enhanced-hud');
    if (hudElement) {
        hudElement.style.display = hudElement.style.display === 'none' ? 'block' : 'none';
    }
};

// HUD Update Funktion
const updateHUD = (data) => {
    const hudElement = document.getElementById('enhanced-hud');
    if (hudElement) {
        const hudComponent = hudElement.querySelector('[data-component="enhanced-hud"]');
        if (hudComponent) {
            hudComponent.setAttribute('data-player-data', JSON.stringify(data));
        }
    }
};

// Export für Verwendung in anderen Komponenten
window.EnhancedHUD = EnhancedHUD;
window.toggleHUD = toggleHUD;
window.updateHUD = updateHUD;

export default EnhancedHUD;
