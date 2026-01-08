// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth"; // FIX: Import from lib/auth
// import connectDB from "@/lib/db";
// import User from "@/lib/models/User";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function PUT(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const { name, phone } = await req.json();
//     await connectDB();

//     // 1. Update the User Profile
//     const updatedUser = await User.findOneAndUpdate(
//       { email: session.user?.email },
//       { name, phone },
//       { new: true }
//     );

//     // 2. SYNC FIX: Update ALL past orders to match the new Name/Phone
//     // This ensures the Admin Dashboard always sees the latest details
//     await OrderIntent.updateMany(
//       { email: session.user?.email },
//       { 
//         customerName: name,
//         phone: phone
//       }
//     );

//     return NextResponse.json({ success: true, user: updatedUser });
//   } catch (error) {
//     console.error("Profile Update Error:", error);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }







import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // FIX: Import from lib/auth
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import OrderIntent from "@/lib/models/OrderIntent";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, phone } = await req.json();
    await connectDB();

    // 1. Update the User Profile
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user?.email },
      { name, phone },
      { new: true }
    );

    // 2. SYNC FIX: Update ALL past orders to match the new Name/Phone
    // This ensures the Admin Dashboard always sees the latest details
    if (updatedUser) {
        await OrderIntent.updateMany(
          { email: session.user?.email },
          { 
            customerName: name,
            phone: phone
          }
        );
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}