import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import PaymentForm from './components/PaymentForm';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  const [registerData, setRegisterData] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: ''
  });

  const [loginData, setLoginData] = useState({
    accountNumber: '',
    password: ''
  });

  const [paymentData, setPaymentData] = useState({
    swiftCode: '',
    amount: '',
    currency: '',
    accountNumber: ''
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  // Handle user registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear message before each new request
    try {
      const res = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('User registered successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error registering user.');
    }
  };

  // Handle user login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (res.ok) {
        setIsAuthenticated(true); // Set user as authenticated
        setMessage('Login successful!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error logging in.');
    }
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/submit-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Payment processed successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Error processing payment.');
    }
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Register route */}
          <Route path="/register" element={
            <Register 
              registerData={registerData} 
              handleRegisterChange={handleRegisterChange} 
              handleRegister={handleRegister} 
              message={message} 
            />
          } />

          {/* Login route */}
          <Route path="/login" element={
            <Login 
              loginData={loginData} 
              handleLoginChange={handleLoginChange} 
              handleLogin={handleLogin} 
              message={message} 
            />
          } />

          {/* Payment route */}
          <Route path="/payment" element={
            isAuthenticated ? (
              <PaymentForm 
                paymentData={paymentData} 
                handlePaymentChange={handlePaymentChange} 
                handlePayment={handlePayment} 
                message={message} 
              />
            ) : (
              <Navigate to="/login" />
            )
          } />

          {/* Dashboard route */}
          <Route path="/dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />

          {/* Default route to redirect to Login if not authenticated */}
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
