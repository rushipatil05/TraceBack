import React, { useState, useEffect } from "react";
import { Search, X, User, Phone, PackageIcon, Paperclip, Mail } from "lucide-react";
import axios from "axios";

export function FindItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);

  // Fetch items from backend
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/items");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  const handleViewDetails = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Filter items based on search term
  const filteredItems = searchTerm
    ? items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    : items;

  return (
    <div className="space-y-8 relative">
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Find Lost Items
      </h1>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <input
          type="text"
          placeholder="Search for lost items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 bg-black border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-300">No items found matching your search.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div key={item._id} className="bg-black/50 rounded-lg overflow-hidden">
              {item.file && (
                <img
                  src={item.file}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="text-gray-400">Posted by: {item.name}</p>
                <p className="text-gray-300 line-clamp-2">{item.description}</p>
                <button
                  className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-md hover:bg-yellow-500 transition-colors mt-4"
                  onClick={() => handleViewDetails(item)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.2)] rounded-2xl max-w-md w-full overflow-hidden relative p-6">

            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white bg-black/20 hover:bg-black/30 rounded-lg p-2 transition"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-4">
              {selectedItem.file && (
                <img
                  src={selectedItem.file}
                  alt={selectedItem.title}
                  className="w-full max-h-80 mx-auto object-contain rounded-lg"
                />
              )}

              <h2 className="text-2xl font-bold text-white">{selectedItem.title}</h2>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-200">
                  <User className="h-5 w-5 text-yellow-400" />
                  <span>Finder: {selectedItem.name}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-200">
                  <Phone className="h-5 w-5 text-yellow-400" />
                  <span>Phone: {selectedItem.phone}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-200">
                  <Mail className="h-5 w-5 text-yellow-400" />
                  <span>Email: {selectedItem.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-200">
                  <Paperclip className="h-5 w-5 text-yellow-400" />
                  <span>Description: {selectedItem.description}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
