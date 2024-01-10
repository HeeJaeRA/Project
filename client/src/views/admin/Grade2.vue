<template>
  <!--등급에 맞는 회원만 출력-->
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="font-family: 나눔고딕; margin-bottom: 30px">회원목록</h5>
    <router-link to="/admin/couponList"
      ><a
        class="btn btn-success text-white"
        style="
          margin-bottom: 10px;
          background-color: #8fbc8f;
          border-color: white;
        "
        >쿠폰관리 >
      </a></router-link
    >
    <br />
    <button
      class="btn btn-secondary"
      style="margin-right: 5px; margin-bottom: 10px"
      @click="fullList()"
    >
      전체회원
    </button>
    <button
      class="btn btn-secondary"
      style="
        margin-right: 5px;
        margin-bottom: 10px;
        background-color: #bf82bf;
        border-color: #bf82bf;
      "
      @click="grade1()"
    >
      맛초보
    </button>
    <button
      class="btn btn-secondary"
      style="
        margin-right: 5px;
        margin-bottom: 10px;
        background-color: #bf82bf;
        border-color: #bf82bf;
      "
      @click="grade2()"
    >
      맛잘알
    </button>
    <button
      class="btn btn-secondary"
      style="
        margin-right: 5px;
        margin-bottom: 10px;
        background-color: #bf82bf;
        border-color: #bf82bf;
      "
      @click="grade3()"
    >
      쩝쩝박사
    </button>

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
    <div style="margin-left: 40%">
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

      <button
        class="btn btn-secondary"
        style="
          margin-left: 20px;
          text-aline: center;
          background-color: #b0c4de;
          border-color: white;
          color: white;
          border-radius: 20px;
        "
        @click="insertCoupon"
      >
        일괄발급
      </button>
    </div>
  </div>
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
<style scoped>
select {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 200px;
  padding: 0.5em 0.5em;
  font-family: inherit;
  background: url(https://farm1.staticflickr.com/379/19928272501_4ef877c265_t.jpg)
    no-repeat 95% 50%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #999;
  border-radius: 0px;
}
select::-ms-expand {
  /* for IE 11 */
  display: none;
}

select:hover {
  border-color: #888;
}

select:focus {
  border-color: #aaa;

  color: #222;
  outline: none;
}

select:disabled {
  opacity: 0.5;
}

.btn-11 {
  overflow: hidden;
  transition: all 0.3s ease;
}
.btn-11:hover {
  background: #423e3e;
  color: #fff;
}
.btn-11:before {
  position: absolute;
  content: "";
  display: inline-block;
  top: -180px;
  left: 0;
  width: 30px;
  height: 100%;
  background-color: #fff;
  animation: shiny-btn1 3s ease-in-out infinite;
}
.btn-11:active {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, 0.3),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.2),
    inset 4px 4px 6px 0 rgba(0, 0, 0, 0.2);
}
</style>
