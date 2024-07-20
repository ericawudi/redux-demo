const redux = require("redux");
const produce = require("immer").produce;
const createStore = redux.createStore;

const initialState = {
  name: "Eric Awudi Okyere",
  address: {
    street: "Dansoman Shifta Street",
    city: "Dansoman",
    state: "DC",
  },
};

const CHANGE_STREET = "CHANGE_STREET";

function changeStreet(street) {
  return {
    type: CHANGE_STREET,
    payload: street,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_STREET:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload, //quite combusome to keep track of this as a developer. Instead, you can use the immer package :)
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("Updated store state ", store.getState())
);

store.dispatch(changeStreet("Kasoa - Red Top"));

unsubscribe();
