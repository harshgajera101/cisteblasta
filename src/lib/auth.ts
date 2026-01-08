// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import connectDB from "@/lib/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         // 1. Admin Check
//         if (
//           credentials.email === process.env.ADMIN_EMAIL &&
//           credentials.password === process.env.ADMIN_PASSWORD
//         ) {
//           return { id: "admin", name: "Sister Admin", email: credentials.email, role: "admin" };
//         }

//         // 2. Customer Check
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
//               phone: user.phone 
//             };
//           }
//         }
//         return null;
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//         token.phone = user.phone;
//       }
//       // Refresh data from DB on every request to keep Profile <-> Admin in sync
//       if (token.id && token.id !== "admin") {
//         try {
//           await connectDB();
//           const dbUser = await User.findById(token.id);
//           if (dbUser) {
//             token.name = dbUser.name;
//             token.phone = dbUser.phone;
//           }
//         } catch (error) {
//           // Fallback to token data if DB fails
//         }
//       }
//       return token;
//     },
//     async session({ session, token }: any) {
//       if (session?.user) {
//         session.user.role = token.role;
//         session.user.phone = token.phone;
//         session.user.id = token.id;
//         // Ensure name comes from token (which is fresh from DB)
//         if (token.name) session.user.name = token.name;
//       }
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/login",
//   },
// };





import { NextAuthOptions } from "next-auth";
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
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.phone = user.phone;
      }
      // Refresh data from DB on every request (Fixes Profile Sync)
      if (token.id && token.id !== "admin") {
        try {
          await connectDB();
          const dbUser = await User.findById(token.id);
          if (dbUser) {
            token.name = dbUser.name;
            token.phone = dbUser.phone;
          }
        } catch (error) {
          // Fallback
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.phone = token.phone;
        session.user.id = token.id;
        if (token.name) session.user.name = token.name;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};