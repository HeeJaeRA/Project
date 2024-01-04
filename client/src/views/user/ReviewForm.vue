<template>
	<div>
		<h2>리뷰 작성</h2>

		<label for="title">제목</label>
		<input type="text" id="title" v-model="title" />

		<label for="photo">사진 업로드</label>
		<input type="file" id="photo" @change="handleFileChange" multiple />

		<div class="star-rating">
			<span
				v-for="rating in 5"
				:key="rating"
				@click="setTasteRating(rating)"
				:class="{ selected: rating <= tasteRating }"
				>⭐</span
			>
		</div>

		<div class="star-rating">
			<span
				v-for="rating in 5"
				:key="rating"
				@click="setServiceRating(rating)"
				:class="{ selected: rating <= serviceRating }"
				>⭐</span
			>
		</div>

		<div class="star-rating">
			<span
				v-for="rating in 5"
				:key="rating"
				@click="setPriceRating(rating)"
				:class="{ selected: rating <= priceRating }"
				>⭐</span
			>
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
			tasteRating: 3,
			serviceRating: 3,
			priceRating: 3,
			title: '',
			content: '',
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

<style>
.star-rating {
	font-size: 24px;
}

.star-rating span {
	cursor: pointer;
}

.star-rating .selected {
	color: gold;
}
</style>
