"use client";
import PostsList from "@/components/blogs/post/post.list";
import { baseURL, fetcher, swrconfig } from "@/constant/constant";
import { IPost } from "@/types/backend";
import { Spin } from "antd";
import useSWR, { mutate } from "swr";

const Blogs = (props: any) => {
  const LimitItem = 10;
  const pageActive = props?.searchParams?.page ?? 1;
  const {
    data,
  }: {
    data: {
      data: IPost[];
      items: number;
    };
  } = useSWR(
    `${baseURL}posts?_page=${pageActive}&_per_page=${LimitItem}&_sort=-id`,
    fetcher,
    swrconfig
  );
  // load data nextpage
  mutate(
    `${baseURL}posts?_page=${pageActive + 1}&_per_page=${LimitItem}&_sort=-id`
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
