import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from './Link';

export function Navbar({ currentSection, onNavigate }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null); // ref for hamburger

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar if clicked outside (ignore sidebar & hamburger)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLinkClick = (section) => {
    onNavigate(section);
    setSidebarOpen(false);
  };

  return (
    <nav className="relative z-50">
      {/* Main Content Navbar */}
      <div className="bg-black p-4 sticky top-0 z-50 flex justify-between items-center">
        <Link active={currentSection === 'home'} onClick={() => onNavigate('home')}>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">TraceBack</span>
          </div>
        </Link>

        {/* Mobile toggle */}
        <button
          ref={buttonRef}
          onClick={handleSidebarToggle}
          className="lg:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop horizontal links */}
        <div className="hidden lg:flex gap-6">
          <Link active={currentSection === 'home'} onClick={() => onNavigate('home')}>
            Home
          </Link>
          <Link active={currentSection === 'find'} onClick={() => onNavigate('find')}>
            Find Item
          </Link>
          <Link active={currentSection === 'post'} onClick={() => onNavigate('post')}>
            Post Item
          </Link>
          <Link active={currentSection === 'about'} onClick={() => onNavigate('about')}>
            About us
          </Link>
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-48 bg-black/70 backdrop-blur-md border-l-2 border-yellow-400 flex flex-col justify-center items-center gap-12 text-white transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={handleSidebarToggle}
          className="absolute top-6 right-4 text-white text-2xl hover:text-yellow-400 transition-colors"
        >
          &times;
        </button>

        {/* Sidebar Links */}
        <Link active={currentSection === 'home'} onClick={() => handleLinkClick('home')}>
          Home
        </Link>
        <Link active={currentSection === 'find'} onClick={() => handleLinkClick('find')}>
          Find Item
        </Link>
        <Link active={currentSection === 'post'} onClick={() => handleLinkClick('post')}>
          Post Item
        </Link>
        <Link active={currentSection === 'about'} onClick={() => handleLinkClick('about')}>
          About us
        </Link>
      </div>
    </nav>
  );
}
