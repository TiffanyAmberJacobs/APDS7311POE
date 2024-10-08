import React from 'react';
import { Link } from 'react-router-dom';


function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your account dashboard. Here you can see your payment history and make new transactions.</p>
      
      {/* Add navigation links */}
      <nav>
        <ul>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/payment">Make a Payment</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
