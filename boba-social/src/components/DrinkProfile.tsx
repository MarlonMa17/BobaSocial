import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FavoriteFlavors from './FavoriteFlavors';
import MoodTracker from './MoodTracker';
import OrderingHabits from './OrderingHabits';
import FlavorCombinations from './FlavorCombinations';
import PointsProgress from './PointsProgress';

interface User {
  id: number;
  name: string;
  email: string;
  points: number;
  level: string;
  favoritesFlavors: string[];
  streak: number;
  joinDate?: string;
}

interface DrinkProfileProps {
  user: User;
}

const DrinkProfile: React.FC<DrinkProfileProps> = ({ user }) => {
  const [profileData, setProfileData] = useState({
    favoriteFlavors: user.favoritesFlavors || [],
    currentMood: '',
    orderingHabits: {
      frequency: 'Daily',
      preferredTime: 'Afternoon',
      averageSpend: '$5-10',
      favoriteLocation: 'Downtown Store'
    },
    customCombinations: []
  });

  const maxPoints = Math.ceil(user.points / 1000) * 1000;
  const progressPercentage = (user.points / maxPoints) * 100;

  const handleDataUpdate = (section: string, data: any) => {
    setProfileData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <motion.h1
            className="page-title"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="boba-emoji">🧋</span>
            {user.name}'s Drink Profile
            <span className="boba-emoji">🧋</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '20px',
              padding: '20px',
              margin: '20px auto',
              maxWidth: '600px',
              border: '2px solid #476ce6ff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🏆</div>
                <div style={{ color: '#0b36c2ff', fontWeight: 'bold', fontSize: '1.1rem' }}>{user.level}</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '5px' }}>🔥</div>
                <div style={{ color: '#0b36c2ff', fontWeight: 'bold', fontSize: '1.1rem' }}>{user.streak} Day Streak</div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '5px' }}>⭐</div>
                <div style={{ color: '#0b36c2ff', fontWeight: 'bold', fontSize: '1.1rem' }}>{user.points} Points</div>
              </div>
            </div>
          </motion.div>

          <PointsProgress
            currentPoints={user.points}
            maxPoints={maxPoints}
            level={user.level}
          />
        </div>

        <div className="grid grid-2">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <FavoriteFlavors
              flavors={profileData.favoriteFlavors}
              onUpdate={(flavors) => handleDataUpdate('favoriteFlavors', flavors)}
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <MoodTracker
              currentMood={profileData.currentMood}
              onUpdate={(mood) => handleDataUpdate('currentMood', mood)}
            />
          </motion.div>
        </div>

        <div className="grid grid-2">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <OrderingHabits
              habits={profileData.orderingHabits}
              onUpdate={(habits) => handleDataUpdate('orderingHabits', habits)}
            />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <FlavorCombinations
              combinations={profileData.customCombinations}
              onUpdate={(combinations) => handleDataUpdate('customCombinations', combinations)}
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="card"
          style={{ textAlign: 'center', marginTop: '30px' }}
        >
          <h3 className="section-title">Share Your Profile! 📤</h3>
          <p style={{ color: '#476ce6ff', marginBottom: '20px' }}>
            Let your friends see your amazing bubble tea journey!
          </p>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cute-button"
              onClick={() => alert('Profile shared! 🎉')}
            >
              Share on Social 📱
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cute-button"
              onClick={() => {
                const profileUrl = `${window.location.origin}/profile/${user.id}`;
                navigator.clipboard.writeText(profileUrl);
                alert('Profile link copied! 📋✨');
              }}
            >
              Copy Link 🔗
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ textAlign: 'center', margin: '30px 0', fontSize: '3rem' }}
        >
          🧋 💖 🧋
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DrinkProfile;