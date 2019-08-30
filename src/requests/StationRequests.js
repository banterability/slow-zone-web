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

export class StationArrivalsRequest extends StationsRequest {
  constructor({stationId}: {stationId: number}) {
    super({url: `/${stationId}/arrivals`});
  }
}

export class NearbyStationsRequest extends StationsRequest {
  constructor({
    latitude,
    longitude,
    limit
  }: {
    latitude: number,
    longitude: number,
    limit?: number
  }) {
    const limitParam = limit ? `&limit=${limit}` : "";
    super({
      url: `/nearby?latitude=${latitude}&longitude=${longitude}${limitParam}`
    });
  }
}
