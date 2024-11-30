import connectDb from "../../lib/db"
import User from "../../models/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"

export async function POST(req){
    connectDb()
    try {
        const{email,password}=await req.json()
        if(!email || !password){
            return NextResponse.json({message:"Fill all fields",status:400})
        }
        const user= await User.findOne({email})
        if(!user){
            return NextResponse.json({message:"User not exist",status:400})
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(!checkPassword){
            return NextResponse.json({message:"Invalid Password",status:400})
        }
        //role
        let role = "viewer"
        if(password==="mmc_admin_tutor"){
            role = "tutor"
        }else if(password==="mmc_admin_main"){
            role = "admin"
        }
        const tokenData = {
            id:user._id,
            email:user.email,
            password:user.password,
            role
        }
        const token = jwt.sign(tokenData,process.env.JWT_KEY,{
            expiresIn: "1d"
        })
        
        const response =NextResponse.json({message:"Logged in successful",status:200})
        response.cookies.set("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:"strict",
            maxAge:24*60*60
        })

        return response
        
        

    } catch (error) {
        return NextResponse.json({message:"Login Faild",status:500})
    }
}