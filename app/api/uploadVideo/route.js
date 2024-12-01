import { NextResponse } from "next/server"
import User from "@/app/models/User"
import Video from "@/app/models/Video"

export async function POST(req){
    try {
        const {video,title,description,department,email} = await req.json()
        const findUser = await User.findOne({email})
        if (!findUser) {
            return NextResponse.json({ message: "User not found",status: 404 }) 
        }

        const newVideo = await Video({
            video,title,description,department,user:findUser._id
        })
        await newVideo.save()


        return NextResponse.json({message:"video saved",status:201})
    } catch (error) {
        return NextResponse.json({message:"server error",status:500})
    }
}