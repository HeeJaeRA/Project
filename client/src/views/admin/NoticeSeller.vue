<template>
  <div>
    <p>판매자공지사항</p>
    <table ref="myDataTable" class="display">
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
          v-for="(item, idx) in noticeList"
          :key="idx"
          @click="getboard(item.notice_code)"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
          <td>{{ item.view_cnt }}</td>
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
      noticeList: [],
    };
  },
  created() {
    this.getNoticetList();
  },

  methods: {
    async getNoticetList() {
      let result = await axios.get("/node/adminSellerNotice").catch((err) => {
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
      this.$router.push({ path: "/admin/eventInfo", query: { No: no } });
    },

    goForm() {
      this.$router.push("/admin/eventForm").catch(() => {});
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
