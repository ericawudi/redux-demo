import { createSlice } from "@reduxjs/toolkit";
import { ordered as cakeOrdered } from "../cake/cakeSlice";

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
  /**
   * A dispatched action in the old redux implementation will be received by all the reducers
   * However, with redux-toolkit, these actions are targeted toward just the slice it is meant for
   * If you want a particular slice to receive an action it was not meant for,
   * you will need the extranReducers parameter.
   * This enables you to define the exact action (gotten from the $name/$reducer.$reducerName or simply import the action) and perform the needed action
   */
  /**
   * the commented out implementation has been removed
   * extraReducers: {
   *    ["cake/ordered"]: (state, action) => {
   *     state.numOfIceCream = state.numOfIceCream - action.payload;
   *   },
   * },
   */

  extraReducers: (builder) => {
    builder.addCase(/** "cake/ordered"*/ cakeOrdered, (state, action) => {
      state.numOfIceCream = state.numOfIceCream - action.payload;
    });
  },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
