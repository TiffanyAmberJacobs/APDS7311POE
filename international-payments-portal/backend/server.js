import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import { post } from 'axios';

// Load environment variables
config();

const app = express();

// Middleware to parse JSON data
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Import the auth routes
import authRoute from './backend/Routes/auth.js';
app.use('/auth', authRoute);  // Route for authentication

// Currencycloud credentials
const credentials = {
  login_id: process.env.CURRENCYCLOUD_LOGIN_ID,  // Store credentials securely in .env
  api_key: process.env.e086d175823f21f321af15b60f4fcf25164eace9314f17f9b8199fbeace4236d

};

// Authenticate with Currencycloud
app.post('/api/currencycloud/authenticate', async (req, res) => {
  try {
    const response = await post('https://api.currencycloud.com/v2/authenticate/api', credentials);
    res.json(response.data);  // Return auth token to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with Currencycloud' });
  }
});

// Make a payment through Currencycloud
app.post('/api/currencycloud/payment', async (req, res) => {
  try {
    const { auth_token, paymentDetails } = req.body;  // Expect auth_token and payment details from the client
    const response = await post('https://api.currencycloud.com/v2/payments/create', paymentDetails, {
      headers: { 'X-Auth-Token': auth_token }  // Auth token in header
    });
    res.json(response.data);  // Return payment response to the client
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
});

// Example route to check server
app.get('/', (req, res) => {
    res.send('Backend server is running');
});

// Start server on port 3001
app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
});
import mongoose from 'mongoose';
import dotenv from 'dotenv';

config();

connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  