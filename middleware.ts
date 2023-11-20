import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/",
  },
});

export const config = {
  matcher: [
    "/profiles/:path*",
    "/movies",
    "/series",
    "/search/:path*",
    "/favlist",
    "/streammovie/:path*",
    "/streamtv/:path*",
  ],
};
