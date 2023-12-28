<template>
  <div class="container">
    <div class="row">
      <table class="table">
        <tr>
          <th>배너이미지</th>
          <td class="text-center">
            <input type="file" name="avatar" />
          </td>
        </tr>

        <tr>
          <th>메인이미지</th>
          <td class="text-center">
            <input type="file" name="avatar" />
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
            <input type="date" v-model="eventInfo.start_date" />
          </td>
        </tr>

        <tr>
          <th>이벤트종료일</th>
          <td class="text-center">
            <input type="date" v-model="eventInfo.end_date" />
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
            <input type="text" v-model="eventInfo.coupon_name" />
          </td>
        </tr>

        <tr>
          <th>할인율</th>
          <td class="text-center">
            <input type="number" v-model="eventInfo.discount_rate" />
          </td>
        </tr>

        <tr>
          <th>쿠폰시작일</th>
          <td class="text-center">
            <input type="date" v-model="eventInfo.start_date" />
          </td>
        </tr>

        <tr>
          <th>쿠폰종료일</th>
          <td class="text-center">
            <input type="date" v-model="eventInfo.end_date" />
          </td>
        </tr>
      </table>
    </div>

    <!-- <div class="row">
      <button @click="isUpdated ? eventUpdate() : eventInsert()">저장</button>
    </div> -->

    <div class="row">
      <button @click="eventInsert()">저장</button>
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
        start_date: "",
        end_date: "",
        title: "",
        content: "",
        event_code: "205",
        write_date: this.getToday(),
        writer: "관리자",
        coupon_code: "201",
        coupon_name: "",
        discount_rate: "",
      },
    };
  },

  //   created() {
  //     this.searchNo = this.$route.query.boardNo;

  //     if (this.searchNo > 0) {
  //       this.getBoardInfo();
  //       this.isUpdated = true;
  //     } else {
  //       this.boardInfo.created_date = this.getToday(); //등록할때 찍어주기
  //     }
  //   },

  methods: {
    // async getBoardInfo() {
    //   let result = await axios
    //     .get(`/api/board/${this.searchNo}`)
    //     .catch((err) => console.log(err));
    //   this.boardInfo = result.data; //한건 객체 조회되어서 들어와있음
    //   this.boardInfo.created_date = this.$dateFormat(
    //     this.boardInfo.created_date,
    //     "yyyy-MM-dd" //변화작업추가
    //   );
    // },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },

    async eventInsert() {
      let data = {
        param: this.eventInfo,
      };
      let result = await axios.post("/node/event", data);
      if (result.data.affectedRows > 0) {
        alert("정상적으로 처리되었습니다.");
        this.$router.push({ name: "eventList" });
      } else {
        alert("정상적으로 처리되지 않았습니다.");
      }
    },

    // //수정
    // async boardUpdate() {
    //   let data = {
    //     param: {
    //       title: this.boardInfo.title,
    //       writer: this.boardInfo.writer,
    //       content: this.boardInfo.content,
    //     },
    //   };
    //   let result = await axios.put(`/api/board/${this.boardInfo.no}`, data);
    //   if (result.data.changedRows > 0) {
    //     alert("정상적으로 수정되었습니다.");
    //     this.$router.push({ name: "boardList" });
    //   } else {
    //     alert("정상적으로 수정되지 않았습니다.");
    //   }
    // },
  }, //메서드
};
</script>
