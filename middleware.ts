import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isApi = nextUrl.pathname.startsWith("/api/survey"); 

  if ((isDashboard || isApi) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }
  
  return NextResponse.next();
});

export const config = {

  matcher: ["/dashboard/:path*", "/api/survey/:path*"],
};