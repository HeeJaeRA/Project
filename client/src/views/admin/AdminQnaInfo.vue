<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
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
    <!--답변완료면 답변보여주기-->
    <div v-if="qnaInfo.qna_status == '답변완료'">
      <AdminAnswerInfo v-bind:qnaCode="this.searchNo" />
    </div>
    <!--답변 대기면 답변등록 버튼 -->
    <div v-if="qnaInfo.qna_status == '답변대기'">
      <button
        class="btn btn-primary"
        style="margin-left: 15px"
        v-if="btn"
        type="button"
        @click="show"
      >
        답변등록
      </button>

      <!--답변 등록 버튼을 누르면 보이는 -->
      <div class="list-group-item" v-if="reply">
        <h6 for="content" style="margin-botton: 10px; margin-left: 15px">
          답변내용
        </h6>
        <textarea
          class="textarea"
          rows="3"
          cols="70"
          v-model="replytext"
          style="margin-left: 15px; margin-bottom: 10px"
        />
        <br />
        <button
          class="btn btn-primary"
          style="margin-left: 15px"
          type="button"
          @click="insertReply()"
        >
          답변등록
        </button>

        <button
          class="btn btn-warning"
          style="margin-left: 6px"
          type="button"
          @click="show"
        >
          취소
        </button>
      </div>
    </div>

    <div>
      <button
        class="btn btn-secondary"
        style="margin-top: 15px; margin-left: 15px"
        type="button"
        @click="this.$router.go(-1)"
      >
        목록으로
      </button>
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
          writer: "admin",
        },
      };

      let result = await axios.post("/node/adminQnaInsert", data);
      console.log(result);
      if (result.data.result > 0) {
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
        .get(`/node/adminQnaInfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.qnaInfo = result.data;
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
  },
};
</script>

<style>
.textarea {
  resize: none;
}
</style>
