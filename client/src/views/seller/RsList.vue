<template>
	<div>
		<router-link to="/seller/home">홈</router-link>
		<h1>Restaurant List</h1>

		<table class="table table-hover">
			<thead>
				<tr>
					<th>카테고리</th>
					<th>이름</th>
					<th>주소</th>
					<th>전화번호</th>
					<th>수정</th>
					<th>영업상태변경</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="restaurant in paginatedRestaurants" :key="restaurant.rs_code">
					<td>{{ restaurant.category }}</td>
					<td @click="moveRsInfo(restaurant.rs_code)">{{ restaurant.rs_name }}</td>
					<td>{{ restaurant.address }}</td>
					<td>{{ restaurant.phone }}</td>
					<td>
						<button @click="modify(restaurant.rs_code)">수정</button>
					</td>
					<td>
						<button @click="approve(restaurant.rs_code)">영업중단</button>
					</td>
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
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			restaurants: [],
			logId: 'teeessstt',
			itemsPerPage: 8,
			currentPage: 1,
			totalPages: 0,
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
		async approve(rscode) {
			let result = await axios.put(`/node/rsStatus/${rscode}`);
			if (result.status == 200) {
				Swal.fire({
					title: '처리가 완료되었습니다.',
					icon: 'success',
				});
				this.getRestaurantList();
			} else {
				Swal.fire({
					title: '처리가 실패되었습니다.',
					icon: 'error',
				});
			}
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
	},
};
</script>
