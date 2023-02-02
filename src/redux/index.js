import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import reducer, {history} from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducer,
    applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware
    )
);

sagaMiddleware.run(rootSaga);

export default store;