// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Product from "@/lib/models/Product";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   try {
//     await connectDB();
//     const product = await Product.findById(params.id);
    
//     if (!product) {
//       return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, product });
//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // AWAIT PARAMS HERE

    await connectDB();
    const product = await Product.findById(id);
    
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Fetch Product Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}