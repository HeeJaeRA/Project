<template>
  <!--회원전체 출력-->
  <div>
    <router-link to="/admin/couponList">쿠폰등록</router-link>
    <br />
    <button @click="fullList()">전체회원</button>
    <button @click="grade1()">맛초보</button>
    <button @click="grade2()">맛잘알</button>
    <button @click="grade3()">쩝쩝박사</button>

    <p>회원목록</p>
    <table ref="myDataTable" class="display">
      <thead>
        <tr>
          <th>아이디</th>
          <th>닉네임</th>
          <th>등급</th>
          <th>활동상태</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in userList" :key="idx">
          <td>{{ item.user_id }}</td>
          <td>{{ item.nickname }}</td>
          <td>{{ item.grade }}</td>
          <td>{{ item.user_status }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  <select v-model="selectCoupon">
    <option
      :key="idx"
      :value="item.coupon_code"
      v-for="(item, idx) in couponList"
    >
      {{ item.coupon_name }}
    </option>
  </select>

  <button @click="insertCoupon()">쿠폰일괄발급</button>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      userList: [],
      couponList: [],
      selectCoupon: "",
      status: "사용가능",
    };
  },
  created() {
    //전체 회원목록 출력
    this.getUserList();
    this.getCouponList();
  },

  methods: {
    fullList() {
      this.$router.push("/admin/couponUser").catch(() => {});
    },
    grade1() {
      this.$router.push("/admin/grade1").catch(() => {});
    },
    grade2() {
      this.$router.push("/admin/grade2").catch(() => {});
    },
    grade3() {
      this.$router.push("/admin/grade3").catch(() => {});
    },

    async insertCoupon() {
      let data = {
        couponInfo: {
          selectCoupon: this.selectCoupon,
          status: this.status,
        },
      };

      let result = await axios.post(`/node/usercoupon`, data).catch((err) => {
        console.log(err);
      });
      if (result.status == 200) {
        alert("쿠폰발급완료.");
      } else {
        alert("정상적으로 처리되지 않았습니다.");
      }
    },
    //쿠폰전체목록 불러오기
    async getCouponList() {
      let result = await axios.get(`/node/coupon`).catch((err) => {
        console.log(err);
      });
      this.couponList = result.data;
      console.log(this.couponList);
    },
    //활동회원조회
    async getUserList() {
      let result = await axios.get(`/node/user`).catch((err) => {
        console.log(err);
      });

      this.userList = result.data;
      //console.log("axios");
    },

    initDataTable() {
      $(this.$refs.myDataTable).DataTable({});
      //console.log("init");
    },
  },
  watch: {
    userList() {
      this.$nextTick(() => {
        this.initDataTable();
      });
    },
  },
};
</script>
