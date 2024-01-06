<template>
  <div class="container">
    <div class="row">
      <table class="table">
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

    <div class="row">
      <button @click="noticeInsert()">등록</button>
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
