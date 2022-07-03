export const BLUETOOTH_EVENT_TYPES = {
    DEVICE_BLUETOOTH_STATE_CHANGED: 'DEVICE_BLUETOOTH_STATE_CHANGED',
    SENSED_NEARBY_USER: 'SENSED_NEARBY_USER',
}

export class ChannelEvent {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}