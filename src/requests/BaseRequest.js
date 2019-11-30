// @flow
class BaseRequest extends Request {
  constructor(url: string, init?: RequestOptions = {}) {
    super(`/api${url}`, init);
  }
}

export default BaseRequest;
