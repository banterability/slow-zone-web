import { describe, expect, it } from "vitest";

import { client } from "~/util/slow-zone.server";

import { stubCTA } from "./cta-stub";
import loganSquare from "./fixtures/cta/arrivals-41020-logan-square.json";

describe("stubCTA", () => {
  it("answers slow-zone's request to the CTA arrivals endpoint", async () => {
    const { calls } = stubCTA({ body: loganSquare });
    const arrivals = await client.getArrivalsForStation(41020);
    expect(arrivals).toHaveLength(17);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatch(
      /^https:\/\/lapi\.transitchicago\.com\/api\/1\.0\/ttarrivals\.aspx\?/,
    );
    expect(calls[0]).toContain("mapid=41020");
  });
});
