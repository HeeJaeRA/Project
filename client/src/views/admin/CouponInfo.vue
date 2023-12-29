<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <p>쿠폰정보</p>

        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            {{ couponInfo.coupon_name }}
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            {{ couponInfo.discount_rate }}
          </td>
        </tr>

        <tr>
          <th>쿠폰시작일</th>
          <td class="text-center">
            {{ $dateFormat(couponInfo.start_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th>쿠폰종료일</th>
          <td class="text-center">
            {{ $dateFormat(couponInfo.end_date, "yyyy-MM-dd") }}
          </td>
        </tr>
      </table>
    </div>
    <button @click="updateInfo(couponInfo.coupon_code)">수정</button>
    <button @click="confirmdelete()">삭제</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchNo: "",
      couponInfo: {},
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getCouponInfo();
  },

  methods: {
    async getCouponInfo() {
      let result = await axios
        .get(`/node/admincoupon/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result);
      this.couponInfo = result.data;
    },

    updateInfo(no) {
      this.$router.push({ path: "/admin/couponModify", query: { No: no } });
    },

    confirmdelete() {
      let result = confirm("정말삭제할래?");
      if (result) {
        this.deleteInfo();
      } else {
        alert("삭제취소~~@!");
      }
    },
    async deleteInfo() {
      let result = await axios
        .delete(`/node/admincoupon/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
      if (count == 0) {
        alert("정상적으로 삭제xxxxxxxxxxxx");
      } else {
        alert("정상적으로 삭제됨!!!!!!!");
        this.$router.push({ name: "couponList" });
      }
    },
  }, //메소드
}; //export
</script>
