import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Star, Heart } from 'lucide-react';

interface FlavorCombination {
  id: string;
  name: string;
  ingredients: string[];
  rating: number;
  notes: string;
  dateCreated: string;
}

interface FlavorCombinationsProps {
  combinations: FlavorCombination[];
  onUpdate: (combinations: FlavorCombination[]) => void;
}

const FlavorCombinations: React.FC<FlavorCombinationsProps> = ({ combinations, onUpdate }) => {
  const [showForm, setShowForm] = useState(false);
  const [newCombination, setNewCombination] = useState({
    name: '',
    ingredients: [''],
    rating: 5,
    notes: ''
  });

  const [savedCombinations, setSavedCombinations] = useState<FlavorCombination[]>([
    {
      id: '1',
      name: 'Sweet Dreams',
      ingredients: ['Brown Sugar', 'Milk Tea', 'Tapioca Pearls', 'Cream'],
      rating: 5,
      notes: 'Perfect for relaxing evenings!',
      dateCreated: '2024-01-10'
    },
    {
      id: '2',
      name: 'Tropical Paradise',
      ingredients: ['Mango', 'Passion Fruit', 'Coconut', 'Popping Boba'],
      rating: 4,
      notes: 'Reminds me of vacation vibes',
      dateCreated: '2024-01-08'
    },
    {
      id: '3',
      name: 'Matcha Madness',
      ingredients: ['Matcha', 'Vanilla', 'Red Bean', 'Grass Jelly'],
      rating: 5,
      notes: 'Ultimate comfort drink',
      dateCreated: '2024-01-05'
    }
  ]);

  const suggestedIngredients = [
    'Brown Sugar', 'Taro', 'Matcha', 'Thai Tea', 'Mango', 'Strawberry',
    'Lychee', 'Passion Fruit', 'Coconut', 'Vanilla', 'Chocolate',
    'Tapioca Pearls', 'Popping Boba', 'Grass Jelly', 'Red Bean',
    'Pudding', 'Cream', 'Condensed Milk', 'Honey', 'Caramel'
  ];

  const handleAddIngredient = () => {
    setNewCombination(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const handleRemoveIngredient = (index: number) => {
    setNewCombination(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleIngredientChange = (index: number, value: string) => {
    setNewCombination(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const combination: FlavorCombination = {
      id: Date.now().toString(),
      name: newCombination.name,
      ingredients: newCombination.ingredients.filter(ing => ing.trim() !== ''),
      rating: newCombination.rating,
      notes: newCombination.notes,
      dateCreated: new Date().toISOString().split('T')[0]
    };

    setSavedCombinations(prev => [combination, ...prev]);
    setNewCombination({ name: '', ingredients: [''], rating: 5, notes: '' });
    setShowForm(false);
  };

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(star => (
          <motion.div
            key={star}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={() => interactive && onChange && onChange(star)}
            style={{
              cursor: interactive ? 'pointer' : 'default',
              color: star <= rating ? '#FFD700' : '#DDD',
              fontSize: '1.2rem'
            }}
          >
            ⭐
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 className="section-title" style={{ margin: 0 }}>
          🧪 My Flavor Combinations 🧪
        </h3>
        {!showForm && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="cute-button"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Plus size={16} />
            Create
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255, 105, 180, 0.1)',
              borderRadius: '15px',
              padding: '20px',
              marginBottom: '20px',
              border: '2px solid #FFB6C1'
            }}
          >
            <input
              type="text"
              placeholder="🏷️ Combination Name"
              value={newCombination.name}
              onChange={(e) => setNewCombination(prev => ({ ...prev, name: e.target.value }))}
              className="cute-input"
              required
            />

            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#FF1493', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                🧋 Ingredients:
              </label>
              {newCombination.ingredients.map((ingredient, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
                  <select
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="cute-input"
                    style={{ flex: 1, margin: 0 }}
                  >
                    <option value="">Select ingredient</option>
                    {suggestedIngredients.map(ing => (
                      <option key={ing} value={ing}>{ing}</option>
                    ))}
                  </select>
                  {newCombination.ingredients.length > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      style={{
                        background: '#FF69B4',
                        border: 'none',
                        borderRadius: '10px',
                        padding: '8px',
                        color: 'white',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </motion.button>
                  )}
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleAddIngredient}
                style={{
                  background: 'transparent',
                  border: '2px dashed #FF69B4',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  color: '#FF69B4',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                + Add Ingredient
              </motion.button>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ color: '#FF1493', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
                ⭐ Rating:
              </label>
              {renderStars(newCombination.rating, true, (rating) =>
                setNewCombination(prev => ({ ...prev, rating }))
              )}
            </div>

            <textarea
              placeholder="📝 Notes about this combination..."
              value={newCombination.notes}
              onChange={(e) => setNewCombination(prev => ({ ...prev, notes: e.target.value }))}
              className="cute-input"
              rows={3}
              style={{ resize: 'vertical' }}
            />

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="cute-button"
              >
                Save Combination 💾
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  background: 'transparent',
                  border: '2px solid #FF69B4',
                  borderRadius: '20px',
                  padding: '12px 25px',
                  color: '#FF69B4',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: 'bold'
                }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {savedCombinations.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: 'center',
              color: '#FF69B4',
              fontStyle: 'italic',
              padding: '40px'
            }}
          >
            No combinations yet! Create your first masterpiece! 🎨
          </motion.div>
        ) : (
          <AnimatePresence>
            {savedCombinations.map((combo, index) => (
              <motion.div
                key={combo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '15px',
                  padding: '20px',
                  margin: '15px 0',
                  border: '2px solid #FFB6C1',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h4 style={{ color: '#FF1493', margin: 0, fontSize: '1.2rem' }}>
                    {combo.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {renderStars(combo.rating)}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSavedCombinations(prev => prev.filter(c => c.id !== combo.id))}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#FF69B4',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                </div>

                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {combo.ingredients.map((ingredient, i) => (
                      <span
                        key={i}
                        style={{
                          background: 'linear-gradient(45deg, #FF69B4, #FFB6C1)',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: 'bold'
                        }}
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>

                {combo.notes && (
                  <p style={{ color: '#FF69B4', fontSize: '0.9rem', fontStyle: 'italic', margin: '10px 0' }}>
                    "{combo.notes}"
                  </p>
                )}

                <div style={{ fontSize: '0.8rem', color: '#FF69B4', textAlign: 'right' }}>
                  Created: {new Date(combo.dateCreated).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ textAlign: 'center', marginTop: '20px', fontSize: '2rem' }}
      >
        🧋🧪✨
      </motion.div>
    </div>
  );
};

export default FlavorCombinations;