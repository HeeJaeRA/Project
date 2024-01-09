<template>
  <div class="container">
    <br />
    <h4>REVIEW</h4>
    <br />
    <br />
    <table class="table table-hover">
      <tbody>
        <tr>
          <th>제목</th>
          <td>{{ reviewInfo.title }}</td>
          <th>작성자</th>
          <td>{{ reviewInfo.writer }}</td>
          <th>작성일자</th>
          <td>{{ getDateFormat(reviewInfo.write_date) }}</td>
        </tr>
        <tr>
          <th>맛</th>
          <td>{{ reviewInfo.star_taste }}</td>
          <th>가격</th>
          <td>{{ reviewInfo.star_price }}</td>
          <th>서비스</th>
          <td>{{ reviewInfo.star_service }}</td>
        </tr>
      </tbody>
      <tr>
        <td id="content">{{ reviewInfo.content }}</td>
      </tr>
      <tr v-for="img in imgInfo" :key="img.commu_code">
        <!-- <td colspan="2">
            <pre>{{ img.img_name }}</pre>
          </td> -->
        <td colspan="6" id="img">
          <img
            :src="`http://localhost:3000/public/uploads/${img.img_name}`"
            width="600px"
            height="500px"
          />
        </td>
      </tr>
    </table>
    <div id="btn">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="BoardReviewList()"
      >
        목록으로
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchNo: "",
      userId: window.localStorage.getItem("userId"),
      reviewInfo: {},
      imgInfo: [],
    };
  },
  created() {
    this.searchNo = this.$route.query.reCode;
    this.boardReviewInfo();
    this.getimgInfo();
  },
  methods: {
    async boardReviewInfo() {
      console.log("seachNo", this.searchNo);
      let result = await axios
        .get(`/node/reviewinfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result);

      this.reviewInfo = result.data;
    },
    async getimgInfo() {
      let result = await axios
        .get(`/node/reviewimg/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.imgInfo = result.data;
      console.log(this.imgInfo);
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async BoardReviewList() {
      this.$router.push({ path: "/review" });
    },
  },
};
</script>

<style scoped>
#btn {
  text-align: center;
  margin-bottom: 20px;
}
#content {
  height: 200px;
}
button {
  margin-right: 5px;
  text-align: center;
}
#img {
  text-align: center;
}
</style>
