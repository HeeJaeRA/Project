<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tr>
          <th class="text-right table-primary"></th>
          <td class="text-center">{{ eventInfo.event_code }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">배너이미지</th>
          <td class="text-center">{{ eventInfo.banner_img }}</td>
        </tr>
        <tr>
          <th class="text-right table-primary">메인이미지</th>
          <td class="text-center">{{ eventInfo.main_img }}</td>
        </tr>

        <tr>
          <th class="text-right table-primary">이벤트시작일</th>
          <td class="text-center">
            {{ $dateFormat(eventInfo.start_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th class="text-right table-primary">이벤트종료일</th>
          <td class="text-center">
            {{ $dateFormat(eventInfo.end_date, "yyyy-MM-dd") }}
          </td>
        </tr>

        <tr>
          <th class="text-right table-primary">이벤트제목</th>
          <td class="text-center">{{ eventInfo.title }}</td>
        </tr>

        <tr>
          <th class="text-right table-primary">내용</th>
          <td class="text-center">
            {{ eventInfo.content }}
          </td>
        </tr>
      </table>
    </div>

    <div class="row">
      <button class="btn btn-info" @click="updateInfo(boardInfo.no)">
        수정
      </button>
      <!-- <button class="btn btn-info" @click="deleteInfo()">삭제</button>-->
    </div>
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

    // updateInfo(no) {
    //   this.$router.push({ path: "/boardForm", query: { boardNo: no } });
    // },
  }, //메소드
}; //export
</script>
