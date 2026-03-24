import mongoose, { Schema, model, models } from "mongoose";

const ScanSchema = new Schema({
  crop: { type: String, required: true },
  disease: { type: String, required: true },
  severity: { type: String, enum: ["High", "Medium", "Low", "Healthy"], required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ["alert", "warning", "healthy"], required: true },
  confidence: { type: Number, required: true },
  recommendations: [{ type: String }],
  image: { type: String },
}, { timestamps: true });

const Scan = models.Scan || model("Scan", ScanSchema);

export default Scan;
