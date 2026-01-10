// import mongoose, { Schema, model, models } from "mongoose";

// const ProductSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String }, 
//   category: { 
//     type: String, 
//     // ENUM FIX: Includes "CUSTOM" to prevent crashes
//     enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM"], 
//     required: true 
//   },
//   images: [{ type: String }], 
  
//   tags: [{ type: String }], 
  
//   isBestSeller: { type: Boolean, default: false },
//   isSeasonal: { type: Boolean, default: false },
  
//   // PRICING FIX: Matches your frontend logic
//   basePrice: { type: Number, default: 0 }, 
//   variants: [
//     {
//       name: { type: String }, 
//       price: { type: Number },
//     }
//   ],
  
//   rating: { type: Number, default: 5 },
//   reviewsCount: { type: Number, default: 0 },
//   isVisible: { type: Boolean, default: true },
// }, { timestamps: true });

// const Product = models.Product || model("Product", ProductSchema);
// export default Product;







import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  user: { type: String, required: true }, // Stores customer name
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "A delicious homemade treat made with premium ingredients." }, // Added Description
  category: { 
    type: String, 
    enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM"], 
    required: true 
  },
  images: [{ type: String }], 
  tags: [{ type: String }], 
  isBestSeller: { type: Boolean, default: false },
  isSeasonal: { type: Boolean, default: false },
  
  basePrice: { type: Number, default: 0 }, 
  variants: [
    {
      name: { type: String }, 
      price: { type: Number },
    }
  ],
  
  // Rating System
  reviews: [ReviewSchema], // Array of review objects
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);
export default Product;