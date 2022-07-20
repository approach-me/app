export const BLUETOOTH_EVENT_TYPES = {
    DEVICE_BLUETOOTH_STATE_CHANGED: 'DEVICE_BLUETOOTH_STATE_CHANGED',
    SENSED_NEARBY_USER: 'SENSED_NEARBY_USER',
}

export const LASN_EVENTS = {
    NEW_USER_FOUND_IN_NETWORK: 'NEW_USER_FOUND_IN_NETWORK',
    CLOSE_CONNECTION: ' CLOSE_CONNECTION',
}

export class ChannelEvent {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
