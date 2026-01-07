import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Will be hashed
    phone: { type: String, required: true },    // Crucial for orders!
    role: { type: String, default: "customer" }, // 'admin' vs 'customer'
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;