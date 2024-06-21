/* eslint-disable @next/next/no-img-element */
"use client";
import { IUser } from "@/types/backend";
import { isClient } from "@/utils/isClient";
import { Button, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBell,
  FaEdit,
  FaFacebook,
  FaFacebookMessenger,
  FaHome,
  FaSearch,
  FaStore,
  FaUser,
  FaUserFriends,
  FaVideo,
} from "react-icons/fa";
import { MdMenu } from "react-icons/md";

const Header = () => {
  let auth: IUser | null = null;
  let isLogin = false;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
    isLogin = !!auth;
  }
  const router = useRouter();
  const handleLogout = () => {
    if (isClient()) localStorage.removeItem("auth");
    router.push("/");
  };
  return (
    <>
      <div id="top"></div>
      <div className="bg-white h-14 fixed z-40 top-0 left-0 right-0 shadow-md rounded-lg px-3">
        <div className="h-full flex justify-between items-center">
          <Popover
            placement="bottomRight"
            content={<p className="text-red-500 font-bold">Blogs</p>}
          >
            <Link href="/blogs">
              <FaFacebook size={38} className="text-blue-700" />
            </Link>
          </Popover>
          <Popover placement="bottom" content="Nodata">
            <FaSearch size={30} className="hidden" />
          </Popover>
          <Link href="/blogs">
            <Popover
              placement="bottom"
              content={<p className="text-red-500 font-bold">Blogs</p>}
            >
              <FaHome size={30} />
            </Popover>
          </Link>
          <Link href="/blogs/createblog">
            <Popover
              placement="bottom"
              content={<p className="text-red-500 font-bold">Create a blog</p>}
            >
              <FaEdit size={30} />
              {/* <IoMdAdd size={30} /> */}
            </Popover>
          </Link>
          <Popover placement="bottom" content="Nodata">
            <FaUserFriends size={30} className="hidden" />
          </Popover>
          <Popover placement="bottom" content="Nodata">
            <FaVideo size={30} className="hidden" />
          </Popover>
          <Link href="/blogs/myblogs">
            <Popover
              placement="bottom"
              content={<p className="text-red-500 font-bold">My Blogs</p>}
            >
              <FaStore size={30} className="" />
            </Popover>
          </Link>
          <Popover placement="bottom" content="Nodata">
            <MdMenu size={30} className="hidden" />
          </Popover>

          <Popover placement="bottom" content="Nodata">
            <FaFacebookMessenger size={30} className="hidden" />
          </Popover>
          <Popover placement="bottom" content="Nodata">
            <FaBell size={30} className="hidden" />
          </Popover>
          <Popover
            placement="bottomLeft"
            content={
              <Button onClick={handleLogout}>
                {isLogin ? "LogOut" : "Login"}
              </Button>
            }
          >
            {isLogin ? (
              <img
                className="w-11 h-11 rounded-full"
                src={auth?.img_url}
                alt="avatar"
              />
            ) : (
              <FaUser size={30} />
            )}
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Header;
