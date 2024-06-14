import { IUser } from "@/types/backend";
import { userAction } from "@/types/redux";

const initial: IUser = {
  id: "",
  name: "",
  username: "",
  password: "",
  email: "",
  follow: [],
  sharedPost: [],
  likedPost: [],
  img_url: "",
};

const userReducer = (state: IUser = initial, action: userAction) => {
  let newState = { ...state };
  let newFollow = newState.follow;
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return initial;
    case "FOLLOW":
      newFollow.push(action.userId);
      newState.follow = newFollow;
      return newState;
    case "UNFOLLOW":
      newFollow = newFollow.filter(
        (follower: string) => follower !== action.userId
      );
      newState.follow = newFollow;
      return newState;
    default:
      return state;
  }
};

export default userReducer;
