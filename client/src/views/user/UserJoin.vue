<template>
	<div class="container">
		<main class="form-signin w-100 m-auto">
			<form style="width: 400px; height: 600px; margin: 0 auto">
				<br /><br /><br />

				<div style="text-align: center">
					<h1 class="h3 mb-3 fw-normal">로그인</h1>

					<div class="form-floating">
						<input
							type="text"
							class="form-control"
							id="floatingInput"
							placeholder="user1"
							v-model="userInfo.userId"
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
							v-model="userInfo.userPw"
						/>
						<label for="floatingPassword">Password</label>
					</div>

					<div>
						<br />
						<button class="btn btn-primary w-100 py-2" @click="login()" type="button">로그인하기</button>
					</div>

					<div style="text-align: right">
						<div>
							<br />
							빠른 가입을 원하시나요?
							<button class="btn btn-warning rounded-pill px-3" type="button">카카오로 로그인하기</button>
						</div>

						<div>
							<br />
							대다내의 회원이 되어보세요!
							<button
								class="btn btn-success rounded-pill px-3"
								@click="$router.push('/join')"
								type="button"
							>
								회원가입
							</button>
						</div>
					</div>
					<div>
						<br /><br />
						<a style="font-size: 17px; text-decoration-line: none" href="">아이디찾기 </a>/
						<a style="font-size: 17px; text-decoration-line: none" href=""> 비밀번호 찾기</a>
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
			userInfo: {
				userId: '',
				userPw: '',
			},
		};
	},
	methods: {
		async login() {
			let obj = {
				param: {
					userId: this.userInfo.userId,
					userPw: this.userInfo.userPw,
				},
			};
			let result = await axios.post('/node/login', obj).catch((err) => console.log(err));
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
				window.localStorage.removeItem('userId');
				window.localStorage.setItem('userId', result.data.id); //키 값 : userId, 데이터 : user1
				const userId = window.localStorage.getItem('userId');
				console.log('userId = ', userId);

				//로그인 성공 후 홈으로 이동
				await this.$router.push('/home');
				this.$router.go(0);
			}
		},
	},
};
</script>

<style scoped></style>
