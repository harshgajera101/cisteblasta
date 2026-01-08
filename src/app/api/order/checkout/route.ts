// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { customerDetails, items, bill } = body;

//     // 1. Connect to Database
//     await connectDB();

//     // 2. Save Order to Database (The Lead)
//     const newOrder = await OrderIntent.create({
//       customerName: "Guest User", // Will update this in Phase 5 (Auth)
//       phone: "Check WhatsApp",    // Phone is primarily handled via WhatsApp for now
//       address: customerDetails.address,
//       items: items.map((item: any) => ({
//         name: item.name,
//         variant: item.variant,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       totalAmount: bill.grandTotal,
//       deliveryDistance: bill.distance,
//       deliveryCharge: bill.deliveryCharge,
//       status: "PENDING", // Default status
//     });

//     // 3. Send Email Notification to Sister (Admin)
//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       // Create a clean HTML list of items for the email
//       const itemsHtml = items.map((item: any) => `
//         <tr style="border-bottom: 1px solid #eee;">
//           <td style="padding: 10px;">${item.name} ${item.variant ? `(${item.variant})` : ''}</td>
//           <td style="padding: 10px; text-align: center;">${item.quantity}</td>
//           <td style="padding: 10px; text-align: right;">₹${item.price * item.quantity}</td>
//         </tr>
//       `).join('');

//       const mailOptions = {
//         from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL, // Defined in .env.local
//         subject: `🍰 New Order Alert! (₹${bill.grandTotal})`,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
//             <h2 style="color: #D98292; text-align: center;">New Order Received! 🎉</h2>
            
//             <p style="font-size: 16px; color: #555;">
//               <strong>Delivery Address:</strong><br>
//               ${customerDetails.address}
//             </p>
            
//             <p style="font-size: 16px; color: #555;">
//               <strong>Delivery Distance:</strong> ${bill.distance ? bill.distance.toFixed(1) + ' km' : 'N/A'}
//             </p>

//             <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
//               <thead style="background-color: #FFF8F3;">
//                 <tr>
//                   <th style="padding: 10px; text-align: left;">Item</th>
//                   <th style="padding: 10px; text-align: center;">Qty</th>
//                   <th style="padding: 10px; text-align: right;">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${itemsHtml}
//               </tbody>
//             </table>

//             <div style="margin-top: 20px; text-align: right;">
//               <p>Item Total: ₹${bill.itemTotal}</p>
//               <p>Delivery: ₹${bill.deliveryCharge}</p>
//               <h3 style="color: #4E342E;">Grand Total: ₹${bill.grandTotal}</h3>
//             </div>

//             <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            
//             <p style="text-align: center; color: #888; font-size: 12px;">
//               Order ID: ${newOrder._id}<br>
//               Check your WhatsApp for the customer's confirmation message.
//             </p>
//           </div>
//         `,
//       };

//       await transporter.sendMail(mailOptions);
//       console.log("📧 Email sent successfully to Admin");
//     } else {
//       console.warn("⚠️ Email credentials missing in .env.local. Email not sent.");
//     }

//     return NextResponse.json({ 
//       success: true, 
//       orderId: newOrder._id 
//     });

//   } catch (error) {
//     console.error("Checkout Error:", error);
//     // Even if email fails, we don't want to stop the user flow, so we return 500 only if DB fails really badly
//     return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
//   }
// }










import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent"; // Or Order, depending on your file name

export async function POST(req: Request) {
  try {
    const { customerDetails, items, bill } = await req.json();

    await connectDB();

    // 1. Create the Order
    // FIX: Explicitly mapping 'customerDetails.name' to 'customerName'
    const newOrder = await OrderIntent.create({
      customerName: customerDetails.name || "Guest Customer", 
      phone: customerDetails.phone,
      address: customerDetails.address,
      email: customerDetails.email,
      items: items,
      totalAmount: bill.grandTotal,
      status: "PENDING",
    });

    return NextResponse.json({ 
      success: true, 
      orderId: newOrder._id,
      message: "Order created successfully" 
    });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, message: "Order failed" }, { status: 500 });
  }
}