<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>글번호</th>
          <td>{{ qnaInfo.qna_code }}</td>
          <th>작성일시</th>
          <td colspan="3">{{ getDateFormat(qnaInfo.write_date) }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td>{{ qnaInfo.title }}</td>
          <th>답변상태</th>
          <td>{{ qnaInfo.qna_status }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="5">
            <pre>{{ qnaInfo.content }}</pre>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="qnaInfo.qna_status == '답변완료'">
      <AdminAnswerInfo v-bind:qnaCode="this.searchNo" />
    </div>

    <div v-if="qnaInfo.qna_status == '답변대기'">
      <button v-if="btn" type="button" @click="show">답변등록</button>
      <div v-if="reply">
        <form>
          <label for="content">답변내용</label>
          <textarea v-model="replytext" />
          <button type="button" @click="insertReply()">답변등록</button>
          <button type="button" @click="show">취소</button>
        </form>
      </div>
    </div>

    <div>
      <button type="button" @click="this.$router.go(-1)">뒤로가기</button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import AdminAnswerInfo from "../admin/AdminAnswerInfo.vue";

export default {
  data() {
    return {
      btn: true,
      reply: false,
      searchNo: "",
      replytext: "",
      qnaInfo: {},
    };
  },
  components: {
    AdminAnswerInfo,
  },
  created() {
    this.searchNo = this.$route.query.qnaCode;
    this.boardQnaInfo();
  },
  methods: {
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
    async insertReply() {
      let data = {
        param: {
          content: this.replytext,
          write_date: this.getToday(),
          ans_code: this.qnaInfo.qna_code,
        },
      };

      let result = await axios.post("/node/adminQnaInsert", data);
      if (result.status == 200) {
        console.log(result);
        Swal.fire({
          title: "답변이 등록되었습니다.",
          icon: "success",
        });
        this.show();
        this.boardQnaInfo();
      } else {
        Swal.fire({
          title: "답변 등록이 실패되었습니다.",
          icon: "error",
        });
        this.show();
      }
    },
    show() {
      this.reply = !this.reply; // true
      this.btn = !this.btn; // false
    },
    async boardQnaInfo() {
      let result = await axios
        .get(`/node/qna/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.qnaInfo = result.data;
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
  },
};
</script>

<style></style>
