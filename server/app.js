require('dotenv').config({ path: './db/project.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');
const multer = require('multer');
const path = require('path');
const { request } = require('http');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'img/uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, new Date().valueOf() + path.basename(file.originalname));
	},
});

const upload = multer({ storage: storage });

app.use(express.json({ limit: '50mb' }));

app.use('/public', express.static('img/'));

app.post('/photo', upload.single('file'), (req, res) => {
	let file = req.file;
	res.status(200).json({ message: '등록성공', filename: file.filename });
});

// app.post('/node/photos', upload.array('file'), (req, res) => {
// 	let filenames = req.files.map((file) => file.filename);
// 	res.json({ filenames });
// });

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

app.get('/restaurants', async (req, rep) => {
	let result = await mysql.query('rsalllist');
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

app.listen(3000, () => {
	console.log('서버 시작');
});
// 게시판 ---------------------------------------------------
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

// 공지사항 중요도
app.get('/notices/import', async (request, res) => {
	res.send(await mysql.query('noticeimport'));
});

// 커뮤니티 전체 조회
app.get('/community', async (request, res) => {
	res.send(await mysql.query('comlist'));
});

app.get('/communitypage/:no', async (request, res) => {
	let cnt = (request.params.no - 1) * 10;
	res.send(await mysql.query('comlistp', cnt));
});

// 커뮤니티 상세 조회
app.get('/community/:bno', async (request, res) => {
	res.send((await mysql.query('cominfo', request.params.bno))[0]);
});

// 커뮤니티 등록
app.post('/community', async (request, res) => {
	let data = request.body.param;
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
app.get('/userevent', async (request, res) => {
	res.send(await mysql.query('eventlist'));
});

// 이벤트 상세 조회
app.get('/userevent/:bno', async (request, res) => {
	res.send((await mysql.query('eventinfo', request.params.bno))[0]);
});

// 진행중 이벤트
app.get('/eventing', async (request, res) => {
	res.send(await mysql.query('eventcurrentlist'));
});

// 종료 이벤트
app.get('/eventend', async (request, res) => {
	res.send(await mysql.query('eventendlist'));
});

// 이벤트 쿠폰발급
app.post('/userevent', async (request, res) => {
	let data = request.body.param;
	res.send(await mysql.query('eventinsertcoupon', data));
});

// qna 전체 조회
app.get('/qna/:id', async (request, res) => {
	let result = await mysql.query('qnalist', request.params.id);
	res.send(result);
});

// qna 상세 조회
app.get('/qna/:id/:bno', async (request, res) => {
	let data = [request.params.id, request.params.bno];
	res.send((await mysql.query('qnainfo', data))[0]);
});

// qna 등록
app.post('/qna', async (request, res) => {
	let data = request.body.param;
	res.send(await mysql.query('qnainsert', data));
});

// qna 수정
app.put('/qna/:id/:bno', async (request, res) => {
	let data = [request.body.param, request.params.id, request.params.bno];
	let result = await mysql.query('qnaupdate', data);
	res.send(result);
});

// qna 삭제
app.delete('/qna/:bno', async (request, res) => {
	res.send((await mysql.query('qnadelete', request.params.bno))[0]);
});

// 답글
app.get('/answer', async (request, res) => {
	// query string => ?key=value&key=value...
	let data = request.query.bno;
	res.send((await mysql.query('answerinfo', data))[0]);
});

// 검색
app.get('/notices/:column/:value', async (req, res) => {
	let list = [req.params.column, req.params.value];
	let data = await mysql.query('searchnotice', list);
	res.send(data);
});

app.get('/community/:column/:value', async (req, res) => {
	let list = [req.params.column, req.params.value];
	let data = await mysql.query('searchcommu', list);
	res.send(data);
});

// 이미지 등록_community
app.post('/comPhotos', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('comImgInsert', [bno, filename]);
	}
	res.json({ filenames });
});

// 이미지 등록_qna
app.post('/qnaPhotos', upload.array('files'), async (req, res) => {
	let bno = req.body.bno;
	let filenames = req.files.map((file) => file.filename);
	console.log(filenames);
	for (let filename of filenames) {
		let result = await mysql.query('qnaImgInsert', [bno, filename]);
	}
	res.json({ filenames });
});

// 이미지
app.get('/qnaimg/:bno', async (req, rep) => {
	let result = await mysql.query('qnaImg', req.params.bno);
	rep.send(result);
});

app.get('/commuimg/:bno', async (req, rep) => {
	let result = await mysql.query('commuImg', req.params.bno);
	rep.send(result);
});

app.get('/noticeimg/:bno', async (req, rep) => {
	let result = await mysql.query('noticeImg', req.params.bno);
	rep.send(result);
});

// 이미지 다운
app.get('/download/image/:filename', (req, res) => {
	let filename = req.params.filename; // 실제 이미지 파일의 이름
	let imagePath = path.join(__dirname, 'img', 'uploads', filename); // 이미지 전송
	res.download(imagePath);
});

// 페이징
app.get(`/pagenation/:value`, async (req, res) => {
	// console.log(req.params.value);
	let data = req.params.value;
	let result = await mysql.query('page', data);
	// console.log(result[0].cnt)
	let obj = { test: result[0].cnt };
	res.send(obj);
});

// 댓글 relpylist
app.get('/reply', async (request, res) => {
	// query string => ?key=value&key=value...
	let data = request.query.comCode;
	console.log(data);
	res.send(await mysql.query('relpylist', data));
});

//마이페이지 유저정보 찾아오기ㅡㅡ
app.post('/getuserinfo', async (request, response) => {
	let data = request.body;
	console.log('유저정보 찾기위한 값 = ', data.userId);
	let result = await mysql.query('getuserinfo', data.userId);
	console.log('유저 정보 전체 =', result);
	response.send(result);
});

//마이페이지 사용가능 쿠폰 찾아오기
app.post('/validcoupon', async (request, response) => {
	let data = request.body;
	let result = await mysql.query('validusercouponlist', data.userId);
	console.log('사용가능쿠폰 정보 전체 = ', result);
	response.send(result);
});

//마이페이지 사용불가 쿠폰 찾아오기
app.post('/invalidcoupon', async (request, response) => {
	let data = request.body;
	let result = await mysql.query('invalidusercouponlist', data.userId);
	console.log('사용완료쿠폰 정보 전체 = ', result);
	response.send(result);
});
// 댓글 -----------------------------
/*댓글 등록 */
app.post("/replyinsert", async (req, res) => {
	let data = [req.body.param.content, 
				req.body.param.writer,
				req.body.param.commu_code];
	let result = await mysql.query('replyinsert', data);
	res.send(result);
});

/*대댓글 등록 */
app.post("/rereplyinsert", async (req, res) => {
	let data = req.params.commu_code;
	let data2 = [req.body.param.reply_code,
				 req.parambody.params.content,
				 req.body.param.writer,
				 this.data];
	let result = await mysql.query('rereplyinsert1', data);
				 await mysql.query('rereplyinsert2', data2);
	res.send(result);
});

/*댓글 삭제 */

/*댓글 신고 */


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

//카카오로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/kakaologin', async (request, response) => {
	let data = request.body;
	let accountcheck = '';
	console.log('카카오 계정 id=', data);
	let result = await mysql.query('login', data.user_id);
	if (result.length > 0) {
		//값을 찾으면 로그인으로
		accountcheck = '로그인으로';
	} else {
		// 값이 없어서 아무것도 안 처리되면 회원가입으로
		accountcheck = '회원가입으로';
	}
	response.send(accountcheck);
});

//판매자로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/sellerlogin', async (request, response) => {
	let data = request.body.param;
	console.log('data : ', data.sellerId);

	let result = await mysql.query('sellerlogin', data.sellerId);
	console.log('result : ', result);

	let reps = {
		check: '',
		id: '',
	};
	if (result.length != 0) {
		//비밀번호 암호화 해서 비교
		data.sellerPw = crypto.createHash('sha512').update(data.sellerPw).digest('base64');
		console.log('암호화 된 비밀번호 =', data.sellerPw);
		// console.log("result.length = ",result.length);
		// console.log("data.userPw  = ",data.userPw);
		// console.log("result.user_pw  = ",result[0].user_pw);//비밀번호
		// console.log("result.length = ",result.length);
		// console.log("data.userPw  = ",data.userPw);
		// console.log("result.user_pw  = ",result[0].user_pw);//비밀번호

		if (result[0].seller_pw == data.sellerPw) {
			reps.check = '다맞음';
			reps.id = result[0].seller_id;
			console.log('result.seller_id  = ', result[0].seller_id);
		} else {
			reps.check = '비번틀림';
		}
	} else {
		reps.check = '아이디틀림';
	}
	response.send(reps);
	console.log('reps.check : ', reps.check);
});

//아이디 찾기(회원, 판매자)ㅡ
app.post('/findInfo', async (request, response) => {
	let data = request.body.param;
	console.log('findInfo =', data.phone);
	console.log('data.division=', data.division);
	console.log(',,,, : ', data.division == '판매자' ? 'sellerfindinfo' : 'findinfo');

	const result = await mysql.query(data.division == '판매자' ? 'sellerfindinfo' : 'findinfo', data.phone);

	console.log('result =', result);

	response.send(result); //아이디, 비밀번호, 닉네임이 담겨져있음
});

//비밀번호 변경(회원, 판매자)ㅡ
app.put('/changepw/:phoneNum', async (request, response) => {
	let data = [request.body.userPw, request.params.phoneNum, request.body.division];
	console.log('비밀번호 변경을 위해 받은 정보 =', data);
	console.log('request.body.userPw=', data[0]);

	//암호화 해서 넣어줌
	data[0] = crypto.createHash('sha512').update(data[0]).digest('base64');
	console.log('암호화시킨 비밀번호 =', data[0]);

	let pushData = [data[0], data[1]];
	console.log('비밀번호 변경을 위해 보낼 정보 =', pushData);

	if (data[2] == '회원') {
		response.send(await mysql.query('changepw', pushData));
	} else if (data[2] == '판매자') {
		response.send(await mysql.query('sellerchangepw', pushData));
	}
});

const crypto = require('crypto');

//유저 회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/join', async (request, response) => {
	let data = request.body.param;
	console.log('joindata = ', data);
	//비밀번호 암호화
	data.user_pw = crypto.createHash('sha512').update(data.user_pw).digest('base64');
	console.log('암호화 된 비밀번호 =', data.user_pw);
	response.send(await mysql.query('join', data));
});

//판매자 회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post('/sellerJoin', async (request, response) => {
	let data = request.body.param;
	console.log('joindata = ', data);
	//비밀번호 암호화
	data.seller_pw = crypto.createHash('sha512').update(data.seller_pw).digest('base64');
	console.log('암호화 된 비밀번호 =', data.seller_pw);
	response.send(await mysql.query('sellerjoin', data));
});

//유저 회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡ
app.post('/joinIdCheck', async (request, response) => {
	let data = request.body.param;
	console.log('joinIdCheck : ', data);
	const result = await mysql.query('login', data.user_id);
	response.send(result.length > 0 ? false : true);
});

//판매자 회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡ
app.post('/sellerJoinIdCheck', async (request, response) => {
	let data = request.body.param;
	console.log('sellerJoinIdCheck : ', data);
	const result = await mysql.query('sellerlogin', data.seller_id);
	response.send(result.length > 0 ? false : true);
});

//유저 회원가입 시 닉네임 중복체크ㅡㅡㅡㅡㅡ
app.post('/joinNicknameCheck', async (request, response) => {
	let data = request.body.param;
	console.log('joinNicknameCheck : ', data);
	const result = await mysql.query('nicknamecheck', data.nickname);
	response.send(result.length > 0 ? false : true);
});

//핸드폰 본인인증
// npm install --save coolsms-node-sdk
app.post('/phonecheck', async (req, res) => {
	let data = req.body.param;
	console.log('본인인증을 위해 넘어온 데이터 = ', data);
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
