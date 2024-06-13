import { IUser } from "@/types/backend";

const initial: IUser = {
  id: "",
  name: "",
  username: "",
  password: "",
  email: "",
  flower: [],
  sharedPost: [],
  likedPost: [],
  img_url: "",
};

interface userAction {
  type: string;
  user: IUser;
}

const userReducer = (state: IUser = initial, action: userAction) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return initial;
    default:
      return state;
  }
};

export default userReducer;
