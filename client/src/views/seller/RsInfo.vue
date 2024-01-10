<template>
	<div>
		<h1>업체 상세 정보</h1>
		<br />
		<h3 style="text-align: center">{{ restaurant.rs_name }}</h3>

		<div class="row mt-4">
			<div class="col-md-6">
				<div id="map" style="width: 100%; height: 400px"></div>
			</div>
			<div class="col-md-6">
				<table class="table table-bordered">
					<tbody>
						<tr>
							<th scope="row">종류</th>
							<td>{{ restaurant.category }}</td>
						</tr>
						<tr>
							<th scope="row">지역</th>
							<td>{{ restaurant.gu_gun }}</td>
						</tr>
						<tr>
							<th scope="row">전화번호</th>
							<td>{{ restaurant.phone }}</td>
						</tr>
						<tr>
							<th scope="row">예약금</th>
							<td>{{ restaurant.deposit }}</td>
						</tr>
						<tr>
							<th scope="row">좌석수</th>
							<td>{{ restaurant.seat_cnt }}</td>
						</tr>
						<tr>
							<th scope="row">별점_맛</th>
							<td>
								<i v-for="i in restaurant.star_taste" :key="i" class="bi bi-star-fill"></i>
							</td>
						</tr>
						<tr>
							<th scope="row">별점_가격</th>
							<td>
								<i v-for="i in restaurant.star_price" :key="i" class="bi bi-star-fill"></i>
							</td>
						</tr>
						<tr>
							<th scope="row">별점_서비스</th>
							<td>
								<i v-for="i in restaurant.star_service" :key="i" class="bi bi-star-fill"></i>
							</td>
						</tr>
						<tr>
							<th scope="row">대표 사진</th>
							<td
								data-bs-toggle="modal"
								data-bs-target="#exampleModal"
								@click="show_img(restaurant.rs_img)"
							>
								{{ '상세보기' }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div
				class="modal fade"
				id="exampleModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">대표 사진</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<img :src="`/node/public/restaurant/${rs_img}`" width="100%" />
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="mt-4">
			<button
				class="btn btn-secondary"
				style="
					text-aline: center;
					background-color: #b0c4de;
					border-color: white;
					color: white;
					border-radius: 20px;
				"
				@click="modifyRs"
			>
				수정하기
			</button>
			<button
				class="btn btn-secondary"
				style="border-color: white; color: white; border-radius: 20px"
				@click="goToList"
			>
				목록으로
			</button>
		</div>
	</div>
</template>
<script>
import axios from 'axios';

export default {
	data() {
		return {
			searchNo: '',
			restaurant: {},
			rs_img: false,
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
		show_img(img) {
			this.rs_img = img;
		},
	},
};
</script>

<style scoped>
button {
	margin-right: 10px;
}
.bi-star-fill,
.bi-star-half,
.bi-star {
	font-size: 1.2em;
	color: #ffd5a6;
}
</style>
