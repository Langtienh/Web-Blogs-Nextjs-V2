"use client";

import { baseURL, fetcher } from "@/constant/constant";
import { IStore } from "@/types/redux";
import { Empty, Spin } from "antd";
import { useSelector } from "react-redux";
import useSWR from "swr";
import UserItem from "@/components/blogs/user.item";
import { subID } from "@/utils/id";

export default function UserList() {
  const auth = useSelector((state: IStore) => state.user);

  const { data }: { data: { id: string }[] } = useSWR(
    `${baseURL}follows?userId=${auth.id}`,
    fetcher
  );
  if (!data)
    return (
      <div className="pt-4 text-center">
        <Spin />
      </div>
    );
  return (
    <div className="p-4">
      {auth && (
        <>
          <div className="pb-3 mb-3 border-b-2">
            {<UserItem userId={auth.id} />}
          </div>
          <h2 className="font-bold text-xl pb-3">Danh sách theo dõi</h2>
        </>
      )}
      {!!data?.length ? (
        <ul className="flex flex-col gap-3">
          {data.map(({ id }: { id: string }) => {
            return <UserItem key={id} userId={subID(id)} />;
          })}
        </ul>
      ) : (
        <Empty />
      )}
    </div>
  );
}
