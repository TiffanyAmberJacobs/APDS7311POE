import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const register = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

const login = async (loginData) => {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    return response.data;
};

export default { register, login };
