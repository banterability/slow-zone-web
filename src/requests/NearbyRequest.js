// @flow
import BaseRequest from "./BaseRequest";

class NearbyRequest extends BaseRequest {
  constructor(
    params: {latitude: number, longitude: number, limit?: number},
    init?: RequestOptions = {}
  ) {
    const {latitude, longitude, limit} = params;
    const limitString = limit ? `&limit=${limit}` : "";
    super(`/nearby?latitude=${latitude}&longitude=${longitude}${limitString}`);
  }
}

export default NearbyRequest;
