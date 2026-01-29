import { useEffect } from 'react';

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?display=swap&family=';

interface FontLoaderProps {
    families: (string | undefined)[];
}

export const FontLoader = ({ families }: FontLoaderProps) => {
    useEffect(() => {
        const uniqueFonts = Array.from(new Set(families.filter(f => f && f !== 'inherit' && f !== 'sans-serif' && f !== 'serif')));

        if (uniqueFonts.length === 0) return;

        const linkId = 'dynamic-fonts';
        let link = document.getElementById(linkId) as HTMLLinkElement;

        if (!link) {
            link = document.createElement('link');
            link.id = linkId;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }

        // Format family names for URL (e.g. "Open Sans" -> "Open+Sans")
        const query = uniqueFonts.map(f => f!.replace(/\s+/g, '+')).join('&family=');
        link.href = `${GOOGLE_FONTS_URL}${query}`;

    }, [families]);

    return null;
};
