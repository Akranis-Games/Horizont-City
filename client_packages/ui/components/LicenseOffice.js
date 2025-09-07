// License Office Komponente - Lizenz-Büro mit Tastatur-Interaktionen
// Moderne Lizenz-UI für Horizont-City Roleplay

const LicenseOffice = ({ data, onAction, onClose }) => {
    const [licenseData, setLicenseData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [selectedLicenseIndex, setSelectedLicenseIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);

    React.useEffect(() => {
        setLicenseData(data || {});
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
                    setSelectedLicenseIndex(Math.max(0, selectedLicenseIndex - 1));
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    setSelectedLicenseIndex(Math.min(availableLicenses.length - 1, selectedLicenseIndex + 1));
                    break;
                case 'enter':
                    event.preventDefault();
                    if (availableLicenses[selectedLicenseIndex]) {
                        handleBuyLicense(availableLicenses[selectedLicenseIndex]);
                    }
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
    }, [selectedLicenseIndex, onClose, showHelp]);

    const availableLicenses = [
        { 
            id: 'drivers_license', 
            name: 'Führerschein', 
            price: 200, 
            description: 'Erlaubt das Fahren von Fahrzeugen',
            requirements: 'Mindestalter: 18 Jahre',
            icon: '🚗',
            category: 'transport'
        },
        { 
            id: 'weapon_license', 
            name: 'Waffenschein', 
            price: 1000, 
            description: 'Erlaubt den Besitz und Kauf von Waffen',
            requirements: 'Sauberes Führungszeugnis, Mindestalter: 21 Jahre',
            icon: '🔫',
            category: 'weapon'
        },
        { 
            id: 'pilot_license', 
            name: 'Pilotenlizenz', 
            price: 5000, 
            description: 'Erlaubt das Fliegen von Flugzeugen',
            requirements: 'Medizinische Untersuchung, Mindestalter: 18 Jahre',
            icon: '✈️',
            category: 'aviation'
        },
        { 
            id: 'boat_license', 
            name: 'Bootsführerschein', 
            price: 300, 
            description: 'Erlaubt das Fahren von Booten',
            requirements: 'Mindestalter: 16 Jahre',
            icon: '⛵',
            category: 'marine'
        },
        { 
            id: 'business_license', 
            name: 'Gewerbeschein', 
            price: 500, 
            description: 'Erlaubt die Führung eines Geschäfts',
            requirements: 'Geschäftsplan, Mindestalter: 18 Jahre',
            icon: '🏢',
            category: 'business'
        },
        { 
            id: 'hunting_license', 
            name: 'Jagdschein', 
            price: 800, 
            description: 'Erlaubt das Jagen von Tieren',
            requirements: 'Jagdschule, Mindestalter: 18 Jahre',
            icon: '🏹',
            category: 'hunting'
        }
    ];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const handleBuyLicense = (license) => {
        onAction('buyLicense', license);
    };

    const getLicenseStatus = (licenseId) => {
        return licenseData.licenses && licenseData.licenses.includes(licenseId);
    };

    const getLicenseCategoryColor = (category) => {
        const colors = {
            'transport': 'text-blue-400',
            'weapon': 'text-red-400',
            'aviation': 'text-cyan-400',
            'marine': 'text-indigo-400',
            'business': 'text-green-400',
            'hunting': 'text-orange-400'
        };
        return colors[category] || 'text-gray-400';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[700px] h-[600px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Lizenz-Büro</h2>
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

                {/* Spieler-Info */}
                <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Geld:</span>
                            <span className="text-green-400 font-semibold ml-2">
                                {formatMoney(licenseData.money || 0)}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400">Lizenzen:</span>
                            <span className="text-blue-400 font-semibold ml-2">
                                {licenseData.licenses ? licenseData.licenses.length : 0}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Lizenzen-Liste */}
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {availableLicenses.map((license, index) => (
                        <div
                            key={license.id}
                            onClick={() => handleBuyLicense(license)}
                            className={`bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer transition-colors border border-white border-opacity-20 relative group ${
                                selectedLicenseIndex === index 
                                    ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                    : 'hover:bg-opacity-20'
                            } ${getLicenseStatus(license.id) ? 'opacity-50' : ''}`}
                            title={`${license.name} - Enter zum Kaufen`}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="text-3xl">{license.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-white font-semibold text-lg">{license.name}</h3>
                                        <div className="flex items-center space-x-2">
                                            {getLicenseStatus(license.id) && (
                                                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                                    Besessen
                                                </span>
                                            )}
                                            <span className={`text-lg font-bold ${getLicenseCategoryColor(license.category)}`}>
                                                {formatMoney(license.price)}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-1">{license.description}</p>
                                    <p className="text-gray-400 text-xs mt-1">
                                        <span className="font-medium">Voraussetzungen:</span> {license.requirements}
                                    </p>
                                </div>
                            </div>
                            {selectedLicenseIndex === index && (
                                <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    ←
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Meine Lizenzen */}
                {licenseData.licenses && licenseData.licenses.length > 0 && (
                    <div className="mt-6 bg-white bg-opacity-10 rounded-lg p-4">
                        <h3 className="text-white font-semibold mb-3">Meine Lizenzen</h3>
                        <div className="flex flex-wrap gap-2">
                            {licenseData.licenses.map((licenseId) => {
                                const license = availableLicenses.find(l => l.id === licenseId);
                                return license ? (
                                    <div key={licenseId} className="bg-green-500 bg-opacity-20 text-green-400 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                                        <span>{license.icon}</span>
                                        <span>{license.name}</span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    </div>
                )}

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Lizenz-Büro Shortcuts</h2>
                                <button
                                    onClick={() => setShowHelp(false)}
                                    className="text-gray-400 hover:text-white text-2xl"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">ESC</span>
                                    <span className="text-white">Schließen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Pfeiltasten ↑↓</span>
                                    <span className="text-white">Lizenz-Navigation</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Enter</span>
                                    <span className="text-white">Lizenz kaufen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + H</span>
                                    <span className="text-white">Hilfe anzeigen</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// LicenseOffice als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LicenseOffice;
} else {
    window.LicenseOffice = LicenseOffice;
}
