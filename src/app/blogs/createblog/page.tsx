/* eslint-disable @next/next/no-img-element */
"use client";

import { createPost } from "@/actions/listpost/createPost";
import IsNotLogin from "@/components/isNotLogin";
import { baseURL } from "@/constant/constant";
import { initialPost } from "@/initial/backend";
import { IPost, IUser } from "@/types/backend";
import { IStore } from "@/types/redux";
import { newID } from "@/utils/id";
import { Button, Form, Input, Spin } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { mutate } from "swr";

const CreatePost = () => {
  // page chỉ dùng cho người đã đăng nhập
  const auth: IUser = useSelector((state: IStore) => state.user);
  const isLogin: boolean = useSelector((state: IStore) => state.isLogin);
  // phải điền đủ form mới được gửi
  const [canCreate, setCanCreate] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isPostding, setIsPostding] = useState<boolean>(false);
  const onFinish = async (value: IPost) => {
    const post = {
      ...initialPost,
      ...value,
      id: newID(),
      userId: auth.id,
    };
    const postData = async () => {
      // loading post api
      setIsPostding(true);
      try {
        const res = await createPost(post);
        mutate(`${baseURL}posts?_page=1&_per_page=10&_sort=-id`);
      } finally {
        setIsPostding(false);
      }
    };
    postData();
    form.resetFields();
  };
  const onValuesChange = (_: any, values: IPost) => {
    setCanCreate(!!(values.title && values.img_url && values.body));
  };
  if (isLogin)
    return (
      <Spin spinning={isPostding}>
        <div className="bg-white rounded-md py-3 px-2">
          <div className="flex gap-3 items-center">
            <img
              className="w-9 h-9 rounded-full"
              src={auth?.img_url}
              alt="avatar"
            />
            <h2 className="text-lg text-gray-600 font-bold">
              {auth?.name} ơi, hôm nay bạn muốn nói điều gì?
            </h2>
          </div>
          <div className="mt-3">
            <Form
              form={form}
              name="createPost"
              size="large"
              autoComplete="on"
              onFinish={onFinish}
              layout="vertical"
              onValuesChange={onValuesChange}
            >
              <Form.Item
                rules={[
                  { required: true, message: "Please input post title!" },
                ]}
                name="title"
                label="Title"
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "Please input post body!" }]}
                name="img_url"
                label="Image"
                initialValue="https://i.pinimg.com/474x/81/8c/b8/818cb8b5d48d8bfa314e925472b90264.jpg"
              >
                <Input placeholder="https://" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input post img url!" },
                ]}
                name="body"
                label="Body"
              >
                <Input.TextArea rows={5} />
              </Form.Item>
              <Form.Item>
                <Button
                  disabled={!canCreate}
                  type="primary"
                  className="w-full"
                  htmlType="submit"
                >
                  Đăng
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Spin>
    );
  return <IsNotLogin />;
};
export default CreatePost;
