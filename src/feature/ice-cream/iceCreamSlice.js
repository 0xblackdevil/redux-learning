import { createSlice } from "@reduxjs/toolkit"
import { ordered as cakeOrder } from "../cake/cakeSlice"

const initialState = {
    numberOfIceCream: 10
}

const iceCreamSlice = createSlice({
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
        builder.addCase(cakeOrder, (state) => {
            state.numberOfIceCream--;
        });

    }
})

export default iceCreamSlice.reducer;
export const { ordered, restock } = iceCreamSlice.actions;