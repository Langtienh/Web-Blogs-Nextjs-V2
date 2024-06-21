"use client";

import { RiUserUnfollowFill } from "react-icons/ri";
import { baseURL, fetcherCheck, swrconfig } from "@/constant/constant";
import { Button, Spin, Tooltip } from "antd";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useRouter } from "next/navigation";
import { subID } from "@/utils/id";
import { useState } from "react";
import { IUser } from "@/types/backend";
import { isClient } from "@/utils/isClient";

export default function IsFollow({ followId }: { followId: string }) {
  const postId = subID(followId);
  let auth: IUser | null = null;
  let isLogin = false;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
    isLogin = !!auth;
  }
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(false);
  const handleFollow = async () => {
    if (isLogin) {
      setDisabled(true);
      mutate(`${baseURL}follows/${followId}`, true);
      try {
        const res = await axios.post(`${baseURL}follows`, {
          id: followId,
          userId: auth?.id,
          postId,
        });
        mutate(`${baseURL}follows?userId=${auth?.id}`);
      } catch {
        mutate(`${baseURL}follows/${followId}`, false);
      } finally {
        await mutate(`${baseURL}follows/${followId}`);
        setDisabled(false);
      }
    } else router.push("/");
  };
  const handleUnFollow = async () => {
    if (isLogin) {
      setDisabled(true);
      mutate(`${baseURL}follows/${followId}`, false);
      try {
        const res = await axios.delete(`${baseURL}follows/${followId}`);
        mutate(`${baseURL}follows?userId=${auth?.id}`);
      } catch {
        mutate(`${baseURL}follows/${followId}`, true);
      } finally {
        await mutate(`${baseURL}follows/${followId}`);
        setDisabled(false);
      }
    } else router.push("/");
  };
  const { data, isLoading } = useSWR(
    `${baseURL}follows/${followId}`,
    fetcherCheck,
    { ...swrconfig, shouldRetryOnError: false }
  );
  if (isLoading)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  if (!data)
    return (
      <Button disabled={disabled} onClick={handleFollow} size="small">
        Follow
      </Button>
    );
  return (
    <Tooltip title="UnFollow" color="red">
      <Button disabled={disabled} onClick={handleUnFollow} size="small" danger>
        <RiUserUnfollowFill />
      </Button>
    </Tooltip>
  );
}
