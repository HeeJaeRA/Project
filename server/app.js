require("dotenv").config({ path: "./db/project.env" });
const express = require("express");
const app = express();
const mysql = require("./db.js");
const multer = require("multer"); //멀터가져오기
const path = require("path"); //path가져오기

const storage = multer.diskStorage({
  //디스크 저장소에 대한 객체를 생성  //파일이 저장될 위치 , 파일 명에 대한 것을 정의
  destination: function (req, file, cb) {
    cb(null, "uploads/"); //express server내에  uploads폴더가 있어야함 //cd콜백함수를 통해 전송된 파일 저장 디렉터리설정
  },
  filename: function (req, file, cb) {
    //사용자가 입력한 파일이름은 중복 가능성이 있기 때문에 유니크한 값을 주기 위해
    cb(null, new Date().valueOf() + path.basename(file.originalname)); //file.originalname (사용자가 업로드한 파일의 이름)
  },
});

const upload = multer({ storage: storage }); //multer인스턴스

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

//이벤트 전체 리스트 출력
app.get("/event", async (req, res) => {
  let list = await mysql.query("eventList");
  res.send(list);
});

//이벤트 단건조회  (쿠폰까지)
app.get("/event/:no", async (req, res) => {
  let data = req.params.no;
  let list = await mysql.query("eventInfo", data);
  res.send(list[0]); // 배열로 넘어오니까
});

//이벤트 등록
app.post("/event", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("insertEvent", data);
  res.send(result);
});

//이벤트 수정
app.put("/event/:no", async (req, res) => {
  let datas = [req.body.param, req.params.no];
  let result = await mysql.query("eventUpdate", datas);
  res.send(result);
});

//이벤트 삭제
app.delete("/event/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("eventDelete", data);
  res.send(result);
});

// //이벤트이미지등록
// app.post("/photos", upload.single("avatar"), (req, res) => {
//   //단일 처리    //avatar 어떤 이름으로 받을지 정해줘야함
//   console.log(req.file); //단건
//   console.log(req.body); //미들웨어가 중간에서 돌면서  file/ body 로 나뉘게됨
// });

//전체 쿠폰 목록
app.get("/coupon", async (req, res) => {
  let list = await mysql.query("couponList");
  res.send(list);
});

//쿠폰등록
app.post("/coupon", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("insertCoupon", data);
  res.send(result);
});

//쿠폰수정
app.put("/coupon/:no", async (req, res) => {
  let datas = [req.body.param, req.params.no];
  let result = await mysql.query("couponUpdate", datas);
  res.send(result);
});

//쿠폰-등급별 회원리스트 출력
app.get("/user/:grade", async (req, res) => {
  let data = req.params.grade;
  let list = await mysql.query("gradeUserList", data);
  res.send(list);
});

//활동회원전체리스트
app.get("/user", async (req, res) => {
  let list = await mysql.query("userList");
  res.send(list);
});

//쿠폰일괄발급
app.post("/usercoupon", async (req, res) => {
  let { grade, couponInfo } = req.body; //화면에서 받아온 등급정보, 쿠폰코드 , 쿠폰상태
  let result = insertCoupon(grade, couponInfo);
  res.send(result);
});

//함수 선언식으로 작성할것 ( 위에서 호출하니까.. )
async function insertCoupon(grade, couponInfo) {
  let count = 0;
  let list;
  if (grade != null) {
    list = await mysql.query("gradeUserList", grade); //등급별 회원리스트
  } else {
    list = await mysql.query("userList"); //전체 회원리스트
  }
  //아이디뽑아냄
  for (let user of list) {
    count += couponInsert(user.user_id, couponInfo);
  }
  console.log(count);
  return count;
}

//뽑아온 아이디로 최종 인서트 진행
async function couponInsert(id, couponInfo) {
  let data = {
    user_id: id,
    coupon_code: couponInfo.selectCoupon,
    coupon_status: couponInfo.status,
  };
  let result = await mysql.query("insertUserCoupon", data);
  //console.log(result);
  //return result.data.affectedRows > 0 ? 1 : 0;
}
