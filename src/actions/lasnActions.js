export const START_CONNECTION = 'CONNECTING'; // used to tell bluetooth + lasn to start their connection processes

export const CONNECTION_CREATED_SUCCESFULLY = 'CONNECTION_CREATED_SUCCESFULLY'  // when both lasn + bluetooth successfully start up their connection seq

export const START_DISCONNECTION = 'DISCONNECTION'; // used to tell bluetooth + lasn to disconnect

export const DISCONNECTED_SUCCESFULLY = 'DISCONNECTED_SUCCESFULLY';  // when both lasn + bluetooth successfully run their tear down seq


export const LASN_CONNECTED_SUCCESSFULLY = 'LASN_CONNECTED_SUCCESSFULLY';

export const LASN_DISCONNECTED_SUCCESSFULLY = 'LASN_DISCONNECTED_SUCCESSFULLY';

export const UPDATE_NEARBY_USER_LIST = 'UPDATE_NEARBY_USER_LIST'; // called when we get event from LASN stream