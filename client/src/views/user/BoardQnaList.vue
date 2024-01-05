<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>글번호</th>
          <th>구분</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>답변상태</th>
        </tr>
      </thead>
      <tbody>
        <tr
          :key="i"
          v-for="(qna, i) in boardQnaList"
          @click="goToDetail(qna.qna_code)"
        >
          <td>{{ i + 1 }}</td>
          <td>{{ qna.qna_divison }}</td>
          <td>{{ qna.title }}</td>
          <td>{{ getDateFormat(qna.write_date) }}</td>
          <td>{{ qna.qna_status }}</td>
        </tr>
      </tbody>
    </table>
    <div>
      <paginationwhere
        v-bind:value="'qna'"
        v-bind:col="'writer'"
        v-bind:colvalue="this.userId"
        @current="selectPage"
      />
    </div>
    <div>
      <button @click="goToInsert()">등록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import paginationwhere from "./PaginationWhere.vue";

export default {
  data() {
    return {
      boardQnaList: [],
      userId: window.localStorage.getItem("userId"),
      current: 1,
    };
  },
  omponents: {
    paginationwhere,
  },
  created() {
    this.getBoardQnaList();
  },
  methods: {
    async getBoardQnaList() {
      this.boardQnaList = (
        await axios
          .get(`/node/qnapage/${this.userId}/${this.current}`)
          .catch((err) => console.log(err))
      ).data;
    },
    async goToDetail(qnaCode) {
      this.$router.push({ path: "/qnainfo", query: { qnaCode: qnaCode } });
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async goToInsert() {
      this.$router.push({ path: "/qnaform" });
    },
    selectPage(selected) {
      this.current = selected;
      this.getBoardNoticeList();
    },
  },
};
</script>

<style scoped>
.pagination-container {
  margin-top: 20px;
}

.pagination-container button {
  font-size: 14px;
  padding: 8px 12px;
}
</style>
