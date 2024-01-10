<template>
  <div class="container">
    <h4>EVENT</h4>
    <br />
    <table class="table table-hover">
      <thead>
        <!--<th>작성일자</th>
                    <td>{{ eventInfo.write_date }}</td>-->
        <th>제목</th>
        <td>{{ eventInfo.title }}</td>
        <th>이벤트 시작일</th>
        <td>{{ getDateFormat(eventInfo.eventstart_date) }}</td>
        <th>이벤트 종료일</th>
        <td>{{ getDateFormat(eventInfo.eventend_date) }}</td>
      </thead>
    </table>
    <table class="table table">
      <tbody>
        <tr id="eventimg">
          <img
            :src="`/node/public/uploads/${eventInfo.main_img}`"
            width="1100px"
            height="450px"
          />
        </tr>
        <tr id="eventcontent">
          <td>{{ eventInfo.content }}</td>
        </tr>
        <tr id="eventcoupon">
          <td v-if="eventInfo.eventend_date >= this.getToday()">
            <!-- <button type="button" @click="InsertCoupon()">쿠폰발급</button> -->
            <img
              :src="`/node/public/uploads/쿠폰다운.png`"
              width="1100px"
              height="450px"
              @click="InsertCoupon()"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div id="btn">
      <button
        type="button"
        class="btn btn-outline-secondary"
        @click="BoardEventList()"
      >
        목록으로
      </button>
    </div>
    <button
      class="btn btn-dark rounded-pill px-3"
      style="
        border-radius: 30%;
        text-align: center;
        vertical-align: top;
        width: 100px;
        height: 50px;
        position: fixed;
        bottom: 80px;
        right: 80px;
        font-size: 20px;
      "
      @click="scrollToTop()"
    >
      Top
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchNo: "",
      eventInfo: {},
      couponInfo: {
        user_id: "",
        coupon_code: "",
        coupon_status: "사용가능",
        using_date: null,
      },
      userId: window.localStorage.getItem("userId"),
    };
  },
  created() {
    this.searchNo = this.$route.query.eventCode;
    this.boardEventInfo();
  },
  methods: {
    async boardEventInfo() {
      let result = await axios
        .get(`/node/userevent/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.eventInfo = result.data;
      this.eventInfo.eventend_date = this.$dateFormat(
        this.eventInfo.eventend_date
      );
      this.eventInfo.start_date = this.$dateFormat(
        this.eventInfo.eventstart_date
      );
      console.log(this.eventInfo.eventend_date);
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
    async BoardEventList() {
      this.$router.push({
        path: "/userevent",
      });
    },
    async InsertCoupon() {
      let info = this.getInfo();
      let result = await axios(info).catch((err) => console.log(err));
      console.log("result", result);
      console.log(this.couponInfo.user_id);
      console.log(this.userId);
      console.log("re", result);
      if (this.userId == null) {
        Swal.fire({
          icon: "warning",
          title: "회원만 발급 가능합니다.",
        });
      } else if (result.data.affectedRows > 0) {
        Swal.fire({
          icon: "success",
          title: "쿠폰 정상 발급",
          text: "정상적으로 처리되었습니다.",
        });
      } else if (result.data.warningCount > 0) {
        Swal.fire({
          icon: "warning",
          title: "이미 발급받은 쿠폰입니다.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "처리 실패",
          text: "정상적으로 처리되지 않았습니다.",
        });
      }
    },
    getInfo() {
      let method = "";
      let url = "";
      let data = null;
      method = "post";
      url = `node/userevent`;
      let info = this.couponInfo;
      this.couponInfo.user_id = this.userId;
      this.couponInfo.coupon_code = this.eventInfo.coupon_code;
      console.log(info);
      data = {
        param: this.couponInfo,
      };
      this.$router.push({
        path: `/userevent`,
      });

      return {
        method,
        data,
        url,
      };
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 120px;
}
h4 {
  margin-left: 10px;
  margin-top: 10px;
}
#btn {
  text-align: center;
  margin-bottom: 20px;
}
#eventimg,
#eventcontent,
#eventcoupon {
  text-align: center;
}
#eventcoupon {
  margin: 10px 0 10px 0;
}
</style>
