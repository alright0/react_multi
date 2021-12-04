import { createStore, combineReducers, applyMiddleware } from "redux";
import booksReducer from "./reducers/booksReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";

let reducers = combineReducers({
  books: booksReducer,
  form: formReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
