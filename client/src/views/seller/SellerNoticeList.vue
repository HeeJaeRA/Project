<template>
  <div>
    <h1>판매자 공지사항</h1>
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
          style="width: 400px"
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
    <br />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일자</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(notice, i) in paginatedRestaurants"
          id="id"
          @click="goToDetail(notice.notice_code)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ notice.title }}</td>
          <td>{{ notice.user_id }}</td>
          <td>{{ getDateFormat(notice.write_date) }}</td>
          <td>{{ notice.view_cnt }}</td>
        </tr>
      </tbody>
    </table>
    <div
      class="pagination-container d-flex justify-content-center align-items-center mt-4"
    >
      <button
        v-if="currentPage > 1"
        class="btn btn-primary mx-1"
        style="
          color: black;
          background-color: lightgray;
          border-color: lightgray;
        "
        @click="changePage('prev')"
      >
        이전
      </button>
      <span class="mx-1">Page {{ currentPage }} / {{ totalPages }}</span>
      <button
        v-if="currentPage < totalPages"
        class="btn btn-primary mx-1"
        style="
          color: black;
          background-color: lightgray;
          border-color: lightgray;
        "
        @click="changePage('next')"
      >
        다음
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedOption: "title",
      boardNoticeList: [],
      itemsPerPage: 10,
      currentPage: 1,
      totalPages: 0,
    };
  },
  computed: {
    paginatedRestaurants() {
      let startPage = (this.currentPage - 1) * this.itemsPerPage;
      let endPage = startPage + this.itemsPerPage;
      return this.boardNoticeList.slice(startPage, endPage);
    },
  },
  created() {
    this.getBoardNoticeList();
  },
  methods: {
    async getBoardNoticeList() {
      let response = await axios.get("/node/selnotices");
      this.boardNoticeList = response.data;
      this.totalPages = Math.ceil(
        this.boardNoticeList.length / this.itemsPerPage
      );
    },
    async goToDetail(noticeCode) {
      this.$router.push({
        path: "/seller/noticeinfo",
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
    changePage(action) {
      if (action === "prev" && this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
        this.getBoardNoticeList();
      } else if (action === "next" && this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
        this.getBoardNoticeList();
      }
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
#seachbar {
  display: flex;
  justify-content: right;
}
.pagination-container {
  margin-top: 20px;
}

.pagination-container button {
  font-size: 14px;
  padding: 8px 12px;
}
</style>
