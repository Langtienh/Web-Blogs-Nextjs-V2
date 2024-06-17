"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Popover } from "antd";
import { checkSignup, addUser } from "@/actions/auth/checkSignup";
import Swal from "sweetalert2";
import { SignupType } from "@/types/antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const img_url_default = "/images/hero.png";
// "https://i.pinimg.com/originals/11/d2/27/11d2272b9a2185b9b8e786050f8e6b67.jpg";

const Signup = ({ cb }: { cb: () => void }) => {
  const onFinish: FormProps<SignupType>["onFinish"] = async (values) => {
    const res: boolean = await checkSignup(values.email, values.username);
    if (res) {
      // cần fix, mặc định là chỉ check username và email
      const res2 = await addUser(values);
      Swal.fire({
        icon: "success",
        title: "Account successfully created",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        cb();
      }, 2000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Email or Usename existed",
        showConfirmButton: true,
        timer: 2000,
      });
    }
  };

  const onFinishFailed: FormProps<SignupType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl px-3 py-4">
        <Form
          name="formsignup"
          initialValues={{ remember: true, img_url: img_url_default }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          size="large"
        >
          <h2 className="text-3xl font-bold">Đăng ký</h2>
          <p className="font-bold text-gray-500 py-2 mb-3 border-b-2">
            Nhanh chóng và dễ dàng.
          </p>
          <div className="flex gap-3">
            <Form.Item<SignupType>
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
            <Form.Item<SignupType>
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input placeholder="demo@gmail.com" type="email" />
            </Form.Item>
          </div>
          <Popover
            placement="bottomLeft"
            content={
              <p className="text-red-500 font-bold">Avatar URL default</p>
            }
          >
            <Form.Item<SignupType>
              name="img_url"
              rules={[
                { required: true, message: "Please input your avatar URL!" },
              ]}
            >
              <Input prefix="" placeholder="https://" />
            </Form.Item>
          </Popover>
          <Form.Item<SignupType>
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item<SignupType>
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item<SignupType> name="remember" valuePropName="checked">
            <Checkbox>Tôi đồng ý với điều khoản sử dụng</Checkbox>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-center">
              <Button className="w-3/4" type="primary" htmlType="submit">
                Signin
              </Button>
            </div>
          </Form.Item>
          <p className="font-bold text-[#1677ff] text-center pb-2 border-b-2 mb-2">
            Đã có tài khoản
          </p>
          <div className="text-center">
            <Button danger className="w-1/2" onClick={() => cb()}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
