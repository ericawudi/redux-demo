import { createSlice } from "@reduxjs/toolkit";

const initialCake = {
  numOfCakes: 10,
};
const cakeSlice = createSlice({
  name: "cake",
  initialState: initialCake,
  reducers: {
    ordered: (state, action) => {
      state.numOfCakes = state.numOfCakes - action.payload;
    },
    restocked: (state, action) => {
      state.numOfCakes = state.numOfCakes + action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;
