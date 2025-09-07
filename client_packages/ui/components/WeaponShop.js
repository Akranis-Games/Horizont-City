// Weapon Shop Komponente - Waffen-Shop mit Tastatur-Interaktionen
// Moderne Waffen-Shop-UI für Horizont-City Roleplay

const WeaponShop = ({ data, onAction, onClose }) => {
    const [weaponData, setWeaponData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [selectedWeaponIndex, setSelectedWeaponIndex] = React.useState(0);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        setWeaponData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    onClose();
                    break;
                case 'arrowup':
                    event.preventDefault();
                    setSelectedWeaponIndex(Math.max(0, selectedWeaponIndex - 3));
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    setSelectedWeaponIndex(Math.min(filteredWeapons.length - 1, selectedWeaponIndex + 3));
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    setSelectedWeaponIndex(Math.max(0, selectedWeaponIndex - 1));
                    break;
                case 'arrowright':
                    event.preventDefault();
                    setSelectedWeaponIndex(Math.min(filteredWeapons.length - 1, selectedWeaponIndex + 1));
                    break;
                case 'enter':
                    event.preventDefault();
                    if (filteredWeapons[selectedWeaponIndex]) {
                        handleBuyWeapon(filteredWeapons[selectedWeaponIndex]);
                    }
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
                    }
                    break;
                case 'f':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        document.querySelector('input[placeholder="Waffen durchsuchen..."]')?.focus();
                    }
                    break;
                case '1':
                    event.preventDefault();
                    setSelectedCategoryIndex(0);
                    break;
                case '2':
                    event.preventDefault();
                    setSelectedCategoryIndex(1);
                    break;
                case '3':
                    event.preventDefault();
                    setSelectedCategoryIndex(2);
                    break;
                case '4':
                    event.preventDefault();
                    setSelectedCategoryIndex(3);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedWeaponIndex, selectedCategoryIndex, filteredWeapons, onClose, showHelp]);

    const categories = [
        { id: 'all', name: 'Alle', icon: '🔫' },
        { id: 'pistols', name: 'Pistolen', icon: '🔫' },
        { id: 'rifles', name: 'Gewehre', icon: '🔫' },
        { id: 'melee', name: 'Nahkampf', icon: '🗡️' },
        { id: 'ammo', name: 'Munition', icon: '💥' }
    ];

    const weapons = [
        { id: 'pistol', name: 'Pistole', category: 'pistols', price: 500, damage: 25, range: 50, icon: '🔫', description: 'Standard-Pistole für den Selbstschutz' },
        { id: 'rifle', name: 'Gewehr', category: 'rifles', price: 1500, damage: 60, range: 200, icon: '🔫', description: 'Starkes Gewehr für größere Distanzen' },
        { id: 'knife', name: 'Messer', category: 'melee', price: 100, damage: 15, range: 2, icon: '🗡️', description: 'Scharfes Messer für Nahkampf' },
        { id: 'bat', name: 'Baseballschläger', category: 'melee', price: 80, damage: 20, range: 3, icon: '🏏', description: 'Schwerer Schläger für Nahkampf' },
        { id: 'pistol_ammo', name: 'Pistolen-Munition', category: 'ammo', price: 5, damage: 0, range: 0, icon: '💥', description: 'Munition für Pistolen' },
        { id: 'rifle_ammo', name: 'Gewehr-Munition', category: 'ammo', price: 10, damage: 0, range: 0, icon: '💥', description: 'Munition für Gewehre' }
    ];

    const filteredWeapons = weapons.filter(weapon => {
        const matchesSearch = weapon.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categories[selectedCategoryIndex].id === 'all' || weapon.category === categories[selectedCategoryIndex].id;
        return matchesSearch && matchesCategory;
    });

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const handleBuyWeapon = (weapon) => {
        onAction('buyWeapon', weapon);
    };

    const getWeaponRarityColor = (price) => {
        if (price < 200) return 'text-gray-400';
        if (price < 500) return 'text-green-400';
        if (price < 1000) return 'text-blue-400';
        if (price < 2000) return 'text-purple-400';
        return 'text-yellow-400';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[600px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Waffen-Shop</h2>
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

                {/* Suchleiste */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Waffen durchsuchen..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute left-3 top-2.5 text-gray-400">
                        🔍
                    </div>
                </div>

                {/* Kategorien */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category, index) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategoryIndex(index)}
                            className={`px-3 py-1 rounded-full text-sm transition-colors relative group ${
                                selectedCategoryIndex === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                            }`}
                            title={`${category.name} - Taste ${index + 1}`}
                        >
                            {category.icon} {category.name}
                            {index < 4 && (
                                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                    {index + 1}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Waffen-Grid */}
                <div className="grid grid-cols-3 gap-4 max-h-80 overflow-y-auto">
                    {filteredWeapons.map((weapon, index) => (
                        <div
                            key={weapon.id}
                            onClick={() => handleBuyWeapon(weapon)}
                            className={`bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer transition-colors border border-white border-opacity-20 relative group ${
                                selectedWeaponIndex === index 
                                    ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                    : 'hover:bg-opacity-20'
                            }`}
                            title={`${weapon.name} - Enter zum Kaufen`}
                        >
                            <div className="text-center">
                                <div className="text-3xl mb-2">{weapon.icon}</div>
                                <div className="text-white text-sm font-medium mb-1">{weapon.name}</div>
                                <div className={`text-lg font-bold ${getWeaponRarityColor(weapon.price)}`}>
                                    {formatMoney(weapon.price)}
                                </div>
                                {weapon.damage > 0 && (
                                    <div className="text-gray-400 text-xs mt-1">
                                        Schaden: {weapon.damage} | Reichweite: {weapon.range}m
                                    </div>
                                )}
                                <div className="text-gray-500 text-xs mt-1">
                                    {weapon.description}
                                </div>
                            </div>
                            {selectedWeaponIndex === index && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    ←
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Spieler-Info */}
                <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Geld:</span>
                            <span className="text-green-400 font-semibold ml-2">
                                {formatMoney(weaponData.money || 0)}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400">Waffen-Lizenz:</span>
                            <span className={`font-semibold ml-2 ${
                                weaponData.hasWeaponLicense ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {weaponData.hasWeaponLicense ? 'Ja' : 'Nein'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Waffen-Shop Shortcuts</h2>
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
                                        <span className="text-white">Schließen</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten</span>
                                        <span className="text-white">Navigation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Enter</span>
                                        <span className="text-white">Waffe kaufen</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">1-4</span>
                                        <span className="text-white">Kategorie wechseln</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Ctrl + F</span>
                                        <span className="text-white">Suchen fokussieren</span>
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

// WeaponShop als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeaponShop;
} else {
    window.WeaponShop = WeaponShop;
}
