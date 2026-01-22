// import mongoose, { Schema, model, models } from "mongoose";

// const ProductSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     basePrice: { type: Number, required: true },
//     category: {
//       type: String,
//       // Added HAMPER to the list
//       enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM", "HAMPER"],
//       default: "CAKE",
//     },
//     images: [{ type: String }],
//     description: { type: String },
//     variants: [
//       {
//         name: { type: String, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
//     occasions: [{ type: String }], 
//     isBestSeller: { type: Boolean, default: false },
//     averageRating: { type: Number, default: 0 },
//     reviewsCount: { type: Number, default: 0 },
//     reviews: [
//       {
//         user: String,
//         userEmail: String, 
//         rating: Number,
//         comment: String,
//         date: { type: Date, default: Date.now },
//         isEdited: { type: Boolean, default: false }
//       }
//     ]
//   },
//   { timestamps: true }
// );

// const Product = models.Product || model("Product", ProductSchema);
// export default Product;














import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    basePrice: { type: Number, required: true },
    category: {
      type: String,
      enum: ["CAKE", "CHOCOLATE", "JAR", "GIFT_BOX", "CUSTOM", "HAMPER"],
      default: "CAKE",
    },
    images: [{ type: String }],
    description: { type: String },
    variants: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    occasions: [{ type: String }], 
    isBestSeller: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    
    // NEW FIELD: Tracks total quantity sold for Analytics & Sorting
    soldCount: { type: Number, default: 0 },

    reviews: [
      {
        user: String,
        userEmail: String, 
        rating: Number,
        comment: String,
        date: { type: Date, default: Date.now },
        isEdited: { type: Boolean, default: false }
      }
    ]
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);
export default Product;