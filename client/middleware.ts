import { NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware() {
    const session = await auth();

    if (!session) {
        return NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL as string);
    }
}

export const config = {
    matcher: ["/mypage"],
};
