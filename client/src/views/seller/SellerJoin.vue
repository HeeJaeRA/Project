<template>
	<div id="container">
		<h1>판매자 회원 가입</h1>
        <br/>
		<hr />
		<form style="width: 700px; height: 900px; text-align: center">
			<ul>
				<li>
					<label class="field">▶ 아이디</label>
					<input
						type="text"
						id="seller_id"
						placeholder="4~12자리의 영문과 숫자로 입력하세요"
						required
						v-model="sellerInfo.seller_id"
						minlength="4"
						maxlength="12"
						oninput="javascript: this.value = this.value.replace(/[^?a-zA-Z0-9/]/, '').replace(/[a-zA-Z0-9]{13}$/,'')"
					/>
					<button
						class="btn btn-danger rounded-pill px-3"
						@click="checkId()"
						type="button"
						v-if="joinCheck.idCheck"
					>
						중복확인
					</button>
					<button class="btn btn-success rounded-pill px-3" @click="changeId()" type="button" v-else>
						확인완료
					</button>
				</li>
				<p style="margin: 0; text-align: left; font-size: 13px; color: red" v-if="joinCheck.idNotice">
					이미 있는 아이디입니다.
				</p>
				<p id="short" style="margin: 0; text-align: left; font-size: 13px; color: red; display: none">
					아이디가 너무 짧습니다.
				</p>
				<li>
					<label class="field">▶ 비밀번호</label>
					<input
						type="password"
						minlength="8"
						maxlength="15"
						id="password"
						name="seller-pw1"
						placeholder="8자리 이상 입력하세요"
						required
						v-model="sellerInfo.seller_pw"
                        @blur="checkPwVaild"
					/>
                    <button class="btn btn-success rounded-pill px-3" type="button" style="visibility: hidden">
						화면채우기용
					</button>
				</li>
                <p style="margin: 0; text-align: left; font-size: 13px; color:red;" v-if="joinCheck.strongPw" >
					 영문, 숫자, 특수문자를 사용하여 8글자 이상의 비밀번호를 작성해주세요.
				</p>

				<li>
					<label class="field">▶ 비밀번호 재확인</label>
					<input
						type="password"
						minlength="8"
						maxlength="15"
						placeholder="8자리 이상 입력하세요"
						required
						v-model="sellerInfo.check_seller_pw"
						@blur="checkPw"
					/>
					<button class="btn btn-success rounded-pill px-3" type="button" style="visibility: hidden">
						화면채우기용
					</button>
				</li>
				<p style="margin: 0; text-align: left; font-size: 13px; color: red" v-if="joinCheck.pwCheck">
					비밀번호가 일치하지 않습니다.
				</p>
			</ul>
			<br />
			<hr />

			<ul id="seller-info">
				<li>
					<label for="seller-pw2" class="field">▶ 이름</label>
					<input type="text" id="name" placeholder="홍길동" required v-model="sellerInfo.seller_name" />
				</li>
				<li>
					<label for="seller-pw2" class="field">▶ 생년월일</label>
					<input
						type="text"
						id="birth"
						placeholder="1993-01-01"
						required
						v-model="sellerInfo.birthday"
						maxlength="8"
						@blur="birthLengthCheck"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/, '')"
					/>
					<button class="btn btn-success rounded-pill px-3" type="button" style="visibility: hidden">
						화면채우기용
					</button>
				</li>
				<p style="margin: 0; text-align: left; font-size: 13px; color: red;" v-if="joinCheck.shortbirth">
					생년월일이 너무 짧습니다.
				</p>
				<p style="margin: 0; text-align: left; font-size: 13px; color: red;" v-if="joinCheck.wrongbirth">
					생년월일이 바르지 않습니다.
				</p>
				<li>
					<label for="seller-pw2" class="field">▶ 전화번호</label>
					<input
						type="text"
						id="phone"
						placeholder="010-0000-0000"
						required
						v-model="sellerInfo.phone"
						maxlength="11"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/, '')"
                        @keyup="phoneNum"
					/>
                    <button class="btn btn-success rounded-pill px-3" type="button" v-if="joinCheck.phonevaild">인증완료</button>
                    <button class="btn btn-danger rounded-pill px-3" type="button" @click="phoneCheck()" v-else>본인인증</button>
				</li>
				<li>
					<label for="seller-pw2" id="gender" class="field">▶ 성별</label>
					<label style="margin-right: 80px">
						<input type="radio" name="gender" value="M" v-model="sellerInfo.gender" />남성
					</label>

					<label class="radio">
						<input type="radio" name="gender" value="F" v-model="sellerInfo.gender" />여성
					</label>
				</li>
				<li>
					<div>
						<input type="checkbox" @click="joinAllCheck()" v-model="sellerInfo.checkbox"/>
						개인정보 이용 및 수집에 동의합니다.
                        <p style="margin: 0; text-align: center; font-size: 13px; color:red;" >
					    반드시 동의하셔야 회원가입이 가능합니다.</p>
                    </div>
					
				</li>
			</ul>
			<button id="submit" class="btn btn-primary w-100 py-2" @click="sellerInsert()" type="button" style="background-color:gray" disabled >제출하기</button>
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
	data() {
		return {
			sellerInfo: {
				seller_id: '',
				seller_pw: '',
				check_seller_pw: '',
				seller_name: '',
				phone: '',
				gender: '',
				birthday: '',
                checkbox: '',
				user_division : '판매자',
			},
			joinCheck: {
				idCheck: true,
				idNotice: false,
				pwCheck: false,
                strongPw : false,
                shortbirth : false,
                wrongbirth : false,
                phonevaild : false,
                token : null,
                checktoken : null
			},
		};
	},
	created() {
		this.sellerInfo.user_division = '판매자';
	},
	methods: {
        //회원가입 전 회원가입 폼 전체 조건 확인
        joinAllCheck(){
            setTimeout(() => {

                 if(
                    this.sellerInfo.seller_id != null &&//정보가 다 들어왔는지
                    this.sellerInfo.seller_pw != null &&
                    this.sellerInfo.check_seller_pw != null &&
                    this.sellerInfo.seller_name != null &&
                    this.sellerInfo.birthday != null &&
                    this.sellerInfo.phone != null &&
                    this.sellerInfo.gender != null &&
                    this.sellerInfo.checkbox == true && //체크박스 체크 했는지
                    this.joinCheck.idCheck == false && //아이디 중복확인 과정
                    this.joinCheck.strongPw == false && //비밀번호 유효성검사(나머지 유효성은 template에서 oninput으로 해결함)
                    this.joinCheck.pwCheck == false &&//비밀번호 일치여부
                    this.joinCheck.shortbirth == false && //생년월일 전체 다 입력 안 했을때 체크
                    this.joinCheck.wrongbirth == false &&// 생년월일 형식 이상하게 입력했을때 체크
                    this.joinCheck.phonevaild ==true// 전화 인증을 완료했을때
                ){//조건이 맞으면
                    document.querySelector("#submit").disabled = false;
                    document.querySelector("#submit").style.backgroundColor = "#0d6efd";
                    
                }
                
            }, 300);
            
           
        },
        

		//회원가입
		async sellerInsert() {
			let obj = {
				param: {
					seller_id: this.sellerInfo.seller_id,
					seller_pw: this.sellerInfo.seller_pw,
					seller_name: this.sellerInfo.seller_name,
					phone: this.sellerInfo.phone,
					gender: this.sellerInfo.gender,
					birthday: this.sellerInfo.birthday,
					user_division: this.sellerInfo.user_division,
				},
			};
			let result = await axios.post('/node/sellerjoin', obj).catch((err) => console.log(err));
			console.log('joinresult : ', result);
			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '회원가입 성공',
					html: '대다내 회원가입을 축하합니다!<br/>로그인 후 이용해주세요',
				});
				await this.$router.push('/login');
			} else {
				Swal.fire({
					icon: 'warning',
					title: '회원가입 실패',
					text: '회원가입에 실패하였습니다. 코드를 고쳐주세요',
				});
			}
		},

		//아이디 중복체크
		async checkId() {
			//아이디 길이 체크먼저
			let id = this.sellerInfo.seller_id;
			console.log(id.length);
			if (id.length < 4) {//4글자보다 적을시
				document.querySelector('#short').style.display = 'block';
				return;
			}
			if (id.length > 3) {
				//아이디가 최소 4글자 이상이면
				document.querySelector('#short').style.display = 'none';

				let obj = {
					param: {
						seller_id: this.sellerInfo.seller_id,
					},
				};
				let result = await axios.post('/node/sellerJoinIdCheck', obj).catch((err) => console.log(err));
				console.log('vue중복체크 = ', result.data);
				if (result.data) {
					//true일때 = 통과
					this.joinCheck.idNotice = false;
					this.joinCheck.idCheck = false;
					document.querySelector('#seller_id').disabled = true;
				} else {
					//false일때 = 중복있음
					this.joinCheck.idNotice = true;
					this.joinCheck.idCheck = true;
				}
			}
		},
		//아이디 다시 입력
		changeId() {
			this.joinCheck.idCheck = true;
			document.querySelector('#seller_id').disabled = false;
		},

        //비밀번호 유효성 체크
        async checkPwVaild(){
            let check = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.sellerInfo.seller_pw);
            console.log(check); //제대로 입력하면 true 값이 넘어옴
            if(check){
                this.joinCheck.strongPw = false;
            }else{
                this.joinCheck.strongPw = true;
            }
        },

		//같은 비밀번호인지 체크(@blur사용)
		async checkPw() {
			console.log('pw=', this.sellerInfo.seller_pw);
			console.log('pwCheck=', this.sellerInfo.check_seller_pw);

			if (this.sellerInfo.seller_pw != this.sellerInfo.check_seller_pw) {
				this.joinCheck.pwCheck = true; //비밀번호 같지 않음
			} else {
				this.joinCheck.pwCheck = false; //비밀번호 같음
			}
		},
        

		//생년월일 글자수 체크(@blur사용)
		birthLengthCheck() {
			let birth = this.sellerInfo.birthday;
			console.log('birth =', birth);
			console.log('birth.length =', birth.length);
			console.log('1 =', birth.substr(0, 1));
			console.log('2 =', birth.substr(1, 1));
			if (birth.length < 8) {
				//전체 길이 체크
				this.joinCheck.wrongbirth = false;
				this.joinCheck.shortbirth = true;
			}
			if (birth.length == 8) {
				this.joinCheck.wrongbirth = false;
				this.joinCheck.shortbirth = false;

				//2000.03.02 중 0번째 자리 체크(2)
				if (birth.substr(0, 1) != '1' && birth.substr(0, 1) != '2') {
					this.joinCheck.wrongbirth = true;
					return;
				}else if(birth.substr(0, 1) == '1' && birth.substr(1, 1) == '0'){
                    this.joinCheck.wrongbirth = true;
					return;
                }else if(birth.substr(0, 1) == '2' && birth.substr(1, 1) == '9'){
                    this.joinCheck.wrongbirth = true;
					return;
                }

				//2000.03.02 중 1번째 자리 체크(0)
				if (birth.substr(1, 1) != '0' && birth.substr(1, 1) != '9') {
					this.joinCheck.wrongbirth = true;
					return;
				}
				//2000.03.02 중 4번째 자리 체크(0)
				if (birth.substr(4, 2) > 12) {
					this.joinCheck.wrongbirth = true;
					return;
				}
				//2000.03.02 중 6번째 자리 체크(0)
				if (
					(birth.substr(4, 2) == '02') |
					(birth.substr(4, 2) == '04') |
					(birth.substr(4, 2) == '06') |
					(birth.substr(4, 2) == '09') |
					(birth.substr(4, 2) == '11')
				) {
					if (birth.substr(6, 2) > 30) {
						//30일까지 있는 달
						this.joinCheck.wrongbirth = true;
						return;
					}
				} else {
					if (birth.substr(6, 2) > 31) {
						//31일까지 있는 달
						this.joinCheck.wrongbirth = true;
						return;
					}
				}

				this.joinCheck.wrongbirth = false;
				this.sellerInfo.birthday = birth.substr(0, 4) + '-' + birth.substr(4, 2) + '-' + birth.substr(6, 2);
				console.log('this.sellerInfo.birthday', this.sellerInfo.birthday);
			}
		},

        //핸드폰 번호에 하이픈 부여 후 반환
        async phoneNum(e){
			this.sellerInfo.phone = e.target.value;
            let phone = this.sellerInfo.phone;
           if(phone.length == 11){
				this.sellerInfo.phone = phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4);
				console.log("보여줄 전화번호 = ",this.sellerInfo.phone);
			}
        },

        //핸드폰 번호 인증
        async phoneCheck(){
				let phone = this.sellerInfo.phone;
				this.sellerInfo.phone = phone.substr(0, 3) + phone.substr(4, 4) + phone.substr(9, 4);
				console.log("인증으로 보낼 전화번호 = ",this.sellerInfo.phone);
				//토큰 랜덤 생성
				let token = '';
				for(let i=0; i < 6; i++ ){
				token += String(Math.floor(Math.random() * 10));
				}
				this.joinCheck.token = token;
				console.log("발급토큰=", this.joinCheck.token);

				//문자메세지로 토큰 발송
				let phoneData = {
					param :{
						phone : this.sellerInfo.phone,
						token : this.joinCheck.token,
						
					}
				}
				const result = await axios.post('/node/phonecheck', phoneData).catch((err) => console.log(err));
				console.log("발송결과 =", result)

				//성공적으로 발송되면 받은 인증번호 입력하는 alert창 띄움
				if(result){ 
					(async () => {
						const { value: checkToken } = await Swal.fire({
							title: '인증번호를 입력해주세요.',
							input: 'text',
							inputPlaceholder: '핸드폰으로 인증받은 숫자6자리를 입력하세요',
							confirmButtonText: '제출', 
						})
						this.joinCheck.checktoken = checkToken;
						console.log("인증토큰=", this.joinCheck.checktoken);

						// 이후 처리되는 내용.
						if (this.joinCheck.token == this.joinCheck.checktoken) {
							Swal.fire(`인증이 정상적으로 <br/>완료되었습니다.`);
							this.joinCheck.phonevaild = true;
							document.querySelector("#phone").disabled = true;

						}else{
							Swal.fire(`인증번호가 다릅니다.`);
						}
					})()
				}
		}

	},
};
</script>

<style scoped>
#container {
	width: 700px;
	margin: 0 auto;
}
h1 {
	text-align: center;
}
ul li {
	list-style: none;
	clear: both;
	padding-bottom: 20px;
	padding-top: 10px;
}

.field {
	float: left;
	width: 150px;
	font-weight: bold;
	font-size: 0.9em;
	line-height: 55px;
	text-align: center;
	margin-right: 15px;
}
input[type='text'],
input[type='password'],
input[type='tel'] {
	float: left;
	width: 350px;
	height: 35px;
	border: 1px solid #aaa;
	border-radius: 5px;
	padding: 5px;
	margin: 10px 0;
}

.radio {
	line-height: 55px;
}
#buttons {
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
