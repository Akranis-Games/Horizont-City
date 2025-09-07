// Settings Komponente - Einstellungen und Konfiguration
// Moderne Settings-UI für Horizont-City Roleplay

const Settings = ({ data, onAction, onClose }) => {
    const [settingsData, setSettingsData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('general');

    React.useEffect(() => {
        setSettingsData(data || {});
    }, [data]);

    const tabs = [
        { id: 'general', name: 'Allgemein', icon: '⚙️' },
        { id: 'audio', name: 'Audio', icon: '🔊' },
        { id: 'video', name: 'Video', icon: '📺' },
        { id: 'controls', name: 'Steuerung', icon: '🎮' },
        { id: 'ui', name: 'Interface', icon: '🖥️' },
        { id: 'gameplay', name: 'Gameplay', icon: '🎯' },
        { id: 'social', name: 'Sozial', icon: '👥' },
        { id: 'privacy', name: 'Datenschutz', icon: '🔒' }
    ];

    const renderGeneralTab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-white font-medium">Sprache & Region</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">Sprache</label>
                        <select 
                            defaultValue={settingsData.language || 'de'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="de">Deutsch</option>
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Zeitzone</label>
                        <select 
                            defaultValue={settingsData.timezone || 'Europe/Berlin'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Europe/Berlin">Europa/Berlin</option>
                            <option value="Europe/London">Europa/London</option>
                            <option value="America/New_York">Amerika/New York</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-medium">Benachrichtigungen</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Push-Benachrichtigungen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.pushNotifications} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">E-Mail-Benachrichtigungen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.emailNotifications} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">SMS-Benachrichtigungen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.smsNotifications} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-medium">Auto-Save</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Automatisches Speichern</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.autoSave} />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Speicher-Intervall (Minuten)</label>
                        <input 
                            type="number" 
                            defaultValue={settingsData.saveInterval || 5}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderAudioTab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-white font-medium">Audio-Einstellungen</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">Master-Lautstärke</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={settingsData.masterVolume || 50}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Musik-Lautstärke</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={settingsData.musicVolume || 30}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">SFX-Lautstärke</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={settingsData.sfxVolume || 70}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Voice-Chat-Lautstärke</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={settingsData.voiceVolume || 80}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-medium">Audio-Qualität</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">Audio-Qualität</label>
                        <select 
                            defaultValue={settingsData.audioQuality || 'high'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Niedrig</option>
                            <option value="medium">Mittel</option>
                            <option value="high">Hoch</option>
                            <option value="ultra">Ultra</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">3D-Audio</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.audio3D} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Echo-Unterdrückung</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.echoCancellation} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderVideoTab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-white font-medium">Grafik-Einstellungen</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">Auflösung</label>
                        <select 
                            defaultValue={settingsData.resolution || '1920x1080'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="1280x720">1280x720 (HD)</option>
                            <option value="1920x1080">1920x1080 (Full HD)</option>
                            <option value="2560x1440">2560x1440 (2K)</option>
                            <option value="3840x2160">3840x2160 (4K)</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Grafik-Qualität</label>
                        <select 
                            defaultValue={settingsData.graphicsQuality || 'high'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="low">Niedrig</option>
                            <option value="medium">Mittel</option>
                            <option value="high">Hoch</option>
                            <option value="ultra">Ultra</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">FPS-Limit</label>
                        <select 
                            defaultValue={settingsData.fpsLimit || '60'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="30">30 FPS</option>
                            <option value="60">60 FPS</option>
                            <option value="120">120 FPS</option>
                            <option value="unlimited">Unbegrenzt</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-medium">Erweiterte Einstellungen</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">VSync</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.vsync} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Anti-Aliasing</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.antiAliasing} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Schatten</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.shadows} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Texturen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.textures} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderControlsTab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-white font-medium">Tastatur-Einstellungen</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Bewegung (WASD)</span>
                        <button className="btn-secondary text-sm py-1 px-3">Konfigurieren</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Sprint (Shift)</span>
                        <button className="btn-secondary text-sm py-1 px-3">Konfigurieren</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Springen (Leertaste)</span>
                        <button className="btn-secondary text-sm py-1 px-3">Konfigurieren</button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Interagieren (E)</span>
                        <button className="btn-secondary text-sm py-1 px-3">Konfigurieren</button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-medium">Maus-Einstellungen</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">Maus-Sensitivität</label>
                        <input 
                            type="range" 
                            min="0.1" 
                            max="2.0" 
                            step="0.1"
                            defaultValue={settingsData.mouseSensitivity || 1.0}
                            className="w-full"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Maus-Umkehrung</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.mouseInvert} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Maus-Beschleunigung</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.mouseAcceleration} />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderUITab = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <h4 className="text-white font-medium">Interface-Einstellungen</h4>
                <div className="space-y-3">
                    <div>
                        <label className="text-gray-400 text-sm">UI-Skalierung</label>
                        <select 
                            defaultValue={settingsData.uiScale || '100%'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="75%">75%</option>
                            <option value="100%">100%</option>
                            <option value="125%">125%</option>
                            <option value="150%">150%</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">HUD-Position</label>
                        <select 
                            defaultValue={settingsData.hudPosition || 'bottom-right'}
                            className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="top-left">Oben links</option>
                            <option value="top-right">Oben rechts</option>
                            <option value="bottom-left">Unten links</option>
                            <option value="bottom-right">Unten rechts</option>
                        </select>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">HUD anzeigen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.showHUD} />
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Minimap anzeigen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.showMinimap} />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-white font-medium">Chat-Einstellungen</h4>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Chat anzeigen</span>
                        <input type="checkbox" className="toggle" defaultChecked={settingsData.showChat} />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Chat-Transparenz</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            defaultValue={settingsData.chatOpacity || 80}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="text-gray-400 text-sm">Chat-Größe</label>
                        <input 
                            type="range" 
                            min="10" 
                            max="20" 
                            defaultValue={settingsData.chatSize || 14}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCurrentTab = () => {
        switch (activeTab) {
            case 'general': return renderGeneralTab();
            case 'audio': return renderAudioTab();
            case 'video': return renderVideoTab();
            case 'controls': return renderControlsTab();
            case 'ui': return renderUITab();
            default: return renderGeneralTab();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[700px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Einstellungen</h2>
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

                {/* Footer */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-white border-opacity-20">
                    <button
                        onClick={() => onAction('reset')}
                        className="btn-secondary py-2 px-4"
                    >
                        Zurücksetzen
                    </button>
                    <button
                        onClick={() => onAction('save')}
                        className="btn-primary py-2 px-4"
                    >
                        Speichern
                    </button>
                </div>
            </div>
        </div>
    );
};

// Settings als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Settings;
} else {
    window.Settings = Settings;
}
