import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await loginUser({ email, password });

      login(data);
      navigate('/products');

    } catch (err) {
      console.error("Server login failed, attempting local fallback:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        return;
      }

      // Offline fallback
      try {
        const localUsers = JSON.parse(localStorage.getItem('local_users')) || [];
        const matchedUser = localUsers.find(u => u.email === email && u.password === password);
        
        if (matchedUser) {
          // Destructure to remove password from local state/storage session
          const { password: userPw, ...userSession } = matchedUser;
          login(userSession);
          alert("⚠️ Backend server is offline. Logged in successfully via Offline Mode.");
          navigate('/products');
          return;
        }

        const emailExists = localUsers.find(u => u.email === email);
        if (emailExists) {
          setError("Invalid password");
        } else {
          setError("Invalid email or password");
        }
      } catch (fallbackErr) {
        setError("Invalid email or password");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;