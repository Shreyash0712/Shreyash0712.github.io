import '../style.css';
import { usePortfolio } from '../hooks/usePortfolio';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Skills } from '../components/Skills';
import { BlogList } from '../components/BlogList';
import { Socials } from '../components/Socials';
import { Footer } from '../components/Footer';
import { FontLoader } from '../components/FontLoader';

function Home() {
    const { theme, data, blogs, loading, error } = usePortfolio();

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="loading">{error}</div>;

    // Collect all used fonts
    const fonts = [
        theme?.hero_section?.fontFamily,
        theme?.about_section?.fontFamily,
        theme?.skills_section?.fontFamily,
        theme?.blogs_section?.fontFamily,
        theme?.footer_section?.fontFamily,
        theme?.socials_section?.fontFamily,
    ];

    return (
        <main style={{ fontFamily: 'var(--font-family, inherit)' }}>
            <FontLoader families={fonts} />
            <Hero data={data?.hero} styles={theme?.hero_section} />
            <About data={data?.about} styles={theme?.about_section} />
            <Skills data={data?.skills} styles={theme?.skills_section} />
            <BlogList blogs={blogs} styles={theme?.blogs_section} />
            <Socials data={data?.socials} styles={theme?.socials_section} />
            <Footer data={data?.footer} styles={theme?.footer_section} />
        </main>
    );
}

export default Home;
