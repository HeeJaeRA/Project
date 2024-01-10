<template>
  <div class="container" style="margin: 0 auto">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="margin: auto; margin-bottom: 30px; width: 150%">
          이벤트 등록
        </h5>
        <tr>
          <th>배너이미지</th>
          <td class="text-center">
            <input type="file" name="files" @change="handleFileChange" />
          </td>
        </tr>

        <tr>
          <th>메인이미지</th>
          <td class="text-center">
            <input type="file" name="files" @change="handleFileChange2" />
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
            <input
              type="date"
              ref="target"
              data-placeholder="날짜 선택"
              v-model="eventInfo.eventend_date"
            />
          </td>
        </tr>

        <tr>
          <th>이벤트내용</th>
          <td class="text-center">
            <textarea rows="7" v-model="eventInfo.content" />
          </td>
        </tr>

        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            <input type="text" v-model="couponInfo.coupon_name" />
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            <input type="number" v-model="couponInfo.discount_rate" /> %
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
            <input
              type="date"
              data-placeholder="날짜 선택"
              v-model="couponInfo.end_date"
            />
          </td>
        </tr>
      </table>
    </div>

    <div>
      <button
        class="btn btn-primary"
        @click="uploadFile()"
        style="
          margin-left: 50%;
          margin-right: 5px;
          padding: 10px;
          background-color: #b0c4de;
          border-color: #b0c4de;
        "
      >
        등록
      </button>
      <button
        class="btn btn-warning text-white"
        style="
          margin-left: 0%;
          padding: 10px;
          background-color: #ccc;
          border-color: #ccc;
        "
        @click="this.$router.go(-1)"
      >
        취소
      </button>
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

      // for (let key in this.couponInfo) {
      //   formData.append(key, this.couponInfo[key]);
      // }

      // for (let key in this.eventInfo) {
      //   formData.append(key, this.eventInfo[key]);
      // }

      const couponInfo = JSON.stringify(this.couponInfo);
      formData.append(`couponInfo`, couponInfo);

      const eventInfo = JSON.stringify(this.eventInfo);
      formData.append(`eventInfo`, eventInfo);

      let result = await axios.post("/node/eventPhoto", formData);
      console.log(result);
      if (result.data.insertId > 0) {
        Swal.fire({
          title: "이벤트가 등록되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "eventList" });
      } else {
        Swal.fire({
          icon: "error",
          title: "이벤트 등록에 실패하였습니다.",
        });
      }
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
  }, //메서드
};
</script>
<style scoped>
.container {
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 30px;
}

.form-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  width: 20%;
  background-color: #f2f2f2;
}

select {
  width: 100%;
  padding: 10px;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="number"],
input[type="date"] {
  width: 30%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: center;
}

input[type="text"],
textarea,
input[type="file"] {
  text-align: center;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.textarea {
  resize: none;
}
</style>
