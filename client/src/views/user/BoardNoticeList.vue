<template>
  <div class="container">
    <br />
    <h4>NOTICE</h4>
    <br />
    <br />
    <div>
      <form
        id="seachbar"
        action="`notices/${this.selectedOption}/${this.searchTerm}`"
        method="GET"
        @submit.prevent="goToSearch"
      >
        <select v-model="selectedOption" id="select">
          <option value="title" selected>제목</option>
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
          <th>글번호</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(notice, i) in boardNoticeList"
          id="id"
          @click="goToDetail(notice.notice_code)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ getDateFormat(notice.write_date) }}</td>
          <td>{{ notice.view_cnt }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <div class="d-flex justify-content-center mt-3">
      <paginationwhere
        v-bind:value="'notice'"
        v-bind:col="'user_division'"
        v-bind:colvalue="'일반유저'"
        @current="selectPage"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import paginationwhere from "./PaginationWhere.vue";

export default {
  data() {
    return {
      selectedOption: "title",
      boardNoticeList: [],
      current: 1,
    };
  },
  components: {
    paginationwhere,
  },
  // computed: {
  // 	paginatedRestaurants() {
  // 		let startPage = (this.currentPage - 1) * this.itemsPerPage;
  // 		let endPage = startPage + this.itemsPerPage;
  // 		return this.boardNoticeList.slice(startPage, endPage);
  // 	},
  // },
  created() {
    this.getBoardNoticeList();
  },
  methods: {
    async getBoardNoticeList() {
      this.boardNoticeList = (
        await axios
          .get(`/node/noticepage/${this.current}`)
          .catch((err) => console.log(err))
      ).data;
    },
    async goToDetail(noticeCode) {
      (
        await axios
          .put(`/node/notices/${noticeCode}`)
          .catch((err) => console.log(err))
      ).data;
      this.$router.push({
        path: "/noticeinfo",
        query: { noticeCode: noticeCode },
      });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async goToSearch() {
      let list = await axios
        .get(`/node/notices/${this.selectedOption}/${this.searchTerm}`)
        .catch((err) => console.log(err));
      let result = list.data;
      this.boardNoticeList = result;
    },
    selectPage(selected) {
      this.current = selected;
      this.getBoardNoticeList();
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
.pagination-container {
  margin-top: 20px;
}

.pagination-container button {
  font-size: 14px;
  padding: 8px 12px;
}
</style>
