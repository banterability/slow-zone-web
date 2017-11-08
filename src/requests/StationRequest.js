/* @flow */

import {apiBaseUrl} from "../config";

class StationRequest {
  constructor({url = "", ...init}: {url?: string} = {}) {
    return new Request(`${apiBaseUrl}/stations${url}`, init);
  }
}

export default StationRequest;
