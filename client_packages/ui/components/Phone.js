// Phone Komponente - iPhone 16 und iPad mit Apps, Nachrichten und Einstellungen
// Moderne Smartphone-UI für Horizont-City Roleplay

const Phone = ({ data, onAction, onClose }) => {
    const [currentApp, setCurrentApp] = React.useState('home');
    const [phoneData, setPhoneData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [selectedAppIndex, setSelectedAppIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);

    React.useEffect(() => {
        setPhoneData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    if (currentApp !== 'home') {
                        setCurrentApp('home');
                    } else {
                        onClose();
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();
                    if (currentApp === 'home') {
                        setSelectedAppIndex(Math.max(0, selectedAppIndex - 4));
                    }
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    if (currentApp === 'home') {
                        setSelectedAppIndex(Math.min(apps.length - 1, selectedAppIndex + 4));
                    }
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    if (currentApp === 'home') {
                        setSelectedAppIndex(Math.max(0, selectedAppIndex - 1));
                    }
                    break;
                case 'arrowright':
                    event.preventDefault();
                    if (currentApp === 'home') {
                        setSelectedAppIndex(Math.min(apps.length - 1, selectedAppIndex + 1));
                    }
                    break;
                case 'enter':
                    event.preventDefault();
                    if (currentApp === 'home') {
                        setCurrentApp(apps[selectedAppIndex].id);
                    }
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
                    }
                    break;
                case '1':
                    event.preventDefault();
                    setCurrentApp('messages');
                    break;
                case '2':
                    event.preventDefault();
                    setCurrentApp('contacts');
                    break;
                case '3':
                    event.preventDefault();
                    setCurrentApp('bank');
                    break;
                case '4':
                    event.preventDefault();
                    setCurrentApp('job');
                    break;
                case '5':
                    event.preventDefault();
                    setCurrentApp('settings');
                    break;
                case '0':
                    event.preventDefault();
                    setCurrentApp('home');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentApp, selectedAppIndex, onClose, showHelp]);

    const apps = [
        { id: 'messages', name: 'Nachrichten', icon: '💬', color: 'bg-green-500' },
        { id: 'contacts', name: 'Kontakte', icon: '👥', color: 'bg-blue-500' },
        { id: 'camera', name: 'Kamera', icon: '📷', color: 'bg-gray-500' },
        { id: 'gallery', name: 'Galerie', icon: '🖼️', color: 'bg-purple-500' },
        { id: 'music', name: 'Musik', icon: '🎵', color: 'bg-pink-500' },
        { id: 'maps', name: 'Karten', icon: '🗺️', color: 'bg-orange-500' },
        { id: 'weather', name: 'Wetter', icon: '🌤️', color: 'bg-cyan-500' },
        { id: 'calculator', name: 'Taschenrechner', icon: '🧮', color: 'bg-gray-600' },
        { id: 'notes', name: 'Notizen', icon: '📝', color: 'bg-yellow-500' },
        { id: 'settings', name: 'Einstellungen', icon: '⚙️', color: 'bg-gray-700' },
        { id: 'bank', name: 'Bank', icon: '🏦', color: 'bg-green-600' },
        { id: 'job', name: 'Job', icon: '💼', color: 'bg-indigo-500' }
    ];

    const renderHomeScreen = () => (
        <div className="space-y-6">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white text-sm">
                <span>9:41</span>
                <div className="flex items-center space-x-1">
                    <span>📶</span>
                    <span>📶</span>
                    <span>🔋</span>
                </div>
            </div>

            {/* Wallpaper */}
            <div className="h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <div className="text-center text-white">
                    <div className="text-2xl font-bold">Horizont-City</div>
                    <div className="text-sm opacity-80">Roleplay Server</div>
                </div>
            </div>

            {/* Apps Grid */}
            <div className="grid grid-cols-4 gap-4">
                {apps.map((app, index) => (
                    <button
                        key={app.id}
                        onClick={() => setCurrentApp(app.id)}
                        className={`flex flex-col items-center space-y-2 p-3 rounded-xl transition-colors relative group ${
                            selectedAppIndex === index 
                                ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                : 'hover:bg-white hover:bg-opacity-10'
                        }`}
                        title={`${app.name} - ${index < 5 ? `Taste ${index + 1}` : 'Pfeiltasten + Enter'}`}
                    >
                        <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center text-2xl`}>
                            {app.icon}
                        </div>
                        <span className="text-white text-xs text-center">{app.name}</span>
                        {index < 5 && (
                            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {index + 1}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Dock */}
            <div className="flex justify-center space-x-8">
                <button className="text-white text-2xl">📞</button>
                <button className="text-white text-2xl">💬</button>
                <button className="text-white text-2xl">🌐</button>
                <button className="text-white text-2xl">📱</button>
            </div>
        </div>
    );

    const renderMessages = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentApp('home')}
                    className="text-white text-lg"
                >
                    ← Zurück
                </button>
                <h2 className="text-white text-lg font-semibold">Nachrichten</h2>
                <button className="text-white text-lg">✏️</button>
            </div>

            <div className="space-y-2">
                {phoneData.messages?.map((message, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                                {message.sender.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1">
                            <div className="text-white font-medium">{message.sender}</div>
                            <div className="text-gray-300 text-sm">{message.preview}</div>
                        </div>
                        <div className="text-gray-400 text-xs">{message.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContacts = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentApp('home')}
                    className="text-white text-lg"
                >
                    ← Zurück
                </button>
                <h2 className="text-white text-lg font-semibold">Kontakte</h2>
                <button className="text-white text-lg">+</button>
            </div>

            <div className="space-y-2">
                {phoneData.contacts?.map((contact, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white bg-opacity-10 rounded-lg">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                                {contact.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div className="flex-1">
                            <div className="text-white font-medium">{contact.name}</div>
                            <div className="text-gray-300 text-sm">{contact.phone}</div>
                        </div>
                        <button className="text-blue-400 text-sm">📞</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderBank = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentApp('home')}
                    className="text-white text-lg"
                >
                    ← Zurück
                </button>
                <h2 className="text-white text-lg font-semibold">Bank</h2>
                <button className="text-white text-lg">⚙️</button>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-4">
                    <div className="text-white text-sm opacity-80">Kontostand</div>
                    <div className="text-white text-2xl font-bold">
                        {new Intl.NumberFormat('de-DE', {
                            style: 'currency',
                            currency: 'EUR'
                        }).format(phoneData.bankBalance || 0)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <button
                        onClick={() => onAction('bankDeposit')}
                        className="btn-success py-3"
                    >
                        Einzahlen
                    </button>
                    <button
                        onClick={() => onAction('bankWithdraw')}
                        className="btn-primary py-3"
                    >
                        Abheben
                    </button>
                </div>

                <div className="space-y-2">
                    <h3 className="text-white font-medium">Letzte Transaktionen</h3>
                    {phoneData.transactions?.map((transaction, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-white bg-opacity-10 rounded">
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
                    ))}
                </div>
            </div>
        </div>
    );

    const renderJob = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentApp('home')}
                    className="text-white text-lg"
                >
                    ← Zurück
                </button>
                <h2 className="text-white text-lg font-semibold">Job</h2>
                <button className="text-white text-lg">ℹ️</button>
            </div>

            <div className="space-y-4">
                {phoneData.currentJob ? (
                    <div className="bg-blue-600 rounded-xl p-4">
                        <div className="text-white font-semibold text-lg">
                            {phoneData.currentJob.name}
                        </div>
                        <div className="text-blue-200 text-sm">
                            {phoneData.currentJob.description}
                        </div>
                        <div className="mt-3 flex space-x-2">
                            <button
                                onClick={() => onAction('jobComplete')}
                                className="btn-success text-sm py-2 px-3"
                            >
                                Abschließen
                            </button>
                            <button
                                onClick={() => onAction('jobQuit')}
                                className="btn-danger text-sm py-2 px-3"
                            >
                                Beenden
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-400 text-lg mb-4">Kein aktiver Job</div>
                        <button
                            onClick={() => onAction('jobSearch')}
                            className="btn-primary"
                        >
                            Jobs suchen
                        </button>
                    </div>
                )}

                <div className="space-y-2">
                    <h3 className="text-white font-medium">Verfügbare Jobs</h3>
                    {phoneData.availableJobs?.map((job, index) => (
                        <div key={index} className="p-3 bg-white bg-opacity-10 rounded-lg">
                            <div className="text-white font-medium">{job.name}</div>
                            <div className="text-gray-300 text-sm">{job.description}</div>
                            <div className="text-green-400 text-sm font-semibold">
                                {job.salary}€/Stunde
                            </div>
                            <button
                                onClick={() => onAction('jobApply', { jobId: job.id })}
                                className="btn-primary text-sm py-1 px-3 mt-2"
                            >
                                Bewerben
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSettings = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={() => setCurrentApp('home')}
                    className="text-white text-lg"
                >
                    ← Zurück
                </button>
                <h2 className="text-white text-lg font-semibold">Einstellungen</h2>
                <div></div>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <h3 className="text-white font-medium">Allgemein</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg">
                            <span className="text-white">Benachrichtigungen</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg">
                            <span className="text-white">Musik</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg">
                            <span className="text-white">Sprachchat</span>
                            <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <h3 className="text-white font-medium">Anzeige</h3>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg">
                            <span className="text-white">UI-Skalierung</span>
                            <select className="bg-gray-700 text-white rounded px-2 py-1">
                                <option>100%</option>
                                <option>125%</option>
                                <option>150%</option>
                            </select>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white bg-opacity-10 rounded-lg">
                            <span className="text-white">Sprache</span>
                            <select className="bg-gray-700 text-white rounded px-2 py-1">
                                <option>Deutsch</option>
                                <option>English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCurrentApp = () => {
        switch (currentApp) {
            case 'messages': return renderMessages();
            case 'contacts': return renderContacts();
            case 'bank': return renderBank();
            case 'job': return renderJob();
            case 'settings': return renderSettings();
            default: return renderHomeScreen();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-80 h-[600px] p-6 relative">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white text-xl hover:text-gray-300"
                    title="ESC - Schließen"
                >
                    ✕
                </button>

                {/* Help Button */}
                <button
                    onClick={() => setShowHelp(!showHelp)}
                    className="absolute top-4 left-4 text-white text-xl hover:text-gray-300"
                    title="Ctrl + H - Hilfe"
                >
                    ❓
                </button>

                {/* Phone Content */}
                <div className="h-full overflow-y-auto">
                    {renderCurrentApp()}
                </div>

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Phone Shortcuts</h2>
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
                                    <span className="text-white">Zurück/Schließen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Pfeiltasten</span>
                                    <span className="text-white">App-Navigation</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Enter</span>
                                    <span className="text-white">App öffnen</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">1-5</span>
                                    <span className="text-white">Schnellzugriff Apps</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">0</span>
                                    <span className="text-white">Home Screen</span>
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

// Phone als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Phone;
} else {
    window.Phone = Phone;
}
