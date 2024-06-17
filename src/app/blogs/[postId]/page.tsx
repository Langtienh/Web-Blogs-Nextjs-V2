"use client";

import Comments from "@/components/blogdetail/comments";
import Post from "@/components/blogs/post/post.item";
import { baseURL, fetcher, swrconfig } from "@/constant/constant";
import { IPost } from "@/types/backend";
import { Spin } from "antd";
import useSWR from "swr";

export default function Page({ params }: { params: { postId: string } }) {
  const { data }: { data: IPost } = useSWR(
    `${baseURL}posts/${params.postId}`,
    fetcher,
    {
      ...swrconfig,
      revalidateIfStale: true,
    }
  );
  if (!data)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  return (
    <div>
      <Post post={data} />
      <Comments postId={data.id} />
    </div>
  );
}
