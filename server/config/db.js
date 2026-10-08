const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lucky_cctv';
    console.log(`Connecting to MongoDB at: ${connStr}...`);
    
    // Set a short selection timeout so we fail-fast to memory server if local MongoDB isn't running
    const conn = await mongoose.connect(connStr, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`Local MongoDB connection failed (${error.message}). Starting MongoMemoryServer fallback...`);
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB Memory Server Connected: ${mongoUri}`);
      return conn;
    } catch (memErr) {
      console.error(`MongoDB Memory Server failed: ${memErr.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
