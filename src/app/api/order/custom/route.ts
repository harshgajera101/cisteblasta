// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import User from "@/lib/models/User"; 
// import cloudinary from "@/lib/cloudinary";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();
    
//     const name = formData.get("name") as string;
//     const phone = formData.get("phone") as string;
//     const email = formData.get("email") as string;
//     const weight = formData.get("weight") as string;
//     const flavor = formData.get("flavor") as string;
//     const date = formData.get("date") as string;
//     const instructions = formData.get("instructions") as string;
    
//     // NEW: Address & Location Data
//     const address = formData.get("address") as string;
//     const deliveryDistance = parseFloat(formData.get("deliveryDistance") as string || "0");
//     const deliveryCharge = parseFloat(formData.get("deliveryCharge") as string || "0");
//     const lat = parseFloat(formData.get("lat") as string || "0");
//     const lng = parseFloat(formData.get("lng") as string || "0");

//     const imageFile = formData.get("image") as File | null;
//     let imageUrl = "";

//     if (imageFile) {
//       const arrayBuffer = await imageFile.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);
//       imageUrl = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(
//           { folder: "cisteblasta-custom" },
//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result?.secure_url || "");
//           }
//         );
//         uploadStream.end(buffer);
//       });
//     }

//     await connectDB();

//     // 1. Create Order
//     const newOrder = await OrderIntent.create({
//       customerName: name,
//       phone: phone,
//       email: email, 
//       address: address || "Custom Request",
//       items: [{
//           name: "Custom Cake Request",
//           variant: `${weight} • ${flavor}`,
//           quantity: 1,
//           price: 0, 
//       }],
//       totalAmount: 0, 
//       deliveryDistance: deliveryDistance,
//       deliveryCharge: deliveryCharge,
//       status: "PENDING", 
//     });

//     // 2. SAVE ADDRESS: Update User Profile
//     if (email && address) {
//       await User.findOneAndUpdate(
//         { email: email },
//         { 
//           address: address,
//           phone: phone,
//           coordinates: { lat, lng }
//         }
//       );
//     }

//     // 3. Email Notification
//     if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
//       const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//       });

//       await transporter.sendMail({
//         from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
//         to: process.env.ADMIN_EMAIL,
//         subject: `🎨 Custom Cake: ${name}`,
//         html: `
//           <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
//             <h2 style="color: #D98292;">New Custom Request!</h2>
//             <p><strong>Customer:</strong> ${name} (${phone})</p>
//             <p><strong>Address:</strong> ${address}</p>
//             <p><strong>Date:</strong> ${date}</p>
//             <hr/>
//             <ul>
//               <li><strong>Weight:</strong> ${weight}</li>
//               <li><strong>Flavor:</strong> ${flavor}</li>
//               <li><strong>Delivery:</strong> ₹${deliveryCharge} (${deliveryDistance} km)</li>
//               <li><strong>Notes:</strong> ${instructions || "None"}</li>
//             </ul>
//             ${imageUrl ? `<p><strong>Reference Photo:</strong> <br/> <a href="${imageUrl}">View Image</a></p><img src="${imageUrl}" style="max-width:300px; border-radius:10px;"/>` : ""}
//           </div>
//         `,
//       });
//     }

//     return NextResponse.json({ success: true, orderId: newOrder._id, imageUrl });

//   } catch (error) {
//     console.error("Custom Order Error:", error);
//     return NextResponse.json({ success: false, error: "Failed to submit request" }, { status: 500 });
//   }
// }





import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import User from "@/lib/models/User"; 
import cloudinary from "@/lib/cloudinary";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    
    // Extract Data
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const weight = formData.get("weight") as string;
    const flavor = formData.get("flavor") as string;
    const date = formData.get("date") as string;
    const instructions = formData.get("instructions") as string; // This is the Note
    
    // DEBUG LOG: Check your terminal for this when you submit!
    console.log("--- NEW CUSTOM ORDER ---");
    console.log("Customer:", name);
    console.log("Instructions/Notes:", instructions); 

    const address = formData.get("address") as string;
    const deliveryDistance = parseFloat(formData.get("deliveryDistance") as string || "0");
    const deliveryCharge = parseFloat(formData.get("deliveryCharge") as string || "0");
    const lat = parseFloat(formData.get("lat") as string || "0");
    const lng = parseFloat(formData.get("lng") as string || "0");

    const imageFile = formData.get("image") as File | null;
    let imageUrl = "";

    if (imageFile) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      imageUrl = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "cisteblasta-custom" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url || "");
          }
        );
        uploadStream.end(buffer);
      });
    }

    await connectDB();

    // Create Order
    const newOrder = await OrderIntent.create({
      customerName: name,
      phone: phone,
      email: email, 
      address: address || "Custom Request",
      notes: instructions, // MAP INSTRUCTIONS TO NOTES
      items: [{
          name: "Custom Cake Request",
          variant: `${weight} • ${flavor}`,
          quantity: 1,
          price: 0, 
      }],
      totalAmount: 0, 
      deliveryDistance: deliveryDistance,
      deliveryCharge: deliveryCharge,
      status: "PENDING", 
    });

    console.log("Order Created with ID:", newOrder._id);
    console.log("Saved Note:", newOrder.notes); // Verify it saved

    // Update Profile
    if (email && address) {
      await User.findOneAndUpdate(
        { email: email },
        { address: address, phone: phone, coordinates: { lat, lng } }
      );
    }

    // Email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `🎨 Custom Cake: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: #D98292;">New Custom Request!</h2>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Customer:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Address:</strong> ${address}</p>
            </div>
            <p><strong>Date Needed:</strong> ${date}</p>
            <hr/>
            <ul>
              <li><strong>Weight:</strong> ${weight}</li>
              <li><strong>Flavor:</strong> ${flavor}</li>
              <li><strong>Delivery:</strong> ₹${deliveryCharge} (${deliveryDistance} km)</li>
              <li style="background-color: #FFF8F3; padding: 5px; margin-top: 5px;"><strong>Note:</strong> ${instructions || "None"}</li>
            </ul>
            ${imageUrl ? `<p><strong>Reference Photo:</strong> <br/> <a href="${imageUrl}">View Full Image</a></p><img src="${imageUrl}" style="max-width:300px; border-radius:10px;"/>` : ""}
            <br/>
            <p style="color: #888; font-size: 12px;">Order ID: ${newOrder._id}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, orderId: newOrder._id, imageUrl });

  } catch (error) {
    console.error("Custom Order Error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit request" }, { status: 500 });
  }
}