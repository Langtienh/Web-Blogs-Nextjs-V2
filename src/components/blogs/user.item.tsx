/* eslint-disable @next/next/no-img-element */
"use client";

import { baseURL, fetcher, swrconfig } from "@/constant/constant";
import { IUser } from "@/types/backend";
import useSWR from "swr";
import { BsThreeDots } from "react-icons/bs";
import { Spin } from "antd";
import IsFollow from "@/components/blogs/left/btn.isFollow";
import { mergeID } from "@/utils/id";
import { isClient } from "@/utils/isClient";

const UserItem = ({ userId, dot }: { userId: string; dot?: boolean }) => {
  let auth: IUser | null = null;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
  }
  const isAuth: boolean = auth?.id === userId;
  const { data }: { data: IUser } = useSWR(
    `${baseURL}users/${userId}`,
    fetcher,
    swrconfig
  );
  if (!data)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  return (
    <div className="flex gap-3 items-center">
      <img className="h-9 w-9 rounded-full" src={data.img_url} alt="avatar" />
      <div className="font-bold">
        <div className="flex gap-2">
          <h2 className="text-[15px]">{data.username}</h2>
          {isAuth || <IsFollow followId={mergeID(auth?.id ?? "", userId)} />}
        </div>
        <h2 className="text-gray-700 text-[13px]">{data.email}</h2>
      </div>
      {dot && (
        <div className="ms-auto">
          <BsThreeDots size={24} />
        </div>
      )}
    </div>
  );
};

export default UserItem;
