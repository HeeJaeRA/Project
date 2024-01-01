<template>
  <div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="container">
            <div class="row text-start">
              답변일자: {{ $dateFormat(answerList.write_date, "yyyy-MM-dd") }}
            </div>
            <div v-if="content">
              {{ answerList.content }}
            </div>
            <div v-if="modifyform">
              <textarea v-model="modifycontent" />
            </div>
            <button type="button" @click="modify">답변수정</button>

            <button type="button">답변삭제</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["qnaCode"],
  data() {
    return {
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
    modify() {
      this.content = !this.content;
      this.modifyform = !this.modifyform;
      this.modifycontent = this.answerList.content;
    },
    async getAnswerList() {
      let result = await axios
        .get(`/node/answer?bno=${this.qnaCode}`)
        .catch((err) => console.log(err));
      console.log(result);
      this.answerList = result.data;
    },
  },
};
</script>

<style></style>
