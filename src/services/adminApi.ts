import type { Theme, Data, Blog } from '../types';

const API_URL = import.meta.env.VITE_API_URL + '/api';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getToken()}`
});

// Re-use public fetch for admin convenience
export const fetchData = async (): Promise<Data> => {
    const response = await fetch(`${API_URL}/data`);
    if (!response.ok) throw new Error('Failed to fetch data');
    return response.json();
};

export const login = async (email: string, password: string): Promise<{ token: string }> => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
};

export const getThemes = async (): Promise<Theme[]> => {
    const response = await fetch(`${API_URL}/admin/themes`, { headers: authHeaders() });
    if (!response.ok) throw new Error('Failed to fetch themes');
    return response.json();
};

export const createTheme = async (theme: Partial<Theme>): Promise<Theme> => {
    const response = await fetch(`${API_URL}/admin/themes`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(theme)
    });
    if (!response.ok) throw new Error('Failed to create theme');
    return response.json();
};

export const updateTheme = async (id: string, theme: Partial<Theme>): Promise<Theme> => {
    const response = await fetch(`${API_URL}/admin/themes/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(theme)
    });
    if (!response.ok) throw new Error('Failed to update theme');
    return response.json();
};

export const activateTheme = async (id: string): Promise<Theme> => {
    const response = await fetch(`${API_URL}/admin/themes/${id}/activate`, {
        method: 'POST',
        headers: authHeaders()
    });
    if (!response.ok) throw new Error('Failed to activate theme');
    return response.json();
};

export const deleteTheme = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/admin/themes/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete theme');
}

export const upsertData = async (data: Partial<Data>): Promise<Data> => {
    const response = await fetch(`${API_URL}/admin/data`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to save data');
    return response.json();
};

export const createBlog = async (blog: Partial<Blog>): Promise<Blog> => {
    const response = await fetch(`${API_URL}/admin/blogs`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(blog)
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
};

export const deleteBlog = async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
    });
    if (!response.ok) throw new Error('Failed to delete blog');
}
