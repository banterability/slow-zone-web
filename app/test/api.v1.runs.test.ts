import { describe, expect, it, vi } from "vitest";

import { loader } from "~/routes/api.v1.runs.$runNumber";

import { authorized, call } from "./api-helpers";
import { stubCTA } from "./cta-stub";
import badRun from "./fixtures/cta/error-bad-run.json";
import followRun from "./fixtures/cta/follow-run-222.json";

vi.mock("@sentry/react-router", () => ({ captureException: vi.fn() }));

function run(runNumber: string, headers: HeadersInit = authorized) {
  return call(
    loader,
    `https://slow.zone/api/v1/runs/${runNumber}`,
    { runNumber },
    headers,
  );
}

describe("GET /api/v1/runs/:runNumber", () => {
  it("requires the app secret", async () => {
    stubCTA({ body: followRun });
    expect((await run("222", {})).status).toBe(401);
  });

  it("returns the followed train's remaining stops", async () => {
    const { calls } = stubCTA({ body: followRun });
    const response = await run("222");
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(calls[0]).toMatch(/ttfollow\.aspx\?.*runnumber=222/);

    const body = await response.json();
    expect(body.arrivals).toHaveLength(9);
    expect(body.arrivals[0].route.id).toBe("Blue Line");
    expect(body.arrivals[0].station.name).toBe("Belmont");
    expect(typeof body.fetchedAt).toBe("string");
  });

  it("maps CTA error 501 to 404 run_not_found", async () => {
    stubCTA({ body: badRun });
    const response = await run("99999");
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({
      error: {
        code: "run_not_found",
        message: "No trains with that run number",
      },
    });
  });

  it.each(["abc", "-1", "0", "1.5", "", "222 "])(
    "rejects run number %j with 400 invalid_run",
    async (runNumber) => {
      const { calls } = stubCTA({ body: followRun });
      const response = await run(runNumber);
      expect(response.status).toBe(400);
      expect((await response.json()).error.code).toBe("invalid_run");
      expect(calls).toHaveLength(0);
    },
  );
});
