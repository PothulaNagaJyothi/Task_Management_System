import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, CheckSquare, Sun, Moon, LayoutDashboard, Menu, X } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

const Navbar = ({ darkMode, toggleTheme }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close only if clicking outside of the menu overlay AND it's open
      if (isMobileMenuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        // Also ensure they aren't clicking the toggle button itself (which triggers the state separately)
        if (!event.target.closest('.mobile-menu-toggle')) {
          setIsMobileMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  if (!user) return null;

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" onClick={closeMenu}>
        <CheckSquare size={24} />
        <span>TaskTracker Pro</span>
      </Link>

      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        ref={menuRef}
        className={`nav-actions ${isMobileMenuOpen ? 'mobile-open' : ''}`}
      >
        <Link 
          to="/" 
          className={`btn ${location.pathname === '/' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={closeMenu}
        >
          <LayoutDashboard size={18} /> Dashboard
        </Link>
        <Link 
          to="/tasks" 
          className={`btn ${location.pathname === '/tasks' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={closeMenu}
        >
          <CheckSquare size={18} /> Tasks
        </Link>

        <div className="nav-divider"></div>

        <button onClick={() => { toggleTheme(); closeMenu(); }} className="btn btn-secondary" style={{ padding: '0.5rem' }} aria-label="Toggle Theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button onClick={() => { setIsLogoutModalOpen(true); closeMenu(); }} className="btn btn-danger">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
          setIsLogoutModalOpen(false);
          logout();
        }}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
      />
    </nav>
  );
};

export default Navbar;
