/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"; // ✅ Import JWT for manual verification

const roleRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ["/admin", "/admin/dashboard"],
  COLLEGE: ["/college", "/college/dashboard"],
  DEPARTMENT: ["/department", "/department/dashboard"],
  HOD: ["/hod", "/hod/dashboard"],
  FACULTY: ["/faculty", "/faculty/dashboard"],
  STUDENT: ["/student", "/student/dashboard"],
};

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ✅ Allow public routes (Improved to allow /auth/* sub-routes)
  const publicRoutes = [
    "/",
    "/auth",
    "/auth/login",
    "/auth/superadmin",
    "/auth/college",
    "/auth/department",
    "/auth/hod",
    "/auth/faculty",
    "/auth/student",
  ];
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // ✅ Extract Bearer Token from Authorization Header
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized - No token provided" }, { status: 401 });
  }

  // ✅ Get the token from the header
  const token = authHeader.split(" ")[1];

  // ✅ Verify JWT token
  let decodedToken  : any;
  try {
    decodedToken = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  // ✅ Ensure the user has a valid role
  const userRole: any = decodedToken.role || "UNKNOWN";

  // ✅ Check if the user has access to the requested route
  const allowedRoutes = roleRoutes[userRole] || [];
  if (!allowedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.json({ error: "Forbidden - Access denied" }, { status: 403 });
  }

  return NextResponse.next(); // ✅ Allow request to proceed
}

// ✅ Apply middleware only to protected routes
export const config = {
  matcher: [
    "/admin/:path*",
    "/college/:path*",
    "/department/:path*",
    "/hod/:path*",
    "/faculty/:path*",
    "/student/:path*",
    "/api/admin/:path*", // ✅ Secure API routes for admin
    "/api/college/:path*", // ✅ Secure API routes for colleges
  ],
};
