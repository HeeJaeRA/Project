<template>
  <div>
    <div>
      <google-chart
        ref="chart"
        :data="chartData"
        :options="chartOptions"
        style="width: 100%; height: 500%"
      />
    </div>

    <div>
      <label>
        <input
          type="radio"
          v-model="radioValues"
          name="rank"
          value="pay"
          @change="rank"
        />결제 많은 순
      </label>
      <label>
        <input
          type="radio"
          v-model="radioValues"
          name="rank"
          value="book"
          @change="rank"
        />찜 많은 순
      </label>
      <label>
        <input
          type="radio"
          v-model="radioValues"
          name="rank"
          value="star"
          @change="rank"
        />별점 높은 순
      </label>

      {{ radioValues }}
    </div>

    <div>
      <google-chart
        ref="chart2"
        :data="chartData2"
        :options="chartOptions2"
        style="width: 100%; height: 300px"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      radioValues: "",
      categoryList: "",
      chartData: [["인기많은가게", "Hours per Day"]],
      chartOptions: {
        title: "인기 많은 카테고리 ",
      },
      categoryList2: "",
      chartData2: [["인기많은가게", ""]],
      // chartOptions2: {
      //   title: "결제횟수",
      //   chartArea: { width: "50%" },
      //   hAxis: {
      //     title: "Total Population",
      //     minValue: 0,
      //   },
      //   vAxis: {
      //     title: "가게이름",
      //   },
      // },
    };
  },

  //어싱크 사용가능
  created() {
    this.getCategoryChart(); //인기많은카테고리
  },

  methods: {
    async rank() {
      let result;
      if (this.radioValues == "pay") {
        result = await axios.get("/node/adminPaymentChart").catch((err) => {
          console.log(err);
        });
        this.categoryList2 = result.data;

        for (let val of this.categoryList2) {
          // console.log(val);
          //console.log(val.category);
          let array = [val.rs_name, val.cnt];
          this.chartData2.push(array);
        }
        google.charts.load("current", { packages: ["corechart", "bar"] });
        google.charts.setOnLoadCallback(this.drawBasic);
      } else if (this.radioValues == "book") {
        result = await axios.get("/node/adminBookmarkChart").catch((err) => {
          console.log(err);
        });
        this.categoryList2 = result.data;

        for (let val of this.categoryList2) {
          // console.log(val);
          //console.log(val.category);
          let array = [val.rs_name, val.cnt];
          this.chartData2.push(array);
        }
        google.charts.load("current", { packages: ["corechart", "bar"] });
        google.charts.setOnLoadCallback(this.drawBasic);
      } else if (this.radioValues == "star") {
        result = await axios.get("/node/adminReviewChart").catch((err) => {
          console.log(err);
        });

        this.categoryList2 = result.data;

        for (let val of this.categoryList2) {
          // console.log(val);
          //console.log(val.category);
          let array = [val.rs_name, val.avg];
          this.chartData2.push(array);
        }
        google.charts.load("current", { packages: ["corechart", "bar"] });
        google.charts.setOnLoadCallback(this.drawBasic);
      }
    }, //rank함수

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
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(this.drawChart);
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

    drawBasic() {
      if (typeof google.visualization !== "undefined") {
        const data = new google.visualization.arrayToDataTable(this.chartData2);
        const options = this.chartOptions2;
        const chart = new google.visualization.BarChart(this.$refs.chart2);
        chart.draw(data, options);
      } else {
        console.error("Google Charts library is not loaded.");
      }
    },
  },
};
</script>
