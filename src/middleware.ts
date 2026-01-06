import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // Only allow access if the user has the 'admin' role
      return token?.role === "admin";
    },
  },
});

export const config = {
  // FIX: We only protect the /admin/dashboard routes.
  // This prevents the middleware from blocking the /admin/login page.
  matcher: ["/admin/dashboard/:path*"],
};