"use client";

import { Pagination } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Post from "./post.item";

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
  };
  return (
    <>
      <div className="w-full max-w-[516px] px-2 mx-auto">
        <ul className="flex gap-5 flex-col">
          {data &&
            data.length > 0 &&
            data.map((item: { id: string }) => {
              return <Post key={item.id} id={item.id} />;
            })}
        </ul>
        <div className="text-center mt-10 mb-20">
          <Pagination
            current={pageActive}
            onChange={onChange}
            total={items}
            showSizeChanger={false}
          />
        </div>
      </div>
    </>
  );
};
export default PostsList;
