import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LoginProps {
  setIsAuthenticated: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const mockUser = {
      id: 1,
      name: 'Boba Lover',
      email: formData.email,
      points: 1250,
      level: 'Bubble Tea Master',
      favoritesFlavors: ['Taro', 'Brown Sugar', 'Matcha'],
      streak: 7
    };

    setCurrentUser(mockUser);
    setIsAuthenticated(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="container">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="card"
        style={{ maxWidth: '400px', margin: '50px auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="page-title">
            <span className="boba-emoji">🧋</span>
            Boba Social
            <span className="boba-emoji">🧋</span>
          </h1>
          <p style={{ color: '#FF69B4', fontSize: '1.2rem' }}>
            Welcome back, bubble tea lover!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            className="cute-input"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            className="cute-input"
            required
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="cute-button"
            style={{ width: '100%', marginTop: '20px' }}
          >
            Sign In 🧋
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#FF69B4' }}>
            New to Boba Social?{' '}
            <Link to="/register" style={{ color: '#FF1493', textDecoration: 'none', fontWeight: 'bold' }}>
              Join the bubble tea community! 🎉
            </Link>
          </p>
        </div>

        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ textAlign: 'center', marginTop: '20px', fontSize: '3rem' }}
        >
          🧋
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;