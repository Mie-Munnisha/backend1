import express from "express";
import { filterStudents } from "../controllers/eligibilityController.js";

const router = express.Router();

router.post("/filter", filterStudents);

export default router;  