import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Redirect example: redirect /old-path to /new-path
  // if (url.pathname === "/old-path") {
  //   url.pathname = "/new-path";
  //   return NextResponse.redirect(url);
  // }

  if (url.pathname.startsWith("/product")) {
    console.log(url);
    return NextResponse.rewrite("https://nx-proto-mw-pdp.vercel.app/");
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.rewrite("https://nx-proto-mw-home.vercel.app/");
  }

  // Rewrite example: Serve /api/* requests from /api-v2/*
  if (url.pathname.startsWith("/")) {
    url.pathname = url.pathname.replace("/api", "/api-v2");
    return NextResponse.rewrite(url);
  }

  // Default: continue with request
  return NextResponse.next();
}

// Optional: configure paths to run middleware on
export const config = {
  matcher: ["/", "/product", "/old-path", "/api/:path*"],
};
