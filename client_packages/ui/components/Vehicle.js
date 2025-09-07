// Vehicle Komponente - Komplettes Fahrzeug-System mit Modifikationen und Verwaltung
// Moderne Vehicle-UI für Horizont-City Roleplay

const Vehicle = ({ data, onAction, onClose }) => {
    const [vehicleData, setVehicleData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedVehicle, setSelectedVehicle] = React.useState(null);

    React.useEffect(() => {
        setVehicleData(data || {});
    }, [data]);

    const tabs = [
        { id: 'overview', name: 'Übersicht', icon: '📊' },
        { id: 'myvehicles', name: 'Meine Fahrzeuge', icon: '🚗' },
        { id: 'dealers', name: 'Händler', icon: '🏪' },
        { id: 'garages', name: 'Garagen', icon: '🏠' },
        { id: 'modifications', name: 'Tuning', icon: '🔧' },
        { id: 'insurance', name: 'Versicherung', icon: '🛡️' },
        { id: 'maintenance', name: 'Wartung', icon: '🔧' },
        { id: 'history', name: 'Historie', icon: '📋' }
    ];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const getVehicleStatusColor = (status) => {
        const colors = {
            'spawned': 'text-green-400',
            'parked': 'text-blue-400',
            'damaged': 'text-red-400',
            'stolen': 'text-yellow-400',
            'impounded': 'text-gray-400'
        };
        return colors[status] || 'text-gray-400';
    };

    const getVehicleStatusIcon = (status) => {
        const icons = {
            'spawned': '✅',
            'parked': '🅿️',
            'damaged': '⚠️',
            'stolen': '🚨',
            'impounded': '🔒'
        };
        return icons[status] || '❓';
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* Aktuelles Fahrzeug */}
            {vehicleData.currentVehicle ? (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">Aktuelles Fahrzeug</h3>
                        <div className="text-white text-xl font-semibold mb-2">
                            {vehicleData.currentVehicle.model}
                        </div>
                        <p className="text-blue-200 text-sm mb-4">{vehicleData.currentVehicle.licensePlate}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-blue-200">Status:</span>
                                <span className="text-white ml-2">{vehicleData.currentVehicle.status}</span>
                            </div>
                            <div>
                                <span className="text-blue-200">Kraftstoff:</span>
                                <span className="text-white ml-2">{vehicleData.currentVehicle.fuel}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">Kein Fahrzeug</h3>
                        <p className="text-gray-300 text-sm mb-4">Kaufe oder spawne ein Fahrzeug</p>
                        <button
                            onClick={() => setActiveTab('myvehicles')}
                            className="btn-primary py-2 px-4"
                        >
                            Fahrzeuge anzeigen
                        </button>
                    </div>
                </div>
            )}

            {/* Statistiken */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{vehicleData.totalVehicles || 0}</div>
                        <div className="text-gray-400 text-sm">Fahrzeuge</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{vehicleData.totalValue || 0}€</div>
                        <div className="text-gray-400 text-sm">Gesamtwert</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{vehicleData.totalMileage || 0}km</div>
                        <div className="text-gray-400 text-sm">Kilometerstand</div>
                    </div>
                </div>
            </div>

            {/* Schnellzugriff */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setActiveTab('myvehicles')}
                    className="btn-primary py-4 text-center"
                >
                    <div className="text-2xl mb-2">🚗</div>
                    <div className="text-sm">Meine Fahrzeuge</div>
                </button>
                <button
                    onClick={() => setActiveTab('dealers')}
                    className="btn-secondary py-4 text-center"
                >
                    <div className="text-2xl mb-2">🏪</div>
                    <div className="text-sm">Händler</div>
                </button>
                <button
                    onClick={() => setActiveTab('garages')}
                    className="btn-warning py-4 text-center"
                >
                    <div className="text-2xl mb-2">🏠</div>
                    <div className="text-sm">Garagen</div>
                </button>
                <button
                    onClick={() => setActiveTab('modifications')}
                    className="btn-success py-4 text-center"
                >
                    <div className="text-2xl mb-2">🔧</div>
                    <div className="text-sm">Tuning</div>
                </button>
            </div>
        </div>
    );

    const renderMyVehiclesTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Meine Fahrzeuge</h4>
                <button
                    onClick={() => setActiveTab('dealers')}
                    className="btn-primary text-sm py-2 px-3"
                >
                    Neues kaufen
                </button>
            </div>

            <div className="space-y-3">
                {vehicleData.vehicles?.map((vehicle, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer hover:bg-opacity-20 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">🚗</span>
                                <div>
                                    <div className="text-white font-medium">{vehicle.model}</div>
                                    <div className="text-gray-400 text-sm">{vehicle.licensePlate}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${getVehicleStatusColor(vehicle.status)}`}>
                                    {getVehicleStatusIcon(vehicle.status)} {vehicle.status}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    {formatMoney(vehicle.value)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Gesundheit:</span>
                                <span className="text-white ml-2">{vehicle.health}%</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Kraftstoff:</span>
                                <span className="text-white ml-2">{vehicle.fuel}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderDealersTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Fahrzeughändler</h4>
            
            <div className="space-y-3">
                {vehicleData.dealers?.map((dealer, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="text-white font-medium">{dealer.name}</div>
                                <div className="text-gray-400 text-sm">{dealer.location}</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${dealer.isOpen ? 'text-green-400' : 'text-red-400'}`}>
                                    {dealer.isOpen ? 'Geöffnet' : 'Geschlossen'}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    {dealer.vehicleCount} Fahrzeuge
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onAction('visitDealer', { dealer })}
                                className="btn-primary text-sm py-2 px-4 flex-1"
                            >
                                Besuchen
                            </button>
                            <button
                                onClick={() => onAction('dealerInfo', { dealer })}
                                className="btn-secondary text-sm py-2 px-4"
                            >
                                Info
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderGaragesTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Garagen</h4>
            
            <div className="space-y-3">
                {vehicleData.garages?.map((garage, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                            <div>
                                <div className="text-white font-medium">{garage.name}</div>
                                <div className="text-gray-400 text-sm">{garage.location}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {garage.vehicles.length}/{garage.capacity}
                                </div>
                                <div className="text-gray-400 text-sm">Plätze</div>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            <button
                                onClick={() => onAction('visitGarage', { garage })}
                                className="btn-primary text-sm py-2 px-4 flex-1"
                            >
                                Besuchen
                            </button>
                            <button
                                onClick={() => onAction('garageInfo', { garage })}
                                className="btn-secondary text-sm py-2 px-4"
                            >
                                Info
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderModificationsTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Fahrzeug-Tuning</h4>
            
            {selectedVehicle ? (
                <div className="space-y-4">
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="text-center">
                            <div className="text-white font-medium mb-2">{selectedVehicle.model}</div>
                            <div className="text-gray-400 text-sm">{selectedVehicle.licensePlate}</div>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <h5 className="text-white font-medium">Verfügbare Modifikationen</h5>
                        {selectedVehicle.modifications?.map((mod, index) => (
                            <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="text-white font-medium">{mod.name}</div>
                                        <div className="text-gray-400 text-sm">{mod.description}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-bold">{formatMoney(mod.price)}</div>
                                        <button
                                            onClick={() => onAction('installMod', { vehicle: selectedVehicle, mod })}
                                            className="btn-primary text-xs py-1 px-2"
                                        >
                                            Installieren
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <div className="text-gray-400 text-lg mb-4">Wähle ein Fahrzeug aus</div>
                    <button
                        onClick={() => setActiveTab('myvehicles')}
                        className="btn-primary"
                    >
                        Fahrzeuge anzeigen
                    </button>
                </div>
            )}
        </div>
    );

    const renderCurrentTab = () => {
        switch (activeTab) {
            case 'overview': return renderOverviewTab();
            case 'myvehicles': return renderMyVehiclesTab();
            case 'dealers': return renderDealersTab();
            case 'garages': return renderGaragesTab();
            case 'modifications': return renderModificationsTab();
            default: return renderOverviewTab();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[700px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Fahrzeuge</h2>
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

// Vehicle als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Vehicle;
} else {
    window.Vehicle = Vehicle;
}
