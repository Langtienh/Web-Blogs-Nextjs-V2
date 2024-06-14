"use client";

import PostsList from "@/app/blogs/_components/posts.list";
import { baseURL } from "@/constant/constant";
import axios from "axios";
import { useEffect, useState } from "react";

// const Blogs = async (props: any) => {
//   const pageActive = props?.searchParams?.page ?? 1;
//   const res = await fetch(`${baseURL}postList?_page=${pageActive}&_sort=id`, {
//     next: { tags: ["list-post"] },
//     cache: "force-cache",
//   });
//   const data = await res.json();

//   return (
//     <PostsList data={data.data} pageActive={pageActive} items={data.items} />
//   );
// };
const Blogs = (props: any) => {
  const pageActive = props?.searchParams?.page ?? 1;
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${baseURL}postsList?_page=${pageActive}&_sort=id`
        );
        setData(res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getData();
  }, [pageActive]);
  return (
    <PostsList data={data.data} pageActive={pageActive} items={data.items} />
  );
};

export default Blogs;
