// Bank Komponente - Vollständiges Bankensystem mit ATMs, Tresoren und Sicherheit
// Moderne Bank-UI für Horizont-City Roleplay

const Bank = ({ data, onAction, onClose }) => {
    const [bankData, setBankData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedAccount, setSelectedAccount] = React.useState(null);
    const [transactionAmount, setTransactionAmount] = React.useState('');
    const [transactionDescription, setTransactionDescription] = React.useState('');

    React.useEffect(() => {
        setBankData(data || {});
    }, [data]);

    const tabs = [
        { id: 'overview', name: 'Übersicht', icon: '📊' },
        { id: 'accounts', name: 'Konten', icon: '💳' },
        { id: 'transactions', name: 'Transaktionen', icon: '📋' },
        { id: 'loans', name: 'Kredite', icon: '💰' },
        { id: 'investments', name: 'Investments', icon: '📈' },
        { id: 'cards', name: 'Karten', icon: '💳' },
        { id: 'atms', name: 'ATMs', icon: '🏧' },
        { id: 'services', name: 'Services', icon: '⚙️' }
    ];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('de-DE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getAccountTypeColor = (type) => {
        const colors = {
            'checking': 'text-blue-400',
            'savings': 'text-green-400',
            'business': 'text-purple-400',
            'investment': 'text-yellow-400'
        };
        return colors[type] || 'text-gray-400';
    };

    const getAccountTypeIcon = (type) => {
        const icons = {
            'checking': '💳',
            'savings': '🏦',
            'business': '🏢',
            'investment': '📈'
        };
        return icons[type] || '💳';
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* Gesamtvermögen */}
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6">
                <div className="text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">Gesamtvermögen</h3>
                    <div className="text-white text-4xl font-bold">
                        {formatMoney(bankData.totalAssets || 0)}
                    </div>
                    <p className="text-green-200 text-sm mt-2">
                        +{formatMoney(bankData.monthlyGrowth || 0)} diesen Monat
                    </p>
                </div>
            </div>

            {/* Konten-Übersicht */}
            <div className="grid grid-cols-2 gap-4">
                {bankData.accounts?.map((account, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">{getAccountTypeIcon(account.type)}</span>
                                <span className="text-white font-medium">{account.name}</span>
                            </div>
                            <span className={`text-sm ${getAccountTypeColor(account.type)}`}>
                                {account.type}
                            </span>
                        </div>
                        <div className="text-white text-xl font-bold">
                            {formatMoney(account.balance)}
                        </div>
                        <div className="text-gray-400 text-sm">
                            {account.accountNumber}
                        </div>
                    </div>
                ))}
            </div>

            {/* Schnellzugriff */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setActiveTab('accounts')}
                    className="btn-primary py-4 text-center"
                >
                    <div className="text-2xl mb-2">💳</div>
                    <div className="text-sm">Konten verwalten</div>
                </button>
                <button
                    onClick={() => setActiveTab('transactions')}
                    className="btn-secondary py-4 text-center"
                >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="text-sm">Transaktionen</div>
                </button>
                <button
                    onClick={() => setActiveTab('loans')}
                    className="btn-success py-4 text-center"
                >
                    <div className="text-2xl mb-2">💰</div>
                    <div className="text-sm">Kredite</div>
                </button>
                <button
                    onClick={() => setActiveTab('investments')}
                    className="btn-warning py-4 text-center"
                >
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-sm">Investments</div>
                </button>
            </div>

            {/* Letzte Aktivitäten */}
            <div className="space-y-3">
                <h4 className="text-white font-medium">Letzte Aktivitäten</h4>
                {bankData.recentActivities?.map((activity, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div>
                                    <div className="text-white text-sm">{activity.description}</div>
                                    <div className="text-gray-400 text-xs">{formatDate(activity.timestamp)}</div>
                                </div>
                            </div>
                            <div className={`font-semibold ${
                                activity.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {activity.amount > 0 ? '+' : ''}{formatMoney(activity.amount)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAccountsTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Meine Konten</h4>
                <button
                    onClick={() => onAction('createAccount')}
                    className="btn-primary text-sm py-2 px-3"
                >
                    Neues Konto
                </button>
            </div>

            <div className="space-y-3">
                {bankData.accounts?.map((account, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedAccount(account)}
                        className="bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer hover:bg-opacity-20 transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getAccountTypeIcon(account.type)}</span>
                                <div>
                                    <div className="text-white font-medium">{account.name}</div>
                                    <div className="text-gray-400 text-sm">{account.accountNumber}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(account.balance)}
                                </div>
                                <div className={`text-sm ${getAccountTypeColor(account.type)}`}>
                                    {account.type}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Konto-Aktionen */}
            {selectedAccount && (
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <h5 className="text-white font-medium mb-3">Konto-Aktionen</h5>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => onAction('deposit', { account: selectedAccount })}
                            className="btn-success py-2"
                        >
                            Einzahlen
                        </button>
                        <button
                            onClick={() => onAction('withdraw', { account: selectedAccount })}
                            className="btn-primary py-2"
                        >
                            Abheben
                        </button>
                        <button
                            onClick={() => onAction('transfer', { account: selectedAccount })}
                            className="btn-secondary py-2"
                        >
                            Überweisen
                        </button>
                        <button
                            onClick={() => onAction('accountSettings', { account: selectedAccount })}
                            className="btn-warning py-2"
                        >
                            Einstellungen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderTransactionsTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Transaktionen</h4>
                <div className="flex space-x-2">
                    <select className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Konten</option>
                        {bankData.accounts?.map((account, index) => (
                            <option key={index} value={account.id}>{account.name}</option>
                        ))}
                    </select>
                    <select className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Typen</option>
                        <option value="deposit">Einzahlung</option>
                        <option value="withdraw">Abhebung</option>
                        <option value="transfer">Überweisung</option>
                        <option value="payment">Zahlung</option>
                    </select>
                </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {bankData.transactions?.map((transaction, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={`w-2 h-2 rounded-full ${
                                    transaction.type === 'deposit' ? 'bg-green-500' :
                                    transaction.type === 'withdraw' ? 'bg-red-500' :
                                    transaction.type === 'transfer' ? 'bg-blue-500' :
                                    'bg-yellow-500'
                                }`}></div>
                                <div>
                                    <div className="text-white text-sm">{transaction.description}</div>
                                    <div className="text-gray-400 text-xs">
                                        {formatDate(transaction.timestamp)} • {transaction.account}
                                    </div>
                                </div>
                            </div>
                            <div className={`font-semibold ${
                                transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                                {transaction.amount > 0 ? '+' : ''}{formatMoney(transaction.amount)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderLoansTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Kredite</h4>
                <button
                    onClick={() => onAction('applyLoan')}
                    className="btn-primary text-sm py-2 px-3"
                >
                    Kredit beantragen
                </button>
            </div>

            <div className="space-y-3">
                {bankData.loans?.map((loan, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white font-medium">Kredit #{loan.id}</div>
                                <div className="text-gray-400 text-sm">
                                    Betrag: {formatMoney(loan.amount)} • Zinssatz: {loan.interestRate}%
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(loan.remainingAmount)}
                                </div>
                                <div className="text-gray-400 text-sm">Restbetrag</div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Fortschritt</span>
                                <span>{Math.round((loan.amount - loan.remainingAmount) / loan.amount * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${(loan.amount - loan.remainingAmount) / loan.amount * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderInvestmentsTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Investments</h4>
                <button
                    onClick={() => onAction('createInvestment')}
                    className="btn-primary text-sm py-2 px-3"
                >
                    Investment erstellen
                </button>
            </div>

            <div className="space-y-3">
                {bankData.investments?.map((investment, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white font-medium">{investment.name}</div>
                                <div className="text-gray-400 text-sm">
                                    {investment.type} • {investment.returnRate}% Rendite
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(investment.currentValue)}
                                </div>
                                <div className={`text-sm ${
                                    investment.profit >= 0 ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {investment.profit >= 0 ? '+' : ''}{formatMoney(investment.profit)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderATMsTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">ATM-Standorte</h4>
            
            <div className="space-y-3">
                {bankData.atms?.map((atm, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="text-white font-medium">{atm.name}</div>
                                <div className="text-gray-400 text-sm">{atm.location}</div>
                            </div>
                            <div className="text-right">
                                <div className={`text-sm ${atm.isWorking ? 'text-green-400' : 'text-red-400'}`}>
                                    {atm.isWorking ? 'Verfügbar' : 'Außer Betrieb'}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    Max: {formatMoney(atm.maxAmount)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderCurrentTab = () => {
        switch (activeTab) {
            case 'overview': return renderOverviewTab();
            case 'accounts': return renderAccountsTab();
            case 'transactions': return renderTransactionsTab();
            case 'loans': return renderLoansTab();
            case 'investments': return renderInvestmentsTab();
            case 'atms': return renderATMsTab();
            default: return renderOverviewTab();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[700px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Bank</h2>
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

// Bank als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Bank;
} else {
    window.Bank = Bank;
}
