"use client";

import { baseURL, fetcher, swrconfig } from "@/constant/constant";
import { IComment, IUser } from "@/types/backend";
import { Button, Form, Input, Spin } from "antd";
import useSWR, { mutate } from "swr";
import UserItem from "@/components/blogs/user.item";
import { useState } from "react";
import axios from "axios";
import { newID } from "@/utils/id";
import { isClient } from "@/utils/isClient";

export default function Comments({ postId }: { postId: string }) {
  let auth: IUser | null = null;
  if (isClient()) {
    const _auth = localStorage.getItem("auth");
    auth = _auth ? JSON.parse(_auth) : null;
  }
  const [content, setContent] = useState<string>("");
  const [loadding, setLoadding] = useState<boolean>(false);

  const { data }: { data: IComment[] } = useSWR(
    `${baseURL}comments?postId=${postId}&_sort=-id`,
    fetcher,
    {
      ...swrconfig,
      revalidateIfStale: true,
    }
  );
  if (!data)
    return (
      <div className="text-center">
        <Spin />
      </div>
    );
  const onChange = (e: any) => {
    setContent(e.target.value);
  };
  const onSubmit = async () => {
    setLoadding(true);
    let newComment = {
      id: newID(),
      postId,
      userId: auth?.id,
      body: content,
    };
    mutate(`${baseURL}comments?postId=${postId}&_sort=-id`, [
      ...data,
      newComment,
    ]);
    try {
      const res = await axios.post(`${baseURL}comments`, newComment);
    } catch {
      mutate(`${baseURL}comments?postId=${postId}&_sort=-id`, data);
    } finally {
      await mutate(`${baseURL}comments?postId=${postId}&_sort=-id`);
      setContent("");
      setLoadding(false);
    }
  };
  return (
    <div className="mb-52 p-3 bg-white rounded-b-md">
      <Spin spinning={loadding}>
        <Form className="flex">
          <Input
            className="flex-1"
            onChange={onChange}
            size="large"
            value={content}
            placeholder="Viết câu trả lời"
          />
          <Button
            htmlType="submit"
            onClick={onSubmit}
            disabled={!content}
            type="primary"
            size="large"
          >
            Gửi
          </Button>
        </Form>
      </Spin>
      <div>
        {data.map((comment: IComment) => (
          <div key={comment.id} className="mt-3 bg-slate-200 rounded-md p-2">
            <UserItem userId={comment.userId} dot />
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
