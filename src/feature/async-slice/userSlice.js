const redux = require("@reduxjs/toolkit");
const axios = require("axios");

const fetchUsers = redux.createAsyncThunk("user/fetch", async () => {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        return response.data.map(user => user.name)
    } catch (e) {
        return e.message
    }
})

const initialState = {
    loading: false,
    users: [],
    error: ""
}

const userSlice = redux.createSlice({
    name: "user",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => { state.loading = true }),
            builder.addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
                state.error = '';
            }),
            builder.addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.users = [];
                state.error = action.payload;
            })
    }
})

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;