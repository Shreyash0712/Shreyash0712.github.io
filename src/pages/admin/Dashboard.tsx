import { useState } from 'react';
import Home from '../../pages/Home';
import ThemeManager from '../../components/admin/ThemeManager';
import DataManager from '../../components/admin/DataManager';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState<'preview' | 'designs' | 'data'>('preview');

    return (
        <div>
            {/* Tabs */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                <button
                    onClick={() => setActiveTab('preview')}
                    style={{ background: activeTab === 'preview' ? 'var(--app-accent)' : 'transparent', border: '1px solid currentColor' }}
                >
                    Preview Site
                </button>
                <button
                    onClick={() => setActiveTab('designs')}
                    style={{ background: activeTab === 'designs' ? 'var(--app-accent)' : 'transparent', border: '1px solid currentColor' }}
                >
                    Designs (Themes)
                </button>
                <button
                    onClick={() => setActiveTab('data')}
                    style={{ background: activeTab === 'data' ? 'var(--app-accent)' : 'transparent', border: '1px solid currentColor' }}
                >
                    Content (Data)
                </button>
            </div>

            {/* Content */}
            <div style={{ minHeight: '500px' }}>
                {activeTab === 'preview' && (
                    <div style={{ border: '1px solid #333', borderRadius: '8px', overflow: 'hidden' }}>
                        <Home />
                    </div>
                )}
                {activeTab === 'designs' && <ThemeManager />}
                {activeTab === 'data' && <DataManager />}
            </div>
        </div>
    );
};

export default Dashboard;
