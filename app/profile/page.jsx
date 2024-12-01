"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Profile = () => {
    const router = useRouter()
    const [img, setImg] = useState(null);
    const [role, setRole] = useState("Guest");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const [video, setVideo] = useState([])

    const getData = async () => {
        try {
            const response = await axios("/api/getUserData");
            const image = response.data.user?.img;
            const formattedImg = image.startsWith("data:image/") ? image : `data:image/jpeg;base64,${image}`;

            const gloData = {
                img: formattedImg,
                role: response.data.user?.role || "Guest",
                name: response.data.user?.name || "",
                email: response.data.user?.email || "",
                department: response.data.user?.department || "",
            };
            setImg(formattedImg);
            setRole(gloData.role);
            setName(gloData.name);
            setEmail(gloData.email);
            setDepartment(gloData.department);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const logout = async () => {
        const response = await axios("/api/logout")
        if (response.data.status === 200) {
            alert("logout successful")
            router.push("/login")
        }
    }

    const getVideo = async () => {
        try {
            const response = await axios("/api/getProfileVideo")
            const datam = response.data.videos
            const mp4 = datam.map(val => val.video); 
            setVideo(mp4);  
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getVideo()
    }, [])

    useEffect(() => {
        getData()
    }, []);

    return (
        <div id="main" className="h-[1100px] bg-gray-200 p-10">
            <div id="profile_card" className="h-[300px] rounded-lg bg-white flex ">
                <div id="img" className="bg-blue-600 w-[300px] h-[300px] p-5 rounded-lg flex justify-center items-center">
                    <img src={img} alt="profile" className="rounded-full w-[200px] h-[200px]" />
                </div>
                <div id="details" className="p-5">
                    <h1 className="font-bold">{name}</h1>
                    <h1>Email  : {email}</h1>
                    <h1>department: {department}</h1>
                    <h1>role: {role}</h1>
                    <button type="button" onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
                    {role === "tutor" ? <button type="button" onClick={e => router.push("/profile/uploadVideo")}>Upload Video</button> : null}
                </div>
            </div>
            {role==="tutor"?<div><h1 className="font-bold">Videos</h1>
            <div id="videos" className="h-[300px] rounded-lg bg-white flex flex-wrap gap-4 p-4">
                {video.length > 0 ? (
                    video.map((vid, index) => (
                        <div key={index} className="w-[300px] h-[200px] bg-gray-200 flex items-center justify-center rounded-lg shadow-md p-2">
                            <video src={vid} controls className="w-full h-full rounded-lg">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 font-bold text-4xl">No videos available</p>
                )}
            </div></div>:<div></div>}

            
        </div>
    )
}

export default Profile
