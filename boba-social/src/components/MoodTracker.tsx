import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoodTrackerProps {
  currentMood: string;
  onUpdate: (mood: string) => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ currentMood, onUpdate }) => {
  const [selectedMood, setSelectedMood] = useState(currentMood);
  const [moodHistory, setMoodHistory] = useState([
    { date: '2024-01-15', mood: '😊', note: 'Great taro bubble tea!' },
    { date: '2024-01-14', mood: '🤗', note: 'Tried new brown sugar flavor' },
    { date: '2024-01-13', mood: '😍', note: 'Perfect matcha latte' },
    { date: '2024-01-12', mood: '🥰', note: 'Shared drinks with friends' },
    { date: '2024-01-11', mood: '😋', note: 'Discovered passion fruit tea' }
  ]);

  const moods = [
    { emoji: '😊', name: 'Happy', color: '#FFD700' },
    { emoji: '😍', name: 'Love', color: '#FF69B4' },
    { emoji: '🤗', name: 'Excited', color: '#FF6347' },
    { emoji: '😋', name: 'Yummy', color: '#32CD32' },
    { emoji: '🥰', name: 'Blissful', color: '#FF1493' },
    { emoji: '😌', name: 'Relaxed', color: '#9370DB' },
    { emoji: '🤩', name: 'Amazed', color: '#00CED1' },
    { emoji: '😴', name: 'Sleepy', color: '#4169E1' },
    { emoji: '🤔', name: 'Curious', color: '#DAA520' },
    { emoji: '😐', name: 'Neutral', color: '#708090' }
  ];

  const handleMoodSelect = (mood: any) => {
    setSelectedMood(mood.emoji);
    onUpdate(mood.emoji);

    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      date: today,
      mood: mood.emoji,
      note: `Feeling ${mood.name.toLowerCase()} today!`
    };

    setMoodHistory(prev => [newEntry, ...prev.filter(entry => entry.date !== today)].slice(0, 7));
  };

  return (
    <div className="card">
      <h3 className="section-title">
        💖 Daily Mood Tracker 💖
      </h3>

      <div style={{ marginBottom: '25px' }}>
        <p style={{ color: '#476ce6ff', textAlign: 'center', marginBottom: '20px' }}>
          How are you feeling about bubble tea today?
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', margin: '20px 0' }}>
          {moods.map((mood) => (
            <motion.div
              key={mood.emoji}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleMoodSelect(mood)}
              className={`mood-emoji ${selectedMood === mood.emoji ? 'selected' : ''}`}
              style={{
                textAlign: 'center',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '15px',
                background: selectedMood === mood.emoji
                  ? `linear-gradient(45deg, ${mood.color}40, ${mood.color}20)`
                  : 'transparent',
                border: selectedMood === mood.emoji ? `2px solid ${mood.color}` : '2px solid transparent',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '5px' }}>
                {mood.emoji}
              </div>
              <div style={{
                fontSize: '0.8rem',
                color: selectedMood === mood.emoji ? mood.color : '#476ce6ff',
                fontWeight: 'bold'
              }}>
                {mood.name}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              style={{
                textAlign: 'center',
                background: 'rgba(60, 137, 209, 0.1)',
                borderRadius: '15px',
                padding: '15px',
                margin: '20px 0',
                border: '2px solid #476ce6ff'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>
                {selectedMood}
              </div>
              <p style={{ color: '#0b36c2ff', fontWeight: 'bold' }}>
                Current mood selected! 🎉
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <h4 style={{ color: '#0b36c2ff', marginBottom: '15px', textAlign: 'center' }}>
          📅 Recent Mood History
        </h4>

        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {moodHistory.map((entry, index) => (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                background: 'rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                padding: '12px',
                margin: '8px 0',
                border: '1px solid #476ce6ff'
              }}
            >
              <div style={{ fontSize: '1.8rem' }}>
                {entry.mood}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', color: '#0b36c2ff', fontWeight: 'bold' }}>
                  {new Date(entry.date).toLocaleDateString()}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>
                  {entry.note}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ textAlign: 'center', marginTop: '0px', fontSize: '1.5rem' }}
      >
        Keep tracking your bubble tea moods! 🧋💕
      </motion.div>
    </div>
  );
};

export default MoodTracker;