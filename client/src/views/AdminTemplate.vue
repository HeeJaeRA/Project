<template>
	<Header />
	<div>
		<router-view :key="$route.fullPath" />
	</div>
	<Footer />
</template>
<script>
import Header from '../layouts/admin/Header.vue';
import Footer from '../layouts/admin/Footer.vue';

export default {
	components: {
		Header,
		Footer,
	},
	created() {
		this.$router.push({ path: 'admin/home' });
	},
};
</script>
