<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tr>
          <th>배너이미지</th>
          <td class="text-center">
            <input type="file" ref="fileInput" @change="handleFileChange" />
          </td>
        </tr>

        <tr>
          <th>메인이미지</th>
          <td class="text-center">
            <input type="file" ref="fileInput" @change="handleFileChange2" />
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
import Swal from "sweetalert2";

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
    async handleFileChange(event) {
      let fname = Array.from(event.target.files); //파일이름
      console.log(fname[0].name);
      this.eventInfo.banner_img = fname[0].name;
      console.log(this.eventInfo.banner_img);
    },

    async handleFileChange2(event) {
      let fname = Array.from(event.target.files); //파일이름
      console.log(fname[0].name);
      this.eventInfo.main_img = fname[0].name;
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },

    async couponInsert() {
      let data = {
        param: this.couponInfo,
      };
      let result = await axios.post("/node/admincoupon", data);
      if (result.data.insertId > 0) {
        this.eventInfo.coupon_code = result.data.insertId;
        this.eventInsert();
      } else {
        Swal.fire({
          title: "이벤트가 정상적으로 등록되지 않았습니다.",
          icon: "error",
        });
      }
    },

    async eventInsert() {
      let data = {
        param: this.eventInfo,
      };
      let result = await axios.post("/node/adminevent", data);
      console.log(result.data);
      if (result.data.insertId > 0) {
        Swal.fire({
          title: "이벤트가 정상적으로 등록되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "eventList" });
      } else {
        Swal.fire({
          title: "이벤트가 정상적으로 등록되지 않았습니다.",
          icon: "error",
        });
      }
    },
  }, //메서드
};
</script>
