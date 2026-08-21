import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 });
    return NextResponse.json({ success: true, categories });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch categories" },
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

    const existingCategory = await Category.findOne({
      $or: [{ name: name.trim() }, { slug: categorySlug }],
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Category with this name or slug already exists." },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: name.trim(),
      slug: categorySlug,
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}
