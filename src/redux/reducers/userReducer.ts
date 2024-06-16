import { initialUser } from "@/initial/backend";
import { IUser } from "@/types/backend";
import { userAction } from "@/types/redux";

const userReducer = (state: IUser = initialUser, action: userAction) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return initialUser;
    default:
      return state;
  }
};

export default userReducer;
