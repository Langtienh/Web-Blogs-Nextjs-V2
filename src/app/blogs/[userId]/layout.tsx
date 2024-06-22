import type { Metadata } from "next";
import { Suspense } from "react";
import PostSkeleton from "@/components/post.skeleton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Suspense fallback={<PostSkeleton />}>{children}</Suspense>;
}
