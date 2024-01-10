<template>
  <div class="container" style="margin: 0 auto; padding: 30px">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="margin: auto; margin-bottom: 30px; width: 170%">
          이벤트 상세 조회
        </h5>
        <tr>
          <th>배너이미지</th>
          <img
            :src="`/node/public/uploads/${eventInfo.banner_img}`"
            width="90%"
          />
        </tr>
        <tr>
          <th>메인이미지</th>
          <img
            style="display: block; margin: 0 auto"
            :src="`/node/public/uploads/${eventInfo.main_img}`"
            width="90%"
          />
        </tr>

        <tr>
          <th>이벤트제목</th>
          <td class="text-center">{{ eventInfo.title }}</td>
        </tr>

        <tr>
          <th>이벤트시작일</th>
          <td class="text-center">
            {{ $dateFormat(eventInfo.start_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th>이벤트종료일</th>
          <td class="text-center">
            {{ $dateFormat(eventInfo.end_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th>이벤트내용</th>
          <td class="text-center">
            {{ eventInfo.content }}
          </td>
        </tr>

        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            {{ eventInfo.coupon_name }}
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">{{ eventInfo.discount_rate }}%</td>
        </tr>

        <tr>
          <th>쿠폰시작일</th>
          <td class="text-center">
            {{ $dateFormat(eventInfo.start_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th>쿠폰종료일</th>
          <td class="text-center">
            {{ $dateFormat(eventInfo.end_date, "yyyy-MM-dd") }}
          </td>
        </tr>
      </table>
      <div style="margin-left: 47%; margin-top: 50px">
        <button
          class="btn btn-primary"
          style="
            margin-right: 5px;
            background-color: #b0c4de;
            border-color: #b0c4de;
          "
          @click="updateInfo(eventInfo.event_code)"
        >
          수정
        </button>
        <button
          class="btn btn-warning text-white"
          style="margin-right: 5px; background-color: #ccc; border-color: #ccc"
          @click="confirmdelete()"
        >
          삭제
        </button>
        <button
          class="btn btn-secondary"
          type="button"
          @click="this.$router.go(-1)"
        >
          목록으로
        </button>
      </div>
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
      eventInfo: {},
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getEventInfo();
  },

  methods: {
    async getEventInfo() {
      let result = await axios
        .get(`/node/adminevent/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result);
      this.eventInfo = result.data;
    },

    updateInfo(no) {
      this.$router.push({ path: "/admin/eventModify", query: { No: no } });
    },

    confirmdelete() {
      Swal.fire({
        title: "정말로 삭제하시겠습니까?",
        text: "삭제한 이벤트는 다시 복구가 불가합니다.",
        icon: "warning",

        showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
        confirmButtonColor: "#3085d6", // confrim 버튼 색깔 지정
        cancelButtonColor: "#d33", // cancel 버튼 색깔 지정
        confirmButtonText: "승인", // confirm 버튼 텍스트 지정
        cancelButtonText: "취소", // cancel 버튼 텍스트 지정
      }).then((result) => {
        // 만약 Promise리턴을 받으면,
        if (result.isConfirmed) {
          // 만약 모달창에서 confirm 버튼을 눌렀다면
          this.deleteInfo();
        }
      });
    },
    async deleteInfo() {
      let result = await axios
        .delete(`/node/adminevent/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
      if (count == 0) {
        Swal.fire({
          title: "이벤트가 삭제되지 않았습니다.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "이벤트가 삭제되었습니다.",
          icon: "success",
        });
        this.$router.push({ name: "eventList" });
      }
    },
  }, //메소드
}; //export
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
