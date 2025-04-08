import React, { useReducer } from 'react';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setauthtoken';
import api from '../../utils/api';

const AuthState = ({ children }) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await api.get('/api/auth/me');

      dispatch({
        type: 'USER_LOADED',
        payload: res.data.data
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.response?.data?.message || 'Authentication error'
      });
    }
  };

  // Register User
  const register = async (formData) => {
    try {
      const res = await api.post('/api/auth/register', formData);

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data.data
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data?.message || 'Registration failed'
      });
    }
  };

  // Login User
  const login = async (formData) => {
    try {
      const res = await api.post('/api/auth/login', formData);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data.data
      });

      loadUser();
    } catch (error) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: error.response?.data?.message || 'Invalid credentials'
      });
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.get('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }

    dispatch({ type: 'LOGOUT' });
  };

  // Clear Errors
  const clearErrors = () => dispatch({ type: 'CLEAR_ERRORS' });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        logout,
        loadUser,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;