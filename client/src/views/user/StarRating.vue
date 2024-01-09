<template>
	<div class="star-rating">
		<span
			v-for="index in totalStars"
			:key="index"
			@mouseenter="hoverRating(index)"
			@mouseleave="resetHover"
			@click="selectRating(index)"
		>
			<i
				:class="{
					fas: index <= hoverIndex || index <= selectedStars,
					far: index > hoverIndex && index > selectedStars,
				}"
				>&#xf005;</i
			>
		</span>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Number,
			default: 0,
		},
		totalStars: {
			type: Number,
			default: 5,
		},
		category: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			hoverIndex: 0,
			selectedStars: 0,
		};
	},
	methods: {
		hoverRating(index) {
			this.hoverIndex = index;
		},
		resetHover() {
			this.hoverIndex = 0;
		},
		selectRating(index) {
			this.selectedStars = index;
			this.$emit('input', { category: this.category, stars: this.selectedStars });
		},
	},
};
</script>

<style scoped>
.star-rating {
	font-size: 24px;
	color: #ffd700;
}

.star-rating span {
	cursor: pointer;
	margin-right: 5px;
}

.star-rating i {
	transition: color 0.3s;
}
</style>
