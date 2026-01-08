// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "@/lib/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // 1. Check for Admin (Hardcoded in ENV) - Priority
//         if (
//           credentials.email === process.env.ADMIN_EMAIL &&
//           credentials.password === process.env.ADMIN_PASSWORD
//         ) {
//           return { id: "admin", name: "Sister Admin", email: credentials.email, role: "admin" };
//         }

//         // 2. Check for Customer (Database)
//         await connectDB();
//         const user = await User.findOne({ email: credentials.email });
        
//         if (user) {
//           const isValid = await bcrypt.compare(credentials.password, user.password);
//           if (isValid) {
//             return { 
//               id: user._id.toString(), 
//               name: user.name, 
//               email: user.email, 
//               role: "customer",
//               // We pass phone so we can use it in the Cart later!
//               phone: user.phone 
//             };
//           }
//         }

//         return null; // Login failed
//       },
//     }),
//   ],
//   callbacks: {
//     // This allows us to access the 'role' and 'phone' in the frontend
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.role = user.role;
//         token.phone = user.phone;
//         token.id = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if (session?.user) {
//         session.user.role = token.role;
//         session.user.phone = token.phone;
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login", // We will create this page next
//   },
// });

// export { handler as GET, handler as POST };








import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Admin Check
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "Sister Admin", email: credentials.email, role: "admin" };
        }

        // 2. Customer Check
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        
        if (user) {
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (isValid) {
            return { 
              id: user._id.toString(), 
              name: user.name, 
              email: user.email, 
              role: "customer",
              phone: user.phone 
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      // 1. On Login: Set initial data
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }

      // 2. On Every Request: Fetch latest data from DB (Fixes Edit Profile Bug)
      // We skip this for the 'admin' user since they aren't in the DB
      if (token.id && token.id !== "admin") {
        try {
          await connectDB();
          const dbUser = await User.findById(token.id);
          if (dbUser) {
            token.name = dbUser.name;
            token.phone = dbUser.phone; // Update phone from DB
          }
        } catch (error) {
          console.error("Error refreshing token:", error);
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };