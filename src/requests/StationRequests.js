// @flow
import BaseRequest from "./BaseRequest";

export class StationsRequest extends BaseRequest {
  constructor(url: string = "", init?: RequestOptions = {}) {
    super(`/stations${url}`, init);
  }
}

export class StationRequest extends StationsRequest {
  constructor(stationId: number, init?: RequestOptions = {}) {
    super(`/${stationId}`);
  }
}

export class StationArrivalsRequest extends StationsRequest {
  constructor(stationId: number, init?: RequestOptions = {}) {
    super(`/${stationId}/arrivals`);
  }
}

export class NearbyStationsRequest extends StationsRequest {
  constructor(
    params: {latitude: number, longitude: number, limit?: number},
    init?: RequestOptions = {}
  ) {
    const {latitude, longitude, limit} = params;
    const limitString = limit ? `&limit=${limit}` : "";
    super(`/nearby?latitude=${latitude}&longitude=${longitude}${limitString}`);
  }
}
