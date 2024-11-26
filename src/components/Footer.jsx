import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} NoteNest. All Rights Reserved.</p>
        <div>
          <Link to="/about" className="text-white mx-3">About</Link>
          <Link to="/contact" className="text-white mx-3">Contact</Link>
        </div>
        <div className="mt-2">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-facebook"></i> Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
