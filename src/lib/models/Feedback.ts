import mongoose, { Schema, model, models } from "mongoose";

const FeedbackSchema = new Schema(
  {
    feedback: { type: String, required: true },
    userName: { type: String, default: "Anonymous" },
    userEmail: { type: String, default: "Not provided" },
    pageUrl: { type: String }, // To track which page they left from
  },
  { timestamps: true }
);

const Feedback = models.Feedback || model("Feedback", FeedbackSchema);
export default Feedback;