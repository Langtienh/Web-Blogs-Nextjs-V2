import PostsList from "@/components/blogs/post/post.list";
import { baseURL } from "@/constant/constant";
import { IPost } from "@/types/backend";
import axios from "axios";

const Blogs = async (props: any) => {
  const LimitItem = 5;
  const pageActive = props?.searchParams?.page ?? 1;
  const res = await axios.get(
    `${baseURL}posts?_page=${pageActive}&_per_page=${LimitItem}&_sort=-id`
  );
  const data: {
    data: IPost[];
    items: number;
  } = res.data;
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
