<template>
	<article id="slider">
		<div class="sliderWrap">
			<router-link to="/userevent" class="slider">
				<img src="../../assets/images/banner1.png" alt="banner1" />
			</router-link>
			<router-link to="/userevent" class="slider">
				<img src="../../assets/images/banner2.png" alt="banner2" />
			</router-link>
			<router-link to="/userevent" class="slider">
				<img src="../../assets/images/banner3.png" alt="banner3" />
			</router-link>
			<router-link to="/userevent" class="slider">
				<img src="../../assets/images/banner4.png" alt="banner4" />
			</router-link>
			<router-link to="/userevent" class="slider">
				<img src="../../assets/images/banner5.png" alt="banner5" />
			</router-link>
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
	height: 550px;
	margin-top: 71px;
}

img {
	width: 100%;
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
	cursor: pointer;
}

#slider > div > div > img {
	vertical-align: top;
	object-fit: fill;
	width: 100%;
	height: 550px;
}
</style>
