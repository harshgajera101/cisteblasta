import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
  orderId: { type: String, required: true, unique: true }, // Friendly ID e.g., CB-1024
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      variant: { type: String },
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PARTIAL", "FULL"],
    default: "PENDING",
  },
  status: {
    type: String,
    enum: [
      "PENDING",        // WhatsApp sent, waiting for sister's approval
      "CONFIRMED",      // 50% paid, approved
      "PREPARING",      // In kitchen
      "OUT_FOR_DELIVERY",
      "COMPLETED",      // Delivered
      "CANCELLED",      // Rejected
    ],
    default: "PENDING",
  },
  customerDetails: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = models.Order || model("Order", OrderSchema);
export default Order;