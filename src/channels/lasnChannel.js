import { eventChannel, END } from 'redux-saga';
import { LASN_EVENTS, ChannelEvent } from '../events';
export const createLasnChannel = (lasnStream) => eventChannel((emit) => {
  const lasnEventHandler = (type, payload) => {
    const lasnEvent = new ChannelEvent(type, payload);
    emit(lasnEvent);
  };
  lasnStream.on('data', (payload) => {
    const { userSummariesList }  = payload.toObject()
    console.log('GOT USER SUMMARIES', userSummariesList);
    lasnEventHandler(LASN_EVENTS.NEW_USER_FOUND_IN_NETWORK, userSummariesList)
  })

  lasnStream.on('status', () => {
    console.log('GOT STATUS!!!!')
  })

  lasnStream.on('end', () => {
    emit(END); // automatically closes the stream, and tells saga to terminate
  })

  const unsubscribe = () => {};

  return unsubscribe;
});
