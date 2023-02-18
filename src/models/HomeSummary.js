import mongoose from "mongoose";

const HomeSummarySchema = new mongoose.Schema({
  summary1: { type: String, require: true, unique: true },
  summary2: { type: String, require: true, unique: true },
});

const HomeSummaryModel = new mongoose.model("homeSummary", HomeSummarySchema);

export default HomeSummaryModel;
