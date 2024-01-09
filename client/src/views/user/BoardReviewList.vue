<template>
  <div class="container">
    <br />
    <h4>REVIEW</h4>
    <br />
    <br />
    <div>
      <form
        id="seachbar"
        action="`review/${this.selectedOption}/${this.searchTerm}`"
        method="GET"
        @submit.prevent="goToSearch"
      >
        <select v-model="selectedOption" id="select">
          <option value="title">제목</option>
          <option value="user_id">작성자</option>
          <option value="content">내용</option>
        </select>
        <input
          v-model="searchTerm"
          style="width: 500px"
          class="form-control me-sm-2"
          type="search"
          placeholder="Search"
          name="word"
        />
        <button
          type="submit"
          class="btn btn-secondary my-2 my-sm-0"
          @click="goToSearch"
        >
          Search
        </button>
      </form>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>맛</th>
          <th>가격</th>
          <th>서비스</th>
          <th>좋아요</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(review, i) in boardReviewList"
          @click="goToDetail(review.review_code)"
        >
          <td>{{ review.title }}</td>
          <td>{{ review.writer }}</td>
          <td>{{ getDateFormat(review.write_date) }}</td>
          <td>{{ review.star_taste }}</td>
          <td>{{ review.star_price }}</td>
          <td>{{ review.star_service }}</td>
          <td>{{ review.like_cnt }}</td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex justify-content-center mt-3">
      <pagination v-bind:value="'review'" @current="selectPage" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import pagination from "./Pagination.vue";

export default {
  data() {
    return {
      selectedOption: "title",
      boardReviewList: [],
      userId: window.localStorage.getItem("userId"),
      current: 1,
    };
  },
  components: {
    pagination,
  },
  created() {
    this.getReviewList();
  },
  methods: {
    async getReviewList() {
      this.boardReviewList = (
        await axios
          .get(`/node/reviewpage/${this.current}`)
          .catch((err) => console.log(err))
      ).data;
      console.log(this.boardReviewList);
    },
    async goToDetail(reCode) {
      await axios
        .put(`/node/reviewinfo/${reCode}`)
        .catch((err) => console.log(err));
      this.$router.push({
        path: "/reviewinfo",
        query: { reCode: reCode },
      });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async goToSearch() {
      let list = await axios
        .get(`/node/review/${this.selectedOption}/${this.searchTerm}`)
        .catch((err) => console.log(err));
      let result = list.data;
      this.boardReviewList = result;
    },
    selectPage(selected) {
      this.current = selected;
      this.getReviewList();
    },
  },
};
</script>

<style scoped>
h4 {
  margin-left: 10px;
  margin-top: 10px;
}
#select {
  margin-right: 5px;
  border-radius: 6px;
}
#seachbar {
  display: flex;
  justify-content: right;
  margin-bottom: 30px;
  margin-right: 20px;
}
#insertbtn {
  margin-right: 20px;
  text-align: right;
}
</style>
