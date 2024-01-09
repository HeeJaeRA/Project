<template>
  <div class="container" style="margin: 0 auto">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="margin: auto; margin-bottom: 30px; width: 150%">
          {{ noticeInfo.user_division }} 공지사항 수정
        </h5>
        <select v-model="noticeInfo.notice_important">
          <option value="" selected disabled>공지사항 중요도</option>
          <option value="상">상</option>
          <option value="하">하</option>
        </select>

        <tr>
          <th>제목</th>
          <td class="text-center">
            <input type="text" v-model="noticeInfo.title" />
          </td>
        </tr>

        <tr>
          <th>내용</th>
          <td class="text-center">
            <textarea v-model="noticeInfo.content" />
          </td>
        </tr>

        <tr>
          <th>파일첨부</th>
          <td>
            <input
              type="file"
              ref="fileInput"
              @change="handleFileChange"
              multiple
            />
          </td>
        </tr>
      </table>

      <div>
        <button
          class="btn btn-primary"
          style="margin-left: 50%; margin-right: 5px; padding: 10px"
          @click="noticeUpdate()"
        >
          수정
        </button>
        <button
          class="btn btn-warning text-white"
          style="margin-left: 0%; padding: 10px"
          @click="this.$router.go(-1)"
        >
          취소
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      searchNo: "",
      images: [],
      noticeInfo: {
        notice_important: "",
        write_date: this.getToday(),
        user_division: "",
        title: "",
        content: "",
        user_id: "관리자",
        view_cnt: 0,
      },
    };
  },

  created() {
    this.searchNo = this.$route.query.No;
    this.getNoticeInfo();
  },

  methods: {
    handleFileChange(event) {
      this.images = Array.from(event.target.files); // images [] 배열에.. 뭘?
      console.log(this.images);
    },

    //이미지+ 공지사항글
    async noticeUpdate() {
      let formData = new FormData();

      this.images.forEach((file) => {
        formData.append(`files`, file);
      });

      const noticeInfo = JSON.stringify(this.noticeInfo);
      formData.append(`noticeInfo`, noticeInfo);

      let result = await axios.post("/node/modifyNotice", formData);

      if (result.data.affectedRows > 0) {
        Swal.fire({
          icon: "success",
          title: "공자사항 수정이 완료되었습니다.",
        });
        this.$router.push({
          name: "noticeList",
          params: { division: this.$route.query.division },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "공지사항 수정에 실패하였습니다.",
        });
      }
    },

    //글 한건 조회
    async getNoticeInfo() {
      let result = await axios
        .get(`/node/adminNoticeInfo/${this.searchNo}`)
        .catch((err) => console.log(err));
      this.noticeInfo = result.data;
      console.log(result.data);
    },

    getToday() {
      return this.$dateFormat("", "yyyy-MM-dd");
    },
  }, //메서드
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
  /* width: 180%; */
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
