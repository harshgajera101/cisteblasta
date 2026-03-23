// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Product from "@/lib/models/Product";
// import cloudinary from "@/lib/cloudinary";

// export async function GET() {
//   await connectDB();
//   const products = await Product.find({}).sort({ createdAt: -1 });
//   return NextResponse.json(products);
// }

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get("image") as File;
//     const name = formData.get("name") as string;
//     const category = formData.get("category") as string;
//     const description = formData.get("description") as string;
    
//     // Parse variants
//     const variantsStr = formData.get("variants") as string;
//     const variants = variantsStr ? JSON.parse(variantsStr) : [];

//     // NEW: Parse Occasions
//     const occasionsStr = formData.get("occasions") as string;
//     const occasions = occasionsStr ? JSON.parse(occasionsStr) : [];
    
//     // Base Price logic
//     let basePrice = parseFloat(formData.get("price") as string);
//     if ((!basePrice || isNaN(basePrice)) && variants.length > 0) {
//       basePrice = variants[0].price;
//     }

//     if (!name || (isNaN(basePrice) && variants.length === 0)) {
//       return NextResponse.json({ error: "Name and at least one Price are required" }, { status: 400 });
//     }

//     let imageUrl = "";
//     if (file && file.size > 0) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = new Uint8Array(arrayBuffer);
//       const imageUpload = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream({ folder: "cisteblasta-products" }, (error, result) => {
//           if (error) reject(error); else resolve(result);
//         }).end(buffer);
//       });
//       imageUrl = (imageUpload as any).secure_url;
//     }

//     await connectDB();
//     const newProduct = await Product.create({
//       name,
//       basePrice,
//       category,
//       description,
//       images: imageUrl ? [imageUrl] : [],
//       variants: variants,
//       occasions: occasions, // Save occasions
//     });

//     return NextResponse.json({ success: true, product: newProduct });

//   } catch (error) {
//     console.error("Create Error:", error);
//     return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
//   }
// }

// export async function PUT(request: Request) {
//   try {
//     const formData = await request.formData();
//     const id = formData.get("id") as string;
//     const file = formData.get("image") as File;
    
//     const variantsStr = formData.get("variants") as string;
//     const variants = variantsStr ? JSON.parse(variantsStr) : [];

//     // NEW: Parse Occasions for Update
//     const occasionsStr = formData.get("occasions") as string;
//     const occasions = occasionsStr ? JSON.parse(occasionsStr) : [];
    
//     let basePrice = parseFloat(formData.get("price") as string);
//     if ((!basePrice || isNaN(basePrice)) && variants.length > 0) {
//       basePrice = variants[0].price;
//     }

//     const updateData: any = {
//       name: formData.get("name"),
//       basePrice: basePrice,
//       category: formData.get("category"),
//       description: formData.get("description"),
//       variants: variants,
//       occasions: occasions, // Update occasions
//     };

//     if (file && file.size > 0) {
//       const arrayBuffer = await file.arrayBuffer();
//       const buffer = new Uint8Array(arrayBuffer);
//       const imageUpload = await new Promise((resolve, reject) => {
//         cloudinary.uploader.upload_stream({ folder: "cisteblasta-products" }, (error, result) => {
//           if (error) reject(error); else resolve(result);
//         }).end(buffer);
//       });
//       updateData.images = [(imageUpload as any).secure_url];
//     }

//     await connectDB();
//     const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
//     return NextResponse.json({ success: true, product: updatedProduct });

//   } catch (error) {
//     return NextResponse.json({ error: "Failed to update" }, { status: 500 });
//   }
// }

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

export async function GET() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    
    // Parse variants
    const variantsStr = formData.get("variants") as string;
    const variants = variantsStr ? JSON.parse(variantsStr) : [];

    // Parse Occasions
    const occasionsStr = formData.get("occasions") as string;
    const occasions = occasionsStr ? JSON.parse(occasionsStr) : [];
    
    // Base Price logic
    let basePrice = parseFloat(formData.get("price") as string);
    if ((!basePrice || isNaN(basePrice)) && variants.length > 0) {
      basePrice = variants[0].price;
    }

    if (!name || (isNaN(basePrice) && variants.length === 0)) {
      return NextResponse.json({ error: "Name and at least one Price are required" }, { status: 400 });
    }

    let imageUrl = "";
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "cisteblasta-products" }, (error, result) => {
          if (error) reject(error); else resolve(result);
        }).end(buffer);
      });
      imageUrl = (imageUpload as any).secure_url;
    }

    await connectDB();
    const newProduct = await Product.create({
      name,
      basePrice,
      category,
      description,
      images: imageUrl ? [imageUrl] : [],
      variants: variants,
      occasions: occasions,
      isVisible: true, // NEW: Ensure it is visible by default when created
    });

    return NextResponse.json({ success: true, product: newProduct });

  } catch (error) {
    console.error("Create Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const formData = await request.formData();
    
    // --- NEW: Handle Visibility Toggle ---
    const action = formData.get("action");
    if (action === "toggle_visibility") {
      const id = formData.get("id") as string;
      const isVisible = formData.get("isVisible") === "true";
      
      await connectDB();
      const updatedProduct = await Product.findByIdAndUpdate(id, { isVisible }, { new: true });
      return NextResponse.json({ success: true, product: updatedProduct });
    }
    // -------------------------------------

    const id = formData.get("id") as string;
    const file = formData.get("image") as File;
    
    const variantsStr = formData.get("variants") as string;
    const variants = variantsStr ? JSON.parse(variantsStr) : [];

    // Parse Occasions for Update
    const occasionsStr = formData.get("occasions") as string;
    const occasions = occasionsStr ? JSON.parse(occasionsStr) : [];
    
    let basePrice = parseFloat(formData.get("price") as string);
    if ((!basePrice || isNaN(basePrice)) && variants.length > 0) {
      basePrice = variants[0].price;
    }

    const updateData: any = {
      name: formData.get("name"),
      basePrice: basePrice,
      category: formData.get("category"),
      description: formData.get("description"),
      variants: variants,
      occasions: occasions, 
    };

    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const imageUpload = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "cisteblasta-products" }, (error, result) => {
          if (error) reject(error); else resolve(result);
        }).end(buffer);
      });
      updateData.images = [(imageUpload as any).secure_url];
    }

    await connectDB();
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });
    return NextResponse.json({ success: true, product: updatedProduct });

  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

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