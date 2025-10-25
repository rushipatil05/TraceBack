import React, { useState, useEffect, useRef } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSidebarToggle = () => setSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
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

    if (isSidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="relative z-50">
        <div className="bg-black/90 p-4 sticky top-0 z-50 flex justify-between items-center border-b border-white/10 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-yellow-400" />
            <span className="text-xl font-bold text-white">TraceBack</span>
          </Link>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={handleLogout}
                  className="hidden lg:inline-flex bg-yellow-400 text-black px-3 py-1.5 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-flex bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
              >
                Login
              </Link>
            )}

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

        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-52 bg-black/90 backdrop-blur-lg border-l-2 border-yellow-400 flex flex-col justify-center items-center gap-10 text-white transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={handleSidebarToggle}
            className="absolute top-6 right-4 text-white text-2xl hover:text-yellow-400 transition-colors"
          >
            &times;
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={() => setSidebarOpen(false)}
              className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-white">
            Lost Something? <span className="text-yellow-400">Find it Here</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our platform connects people who have lost items with those who have found them.
            Join our community to help reunite lost belongings with their owners.
          </p>

          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black/50 p-6 rounded-2xl text-center space-y-4 shadow-lg hover:bg-black/60 transition">
            <Search className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-semibold text-white">Search Items</h3>
            <p className="text-gray-300">
              Browse through our database of found items to locate your lost belongings.
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-2xl text-center space-y-4 shadow-lg hover:bg-black/60 transition">
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-semibold text-white">Report Found Items</h3>
            <p className="text-gray-300">
              Help others by reporting items you've found in your area.
            </p>
          </div>

          <div className="bg-black/50 p-6 rounded-2xl text-center space-y-4 shadow-lg hover:bg-black/60 transition">
            <Search className="w-12 h-12 text-yellow-400 mx-auto" />
            <h3 className="text-xl font-semibold text-white">Reunite & Celebrate</h3>
            <p className="text-gray-300">
              Connect securely with the finder or owner and arrange a safe return.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
