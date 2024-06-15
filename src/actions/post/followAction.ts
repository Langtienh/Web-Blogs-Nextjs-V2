"use server";

import { baseURL } from "@/constant/constant";
import { IUser } from "@/types/backend";
import axios from "axios";

export const FollowAction = async (auth: IUser, userId: string) => {
  let newFollow = auth.follow;
  if (!newFollow.includes(userId)) newFollow.push(userId);
  const res = await axios.patch(`${baseURL}users/${auth.id}`, {
    follow: newFollow,
  });
  const data = res.data;
  return data;
};

export const UnFollowAction = async (auth: IUser, userId: string) => {
  let newFollow = auth.follow;
  newFollow = newFollow.filter((item: string) => item !== userId);
  const res = await axios.patch(`${baseURL}users/${auth.id}`, {
    follow: newFollow,
  });
  const data = res.data;
  return data;
};
