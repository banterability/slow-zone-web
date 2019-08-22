// @flow
import BaseRequest from "./BaseRequest";

export class StationsRequest extends BaseRequest {
  constructor({url = ""}: {url?: string} = {}) {
    super({url: `/stations${url}`});
  }
}

export class StationRequest extends StationsRequest {
  constructor({stationId}: {stationId: number}) {
    super({url: `/${stationId}`});
  }
}

export class NearbyStationsRequest extends StationsRequest {
  constructor({latitude, longitude}: {latitude: number, longitude: number}) {
    super({url: `/nearby?latitude=${latitude}&longitude=${longitude}`});
  }
}
