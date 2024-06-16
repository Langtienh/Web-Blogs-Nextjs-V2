"use server";

import { baseURL } from "@/constant/constant";
import { IPost } from "@/types/backend";
import axios from "axios";
import { revalidateTag } from "next/cache";

export const createPost = async (post: IPost) => {
  const res = await axios.post(`${baseURL}posts`, post);
  const data = res.data;
  console.log(data);
  revalidateTag("list-post");
  return res.status;
};
