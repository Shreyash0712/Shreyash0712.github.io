import { useState, useEffect } from 'react';
import { fetchData, upsertData } from '../../services/adminApi';
import type { Data } from '../../types';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const DataManager = () => {
    const [loading, setLoading] = useState(true);
    const [skillsInput, setSkillsInput] = useState('');
    const [formData, setFormData] = useState<Partial<Data>>({
        hero: { title: '', subtitle: '' },
        about: { bio: '', avatarUrl: '' },
        skills: [],
        socials: [],
        footer: { text: '' }
    });

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchData();
                if (data) {
                    const skills = Array.isArray(data.skills) ? data.skills : [];
                    setSkillsInput(skills.join(', '));
                    setFormData({
                        ...data,
                        hero: data.hero || { title: '', subtitle: '' },
                        about: data.about || { bio: '', avatarUrl: '' },
                        skills,
                        socials: Array.isArray(data.socials) ? data.socials : [],
                        footer: data.footer || { text: '' }
                    });
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleChange = (section: 'hero' | 'about' | 'footer', field: string, value: any) => {
        setFormData(prev => {
            const sectionData = prev[section] || {};
            return {
                ...prev,
                [section]: {
                    ...sectionData,
                    [field]: value
                }
            };
        });
    };

    const handleSkillsInputChange = (value: string) => {
        setSkillsInput(value);
    };

    const handleSkillsBlur = () => {
        const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);
        setFormData(prev => ({
            ...prev,
            skills
        }));
    };

    const handleAddSocial = () => {
        setFormData(prev => ({
            ...prev,
            socials: [...(prev.socials || []), { title: '', url: '' }]
        }));
    };

    const handleRemoveSocial = (index: number) => {
        setFormData(prev => ({
            ...prev,
            socials: (prev.socials || []).filter((_, i) => i !== index)
        }));
    };

    const handleSocialChange = (index: number, field: 'title' | 'url', value: string) => {
        setFormData(prev => {
            const socials = [...(prev.socials || [])];
            socials[index] = { ...socials[index], [field]: value };
            return { ...prev, socials };
        });
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        // Process skills one more time before saving
        const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);
        const dataToSave = { ...formData, skills };

        try {
            await upsertData(dataToSave);
            alert('Saved successfully!');
        } catch (error) {
            alert('Failed to save data');
        }
    };

    if (loading) return <div>Loading data...</div>;

    return (
        <div style={{ paddingBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 style={{ margin: 0 }}>Content Manager</h2>
                <Button onClick={handleSave} size="lg">Save Changes</Button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'grid', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>

                {/* Hero Section */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginTop: 0 }}>Hero Section</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <Input
                            label="Title"
                            value={formData.hero?.title || ''}
                            onChange={e => handleChange('hero', 'title', e.target.value)}
                        />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9 }}>Subtitle</label>
                            <textarea
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    fontFamily: 'inherit',
                                    minHeight: '80px',
                                    fontSize: '0.95rem',
                                    boxSizing: 'border-box',
                                    outline: 'none'
                                }}
                                value={formData.hero?.subtitle || ''}
                                onChange={e => handleChange('hero', 'subtitle', e.target.value)}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--app-accent)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                            />
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginTop: 0 }}>About Section</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                            <label style={{ fontSize: '0.875rem', fontWeight: 500, opacity: 0.9 }}>Bio</label>
                            <textarea
                                style={{
                                    width: '100%',
                                    padding: '0.8rem',
                                    borderRadius: '8px',
                                    border: '1px solid #d1d5db',
                                    fontFamily: 'inherit',
                                    minHeight: '120px',
                                    fontSize: '0.95rem',
                                    boxSizing: 'border-box',
                                    outline: 'none'
                                }}
                                value={formData.about?.bio || ''}
                                onChange={e => handleChange('about', 'bio', e.target.value)}
                                onFocus={(e) => e.currentTarget.style.borderColor = 'var(--app-accent)'}
                                onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                            />
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginTop: 0 }}>Skills</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <Input
                            label="Skills (comma separated)"
                            value={skillsInput}
                            onChange={e => handleSkillsInputChange(e.target.value)}
                            onBlur={handleSkillsBlur}
                            placeholder="React, Node.js, TypeScript, Python"
                        />
                        {formData.skills && formData.skills.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {formData.skills.map((skill, i) => (
                                    <span key={i} style={{
                                        background: '#eef2ff',
                                        color: 'var(--app-accent)',
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '12px',
                                        fontSize: '0.875rem',
                                        fontWeight: 500
                                    }}>
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Socials */}
                <div className="card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>
                        <h3 style={{ margin: 0 }}>Socials</h3>
                        <Button type="button" onClick={handleAddSocial} size="sm" variant="ghost">+ Add Social</Button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {(!formData.socials || formData.socials.length === 0) && (
                            <p style={{ opacity: 0.6, fontSize: '0.9rem', margin: 0 }}>No socials added yet. Click "+ Add Social" to get started.</p>
                        )}

                        {formData.socials && formData.socials.map((social, index) => (
                            <div key={index} style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr auto',
                                gap: '0.75rem',
                                alignItems: 'end',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0'
                            }}>
                                <Input
                                    label="Title"
                                    value={social.title || ''}
                                    onChange={e => handleSocialChange(index, 'title', e.target.value)}
                                    placeholder="GitHub"
                                />
                                <Input
                                    label="URL"
                                    value={social.url || ''}
                                    onChange={e => handleSocialChange(index, 'url', e.target.value)}
                                    placeholder="https://github.com/username"
                                />
                                <Button
                                    type="button"
                                    onClick={() => handleRemoveSocial(index)}
                                    size="sm"
                                    variant="danger"
                                    style={{ marginBottom: '2px' }}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="card" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginTop: 0 }}>Footer</h3>
                    <Input
                        label="Footer Text"
                        value={formData.footer?.text || ''}
                        onChange={e => handleChange('footer', 'text', e.target.value)}
                        placeholder="Your Name"
                    />
                </div>
            </form>
        </div>
    );
};

export default DataManager;
