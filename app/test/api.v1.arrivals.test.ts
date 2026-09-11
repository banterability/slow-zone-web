import { captureException } from "@sentry/react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { loader } from "~/routes/api.v1.stations_.$stationId.arrivals";

import { authorized, call } from "./api-helpers";
import { stubCTA } from "./cta-stub";
import loganSquare from "./fixtures/cta/arrivals-41020-logan-square.json";
import badKey from "./fixtures/cta/error-bad-key.json";
import badMapid from "./fixtures/cta/error-bad-mapid.json";

vi.mock("@sentry/react-router", () => ({ captureException: vi.fn() }));

function arrivals(stationId: string, headers: HeadersInit = authorized) {
  return call(
    loader,
    `https://slow.zone/api/v1/stations/${stationId}/arrivals`,
    { stationId },
    headers,
  );
}

describe("GET /api/v1/stations/:stationId/arrivals", () => {
  beforeEach(() => {
    vi.mocked(captureException).mockClear();
  });

  it("requires the app secret", async () => {
    const { calls } = stubCTA({ body: loganSquare });
    const response = await arrivals("41020", {});
    expect(response.status).toBe(401);
    expect(calls).toHaveLength(0);
  });

  it("returns slow-zone's arrivals with a fetch time and no caching", async () => {
    const { calls } = stubCTA({ body: loganSquare });
    const before = Date.now();
    const response = await arrivals("41020");
    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(calls[0]).toContain("mapid=41020");

    const body = await response.json();
    expect(body.arrivals).toHaveLength(17);
    expect(body.arrivals[0].route).toEqual({
      class: "blue",
      directionId: 1,
      id: "Blue",
      name: "Blue",
      run: 222,
    });
    expect(body.arrivals[0].status.approaching).toBe(true);
    const fetchedAt = Date.parse(body.fetchedAt);
    expect(fetchedAt).toBeGreaterThanOrEqual(before - 1000);
    expect(fetchedAt).toBeLessThanOrEqual(Date.now() + 1000);
  });

  it.each(["99999", "abc", "41020x", ""])(
    "rejects unknown station %j without calling the CTA",
    async (stationId) => {
      const { calls } = stubCTA({ body: loganSquare });
      const response = await arrivals(stationId);
      expect(response.status).toBe(404);
      expect((await response.json()).error.code).toBe("station_not_found");
      expect(calls).toHaveLength(0);
      expect(captureException).not.toHaveBeenCalled();
    },
  );

  it("maps CTA error 103 to a 404 without reporting it", async () => {
    stubCTA({ body: badMapid });
    const response = await arrivals("41020");
    expect(response.status).toBe(404);
    expect((await response.json()).error.code).toBe("station_not_found");
    expect(captureException).not.toHaveBeenCalled();
  });

  it("maps CTA error 101 to a 502 that hides the CTA message and reports it", async () => {
    stubCTA({ body: badKey });
    const response = await arrivals("41020");
    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body.error.code).toBe("upstream_error");
    expect(JSON.stringify(body)).not.toContain("Invalid API key");
    expect(captureException).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["a network failure", { networkError: new Error("ECONNRESET") }],
    ["a non-JSON body", { rawBody: "<html>maintenance</html>" }],
    ["an HTTP 503", { statusCode: 503, body: {} }],
  ])(
    "maps %s to 502 upstream_unavailable and reports it",
    async (_label, reply) => {
      stubCTA(reply);
      const response = await arrivals("41020");
      expect(response.status).toBe(502);
      expect((await response.json()).error.code).toBe("upstream_unavailable");
      expect(captureException).toHaveBeenCalledTimes(1);
    },
  );
});
