import { IUser } from "@/types/backend";

export const LOGIN = (user: IUser) => {
  return {
    type: "LOGIN",
    user,
  };
};

export const LOGOUT = () => {
  return {
    type: "LOGOUT",
  };
};
