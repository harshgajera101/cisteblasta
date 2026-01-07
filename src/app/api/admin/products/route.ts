// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Product from "@/lib/models/Product";
// import cloudinary from "@/lib/cloudinary";

// // 1. GET all products (for the admin list)
// export async function GET() {
//   await connectDB();
//   const products = await Product.find({});
//   return NextResponse.json(products);
// }

// // 2. CREATE a new product (with Image Upload)
// export async function POST(request: Request) {
//   try {
//     // Parse the form data (since we are sending a file)
//     const formData = await request.formData();
//     const file = formData.get("image") as File;
//     const name = formData.get("name") as string;
//     const price = formData.get("price") as string;
//     const category = formData.get("category") as string;
//     const description = formData.get("description") as string;

//     if (!file || !name || !price) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // A. Upload Image to Cloudinary
//     // We have to convert the file to a buffer to upload it from the server
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = new Uint8Array(arrayBuffer);
    
//     // Upload logic wrapped in a Promise
//     const imageUpload = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         { folder: "cisteblasta-products" }, // Folder name in your Cloudinary
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       ).end(buffer);
//     });

//     const imageUrl = (imageUpload as any).secure_url;

//     // B. Save to MongoDB
//     await connectDB();
//     const newProduct = await Product.create({
//       name,
//       price: parseFloat(price),
//       category,
//       description,
//       image: imageUrl, // Save the Cloudinary URL
//     });

//     return NextResponse.json({ success: true, product: newProduct });

//   } catch (error) {
//     console.error("Upload Error:", error);
//     return NextResponse.json({ error: "Upload failed" }, { status: 500 });
//   }
// }

// // 3. DELETE a product
// export async function DELETE(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

//     await connectDB();
//     await Product.findByIdAndDelete(id);

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     return NextResponse.json({ error: "Delete failed" }, { status: 500 });
//   }
// }




import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";
import cloudinary from "@/lib/cloudinary";

// 1. GET all products
export async function GET() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

// 2. CREATE a new product
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string; // We treat this as basePrice for simplicity
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;

    if (!name || !price) {
      return NextResponse.json({ error: "Name and Price are required" }, { status: 400 });
    }

    let imageUrl = "";
    // Upload Image if present
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "cisteblasta-products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      imageUrl = (imageUpload as any).secure_url;
    }

    await connectDB();
    
    // Create using the NEW Schema structure
    const newProduct = await Product.create({
      name,
      basePrice: parseFloat(price), // Map to basePrice
      category,
      description,
      images: imageUrl ? [imageUrl] : [], // Store in array
      variants: [], // Empty variants by default for simple items
    });

    return NextResponse.json({ success: true, product: newProduct });

  } catch (error) {
    console.error("Create Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// 3. EDIT (UPDATE) a product - NEW!
export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    const file = formData.get("image") as File; // New file (optional)
    
    // Get existing data to update
    const updateData: any = {
      name: formData.get("name"),
      basePrice: parseFloat(formData.get("price") as string),
      category: formData.get("category"),
      description: formData.get("description"),
    };

    // Only upload new image if user selected one
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: "cisteblasta-products" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });
      // Replace the images array with the new one
      updateData.images = [(imageUpload as any).secure_url];
    }

    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, product: updatedProduct });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// 4. DELETE a product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID missing" }, { status: 400 });

    await connectDB();
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}