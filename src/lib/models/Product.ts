// import mongoose, { Schema, model, models } from "mongoose";

// const ReviewSchema = new Schema({
//   user: { type: String, required: true }, 
//   userEmail: { type: String, required: false }, 
//   rating: { type: Number, required: true, min: 1, max: 5 },
//   comment: { type: String, required: true },
//   date: { type: Date, default: Date.now },
//   isEdited: { type: Boolean, default: false } // NEW FIELD
// });

// const ProductSchema = new Schema({
//   name: { type: String, required: true },
//   description: { type: String, default: "A delicious homemade treat made with premium ingredients." },
//   category: { 
//     type: String, 
//     enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM"], 
//     required: true 
//   },
//   images: [{ type: String }], 
//   tags: [{ type: String }], 
//   isBestSeller: { type: Boolean, default: false },
//   isSeasonal: { type: Boolean, default: false },
  
//   basePrice: { type: Number, default: 0 }, 
//   variants: [
//     {
//       name: { type: String }, 
//       price: { type: Number },
//     }
//   ],
  
//   // Rating System
//   reviews: [ReviewSchema], 
//   averageRating: { type: Number, default: 0 },
//   reviewsCount: { type: Number, default: 0 },
  
//   isVisible: { type: Boolean, default: true },
// }, { timestamps: true });

// const Product = models.Product || model("Product", ProductSchema);
// export default Product;









import mongoose, { Schema, model, models } from "mongoose";

const ReviewSchema = new Schema({
  user: { type: String, required: true }, 
  userEmail: { type: String, required: false }, 
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isEdited: { type: Boolean, default: false }
});

const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: "A delicious homemade treat made with premium ingredients." },
  category: { 
    type: String, 
    enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM"], 
    required: true 
  },
  images: [{ type: String }], 
  
  // NEW: Distinct Occasions Array
  occasions: [{ type: String }], 
  
  tags: [{ type: String }], // Keeping tags for generic SEO keywords if needed later
  isBestSeller: { type: Boolean, default: false },
  isSeasonal: { type: Boolean, default: false },
  
  basePrice: { type: Number, default: 0 }, 
  variants: [
    {
      name: { type: String }, 
      price: { type: Number },
    }
  ],
  
  reviews: [ReviewSchema], 
  averageRating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  
  isVisible: { type: Boolean, default: true },
}, { timestamps: true });

const Product = models.Product || model("Product", ProductSchema);
export default Product;