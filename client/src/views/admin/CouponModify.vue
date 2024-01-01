<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <p>쿠폰정보입력</p>
        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            <input type="text" v-model="couponInfo.coupon_name" />
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            <input type="number" v-model="couponInfo.discount_rate" />
          </td>
        </tr>

        <tr>
          <th>쿠폰시작일</th>
          <td class="text-center">
            <input type="date" v-model="couponInfo.start_date" />
          </td>
        </tr>

        <tr>
          <th>쿠폰종료일</th>
          <td class="text-center">
            <input type="date" v-model="couponInfo.end_date" />
          </td>
        </tr>
      </table>
    </div>

    <div class="row">
      <button @click="couponModify()">수정</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      searchNo: "",
      couponInfo: {
        coupon_name: "",
        discount_rate: "",
        start_date: "",
        end_date: "",
      },
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
      this.couponInfo.start_date = this.$dateFormat(
        this.couponInfo.start_date,
        "yyyy-MM-dd"
      );
      this.couponInfo.end_date = this.$dateFormat(
        this.couponInfo.end_date,
        "yyyy-MM-dd"
      );
    },

    async couponModify() {
      let data = {
        param: {
          coupon_name: this.couponInfo.coupon_name,
          discount_rate: this.couponInfo.discount_rate,
          start_date: this.couponInfo.start_date,
          end_date: this.couponInfo.end_date,
        },
      };

      let result = await axios.put(
        `/node/admincoupon/${this.couponInfo.coupon_code}`,
        data
      );

      if (result.data.changedRows > 0) {
        Swal.fire({
          title: "수정이 완료되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "couponList" });
      } else {
        Swal.fire({
          title: "수정이 완료되지 않았습니다.",
          icon: "error",
        });
      }
    },
  }, //메서드
};
</script>
