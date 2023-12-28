require("dotenv").config({ path: "./db/project.env" });
const express = require("express");
const app = express();
const mysql = require("./db.js");

app.use(express.json({ limit: "50mb" }));

app.listen(3000, () => {
  console.log("서버 시작");
});

app.post("/login", async (request, response) => {
  let data = request.body.param;
  console.log("data : ", data);

  let result = await mysql.query("login", data.userId);
  console.log("result : ", result);

  let reps = {
    check: "",
  };
  if (result) {
    if (result.userPw == data.userPw) {
      reps.check = "다맞음";
      reps.userName = result.user_name;

      //세션추가
    } else {
      reps.check = "비번틀림";
    }
  } else {
    reps.check = "아이디틀림";
  }
  response.send(reps);
});

//장바구니 전체 불러오기
app.get("/cart", async (request, res) => {
  res.send(await mysql.query("cartList"));
});

//장바구니 단건 조회하기
app.get("/cart/:uid", async (request, res) => {
  res.send((await mysql.query("cartUser", request.params.uid))[0]);
});
