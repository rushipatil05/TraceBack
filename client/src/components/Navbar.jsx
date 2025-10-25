import React, { useState, useEffect, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import { NavLink, useNavigate, Link } from "react-router-dom";

export function Navbar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Toggle Sidebar
  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

  // Load user data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Close sidebar when clicking outside
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
    if (isSidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <nav className="relative z-50">
      {/* Navbar */}
      <div className="bg-black/90 p-4 sticky top-0 z-50 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-yellow-400" />
          <span className="text-xl font-bold text-white">TraceBack</span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden lg:flex gap-6">
          <NavLink
            to="/home"
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
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-white text-sm truncate max-w-[120px] sm:max-w-none text-right">
                👋 Hello,{" "}
                <span className="text-yellow-400 font-semibold">
                  {user.name || user.email}
                </span>
              </span>

              <button
                onClick={handleLogout}
                className="hidden lg:inline-flex bg-yellow-400 text-black px-3 py-1.5 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden sm:inline-flex bg-white/10 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar (Mobile) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-52 bg-black/90 backdrop-blur-lg border-l-2 border-yellow-400 flex flex-col justify-center items-center gap-10 text-white transition-transform duration-300 ${
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

        <NavLink to="/home" onClick={closeSidebar} className={({ isActive }) =>
          `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`}>Home</NavLink>

        <NavLink to="/find" onClick={closeSidebar} className={({ isActive }) =>
          `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`}>Find Item</NavLink>

        <NavLink to="/post" onClick={closeSidebar} className={({ isActive }) =>
          `hover:text-yellow-400 ${isActive ? "text-yellow-400" : "text-white"}`}>Post Item</NavLink>

        {user && (
          <button
            onClick={handleLogout}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
