<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tr>
          <th>배너이미지</th>
          <td class="text-center">
            <input type="file" />
          </td>
        </tr>

        <tr>
          <th>메인이미지</th>
          <td class="text-center">
            <input type="file" />
          </td>
        </tr>

        <tr>
          <th>이벤트제목</th>
          <td class="text-center">
            <input type="text" v-model="eventInfo.title" />
          </td>
        </tr>

        <tr>
          <th>이벤트시작일</th>
          <td class="text-center">
            <input type="date" v-model="eventInfo.eventstart_date" />
          </td>
        </tr>

        <tr>
          <th>이벤트종료일</th>
          <td class="text-center">
            <input type="date" v-model="eventInfo.eventend_date" />
          </td>
        </tr>

        <tr>
          <th>이벤트내용</th>
          <td class="text-center">
            <input type="text" v-model="eventInfo.content" />
          </td>
        </tr>

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

export default {
  data() {
    return {
      isUpdated: false,
      searchNo: "",
      eventInfo: {
        banner_img: "",
        main_img: "",
        eventstart_date: "",
        eventend_date: "",
        title: "",
        content: "",
        write_date: this.getToday(),
        writer: "관리자",
        coupon_code: "", //값 받아서 넣어야함
      },

      couponInfo: {
        coupon_name: "",
        discount_rate: "",
        start_date: "",
        end_date: "",
      },
    };
  },

  methods: {
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },

    async couponInsert() {
      let data = {
        param: this.couponInfo,
      };
      let result = await axios.post("/node/coupon", data);
      if (result.data.insertId > 0) {
        this.eventInfo.coupon_code = result.data.insertId;
        this.eventInsert();
      } else {
        alert("쿠폰인서트..정상적으로 처리되지 않았습니다.");
      }
    },

    async eventInsert() {
      let data = {
        param: this.eventInfo,
      };
      let result = await axios.post("/node/event", data);
      console.log(result.data);
      if (result.data.insertId > 0) {
        alert("정상적으로 처리되었습니다.");
        this.$router.push({ name: "eventList" });
      } else {
        alert("정상적으로 처리되지 않았습니다.");
      }
    },
  }, //메서드
};
</script>
