import React from 'react';
import { Heart, Shield, Users } from 'lucide-react';

export function AboutUs() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-white">
          About Lost & Found
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We're dedicated to helping people reunite with their lost belongings. 
          Our platform provides a simple and effective way to connect those who have 
          lost items with those who have found them.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-black/80 p-6 rounded-lg text-center space-y-4">
          <Heart className="h-12 w-12 text-yellow-400 mx-auto" />
          <h2 className="text-xl font-semibold text-white">Our Mission</h2>
          <p className="text-gray-300">
            To create a caring community that helps people recover their lost possessions 
            and restore peace of mind.
          </p>
        </div>

        <div className="bg-black/80 p-6 rounded-lg text-center space-y-4">
          <Shield className="h-12 w-12 text-yellow-400 mx-auto" />
          <h2 className="text-xl font-semibold text-white">Safe & Secure</h2>
          <p className="text-gray-300">
            We prioritize user privacy and security in every interaction on our platform.
          </p>
        </div>

        <div className="bg-black/80 p-6 rounded-lg text-center space-y-4">
          <Users className="h-12 w-12 text-yellow-400 mx-auto" />
          <h2 className="text-xl font-semibold text-white">Community First</h2>
          <p className="text-gray-300">
            Built on trust and goodwill, our community helps thousands of people every day.
          </p>
        </div>
      </section>

      <section className="bg-black/80 p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Post Found Items</h3>
              <p className="text-gray-300">
                If you've found something, create a detailed post with photos and location information.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Search Lost Items</h3>
              <p className="text-gray-300">
                Looking for something? Browse our database or create a lost item alert.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-yellow-400 text-black font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Connect & Recover</h3>
              <p className="text-gray-300">
                When you find a match, use our secure messaging system to arrange the return.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}