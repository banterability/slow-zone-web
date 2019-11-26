// @flow
import type {Line} from "./Line";

export type RecentStation = {|
  lines: Array<Line>,
  pathname: string,
  title: string
|};
