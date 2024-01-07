<template>
  <div>
    <div id="container" class="flex-container">
      <div
        id="piechart"
        class="chart w-50"
        ref="chart"
        :data="chartData"
        :options="chartOptions"
        style="  margin: 0 auto;
        margin-top:30px;
         transform: translateY(40px);
      
       
}"
      />
    </div>

    <div style="text-align: center">
      <label>
        <input
          type="radio"
          v-model="radioValues"
          name="rank"
          value="pay"
          @change="rank"
          checked
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
    </div>

    <div>
      <div
        ref="chart2"
        :data="chartData2"
        :options="chartOptions2"
        style="
          width: 1600px;
          height: 360px;
          margin: 0 auto;
          transform: translateY(-34px);
        "
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categoryList: [], //카테고리별
      chartData: [["인기많은가게", "Hours per Day"]],
      chartOptions: {
        width: 600,
        height: 240,
        title: "인기 많은 카테고리 ",
        fontSize: 15,
        chartArea: { width: "90%", height: "80%" },
        //is3D: true,
        pieHole: 0.4,
        pieStartAngle: 100,
        //titlePosition: "in",

        colors: ["#5F9EA0", "#8FBC8F", "#008B8B", "#3CB371"],
      },

      radioValues: "", //결제.찜.별점
      categoryList2: [],
      chartData2: [["인기많은가게", ""]],
      chartOptions2: {
        title: "",
        chartArea: { width: "60%", height: "60%" },
        colors: ["#2F4F4F"],
        hAxis: {
          title: "Total Population",
          minValue: 0,
        },
        vAxis: { title: "가게이름" },
      },
    };
  },

  //어싱크 사용가능
  created() {
    this.getCategoryChart(); //인기많은카테고리
    this.radioValues = "pay";
    this.rank();
  },

  methods: {
    async rank() {
      let result;
      if (this.radioValues == "pay") {
        (this.chartData2 = [["인기많은가게", "결제 건수"]]),
          (result = await axios.get("/node/adminPaymentChart").catch((err) => {
            console.log(err);
          }));
        this.categoryList2 = result.data;
        console.log("pay" + this.categoryList2);

        for (let val of this.categoryList2) {
          // console.log(val);
          //console.log(val.category);
          let array = [val.rs_name, val.cnt];
          this.chartData2.push(array);
        }
        google.charts.load("current", { packages: ["corechart", "bar"] });
        google.charts.setOnLoadCallback(this.drawBasic);
      } else if (this.radioValues == "book") {
        (this.chartData2 = [["인기많은가게", " 찜 수"]]),
          (result = await axios.get("/node/adminBookmarkChart").catch((err) => {
            console.log(err);
          }));
        this.categoryList2 = result.data;
        console.log("book" + this.categoryList2);

        for (let val of this.categoryList2) {
          // console.log(val);
          //console.log(val.category);
          let array = [val.rs_name, val.cnt];
          this.chartData2.push(array);
        }
        google.charts.load("current", { packages: ["corechart", "bar"] });
        google.charts.setOnLoadCallback(this.drawBasic);
      } else if (this.radioValues == "star") {
        (this.chartData2 = [["인기많은가게", "평점"]]),
          (result = await axios.get("/node/adminReviewChart").catch((err) => {
            console.log(err);
          }));

        this.categoryList2 = result.data;
        console.log("star" + this.categoryList2);
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
<style scoped>
label {
  margin-top: 50px;
  font-size: 15px;
  line-height: 5rem;
  padding: 0.2em 0.4em;
}

[type="radio"],
span {
  vertical-align: middle;
}

[type="radio"] {
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.5s ease-in-out;
}

[type="radio"]:checked {
  border: 0.4em solid rgb(143, 142, 146);
}

[type="radio"]:focus-visible {
  outline-offset: max(2px, 0.1em);
  outline: max(2px, 0.1em) dotted tomato;
}

[type="radio"]:hover {
  box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
  cursor: pointer;
}
</style>
