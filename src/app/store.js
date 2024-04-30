const redux = require('@reduxjs/toolkit');
const logger = require('redux-logger').createLogger();
const cakeReducer = require("../feature/cake/cakeSlice");
const iceCreamReducer = require("../feature/ice-cream/iceCreamSlice");
const userReducer = require("../feature/async-slice/userSlice");

const store = redux.configureStore({
    reducer: {
        cake: cakeReducer,
        iceCream: iceCreamReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

module.exports = store;