"use client";

import { Button, Empty } from "antd";
import { useRouter } from "next/navigation";

const IsNotLogin = () => {
  const router = useRouter();
  return (
    <div className="text-center">
      <Empty />
      <Button type="primary" onClick={() => router.push("/")}>
        Login now
      </Button>
    </div>
  );
};

export default IsNotLogin;
