// @flow
import type {Distance} from "./Distance";
import type {Line} from "./Line";
import type {Location} from "./Location";
import type {Stop} from "./Stop";

export type Station = {|
  name: string,
  description: string,
  distance?: Distance,
  id: number,
  location: Location,
  stops: Array<Stop>,
  lines: Array<Line>,
  accessible: boolean,
  url: ?string
|};
