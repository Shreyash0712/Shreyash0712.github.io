import type { Theme, Data, Blog } from '../types';

const API_URL = import.meta.env.VITE_API_URL + '/api';

export const fetchTheme = async (): Promise<Theme> => {
    const response = await fetch(`${API_URL}/theme`);
    if (!response.ok) {
        throw new Error('Failed to fetch theme');
    }
    return response.json();
};

export const fetchData = async (): Promise<Data> => {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json();
};

export const fetchBlogs = async (): Promise<Blog[]> => {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return response.json();
};

export const fetchBlogBySlug = async (slug: string): Promise<Blog> => {
    const response = await fetch(`${API_URL}/blogs/${slug}`);
    if (!response.ok) {
        throw new Error('Failed to fetch blog');
    }
    return response.json();
};
