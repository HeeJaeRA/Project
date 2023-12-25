<template>
	<div>
		<google-chart ref="chart" :data="chartData" :options="chartOptions" style="width: 100%; height: 300px" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			chartData: [
				['Task', 'Hours per Day'],
				['Work', 11],
				['Eat', 2],
				['Commute', 2],
				['Watch TV', 2],
				['Sleep', 7],
			],
			chartOptions: {
				title: 'My Daily Activities',
			},
		};
	},
	mounted() {
		google.charts.load('current', { packages: ['corechart'] });

		google.charts.setOnLoadCallback(this.drawChart);
	},
	methods: {
		drawChart() {
			if (typeof google.visualization !== 'undefined') {
				const data = new google.visualization.arrayToDataTable(this.chartData);
				const options = this.chartOptions;
				const chart = new google.visualization.PieChart(this.$refs.chart);
				chart.draw(data, options);
			} else {
				console.error('Google Charts library is not loaded.');
			}
		},
	},
};
</script>
