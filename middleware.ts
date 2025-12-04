import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function parseAuthCookie(cookieValue: string | undefined) {
  if (!cookieValue) return null;
  try {
    return JSON.parse(decodeURIComponent(cookieValue));
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("auth")?.value;
  const auth = parseAuthCookie(authCookie);
  const isLoggedIn =
    !!auth?.session?.accessToken &&
    !!auth?.session?.id &&
    !!auth?.user?.id;

  // If user is already logged in, prevent access to public auth pages
  const authPages = ["/login", "/forgot-password", "/set-password", "/otp"];
  if (isLoggedIn && authPages.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // Protect dashboard routes when not logged in
  if (!isLoggedIn && pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/forgot-password", "/set-password", "/otp", "/dashboard/:path*"],
};


