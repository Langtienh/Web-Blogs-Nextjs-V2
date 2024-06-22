"use client";

import { Skeleton } from "antd";

export default function PostSkeleton() {
  return (
    <div className="bg-white rounded-lg p-3">
      <Skeleton avatar active paragraph={{ rows: 0 }} />
      <Skeleton active />
      <div className="h-72 w-full my-2 rounded-lg flex flex-col justify-center items-center bg-gray-200">
        <Skeleton.Image />
      </div>
      <div className="flex gap-5 justify-between">
        <Skeleton.Button size="large" active />
        <Skeleton.Button size="large" active />
        <Skeleton.Button size="large" active />
      </div>
    </div>
  );
}
