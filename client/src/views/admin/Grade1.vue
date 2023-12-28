<template>
  <!--등급에 맞는 회원만 출력-->
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

  <button @click="insertCoupon()">쿠폰발급</button>
</template>

<script>
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import "datatables.net";
import axios from "axios";

export default {
  data() {
    return {
      grade: "맛초보",
      userList: [],
      couponList: [],
      selectCoupon: "",
      status: "사용가능",
    };
  },
  created() {
    //맛초보 출력
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
        grade: this.grade,
        couponInfo: {
          selectCoupon: this.selectCoupon,
          status: this.status,
        },
      };

      let result = await axios.post(`/node/usercoupon`, data).catch((err) => {
        console.log(err);
      });
      console.log(result.data);
      if (result.data.insertId > 0) {
        alert("쿠폰발급완료.");
      } else {
        alert("쿠폰발급완료.");
      }
    },

    async getCouponList() {
      let result = await axios.get(`/node/coupon`).catch((err) => {
        console.log(err);
      });
      this.couponList = result.data;
      //console.log(this.couponList);
    },

    async getUserList() {
      //맛초보..
      let result = await axios.get(`/node/user/${this.grade}`).catch((err) => {
        console.log(err);
        console.log(this.grade);
      });

      // console.log(result);
      this.userList = result.data;
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
