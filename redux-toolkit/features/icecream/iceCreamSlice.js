const { createSlice } = require("@reduxjs/toolkit");

const initialIceCream = {
  numOfIceCream: 20,
};

const icecreamSlice = createSlice({
  name: "iceCream",
  initialState: initialIceCream,
  reducers: {
    ordered: (state, action) => {
      state.numOfIceCream = state.numOfIceCream - action.payload;
    },
    restocked: (state, action) => {
      state.numOfIceCream = state.numOfIceCream + action.payload;
    },
  },
});

module.exports = icecreamSlice.reducer;
module.exports.iceCreamActions = icecreamSlice.actions;
