"use server";
import { baseURL } from "@/constant/constant";
import { IPost, IUser } from "@/types/backend";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const CreatePostAction = async (post: IPost, auth: IUser) => {
  await axios.post(`${baseURL}posts`, post);
  revalidatePath("/blogs");
  revalidatePath(`/blogs/${auth?.id}`);
};
