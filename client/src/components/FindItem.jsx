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
  const [submitted, setSubmitted] = useState(false);
  const [approved, setApproved] = useState(false);
  const [claimId, setClaimId] = useState(null);

  // 🟡 Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          "https://lostandfound-pq2d.onrender.com/api/items"
        );
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
  }, []);

  // 🟡 Restore state from localStorage on reload
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("activeClaim"));
    if (saved) {
      setClaimId(saved.claimId);
      setSubmitted(true);
      setApproved(saved.status === "approved");

      // 🔒 Don't open the modal immediately
      // Instead, keep a lightweight reference to the saved item
      setItems((prev) => {
        // If we already fetched items, update selected item later when user clicks
        const existing = prev.find((i) => i._id === saved.selectedItem._id);
        if (existing) setSelectedItem(null); // prevent auto-open
        return prev;
      });
    }
  }, []);


  //  Poll claim status if pending
  //  Poll claim status every 5s
  useEffect(() => {
    if (!claimId || approved) return;

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(
          `https://lostandfound-pq2d.onrender.com/api/claim/${claimId}`
        );

        // ✅ If the API returns an array, find the one with matching claimId
        const claimData = Array.isArray(res.data)
          ? res.data.find((c) => c._id === claimId)
          : res.data;

        if (claimData && claimData.status === "approved") {
          setApproved(true);
          toast.success("✅ Your claim has been approved!");

          // ✅ Fetch the approved item again for latest phone/email
          const contactRes = await axios.get(
            `https://lostandfound-pq2d.onrender.com/api/claim/${claimId}/contact`
          );

          setSelectedItem((prev) => ({
            ...prev,
            phone: contactRes.data.phone,
            email: contactRes.data.email,
          }));


          // Persist updated state
          localStorage.setItem(
            "activeClaim",
            JSON.stringify({
              claimId,
              selectedItem: itemRes.data,
              status: "approved",
            })
          );

          clearInterval(interval);
        }
      } catch (err) {
        console.error("Error checking claim status:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [claimId, approved]);



  const filteredItems = searchTerm
    ? items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : items;

  const handleClaimClick = () => setShowClaimForm(true);

  // 🟡 When user submits the claim
  const handleSubmitAnswer = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.post(
        "https://lostandfound-pq2d.onrender.com/api/claim",
        {
          itemId: selectedItem._id,
          claimantName: user?.name || "Anonymous User",
          claimantEmail: user?.email || "anonymous@example.com",
          answer,
        }
      );

      setSubmitted(true);
      setClaimId(res.data._id);

      // Save to localStorage persistently
      localStorage.setItem(
        "activeClaim",
        JSON.stringify({
          claimId: res.data._id,
          selectedItem,
          status: "pending",
        })
      );

      toast.success("✅ Your claim has been sent to the finder!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send claim");
    }
  };

  // 🟡 Clear everything when closing
  const handleClose = () => {
    setSelectedItem(null);
    setShowClaimForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-white">
          Find Lost Items
        </h1>

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
                    onClick={() => {
                      setSelectedItem(item);
                      setShowClaimForm(false);
                      setAnswer("");
                    }}
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

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xl">
          <div className="bg-white/10 border border-white/20 shadow-2xl rounded-2xl max-w-md w-full p-6 relative mx-4">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            {selectedItem.file && (
              <img
                src={selectedItem.file}
                alt={selectedItem.title}
                className="w-full max-h-80 object-contain rounded-lg mx-auto"
              />
            )}

            <h2 className="text-2xl font-bold text-white mt-4">
              {selectedItem.title}
            </h2>

            <div className="space-y-3 mt-3 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-yellow-400" />
                <span>Finder: {selectedItem.name}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Paperclip className="h-5 w-5 text-yellow-400" />
                <span>Description: {selectedItem.description}</span>
              </div>

              {/* ✅ Only show claim options if not yet submitted */}
              {!approved && !submitted && !showClaimForm && (
                <button
                  onClick={handleClaimClick}
                  className="w-full bg-yellow-400 text-black py-2 rounded-md mt-4 hover:bg-yellow-500 transition"
                >
                  This is my item
                </button>
              )}

              {showClaimForm && !submitted && (
                <div className="mt-4 space-y-2">
                  <p className="text-gray-300">
                    Finder’s Verification Question:{" "}
                    <span className="font-semibold">{selectedItem.verify}</span>
                  </p>

                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Your Answer"
                    className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                  />
                  <button
                    onClick={handleSubmitAnswer}
                    className="w-full bg-yellow-400 text-black py-2 rounded-md hover:bg-yellow-500 transition"
                  >
                    Submit Answer
                  </button>
                </div>
              )}

              {submitted && !approved && (
                <p className="text-gray-300 mt-4">
                  Your answer was sent. Waiting for finder approval.
                </p>
              )}

              {approved && (
                <>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-yellow-400" />
                    <span>Phone: {selectedItem.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-yellow-400" />
                    <span>Email: {selectedItem.email}</span>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
