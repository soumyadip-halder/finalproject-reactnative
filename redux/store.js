import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import latestReducer from './latest/reducer';
import detailsReducer from './movieDetails/reducer';
import searchReducer from './search/reducer';
import bookingLatestReducer from './seatsLatest/reducer';
import bookingDetailsReducer from './bookingDetails/reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

const reducer = combineReducers({
  latestReducer: latestReducer,
  detailsReducer: detailsReducer,
  searchReducer: searchReducer,
  bookingLatestReducer: bookingLatestReducer,
  bookingDetailsReducer: bookingDetailsReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

export default store;
