<template>
  <div class="container" style="margin: 0 auto">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="font-family: 나눔고딕; margin: auto; margin-bottom: 30px">
          쿠폰 정보 수정
        </h5>
        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            <input type="text" v-model="couponInfo.coupon_name" />
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            <input type="number" v-model="couponInfo.discount_rate" /> %
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

    <div>
      <button
        class="btn btn-primary"
        @click="couponModify()"
        style="margin-left: 50%; margin-right: 5px; padding: 10px"
      >
        수정
      </button>
      <button
        class="btn btn-warning text-white"
        style="margin-left: 0%; padding: 10px"
        @click="this.$router.go(-1)"
      >
        취소
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

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
<style scoped>
.container {
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 30px;
}

.form-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

select {
  width: 100%;
  padding: 10px;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="number"],
input[type="date"] {
  width: 30%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

input[type="text"],
textarea,
input[type="file"] {
  text-align: center;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.textarea {
  resize: none;
}
</style>
