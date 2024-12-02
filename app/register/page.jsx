"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const router = useRouter()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("")
  const [img, setImg] = useState("profile.png"); // Default placeholder image
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setError("No file selected.");
      return;
    }

    console.log("Selected file:", file); // Debugging log

    // Validate file size and type
    if (file.size > 2 * 1024 * 1024) {
      setError("File size must be less than 2MB.");
      return;
    }
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPEG and PNG formats are allowed.");
      return;
    }

    try {
      const base64 = await convertImgToBase64(file);

      setImg(base64); // Update the image state
      setError(""); // Clear any previous errors
    } catch (error) {
      setError("Failed to process the image.");
      console.error("Error converting image:", error); // Debugging log
    }
  };

  // Convert image to Base64
  const convertImgToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (err) => reject(err);
    });
  };

  // Handle form submission
  const handleForm = async (e) => {
    e.preventDefault();
    setError(""); // Clear errors
    setSuccess(""); // Clear success message

    // Input validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/register", {
        name,
        email,
        password,
        img,
        department
      });

      setSuccess("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setImg("profile.png");
      if (response.data.status === 201) {
        router.push("/login")
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>

        {/* Form */}
        <form onSubmit={handleForm} className="mt-6">
          {/* Profile Picture */}
          <div className="mb-6 text-center">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="w-20 h-20 mx-auto rounded-full border-2 border-gray-300 shadow-md hover:opacity-80 transition-opacity duration-300"
                src={img}
                alt="Profile"
              />
              <span className="block text-gray-600 font-semibold mt-2">
                Upload Profile Picture
              </span>
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>
          <div id="department" className="mb-4 ">
            <label htmlFor="department" className="block text-gray-700 font-semibold mb-2">
              Department
            </label>
            <select
              id="department"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={e => setDepartment(e.target.value)}
              required
            >
              <option value="">--Department--</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Hotel Management">Hotel Management</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Bio – Technology">Bio – Technology</option>
              <option value="Microbiology">Microbiology</option>
              <option value="English">English</option>
              <option value="Forensic Science">Forensic Science</option>
              <option value="Sanitary Inspector">Sanitary Inspector</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="mt-4 text-center text-gray-600">
            Already a user? <Link className="text-blue-600 font-medium" href="/login">Login</Link>
          </p>
          {loading && (
            <div className="flex justify-center items-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
        </form>

        {/* Error Message */}
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {/* Success Message */}
        {success && <p className="mt-4 text-center text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
