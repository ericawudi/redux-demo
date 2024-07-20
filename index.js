/**
 * A short that sells cake
 * CAKE SHOP
 * Entities
 *  -Shop: stores all cake on shelf :: STORE
 *  -Shopkeeper: Behind the counter :: REDUCER
 *      Checks if you've placed an order, check if cake is present and if yes, box it for you and deduct it from his stock
 *  -Customer: At the store entrance. He places an order using some QR Code ::ACTION
 *
 * ## A store that holds the state of your applcaition
 * ## An action that describes what happened in the application
 * ## A reducer which handles the action and decides how to update the state
 *
 * ##########################################################################
 *
 * First principle: The global state of your application is store as an object inside a single store.
 *      e.g. {numberOfCakes:10}
 * Second principle: The only way to change the state is to dispatch an action, an object that descibes what happened
 *      e.g. {type:CAKE_ORDERED}
 * Third principle: To specify how the state tree is updated based on actions, you write pure reducers.
 *      These are pure functions that takes the previous state and action and returns a new state. Reducer = (previousState, action) => newState
 *      const reducer = (state=initialState, action)=>{
 *          switch(action.type){
 *              case CAKE_ORDERED:
 *                  return {
 *                      numOfCake:state.numOfCakes - 1
 *                  }
 *          }
 *      }
 */

// CREATING AN ACTION
const CAKE_ORDERED = "CAKE_ORDERED";

// Action creator is a function that returns an action.
/**
 * We could actually use just actions (which is an object),
 * but with an action creator  (function), we can update our
 * function an not have to go to all instances where we
 * dispatched an action object to update it in future
 */
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

//CREATING A REDUCER
const initialState = { numOfCake: 10 };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, //this tells your reducer to only change numOfCakes and leave out other properties you may have
        numOfCake: state.numOfCake - 1, //or numOfCake:state.numOfCake - action.quantity
      };
    default:
      return state;
  }
};

// CREATING A STORE.
// A store has about 5 functionalities.
/**
 * 1. Holds application state
 * 2. Allows access to state via getState() method
 * 3. Allows state to be updated via dispatch(action) method
 * 4. Registers listers via subscribe(listener)
 * 5. Handles unregistering of listeners via the function returned by subscribe(listener)
 */
const redux = require("redux");
const createStore = redux.createStore;
//1
const store = createStore(reducer); //Remember, the reducer function above has the state of the app. So yes, our store now has the app's state

//2
console.log("Initial state", store.getState());

//4
const unsubscribe = store.subscribe(() =>
  console.log("Updated state", store.getState())
);

//3
store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

//5
unsubscribe();
//After here, store.dispatch will not work because we have unsubscribed from the store
