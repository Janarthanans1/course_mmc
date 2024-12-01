"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UploadVideo = () => {
    const router = useRouter();
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [video, setVideo] = useState(""); // Base64 string
    const [videoName, setVideoName] = useState(""); // File name
    const [department, setDepartment] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); // New state for loading

    const getData = async () => {
        try {
            const response = await axios("/api/getUserData");
            const gloData = {
                email: response.data.user?.email || "",
            };
            setEmail(gloData.email);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleVideo = async(e)=>{
        const file  = e.target.files[0]
        if (file.size > 10 * 1024 * 1024) {
            alert("File size exceeds 10MB limit. Please upload a smaller video.");
            return;
        }
    
        const base64 = await convertVideoToBase64(file)
        console.log(base64)
        setVideo(base64)
        setVideoName(file.name)
    }
    const convertVideoToBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const filereader = new FileReader()
            filereader.readAsDataURL(file)
            filereader.onload=()=>resolve(filereader.result)
            filereader.onerror=err=>reject(err)       
        })
    }
    
    

    const uploadVideo = async (e) => {
        e.preventDefault();

        if (!video) {
            alert("Please upload a video file.");
            return;
        }

        setLoading(true); // Start loading
        try {
            const response = await axios.post("/api/uploadVideo", {
                video,
                title,
                description,
                department,
                email,
            });

            if (response.data.status === 201) {
                alert("Video uploaded successfully!");
                setDescription("");
                setTitle("");
                setVideo("");
                setVideoName("");
                setDepartment("");
               
            }
        } catch (error) {
            console.error("Error uploading video:", error);
            alert("Failed to upload the video. Please try again.");
        } finally {
            setLoading(false); // End loading
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
                    {/* Video Upload */}
                    <div className="flex flex-col items-center mb-6">
                        <label
                            htmlFor="video"
                            className="flex items-center justify-center w-full h-48 bg-gray-200 border border-dashed rounded-lg cursor-pointer hover:bg-gray-300"
                        >
                            {videoName ? (
                                <span className="text-gray-700">{videoName}</span>
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
                    <div id="department" className="mb-4">
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
                        onClick={e=>window.location.reload(false)}
                        className={`w-full py-2 px-4 font-semibold rounded transition duration-300 ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Upload Video"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/profile")}
                        className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
                    >
                        Back to profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UploadVideo;
