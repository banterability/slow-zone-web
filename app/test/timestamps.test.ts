import { describe, expect, it } from "vitest";

import { client } from "~/util/slow-zone.server";

import { stubCTA } from "./cta-stub";
import loganSquare from "./fixtures/cta/arrivals-41020-logan-square.json";

function withTimes(prdt: string, arrT: string) {
  const [first] = loganSquare.ctatt.eta;
  return { ctatt: { ...loganSquare.ctatt, eta: [{ ...first, prdt, arrT }] } };
}

/**
 * CTA timestamps are Chicago wall-clock with no zone marker, and slow-zone builds Dates in the
 * process zone. With TZ=America/Chicago they come out as the right instants in both CDT and CST.
 */
describe("timestamps", () => {
  it("runs the tests in Chicago's zone", () => {
    expect(process.env.TZ).toBe("America/Chicago");
    expect(new Date(2026, 0, 15, 8).toISOString()).toBe(
      "2026-01-15T14:00:00.000Z",
    );
  });

  it.each([
    ["CDT", "2026-09-10T17:14:02", "2026-09-10T22:14:02.000Z"],
    ["CST", "2026-01-15T08:00:00", "2026-01-15T14:00:00.000Z"],
  ])(
    "serializes a %s wall-clock time as the right instant",
    async (_zone, wallClock, instant) => {
      stubCTA({ body: withTimes(wallClock, wallClock) });
      const [arrival] = await client.getArrivalsForStation(41020);
      expect(
        JSON.parse(JSON.stringify(arrival)).prediction.predictionTime,
      ).toBe(instant);
    },
  );

  it("sends the request to the CTA arrivals endpoint", async () => {
    const { calls } = stubCTA({ body: loganSquare });
    await client.getArrivalsForStation(41020);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatch(
      /^https:\/\/lapi\.transitchicago\.com\/api\/1\.0\/ttarrivals\.aspx\?/,
    );
    expect(calls[0]).toContain("mapid=41020");
  });
});
