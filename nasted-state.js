const redux = require('@reduxjs/toolkit');
const reduxLogger = require('redux-logger');
const produce = require('immer').produce;
const UPDATE_STREET = "UPDATE_STREET";

const logger = reduxLogger.createLogger();

function updateStreet(_street, _pincode) {
    return {
        type: UPDATE_STREET,
        payload: { _street, _pincode }
    }
}

const initialState = {
    name: "john deo",
    age: 20,
    address: {
        street: "123 main st",
        city: "New York",
        zip: 10001
    }
}

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_STREET:
            return produce(state, (draftState) => {
                draftState.address.street = action.payload._street;
                draftState.address.zip = action.payload._pincode;
            })
        default:
            return state;
    }
};

const rootReducer = redux.combineReducers({
    address: addressReducer
});

const store = redux.configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

const addressActions = redux.bindActionCreators({ updateStreet }, store.dispatch);

console.log("initial state: ", store.getState());
const unsubscribe = store.subscribe(() => { });
addressActions.updateStreet("456 main st", 415022);
unsubscribe();