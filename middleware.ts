import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Redirect example: redirect /old-path to /new-path
  // if (url.pathname === "/old-path") {
  //   url.pathname = "/new-path";
  //   return NextResponse.redirect(url);
  // }

  // Redirect /_next assets to different origin based on referrer
  if (url.pathname.startsWith("/_next")) {
    const referer = request.headers.get("referer") || "";
    const refererUrl = referer ? new URL(referer) : null;
    const isProductPage = refererUrl?.pathname.startsWith("/product");

    const origin = isProductPage
      ? "https://nx-proto-mw-pdp.vercel.app"
      : "https://nx-proto-mw-home.vercel.app";

    const targetUrl = new URL(url.pathname, origin);
    targetUrl.search = url.search; // Preserve query parameters
    return NextResponse.rewrite(targetUrl);
  }

  if (url.pathname.startsWith("/product")) {
    console.log(url);
    return NextResponse.rewrite("https://nx-proto-mw-pdp.vercel.app/");
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.rewrite("https://nx-proto-mw-home.vercel.app/");
  }

  // Default: continue with request
  return NextResponse.next();
}

// Optional: configure paths to run middleware on
export const config = {
  matcher: ["/", "/product", "/_next/:path*", "/old-path", "/api/:path*"],
};
