<template>
	<Header />
	<router-view :key="$route.fullPath" />
	<Footer />
</template>
<script>
import Header from '../layouts/user/Header.vue';
import Footer from '../layouts/user/Footer.vue';

export default {
	components: {
		Header,
		Footer,
	},
	created() {
		this.$router.push({ path: '/home' });
	},
};
</script>
