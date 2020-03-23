// @flow
import type {Line} from "./Line";

export type Stop = {|
  id: number,
  direction: "N" | "S" | "E" | "W",
  name: string,
  accessible: boolean,
  lines: Array<Line>,
|};
