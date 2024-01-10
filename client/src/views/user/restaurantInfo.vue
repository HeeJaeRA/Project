<template>
	<section class="py-5">
		<div class="container px-4 px-lg-5 my-5">
			<div class="row gx-4 gx-lg-5 align-items-center">
				<div class="col-md-6">
					<img
						v-if="restaurant.rs_img"
						class="card-img-top"
						width="200px"
						height="450px"
						:src="`/node/public/restaurant/${restaurant.rs_img}`"
					/>
					<div class="text-center">
						<br />
						<a class="btn btn-secondary text-white mt-auto" v-on:click="bookmark">찜하기</a>
					</div>
				</div>
				<div class="col-md-6">
					<span class="text-muted">{{ restaurant.gu_gun }}</span>
					<h1 class="display-5 fw-bolder">{{ restaurant.rs_name }}</h1>
					<div class="fs-5 mb-5">
						<p class="lead">{{ restaurant.rs_desc }}</p>
						<div class="fs-5 mb-5">
							<span>좋아요 {{ restaurant.like_cnt }}명&nbsp;&nbsp;</span>

							<a
								class="btn btn-danger text-white mt-auto"
								style="background-color: #ff4646; border-color: white"
								v-on:click.once="like"
							>
								<i class="bi bi-heart-fill"></i>
							</a>
						</div>
						<div ref="map" style="width: 100%; height: 350px"></div>
					</div>
				</div>
				<div style="width: 100%; height: 100px; text-align: center"></div>
			</div>
		</div>

		<UserBook v-bind:rsCode="this.searchNo" />

		<div class="container px-4 px-lg-5 my-5 review-list">
			<h2 class="fw-bolder mb-4 review-heading">Review List</h2>

			<p v-if="reviewList.length == 0" class="no-review-message">작성된 리뷰가 없습니다.</p>

			<table v-if="reviewList.length > 0" class="review-table">
				<thead>
					<tr>
						<th>제목</th>
						<th>작성자</th>
						<th>작성일자</th>
						<th>맛</th>
						<th>가격</th>
						<th>서비스</th>
						<th>좋아요</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, idx) in reviewList" :key="idx">
						<td data-bs-toggle="modal" data-bs-target="#exampleModal" @click="openReviewModal(item)">
							{{ item.title }}
						</td>
						<td>{{ item.writer }}</td>
						<td>{{ $dateFormat(item.write_date, 'yyyy-MM-dd') }}</td>
						<td>
							<div class="star-rating">
								<div v-for="starClass in getStarClasses(item.star_taste)" :class="starClass"></div>
							</div>
						</td>
						<td>
							<div class="star-rating">
								<div v-for="starClass in getStarClasses(item.star_price)" :class="starClass"></div>
							</div>
						</td>
						<td>
							<div class="star-rating">
								<div v-for="starClass in getStarClasses(item.star_service)" :class="starClass"></div>
							</div>
						</td>
						<td>{{ item.like_cnt }}</td>
						<td>
							<a
								class="btn btn-danger text-white mt-auto"
								style="background-color: #ff4646; border-color: white"
								v-on:click.once="reviewLike(item)"
								><i class="bi bi-heart-fill"></i
							></a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="container px-4 px-lg-5 mt-5">
			<h4 class="fw-bolder mb-4">Recommended</h4>
		</div>

		<div class="container px-4 px-lg-5 mt-5" id="allDiv" style="display: block">
			<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
				<div v-for="rs in restaurants" :key="rs.rs_code" class="col mb-5">
					<div class="card h-100">
						<div
							class="badge text-white position-absolute"
							style="top: 0.5rem; right: 0.5rem; background-color: #808080; border-color: white"
						>
							hot
						</div>
						<img
							class="card-img-top"
							:src="`http://localhost:3000/public/restaurant/${rs.rs_img}`"
							alt="..."
							width="200px"
							height="250px"
						/>

						<div class="card-body p-4">
							<div class="text-center">
								<span class="text-muted">{{ rs.gu_gun }}</span>
								<h5 class="fw-bolder">{{ rs.rs_name }}</h5>
								<div class="d-flex justify-content-center small text-warning mb-2">
									<div class="bi-star-fill"></div>
									<div class="bi-star-fill"></div>
									<div class="bi-star-fill"></div>
									<div class="bi-star-fill"></div>
									<div class="bi-star-fill"></div>
								</div>
								{{ rs.rs_desc }}
							</div>
						</div>
						<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
							<div class="text-center">
								<a class="btn btn-dark text-white mt-auto" @click="moveRsInfo(rs.rs_code)">상세보기</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">{{ modalReview.title }}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<template v-if="reviewImg.length > 0">
							<div>
								<div v-for="(img, index) in this.reviewImg" :key="index">
									<img
										:src="`/node/public/uploads/${img.img_name}`"
										width="467px"
										height="300px"
										style="margin-bottom: 10px"
									/>
								</div>
							</div>
						</template>

						{{ modalReview.content }}
					</div>
					<div class="modal-footer">
						<p>{{ modalReview.writer }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import UserBook from './UserBook.vue';

export default {
	data() {
		return {
			searchNo: '',
			restaurant: {},
			restaurants: [],
			loading: true,
			userId: window.localStorage.getItem('userId'),
			reviewList: [],
			modalReview: {},
			reviewImg: '',
		};
	},
	created() {
		this.searchNo = this.$route.query.no;
		this.getRestaurantInfo();
		this.getRestaurantList();
		this.getReviewList();
	},
	components: {
		UserBook,
	},
	methods: {
		async getRestaurantInfo() {
			try {
				let response = await axios.get(`/node/restaurants/${this.searchNo}`);
				this.restaurant = response.data;
				this.initializeMap();
			} catch (err) {
				console.log(err);
			}
		},
		async getRestaurantList() {
			try {
				let response = await axios.get('/node/rs');
				this.restaurants = response.data;
			} catch (err) {
				console.log(err);
			}
		},
		async getReviewList() {
			try {
				let result = await axios.get(`/node/rsreviewlist/${this.searchNo}`);
				this.reviewList = result.data;
			} catch (err) {
				console.log(err);
			}
		},
		async like() {
			try {
				let response = await axios.post(`/node/rslike/${this.searchNo}`);
				console.log(response);
				if (response.status == 200) {
					Swal.fire({
						title: '좋아요',
						icon: 'success',
					});
					this.getRestaurantInfo();
				} else {
					Swal.fire({
						title: '실패',
						icon: 'error',
					});
				}
			} catch (err) {
				console.log(err);
			}
		},
		async bookmark() {
			try {
				let data = {
					user_id: this.userId,
					rs_code: this.searchNo,
				};
				let response = await axios.post(`/node/rsbook`, data);
				console.log(response);
				if (response.data.affectedRows == 1) {
					Swal.fire({
						title: '찜 목록 추가',
						icon: 'success',
					});
					this.getRestaurantInfo();
				} else if (response.data.affectedRows == 0) {
					Swal.fire({
						title: '이미 추가된 가게입니다',
						icon: 'error',
					});
				} else {
					Swal.fire({
						title: '오류',
						icon: 'error',
					});
				}
			} catch (err) {
				console.log(err);
			}
		},
		getStarClasses(rating) {
			const fullStars = Math.floor(rating);

			const starClasses = Array(fullStars).fill('bi-star-fill');

			const remainingStars = 5 - starClasses.length;
			starClasses.push(...Array(remainingStars).fill('bi-star'));

			return starClasses;
		},
		initializeMap() {
			const mapContainer = this.$refs.map;

			if (!mapContainer) {
				return;
			}

			const mapOption = {
				center: new kakao.maps.LatLng(33.450701, 126.570667),
				level: 1,
			};

			const map = new kakao.maps.Map(mapContainer, mapOption);

			const geocoder = new kakao.maps.services.Geocoder();
			const address = this.restaurant.address;

			if (!address) {
				return;
			}

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
				} else {
					console.error('error:', status);
				}
			});
		},
		moveRsInfo(num) {
			this.$router.push({ path: '/rsinfo', query: { no: num } });
		},
		async openReviewModal(item) {
			this.modalReview = item;
			let result = await axios.get(`node/adminGetReviewImg/${item.review_code}`);
			this.reviewImg = result.data;
		},
		async reviewLike(item) {
			try {
				let response = await axios.post(`node/rsreviewlike/${item.review_code}`);
				console.log(response);
				this.getReviewList();
			} catch (err) {
				console.log(err);
			}
		},
	},
};
</script>

<style scoped>
.review-list {
	margin-top: 30px;
}

.review-table {
	width: 100%;
	border-collapse: collapse;
	margin-top: 20px;
}

.review-table th,
.review-table td {
	padding: 10px;
	text-align: center;
	border: 1px solid #dee2e6;
}

.review-table th {
	background-color: #f8f9fa;
}

.review-table tbody tr:hover {
	background-color: #f2f2f2;
}

.no-review-message {
	font-size: 18px;
	font-weight: bold;
	color: #6c757d;
}

.review-heading {
	font-size: 24px;
	font-weight: bold;
	margin-bottom: 20px;
}

.review-modal {
	width: 80%;
	max-width: 600px;
	text-align: left;
}

.star-rating {
	display: flex;
	justify-content: center;
	align-items: center;
}
.bi-star-fill,
.bi-star-half,
.bi-star {
	font-size: 1.2em;
	color: #ffd5a6;
}
</style>
