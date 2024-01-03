require('dotenv').config({ path: './db/project.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');
const multer = require('multer');
const path = require('path');

app.get('/restaurants', async (req, rep) => {
	let result = await mysql.query('rsalllist');
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

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'img/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + path.basename(file.originalname));
	},
});

const storage_rs = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'img/restaurant/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + path.basename(file.originalname));
	},
});

const upload = multer({ storage: storage });
const uploadRs = multer({ storage: storage_rs });

app.use(express.json({ limit: '50mb' }));

app.use('/public', express.static('img/'));

app.post('/photo', upload.single('file'), (req, res) => {
	let file = req.file;
	res.status(200).json({ message: '등록성공', filename: file.filename });
});

app.post('/rsphotos', uploadRs.array('files'), async (req, res) => {
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
		console.log(timeInfo.time);

		let result = await mysql.query('rsInsert', rsInfo);

		// console.log(result);
		if (result.affectedRows == 1) {
			let rsCode = result.insertId;
			for (let i = 0; i < timeInfo.time.length; i++) {
				console.log(timeInfo.time[i]);
				await mysql.query('rsTimeInsert', [rsCode, timeInfo.time[i]]);
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

app.post('/comPhotos', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('comImgInsert', [bno, filename]);
	}
	res.json({ filenames });
});

app.get('/download/image/:filename', (req, res) => {
	let filename = req.params.filename; // 실제 이미지 파일의 이름
	let imagePath = path.join(__dirname, 'img', 'uploads', filename); // 이미지 전송
	res.download(imagePath);
});

app.post('/ptupload', async (req, rep) => {
	let result = await mysql.query('ptinsert', req.body.param);
	rep.send(result);
});

app.get('/ptlist', async (req, rep) => {
	let result = await mysql.query('ptlist');
	rep.send(result);
});

app.get('/ptlist/:no', async (req, rep) => {
	let result = await mysql.query('ptinfo', req.params.no);
	rep.send(result[0]);
});

app.get('/rs', async (req, rep) => {
	let result = await mysql.query('rslist');
	rep.send(result);
});

app.post('/rs', async (request, response) => {
	let data = request.body.param;
	response.send(await mysql.query('rsInsert', data));
});

app.put('/rs/:no', async (req, response) => {
	let data = [req.body.param, req.params.no];
	response.send(await mysql.query('rsUpdate', data));
});

app.get('/sellerqna/:id', async (req, resp) => {
	resp.send(await mysql.query('sellqnalist', req.params.id));
});

app.get('/rsadd/:add', async (req, rep) => {
	let result = await mysql.query('rsaddlist', req.params.add);
	rep.send(result);
});

app.get('/rscate/:cate', async (req, rep) => {
	let result = await mysql.query('rscatelist', req.params.cate);
	rep.send(result);
});

app.get('/restaurants/:no', async (req, rep) => {
	let result = await mysql.query('rsinfo', req.params.no);
	rep.send(result[0]);
});

app.post('/rslike/:no', async (req, rep) => {
	let result = await mysql.query('rslike', req.params.no);
	rep.send(result);
});

app.post('/rsbook', async (req, rep) => {
	let result = await mysql.query('rsbookmark', [req.body.user_id, req.body.rs_code]);
	rep.send(result);
});

app.listen(3000, () => {
	console.log('서버 시작');
});

// 공지사항 전체 조회
app.get('/notices', async (request, res) => {
	res.send(await mysql.query('noticelist'));
});

// 공지사항 상세 조회
app.get('/notices/:bno', async (request, res) => {
	res.send((await mysql.query('noticeinfo', request.params.bno))[0]);
});

// 공지사항 조회수
app.put('/notices/:bno', async (request, res) => {
	let data = request.params.bno;
	res.send(await mysql.query('viewcnt', data));
});

// 커뮤니티 전체 조회
app.get('/community', async (request, res) => {
	res.send(await mysql.query('comlist'));
});

// 커뮤니티 상세 조회
app.get('/community/:bno', async (request, res) => {
	res.send((await mysql.query('cominfo', request.params.bno))[0]);
});

// 커뮤니티 등록
app.post('/community', async (request, res) => {
	let data = request.body;
	res.send(await mysql.query('cominsert', data));
});

// 커뮤니티 수정
app.put('/community/:bno', async (request, res) => {
	let data = [request.body.param, request.params.bno];
	let result = await mysql.query('comupdate', data);
	res.send(result);
});

// 커뮤니티 삭제
app.delete('/community/:bno', async (request, res) => {
	res.send((await mysql.query('comdelete', request.params.bno))[0]);
});

// 커뮤니티 조회수
app.patch('/community/:bno', async (request, res) => {
	let data = request.params.bno;
	res.send(await mysql.query('comviewcnt', data));
});

// 이벤트 전체 조회
app.get('/event', async (request, res) => {
	res.send(await mysql.query('eventlist'));
});

// 이벤트 상세 조회
app.get('/event/:bno', async (request, res) => {
	res.send((await mysql.query('eventinfo', request.params.bno))[0]);
});

// qna 전체 조회
app.get('/qna', async (request, res) => {
	res.send(await mysql.query('qnalist'));
});

// qna 상세 조회
app.get('/qna/:bno', async (request, res) => {
	res.send((await mysql.query('qnainfo', request.params.bno))[0]);
});

// 답글
app.get('/answer', async (request, res) => {
	// query string => ?key=value&key=value...
	let data = request.query.bno;
	res.send((await mysql.query('answerinfo', data))[0]);
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
	};
	if (result.length != 0) {
		// console.log("result.length = ",result.length);
		// console.log("data.userPw  = ",data.userPw);
		// console.log("result.user_pw  = ",result[0].user_pw);//비밀번호

		if (result[0].user_pw == data.userPw) {
			reps.check = '다맞음';
			reps.id = result[0].user_id;
			console.log('result.user_id  = ', result[0].user_id);
		} else {
			reps.check = '비번틀림';
		}
	} else {
		reps.check = '아이디틀림';
	}
	response.send(reps);
	console.log('reps.check : ', reps.check);
});

//회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/join', async (request, response) => {
	let data = request.body.param;
	console.log('joindata = ', data);
	response.send(await mysql.query('join', data));
});

//회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡ
app.post('/joinIdCheck', async (request, response) => {
	let data = request.body.param;
	console.log('joinIdCheck : ', data);
	const result = await mysql.query('login', data.user_id);
	response.send(result.length > 0 ? false : true);
});

//회원가입 시 닉네임 중복체크ㅡㅡㅡㅡㅡ
app.post('/joinNicknameCheck', async (request, response) => {
	let data = request.body.param;
	console.log('joinNicknameCheck : ', data);
	const result = await mysql.query('login', data.nickname);
	response.send(result.length > 0 ? false : true);
});

//이벤트 전체 리스트 출력
app.get('/event', async (req, res) => {
	let list = await mysql.query('eventList');
	res.send(list);
});

//이벤트 단건조회  (쿠폰까지)
app.get('/event/:no', async (req, res) => {
	let data = req.params.no;
	let list = await mysql.query('eventInfo', data);
	res.send(list[0]); // 배열로 넘어오니까
});

//이벤트 등록
app.post('/event', async (req, res) => {
	let data = req.body.param;
	let result = await mysql.query('insertEvent', data);
	res.send(result);
});

//이벤트 수정
app.put('/event/:no', async (req, res) => {
	let datas = [req.body.param, req.params.no];
	let result = await mysql.query('eventUpdate', datas);
	res.send(result);
});

//이벤트 삭제
app.delete('/event/:no', async (req, res) => {
	let data = req.params.no;
	let result = await mysql.query('eventDelete', data);
	res.send(result);
});

// //이벤트이미지등록
// app.post("/photos", upload.single("avatar"), (req, res) => {
//   //단일 처리    //avatar 어떤 이름으로 받을지 정해줘야함
//   console.log(req.file); //단건
//   console.log(req.body); //미들웨어가 중간에서 돌면서  file/ body 로 나뉘게됨
// });

//전체 쿠폰 목록
app.get('/coupon', async (req, res) => {
	let list = await mysql.query('couponList');
	res.send(list);
});

//쿠폰등록
app.post('/coupon', async (req, res) => {
	let data = req.body.param;
	let result = await mysql.query('insertCoupon', data);
	res.send(result);
});

//쿠폰수정
app.put('/coupon/:no', async (req, res) => {
	let datas = [req.body.param, req.params.no];
	let result = await mysql.query('couponUpdate', datas);
	res.send(result);
});

//쿠폰-등급별 회원리스트 출력
app.get('/user/:grade', async (req, res) => {
	let data = req.params.grade;
	let list = await mysql.query('gradeUserList', data);
	res.send(list);
});

//활동회원전체리스트
app.get('/user', async (req, res) => {
	let list = await mysql.query('userList');
	res.send(list);
});

//쿠폰일괄발급
app.post('/usercoupon', async (req, res) => {
	let { grade, couponInfo } = req.body; //화면에서 받아온 등급정보, 쿠폰코드 , 쿠폰상태
	let result = insertCoupon(grade, couponInfo);
	res.send(result);
});

//함수 선언식으로 작성할것 ( 위에서 호출하니까.. )
async function insertCoupon(grade, couponInfo) {
	let count = 0;
	let list;
	if (grade != null) {
		list = await mysql.query('gradeUserList', grade); //등급별 회원리스트
	} else {
		list = await mysql.query('userList'); //전체 회원리스트
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
	let result = await mysql.query('insertUserCoupon', data);
	//console.log(result);
	//return result.data.affectedRows > 0 ? 1 : 0;
}
