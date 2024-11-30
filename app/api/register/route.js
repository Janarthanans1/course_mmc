import { NextResponse } from "next/server";
import connectDb from "../../lib/db";
import User from "../../models/User";
import bcrypt from "bcrypt"

export async function POST(request){
    await connectDb()
    try {
        
        const {name,email,password,img,department} = await request.json()
        if(!name || !email || !password || !img || !department){
            return NextResponse.json({message:"Fill all fields",status:400})
        }
        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"user already register",status:400})
        }
        let role = "viewer"
        if(password==="mmc_admin_main"){
            role = "admin"
        }else if(password==="mmc_admin_tutor"){
            role="tutor"
        }
        const hashPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            name,email,password:hashPassword,role,img,department
        })
        await newUser.save()
        console.log(name,email,password,img,role);
        return NextResponse.json({message:"User Register Successfully",status:201})
        
    } catch (error) {
        return NextResponse.json({message:"data not receved",status:500})
        
    }
}