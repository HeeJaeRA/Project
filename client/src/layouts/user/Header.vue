<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<nav class="navbar navbar-expand-lg" style="background-color: orange">
			<div class="container-fluid">
				<a class="navbar-brand" @click="$router.push('/home')"><img src="../../assets/images/logo.png" /></a>

				<!-- <form class="d-flex" action="#" method="POST">
					<input
						style="width: 800px"
						class="form-control me-sm-2"
						type="search"
						placeholder="Search"
						name="word"
					/>
					<button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
				</form> -->

				<div>
					<!-- <button class="btn">
						<i class="far fa-user fa-2x"></i>
					</button> -->
					<div v-if = "session != null">
						<button class="btn" @click="logout()">로그아웃</button>
					</div>
					<div v-else>
						<button class="btn" @click="$router.push('/login')">로그인</button>
						<button class="btn" onclick="#">판매자 로그인</button>
						
					</div>
				</div>
			</div>
		</nav>

		<nav class="navbar navbar-expand-lg">
			<div class="container-fluid">
				<div class="collapse navbar-collapse" id="navbarColor04">
					<ul class="navbar-nav me-auto">
						<li class="nav-item"><a class="nav-link" href="#">About</a></li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								id="navbarDropdown"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								>Board</a
							>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a class="dropdown-item"><router-link to="/notice">Notice</router-link></a></li>  
								<li><hr class="dropdown-divider" /></li>
								<li><a class="dropdown-item"><router-link to="/community">Community</router-link></a></li>
								<li><a class="dropdown-item"><router-link to="/event">Event</router-link></a></li>
								<li><a class="dropdown-item"><router-link to="/review">Review</router-link></a></li>
								<li><a class="dropdown-item"><router-link to="/qna">Qna</router-link></a></li>
								<li><a class="dropdown-item"><router-link to="/answer?bno=1">answer</router-link></a></li>
							</ul>
						</li>
						<li class="nav-item dropdown">
							<a
								class="nav-link dropdown-toggle"
								id="navbarDropdown"
								href="#"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								>Shop</a
							>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown">
								<li><a class="dropdown-item" href="#">전체보기</a></li>
								<li><hr class="dropdown-divider" /></li>
								<li>
									<a class="nav-link" @click="Addrmodal" href="#">지역별</a>
								</li>
								<li>
									<a class="nav-link" @click="Catemodal" href="#">종류별</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="#" target="_blank">Instagram</a>
						</li>
					</ul>

					<div v-if = "session != null">
						<button class="btn">
							<i class="bi-cart-fill me-1"></i>
							Cart
							<span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
						</button>

						<button class="btn btn-outline-info" onclick="location.href='#'">마이페이지</button>
					</div>
				</div>
			</div>
		</nav>
	</div>
	<div class="modal-wrap" v-show="modalCheckA" @click="Addrmodal">
		<div class="modal-container" @click.stop="">
			<button type="button" class="btn btn-info">중구</button>
			<button type="button" class="btn btn-info">북구</button>
			<button type="button" class="btn btn-info">서구</button>
			<button type="button" class="btn btn-info">동구</button>
			<button type="button" class="btn btn-info">수성구</button>
			<button type="button" class="btn btn-info">달서구</button>
			<button type="button" class="btn btn-info">달성군</button>
			<button type="button" class="btn btn-info">군위군</button>
		</div>
	</div>

	<div class="modal-wrap" v-show="modalCheckC" @click="Catemodal">
		<div class="modal-container" @click.stop="">
			<button type="button" class="btn btn-success">한식</button>
			<button type="button" class="btn btn-success">중식</button>
			<button type="button" class="btn btn-success">일식</button>
			<button type="button" class="btn btn-success">양식</button>
			<button type="button" class="btn btn-success">포차</button>
			<button type="button" class="btn btn-success">디저트</button>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modalCheckA: false,
			modalCheckC: false,
			session: localStorage.getItem('userId')
		};
	},
	methods: {
		Addrmodal() {
			this.modalCheckA = !this.modalCheckA;
		},
		Catemodal() {
			this.modalCheckC = !this.modalCheckC;
		},
		logout(){
			localStorage.clear();
			this.$router.go(0);
		},
	},
};
</script>

<style scoped>
.modal-wrap {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	z-index: 1000;
}
/* modal or popup */
.modal-container {
	position: relative;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 550px;
	background: #fff;
	border-radius: 10px;
	padding: 20px;
	box-sizing: border-box;
}
</style>
