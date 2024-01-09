<template>
  <div>
    <ul class="list-group">
      <!-- {{
        replyList
      }} -->
      <li
        class="list-group-item"
        :key="idx"
        v-for="(rereply, idx) in rereplyList"
      >
        <div class="container" v-if="rereply.remove_status == 'N'">
          <div class="row" id="rr">
            <div class="col1">
              <p class="badge bg-light text-black position">re</p>
            </div>
            <div class="col-4 text" id="writer">
              {{ "     " + rereply.writer }}
            </div>
            <div class="col-2 text-center">
              {{ getDateFormat(rereply.write_date) }}
            </div>
          </div>
          <div class="row">
            <div class="row text-start">
              {{ rereply.content }}
            </div>
          </div>
          <div class="row">
            <div
              id="btnBoth"
              class="col text-end"
              v-if="rereply.writer == this.nickname"
            >
              <button
                type="button"
                class="btn btn-warning"
                @click="
                  replyupdate(idx, rereply.reply_code),
                    getreplysel(rereply.reply_code)
                "
              >
                수정
              </button>
              <button
                type="button"
                class="btn btn-warning"
                @click="replydelete(rereply.reply_code)"
              >
                삭제
              </button>
              <div v-if="this.renums == idx">
                <p>댓글 수정</p>
                <!-- {{ "내용: " + rereply.content }} -->
                <input
                  class="inputBox"
                  type="text"
                  v-model="this.replyInfo.content"
                />
                <button
                  type="button"
                  @click="updatereply(rereply.reply_code)"
                  class="btn btn-info"
                >
                  댓글 작성
                </button>
                <!-- <ReplyForm v-bind:comCode="this.comCode" /> -->
                <button
                  class="btn btn-warning text-white"
                  type="button"
                  @click="modify(idx)"
                >
                  취소
                </button>
              </div>
            </div>
            <!-- <div class="col text-end">신고하기</div> -->
          </div>
        </div>
        <div v-else>
          <div class="row">
            <div class="row text-start">삭제된 댓글입니다.</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  props: ["comCode", "groupNum"],
  data() {
    return {
      rereplyList: [],
      userId: window.localStorage.getItem("userId"),
      nickname: window.localStorage.getItem("nickname"),
      renums: 100,
      replyInfo: {
        reply_code: "",
        content: "",
        writer: "",
        commu_code: "",
        group_num: "",
      },
    };
  },
  created() {
    this.getrereplyList();
  },
  methods: {
    async getreplysel(replycode) {
      let result = await axios
        .get(`/node/replyinfo/${replycode}`)
        .catch((err) => console.log(err));
      this.replyInfo = result.data[0];
      this.replyInfo.write_date = this.$dateFormat(this.replyInfo.write_date);
      this.replyInfo.writer = this.nickname;
    },
    async getrereplyList() {
      let result = await axios
        .get(`/node/rereply?comCode=${this.comCode}&groupNum=${this.groupNum}`)
        .catch((err) => console.log(err));
      this.rereplyList = result.data;
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async replydelete(rereCode) {
      let result = await axios
        .delete(`/node/replydelete/${rereCode}`)
        .catch((err) => console.log(err));
      console.log("replyList.vue", result.data);
      Swal.fire({
        icon: "success",
        title: "정상 처리",
        text: "댓글이 삭제되었습니다.",
      });
    },
    replyupdate(reupdate, renum) {
      console.log(reupdate);
      this.renums = reupdate;
    },
    async updatereply(replycode) {
      let obj = this.replyInfo.content;
      console.log(replycode);
      console.log(obj);
      let data = {
        // 수정 해야함 content 값이 undefined
        content: obj,
      };
      console.log("data", data);
      let result = await axios.put(`/node/replyupdate/${replycode}`, data);
      console.log(result);
      Swal.fire({
        icon: "success",
        title: "정상 처리",
        text: "댓글이 수정되었습니다.",
      });
    },
    modify(idx) {
      this.renums != idx;
    },
  },
};
</script>
<style scoped>
.inputBox input[type="text"] {
  width: 300px;
}
#btnBoth > button {
  margin: 0 5px;
}
#writer {
  width: 438px;
  font-weight: bolder;
}
.col1 {
  width: 10%;
}
.col1 > p {
  margin-bottom: 3px;
}
#pp {
  display: inline-block;
}
#rr {
  display: flex;
}
</style>
