import * as ActionTypes from './ActionTypes';

export const Tests = (state = {
        isLoading: true,
        errMess: null,
        tests: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.FETCH_TEST:
            return {...state, isLoading: false, errMess: null, tests: action.payload};

        case ActionTypes.FETCH_TEST_LOADING:
            return {...state, isLoading: true, errMess: null, tests: []};

        case ActionTypes.FETCH_TEST_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tests: []};
        default:
            return state;
    }
}