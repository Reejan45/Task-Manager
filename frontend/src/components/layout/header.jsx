import React, { useContext, Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import TaskContext from '../../context/task/TaskContext';

const Header = () => {
  const authContext = useContext(AuthContext);
  const taskContext = useContext(TaskContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearTasks } = taskContext;

  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const onLogout = () => {
    logout();
    clearTasks();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const authLinks = (
    <Fragment>
      <li className="dropdown">
        <span className="dropdown-toggle">
          Hello, {user && user.username} <i className="fas fa-caret-down"></i>
        </span>
        <ul className="dropdown-menu">
          <li>
            <a onClick={onLogout} href="#!">
              <i className="fas fa-sign-out-alt"></i> Logout
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className={location.pathname === '/register' ? 'active' : ''}>
        <Link to="/register">Register</Link>
      </li>
      <li className={location.pathname === '/login' ? 'active' : ''}>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar bg-primary">
      <div className="container">
        <h1>
          <Link to="/">
            <i className="fas fa-check-square"></i> Task Manager
          </Link>
        </h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </button>
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Header;