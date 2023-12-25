<template>
	<Header />
	<Sidebar />
	<Footer />
</template>
<script>
import Header from '../layouts/admin/Header.vue';
import Footer from '../layouts/admin/Footer.vue';
import Sidebar from '../layouts/admin/Sidebar.vue';

export default {
	components: {
		Header,
		Sidebar,
		Footer,
	},
};
</script>
