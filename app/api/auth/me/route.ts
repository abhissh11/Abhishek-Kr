import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextRequest) {
  const user = verifyAuth(req);

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 200 });
  }

  return NextResponse.json(
    {
      authenticated: true,
      user: {
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
    },
    { status: 200 }
  );
}
