import { userAction } from "@/types/redux";

const init = false;

const isLoginReducer = (stata = init, action: userAction) => {
  switch (action.type) {
    case "LOGIN":
      return true;
    case "LOGOUT":
      return false;
    default:
      return stata;
  }
};

export default isLoginReducer;
