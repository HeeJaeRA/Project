<template>
  <div>
    <p>공지사항</p>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>조회수</th>
          <th>중요도</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in noticeList"
          :key="idx"
          @click="getboard(item.notice_code)"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
          <td>{{ item.view_cnt }}</td>
          <td>{{ item.notice_important }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <button @click="goForm()">공지사항등록하기</button>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      division: "",
      noticeList: [],
    };
  },
  created() {
    this.division = this.$route.params.division;
    this.getNoticetList();
  },

  methods: {
    async getNoticetList() {
      let result = await axios
        .get(`/node/adminNoticeList/${this.division}`)
        .catch((err) => {
          console.log(err);
        });

      this.noticeList = result.data;
      console.log("axios");
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
      console.log("init");
    },

    getboard(no) {
      this.$router.push({ path: "/admin/adminNoticeInfo", query: { No: no } });
    },

    goForm() {
      this.$router.push({
        path: "/admin/adminNoticeForm",
        query: { division: this.division },
      });
    },
  },
  watch: {
    noticeList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
