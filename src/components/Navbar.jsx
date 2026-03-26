import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ totalProducts }) {
  const navigate = useNavigate();
  const email = localStorage.getItem('user_email') || 'user@example.com';
  const initial = email.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_email');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-mark">S</span>
        <span className="brand-name">ShelfLine</span>
        {totalProducts > 0 && (
          <span className="brand-count">{totalProducts} products</span>
        )}
      </div>

      <div className="navbar-right">
        <div className="user-chip">
          <span className="user-avatar">{initial}</span>
          <span className="user-email">{email}</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}
