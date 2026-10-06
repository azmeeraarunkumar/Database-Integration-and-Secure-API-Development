import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('session_token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// LOGIN
export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

// CURRENT USER
export const getCurrentUser = async () => {
    const token = localStorage.getItem('session_token');
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp && decoded.exp < now) {
            localStorage.removeItem('session_token');
            return null;
        }

        return {
            sub: decoded.sub,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp
        };
    } catch (error) {
        localStorage.removeItem('session_token');
        return null;
    }
};

// PROFILE
export const getMyProfile = () => apiClient.get('/profile/me');

// MEMBERS
export const getGroupMembers = () => apiClient.get('/members/my_group');

// ADMIN UPDATE MEMBER
export const updateMemberAdmin = (memberId, memberData) => {
    return apiClient.put(`/admin/members/${memberId}`, memberData);
};

// TEAMS
export const getTeams = () => apiClient.get('/teams');

// EVENTS
export const getEvents = () => apiClient.get('/events');

// MATCHES
export const getMatches = () => apiClient.get('/matches');

// VENUES
export const getVenues = () => apiClient.get('/venues');

// EQUIPMENT
export const getEquipment = () => apiClient.get('/equipment');

// EQUIPMENT LOGS
export const getEquipmentLogs = () => apiClient.get('/equipment/logs');