require('dotenv').config({ path: './db/project.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');

app.use(express.json({ limit: '50mb' }));

app.listen(3000, () => {
	console.log('서버 시작');
});

app.post("/login", async(request, response)=>{
	let data = request.body.param;
	console.log("data : ", data);
	
	let result = await mysql.query("login", data.userId);
	console.log("result : ", result);

	let reps = {
		check : "",
	}
	if(result){
		if(result.userPw == data.userPw){
			reps.check = "다맞음"
			reps.userName = result.user_name

			//세션추가
			
		}else{
			reps.check = "비번틀림"
			
		}
	}else{
		reps.check = "아이디틀림"
	}
	response.send(reps);
})

// 공지사항 전체 조회
app.get("/notices", async (request, res) => {
	res.send(await mysql.query("noticelist"));
  });

// 공지사항 상세 조회
app.get("/notices/:bno", async (request, res) => {
	res.send((await mysql.query("noticeinfo", request.params.bno))[0]);
  });

// 공지사항 조회수
app.put("/notices/:bno", async(request, res) => {
	let data = request.params.bno
	res.send((await mysql.query("viewcnt", data)))
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
app.post("/community", async (request, res) =>{
	let data = request.body.param;
	res.send((await mysql.query("cominsert", data)));
});

// 커뮤니티 수정
 app.put("/community/:bno", async (request, res) => {
 	res.send((await mysql.query("comupdate", request.params.bno))[0]);
 });

// 커뮤니티 삭제
app.delete("/community/:bno", async (request, res) => {
	res.send((await mysql.query("comdelete", request.params.bno))[0]);
});

// 커뮤니티 조회수
app.patch("/community/:bno", async(request, res) => {
	let data = request.params.bno
	res.send((await mysql.query("comviewcnt", data)));
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
app.get("/answer", async(request, res)=> {
    // query string => ?key=value&key=value...
    let data = request.query.bno;
    res.send((await mysql.query("answerinfo", data)));
})