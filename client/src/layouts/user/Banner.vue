<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<article id="slider">
		<div class="sliderWrap">
			<div class="slider">
				<img src="../../assets/images/banner1.jpg" alt="banner1" />
			</div>
			<div class="slider">
				<img src="../../assets/images/banner2.jpg" alt="banner2" />
			</div>
		</div>
	</article>
</template>
<script>
export default {
	mounted() {
		this.startSlider();
	},

	methods: {
		startSlider() {
			let currentIndex = 0;
			const sliders = document.querySelectorAll('.sliderWrap .slider');

			sliders.forEach((img) => (img.style.opacity = '0'));
			sliders[0].style.opacity = '1';

			setInterval(() => {
				let nextIndex = (currentIndex + 1) % sliders.length;

				sliders[currentIndex].style.opacity = '0';
				sliders[nextIndex].style.opacity = '1';
				sliders.forEach((img) => (img.style.transition = 'all 1s'));

				currentIndex = nextIndex;
			}, 4000);
		},
	},
};
</script>

<style scoped>
#slider {
	width: 100%;
	height: 350px;
}

.sliderWrap {
	position: relative;
}

.sliderWrap > div {
	display: block;
}

.sliderWrap > div:first-child {
	display: block;
}

.sliderWrap .slider {
	position: absolute;
	width: 100%;
	height: 100%;
}

#slider > div > div > img {
	vertical-align: top;
	object-fit: fill;
	width: 100%;
	height: 350px;
}
</style>
