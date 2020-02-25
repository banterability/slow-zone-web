// @flow
import {v4 as uuidv4} from "uuid";

class BaseRequest extends Request {
  constructor(url: string, options?: RequestOptions = {}) {
    const headers = {
      ...options.headers,
      "Request-Id": uuidv4()
    };

    super(`/api${url}`, {
      ...options,
      ...{headers}
    });
  }
}

export default BaseRequest;
