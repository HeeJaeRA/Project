require("dotenv").config({ path: "./db/project.env" });
const express = require("express");
const app = express();

const mysql = require("./db.js");
const multer = require("multer");
const path = require("path");
const { request } = require("http");
const cron = require("node-cron");

//세션
const session = require('express-session');
const cors = require('cors');

//세션세팅
let sessionSetting = session({
	secret: 'secret key', //암호화할때 쓰이는 기본키 설정
	resave: false, //새로 저장하는 부분에서 변경사항이 없어도 저장할건지 말건지
	saveUninitialized: true, //저장소에 값 저장할건지 말건지
	cookie: {
		httpOnly: true, // 자바스크립트로 접근 못하고 통신으로만 접근가능
		secure: false, // 보안강화(https만 왔다갔다 접근할 수 있도록, 원래는 true로 동작을 하는게 좋음)
		maxAge: 60000, //60초 동안 동작 안 할시 node세션에선 삭제됨 (node 세션은 storage에 저장하기 전까진 console.log로 찍어보지 않는 이상 못 봄 )
	},
});
app.use(sessionSetting);

const corsOptions = {
	//외부와 데이터를 주고 받는 형태면 이거 해줘야함
	origin: 'http://192.168.0.34:5500', //(origin : 페이지쪽 주소)
	optionSuccessStatus: 200, //오래된 브라우저에서 상태코드를 변경해서 인식할 수 있도록 지원하는 것(선택사항)
};
app.use(cors(corsOptions)); //cors안에 넣어서 서버에 등록
//모든 처리는 서버쪽에서 해줘야 함(cors).

//ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

app.get('/restaurants', async (req, rep) => {
	let result = await mysql.query('rsalllist');
	rep.send(result);
});

app.get('/restaurantpage/:no', async (req, rep) => {
	let cnt = (req.params.no - 1) * 10;
	let result = await mysql.query('rsalllistp', cnt);
	rep.send(result);
});

app.put('/rsStatus/:code', async (req, rep) => {
	let result = await mysql.query('rsStatusUpdate', req.params.code);
	rep.send(result);
});

app.get('/myrestaurants/:id', async (req, rep) => {
	let result = await mysql.query('rsmylist', req.params.id);
	rep.send(result);
});

//그외 사진들
const storage = multer.diskStorage({
  //디스크 저장소에 대한 객체를 생성  //파일이 저장될 위치 , 파일 명에 대한 것을 정의
  destination: function (req, file, cb) {
    cb(null, "img/uploads/"); //express server내에  uploads폴더가 있어야함 //cd콜백함수를 통해 전송된 파일 저장 디렉터리설정
  },
  filename: function (req, file, cb) {
    //사용자가 입력한 파일이름은 중복 가능성이 있기 때문에 유니크한 값을 주기 위해
    cb(null, new Date().valueOf() + path.basename(file.originalname)); //file.originalname (사용자가 업로드한 파일의 이름)
  },
});

//업체사진
const storage_rs = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/restaurant/");
  },
  filename: function (req, file, cb) {
    //사용자가 입력한 파일이름은 중복 가능성이 있기 때문에 유니크한 값을 주기 위해
    cb(null, new Date().valueOf() + path.basename(file.originalname)); //file.originalname (사용자가 업로드한 파일의 이름)
  },
});

//유저프로필사진
const storage_user = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "img/userimg/");
  },
  filename: function (req, file, cb) {
    //사용자가 입력한 파일이름은 중복 가능성이 있기 때문에 유니크한 값을 주기 위해
    cb(null, new Date().valueOf() + path.basename(file.originalname)); //file.originalname (사용자가 업로드한 파일의 이름)
  },
});

const upload = multer({ storage: storage });
const uploadRs = multer({ storage: storage_rs });
const uploadUser = multer({ storage: storage_user });

app.use(express.json({ limit: '50mb' }));
//세션세팅
// let sessionSetting = session ({
//     secret : 'secret key', //암호화할때 쓰이는 기본키 설정
//     resave : false, //새로 저장하는 부분에서 변경사항이 없어도 저장할건지 말건지
//     saveUninitialized : true,//저장소에 값 저장할건지 말건지
//     cookie :{
//         httpOnly : true,// 자바스크립트로 접근 못하고 통신으로만 접근가능
//         secure : false,// 보안강화(https만 왔다갔다 접근할 수 있도록, 원래는 true로 동작을 하는게 좋음)
//         maxAge : 60000
//     }
// });
// app.use(sessionSetting);

// const corsOptions = { //외부와 데이터를 주고 받는 형태면 이거 해줘야함
//     origin : 'http://192.168.0.34:5500',//(origin : 페이지쪽 주소)
//     optionSuccessStatus : 200 //오래된 브라우저에서 상태코드를 변경해서 인식할 수 있도록 지원하는 것(선택사항)
// }
// app.use(cors(corsOptions));//cors안에 넣어서 서버에 등록
// //middleApp.js에서 노드를 기반으로 서버연것과
// //index.html쪽에서 라이브서버를 기반으로 연 서버를 통신해보는 중(라이브(페이지)에서 express서버 정보를 요청)
// //모든 처리는 서버쪽에서 해줘야 함(cors).

// //메인에서 세션정보확인 가능
// app.get('/',(req, res)=>{
//     res.send(req.session);//세션전체정보 확인
// });
// //세션에 정보 저장
// app.post('/login', (req, res)=>{
//     const {id, pwd} = req.body;
//     req.session.user = id;//session.id라고 하면 안됨. 이미 기존에 id는 고유값이 있어서 덮어씌우면 이상한 값이 나옴
//     req.session.pwd = pwd;
//     req.session.save(function(err){
//         if(err) throw err; //에러가 있으면 예외처리
//         res.redirect('/');//메인으로 넘어감
//     })
// })
// //세션에 정보 삭제
// app.get('/logout', (req, res) =>{
//     req.session.destroy();//세션 정보 삭제
//     req.redirect('/');//메인으로 넘어감
// })

app.use(express.json({ limit: "50mb" }));

app.use("/public", express.static("img/"));

app.get("/restaurants", async (req, rep) => {
  let result = await mysql.query("rsalllist");
  rep.send(result);
});

app.get("/restaurantpage/:no", async (req, rep) => {
  let cnt = (req.params.no - 1) * 10;
  let result = await mysql.query("rsalllistp", cnt);
  rep.send(result);
});

app.put('/rsStatus/:code', async (req, rep) => {
	let result = await mysql.query('rsStatus', req.params.code);
	console.log(result[0].rs_status);
	if (result[0].rs_status == '영업승인') {
		result = await mysql.query('rsStatusUpdateA', req.params.code);
	} else {
		result = await mysql.query('rsStatusUpdateD', req.params.code);
	}
	rep.send(result);
});

app.get("/myrestaurants/:id", async (req, rep) => {
  let result = await mysql.query("rsmylist", req.params.id);
  rep.send(result);
});

app.get("/myrestaurantsW/:id", async (req, rep) => {
  let result = await mysql.query("rsmylistW", req.params.id);
  console.log(result);
  rep.send(result);
});

app.get("/myrestaurantsO/:id", async (req, rep) => {
  let result = await mysql.query("rsmylistO", req.params.id);
  rep.send(result);
});

app.get("/myrsreserv/:id", async (req, rep) => {
  let result = await mysql.query("sellermyreserv", req.params.id);
  rep.send(result);
});

app.get('/myrsreservall/:id', async (req, rep) => {
	let result = await mysql.query('sellermyreservall', req.params.id);
	rep.send(result);
});

app.post('/reviewPhotos', upload.array('files'), async (req, res) => {
	const reviewInfo = JSON.parse(req.body.reviewInfo);

  let rsCode = await mysql.query("reviewgetRcode", reviewInfo.reserve_num);
  reviewInfo.rs_code = rsCode[0].rs_code;
  let result = await mysql.query("reviewInsert", reviewInfo);
  let rvCode = result.insertId;
  // console.log(reviewInfo.star_taste, reviewInfo.star_price, reviewInfo.star_service, rvCode);
  result = await mysql.query("reviewstarupdate", [
    reviewInfo.rs_code,
    reviewInfo.rs_code,
    reviewInfo.rs_code,
    rvCode,
  ]);

  if (req.files && req.files.length > 0) {
    let filenames = req.files.map((file) => file.filename);

    let outcome = null;
    for (let filename of filenames) {
      outcome = await mysql.query("reviewPhotoInsert", [rvCode, filename]);
    }
    res.send(outcome);
  } else {
    res.send(result);
  }
});

app.get("/rsreviewlist/:code", async (req, rep) => {
  let result = await mysql.query("rsreviewlist", req.params.code);
  rep.send(result);
});

app.get("/boardreviewlist", async (req, rep) => {
  let result = await mysql.query("boardreviewlist");
  console.log(result);
  for (let rs of result) {
    // console.log(rs.rs_code);
    let outcome = await mysql.query("rsinfo", rs.rs_code);
    rs.rs_name = outcome[0].rs_name;
  }
  // console.log(result);
  rep.send(result);
});

app.get("/rstag/:tag", async (req, rep) => {
  let result = await mysql.query("rstag", req.params.tag);
  rep.send(result);
});

app.put("/checkCart/:num", async (req, rep) => {
  let result = await mysql.query("rvCheck", req.params.num);
  result = await mysql.query("visitCheck", req.params.num);
  let outcome = await mysql.query("rvGrade1", req.params.num);
  outcome = await mysql.query("rvGrade2", req.params.num);
  rep.send(result);
});

app.get("/selnotices", async (request, res) => {
  res.send(await mysql.query("selnoticelist"));
});

app.post("/photo", upload.single("file"), (req, res) => {
  let file = req.file;
  console.log(file);
  res.status(200).json({ message: "등록성공", filename: file.filename });
});

app.post("/rsphotos", uploadRs.array("files"), async (req, res) => {
  try {
    let rsInfo = req.body.rsobj;
    rsInfo = JSON.parse(rsInfo);
    let timeInfo = req.body.timeobj;
    timeInfo = JSON.parse(timeInfo);

    if (req.files && req.files.length >= 2) {
      rsInfo.rs_img = req.files[0].filename;
      rsInfo.license = req.files[1].filename;
    } else {
      rsInfo.rs_img = null;
      rsInfo.license = null;
    }
    // console.log(rsInfo);
    // console.log(timeInfo.time);

    let result = await mysql.query("rsInsert", rsInfo);

    // console.log(result);
    if (result.affectedRows == 1) {
      let rsCode = result.insertId;
      for (let i = 0; i < timeInfo.time.length; i++) {
        // console.log(timeInfo.time[i]);
        await mysql.query("rsTimeInsert", [rsCode, timeInfo.time[i]]);
      }
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

app.put("/rsphotos", uploadRs.array("files"), async (req, res) => {
  try {
    let rsInfo = req.body.rsobj;
    rsInfo = JSON.parse(rsInfo);
    let timeInfo = req.body.timeobj;
    timeInfo = JSON.parse(timeInfo);
    let rsCode = req.body.codeobj;
    rsCode = JSON.parse(rsCode).rsCode;

    // console.log(req.files);

    if (req.files && req.files.length >= 1) {
      rsInfo.rs_img = req.files[0].filename;
    }
    console.log(rsInfo);
    console.log(timeInfo.time);

    let result = await mysql.query("rsUpdate", [rsInfo, rsCode]);

    console.log(result);
    if (result.affectedRows == 1) {
      await mysql.query("rsTimeDelete", rsCode);
      for (let i = 0; i < timeInfo.time.length; i++) {
        // console.log(timeInfo.time[i]);
        await mysql.query("rsTimeInsert", [rsCode, timeInfo.time[i]]);
      }
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

/* app.post("/comPhotos", upload.array("files"), async (req, res) => {
  let bno = req.body.bno;
  let filenames = req.files.map((file) => file.filename);
  console.log(filenames);
  for (let filename of filenames) {
    let result = await mysql.query("comImgInsert", [bno, filename]);
  }
  res.json({ filenames });
}); */

app.get("/download/image/:filename", (req, res) => {
  let filename = req.params.filename; // 실제 이미지 파일의 이름
  let imagePath = path.join(__dirname, "img", "uploads", filename); // 이미지 전송
  res.download(imagePath);
});

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

// 예약하기 -------------------------------------------------------------------------
app.get("/book/:rno", async (request, res) => {
  let result = await mysql.query("getRestaurant", request.params.rno);
  res.send(result[0]);
});

app.get("/book/getTime/:rno", async (request, res) => {
  let result = await mysql.query("getTime", request.params.rno);
  res.send(result);
});

app.post('/book/goCart', async (request, res) => {
	// 카트에 인서트 칠 때, 대시보드에서 값을 확인하고, 있으면 대시보드에 인서트하고 없으면 업데이트
	let data = request.body.param;

	let getD = [data.rs_code, data.reserve_time, data.reserve_day, data.reserve_month, data.reserve_year];

	let inD = {
		reserve_year: data.reserve_year,
		reserve_month: data.reserve_month,
		reserve_day: data.reserve_day,
		reserve_time: data.reserve_time,
		seat_cnt: data.head_cnt,
		rs_code: data.rs_code,
	};

	let result = null;
	let result1 = await mysql.query('getDash', getD);

	// 값이 있는지 없는지 확인 0이면 없음
	//   console.log(result1.length);
	//   let num = result1[0].num;

	if (result1.length != 0) {
		let num = result1[0].num;
		//업데이트
		let datas = [data.head_cnt, num];
		result = await mysql.query('upDash', datas);
	} else {
		// 인서트
		result = await mysql.query('inDash', inD);
	}
	result = await mysql.query('goCart', data);
	console.log(result);
	res.send(result);

  // let task = cron.schedule("*/5 * * * * *", function () {
  //   console.log("5초마다 실행됨");
  // });
  // task.stop();
});

// 대시보드 -------------------------------------------------------------------------
// 일부는 위에 예약 부분과 1차 합침
app.get("/book/getSeat/:rc/:rt/:rd/:rm/:ry", async (request, res) => {
  let datas = [
    request.params.rc,
    request.params.rt,
    request.params.rd,
    request.params.rm,
    request.params.ry,
  ];
  let result = await mysql.query("getSeat", datas);
  console.log(result);
  console.log(result.length);
  if (result.length != 0) {
    result = result[0].seat_cnt;
  } else {
    result = 0;
  }

  res.json({ seat_cnt: result });
  console.log(result);
});

// 장바구니 -------------------------------------------------------------------------
app.get("/cartMy/:uid", async (request, res) => {
  res.send(await mysql.query("cartMyCnt", request.params.uid));
});

app.get("/cart/:uid", async (request, res) => {
  res.send(await mysql.query("cartList", request.params.uid));
});

app.delete("/cart/:uid", async (request, res) => {
  let getMy = await mysql.query("getMyCartList", request.params.uid);
  console.log(getMy);

  let result = await mysql.query("cartAllDel", request.params.uid);

  let arr = [];
  for (let ele of getMy) {
    arr = [];
    arr.push(
      ele.head_cnt,
      ele.rs_code,
      ele.reserve_time,
      ele.reserve_day,
      ele.reserve_month,
      ele.reserve_year
    );
    result = await mysql.query("delDash", arr);
    console.log("몇번실행함? 죽을래!");
  }
  console.log(arr);

  console.log(result);
  res.send(result);
});

app.put("/cart/:rescode", async (request, res) => {
  console.log(request.body);
  let getobj = request.body;
  console.log(getobj);

  let dashUp = [
    getobj.seat_cnt,
    getobj.rs_code,
    getobj.reserve_time,
    getobj.reserve_day,
    getobj.reserve_month,
    getobj.reserve_year,
  ];
  console.log(dashUp);
  let result = await mysql.query("cartEachDel", request.params.rescode);
  await mysql.query("delDash", dashUp);

  res.send(result);
  console.log(result);
});

//결제 -------------------------------------------------------------------------------
app.get("/pay/userInfo/:uid", async (request, res) => {
  res.send((await mysql.query("payUser", request.params.uid))[0]);
});

app.get("/pay/resInfo/:rescode", async (request, res) => {
  res.send((await mysql.query("resInfo", request.params.rescode))[0]);
});

app.get("/pay/coupList/:uid", async (request, res) => {
  res.send(await mysql.query("coupList", request.params.uid));
});

app.post("/pay/orderPayment", async (request, res) => {
  let data = request.body.param;
  let result = null;
  if (data.coupon_code != null && data.coupon_code != undefined) {
    console.log(data);
    result = await mysql.query("orderPayment", data);
    await mysql.query("cartEachDone", request.body.param.reserve_num);
    await mysql.query("coupUpdate", [
      request.body.param.coupon_code,
      request.body.param.user_id,
    ]);
  } else {
    console.log(data);
    result = await mysql.query("orderPayment", data);
    await mysql.query("cartEachDone", request.body.param.reserve_num);
  }
  res.send(result);
});

app.get("/rs", async (req, rep) => {
  let result = await mysql.query("rslist");
  rep.send(result);
});

app.post("/rs", async (request, response) => {
  let data = request.body.param;
  response.send(await mysql.query("rsInsert", data));
});

app.put("/rs/:no", async (req, response) => {
  let data = [req.body.param, req.params.no];
  response.send(await mysql.query("rsUpdate", data));
});

app.get("/sellerqna/:id", async (req, resp) => {
  resp.send(await mysql.query("sellqnalist", req.params.id));
});

app.get('/rsadd/:add/:no', async (req, rep) => {
	let cnt = [req.params.add, (req.params.no - 1) * 8];
	let result = await mysql.query('rsaddlist', cnt);
	rep.send(result);
});

app.get('/rscate/:cate/:no', async (req, rep) => {
	let cnt = [req.params.cate, (req.params.no - 1) * 8];
	let result = await mysql.query('rscatelist', cnt);
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

app.post("/rsbook", async (req, rep) => {
  let result = await mysql.query("rsbookmark", [
    req.body.user_id,
    req.body.rs_code,
  ]);
  rep.send(result);
});

app.post('/rsreviewlike/:no', async (req, rep) => {
	let result = await mysql.query('rsreviewlike', req.params.no);
	rep.send(result);
});

app.listen(3000, () => {
  console.log("서버 시작");
});

// 게시판 ---------------------------------------------------
// 공지사항 전체 조회
app.get("/notices", async (request, res) => {
  res.send(await mysql.query("noticelist"));
});

app.get("/noticepage/:no", async (request, res) => {
  let cnt = (request.params.no - 1) * 10;
  res.send(await mysql.query("noticelistp", cnt));
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

// 공지사항 중요도
app.get("/notices/import", async (request, res) => {
  res.send(await mysql.query("noticeimport"));
});

// 커뮤니티 전체 조회
app.get("/community", async (request, res) => {
  res.send(await mysql.query("comlist"));
});

app.get("/communitypage/:no", async (request, res) => {
  let cnt = (request.params.no - 1) * 10;
  res.send(await mysql.query("comlistp", cnt));
});

// 커뮤니티 상세 조회
app.get("/community/:bno", async (request, res) => {
  res.send((await mysql.query("cominfo", request.params.bno))[0]);
});

// 커뮤니티 등록
/* app.post("/community", async (request, res) => {
  let data = request.body.param;
  res.send(await mysql.query("cominsert", data));
}); */
app.post("/comPhotos", upload.array("files"), async (req, res) => {
  const comInfo = JSON.parse(req.body.comInfo);
  console.log("app.344.comInfo", comInfo);
  let result = await mysql.query("cominsert", comInfo);
  console.log("app. 346 result", result);

  let bno = result.insertId;
  console.log("bno", bno);
  if (bno > 0) {
    let filenames = req.files.map((file) => file.filename);
    console.log("filenames", filenames);
    for (let filename of filenames) {
      console.log("filename", filename);
      result = await mysql.query("comImgInsert", [bno, filename]);
    }
  }
  res.send(result);
  console.log("결과", result);
});

// 커뮤니티 수정
/* app.put("/communityupdate/:bno", async (request, res) => {
  let data = [request.body.param, request.params.bno];
  let result = await mysql.query("comupdate", data);
  res.send(result);
}); */

app.put(
  "/communityupdate/:bno",
  upload.array("files"),
  async (request, res) => {
    const comInfo = JSON.parse(request.body.comInfo);
    console.log("comInfo", comInfo);
    let result = await mysql.query("comimgdelete", comInfo.commu_code);
    result = JSON.stringify;
    let bno = comInfo.commu_code;
    console.log("bno", bno);
    let filenames = request.files.map((file) => file.filename);
    for (let filename of filenames) {
      result = await mysql.query("comImgInsert", [bno, filename]);
      console.log(result);
    }
    result = await mysql.query("comupdate", [comInfo, comInfo.commu_code]);
    res.send(result);
    console.log("결과", result);
  }
);

// 커뮤니티 삭제
app.delete("/communitydelete/:bno", async (request, res) => {
  let data = request.params.bno;
  console.log("appdata", data);
  let result = await mysql.query("commuImgcnt", data);
  console.log("app.commu", result);
  console.log("app.commu.data", data);
  let rcnt = await mysql.query("commuRecnt", data);
  if ((result[0].cnt = 0)) {
    if ((rcnt[0].cnt = 0)) {
      result = await mysql.query("comdelete", data);
    } else {
      result = await mysql.query("comreplydelete", data);
      result = await mysql.query("comdelete", data);
    }
  } else {
    if ((rcnt[0].cnt = 0)) {
      result = await mysql.query("comimgdelete", data);
      result = await mysql.query("comdelete", data);
    } else {
      result = await mysql.query("comreplydelete", data);
      result = await mysql.query("comimgdelete", data);
      result = await mysql.query("comdelete", data);
    }
  }
  res.send(result);
  console.log("결과", result);
});

// 커뮤니티 조회수
app.patch("/community/:bno", async (request, res) => {
  let data = request.params.bno;
  res.send(await mysql.query("comviewcnt", data));
});

// 이벤트 전체 조회
app.get("/userevent", async (request, res) => {
  res.send(await mysql.query("eventlist"));
});

app.get("/usereventpage/:no", async (request, res) => {
  let cnt = (request.params.no - 1) * 10;
  res.send(await mysql.query("eventlistp", cnt));
});
app.get("/usereventpageing/:no", async (request, res) => {
  let cnt = (request.params.no - 1) * 5;
  res.send(await mysql.query("eventcurrentlistp", cnt));
});
app.get("/usereventpageend/:no", async (request, res) => {
  let cnt = (request.params.no - 1) * 5;
  res.send(await mysql.query("eventendlistp", cnt));
});

app.get("/userevent/:bno", async (request, res) => {
  res.send((await mysql.query("eventinfo", request.params.bno))[0]);
});

app.get("/eventing", async (request, res) => {
  res.send(await mysql.query("eventcurrentlist"));
});

app.get("/eventend", async (request, res) => {
  res.send(await mysql.query("eventendlist"));
});

app.post("/userevent", async (request, res) => {
  let data = request.body.param;
  res.send(await mysql.query("eventinsertcoupon", data));
});

/*QnA 뿜*/
app.get("/qna/:id", async (request, res) => {
  let result = await mysql.query("qnalist", request.params.id);
  res.send(result);
});

app.get("/qnapage/:id/:no", async (request, res) => {
  let cnt = [request.params.id, (request.params.no - 1) * 10];
  res.send(await mysql.query("qnalistp", cnt));
});

app.get("/qna/:id/:bno", async (request, res) => {
  let data = [request.params.id, request.params.bno];
  res.send((await mysql.query("qnainfo", data))[0]);
});

app.post("/qna", async (request, res) => {
  let data = request.body.param;
  res.send(await mysql.query("qnainsert", data));
});

// app.put('/qna/:id/:bno', async (request, res) => {
// 	let data = [request.body.param, request.params.id, request.params.bno];
// 	let result = await mysql.query('qnaupdate', data);
// 	res.send(result);
// });

// qna 등록 ===================================]==
app.post("/qnaPhotos", upload.array("files"), async (req, res) => {
  // qna 게시물 등록
  const qnaInfo = JSON.parse(req.body.qnaInfo);
  console.log("app.426 qnaInfo", qnaInfo);
  let result = await mysql.query("qnainsert", qnaInfo);
  console.log("app.428 result", result);

  // qna 코드 넘겨받아 img 테이블에 추가~`
  let bno = result.insertId;
  console.log("app.432 bno", bno);
  if (bno > 0) {
    let filenames = req.files.map((file) => file.filename);
    for (let filename of filenames) {
      result = await mysql.query("qnaImgInsert", [bno, filename]);
    }
  }
  res.send(result);
});

// qna 수정 ===================================
app.put("/qnaupdate/:id/:bno", upload.array("files"), async (request, res) => {
  const qnaInfo = JSON.parse(request.body.qnaInfo);
  let result = await mysql.query("qnaimgdelete", qnaInfo.qna_code);
  result = JSON.stringify;
  let bno = qnaInfo.qna_code;
  let filenames = request.files.map((file) => file.filename);
  for (let filename of filenames) {
    result = await mysql.query("qnaImgInsert", [bno, filename]);
  }
  result = await mysql.query("qnaupdate", [
    qnaInfo,
    qnaInfo.writer,
    qnaInfo.qna_code,
  ]);
  res.send(result);
});

// qna 삭제 =====================================
app.delete("/qnadelete/:bno", async (req, res) => {
  let data = req.params.bno;
  console.log("app", data);
  let result = await mysql.query("qnaImgcnt", data);
  console.log("data1", data);
  console.log("aap.imgcnt", result);
  // result = JSON.stringify(result[0].cnt);

  if ((result[0].cnt = 0)) {
    result = await mysql.query("qnadelete", data);
    console.log("data2", data);
  } else {
    result = await mysql.query("qnaimgdelete", data);
    console.log("data3", data);
    result = await mysql.query("qnadelete", data);
    console.log("data4", data);
  }
  res.send(result);
  console.log("결과", result);
});

// app.delete("/qna/:bno", async (req, res) => {
//   let data = req.params.no;
//   let result = await mysql.query("qnaimgdelete", data);
//   if (result.affectedRows > 0) {
//     result = await mysql.query("qnadelete", data);
//   }
//   res.send(result);
// });

// 답글
app.get("/answer", async (request, res) => {
  // query string => ?key=value&key=value...
  let data = request.query.bno;
  res.send((await mysql.query("answerinfo", data))[0]);
});

// 검색
app.get("/notices/:column/:value", async (req, res) => {
  let list = [req.params.column, req.params.value];
  let data = await mysql.query("searchnotice", list);
  res.send(data);
});

app.get("/community/:column/:value", async (req, res) => {
  let list = [req.params.column, req.params.value];
  let data = await mysql.query("searchcommu", list);
  res.send(data);
});

// 이미지 등록_community
/* app.post("/comPhotos", upload.array("files"), async (req, res) => {
  let bno = req.body.bno;
  let filenames = req.files.map((file) => file.filename);
  console.log(filenames);
  for (let filename of filenames) {
    let result = await mysql.query("comImgInsert", [bno, filename]);
  }
  res.json({ filenames });
}); */

// // 이미지 등록_qna
// app.post('/qnaPhotos', upload.array('files'), async (req, res) => {
// 	let bno = req.body.bno;
// 	let filenames = req.files.map((file) => file.filename);
// 	console.log(filenames);
// 	for (let filename of filenames) {
// 		let result = await mysql.query('qnaImgInsert', [bno, filename]);
// 	}
// 	res.json({ filenames });
// });

// 이미지
app.get("/qnaimg/:bno", async (req, rep) => {
  let result = await mysql.query("qnaImg", req.params.bno);
  rep.send(result);
});

app.get("/commuimg/:bno", async (req, rep) => {
  let result = await mysql.query("commuImg", req.params.bno);
  rep.send(result);
});

app.get("/noticeimg/:bno", async (req, rep) => {
  let result = await mysql.query("noticeImg", req.params.bno);
  rep.send(result);
});

// 이미지 다운
app.get("/download/image/:filename", (req, res) => {
  let filename = req.params.filename; // 실제 이미지 파일의 이름
  let imagePath = path.join(__dirname, "img", "uploads", filename); // 이미지 전송
  res.download(imagePath);
});

// ----------------- 페이징
app.get(`/pagenation/:value`, async (req, res) => {
  // console.log(req.params.value);
  let data = req.params.value;
  let result = await mysql.query("page", data);
  // console.log(result[0].cnt)
  let obj = { test: result[0].cnt };
  res.send(obj);
});

app.get(`/pagenationwhere/:value`, async (req, res) => {
  // console.log(req.params.value);
  let data = [req.params.value, req.query.col, req.query.colvalue];
  let result = await mysql.query("pagewhere", data);
  console.log("app.page", result);
  // console.log(result[0].cnt)
  let obj = { test: result[0].cnt };
  res.send(obj);
});
app.get(`/pagenationing`, async (req, res) => {
  let result = await mysql.query("pageeventing");
  let obj = { test: result[0].cnt };
  res.send(obj);
});
app.get(`/pagenationend`, async (req, res) => {
  let result = await mysql.query("pageeventend");
  let obj = { test: result[0].cnt };
  res.send(obj);
});

/*댓글 */
app.get("/reply", async (request, res) => {
  // query string => ?key=value&key=value...
  let data = request.query.comCode;
  res.send(await mysql.query("relpylist", data));
});

/*대댓글 */
app.get("/rereply", async (request, res) => {
  // query string => ?key=value&key=value...
  let data = [request.query.comCode, request.query.groupNum];
  res.send(await mysql.query("rerelpylist", data));
});

/*댓글 수정 */
app.put("/replyupdate/:bno", async (request, res) => {
  let data = request.body;
  let result = [data.content, request.params.bno];
  console.log(1, data);
  console.log(2, result);
  console.log(2, request.params.content);
  let result1 = await mysql.query("replyupdate", result);
  res.send(result1);
});

// /*댓글 등록 */
// app.post('/replyinsert', async (req, res) => {
// 	let data = [req.body.param.content, req.body.param.writer, req.body.param.commu_code];
// 	let result = await mysql.query('replyinsert', data);
// 	res.send(result);
// });

/*대댓글 등록 */
app.post("/rereplyinsert", async (req, res) => {
  let data = req.params.commu_code;
  let data2 = [
    req.body.param.reply_code,
    req.parambody.params.content,
    req.body.param.writer,
    this.data,
  ];
  let result = await mysql.query("rereplyinsert1", data);
  await mysql.query("rereplyinsert2", data2);
  res.send(result);
});

//마이페이지 유저정보 찾아오기ㅡㅡ
app.post("/getuserinfo", async (request, response) => {
  let data = request.body;
  console.log("유저정보 찾기위한 값 = ", data.userId);

  //정보 불러오기전에 등급 자동 업그레이드부터
  let upgradeData = [data.userId, data.userId, data.userId];
  let upgrade = await mysql.query("upgrade", upgradeData);

  //유저정보 찾기
  let result = await mysql.query("getuserinfo", data.userId);
  console.log("유저 정보 전체 =", result);
  response.send(result);
});

//마이페이지 사용가능 쿠폰 찾아오기
app.post("/validcoupon", async (request, response) => {
  let data = request.body;
  let result = await mysql.query("validusercouponlist", data.userId);
  // console.log('사용가능쿠폰 정보 전체 = ', result);
  response.send(result);
});

//마이페이지 사용불가 쿠폰 찾아오기
app.post("/invalidcoupon", async (request, response) => {
  let data = request.body;
  let result = await mysql.query("invalidusercouponlist", data.userId);
  // console.log('사용완료쿠폰 정보 전체 = ', result);
  response.send(result);
});
// 댓글 -----------------------------
/*댓글 등록 */
app.post("/replyinsert", async (req, res) => {
  let data = [
    req.body.param.content,
    req.body.param.writer,
    req.body.param.commu_code,
  ];
  let result = await mysql.query("replyinsert", data);
  let gnum = result.insertId;
  result = await mysql.query("replyinsertgroup", [gnum + 1, gnum]);
  res.send(result);
  console.log(result);
});

/*대댓글 등록 */
app.post("/rereplyinsert", async (req, res) => {
  let data = req.body;
  console.log("data", data);
  let data2 = [data.content, data.writer, data.commu_code, data.group_num];
  console.log("dataw", data2);
  let result = await mysql.query("rereplyinsert1", data.group_num);
  console.log("result1", result);
  await mysql.query("rereplyinsert2", data2);
  res.send(result);
  console.log("insertrere", result);
});

/*댓글 삭제 */
app.delete("/replydelete/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("replydelete", data);
  console.log("app", result);
  console.log("data", data);
  res.send(result);
});
/*댓글 1개 조회*/
app.get(`/replyinfo/:rno`, async (req, res) => {
  let data = req.params.rno;
  console.log("게시글 하나 조회 번호", data);
  let result = await mysql.query("replyinfo", data);
  res.send(result);
  console.log("게시글 하나 조회 결과", result);
});

//마이페이지 예약내역 리스트 찾아오기
app.post("/reservationList", async (request, response) => {
  let data = request.body;
  let result = await mysql.query("myReservationList", data.userId);
  // console.log('reservationList 정보 전체 = ', result);
  response.send(result);
});

//마이페이지 QNA 리스트 찾아오기
app.post("/qnaList", async (request, response) => {
  let data = request.body;
  let result = await mysql.query("myQnaList", data.userId);
  // console.log('qnaList 정보 전체 = ', result);
  response.send(result);
});

//마이페이지 community 리스트 찾아오기
app.post("/communityList", async (request, response) => {
  let data = request.body;
  let result = await mysql.query("communityList", data.userId);
  // console.log('communityList 정보 전체 = ', result);
  response.send(result);
});

//마이페이지 결제취소
app.post("/cancelpayment", async (request, response) => {
  let data = request.body;
  console.log("결제 취소를 위한 자료 =", data[0], data[1]);

  let update = await mysql.query("updatecancle", data);
  console.log("업데이트결과= ", update.length);

  let select = await mysql.query("selectcancle", data[1]);
  console.log("셀렉결과= ", select.length);

  if (select.length > 0) {
    let deletion = await mysql.query("deletecancle", data[1]);
    console.log("삭제결과= ", deletion.length);
  }
});

//마이페이지 나의 리뷰 불러오기
app.post("/myreview", async (request, response) => {
  let data = request.body;
  console.log("리뷰를 불러오기 위한 id=", data.userId);
  let result = await mysql.query("myReviewList", data.userId);
  console.log("나의리뷰 전체=", result);
  response.send(result);
});

//마이페이지 찜목록 불러오기
app.post("/bookmark", async (request, response) => {
  let data = request.body;
  // console.log("북마크 불러오기 위한 아이디", data.userId);
  let result = await mysql.query("myBookmark", data.userId);
  // console.log("찜목록 전체=",result);
  response.send(result);
});

//로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/login', async (request, response) => {
	let data = request.body.param;
	console.log('data : ', data.userId);

	let result = await mysql.query('login', data.userId);
	console.log('result : ', result);

	let reps = {
		check: '',
		id: '',
		nickname: '',
		status: '',
		startDate: '',
		endDate: '',
	};
	if (result.length != 0) {
		//비밀번호 암호화 해서 비교
		data.userPw = crypto.createHash('sha512').update(data.userPw).digest('base64');
		console.log('암호화 된 비밀번호 =', data.userPw);
		// console.log("result.length = ",result.length);
		// console.log("data.userPw  = ",data.userPw);
		// console.log("result.user_pw  = ",result[0].user_pw);//비밀번호

		if (result[0].user_pw == data.userPw) {
			reps.check = '다맞음';
			reps.id = result[0].user_id;
			reps.nickname = result[0].nickname;
			reps.status = result[0].user_status;
			reps.startDate = result[0].penalty_startdate;
			reps.endDate = result[0].penalty_enddate;
			console.log('result.user_id  = ', result[0].user_id);
		} else {
			reps.check = '비번틀림';
		}
	} else {
		reps.check = '아이디틀림';
	}

	if (result.length > 0) {
		//세션에 정보 저장
		//session.id라고 하면 안됨. 이미 기존에 id는 고유값이 있어서 덮어씌우면 이상한 값이 나옴
		request.session.userId = result[0].user_id;
		request.session.nickname = result[0].nickname;
		console.log('세션에 아이디 저장 =', request.session.userId);
		request.session.save(function (err) {
			if (err) throw err; //에러가 있으면 예외처리
			return;
		});
		let allData = [reps, request.session];
		response.send(allData);
		console.log('reps.check : ', reps.check);
		// response.send(req.session);//세션전체정보 확인
		// response.send(reps);
	} else {
		response.send([reps]);
	}
});

//로그아웃(세션에 정보 삭제)
app.post('/logout', (req, res) => {
	req.session.destroy(); //세션 정보 삭제
});

//카카오로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/kakaologin", async (request, response) => {
  let data = request.body;
  let accountcheck = "";
  console.log("카카오 계정 id=", data);
  let result = await mysql.query("login", data.user_id);
  if (result.length > 0) {
    //값을 찾으면 로그인으로
    accountcheck = "로그인으로";
  } else {
    // 값이 없어서 아무것도 안 처리되면 회원가입으로
    accountcheck = "회원가입으로";
  }
  response.send(accountcheck);
});

//판매자로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/sellerlogin", async (request, response) => {
  let data = request.body.param;
  console.log("data : ", data.sellerId);

  let result = await mysql.query("sellerlogin", data.sellerId);
  console.log("result : ", result);

  let reps = {
    check: "",
    id: "",
  };
  if (result.length != 0) {
    //비밀번호 암호화 해서 비교
    data.sellerPw = crypto
      .createHash("sha512")
      .update(data.sellerPw)
      .digest("base64");
    console.log("암호화 된 비밀번호 =", data.sellerPw);
    // console.log("result.length = ",result.length);
    // console.log("data.userPw  = ",data.userPw);
    // console.log("result.user_pw  = ",result[0].user_pw);//비밀번호
    // console.log("result.length = ",result.length);
    // console.log("data.userPw  = ",data.userPw);
    // console.log("result.user_pw  = ",result[0].user_pw);//비밀번호

    if (result[0].seller_pw == data.sellerPw) {
      reps.check = "다맞음";
      reps.id = result[0].seller_id;
      console.log("result.seller_id  = ", result[0].seller_id);
    } else {
      reps.check = "비번틀림";
    }
  } else {
    reps.check = "아이디틀림";
  }
  response.send(reps);
  console.log("reps.check : ", reps.check);
});

//아이디 찾기(회원, 판매자)ㅡ
app.post("/findInfo", async (request, response) => {
  let data = request.body.param;
  console.log("findInfo =", data.phone);
  console.log("data.division=", data.division);
  console.log(
    ",,,, : ",
    data.division == "판매자" ? "sellerfindinfo" : "findinfo"
  );

  const result = await mysql.query(
    data.division == "판매자" ? "sellerfindinfo" : "findinfo",
    data.phone
  );

  console.log("result =", result);

  response.send(result); //아이디, 비밀번호, 닉네임이 담겨져있음
});

//비밀번호 변경(회원, 판매자)ㅡ
app.put("/changepw/:phoneNum", async (request, response) => {
  let data = [
    request.body.userPw,
    request.params.phoneNum,
    request.body.division,
  ];
  console.log("비밀번호 변경을 위해 받은 정보 =", data);
  console.log("request.body.userPw=", data[0]);

  //암호화 해서 넣어줌
  data[0] = crypto.createHash("sha512").update(data[0]).digest("base64");
  console.log("암호화시킨 비밀번호 =", data[0]);

  let pushData = [data[0], data[1]];
  console.log("비밀번호 변경을 위해 보낼 정보 =", pushData);

  if (data[2] == "회원") {
    response.send(await mysql.query("changepw", pushData));
  } else if (data[2] == "판매자") {
    response.send(await mysql.query("sellerchangepw", pushData));
  }
});

const crypto = require("crypto");

//유저 회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/join", uploadUser.array("files"), async (request, response) => {
  //JSON으로 다시 안 바꾸면 그냥 형태만 객체처럼 생긴 스트링임
  let joindata = JSON.parse(request.body.userInfo); //유저정보
  console.log("joindata = ", joindata);
  console.log("files =", request.files);

  //파일 Rsinsert.vue참고/ 노드에서는 rsphotos 참고
  // 유저정보 파일에 이미지이름 넣음
  if (request.files && request.files.length >= 1) {
    joindata.profile = request.files[0].filename;
  }
  console.log("회원가입 될 정보 =", joindata);

  //비밀번호 암호화
  joindata.user_pw = crypto
    .createHash("sha512")
    .update(joindata.user_pw)
    .digest("base64");
  console.log("암호화 된 비밀번호 =", joindata.user_pw);
  response.send(
    await mysql.query("userjoin", joindata).catch((err) => console.log(err))
  );
  return;
});

//유저 회원정보 수정 전 원래정보 보여줌ㅡㅡㅡㅡ
app.post("/previousInfo", async (request, response) => {
  let data = request.body;
  console.log("회원정보 수정전 정보=", data.user_id);
  let previousInfo = await mysql.query("login", data.user_id);
  console.log("previousInfo=", previousInfo);
  response.send(previousInfo);
});

//유저 회원정보 수정
app.post(
  "/userInfoUpdate",
  uploadUser.array("files"),
  async (request, response) => {
    let updatejoindata = JSON.parse(request.body.userInfo); //유저정보
    console.log("updatejoindata=", updatejoindata.param);
    console.log("files =", request.files);
    if (request.files && request.files.length >= 1) {
      updatejoindata.param.profile = request.files[0].filename;
    }
    // //비밀번호 암호화
    updatejoindata.param.user_pw = crypto
      .createHash("sha512")
      .update(updatejoindata.param.user_pw)
      .digest("base64");
    console.log("암호화 된 비밀번호 =", updatejoindata.param.user_pw);

    let data = [updatejoindata.param, updatejoindata.userid];
    console.log("수정된 정보 =", data);
    let updateresult = await mysql.query("updateinfo", data);
    console.log("updateresult =", updateresult);
    response.send(updateresult);
  }
);

//유저 회원탈퇴
app.post("/userdelete", async (request, response) => {
  if (request.body.userPw != undefined) {
    let cryptoPw = crypto
      .createHash("sha512")
      .update(request.body.userPw)
      .digest("base64");
    let data = [request.body.userId, cryptoPw];
    console.log("deletedata =", data);

    let deletedata = await mysql.query("userdelete", data);
    console.log("회원탈퇴결과= ", deletedata);
    response.send(deletedata);
    return;
  }
  response.send("");
  return;
});

//판매자 회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/sellerJoin", async (request, response) => {
  let data = request.body.param;
  console.log("joindata = ", data);
  //비밀번호 암호화
  data.seller_pw = crypto
    .createHash("sha512")
    .update(data.seller_pw)
    .digest("base64");
  console.log("암호화 된 비밀번호 =", data.seller_pw);
  response.send(await mysql.query("sellerjoin", data));
});

//유저 회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡ
app.post("/joinIdCheck", async (request, response) => {
  let data = request.body.param;
  console.log("joinIdCheck : ", data);
  const result = await mysql.query("login", data.user_id);
  response.send(result.length > 0 ? false : true);
});

//판매자 회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡ
app.post("/sellerJoinIdCheck", async (request, response) => {
  let data = request.body.param;
  console.log("sellerJoinIdCheck : ", data);
  const result = await mysql.query("sellerlogin", data.seller_id);
  response.send(result.length > 0 ? false : true);
});

//유저 회원가입 시 닉네임 중복체크ㅡㅡㅡㅡㅡ
app.post("/joinNicknameCheck", async (request, response) => {
  let data = request.body.param;
  console.log("joinNicknameCheck : ", data);
  const result = await mysql.query("nicknamecheck", data.nickname);
  response.send(result.length > 0 ? false : true);
});

//핸드폰 본인인증
// npm install --save coolsms-node-sdk
app.post("/phonecheck", async (req, res) => {
  let data = req.body.param;
  console.log("본인인증을 위해 넘어온 데이터 = ", data);
  // const coolsms = require('coolsms-node-sdk').default;
  // async function printTokenResult(phone, token){

  // 	const messageService = new coolsms("NCS02UFOUAFDAHCE","SINYK8TLRU9OTQLAMCLZXGNJUAE52BVG");
  // 	const result = await messageService
  // 	.sendOne({
  // 		to:`${phone}`,
  // 		from : '01095185177',
  // 		text : `안녕하세요 요청하신 인증번호는 [${token}입니다.]`
  // 	})

  // 	let checkresult = false; //'인증번호 발송 실패';
  // 	console.log('핸드폰 인증 결과=', result);

  // 	if(result.statusCode == '2000'){
  // 		checkresult = true; //"인증번호 발송 성공";
  // 	}
  // 	console.log('checkresult=', checkresult);
  // 	res.send(checkresult);
  res.send(true);
  // }
  // printTokenResult(data.phone,data.token);
});

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

//이벤트 등록  formData (파일/쿠폰/이벤트)로 보낸거 (이름변경 + uploads)***********************
app.post("/eventPhoto", upload.array("files"), async (req, res) => {
  // console.log(req);

  //변환한 이미지이름
  let banner = req.files[0].filename;
  let main = req.files[1].filename;

  const couponInfo = JSON.parse(req.body.couponInfo); //쿠폰 객체타입으로 변경
  const eventInfo = JSON.parse(req.body.eventInfo); //이벤트 객체타입으로 변경
  // console.log(eventInfo);

  let result = await mysql.query("insertCoupon", couponInfo); //쿠폰테이블 인서트
  //console.log(result);

  //inserId받아서 이벤트테이블 coupon_code에 넣기
  if (result.insertId > 0) {
    eventInfo.banner_img = banner;
    eventInfo.main_img = main;
    eventInfo.coupon_code = result.insertId;
    result = await mysql.query("insertEvent", eventInfo); //이벤트 테이블에 최종 인서트
  }

  res.send(result);
});
// 이벤트 이미지 포함 수정 ***********************************************
app.post("/modifyEvent", upload.array("files"), async (req, res) => {
  //console.log(req);

  //변환한 이미지이름
  // let banner = req.files[0].filename;
  // let main = req.files[1].filename;

  let banner;
  let main;

  const couponInfo = JSON.parse(req.body.couponInfo); //객체타입으로 변경
  const eventInfo = JSON.parse(req.body.eventInfo);

  if (req.files && req.files.length >= 2) {
    banner = req.files[0].filename;
    main = req.files[1].filename;
  } else {
    banner = eventInfo.banner_img;
    main = eventInfo.main_img;
  }
  // console.log(eventInfo);

  //수정할 쿠폰 객체 다시 생성
  let cobj = {
    coupon_name: couponInfo.coupon_name,
    discount_rate: couponInfo.discount_rate,
    start_date: couponInfo.start_date,
    end_date: couponInfo.end_date,
  };

  //얘는되고... 밑에꺼가 안되면..= > 위에꺼도 안되야함
  //수정대상 쿠폰객체, 수정대상
  let datas = [cobj, couponInfo.coupon_code];
  let result = await mysql.query("couponUpdate", datas); //쿠폰테이블수정 (쿠폰객체, 수정대상)
  console.log(result);

  //쿠폰수정이 정상으로 되었으면 이벤트 수정 실행,  배너, 메인이미지는 새로운 이미지 인서트
  if (result.affectedRows > 0) {
    let eobj = {
      banner_img: banner,
      main_img: main,
      eventstart_date: eventInfo.eventstart_date,
      eventend_date: eventInfo.eventend_date,
      title: eventInfo.title,
      content: eventInfo.content,
      write_date: eventInfo.write_date,
    };

    datas = [eobj, eventInfo.event_code];
    result = await mysql.query("eventUpdate", datas);
  }

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

//쿠폰 발급여부 체크
app.get("/couponCheck/:no", async (req, res) => {
  let data = req.params.no;
  let list = await mysql.query("couponCheck", data);
  console.log(list[0].c);
  list = list[0].c;
  res.json({ cnt: list });
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

//일반회원 전체 리스트 (활동,정지,탈퇴 포함)
app.get("/allUserList", async (req, res) => {
  let list = await mysql.query("allUserList");
  res.send(list);
});

//쿠폰-등급별 **활동회원리스트 출력
app.get("/adminuser/:grade", async (req, res) => {
  let data = req.params.grade;
  let list = await mysql.query("gradeUserList", data);
  res.send(list);
});

//**활동회원전체리스트
app.get("/adminuser", async (req, res) => {
  let list = await mysql.query("adminuserList");
  res.send(list);
});

//회원한건조회
app.get("/adminGetUserInfo/:id", async (req, res) => {
  let data = req.params.id;
  let list = await mysql.query("adminGetUserInfo", data);
  res.send(list[0]);
});

//쿠폰일괄발급
app.post("/adminusercoupon", async (req, res) => {
  let { grade, couponInfo } = req.body; //화면에서 받아온 등급정보, 쿠폰코드 , 쿠폰상태
  let result = await insertCoupon(grade, couponInfo);
  console.log({ result });
  res.send({ result });
});

//함수 선언식으로 작성할것 ( 위에서 호출하니까.. )
async function insertCoupon(grade, couponInfo) {
  let count = 0;
  let list;
  if (grade != null) {
    list = await mysql.query("gradeUserList", grade); //등급별 회원리스트
  } else {
    list = await mysql.query("adminuserList"); //전체 활동회원리스트
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

//승인대기> 영업승인or반려로 업데이트
app.put("/adminApprove", async (req, res) => {
  let datas = [req.query.status, req.query.rscode];
  let result = await mysql.query("adminApprove", datas);
  res.send(result);
});

//승인된 업체목록 전체리스트
app.get("/adminRsList", async (req, res) => {
  let list = await mysql.query("adminRsList");
  res.send(list);
});

/////////////////////////////////////////////////////////////

//전체 qna
app.get("/adminSellerQna/:division", async (req, res) => {
  let data = req.params.division;
  let list = await mysql.query("adminSellerQna", data);
  //console.log(list);
  res.send(list);
});

//qna한건조회
app.get("/adminQnaInfo/:no", async (req, res) => {
  let data = req.params.no;
  let list = await mysql.query("adminQnaInfo", data);
  res.send(list[0]);
  //console.log(list);
});

//qna이미지 가져오기
app.get("/getQnaImg/:no", async (req, res) => {
  let list = await mysql.query("getQnaImg", req.params.no);
  res.send(list);
});

//전체 -카테고리별
app.get("/adminSellerQnaCategory", async (req, res) => {
  let division = req.query.division;
  let category = req.query.category;
  let datas = [division, category];
  let list = await mysql.query("adminSellerQnaCategory", datas);
  res.send(list);
});

//미답변
app.get("/adminSellerNqna/:division", async (req, res) => {
  let data = req.params.division;
  let list = await mysql.query("adminSellerNqna", data);
  res.send(list);
  //console.log(list);
});

//메인미답변.. 작성일자 기준 상위 5개만
app.get("/adminMainQna/:division", async (req, res) => {
  let data = req.params.division;
  let list = await mysql.query("adminMainQna", data);
  res.send(list);
  //console.log(list);
});

//미답변 -카테고리별
app.get("/adminSellerWaitCategory", async (req, res) => {
  let division = req.query.division;
  let category = req.query.category;
  let datas = [division, category];
  let list = await mysql.query("adminSellerWaitCategory", datas);
  res.send(list);
});

//답변완료
app.get("/adminSellerQnaDone/:division", async (req, res) => {
  let data = req.params.division;
  let list = await mysql.query("adminSellerQnaDone", data);
  res.send(list);
});

//답변완료 카테고리별
app.get("/adminSellerQnaDoneCategory", async (req, res) => {
  let division = req.query.division;
  let category = req.query.category;
  let datas = [division, category];
  let list = await mysql.query("adminSellerQnaDoneCategory", datas);
  res.send(list);
});

//////////////////////////////////////////////////////////////

//관리자 답변등록+ 답변상태업데이트
app.post("/adminQnaInsert", async (req, res) => {
  //console.log(req.body.param.ans_code);\
  let data = req.body.param;
  let result = await mysql.query("adminQnaInsert", data);
  //console.log(result.insertId);
  if (result.insertId > 0) {
    result = await updateReply(req.body.param.ans_code);
    //console.log(result);
  }
  res.send({ result });
});

async function updateReply(qnacode) {
  console.log("업데이트", qnacode);
  let result = await mysql.query("adminQnaUpdate", qnacode);
  return result.changedRows;
}

//답변완료 로 업데이트
app.put("/adminQnaUpdate/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("adminQnaUpdate", data);
  res.send(result);
});

///////////////////////////////////////////////////////////////////

//qna답변 조회
app.get("/adminAnswerinfo", async (request, res) => {
  // query string => ?key=value&key=value...
  let data = request.query.bno;
  res.send((await mysql.query("adminAnswerinfo", data))[0]);
});

//관리자 답변수정
app.put("/adminReplyModify/:no", async (req, res) => {
  let datas = [req.body.param, req.params.no];
  let result = await mysql.query("adminUpdateReply", datas);
  res.send(result);
});

////////////////////////////////////////////////////////////////
//관리자 답변삭제 +  해당 질문글 상태 답변대기로 업데이트

//params로 보내면 >> req.query 받고
//data로 보내면 >> req.body...헐..
app.delete("/adminReplyDelete/:no", async (req, res) => {
  let data = req.params.no; //지울 답변
  let targetqna = req.body.ans_code; //답변대기로 바꿀애
  //console.log("삭제할 답변코드" + data);
  //console.log("업데이트질문코드" + targetqna);
  let result = await mysql.query("adminReplyDelete", data);
  //console.log("삭제결과" + result.affectedRows); >>1 나옴
  if (result.affectedRows > 0) {
    //삭제가 성공되었다면 답변 대기로 업뎃진행
    result = await updateWaitReply(targetqna);
  }
  //console.log(result);
  res.send({ result });
});

//답변삭제후 답변대기로 진행
async function updateWaitReply(targetqna) {
  //console.log("업데이트", targetqna);
  let result = await mysql.query("adminQnaWaitUpdate", targetqna);
  // console.log(result.changedRows); // >>1로 값 나옴
  return result.changedRows;
}

//답변삭제후 답변대기로 다시 업데이트
app.put("/adminQnaWaitUpdate/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("adminQnaWaitUpdate", data);
  res.send(result);
});

//////////////////////////////////////////////////////////////////
//판매자 회원 리스트
app.get("/adminSeller", async (req, res) => {
  let list = await mysql.query("adminSellerList");
  res.send(list);
});

//판매자가 운영중인 업체리스트
app.get("/adminSellerInfo/:id", async (req, res) => {
  let data = req.params.id;
  let list = await mysql.query("adminSellerInfo", data);
  res.send(list);
  //console.log(list);
});

//공지사항리스트
app.get("/adminNoticeList/:division", async (req, res) => {
  let list = await mysql.query("adminNoticeList", req.params.division);
  res.send(list);
});

//공지사항 단건조회
app.get("/adminNoticeInfo/:no", async (req, res) => {
  let list = await mysql.query("adminNoticeInfo", req.params.no);
  res.send(list[0]);
});

//공지사항 등록
app.post("/adminInsertNotice", async (req, res) => {
  let data = req.body;
  let result = await mysql.query("adminInsertNotice", data);
  res.send(result);
});

//공지사항 수정
app.put("/adminNoticeUpdate/:no", async (req, res) => {
  console.log(req.body);
  let datas = [req.body, req.params.no];
  let result = await mysql.query("adminNoticeUpdate", datas);
  res.send(result);
});

//공지사항 삭제  이미지 테이블 삭제하고. 공지사항 삭제
app.delete("/adminNoticeDelete/:no", async (req, res) => {
  let result = await mysql.query("adminConfirmImg", req.params.no);
  result = JSON.stringify(result);
  let str = result.split(":");
  let newstr = str[1].substr(0, 1);
  console.log(newstr); //>0이나오면 img테이블에 첨부파일이 없다는 뜻
  //첨부파일이 없다
  if ((newstr = 0)) {
    //공지사항 게시글만 삭제
    result = await mysql.query("adminNoticeDelete", req.params.no);
  } else {
    //img테이블 첨부파일 삭제 + 공지사항 게시글 삭제
    result = await mysql.query("adminImgDelete", req.params.no);
    result = await mysql.query("adminNoticeDelete", req.params.no);
  }
  // console.log(result);
  res.send(result);
});

//공지사항 등록 (파일들, 공지사항객체) formData **********************************
app.post("/noticePhotos", upload.array("files"), async (req, res) => {
  const noticeInfo = JSON.parse(req.body.noticeInfo);
  let result = await mysql.query("adminInsertNotice", noticeInfo); //공지사항 객체  테이블 인서트

  //만들어진 notice_code
  let bno = result.insertId;
  //첨부파일테이블에 인서트
  if (bno > 0) {
    let filenames = req.files.map((file) => file.filename);
    for (let filename of filenames) {
      result = await mysql.query("noticeImgInsert", [bno, filename]);
    }
  }
  res.send(result);
});
//공지사항 이미지 수정 (삭제하고 다시 업데이트하는거로..)
app.post("/modifyNotice", upload.array("files"), async (req, res) => {
  //1. img테이블에서 데이터 삭제
  const noticeInfo = JSON.parse(req.body.noticeInfo);
  let result = await mysql.query("adminImgDelete", noticeInfo.notice_code);
  console.log(result);
  //2. 새로운 파일 img테이블 인서트
  let bno = noticeInfo.notice_code;
  let filenames = req.files.map((file) => file.filename);
  for (let filename of filenames) {
    result = await mysql.query("noticeImgInsert", [bno, filename]);
  }
  //3. notice 테이블에 업데이트
  result = await mysql.query("adminNoticeUpdate", [
    noticeInfo,
    noticeInfo.notice_code,
  ]);

  res.send(result);
});

//img 테이블 첨부파일 삭제
app.delete("/adminImgDelete/:no", async (req, res) => {
  let data = req.params.no;
  let result = await mysql.query("adminImgDelete", data);
  res.send(result);
});

//공지사항 이미지 조회
app.get("/getNoticeImg/:no", async (req, res) => {
  let list = await mysql.query("getNoticeImg", req.params.no);
  res.send(list);
});

//이미지다운로드
app.get("/download/image/:filename", (req, res) => {
  let filename = req.params.filename; // 실제 이미지 파일의 이름
  let imagePath = path.join(__dirname, "img", "uploads", filename); // 이미지 전송
  res.download(imagePath);
});

//패널티 갯수 가져오기
app.get("/adminGetpenalty/:id", async (req, res) => {
  let list = await mysql.query("adminGetpenalty", req.params.id);
  list = JSON.stringify(list);
  console.log(list);
  res.send(list);
});

//카테고리별 차트
app.get("/adminCategoryChart", async (req, res) => {
  let list = await mysql.query("adminCategoryChart");
  //list = JSON.stringify(list);
  res.send(list);
  console.log(list);
});

//결제많은순
app.get("/adminPaymentChart", async (req, res) => {
  let list = await mysql.query("adminPaymentChart");
  //list = JSON.stringify(list);
  res.send(list);
  console.log(list);
});

//찜많은순
app.get("/adminBookmarkChart", async (req, res) => {
  let list = await mysql.query("adminBookmarkChart");
  //list = JSON.stringify(list);
  res.send(list);
  //console.log(list);
});

//별점 높은순
app.get("/adminReviewChart", async (req, res) => {
  let list = await mysql.query("adminReviewChart");
  //list = JSON.stringify(list);
  res.send(list);
  // console.log(list);
});

//리뷰 리스트
app.get("/adminReviewList", async (req, res) => {
  let list = await mysql.query("adminReviewList");
  //list = JSON.stringify(list);
  res.send(list);
  // console.log(list);
});

//리뷰한건조회
app.get("/adminReviewInfo/:no", async (req, res) => {
  let list = await mysql.query("adminReviewInfo", req.params.no);
  res.send(list[0]);
});

//리뷰이미지 가져오기

app.get("/adminGetReviewImg/:no", async (req, res) => {
  let list = await mysql.query("adminGetReviewImg", req.params.no);
  res.send(list);
});

//////////////////////////생일쿠폰 발급 //////////////////////////
//'초 분 시 일 월 요일  ("0 0/5 * * * *") 오분마다
//0 0 1 * * - 매월 1일 자정에 작업을 실행
//"*/6 * * * * * "
cron.schedule("0 0 * * * *", async function () {
  console.log("리스트");

  let list = await mysql.query("adminuserList"); //활동회원리스트 불러오기
  let cnt = 0;
  for (let user of list) {
    let bday = dateFormat(user.birthday);
    bday = bday.substring(5, 7); //회원 생일 달
    //console.log(bstr); 01 02

    let tday = getToday();
    //console.log(tstr);
    tday = tday.substring(5, 7);
    //console.log(tstr); // 01
    //?에 스트링으로 못들어가서
    tday = parseInt(tday); //1

    let coupon = await mysql.query("adminBdayCoupon", tday);
    // console.log(coupon[0].coupon_code); //발행할 쿠폰코드

    if (bday == tday) {
      //이번달에 생일이면
      cnt += await bcouponInsert(user.user_id, coupon[0].coupon_code);
    }
  }
  console.log("생일쿠폰 " + cnt + "개 발급완료");
});

async function bcouponInsert(id, coupon) {
  let data = {
    user_id: id,
    coupon_code: coupon,
    coupon_status: "사용가능",
  };

  console.log("발급한 쿠폰코드" + coupon);
  console.log("생일인회원" + id);
  console.log("------------------");
  let result = await mysql.query("insertUserCoupon", data);

  return result.affectedRows > 0 ? 1 : 0;
}

function dateFormat(val) {
  let date = val == "" ? new Date() : new Date(val);
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}

function getToday() {
  return dateFormat("", "yyyy-MM-dd");
}
////////////////////////////////////////////생일쿠폰//////////////////////////

///////////////////////////////////쿠폰 기간만료 //////////////////////////////
cron.schedule("0 0 0 * * * ", async function () {
  let result = await mysql.query("adminEndCoupon");
  console.log(result);
});

//------------------------------------------ -- 관리자 주은이---------------
