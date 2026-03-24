import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, always hash passwords
  role: { type: String, enum: ["farmer", "expert", "admin"], default: "farmer" },
  location: { type: String },
  cropType: { type: String },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);

export default User;
