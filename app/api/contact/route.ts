import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Connect from "@/models/Connect";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, selectedOption, note } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB & save submission
    await dbConnect();

    const connectEntry = await Connect.create({
      email: email.trim().toLowerCase(),
      selectedOption: selectedOption || "mvp",
      note: note || "",
      status: "new",
    });

    return NextResponse.json({
      success: true,
      data: connectEntry,
    });
  } catch (error: any) {
    console.error("Error saving contact submission to MongoDB:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
