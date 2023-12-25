<template>
	<Header />
	<div>
		<Sidebar />
		<router-view :key="$route.fullPath" />
	</div>
	<Footer />
</template>
<script>
import Header from '../layouts/admin/Header.vue';
import Footer from '../layouts/admin/Footer.vue';
import Sidebar from '../layouts/admin/Sidebar.vue';

export default {
	components: {
		Header,
		Footer,
		Sidebar,
	},
	created() {
		this.$router.push({ path: 'admin/home' });
	},
};
</script>
