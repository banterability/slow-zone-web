/* @flow */

class StationRequest {
  constructor({url = "", ...init}: {url?: string} = {}) {
    return new Request(
      `${process.env.REACT_APP_API_BASE_URL}/stations${url}`,
      init
    );
  }
}

export default StationRequest;
