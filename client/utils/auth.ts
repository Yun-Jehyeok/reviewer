import { jwtVerify, SignJWT } from "jose";

export async function verifyToken(token: string) {
    if (!token) throw new Error("No token provided");

    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

        return payload;
    } catch (error) {
        throw new Error("Invalid token");
    }
}

export async function createToken(payload: any) {
    try {
        const token = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1d")
            .setIssuedAt()
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));

        return token;
    } catch (error) {
        throw new Error("Token creation failed");
    }
}

export function parseToken(token: string) {
    try {
        const base64Payload = token.split(".")[1];
        const payload = JSON.parse(atob(base64Payload));
        return payload;
    } catch (error) {
        return null;
    }
}
