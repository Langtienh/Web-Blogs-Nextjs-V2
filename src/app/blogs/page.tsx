import PostsList from "@/components/blogs/post.list";
import { baseURL } from "@/constant/constant";

const Blogs = async (props: any) => {
  const pageActive = props?.searchParams?.page ?? 1;
  const res = await fetch(`${baseURL}postList?_page=${pageActive}&_sort=id`, {
    next: { tags: ["list-post"] },
    cache: "force-cache",
  });
  const data = await res.json();

  return (
    <PostsList data={data.data} pageActive={pageActive} items={data.items} />
  );
};

export default Blogs;
