// @flow
import BaseRequest from "./BaseRequest";

class NearbyRequest extends BaseRequest {
  constructor(
    params: {latitude: number, longitude: number, count?: number},
    init?: RequestOptions = {}
  ) {
    const {latitude, longitude, count} = params;
    const countString = count ? `&count=${count}` : "";

    super(`/nearby?latitude=${latitude}&longitude=${longitude}${countString}`);
  }
}

export default NearbyRequest;
