<template>
    <div id="container">
		<h1>회원 가입</h1>
		<hr>
		<form style="width:700px; height:800px; text-align:center">
			<ul>
				<li>
					<label class="field">▶ 아이디</label>
					<input type="text" id="user_id" placeholder="4~12자리의 영문과 숫자로 입력하세요" required v-model="userInfo.user_id" minlength="4" maxlength="12"
                    oninput="javascript: this.value = this.value.replace(/[^?a-zA-Z0-9/]/, '').replace(/[a-zA-Z0-9]{13}$/,'')">
                    <button class="btn btn-danger rounded-pill px-3" @click="checkId()" type="button" v-if="joinCheck.idCheck">중복확인</button>
                    <button class="btn btn-success rounded-pill px-3" @click="changeId()" type="button" v-else >확인완료</button>
				</li>
                <p style="margin:0; text-align:left; font-size:13px; color:red;" v-if="joinCheck.idNotice">이미 있는 아이디입니다.</p>
                <p id="short" style="margin:0; text-align:left; font-size:13px; color:red; display:none;">아이디가 너무 짧습니다.</p>
				<li>
					<label class="field">▶ 비밀번호</label>
					<input type="password" minlength="8" maxlength="15" id="password" name="user-pw1" placeholder="8자리 이상 입력하세요" required v-model="userInfo.user_pw"
                    ><!-- 비밀번호 정규식oninput="javascript: this.value = this.value.replace(/^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, '')"-->
				</li>
				<li>
					<label class="field">▶ 비밀번호 재확인</label>
					<input type="text" minlength="8" maxlength="15" placeholder="8자리 이상 입력하세요" required v-model="userInfo.check_user_pw" @blur="checkPw">
                    <button class="btn btn-success rounded-pill px-3" type="button" style="visibility:hidden" >화면채우기용</button>
				</li>
                <p style="margin:0; text-align:left; font-size:13px; color:red;" v-if="joinCheck.pwCheck">비밀번호가 일치하지 않습니다.</p>
                
            </ul>
            <br><hr>
            
            <ul id="user-info">
                <li>
					<label for="user-pw2" class="field">▶ 이름</label>
					<input type="text" id="name" placeholder="홍길동" required v-model="userInfo.user_name">
				</li>
                <li>
					<label for="user-pw2" class="field">▶ 닉네임</label>
					<input type="text" id="nickname" placeholder="길동이" required v-model="userInfo.nickname">
                    <button class="btn btn-danger rounded-pill px-3" @click="checkNickname()" type="button" v-if="joinCheck.nicknameCheck">중복확인</button>
                    <button class="btn btn-success rounded-pill px-3" @click="changeNickname()" type="button" v-else >확인완료</button>
				</li>
                <p style="margin:0; text-align:left; font-size:13px; color:red;" v-if="joinCheck.nicknameNotice">이미 있는 닉네임입니다.</p>
                <li>
					<label for="user-pw2" class="field">▶ 생년월일</label>
					<input type="text" id="birth" placeholder="1993-01-01" required v-model="userInfo.birthday" maxlength="8" @blur="birthLengthCheck"
                    oninput="javascript: this.value = this.value.replace(/[^0-9]/, '')">
                    <button class="btn btn-success rounded-pill px-3" type="button" style="visibility:hidden" >화면채우기용</button>
				</li>
                <p id="short2" style="margin:0; text-align:left; font-size:13px; color:red; display:none;">생년월일이 너무 짧습니다.</p>
                <p id="wrong" style="margin:0; text-align:left; font-size:13px; color:red; display:none;">생년월일이 바르지 않습니다.</p>
                <li>
					<label for="user-pw2" class="field">▶ 전화번호</label>
					<input type="text" id="phone" placeholder="010-0000-0000" required v-model="userInfo.phone" maxlength="13"
                    oninput="javascript: this.value = this.value.replace(/[^0-9]/, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);">
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
                check_user_pw :'',
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
                idNotice : false,
                pwCheck : false,
                nicknameCheck : true,
                nicknameNotice : false
            }
        }
    },
    created(){
        this.userInfo.user_status ='a1',//활동회원
        this.userInfo.grade ='맛초보',
        this.userInfo.sns_status='i1'//사이트계정
    },
    methods:{
        //회원가입
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

        
        //아이디 중복체크
        async checkId(){
             //아이디 길이 체크먼저
            let id = this.userInfo.user_id;
            console.log(id.length );
            if( id.length < 3){ document.querySelector("#short").style.display = 'block'; return;}
            if( id.length > 3){//아이디가 최소 4글자 이상이면
                document.querySelector("#short").style.display = 'none';
            
        
                let obj ={
                    param :{
                        user_id : this.userInfo.user_id
                    }
                }
                let result = await axios.post("/node/joinIdCheck", obj).catch(err => console.log(err));
                console.log("vue중복체크 = ", result.data );
                if(result.data){//true일때 = 통과
                    this.joinCheck.idNotice = false;
                this.joinCheck.idCheck = false;
                document.querySelector('#user_id').disabled = true;
                }else{//false일때 = 중복있음
                    this.joinCheck.idNotice = true;
                    this.joinCheck.idCheck = true;
                }
            }
        },
        //아이디 다시 입력
        changeId(){
            this.joinCheck.idCheck = true;
            document.querySelector('#user_id').disabled = false;
        },

        //비밀번호 체크(@blur사용)
        async checkPw(){
            console.log('pw=',this.userInfo.user_pw);
            console.log('pwCheck=',this.userInfo.check_user_pw);
                
                if(this.userInfo.user_pw != this.userInfo.check_user_pw){
                    this.joinCheck.pwCheck = true;//비밀번호 같지 않음
                }else{
                    this.joinCheck.pwCheck = false;//비밀번호 같음
                }
                
        },
        //닉네임 중복체크
        async checkNickname(){
            let obj ={
                param :{
                    nickname : this.userInfo.nickname
                }
            }
            let result = await axios.post("/node/joinNicknameCheck", obj).catch(err => console.log(err));
            console.log("vue중복체크 = ", result.data );
            if(result.data){//true일때 = 통과
                this.joinCheck.nicknameNotice = false;
               this.joinCheck.nicknameCheck = false;
               document.querySelector('#nickname').disabled = true;
            }else{//false일때 = 중복있음
                this.joinCheck.nicknameNotice = true;
                 this.joinCheck.nicknameCheck = true;
            }
        },
        
        //닉네임 다시 입력
        changeNickname(){
            this.joinCheck.nicknameCheck = true;
            document.querySelector('#nickname').disabled = false;
            
        },
        
        //생년월일 글자수 체크(@blur사용)
        birthLengthCheck(){
            let birth = this.userInfo.birthday;
            console.log("birth =",birth);
            console.log("birth.length =",birth.length);
            console.log("1 =",birth.substr(0,1))
            console.log("2 =",birth.substr(1,1))
            if( birth.length < 8){ //전체 길이 체크
                document.querySelector("#wrong").style.display = 'none';
                document.querySelector("#short2").style.display = 'block';
                }
            if( birth.length == 8){
                document.querySelector("#wrong").style.display = 'none';
                document.querySelector("#short2").style.display = 'none';

                //2000.03.02 중 0번째 자리 체크(2)
                if(birth.substr(0,1) != '1' && birth.substr(0,1) != '2'){
                    document.querySelector("#wrong").style.display = 'block';
                    return;
                }
                //2000.03.02 중 1번째 자리 체크(0)
                if(birth.substr(1,1)!= '0' && birth.substr(1,1)!= '9' ){
                    document.querySelector("#wrong").style.display = 'block';
                    return;
                }
                //2000.03.02 중 4번째 자리 체크(0)
                if(birth.substr(4,2)> 12){
                    document.querySelector("#wrong").style.display = 'block';
                    return;
                }
                //2000.03.02 중 6번째 자리 체크(0)
                if((birth.substr(4,2)=='2') |(birth.substr(4,2)=='4')|(birth.substr(4,2)=='6')|(birth.substr(4,2)=='9')|(birth.substr(4,2)=='11')){
                    if(birth.substr(6,2)> 30){//30일까지 있는 달
                    document.querySelector("#wrong").style.display = 'block';
                    return;
                    }
                }else{
                    if(birth.substr(6,2)> 31){//31일까지 있는 달
                    document.querySelector("#wrong").style.display = 'block';
                    return;
                    }
                }
                
                document.querySelector("#wrong").style.display = 'none';
               this.userInfo.birthday = birth.substr(0,4) + '-' + birth.substr(4,2) + '-' + birth.substr(6,2);
               console.log("this.userInfo.birthday" ,this.userInfo.birthday);
            }
        }
        
       
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


