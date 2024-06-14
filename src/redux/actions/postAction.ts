export const FOLLOW = (id: string) => {
  return {
    type: "FOLLOW",
    userId: id,
  };
};

export const UNFOLLOW = (id: string) => {
  return {
    type: "UNFOLLOW",
    userId: id,
  };
};

export const LIKE = (id: string) => {
  return {
    type: "LIKE",
    postId: id,
  };
};

export const UNLIKE = (id: string) => {
  return {
    type: "UNLIKE",
    postId: id,
  };
};

export const SHARE = (id: string) => {
  return {
    type: "SHARE",
    postId: id,
  };
};

export const UNSHARE = (id: string) => {
  return {
    type: "UNSHARE",
    postId: id,
  };
};
