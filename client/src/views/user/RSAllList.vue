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
				<h2 style="font-family: JalnanGothic; margin-bottom: 40px">ALL LIST</h2>
				<div>
					<form
						id="seachbar"
						action="`rssearch/${this.searchTerm}`"
						method="GET"
						@submit.prevent="goToSearch"
					>
						<input
							v-model="searchTerm"
							style="width: 400px"
							class="form-control me-sm-2"
							type="search"
							placeholder="가게 이름"
							name="word"
						/>
						<button type="submit" class="btn btn-secondary my-2 my-sm-0" @click="goToSearch">Search</button>
					</form>
				</div>
				<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
					<div v-for="restaurant in restaurants" :key="restaurant.rs_code" class="col mb-5">
						<div class="card h-100">
							<div
								class="badge text-white position-absolute"
								style="top: 0.5rem; right: 0.5rem; background-color: #de490f; border-color: white"
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
										<div
											v-for="star in calculateAverageStars(restaurant)"
											:key="star"
											class="bi-star-fill"
										></div>
									</div>
									{{ restaurant.rs_desc }}
								</div>
							</div>
							<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
								<div class="text-center">
									<button class="btn btn-dark mt-auto" @click="moveRsInfo(restaurant.rs_code)">
										상세보기
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="d-flex justify-content-center mt-3">
			<pagination v-bind:value="'restaurant'" @current="selectPage" />
		</div>
		<button
			class="btn btn-dark rounded-pill px-3"
			style="
				border-radius: 30%;
				text-align: center;
				vertical-align: top;
				width: 100px;
				height: 50px;
				position: fixed;
				bottom: 80px;
				right: 80px;
				font-size: 20px;
				z-index: 999;
			"
			@click="scrollToTop()"
		>
			Top
		</button>
	</div>
</template>

<script>
import axios from 'axios';
import Banner from '../../layouts/user/Banner.vue';
import pagination from './Pagination.vue';

export default {
	components: {
		Banner,
		pagination,
	},
	data() {
		return {
			restaurants: [],
			loading: true,
			current: 1,
		};
	},
	mounted() {
		this.getRestaurantList();
	},
	methods: {
		async getRestaurantList() {
			try {
				let response = await axios.get(`/node/restaurantpage/${this.current}`);
				this.restaurants = response.data;
			} catch (err) {
				console.error(err);
			} finally {
				this.loading = false;
			}
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/rsinfo', query: { no: num } });
		},
		selectPage(selected) {
			this.current = selected;
			this.getRestaurantList();
			// this.scrollToTop();
		},
		calculateAverageStars(restaurant) {
			let taste = restaurant.star_taste || 0;
			let price = restaurant.star_price || 0;
			let service = restaurant.star_service || 0;

			let totalStars = taste + price + service;
			let average = totalStars / 3;

			return Array.from({ length: Math.round(average) }, (_, index) => index);
		},
		async goToSearch() {
			let list = await axios.get(`/node/rssearch/${this.searchTerm}`).catch((err) => console.log(err));
			let result = list.data;
			this.restaurants = result;
		},
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>
<style scoped>
@font-face {
	font-family: 'NEXON Lv1 Gothic OTF';
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}
@font-face {
	font-family: 'JalnanGothic';
	src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/JalnanGothic.woff') format('woff');
	font-weight: normal;
	font-style: normal;
}

div {
	font-family: 'NEXON Lv1 Gothic OTF';
}
.bi-star-fill,
.bi-star-half,
.bi-star {
	font-size: 1.2em;
	color: #ffd5a6;
}
#select {
	margin-right: 5px;
	border-radius: 6px;
	width: 75px;
}
#seachbar {
	display: flex;
	justify-content: right;
	margin-bottom: 30px;
	margin-right: 20px;
}
</style>
