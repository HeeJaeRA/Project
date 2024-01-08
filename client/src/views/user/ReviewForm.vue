<template>
	<div>
		<h1>리뷰 작성</h1>

		<label>제목</label>
		<input type="text" v-model="title" />

		<label>사진 업로드</label>
		<input type="file" @change="handleFileChange" multiple />

		<textarea v-model="content" placeholder="리뷰를 작성하세요"></textarea>

		<label>맛</label>
		<star-rating v-model="ratings['taste']" :totalStars="5" category="taste" @input="updateRating" />
		<label>가격</label>
		<star-rating v-model="ratings['price']" :totalStars="5" category="price" @input="updateRating" />
		<label>서비스</label>
		<star-rating v-model="ratings['service']" :totalStars="5" category="service" @input="updateRating" />

		<button class="btn btn-primary" @click="submitReview">리뷰 제출</button>
	</div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from './StarRating.vue';

export default {
	components: {
		StarRating,
	},
	data() {
		return {
			title: '',
			writer: '',
			write_date: '',
			content: '',
			reserveNum: '',
			rs_code: '',
			ratings: {
				taste: 0,
				price: 0,
				service: 0,
			},
			selectedPhotos: [],
			userId: window.localStorage.getItem('userId'),
		};
	},
	created() {
		this.write_date = this.getToday();
		this.writer = this.userId;
		this.reserveNum = this.$route.query.reserveNum;
	},
	methods: {
		async submitReview() {
			let formData = new FormData();

			// console.log('제목:', this.title);
			// console.log('내용:', this.content);
			// console.log('별점:', this.ratings.taste, this.ratings.price, this.ratings.service);
			// console.log(this.selectedPhotos);

			this.selectedPhotos.forEach((file) => {
				formData.append(`files`, file);
			});

			let reviewInfo = {
				writer: this.userId,
				write_date: this.write_date,
				title: this.title,
				content: this.content,
				star_taste: this.ratings.taste,
				star_price: this.ratings.price,
				star_service: this.ratings.service,
				rs_code: '111454',
				// reserve_num: this.reserveNum,
				reserve_num: '11413',
			};

			reviewInfo = JSON.stringify(reviewInfo);
			formData.append(`reviewInfo`, reviewInfo);

			let result = await axios.post('/node/reviewPhotos', formData);

			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '리뷰 작성 완료',
				});
			} else {
				Swal.fire({
					icon: 'error',
					title: '리뷰 작성 실패',
				});
			}
		},
		updateRating({ category, stars }) {
			this.ratings = { ...this.ratings, [category]: stars };
		},
		getToday() {
			return this.$dateFormat('', 'yyyy-MM-dd');
		},
		handleFileChange(event) {
			this.selectedPhotos = Array.from(event.target.files);
		},
	},
};
</script>

<style scoped>
textarea {
	width: 100%;
	height: 100px;
	margin-bottom: 10px;
}
</style>
