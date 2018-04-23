// @flow
import type {Line} from "./Line";

export type RecentStation = {
  key: ?number,
  lines: Array<Line>,
  pathname: string,
  title: string
};
