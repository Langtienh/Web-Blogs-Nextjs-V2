/* eslint-disable @next/next/no-img-element */
"use client";

// import { isClient } from 'next/dynamic';

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { LoginType } from "@/types/antd";
import { checkLogin, getUser } from "@/actions/auth/checkLogin";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import { baseURL } from "@/constant/constant";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { isClient } from "@/utils/isClient";

const Login = ({ cb }: { cb: () => void }) => {
  const router = useRouter();
  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    const res = await checkLogin(values.username, values.password);
    if (res) {
      const data = await getUser(values.username);
      if (isClient()) localStorage.setItem("auth", JSON.stringify(data[0]));
      Swal.fire({
        icon: "success",
        title: "Go to home after 3 seconds",
        showConfirmButton: false,
        timer: 3000,
      });
      setTimeout(() => {
        router.push("/blogs");
      }, 3000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Accounts or passwords incorrectly",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  };

  const onFinishFailed: FormProps<LoginType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const demo = async () => {
    const res = await axios.get(`${baseURL}users/1718464000001`);
    const demoUser = res.data;

    if (isClient()) localStorage.setItem("auth", JSON.stringify(demoUser));
    Swal.fire({
      icon: "success",
      title: "Go to home after 3 seconds",
      showConfirmButton: false,
      timer: 3000,
    });
    setTimeout(() => {
      router.push("/blogs");
    }, 3000);
  };
  return (
    <div className="grid left:grid-cols-2">
      <div className="flex justify-center font-[Helvetica]">
        <div className=" w-full max-w-[400px] px-4 py-6">
          <h2 className="text-4xl font-bold text-[#0866ff] mb-3">facebook</h2>
          <h2 className="text-4xl mb-2">Đăng nhập gần đây</h2>
          <p>Nhấp vào ảnh của bạn hoặc thêm tài khoản.</p>
          <div className="mt-4 grid grid-cols-2 gap-5">
            <div
              onClick={() => demo()}
              className="shadow-md hover:shadow-2xl bg-white rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                className="bg-yellow-300"
                src="./images/hero.png"
                alt="avatar"
              />
              <p className="text-center font-bold py-2">demouser</p>
            </div>
            <div
              onClick={() => cb()}
              className="flex flex-col shadow-md hover:shadow-2xl bg-white rounded-xl overflow-hidden cursor-pointer"
            >
              <div className="flex flex-1 items-center justify-center bg-slate-200">
                <IoMdAddCircle size={50} className="text-blue-700" />
              </div>
              <p className="text-center font-bold text-blue-700 py-2">
                Thêm tài khoản
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="shadow-xl bg-white w-full max-w-[400px] px-4 py-6 rounded-xl">
          <Form
            name="formLogin"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            layout="vertical"
            size="large"
          >
            <Form.Item<LoginType>
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item<LoginType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item<LoginType> name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button className="block w-full" type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
            <p className="text-center text-blue-700 cursor-pointer pb-3 mb-4 border-b-2">
              Forgot password?
            </p>
            <div className="text-center">
              <Button
                className="w-1/2 bg-green-600"
                type="primary"
                danger
                onClick={() => cb()}
              >
                SignUp
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
