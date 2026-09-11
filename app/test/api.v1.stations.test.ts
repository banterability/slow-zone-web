import { describe, expect, it } from "vitest";

import stationsFile from "~/data/stations.json";
import { loader } from "~/routes/api.v1.stations";

import { call } from "./api-helpers";

const url = "https://slow.zone/api/v1/stations";

describe("GET /api/v1/stations", () => {
  it("returns the bundled station data with an ETag and cache headers", async () => {
    const response = await call(loader, url, {});
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    expect(response.headers.get("ETag")).toMatch(/^"[0-9a-f]{16}"$/);
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    );
    expect(await response.json()).toEqual(stationsFile);
  });

  it("answers a matching If-None-Match with an empty 304", async () => {
    const first = await call(loader, url, {});
    const etag = first.headers.get("ETag")!;
    const response = await call(loader, url, {}, { "If-None-Match": etag });
    expect(response.status).toBe(304);
    expect(response.headers.get("ETag")).toBe(etag);
    expect(response.headers.get("Cache-Control")).toBe(
      first.headers.get("Cache-Control"),
    );
    expect(await response.text()).toBe("");
  });

  it("matches an ETag anywhere in a list", async () => {
    const etag = (await call(loader, url, {})).headers.get("ETag")!;
    const response = await call(
      loader,
      url,
      {},
      { "If-None-Match": `"stale", ${etag}` },
    );
    expect(response.status).toBe(304);
  });

  it("serves a full response for a stale ETag", async () => {
    const response = await call(
      loader,
      url,
      {},
      { "If-None-Match": '"0000000000000000"' },
    );
    expect(response.status).toBe(200);
  });
});
