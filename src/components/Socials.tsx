import type { SocialsData, SectionStyle } from '../types';

interface SocialsProps {
    data: SocialsData | undefined;
    styles?: SectionStyle;
}

export const Socials = ({ data, styles }: SocialsProps) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <section style={{
            backgroundColor: styles?.bg,
            color: styles?.text,
            fontFamily: styles?.fontFamily,
            fontSize: styles?.fontSize,
            textAlign: styles?.textAlign || 'center',
            padding: '2rem',
            ...styles
        }}>
            <div style={{
                display: 'flex',
                gap: '1.5rem',
                justifyContent: styles?.textAlign === 'left' ? 'flex-start' : styles?.textAlign === 'right' ? 'flex-end' : 'center',
                flexWrap: 'wrap'
            }}>
                {data.map((social, index) => (
                    <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: styles?.text || 'inherit',
                            textDecoration: 'none',
                            padding: '0.5rem 1rem',
                            border: `1px solid ${styles?.text || 'currentColor'}`,
                            borderRadius: '8px',
                            transition: 'all 0.2s',
                            fontSize: styles?.fontSize || '1rem'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = styles?.text || 'currentColor';
                            e.currentTarget.style.color = styles?.bg || '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = styles?.text || 'inherit';
                        }}
                    >
                        {social.title}
                    </a>
                ))}
            </div>
        </section>
    );
};
