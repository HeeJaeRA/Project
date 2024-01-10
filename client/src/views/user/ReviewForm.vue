<template>
	<br />
	<br />
	<br />
	<div class="review-form">
		<h1>리뷰 작성</h1>

		<div class="form-group">
			<label for="title">제목</label>
			<input type="text" id="title" v-model="title" />
		</div>

		<div class="form-group">
			<label for="photo">사진 업로드</label>
			<input type="file" id="photo" @change="handleFileChange" multiple />
		</div>

		<div class="form-group">
			<label for="content">리뷰 내용</label>
			<textarea v-model="content" placeholder="리뷰를 작성하세요"></textarea>
		</div>

		<div class="rating-group">
			<div class="form-group">
				<label>맛</label>
				<star-rating v-model="ratings['taste']" :totalStars="5" category="taste" @input="updateRating" />
			</div>

			<div class="form-group">
				<label>가격</label>
				<star-rating v-model="ratings['price']" :totalStars="5" category="price" @input="updateRating" />
			</div>

			<div class="form-group">
				<label>서비스</label>
				<star-rating v-model="ratings['service']" :totalStars="5" category="service" @input="updateRating" />
			</div>
		</div>

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
				rs_code: '', //서버에서 값 넣어줌 reviewgetRcode
				reserve_num: this.$route.query.reserveNum,
			};

			reviewInfo = JSON.stringify(reviewInfo);
			formData.append(`reviewInfo`, reviewInfo);
			console.log(`reviewInfo=`, reviewInfo);

			let result = await axios.post('/node/reviewPhotos', formData);

			if (result.data.affectedRows > 0) {
				Swal.fire({
					icon: 'success',
					title: '리뷰 작성 완료',
				});
				this.$router.push('/mypage');
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
.review-form {
	max-width: 600px;
	margin: auto;
}

.form-group {
	margin-bottom: 20px;
}

label {
	display: block;
	font-weight: bold;
	margin-bottom: 5px;
}

textarea {
	width: 100%;
	height: 100px;
	margin-bottom: 10px;
}

.rating-group {
	display: flex;
	justify-content: space-between;
}

.btn-primary {
	background-color: #3498db;
	color: #fff;
	padding: 10px 15px;
	border: none;
	cursor: pointer;
}

.btn-primary:hover {
	background-color: #2980b9;
}
</style>
