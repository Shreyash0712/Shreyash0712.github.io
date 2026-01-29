import { useEffect, useState } from 'react';
import { fetchTheme, fetchData, fetchBlogs } from '../services/api';
import type { Theme, Data, Blog } from '../types';

export const usePortfolio = () => {
    const [theme, setTheme] = useState<Theme | null>(null);
    const [data, setData] = useState<Data | null>(null);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAllData = async () => {
            try {
                const [themeData, siteData, blogsData] = await Promise.all([
                    fetchTheme(),
                    fetchData(),
                    fetchBlogs()
                ]);

                setTheme(themeData);
                setData(siteData);
                setBlogs(blogsData);

                // Theme structure changed, so we rely on components using the theme object directly.
                // Global styles can be handled here if we add a 'global_section' later.

            } catch (err) {
                console.error(err);
                setError('Failed to load portfolio data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, []);

    return { theme, data, blogs, loading, error };
};
