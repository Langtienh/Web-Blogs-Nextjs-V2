"use server";

import { baseURL } from "@/constant/constant";
import { IUser } from "@/types/backend";
import axios from "axios";

export const LikeAction = async (auth: IUser, postId: string) => {
  let newLikedPost = auth.likedPost;
  if (!newLikedPost.includes(postId)) newLikedPost.push(postId);
  const res = await axios.patch(`${baseURL}users/${auth.id}`, {
    likedPost: newLikedPost,
  });
  const resGetPost = await axios.get(`${baseURL}posts/${postId}`);
  const post = resGetPost.data;
  const res2 = await axios.patch(`${baseURL}posts/${postId}`, {
    like: post.like + 1,
  });
  const data = { post: res2.data, user: res.data };
  return data;
};

export const UnLikeAction = async (auth: IUser, postId: string) => {
  let newLikedPost = auth.likedPost;
  newLikedPost = newLikedPost.filter((item: string) => item !== postId);
  const res = await axios.patch(`${baseURL}users/${auth.id}`, {
    likedPost: newLikedPost,
  });
  const resGetPost = await axios.get(`${baseURL}posts/${postId}`);
  const post = resGetPost.data;
  const res2 = await axios.patch(`${baseURL}posts/${postId}`, {
    like: post.like - 1,
  });
  const data = { user: res.data, post: res2.data };
  return data;
};
