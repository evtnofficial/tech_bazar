import { NextResponse } from "next/server";

export function middleware(request) {
	const path = request.nextUrl.pathname;

	// Check if the path is for admin routes
	const isAdminRoute = path.startsWith("/admin");

	// In a real application, you would check the user's session or JWT token
	// to determine if they are authenticated and their role
	const isAuthenticated = true; // Replace with actual authentication check
	const userRole = "admin"; // Replace with actual role check

	if (isAdminRoute && (!isAuthenticated || userRole !== "admin")) {
		// Redirect to login page or show an error
		return NextResponse.redirect(new URL("/login", request.url));
	}

	// Allow the request to continue
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*", "/profile/:path*"],
};
