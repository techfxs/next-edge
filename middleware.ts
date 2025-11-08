import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Redirect example: redirect /old-path to /new-path
  if (url.pathname === "/old-path") {
    url.pathname = "/new-path";
    return NextResponse.redirect(url);
  }

  // Rewrite example: Serve /api/* requests from /api-v2/*
  if (url.pathname.startsWith("/api")) {
    url.pathname = url.pathname.replace("/api", "/api-v2");
    return NextResponse.rewrite(url);
  }

  // Default: continue with request
  return NextResponse.next();
}

// Optional: configure paths to run middleware on
export const config = {
  matcher: ["/old-path", "/api/:path*"],
};
