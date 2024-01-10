<template>
  <div class="container px-4 px-lg-5 my-5" id="bookbook">
    <!-- <p>{{ userId }}</p>
    <p>{{ restList }}</p> -->
    <!-- <p>{{ "휴무일 출력 ==> " + restList.holiday }}</p> -->

    <h3 style="font-family: JalnanGothic">Reservation</h3>
    <section class="date_time">
      <div class="dateCal">
        <vue-datepicker
          v-model="selectedDate"
          inline
          auto-apply
          :min-date="getMin()"
          :max-date="getMax()"
          :enable-time-picker="false"
          :disabled-week-days="getHoli(restList.holiday)"
          @input="onDateSelected"
        >
        </vue-datepicker>
      </div>
      <div class="set">
        <div>
          <p>
            <img src="../../assets/images/cal.png" />
            선택한 날짜 >>
            <span v-if="selectedDate" style="color: #de490f">{{
              formatSelectedDate(selectedDate)
            }}</span>
          </p>
        </div>
        <div class="time">
          <h4><img src="../../assets/images/clock.png" /> 시간을 선택하세요</h4>
          <div class="time_pic2" v-for="(time, i) in timeList" :key="i">
            <label :for="sel" class="time_sel" v-if="selectedDate">
              <input
                type="radio"
                v-model="selectTime"
                :value="time"
                :id="sel"
                @change="getSeat"
              />
              <span>{{ time.time + " : 00" }}</span>
            </label>
          </div>
          <br />
          <!-- <button @click="getSeat">좌석수확인</button> -->
          <!-- <p>시간값 : {{ selectTime.time }}</p> -->
          <!-- <p>시간값 : {{ setTimeSelect }}</p> -->
        </div>

        <div class="seat">
          <h4>
            <img src="../../assets/images/person.png" />
            인원 수를 선택해주세요
            <span class="cntCnt"
              >( 예약완료: {{ nowCnt }} / 잔여: {{ restCnt }} )</span
            >
          </h4>
          <div class="cnt_view">
            <div class="cnt_list" v-for="(inwon, i) in this.restCnt" :key="i">
              <label class="cnt" :for="sel2">
                <input
                  type="radio"
                  v-model="selectSeat"
                  id="sel2"
                  :value="inwon"
                />
                <span>{{ inwon.inwon }} {{ inwon }}명</span>
              </label>
            </div>
            <!-- <div>예약 불가 시간입니다.</div> -->
          </div>
          <!-- <p>{{ selectSeat }}</p> -->
        </div>
        <div class="warning_pay">
          <div class="warning">
            <h4>
              <img src="../../assets/images/check.png" /> 예약 시 주의사항
            </h4>
            <h2>
              예약 서비스 이용을 위한 개인정보 수집 및<br />
              제3자 제공 규정을 확인하였으며 이에 동의합니다.
            </h2>
          </div>
          <div class="price">
            <h4><img src="../../assets/images/card.png" /> 총 결제 금액</h4>
            <!-- <p>{{ "업체 좌석수" + RestList.seat_cnt }}</p> -->
            <h5>총 결제 금액은 {{ getTotal(totalPrice) }}원 입니다.</h5>
          </div>
          <div class="payHow">
            <button class="btn1" @click="goPay">결제하기</button>
            <button class="btn2" @click="goCart">장바구니</button>
          </div>
        </div>
      </div>
    </section>
    <div class="line"></div>

    <!-- <hr /> -->
  </div>
</template>

<script>
import VueDatepicker from "@vuepic/vue-datepicker";
import axios from "axios";

export default {
  components: {
    VueDatepicker,
  },
  props: ["rsCode"],
  data() {
    return {
      userId: window.localStorage.getItem("userId"),
      selectedDate: null,
      year: null,
      mon: null,
      day: null,
      thatHoli: [],
      timeList: [],
      selectTime: "",
      selectSeat: 0,
      totalPrice: 0,
      restList: {
        rs_code: 0,
        seat_cnt: 0,
        holiday: "",
        deposit: 0,
      },
      test: "",
      nowCnt: 0,
      restCnt: 0,
      rno: "",
      cartIn: null,
    };
  },
  created() {
    this.rno = this.rsCode;
    this.getRestList();
    this.getTimeList();
  },
  // computed: {
  //   setTimeSelect() {
  //     return this.selectTime.time + ":00";
  //   },
  // },
  watch: {
    selectedDate: function () {
      this.selectTime = "";
      this.nowCnt = 0;
      this.restCnt = 0;
      this.selectSeat = 0;
    },
  },
  methods: {
    async getRestList() {
      this.restList = (
        await axios
          .get(`/node/book/${this.rno}`)
          .catch((err) => console.log(err))
      ).data;
    },
    async getTimeList() {
      this.timeList = (
        await axios
          .get(`/node/book/getTime/${this.rno}`)
          .catch((err) => console.log(err))
      ).data;
    },
    onDateSelected(selectedDate) {
      console.log("Selected Date:", selectedDate);
    },
    formatSelectedDate(date) {
      this.splitDate(date);
      return date ? date.toISOString().split("T")[0] : "";
    },
    splitDate(date) {
      let day = date ? date.toISOString().split("T")[0] : "";
      let realYear = day.split("-")[0];
      let realMon = day.split("-")[1];
      let realDay = day.split("-")[2];

      return (this.year = realYear), (this.mon = realMon), (this.day = realDay);
    },
    getMin() {
      let now = new Date(); // 현재 날짜 및 시간
      let tomorrow = new Date(now.setDate(now.getDate() + 1)); // 내일
      return tomorrow;
    },
    getMax() {
      let now = new Date(); // 현재 날짜 및 시간
      let oneMonthLater = new Date(now.setMonth(now.getMonth() + 2)); // 두달 후
      return oneMonthLater;
    },
    getTotal(data) {
      //   console.log(this.RestList.seat_cnt);
      //   console.log(this.selectSeat);
      data = this.restList.deposit * this.selectSeat;
      console.log(data);
      return (this.totalPrice = data);
    },
    getHoli(holi) {
      let holiholi = holi.split("");
      console.log(holiholi);
      return (this.thatHoli = holiholi);
    },
    async goCart() {
      let result = await axios
        .post("/node/book/goCart", {
          param: {
            reserve_year: this.year,
            reserve_month: this.mon,
            reserve_day: this.day,
            reserve_time: this.selectTime.time,
            head_cnt: this.selectSeat,
            user_id: this.userId,
            amount: this.totalPrice,
            rs_code: this.rno,
          },
        })
        .catch((err) => console.log(err));
      // 지금 좌석이랑 합쳐져서 계산된 값...
      // console.log("지금 예약한 값이랑 더해진 좌석 값" + result.data[1]);
      // this.nowCnt = result.data[1];
      this.$swal
        .fire({
          title: "예약완료!",
          text: "장바구니로 이동하시겠습니까?",
          icon: "success",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$router.push({ path: "/cart" });
          } else {
            this.selectedDate = null;
            this.nowCnt = 0;
            this.restCnt = 0;
            this.selectSeat = 0;
          }
        });

      // this.$swal.fire({
      //   icon: "success",
      //   title: "장바구니에 담겼습니다.",
      // });
      console.log("지금 예약한 값이랑 더해진 좌석 값" + result.data[1]);
      this.nowCnt = result.data[1];
    },
    async goPay() {
      // this.$swal
      //   .fire({
      //     title: "즉시결제",
      //     text: "결제 하시겠습니까?",
      //     icon: "info",
      //     showCancelButton: true,
      //     confirmButtonColor: "#3085d6",
      //     cancelButtonColor: "#d33",
      //     confirmButtonText: "Yes",
      //   })
      //   .then((result) => {
      //     if (result.isConfirmed) {
      //       this.$router.push({ path: "/cart" });
      //     }
      //   });
      let result = await axios
        .post("/node/book/goCart", {
          param: {
            reserve_year: this.year,
            reserve_month: this.mon,
            reserve_day: this.day,
            reserve_time: this.selectTime.time,
            head_cnt: this.selectSeat,
            user_id: this.userId,
            amount: this.totalPrice,
            rs_code: this.rno,
          },
        })
        .catch((err) => console.log(err));
      console.log(result.data.insertId);

      this.$router.push({
        path: "/pay",
        query: { resNo: result.data.insertId },
      });
    },
    async getSeat() {
      let result = await axios
        .get(
          `/node/book/getSeat/${this.rno}/${this.selectTime.time}/${this.day}/${this.mon}/${this.year}`
        )
        .catch((err) => console.log(err));
      this.nowCnt = result.data.seat_cnt;
      this.restCnt = this.restList.seat_cnt - this.nowCnt;
    },
  },
};
</script>
<style scoped>
.line {
  height: 10px;
  box-shadow: 0 4px 4px -4px #00000086;
}
.cntCnt {
  color: #808080;
  font-size: smaller;
}
.time {
  height: 180px;
}
.seat {
  height: 120px;
}
.date_time {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 400px;
  margin-bottom: 80px;
}
.dateCal {
  display: inline;
  width: 22%;
  text-align: center;
  margin-right: 0;
}
.set {
  width: 74%;
}
.warning_pay {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.warning {
  width: 38%;
  margin-right: 25px;
}
.warning > h2 {
  font-weight: right;
  color: #808080;
  font-size: 14px;
}
.price {
  width: 37%;
}
.payHow {
  width: 25%;
  display: flex;
  justify-content: right;
  margin-top: 22px;
}
.payHow > .btn1 {
  height: 40px;
  border: none;
  background-color: #de490f;
  color: #fff;
}
.payHow > .btn1:hover {
  height: 40px;
  border: none;
  background-color: #f3652d;
  color: #fff;
}
.payHow > .btn2 {
  height: 40px;
  border: none;
  background-color: #242424;
  color: #fff;
  margin-left: 5px;
}
.payHow > .btn2:hover {
  height: 40px;
  border: none;
  background-color: #424242;
  color: #fff;
  margin-left: 5px;
}
p {
  font-weight: bold;
}
input[type="radio"] {
  display: none;
}
.time_pic2 {
  display: inline-block;
}
.time_pic2 > .time_sel input[type="radio"] + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border: 1px solid #808080;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: gray;
  text-align: center;
  cursor: pointer;
}
.time_pic2 > .time_sel:hover input[type="radio"] + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border: 1px solid #808080;
  border-radius: 5px;
  background-color: #b9b9b9;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.time_pic2 > .time_sel input[type="radio"]:checked + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #4e4e4e;
  background-color: #3a3a3a;
  color: white;
  text-align: center;
  cursor: pointer;
}
.cnt_view {
  display: flex;
}
.cnt_list > .cnt input[type="radio"] + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border: 1px solid #808080;
  border-radius: 5px;
  background-color: #f0f0f0;
  color: gray;
  text-align: center;
  cursor: pointer;
}
.cnt_list > .cnt:hover input[type="radio"] + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border: 1px solid #808080;
  border-radius: 5px;
  background-color: #b9b9b9;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
.cnt_list > .cnt input[type="radio"]:checked + span {
  display: inline-block;
  padding: 10px 15px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid #4e4e4e;
  background-color: #3a3a3a;
  color: white;
  text-align: center;
  cursor: pointer;
}
</style>
