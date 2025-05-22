import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const AUTHORIZED_PARTIES =
  process.env.VERCEL_ENV === "production"
    ? ["https://greenderchat.com"]
    : process.env.VERCEL_ENV === "test"
      ? ["https://staging.greenderchat.com"] // For preview environment with no fixed domain
      : ["http://localhost:3000"]; // Default for development

const isPublicRoute = createRouteMatcher([
  "/api/webhooks(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/opengraph-image(.*)",
  "/twitter-image(.*)",
  "/about(.*)",
  "/blog(.*)",
  "/contact(.*)",
  "/privacy-policy(.*)",
  "/member(.*)",
  "/",
]);

export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    authorizedParties: AUTHORIZED_PARTIES,
    // debug: process.env.VERCEL_ENV !== "production",
  }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
