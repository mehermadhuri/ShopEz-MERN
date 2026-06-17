import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../services/api';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await registerUser({
        name,
        email,
        password
      });

      // auto login after register
      login(data);

      // go to products page
      navigate('/products');

    } catch (err) {
      console.error("Server registration failed, attempting local fallback:", err);
      
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        return;
      }

      // Offline fallback
      try {
        const localUsers = JSON.parse(localStorage.getItem('local_users')) || [];
        const exists = localUsers.find(u => u.email === email);
        if (exists) {
          setError("User already exists (Offline Mode)");
          return;
        }

        const newUser = {
          _id: `local_${Date.now()}`,
          name,
          email,
          token: `local_token_${Date.now()}`
        };

        localUsers.push({ ...newUser, password });
        localStorage.setItem('local_users', JSON.stringify(localUsers));

        login(newUser);
        alert("⚠️ Backend server is offline. Registered successfully in Offline Mode.");
        navigate('/products');
      } catch (fallbackErr) {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register 📝</h2>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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

          <button type="submit">
            Register
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;