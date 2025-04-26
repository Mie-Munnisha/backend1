import express from "express";
import multer from "multer";
import xlsx from "xlsx";
import Company from "../models/Company.js";

const router = express.Router();

// Set up multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to handle Excel upload
router.post("/upload-cards", upload.single("file"), async (req, res) => {
  try {
    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Read Excel workbook
    const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const rawData = xlsx.utils.sheet_to_json(sheet, { raw: false });

    // Handle LastDate conversion
    const formattedData = rawData.map((row) => {
      if (row.LastDate) {
        const parsedDate = new Date(row.LastDate);
        if (!isNaN(parsedDate)) {
          row.LastDate = new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
        } else {
          row.LastDate = null;
        }
      }
      return row;
    });

    // Save to MongoDB
    await Company.insertMany(formattedData);

    res.status(200).json({ message: "Companies uploaded successfully" });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading companies", error: error.message });
  }
});

export default router;
