import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';

interface FavoriteFlavorsProps {
  flavors: string[];
  onUpdate: (flavors: string[]) => void;
}

const FavoriteFlavors: React.FC<FavoriteFlavorsProps> = ({ flavors, onUpdate }) => {
  const [newFlavor, setNewFlavor] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const popularFlavors = [
    { name: 'Original Milk Tea', emoji: '🥛' },
    { name: 'Taro', emoji: '🟣' },
    { name: 'Brown Sugar', emoji: '🍯' },
    { name: 'Matcha', emoji: '🍵' },
    { name: 'Thai Tea', emoji: '🧡' },
    { name: 'Honeydew', emoji: '🍈' },
    { name: 'Strawberry', emoji: '🍓' },
    { name: 'Mango', emoji: '🥭' },
    { name: 'Passion Fruit', emoji: '🟡' },
    { name: 'Lychee', emoji: '⚪' },
    { name: 'Coconut', emoji: '🥥' },
    { name: 'Chocolate', emoji: '🍫' },
    { name: 'Vanilla', emoji: '🤍' },
    { name: 'Caramel', emoji: '🟤' },
    { name: 'Wintermelon', emoji: '🍈' }
  ];

  const handleAddFlavor = (flavorName: string) => {
    if (!flavors.includes(flavorName)) {
      onUpdate([...flavors, flavorName]);
    }
  };

  const handleRemoveFlavor = (flavorToRemove: string) => {
    onUpdate(flavors.filter(flavor => flavor !== flavorToRemove));
  };

  const handleCustomFlavorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFlavor.trim() && !flavors.includes(newFlavor.trim())) {
      onUpdate([...flavors, newFlavor.trim()]);
      setNewFlavor('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="card">
      <h3 className="section-title">
        🧋 My Favorite Flavors 🧋
      </h3>

      <div style={{ marginBottom: '20px' }}>
        <AnimatePresence>
          {flavors.map((flavor) => (
            <motion.div
              key={flavor}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              layout
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(45deg, #476ce6ff, #FFB6C1)',
                color: 'white',
                padding: '8px 15px',
                borderRadius: '20px',
                margin: '5px',
                fontWeight: 'bold'
              }}
            >
              <span>{flavor}</span>
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => handleRemoveFlavor(flavor)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <X size={16} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {flavors.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: '#476ce6ff', textAlign: 'center', fontStyle: 'italic' }}
          >
            No favorite flavors yet! Add some below 👇
          </motion.p>
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ color: '#0b36c2ff', marginBottom: '15px', textAlign: 'center' }}>
          ⭐ Popular Flavors ⭐
        </h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {popularFlavors.map((flavor) => (
            <motion.button
              key={flavor.name}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddFlavor(flavor.name)}
              disabled={flavors.includes(flavor.name)}
              style={{
                background: flavors.includes(flavor.name)
                  ? 'rgba(45, 153, 224, 0.3)'
                  : 'rgba(255, 255, 255, 0.8)',
                border: '2px solid #476ce6ff',
                borderRadius: '15px',
                padding: '8px 12px',
                cursor: flavors.includes(flavor.name) ? 'not-allowed' : 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                color: '#0b36c2ff',
                fontWeight: 'bold',
                opacity: flavors.includes(flavor.name) ? 0.6 : 1
              }}
            >
              {flavor.emoji} {flavor.name}
            </motion.button>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <AnimatePresence>
          {!showAddForm ? (
            <motion.button
              key="add-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="cute-button"
              style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}
            >
              <Plus size={20} />
              Add Custom Flavor
            </motion.button>
          ) : (
            <motion.form
              key="add-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleCustomFlavorSubmit}
              style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <input
                type="text"
                value={newFlavor}
                onChange={(e) => setNewFlavor(e.target.value)}
                placeholder="Enter custom flavor"
                className="cute-input"
                style={{ margin: 0, minWidth: '200px' }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="cute-button"
                >
                  Add
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewFlavor('');
                  }}
                  style={{
                    background: 'transparent',
                    border: '2px solid #476ce6ff',
                    borderRadius: '20px',
                    padding: '8px 16px',
                    color: '#476ce6ff',
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
      </div>
    </div>
  );
};

export default FavoriteFlavors;