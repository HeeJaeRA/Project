<template>
    <div id="container">
		<h1>회원 가입</h1>
		<hr>
		<form style="width:700px; height:800px; text-align:center">
			<ul>
				<li>
					<label class="field">▶ 아이디</label>
					<input type="text" id="user_id" placeholder="4~15자리의 영문과 숫자로 입력" required v-model="userInfo.user_id">
                    <button class="btn btn-danger rounded-pill px-3" @click="checkDuplication()" type="button" v-if="joinCheck.idCheck">중복확인</button>
                    <button class="btn btn-success rounded-pill px-3"  type="button" v-else >확인완료</button>
				</li>

                <p style="margin:0; text-align:left; font-size:13px; color:red;" v-if="joinCheck.notice">이미 있는 아이디입니다.</p>
				<li>
					<label class="field">▶ 비밀번호</label>
					<input type="password" id="password" name="user-pw1" placeholder="8자리 이상" required v-model="userInfo.user_pw">
				</li>
				<li>
					<label class="field">▶ 비밀번호 재확인</label>
					<input type="text" placeholder="4~15자리의 영문과 숫자로 입력" required>
				</li>
                
            </ul>
            <br><br><hr>
            
            <ul id="user-info">
                <li>
					<label for="user-pw2" class="field">▶ 이름</label>
					<input type="text" id="name" placeholder="홍길동" required v-model="userInfo.user_name">
				</li>
                <li>
					<label for="user-pw2" class="field">▶ 닉네임</label>
					<input type="text" id="nickname" placeholder="길동이" required v-model="userInfo.nickname">
                    <button class="btn btn-success rounded-pill px-3" type="button">중복확인</button>
				</li>
                <li>
					<label for="user-pw2" class="field">▶ 생년월일</label>
					<input type="text" id="birth" placeholder="1993-01-01" required v-model="userInfo.birthday">
				</li>
                <li>
					<label for="user-pw2" class="field">▶ 전화번호</label>
					<input type="text" id="tel" placeholder="010-1111-1111" required v-model="userInfo.phone">
                    <button class="btn btn-success rounded-pill px-3" type="button">본인인증</button>
				</li>
                <li>
					<label for="user-pw2" id="picture" class="field">▶ 프로필사진</label>
					<input type="file" style="width=350px; height=35px" >
                    
				</li>
                <li>
                    <label for="user-pw2" id="gender" class="field">▶ 성별</label>
					<label style="margin-right:80px;">
                        <input type="radio" name ="gender" value="M" v-model="userInfo.gender">남성 
                    </label>

                    <label class="radio">
                        <input type="radio"  name ="gender" value="F" v-model="userInfo.gender">여성
                    </label>
				</li>
                <li>
                    <div>
                    <input type="checkbox">
                    개인정보 이용 및 수집에 동의합니다.
                    </div>
                </li>             
			</ul>
            <button class="btn btn-primary w-100 py-2" @click="userInsert()" type="button">제출하기</button>

		</form>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from "sweetalert2"
export default {
    data(){
        return{
            userInfo : {
                user_id : '',
                user_pw : '',
                user_name : '',
                nickname : '',
                phone : '',
                profile : '',
                gender : '',
                birthday : '',               
                user_status : '',
                grade : '',
                sns_status : '',
            },
            joinCheck : {
                idCheck : true,
                notice : false,
            }
        }
    },
    created(){
        this.userInfo.user_status ='일반유저',
        this.userInfo.grade ='맛초보',
        this.userInfo.sns_status='사이트계정'
    },
    methods:{
        async userInsert(){
            let obj ={
                param:{
                    user_id : this.userInfo.user_id,
                    user_pw : this.userInfo.user_pw,
                    user_name : this.userInfo.user_name,
                    nickname : this.userInfo.nickname,
                    phone : this.userInfo.phone,
                    profile : this.userInfo.profile,
                    gender : this.userInfo.gender,
                    birthday : this.userInfo.birthday,
                    user_status : this.userInfo.user_status,
                    grade : this.userInfo.grade,
                    sns_status : this.userInfo.sns_status
                }
            }
            let result = await axios.post("/node/join", obj).catch(err => console.log(err));
            console.log("joinresult : ", result);
            if(result.data.affectedRows > 0){
                Swal.fire({
                icon: "success",
                title: "회원가입 성공",
                html: "대다내 회원가입을 축하합니다!<br/>로그인 후 이용해주세요",
            });
            await this.$router.push('/login');

            }else{
                 Swal.fire({
                icon: "warning",
                title: "회원가입 실패",
                text: "회원가입에 실패하였습니다. 코드를 고쳐주세요",
            });
            }
        },
        async checkDuplication(){
            console.log("ttt")
            let obj ={
                param :{
                    user_id : this.userInfo.user_id
                }
            }
            let result = await axios.post("/node/joinIdCheck", obj).catch(err => console.log(err));
            console.log("vue중복체크 = ", result.data );
            if(result.data){//true일때 = 통과
                this.joinCheck.notice = false;
               this.joinCheck.idCheck = false;
               document.querySelector('#user_id').disabled = true;
            }else{//false일때 = 중복있음
                this.joinCheck.notice = true;
                 this.joinCheck.idCheck = true;
            }
        }




    
        // idCheck(){
        //     let idLeng = id.value.length;
        //     if(idLeng < 4 || idLeng > 15){
        //         alert(`4글자 이상, 15글자 이하로 아이디를 입력해주세요`);
        //         id.select();
        //     }
        // },

        // pw1Check(){
        //     let pw1Leng = pw1.value.length;
        //     if(pw1Leng < 8){
        //         alert(`8자리 이상의 비밀번호를 입력해주세요`);
        //         pw1.value="";
        //         pw1.focus();
        //     }
        // },

        // pw2Compare(){
        //     if(pw2 !== pw1){
        //         alert(`비밀번호가 일치하지 않습니다`);
        //         pw2.value= '';
        //         pw2.focus();
        //     }else{
   
        //     }
        // }
    }
}
</script>


<style scoped>
#container{
	width:700px;
	margin:0 auto;
    
}
h1{
	text-align: center;
}
ul li {
	list-style:none;
	clear:both;
    padding-bottom: 20px;
    padding-top: 10px;
}

.field {
	float:left;
	width:150px;
	font-weight:bold;
	font-size:0.9em;
	line-height: 55px;
	text-align:center;
	margin-right:15px;
}
input[type="text"], 
input[type="password"], 
input[type="tel"] {
	float:left;
	width:350px;
	height:35px;
	border:1px solid #aaa;
	border-radius:5px;
	padding:5px;
	margin:10px 0;
	
}

 .radio {
	line-height:55px;
} 
#buttons{
	text-align: center;
}
/* button {
	width:200px;
	height:50px;
	margin-right:10px;
	border:1px solid #ccc;
	border-radius: 20px;
	background:#f2ffe4;
	font-size:0.9em;
    
} */

</style>


