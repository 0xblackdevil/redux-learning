const redux = require('@reduxjs/toolkit');
const reduxLogger = require('redux-logger');
const CAKE_ORDER = "CAKE_ORDER";
const ICE_CREAME_ORDER = "ICE_CREAME_ORDER";

const CAKE_RESTOKE = "CAKE_RESTOKE";
const ICE_CREAME_RESTOKE = "ICE_CREAME_RESTOKE";

const logger = reduxLogger.createLogger();

function cakeOrder(_qunatity) {
    return {
        type: CAKE_ORDER,
        payload: _qunatity
    }
}

function iceCreamOrder(_qunatity) {
    return {
        type: ICE_CREAME_ORDER,
        payload: _qunatity
    }
}

function restoreCake(_qunatity) {
    return {
        type: CAKE_RESTOKE,
        payload: _qunatity
    }
}

function restoreIceCream(_qunatity) {
    return {
        type: ICE_CREAME_RESTOKE,
        payload: _qunatity
    }
}


const initialState = {
    numOfCakes: 5,
    numOfIceCreams: 10
}

const cakeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CAKE_ORDER:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            }
        case CAKE_RESTOKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }
        default:
            return state;
    }
}

const iceCreamReducer = (state = initialState, action) => {
    switch (action.type) {
        case ICE_CREAME_ORDER:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            }
        case ICE_CREAME_RESTOKE:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            }
        default:
            return state;
    }
}

const rootReducer = redux.combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
});
const cakeShop = redux.configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
const actions = redux.bindActionCreators({ cakeOrder, restoreCake, iceCreamOrder, restoreIceCream }, cakeShop.dispatch);


console.log("initial state: ", cakeShop.getState());
const unsubscribe = cakeShop.subscribe(() => { });

console.log("=== selling cakes & ice creams ===");
actions.cakeOrder(2);
actions.iceCreamOrder(5);

console.log("=== restoring cakes & ice creams ===");
actions.restoreCake(10);
actions.restoreIceCream(10);



unsubscribe();