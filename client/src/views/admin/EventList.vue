<template>
  <div>
    <p>이벤트관리</p>
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
          <td>{{ $dateFormat(item.start_date, "yyyy-MM-dd") }}</td>
          <td>{{ $dateFormat(item.end_date, "yyyy-MM-dd") }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
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
      eventList: [],
    };
  },
  created() {
    this.getEventList();
  },

  methods: {
    async getEventList() {
      let result = await axios.get("/node/event").catch((err) => {
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
  },
  watch: {
    eventList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
