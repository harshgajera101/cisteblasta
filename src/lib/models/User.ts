// import mongoose, { Schema, model, models } from "mongoose";

// const UserSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     role: { type: String, default: "customer" },
    
//     // NEW: Persist User Location
//     address: { type: String },
//     coordinates: {
//       lat: { type: Number },
//       lng: { type: Number }
//     }
//   },
//   { timestamps: true }
// );

// const User = models.User || model("User", UserSchema);
// export default User;



import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: "customer" },
    
    // Address Info
    address: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },

    // NEW: Wishlist Array (Stores Product IDs)
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }] 
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);
export default User;