import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });

      await transporter.sendMail({
        from: `"Ciste Blasta Bot" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email, // If you click "Reply" in your email, it replies to the customer
        subject: `📬 New Contact Query: ${subject || "General Inquiry"}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; max-width: 600px;">
            <h2 style="color: #D98292;">New Contact Message Received!</h2>
            
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 5px 0;"><strong>Phone:</strong> ${phone || "Not provided"}</p>
            </div>

            <h3 style="color: #4E342E; margin-bottom: 10px;">Message:</h3>
            <div style="background-color: #FFF8F3; padding: 15px; border-radius: 8px; white-space: pre-wrap; line-height: 1.5;">
              ${message}
            </div>
            
            <p style="color: #888; font-size: 12px; text-align: center; margin-top: 30px;">Sent from Ciste Blasta Contact Form</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });

  } catch (error) {
    console.error("Contact Form Error:", error);
    return NextResponse.json({ success: false, error: "Failed to send message" }, { status: 500 });
  }
}