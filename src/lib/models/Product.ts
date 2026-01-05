import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX"], 
    required: true 
  },
  images: [{ type: String }], // Cloudinary URLs
  isBestSeller: { type: Boolean, default: false },
  isSeasonal: { type: Boolean, default: false },
  
  // Pricing Strategy
  basePrice: { type: Number }, // For simple items like jars
  variants: [
    {
      name: { type: String }, // e.g., "0.5kg", "1kg", "10pcs"
      price: { type: Number },
    }
  ],
  
  rating: { type: Number, default: 5 },
  reviewsCount: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);
export default Product;