<template>
	<rsList />
	<br />
	<br />
	<br />
	<qnaList />
</template>
<script>
import rsList from './RsList.vue';
import qnaList from './SellerQnAList.vue';
export default {
	components: {
		rsList,
		qnaList,
	},
};
</script>
