import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: "Firebase ID token is required" },
        { status: 400 }
      );
    }

    if (!adminAuth) {
      console.error("Firebase Admin SDK is not initialized properly.");
      return NextResponse.json(
        { error: "Server authentication service unavailable" },
        { status: 500 }
      );
    }

    // Verify Firebase ID Token
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { email, name, picture } = decodedToken;

    const adminEmail = process.env.ADMIN_EMAIL;

    if (!email || (adminEmail && email.toLowerCase() !== adminEmail.toLowerCase())) {
      console.warn(`Unauthorized login attempt by: ${email}`);
      return NextResponse.json(
        { error: "Access denied. Only the authorized administrator can log in." },
        { status: 403 }
      );
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return NextResponse.json(
        { error: "JWT Secret is missing on server configuration" },
        { status: 500 }
      );
    }

    // Sign custom JWT session token
    const token = jwt.sign(
      { email, name: name || "Admin", picture: picture || "" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      success: true,
      user: { email, name: name || "Admin", picture: picture || "" },
    });

    // Set HttpOnly, Secure, SameSite cookie
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error: any) {
    console.error("Error in Google Auth Route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to authenticate" },
      { status: 500 }
    );
  }
}
