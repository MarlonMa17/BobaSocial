import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface RegisterProps {
  setIsAuthenticated: (value: boolean) => void;
  setCurrentUser: (user: any) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsAuthenticated, setCurrentUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    favoriteFlavor: ''
  });

  const flavorOptions = [
    'Original Milk Tea', 'Taro', 'Brown Sugar', 'Matcha', 'Thai Tea',
    'Honeydew', 'Strawberry', 'Mango', 'Passion Fruit', 'Lychee',
    'Coconut', 'Chocolate', 'Vanilla', 'Caramel', 'Wintermelon'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match! 😢');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      points: 100,
      level: 'Bubble Tea Newbie',
      favoritesFlavors: [formData.favoriteFlavor],
      streak: 1,
      joinDate: new Date().toISOString()
    };

    setCurrentUser(newUser);
    setIsAuthenticated(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        style={{ maxWidth: '450px', margin: '50px auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 className="page-title">
            <span className="boba-emoji">🎉</span>
            Join Boba Social
            <span className="boba-emoji">🎉</span>
          </h1>
          <p style={{ color: '#476ce6ff', fontSize: '1.2rem' }}>
            Start your bubble tea journey!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="🌟 Your Name"
            value={formData.name}
            onChange={handleChange}
            className="cute-input"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            className="cute-input"
            required
          />

          <select
            name="favoriteFlavor"
            value={formData.favoriteFlavor}
            onChange={handleChange}
            className="cute-input"
            required
            style={{ appearance: 'none', backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"%23FF69B4\"><path d=\"M7 10l5 5 5-5z\"/></svg>")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '20px' }}
          >
            <option value="">🧋 Choose your favorite flavor</option>
            {flavorOptions.map(flavor => (
              <option key={flavor} value={flavor}>{flavor}</option>
            ))}
          </select>

          <input
            type="password"
            name="password"
            placeholder="🔒 Password"
            value={formData.password}
            onChange={handleChange}
            className="cute-input"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="🔒 Confirm Password"
            value={formData.confirmPassword}
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
            Join the Boba Community! 🎊
          </motion.button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#476ce6ff' }}>
            Already a member?{' '}
            <Link to="/login" style={{ color: '#0b36c2ff', textDecoration: 'none', fontWeight: 'bold' }}>
              Sign in here! 🧋
            </Link>
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          <div style={{ fontSize: '2rem' }}>
            🧋 🎉 🌟 💖 🧋
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;