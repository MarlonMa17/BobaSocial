import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Plan = 'checkin' | 'quiz';

interface DailyRewardProps {
  onClose: () => void;
  onEarnPoints: (pts: number) => void;
}

const DailyReward: React.FC<DailyRewardProps> = ({ onClose, onEarnPoints }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>('checkin');
  const [todayDone, setTodayDone] = useState(false);
  const [changingPlan, setChangingPlan] = useState(false);

  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  // Mock quiz data
  const quiz = {
    question: 'Which topping is the most popular in bubble tea?',
    options: ['Pudding', 'Tapioca Pearls', 'Jelly', 'Red Bean'],
    correctIndex: 1,
  };

  const handleCheckIn = () => {
    setTodayDone(true);
    onEarnPoints(2);
  };

  const handleQuizAnswer = (index: number) => {
    if (quizAnswer !== null) return;
    const correct = index === quiz.correctIndex;
    setQuizAnswer(index);
    setQuizCorrect(correct);
    setTodayDone(true);
    if (correct) {
      onEarnPoints(5);
    }
  };

  const handleSwitchPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setChangingPlan(false);
    // Reset today's progress when switching plan
    setTodayDone(false);
    setQuizAnswer(null);
    setQuizCorrect(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="reward-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="reward-modal"
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className="reward-close" onClick={onClose}>
            &times;
          </button>

          {/* Header */}
          <div className="reward-header">
            <motion.div
              className="reward-badge"
              initial={{ rotate: -10, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
            >
              🎁
            </motion.div>
            <h2 className="reward-title">Daily Rewards</h2>
            <p className="reward-sub">Earn points & redeem for free boba!</p>
          </div>

          {/* Tastemate info banner */}
          <motion.div
            className="reward-banner"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="reward-banner-icon">🧋</span>
            <div>
              <strong>Order on Tastemate</strong>
              <span className="reward-banner-pts">+10 pts per order</span>
            </div>
          </motion.div>

          {/* Current plan display */}
          <div className="reward-plan-header">
            <span className="reward-plan-label">Your Plan</span>
            <motion.button
              className="reward-change-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChangingPlan(!changingPlan)}
            >
              {changingPlan ? 'Cancel' : 'Change Plan'}
            </motion.button>
          </div>

          {/* Plan selection */}
          <AnimatePresence mode="wait">
            {changingPlan ? (
              <motion.div
                key="plan-select"
                className="reward-options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <motion.div
                  className={`reward-option reward-option--selectable ${selectedPlan === 'checkin' ? 'reward-option--active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSwitchPlan('checkin')}
                >
                  <div className="reward-option-left">
                    <span className="reward-option-icon">📅</span>
                    <div>
                      <h3 className="reward-option-title">Daily Check-in</h3>
                      <p className="reward-option-desc">One tap each day to earn points</p>
                    </div>
                  </div>
                  <div className="reward-option-right">
                    <span className="reward-pts-badge">+2 pts/day</span>
                    {selectedPlan === 'checkin' && <span className="reward-current-tag">Current</span>}
                  </div>
                </motion.div>

                <motion.div
                  className={`reward-option reward-option--selectable ${selectedPlan === 'quiz' ? 'reward-option--active' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleSwitchPlan('quiz')}
                >
                  <div className="reward-option-left">
                    <span className="reward-option-icon">🧠</span>
                    <div>
                      <h3 className="reward-option-title">Daily Quiz</h3>
                      <p className="reward-option-desc">Answer one quiz per day for more points</p>
                    </div>
                  </div>
                  <div className="reward-option-right">
                    <span className="reward-pts-badge">+5 pts/day</span>
                    {selectedPlan === 'quiz' && <span className="reward-current-tag">Current</span>}
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="plan-action"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {/* Check-in plan */}
                {selectedPlan === 'checkin' && (
                  <div className="reward-options">
                    <motion.div
                      className={`reward-option ${todayDone ? 'reward-option--done' : ''}`}
                      whileHover={!todayDone ? { scale: 1.02 } : {}}
                    >
                      <div className="reward-option-left">
                        <span className="reward-option-icon">{todayDone ? '✅' : '📅'}</span>
                        <div>
                          <h3 className="reward-option-title">Daily Check-in</h3>
                          <p className="reward-option-desc">
                            {todayDone ? 'You earned 2 points today!' : 'Tap to check in and earn points'}
                          </p>
                        </div>
                      </div>
                      <div className="reward-option-right">
                        <span className="reward-pts-badge">+2 pts</span>
                        {!todayDone && (
                          <motion.button
                            className="reward-action-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCheckIn}
                          >
                            Check In
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  </div>
                )}

                {/* Quiz plan */}
                {selectedPlan === 'quiz' && (
                  <div className="reward-options">
                    <motion.div
                      className={`reward-option ${todayDone ? 'reward-option--done' : ''}`}
                    >
                      <div className="reward-option-left">
                        <span className="reward-option-icon">{todayDone ? '✅' : '🧠'}</span>
                        <div>
                          <h3 className="reward-option-title">Daily Quiz</h3>
                          <p className="reward-option-desc">
                            {quizCorrect !== null
                              ? quizCorrect
                                ? 'Correct! You earned 5 points!'
                                : 'Wrong answer, try again tomorrow!'
                              : 'Answer today\'s question to earn points'}
                          </p>
                        </div>
                      </div>
                      <div className="reward-option-right">
                        <span className="reward-pts-badge">+5 pts</span>
                      </div>
                    </motion.div>

                    {/* Quiz question */}
                    <AnimatePresence>
                      {quizAnswer === null && (
                        <motion.div
                          className="reward-quiz"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="reward-quiz-q">{quiz.question}</p>
                          <div className="reward-quiz-options">
                            {quiz.options.map((opt, i) => (
                              <motion.button
                                key={i}
                                className="reward-quiz-btn"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleQuizAnswer(i)}
                              >
                                {opt}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Quiz result */}
                    <AnimatePresence>
                      {quizAnswer !== null && (
                        <motion.div
                          className={`reward-quiz-result ${quizCorrect ? 'reward-quiz-result--correct' : 'reward-quiz-result--wrong'}`}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          {quizCorrect ? '🎉 Correct! +5 points earned!' : `😅 The answer was: ${quiz.options[quiz.correctIndex]}`}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer info */}
          <div className="reward-footer">
            <div className="reward-steps">
              <span className="reward-step">1. Choose your plan</span>
              <span className="reward-step-arrow">→</span>
              <span className="reward-step">2. Earn points daily</span>
              <span className="reward-step-arrow">→</span>
              <span className="reward-step">3. Redeem for free boba!</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DailyReward;
