require('dotenv').config({ path: './db/project.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');
const multer = require('multer');
const path = require('path');

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
