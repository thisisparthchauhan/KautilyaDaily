// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export const API_ENDPOINTS = {
    auth: {
        signup: `${API_URL}/api/auth/signup`,
        login: `${API_URL}/api/auth/login`,
    },
    user: {
        profile: `${API_URL}/api/user/profile`,
    },
    admin: {
        users: `${API_URL}/api/admin/users`,
        blogs: `${API_URL}/api/admin/blogs`,
        updateUserRole: (id: string) => `${API_URL}/api/admin/users/${id}/role`,
        updateBlogStatus: (id: string) => `${API_URL}/api/admin/blogs/${id}/status`,
    },
    blogs: {
        list: `${API_URL}/api/blogs`,
        create: `${API_URL}/api/blogs`,
        byId: (id: string) => `${API_URL}/api/blogs/${id}`,
    },
};
