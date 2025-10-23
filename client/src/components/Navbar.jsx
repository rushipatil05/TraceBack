import React, { useState, useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { NavLink } from "react-router-dom";

export function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSidebarToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

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
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <nav className="relative z-50">
      {/* Main Navbar */}
      <div className="bg-black p-4 sticky top-0 z-50 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-yellow-400" />
          <span className="text-xl font-bold text-white">TraceBack</span>
        </NavLink>

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

        {/* Desktop links */}
        <div className="hidden lg:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/find"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            Find Item
          </NavLink>
          <NavLink
            to="/post"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            Post Item
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
            }
          >
            About Us
          </NavLink>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-48 bg-black/70 backdrop-blur-md border-l-2 border-yellow-400 flex flex-col justify-center items-center gap-12 text-white transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
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
        <NavLink
          to="/"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/find"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
          }
        >
          Find Item
        </NavLink>
        <NavLink
          to="/post"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
          }
        >
          Post Item
        </NavLink>
        <NavLink
          to="/about"
          onClick={closeSidebar}
          className={({ isActive }) =>
            `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`
          }
        >
          About Us
        </NavLink>
      </div>
    </nav>
  );
}
