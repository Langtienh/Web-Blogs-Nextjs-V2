# Getting Started

Sau khi clone cần cài đặt các package cần thiết

```bash
npm i
```

Nếu bị lỗi cập nhật hoặc cài đặt nodejs mới nhất và chạy

```bash
npm i --legacy-peer-deps
```

# Getting Demo

Chạy chế độ product (trải nghiệm thực tế)

- trước tiên phải build src thành product
  (quá trình này chạy khá lâu nhưng chỉ cần 1 lần)

```bash
npm run build
```

- sử dụng (sau khi chạy lệnh bash chờ khoảng 5s để khởi động server)

```bash
npm run product
```

- mở link [`http://localhost:3000`] để sử dụng

# Chức các chức năng

- Đăng ký. Đăng nhập
- Viết bài
- Xem bài viết
- lưu trữ bài viết của mình
- Comment trong bài viết
- Follow users khác
- Vote up/vote down bài viết (like share)

# Công nghệ chính

- NextJs, swr
- Antd, tailwind-CSS,

# development

Chạy chế độ development server (sẽ load các trang lần đầu lâu):

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
