// @flow
import BaseRequest from "./BaseRequest";

type StationId = number | string;

export class StationsRequest extends BaseRequest {
  constructor(url: string = "", init?: RequestOptions = {}) {
    super(`/stations${url}`, init);
  }
}

export class StationRequest extends StationsRequest {
  constructor(stationId: StationId, init?: RequestOptions = {}) {
    super(`/${stationId}`);
  }
}

export class StationArrivalsRequest extends StationsRequest {
  constructor(stationId: StationId, init?: RequestOptions = {}) {
    super(`/${stationId}/arrivals`);
  }
}
