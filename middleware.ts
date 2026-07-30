import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, event: NextFetchEvent): NextMiddlewareResult | Promise<NextMiddlewareResult> {
  const ua = req.headers.get("user-agent") || "";

  if (
    ua.includes("bot") ||
    ua.includes("crawler") ||
    ua.includes("spider") ||
    ua.includes("scraper") ||
    ua.includes("python-requests") ||
    ua.includes("axios") ||
    ua.includes("curl") ||
    ua.includes("GoogleOther") ||
    ua.includes("Java") ||
    ua.includes("Go-http-client")
  ) {
    return NextResponse.redirect("/");
  }

  if (!ua.trim()) {
    return NextResponse.redirect("/");
  }

  if (ua.includes("SemrushBot") || ua.includes("AhrefsBot")) {
    return NextResponse.redirect("/");
  }

  const ip = req.headers.get("x-forwarded-for") || "unknown";

  const now = Date.now();
  const windowMs = 10_000; // 10 seconds
  const maxRequests = 20;  // per IP per window

  (globalThis as any).rateLimitStore ||= new Map();

  const entry = (globalThis as any).rateLimitStore.get(ip) || { count: 0, start: now };

  if (now - entry.start < windowMs) {
    entry.count++;
    if (entry.count > maxRequests) {
      return NextResponse.redirect("/");
    }
  } else {
    entry.count = 1;
    entry.start = now;
  }

  (globalThis as any).rateLimitStore.set(ip, entry);

  return clerkMiddleware()(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
