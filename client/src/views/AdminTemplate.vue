<template>
	<Header />
	<Sidebar />
	<router-view :key="$route.fullPath" />
	<Footer />
</template>
<script>
import Header from '../layouts/admin/Header.vue';
import Sidebar from '../layouts/admin/Sidebar.vue';
import Footer from '../layouts/admin/Footer.vue';

export default {
	components: {
		Header,
		Sidebar,
		Footer,
	},
};
</script>
