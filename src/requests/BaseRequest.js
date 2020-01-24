// @flow
import uuid from "uuid/v4";

class BaseRequest extends Request {
  constructor(url: string, options?: RequestOptions = {}) {
    const headers = {
      ...options.headers,
      "Request-Id": uuid()
    };

    super(`/api${url}`, {
      ...options,
      ...{headers}
    });
  }
}

export default BaseRequest;
