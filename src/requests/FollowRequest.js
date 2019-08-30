// @flow
import BaseRequest from "./BaseRequest";

class FollowRequest extends BaseRequest {
  constructor(runId: number, init?: RequestOptions = {}) {
    super(`/follow/${runId}`, init);
  }
}

export default FollowRequest;
