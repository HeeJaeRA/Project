<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">이벤트관리</h5>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>글번호</th>
          <th>제목</th>
          <th>이벤트시작일</th>
          <th>이벤트종료일</th>
          <th>작성일자</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in eventList"
          :key="idx"
          @click="getboard(item.event_code)"
        >
          <td>{{ idx + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $dateFormat(item.eventstart_date, "yyyy-MM-dd") }}</td>
          <td>{{ $dateFormat(item.eventend_date, "yyyy-MM-dd") }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button
    style="
      margin-left: 30px;
      margin-top: 10px;
      background-color: #b0c4de;
      border-color: #b0c4de;
    "
    class="btn btn-primary"
    @click="goForm()"
  >
    등록하기
  </button>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      eventList: [],
    };
  },
  created() {
    this.getEventList();
  },

  methods: {
    async getEventList() {
      let result = await axios.get("/node/adminevent").catch((err) => {
        console.log(err);
      });

      this.eventList = result.data;
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
    //변화가 생기면 그 이후에 init해라
    eventList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
