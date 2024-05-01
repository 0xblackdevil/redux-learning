import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchUsers = createAsyncThunk("user/fetch", async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        return response.data;
    } catch (e) {
        return e.message;
    }
})

const initialState = {
    loading: false,
    users: [],
    error: ""
}

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = '';
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default userSlice.reducer;