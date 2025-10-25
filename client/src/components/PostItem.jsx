import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

export function PostItem() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
  });

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

    if (!file) {
      toast.warning("Please select a file to upload");
      return;
    }

    setUploading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "First_time_using_cloudinary"); // your preset name

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dscllest7/image/upload",
        data
      );

      const uploadedFileUrl = cloudinaryRes.data.secure_url;
      setFileUrl(uploadedFileUrl);

      await axios.post("https://lostandfound-pq2d.onrender.com/api/items", {
        ...formData,
        file: uploadedFileUrl,
      });

      toast.success("Item posted successfully!");
      console.log("Sending to backend:", { ...formData, file: uploadedFileUrl });

      setFormData({
        name: "",
        email: "",
        phone: "",
        title: "",
        description: "",
      });
      setFile(null);
      setFileUrl("");
    } catch (err) {
      console.error("Error posting item:", err);
      toast.error("❌ Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Main Section with Padding */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Post Found Item
        </h1>

        {/* Centered Form Card */}
        <div className="max-w-2xl mx-auto p-8 bg-black/80 rounded-lg shadow-xl mt-8 mb-16">
          <p className="text-gray-300 mb-6">
            Please fill all the required fields
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

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
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            <textarea
              name="description"
              placeholder="Description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />

            <label
              htmlFor="file"
              className="flex items-center gap-2 p-3 border border-gray-700 rounded-md cursor-pointer hover:border-yellow-400 transition-colors duration-200"
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

            {fileUrl && (
              <div className="mt-4 text-center">
                <img
                  src={fileUrl}
                  alt="Uploaded Preview"
                  className="w-48 h-48 object-cover mx-auto rounded-lg border border-gray-700"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500 transition-colors duration-200"
            >
              {uploading ? "Uploading..." : "POST"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
