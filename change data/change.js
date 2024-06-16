const fs = require("fs");

// Đường dẫn đến file data.json
const filePath = "data.json";
// Đọc file và xử lý nội dung
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Đã xảy ra lỗi khi đọc file:", err);
    return;
  }
  try {
    let Data = JSON.parse(data);
    // Data = randomImage(Data);
    // Data = randomFollows(Data);
    Data = randomApi("shareds", Data);
    Data = randomApi("likeds", Data);
    // Data = randomApi("shared", Data);
    // Data = triggerdata(Data);
    // Ghi lại nội dung file sau khi chỉnh sửa
    fs.writeFile(filePath, JSON.stringify(Data, null, 2), "utf8", (err) => {
      if (err) {
        console.error("Lỗi khi ghi file:", err);
        return;
      }
      console.log("Đã ghi lại file data.json thành công!");
    });
  } catch (err) {
    console.error("Lỗi khi parse JSON:", err);
  }
});

const randomImage = (Data) => {
  let posts = Data.posts;
  const getUrlPostImg = (num) => `/images/post/post (${num}).jfif`;
  posts = posts.map((item, index) => ({
    ...item,
    img_url: getUrlPostImg((index + 1) % 41 === 0 ? 1 : (index + 1) % 41 === 0),
  }));
  return { ...Data, posts };
};

const randomFollows = (Data) => {
  let users = Data.users;
  let follows = [];
  for (let i = 0; i < 10; i++) {
    let k = 5;
    let arr2 = [];
    while (arr2.length <= k) {
      let randomId = randomUserId();
      if (randomId !== i) {
        let id = `${users[i].id}x${users[randomId].id}`;
        let item = { id, userId: users[i].id };
        if (!arr2.includes(item)) arr2.push(item);
      }
    }
    follows = [...follows, ...arr2];
  }
  return { ...Data, follows };
};

// random likeds, shareds: (posts-uers)
const randomApi = (atribute, Data) => {
  const users = Data.users;
  const posts = Data.posts;
  let arr = [];
  for (let i = 0; i < 100; i++) {
    let k = randomMinMax(4, 9);
    let arr2 = [];
    while (arr2.length <= k) {
      const newUserId = randomUserId();
      let id = `${posts[i].id}x${users[newUserId].id}`;
      let item = { id, postId: posts[i].id, userId: users[newUserId].id };
      const b = arr2.every((item) => item.id !== id);
      if (b) arr2.push(item);
    }
    arr = [...arr, ...arr2];
  }
  return { ...Data, [atribute]: arr };
};

const triggerdata = (Data) => {
  // set id start
  let nuserId = 1000000000001;
  let npostId = 1000000000101;
  let ncommentId = 1000000000201;
  let users = Data.users;
  let posts = Data.posts;
  let comments = Data.comments;
  users = users.map((user) => {
    let k = nuserId.toString();
    nuserId++;
    posts = posts.map((post) =>
      post.userId === user.id ? { ...post, userId: k } : post
    );
    comments = comments.map((comment) =>
      comment.userId === user.id ? { ...comment, userId: k } : comment
    );
    return { ...user, id: k };
  });
  posts = posts.map((post) => {
    let k = npostId.toString();
    npostId++;
    comments = comments.map((comment) =>
      comment.postId === post.id ? { ...comment, postId: k } : comment
    );
    return { ...post, id: k };
  });
  comments = comments.map((comment) => {
    let k = ncommentId.toString();
    ncommentId++;
    return {
      ...comment,
      id: k,
    };
  });
  return {
    users,
    posts,
    comments,
  };
};

// random: 1->10
const randomUserId = () => Math.floor(Math.random() * 10);
// ran dom min->max
const randomMinMax = (min, max) =>
  Math.floor(Math.random() * (1 + max - min) + min);
