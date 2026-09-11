import { describe, expect, it } from "vitest";

import { requireAppSecret } from "~/util/app-auth.server";

function request(authorization?: string) {
  return new Request("https://slow.zone/api/v1/stations/41020/arrivals", {
    headers: authorization ? { Authorization: authorization } : {},
  });
}

async function rejection(fn: () => void): Promise<Response> {
  try {
    fn();
  } catch (thrown) {
    expect(thrown).toBeInstanceOf(Response);
    return thrown as Response;
  }
  throw new Error("expected requireAppSecret to throw");
}

describe("requireAppSecret", () => {
  it("accepts the configured secret", () => {
    expect(() =>
      requireAppSecret(request("Bearer test-app-secret")),
    ).not.toThrow();
  });

  it.each([
    ["no header", undefined],
    ["wrong value", "Bearer nope"],
    ["wrong value of the same length", "Bearer test-app-secreX"],
    ["wrong scheme", "Basic test-app-secret"],
    ["empty bearer", "Bearer "],
  ])("rejects %s with a 401", async (_label, authorization) => {
    const response = await rejection(() =>
      requireAppSecret(request(authorization)),
    );
    expect(response.status).toBe(401);
    expect(response.headers.get("WWW-Authenticate")).toBe("Bearer");
    expect(await response.json()).toEqual({
      error: {
        code: "unauthorized",
        message: "Missing or invalid app credential",
      },
    });
  });
});
