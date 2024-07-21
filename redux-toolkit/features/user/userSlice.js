const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { default: axios } = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsers = createAsyncThunk("users/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((resp) => resp.data.map((user) => user.id));
});
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      (state.loading = false),
        (state.error = ""),
        (state.users = action.payload);
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      (state.loading = false),
        (state.error = action.error.message),
        (state.users = []);
    });
  },
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;
