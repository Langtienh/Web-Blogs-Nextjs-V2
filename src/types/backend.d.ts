export type IPost = {
  id: string;
  userId: string;
  title: string;
  body: string;
  img_url: string;
};

export type IUser = {
  id: string;
  name: string;
  username: string;
  password: string;
  email: string;
  img_url: string;
};

export type IComment = {
  id: string;
  postId: string;
  userId: string;
  body: string;
};

export type IFollow = {
  id: string;
  userId: string;
};

export type ILiked = {
  id: string;
  userId: string;
  postId: string;
};

export type Ishared = {
  id: string;
  userId: string;
  postId: string;
};
