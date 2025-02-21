import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";
 
export async function middleware(request: NextRequest) {
	const sessionCookie = getSessionCookie(request); // Optionally pass config as the second argument if cookie name or prefix is customized.
	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/sign-in", request.url));
	}
	return NextResponse.next();
}
 
export const config = {
	matcher: ["/home"], // Specify the routes the middleware applies to
};