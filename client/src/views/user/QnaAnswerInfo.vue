<template>
  <div>
    <div class="card-body" v-if="this.answerList[0] != null">
      <hr />
      <div class="row text-start">
        <div v-if="answerList.qna_status == '답변완료'">
          <p
            class="badge bg-light text-black position-absolute-left; font-weight: bold"
          >
            답변완료
          </p>
          {{ getDateFormat(answerList.write_date) }}
          <span
            v-if="answerList.cnt != null"
            style="padding-left: 10px; font-weight: 200"
          >
            {{ " " + "[" + answerList.cnt + "]" }}
          </span>
        </div>
      </div>
      <div class="row">
        {{ answerList.content }}
      </div>
    </div>
    <div v-else style="padding-left: 15px"></div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["qnaCode"],
  data() {
    return {
      answerList: [],
    };
  },
  created() {
    this.getAnswerList();
  },
  methods: {
    async getAnswerList() {
      // console.log('this' , this);
      // console.log('this.qnaCode' ,this.qnaCode);
      let result = await axios
        .get(`/node/answer?bno=${this.qnaCode}`)
        .catch((err) => console.log(err));
      console.log(result);
      this.answerList = result.data;
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
  },
};
</script>

<style></style>
