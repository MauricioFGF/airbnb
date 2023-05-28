import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const initialPaths = [
    "/",
    "/trips",
    "/reservations",
    "/properties",
    "/favorites",
    "/listings",
  ];
  const routeInitialPath = "/" + request.nextUrl.pathname.split("/")[1];
  if (!initialPaths.includes(routeInitialPath)) {
    const url = request.nextUrl.clone();
    url.pathname = `/notFound`;
    return NextResponse.rewrite(url);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
