import React from 'react';
import { Search, AlertTriangle } from 'lucide-react';
export function Home({ onNavigate }) {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-white">
          Lost Something? <span className="text-yellow-400">Find it Here</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Our platform connects people who have lost items with those who have found them.
          Join our community to help reunite lost belongings with their owners.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            onClick={() => onNavigate('post')}
          >
            Report Found Item
          </button>
          <button
            className="bg-white/10 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            onClick={() => onNavigate('find')}
          >
            Search Lost Items
          </button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-black/50 p-6 rounded-xl text-center space-y-4">
          <Search className="w-12 h-12 text-yellow-400 mx-auto" />
          <h3 className="text-xl font-semibold text-white">Search Items</h3>
          <p className="text-gray-300">
            Browse through our database of found items to locate your lost belongings.
          </p>
        </div>
        <div className="bg-black/50 p-6 rounded-xl text-center space-y-4">
          <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto" />
          <h3 className="text-xl font-semibold text-white">Report Found Items</h3>
          <p className="text-gray-300">
            Help others by reporting items you've found in your area.
          </p>
        </div>
        <div className="bg-black/50 p-6 rounded-xl text-center space-y-4">
          <Search className="w-12 h-12 text-yellow-400 mx-auto" />
          <h3 className="text-xl font-semibold text-white">Get Notifications</h3>
          <p className="text-gray-300">
            Receive alerts when items matching your description are found.
          </p>
        </div>
      </section>
    </div>
  );
}