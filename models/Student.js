import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  emailAddress: String,
  rollNo: String,
  regdNo: String,
  fullName: String,
  mobileNumber: String,
  branch: String,
  overallPercentage: String,
  overallCgpa: String,
  interPercentage: String,
  interYear: String,
  tenthPercentage: String,
  tenthYear: String,
  eamcetRank: String,
  ecetRank: String,
  presentAddress: String,
  correspondentAddress: String,
  backlogHistory: String,
  standingBacklogs: String,
  planningOverseas: String,
  overseasCountry: String,
  extraActivities: String,
});

export default mongoose.model("Student", studentSchema);
