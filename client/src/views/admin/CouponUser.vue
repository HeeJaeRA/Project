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
    <option value="" selected disabled hidden>쿠폰을 선택해주세요</option>
    <option
      :key="idx"
      :value="item.coupon_code"
      v-for="(item, idx) in couponList"
      @change="cname"
    >
      {{ item.coupon_name }}
    </option>
  </select>

  <button @click="insertCoupon">쿠폰일괄발급</button>
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
      userList: [],
      couponList: [],
      selectCoupon: "",
      status: "사용가능",
      couponName: "",
    };
  },
  created() {
    //전체 회원목록 출력
    this.getUserList();
    this.getCouponList();
  },

  methods: {
    // cname(e) {
    //   console.log(e.target.value);
    // },
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

    // confirmdelete() {
    //   Swal.fire({
    //     title: "쿠폰을 일괄 발급하시겠습니까?",
    //     text: "발급된 쿠폰은 다시 회수가 불가합니다.",
    //     icon: "warning",

    //     showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
    //     confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
    //     cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
    //     confirmButtonText: "승인", // confirm 버튼 텍스트 지정
    //     cancelButtonText: "취소", // cancel 버튼 텍스트 지정
    //   }).then((result) => {
    //     // 만약 Promise리턴을 받으면,
    //     if (result.isConfirmed) {
    //       // 만약 모달창에서 confirm 버튼을 눌렀다면
    //       this.deleteInfo();
    //     }
    //   });
    // },

    async insertCoupon() {
      let data = {
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

      //console.log(result);

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
    //쿠폰전체목록 불러오기
    async getCouponList() {
      let result = await axios.get(`/node/admincoupon`).catch((err) => {
        console.log(err);
      });
      this.couponList = result.data;
      console.log(this.couponList);
    },
    //활동회원조회
    async getUserList() {
      let result = await axios.get(`/node/adminuser`).catch((err) => {
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
