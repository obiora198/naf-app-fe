import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

// Use a cached connection to avoid redundant connections in serverless environments
const globalWithMongoose = global as typeof globalThis & {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  const cached = globalWithMongoose.mongoose;

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 15000, // Increased timeout for slower connections
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("=> MongoDB Connected Successfully");
      return mongoose;
    }).catch((err) => {
      console.error("=> MongoDB Connection Error:", err.message);
      if (err.message.includes("querySrv ECONNREFUSED")) {
        console.error("HINT: This usually means your network is blocking SRV lookups. Try using a standard connection string or check your DNS settings.");
      }
      throw err;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null; // Reset promise on failure so we can retry
    throw e;
  }

  return cached.conn;
}

export default connectDB;
