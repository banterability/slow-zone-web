// @flow
import {apiBaseUrl} from "../config";

class StationRequest {
  constructor({url = ""}: {url?: string} = {}) {
    return new Request(`${apiBaseUrl}/stations${url}`);
  }
}

export default StationRequest;
