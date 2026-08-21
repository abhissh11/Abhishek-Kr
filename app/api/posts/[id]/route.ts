import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Post ID or slug is required" }, { status: 400 });
    }

    await dbConnect();
    const isId = mongoose.Types.ObjectId.isValid(id);
    const post = await Post.findOne(
      isId ? { $or: [{ _id: id }, { slug: id }] } : { slug: id }
    );

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error fetching post" },
      { status: 500 }
    );
  }
}

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
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid post ID format" }, { status: 400 });
    }

    await dbConnect();
    const body = await req.json().catch(() => ({}));
    const { title, slug, category, content, published } = body;

    const updateFields: any = {};
    if (title !== undefined) updateFields.title = title;
    if (slug !== undefined) updateFields.slug = slug;
    if (category !== undefined) updateFields.category = category;
    if (content !== undefined) updateFields.content = content;
    if (published !== undefined) updateFields.published = published;

    const updatedPost = await Post.findByIdAndUpdate(id, updateFields, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update post" },
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
      return NextResponse.json({ error: "Invalid post ID format" }, { status: 400 });
    }

    await dbConnect();

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to delete post" },
      { status: 500 }
    );
  }
}
