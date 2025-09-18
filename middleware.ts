import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes are "public" (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  "/", // Home page
  "/login(.*)", // Login route
  "/register(.*)", // Registration route
  "/book(.*)", // Booking route
]);

// Clerk middleware to protect routes
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

// Next.js middleware configuration
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
