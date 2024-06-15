"use server";

import { baseURL } from "@/constant/constant";
import axios from "axios";

export const checkLogin = async (
  username?: string,
  password?: string
): Promise<boolean> => {
  const res = await axios.get(`${baseURL}users?username=${username}`);
  const data = res.data;
  return data[0]?.password === password;
};

export const getUser = async (username?: string) => {
  const res = await axios.get(`${baseURL}users?username=${username}`);
  return res.data;
};
