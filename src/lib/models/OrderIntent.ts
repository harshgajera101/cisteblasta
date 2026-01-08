// import mongoose, { Schema, model, models } from "mongoose";

// const OrderIntentSchema = new Schema(
//   {
//     customerName: { type: String, required: true },
//     phone: { type: String, required: true },
    
//     // ADDED: This is the critical link. 
//     // It allows us to fetch "My Orders" by searching for this email.
//     email: { type: String, required: true }, 
    
//     address: { type: String, required: true },
    
//     // We store a snapshot of items (name, quantity, price)
//     items: [
//       {
//         name: { type: String, required: true },
//         variant: { type: String }, // e.g., "0.5kg"
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//       },
//     ],
    
//     totalAmount: { type: Number, required: true },
//     deliveryDistance: { type: Number },
//     deliveryCharge: { type: Number },
    
//     // UPDATED STATUS LIST (Crucial for Phase 5)
//     status: { 
//       type: String, 
//       enum: [
//         "PENDING",              // 1. New Order (Leads)
//         "CONFIRMED",            // 2. Sister Accepted (Pending)
//         "PREPARING",            // 3. Baking (Ongoing)
//         "READY",                // 4. Packed (Ongoing)
//         "OUT_FOR_DELIVERY",     // 5. On the way (Ongoing)
//         "DELIVERED",            // 6. Done (History)
//         "CANCELLED"             // 7. Rejected (History)
//       ], 
//       default: "PENDING" 
//     },
//   },
//   { timestamps: true }
// );

// // Prevent overwriting the model if it already exists
// const OrderIntent = models.OrderIntent || model("OrderIntent", OrderIntentSchema);

// export default OrderIntent;







import mongoose, { Schema, model, models } from "mongoose";

const OrderIntentSchema = new Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    
    // CRITICAL: Links order to the user account
    email: { type: String, required: true }, 
    
    address: { type: String, required: true },
    
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

const OrderIntent = models.OrderIntent || model("OrderIntent", OrderIntentSchema);
export default OrderIntent;