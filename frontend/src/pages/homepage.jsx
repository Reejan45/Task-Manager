import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Home = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loadUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Welcome to Task Manager</h1>
        <p className="lead">
          Manage your tasks efficiently with secure authentication.
        </p>
        <div className="buttons">
          <a href="/register" className="btn btn-primary btn-lg">
            Get Started
          </a>
          <a href="/login" className="btn btn-light btn-lg">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;