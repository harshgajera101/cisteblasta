// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import User from "@/lib/models/User";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const { customerDetails, items, bill } = await req.json();

//     await connectDB();

//     const newOrder = await OrderIntent.create({
//       customerName: customerDetails.name || "Guest Customer", 
//       phone: customerDetails.phone,
//       address: customerDetails.address,
//       email: customerDetails.email, 
//       items: items.map((item: any) => ({
//         name: item.name,
//         variant: item.variant,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       totalAmount: bill.grandTotal,
//       deliveryDistance: bill.distance,
//       deliveryCharge: bill.deliveryCharge,
//       status: "PENDING",
//     });

//     if (customerDetails.email) {
//       await User.findOneAndUpdate(
//         { email: customerDetails.email },
//         { address: customerDetails.address, phone: customerDetails.phone }
//       );
//     }

//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//       });

//       const itemsHtml = items.map((item: any) => `
//         <tr style="border-bottom: 1px solid #eee;">
//           <td style="padding: 10px;">${item.name} ${item.variant ? `(${item.variant})` : ''}</td>
//           <td style="padding: 10px;">x${item.quantity}</td>
//           <td style="padding: 10px;">₹${item.price * item.quantity}</td>
//         </tr>
//       `).join('');

//       await transporter.sendMail({
//         from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: `🍰 New Order: ₹${bill.grandTotal} from ${customerDetails.name}`,
//         html: `
//           <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//             <h2 style="color: #D98292;">New Order Received!</h2>
            
//             <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
//               <p style="margin: 5px 0;"><strong>Customer:</strong> ${customerDetails.name}</p>
//               <p style="margin: 5px 0;"><strong>Phone:</strong> ${customerDetails.phone}</p>
//               <p style="margin: 5px 0;"><strong>Email:</strong> ${customerDetails.email}</p>
//               <p style="margin: 5px 0;"><strong>Address:</strong> ${customerDetails.address}</p>
//             </div>

//             <table style="width: 100%; border-collapse: collapse;">
//               <thead>
//                 <tr style="background-color: #FFF8F3;">
//                   <th style="padding: 10px; text-align: left;">Item</th>
//                   <th style="padding: 10px; text-align: left;">Qty</th>
//                   <th style="padding: 10px; text-align: left;">Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 ${itemsHtml}
//               </tbody>
//             </table>
            
//             <div style="margin-top: 20px; text-align: right;">
//                <p>Delivery: ₹${bill.deliveryCharge}</p>
//                <h3>Total: ₹${bill.grandTotal}</h3>
//             </div>
//             <p style="color: #888; font-size: 12px; text-align: center;">Order ID: ${newOrder._id}</p>
//           </div>
//         `,
//       });
//     }

//     return NextResponse.json({ success: true, orderId: newOrder._id });

//   } catch (error) {
//     console.error("Checkout Error:", error);
//     return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
//   }
// }








import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import User from "@/lib/models/User";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { customerDetails, items, bill, instructions } = await req.json(); // Added instructions

    await connectDB();

    const newOrder = await OrderIntent.create({
      customerName: customerDetails.name || "Guest Customer", 
      phone: customerDetails.phone,
      address: customerDetails.address,
      email: customerDetails.email,
      notes: instructions, // SAVE NOTE
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

    if (customerDetails.email) {
      await User.findOneAndUpdate(
        { email: customerDetails.email },
        { address: customerDetails.address, phone: customerDetails.phone }
      );
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      const itemsHtml = items.map((item: any) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px;">${item.name} ${item.variant ? `(${item.variant})` : ''}</td>
          <td style="padding: 10px;">x${item.quantity}</td>
          <td style="padding: 10px;">₹${item.price * item.quantity}</td>
        </tr>
      `).join('');

      await transporter.sendMail({
        from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🍰 New Order: ₹${bill.grandTotal} from ${customerDetails.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #D98292;">New Order Received!</h2>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Customer:</strong> ${customerDetails.name}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${customerDetails.phone}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${customerDetails.email}</p>
              <p style="margin: 5px 0;"><strong>Address:</strong> ${customerDetails.address}</p>
            </div>

            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background-color: #FFF8F3;">
                  <th style="padding: 10px; text-align: left;">Item</th>
                  <th style="padding: 10px; text-align: left;">Qty</th>
                  <th style="padding: 10px; text-align: left;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
            
            ${instructions ? `<div style="background-color: #FFF8F3; padding: 10px; margin-top: 15px; border-radius: 5px;"><strong>Note from User:</strong> ${instructions}</div>` : ""}

            <div style="margin-top: 20px; text-align: right;">
               <p>Delivery: ₹${bill.deliveryCharge}</p>
               <h3>Total: ₹${bill.grandTotal}</h3>
            </div>
            <p style="color: #888; font-size: 12px; text-align: center;">Order ID: ${newOrder._id}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, orderId: newOrder._id });

  } catch (error) {
    console.error("Checkout Error:", error);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}