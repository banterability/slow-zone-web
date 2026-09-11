import { EventEmitter } from "node:events";
import https from "node:https";
import { syncBuiltinESMExports } from "node:module";
import { PassThrough } from "node:stream";

import { afterEach, vi } from "vitest";

type Reply = {
  statusCode?: number;
  body?: unknown;
  rawBody?: string;
  networkError?: Error;
};

/**
 * Stubs the CTA Train Tracker API underneath slow-zone, which calls `request` from `node:https`.
 * Replacing the property on the module object and syncing the ESM bindings makes slow-zone's
 * named import see the stub without transforming node_modules.
 */
export function stubCTA(reply: Reply): { calls: string[] } {
  const calls: string[] = [];
  vi.spyOn(https, "request").mockImplementation(((
    options: https.RequestOptions,
    callback: (res: PassThrough & { statusCode: number }) => void,
  ) => {
    calls.push(`https://${options.hostname}${options.path}`);
    const req = new EventEmitter() as EventEmitter & { end: () => void };
    req.end = () => {
      if (reply.networkError) {
        req.emit("error", reply.networkError);
        return;
      }
      const res = Object.assign(new PassThrough(), {
        statusCode: reply.statusCode ?? 200,
      });
      callback(res);
      res.end(reply.rawBody ?? JSON.stringify(reply.body));
    };
    return req;
  }) as unknown as typeof https.request);
  syncBuiltinESMExports();
  return { calls };
}

afterEach(() => {
  vi.restoreAllMocks();
  syncBuiltinESMExports();
});
