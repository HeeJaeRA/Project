<template>
	<br />
	<br />
	<div class="container px-4 px-lg-5 mt-5"><img src="../../assets/images/about.png" /></div>
	<button
		class="btn btn-dark rounded-pill px-3"
		style="
			border-radius: 30%;
			text-align: center;
			vertical-align: top;
			width: 100px;
			height: 50px;
			position: fixed;
			bottom: 80px;
			right: 80px;
			font-size: 20px;
		"
		@click="scrollToTop()"
	>
		Top
	</button>
</template>

<script>
export default {
	methods: {
		scrollToTop() {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		},
	},
};
</script>
