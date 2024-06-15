"use client";
import { IStore } from "@/types/redux";
import { useSelector } from "react-redux";
import UserItem from "@/components/blogs/user.item";
import { Button, Empty } from "antd";
import Link from "next/link";

const FolowsList = () => {
  const user = useSelector((state: IStore) => state.user);
  return (
    <>
      <div className="p-4">
        {user.id ? (
          <>
            <div className="pb-3 mb-3 border-b-2">
              {<UserItem id={user.id} />}
            </div>
            <h2 className="font-bold text-xl pb-3">Danh sách theo dõi</h2>
          </>
        ) : (
          <div className="text-center mb-6">
            <Link href="/">
              <Button>
                <span className="font-bold text-lg text-blue-500">
                  Login Now
                </span>
              </Button>
            </Link>
          </div>
        )}

        {!!user?.follow?.length ? (
          <ul className="flex flex-col gap-3">
            {user.follow.map((followID: string, index: number) => {
              return <UserItem key={`follow_${index}`} id={followID} />;
            })}
          </ul>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
export default FolowsList;
