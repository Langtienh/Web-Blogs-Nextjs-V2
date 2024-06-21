"use client";

import { baseURL, fetcher } from "@/constant/constant";
import { Empty, Spin } from "antd";
import useSWR from "swr";
import UserItem from "@/components/blogs/user.item";
import { subID } from "@/utils/id";
import { isClient } from "@/utils/isClient";
import { IUser } from "@/types/backend";

export default function UserList() {
  let auth: IUser | null = null;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
  }

  const { data }: { data: { id: string }[] } = useSWR(
    `${baseURL}follows?userId=${auth?.id}`,
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
