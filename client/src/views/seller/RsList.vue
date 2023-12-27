<template>
	<div>
		<h1>Restaurant List</h1>
		<ul>
			<li v-for="restaurant in restaurants" :key="restaurant.rs_code" @click="moveRsInfo(restaurant.rs_code)">
				<h2>{{ restaurant.rs_name }}</h2>
				<p>종류: {{ restaurant.category }}</p>
				<p>이름: {{ restaurant.rs_name }}</p>
				<p>주소: {{ restaurant.address }}</p>
				<p>구: {{ restaurant.gu_gun }}</p>
				<p>전화번호: {{ restaurant.phone }}</p>
				<p>예약금: {{ restaurant.deposit }}</p>
				<p>좌석수: {{ restaurant.seat_cnt }}</p>
				<p>별점_맛: {{ restaurant.star_taste }}</p>
				<p>별점_가격: {{ restaurant.star_price }}</p>
				<p>별점_서비스: {{ restaurant.star_service }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			restaurants: [],
		};
	},
	mounted() {
		this.getRestaurantList();
	},
	methods: {
		async getRestaurantList() {
			try {
				const response = await axios.get('/node/restaurants');

				this.restaurants = response.data;
			} catch (err) {
				console.log(err);
			}
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/seller/rsinfo', query: { no: num } });
		},
	},
};
</script>
