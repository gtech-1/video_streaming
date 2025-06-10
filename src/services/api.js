import axios from 'axios';
import { clearAuthData } from '../utils/auth';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + '/api'
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration
            clearAuthData();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (data) => api.post('/auth/login', data),
    register: (data) => api.post('/auth/register', data),
    getProfile: () => api.get('/profile'),
    updateProfile: (data) => {
        // If data is FormData, don't set Content-Type header
        if (data instanceof FormData) {
            return api.put('/profile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return api.put('/profile', data);
    },
    updatePassword: (data) => api.put('/profile/password', data)
};

export const userAPI = {
    getUsers: () => api.get('/users'),
    getMembers: () => api.get('/users/members'),
    createUser: (data) => api.post('/users', data),
    updateUser: (userId, data) => api.put(`/users/${userId}`, data),
    deleteUser: (userId) => api.delete(`/users/${userId}`),
    exportUsers: () => api.get('/users/export'),
    importUsers: (data) => api.post('/users/import', data)
};

export const courseAPI = {
    getCourses: () => api.get('/courses'),
    createCourse: (data) => {
        if (data instanceof FormData) {
            return api.post('/courses', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return api.post('/courses', data);
    },
    updateCourse: (courseId, data) => {
        if (data instanceof FormData) {
            return api.put(`/courses/${courseId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return api.put(`/courses/${courseId}`, data);
    },
    deleteCourse: (courseId) => api.delete(`/courses/${courseId}`)
};

export const videoAPI = {
    getVideos: (courseId) => api.get(`/videos/course/${courseId}`),
    createVideo: (courseId, data) => {
        if (data instanceof FormData) {
            return api.post(`/videos/course/${courseId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return api.post(`/videos/course/${courseId}`, data);
    },
    updateVideo: (videoId, data) => {
        if (data instanceof FormData) {
            return api.put(`/videos/${videoId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        return api.put(`/videos/${videoId}`, data);
    },
    deleteVideo: (videoId) => api.delete(`/videos/${videoId}`)
};

export default api; 