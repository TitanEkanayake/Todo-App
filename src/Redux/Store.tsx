import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import userReducer from "./AdminSlice";
import todoReducer from "./Reducer";

const rootreducer = combineReducers({
  todo: todoReducer,
  userIdReducer: userReducer,
});
const Store = configureStore({
  reducer: rootreducer,
  middleware: [thunk, logger],
});
export default Store;
