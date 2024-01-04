<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tr>
          <th></th>
          <td class="text-center">{{ eventInfo.event_code }}</td>
        </tr>
        <tr>
          <th>배너이미지</th>
          <img
            :src="`http://localhost:3000/public/uploads/${eventInfo.banner_img}`"
            width="200px"
            height="200px"
          />
        </tr>
        <tr>
          <th>메인이미지</th>
          <img
            :src="`http://localhost:3000/public/uploads/${eventInfo.main_img}`"
            width="200px"
            height="200px"
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

        <p>쿠폰정보</p>

        <tr>
          <th>쿠폰명</th>
          <td class="text-center">
            {{ eventInfo.coupon_name }}
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            {{ eventInfo.discount_rate }}
          </td>
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
    </div>
    <button @click="updateInfo(eventInfo.event_code)">수정</button>
    <button @click="confirmdelete()">삭제</button>
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
