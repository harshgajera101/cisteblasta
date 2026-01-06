import mongoose, { Schema, model, models } from "mongoose";

const OrderIntentSchema = new Schema({
  userId: { type: String, required: true }, // Can be a guest ID or Firebase UID
  items: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      variant: { type: String }, // e.g., "1kg", "Half kg"
    },
  ],
  totalAmount: { type: Number, required: true },
  customerDetails: {
    phone: { type: String },
    name: { type: String },
    email: { type: String },
  },
  status: { 
    type: String, 
    enum: ["INTENT_CREATED", "ABANDONED"], 
    default: "INTENT_CREATED" 
  },
  createdAt: { type: Date, default: Date.now },
  // TTL Index: This document will self-destruct 24 hours (86400 seconds) after creation
  expireAt: { type: Date, default: Date.now, index: { expires: '24h' } } 
});

// Prevent model overwrite errors in Next.js hot-reloading
const OrderIntent = models.OrderIntent || model("OrderIntent", OrderIntentSchema);
export default OrderIntent;