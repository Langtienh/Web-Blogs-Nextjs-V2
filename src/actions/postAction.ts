"use server";

import axios from "axios";

export const check = async (url: string) => {
  try {
    const res = await axios.get(url);
    return true;
  } catch {
    return false;
  }
};

export const counter = async (url: string) => {
  try {
    const res = await axios.get(url);
    const data = res.data;
    return data.length;
  } catch {
    return 0;
  }
};
