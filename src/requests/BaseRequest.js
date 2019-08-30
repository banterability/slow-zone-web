// @flow
import {apiBaseUrl} from "../config";

class BaseRequest extends Request {
  constructor(url: string, init?: RequestOptions = {}) {
    super(`${apiBaseUrl}${url}`, init);
  }
}

export default BaseRequest;
