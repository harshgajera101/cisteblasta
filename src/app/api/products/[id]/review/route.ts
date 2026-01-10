// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth"; // Verify this path
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import Product from "@/lib/models/Product";

// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) return NextResponse.json({ canReview: false });

//     const { id } = await params;
//     await connectDB();

//     // Check if user has a DELIVERED order containing this product
//     const order = await OrderIntent.findOne({
//       email: session.user.email,
//       status: "DELIVERED",
//       "items.name": { $exists: true } // Simplified check, ideally match product ID if stored, or name
//     });

//     // In a real app, you'd match Product ID. 
//     // Since OrderIntent stores "name", we assume name matching for now or if you stored IDs in items.
//     // For robust matching, OrderIntent items should store productId.
//     // Assuming for now if they have *any* delivered order, we let them review (or refine this logic).
    
//     // Better Logic: Find order where items.name matches product.name
//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ canReview: false });

//     const validOrder = await OrderIntent.findOne({
//         email: session.user.email,
//         status: "DELIVERED",
//         items: { $elemMatch: { name: product.name } }
//     });

//     return NextResponse.json({ canReview: !!validOrder });

//   } catch (error) {
//     return NextResponse.json({ canReview: false });
//   }
// }

// export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session?.user?.email) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

//     const { rating, comment } = await req.json();
//     const { id } = await params;

//     await connectDB();
//     const product = await Product.findById(id);

//     if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

//     const newReview = {
//       user: session.user.name || "Customer",
//       rating,
//       comment,
//       date: new Date(),
//     };

//     product.reviews.push(newReview);
    
//     // Recalculate Average
//     const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
//     product.averageRating = (totalStars / product.reviews.length).toFixed(1);
//     product.reviewsCount = product.reviews.length;

//     await product.save();

//     return NextResponse.json({ success: true, newReview });

//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
//   }
// }






import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import Product from "@/lib/models/Product";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    
    // 1. Safety Check: User must be logged in
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ canReview: false });
    }
    const userEmail = session.user.email;

    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ canReview: false });

    // 2. DUPLICATE CHECK: 
    // If we find ANY review with this email, the user cannot review again.
    // This hides the button on the frontend.
    const hasReviewed = product.reviews.some((r: any) => r.userEmail === userEmail);
    if (hasReviewed) {
      return NextResponse.json({ canReview: false, reason: "Already reviewed" });
    }

    // 3. PURCHASE CHECK:
    // User must have a DELIVERED order with this product
    const validOrder = await OrderIntent.findOne({
        email: userEmail,
        status: "DELIVERED",
        items: { $elemMatch: { name: product.name } } 
    });

    return NextResponse.json({ canReview: !!validOrder });

  } catch (error) {
    console.error("Review Check Error:", error);
    return NextResponse.json({ canReview: false });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    
    // 1. Validate Session
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user.email;
    const userName = session.user.name || "Customer";

    const { rating, comment } = await req.json();
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);

    if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

    // 2. Server-Side Duplicate Check
    const existingReview = product.reviews.find((r: any) => r.userEmail === userEmail);
    if (existingReview) {
      return NextResponse.json({ success: false, error: "You have already reviewed this product." }, { status: 400 });
    }

    // 3. Add New Review
    const newReview = {
      user: userName,
      userEmail: userEmail, // We explicitly save it here
      rating,
      comment,
      date: new Date(),
    };

    product.reviews.push(newReview);
    
    // 4. Update Statistics
    const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    product.averageRating = (totalStars / product.reviews.length).toFixed(1);
    product.reviewsCount = product.reviews.length;

    await product.save();

    return NextResponse.json({ success: true, newReview });

  } catch (error) {
    console.error("Review Post Error:", error);
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}