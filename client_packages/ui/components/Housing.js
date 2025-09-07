// Housing Komponente - Vollständiges Immobilien-System mit Einrichtung und Möbeln
// Moderne Housing-UI für Horizont-City Roleplay

const Housing = ({ data, onAction, onClose }) => {
    const [housingData, setHousingData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedProperty, setSelectedProperty] = React.useState(null);

    React.useEffect(() => {
        setHousingData(data || {});
    }, [data]);

    const tabs = [
        { id: 'overview', name: 'Übersicht', icon: '📊' },
        { id: 'myproperties', name: 'Meine Immobilien', icon: '🏠' },
        { id: 'available', name: 'Verfügbar', icon: '🏘️' },
        { id: 'furniture', name: 'Möbel', icon: '🪑' },
        { id: 'utilities', name: 'Nebenkosten', icon: '⚡' },
        { id: 'maintenance', name: 'Wartung', icon: '🔧' },
        { id: 'rentals', name: 'Vermietung', icon: '💰' },
        { id: 'agents', name: 'Makler', icon: '👔' }
    ];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const getPropertyTypeIcon = (type) => {
        const icons = {
            'house': '🏠',
            'apartment': '🏢',
            'condo': '🏘️',
            'mansion': '🏰',
            'studio': '🏠'
        };
        return icons[type] || '🏠';
    };

    const getPropertyStatusColor = (status) => {
        const colors = {
            'owned': 'text-green-400',
            'rented': 'text-blue-400',
            'for_sale': 'text-yellow-400',
            'for_rent': 'text-purple-400',
            'maintenance': 'text-red-400'
        };
        return colors[status] || 'text-gray-400';
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* Aktuelle Immobilie */}
            {housingData.currentProperty ? (
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">Aktuelle Immobilie</h3>
                        <div className="text-white text-xl font-semibold mb-2">
                            {getPropertyTypeIcon(housingData.currentProperty.type)} {housingData.currentProperty.name}
                        </div>
                        <p className="text-green-200 text-sm mb-4">{housingData.currentProperty.address}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-green-200">Größe:</span>
                                <span className="text-white ml-2">{housingData.currentProperty.size}m²</span>
                            </div>
                            <div>
                                <span className="text-green-200">Wert:</span>
                                <span className="text-white ml-2">{formatMoney(housingData.currentProperty.value)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">Keine Immobilie</h3>
                        <p className="text-gray-300 text-sm mb-4">Kaufe oder miete eine Immobilie</p>
                        <button
                            onClick={() => setActiveTab('available')}
                            className="btn-primary py-2 px-4"
                        >
                            Immobilien suchen
                        </button>
                    </div>
                </div>
            )}

            {/* Statistiken */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{housingData.totalProperties || 0}</div>
                        <div className="text-gray-400 text-sm">Immobilien</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{formatMoney(housingData.totalValue || 0)}</div>
                        <div className="text-gray-400 text-sm">Gesamtwert</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{formatMoney(housingData.monthlyIncome || 0)}</div>
                        <div className="text-gray-400 text-sm">Monatseinkommen</div>
                    </div>
                </div>
            </div>

            {/* Schnellzugriff */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setActiveTab('myproperties')}
                    className="btn-primary py-4 text-center"
                >
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm">Meine Immobilien</div>
                </button>
                <button
                    onClick={() => setActiveTab('available')}
                    className="btn-secondary py-4 text-center"
                >
                    <div className="text-2xl mb-2">🏘️</div>
                    <div className="text-sm">Verfügbar</div>
                </button>
                <button
                    onClick={() => setActiveTab('furniture')}
                    className="btn-warning py-4 text-center"
                >
                    <div className="text-2xl mb-2">🪑</div>
                    <div className="text-sm">Möbel</div>
                </button>
                <button
                    onClick={() => setActiveTab('utilities')}
                    className="btn-success py-4 text-center"
                >
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm">Nebenkosten</div>
                </button>
            </div>
        </div>
    );

    const renderMyPropertiesTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Meine Immobilien</h4>
                <button
                    onClick={() => setActiveTab('available')}
                    className="btn-primary text-sm py-2 px-3"
                >
                    Neue kaufen
                </button>
            </div>

            <div className="space-y-3">
                {housingData.properties?.map((property, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedProperty(property)}
                        className="bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer hover:bg-opacity-20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getPropertyTypeIcon(property.type)}</span>
                                <div>
                                    <div className="text-white font-medium">{property.name}</div>
                                    <div className="text-gray-400 text-sm">{property.address}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${getPropertyStatusColor(property.status)}`}>
                                    {property.status}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    {formatMoney(property.value)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Größe:</span>
                                <span className="text-white ml-2">{property.size}m²</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Möbel:</span>
                                <span className="text-white ml-2">{property.furnitureCount}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAvailableTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Verfügbare Immobilien</h4>
                <div className="flex space-x-2">
                    <select className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Typen</option>
                        <option value="house">Haus</option>
                        <option value="apartment">Wohnung</option>
                        <option value="condo">Eigentumswohnung</option>
                        <option value="mansion">Villa</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                {housingData.availableProperties?.map((property, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getPropertyTypeIcon(property.type)}</span>
                                <div>
                                    <div className="text-white font-medium">{property.name}</div>
                                    <div className="text-gray-400 text-sm">{property.address}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(property.price)}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {property.size}m²
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                                <span className="text-gray-400">Typ:</span>
                                <span className="text-white ml-2">{property.type}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Zimmer:</span>
                                <span className="text-white ml-2">{property.bedrooms}</span>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onAction('buyProperty', { property })}
                                className="btn-primary text-sm py-2 px-4 flex-1"
                            >
                                Kaufen
                            </button>
                            <button
                                onClick={() => onAction('propertyInfo', { property })}
                                className="btn-secondary text-sm py-2 px-4"
                            >
                                Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderFurnitureTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Möbel & Einrichtung</h4>
            
            {selectedProperty ? (
                <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-white font-medium mb-2">{selectedProperty.name}</div>
                            <div className="text-gray-400 text-sm">{selectedProperty.address}</div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <h5 className="text-white font-medium">Verfügbare Möbel</h5>
                        {selectedProperty.furniture?.map((furniture, index) => (
                            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-white font-medium">{furniture.name}</div>
                                        <div className="text-gray-400 text-sm">{furniture.description}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">{formatMoney(furniture.price)}</div>
                                        <button
                                            onClick={() => onAction('buyFurniture', { property: selectedProperty, furniture })}
                                            className="btn-primary text-xs py-1 px-2"
                                        >
                                            Kaufen
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-lg mb-4">Wähle eine Immobilie aus</div>
                    <button
                        onClick={() => setActiveTab('myproperties')}
                        className="btn-primary"
                    >
                        Immobilien anzeigen
                    </button>
                </div>
            )}
        </div>
    );

    const renderCurrentTab = () => {
        switch (activeTab) {
            case 'overview': return renderOverviewTab();
            case 'myproperties': return renderMyPropertiesTab();
            case 'available': return renderAvailableTab();
            case 'furniture': return renderFurnitureTab();
            default: return renderOverviewTab();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[700px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Immobilien</h2>
                    <button
                        onClick={onClose}
                        className="text-white text-xl hover:text-gray-300"
                    >
                        ✕
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                activeTab === tab.id
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                            }`}
                        >
                            {tab.icon} {tab.name}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="h-full overflow-y-auto">
                    {renderCurrentTab()}
                </div>
            </div>
        </div>
    );
};

// Housing als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Housing;
} else {
    window.Housing = Housing;
}
