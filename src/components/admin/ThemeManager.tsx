import { useState, useEffect } from 'react';
import { getThemes, createTheme, updateTheme, activateTheme, deleteTheme } from '../../services/adminApi';
import type { Theme, SectionStyle } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';

const POPULAR_FONTS = [
    'Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat', 'Oswald', 'Raleway', 'Nunito', 'Merriweather', 'Playfair Display', 'Lobster'
];

const SECTIONS = ['hero', 'about', 'skills', 'blogs', 'footer', 'socials'] as const;

const initialSectionStyle: SectionStyle = { bg: '#ffffff', text: '#000000', fontSize: '1rem', fontFamily: 'Inter', textAlign: 'left' };

const ThemeManager = () => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [name, setName] = useState('');
    const [styles, setStyles] = useState<Record<string, SectionStyle>>({
        hero: { ...initialSectionStyle, bg: '#000000', text: '#ffffff', textAlign: 'center' },
        about: { ...initialSectionStyle },
        skills: { ...initialSectionStyle, bg: '#f8f9fa' },
        blogs: { ...initialSectionStyle },
        footer: { ...initialSectionStyle, bg: '#111', text: '#eee', textAlign: 'center' },
        socials: { ...initialSectionStyle }
    });

    const fetchAllThemes = async () => {
        try {
            const data = await getThemes();
            setThemes(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllThemes();
    }, []);

    const handleEdit = (theme: Theme) => {
        setEditingId(theme.id);
        setName(theme.name);
        setStyles({
            hero: theme.hero_section || initialSectionStyle,
            about: theme.about_section || initialSectionStyle,
            skills: theme.skills_section || initialSectionStyle,
            blogs: theme.blogs_section || initialSectionStyle,
            footer: theme.footer_section || initialSectionStyle,
            socials: theme.socials_section || initialSectionStyle
        });
    };

    const handleCancel = () => {
        setEditingId(null);
        setName('');
        setStyles({
            hero: { ...initialSectionStyle, bg: '#000000', text: '#ffffff', textAlign: 'center' },
            about: { ...initialSectionStyle },
            skills: { ...initialSectionStyle, bg: '#f8f9fa' },
            blogs: { ...initialSectionStyle },
            footer: { ...initialSectionStyle, bg: '#111', text: '#eee', textAlign: 'center' },
            socials: { ...initialSectionStyle }
        });
    };

    const handleSectionChange = (section: string, field: string, value: string) => {
        setStyles(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            name,
            hero_section: styles.hero,
            about_section: styles.about,
            skills_section: styles.skills,
            blogs_section: styles.blogs,
            footer_section: styles.footer,
            socials_section: styles.socials
        };

        try {
            if (editingId) {
                await updateTheme(editingId, payload);
                alert('Theme updated!');
            } else {
                await createTheme(payload);
                alert('Theme created!');
            }
            handleCancel();
            fetchAllThemes();
        } catch (error) {
            alert('Failed to save theme');
        }
    };

    const handleActivate = async (id: string) => {
        try {
            await activateTheme(id);
            fetchAllThemes();
        } catch (error) {
            alert('Failed to activate theme');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        try {
            await deleteTheme(id);
            fetchAllThemes();
        } catch (error) {
            alert('Failed to delete theme');
        }
    };

    if (loading) return <div>Loading themes...</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Theme List - Now on top */}
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Your Themes</h3>
                    <Button onClick={handleCancel} size="sm" variant="ghost">+ New Theme</Button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginBottom: '1rem'
                }}>
                    {themes.map(t => (
                        <div key={t.id} className="card" style={{
                            border: t.is_active ? '2px solid var(--app-accent)' : '1px solid #e5e5e5',
                            opacity: editingId && editingId !== t.id ? 0.6 : 1,
                            transition: 'opacity 0.2s',
                            padding: '1rem'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <strong style={{ fontSize: '1rem' }}>{t.name}</strong>
                                {t.is_active && (
                                    <span style={{
                                        color: 'var(--app-accent)',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: '#eef2ff',
                                        padding: '0.2rem 0.5rem',
                                        borderRadius: '4px'
                                    }}>
                                        Active
                                    </span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                <Button onClick={() => handleEdit(t)} size="sm" variant="secondary">Edit</Button>
                                {!t.is_active && <Button onClick={() => handleActivate(t.id)} size="sm">Use</Button>}
                                <Button onClick={() => handleDelete(t.id)} size="sm" variant="danger">Del</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Editor - Now below */}
            <div className="card" style={{ padding: '2rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    borderBottom: '1px solid #eee',
                    paddingBottom: '1rem',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <h3 style={{ margin: 0 }}>{editingId ? 'Edit Theme' : 'Create New Theme'}</h3>
                    {editingId && <Button onClick={handleCancel} variant="ghost" size="sm">Cancel</Button>}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div>
                        <Input
                            label="Theme Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="My Awesome Theme"
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {SECTIONS.map(section => (
                            <div key={section} style={{
                                background: '#f8fafc',
                                padding: '1.5rem',
                                borderRadius: '12px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <h4 style={{
                                    textTransform: 'capitalize',
                                    marginBottom: '1rem',
                                    marginTop: 0,
                                    color: '#334155',
                                    borderBottom: '1px solid #cbd5e1',
                                    paddingBottom: '0.5rem',
                                    fontSize: '1rem'
                                }}>
                                    {section} Section
                                </h4>

                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                                    gap: '1rem'
                                }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0 }}>
                                        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Background</label>
                                        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', minWidth: 0 }}>
                                            <input
                                                type="color"
                                                value={styles[section]?.bg}
                                                onChange={e => handleSectionChange(section, 'bg', e.target.value)}
                                                style={{
                                                    width: '48px',
                                                    minWidth: '48px',
                                                    height: 'auto',
                                                    border: '1px solid #d1d5db',
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    borderRadius: '8px',
                                                    flexShrink: 0
                                                }}
                                            />
                                            <Input
                                                value={styles[section]?.bg}
                                                onChange={e => handleSectionChange(section, 'bg', e.target.value)}
                                                style={{ fontSize: '0.85rem', padding: '0.5rem', flex: 1, minWidth: 0 }}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0 }}>
                                        <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Text Color</label>
                                        <div style={{ display: 'flex', alignItems: 'stretch', gap: '0.5rem', minWidth: 0 }}>
                                            <input
                                                type="color"
                                                value={styles[section]?.text}
                                                onChange={e => handleSectionChange(section, 'text', e.target.value)}
                                                style={{
                                                    width: '48px',
                                                    minWidth: '48px',
                                                    height: 'auto',
                                                    border: '1px solid #d1d5db',
                                                    cursor: 'pointer',
                                                    padding: '4px',
                                                    borderRadius: '8px',
                                                    flexShrink: 0
                                                }}
                                            />
                                            <Input
                                                value={styles[section]?.text}
                                                onChange={e => handleSectionChange(section, 'text', e.target.value)}
                                                style={{ fontSize: '0.85rem', padding: '0.5rem', flex: 1, minWidth: 0 }}
                                            />
                                        </div>
                                    </div>

                                    <Select
                                        label="Font Family"
                                        value={styles[section]?.fontFamily || 'Inter'}
                                        onChange={e => handleSectionChange(section, 'fontFamily', e.target.value)}
                                    >
                                        {POPULAR_FONTS.map(f => (
                                            <option key={f} value={f}>{f}</option>
                                        ))}
                                    </Select>

                                    <Input
                                        label="Base Size"
                                        value={styles[section]?.fontSize || ''}
                                        onChange={e => handleSectionChange(section, 'fontSize', e.target.value)}
                                        placeholder="1rem"
                                    />

                                    <Select
                                        label="Alignment"
                                        value={styles[section]?.textAlign || 'left'}
                                        onChange={e => handleSectionChange(section, 'textAlign', e.target.value)}
                                    >
                                        <option value="left">Left</option>
                                        <option value="center">Center</option>
                                        <option value="right">Right</option>
                                        <option value="justify">Justify</option>
                                    </Select>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e5e5' }}>
                        <Button type="submit" size="lg" style={{ flex: 1 }}>
                            {editingId ? 'Save Changes' : 'Create Theme'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ThemeManager;
