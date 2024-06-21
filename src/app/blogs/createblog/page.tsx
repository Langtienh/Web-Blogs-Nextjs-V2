/* eslint-disable @next/next/no-img-element */
"use client";

import IsNotLogin from "@/components/isNotLogin";
import { baseURL, fetcher } from "@/constant/constant";
import { initialPost } from "@/initial/backend";
import { IPost, IUser } from "@/types/backend";
import { newID } from "@/utils/id";
import { isClient } from "@/utils/isClient";
import { Button, Form, Input, Modal, Result, Spin } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const CreatePost = () => {
  let auth: IUser | null = null;
  let isLogin = false;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
    isLogin = !!auth;
  }
  // mutate để chuyển về trang chủ được cập nhật dữ liệu
  const { data } = useSWR(
    `${baseURL}posts?_page=1&_per_page=10&_sort=-id`,
    fetcher
  );
  // page chỉ dùng cho người đã đăng nhập
  // thêm modal chuyển trang xem bài viết hoặc ở lại trang
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
    router.push("/blogs");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // phải điền đủ form mới được gửi
  const [canCreate, setCanCreate] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [isPostding, setIsPostding] = useState<boolean>(false);
  const onFinish = async (value: IPost) => {
    const post = {
      ...initialPost,
      ...value,
      id: newID(),
      userId: auth?.id,
    };
    const postData = async () => {
      // loading post api
      setIsPostding(true);
      try {
        const res = await axios.post(`${baseURL}posts`, post);
        await mutate(`${baseURL}posts?_page=1&_per_page=10&_sort=-id`);
        `${baseURL}posts?userId=${auth?.id}&_page=1&_per_page=3&_sort=-id`;
      } finally {
        setIsPostding(false);
      }
    };
    postData();
    form.resetFields();
    setIsModalOpen(true);
  };
  const onValuesChange = (_: any, values: IPost) => {
    setCanCreate(!!(values.title && values.img_url && values.body));
  };
  if (isLogin)
    return (
      <Spin spinning={isPostding}>
        <Modal title="Basic Modal" open={isModalOpen} footer={null}>
          <Result
            status="success"
            title="Tạo bài viết thành công"
            subTitle="Xem bài viết?"
            extra={[
              <Button
                size="large"
                onClick={handleOk}
                type="primary"
                key="console"
              >
                Go
              </Button>,
              <Button size="large" onClick={handleCancel} key="buy">
                Ở lại
              </Button>,
            ]}
          />
        </Modal>
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
