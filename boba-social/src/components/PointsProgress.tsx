import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface PointsProgressProps {
  currentPoints: number;
  maxPoints: number;
  level: string;
}

const PointsProgress: React.FC<PointsProgressProps> = ({ currentPoints, maxPoints, level }) => {
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const controls = useAnimation();
  const progressPercentage = (currentPoints / maxPoints) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPoints(currentPoints);
      controls.start({
        width: `${progressPercentage}%`,
        transition: { duration: 1.5, ease: "easeOut" }
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPoints, maxPoints, progressPercentage, controls]);

  const nextLevelPoints = maxPoints - currentPoints;
  const getLevelEmoji = (level: string) => {
    if (level.includes('Newbie')) return '🌱';
    if (level.includes('Explorer')) return '🗺️';
    if (level.includes('Enthusiast')) return '⭐';
    if (level.includes('Master')) return '👑';
    if (level.includes('Legend')) return '🏆';
    return '🧋';
  };

  const bubbles = Array.from({ length: 5 }, (_, i) => (
    <motion.div
      key={i}
      initial={{ y: 0, opacity: 0.7 }}
      animate={{
        y: [-20, -40, -20],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: i * 0.3
      }}
      style={{
        position: 'absolute',
        right: `${10 + i * 20}%`,
        top: '50%',
        width: '8px',
        height: '8px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="card"
      style={{ margin: '20px auto', maxWidth: '700px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 className="section-title">
          {getLevelEmoji(level)} Progress to Next Level {getLevelEmoji(level)}
        </h3>
        <p style={{ color: '#476ce6ff', fontSize: '1.1rem' }}>
          {nextLevelPoints} points until your next level up! 🚀
        </p>
      </div>

      <div className="progress-container" style={{ position: 'relative' }}>
        <motion.div
          className="progress-bar"
          initial={{ width: '0%' }}
          animate={controls}
          style={{
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {progressPercentage > 20 && bubbles}
        </motion.div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: progressPercentage > 50 ? 'white' : '#476ce6ff',
          fontWeight: 'bold',
          fontSize: '0.9rem',
          textShadow: progressPercentage > 50 ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
        }}>
          {animatedPoints} / {maxPoints}
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '15px',
        fontSize: '0.9rem',
        color: '#476ce6ff'
      }}>
        <span>🎯 Current: {level}</span>
        <span>{Math.round(progressPercentage)}% Complete</span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginTop: '20px',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🧋</div>
          <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>Drinks Ordered</div>
          <div style={{ fontWeight: 'bold', color: '#476ce6ff' }}>{Math.floor(currentPoints / 50)}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>👥</div>
          <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>Friends Made</div>
          <div style={{ fontWeight: 'bold', color: '#476ce6ff' }}>{Math.floor(currentPoints / 100)}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>📝</div>
          <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>Reviews Written</div>
          <div style={{ fontWeight: 'bold', color: '#476ce6ff' }}>{Math.floor(currentPoints / 75)}</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem' }}>🎉</div>
          <div style={{ fontSize: '0.8rem', color: '#476ce6ff' }}>Events Attended</div>
          <div style={{ fontWeight: 'bold', color: '#0b36c2ff' }}>{Math.floor(currentPoints / 200)}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PointsProgress;