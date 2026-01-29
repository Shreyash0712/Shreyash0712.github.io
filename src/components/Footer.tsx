import type { SectionStyle } from '../types';

interface FooterProps {
    data: { text: string } | undefined;
    styles?: SectionStyle;
}

export const Footer = ({ data, styles }: FooterProps) => {
    return (
        <footer style={{
            backgroundColor: styles?.bg,
            color: styles?.text,
            fontFamily: styles?.fontFamily,
            textAlign: styles?.textAlign || 'center',
            padding: '2rem',
            ...styles
        }}>
            <p>© {new Date().getFullYear()} {data?.text}</p>
        </footer>
    );
};
