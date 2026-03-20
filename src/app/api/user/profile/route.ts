// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import connectDB from "@/lib/db";
// import User from "@/lib/models/User";
// import OrderIntent from "@/lib/models/OrderIntent";

// export async function GET() {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     await connectDB();
//     // Return extra fields: address & coordinates
//     const user = await User.findOne({ email: session.user?.email }).select("name email phone address coordinates");
//     return NextResponse.json({ success: true, user });
//   } catch (error) {
//     return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   try {
//     const { name, phone } = await req.json();
//     await connectDB();

//     const updatedUser = await User.findOneAndUpdate(
//       { email: session.user?.email },
//       { name, phone },
//       { new: true }
//     );

//     if (updatedUser) {
//         await OrderIntent.updateMany(
//           { email: session.user?.email },
//           { 
//             customerName: name,
//             phone: phone
//           }
//         );
//     }

//     return NextResponse.json({ success: true, user: updatedUser });
//   } catch (error) {
//     console.error("Profile Update Error:", error);
//     return NextResponse.json({ error: "Update failed" }, { status: 500 });
//   }
// }














import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import OrderIntent from "@/lib/models/OrderIntent";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await connectDB();
    // Return extra fields: address & coordinates
    const user = await User.findOne({ email: session.user?.email }).select("name email phone address coordinates");
    return NextResponse.json({ success: true, user });
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    // FIX: Extracted `address` from the incoming request body
    const { name, phone, address } = await req.json();
    await connectDB();

    // FIX: Added `address` to the database update object
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user?.email },
      { name, phone, address },
      { new: true }
    );

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