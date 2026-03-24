import mongoose, { Schema, model, models } from "mongoose";

const AlertSchema = new Schema({
  type: { type: String, enum: ["critical", "warning", "info", "success"], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: String, required: true },
  read: { type: Boolean, default: false },
  crop: { type: String },
  disease: { type: String },
  action: { type: String },
  href: { type: String },
}, { timestamps: true });

const Alert = models.Alert || model("Alert", AlertSchema);

export default Alert;
