import type { Line } from "./line";

export type CachedStation = {
  id: number;
  lines: Line[];
  title: string;
};
