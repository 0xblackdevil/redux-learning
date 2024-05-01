import { configureStore } from '@reduxjs/toolkit';

import cakeReducer from '../feature/cake/cakeSlice';
import iceCreamReducer from '../feature/ice-cream/iceCreamSlice';
import userReducer from '../feature/async-slice/userSlice';

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: iceCreamReducer,
        user: userReducer
    }
})

export default store;