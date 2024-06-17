"use client";

import { baseURL, fetcherCheck, swrconfig } from "@/constant/constant";
import { IStore } from "@/types/redux";
import { Button, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";

export default function LikeAction({ postId }: { postId: string }) {
  const auth = useSelector((state: IStore) => state.user);
  const isLogin = useSelector((state: IStore) => state.isLogin);
  const likedId = `${postId}x${auth.id}`;
  const router = useRouter();
  const [disable, setDisabled] = useState<boolean>(false);
  const handleLike = async () => {
    if (isLogin) {
      setDisabled(true);
      mutate(`${baseURL}likeds/${likedId}`, true);
      try {
        const res = await axios.post(`${baseURL}likeds`, {
          id: likedId,
          postId,
          userId: auth.id,
        });
        mutate(`${baseURL}likeds?postId=${postId}`);
      } catch {
        mutate(`${baseURL}likeds/${likedId}`, false);
      } finally {
        await mutate(`${baseURL}likeds/${likedId}`);
        setDisabled(false);
      }
    } else router.push("/");
  };
  const handleUnLike = async () => {
    if (isLogin) {
      setDisabled(true);
      mutate(`${baseURL}likeds/${likedId}`, false);
      try {
        const res = await axios.delete(`${baseURL}likeds/${likedId}`);
        mutate(`${baseURL}likeds?postId=${postId}`);
      } catch {
        mutate(`${baseURL}likeds/${likedId}`, true);
      } finally {
        await mutate(`${baseURL}likeds/${likedId}`);
        setDisabled(false);
      }
    } else router.push("/");
  };
  const { data, isLoading, error } = useSWR(
    `${baseURL}likeds/${likedId}`,
    fetcherCheck,
    { ...swrconfig }
  );
  if (isLoading)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  if (data)
    return (
      <Button
        disabled={disable}
        onClick={handleUnLike}
        size="large"
        type="text"
      >
        <AiFillLike className="text-blue-500" size={24} />
        <span>Like</span>
      </Button>
    );
  return (
    <Button disabled={disable} onClick={handleLike} size="large" type="text">
      <AiOutlineLike size={24} />
      <span>Like</span>
    </Button>
  );
}
