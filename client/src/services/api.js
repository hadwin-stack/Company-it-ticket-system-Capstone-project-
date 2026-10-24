import axios from 'axios';

const API = axios.create({
    baseURL: 'https://company-it-ticket-system-capstone-project.onrender.com/api'
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Authentication Calls
export const loginUser = (credentials) => API.post('/auth/login', credentials);
export const registerUser = (userData) => API.post('/auth/register', userData);
// Ticket Action Calls
export const fetchAllTickets = () => API.get('/tickets');
export const createNewTicket = (ticketData) => API.post('/tickets', ticketData);
export const markTicketAsFixed = (id) => API.patch(`/tickets/${id}/fix`);
