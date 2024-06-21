"use client";
import PostsList from "@/components/blogs/post/post.list";
import { baseURL, fetcher, swrconfig } from "@/constant/constant";
import { IPost, IUser } from "@/types/backend";
import { IStore } from "@/types/redux";
import { isClient } from "@/utils/isClient";
import { Spin } from "antd";
import useSWR from "swr";

const Blogs = (props: any) => {
  let auth: IUser | null = null;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
  }
  const LimitItem = 3;
  const pageActive = props?.searchParams?.page ?? 1;
  const {
    data,
  }: {
    data: {
      data: IPost[];
      items: number;
    };
  } = useSWR(
    `${baseURL}posts?userId=${auth?.id}&_page=${pageActive}&_per_page=${LimitItem}&_sort=-id`,
    fetcher,
    { ...swrconfig, revalidateIfStale: true }
  );
  if (!data)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  return (
    <PostsList
      data={data.data}
      pageActive={pageActive}
      items={data.items}
      LimitItem={LimitItem}
    />
  );
};

export default Blogs;
