// In production (Vercel), we use relative paths so the requests go to the same domain
// and are handled by the rewrite rules in vercel.json
let apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://127.0.0.1:5001');

// Safety check: specific to Vercel deployment where user might have set localhost
if (import.meta.env.PROD && (apiUrl.includes('localhost') || apiUrl.includes('127.0.0.1'))) {
    console.warn('Ignoring VITE_API_URL because it points to localhost in production');
    apiUrl = '';
}

export const API_URL = apiUrl;

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
