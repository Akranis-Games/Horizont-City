// Job Komponente - Vollständiges Job-System mit Bewerbungen, Gehältern und Arbeitszeiten
// Moderne Job-UI für Horizont-City Roleplay

const Job = ({ data, onAction, onClose }) => {
    const [jobData, setJobData] = React.useState(data || {});
    const [isVisible, setIsVisible] = React.useState(true);
    const [activeTab, setActiveTab] = React.useState('overview');
    const [selectedJob, setSelectedJob] = React.useState(null);
    const [applicationText, setApplicationText] = React.useState('');

    React.useEffect(() => {
        setJobData(data || {});
    }, [data]);

    const tabs = [
        { id: 'overview', name: 'Übersicht', icon: '📊' },
        { id: 'available', name: 'Verfügbar', icon: '💼' },
        { id: 'myjobs', name: 'Meine Jobs', icon: '👷' },
        { id: 'applications', name: 'Bewerbungen', icon: '📝' },
        { id: 'history', name: 'Historie', icon: '📋' },
        { id: 'statistics', name: 'Statistiken', icon: '📈' }
    ];

    const formatMoney = (amount) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR'
        }).format(amount);
    };

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const getJobCategoryColor = (category) => {
        const colors = {
            'police': 'text-blue-400',
            'ems': 'text-red-400',
            'mechanic': 'text-orange-400',
            'taxi': 'text-yellow-400',
            'delivery': 'text-green-400',
            'construction': 'text-gray-400',
            'retail': 'text-purple-400',
            'restaurant': 'text-pink-400'
        };
        return colors[category] || 'text-gray-400';
    };

    const getJobCategoryIcon = (category) => {
        const icons = {
            'police': '👮',
            'ems': '🚑',
            'mechanic': '🔧',
            'taxi': '🚕',
            'delivery': '📦',
            'construction': '🏗️',
            'retail': '🛍️',
            'restaurant': '🍽️'
        };
        return icons[category] || '💼';
    };

    const getJobStatusColor = (status) => {
        const colors = {
            'active': 'text-green-400',
            'working': 'text-blue-400',
            'pending': 'text-yellow-400',
            'completed': 'text-gray-400',
            'cancelled': 'text-red-400'
        };
        return colors[status] || 'text-gray-400';
    };

    const renderOverviewTab = () => (
        <div className="space-y-6">
            {/* Aktueller Job */}
            {jobData.currentJob ? (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">Aktueller Job</h3>
                        <div className="text-white text-xl font-semibold mb-2">
                            {getJobCategoryIcon(jobData.currentJob.category)} {jobData.currentJob.name}
                        </div>
                        <p className="text-blue-200 text-sm mb-4">{jobData.currentJob.description}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-blue-200">Gehalt:</span>
                                <span className="text-white ml-2">{formatMoney(jobData.currentJob.salary)}/h</span>
                            </div>
                            <div>
                                <span className="text-blue-200">Arbeitszeit:</span>
                                <span className="text-white ml-2">{formatTime(jobData.currentJob.workTime)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl p-6">
                    <div className="text-center">
                        <h3 className="text-white text-2xl font-bold mb-2">Kein aktiver Job</h3>
                        <p className="text-gray-300 text-sm mb-4">Suche nach einem Job, um zu beginnen</p>
                        <button
                            onClick={() => setActiveTab('available')}
                            className="btn-primary py-2 px-4"
                        >
                            Jobs suchen
                        </button>
                    </div>
                </div>
            )}

            {/* Statistiken */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.totalEarnings || 0}€</div>
                        <div className="text-gray-400 text-sm">Gesamtverdienst</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.jobsCompleted || 0}</div>
                        <div className="text-gray-400 text-sm">Jobs abgeschlossen</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.totalHours || 0}h</div>
                        <div className="text-gray-400 text-sm">Gesamtarbeitszeit</div>
                    </div>
                </div>
            </div>

            {/* Schnellzugriff */}
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={() => setActiveTab('available')}
                    className="btn-primary py-4 text-center"
                >
                    <div className="text-2xl mb-2">💼</div>
                    <div className="text-sm">Verfügbare Jobs</div>
                </button>
                <button
                    onClick={() => setActiveTab('myjobs')}
                    className="btn-secondary py-4 text-center"
                >
                    <div className="text-2xl mb-2">👷</div>
                    <div className="text-sm">Meine Jobs</div>
                </button>
                <button
                    onClick={() => setActiveTab('applications')}
                    className="btn-warning py-4 text-center"
                >
                    <div className="text-2xl mb-2">📝</div>
                    <div className="text-sm">Bewerbungen</div>
                </button>
                <button
                    onClick={() => setActiveTab('statistics')}
                    className="btn-success py-4 text-center"
                >
                    <div className="text-2xl mb-2">📈</div>
                    <div className="text-sm">Statistiken</div>
                </button>
            </div>

            {/* Letzte Aktivitäten */}
            <div className="space-y-3">
                <h4 className="text-white font-medium">Letzte Aktivitäten</h4>
                {jobData.recentActivities?.map((activity, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <div>
                                    <div className="text-white text-sm">{activity.message}</div>
                                    <div className="text-gray-400 text-xs">{activity.time}</div>
                                </div>
                            </div>
                            {activity.amount && (
                                <div className="text-green-400 font-semibold">
                                    +{formatMoney(activity.amount)}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAvailableJobsTab = () => (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h4 className="text-white font-medium">Verfügbare Jobs</h4>
                <div className="flex space-x-2">
                    <select className="px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="">Alle Kategorien</option>
                        <option value="police">Polizei</option>
                        <option value="ems">Sanitäter</option>
                        <option value="mechanic">Mechaniker</option>
                        <option value="taxi">Taxi</option>
                        <option value="delivery">Lieferung</option>
                        <option value="construction">Bau</option>
                        <option value="retail">Einzelhandel</option>
                        <option value="restaurant">Restaurant</option>
                    </select>
                </div>
            </div>

            <div className="space-y-3">
                {jobData.availableJobs?.map((job, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getJobCategoryIcon(job.category)}</span>
                                <div>
                                    <div className="text-white font-medium">{job.name}</div>
                                    <div className={`text-sm ${getJobCategoryColor(job.category)}`}>
                                        {job.category}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(job.salary)}/h
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {job.currentEmployees}/{job.maxEmployees} Mitarbeiter
                                </div>
                            </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm mb-3">{job.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                                <span className="text-gray-400">Standort:</span>
                                <span className="text-white ml-2">{job.location}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Anforderungen:</span>
                                <span className="text-white ml-2">Level {job.requirements.minLevel}</span>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setSelectedJob(job)}
                                className="btn-primary text-sm py-2 px-4 flex-1"
                            >
                                Bewerben
                            </button>
                            <button
                                onClick={() => onAction('jobInfo', { job })}
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

    const renderMyJobsTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Meine Jobs</h4>
            
            <div className="space-y-3">
                {jobData.myJobs?.map((job, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getJobCategoryIcon(job.category)}</span>
                                <div>
                                    <div className="text-white font-medium">{job.name}</div>
                                    <div className={`text-sm ${getJobStatusColor(job.status)}`}>
                                        {job.status}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(job.salary)}/h
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {formatTime(job.hoursWorked)}
                                </div>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                                <span className="text-gray-400">Verdient:</span>
                                <span className="text-white ml-2">{formatMoney(job.totalEarnings)}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Arbeitszeit:</span>
                                <span className="text-white ml-2">{formatTime(job.hoursWorked)}</span>
                            </div>
                        </div>
                        
                        <div className="flex space-x-2">
                            {job.status === 'active' && (
                                <button
                                    onClick={() => onAction('startWork', { job })}
                                    className="btn-success text-sm py-2 px-4 flex-1"
                                >
                                    Arbeit beginnen
                                </button>
                            )}
                            {job.status === 'working' && (
                                <button
                                    onClick={() => onAction('endWork', { job })}
                                    className="btn-danger text-sm py-2 px-4 flex-1"
                                >
                                    Arbeit beenden
                                </button>
                            )}
                            <button
                                onClick={() => onAction('quitJob', { job })}
                                className="btn-warning text-sm py-2 px-4"
                            >
                                Kündigen
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderApplicationsTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Meine Bewerbungen</h4>
            
            <div className="space-y-3">
                {jobData.applications?.map((application, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">{getJobCategoryIcon(application.job.category)}</span>
                                <div>
                                    <div className="text-white font-medium">{application.job.name}</div>
                                    <div className={`text-sm ${getJobStatusColor(application.status)}`}>
                                        {application.status}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-white text-lg font-bold">
                                    {formatMoney(application.job.salary)}/h
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {application.appliedAt}
                                </div>
                            </div>
                        </div>
                        
                        {application.coverLetter && (
                            <p className="text-gray-300 text-sm mb-3">{application.coverLetter}</p>
                        )}
                        
                        {application.status === 'pending' && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => onAction('cancelApplication', { application })}
                                    className="btn-danger text-sm py-2 px-4"
                                >
                                    Bewerbung zurückziehen
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    const renderStatisticsTab = () => (
        <div className="space-y-4">
            <h4 className="text-white font-medium">Job-Statistiken</h4>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.totalEarnings || 0}€</div>
                        <div className="text-gray-400 text-sm">Gesamtverdienst</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.jobsCompleted || 0}</div>
                        <div className="text-gray-400 text-sm">Jobs abgeschlossen</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.totalHours || 0}h</div>
                        <div className="text-gray-400 text-sm">Gesamtarbeitszeit</div>
                    </div>
                </div>
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                    <div className="text-center">
                        <div className="text-white text-2xl font-bold">{jobData.averageRating || 0}/5</div>
                        <div className="text-gray-400 text-sm">Durchschnittsbewertung</div>
                    </div>
                </div>
            </div>

            <div className="space-y-3">
                <h5 className="text-white font-medium">Beliebte Job-Kategorien</h5>
                {jobData.categoryStats?.map((category, index) => (
                    <div key={index} className="bg-white bg-opacity-10 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <span className="text-xl">{getJobCategoryIcon(category.name)}</span>
                                <span className="text-white font-medium">{category.name}</span>
                            </div>
                            <div className="text-right">
                                <div className="text-white font-bold">{category.jobs}</div>
                                <div className="text-gray-400 text-sm">Jobs</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderJobApplicationModal = () => {
        if (!selectedJob) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-lg font-semibold">Bewerbung für {selectedJob.name}</h3>
                        <button
                            onClick={() => setSelectedJob(null)}
                            className="text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="text-center">
                            <div className="text-4xl mb-2">{getJobCategoryIcon(selectedJob.category)}</div>
                            <div className="text-white font-medium">{selectedJob.name}</div>
                            <div className="text-gray-400 text-sm">{selectedJob.description}</div>
                        </div>

                        <div>
                            <label className="text-gray-400 text-sm">Bewerbungsschreiben</label>
                            <textarea
                                value={applicationText}
                                onChange={(e) => setApplicationText(e.target.value)}
                                placeholder="Warum möchten Sie diesen Job?"
                                className="w-full px-3 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => onAction('submitApplication', { job: selectedJob, text: applicationText })}
                                className="btn-primary py-2"
                            >
                                Bewerben
                            </button>
                            <button
                                onClick={() => setSelectedJob(null)}
                                className="btn-secondary py-2"
                            >
                                Abbrechen
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderCurrentTab = () => {
        switch (activeTab) {
            case 'overview': return renderOverviewTab();
            case 'available': return renderAvailableJobsTab();
            case 'myjobs': return renderMyJobsTab();
            case 'applications': return renderApplicationsTab();
            case 'statistics': return renderStatisticsTab();
            default: return renderOverviewTab();
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-3xl w-[800px] h-[700px] p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-white text-xl font-semibold">Job</h2>
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

                {/* Job Application Modal */}
                {renderJobApplicationModal()}
            </div>
        </div>
    );
};

// Job als React-Komponente exportieren
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Job;
} else {
    window.Job = Job;
}
