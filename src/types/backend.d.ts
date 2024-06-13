export interface IPost {
  id: string;
  userId: string;
  title: string;
  body: string;
  like: number;
  share: number;
  img_url: string;
}

export interface IUser {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  flower: string[];
  sharedPost: string[];
  likedPost: string[];
  img_url: string;
}

export interface INewUser {
  name: string;
  username: string;
  password: string;
  email: string;
  flower: string[];
  sharedPost: string[];
  likedPost: string[];
  img_url: string;
}

export interface IComment {
  id: string;
  postId: string;
  name: string;
  email: string;
  body: string;
}

export interface IPostList {
  id: string;
}
