"use client";

import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
import { LoginType } from "@/types/antd";
import { checkLogin, getUser } from "@/app/_components/checkLogin";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { LOGIN } from "@/redux/actions/loginActions";
import { useRouter } from "next/navigation";

const Login = ({ cb }: { cb: () => void }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const onFinish: FormProps<LoginType>["onFinish"] = async (values) => {
    const res = await checkLogin(values.username, values.password);
    if (res) {
      const data = await getUser(values.username);
      dispatch(LOGIN(data[0]));
      Swal.fire({
        icon: "success",
        title: "Go to home after 3 seconds ",
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
  return (
    <Form
      name="formLogin"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      <h2 className="font-bold text-3xl text-center py-6">Welcome</h2>
      <Form.Item<LoginType>
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<LoginType>
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<LoginType> name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item>
        <div className="flex justify-end">
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </div>
      </Form.Item>
      <div>
        <Button onClick={() => cb()}>Or SignUp</Button>
      </div>
    </Form>
  );
};

export default Login;
