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
//CREATION OF ANOTHER ACTION
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

const ICECREAM_ORDER = "ICECREAM_ORDER";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";
// Action creator is a function that returns an action.
/**
 * We could actually use just actions (which is an object),
 * but with an action creator  (function), we can update our
 * function an not have to go to all instances where we
 * dispatched an action object to update it in future
 */
function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIcecream(qty = 1) {
  return {
    type: ICECREAM_ORDER,
    payload: qty,
  };
}

function restockIcecream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

//CREATING A REDUCER
// const initialState = { numOfCakes: 10, numOfIcecreams: 20 };
const initialCakeState = { numOfCakes: 10 };
const initialIceCreamState = { numOfIcecreams: 20 };

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDER:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIcecreams: state.numOfIcecreams + action.payload,
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
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
// logger middle that makes it possible to log store state
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

//1
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
const store = createStore(rootReducer, applyMiddleware(logger));

//2
console.log("Initial state", store.getState());

//4
const unsubscribe = store.subscribe(() => null);

//3
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake());
// store.dispatch(restockCake(6));
// store.dispatch(restockCake(-12));

// Alternative way to implement the above
const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake();
actions.restockCake(6);
actions.restockCake(-12);
actions.restockIcecream(2);
actions.orderIcecream(10);
actions.orderIcecream(1);
actions.restockIcecream(3);
actions.restockIcecream();

//5
unsubscribe();
//After here, store.dispatch will not work because we have unsubscribed from the store
