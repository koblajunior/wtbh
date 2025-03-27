import axios from 'axios';

// Base URL for the API
// const API_URL = 'http://localhost:8000/api'; // Replace with your backend API URL
const API_URL = import.meta.env.VITE_API_BASE_URL; // Replace with your backend API URL

// Create an axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Set Authorization header if user is logged in
const setAuthHeader = (token) => {
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers['Authorization'];
    }
};

export { api, setAuthHeader };
