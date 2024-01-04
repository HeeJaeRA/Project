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
    <option value="" selected disabled hidden>쿠폰을 선택해주세요</option>
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
import Swal from "sweetalert2";

export default {
  data() {
    return {
      grade: "맛잘알",
      userList: [],
      couponList: [],
      selectCoupon: "",
      status: "사용가능",
    };
  },
  created() {
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

    //쿠폰일괄발급
    async insertCoupon() {
      let data = {
        grade: this.grade,
        couponInfo: {
          selectCoupon: this.selectCoupon,
          status: this.status,
        },
      };
      let result = await axios
        .post(`/node/adminusercoupon`, data)
        .catch((err) => {
          console.log(err);
        });
      console.log("뭐가나오니", result);
      if (result.data.result > 0) {
        Swal.fire({
          title: "쿠폰 발급이 완료되었습니다.",
          icon: "success",
        });
      } else if (result.data.result == 0) {
        Swal.fire({
          title: "이미 일괄발급 처리한 쿠폰입니다.",
          icon: "warning",
        });
      } else {
        Swal.fire({
          title: "쿠폰 발급이 완료되지 않았습니다.",
          icon: "error",
        });
      }
    },

    async getCouponList() {
      let result = await axios.get(`/node/admincoupon`).catch((err) => {
        console.log(err);
      });
      this.couponList = result.data;
      //console.log(this.couponList);
    },

    async getUserList() {
      let result = await axios
        .get(`/node/adminuser/${this.grade}`)
        .catch((err) => {
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
