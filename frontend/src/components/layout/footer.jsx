import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="text-light">Privacy Policy</a> | 
          <a href="/terms" className="text-light"> Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;