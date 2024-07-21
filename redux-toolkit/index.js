const store = require("./app/store");
const { cakeActions } = require("./features/cake/cakeSlice");
const { iceCreamActions } = require("./features/icecream/iceCreamSlice");
const { fetchUsers } = require("./features/user/userSlice");

console.log("Initial state ", store.getState());

const unsubsribe = store.subscribe(() =>
  console.log("Updated state ", store.getState())
);
store.dispatch(cakeActions.ordered(2));
store.dispatch(cakeActions.ordered(4));
store.dispatch(cakeActions.ordered(1));
store.dispatch(cakeActions.restocked(7));
store.dispatch(iceCreamActions.ordered(1));
store.dispatch(iceCreamActions.ordered(2));
store.dispatch(iceCreamActions.ordered(5));
store.dispatch(iceCreamActions.restocked(5));
store.dispatch(iceCreamActions.restocked(3));
store.dispatch(fetchUsers());
// unsubsribe();
