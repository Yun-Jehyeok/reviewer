import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const publicPath = ["/register", "/findpw", "/findemail"];

export function middleware(request: NextRequest, response: NextResponse) {
    const cookies = request.cookies;
    const token = cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (publicPath.includes(pathname)) {
        if (token) return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}
