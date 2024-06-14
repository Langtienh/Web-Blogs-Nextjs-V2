"use client";
import newID from "@/utils/newId";
import { Button } from "antd";
import axios from "axios";

const handleClick = async () => {
  // const t = newID();
  // console.log(t);
  // const res = await axios.post("http://localhost:3001/postsList", {
  //   id: t,
  //   name: "test",
  // });
  // console.log(res.data);
};

const LikeShareList = () => {
  return (
    <>
      <div className="">
        rig
        <Button onClick={handleClick} type="primary">
          Click
        </Button>
      </div>
    </>
  );
};
export default LikeShareList;
