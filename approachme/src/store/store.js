// reference: https://github.com/jefelewis/redux-saga-demo/blob/master/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import { rootSaga } from '../sagas';
import logger from 'redux-logger'


const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware).concat(logger);
    },
  });

sagaMiddleware.run(rootSaga);

