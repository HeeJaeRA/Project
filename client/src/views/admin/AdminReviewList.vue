<template>
  <div style="margin-bottom: 100px">
    <p>리뷰 리스트</p>

    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>작성자</th>
          <th>제목</th>
          <th>작성일자</th>
          <th>맛</th>
          <th>가격</th>
          <th>서비스</th>
          <th>좋아요</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in reviewList"
          :key="idx"
          @click="getboard(item.review_code)"
        >
          <td>{{ item.writer }}</td>
          <td>{{ item.title }}</td>
          <td>{{ $dateFormat(item.write_date, "yyyy-MM-dd") }}</td>
          <td>{{ item.star_taste }}</td>
          <td>{{ item.star_price }}</td>
          <td>{{ item.star_service }}</td>
          <td>{{ item.like_cnt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

export default {
  data() {
    return {
      reviewList: [],
    };
  },

  created() {
    this.getList();
  },

  methods: {
    async getList() {
      let result = await axios.get(`/node/adminReviewList`).catch((err) => {
        console.log(err);
      });
      this.reviewList = result.data;
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },

    getboard(no) {
      this.$router.push({ path: "/admin/AdminReviewInfo", query: { No: no } });
    },
  },
  watch: {
    reviewList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
