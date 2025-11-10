import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (url.pathname.startsWith("/_next")) {
    const referer = request.headers.get("referer") || "";
    const refererUrl = referer ? new URL(referer) : null;
    const isProductPage = refererUrl?.pathname.startsWith("/product");
    const isCheckoutPage = refererUrl?.pathname.startsWith("/checkout");
    const isCartPage = refererUrl?.pathname.startsWith("/cart");

    let origin = "https://mw-mono-storefront.vercel.app/";
    if (isProductPage) {
      origin = "https://mw-mono-product.vercel.app/";
    } else if (isCheckoutPage) {
      origin = "https://mw-mono-checkout.vercel.app/"; // Update with your checkout origin
    } else if (isCartPage) {
      origin = "https://mw-mono-cart.vercel.app/"; // Update with your cart origin
    }

    const targetUrl = new URL(url.pathname, origin);
    targetUrl.search = url.search; // Preserve query parameters
    return NextResponse.rewrite(targetUrl);
  }

  if (url.pathname.startsWith("/checkout")) {
    return NextResponse.rewrite("https://mw-mono-checkout.vercel.app/"); // Update with your checkout origin
  }

  if (url.pathname.startsWith("/cart")) {
    return NextResponse.rewrite("https://mw-mono-cart.vercel.app/"); // Update with your cart origin
  }

  if (url.pathname.startsWith("/product")) {
    return NextResponse.rewrite("https://mw-mono-product.vercel.app/");
  }

  if (url.pathname.startsWith("/")) {
    return NextResponse.rewrite("https://mw-mono-storefront.vercel.app/");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/product/:path*",
    "/checkout/:path*",
    "/cart/:path*",
    "/_next/:path*",
    "/api/:path*",
  ],
};
