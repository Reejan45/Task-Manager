import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import TaskContext from '../../context/task/TaskContext';
import '../../styles/Header.css';

const Header = () => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearTasks } = taskContext;

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const onLogout = () => {
    logout();
    clearTasks();
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const authLinks = (
    <li className="dropdown" ref={dropdownRef}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {user && (
          <>
            <div className="user-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{user.username}</span>
            <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'} ml-2`}></i>
          </>
        )}
      </div>
      <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
        <li>
          <Link to="/profile">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <i className="fas fa-cog"></i> Settings
          </Link>
        </li>
        <li className="dropdown-divider"></li>
        <li>
          <a onClick={onLogout} href="#!">
            <i className="fas fa-sign-out-alt"></i> Logout
          </a>
        </li>
      </ul>
    </li>
  );

  const guestLinks = (
    <ul className="navbar-links">
      <li className={location.pathname === '/register' ? 'active' : ''}>
        <Link to="/register" className="register-link">Register</Link>
      </li>
      
      <li className={location.pathname === '/login' ? 'active' : ''}>
        <Link to="/login" className="btn btn-primary btn-sm">Login</Link>
      </li>
    </ul>
  );

  return (
    <header className="navbar">
      <div className="container">
        {/* Brand/Logo */}
        <div className="navbar-brand">
          <Link to="/">
            <i className="fas fa-check-square"></i>
            <span>TaskFlow</span>
          </Link>
        </div>
  
        {/* User Links */}
        <div className="navbar-user">
          {isAuthenticated ? authLinks : guestLinks}
        </div>
  
        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>
    </header>
  );
};

export default Header;