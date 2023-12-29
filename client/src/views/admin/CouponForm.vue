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
      <button @click="couponInsert()">등록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      couponInfo: {
        coupon_name: "",
        discount_rate: "",
        start_date: "",
        end_date: "",
      },
    };
  },

  methods: {
    async couponInsert() {
      let data = {
        param: this.couponInfo,
      };
      let result = await axios.post("/node/admincoupon", data);
      if (result.data.insertId > 0) {
        alert("정상적으로 처리되었습니다.");
        this.$router.push({ name: "couponList" });
      } else {
        alert("정상적으로 처리되지 않았습니다.");
      }
    },
  },
};
</script>
