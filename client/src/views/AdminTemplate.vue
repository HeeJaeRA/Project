<template>
	<Header />
	<router-view :key="$route.fullPath" />
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
};
</script>
