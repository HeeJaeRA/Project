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
				{{ totalPages }}
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

				<nav aria-label="Page navigation">
					<ul class="pagination justify-content-center mt-4">
						<li class="page-item" :class="{ disabled: currentPage === 1 }">
							<a class="page-link" href="#" @click="changePage(currentPage - 1)" aria-label="Previous">
								<span aria-hidden="true">&laquo;</span>
							</a>
						</li>
						<li
							v-for="page in totalPages"
							:key="page"
							class="page-item"
							:class="{ active: page === currentPage }"
						>
							<a class="page-link" href="#" @click="changePage(page)">{{ page }}</a>
						</li>
						<li class="page-item" :class="{ disabled: currentPage === totalPages }">
							<a class="page-link" href="#" @click="changePage(currentPage + 1)" aria-label="Next">
								<span aria-hidden="true">&raquo;</span>
							</a>
						</li>
					</ul>
				</nav>
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
		totalPages() {
			return Math.ceil(this.restaurants.length / this.itemsPerPage);
		},
	},
	methods: {
		async getRestaurantList() {
			try {
				let response = await axios.get('/node/restaurants');
				this.restaurants = response.data;
			} catch (err) {
				console.log(err);
			} finally {
				this.loading = false;
			}
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/rsinfo', query: { no: num } });
		},
		changePage(page) {
			if (page >= 1 && page <= this.totalPages) {
				this.currentPage = page;
			}
		},
	},
};
</script>
