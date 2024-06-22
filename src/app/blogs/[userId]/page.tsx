/* eslint-disable @next/next/no-img-element */
import PostsList from "@/components/blogs/post/post.list";
import { baseURL } from "@/constant/constant";
import { IPost, IUser } from "@/types/backend";
import axios from "axios";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { userId: string };
  searchParams: { page: string };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  // read route params
  const id = params.userId;

  // fetch data
  const user: IUser = await fetch(`${baseURL}users/${id}`).then((res) =>
    res.json()
  );

  return {
    title: `${user.name} ❤️❤️❤️`,
  };
}

const Blogs = async (props: Props) => {
  const LimitItem = 3;
  const pageActive = props.searchParams?.page ?? 1;
  const res = await axios.get(
    `${baseURL}posts?userId=${props.params.userId}&_page=${pageActive}&_per_page=${LimitItem}&_sort=-id`
  );
  const data: {
    data: IPost[];
    items: number;
  } = res.data;
  return (
    <div>
      <div className="h-32 py-1">
        <img className="h-full" src="/images/hero.png" alt="auth" />
      </div>
      <PostsList
        data={data.data}
        pageActive={+pageActive}
        items={data.items}
        LimitItem={LimitItem}
      />
    </div>
  );
};

export default Blogs;
