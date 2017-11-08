/* @flow */

import MostRecentlyUsed from "./MostRecentlyUsed";
import {STATION_LIST_KEY} from "./constants";
import type {RecentStation} from "../types";

export const getRecentStations = (): Array<RecentStation> =>
  new MostRecentlyUsed(STATION_LIST_KEY).get();

export const pushStation = (stationId: string, station: RecentStation) => {
  const stationList = new MostRecentlyUsed(STATION_LIST_KEY);
  stationList.push(stationId, station);
};
