import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse;

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const session = req.cookies.get("session");
    if (!session) {
      return res.redirect(new URL("/", req.url));
    }
  }

  const isSesionActive = req.cookies.get("session");
  if (!isSesionActive) {
    return res.redirect(new URL("/", req.url));
  } else {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/folders/:path*",
    "/links/:path*",
    "/settings/:path*",
    "/profile/:path*",
    "/api/folders/:path*",
    "/api/links/:path*",
    "/api/settings/:path*",
    "/api/profile/:path*",
  ],
};
