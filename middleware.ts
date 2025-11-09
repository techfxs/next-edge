import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

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
    return NextResponse.rewrite("https://nx-proto-mw-pdp.vercel.app/");
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.rewrite("https://nx-proto-mw-home.vercel.app/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/product", "/_next/:path*", "/old-path", "/api/:path*"],
};
