import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/", "/preferences", "/profile"];

export async function middleware(request) {
  const token = await getToken({ req: request });

  const pathname = request.nextUrl.pathname;

  if (!token && protectedRoutes.includes(pathname)) {
    const absoluteURL = new URL(`/login`, request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
