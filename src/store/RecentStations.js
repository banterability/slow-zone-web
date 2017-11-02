/* @flow */

import MostRecentlyUsed from "./MostRecentlyUsed";
import {STATION_LIST_KEY} from "./constants";

export const getRecentStations = (): Array => {
  return new MostRecentlyUsed(STATION_LIST_KEY).get();
};

export const pushStation = (stationId: string, station: object): Array => {
  const stationList = new MostRecentlyUsed(STATION_LIST_KEY);
  stationList.push(stationId, station);
};
