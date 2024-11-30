import { NextResponse } from "next/server";

export async function middleware(request){
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;
    const isPublic = path==="/login"||path==="/register"   
    if(isPublic && token){
        return NextResponse.redirect(new URL("/project",request.nextUrl))
    }
    if(!isPublic && !token){
        
        if(path==="/"){
            return NextResponse.redirect(new URL("/login",request.nextUrl))
        }
        return NextResponse.redirect(new URL("/login",request.nextUrl))
    }
    

}

export const config ={
    matcher:["/","/login","/register","/project","/project/course/:path*"]
}