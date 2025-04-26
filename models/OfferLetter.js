import mongoose from "mongoose";

const offerLetterSchema = new mongoose.Schema({
  emailAddress: { type: String, required: true },
  regdNo: { type: String, required: true },
  fullName: { type: String, required: true },
  companyName: { type: String, required: true },
  gender: { type: String, required: true },
  branch: { type: String, required: true },
  batch: { type: String, required: true }, // ✅ Added branch field
  salaryPackage: { type: String, required: true },
  offerLetterLink: { type: String },
}, {
  timestamps: true,
});

const OfferLetter = mongoose.model("OfferLetter", offerLetterSchema);

export default OfferLetter;
