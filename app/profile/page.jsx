"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const VideoCard = ({ thumbnail, video, title }) => (
  <div className="w-[300px] h-[300px] bg-gray-200 rounded-lg shadow-md p-4">
    <img src={thumbnail} alt="Thumbnail" className="w-full h-1/2 rounded-lg" />
    <video src={video} controls className="w-full h-1/2 rounded-lg mt-2">
      Your browser does not support the video tag.
    </video>
    <p className="text-center font-bold mt-2">{title}</p>
  </div>
);

const Profile = () => {
  const router = useRouter();
  const [img, setImg] = useState(null);
  const [role, setRole] = useState("Guest");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("")
  const getData = async () => {
    try {
      const response = await axios("/api/getUserData");
      const image = response.data.user?.img;
      const formattedImg = image.startsWith("data:image/") ? image : `data:image/jpeg;base64,${image}`;

      setImg(formattedImg);
      setRole(response.data.user?.role || "Guest");
      setName(response.data.user?.name || "");
      setEmail(response.data.user?.email || "");
      setDepartment(response.data.user?.department || "");
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to fetch profile data. Please try again later.");
    }
  };

  // Fetch Video Data
  const getVideo = async () => {
    try {
      const response = await axios("/api/getProfileVideo");
      const videoData = response.data.videos.map((val) => ({
        thumbnail: val.img,
        video: val.video,
        title: val.title,
      }));
      setVideos(videoData);
    } catch (err) {
      console.error("Error fetching videos:", err);
      setError("Failed to fetch videos. Please try again later.");
    }
  };

  
  const logout = async () => {
    try {
      const response = await axios("/api/logout");
      if (response.data.status === 200) {
        alert("Logout successful");
        router.push("/login");
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  
  useEffect(() => {
    getData();
    getVideo();
  }, []);

  return (
    <div id="main" className="h-[1100px] bg-gray-200 p-10">
      
      <div id="profile_card" className="h-[300px] rounded-lg bg-white flex">
        <div id="img" className="bg-blue-600 w-[300px] h-[300px] p-5 rounded-lg flex justify-center items-center">
          <img src={img} alt="profile" className="rounded-full w-[200px] h-[200px]" />
        </div>
        <div id="details" className="p-5">
          <h1 className="font-bold">{name}</h1>
          <h1>Email: {email}</h1>
          <h1>Department: {department}</h1>
          <h1>Role: {role}</h1>
          <button
            type="button"
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-4"
          >
            Logout
          </button>
          {role === "tutor" && (
            <button
              type="button"
              onClick={() => router.push("/profile/uploadVideo")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Upload Video
            </button>
          )}
          <button type="button" onClick={()=>router.push("/project")} className="bg-green-500 m-5 text-white px-4 py-2 rounded hover:bg-green-600">Course</button>
        </div>
      </div>

      
      {role === "tutor" && (
        <div className="mt-10">
          <h1 className="font-bold text-xl mb-4">Videos</h1>
          <div id="videos" className="h-[500px] rounded-lg bg-white flex flex-wrap gap-4 p-4">
            {videos.length > 0 ? (
              videos.map((video, index) => (
                <VideoCard
                  key={index}
                  thumbnail={video.thumbnail}
                  video={video.video}
                  title={video.title}
                />
              ))
            ) : (
              <p className="text-gray-500 font-bold text-4xl">No videos available</p>
            )}
          </div>
        </div>
      )}

      
      {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
    </div>
  );
};

export default Profile;
