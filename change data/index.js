const baseURL = "http://localhost:8000/";
const postId = "1718464000104";
const authId = "1718464000001";
const userId = "1718464000003";
let url = "";
// get post and auth
// url = `${baseURL}posts/${postId}?_embed=user`; // ok
// get follows
// url = `${baseURL}users/${authId}?_embed=follows`; //ok
// check auth follow user ???
url = `${baseURL}follows/${authId}x${userId}`;
const getAPi = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch {
    return 0;
  }
};

const fs = require("fs");

// Đường dẫn đến file output.json
const filePath = "output.json";

const updateFile = async () => {
  try {
    // Đọc nội dung hiện tại của file
    const fileData = fs.readFileSync(filePath, "utf8");

    // Lấy dữ liệu từ API
    const data = await getAPi();

    // Ghi dữ liệu mới vào file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
    console.log("Đã ghi lại file output.json thành công!");
  } catch (err) {
    console.error("Đã xảy ra lỗi:", err);
  }
};

// Gọi hàm updateFile
updateFile();
