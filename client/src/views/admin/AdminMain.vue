<template>
	<div>
		<button @click="showAlert">alert</button>
		<button @click="$router.push('/admin/test')">test</button>
		<router-link to="/admin/table">테이블</router-link>
		<router-link to="/admin/chart">차트</router-link>
	</div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		showAlert() {
			this.$swal('Hello Vue world!!!');
		},
	},
};
</script>
