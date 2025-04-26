import express from "express";
import {
  createStudentProfile,
  updateStudentProfile,
  getStudentByEmail,
} from "../controllers/StudentController.js";

const router = express.Router();

// Create student profile (only needed once at registration)
router.post("/profile", createStudentProfile);

// Update student profile using email in the route
router.put("/:email", updateStudentProfile);

// Get student profile by email
router.get("/:email", getStudentByEmail);

export default router;
