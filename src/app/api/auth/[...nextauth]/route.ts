import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Check if inputs exist
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 2. Verify against Environment Variables
        const isValidUser = 
          credentials.email === process.env.ADMIN_EMAIL &&
          credentials.password === process.env.ADMIN_PASSWORD;

        if (isValidUser) {
          // 3. Return the Admin User object
          return { 
            id: "1", 
            name: "Admin Sister", 
            email: credentials.email,
            role: "admin" 
          };
        }

        return null; // Login failed
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // Custom login page path
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) (session.user as any).role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };