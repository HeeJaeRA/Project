<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>제목</th>
          <td>{{ reviewInfo.title }}</td>
          <th>작성자</th>
          <td>{{ reviewInfo.writer }}</td>
        </tr>
        <tr>
          <th>작성일시</th>
          <td>{{ getDateFormat(reviewInfo.write_date) }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>맛: {{ reviewInfo.star_taste }}</td>
          <td>가격:{{ reviewInfo.star_price }}</td>
          <td>서비스: {{ reviewInfo.star_service }}</td>
        </tr>

        <tr v-for="img in imgInfo" :key="img.review_code">
          <img
            :src="`http://localhost:3000/public/uploads/${img.img_name}`"
            width="200px"
            height="200px"
          />
        </tr>
        <tr>
          <td colspan="4">
            <pre>{{ reviewInfo.content }}</pre>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div>
      <div v-if="this.userId == this.comInfo.user_id">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="boardComForm(comInfo.commu_code)"
        >
          수정
        </button>
        <button type="button" class="btn btn-warning" @click="deleteComInfo()">
          삭제
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="BoardCommuList()"
        >
          목록으로
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="BoardCommuList()"
        >
          목록으로
        </button>
      </div> -->
    <!-- </div> -->
    <!-- <hr />
    <div>
      <ReplyList v-bind:comCode="this.searchNo" />
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchNo: "",
      reviewInfo: {},
      userId: window.localStorage.getItem("userId"),
      imgInfo: [],
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getReviewInfo();
    this.getimgInfo();
  },
  methods: {
    async getReviewInfo() {
      let result = await axios
        .get(`/node/adminReviewInfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.reviewInfo = result.data;
    },
    async getimgInfo() {
      let result = await axios
        .get(`/node/adminGetReviewImg/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.imgInfo = result.data;
      console.log(this.imgInfo);
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
  },
};
</script>
