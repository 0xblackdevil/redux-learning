const redux = require('@reduxjs/toolkit');
const reduxLogger = require('redux-logger');
const axios = require("axios");
const thunk = require('redux-thunk').default;

// state
const initialState = {
    loading: false,
    users: [],
    error: ""
}

// action
const FATCH_USERS_REQURESTED = "FATCH_USERS_REQURESTED";
const FATCH_USERS_SUCCESS = "FATCH_USERS_SUCCESS";
const FATCH_USERS_ERROR = "FATCH_USERS_ERROR";

const fatchUsersRequested = () => {
    return {
        type: FATCH_USERS_REQURESTED,
    }
}

const fatchUserSuccesss = (_response) => {
    return {
        type: FATCH_USERS_SUCCESS,
        payload: _response
    }
}

const fatchUserError = (_error) => {
    return {
        type: FATCH_USERS_ERROR,
        payload: _error
    }
}

// reducer

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FATCH_USERS_REQURESTED:
            return {
                ...state,
                loading: true
            }
        case FATCH_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ""
            }
        case FATCH_USERS_ERROR:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return state;
    }
}

// logger , store and action config
const logger = reduxLogger.createLogger();
const store = redux.configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {}
    }).concat(logger)
})

const action = redux.bindActionCreators({ fatchUsersRequested, fatchUserSuccesss, fatchUserError }, store);

// async function
const fetchUsers = () => {
    return async function (dispatch) {
        dispatch(fatchUsersRequested());
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
            const todos = response.data.map(todo => todo.title);
            dispatch(fatchUserSuccesss(todos));
        } catch (error) {
            dispatch(fatchUserError(error.message));
        }
    }
}

store.dispatch(fetchUsers());