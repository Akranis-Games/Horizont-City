// Login/Register Komponente - Authentifizierung mit Tastatur-Interaktionen
// Moderne Login/Register-UI für Horizont-City Roleplay

const LoginRegister = ({ data, onAction, onClose }) => {
    const [authData, setAuthData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [isLoginMode, setIsLoginMode] = React.useState(true);
    const [selectedFieldIndex, setSelectedFieldIndex] = React.useState(0);
    const [showHelp, setShowHelp] = React.useState(false);
    const [formData, setFormData] = React.useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false
    });
    const [errors, setErrors] = React.useState({});

    React.useEffect(() => {
        setAuthData(data || {});
    }, [data]);

    // Tastatur-Interaktionen
    React.useEffect(() => {
        const handleKeyPress = (event) => {
            switch(event.key.toLowerCase()) {
                case 'escape':
                    event.preventDefault();
                    onClose();
                    break;
                case 'tab':
                    event.preventDefault();
                    setSelectedFieldIndex((prev) => (prev + 1) % getFormFields().length);
                    break;
                case 'enter':
                    event.preventDefault();
                    if (isLoginMode) {
                        handleLogin();
                    } else {
                        handleRegister();
                    }
                    break;
                case 'l':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setIsLoginMode(true);
                    }
                    break;
                case 'r':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setIsLoginMode(false);
                    }
                    break;
                case 'h':
                    if (event.ctrlKey) {
                        event.preventDefault();
                        setShowHelp(!showHelp);
                    }
                    break;
                case 'arrowup':
                    event.preventDefault();
                    setSelectedFieldIndex(Math.max(0, selectedFieldIndex - 1));
                    break;
                case 'arrowdown':
                    event.preventDefault();
                    setSelectedFieldIndex(Math.min(getFormFields().length - 1, selectedFieldIndex + 1));
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isLoginMode, selectedFieldIndex, onClose, showHelp]);

    const getFormFields = () => {
        if (isLoginMode) {
            return [
                { id: 'username', label: 'Benutzername', type: 'text', required: true },
                { id: 'password', label: 'Passwort', type: 'password', required: true }
            ];
        } else {
            return [
                { id: 'username', label: 'Benutzername', type: 'text', required: true },
                { id: 'email', label: 'E-Mail', type: 'email', required: true },
                { id: 'password', label: 'Passwort', type: 'password', required: true },
                { id: 'confirmPassword', label: 'Passwort bestätigen', type: 'password', required: true }
            ];
        }
    };

    const handleLogin = () => {
        const { username, password } = formData;
        if (!username || !password) {
            setErrors({ general: 'Bitte fülle alle Felder aus' });
            return;
        }
        onAction('login', { username, password });
    };

    const handleRegister = () => {
        const { username, email, password, confirmPassword } = formData;
        
        // Validierung
        const newErrors = {};
        if (!username) newErrors.username = 'Benutzername ist erforderlich';
        if (!email) newErrors.email = 'E-Mail ist erforderlich';
        if (!password) newErrors.password = 'Passwort ist erforderlich';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwörter stimmen nicht überein';
        if (password && password.length < 6) newErrors.password = 'Passwort muss mindestens 6 Zeichen haben';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        onAction('register', { username, email, password });
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const renderFormField = (field, index) => {
        const isSelected = selectedFieldIndex === index;
        const hasError = errors[field.id];
        
        return (
            <div key={field.id} className="space-y-2">
                <label className="text-white text-sm font-medium">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                </label>
                <input
                    type={field.type}
                    value={formData[field.id] || ''}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className={`w-full px-4 py-3 bg-white bg-opacity-10 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                        isSelected 
                            ? 'border-blue-400 ring-2 ring-blue-400' 
                            : hasError 
                                ? 'border-red-400' 
                                : 'border-white border-opacity-20 focus:border-blue-400'
                    }`}
                    placeholder={`${field.label} eingeben...`}
                    autoComplete={field.type === 'password' ? 'current-password' : 'username'}
                />
                {hasError && (
                    <p className="text-red-400 text-xs">{hasError}</p>
                )}
            </div>
        );
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[500px] p-8 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-white text-2xl font-bold">
                            {isLoginMode ? 'Anmelden' : 'Registrieren'}
                        </h2>
                        <p className="text-gray-400 text-sm">
                            {isLoginMode ? 'Willkommen zurück!' : 'Erstelle dein Konto'}
                        </p>
                    </div>
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

                {/* Mode Toggle */}
                <div className="flex bg-white bg-opacity-10 rounded-lg p-1 mb-6">
                    <button
                        onClick={() => setIsLoginMode(true)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            isLoginMode 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                        title="Ctrl + L - Anmelden"
                    >
                        Anmelden
                    </button>
                    <button
                        onClick={() => setIsLoginMode(false)}
                        className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                            !isLoginMode 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-300 hover:text-white'
                        }`}
                        title="Ctrl + R - Registrieren"
                    >
                        Registrieren
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={(e) => { e.preventDefault(); isLoginMode ? handleLogin() : handleRegister(); }}>
                    <div className="space-y-4 mb-6">
                        {getFormFields().map((field, index) => renderFormField(field, index))}
                    </div>

                    {/* Remember Me (nur bei Login) */}
                    {isLoginMode && (
                        <div className="flex items-center space-x-2 mb-6">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={formData.rememberMe}
                                onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                                className="w-4 h-4 text-blue-600 bg-white bg-opacity-10 border-white border-opacity-20 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="rememberMe" className="text-white text-sm">
                                Angemeldet bleiben
                            </label>
                        </div>
                    )}

                    {/* Error Message */}
                    {errors.general && (
                        <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4">
                            <p className="text-red-400 text-sm">{errors.general}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {authData.success && (
                        <div className="bg-green-500 bg-opacity-20 border border-green-500 rounded-lg p-3 mb-4">
                            <p className="text-green-400 text-sm">{authData.success}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full btn-primary py-3 text-lg font-semibold"
                        title="Enter - Bestätigen"
                    >
                        {isLoginMode ? 'Anmelden' : 'Registrieren'}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-gray-400 text-sm">
                        {isLoginMode ? 'Noch kein Konto?' : 'Bereits ein Konto?'}
                        <button
                            onClick={() => setIsLoginMode(!isLoginMode)}
                            className="text-blue-400 hover:text-blue-300 ml-1 font-medium"
                        >
                            {isLoginMode ? 'Jetzt registrieren' : 'Jetzt anmelden'}
                        </button>
                    </p>
                </div>

                {/* Help Overlay */}
                {showHelp && (
                    <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center z-10">
                        <div className="glass rounded-lg p-6 max-w-2xl w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-white text-xl font-bold">Login/Register Shortcuts</h2>
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
                                    <span className="text-gray-300">TAB</span>
                                    <span className="text-white">Nächstes Feld</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Pfeiltasten ↑↓</span>
                                    <span className="text-white">Feld-Navigation</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Enter</span>
                                    <span className="text-white">Formular absenden</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + L</span>
                                    <span className="text-white">Login-Modus</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-300">Ctrl + R</span>
                                    <span className="text-white">Register-Modus</span>
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

// LoginRegister als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginRegister;
} else {
    window.LoginRegister = LoginRegister;
}
