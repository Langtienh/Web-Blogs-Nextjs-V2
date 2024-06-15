/* eslint-disable @next/next/no-img-element */
"use client";

import { baseURL } from "@/constant/constant";
import { FOLLOW, UNFOLLOW } from "@/redux/actions/postAction";
import { IUser } from "@/types/backend";
import { IStore } from "@/types/redux";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import { FollowAction, UnFollowAction } from "@/actions/post/followAction";
import { swrConfig } from "@/constant/swr.config";
import { RiUserUnfollowFill } from "react-icons/ri";

const Guest = ({
  user,
  dot,
  auth,
}: {
  user: IUser;
  dot?: boolean;
  auth: IUser;
}) => {
  const isLogin = useSelector((state: IStore) => state.isLogin);
  const dispatch = useDispatch();
  const isfollow = auth?.follow?.includes(user.id);
  const router = useRouter();
  const handleFollow = async () => {
    if (!isLogin) router.push("/");
    else {
      const res = await FollowAction(auth, user.id);
      dispatch(FOLLOW(user.id));
    }
  };
  const handleUnFollow = async () => {
    if (!isLogin) router.push("/");
    else {
      const res = await UnFollowAction(auth, user.id);
      dispatch(UNFOLLOW(user.id));
    }
  };
  return (
    <div className="flex gap-3 items-center">
      <img className="h-9 w-9 rounded-full" src={user.img_url} alt="avatar" />
      <div className="font-bold">
        <div className="flex gap-2">
          <h2 className="text-[15px]">{user.username}</h2>
          {isfollow ? (
            <Button
              type="text"
              onClick={() => handleUnFollow()}
              size="small"
              danger
            >
              <RiUserUnfollowFill />
            </Button>
          ) : (
            <Button onClick={() => handleFollow()} size="small">
              <div className="font-bold text-blue-500">Follow</div>
            </Button>
          )}
        </div>
        <h2 className="text-gray-700 text-[13px]">{user.email}</h2>
      </div>
      {dot && (
        <div className="ms-auto">
          <BsThreeDots size={24} />
        </div>
      )}
    </div>
  );
};

const Auth = ({ user }: { user: IUser }) => {
  return (
    <div className="flex gap-3">
      <img className="h-9 w-9 rounded-full" src={user.img_url} alt="avatar" />
      <div className="font-bold">
        <h2 className="text-[15px]">{user.username}</h2>
        <h2 className="text-gray-700 text-[13px]">{user.email}</h2>
      </div>
    </div>
  );
};

const UserItem = ({ id, dot }: { id?: string; dot?: boolean }) => {
  const auth: IUser = useSelector((state: IStore) => state.user);
  let isAuth: boolean = auth.id === id;
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, error, isLoading } = useSWR(
    `${baseURL}users/${id}`,
    fetcher,
    swrConfig
  );
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  const user: IUser = data;

  if (isAuth) return <Auth user={user} />;
  return <Guest user={user} dot={dot} auth={auth} />;
};

export default UserItem;
