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
          <td class="text-center">{{ eventInfo.banner_img }}</td>
        </tr>
        <tr>
          <th>메인이미지</th>
          <td class="text-center">{{ eventInfo.main_img }}</td>
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
        .get(`/node/event/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result);
      this.eventInfo = result.data;
    },

    updateInfo(no) {
      this.$router.push({ path: "/admin/eventModify", query: { No: no } });
    },

    confirmdelete() {
      let result = confirm("정말삭제할래?");
      if (result) {
        this.deleteInfo();
      } else {
        alert("삭제취소~~@!");
      }
    },
    async deleteInfo() {
      let result = await axios
        .delete(`/node/event/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log(result.data);
      let count = result.data.affectedRows;
      if (count == 0) {
        alert("정상적으로 삭제xxxxxxxxxxxx");
      } else {
        alert("정상적으로 됨!!!!!!!");
        this.$router.push({ name: "eventList" });
      }
    },
  }, //메소드
}; //export
</script>
