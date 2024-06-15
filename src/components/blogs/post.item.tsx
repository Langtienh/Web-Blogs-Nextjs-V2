/* eslint-disable @next/next/no-img-element */
"use client";

import { baseURL } from "@/constant/constant";
import { IPost } from "@/types/backend";
import useSWR, { mutate } from "swr";
import UserItem from "./user.item";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaHeart, FaLaughSquint, FaShare } from "react-icons/fa";
import { Button } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "@/types/redux";
import { useRouter } from "next/navigation";
import { LIKE, SHARE, UNLIKE, UNSHARE } from "@/redux/actions/postAction";
import { LikeAction, UnLikeAction } from "@/actions/post/likeAction";
import { ShareAction, UnShareAction } from "@/actions/post/shareAction";
import { swrConfig } from "@/constant/swr.config";
import { PiShareFat, PiShareFatFill } from "react-icons/pi";

const Post = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: IStore) => state.user);
  const isLogin = useSelector((state: IStore) => state.isLogin);
  const router = useRouter();
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `${baseURL}posts/${id}`,
    fetcher,
    swrConfig
  );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const post: IPost = data;
  const isLike = auth.likedPost.includes(post.id);
  const isShare = auth.sharedPost.includes(post.id);
  const handleLike = async () => {
    if (isLogin) {
      const res = await LikeAction(auth, post.id);
      mutate(`${baseURL}posts/${id}`);
      dispatch(LIKE(post.id));
    } else router.push("/");
  };
  const handleUnLike = async () => {
    if (isLogin) {
      const res = await UnLikeAction(auth, post.id);
      mutate(`${baseURL}posts/${id}`);
      dispatch(UNLIKE(post.id));
    } else router.push("/");
  };
  const handleShare = async () => {
    if (isLogin) {
      const res = await ShareAction(auth, post.id);
      mutate(`${baseURL}posts/${id}`);
      dispatch(SHARE(post.id));
    } else router.push("/");
  };
  const handleUnShare = async () => {
    if (isLogin) {
      const res = await UnShareAction(auth, post.id);
      mutate(`${baseURL}posts/${id}`);
      dispatch(UNSHARE(post.id));
    } else router.push("/");
  };
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
        <Button
          onClick={() => (isLike ? handleUnLike() : handleLike())}
          size="large"
          type="text"
        >
          {isLike ? (
            <AiFillLike className="text-blue-500" size={24} />
          ) : (
            <AiOutlineLike size={24} />
          )}
          <span>Like</span>
        </Button>
        <Button size="large" type="text" icon={<CommentOutlined />}>
          Comment
        </Button>
        <Button
          onClick={() => (isShare ? handleUnShare() : handleShare())}
          size="large"
          type="text"
        >
          {isShare ? (
            <PiShareFatFill size={24} className="text-blue-500" />
          ) : (
            <PiShareFat size={24} />
          )}
          Share
        </Button>
      </div>
    </div>
  );
};

export default Post;
