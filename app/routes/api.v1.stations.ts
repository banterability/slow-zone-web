import { createHash } from "node:crypto";

import { cacheHeader } from "pretty-cache-header";

import stationsFile from "~/data/stations.json";

import type { Route } from "./+types/api.v1.stations";

const body = JSON.stringify(stationsFile);
const etag = `"${createHash("sha256").update(body).digest("hex").slice(0, 16)}"`;
const headers = {
  ETag: etag,
  "Cache-Control": cacheHeader({
    public: true,
    maxAge: "5m",
    sMaxage: "1h",
    staleWhileRevalidate: "1d",
  }),
};

export function loader({ request }: Route.LoaderArgs) {
  const ifNoneMatch = (request.headers.get("If-None-Match") ?? "")
    .split(",")
    .map((tag) => tag.trim());
  if (ifNoneMatch.includes(etag)) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(body, {
    status: 200,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}
