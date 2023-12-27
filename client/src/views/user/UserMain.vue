<template>
	<div>
		<Banner />
		<button @click="goAdmin()">관리자</button>
		<br />
		<router-link to="/admin/home" @click="logout()">로그아웃</router-link>
		<router-link to="/seller/rslist">판매자</router-link>

		<section class="py-5">
			<div class="container px-4 px-lg-5 mt-5">
				<h3>recommended</h3>
				<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
					<div v-for="restaurant in restaurants" :key="restaurant.rs_code" class="col mb-5">
						<div class="card h-100">
							<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
								Sale
							</div>
							<img class="card-img-top" :src="restaurant.image" alt="Restaurant Image" />
							<div class="card-body p-4">
								<div class="text-center">
									<h5 class="fw-bolder">{{ restaurant.rs_name }}</h5>
									<div class="d-flex justify-content-center small text-warning mb-2">
										<div>
											<div class="bi-star-fill"></div>
										</div>
									</div>
									{{ restaurant.deposit }}
								</div>
							</div>
							<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
								<div class="text-center">
									<router-link
										:to="`/restaurant/${restaurant.id}`"
										class="btn btn-outline-dark mt-auto"
									>
										상세보기
									</router-link>
								</div>
							</div>
						</div>
					</div>
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
		};
	},
	mounted() {
		this.getRestaurantList();
	},
	methods: {
		goAdmin() {
			this.$router.push('/admin/home').catch(() => {});
		},
		async getRestaurantList() {
			try {
				let response = await axios.get('/node/rs');
				this.restaurants = response.data;
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>
