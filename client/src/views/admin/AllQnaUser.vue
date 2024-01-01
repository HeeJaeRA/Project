<template>
  <div>
    <p>일반유저qna</p>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in qnaList"
          :key="idx"
          @click="getboard(item.qna_code)"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
          <td>{{ item.writer }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      qnaList: [],
    };
  },
  created() {
    this.getQnaList();
  },

  methods: {
    async getQnaList() {
      let result = await axios.get("/node/adminUserQna").catch((err) => {
        console.log(err);
      });

      this.qnaList = result.data;
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
    qnaList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
