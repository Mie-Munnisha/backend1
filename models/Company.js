import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  Company: String,
  Role: String,
  Location: String,
  LastDate: Date,
  Package:String,
  Link: String,
  Eligibility: String,
});
const Company = mongoose.model("Company", companySchema);
export default Company;
