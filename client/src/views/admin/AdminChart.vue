<template>
  <div>
    <google-chart
      ref="chart"
      :data="chartData"
      :options="chartOptions"
      style="width: 100%; height: 300px"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categoryList: "",
      chartData: [["인기많은가게", "Hours per Day"]],
      chartOptions: {
        title: "인기 많은 카테고리 ",
      },
    };
  },

  created() {
    this.getCategoryChart();
  },
  mounted() {
    google.charts.load("current", { packages: ["corechart"] });

    google.charts.setOnLoadCallback(this.drawChart);
  },
  methods: {
    async getCategoryChart() {
      let result = await axios.get("/node/adminCategoryChart").catch((err) => {
        console.log(err);
      });
      this.categoryList = result.data;
      console.log(this.categoryList);
      for (let val of this.categoryList) {
        // console.log(val);
        //console.log(val.category);
        let array = [val.category, val.cnt];
        this.chartData.push(array);
      }
    },
    drawChart() {
      if (typeof google.visualization !== "undefined") {
        const data = new google.visualization.arrayToDataTable(this.chartData);
        const options = this.chartOptions;
        const chart = new google.visualization.PieChart(this.$refs.chart);
        chart.draw(data, options);
      } else {
        console.error("Google Charts library is not loaded.");
      }
    },
  },
};
</script>
