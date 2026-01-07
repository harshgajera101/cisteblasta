// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Admin Login",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         // 1. Check if inputs exist
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         // 2. Verify against Environment Variables
//         const isValidUser = 
//           credentials.email === process.env.ADMIN_EMAIL &&
//           credentials.password === process.env.ADMIN_PASSWORD;

//         if (isValidUser) {
//           // 3. Return the Admin User object
//           return { 
//             id: "1", 
//             name: "Admin Sister", 
//             email: credentials.email,
//             role: "admin" 
//           };
//         }

//         return null; // Login failed
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/admin/login", // Custom login page path
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.role = (user as any).role;
//       return token;
//     },
//     async session({ session, token }) {
//       if (session?.user) (session.user as any).role = token.role;
//       return session;
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// });

// export { handler as GET, handler as POST };





import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Check for Admin (Hardcoded in ENV) - Priority
        if (
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "admin", name: "Sister Admin", email: credentials.email, role: "admin" };
        }

        // 2. Check for Customer (Database)
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
              // We pass phone so we can use it in the Cart later!
              phone: user.phone 
            };
          }
        }

        return null; // Login failed
      },
    }),
  ],
  callbacks: {
    // This allows us to access the 'role' and 'phone' in the frontend
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role;
        token.phone = user.phone;
        token.id = user.id;
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
    signIn: "/login", // We will create this page next
  },
});

export { handler as GET, handler as POST };