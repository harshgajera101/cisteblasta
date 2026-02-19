import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Feedback from "@/lib/models/Feedback";

export async function POST(req: Request) {
  try {
    const { feedback, userName, userEmail, pageUrl } = await req.json();

    if (!feedback) {
      return NextResponse.json({ success: false, message: "Feedback is required" }, { status: 400 });
    }

    await connectDB();

    const newFeedback = new Feedback({
      feedback,
      userName,
      userEmail,
      pageUrl,
    });

    await newFeedback.save();

    return NextResponse.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error) {
    console.error("Feedback Error:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}