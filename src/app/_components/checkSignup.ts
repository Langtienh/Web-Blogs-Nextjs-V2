"use server";
import { baseURL } from "@/constant/constant";
import { SignupType } from "@/types/antd";
import newID from "@/utils/newId";
import axios from "axios";

export const checkSignup = async (
  email?: string,
  username?: string
): Promise<boolean> => {
  const res = await fetch(`${baseURL}users?email=${email}`);
  const res2 = await fetch(`${baseURL}users?username=${username}`);
  const data1: any[] = await res.json();
  const data2: any[] = await res2.json();
  return data1.length === 0 && data2.length === 0;
};

export const addUser = async (user: SignupType) => {
  const data = {
    id: newID(),
    flower: [],
    sharedPost: [],
    likedPost: [],
    ...user,
  };
  const res = await axios.post(`${baseURL}users`, data);
  // mặc định là tạo người dùng thành công, cần fix thêm
  return res.data;
};
