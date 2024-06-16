"use client";
import { IStore } from "@/types/redux";
import { useSelector } from "react-redux";
import IsNotLogin from "@/components/isNotLogin";
import UserList from "@/components/blogs/left/isLogin";
const FolowsList = () => {
  const isLogin = useSelector((state: IStore) => state.isLogin);
  if (isLogin) return <UserList />;
  return <IsNotLogin />;
};
export default FolowsList;
