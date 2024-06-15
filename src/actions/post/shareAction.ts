"use server";

import { baseURL } from "@/constant/constant";
import { IUser } from "@/types/backend";
import axios from "axios";

export const ShareAction = async (auth: IUser, postId: string) => {
  let newSharedPost = auth.sharedPost;
  if (!newSharedPost.includes(postId)) newSharedPost.push(postId);
  const res = await axios.patch(`${baseURL}users/${auth.id}`, {
    sharedPost: newSharedPost,
  });
  const resGetPost = await axios.get(`${baseURL}posts/${postId}`);
  const post = resGetPost.data;
  const res2 = await axios.patch(`${baseURL}posts/${postId}`, {
    share: post.share + 1,
  });
  const data = { post: res2.data, user: res.data };
  return data;
};

export const UnShareAction = async (auth: IUser, postId: string) => {
  let newSharedPost = auth.sharedPost;
  newSharedPost = newSharedPost.filter((item: string) => item !== postId);
  const res = await axios.patch(`${baseURL}users/${auth.id}`, {
    sharedPost: newSharedPost,
  });
  const resGetPost = await axios.get(`${baseURL}posts/${postId}`);
  const post = resGetPost.data;
  const res2 = await axios.patch(`${baseURL}posts/${postId}`, {
    share: post.share - 1,
  });
  const data = { user: res.data, post: res2.data };
  return data;
};
