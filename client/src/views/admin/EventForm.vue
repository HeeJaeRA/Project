<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tr>
          <th>배너이미지</th>
          <td class="text-center">
            <input
              type="file"
              name="files"
              @change="handleFileChange"
              multiple
            />
          </td>
        </tr>

        <tr>
          <th>메인이미지</th>
          <td class="text-center">
            <input
              type="file"
              name="files"
              @change="handleFileChange2"
              multiple
            />
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
      <button @click="uploadFile()">등록</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchNo: "",
      eventInfo: {
        banner_img: "",
        main_img: "",
        eventstart_date: this.getToday(),
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
        start_date: this.getToday(),
        end_date: "",
      },
    };
  },

  methods: {
    handleFileChange(event) {
      let fname = event.target.files[0]; //이미지파일정보
      this.eventInfo.banner_img = fname;
      // console.log(fname);
    },

    handleFileChange2(event) {
      let fname = event.target.files[0]; //이미지파일정보
      this.eventInfo.main_img = fname;
      //console.log(fname);
    },

    async uploadFile() {
      let formData = new FormData();
      formData.append(`files`, this.eventInfo.banner_img);
      formData.append(`files`, this.eventInfo.main_img);

      const blob = new Blob([JSON.stringify(this.couponInfo)], {
        type: "application/json",
      });
      formData.append("info", blob);

      // formData.append(`couponObj`, this.couponInfo);
      // formData.append(`eventObj`, this.eventInfo);

      for (let key of formData.keys()) {
        console.log(key, ":", formData.get(key));
      }

      let result = await axios.post("/node/eventPhoto", formData);
      if ((result.status = 200)) {
        Swal.fire({
          title: "업로드 완료",
          icon: "success",
        });
      }
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },

    // async couponInsert() {
    //   let data = {
    //     param: this.couponInfo,
    //   };
    //   let result = await axios.post("/node/admincoupon", data);
    //   if (result.data.insertId > 0) {
    //     this.eventInfo.coupon_code = result.data.insertId;
    //     this.eventInsert();
    //   } else {
    //     Swal.fire({
    //       title: "이벤트가 정상적으로 등록되지 않았습니다.",
    //       icon: "error",
    //     });
    //   }
    // },

    // async eventInsert() {
    //   let data = {
    //     param: this.eventInfo,
    //   };
    //   let result = await axios.post("/node/adminevent", data);
    //   console.log(result.data);
    //   if (result.data.insertId > 0) {
    //     Swal.fire({
    //       title: "이벤트가 정상적으로 등록되었습니다.",
    //       icon: "success",
    //     });
    //     this.$router.push({ name: "eventList" });
    //   } else {
    //     Swal.fire({
    //       title: "이벤트가 정상적으로 등록되지 않았습니다.",
    //       icon: "error",
    //     });
    //   }
    // },
  }, //메서드
};
</script>
