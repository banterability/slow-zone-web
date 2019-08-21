// @flow
import BaseRequest from "./BaseRequest";

class FollowRequest extends BaseRequest {
  constructor({runId}: {runId: number}) {
    super({url: `/follow/${runId}`});
  }
}

export default FollowRequest;
