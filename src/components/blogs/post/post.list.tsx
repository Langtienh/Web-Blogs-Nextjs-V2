"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Post from "@/components/blogs/post/post.item";
import { IPost } from "@/types/backend";

interface IProps2 {
  data: IPost[];
  items: number;
  pageActive: number;
  LimitItem: number;
}
const PostsList = ({ data, items, pageActive, LimitItem }: IProps2) => {
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();
  const onChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${patchName}?${params}`);
    window.scrollBy({
      top: 100,
      left: 0,
      behavior: "smooth",
    });
    setTimeout(() => {}, 2000);
  };
  return (
    <>
      <div className="px-2">
        <ul className="flex gap-5 flex-col">
          {data.map((post: IPost) => {
            return <Post key={post.id} post={post} />;
          })}
        </ul>
        <div className="text-center mt-10 mb-20">
          <Pagination
            current={pageActive}
            onChange={onChange}
            total={items}
            defaultPageSize={Math.floor(items / LimitItem + 1)}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};
export default PostsList;
