<template>
	<div id="container">
		<h1 v-if="updateinfo.sessionid">회원정보수정</h1>
		<h1 v-else>회원 가입</h1>
        <br/>
		<hr />
		<form style="width: 700px; height: 900px; text-align: center">
			<ul>
				<li>
					<label class="field">▶ 아이디</label>
					<!-- ref를 사용해야하는데 이미 id를 너무 많이 사용해서(쿼리셀렉터) 지금바꾸기엔 너무 힘듦,, -->
					<input
						type="text"
						id="user_id"
						v-bind:disabled="updateinfo.blockId"
						placeholder="4~12자리의 영문과 숫자로 입력하세요"
						required
						v-model="userInfo.user_id"
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
					<button class="btn btn-success rounded-pill px-3" v-bind:disabled="updateinfo.kakaoId" @click="changeId()" type="button" v-else>
						확인완료
					</button>
				</li>
				<p style="margin: 0; text-align: left; font-size: 13px; color: red" v-if="joinCheck.idNotice">
					이미 있는 아이디입니다.
				</p>
				<p id="short" style="margin: 0; text-align: left; font-size: 13px; color: red; display: none">
					아이디가 너무 짧습니다.
				</p>
				<p id="goodid" style="margin: 0; text-align: left; font-size: 13px; color: green; display: none">
					사용가능한 아이디입니다. 변경을 원하시면 확인완료 버튼을 눌러주세요
				</p>
				<li>
					<label class="field">▶ 비밀번호</label>
					<input
						type="password"
						minlength="8"
						maxlength="15"
						id="password"
						name="user-pw1"
						placeholder="8자리 이상 입력하세요"
						required
						v-model="userInfo.user_pw"
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
						v-model="userInfo.check_user_pw"
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

			<ul id="user-info">
				<li>
					<label for="user-pw2" class="field">▶ 이름</label>
					<input type="text" id="name" placeholder="홍길동" required v-model="userInfo.user_name" />
				</li>
				<li>
					<label for="user-pw2" class="field">▶ 닉네임</label>
					<input type="text" id="nickname" placeholder="길동이" required v-model="userInfo.nickname" />
					<button
						class="btn btn-danger rounded-pill px-3"
						@click="checkNickname()"
						type="button"
						v-if="joinCheck.nicknameCheck"
					>
						중복확인
					</button>
					<button class="btn btn-success rounded-pill px-3" @click="changeNickname()" type="button" v-else>
						확인완료
					</button>
				</li>
				<p v-show="updateinfo.goodnickname" style="margin: 0; text-align: left; font-size: 13px; color: green;">
					사용가능한 닉네임입니다. 변경을 원하시면 확인완료 버튼을 눌러주세요
				</p>
				<p style="margin: 0; text-align: left; font-size: 13px; color: red" v-if="joinCheck.nicknameNotice">
					이미 있는 닉네임입니다.
				</p>
				<li>
					<label for="user-pw2" class="field">▶ 생년월일</label>
					<input
						type="text"
						id="birth"
						placeholder="1993-01-01"
						required
						v-model="userInfo.birthday"
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
					<label for="user-pw2" class="field">▶ 전화번호</label>
					<input
						type="text"
						id="phone"
						placeholder="010-0000-0000"
						required
						v-model="userInfo.phone"
						maxlength="11"
						oninput="javascript: this.value = this.value.replace(/[^0-9]/, '')"
                        @keyup="phoneNum"

					/>
                    <button class="btn btn-success rounded-pill px-3" type="button" v-if="joinCheck.phonevaild">인증완료</button>
                    <button class="btn btn-danger rounded-pill px-3" type="button" @click="phoneCheck()" v-else>본인인증</button>
				</li>
				<!-- 파일전송은 AdminNoticeForm.vue참고 -->
				<li>
					<label for="user-pw2" id="picture" class="field">▶ 프로필사진</label>
					<input type="file" style="width=350px;" ref="fileInput" @change="handleChange" multiple/>
				</li>
				<li>
					<label for="user-pw2" id="gender" class="field">▶ 성별</label>
					<label style="margin-right: 80px">
						<input type="radio" name="gender" value="M" v-model="userInfo.gender" />남성
					</label>

					<label class="radio">
						<input type="radio" name="gender" value="F" v-model="userInfo.gender" />여성
					</label>
				</li>
				<li>
					<div>
						<input type="checkbox" @click="joinAllCheck()" v-model="userInfo.checkbox"/>
						개인정보 이용 및 수집에 동의합니다.
                        <p style="margin: 0; text-align: center; font-size: 13px; color:red;" >
					    반드시 동의하셔야 회원가입이 가능합니다.</p>
                    </div>
					
				</li>
			</ul>
			<button  v-if="updateinfo.sessionid" id="submit" class="btn btn-primary w-100 py-2" @click="userUpdate()" type="button" style="background-color:gray" disabled >수정하기</button>
			
			<button v-else id="submit" class="btn btn-primary w-100 py-2" @click="userInsert()" type="button" style="background-color:gray" disabled >제출하기</button>
			
		</form>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
	data() {
		return {
			profile: [],
			userInfo: {
				user_id: '',
				user_pw: '',
				check_user_pw: '',
				user_name: '',
				nickname: '',
				phone: '',
				gender: '',
				birthday: '',
				user_status: '',
				grade: '',
				sns_status: '',
                checkbox: '',
                selectedFile : null,
			},
			joinCheck: {
				idCheck: true,
				idNotice: false,
				pwCheck: false,
				nicknameCheck: true,
				nicknameNotice: false,
                strongPw : false,
                shortbirth : false,
                wrongbirth : false,
                phonevaild : false,
                token : null,
                checktoken : null
			},
			updateinfo:{
				sessionid : false,
				blockId : false,
				kakaoId : false,
				goodnickname : false,
			}
		};
	},
	created() {
		

		console.log("query = ",this.$route.query.userId)//라우터 값 드디어 받아옴
		if(this.$route.query.userId != undefined){//만약 카카오에서 받아온 아이디 값이 있다면
			this.userInfo.user_id = this.$route.query.userId;
			this.userInfo.sns_status = '카카오계정'; 
			this.joinCheck.idNotice = false;
			this.joinCheck.idCheck = false;
		}else{
			this.userInfo.sns_status = '사이트계정';
		}

		(this.userInfo.user_status = '활동회원'); //활동회원
		(this.userInfo.grade = '맛초보');
		this.updateinformation();
		
	},
	mounted(){
		if(this.$route.query.userId != undefined){
			document.querySelector('#user_id').disabled = true;
			this.updateinfo.kakaoId = true;
		}
		
	},
	methods: {
        //회원가입 전 회원가입 폼 전체 조건 확인
        joinAllCheck(){
            setTimeout(() => {

                 if(
                    this.userInfo.user_id != null &&//정보가 다 들어왔는지
                    this.userInfo.user_pw != null &&
                    this.userInfo.check_user_pw != null &&
                    this.userInfo.user_name != null &&
                    this.userInfo.nickname != null &&
                    this.userInfo.birthday != null &&
                    this.userInfo.phone != null &&
                    this.userInfo.gender != null &&
                    this.userInfo.checkbox == true && //체크박스 체크 했는지
                    this.joinCheck.idCheck == false && //아이디 중복확인 과정
                    this.joinCheck.strongPw == false && //비밀번호 유효성검사(나머지 유효성은 template에서 oninput으로 해결함)
                    this.joinCheck.pwCheck == false &&//비밀번호 일치여부
                    this.joinCheck.nicknameCheck == false && //닉네임 중복확인 과정
                    this.joinCheck.shortbirth == false && //생년월일 전체 다 입력 안 했을때 체크
                    this.joinCheck.wrongbirth == false &&// 생년월일 형식 이상하게 입력했을때 체크
                    this.joinCheck.phonevaild ==true// 전화 인증을 완료했을때
                ){//조건이 맞으면
                    document.querySelector("#submit").disabled = false;
                    document.querySelector("#submit").style.backgroundColor = "#0d6efd";
                    
                }
                
            }, 300);
            
           
        },

		//파일 배열에 저장
		handleChange(e){
			this.profile = e.target.files[0]
		},

		//회원가입(이미지 파일도 같이 보냄)
		async userInsert() {
			let obj = {
					user_id: this.userInfo.user_id,
					user_pw: this.userInfo.user_pw,
					user_name: this.userInfo.user_name,
					nickname: this.userInfo.nickname,
					phone: this.userInfo.phone,
					gender: this.userInfo.gender,
					birthday: this.userInfo.birthday,
					profile : this.profile,
					user_status: this.userInfo.user_status,
					grade: this.userInfo.grade,
					sns_status: this.userInfo.sns_status,
			}

			//파일 Rsinsert.vue(seller)참고 / 노드에서는 rsphotos(app.js) 참고
			//1. 파일 이름뿐만 아니라 파일자체를 넣기위해서는 FormData를 써야함
			const formData = new FormData();
			//2. 만약 사진이 있으면 formData안에 files라는 이름으로 넣음
			if (this.profile) {
				formData.append(`files`, this.profile);
			}
			console.log("formData 이미지=", formData);

			//3.회원가입에 필요한 전체 데이터를 json으로 parse시킨 후 회원정보 데이터를 formData에 넣어줌
			const userInfo = JSON.stringify(obj); 
			formData.append('userInfo', userInfo);
			console.log("formData 회원정보 포함 =",formData);

			//4. 서버단에 넘겨줌
			let result = await axios.post('/node/join', formData).catch((err) => console.log(err));
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

		//기존 회원정보 보여주기(회원수정1)
		async updateinformation(){
			//세션에 정보가 있으면 회원정보 수정으로 바뀜
			const user_id = window.localStorage.getItem('userId');
			console.log("user_id=",user_id);
			
			if(user_id == null){
				return;
			}else{
				this.updateinfo.sessionid = true;//회원정보 수정으로 제목 바꿔줌
				this.joinCheck.idCheck = false;
				this.joinCheck.nicknameCheck = false;
				this.updateinfo.blockId = true;//아이디 input창 막음
				this.updateinfo.kakaoId = true;//아이디 확인완료 버튼 막음
				this.updateinfo.goodnickname = true;//닉네임바꾸는거 안내창


				let previousInfo = await (axios.post('/node/previousInfo', {user_id})
                                .catch(err=>{console.log(err)}));
				console.log("previousInfo=", previousInfo.data[0]);
				this.userInfo.user_id= previousInfo.data[0].user_id ,
				this.userInfo.user_name= previousInfo.data[0].user_name,
				this.userInfo.nickname= previousInfo.data[0].nickname,
				this.userInfo.phone= previousInfo.data[0].phone,
				this.userInfo.profile= previousInfo.data[0].profile,
				this.userInfo.gender= previousInfo.data[0].gender,
				this.userInfo.birthday= previousInfo.data[0].birthday.substr(0, 10);
				}
		},
		//회원수정
		async userUpdate(){
			let obj = {
				param: {
					user_pw: this.userInfo.user_pw,
					user_name: this.userInfo.user_name,
					nickname: this.userInfo.nickname,
					phone: this.userInfo.phone,
					profile: this.profile,
					gender: this.userInfo.gender,
					birthday: this.userInfo.birthday,
				},
				userid: this.userInfo.user_id
			};
			let updateResult =await axios.post('/node/userInfoUpdate',obj)
								.catch(err=>{console.log(err)});
			console.log("updateResult = ", updateResult);
			
			if (updateResult.data.changedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '회원정보가 수정되었습니다.',
				});
				
			} else {
				Swal.fire({
					icon: 'info',
					title: '수정된 정보가 없습니다. <br/> 마이페이지로 돌아갑니다. ',
				});
			}
			this.$router.push('/mypage');
		},

		//아이디 중복체크
		async checkId() {
			//아이디 길이 체크먼저
			let id = this.userInfo.user_id;
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
						user_id: this.userInfo.user_id,
					},
				};
				let result = await axios.post('/node/joinIdCheck', obj).catch((err) => console.log(err));
				console.log('vue중복체크 = ', result.data);
				if (result.data) {
					//true일때 = 통과
					this.joinCheck.idNotice = false;
					this.joinCheck.idCheck = false;
					document.querySelector('#user_id').disabled = true;
					document.querySelector('#goodid').style.display = 'block';
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
			document.querySelector('#user_id').disabled = false;
			document.querySelector('#goodid').style.display = 'none';
		},

        //비밀번호 유효성 체크
        async checkPwVaild(){
            let check = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(this.userInfo.user_pw);
            console.log(check); //제대로 입력하면 true 값이 넘어옴
            if(check){
                this.joinCheck.strongPw = false;
            }else{
                this.joinCheck.strongPw = true;
            }
        },

		//같은 비밀번호인지 체크(@blur사용)
		async checkPw() {
			console.log('pw=', this.userInfo.user_pw);
			console.log('pwCheck=', this.userInfo.check_user_pw);

			if (this.userInfo.user_pw != this.userInfo.check_user_pw) {
				this.joinCheck.pwCheck = true; //비밀번호 같지 않음
			} else {
				this.joinCheck.pwCheck = false; //비밀번호 같음
				
			}
		},
        
		//닉네임 중복체크
		async checkNickname() {
			let obj = {
				param: {
					nickname: this.userInfo.nickname,
				},
			};
			let result = await axios.post('/node/joinNicknameCheck', obj).catch((err) => console.log(err));
			console.log('vue중복체크 = ', result.data);
			if (result.data) {
				//true일때 = 통과
				this.joinCheck.nicknameNotice = false;
				this.joinCheck.nicknameCheck = false;
				document.querySelector('#nickname').disabled = true;
				this.updateinfo.goodnickname = true;
				
			} else {
				//false일때 = 중복있음
				this.joinCheck.nicknameNotice = true;
				this.joinCheck.nicknameCheck = true;
			}
		},

		//닉네임 다시 입력
		changeNickname() {
			this.joinCheck.nicknameCheck = true;
			document.querySelector('#nickname').disabled = false;
			this.updateinfo.goodnickname = false;
		},

		//생년월일 글자수 체크(@blur사용)
		birthLengthCheck() {
			let birth = this.userInfo.birthday;
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
				this.userInfo.birthday = birth.substr(0, 4) + '-' + birth.substr(4, 2) + '-' + birth.substr(6, 2);
				console.log('this.userInfo.birthday', this.userInfo.birthday);
			}
		},
        // //파일 업로드
        // handleChange(e){
        //     this.userInfo.selectedFile = e.target.files[0];
		// 	console.log('받은사진 이름 =', this.userInfo.selectedFile)
        //     //업로드 한 파일을 [0] 딱 한건만 가져와서 이벤트를 걸음
        // },
        // //파일 이름변경
        // async uploadFile(){
        //     document.querySelector("#failupload").style.display ="none";
        //     if(this.userInfo.selectedFile != null){
        //         const formData = new FormData();
        //         //이미지 같은 멀티미디어 파일을 페이지 전환 없이 폼 데이터를 비동기로 제출 하고 싶을 때 사용
        //         formData.append('file', this.userInfo.selectedFile)
        //     try{
        //     const response = await axios.post('/node/photo', formData);
        //     this.userInfo.profile = response.data.filename;
        //     console.log("파일이름= ", response.data.filename);
        //     } catch(error){
        //         console.error(error);
        //     }
        //     document.querySelector("#filebutton1").style.display ="none";
        //     document.querySelector("#filebutton2").style.display ="inline";
        //    }else{
        //     document.querySelector("#failupload").style.display ="block";
        //    }
        // },

        //핸드폰 번호에 하이픈 부여 후 반환
        async phoneNum(e){
			this.userInfo.phone = e.target.value;
            let phone = this.userInfo.phone;
			if(phone.length == 11){
				this.userInfo.phone = phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4);
			}
            
        },

        //핸드폰 번호 인증
        async phoneCheck(){
				console.log("인증으로 보낼 전화번호 = ",this.userInfo.phone);
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
						phone : this.userInfo.phone,
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
