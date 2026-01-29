import type { SectionStyle } from '../types';

interface SkillsProps {
    data: string[] | undefined;
    styles?: SectionStyle;
}

export const Skills = ({ data, styles }: SkillsProps) => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    return (
        <section style={{
            backgroundColor: styles?.bg,
            color: styles?.text,
            fontFamily: styles?.fontFamily,
            fontSize: styles?.fontSize,
            textAlign: styles?.textAlign || 'left',
            padding: '2rem',
            ...styles
        }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: styles?.textAlign || 'left' }}>Skills</h2>

            <p style={{
                fontSize: styles?.fontSize || '1rem',
                lineHeight: 1.6
            }}>
                {data.join(', ')}
            </p>
        </section>
    );
};
