import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customerDetails, items, bill } = body;

    await connectDB();

    // 1. Save to Database (The Lead)
    const newOrder = await OrderIntent.create({
      customerName: "Guest User", // We will get real names in Phase 5 (Auth)
      phone: "Not Provided",      // For now, phone is handled on WhatsApp
      address: customerDetails.address,
      items: items.map((item: any) => ({
        name: item.name,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: bill.grandTotal,
      deliveryDistance: bill.distance,
      deliveryCharge: bill.deliveryCharge,
    });

    // 2. Send Email Notification to Sister (Admin)
    // NOTE: You need to set these ENV variables later. For now, it will log to console if missing.
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "your-sister-email@gmail.com", // CHANGE THIS later or use ENV
        subject: `🎂 New Order Intent: ₹${bill.grandTotal}`,
        text: `New order from ${customerDetails.address}.\n\nItems: ${items.length}\nTotal: ₹${bill.grandTotal}\n\nCheck Admin Panel.`,
      };

      await transporter.sendMail(mailOptions);
    }

    return NextResponse.json({ 
      success: true, 
      orderId: newOrder._id 
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}