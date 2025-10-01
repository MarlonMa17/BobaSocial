import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { User, Users, Home, LogOut } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/profile', icon: Home, label: 'My Profile', emoji: '🏠' },
    { path: '/social', icon: Users, label: 'Social', emoji: '👥' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #FFB6C1',
        zIndex: 1000,
        padding: '15px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <span style={{ fontSize: '1.5rem' }}>🧋</span>
          <h2 style={{ color: '#FF69B4', margin: 0, fontFamily: 'Comic Sans MS' }}>
            Boba Social
          </h2>
        </motion.div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {navItems.map(item => (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  background: location.pathname === item.path
                    ? 'linear-gradient(45deg, #FF69B4, #FFB6C1)'
                    : 'transparent',
                  color: location.pathname === item.path ? 'white' : '#FF69B4',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease'
                }}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </motion.div>
            </Link>
          ))}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            style={{
              background: 'transparent',
              border: '2px solid #FF69B4',
              borderRadius: '20px',
              padding: '8px 16px',
              color: '#FF69B4',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 'bold',
              fontFamily: 'inherit'
            }}
          >
            <span>🚪</span>
            <span>Logout</span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;