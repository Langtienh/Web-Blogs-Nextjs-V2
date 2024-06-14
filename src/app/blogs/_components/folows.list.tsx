"use client";
import { IStore } from "@/types/redux";
import { useSelector } from "react-redux";
import UserItem from "./user.item";

const FolowsList = () => {
  const user = useSelector((state: IStore) => state.user);
  return (
    <>
      <div className="pt-3 px-2">
        <div className="pb-3 mb-3 border-b-2">
          {user.id && <UserItem id={user.id} />}
        </div>
        <h2 className="font-bold text-xl">Danh sách theo dõi</h2>
        <ul className="flex flex-col gap-3">
          {user &&
            user.follow &&
            user.follow.map((followID: string, index: number) => {
              return <UserItem key={`follow_${index}`} id={followID} />;
            })}
        </ul>
      </div>
    </>
  );
};
export default FolowsList;
