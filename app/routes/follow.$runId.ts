import invariant from "tiny-invariant";

import { client } from "~/util/slow-zone.server";

import type { Route } from "./+types/follow.$runId";
import type { Arrival } from "~/types/arrival";

export async function loader({ params }: Route.LoaderArgs) {
  const { runId } = params;
  invariant(runId, "runId is required");

  try {
    const arrivals = (await client.followTrain(runId)) as Arrival[];
    return { arrivals, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    return { arrivals: [], error: message };
  }
}
