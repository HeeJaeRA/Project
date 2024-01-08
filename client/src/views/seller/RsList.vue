<template>
	<div>
		<h1>업체 전체 목록</h1>
		<button class="btn btn-secondary my-2 my-sm-0" @click="$router.push({ path: '/seller/rslist' })">전체</button>
		<button class="btn btn-secondary my-2 my-sm-0" @click="$router.push({ path: '/seller/rsolist' })">
			운영중
		</button>
		<button class="btn btn-secondary my-2 my-sm-0" @click="$router.push({ path: '/seller/rswlist' })">
			승인대기중
		</button>
		<br />
		<table class="table table-hover">
			<thead>
				<tr>
					<th>카테고리</th>
					<th>이름</th>
					<th>주소</th>
					<th>전화번호</th>
					<th>대표사진</th>
					<th>사업자등록증</th>
					<th>업체상태</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="restaurant in paginatedRestaurants" :key="restaurant.rs_code">
					<td>{{ restaurant.category }}</td>
					<td @click="moveRsInfo(restaurant.rs_code)">{{ restaurant.rs_name }}</td>
					<td>{{ restaurant.address }}</td>
					<td>{{ restaurant.phone }}</td>
					<td @click="show_img(restaurant.rs_img)">{{ '상세보기' }}</td>
					<td @click="show_license(restaurant.license)">{{ '상세보기' }}</td>
					<td>{{ restaurant.rs_status }}</td>
				</tr>
			</tbody>
		</table>

		<div class="pagination-container d-flex justify-content-center align-items-center mt-4">
			<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">이전</button>
			<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
			<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
				다음
			</button>
		</div>

		<button class="btn btn-primary mx-1" @click="goToInsert()">등록</button>

		<div v-if="rsimg" class="black-bg">
			<div @click.stop="">
				<img :src="`http://192.168.0.47:3000/public/restaurant/${rsimg}`" width="200px" height="200px" />
				<button @click="closePop()">닫기</button>
			</div>
		</div>
		<div v-if="licenseimg" class="black-bg">
			<div @click.stop="">
				<img :src="`http://192.168.0.47:3000/public/restaurant/${licenseimg}`" width="200px" height="200px" />
				<button @click="closePop()">닫기</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			restaurants: [],
			logId: window.localStorage.getItem('sellerId'),
			itemsPerPage: 8,
			currentPage: 1,
			totalPages: 0,
			rsimg: false,
			licenseimg: false,
		};
	},
	mounted() {
		this.getRestaurantList();
	},
	computed: {
		paginatedRestaurants() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.restaurants.slice(startPage, endPage);
		},
	},
	methods: {
		async getRestaurantList() {
			try {
				let response = await axios.get(`/node/myrestaurants/${this.logId}`);
				this.restaurants = response.data;
				this.totalPages = Math.ceil(this.restaurants.length / this.itemsPerPage);
			} catch (err) {
				console.log(err);
			}
		},
		async modify(rscode) {
			this.$router.push({ path: '/seller/rsupdate', query: { no: rscode } });
		},
		closePop() {
			this.rsimg = false;
			this.licenseimg = false;
		},
		show_img(img) {
			this.rsimg = img;
			this.licenseimg = false;
		},
		show_license(img) {
			this.licenseimg = img;
			this.rsimg = false;
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/seller/rsinfo', query: { no: num } });
		},
		changePage(action) {
			if (action === 'prev' && this.currentPage > 1) {
				this.currentPage--;
				this.scrollToTop();
				this.getRestaurantList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.scrollToTop();
				this.getRestaurantList();
			}
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
		goToInsert() {
			this.$router.push({ path: '/seller/rsinsert' });
		},
	},
};
</script>

<style scoped>
button {
	margin-right: 5px;
}
</style>
