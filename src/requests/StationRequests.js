// @flow
import {apiBaseUrl, revision} from "../config";

export class StationsRequest {
  constructor({url = ""}: {url?: string} = {}) {
    return new Request(`${apiBaseUrl}/stations/${url}`, {
      headers: {"SZ-Web-Revision": revision}
    });
  }
}

export class StationRequest extends StationsRequest {
  constructor({stationId}: {stationId: number}) {
    super({url: `/${stationId}`});
  }
}

export class NearbyStationsRequest extends StationsRequest {
  constructor({lat, lng}: {lat: number, lng: number}) {
    super({url: `/nearby?lat=${lat}&lng=${lng}`});
  }
}
