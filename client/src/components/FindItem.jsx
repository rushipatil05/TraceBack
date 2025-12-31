import React, { useState, useEffect } from "react";
import { Search, X, User, Phone, Mail, Paperclip } from "lucide-react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

export function FindItem() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showClaimForm, setShowClaimForm] = useState(false);
  const [answer, setAnswer] = useState("");

  // 🔑 PER-ITEM CLAIM STATE
  const [claims, setClaims] = useState({});

  /* ================= FETCH ITEMS ================= */
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/api/items`
        );
        setItems(Array.isArray(res.data) ? res.data : res.data.items || []);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  /* ================= SUBMIT CLAIM ================= */
  const handleSubmitAnswer = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/claim`,
        {
          itemId: selectedItem._id,
          claimantName: user?.name || "Anonymous User",
          claimantEmail: user?.email || "anonymous@example.com",
          answer,
        }
      );

      setClaims((prev) => ({
        ...prev,
        [selectedItem._id]: {
          claimId: res.data._id,
          submitted: true,
          approved: false,
        },
      }));

      setShowClaimForm(false);
      toast.success("✅ Claim sent successfully");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to submit claim");
    }
  };

  /* ================= POLL CLAIM STATUS ================= */
  useEffect(() => {
    const intervals = [];

    Object.entries(claims).forEach(([itemId, claim]) => {
      if (!claim.claimId || claim.approved) return;

      const interval = setInterval(async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/claim/${claim.claimId}`
          );

          if (res.data.status === "approved") {
            const contactRes = await axios.get(
              `${import.meta.env.VITE_SERVER_URL}/api/claim/${claim.claimId}/contact`
            );

            setClaims((prev) => ({
              ...prev,
              [itemId]: {
                ...prev[itemId],
                approved: true,
                phone: contactRes.data.phone,
                email: contactRes.data.email,
              },
            }));

            toast.success("✅ Claim approved!");
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Polling error:", err);
        }
      }, 5000);

      intervals.push(interval);
    });

    return () => intervals.forEach(clearInterval);
  }, [claims]);

  /* ================= SEARCH ================= */
  const filteredItems = searchTerm
    ? items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : items;

  const claim = selectedItem ? claims[selectedItem._id] : null;

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12 space-y-10">
        <h1 className="text-4xl font-bold text-center">Find Lost Items</h1>

        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for lost items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 bg-black/70 border border-gray-700 rounded-lg"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-black/60 border border-gray-700 rounded-xl overflow-hidden"
            >
              <img
                src={item.file || "/placeholder.png"}
                alt={item.title || "Item image"}
                className="w-full h-56 object-cover"
              />


              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold text-white truncate">
                  {item.title || "Untitled"}
                </h3>

                <p className="text-gray-400">
                  Finder: {item.name || "Unknown"}
                </p>

                <p className="text-gray-300 line-clamp-2">
                  {item.description || "No description available"}
                </p>

                <button
                  onClick={() => {
                    setSelectedItem(item);
                    setShowClaimForm(false);
                    setAnswer("");
                  }}
                  className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg mt-4"
                >
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="bg-white/10 border border-white/20 shadow-2xl rounded-2xl max-w-md w-full p-6 relative mx-4">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X />
            </button>

            {/* IMAGE */}
            <img
              src={selectedItem.file || "/placeholder.png"}
              alt={selectedItem.title}
              className="w-full max-h-80 object-contain rounded-lg mx-auto"
            />

            {/* TITLE */}
            <h2 className="text-2xl font-bold">
              {selectedItem.title}
            </h2>

            {/* FINDER */}
            <p className="mt-2 text-gray-300 flex items-center gap-2">
              <User className="w-4 h-4 text-yellow-400" />
              Finder: {selectedItem.name || "Unknown"}
            </p>

            {/* DESCRIPTION */}
            <p className="mt-3 text-gray-200 flex items-start gap-2">
              <Paperclip className="w-4 h-4 mt-1 text-yellow-400" />
              <span>{selectedItem.description || "No description provided"}</span>
            </p>

            {/* CLAIM BUTTON */}
            {!claim?.submitted && (
              <button
                onClick={() => setShowClaimForm(true)}
                className="w-full mt-4 bg-yellow-400 text-black py-2 rounded"
              >
                This is my item
              </button>
            )}

            {/* CLAIM FORM */}
            {showClaimForm && !claim?.submitted && (
              <div className="mt-4 space-y-2">
                <p>
                  Verification:{" "}
                  <span className="font-semibold">{selectedItem.verify}</span>
                </p>
                <input
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 bg-gray-800 rounded"
                  placeholder="Your answer"
                />
                <button
                  onClick={handleSubmitAnswer}
                  className="w-full bg-yellow-400 text-black py-2 rounded"
                >
                  Submit
                </button>
              </div>
            )}

            {/* WAITING */}
            {claim?.submitted && !claim?.approved && (
              <p className="mt-4 text-gray-300">
                Waiting for finder approval…
              </p>
            )}

            {/* APPROVED */}
            {claim?.approved && (
              <div className="mt-4 space-y-2">
                <p><Phone className="inline mr-2" /> {claim.phone}</p>
                <p><Mail className="inline mr-2" /> {claim.email}</p>
              </div>
            )}
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
