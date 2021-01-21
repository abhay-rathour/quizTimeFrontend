import {createStore, combineReducers, applyMiddleware}  from 'redux';
import {Tests } from './TestAction';
import {Auth} from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = ()=>{
    const store = createStore(
        combineReducers({
            tests: Tests,
            auth:Auth,

        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}