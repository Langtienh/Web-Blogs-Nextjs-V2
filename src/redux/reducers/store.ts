import { combineReducers, createStore } from "redux";
import userReducer from "@/redux/reducers/userReducer";

const reduxStore = combineReducers({
  user: userReducer,
});

const store = createStore(reduxStore);
export default store;
