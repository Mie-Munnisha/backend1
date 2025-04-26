import express from "express";
import multer from "multer";
import path from "path";
import {
  uploadOfferLetter,
  getUniqueCompanies,
  getSelectedStudentsByBatch,
  downloadFilteredStudentsExcel,
  getFilteredStudentsByBatch,
} from "../controllers/OfferletterController.js";

const router = express.Router();

// Multer storage config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure 'uploads/' folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// POST: Upload an offer letter
router.post("/", upload.single("offerLetter"), uploadOfferLetter);

// GET: Get unique company names
router.get("/companies", getUniqueCompanies);

// GET: Get students by batch (e.g., regdNo starts with batch year like Y21)
router.get("/students-by-batch", getSelectedStudentsByBatch);

// GET: Download filtered student list as Excel (companyName, branch filters)
router.get("/download-excel", downloadFilteredStudentsExcel);

// GET: Get filtered students by batch + companyName + branch (used for displaying on frontend)
router.get("/filtered-students", getFilteredStudentsByBatch);

export default router;
