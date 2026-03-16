import axios from 'axios';

const API_URL = import.meta.env.VITE_DJANGO_URL || 'http://localhost:8002/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to inject the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Optional: Add response interceptor to handle 401s (token expiration)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Here you could implement token refresh logic if the backend supports it
            // For now, we'll just logout
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            // Window reload or redirect to login could happen here, 
            // but usually better handled by the UI or a router guard.
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (username, password) => {
        const response = await api.post('/auth/login/', { username, password });
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    },
    register: async (username, email, password) => {
        return api.post('/auth/register/', { username, email, password });
    },
    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export const sessionService = {
    getAll: async () => {
        const response = await api.get('/sessions/');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/sessions/${id}/`);
        return response.data;
    },
    upload: async (airportCode, sessionDate, files) => {
        const formData = new FormData();
        formData.append('airport_code', airportCode);
        formData.append('session_date', sessionDate); // ISO String

        // Handle single or multiple files
        if (Array.isArray(files)) {
            files.forEach((file) => formData.append('files', file));
        } else {
            formData.append('files', files);
        }

        const response = await api.post('/sessions/upload/', formData);
        return response.data;
    },
    validate: async (id) => {
        const response = await api.post(`/sessions/${id}/validate/`);
        return response.data;
    }
};

export default api;
