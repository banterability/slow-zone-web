import SlowZone from "slow-zone";
import invariant from "tiny-invariant";

const apiKey = process.env.CTA_API_KEY;
invariant(apiKey, "missing env var CTA_API_KEY");

export const client = new SlowZone({ apiKey });
