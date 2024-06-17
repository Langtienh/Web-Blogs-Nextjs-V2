(async () => {
  const open = await import("open");

  // Chờ 5 giây để đảm bảo server đã khởi động
  setTimeout(() => {
    open.default("http://localhost:3000");
  }, 5000);
})();
