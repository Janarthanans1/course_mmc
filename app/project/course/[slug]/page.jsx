"use client"

import axios from "axios";
import { useEffect, useState } from "react";

const Course = ({ params }) => {
    
    const [video,setVideo] = useState([])
    const path_url = async () => {
        const { slug } = await params;
        
        try {
            const response = await axios.post("/api/[deptCourse]",{path:slug})
            const datam = response.data.video
            const mp4 = datam.map(val=>val.video)
            setVideo(mp4)            
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        path_url()
    }, [])
    return (
        <>
        {video.length>0?(
            video.map((vid,index)=>(
                <div key={index} className="w-[300px] h-[200px] bg-gray-200 flex items-center justify-center rounded-lg shadow-md p-2">
                            <video src={vid} controls className="w-full h-full rounded-lg">
                                Your browser does not support the video tag.
                            </video>
                        </div>
            ))
        ):(
            <p className="text-gray-500 font-bold text-4xl">No Course available</p>
        )}
        </>
        
    );
};

export default Course;
