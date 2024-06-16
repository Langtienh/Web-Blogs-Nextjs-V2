import { IComment, IPost, IUser } from "@/types/backend";

export const initialPost: IPost = {
  id: "",
  userId: "",
  title: "",
  body: "",
  img_url: "",
};

export const initialUser: IUser = {
  id: "",
  name: "",
  username: "",
  password: "",
  email: "",
  img_url: "",
};

export const initialComment: IComment = {
  id: "",
  postId: "",
  userId: "",
  body: "",
};
