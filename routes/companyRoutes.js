import express from "express";
import Company from "../models/Company.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch companies" });
  }
});


export default router;
