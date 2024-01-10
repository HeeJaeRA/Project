<template>
  <div
    style="
      width: 70%;
      height: 450px;
      margin-right: 2%;
      float: right;
      justify-content: flex-end;
      text-align: center;
    "
  >
    <h2 style="font-weight: bold">나의 쿠폰</h2>
    <br />
    <button
      v-if="valid"
      class="btn btn-primary"
      style="margin-right: 15px"
      @click="getVaildCouponList()"
    >
      사용가능쿠폰
    </button>
    <button
      v-else
      class="btn btn-outline-secondary"
      style="margin-right: 15px"
      @click="getVaildCouponList()"
    >
      사용가능쿠폰
    </button>

    <button
      v-if="valid"
      class="btn btn-outline-secondary"
      @click="getInvalidCouponList()"
    >
      사용완료쿠폰
    </button>
    <button v-else class="btn btn-primary" @click="getInvalidCouponList()">
      사용완료쿠폰
    </button>
    <br />
    <br />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>쿠폰코드</th>
          <th>쿠폰이름</th>
          <th>할인율</th>
          <th>사용기한</th>
          <th>쿠폰상태</th>
          <th v-if="valid == false">결제번호</th>
        </tr>
      </thead>
      <!-- 사용가능쿠폰 -->
      <tbody v-if="valid">
        <tr v-if="validUserCouponList.length == 0">
          <td colspan="6" style="color: gray; text-align: center">
            아직 발급된 쿠폰이 없습니다.
          </td>
        </tr>
        <tr v-else :key="i" v-for="(coupon, i) in validUserCouponList">
          <td>{{ coupon.coupon_code }}</td>
          <td>{{ coupon.coupon_name }}</td>
          <td>{{ coupon.discount_rate }}%</td>
          <td>{{ getDataFormat(coupon.end_date) }} 까지</td>
          <td>{{ coupon.coupon_status }}</td>
        </tr>
      </tbody>

      <!-- 사용완료쿠폰 -->
      <tbody v-if="valid == false">
        <tr v-if="InvalidUserCouponList.length == 0">
          <td colspan="6" style="color: gray; text-align: center">
            아직 사용한 쿠폰이 없습니다.
          </td>
        </tr>
        <tr v-else :key="i" v-for="(coupon, i) in InvalidUserCouponList">
          <td>{{ coupon.coupon_code }}</td>
          <td>{{ coupon.coupon_name }}</td>
          <td>{{ coupon.discount_rate }}%</td>
          <td>{{ getDataFormat(coupon.end_date) }} 까지</td>
          <td>{{ coupon.coupon_status }}</td>
          <td>{{ coupon.payment_code }}</td>
        </tr>
      </tbody>
    </table>
    <br />
    <Pagination
      v-if="valid"
      v-bind:value="`vaild_coupon`"
      v-bind:col="`user_id`"
      v-bind:colvalue="this.user_id"
      @current="selectPage1"
    />
    <Pagination
      v-else
      v-bind:value="`invaild_coupon`"
      v-bind:col="`user_id`"
      v-bind:colvalue="this.user_id"
      @current="selectPage2"
    />
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "./MyPagination.vue";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      validUserCouponList: [],
      InvalidUserCouponList: [],
      valid: true,
      user_id: window.localStorage.getItem("userId"),
      current: 1,
    };
  },

  created() {
    this.getVaildCouponList();
  },

  methods: {
    //사용가능쿠폰
    async getVaildCouponList() {
      this.valid = true;
      console.log(this.valid);
      const userId = window.localStorage.getItem("userId");
      this.validUserCouponList = (
        await axios
          .get(`/node/validcoupon/${userId}/${this.current}`)
          .catch((err) => {
            console.log(err);
          })
      ).data;
      // console.log("this.curren1111t=", this.current);
      console.log("사용가능쿠폰 정보 전체 =", this.validUserCouponList);
    },

    //사용불가쿠폰
    async getInvalidCouponList() {
      this.valid = false;
      console.log(this.valid);
      const userId = window.localStorage.getItem("userId");
      this.InvalidUserCouponList = (
        await axios
          .get(`/node/invalidcoupon/${userId}/${this.current}`)
          .catch((err) => {
            console.log(err);
          })
      ).data;
      console.log("사용불가쿠폰 정보 전체 =", this.InvalidUserCouponList);
    },

    getDataFormat(date) {
      return this.$dateFormat(date);
    },

    //클릭시 사용가능 쿠폰 페이지 바꾸는 것
    selectPage1(selected) {
      this.current = selected;
      console.log("this.current=", this.current);
      this.getVaildCouponList();
    },

    //클릭시 사용불가 쿠폰 페이지 바꾸는 것
    selectPage2(selected) {
      this.current = selected;
      console.log("this.current=", this.current);
      this.getInvalidCouponList();
    },
  },
};
</script>
