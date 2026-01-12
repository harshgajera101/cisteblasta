import mongoose, { Schema, model, models } from "mongoose";

const GallerySchema = new Schema({
  images: [{ type: String }], // Array of image URLs
  updatedAt: { type: Date, default: Date.now }
});

const Gallery = models.Gallery || model("Gallery", GallerySchema);
export default Gallery;