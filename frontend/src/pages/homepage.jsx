import React, { useContext, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import '../styles/Features.css';
import '../App.css';

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
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content slide-in-up">
          <h1>Organize Your Tasks, Simplify Your Life</h1>
          <p>
            TaskFlow helps you manage tasks efficiently with powerful organization tools
            and seamless collaboration features.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-light">
              Get Started – It's Free
            </Link>
            <Link to="/login" className="btn btn-outline-light">
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header text-center">
          <h2>Why Choose TaskFlow?</h2>
          <p>Designed to boost your productivity with essential task management features</p>
        </div>
        
        <div className="grid-3">
          <div className="feature-card card fade-in">
            <div className="feature-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3>Simple Task Management</h3>
            <p>Create, organize, and track tasks with ease. Set priorities, deadlines, and categories to stay organized.</p>
          </div>
          
          <div className="feature-card card fade-in">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Track Your Progress</h3>
            <p>Monitor your productivity with visual progress indicators and completion statistics.</p>
          </div>
          
          <div className="feature-card card fade-in">
            <div className="feature-icon">
              <i className="fas fa-bell"></i>
            </div>
            <h3>Timely Reminders</h3>
            <p>Never miss a deadline with custom notifications and reminders for important tasks.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header text-center">
          <h2>How TaskFlow Works</h2>
          <p>Three simple steps to transform your productivity</p>
        </div>
        
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Your Account</h3>
            <p>Sign up for free and set up your personal task management space.</p>
          </div>
          
          <div className="step-divider">
            <i className="fas fa-arrow-right"></i>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Your Tasks</h3>
            <p>Create tasks, set priorities, deadlines, and organize them into projects.</p>
          </div>
          
          <div className="step-divider">
            <i className="fas fa-arrow-right"></i>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Stay Productive</h3>
            <p>Complete tasks, track progress, and celebrate your productivity.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header text-center">
          <h2>What Our Users Say</h2>
          <p>Join thousands of satisfied TaskFlow users</p>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card card">
            <div className="testimonial-content">
              <p>"TaskFlow has completely transformed how I manage my daily work and personal projects. The interface is intuitive and visually pleasing."</p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">AS</div>
              <div className="testimonial-info">
                <h4>Amanda Smith</h4>
                <p>Product Designer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card card">
            <div className="testimonial-content">
              <p>"I've tried many task management tools, but TaskFlow is by far the most user-friendly and effective for keeping me on track."</p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">JD</div>
              <div className="testimonial-info">
                <h4>James Davis</h4>
                <p>Software Developer</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card card">
            <div className="testimonial-content">
              <p>"The clean design and simple workflow make TaskFlow a joy to use every day. It's become an essential part of my productivity system."</p>
            </div>
            <div className="testimonial-author">
              <div className="testimonial-avatar">LW</div>
              <div className="testimonial-info">
                <h4>Lisa Wong</h4>
                <p>Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Boost Your Productivity?</h2>
          <p>Join TaskFlow today and transform how you manage your tasks.</p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;