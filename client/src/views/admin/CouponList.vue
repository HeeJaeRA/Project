<template>
  <div style="margin-bottom: 100px">
    <p>쿠폰등록</p>
    <router-link to="/admin/couponUser">쿠폰일괄발급</router-link>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>쿠폰코드</th>
          <th>쿠폰이름</th>
          <th>할인율</th>
          <th>쿠폰시작일</th>
          <th>쿠폰종료일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, idx) in couponList"
          :key="idx"
          @click="getboard(item.coupon_code)"
        >
          <td>{{ item.coupon_code }}</td>
          <td>{{ item.coupon_name }}</td>
          <td>{{ item.discount_rate }}</td>
          <td>{{ $dateFormat(item.start_date, "yyyy-MM-dd") }}</td>
          <td>{{ $dateFormat(item.end_date, "yyyy-MM-dd") }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <button @click="goForm()">쿠폰 등록하기</button>
</template>

<script>
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";

export default {
  data() {
    return {
      couponList: [],
    };
  },

  created() {
    this.getCouponList();
  },

  methods: {
    async getCouponList() {
      let result = await axios.get(`/node/admincoupon`).catch((err) => {
        console.log(err);
      });
      this.couponList = result.data;
    },
    showAlert() {
      this.$swal("Hello Vue world!!!");
    },
    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
    },

    goForm() {
      this.$router.push("/admin/couponForm").catch(() => {});
    },
    getboard(no) {
      this.$router.push({ path: "/admin/couponInfo", query: { No: no } });
    },
  },
  watch: {
    couponList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
