import { NextResponse } from "next/server";


export async function GET(){
    try {
        const response = NextResponse.json({message:"logout successfully",status:200})
        response.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })
        return response
    } catch (error) {
        return NextResponse.json({message:"logout faild",status:500})
    }
}