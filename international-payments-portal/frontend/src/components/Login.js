import React, { useState } from 'react';
import authService from '../services/authService';

const Login = () => {
    const [formData, setFormData] = useState({
        accountNumber: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(formData);
            alert('Logged in successfully');
        } catch (error) {
            alert('Error logging in');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Account Number" required />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
