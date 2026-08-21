import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Post from "@/models/Post";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const category = searchParams.get("category");
    const publishedOnly = searchParams.get("publishedOnly") === "true";

    const query: any = {};

    if (publishedOnly) {
      query.published = true;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit) || 1;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        totalPosts,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = verifyAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { title, slug, category, content, published } = body;

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: "Title, slug, and content are required." },
        { status: 400 }
      );
    }

    const post = await Post.create({
      title,
      slug,
      category: category || "General",
      content,
      published: published ?? true,
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create post" },
      { status: 500 }
    );
  }
}
