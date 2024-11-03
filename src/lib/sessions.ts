import "server-only";
import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error("SESSION_SECRET is not defined in environment variables.");
}
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days expiration

  const session = await encrypt({ userId, expiresAt });

  // Await cookies to get ReadonlyRequestCookies
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: new Date(expiresAt * 1000), // UNIX timestamp to Date object
  });
}

export async function deleteSession() {
  const cookieStore = await cookies(); // Await to get cookies
  cookieStore.delete("session");
}

type SessionPayload = {
  userId: string;
  expiresAt: number;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload as JWTPayload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(payload.expiresAt)
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    if (!payload.userId || !payload.expiresAt) {
      throw new Error("Invalid session payload.");
    }

    const sessionPayload = {
      userId: payload.userId as string,
      expiresAt: payload.expiresAt as number,
    };

    if (Date.now() / 1000 > sessionPayload.expiresAt) {
      return null;
    }

    return sessionPayload;
  } catch (error) {
    console.error("Failed to decrypt session:", error);
    return null;
  }
}
