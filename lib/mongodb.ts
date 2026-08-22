import mongoose from "mongoose";
import dns from "dns";

// Fix for local ISP/router DNS SRV query failures (querySrv EREFUSED)
try {
  dns.setDefaultResultOrder?.("ipv4first");
  if (process.env.NODE_ENV !== "production") {
    dns.setServers(["8.8.8.8", "1.1.1.1"]);
  }
} catch {
  // Ignore if unsupported in environment
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error(
      "Please define the MONGODB_URI environment variable inside .env.local"
    );
  }

  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("MongoDB Connected Successfully");
      return mongooseInstance;
    }).catch((err) => {
      console.error("MongoDB Connection Error:", err);
      cached!.promise = null;
      throw err;
    });
  }

  try {
    cached!.conn = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.conn;
}

export const connectDB = dbConnect;
export default dbConnect;

