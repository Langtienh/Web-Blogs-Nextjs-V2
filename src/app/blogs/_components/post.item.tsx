/* eslint-disable @next/next/no-img-element */
"use client";

import { baseURL } from "@/constant/constant";
import { IPost } from "@/types/backend";
import useSWR from "swr";
import UserItem from "./user.item";
import { AiFillLike } from "react-icons/ai";
import { FaHeart, FaLaughSquint, FaShare } from "react-icons/fa";
import { Button } from "antd";
import {
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

const Post = ({ id }: { id: string }) => {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(`${baseURL}posts/${id}`, fetcher);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const post: IPost = data;
  return (
    <div className="pt-3 pb-2 bg-white rounded-md">
      <div className="p-3">
        <UserItem id={post.userId} dot />
        <h2 className="font-bold my-3">{post.title}</h2>
        <p className="text-[15px]">{post.body}</p>
      </div>
      <div>
        <img className="w-full object-cover" src={post.img_url} alt="image" />
      </div>
      <div className="flex justify-between items-center text-xl px-3 py-2">
        <div className="flex items-center gap-1">
          <FaHeart className="text-red-500" />
          <AiFillLike className="text-blue-500" />
          <FaLaughSquint className="text-yellow-500" />
          {post.like}
        </div>
        <div className="flex items-center gap-1">
          {post.share}
          <FaShare className="text-blue-500" />
        </div>
      </div>
      <div className="mx-3 flex justify-between items-center text-xl border-y py-2">
        <Button size="large" type="text" icon={<LikeOutlined />}>
          Like
        </Button>
        <Button size="large" type="text" icon={<CommentOutlined />}>
          Comment
        </Button>
        <Button size="large" type="text" icon={<ShareAltOutlined />}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default Post;
