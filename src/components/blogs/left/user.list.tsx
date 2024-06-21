"use client";
import IsNotLogin from "@/components/isNotLogin";
import UserList from "@/components/blogs/left/isLogin";
import { IUser } from "@/types/backend";
import { isClient } from "@/utils/isClient";
const FolowsList = () => {
  let auth: IUser | null = null;
  let isLogin = false;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
    isLogin = !!auth;
  }
  if (isLogin) return <UserList />;
  return <IsNotLogin />;
};
export default FolowsList;
