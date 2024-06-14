import { IUser } from "./backend";

export interface IStore {
  user: IUser;
  isLogin: boolean;
}

export interface userAction {
  type: string;
  user: IUser;
  userId: string;
  postId: string;
}
