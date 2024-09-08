import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { UserContext } from '../UserContext'; // Import UserContext
import './auth1.css';  // Import the CSS file

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate
  const { userEmail, setUserEmail, isAuthenticated } = useContext(UserContext); // Access userEmail and isAuthenticated

  // Redirect to the logged-in page if the user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/loggedinloginpage'); // Adjust the route if needed
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:9099/register', {
        name,
        email,
        password,
        phone,
      });

      // Handle successful registration
      console.log('Registration successful:', response.data);

      // Redirect to the login page after successful registration
      navigate('/login');
    } catch (err) {
      setError('Error registering user');
      console.error('Registration error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="auth-btn">Register</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
