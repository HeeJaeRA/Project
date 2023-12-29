require("dotenv").config({ path: "./db/project.env" });
const express = require("express");
const app = express();
const mysql = require("./db.js");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.basename(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use(express.json({ limit: "50mb" }));

app.use("/public", express.static("img/"));

app.post("/photo", upload.single("file"), (req, res) => {
  let file = req.file;
  res.status(200).json({ message: "등록성공", filename: file.filename });
});

// app.post('/node/photos', upload.array('file'), (req, res) => {
// 	let filenames = req.files.map((file) => file.filename);
// 	res.json({ filenames });
// });

app.post("/ptupload", async (req, rep) => {
  let result = await mysql.query("ptinsert", req.body.param);
  rep.send(result);
});

app.get("/ptlist", async (req, rep) => {
  let result = await mysql.query("ptlist");
  rep.send(result);
});

app.get("/ptlist/:no", async (req, rep) => {
  let result = await mysql.query("ptinfo", req.params.no);
  rep.send(result[0]);
});

app.get("/rs", async (req, rep) => {
  let result = await mysql.query("rslist");
  rep.send(result);
});

app.get("/restaurants", async (req, rep) => {
  let result = await mysql.query("rsalllist");
  rep.send(result);
});

app.get("/restaurants/:no", async (req, rep) => {
  let result = await mysql.query("rsinfo", req.params.no);
  rep.send(result[0]);
});

app.post("/rslike/:no", async (req, rep) => {
  let result = await mysql.query("rslike", req.params.no);
  rep.send(result);
});

app.listen(3000, () => {
  console.log("서버 시작");
});

// 공지사항 전체 조회
app.get("/notices", async (request, res) => {
  res.send(await mysql.query("noticelist"));
});

// 공지사항 상세 조회
app.get("/notices/:bno", async (request, res) => {
  res.send((await mysql.query("noticeinfo", request.params.bno))[0]);
});

// 공지사항 조회수
app.put("/notices/:bno", async (request, res) => {
  let data = request.params.bno;
  res.send(await mysql.query("viewcnt", data));
});

// 커뮤니티 전체 조회
app.get("/community", async (request, res) => {
  res.send(await mysql.query("comlist"));
});

// 커뮤니티 상세 조회
app.get("/community/:bno", async (request, res) => {
  res.send((await mysql.query("cominfo", request.params.bno))[0]);
});

// 커뮤니티 등록
app.post("/community", async (request, res) => {
  let data = request.body.param;
  res.send(await mysql.query("cominsert", data));
});

// 커뮤니티 수정
app.put("/community/:bno", async (request, res) => {
  let data = [request.body.param, request.params.bno];
  let result = await mysql.query("comupdate", data);
  res.send(result);
});

// 커뮤니티 삭제
app.delete("/community/:bno", async (request, res) => {
  res.send((await mysql.query("comdelete", request.params.bno))[0]);
});

// 커뮤니티 조회수
app.patch("/community/:bno", async (request, res) => {
  let data = request.params.bno;
  res.send(await mysql.query("comviewcnt", data));
});

// 이벤트 전체 조회
app.get("/event", async (request, res) => {
  res.send(await mysql.query("eventlist"));
});

// 이벤트 상세 조회
app.get("/event/:bno", async (request, res) => {
  res.send((await mysql.query("eventinfo", request.params.bno))[0]);
});

// qna 전체 조회
app.get("/qna", async (request, res) => {
  res.send(await mysql.query("qnalist"));
});

// qna 상세 조회
app.get("/qna/:bno", async (request, res) => {
  res.send((await mysql.query("qnainfo", request.params.bno))[0]);
});

// 답글
app.get("/answer", async (request, res) => {
  // query string => ?key=value&key=value...
  let data = request.query.bno;
  res.send((await mysql.query("answerinfo", data))[0]);
});

//로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/login", async (request, response) => {
  let data = request.body.param;
  console.log("data : ", data.userId);

  let result = await mysql.query("login", data.userId);
  console.log("result : ", result);

  let reps = {
    check: "",
    id: "",
  };
  if (result.length != 0) {
    // console.log("result.length = ",result.length);
    // console.log("data.userPw  = ",data.userPw);
    // console.log("result.user_pw  = ",result[0].user_pw);//비밀번호

    if (result[0].user_pw == data.userPw) {
      reps.check = "다맞음";
      reps.id = result[0].user_id;
      console.log("result.user_id  = ", result[0].user_id);
    } else {
      reps.check = "비번틀림";
    }
  } else {
    reps.check = "아이디틀림";
  }
  response.send(reps);
  console.log("reps.check : ", reps.check);
});

//회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/join", async (request, response) => {
  let data = request.body.param;
  console.log("joindata = ", data);
  response.send(await mysql.query("join", data));
});

//회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡ
app.post("/joinIdCheck", async (request, response) => {
  let data = request.body.param;
  console.log("joinIdCheck : ", data);
  const result = await mysql.query("login", data.user_id);
  response.send(result.length > 0 ? false : true);
});

//회원가입 시 닉네임 중복체크ㅡㅡㅡㅡㅡ
app.post("/joinNicknameCheck", async (request, response) => {
  let data = request.body.param;
  console.log("joinNicknameCheck : ", data);
  const result = await mysql.query("login", data.nickname);
  response.send(result.length > 0 ? false : true);
});
//-------------------------------------------- 관리자 주은이---------------
//이벤트 전체 리스트 출력
app.get("/adminevent", async (req, res) => {
  let list = await mysql.query("eventList");
  res.send(list);
});

//이벤트 단건조회  (쿠폰까지)
app.get("/adminevent/:no", async (req, res) => {
  let data = req.params.no;
  let list = await mysql.query("eventInfo", data);
  res.send(list[0]); // 배열로 넘어오니까
});

//이벤트 등록
app.post("/adminevent", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("insertEvent", data);
  res.send(result);
});

//이벤트 수정
app.put("/adminevent/:no", async (req, res) => {
  let datas = [req.body.param, req.params.no];
  let result = await mysql.query("eventUpdate", datas);
  res.send(result);
});

//이벤트 삭제
app.delete("/adminevent/:no", async (req, res) => {
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
app.get("/admincoupon", async (req, res) => {
  let list = await mysql.query("couponList");
  res.send(list);
});

//쿠폰 단건조회
app.get("/admincoupon/:no", async (req, res) => {
  let data = req.params.no;
  let list = await mysql.query("couponInfo", data);
  res.send(list[0]); // 배열로 넘어오니까
});

//쿠폰등록
app.post("/admincoupon", async (req, res) => {
  let data = req.body.param;
  let result = await mysql.query("insertCoupon", data);
  res.send(result);
});

//쿠폰수정
app.put("/admincoupon/:no", async (req, res) => {
  let datas = [req.body.param, req.params.no];
  let result = await mysql.query("couponUpdate", datas);
  res.send(result);
});

//쿠폰삭제
app.delete("/admincoupon/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("couponDelete", data);
  res.send(result);
});

//쿠폰-등급별 회원리스트 출력
app.get("/adminuser/:grade", async (req, res) => {
  let data = req.params.grade;
  let list = await mysql.query("gradeUserList", data);
  res.send(list);
});

//활동회원전체리스트
app.get("/adminuser", async (req, res) => {
  let list = await mysql.query("adminuserList");
  res.send(list);
});

//쿠폰일괄발급
app.post("/adminusercoupon", async (req, res) => {
  let { grade, couponInfo } = req.body; //화면에서 받아온 등급정보, 쿠폰코드 , 쿠폰상태
  let result = await insertCoupon(grade, couponInfo);
  res.send({ result });
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
    let result = await couponInsert(user.user_id, couponInfo);
    // 비동기 병렬처리
    count += result;
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
  //console.log(typeof result.affectedRows);
  return result.affectedRows > 0 ? 1 : 0;
}

//승인대기 판매자 리스트 출력
app.get("/adminConfirm", async (req, res) => {
  let list = await mysql.query("adminConfirmSeller");
  res.send(list);
});

//승인대기> 영업승인으로 업데이트
app.put("/adminApprove/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("adminApprove", data);
  res.send(result);
});

//승인된 업체목록 전체리스트
app.get("/adminRsList", async (req, res) => {
  let list = await mysql.query("adminRsList");
  res.send(list);
});

//미답변+판매자
app.get("/adminSellerNqna", async (req, res) => {
  let list = await mysql.query("adminSellerNqna");
  res.send(list);
});

//미답변+일반유저

app.get("/adminUserNqna", async (req, res) => {
  let list = await mysql.query("adminUserNqna");
  res.send(list);
});

//-------------------------------------------- 관리자 주은이---------------
