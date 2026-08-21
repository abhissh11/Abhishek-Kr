import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export interface AdminPayload {
  email: string;
  name?: string;
  picture?: string;
  iat?: number;
  exp?: number;
}

export function verifyAuth(req: NextRequest): AdminPayload | null {
  try {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) return null;

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return null;

    const decoded = jwt.verify(token, JWT_SECRET) as AdminPayload;

    if (process.env.ADMIN_EMAIL && decoded.email !== process.env.ADMIN_EMAIL) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
