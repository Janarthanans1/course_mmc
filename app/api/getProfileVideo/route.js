import { NextResponse } from "next/server"
import connectDb from "../../lib/db"
import User from "../../models/User"
import Video from "../../models/Video"
import { jwtVerify } from "jose"


export async function GET(req) {
    connectDb()
    try {
        const token = req.cookies.get("token")?.value
        const secret = new TextEncoder().encode(process.env.JWT_KEY);
        const { payload } = await jwtVerify(token, secret);

        const user = await User.findById(payload.id).select("-password");

        const videos = await Video.find({ user: user._id })
        return NextResponse.json({ message: "video received successfully", videos,status:200 })
    } catch (error) {
        return NextResponse.json({message:"server error",status:500})
    }
}
