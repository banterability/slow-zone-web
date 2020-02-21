import geolib from 'geolib';
import { NowRequest, NowResponse } from '@now/node';

import {findStation, STATION_LOCATIONS} from './_stationCache';

const getNearbyStations = (req: NowRequest, res: NowResponse) => {
  let {count, latitude, longitude} = req.query;

  if (!latitude && !longitude) {
    return res.status(400).json({
      error: {
        message: "missing required parameters"
      }
    });
  }

  const userLocation = {
    latitude: <string>latitude,
    longitude: <string>longitude
  };

  const nearestStations = geolib
    .orderByDistance(userLocation, STATION_LOCATIONS)
    .slice(0, count || 5)
    .map(result => {
      const station = findStation(result.stationId);
      const distance = geolib.getDistance(station.location, userLocation);

      return {
        ...station,
        distance: {
          feet: geolib.convertDistance(distance, "ft"),
          miles: geolib.convertDistance(distance, "mi")
        }
      };
    });

  res.send({data: nearestStations, error: null});
}

export default getNearbyStations;