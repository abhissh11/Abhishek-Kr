import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Connect from "@/models/Connect";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextRequest) {
  try {
    const user = verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const connects = await Connect.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, connects });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch form submissions" },
      { status: 500 }
    );
  }
}
