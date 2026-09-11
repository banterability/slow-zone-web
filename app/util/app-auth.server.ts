import { timingSafeEqual } from "node:crypto";

import invariant from "tiny-invariant";

const secret = process.env.SLOW_ZONE_APP_SECRET;
invariant(secret, "missing env var SLOW_ZONE_APP_SECRET");

/**
 * Throws a 401 Response unless the request carries the app's shared secret as a bearer token.
 * This is a speed bump, not a lock: the secret ships in the app binary. App Attest is the
 * planned replacement, behind this same function.
 */
export function requireAppSecret(request: Request): void {
  const header = request.headers.get("Authorization") ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";
  const a = Buffer.from(provided);
  const b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    throw Response.json(
      {
        error: {
          code: "unauthorized",
          message: "Missing or invalid app credential",
        },
      },
      { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
    );
  }
}
