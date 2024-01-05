<template>
	<div>
		<h2>리뷰 작성</h2>

		<label>제목</label>
		<input type="text" id="title" v-model="title" />

		<label>사진 업로드</label>
		<input type="file" id="photo" @change="handleFileChange" multiple />

		<label>별점_맛</label>
		<div class="rate">
			<input type="radio" id="rating5" name="rating" v-model="tasteRating[4]" /><label for="rating5"></label>
			<input type="radio" id="rating4" name="rating" v-model="tasteRating[3]" /><label for="rating4"></label>
			<input type="radio" id="rating3" name="rating" v-model="tasteRating[2]" /><label for="rating3"></label>
			<input type="radio" id="rating2" name="rating" v-model="tasteRating[1]" /><label for="rating2"></label>
			<input type="radio" id="rating1" name="rating" v-model="tasteRating[0]" /><label for="rating1"></label>
		</div>

		<label>별점_서비스</label>
		<div class="rate">
			<input type="radio" id="rating5" name="rating" v-model="serviceRating[4]" /><label for="rating5"></label>
			<input type="radio" id="rating4" name="rating" v-model="serviceRating[3]" /><label for="rating4"></label>
			<input type="radio" id="rating3" name="rating" v-model="serviceRating[2]" /><label for="rating3"></label>
			<input type="radio" id="rating2" name="rating" v-model="serviceRating[1]" /><label for="rating2"></label>
			<input type="radio" id="rating1" name="rating" v-model="serviceRating[0]" /><label for="rating1"></label>
		</div>

		<label>별점_가격</label>
		<div class="rate">
			<input type="radio" id="rating5" name="rating" v-model="priceRating[4]" /><label for="rating5"></label>
			<input type="radio" id="rating4" name="rating" v-model="priceRating[3]" /><label for="rating4"></label>
			<input type="radio" id="rating3" name="rating" v-model="priceRating[2]" /><label for="rating3"></label>
			<input type="radio" id="rating2" name="rating" v-model="priceRating[1]" /><label for="rating2"></label>
			<input type="radio" id="rating1" name="rating" v-model="priceRating[0]" /><label for="rating1"></label>
		</div>

		<label for="content">내용</label>
		<textarea id="content" v-model="content"></textarea>

		<button @click="submitReview">리뷰 등록</button>
	</div>
	{{ tasteRating }}
	{{ serviceRating }}
	{{ priceRating }}
</template>

<script>
export default {
	data() {
		return {
			selectedPhotos: [],
			title: '',
			content: '',
			tasteRating: [],
			serviceRating: [],
			priceRating: [],
		};
	},
	methods: {
		handleFileChange(event) {
			this.selectedPhotos = Array.from(event.target.files);
		},
		setTasteRating(rating) {
			this.tasteRating = rating;
		},
		setServiceRating(rating) {
			this.serviceRating = rating;
		},
		setPriceRating(rating) {
			this.priceRating = rating;
		},
		submitReview() {
			const reviewData = {
				photos: this.selectedPhotos,
				tasteRating: this.tasteRating,
				serviceRating: this.serviceRating,
				priceRating: this.priceRating,
				title: this.title,
				content: this.content,
			};
			console.log(reviewData);
		},
	},
};
</script>

<style scoped>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);
.rate {
	display: inline-block;
	border: 0;
	margin-right: 15px;
}
.rate > input {
	display: none;
}
.rate > label {
	float: right;
	color: #ddd;
}
.rate > label:before {
	display: inline-block;
	font-size: 1rem;
	padding: 0.3rem 0.2rem;
	margin: 0;
	cursor: pointer;
	font-family: FontAwesome;
	content: '\f005 ';
}
.rate .half:before {
	content: '\f089 ';
	position: absolute;
	padding-right: 0;
}
.rate input:checked ~ label,
.rate label:hover,
.rate label:hover ~ label {
	color: #fffb03 !important;
}
.rate input:checked + .rate label:hover,
.rate input input:checked ~ label:hover,
.rate input:checked ~ .rate label:hover ~ label,
.rate label:hover ~ input:checked ~ label {
	color: #fffb03 !important;
}
</style>
