<template>
	<Header />
	<Sidebar />
	<Footer />
</template>
<script>
import Header from '../layouts/seller/Header.vue';
import Footer from '../layouts/seller/Footer.vue';
import Sidebar from '../layouts/seller/Sidebar.vue';

export default {
	components: {
		Header,
		Sidebar,
		Footer,
	},
};
</script>
