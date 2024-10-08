import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const submitPayment = async (paymentData) => {
    const response = await axios.post(`${API_URL}/submit-payment`, paymentData);
    return response.data;
};

export default { submitPayment };
