import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

// === ES Module __dirname workaround ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// === Ensure Upload Directories Exist ===
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

ensureDir(path.join(__dirname, "uploads", "offerletters")); // For offer letters
ensureDir(path.join(__dirname, "uploads", "excel")); // Add more directories if needed

// === Middleware ===
app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static uploads

// === MongoDB Connection ===
const connectDB = async (retryCount = 0) => {
  if (retryCount > 5) {
    console.error("❌ Too many MongoDB connection failures. Exiting...");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    setTimeout(() => connectDB(retryCount + 1), 5000);
  }
};

connectDB();

// === Routes ===
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import eligibilityRoutes from "./routes/eligibilityRoutes.js";
import offerletterRoutes from "./routes/OfferletterRoutes.js";
import studentRoutes from "./routes/StudentRoutes.js";

// API route structure
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/eligibility", eligibilityRoutes);
app.use("/api/offerletter", offerletterRoutes);
app.use("/api/students", studentRoutes);

// === Test Route ===
app.get("/", (req, res) => {
  res.status(200).json({ message: "🚀 Server is running..." });
});

// === 404 Handler ===
app.use((req, res) => {
  res.status(404).json({ error: `Route '${req.originalUrl}' not found` });
});

// === Global Error Handler ===
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// === Start Server ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
