<template>
	<div style="width: 95%; margin-left: 3%" class="test">
		<br />
		<br />
		<h2 style="font-weight: bold; padding-left: 3%">나의 리뷰</h2>
		<br />
		<br />
		<p v-if="paginatedReviewList.length == 0" colspan="10" style="color: gray; text-align: center">
			아직 작성한 리뷰가 없습니다.
		</p>
		<br />
		<div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
			<div
				v-for="(review, i) in paginatedReviewList"
				:key="i"
				class="col mb-5"
				style="width: 230px; height: 200px"
			>
				<div class="card h-100" style="position: relative; text-align: center; vertical-align: bottom">
					<!-- 사진있으면 사진 -->
					<img
						v-if="review.img_name != null"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
						@click="openReviewModal(review)"
						class="card-img-top"
						width="200px"
						height="200px"
						style="border-radius: 10%"
						:src="`http://localhost:3000/public/uploads/${review.img_name}`"
					/>
					<!-- 사진없으면 기본 이미지 -->
					<img
						v-else
						@click="openReviewModal(review)"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
						class="card-img-top"
						width="200px"
						height="200px"
						style="border-radius: 10%"
						src="../../../assets/images/rice.png"
					/>
					<span
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
						@click="openReviewModal(review)"
						id="imgtext"
						class="imgtext"
						>{{ review.rs_name }} <br /><br />
						{{ review.rs_desc }}</span
					>
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

		<div style="width: 100%; height: 50px; vertical-align: middle; margin-bottom: 20px; text-align: center">
			<button
				class="btn btn-outline-primary rounded-circle p-3 lh-1"
				style="width: 50px; height: 50px; margin-right: 20px"
				@click="changePage('prev')"
			>
				◁
			</button>
			<!-- <span class="mx-1">Page {{ currentPage }} | {{ totalPages }}</span> -->
			<button
				class="btn btn-outline-primary rounded-circle p-3 lh-1"
				style="width: 50px; height: 50px; margin-left: 20px"
				@click="changePage('next')"
			>
				▷
			</button>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	data() {
		return {
			userReviewList: [],
			itemsPerPage: 5,
			currentPage: 1,
			totalPages: 0,
			modalReview: {},
			reviewImg: '',
		};
	},
	computed: {
		paginatedReviewList() {
			let startPage = (this.currentPage - 1) * this.itemsPerPage;
			let endPage = startPage + this.itemsPerPage;
			return this.userReviewList.slice(startPage, endPage);
		},
	},

	mounted() {
		this.ReviewList();
	},

	methods: {
		async ReviewList() {
			try {
				const userId = window.localStorage.getItem('userId');
				console.log('userId : ', userId);
				const result = (
					await axios.post('/node/myreview', { userId }).catch((err) => {
						console.log(err);
					})
				).data;
				console.log('리뷰 정보 전체 =', result);
				this.userReviewList = result;
				this.totalPages = Math.ceil(this.userReviewList.length / this.itemsPerPage);
			} catch (err) {
				console.log(err);
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
				this.ReviewList();
			} else if (action === 'next' && this.currentPage < this.totalPages) {
				this.currentPage++;
				this.ReviewList();
			}
		},
		async openReviewModal(item) {
			this.modalReview = item;
			let result = await axios.get(`node/adminGetReviewImg/${item.review_code}`);
			this.reviewImg = result.data;
		},
	},
};
</script>

<style scoped>
#imgtext:hover {
	position: absolute;
	color: white;
	z-index: 1;
	font-size: 18px;
	width: 180px;
	height: 200px;
	background-color: rgb(0, 0, 0, 0.6);
	text-align: center;
	padding-top: 35%;
	padding-inline: 10%;
	transition: 0.5s;
	opacity: 1;
	border-radius: 10%;
}
.imgtext {
	opacity: 0;
}
</style>
