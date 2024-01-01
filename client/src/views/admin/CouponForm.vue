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
import Swal from "sweetalert2";

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
        Swal.fire({
          title: "쿠폰 등록이 완료되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "couponList" });
      } else {
        Swal.fire({
          title: "쿠폰 등록이 실패 되었습니다.",
          icon: "error",
        });
      }
    },
  },
};
</script>
