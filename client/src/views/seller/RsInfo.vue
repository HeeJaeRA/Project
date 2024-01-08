<template>
	<div>
		<h1>Restaurant Info</h1>
		<h3>{{ restaurant.rs_name }}</h3>
		<div id="map" style="width: 50%; height: 400px"></div>
		<p>종류: {{ restaurant.category }}</p>
		<p>구: {{ restaurant.gu_gun }}</p>
		<p>전화번호: {{ restaurant.phone }}</p>
		<p>예약금: {{ restaurant.deposit }}</p>
		<p>좌석수: {{ restaurant.seat_cnt }}</p>
		<p>별점_맛: {{ restaurant.star_taste }}</p>
		<p>별점_가격: {{ restaurant.star_price }}</p>
		<p>별점_서비스: {{ restaurant.star_service }}</p>
	</div>
	<button type="button" class="btn btn-success" @click="modifyRs">수정하기</button>
	<button type="button" class="btn btn-secondary" @click="goToList">목록으로</button>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			searchNo: '',
			restaurant: {},
		};
	},
	created() {
		this.searchNo = this.$route.query.no;
		this.getRestaurantInfo();
	},
	methods: {
		async getRestaurantInfo() {
			try {
				let response = await axios.get(`/node/restaurants/${this.searchNo}`);
				this.restaurant = response.data;
				this.initializeMap();
			} catch (error) {
				console.error(error);
			}
		},
		initializeMap() {
			const mapContainer = document.getElementById('map');
			const mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 1,
			};
			const map = new kakao.maps.Map(mapContainer, mapOption);

			const geocoder = new kakao.maps.services.Geocoder();
			const address = this.restaurant.address;

			geocoder.addressSearch(address, (result, status) => {
				if (status === kakao.maps.services.Status.OK) {
					const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

					const marker = new kakao.maps.Marker({
						map: map,
						position: coords,
					});

					const infowindow = new kakao.maps.InfoWindow({
						content: `<div style="width:150px;text-align:center;padding:6px 0;">${this.restaurant.rs_name}</div>`,
					});

					infowindow.open(map, marker);

					map.setCenter(coords);
				}
			});
		},
		goToList() {
			this.$router.go(-1);
		},
		modifyRs() {
			this.$router.push({ path: '/seller/rsupdate', query: { no: this.searchNo } });
		},
	},
};
</script>

<style scoped>
button {
	margin-right: 10px;
}
</style>
