import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Connect from "@/models/Connect";
import { verifyAuth } from "@/lib/verifyAuth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid connect ID format" }, { status: 400 });
    }

    await dbConnect();
    const body = await req.json().catch(() => ({}));
    const { status } = body;

    const validStatuses = ["new", "read", "replied", "archived"];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status provided." },
        { status: 400 }
      );
    }

    const updatedConnect = await Connect.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after", runValidators: true }
    );

    if (!updatedConnect) {
      return NextResponse.json({ error: "Connect submission not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, connect: updatedConnect });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid connect ID format" }, { status: 400 });
    }

    await dbConnect();

    const deletedConnect = await Connect.findByIdAndDelete(id);
    if (!deletedConnect) {
      return NextResponse.json({ error: "Connect submission not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete submission" },
      { status: 500 }
    );
  }
}
