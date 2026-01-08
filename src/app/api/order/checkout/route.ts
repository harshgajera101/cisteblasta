// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { customerDetails, items, bill } = await req.json();

//     await connectDB();

//     // 1. Create the Order
//     const newOrder = await OrderIntent.create({
//       // Fallback to "Guest" only if name is missing (which shouldn't happen for logged-in users)
//       customerName: customerDetails.name || "Guest Customer", 
//       phone: customerDetails.phone,
//       address: customerDetails.address,
//       email: customerDetails.email, // Saves the link to the user
//       items: items,
//       totalAmount: bill.grandTotal,
//       deliveryDistance: bill.distance,
//       deliveryCharge: bill.deliveryCharge,
//       status: "PENDING",
//     });

//     // 2. Send Email Notification (Restored Feature)
//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//       });

//       const itemsHtml = items.map((item: any) => `
//         <tr>
//           <td style="padding: 5px;">${item.name} ${item.variant ? `(${item.variant})` : ''}</td>
//           <td style="padding: 5px;">x${item.quantity}</td>
//           <td style="padding: 5px;">₹${item.price * item.quantity}</td>
//         </tr>
//       `).join('');

//       await transporter.sendMail({
//         from: `"Ciste Blasta" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: `🍰 New Order: ₹${bill.grandTotal} from ${customerDetails.name}`,
//         html: `
//           <h3>New Order Received!</h3>
//           <p><strong>Customer:</strong> ${customerDetails.name} (${customerDetails.phone})</p>
//           <p><strong>Address:</strong> ${customerDetails.address}</p>
//           <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
//             ${itemsHtml}
//           </table>
//           <p><strong>Total: ₹${bill.grandTotal}</strong></p>
//         `,
//       });
//     }

//     return NextResponse.json({ 
//       success: true, 
//       orderId: newOrder._id,
//       message: "Order created successfully" 
//     });

//   } catch (error) {
//     console.error("Checkout Error:", error);
//     return NextResponse.json({ success: false, message: "Order failed" }, { status: 500 });
//   }
// }









import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import User from "@/lib/models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { customerDetails, items, bill } = await req.json();

    await connectDB();

    const newOrder = await OrderIntent.create({
      customerName: customerDetails.name || "Guest Customer", 
      phone: customerDetails.phone,
      address: customerDetails.address,
      email: customerDetails.email, 
      items: items.map((item: any) => ({
        name: item.name,
        variant: item.variant,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: bill.grandTotal,
      deliveryDistance: bill.distance,
      deliveryCharge: bill.deliveryCharge,
      status: "PENDING",
    });

    // SAVE ADDRESS to User Profile
    if (customerDetails.email) {
      await User.findOneAndUpdate(
        { email: customerDetails.email },
        { 
          address: customerDetails.address,
          phone: customerDetails.phone 
        }
      );
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const itemsHtml = items.map((item: any) => `
        <tr>
          <td style="padding: 5px;">${item.name} ${item.variant ? `(${item.variant})` : ''}</td>
          <td style="padding: 5px;">x${item.quantity}</td>
          <td style="padding: 5px;">₹${item.price * item.quantity}</td>
        </tr>
      `).join('');

      await transporter.sendMail({
        from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🍰 New Order: ₹${bill.grandTotal} from ${customerDetails.name}`,
        html: `
          <h3>New Order Received!</h3>
          <p><strong>Customer:</strong> ${customerDetails.name} (${customerDetails.phone})</p>
          <p><strong>Address:</strong> ${customerDetails.address}</p>
          <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse;">
            ${itemsHtml}
          </table>
          <p><strong>Total: ₹${bill.grandTotal}</strong></p>
        `,
      });
    }

    return NextResponse.json({ success: true, orderId: newOrder._id });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}