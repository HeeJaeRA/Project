<template>
	<div class="container">
		<main class="form-signin w-100 m-auto">
			<form style="width: 400px; height: 600px; margin: 0 auto">
				<br /><br /><br />

				<div style="text-align: center">
					<h1 class="h3 mb-3 fw-normal">판매자 로그인</h1>

					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							id="floatingInput"
							placeholder="seller1"
							v-model="sellerInfo.sellerId"
						/>
						<label for="floatingInput">Id</label>
					</div>
					<br />

					<div class="form-floating">
						<input
							type="password"
							class="form-control"
							id="floatingPassword"
							placeholder="Password"
							v-model="sellerInfo.sellerPw"
						/>
						<label for="floatingPassword">Password</label>
					</div>

					<div>
						<br />
						<button class="btn btn-primary w-100 py-2" @click="login()" type="button">로그인하기</button>
					</div>

						<div>
							<br />
							대다내의 판매자가 되어보세요!
							<button
								class="btn btn-success rounded-pill px-3"
								@click="$router.push('/sellerJoin')"
								type="button"
							>
								회원가입
							</button>
						</div>
					
					<div>
						<br /><br />
						<a style="font-size: 17px; text-decoration-line: none; color:blue;" @click="findId(),phoneCheck()">아이디찾기 </a>/
						<a style="font-size: 17px; text-decoration-line: none; color:blue;" @click="findPw(),phoneCheck()"> 비밀번호 변경</a>
					</div>
				</div>
			</form>
		</main>
	</div>
</template>

<script>
/*1. npm install --save sweetalert2 설치
  2. import Swal from "sweetalert2 시킴
  3. 사용하면 됨*/
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
	data() {
		return {
			sellerInfo: {
				sellerId: '',
				sellerPw: '',
				phoneNum: '',
                userDivision : '판매자',
			},
			tokens : {
				token:'',
				checktoken: '',
				find :'',
			}
		};
	},
	methods: {
		async login() {
			let obj = {
				param: {
					sellerId: this.sellerInfo.sellerId,
					sellerPw: this.sellerInfo.sellerPw,
				},
			};
			let result = await axios.post('/node/sellerlogin', obj).catch((err) => console.log(err));
			console.log('loginresult : ', result);

			//로그인 상태별 alert창
			if (result.data.check == '아이디틀림') {
				Swal.fire({
					icon: 'warning',
					title: '로그인 실패.',
					text: '존재하지 않는 아이디입니다.',
				});
			} else if (result.data.check == '비번틀림') {
				Swal.fire({
					icon: 'warning',
					title: '로그인 실패.',
					text: '비밀번호가 틀렸습니다.',
				});
			} else if (result.data.check == '다맞음') {
				await Swal.fire({
					icon: 'success',
					title: '로그인 성공.',
					text: '즐거운 이용되시기 바랍니다.',
				});

				//브라우저 세션추가
				window.localStorage.removeItem('sellerId');
				window.localStorage.setItem('sellerId', result.data.id); //키 값 : sellerId, 데이터 : seller1
				const sellerId = window.localStorage.getItem('sellerId');
				console.log('sellerId = ', sellerId);

				//로그인 성공 후 홈으로 이동
				await this.$router.push('/seller/home');
			}
		},




		//아이디/비밀번호 찾기ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		//1. 아이디를 찾을건지 비번을 찾을건지 결정
		async findId(){
			this.tokens.find = "id";
            
		},
		async findPw(){
			this.tokens.find = "pw";
		},

		//2. 인증번호를 날릴 전화번호를 받음
        async phoneCheck(){
			console.log("현재 찾는것 = ",this.tokens.find);
			console.log(this.sellerInfo.userDivision);
			const { value: phone } = await Swal.fire({
				title: '전화번호를 입력해주세요.',
				input: 'text',
				inputPlaceholder: '숫자로만 입력해 주시기 바랍니다.',
				confirmButtonText: '제출', 
			})

			//들어온 값이 있으면입력한 전화번호 저장함
			if(phone){
				this.sellerInfo.phoneNum = phone.substr(0, 3) + '-' + phone.substr(3, 4) + '-' + phone.substr(7, 4);
			}
			let num = this.sellerInfo.phoneNum;
			console.log("입력한 전화번호 = ", num);
			
			//전화번호를 입력하지 않고 나간경우
			if(num == '' || num == undefined){
				Swal.fire({
					icon: 'warning',
					title: '올바르지 않은 전화번호입니다.',
				});
				return;
			}

            //3.전화번호를 제대로 입력했을경우, 토큰 랜덤 생성
            let token = '';
            for(let i=0; i < 6; i++ ){
               token += String(Math.floor(Math.random() * 10));
            }
            this.tokens.token = token;
            console.log("발급토큰=", this.tokens.token);

            //4.문자메세지로 토큰 발송
            let phoneData = {
                param :{
                    phone : this.sellerInfo.phoneNum,
                    token : this.tokens.token,
                    division : this.sellerInfo.userDivision
                }
            }
            const result = await axios.post('/node/phonecheck', phoneData).catch((err) => console.log(err));
            console.log("발송결과 =", result)

            //5.성공적으로 발송되면 받은 인증번호 입력하는 alert창 띄움
            if(result){ 
					const { value: checkToken } = await Swal.fire({
						title: '인증번호를 입력해주세요.',
						input: 'text',
						inputPlaceholder: '핸드폰으로 인증받은 숫자6자리를 입력하세요',
						confirmButtonText: '제출', 
					});
					this.tokens.checktoken = checkToken;
					console.log("인증토큰=", this.tokens.checktoken);


				//토큰번호 입력하면 아이디나 비밀번호를 보여주는 메소드 실행
				if(this.tokens.checktoken != undefined && this.tokens.checktoken !==''){
					await this.showLoginInfo();

				}else{
					await Swal.fire(`인증번호가 다릅니다.<br/>다시 시도해주세요1.`);
					}

            }else{//입력한 전화번호로 토큰이 제대로 발송되지 않았을때 끝남
				Swal.fire({
					icon: 'warning',
					title: '올바르지 않은 전화번호입니다.',
				});
				return;
			}

        },
		async showLoginInfo(){
				// 6.아이디를 보여줌
			let phoneData = {
			param :{
				phone : this.sellerInfo.phoneNum,
				token : this.tokens.token,
				division : this.sellerInfo.userDivision
				}
			}
			//아이디랑 비밀번호 가져옴
			const findinfo = await axios.post('/node/findInfo', phoneData)
				.catch((err) => console.log(err));
				console.log("찾아온 아이디 및 비밀번호 =", findinfo.data[0]);

			if(findinfo.data[0] != undefined){// 만약 sql문에서 넘어온 데이터가 없을 시
				//6.아이디를 보여줌
				if (this.tokens.token == this.tokens.checktoken && this.tokens.find == "id") {
					await Swal.fire({
					icon: 'success',
					title: '인증이 정상적으로 <br/>완료되었습니다.',
					text: `${findinfo.data[0].seller_name}님의 아이디는 [ ${findinfo.data[0].seller_id} ]입니다.`,
					});
				}// 6.비밀번호를 보여줌
				else if (this.tokens.token == this.tokens.checktoken && this.tokens.find == "pw") {
					const { value: rewritePw } = await Swal.fire({
						title: '인증이 완료되었습니다.<br/>새 비밀번호를 입력해주세요.',
						input: 'text',
						inputPlaceholder: '영문, 숫자, 특수문자를 사용하여 8글자 이상 생성',
						confirmButtonText: '제출', 
					});
					console.log('새로 작성한 비밀번호 =', rewritePw);

					let checkNewPw = await this.checkPwVaild(rewritePw);//true of false
						if(checkNewPw){ //비밀번호가 형식에 맞으면
							
							//암호화 시키고
							this.sellerInfo.sellerPw = rewritePw;
							console.log('새로 작성된 비밀번호 암호화버전 =', this.sellerInfo.sellerPw);

							//update시킴
							let result = await axios.put(`/node/changepw/${this.sellerInfo.phoneNum}`, {userPw : this.sellerInfo.sellerPw, division : '판매자'})
											.catch((err) => console.log(err));
							console.log('비밀번호 변경여부 =', result);
							//제대로 update됐으면 알림창
							if(result.data.affectedRows > 0){ //기존의 비밀번호를 다시 같은걸로 바꾸더라도 알림 뜨게 함
								await Swal.fire({
								icon: 'success',
								title: '비밀번호가 변경되었습니다.',
								text: `바뀐 비밀번호로 다시 로그인 해주세요`,
								});
							}

						}else{//비밀번호가 형식에 맞지 않으면
							Swal.fire({
							icon: 'warning',
							title: '비밀번호 형식에 맞춰 다시 작성해주시기 바랍니다.',
						});
					}	
				}else{
						Swal.fire(`인증번호가 다릅니다.<br/>다시 시도해주세요3.`);
				}
			}else{
				Swal.fire(`등록되지 않은 전화번호입니다.<br/> 다른번호로 시도해주세요.`);
			}
		},
		async checkPwVaild(rewritePw){
            let check = /^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(rewritePw);
            console.log(check); //제대로 입력하면 true 값이 넘어옴
            return check;
        },
	},
};
</script>

<style scoped></style>
