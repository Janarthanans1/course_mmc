import connectDb from "../../lib/db";
import { jwtVerify } from "jose";
import User from "../../models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  

  try {
    await connectDb();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "No token provided", status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_KEY);
    const { payload } = await jwtVerify(token, secret);

    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error in API handler:", error);
    return NextResponse.json({ message: "Internal server error", status: 500 });
  }
}
