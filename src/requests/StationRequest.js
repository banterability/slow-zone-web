class StationRequest {
  constructor({url = "", ...init} = {}) {
    return new Request(
      `${process.env.REACT_APP_API_BASE_URL}/stations${url}`,
      init
    );
  }
}

export default StationRequest;
