const redux = require('@reduxjs/toolkit');

const initialState = {
    numberOfCakes: 10
}

const cakeSlice = redux.createSlice({
    name: 'cake',
    initialState,
    reducers: {
        ordered: (state, action) => {
            state.numberOfCakes -= action.payload
        },
        restocked: (state, action) => {
            state.numberOfCakes += action.payload
        }
    }
})

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;