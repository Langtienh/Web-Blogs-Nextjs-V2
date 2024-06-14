import { combineReducers, createStore } from "redux";
import userReducer from "@/redux/reducers/userReducer";
import isLoginReducer from "@/redux/reducers/isLoginReducer";

const reduxStore = combineReducers({
  user: userReducer,
  isLogin: isLoginReducer,
});

const store = createStore(reduxStore);
export default store;
