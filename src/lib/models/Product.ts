// import mongoose, { Schema, model, models } from "mongoose";

// const ProductSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String }, // Made optional as not all PDF items have descriptions
//   category: { 
//     type: String, 
//     enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX"], 
//     required: true 
//   },
//   images: [{ type: String }], // Array of image URLs
  
//   // Tags for filtering (e.g., "Birthday", "Anniversary", "Eggless", "Best Seller")
//   tags: [{ type: String }], 
  
//   isBestSeller: { type: Boolean, default: false },
//   isSeasonal: { type: Boolean, default: false },
  
//   // Pricing Strategy
//   // For items with a single price (like Jars), use basePrice.
//   // For items with sizes (Cakes, Chocolates), use variants.
//   basePrice: { type: Number }, 
//   variants: [
//     {
//       name: { type: String }, // e.g., "0.5kg", "1kg", "Bar", "Mini", "10pcs"
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

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String }, 
  category: { 
    type: String, 
    // ENUM FIX: Includes "CUSTOM" to prevent crashes
    enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM"], 
    required: true 
  },
  images: [{ type: String }], 
  
  tags: [{ type: String }], 
  
  isBestSeller: { type: Boolean, default: false },
  isSeasonal: { type: Boolean, default: false },
  
  // PRICING FIX: Matches your frontend logic
  basePrice: { type: Number, default: 0 }, 
  variants: [
    {
      name: { type: String }, 
      price: { type: Number },
    }
  ],
  
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);
export default Product;