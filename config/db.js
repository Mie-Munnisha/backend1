import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

// Handle MongoDB connection errors
mongoose.connection.on("error", (err) => {
  console.error(`❌ MongoDB Error: ${err.message}`);
});

// Handle disconnections and attempt to reconnect
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️ MongoDB Disconnected. Attempting to reconnect...");
  connectDB();
});

export default connectDB;
