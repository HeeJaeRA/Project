<template>
  <div class="container">
    {{ userId }}
    <div class="delBox">
      <button class="btn btn-outline-dark mt-auto" @click="delCartAll()">
        예약 전체 비우기
      </button>
    </div>
    <table class="table table-hover">
      <thead>
        <tr>
          <!-- <th> 
            <input type="checkbox" value="all" v-model="allSelected" />
            <label for="all">전체</label>
             <span>check: {{ selectList }}</span>
          </th> -->
          <th>예약번호</th>
          <th>업체이름</th>
          <th>방문날짜</th>
          <th>방문시간</th>
          <th>좌석수</th>
          <th>총금액</th>
          <th>예약일자</th>
          <th>예약상태</th>
          <th>결제</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr :key="i" v-for="(reservation, i) in cartList">
          <!-- <td><input type="checkbox"></td> -->
          <td v-show="false">{{ reservation.rs_code }}</td>
          <td>{{ reservation.reserve_num }}</td>
          <td>{{ reservation.rs_name }}</td>
          <td>
            {{
              `${reservation.reserve_year}년 ${reservation.reserve_month}월 ${reservation.reserve_day}일`
            }}
          </td>
          <td>{{ reservation.reserve_time + " : 00" }}</td>
          <td>{{ reservation.head_cnt }}</td>
          <td>{{ reservation.amount }}</td>
          <td>{{ getDateFormat(reservation.booking_date) }}</td>
          <td>{{ reservation.payment_status }}</td>
          <td>
            <button
              class="btn btn-success"
              @click="goToEachPay(reservation.reserve_num)"
            >
              결제
            </button>
          </td>
          <td>
            <button
              class="btn btn-outline-warning"
              @click="delCartEach(reservation)"
            >
              삭제
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      cartList: [],
      selectList: [],
      userId: window.localStorage.getItem("userId"),
    };
  },
  created() {
    this.getCartList();
  },
  methods: {
    async getCartList() {
      this.cartList = (
        await axios
          .get(`/node/cart/${this.userId}`)
          .catch((err) => console.log(err))
      ).data;
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async delCartAll() {
      let result = await axios
        .delete(`/node/cart/${this.userId}`)
        .catch((err) => console.log(err))
        .then(this.getCartList());
      this.cartList = result.data;
      console.log(result.data);
    },
    async delCartEach(reservation) {
      let resNo = reservation.reserve_num;
      console.log(resNo);
      const obj = {
        seat_cnt: reservation.head_cnt,
        rs_code: reservation.rs_code,
        reserve_time: reservation.reserve_time,
        reserve_day: reservation.reserve_day,
        reserve_month: reservation.reserve_month,
        reserve_year: reservation.reserve_year,
      };
      console.log(obj);
      let result = await axios
        .put(`/node/cart/${resNo}`, obj)
        .catch((err) => console.log(err));

      if (result.data.affectedRows > 0) {
        this.$swal.fire({
          icon: "success",
          title: "삭제되었습니다.",
        });
      } else {
        this.$swal.fire({
          icon: "warning",
          title: "삭제에 실패하였습니다.",
        });
      }
      for (let i = 0; i < this.cartList.length; i++) {
        if (this.cartList[i].reserve_num == resNo) this.cartList.splice(i, 1);
        break;
      }
    },
    async goToEachPay(resNo) {
      this.$router.push({ path: "/pay", query: { resNo: resNo } });
    },
  },
  // computed: {
  //   allSelected: {
  //     //getter
  //     get: function() {
  //       return this.cartList.length === this.selectList.length;
  //     },
  //     //setter
  //     set: function(e) {
  //       this.selectList = e ? this.cartList : [];
  //     },
  //   },
  // }
};
</script>
<style scoped>
table * {
  text-align: center;
}
td {
  line-height: 37px;
}
.delBox {
  margin-bottom: 15px;
  text-align: right;
}
</style>
