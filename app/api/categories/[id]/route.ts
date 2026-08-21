import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { verifyAuth } from "@/lib/verifyAuth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const { name, slug } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Category name is required." },
        { status: 400 }
      );
    }

    const categorySlug = slug
      ? slug.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      : name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name: name.trim(), slug: categorySlug },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, category: updatedCategory });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update category" },
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
    await dbConnect();

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
}
