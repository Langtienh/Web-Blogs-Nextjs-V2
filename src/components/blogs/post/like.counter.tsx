"use client";

import { baseURL, fetcherCounter, swrconfig } from "@/constant/constant";
import { Spin } from "antd";
import useSWR from "swr";

export default function LikeCounter({ postId }: { postId: string }) {
  const { data, isLoading } = useSWR(
    `${baseURL}likeds?postId=${postId}`,
    fetcherCounter,
    {
      ...swrconfig,
    }
  );
  if (isLoading)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  return <span>{data}</span>;
}
