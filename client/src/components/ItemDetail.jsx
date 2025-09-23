import React from 'react';
import { ArrowLeft, MapPin, Calendar, Phone, Mail, User, AlertTriangle } from 'lucide-react';

export function ItemDetail({ itemId, onBack }) {
  // Mock data - in a real app, you would fetch this based on the itemId
  const mockItems = [
    {
      id: 1,
      title: 'Blue Backpack',
      location: 'Central Park',
      date: '2024-02-28',
      description: 'Found a blue Nike backpack near the fountain. It has a laptop compartment and several books inside. The backpack appears to be in good condition with no visible damage.',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400',
      finder: {
        name: 'John Smith',
        email: 'john.smith@example.com',
        phone: '(555) 123-4567',
        preferredContact: 'email',
        foundDateTime: '2024-02-28 14:30',
        exactLocation: 'Near the central fountain in Central Park'
      }
    },
    {
      id: 2,
      title: 'iPhone 14',
      location: 'Downtown Library',
      date: '2024-02-27',
      description: 'Found an iPhone in black case. The screen is not cracked. The phone was found on a study table. It has a distinctive sticker on the back of the case.',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=400',
      finder: {
        name: 'Sarah Johnson',
        email: 'sarah.j@example.com',
        phone: '(555) 987-6543',
        preferredContact: 'phone',
        foundDateTime: '2024-02-27 11:15',
        exactLocation: 'Second floor reading room, Downtown Public Library'
      }
    },
    {
      id: 3,
      title: 'Gold Ring',
      location: 'Beach Boardwalk',
      date: '2024-02-26',
      description: 'Found a gold ring with inscription. The ring appears to be a wedding band with an engraving on the inside. It was found near the ice cream stand.',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=400',
      finder: {
        name: 'Michael Chen',
        email: 'mchen@example.com',
        phone: '(555) 456-7890',
        preferredContact: 'email',
        foundDateTime: '2024-02-26 16:45',
        exactLocation: 'Near the ice cream stand on the Beach Boardwalk'
      }
    }
  ];

  const item = mockItems.find(item => item.id === itemId);

  // Function to format description into lines
  const formatDescription = (description: string) => {
    // Split by periods, commas, or other natural breaks
    const sentences = description.split(/(?<=[.!?])\s+/);
    return sentences.filter(s => s.trim().length > 0);
  };

  if (!item) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white">Item not found</h2>
        <button 
          onClick={onBack}
          className="mt-4 bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-yellow-400 hover:text-yellow-500 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Search</span>
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-auto rounded-lg shadow-lg"
          />
          
          <div className="bg-black/50 p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-white mb-4">{item.title}</h1>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span>Found at: {item.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <span>Date: {item.date}</span>
              </div>
            </div>
            
            {/* Formatted description */}
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Description:</h4>
              <ul className="text-gray-300 space-y-1">
                {formatDescription(item.description).map((line, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-black/50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Finder's Name</p>
                  <p className="text-white">{item.finder.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">{item.finder.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{item.finder.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Found Date & Time</p>
                  <p className="text-white">{item.finder.foundDateTime}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Exact Location</p>
                  <p className="text-white">{item.finder.exactLocation}</p>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-gray-400 text-sm">Preferred Contact Method</p>
                <p className="text-white capitalize">{item.finder.preferredContact}</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 p-6 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-semibold">Safety Guidelines</h4>
                <ul className="text-gray-300 text-sm mt-2 space-y-2">
                  <li>• Meet in a public, well-lit place during daylight hours</li>
                  <li>• Consider bringing a friend or family member</li>
                  <li>• Be prepared to verify your ownership of the item</li>
                  <li>• Trust your instincts - if something feels wrong, leave</li>
                  <li>• Consider using our secure messaging system first</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-400 p-4 rounded-lg text-center">
            <button className="text-black font-semibold">
              Contact via Secure Messaging
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}