require('dotenv').config({ path: './db/project.env' });
const express = require('express');
const app = express();
const mysql = require('./db.js');

app.use(express.json({ limit: '50mb' }));

app.listen(3000, () => {
	console.log('서버 시작');
});

//로그인ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/login", async(request, response)=>{
	let data = request.body.param;
	console.log("data : ", data.userId);
	
	let result = await mysql.query("login", data.userId);
	console.log("result : ", result);

	let reps = {
		check : "",
		id : ""
	}
	if(result.length !=0){
		// console.log("result.length = ",result.length);
		// console.log("data.userPw  = ",data.userPw);
		// console.log("result.user_pw  = ",result[0].user_pw);//비밀번호
		
		if(result[0].user_pw == data.userPw){
			reps.check = "다맞음";
			reps.id = result[0].user_id;
			console.log("result.user_id  = ",result[0].user_id);

		}else{
			reps.check = "비번틀림"
		}
	}else{
		reps.check = "아이디틀림"
	}
	response.send(reps);
	console.log("reps.check : ", reps.check);
})


//회원가입ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
app.post("/join", async(request, response)=>{
	let data = request.body.param;
	console.log("joindata = ", data)
	response.send(await mysql.query("join", data));
})

//회원가입 시 아이디중복체크ㅡㅡㅡㅡㅡㅡㅡㅡ작업중
app.post("/join", async(request, response)=>{
	let data = request.body.param;
	console.log("checkdata : ", data);
	response.send((await mysql.query("login", data.userId))[0]);
	
})
