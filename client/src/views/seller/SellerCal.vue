<template>
	<div>
		<h1>날짜별로 클릭할 수 있는 달력 페이지</h1>
		<vue-datepicker v-model="selectedDate" @input="onDateSelected"></vue-datepicker>

		<div v-if="selectedDate">
			<p>선택한 날짜: {{ formatSelectedDate(selectedDate) }}</p>
		</div>
	</div>
</template>

<script>
import VueDatepicker from '@vuepic/vue-datepicker';

export default {
	components: {
		VueDatepicker,
	},
	data() {
		return {
			selectedDate: null,
		};
	},
	methods: {
		onDateSelected(selectedDate) {
			console.log('Selected Date:', selectedDate);
		},
		formatSelectedDate(date) {
			return date ? date.toISOString().split('T')[0] : '';
		},
	},
};
</script>
