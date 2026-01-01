import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";

export function PostItem() {
  const [formData, setFormData] = useState({
    phone: "",
    title: "",
    description: "",
    verify: "",
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user?.name ||
      !user?.email ||
      !formData.phone ||
      !formData.title ||
      !formData.description ||
      !formData.verify
    ) {
      toast.warning("Please fill all fields before submitting");
      return;
    }


    if (!file) {
      toast.warning("Please select a file to upload");
      return;
    }

    setUploading(true);

    try {
      // Upload file to Cloudinary
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "First_time_using_cloudinary");

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dscllest7/image/upload",
        data
      );

      const uploadedFileUrl = cloudinaryRes.data.secure_url;
      setFileUrl(uploadedFileUrl);

      // Send to backend
      await axios.post(
        "https://lostandfound-pq2d.onrender.com/api/items",
        {
          ...formData,
          name: user.name,
          email: user.email,
          file: uploadedFileUrl,
        }
      );


      toast.success(" Item posted successfully!");

      setFormData({
        phone: "",
        title: "",
        description: "",
        verify: "",
      });

      setFile(null);
      setFileUrl("");
    } catch (err) {
      console.error("Error posting item:", err);
      toast.error(" Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-10">Post Found Item</h1>

        <div className="bg-black/80 p-8 rounded-2xl shadow-2xl border border-gray-800">
          <p className="text-gray-400 mb-6">
            Please fill all the required fields
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 text-sm text-gray-300 bg-black/40 border border-dashed border-yellow-400/30 rounded-lg px-4 py-2 cursor-default select-none">
              <span className="text-gray-500">👤 Posting as</span>
              <span className="font-semibold text-yellow-400">
                {user?.name}
              </span>
              <span className="text-gray-500">
                ({user?.email})
              </span>
            </div>


            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            <input
              type="text"
              name="title"
              placeholder="Item Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            <textarea
              name="description"
              placeholder="Item Description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            <input
              type="text"
              name="verify"
              placeholder="Question to ask for verification (e.g. color, brand, etc.)"
              value={formData.verify}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            {/* File Upload */}
            <label
              htmlFor="file"
              className="flex items-center gap-3 p-3 border border-gray-700 rounded-md cursor-pointer hover:border-yellow-400 transition-colors duration-200"
            >
              <Upload className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">
                {file ? file.name : "Choose File"}
              </span>
            </label>
            <input
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500 transition-colors duration-200"
            >
              {uploading ? "Uploading..." : "POST"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
