// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Gallery from "@/lib/models/Gallery";
// import cloudinary from "@/lib/cloudinary";

// export async function GET() {
//   await connectDB();
//   let gallery = await Gallery.findOne();
  
//   // If no gallery exists, return default empty structure (or placeholder images)
//   if (!gallery) {
//     return NextResponse.json({ images: Array(6).fill(null) }); // Return placeholders
//   }
//   return NextResponse.json(gallery);
// }

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("image") as File;
//     const index = parseInt(formData.get("index") as string); // Which image slot to update (0-5)

//     if (!file || isNaN(index)) {
//       return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
//     }

//     // Upload to Cloudinary
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
//     const imageUpload = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream({ folder: "cisteblasta-gallery" }, (error, result) => {
//         if (error) reject(error); else resolve(result);
//       }).end(buffer);
//     });
//     const imageUrl = (imageUpload as any).secure_url;

//     await connectDB();
//     let gallery = await Gallery.findOne();
    
//     if (!gallery) {
//       gallery = await Gallery.create({ images: Array(6).fill(null) });
//     }

//     // Update the specific index
//     gallery.images[index] = imageUrl;
//     await gallery.save();

//     return NextResponse.json({ success: true, imageUrl });

//   } catch (error) {
//     console.error("Gallery Upload Error:", error);
//     return NextResponse.json({ error: "Upload Failed" }, { status: 500 });
//   }
// }








import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Gallery from "@/lib/models/Gallery";
import cloudinary from "@/lib/cloudinary";

const GALLERY_SIZE = 12; // Updated to 12

export async function GET() {
  await connectDB();
  let gallery = await Gallery.findOne();
  
  if (!gallery) {
    return NextResponse.json({ images: Array(GALLERY_SIZE).fill(null) });
  }
  return NextResponse.json(gallery);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const index = parseInt(formData.get("index") as string); 

    if (!file || isNaN(index)) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const imageUpload = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "cisteblasta-gallery" }, (error, result) => {
        if (error) reject(error); else resolve(result);
      }).end(buffer);
    });
    const imageUrl = (imageUpload as any).secure_url;

    await connectDB();
    let gallery = await Gallery.findOne();
    
    if (!gallery) {
      gallery = await Gallery.create({ images: Array(GALLERY_SIZE).fill(null) });
    }

    // Ensure array is large enough if size increased
    while (gallery.images.length < GALLERY_SIZE) {
      gallery.images.push(null);
    }

    gallery.images[index] = imageUrl;
    await gallery.save();

    return NextResponse.json({ success: true, imageUrl });

  } catch (error) {
    console.error("Gallery Upload Error:", error);
    return NextResponse.json({ error: "Upload Failed" }, { status: 500 });
  }
}