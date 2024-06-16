"use client";

import { baseURL, fetcherCounter, swrconfig } from "@/constant/constant";
import { Spin } from "antd";
import useSWR from "swr";

export default function ShareCounter({ postId }: { postId: string }) {
  const { data, isLoading } = useSWR(
    `${baseURL}shareds?postId=${postId}`,
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
