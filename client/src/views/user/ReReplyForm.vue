<template>
  <div>
    <input type="text" v-model="replyInfo.content" />
    <button type="button" @click="saveReply()">댓글 작성</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["comCode", "groupnum"],
  data() {
    return {
      searchNo: "",
      replyList: [],
      replyInfo: {
        reply_code: "",
        content: "",
        writer: "",
        commu_code: "",
      },
      userId: window.localStorage.getItem("userId"),
    };
  },
  created() {
    this.searchNo = this.$route.query.comCode;
    this.replyInfo.write_date = this.getToday();
    this.replyInfo.user_id = this.userId;
    this.getreplyList();
  },
  methods: {
    async getreplyList() {
      let result = await axios
        .get(`/node/reply?comCode=${this.searchNo}`)
        .catch((err) => console.log(err));
      //console.log('replylist', result.data);
      this.replyList = result.data;
    },
    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
    async saveReply() {
      let data = {
        param: {
          content: this.replyInfo.content,
          writer: this.userId,
          commu_code: this.searchNo,
          group_num: this.groupnum,
        },
      };
      let result = await axios
        .post("/node/replyinsert", data)
        .catch((err) => console.log(err));
      console.log("savereply", result);
      this.getreplyList();
      this.replyInfo.content = "";
      /* let result = null;
            console.log(this.replyInfo.class);
            if(this.replyInfo.class == 0) {
                let data = {
                param : {
                    content : this.replyInfo.content,
                    writer : this.userId,
                    commu_code : this.comCode,
                },
            }
                console.log('data rform', data);
                result = await axios.post(`/node/replyinsert`, data)
                                    .catch((err) => console.log(err));
                console.log('savereply', result);
                // this.getreplyList();
            } else {
                let data = {
                param : {
                    content : this.replyInfo.content,
                    writer : this.userId,
                    commu_code : this.comCode,
                    group_num: this.replyInfo.group_num
                }
            };
                result = await axios.post(`/node/rereplyinsert`, data)
                                    .catch((err) => console.log(err));
                console.log('saveReRe', result);
                // this.getreplyList();
            } */
    },
  },
};
</script>

<style></style>
