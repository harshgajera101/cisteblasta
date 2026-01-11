// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import connectDB from "@/lib/db";
// import OrderIntent from "@/lib/models/OrderIntent";
// import Product from "@/lib/models/Product";

// // --- GET: Check Eligibility ---
// export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
    
//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ canReview: false });
//     }
//     const userEmail = session.user.email;

//     const { id } = await params;
//     await connectDB();

//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ canReview: false });

//     // Check if already reviewed
//     const hasReviewed = product.reviews.some((r: any) => r.userEmail === userEmail);
//     if (hasReviewed) {
//       return NextResponse.json({ canReview: false, reason: "Already reviewed" });
//     }

//     // Check if purchased & delivered
//     const validOrder = await OrderIntent.findOne({
//         email: userEmail,
//         status: "DELIVERED",
//         items: { $elemMatch: { name: product.name } } 
//     });

//     return NextResponse.json({ canReview: !!validOrder });

//   } catch (error) {
//     return NextResponse.json({ canReview: false });
//   }
// }

// // --- POST: Add Review ---
// export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
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

//     const existingReview = product.reviews.find((r: any) => r.userEmail === userEmail);
//     if (existingReview) {
//       return NextResponse.json({ success: false, error: "You have already reviewed this product." }, { status: 400 });
//     }

//     const newReviewData = {
//       user: userName,
//       userEmail: userEmail,
//       rating,
//       comment,
//       date: new Date(),
//       isEdited: false
//     };

//     // Push the review
//     product.reviews.push(newReviewData);
    
//     // FIX: Retrieve the newly created subdocument to get its _id
//     const addedReview = product.reviews[product.reviews.length - 1];
    
//     // Update Stats
//     const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
//     product.averageRating = (totalStars / product.reviews.length).toFixed(1);
//     product.reviewsCount = product.reviews.length;

//     await product.save();

//     return NextResponse.json({ success: true, newReview: addedReview });

//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
//   }
// }

// // --- PUT: Edit Review (User) ---
// export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session || !session.user || !session.user.email) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }
//     const userEmail = session.user.email;
//     const { comment, rating } = await req.json();
//     const { id } = await params;

//     await connectDB();
//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

//     const review = product.reviews.find((r: any) => r.userEmail === userEmail);
//     if (!review) return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });

//     // Update fields
//     review.comment = comment;
//     if (rating) review.rating = rating;
//     review.isEdited = true;
//     review.date = new Date();

//     const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
//     product.averageRating = (totalStars / product.reviews.length).toFixed(1);

//     await product.save();

//     return NextResponse.json({ success: true, updatedReview: review });

//   } catch (error) {
//     return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
//   }
// }

// // --- DELETE: Delete Review (Admin) ---
// export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
//   try {
//     const session = await getServerSession(authOptions);
//     // Check role
//     if (!session || (session.user as any).role !== "admin") {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
//     }

//     const { reviewId } = await req.json();
//     const { id } = await params;

//     await connectDB();
//     const product = await Product.findById(id);
//     if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

//     const initialCount = product.reviews.length;
//     product.reviews = product.reviews.filter((r: any) => r._id.toString() !== reviewId);

//     if (product.reviews.length === initialCount) {
//       return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
//     }

//     if (product.reviews.length > 0) {
//       const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
//       product.averageRating = (totalStars / product.reviews.length).toFixed(1);
//     } else {
//       product.averageRating = 0;
//     }
//     product.reviewsCount = product.reviews.length;

//     await product.save();

//     return NextResponse.json({ success: true });

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

    const hasReviewed = product.reviews.some((r: any) => r.userEmail === userEmail);
    if (hasReviewed) {
      return NextResponse.json({ canReview: false, reason: "Already reviewed" });
    }

    const validOrder = await OrderIntent.findOne({
        email: userEmail,
        status: "DELIVERED",
        items: { $elemMatch: { name: product.name } } 
    });

    return NextResponse.json({ canReview: !!validOrder });

  } catch (error) {
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

    const newReviewData = {
      user: userName,
      userEmail: userEmail,
      rating,
      comment,
      date: new Date(),
      isEdited: false
    };

    // Push returns the new length
    product.reviews.push(newReviewData);
    
    // FIX: Get the actual subdocument (with _id) to return to frontend
    const addedReview = product.reviews[product.reviews.length - 1];
    
    const totalStars = product.reviews.reduce((acc: number, r: any) => acc + r.rating, 0);
    product.averageRating = (totalStars / product.reviews.length).toFixed(1);
    product.reviewsCount = product.reviews.length;

    await product.save();

    return NextResponse.json({ success: true, newReview: addedReview });

  } catch (error) {
    return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
  }
}

// --- PUT: Edit Review ---
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }
    const userEmail = session.user.email;
    const { comment, rating } = await req.json();
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

    const review = product.reviews.find((r: any) => r.userEmail === userEmail);
    if (!review) return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });

    review.comment = comment;
    if (rating) review.rating = rating;
    review.isEdited = true;
    review.date = new Date();

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
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 403 });
    }

    const { reviewId } = await req.json();
    const { id } = await params;

    await connectDB();
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });

    const initialCount = product.reviews.length;
    product.reviews = product.reviews.filter((r: any) => r._id.toString() !== reviewId);

    if (product.reviews.length === initialCount) {
      return NextResponse.json({ success: false, error: "Review not found" }, { status: 404 });
    }

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