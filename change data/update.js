const fs = require("fs");

// Biến toàn cục để theo dõi số lượng id đã tạo
let idCounter = {
  users: 0,
  posts: 0,
  comments: 0,
  todos: 0,
};

// Hàm sinh ID duy nhất và tăng dần
function generateUniqueId(type) {
  idCounter[type]++;
  const idString = idCounter[type].toString().padStart(3, "0");
  return `${type}${idString}`;
}

// Đọc nội dung từ file db.json
fs.readFile("db.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  try {
    // Chuyển đổi dữ liệu JSON thành một đối tượng JavaScript
    let dbData = JSON.parse(data);

    // Cập nhật lại các ID trong users và đồng thời cập nhật userId trong posts, todos và comments
    dbData.users.forEach((user) => {
      let newUserId = generateUniqueId("u");

      // Cập nhật userId trong posts
      dbData.posts.forEach((post) => {
        if (post.userId === user.id) {
          post.userId = newUserId;
        }
      });

      // Cập nhật userId trong todos
      dbData.todos.forEach((todo) => {
        if (todo.userId === user.id) {
          todo.userId = newUserId;
        }
      });

      // Cập nhật userId trong comments
      dbData.comments.forEach((comment) => {
        if (comment.userId === user.id) {
          comment.userId = newUserId;
        }
      });

      // Cập nhật id của user
      user.id = newUserId;
    });

    // Cập nhật lại các ID trong posts và đồng thời cập nhật postId trong comments
    dbData.posts.forEach((post) => {
      let newId = generateUniqueId("p");

      // Cập nhật postId trong comments
      dbData.comments.forEach((comment) => {
        if (comment.postId === post.id) {
          comment.postId = newId;
        }
      });

      // Cập nhật id của post
      post.id = newId;
    });

    // Cập nhật lại các ID trong comments
    dbData.comments.forEach((comment) => {
      comment.id = generateUniqueId("c");
    });

    // Cập nhật lại các ID trong todos
    dbData.todos.forEach((todo) => {
      todo.id = generateUniqueId("t");
    });

    // Ghi lại các thay đổi vào file db.json
    fs.writeFile("db.json", JSON.stringify(dbData, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Error writing file:", err);
        return;
      }
      console.log("Updated db.json with new IDs and userIds.");
    });
  } catch (err) {
    console.error("Error parsing JSON:", err);
  }
});
