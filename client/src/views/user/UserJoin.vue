<template>
    <div id="container">
		<h1>회원 가입</h1>
		<hr>
		<form action="#" id="register" name="register">
			<ul id="user-info">
				<li>
					<label for="user-id" class="field">아이디</label>
					<input type="text" id="user-id" name="user-id" placeholder="4~15자리의 영문과 숫자로 입력" required>
				</li>
				<li>
					<label for="email" class="field">이메일</label>
					<input type="email" id="email" name="email" required>
				</li>
				<li>
					<label for="user-pw1" class="field">비밀번호</label>
					<input type="password" id="user-pw1" name="user-pw1" placeholder="8자리 이상" required>
				</li>
				<li>
					<label for="user-pw2" class="field">비밀번호 확인</label>
					<input type="password" id="user-pw2" name="user-pw2" required>
				</li>
				<li>
					<label class="field">메일링 수신</label>
					<label class="radio"><input type="radio" value="yes" name="mailing" checked>예</label>
					<label class="radio"><input type="radio" value="no" name="mailing">아니오</label>
				</li>
			</ul>
			<ul id="buttons">
				<li><button type="submit" >가입하기</button></li>
				<li><button type="reset" >취소</button></li>
			</ul>
		</form>
	</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        // et id = document.querySelector('#user-id');
        // let pw1 = document.querySelector('#user-pw1');
        // let pw2 = document.querySelector('#user-pw2');

        // id.onchange = idCheck;
        // pw1.onchange = pw1Check;
        // pw2.onchange = pw2Compare;

        idCheck(){
            let idLeng = id.value.length;
            if(idLeng < 4 || idLeng > 15){
                alert(`4글자 이상, 15글자 이하로 아이디를 입력해주세요`);
                id.select();
            }
        },

        pw1Check(){
            let pw1Leng = pw1.value.length;
            if(pw1Leng < 8){
                alert(`8자리 이상의 비밀번호를 입력해주세요`);
                pw1.value="";
                pw1.focus();
            }
        },

        pw2Compare(){
            if(pw2 !== pw1){
                alert(`비밀번호가 일치하지 않습니다`);
                pw2.value= '';
                pw2.focus();
            }else{
   
            }
        }
    }
}






</script>









<style scoped>
#container{
	width:600px;
	margin:0 auto;
}
h1{
	text-align: center;
}
ul li {
	list-style:none;
	clear:both;
}
.field {
	float:left;
	width:100px;
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
button {
	width:200px;
	height:50px;
	margin-right:10px;
	border:1px solid #ccc;
	border-radius: 20px;
	background:#eee;
	font-size:0.9em;
}

</style>


