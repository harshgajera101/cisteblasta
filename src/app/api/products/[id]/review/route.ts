// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import Product from "@/lib/models/Product";

// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     // 1. Safety Check: User must be logged in
//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ canReview: false });
//     }
//     const userEmail = session.user.email;

//     const { id } = await params;
//     await connectDB();

//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ canReview: false });

//     // 2. DUPLICATE CHECK: 
//     // If we find ANY review with this email, the user cannot review again.
//     // This hides the button on the frontend.
//     const hasReviewed = product.reviews.some((r: any) => r.userEmail === userEmail);
//     if (hasReviewed) {
//       return NextResponse.json({ canReview: false, reason: "Already reviewed" });
//     }

//     // 3. PURCHASE CHECK:
//     // User must have a DELIVERED order with this product
//     const validOrder = await OrderIntent.findOne({
//         email: userEmail,
//         status: "DELIVERED",
//         items: { $elemMatch: { name: product.name } } 
//     });

//     return NextResponse.json({ canReview: !!validOrder });

//   } catch (error) {
//     console.error("Review Check Error:", error);
//     return NextResponse.json({ canReview: false });
//   }
// }

// export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     // 1. Validate Session
//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }
//     const userEmail = session.user.email;
//     const userName = session.user.name || "Customer";

//     const { rating, comment } = await req.json();
//     const { id } = await params;

//     await connectDB();
//     const product = await Product.findById(id);

//     if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

//     // 2. Server-Side Duplicate Check
//     const existingReview = product.reviews.find((r: any) => r.userEmail === userEmail);
//     if (existingReview) {
//       return NextResponse.json({ success: false, error: "You have already reviewed this product." }, { status: 400 });
//     }

//     // 3. Add New Review
//     const newReview = {
//       user: userName,
//       userEmail: userEmail, // We explicitly save it here
//       rating,
//       comment,
//       date: new Date(),
//     };

//     product.reviews.push(newReview);
    
//     // 4. Update Statistics
//     const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
//     product.averageRating = (totalStars / product.reviews.length).toFixed(1);
//     product.reviewsCount = product.reviews.length;

//     await product.save();

//     return NextResponse.json({ success: true, newReview });

//   } catch (error) {
//     console.error("Review Post Error:", error);
//     return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
//   }
// }











import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import OrderIntent from "@/lib/models/OrderIntent";
import Product from "@/lib/models/Product";

// --- GET: Check Eligibility ---
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ canReview: false });
    }
    const userEmail = session.user.email;

    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ canReview: false });

    // If already reviewed, return FALSE (hides the button)
    const hasReviewed = product.reviews.some((r: any) => r.userEmail === userEmail);
    if (hasReviewed) {
      return NextResponse.json({ canReview: false, reason: "Already reviewed" });
    }

    // Check if purchased & delivered
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

// --- POST: Add Review ---
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
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

    const existingReview = product.reviews.find((r: any) => r.userEmail === userEmail);
    if (existingReview) {
      return NextResponse.json({ success: false, error: "You have already reviewed this product." }, { status: 400 });
    }

    const newReview = {
      user: userName,
      userEmail: userEmail,
      rating,
      comment,
      date: new Date(),
      isEdited: false
    };

    product.reviews.push(newReview);
    
    // Update Stats
    const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    product.averageRating = (totalStars / product.reviews.length).toFixed(1);
    product.reviewsCount = product.reviews.length;

    await product.save();

    return NextResponse.json({ success: true, newReview });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// --- PUT: Edit Review (User) ---
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user.email;
    const { comment, rating } = await req.json(); // Allow rating edit too if needed
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

    // Find the user's review
    const review = product.reviews.find((r: any) => r.userEmail === userEmail);
    if (!review) return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });

    // Update
    review.comment = comment;
    if (rating) review.rating = rating;
    review.isEdited = true;
    review.date = new Date(); // Optional: Update date to now

    // Recalculate Stats (in case rating changed)
    const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    product.averageRating = (totalStars / product.reviews.length).toFixed(1);

    await product.save();

    return NextResponse.json({ success: true, updatedReview: review });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// --- DELETE: Delete Review (Admin) ---
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    // Check if Admin
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { reviewId } = await req.json(); // Pass specific review ID to delete
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

    // Filter out the review
    const initialCount = product.reviews.length;
    product.reviews = product.reviews.filter((r: any) => r._id.toString() !== reviewId);

    if (product.reviews.length === initialCount) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }

    // Recalculate Stats
    if (product.reviews.length > 0) {
      const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
      product.averageRating = (totalStars / product.reviews.length).toFixed(1);
    } else {
      product.averageRating = 0;
    }
    product.reviewsCount = product.reviews.length;

    await product.save();

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}