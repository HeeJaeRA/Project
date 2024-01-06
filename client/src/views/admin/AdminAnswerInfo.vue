<template>
  <div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="container">
            <div class="row text-start">
              답변일자: {{ $dateFormat(answerList.write_date, "yyyy-MM-dd") }}
              <p v-if="answerList.cnt != null">
                {{ "[" + answerList.cnt + "]" }}
              </p>
            </div>

            <div v-if="content">
              {{ answerList.content }}
            </div>

            <div v-if="modifyform">
              <textarea v-model="modifycontent" />
              <br />
              <button type="button" @click="insertModify">수정하기</button>
              <button type="button" @click="modify">취소</button>
            </div>

            <button v-if="btn" type="button" @click="modify">답변수정</button>
            <button v-if="dbtn" type="button" @click="confirmdelete">
              답변삭제
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["qnaCode"],
  data() {
    return {
      dbtn: true,
      btn: true,
      modifycontent: "",
      modifyform: false,
      content: true,
      answerList: {},
    };
  },
  created() {
    this.getAnswerList();
  },
  methods: {
    confirmdelete() {
      Swal.fire({
        title: "정말로 삭제하시겠습니까?",
        text: "삭제한 답변은 다시 복구가 불가합니다.",
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
          this.deleteR();
        }
      });
    },

    async deleteR() {
      //해당 질문글 답변대기로 다시 업데이트
      let data = {
        data: {
          ans_code: this.answerList.ans_code,
        },
      };
      let result = await axios.delete(
        `/node/adminReplyDelete/${this.answerList.qna_code}`,
        data
      );
      //than 써도된대... 값을 순차적으로

      //console.log(result.data.result);
      if (result.data.result > 0) {
        Swal.fire({
          title: "답변이 삭제되었습니다.",
          icon: "success",
        });
        this.$parent.boardQnaInfo();
      } else {
        Swal.fire({
          title: "답변이 삭제되지 않았습니다.",
          icon: "error",
        });
      }
    },
    async insertModify() {
      let data = {
        param: {
          content: this.modifycontent,
          cnt: "수정됨",
        },
      };

      let result = await axios.put(
        `/node/adminReplyModify/${this.answerList.qna_code}`,
        data
      );

      //console.log(this.answerList.qna_code);

      if (result.data.changedRows > 0) {
        Swal.fire({
          title: "답변 수정이 완료되었습니다.",
          icon: "success",
        });
        this.modify();
        this.getAnswerList();
      } else {
        Swal.fire({
          title: "수정이 완료되지 않았습니다.",
          icon: "error",
        });
        this.modify();
        this.getAnswerList();
      }
    },
    modify() {
      //수정버튼 누르면
      this.dbtn = !this.dbtn; //삭제버튼 숨기고
      this.btn = !this.btn; //답변수정버튼 숨기고
      this.content = !this.content; //원래 답변 숨기고
      this.modifyform = !this.modifyform; //수정인풋박스띄우고
      this.modifycontent = this.answerList.content; //인풋박스에 원래값 바인딩
    },
    async getAnswerList() {
      let result = await axios
        .get(`/node/adminAnswerinfo?bno=${this.qnaCode}`)
        .catch((err) => console.log(err));
      //console.log(result);
      this.answerList = result.data;
    },
  },
};
</script>

<style></style>
