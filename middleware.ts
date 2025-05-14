import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const AUTHORIZED_PARTIES =
  process.env.NODE_ENV == "production" || process.env.NODE_ENV == "test"
    ? ["https://greender.com"]
    : ["http://localhost:3000"];

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",
  "/",
]);

// Make sure that the `/api/webhooks/(.*)` route is not protected here
export default clerkMiddleware(
  async (auth, req) => {
    if (!isPublicRoute(req)) {
      await auth.protect();
    }
  },
  {
    authorizedParties: AUTHORIZED_PARTIES,
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
