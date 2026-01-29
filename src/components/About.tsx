import type { AboutData, SectionStyle } from '../types';

interface AboutProps {
    data: AboutData | undefined;
    styles?: SectionStyle;
}

export const About = ({ data, styles }: AboutProps) => {
    return (
        <section id="about" style={{
            backgroundColor: styles?.bg,
            color: styles?.text,
            fontFamily: styles?.fontFamily,
            textAlign: styles?.textAlign,
            padding: '4rem 2rem',
            ...styles
        }}>
            <h2>About Me</h2>
            <div className="card" style={{
                backgroundColor: styles?.cardBg || 'rgba(255,255,255,0.1)',
                padding: '2rem',
                borderRadius: '8px'
            }}>
                <p>{data?.bio || "No bio available."}</p>
                {/* Future: Render skills, avatar */}
            </div>
        </section>
    );
};
