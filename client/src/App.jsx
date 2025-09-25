import React, { useState } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { Home } from "./components/Home.jsx";
import { FindItem } from "./components/FindItem.jsx";
import { PostItem } from "./components/PostItem.jsx";
import { AboutUs } from "./components/AboutUs.jsx";
import RiveHero from "./components/RiveHero/RiveHero.jsx";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const [showRiveHero, setShowRiveHero] = useState(true); 

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {showRiveHero ? (
        <RiveHero setstartnow={setShowRiveHero} />
      ) : (
        <>
          <Navbar currentSection={currentSection} onNavigate={setCurrentSection} />
          <main className="container mx-auto px-4 py-12">
            {currentSection === "home" && <Home onNavigate={setCurrentSection} />}
            {currentSection === "find" && <FindItem />}
            {currentSection === "post" && <PostItem />}
            {currentSection === "about" && <AboutUs />}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
