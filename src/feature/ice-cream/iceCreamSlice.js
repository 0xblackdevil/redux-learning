const redux = require('@reduxjs/toolkit');

const initialState = {
    numberOfIceCream: 10
}

const iceCreamSlice = redux.createSlice({
    name: "iceCream",
    initialState,
    reducers: {
        ordered: (state, action) => {
            state.numberOfIceCream -= action.payload
        },
        restock: (state, action) => {
            state.numberOfIceCream += action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase('cake/ordered', (state) => {
            state.numberOfIceCream--;
        });

    }
})


module.exports = iceCreamSlice.reducer;
module.exports.iceCreamActions = iceCreamSlice.actions;