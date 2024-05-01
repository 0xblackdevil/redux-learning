import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    numberOfCakes: 10
}

const cakeSlice = createSlice({
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

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;