<template>
  <div>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>제목</th>
          <td>{{ comInfo.title }}</td>
          <th>작성자</th>
          <td>{{ comInfo.user_id }}</td>
        </tr>
        <tr>
          <th>작성일시</th>
          <td>{{ getDateFormat(comInfo.write_date) }}</td>
          <th>조회수</th>
          <td>{{ comInfo.view_cnt }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="4">
            <pre>{{ comInfo.content }}</pre>
          </td>
        </tr>
        {{
          imgInfo
        }}
        <tr v-for="img in imgInfo" :key="img.commu_code">
          <td colspan="2">
            <pre>{{ img.img_name }}</pre>
          </td>
          <td colspan="2">
            <img
              :src="`http://localhost:3000/public/uploads/${img.img_name}`"
              width="200px"
              height="200px"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <div v-if="this.userId == this.comInfo.user_id">
        <button
          type="button"
          class="btn btn-outline-primary"
          @click="boardComForm(comInfo.commu_code)"
        >
          수정
        </button>
        <button type="button" class="btn btn-warning" @click="confirmdelete()">
          삭제
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="BoardCommuList()"
        >
          목록으로
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="BoardCommuList()"
        >
          목록으로
        </button>
      </div>
    </div>
    <hr />
    <div>
      <ReplyList v-bind:comCode="this.searchNo" />
    </div>
    <div>
      <ReplyForm v-bind:comCode="this.comCode" />
    </div>
    <!-- <div>
            <input type="text">
            <button type="submit">댓글 작성</button>
         </div> -->
    <!-- rcount 댓글 수 sql.js에 추가하기요 .......
            <CommentList v-if="boardInfo.rcount > 0" v-bind:bno="boardInfo.no" />
            <div v-else class="card text-center">
                댓글 없음
            </div>
        -->
  </div>
</template>

<script>
import axios from "axios";
import ReplyList from "./ReplyList.vue";
import ReplyForm from "./ReplyForm.vue";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchNo: "",
      comInfo: {},
      userId: window.localStorage.getItem("userId"),
      imgInfo: [],
    };
  },
  components: {
    ReplyList,
    ReplyForm,
  },
  created() {
    this.searchNo = this.$route.query.comCode;
    this.boardComInfo();
    this.getimgInfo();
  },
  methods: {
    async boardComInfo() {
      let result = await axios
        .get(`/node/community/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.comInfo = result.data;
    },
    async getimgInfo() {
      let result = await axios
        .get(`/node/commuimg/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.imgInfo = result.data;
      console.log(this.imgInfo);
    },
    getDateFormat(date) {
      return this.$dateFormat(date);
    },
    async BoardCommuList() {
      this.$router.push({ path: "/community" });
    },
    async boardComForm(comCode) {
      this.$router.push({
        path: "/communityform",
        query: { comCode: comCode },
      });
    },
    confirmdelete() {
      Swal.fire({
        title: "정말로 삭제하시겠습니까?",
        text: "삭제한 게시글은 다시 복구가 불가합니다.",
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
          this.deleteComInfo();
        }
      });
    },
    async deleteComInfo() {
      let result = await axios
        .delete(`/node/communitydelete/${this.searchNo}`)
        .catch((err) => console.log(err));
      console.log("cominfo.result", result);
      let count = result.data.affectedRows;
      if (count == 0) {
        Swal.fire({
          title: "게시글이 삭제되지 않았습니다.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "게시글이 삭제되었습니다.",
          icon: "success",
        });
        this.$router.push({ path: "/community" });
      }
    },
  },
};
</script>
