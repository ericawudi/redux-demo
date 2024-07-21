const createSlice = require("@reduxjs/toolkit").createSlice;

const initialCake = {
  numOfCake: 10,
};
const cakeSlice = createSlice({
  name: "cake",
  initialState: initialCake,
  reducers: {
    ordered: (state, action) => {
      state.numOfCake = state.numOfCake - action.payload;
    },
    restocked: (state, action) => {
      state.numOfCake = state.numOfCake + action.payload;
    },
  },
});

module.exports = cakeSlice.reducer;
module.exports.cakeActions = cakeSlice.actions;
