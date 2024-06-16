/* eslint-disable @next/next/no-img-element */
"use client";

import { baseURL, fetcher, swrconfig } from "@/constant/constant";
import { IUser } from "@/types/backend";
import { IStore } from "@/types/redux";
import useSWR from "swr";
import { BsThreeDots } from "react-icons/bs";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import IsFollow from "@/components/blogs/left/btn.isFollow";
import { mergeID } from "@/utils/id";

const UserItem = ({ userId, dot }: { userId: string; dot?: boolean }) => {
  const auth: IUser = useSelector((state: IStore) => state.user);
  const isAuth: boolean = auth.id === userId;
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
          {isAuth || <IsFollow followId={mergeID(auth.id, userId)} />}
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
