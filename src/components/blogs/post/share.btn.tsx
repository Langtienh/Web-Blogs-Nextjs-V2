"use client";

import { baseURL, fetcherCheck, swrconfig } from "@/constant/constant";
import { IStore } from "@/types/redux";
import { Button, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiShareFat, PiShareFatFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import useSWR, { mutate } from "swr";

export default function ShareAction({ postId }: { postId: string }) {
  const auth = useSelector((state: IStore) => state.user);
  const isLogin = useSelector((state: IStore) => state.isLogin);
  const sharedId = `${postId}x${auth.id}`;
  const router = useRouter();
  const [disable, setDisabled] = useState<boolean>(false);
  const handleShare = async () => {
    if (isLogin) {
      setDisabled(true);
      mutate(`${baseURL}shareds/${sharedId}`, true);
      try {
        const res = await axios.post(`${baseURL}shareds`, {
          id: sharedId,
          postId,
          userId: auth.id,
        });
        mutate(`${baseURL}shareds?postId=${postId}`);
      } catch {
        mutate(`${baseURL}shareds/${sharedId}`, false);
      } finally {
        mutate(`${baseURL}shareds/${sharedId}`);
        setDisabled(false);
      }
    } else router.push("/");
  };
  const handleUnShare = async () => {
    if (isLogin) {
      setDisabled(true);
      mutate(`${baseURL}shareds/${sharedId}`, false);
      try {
        const res = await axios.delete(`${baseURL}shareds/${sharedId}`);
        mutate(`${baseURL}shareds?postId=${postId}`);
      } catch {
        mutate(`${baseURL}shareds/${sharedId}`, true);
      } finally {
        mutate(`${baseURL}shareds/${sharedId}`);
        setDisabled(false);
      }
    } else router.push("/");
  };
  const { data, isLoading, error } = useSWR(
    `${baseURL}shareds/${sharedId}`,
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
        onClick={handleUnShare}
        size="large"
        type="text"
      >
        <PiShareFatFill className="text-blue-500" size={24} />
        <span>Share</span>
      </Button>
    );
  return (
    <Button disabled={disable} onClick={handleShare} size="large" type="text">
      <PiShareFat size={24} />
      <span>Share</span>
    </Button>
  );
}
