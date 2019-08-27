// @flow
import {apiBaseUrl} from "../config";

class BaseRequest {
  constructor({url = ""}: {url?: string} = {}) {
    return new Request(`${apiBaseUrl}${url}`);
  }
}

export default BaseRequest;
