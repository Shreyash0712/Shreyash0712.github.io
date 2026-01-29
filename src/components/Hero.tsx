import type { HeroData, SectionStyle } from '../types';

interface HeroProps {
    data: HeroData | undefined;
    styles?: SectionStyle;
}

export const Hero = ({ data, styles }: HeroProps) => {
    return (
        <section
            style={{
                height: "50vh",
                display: "flex",
                alignItems: styles?.textAlign || 'center',
                justifyContent: styles?.textAlign || 'center',
                backgroundColor: styles?.bg || '#000',
                color: styles?.text || '#fff',
                fontFamily: styles?.fontFamily,
                textAlign: styles?.textAlign || 'center',
                ...styles
            }}
        >
            <div
                style={{
                    padding: "4rem 2rem",
                    textAlign: styles?.textAlign || 'center',
                }}
            >
                <h1
                    style={{
                        fontSize: styles?.fontSize || "3rem",
                        fontWeight: 600,
                        marginBottom: "1rem",
                    }}
                >
                    {data?.title}
                </h1>

                <p
                    style={{
                        fontSize: styles?.fontSize || "1.25rem",
                        opacity: 0.8,
                    }}
                >
                    {data?.subtitle}
                </p>
            </div>
        </section>
    );
};
