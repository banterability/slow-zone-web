/* @flow */

import type {Line} from "./Line";
import type {Location} from "./Location";
import type {Stop} from "./Stop";

export type Station = {
  name: string,
  description: string,
  id: number,
  location: Location,
  stops: Array<Stop>,
  lines: Array<Line>,
  accessible: boolean
};
