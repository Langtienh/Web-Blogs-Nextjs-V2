/* eslint-disable @next/next/no-img-element */
"use client";

import { IPost } from "@/types/backend";
import { Button, Spin } from "antd";
import UserItem from "@/components/blogs/user.item";
import { FaHeart, FaLaughSquint, FaShare } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { CommentOutlined } from "@ant-design/icons";
import LikeCounter from "@/components/blogs/post/like.counter";
import ShareCounter from "@/components/blogs/post/share.counter";
import LikeAction from "@/components/blogs/post/like.btn";
import ShareAction from "@/components/blogs/post/share.btn";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IStore } from "@/types/redux";

const Post = ({ post }: { post: IPost }) => {
  const isLogin = useSelector((state: IStore) => state.isLogin);
  const router = useRouter();
  const handleComment = () => {
    if (isLogin) router.push(`/blogs/${post.id}`);
    else router.push("/");
  };
  return (
    <div className="pt-3 pb-2 bg-white rounded-md">
      {post ? (
        <div>
          <div className="p-3">
            <UserItem userId={post.userId} dot />
            <h2 className="font-bold my-3">{post.title}</h2>
            <p className="text-[15px]">{post.body}</p>
          </div>
          <div className="min-h-40">
            <img
              className="w-full object-cover"
              src={post.img_url}
              alt="image"
            />
          </div>
          <div className="flex justify-between items-center text-xl px-3 py-2">
            <div className="flex items-center gap-1">
              <FaHeart className="text-red-500" />
              <AiFillLike className="text-blue-500" />
              <FaLaughSquint className="text-yellow-500" />
              <LikeCounter postId={post.id} />
            </div>
            <div className="flex items-center gap-1">
              <ShareCounter postId={post.id} />
              <FaShare className="text-blue-500" />
            </div>
          </div>
          <div className="mx-3 flex justify-between items-center text-xl border-y py-2">
            <LikeAction postId={post.id} />
            <Button
              onClick={handleComment}
              size="large"
              type="text"
              icon={<CommentOutlined />}
            >
              Comment
            </Button>
            <ShareAction postId={post.id} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-52 items-center justify-center">
          <Spin />
        </div>
      )}
    </div>
  );
};
export default Post;

{
  /*

        
      
      
      
        */
}
