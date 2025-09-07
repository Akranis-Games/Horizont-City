// Tuning Shop Komponente - Fahrzeug-Tuning mit Tastatur-Interaktionen
// Moderne Tuning-Shop-UI für Horizont-City Roleplay

const TuningShop = ({ data, onAction, onClose }) => {
    const [tuningData, setTuningData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [selectedPartIndex, setSelectedPartIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);
    const [previewMode, setPreviewMode] = React.useState(false);

    React.useEffect(() => {
        setTuningData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    if (previewMode) {
                        setPreviewMode(false);
                    } else {
                        onClose();
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();
                    setSelectedPartIndex(Math.max(0, selectedPartIndex - 1));
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    setSelectedPartIndex(Math.min(currentParts.length - 1, selectedPartIndex + 1));
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    setSelectedCategoryIndex(Math.max(0, selectedCategoryIndex - 1));
                    break;
                case 'arrowright':
                    event.preventDefault();
                    setSelectedCategoryIndex(Math.min(categories.length - 1, selectedCategoryIndex + 1));
                    break;
                case 'enter':
                    event.preventDefault();
                    if (currentParts[selectedPartIndex]) {
                        handleBuyPart(currentParts[selectedPartIndex]);
                    }
                    break;
                case 'p':
                    event.preventDefault();
                    setPreviewMode(!previewMode);
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
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
                case '5':
                    event.preventDefault();
                    setSelectedCategoryIndex(4);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [selectedCategoryIndex, selectedPartIndex, currentParts, previewMode, onClose, showHelp]);

    const categories = [
        { id: 'engine', name: 'Motor', icon: '🔧' },
        { id: 'transmission', name: 'Getriebe', icon: '⚙️' },
        { id: 'brakes', name: 'Bremsen', icon: '🛑' },
        { id: 'suspension', name: 'Fahrwerk', icon: '🔩' },
        { id: 'exterior', name: 'Außen', icon: '🎨' }
    ];

    const tuningParts = {
        engine: [
            { id: 'engine_1', name: 'Standard Motor', price: 0, performance: 0, description: 'Original Motor' },
            { id: 'engine_2', name: 'Sport Motor', price: 5000, performance: 20, description: 'Leistungssteigerung +20%' },
            { id: 'engine_3', name: 'Racing Motor', price: 15000, performance: 50, description: 'Leistungssteigerung +50%' },
            { id: 'engine_4', name: 'Turbo Motor', price: 25000, performance: 80, description: 'Leistungssteigerung +80%' }
        ],
        transmission: [
            { id: 'trans_1', name: 'Standard Getriebe', price: 0, performance: 0, description: 'Original Getriebe' },
            { id: 'trans_2', name: 'Sport Getriebe', price: 3000, performance: 15, description: 'Schnellere Schaltzeiten' },
            { id: 'trans_3', name: 'Racing Getriebe', price: 8000, performance: 30, description: 'Optimierte Schaltzeiten' }
        ],
        brakes: [
            { id: 'brake_1', name: 'Standard Bremsen', price: 0, performance: 0, description: 'Original Bremsen' },
            { id: 'brake_2', name: 'Sport Bremsen', price: 2000, performance: 25, description: 'Verbesserte Bremsleistung' },
            { id: 'brake_3', name: 'Carbon Bremsen', price: 6000, performance: 50, description: 'Hochleistungsbremsen' }
        ],
        suspension: [
            { id: 'susp_1', name: 'Standard Fahrwerk', price: 0, performance: 0, description: 'Original Fahrwerk' },
            { id: 'susp_2', name: 'Sport Fahrwerk', price: 4000, performance: 20, description: 'Tiefergelegt, härter' },
            { id: 'susp_3', name: 'Racing Fahrwerk', price: 10000, performance: 40, description: 'Racing Setup' }
        ],
        exterior: [
            { id: 'ext_1', name: 'Standard Lackierung', price: 0, performance: 0, description: 'Original Farbe' },
            { id: 'ext_2', name: 'Metallic Lackierung', price: 1000, performance: 0, description: 'Metallic Farbe' },
            { id: 'ext_3', name: 'Carbon Verkleidung', price: 5000, performance: 10, description: 'Carbon Teile' }
        ]
    };

    const currentParts = tuningParts[categories[selectedCategoryIndex].id] || [];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const handleBuyPart = (part) => {
        onAction('buyTuningPart', { part, category: categories[selectedCategoryIndex].id });
    };

    const getPerformanceColor = (performance) => {
        if (performance === 0) return 'text-gray-400';
        if (performance < 25) return 'text-green-400';
        if (performance < 50) return 'text-yellow-400';
        if (performance < 75) return 'text-orange-400';
        return 'text-red-400';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[900px] h-[600px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Tuning-Shop</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setPreviewMode(!previewMode)}
                            className={`px-3 py-1 rounded text-sm ${
                                previewMode ? 'bg-blue-600 text-white' : 'bg-white bg-opacity-10 text-gray-300'
                            }`}
                            title="P - Vorschau umschalten"
                        >
                            Vorschau {previewMode ? 'ON' : 'OFF'}
                        </button>
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

                {/* Fahrzeug-Info */}
                <div className="bg-white bg-opacity-10 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Fahrzeug:</span>
                            <span className="text-white font-semibold ml-2">
                                {tuningData.vehicleName || 'Kein Fahrzeug'}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400">Geld:</span>
                            <span className="text-green-400 font-semibold ml-2">
                                {formatMoney(tuningData.money || 0)}
                            </span>
                        </div>
                        <div>
                            <span className="text-gray-400">Gesamtleistung:</span>
                            <span className="text-blue-400 font-semibold ml-2">
                                {tuningData.totalPerformance || 0}%
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex space-x-6 h-80">
                    {/* Kategorien */}
                    <div className="w-48 space-y-2">
                        <h3 className="text-white font-semibold mb-3">Kategorien</h3>
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategoryIndex(index)}
                                className={`w-full p-3 rounded-lg text-left transition-colors relative group ${
                                    selectedCategoryIndex === index
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                                }`}
                                title={`${category.name} - Taste ${index + 1}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-xl">{category.icon}</span>
                                    <span>{category.name}</span>
                                </div>
                                {index < 5 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Teile-Liste */}
                    <div className="flex-1">
                        <h3 className="text-white font-semibold mb-3">
                            {categories[selectedCategoryIndex]?.name} Teile
                        </h3>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {currentParts.map((part, index) => (
                                <div
                                    key={part.id}
                                    onClick={() => handleBuyPart(part)}
                                    className={`bg-white bg-opacity-10 rounded-lg p-3 cursor-pointer transition-colors border border-white border-opacity-20 relative group ${
                                        selectedPartIndex === index 
                                            ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                            : 'hover:bg-opacity-20'
                                    }`}
                                    title={`${part.name} - Enter zum Kaufen`}
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <div className="text-white font-medium">{part.name}</div>
                                            <div className="text-gray-400 text-sm">{part.description}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-bold ${getPerformanceColor(part.performance)}`}>
                                                {part.performance > 0 ? `+${part.performance}%` : 'Standard'}
                                            </div>
                                            <div className="text-green-400 font-semibold">
                                                {formatMoney(part.price)}
                                            </div>
                                        </div>
                                    </div>
                                    {selectedPartIndex === index && (
                                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                            ←
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vorschau */}
                    {previewMode && (
                        <div className="w-64">
                            <h3 className="text-white font-semibold mb-3">Vorschau</h3>
                            <div className="bg-white bg-opacity-10 rounded-lg p-4 h-64 flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <div className="text-4xl mb-2">🚗</div>
                                    <div className="text-sm">Fahrzeug-Vorschau</div>
                                    <div className="text-xs mt-2">
                                        Tuning-Teile werden hier<br />
                                        visuell dargestellt
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Tuning-Shop Shortcuts</h2>
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
                                        <span className="text-white">Schließen/Vorschau aus</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten ←→</span>
                                        <span className="text-white">Kategorie wechseln</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten ↑↓</span>
                                        <span className="text-white">Teil-Navigation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Enter</span>
                                        <span className="text-white">Teil kaufen</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">P</span>
                                        <span className="text-white">Vorschau umschalten</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">1-5</span>
                                        <span className="text-white">Kategorie-Schnellzugriff</span>
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

// TuningShop als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TuningShop;
} else {
    window.TuningShop = TuningShop;
}
