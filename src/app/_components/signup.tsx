"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { checkSignup, addUser } from "@/app/_components/checkSignup";
import Swal from "sweetalert2";
import { SignupType } from "@/types/antd";

const img_url_default =
  "https://i.pinimg.com/originals/11/d2/27/11d2272b9a2185b9b8e786050f8e6b67.jpg";

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
        timer: 3000,
      });
      setTimeout(() => {
        cb();
      }, 3000);
    } else {
      Swal.fire({
        icon: "error",
        title: "Email or Usename existed",
        showConfirmButton: true,
        timer: 3000,
      });
    }
  };

  const onFinishFailed: FormProps<SignupType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="formLogin"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true, img_url: img_url_default }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <h2 className="font-bold text-3xl text-center py-3">
        Signup to continue...
      </h2>
      <div className="flex gap-3">
        <Form.Item<SignupType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<SignupType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input type="email" />
        </Form.Item>
      </div>
      <Form.Item<SignupType>
        label="Avatar URL"
        name="img_url"
        rules={[{ required: true, message: "Please input your avatar URL!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<SignupType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<SignupType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<SignupType> name="remember" valuePropName="checked">
        <Checkbox>Tôi đồng ý với điều khoản sử dụng</Checkbox>
      </Form.Item>
      <Form.Item>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Signin
          </Button>
        </div>
      </Form.Item>
      <div className="flex items-center gap-4">
        {"There are accounts =>"}
        <Button onClick={() => cb()}>Login</Button>
      </div>
    </Form>
  );
};

export default Signup;
