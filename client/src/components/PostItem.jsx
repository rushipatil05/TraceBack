import React, { useState } from "react";  // ✅ added useState
import { Upload } from "lucide-react";
import axios from "axios";

export function PostItem() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("https://lostandfound-pq2d.onrender.com/api/items", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Item Posted Successfully!");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Post Found Item
      </h1>

      <div className="max-w-2xl mx-auto p-8 bg-black/80 rounded-lg shadow-xl">
        <p className="text-gray-300 mb-6">Please fill all the required fields</p>

        <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <input
              type="text"
              id="name"
              name="name"   // ✅ added
              placeholder="Name"
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"   // ✅ added
              placeholder="Email"
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <input
              type="tel"
              id="phone"
              name="phone"   // ✅ added
              placeholder="Phone"
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <input
              type="text"
              id="title"
              name="title"   // ✅ added
              placeholder="Title"
              onChange={handleChange}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <textarea
              id="description"
              name="description"   // ✅ added
              placeholder="Description"
              onChange={handleChange}
              rows={4}
              className="w-full p-3 bg-black border border-gray-700 rounded-md text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div>
            <label
              htmlFor="file"
              className="flex items-center gap-2 p-3 border border-gray-700 rounded-md cursor-pointer hover:border-yellow-400 transition-colors duration-200"
            >
              <Upload className="h-5 w-5 text-yellow-400" />
              <span className="text-gray-300">Choose File</span>
            </label>
            <input
              type="file"
              id="file"
              name="file"   // ✅ added
              className="hidden"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-500 transition-colors duration-200"
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
}
