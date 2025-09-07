// Inventory Komponente - Umfassendes Inventar-System mit Items und Trading
// Moderne Inventar-UI für Horizont-City Roleplay

const Inventory = ({ data, onAction, onClose }) => {
    const [inventoryData, setInventoryData] = React.useState(data || {});
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('inventory');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);

    React.useEffect(() => {
        setInventoryData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    if (selectedItem) {
                        setSelectedItem(null);
                    } else {
                        onClose();
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();
                    if (activeTab === 'inventory') {
                        setSelectedItemIndex(Math.max(0, selectedItemIndex - 4));
                    } else if (activeTab === 'trading') {
                        // Trading navigation
                    }
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    if (activeTab === 'inventory') {
                        setSelectedItemIndex(Math.min(filteredItems.length - 1, selectedItemIndex + 4));
                    }
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    if (activeTab === 'inventory') {
                        setSelectedItemIndex(Math.max(0, selectedItemIndex - 1));
                    } else {
                        setSelectedCategoryIndex(Math.max(0, selectedCategoryIndex - 1));
                    }
                    break;
                case 'arrowright':
                    event.preventDefault();
                    if (activeTab === 'inventory') {
                        setSelectedItemIndex(Math.min(filteredItems.length - 1, selectedItemIndex + 1));
                    } else {
                        setSelectedCategoryIndex(Math.min(categories.length - 1, selectedCategoryIndex + 1));
                    }
                    break;
                case 'enter':
                    event.preventDefault();
                    if (activeTab === 'inventory' && filteredItems[selectedItemIndex]) {
                        handleItemClick(filteredItems[selectedItemIndex]);
                    } else if (activeTab === 'inventory') {
                        setActiveTab(categories[selectedCategoryIndex].id);
                    }
                    break;
                case 'tab':
                    event.preventDefault();
                    setActiveTab(activeTab === 'inventory' ? 'trading' : 'inventory');
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
                        document.querySelector('input[placeholder="Items durchsuchen..."]')?.focus();
                    }
                    break;
                case '1':
                    event.preventDefault();
                    setActiveTab('inventory');
                    break;
                case '2':
                    event.preventDefault();
                    setActiveTab('trading');
                    break;
                case 'u':
                    event.preventDefault();
                    if (selectedItem) {
                        handleItemAction('use', selectedItem);
                    }
                    break;
                case 'd':
                    event.preventDefault();
                    if (selectedItem) {
                        handleItemAction('drop', selectedItem);
                    }
                    break;
                case 'g':
                    event.preventDefault();
                    if (selectedItem) {
                        handleItemAction('give', selectedItem);
                    }
                    break;
                case 's':
                    event.preventDefault();
                    if (selectedItem) {
                        handleItemAction('sell', selectedItem);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [activeTab, selectedItemIndex, selectedCategoryIndex, filteredItems, selectedItem, onClose, showHelp]);

    const categories = [
        { id: 'all', name: 'Alle', icon: '📦' },
        { id: 'weapons', name: 'Waffen', icon: '🔫' },
        { id: 'tools', name: 'Werkzeuge', icon: '🔧' },
        { id: 'food', name: 'Nahrung', icon: '🍎' },
        { id: 'drinks', name: 'Getränke', icon: '🥤' },
        { id: 'clothing', name: 'Kleidung', icon: '👕' },
        { id: 'electronics', name: 'Elektronik', icon: '📱' },
        { id: 'misc', name: 'Sonstiges', icon: '📄' }
    ];

    const filteredItems = inventoryData.items?.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeTab === 'all' || item.category === activeTab;
        return matchesSearch && matchesCategory;
    }) || [];

    const formatWeight = (weight) => {
        return `${weight.toFixed(1)} kg`;
    };

    const formatValue = (value) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(value);
    };

    const getItemRarityColor = (rarity) => {
        const colors = {
            'common': 'text-gray-400',
            'uncommon': 'text-green-400',
            'rare': 'text-blue-400',
            'epic': 'text-purple-400',
            'legendary': 'text-yellow-400'
        };
        return colors[rarity] || 'text-gray-400';
    };

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    const handleItemAction = (action, item) => {
        onAction(action, item);
        setSelectedItem(null);
    };

    const renderInventoryTab = () => (
        <div className="space-y-4">
            {/* Suchleiste */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Items durchsuchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 pl-10 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                    🔍
                </div>
            </div>

            {/* Kategorien */}
            <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveTab(category.id)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors relative group ${
                            activeTab === category.id
                                ? 'bg-blue-600 text-white'
                                : selectedCategoryIndex === index
                                ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400 text-white'
                                : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                        }`}
                        title={`${category.name} - Pfeiltasten + Enter`}
                    >
                        {category.icon} {category.name}
                        {selectedCategoryIndex === index && activeTab !== category.id && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                                ←
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Inventar-Grid */}
            <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {filteredItems.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleItemClick(item)}
                        className={`bg-white bg-opacity-10 rounded-lg p-3 cursor-pointer transition-colors border border-white border-opacity-20 relative group ${
                            selectedItemIndex === index 
                                ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                : 'hover:bg-opacity-20'
                        }`}
                        title={`${item.name} - Enter zum Öffnen, U=Verwenden, D=Wegwerfen, G=Geben, S=Verkaufen`}
                    >
                        <div className="text-center">
                            <div className="text-2xl mb-2">{item.icon}</div>
                            <div className="text-white text-sm font-medium truncate">{item.name}</div>
                            <div className="text-gray-400 text-xs">x{item.quantity}</div>
                            <div className={`text-xs ${getItemRarityColor(item.rarity)}`}>
                                {item.rarity}
                            </div>
                        </div>
                        {selectedItemIndex === index && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                ←
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Inventar-Statistiken */}
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-400">Gewicht:</span>
                        <span className="text-white ml-2">
                            {formatWeight(inventoryData.currentWeight || 0)} / {formatWeight(inventoryData.maxWeight || 50)}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Items:</span>
                        <span className="text-white ml-2">
                            {inventoryData.items?.length || 0} / {inventoryData.maxItems || 100}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Wert:</span>
                        <span className="text-white ml-2">
                            {formatValue(inventoryData.totalValue || 0)}
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-400">Räumlich:</span>
                        <span className="text-white ml-2">
                            {inventoryData.spaceUsed || 0} / {inventoryData.maxSpace || 100}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderTradingTab = () => (
        <div className="space-y-4">
            <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-4">Trading</h3>
                <p className="text-gray-400 text-sm">Handel mit anderen Spielern</p>
            </div>

            <div className="space-y-3">
                <button
                    onClick={() => onAction('startTrade')}
                    className="w-full btn-primary py-3"
                >
                    Handel starten
                </button>
                <button
                    onClick={() => onAction('joinTrade')}
                    className="w-full btn-secondary py-3"
                >
                    Handel beitreten
                </button>
                <button
                    onClick={() => onAction('tradeHistory')}
                    className="w-full btn-secondary py-3"
                >
                    Handelshistorie
                </button>
            </div>

            {/* Aktive Trades */}
            {inventoryData.activeTrades && inventoryData.activeTrades.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-white font-medium">Aktive Trades</h4>
                    {inventoryData.activeTrades.map((trade, index) => (
                        <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="text-white text-sm font-medium">{trade.partner}</div>
                                    <div className="text-gray-400 text-xs">{trade.status}</div>
                                </div>
                                <button
                                    onClick={() => onAction('viewTrade', trade)}
                                    className="btn-primary text-xs py-1 px-2"
                                >
                                    Anzeigen
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    const renderItemDetails = () => {
        if (!selectedItem) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-lg font-semibold">{selectedItem.name}</h3>
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-4xl mb-2">{selectedItem.icon}</div>
                            <div className={`text-sm ${getItemRarityColor(selectedItem.rarity)}`}>
                                {selectedItem.rarity}
                            </div>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Typ:</span>
                                <span className="text-white">{selectedItem.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Menge:</span>
                                <span className="text-white">{selectedItem.quantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Gewicht:</span>
                                <span className="text-white">{formatWeight(selectedItem.weight)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Wert:</span>
                                <span className="text-white">{formatValue(selectedItem.value)}</span>
                            </div>
                            {selectedItem.description && (
                                <div>
                                    <span className="text-gray-400">Beschreibung:</span>
                                    <p className="text-white text-xs mt-1">{selectedItem.description}</p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => handleItemAction('use', selectedItem)}
                                className="btn-primary text-sm py-2"
                            >
                                Verwenden
                            </button>
                            <button
                                onClick={() => handleItemAction('drop', selectedItem)}
                                className="btn-danger text-sm py-2"
                            >
                                Wegwerfen
                            </button>
                            <button
                                onClick={() => handleItemAction('give', selectedItem)}
                                className="btn-secondary text-sm py-2"
                            >
                                Geben
                            </button>
                            <button
                                onClick={() => handleItemAction('sell', selectedItem)}
                                className="btn-success text-sm py-2"
                            >
                                Verkaufen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-96 h-[600px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Inventar</h2>
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
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('inventory')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'inventory'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                        }`}
                    >
                        Inventar
                    </button>
                    <button
                        onClick={() => setActiveTab('trading')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            activeTab === 'trading'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                        }`}
                    >
                        Trading
                    </button>
                </div>

                {/* Content */}
                <div className="h-full overflow-y-auto">
                    {activeTab === 'inventory' && renderInventoryTab()}
                    {activeTab === 'trading' && renderTradingTab()}
                </div>

                {/* Item Details Modal */}
                {renderItemDetails()}

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Inventar Shortcuts</h2>
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
                                        <span className="text-gray-300">Pfeiltasten</span>
                                        <span className="text-white">Navigation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Enter</span>
                                        <span className="text-white">Item öffnen</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">TAB</span>
                                        <span className="text-white">Tab wechseln</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">1-2</span>
                                        <span className="text-white">Tab-Schnellzugriff</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">U</span>
                                        <span className="text-white">Item verwenden</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">D</span>
                                        <span className="text-white">Item wegwerfen</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">G</span>
                                        <span className="text-white">Item geben</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">S</span>
                                        <span className="text-white">Item verkaufen</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Ctrl + F</span>
                                        <span className="text-white">Suchen fokussieren</span>
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

// Inventory als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Inventory;
} else {
    window.Inventory = Inventory;
}
