// import mongoose, { Schema, model, models } from "mongoose";

// const OrderIntentSchema = new Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
    
//     // CRITICAL: Links order to the user account
//     email: { type: String, required: true }, 
    
//     address: { type: String, required: true },
    
//     items: [
//       {
//         name: { type: String, required: true },
//         variant: { type: String },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
    
//     totalAmount: { type: Number, required: true },
//     deliveryDistance: { type: Number },
//     deliveryCharge: { type: Number },
    
//     status: { 
//       type: String, 
//       enum: [
//         "PENDING",              
//         "CONFIRMED",            
//         "PREPARING",            
//         "READY",                
//         "OUT_FOR_DELIVERY",     
//         "DELIVERED",            
//         "CANCELLED"             
//       ], 
//       default: "PENDING" 
//     },
//   },
//   { timestamps: true }
// );

// const OrderIntent = models.OrderIntent || model("OrderIntent", OrderIntentSchema);
// export default OrderIntent;







import mongoose, { Schema, model, models } from "mongoose";

const OrderIntentSchema = new Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }, 
    address: { type: String, required: true },
    
    // CRITICAL: This field must exist to save the instructions
    notes: { type: String }, 

    items: [
      {
        name: { type: String, required: true },
        variant: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    
    totalAmount: { type: Number, required: true },
    deliveryDistance: { type: Number },
    deliveryCharge: { type: Number },
    
    status: { 
      type: String, 
      enum: [
        "PENDING",              
        "CONFIRMED",            
        "PREPARING",            
        "READY",                
        "OUT_FOR_DELIVERY",     
        "DELIVERED",            
        "CANCELLED"             
      ], 
      default: "PENDING" 
    },
  },
  { timestamps: true }
);

// This ensures we use the existing model if it exists, preventing overwrite errors
const OrderIntent = models.OrderIntent || model("OrderIntent", OrderIntentSchema);
export default OrderIntent;