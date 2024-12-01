import { NextResponse } from "next/server"
import Video from "../../models/Video"
export async function POST(req){
    try {
        const {path} = await req.json()
        const video = await Video.find({department:path})    
        return NextResponse.json({video})    
    } catch (error) {
        return NextResponse.json({message:"server error",status:500})
        
    }
    
}