<template>
  <div>
    <div class="card-body">
      <ul class="list-group">
        <li class="list-group-item">
          <div class="container">
            <div class="row text-start">
              {{ answerList.content }}
            </div>
            <!-- <div class="row text-start">
              답변일자: {{ $dateFormat(answerList.write_date, "yyyy-MM-dd") }}
            </div> -->
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
  },
};
</script>

<style></style>
