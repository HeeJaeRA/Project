<template>
	<div>
		<Banner />
		<section class="py-5">
			<div v-if="loading" class="text-center">
				<div class="spinner-border" style="width: 3rem; height: 3rem" role="status">
					<span class="sr-only">Loading...</span>
				</div>
			</div>
			<div v-else class="container px-4 px-lg-5 mt-5">
				<h3>All List</h3>
				<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
					<div v-for="restaurant in paginatedRestaurants" :key="restaurant.rs_code" class="col mb-5">
						<div class="card h-100">
							<div
								class="badge bg-danger text-white position-absolute"
								style="top: 0.5rem; right: 0.5rem"
							>
								hot
							</div>
							<img
								class="card-img-top"
								width="250px"
								height="250px"
								:src="`http://localhost:3000/public/restaurant/${restaurant.rs_img}`"
							/>
							<div class="card-body p-4">
								<div class="text-center">
									<h5 class="fw-bolder">{{ restaurant.rs_name }}</h5>
									<p>{{ restaurant.category }}</p>
									<div class="d-flex justify-content-center small text-warning mb-2">
										<div class="bi-star-fill"></div>
										<div class="bi-star-fill"></div>
										<div class="bi-star-fill"></div>
										<div class="bi-star-fill"></div>
										<div class="bi-star-fill"></div>
									</div>
									{{ restaurant.rs_desc }}
								</div>
							</div>
							<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
								<div class="text-center">
									<button class="btn btn-warning mt-auto" @click="moveRsInfo(restaurant.rs_code)">
										상세보기
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="pagination-container d-flex justify-content-center align-items-center mt-4">
					<button v-if="currentPage > 1" class="btn btn-primary mx-1" @click="changePage('prev')">
						이전
					</button>
					<span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
					<button v-if="currentPage < totalPages" class="btn btn-primary mx-1" @click="changePage('next')">
						다음
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import axios from 'axios';

import Banner from '../../layouts/user/Banner.vue';
export default {
	components: {
		Banner,
	},
	data() {
		return {
			restaurants: [],
			loading: true,
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
				let response = await axios.get('/node/restaurants');
				this.restaurants = response.data;
				this.totalPages = Math.ceil(this.restaurants.length / this.itemsPerPage);
			} catch (err) {
				console.error(err);
			} finally {
				this.loading = false;
			}
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/rsinfo', query: { no: num } });
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
<style scoped>
.pagination-container {
	margin-top: 20px;
}

.pagination-container button {
	font-size: 14px;
	padding: 8px 12px;
}
</style>
