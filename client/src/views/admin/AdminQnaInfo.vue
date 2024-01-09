<template>
  <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
    <h5 style="margin-bottom: 30px">{{ qnaInfo.user_divison }} Q&A 조회</h5>
    <table class="table table-hover">
      <thead>
        <tr>
          <th>작성일시</th>
          <td colspan="4">{{ getDateFormat(qnaInfo.write_date) }}</td>
          <th>유저구분</th>
          <td colspan="2">{{ qnaInfo.user_divison }}</td>
        </tr>
        <tr>
          <th>제목</th>
          <td colspan="4">{{ qnaInfo.title }}</td>
          <th>답변상태</th>
          <td>{{ qnaInfo.qna_status }}</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colspan="7" style="height: 200px">
            <pre>{{ qnaInfo.content }}</pre>
          </td>
        </tr>
        <tr v-for="(img, idx) in imgInfo" :key="idx">
          <td colspan="5">
            <img
              :src="`/node/public/uploads/${img.img_name}`"
              width="150px"
              height="150px"
            />
          </td>
          <td colspan="2" style="position: alsolute">
            <button
              style="
              position: alsolute
                border-color: white;
                border-radius: 20px;
                position: relative;
                top: 50px;
                transform: translateX(-200%);
              "
              class="btn btn-secondary"
              @click="downloadImage(img.img_name)"
            >
              첨부파일 다운로드
            </button>
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
      imgInfo: [],
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
    this.getimgInfo(); //이미지 가져오기
  },
  methods: {
    async downloadImage(img) {
      let imgname = img;
      let response = await axios.get(`/node/download/image/${imgname}`, {
        responseType: "blob", // 서버에서 바이너리 데이터(Blob)로 응답받음
      });

      let url = window.URL.createObjectURL(new Blob([response.data]));

      // a 태그를 생성하여 다운로드 링크 생성
      let link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", imgname); // 다운로드되는 파일의 이름
      document.body.appendChild(link);
      link.click();

      // 생성된 URL 및 a 태그를 해제
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    },
    async getimgInfo() {
      let result = await axios
        .get(`/node/getQnaImg/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.imgInfo = result.data;
      console.log(this.imgInfo);
    },
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
        this.replytext = "";
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

<style scoped>
.container {
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 30px;
}

.form-container {
  margin-top: 30px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

select {
  /* width: 200%; */
  padding: 10px;
  font-family: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"],
textarea,
input[type="file"] {
  text-align: cen;
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
