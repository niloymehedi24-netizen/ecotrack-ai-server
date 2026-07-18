import { MongoClient, Db } from "mongodb";
import { ENV } from "./env.js";

let db: Db;

const client = new MongoClient(ENV.MONGODB_URI);

export const connectDB = async () => {
  try {
    await client.connect();

    db = client.db("ecotrackAI");

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed", error);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized");
  }

  return db;
};
