import { createStore, combineReducers, applyMiddleware } from "redux";
import booksReducer from "./reducers/booksReducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
  books: booksReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
