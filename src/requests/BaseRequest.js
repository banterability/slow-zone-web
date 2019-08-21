// @flow
import {apiBaseUrl, revision} from "../config";

class BaseRequest {
  constructor({url = ""}: {url?: string} = {}) {
    return new Request(`${apiBaseUrl}${url}`, {
      headers: {"SZ-Web-Revision": revision}
    });
  }
}

export default BaseRequest;
