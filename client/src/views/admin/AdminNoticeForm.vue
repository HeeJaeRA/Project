<template>
  <div class="container" style="margin: 0 auto">
    <div style="margin-left: 30px; margin-right: 50px; margin-top: 30px">
      <table class="table">
        <h5 style="margin: auto; margin-bottom: 30px; width: 150%">
          {{ noticeInfo.user_division }} 공지사항 등록
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
    </div>

    <div>
      <button
        class="btn btn-primary"
        @click="noticeInsert()"
        style="margin-left: 50%; margin-right: 5px; padding: 10px"
      >
        등록
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
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      images: [],
      noticeInfo: {
        notice_important: "",
        write_date: this.getToday(),
        user_division: "",
        title: "",
        content: "",
        user_id: "admin",
        view_cnt: 0,
      },
    };
  },

  created() {
    this.noticeInfo.user_division = this.$route.query.division;
  },

  methods: {
    handleFileChange(event) {
      this.images = Array.from(event.target.files); // images [] 배열에 파일정보
      console.log(this.images);
    },

    //이미지+ 공지사항글
    async noticeInsert() {
      let formData = new FormData();
      //이미지 배열에 있는 파일들을 빼내서 formData에 files라는 이름으로 append 하기
      this.images.forEach((file) => {
        formData.append(`files`, file);
      });

      const noticeInfo = JSON.stringify(this.noticeInfo);
      formData.append(`noticeInfo`, noticeInfo);
      //이미지 파일정보 + 공지사항객체
      let result = await axios.post("/node/noticePhotos", formData);

      if (result.data.affectedRows > 0) {
        Swal.fire({
          icon: "success",
          title: "공자사항 등록이 완료되었습니다.",
        });
        this.$router.push({
          name: "noticeList",
          params: { division: this.$route.query.division },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "공지사항 등록에 실패하였습니다.",
        });
      }
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
