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
      <button @click="couponModify()">수정하기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      mcnt: 0,
      searchNo: "",
      eventInfo: {
        banner_img: "",
        main_img: "",
        eventstart_date: "",
        eventend_date: "",
        title: "",
        content: "",
        write_date: this.getToday(),
      },

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
    this.getEventInfo(); //한건 정보 가져오기
  },

  methods: {
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },

    async getEventInfo() {
      let result = await axios
        .get(`/node/adminevent/${this.searchNo}`)
        .catch((err) => console.log(err));
      // console.log(result);
      this.eventInfo = result.data;
      this.couponInfo = result.data;
      this.eventInfo.eventstart_date = this.$dateFormat(
        this.eventInfo.eventstart_date,
        "yyyy-MM-dd"
      );
      this.eventInfo.eventend_date = this.$dateFormat(
        this.eventInfo.eventend_date,
        "yyyy-MM-dd"
      );
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
      console.log("ㅋㅍ", result.data.changedRows);
      this.mcnt = this.mcnt + result.data.changedRows;
      this.eventModify();
    },

    async eventModify() {
      let data = {
        param: {
          banner_img: this.eventInfo.banner_img,
          main_img: this.eventInfo.main_img,
          eventstart_date: this.eventInfo.eventstart_date,
          eventend_date: this.eventInfo.eventend_date,
          title: this.eventInfo.title,
          content: this.eventInfo.content,
          write_date: this.getToday(),
        },
      };
      let result = await axios.put(
        `/node/adminevent/${this.eventInfo.event_code}`,
        data
      );
      console.log("ㅇㅂㅌ", result.data.changedRows);
      this.mcnt = this.mcnt + result.data.changedRows;
      console.log("mcnt", this.mcnt);
      this.modifyalert();
    },

    modifyalert() {
      if (this.mcnt > 0) {
        Swal.fire({
          title: "수정이 완료되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "eventList" });
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
