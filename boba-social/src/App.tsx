import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import DrinkProfile from './components/DrinkProfile';
import Social from './components/Social';
import Navigation from './components/Navigation';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navigation />}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="app-content"
        >
          <Routes>
            <Route
              path="/login"
              element={
                !isAuthenticated ?
                <Login setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} /> :
                <Navigate to="/profile" />
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ?
                <Register setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} /> :
                <Navigate to="/profile" />
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ?
                <DrinkProfile user={currentUser} /> :
                <Navigate to="/login" />
              }
            />
            <Route
              path="/social"
              element={
                isAuthenticated ?
                <Social user={currentUser} /> :
                <Navigate to="/login" />
              }
            />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
}

export default App;
