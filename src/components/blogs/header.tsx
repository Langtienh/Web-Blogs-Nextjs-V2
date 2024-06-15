/* eslint-disable @next/next/no-img-element */
"use client";
import { LOGOUT } from "@/redux/actions/loginActions";
import { IStore } from "@/types/redux";
import { Button, Popover } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaBell,
  FaFacebook,
  FaFacebookMessenger,
  FaHome,
  FaSearch,
  FaStore,
  FaUser,
  FaUserFriends,
  FaVideo,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state: IStore) => state.user);
  const isLogin = useSelector((state: IStore) => state.isLogin);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LOGOUT());
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
          <Popover
            placement="bottom"
            content={<p className="text-red-500 font-bold">Create Blog</p>}
          >
            <IoMdAdd size={30} />
          </Popover>
          <Popover placement="bottom" content="Nodata">
            <FaUserFriends size={30} className="hidden" />
          </Popover>
          <Popover placement="bottom" content="Nodata">
            <FaVideo size={30} className="hidden" />
          </Popover>
          <Popover placement="bottom" content="Nodata">
            <FaStore size={30} className="hidden" />
          </Popover>
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
                src={user?.img_url}
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
