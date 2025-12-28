const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://sbs:1234@sbs.morspa3.mongodb.net/?appName=sbs"; // Your MongoDB connection string

const client = new MongoClient(uri);
let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db("collegeQA"); // Database name
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) throw new Error("Database not initialized. Call connectDB first.");
  return db;
};

module.exports = { connectDB, getDB };
