import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Link } from './Link';

export function Navbar({ currentSection, onNavigate }) {
  return (
    <nav className="bg-black p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-yellow-400" />
          <span className="text-xl font-bold text-white">TraceBack</span>
        </div>
        <div className="flex gap-6">
          <Link 
            active={currentSection === 'home'} 
            onClick={() => onNavigate('home')}
          >
            Home
          </Link>
          <Link 
            active={currentSection === 'find'} 
            onClick={() => onNavigate('find')}
          >
            Find Item
          </Link>
          <Link 
            active={currentSection === 'post'} 
            onClick={() => onNavigate('post')}
          >
            Post Item
          </Link>
          <Link 
            active={currentSection === 'about'} 
            onClick={() => onNavigate('about')}
          >
            About us
          </Link>
        </div>
      </div>
    </nav>
  );
}