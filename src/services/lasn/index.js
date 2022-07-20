const { LasnServiceClient, LasnServicePromiseClient } = require('../../../protos/lasn/v1/lasn_grpc_web_pb');
const { SubscribeRequest, LinkRequest, DisconnectRequest } = require('../../../protos/lasn/v1/lasn_pb');


export const getLasnServiceClient = () => {
  return new LasnServicePromiseClient('http://localhost:8080', null, null); // TODO: Make env variable
}

export const getLasnStream = (lasnService, userId) => {
  const subscribeRequest = new SubscribeRequest();
  subscribeRequest.setUserId(userId);
  return lasnService.subscribe(subscribeRequest, null);
}

export const linkNearbyUser = (lasnService, nearbyDeviceId, userId) => {
  const linkRequest = new LinkRequest();
  linkRequest.setNearbyDeviceId(nearbyDeviceId) // update!!!
  linkRequest.setUserId(userId); // TODO: update to not be hardcoded
  return lasnService.link(linkRequest);
}

export const filterSelfFromNearbyUsersList = (userId, nearbyUserList) => {
  return nearbyUserList.filter(user => user.userId != userId)
}

export const checkIfUserExistsInNearbyUserList = (nearbyUserDeviceId, seenDeviceIds) => {
  return seenDeviceIds.some(deviceId => deviceId == nearbyUserDeviceId);
}

export const disconnectFromLasn = (lasnService, userId) => {
  const disconnectRequest = new DisconnectRequest()
  disconnectRequest.setUserId(userId)
  return lasnService.disconnect(disconnectRequest)
}