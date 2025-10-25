import React, { useState, useEffect } from "react";
import { Search, X, User, Phone, Mail, Paperclip } from "lucide-react";
import axios from "axios";
import { Navbar } from "./Navbar";

export function FindItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("https://lostandfound-pq2d.onrender.com/api/items");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = searchTerm
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : items;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Navbar />

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          Find Lost Items
        </h1>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for lost items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 bg-black/70 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">No items found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-black/60 border border-gray-700 hover:border-yellow-400 transition-all rounded-xl overflow-hidden shadow-md"
              >
                {item.file && (
                  <img
                    src={item.file}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                )}
                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-semibold text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm">Posted by: {item.name}</p>
                  <p className="text-gray-300 line-clamp-2">{item.description}</p>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors mt-4"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl"
        >
          <div className="bg-white/10 border border-white/20 shadow-2xl rounded-2xl max-w-md w-full p-6 relative mx-4">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {/* Item Image */}
            {selectedItem.file && (
              <img
                src={selectedItem.file}
                alt={selectedItem.title}
                className="w-full max-h-80 object-contain rounded-lg mx-auto"
              />
            )}

            {/* Item Title */}
            <h2 className="text-2xl font-bold text-white mt-4">
              {selectedItem.title}
            </h2>

            {/* Item Details */}
            <div className="space-y-3 mt-3 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-yellow-400" />
                <span>Finder: {selectedItem.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span>Phone: {selectedItem.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span>Email: {selectedItem.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Paperclip className="h-5 w-5 text-yellow-400" />
                <span>Description: {selectedItem.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
