"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UploadVideo = () => {
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [imgData, setImgData] = useState({ base64: "", name: "" });
  const [videoData, setVideoData] = useState({ base64: "", name: "" });
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const response = await axios("/api/getUserData");
      setEmail(response.data.user?.email || "");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Convert files to Base64
  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return setError("No file selected.");

    // Validate file size and type
    if (file.size > 2 * 1024 * 1024) return setError("Image size must be under 2MB.");
    if (!["image/jpeg", "image/png"].includes(file.type)) return setError("Only JPEG and PNG images are allowed.");

    try {
      const base64 = await convertToBase64(file);
      // console.log(base64)
      setImgData({ base64, name: file.name });
      setError(""); // Clear errors
    } catch (err) {
      setError("Failed to process image.");
      console.error(err);
    }
  };

  // Handle video upload
  const handleVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return setError("No file selected.");

    // Validate file size
    if (file.size > 10 * 1024 * 1024) return setError("Video size must be under 10MB.");

    try {
      const base64 = await convertToBase64(file);
      setVideoData({ base64, name: file.name });
      setError(""); // Clear errors
    } catch (err) {
      setError("Failed to process video.");
      console.error(err);
    }
  };

  // Handle form submission
  const uploadVideo = async (e) => {
    e.preventDefault();

    if (!videoData.base64 || !title || !description || !department) {
      return setError("Please fill in all the required fields.");
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/uploadVideo", {
        video: videoData.base64,
        img: imgData.base64,
        title,
        description,
        department,
        email,
      });
      
      

      if (response.data.status === 201) {
        setDescription("");
        setTitle("");
        setImgData({ base64: "", name: "" });
        setVideoData({ base64: "", name: "" });
        setDepartment("");
        setError(""); // Clear any errors
        router.refresh();
      } else {
        setError("Failed to upload video. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while uploading.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="p-8 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[700px] p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Upload Video
        </h1>
        <form onSubmit={uploadVideo} className="mt-8 space-y-6">
          {error && (
            <div className="text-red-500 text-center font-semibold">
              {error}
            </div>
          )}

          {/* Video Upload */}
          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="video"
              className="flex items-center justify-center w-full h-48 bg-gray-200 border border-dashed rounded-lg cursor-pointer hover:bg-gray-300"
            >
              {videoData.name ? (
                <span className="text-gray-700">{videoData.name}</span>
              ) : (
                <span className="text-gray-500">Click to upload video</span>
              )}
              <input
                type="file"
                id="video"
                className="hidden"
                accept="video/*"
                onChange={handleVideo}
              />
            </label>
          </div>

          {/* Thumbnail Upload */}
          <div className="mb-6 text-center">
            <label
              htmlFor="image"
              className="flex items-center justify-center w-full h-48 bg-gray-200 border border-dashed rounded-lg cursor-pointer hover:bg-gray-300"
            >
              {imgData.name ? (
                <span className="text-gray-700">{imgData.name}</span>
              ) : (
                <span className="text-gray-500">Click to upload thumbnail</span>
              )}
              <input
                type="file"
                id="image"
                className="hidden"
                accept="image/*"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-semibold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video description"
              rows={4}
              required
            />
          </div>

          {/* Department */}
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-gray-700 font-semibold mb-2"
            >
              Department
            </label>
            <select
              id="department"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setDepartment(e.target.value)}
              value={department}
              required
            >
              <option value="">--Select Department--</option>
              <option value="Computer_Science">Computer Science</option>
              <option value="Commerce">Commerce</option>
              <option value="Hotel_Management">Hotel Management</option>
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Bio_Technology">Bio – Technology</option>
              <option value="Microbiology">Microbiology</option>
              <option value="English">English</option>
              <option value="Forensic_Science">Forensic Science</option>
              <option value="Sanitary_Inspector">Sanitary Inspector</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold rounded transition duration-300 flex items-center justify-center ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              "Upload Video"
            )}
          </button>
          <button
            type="button"
            onClick={() => router.push("/profile")}
            className="mt-4 w-full py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded hover:bg-gray-400"
            disabled={loading}
          >
            Back to Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadVideo;
