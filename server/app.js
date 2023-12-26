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
	}
	if(result.length !=0){
		// console.log("result.length = ",result.length);
		// console.log("data.userPw  = ",data.userPw);
		// console.log("result.user_pw  = ",result[0].user_pw);//비밀번호
		
		if(result[0].user_pw == data.userPw){
			reps.check = "다맞음";
			console.log("result.user_id  = ",result[0].user_id);

			//세션추가
			window.localStorage.setItem('userId', result[0].user_id); //키 값 : userId, 데이터 : user1
			const userId = window.localStorage.getItem('userId');
			console.log(userId);

		}else{
			reps.check = "비번틀림"
		}
	}else{
		reps.check = "아이디틀림"
	}
	response.send(reps);
	console.log("reps.check : ", reps.check);
})
