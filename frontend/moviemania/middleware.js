import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const unprotectedRoutes = ["/login", "/signup"];

export async function middleware(request) {
	const token = await getToken({ req: request });

	const pathname = request.nextUrl.pathname;

	if (pathname == "/movie") {
		const absoluteURL = new URL(`/`, request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}

	if (!token && !unprotectedRoutes.includes(pathname)) {
		const absoluteURL = new URL(`/login`, request.nextUrl.origin);
		return NextResponse.redirect(absoluteURL.toString());
	}
}

export const config = {
	matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
