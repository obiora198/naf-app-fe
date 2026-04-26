import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isProtected = nextUrl.pathname.startsWith("/dashboard") || nextUrl.pathname.startsWith("/admin");
      const isAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isProtected) {
        if (!isLoggedIn) return false; // Redirect to login

        // Special check for admin routes
        if (isAdminRoute) {
          const userRole = (auth.user as { role?: string })?.role;
          if (userRole !== "admin" && userRole !== "superadmin") {
            return Response.redirect(new URL("/dashboard/bookings", nextUrl));
          }
        }
      }
      return true;
    },
  },
  providers: [], // Add empty providers array to satisfy NextAuthConfig; we'll add them in auth.ts
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
