import Comments from "@/components/blogdetail/comments";
import Post from "@/components/blogs/post/post.item";
import { baseURL } from "@/constant/constant";
import { IPost } from "@/types/backend";
import axios from "axios";
import { Metadata } from "next";
type Props = {
  params: { postId: string };
};

export async function generateMetadata({
  params,
}: Props): // parent: ResolvingMetadata
Promise<Metadata> {
  // fetch data
  const res = await axios.get(`${baseURL}posts/${params.postId}`);
  const data: IPost = res.data;

  return {
    title: `${data.title} ❤️❤️❤️`,
  };
}
export default async function Page({ params }: Props) {
  const res = await axios.get(`${baseURL}posts/${params.postId}`);
  const data: IPost = res.data;
  return (
    <div>
      <Post post={data} />
      <Comments postId={data.id} />
    </div>
  );
}
