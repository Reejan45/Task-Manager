import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/homepage';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import Dashboard from './pages/dashboard';

// Components
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import PrivateRoute from './components/PrivateRoute';

// Context
import AuthState from './context/auth/AuthState';
import TaskState from './context/task/TaskState';

function App() {
  return (
    <AuthState>
      <TaskState>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </TaskState>
    </AuthState>
  );
}

export default App;