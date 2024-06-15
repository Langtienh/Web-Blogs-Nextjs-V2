"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Post from "@/components/blogs/post.item";

interface IProps2 {
  data: { id: string }[];
  items: number;
  pageActive: number;
}
const PostsList = ({ data, items, pageActive }: IProps2) => {
  const { replace } = useRouter();
  const patchName = usePathname();
  const searchParams = useSearchParams();

  const onChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${patchName}?${params}`);
    window.scrollBy({
      top: 100, // could be negative value
      left: 0,
      behavior: "smooth",
    });
    setTimeout(() => {}, 2000);
  };
  return (
    <>
      <div className="w-full max-w-[516px] px-2 pt-5 mx-auto">
        <ul className="flex gap-5 flex-col">
          {!!data?.length &&
            data.map((item: { id: string }) => {
              return <Post key={item.id} id={item.id} />;
            })}
        </ul>
        <div className="text-center mt-10 mb-20">
          <a href="#top">
            <Pagination
              current={pageActive}
              onChange={onChange}
              total={items}
              showSizeChanger={false}
            />
          </a>
        </div>
      </div>
    </>
  );
};
export default PostsList;
