// Character Creator Komponente - Charaktererstellung mit Tastatur-Interaktionen
// Moderne Charaktererstellungs-UI für Horizont-City Roleplay

const CharacterCreator = ({ data, onAction, onClose }) => {
    const [creatorData, setCreatorData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [currentStep, setCurrentStep] = React.useState('selection'); // selection, creation, customization
    const [selectedCharacterIndex, setSelectedCharacterIndex] = React.useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);
    const [characterData, setCharacterData] = React.useState({
        name: '',
        model: 'male',
        hair: 0,
        hairColor: 0,
        skin: 0,
        eyes: 0,
        clothes: 0
    });

    React.useEffect(() => {
        setCreatorData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    if (currentStep === 'creation') {
                        setCurrentStep('selection');
                    } else {
                        onClose();
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();
                    if (currentStep === 'selection') {
                        setSelectedCharacterIndex(Math.max(0, selectedCharacterIndex - 1));
                    } else {
                        setSelectedOptionIndex(Math.max(0, selectedOptionIndex - 1));
                    }
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    if (currentStep === 'selection') {
                        setSelectedCharacterIndex(Math.min(creatorData.characters?.length - 1 || 0, selectedCharacterIndex + 1));
                    } else {
                        setSelectedOptionIndex(Math.min(currentOptions.length - 1, selectedOptionIndex + 1));
                    }
                    break;
                case 'arrowleft':
                    event.preventDefault();
                    if (currentStep === 'customization') {
                        handleOptionChange(-1);
                    }
                    break;
                case 'arrowright':
                    event.preventDefault();
                    if (currentStep === 'customization') {
                        handleOptionChange(1);
                    }
                    break;
                case 'enter':
                    event.preventDefault();
                    if (currentStep === 'selection') {
                        if (creatorData.characters?.[selectedCharacterIndex]) {
                            handleSelectCharacter(creatorData.characters[selectedCharacterIndex]);
                        } else {
                            setCurrentStep('creation');
                        }
                    } else if (currentStep === 'creation') {
                        setCurrentStep('customization');
                    } else if (currentStep === 'customization') {
                        handleSaveCharacter();
                    }
                    break;
                case 'n':
                    event.preventDefault();
                    if (currentStep === 'selection') {
                        setCurrentStep('creation');
                    }
                    break;
                case 'd':
                    event.preventDefault();
                    if (currentStep === 'selection' && creatorData.characters?.[selectedCharacterIndex]) {
                        handleDeleteCharacter(creatorData.characters[selectedCharacterIndex]);
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
    }, [currentStep, selectedCharacterIndex, selectedOptionIndex, creatorData.characters, onClose, showHelp]);

    const customizationOptions = [
        { id: 'model', name: 'Geschlecht', options: ['Männlich', 'Weiblich'], values: ['male', 'female'] },
        { id: 'hair', name: 'Haarstil', options: ['Kurz', 'Mittel', 'Lang', 'Glatze'], values: [0, 1, 2, 3] },
        { id: 'hairColor', name: 'Haarfarbe', options: ['Schwarz', 'Braun', 'Blond', 'Rot'], values: [0, 1, 2, 3] },
        { id: 'skin', name: 'Hautfarbe', options: ['Hell', 'Mittel', 'Dunkel', 'Sehr Dunkel'], values: [0, 1, 2, 3] },
        { id: 'eyes', name: 'Augenfarbe', options: ['Braun', 'Blau', 'Grün', 'Grau'], values: [0, 1, 2, 3] },
        { id: 'clothes', name: 'Kleidung', options: ['Casual', 'Formal', 'Sport', 'Arbeitskleidung'], values: [0, 1, 2, 3] }
    ];

    const currentOptions = currentStep === 'customization' ? customizationOptions : [];

    const handleSelectCharacter = (character) => {
        onAction('selectCharacter', character);
    };

    const handleDeleteCharacter = (character) => {
        onAction('deleteCharacter', character);
    };

    const handleSaveCharacter = () => {
        onAction('saveCharacter', characterData);
    };

    const handleOptionChange = (direction) => {
        const currentOption = currentOptions[selectedOptionIndex];
        if (currentOption) {
            const currentValueIndex = currentOption.values.indexOf(characterData[currentOption.id]);
            const newValueIndex = Math.max(0, Math.min(currentOption.values.length - 1, currentValueIndex + direction));
            setCharacterData(prev => ({
                ...prev,
                [currentOption.id]: currentOption.values[newValueIndex]
            }));
        }
    };

    const renderCharacterSelection = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-2">Charakter auswählen</h2>
                <p className="text-gray-400">Wähle einen vorhandenen Charakter oder erstelle einen neuen</p>
            </div>

            {/* Charakter-Liste */}
            <div className="grid grid-cols-2 gap-4 max-h-80 overflow-y-auto">
                {creatorData.characters?.map((character, index) => (
                    <div
                        key={character.id}
                        onClick={() => handleSelectCharacter(character)}
                        className={`bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer transition-colors border border-white border-opacity-20 relative group ${
                            selectedCharacterIndex === index 
                                ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                : 'hover:bg-opacity-20'
                        }`}
                        title={`${character.name} - Enter zum Auswählen, D zum Löschen`}
                    >
                        <div className="text-center">
                            <div className="text-4xl mb-2">👤</div>
                            <div className="text-white font-semibold">{character.name}</div>
                            <div className="text-gray-400 text-sm">{character.model === 'male' ? 'Männlich' : 'Weiblich'}</div>
                            <div className="text-gray-500 text-xs">Level {character.level || 1}</div>
                        </div>
                        {selectedCharacterIndex === index && (
                            <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                ←
                            </div>
                        )}
                    </div>
                ))}

                {/* Neuer Charakter Button */}
                <div
                    onClick={() => setCurrentStep('creation')}
                    className="bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer transition-colors border border-white border-opacity-20 hover:bg-opacity-20 border-dashed"
                    title="N - Neuen Charakter erstellen"
                >
                    <div className="text-center">
                        <div className="text-4xl mb-2">➕</div>
                        <div className="text-white font-semibold">Neuer Charakter</div>
                        <div className="text-gray-400 text-sm">Erstelle einen neuen Charakter</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCharacterCreation = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-2">Charakter erstellen</h2>
                <p className="text-gray-400">Gib deinem Charakter einen Namen</p>
            </div>

            <div className="max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Charaktername eingeben..."
                    value={characterData.name}
                    onChange={(e) => setCharacterData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg"
                    autoFocus
                />
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setCurrentStep('customization')}
                        disabled={!characterData.name.trim()}
                        className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Weiter zur Anpassung
                    </button>
                </div>
            </div>
        </div>
    );

    const renderCharacterCustomization = () => (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-2">Charakter anpassen</h2>
                <p className="text-gray-400">Passe das Aussehen deines Charakters an</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Anpassungsoptionen */}
                <div className="space-y-4">
                    <h3 className="text-white font-semibold">Optionen</h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                        {customizationOptions.map((option, index) => (
                            <div
                                key={option.id}
                                className={`bg-white bg-opacity-10 rounded-lg p-3 cursor-pointer transition-colors ${
                                    selectedOptionIndex === index 
                                        ? 'bg-blue-500 bg-opacity-30 ring-2 ring-blue-400' 
                                        : 'hover:bg-opacity-20'
                                }`}
                                title={`${option.name} - Pfeiltasten zum Ändern`}
                            >
                                <div className="flex justify-between items-center">
                                    <span className="text-white font-medium">{option.name}</span>
                                    <span className="text-blue-400">
                                        {option.options[option.values.indexOf(characterData[option.id])]}
                                    </span>
                                </div>
                                {selectedOptionIndex === index && (
                                    <div className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                        ←
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Charakter-Vorschau */}
                <div className="space-y-4">
                    <h3 className="text-white font-semibold">Vorschau</h3>
                    <div className="bg-white bg-opacity-10 rounded-lg p-6 h-80 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">👤</div>
                            <div className="text-white font-semibold text-lg">{characterData.name}</div>
                            <div className="text-gray-400 text-sm">
                                {characterData.model === 'male' ? 'Männlich' : 'Weiblich'}
                            </div>
                            <div className="text-gray-500 text-xs mt-2">
                                Haar: {customizationOptions[1].options[customizationOptions[1].values.indexOf(characterData.hair)]}<br/>
                                Haut: {customizationOptions[3].options[customizationOptions[3].values.indexOf(characterData.skin)]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => setCurrentStep('creation')}
                    className="btn-secondary px-6 py-3"
                >
                    Zurück
                </button>
                <button
                    onClick={handleSaveCharacter}
                    className="btn-primary px-6 py-3"
                >
                    Charakter speichern
                </button>
            </div>
        </div>
    );

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[600px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Charaktererstellung</h2>
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

                {/* Content */}
                <div className="h-full overflow-y-auto">
                    {currentStep === 'selection' && renderCharacterSelection()}
                    {currentStep === 'creation' && renderCharacterCreation()}
                    {currentStep === 'customization' && renderCharacterCustomization()}
                </div>

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Charaktererstellung Shortcuts</h2>
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
                                        <span className="text-white">Zurück/Schließen</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten ↑↓</span>
                                        <span className="text-white">Navigation</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Pfeiltasten ←→</span>
                                        <span className="text-white">Optionen ändern</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Enter</span>
                                        <span className="text-white">Bestätigen</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">N</span>
                                        <span className="text-white">Neuer Charakter</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">D</span>
                                        <span className="text-white">Charakter löschen</span>
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

// CharacterCreator als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CharacterCreator;
} else {
    window.CharacterCreator = CharacterCreator;
}
