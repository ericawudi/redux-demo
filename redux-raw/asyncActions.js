const redux = require("redux");
const thunkMiddleware = require("redux-thunk").thunk;
// const reduxLogger = require("redux-logger");
const axios = require("axios");
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
// const logger = reduxLogger.createLogger();

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED";
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED";
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED";

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersRequest = (loading = false) => {
  return {
    type: FETCH_USERS_REQUESTED,
    payload: loading,
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        loading: action.payload,
        users: [],
        error: "",
      };
    case FETCH_USERS_SUCCEEDED:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILED:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({ userData: usersReducer });

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest(true));
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((resp) => {
        const users = resp.data.map((user) => user.id);
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        //
        const errorMessage = error.message;
        dispatch(fetchUsersFailure(errorMessage));
      });
  };
};

const store = createStore(
  rootReducer,
  //   applyMiddleware(logger, thunkMiddleware),
  applyMiddleware(thunkMiddleware)
);
// console.log("Initial state ", store.getState());
// const unsubscribe = store.subscribe(() => console.log(store.getState()));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());

// setTimeout(() => {
//   unsubscribe();
// }, 1000);
